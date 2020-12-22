package com.digitalchina.ldp.app.sep.core.router;

import com.digitalchina.ldp.app.sep.core.processor.impl.AuthProcessorImpl;
import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.sep.util.ThreadUtil;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class FtpServiceRouteBuilder extends AbstractRouteBuiler {
    private static final Log log = LogFactory
            .getLog(FtpServiceRouteBuilder.class);
    private static final String FTP_USER = BeanDefineConfigue
            .getProperty("ftpAdmin");
    private static final String FTP_PASSWORD = BeanDefineConfigue
            .getProperty("ftpPassword");
    private static final String FTP_URL = BeanDefineConfigue
            .getProperty("ftpURL");
    private static final String FTP_PORT = BeanDefineConfigue
            .getProperty("ftpPort");

    public FtpServiceRouteBuilder(RouteInfo route) {
        super(route);
    }

    @Override
    public void configure() throws Exception {
        this.from(this.getPublishURL(this.route.getPublishURL()))
                .routeId(this.route.getRouteId())
                .process(
                        new AuthProcessorImpl(authInfoService, route, routeLogService)).process(new Processor() {

            @Override
            public void process(Exchange exchange) throws Exception {

                RouteLogInfo logInfo = ThreadUtil.get();
                logInfo.setRouteNode("");
                HttpServletResponse response = (HttpServletResponse) exchange.getIn().getHeader(ConstantUtil.HTTP_RESPONSE);
                response.setContentType("application/octet-stream");
                String path = exchange
                        .getIn()
                        .getHeader(
                                ConstantUtil.CAMEL_SERVLET_CONTEXT_PATH)
                        .toString();
                exchange.getOut().setHeaders(
                        exchange.getIn().getHeaders());
                String[] arrays = getFileName(path);
                if (arrays == null) {
                    throw new ServiceException("文件目录或文件不存在");
                }
                FTPClient ftp = new FTPClient();
                try {
                    ftp.connect(FTP_URL, StringUtils.toNum(FTP_PORT));
                    if (!ftp.login(FTP_USER, FTP_PASSWORD)) {
                        log.error("登录FTP服务器异常[username:" + FTP_USER
                                + ",password:" + FTP_PASSWORD + "]");

                        throw new ServiceException("登录FTP服务器异常");
                    }
                    int reply = ftp.getReplyCode();
                    if (!FTPReply.isPositiveCompletion(reply)) {
                        ftp.disconnect();
                    }
                    ftp.changeWorkingDirectory(route.getBaseUrl() + arrays[0]);// 转移到FTP服务器目录
                    ftp.setFileType(2);
                    System.out.println("下载文件2进制方式！");
                    FTPFile[] fs = ftp.listFiles();
                    boolean isFind = false;
                    for (FTPFile ff : fs) {
                        if (ff.getName().equals(arrays[1])) {
                            isFind = true;
                            ftp.retrieveFile(ff.getName(),
                                    response.getOutputStream());
                            break;
                        }
                    }
                    ftp.logout();
                    if (!isFind) {
                        throw new ServiceException("文件不存在");
                    }
                } catch (ServiceException e) {
                    exchange.getOut().setFault(true);
                    exchange.getOut().setBody("<h1>" + e.getMessage() + "</h1>");
                    logInfo.setOutput(e.getMessage());
                    logInfo.setRouteNode("proxy");
                    logInfo.setException(1);
                    log.error("连接FTP服务器异常", e);
                    //throw new ServiceException("连接FTP服务器异常");
                } catch (IOException e) {
                    exchange.getOut().setFault(true);
                    exchange.getOut().setBody("<h1>下载文件异常<h1/>");
                    logInfo.setOutput(e.getMessage());
                    logInfo.setRouteNode("proxy");
                    logInfo.setException(1);
                    log.error("连接FTP服务器异常", e);
                    //throw new ServiceException("连接FTP服务器异常");
                } finally {
                    if (ftp.isConnected()) {
                        try {
                            ftp.disconnect();
                        } catch (IOException ioe) {
                        }
                    }
                }
            }

            private String[] getFileName(String path) {
                if (path.startsWith(ConstantUtil.FTP_DOWNLOAD_BASE_PATH)) {
                    path = path.substring(ConstantUtil.FTP_DOWNLOAD_BASE_PATH.length());
                    String arrays[] = path.split("/");
                    path = "";
                    for (int i = 0; i < arrays.length - 1; i++) {
                        path = path + "/" + arrays[i];
                    }
                    return new String[]
                            {path, arrays[arrays.length - 1]};
                }
                return null;
            }
        });
    }

}
