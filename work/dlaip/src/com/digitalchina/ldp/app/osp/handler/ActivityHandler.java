package com.digitalchina.ldp.app.osp.handler;

import com.alibaba.fastjson.JSON;
import com.digitalchina.ldp.app.osp.bean.ActivityBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.ActivityService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

/**
 * 活动handler
 * @author Administrator
 *
 */
@Component
public class ActivityHandler extends AbstractHandler{
	private static Logger logger = Logger.getLogger(ActivityHandler.class.getName());
	@Autowired
	private ActivityService activityService;
	
	private String fileName;
	
	/**
	 * 查询所有活动列表（按时间倒序）
	 */
	@HttpService
	public List<ActivityBean> lookupAllActivity(Model model){
		AuthUtil.writeInfo(model, logger);
		return activityService.lookupAllActivity(model);
	}
	
	/**
	 * 查询所有活动数量
	 */
	@HttpService
	public int lookupActivityCount(Model model){
		AuthUtil.writeInfo(model, logger);
		return activityService.lookupActivityCount(model);
	}
	
	/**
	 * 分页查询活动
	 */
	@HttpService
	public PageList<ActivityBean> lookupPageActivity(Model model){
		AuthUtil.writeInfo(model, logger);
		 int start = model.getInt("start");
		 int size = model.getInt("limit");
		 return activityService.lookupPageActivity(start, size);
	}
	
	/**
	 * 根据活动id查询活动详情
	 */
	@HttpService
	public ActivityBean getActivityById(Model model){
		//AuthUtil.writeInfo(model, logger);
		String id = model.getValue(BS_PARAM.BS_ACTIVITY_ID_STR);
		ActivityBean activityBean = activityService.getActivityById(id);
		return activityBean;
	}
	
	/**
	 * 增加活动
	 * @throws ParseException 
	 * @throws UnsupportedEncodingException 
	 */
	@HttpService
	public String addActivity(Model model) throws ParseException, UnsupportedEncodingException {
		AuthUtil.writeInfo(model, logger);
		String result = "{\"success\":true}";
		String actId =  UUID.randomUUID().toString();
		String actName = new String (model.getValue("actName").getBytes("iso-8859-1"), "UTF-8");
		String actSponsor = new String (model.getValue("actSponsor").getBytes("iso-8859-1"), "UTF-8");
		String actStart = new String (model.getValue("actStart").getBytes("iso-8859-1"), "UTF-8");
		String actEnd = new String (model.getValue("actEnd").getBytes("iso-8859-1"), "UTF-8");
		String actDesc = new String (model.getRequest().getParameter("actDesc").getBytes("iso-8859-1"), "UTF-8");
		String photoPath = BeanDefineConfigue.getProperty("IMG_LOCATION")+"activity/"+this.fileName;
		String status= new String (model.getValue("actStatus").getBytes("iso-8859-1"), "UTF-8");
		Date createTime = new Date();
		activityService.addActivity(actId,actName,actSponsor,actStart,actEnd,actDesc,photoPath,status,createTime);
		return result;
	}
	
	/**
	 * 根据id删除活动
	 */
	@HttpService
	public String deleteActivity(Model model){
		AuthUtil.writeInfo(model, logger);
		String result = "{\"success\":true}";
		String actId = model.getValue("actId");
		activityService.deleteActivity(actId);
		return result;
	}
	
