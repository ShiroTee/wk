package com.digitalchina.ldp.app.sep.util;

import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.IOException;
import java.io.OutputStream;

public class FtpClientUtil {

    private static final String FTP_URL = BeanDefineConfigue.getProperty("ftpURL");
    private static final String FTP_PORT = BeanDefineConfigue.getProperty("ftpPort");
    private static final Log log = LogFactory.getLog(FtpClientUtil.class);
    private static final String FTP_USER = BeanDefineConfigue.getProperty("ftpUser");
    private static final String FTP_PASSWORD = BeanDefineConfigue.getProperty("ftpPassword");
    private static final String FTP_DOWNLOAD_BASE_PATH = "/ftp/download/";

    public static void download(String path, OutputStream os) {
        String[] arrays = getFileName(path);
        if (arrays == null) {
            throw new ServiceException("文件目录或文件不存在");
        }
        FTPClient ftp = new FTPClient();
        try {
            ftp.connect(FTP_URL, StringUtils.toNum(FTP_PORT));
            if (!ftp.login(FTP_USER, FTP_PASSWORD)) {
                log.error("登录FTP服务器异常[username:" + FTP_USER + ",password:"
                        + FTP_PASSWORD + "]");

                throw new ServiceException("登录FTP服务器异常");
            }
            int reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
            }
            ftp.changeWorkingDirectory(arrays[0]);// 转移到FTP服务器目录
            FTPFile[] fs = ftp.listFiles();
            for (FTPFile ff : fs) {
                if (ff.getName().equals(arrays[1])) {
                    ftp.retrieveFile(ff.getName(), os);
                    break;
                }
            }
            ftp.logout();
        } catch (IOException e) {

            log.error("连接FTP服务器异常", e);
            throw new ServiceException("连接FTP服务器异常");
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
    }

    private static String[] getFileName(String path) {
        if (path.startsWith(FTP_DOWNLOAD_BASE_PATH)) {
            path = path.substring(FTP_DOWNLOAD_BASE_PATH.length());
            String arrays[] = path.split("/");
            path = "";
            for (int i = 0; i < arrays.length - 1; i++) {
                path = path + "/" + arrays[i];
            }
            return new String[]{path, arrays[arrays.length - 1]};
        }
        return null;
    }

    public static void main(String[] args) {
        System.out.println("ftp/download/test/xxx/doc.zip");
    }
}
