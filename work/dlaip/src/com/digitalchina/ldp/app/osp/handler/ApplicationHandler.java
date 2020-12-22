package com.digitalchina.ldp.app.osp.handler;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.osp.bean.ApplicationBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;
import com.digitalchina.ldp.app.osp.service.ApplicationService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class ApplicationHandler extends AbstractHandler {
    private static Logger logger = Logger.getLogger(ApplicationHandler.class.getName());
    @Autowired
    private ApplicationService applicationService;

    @HttpService
    public int getNumApplication() {
        return applicationService.getNumApplication();
    }

    @HttpService
    public ApplicationBean getApplication(Model model) {
        AuthUtil.writeInfo(model, logger);
        return applicationService.getApplication(model.getValueNotEmpty("appId"));
    }

    // 获取提交应用排行
    @HttpService
    public PageList<ApplicationBean> getNewApplication(Model model) {
        AuthUtil.writeInfo(model, logger);
    	PageList<ApplicationBean> pa = null;
    	boolean flag = true;
    	while(flag){
    		pa = applicationService.getNewApplication(model.getInt("pageNum"), model.getInt("topNum"));
    		if(pa != null){
    			flag = false;
    			return pa;
    		}
    	}
    	return pa;
    }

    @HttpService
    public String addUserApplication(Model model) {
        AuthUtil.writeInfo(model, logger);
        UserAppSubmitBean uasb = new UserAppSubmitBean();
        ApplicationBean ab = new ApplicationBean();

        String app_id = UUID.randomUUID().toString();

        String user_id = model.getValueNotEmpty("user_id");
        String app_name = model.getValueNotEmpty("app_name");
        String app_mold = model.getValue("app_mold");
        String app_type = model.getValue("app_type");
        String app_desc = model.getValue("app_desc");
        String app_prov = model.getValue("app_prov");
        String app_url = model.getValue("app_url");
        String app_pack_url = model.getValue("app_pack_url");
        String app_doc_url = model.getValue("app_doc_url");

        uasb.setSubId(UUID.randomUUID().toString());
        uasb.setUserId(user_id);
        uasb.setAppId(app_id);
        uasb.setSubTime(new Date());
        uasb.setSubStatus("1");

        ab.setAppId(app_id);
        ab.setAppName(app_name);
        ab.setAppMold(app_mold);
        ab.setAppType(app_type);
        ab.setAppDesc(app_desc);
        ab.setAppProv(app_prov);
        ab.setAppUrl(app_url);
        ab.setAppPackUrl(app_pack_url);
        ab.setAppDocUrl(app_doc_url);

        if (("1").equals(app_mold)) {
            int req_cpu = model.getInt("req_cpu");
            int req_men = model.getInt("req_men");
            String req_sys = model.getValue("req_sys");
            String req_midd = model.getValue("req_midd");
            String req_db = model.getValue("req_db");
            int req_stroage = model.getInt("req_stroage");

            ab.setReqCpu(req_cpu);
            ab.setReqMen(req_men);
            ab.setReqSys(req_sys);
            ab.setReqMidd(req_midd);
            ab.setReqDb(req_db);
            ab.setReqStorage(req_stroage);
        }

        try {
            applicationService.addUserApplicatio(uasb, ab);
            return "{success:true}";
        } catch (Exception e) {
            e.printStackTrace();
            return "{success:false,msg:'" + e.getMessage() + "'}";
        }
    }

    @HttpService
    public PageList<DynamicBean> getAppRank(Model model) {
        AuthUtil.writeInfo(model, logger);
        int start = model.getInt("start"); //开始编号
        int pageSize = model.getInt("limit"); //取数据条数
        return applicationService.QueryAppRank(start, pageSize);
    }

    /**
     * 文件上传
     */
    @HttpService
    public String uploadFileToFtpServer(Model model) {
        AuthUtil.writeInfo(model, logger);
        //结果
        Map<String, Object> resultMap = new HashMap<String, Object>();
        //默认失败
        resultMap.put("success", false);

        MultipartResolver resolver = new CommonsMultipartResolver(model.getRequest().getSession().getServletContext());
        MultipartHttpServletRequest re = resolver.resolveMultipart(model.getRequest());
//		MultipartHttpServletRequest re = (MultipartHttpServletRequest) model.getRequest();
        MultipartFile multipartFile = re.getFile("fileName");
        String fileName;
        if (multipartFile == null) {
            resultMap.put("data", "未获取到上传文件");
            return JSON.toJSONString(resultMap);
        }
        String contentType = multipartFile.getOriginalFilename();
        int n = contentType.lastIndexOf(".");
        if (n == -1) {
            resultMap.put("data", "不支持的文件格式");
            return JSON.toJSONString(resultMap);
        }
        String fileType = contentType.substring(n + 1);
        String fileFormat = BeanDefineConfigue.getProperty("FILE_FORMAT");
        boolean isAllow = false;
        for (String format : fileFormat.split(",")) {
            if (fileType.equalsIgnoreCase(format)) {
                isAllow = true;
                break;
            }
        }
        if (!isAllow) {
            resultMap.put("data", "不允许格式[" + fileType + "]上传");
            return JSON.toJSONString(resultMap);
        }
        if (multipartFile.getSize() > StringUtils.toLong(BeanDefineConfigue.getProperty("MAX_FILE_SIZE"))) {
            resultMap.put("data", "文件大小不能超过" + StringUtils.toLong(BeanDefineConfigue.getProperty("MAX_FILE_SIZE")) / 1024 / 1024 + "M");
            return JSON.toJSONString(resultMap);
        }
        FTPClient ftpClient = new FTPClient();
        try {
            ftpClient.connect(BeanDefineConfigue.getProperty("ftpURL"));
            if (!ftpClient.login(BeanDefineConfigue.getProperty("ftpAdmin"), BeanDefineConfigue.getProperty("ftpPassword"))) {
                resultMap.put("data", "FTP连接异常");
                return JSON.toJSONString(resultMap);
            }
            // 设置上传目录
            ftpClient.changeWorkingDirectory(BeanDefineConfigue.getProperty("ftpRootPath"));
            ftpClient.setBufferSize(1024);
            ftpClient.setControlEncoding("GBK");
            FTPClientConfig conf = new FTPClientConfig(FTPClientConfig.SYST_NT);
            conf.setServerLanguageCode("zh");
            ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
            fileName = this.getFileName(multipartFile.getOriginalFilename());
            ftpClient.storeFile(fileName, multipartFile.getInputStream());
            ftpClient.logout();

            resultMap.put("success", true);
            resultMap.put("data", fileName);

            return JSON.toJSONString(resultMap);
        } catch (IOException e) {
            e.printStackTrace();
            resultMap.put("data", "IO异常");
            return JSON.toJSONString(resultMap);
        } finally {
            if (ftpClient.isConnected()) {
                try {
                    ftpClient.disconnect();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private String getFileName(String fileName) {
        int n = fileName.lastIndexOf(".");
/*        if (n == -1) {
            throw new ServiceException("文件:[" + fileName + "]格式不符");
        }*/
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");
        String fileType = fileName.substring(n + 1);
        return format.format(new Date()) + "." + fileType;
    }
}