	/**
	 * 根据id修改活动
	 * @throws ParseException 
	 * @throws UnsupportedEncodingException 
	 */
	@HttpService
	public String updateActivity(Model model) throws ParseException, UnsupportedEncodingException{
		AuthUtil.writeInfo(model, logger);
		String result = "{\"success\":true}";
		HttpServletRequest request = model.getRequest();
		String actId = new String (model.getValue("actId").getBytes("iso-8859-1"), "UTF-8");
		String actName = new String (model.getValue("actName").getBytes("iso-8859-1"), "UTF-8");
		String sponsor = new String (model.getValue("actSponsor").getBytes("iso-8859-1"), "UTF-8");
		String actStart = new String (model.getRequest().getParameter("actStart1").getBytes("iso-8859-1"), "UTF-8");
		String actEnd = new String (model.getValue("actEnd1").getBytes("iso-8859-1"), "UTF-8");
		String actDesc = new String (request.getParameter("actDesc").getBytes("iso-8859-1"), "UTF-8");
		String photoPath = BeanDefineConfigue.getProperty("IMG_LOCATION")+"activity/"+this.fileName;
		String status= new String (model.getValue("actStatus").getBytes("iso-8859-1"), "UTF-8");
		String createTime = new String (model.getValue("createTime").getBytes("iso-8859-1"), "UTF-8");
		activityService.updateActivity(actId,actName,sponsor,actStart,actEnd,actDesc,photoPath,status,createTime);
		return result;
	}
	/**
	 * 图片上传
	 * @throws IOException 
	 * @throws ParseException 
	 */
	@HttpService
	public String uploadFile(Model model) throws IOException, ParseException{
		//结果
       // Map<String, Object> resultMap = new HashMap<String, Object>();
        //默认失败
       // resultMap.put("success", false);
        String result = "{\"success\":false}";
        HttpServletRequest request = model.getRequest();
        request.setCharacterEncoding("UTF-8");
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest)request;  
        MultipartFile multipartFile = null;
        String original="";
        for (Iterator it = multipartRequest.getFileNames(); it.hasNext();) {  
            String key = (String) it.next(); 
            multipartFile = multipartRequest.getFile(key);
            original = new String (multipartFile.getOriginalFilename().getBytes("iso-8859-1"), "UTF-8");
        }  
        
        if (multipartFile == null) {
        	result = "{\"success\":false,\"msg\":'未获取到上传文件'}";
        }
        String contentType = multipartFile.getOriginalFilename();
        int n = contentType.lastIndexOf(".");
        if (n == -1) {
        	result = "{\"success\":false,\"msg\":'不支持的文件格式'}";
        }
        String fileType = contentType.substring(n + 1);
        String fileFormat = BeanDefineConfigue.getProperty("IMG_FORMAT");
        boolean isAllow = false;
        for (String format : fileFormat.split(",")) {
            if (fileType.equalsIgnoreCase(format)) {
                isAllow = true;
                break;
            }
        }
        if (!isAllow) {
        	result = "{\"success\":false,\"msg\":'不允许格式["+fileType+"]上传'}";
        }
        if (multipartFile.getSize() > StringUtils.toLong(BeanDefineConfigue.getProperty("MAX_FILE_SIZE"))) {
        	result = "{\"success\":false,\"msg\":'文件大小不能超过"+StringUtils.toLong(BeanDefineConfigue.getProperty("MAX_FILE_SIZE"))+"'}";
        }
        String logoPathDir = "D:\\deploySpace\\apache-tomcat-6.0.43_osportal\\webapps\\osportal\\cms_resource\\activity\\";
        String saveFileName = logoPathDir + File.separator + getFileName(original);
        BufferedOutputStream bos = null;
        BufferedInputStream bis = new BufferedInputStream(multipartFile.getInputStream());
        try {  
	        bos  = new  BufferedOutputStream(new FileOutputStream(saveFileName));
	        byte[] buff = new byte[8192];  
	        for (int len = -1; (len = bis.read(buff)) != -1;) {  
	            bos.write(buff, 0, len);  
	        }  
	        bos.flush();
	        result = "{\"success\":true,\"msg\":'文件名："+saveFileName+"'}";
	        }catch(FileNotFoundException e){
	        	 result = "{\"success\":true,\"msg\":'上传文件夹不存在'}";
	        }catch (IOException ie) {  
                ie.printStackTrace();  
            } finally {  
                if (bis != null) {  
                    try {  
                        bis.close();  
                    } catch (IOException ie) {  
                        ie.printStackTrace();  
                    }  
                }  
                if (bos != null) {  
                    try {  
                        bos.close();  
                    } catch (IOException ie) {  
                        ie.printStackTrace();  
                    }  
                }  
            } 
        return result;
	}
	
	private String getFileName(String fileName) {
        int n = fileName.lastIndexOf(".");
        SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");
        String fileType = fileName.substring(n + 1);
        this.fileName = fileName.substring(0,n)+"_"+format.format(new Date()) + "." + fileType;
       
        return this.fileName;
    }
	
}
