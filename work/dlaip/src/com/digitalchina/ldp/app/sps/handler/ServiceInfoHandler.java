package com.digitalchina.ldp.app.sps.handler;

import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;
import com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo;
import com.digitalchina.ldp.app.smp.service.ConfigResponseService;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
import com.digitalchina.ldp.app.smp.service.ServiceParameterService;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.ServiceInfo;
import com.digitalchina.ldp.app.sps.service.ServiceManager;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.handler.Page;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//import com.digitalchina.ldp.app.sps.service.SynchronizationService;

@Component
public class ServiceInfoHandler extends AbstractHandler
{
    private static final String COMMON_ATTACHEMENT="COMMON_ATTACHEMENT";
    private static final String COMMON_ROUTE_NAME="COMMON_ROUTE_NAME";
    private static final String COMMON_ROUTE_DESC="COMMON_ROUTE_DESC";
    
	@Autowired
	private ServiceManager serviceManager;

	//@Autowired
	//private SynchronizationService synchronizationService;
	@Autowired
	private ServiceParameterService serviceParameterService;
	@Autowired
	private ConfigResponseService configResponseService;
	/**
	 * 搜索web服务列表
	 * @param model
	 * @return
	 */
	public PageList<ServiceInfo> searchWebService(Model model)
	{
		int start = model.getInt("start");
		int pageSize = model.getInt("limit");
		String servTypeId=model.getValue("servTypeId");
		String provider=model.getValue("provider");
		provider=this.getProvider(provider);
		String routeName=model.getValue("routeName");
		String routeType=model.getValue("routeType");
		String publishURL=model.getValue("publishURL");
		String prxoyURL=model.getValue("prxoyURL");
		Map<String,Object> args=new HashMap<String,Object>(5);
		args.put("provider", provider);
		args.put("routeName", routeName);
		args.put("routeType", routeType);
		args.put("publishURL", publishURL);
		args.put("prxoyURL", prxoyURL);
		args.put("servTypeId", servTypeId);
		return serviceManager.searchForWebService(start, pageSize, args);
	}
	@HttpService
	public PageList<ServiceInfo> getFileServiceByResourceId(Model model)
	{
		
		String resourceId=model.getValueNotEmpty("resourceId");
		String userId=model.getValue("userId");
		int start = model.getInt("start");
		int pageSize = model.getInt("limit");
		return this.serviceManager.getFileServiceList(userId,resourceId, start, pageSize);
	}
	@HttpService
	public PageList<ServiceInfo> getWebServiceByResourceId(Model model)
	{
		String resourceId=model.getValueNotEmpty("resourceId");
		int start = model.getInt("start");
		int pageSize = model.getInt("limit");
		return this.serviceManager.getWebServiceList(resourceId, start, pageSize);
	}
	public PageList<ServiceInfo> getFileServicePageList(Model model)
	{
		//synchronizationService.sync();
		int start = model.getInt("start");
		int pageSize = model.getInt("limit");
		String provider=model.getValue("provider");
		provider=this.getProvider(provider);
		String fileName=model.getValue("fileName");
		String downloadURL=model.getValue("downloadURL");
		StringBuilder sb=new StringBuilder("http://");
		sb.append(BeanDefineConfigue.getProperty("publishURL"));
		sb.append(":");
		sb.append(BeanDefineConfigue.getProperty("publishPort"));
		sb.append("/");
		sb.append(BeanDefineConfigue.getProperty("ftpPublishBasePath"));
		sb.append("/");
		
		if(downloadURL.indexOf(sb.toString())!=-1)
		{
			downloadURL=downloadURL.substring(sb.length(),downloadURL.length());
		}
		else
		{
			downloadURL="";
		}
		Map<String,Object> args=new HashMap<String,Object>();
		args.put("provider",provider);
		args.put("fileName", fileName);
		args.put("downloadURL", downloadURL);
		return serviceManager.searchForFile(start, pageSize,args);
	}
	/**
	 * 注册路由
	 * 
	 * @param model
	 * @return
	 */
	@HttpService
	public String registerRouteInfo(Model model)
	{

        Integer serviceType = Integer.valueOf(model.getInt("serviceType"));
        String routeName = model.getValueNotEmpty("routeName");
        String resourceId = null;
        String orgId = null;
        if (serviceType.intValue() == 0)
        {
            resourceId = model.getValueNotEmpty("resourceId");
        }
        else if (serviceType.intValue() == 2)
        {
            orgId = model.getValueNotEmpty("orgId");
        }
        String publishURL = model.getValueNotEmpty("publishURL");
        String proxyURL = model.getRequest().getParameter("prxoyURL");
        if (StringUtils.isEmpty(proxyURL))
        {
            throw new ServiceException("参数[prxoyURL]不能为空字符或null");
        }
        String routeType = model.getValueNotEmpty("routeType");
        int writeLog = model.getInt("writeLog");
        int matchOnUriPrefix = model.getInt("matchOnUriPrefix");
        String routeDesc = model.getValue("routeDesc");
        int isAuth = model.getInt("isAuth");
        String routeId = model.getValue("routeId");
        if ("".equals(routeId))
        {
            routeId = null;
        }
        ServiceInfo info = new ServiceInfo();
        info.setIsAuth(Integer.valueOf(isAuth));
        info.setPrxoyURL(proxyURL);
        info.setPublishURL(publishURL);
        info.setRouteDesc(routeDesc);
        info.setRouteName(routeName);
        info.setRouteStatus(Integer.valueOf(1));
        info.setRunningStatus(Integer.valueOf(1));
        info.setRouteType(routeType);
        info.setPublishDate(new Date());
        info.setServiceType(serviceType);
        info.setResource(resourceId == null ? null : new ResourceCatalogueInfo(resourceId));
        info.setProvider(orgId == null ? null : new OrganizationInfoBean(orgId));
        info.setWriteLog(Integer.valueOf(writeLog));
        info.setRouteId(routeId);
        info.setMatchOnUriPrefix(Integer.valueOf(matchOnUriPrefix));
        this.serviceManager.saveServiceInfo(info);
        return "{success:true}";
	}
	
	/**
	 * 附件上传 接受多个附件 返回可以用于下载的url
	 * 无刷新提交
	 * @param model
	 * @return
	 */
	@HttpService
	public String uploadFileNoRefresh(Model model){
	  model.getResponse().setContentType("text/html;charset=utf-8");
	  StringBuilder callbackUrl=new StringBuilder(model.getValue("cb"));
      ServiceInfo info = new ServiceInfo();
      info.setIsAuth(0);
      info.setRouteName(COMMON_ROUTE_NAME);
      info.setRouteStatus(1);
      info.setRunningStatus(1);
      info.setRouteType("ftp");
      info.setRouteDesc(COMMON_ROUTE_DESC);
      info.setPrxoyURL("#");
      info.setPublishDate(new Date());
      info.setResource(new ResourceCatalogueInfo(COMMON_ATTACHEMENT));
      this.uploadFileToFtpServer(model, info);
      serviceManager.saveServiceInfo(info);
      HashMap<String,String> result=new HashMap<String,String>();
      result.put("publishUrl",info.getPublishURL());
      result.put("fileSize",info.getFileSizef());
      result.put("fileName",info.getFileName());
      callbackUrl.append("?file=").append(info.getFileName());
      callbackUrl.append("&size=").append(info.getFileSizef());
      callbackUrl.append("&url=").append(info.getShowURL());
      try {
        model.getResponse().sendRedirect(callbackUrl.toString());
      } catch (IOException e) {
        e.printStackTrace();
      }
      return null;
	}
	
	public String uploadFile(Model model)
	{
		String resourceId = model.getValue("resourceId");
		String routeName = model.getValueNotEmpty("routeName");
		String routeDesc = model.getValue("routeDesc");
		/**
		 * weblogic处理，tomcat注释掉。
		 */
		try
		{
			model.getRequest().setCharacterEncoding("ISO-8859-1");
			//routeName = new String(routeName.getBytes("ISO-8859-1"), "UTF-8");
			//routeDesc = new String(routeDesc.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		int isAuth = model.getInt("isAuth");
		ServiceInfo info = new ServiceInfo();
		info.setIsAuth(isAuth);
		info.setRouteName(routeName);
		info.setRouteStatus(1);
		info.setRunningStatus(1);
		info.setRouteType("ftp");
		info.setRouteDesc(routeDesc);
		info.setPrxoyURL("#");
		info.setPublishDate(new Date());
		info.setResource(new ResourceCatalogueInfo(resourceId));
		info.setServiceType(0);
		info.setWriteLog(1);
        info.setBaseUrl(BeanDefineConfigue.getProperty("ftpRootPath"));
		this.uploadFileToFtpServer(model, info);
		serviceManager.saveServiceInfo(info);
        //获取Bean
        WebApplicationContext webContext = ContextLoader .getCurrentWebApplicationContext();
        RmiRouteManager rmiRouteManager = (RmiRouteManager) webContext.getBean ("rmiRouteManager");
        rmiRouteManager.addSelectRoute(info.getPublishURL());

		return SUCCESS_JSON;
	}

	private void uploadFileToFtpServer(Model model,ServiceInfo info )
	{
		MultipartHttpServletRequest re = (MultipartHttpServletRequest) model
				.getRequest();
		MultipartFile multipartFile = re.getFile("fileName");
		String fileName = null;
		if (multipartFile == null)
		{
			throw new ServiceException("未获取到上传文件");
		}
		String contentType=multipartFile.getOriginalFilename();
		int n=contentType.lastIndexOf(".");
		if(n==-1)
		{
			throw new ServiceException("不支持的文件格式");
		}
		String fileType=contentType.substring(n+1);
		String fileFormat=BeanDefineConfigue.getProperty("FILE_FORMAT");
		boolean isAllow=false;
		for(String format:fileFormat.split(","))
		{
			if(fileType.equalsIgnoreCase(format))
			{
				isAllow=true;
				break;
			}
		}
		if(!isAllow)
		{
			throw new ServiceException("不允许格式["+fileType+"]上传");
		}
		if(multipartFile.getSize()>StringUtils.toLong(BeanDefineConfigue.getProperty("MAX_FILE_SIZE")))
		{
			throw new ServiceException("文件大小不能超过"+StringUtils.toLong(BeanDefineConfigue.getProperty("MAX_FILE_SIZE"))/1024/1024+"M");
		}
		FTPClient ftpClient = new FTPClient();
		FileInputStream fis = null;

		try
		{
			ftpClient.connect(BeanDefineConfigue.getProperty("ftpURL"));
			if (!ftpClient.login(
					BeanDefineConfigue.getProperty("ftpAdmin"),
					BeanDefineConfigue.getProperty("ftpPassword")))
			{
				throw new ServiceException("FTP连接异常");
			}
			// 设置上传目录
			ftpClient.changeWorkingDirectory(BeanDefineConfigue.getProperty("ftpRootPath"));
			ftpClient.setBufferSize(1024);
			ftpClient.setControlEncoding("GBK");
			FTPClientConfig conf = new FTPClientConfig(FTPClientConfig.SYST_NT);
			conf.setServerLanguageCode("zh");  
			ftpClient.setFileType(FTPClient.BINARY_FILE_TYPE);
			fileName=this.getFileName(multipartFile.getOriginalFilename());
			info.setPublishURL(fileName);
			info.setFileSize(multipartFile.getSize());
			info.setFileName(multipartFile.getOriginalFilename());
			ftpClient.storeFile(fileName, multipartFile.getInputStream());
			ftpClient.logout();
		} catch (IOException e)
		{
			throw new ServiceException("文件上传异常",e);
		} finally
		{
			IOUtils.closeQuietly(fis);
			try
			{
				if (ftpClient.isConnected())
				{
					ftpClient.disconnect();
				}

			} catch (IOException e)
			{
				throw new ServiceException("关闭FTP连接发生异常！", e);
			}
		}
	}
	private String getFileName(String fileName)
	{
		int n=fileName.lastIndexOf(".");
		if(n==-1)
		{
			throw new ServiceException("文件:["+fileName+"]格式不符");
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");
		String fileType=fileName.substring(n+1);
		return format.format(new Date())+"."+fileType;
	} 
	/**
	 * 删除服务
	 * @param model
	 * @return
	 */
	@HttpService
	public String deleteRoute(Model model)
	{
		String routeId=model.getValueNotEmpty("routeId");
		this.serviceManager.deleteRoute(routeId);
		return SUCCESS_JSON;
	}
	/**
	 * 获取服务详情
	 * @param model
	 * @return
	 */
	public ServiceInfo getServiceInfoDetails(Model model)
	{
		String routeId=model.getValueNotEmpty("routeId");
		return this.serviceManager.getServiceInfo(routeId);
	}
	/**
	 * 保存服务信息
	 * @param model
	 * @return
	 */
	@HttpService
	public String editServiceInfo(Model model)
	{
        String routeName = model.getValueNotEmpty("routeName");
        String proxyURL = model.getRequest().getParameter("prxoyURL");
        if (StringUtils.isEmpty(proxyURL))
        {
            throw new ServiceException("参数[prxoyURL]不能为空字符或null");
        }
        String routeDesc = model.getValue("routeDesc");
        int routeStatus = model.getInt("routeStatus");
        int isAuth = model.getInt("isAuth");
        int writeLog = model.getInt("writeLog");
        String routeId = model.getValueNotEmpty("routeId");
        String orgId = model.getValueNotEmpty("orgId");
        System.out.println(orgId);

        ServiceInfo info = new ServiceInfo();
        info.setIsAuth(Integer.valueOf(isAuth));
        info.setPrxoyURL(proxyURL);
        info.setRouteDesc(routeDesc);
        info.setRouteName(routeName);
        info.setRouteStatus(Integer.valueOf(1));
        info.setRunningStatus(Integer.valueOf(1));
        info.setPublishDate(new Date());
        info.setRouteStatus(Integer.valueOf(routeStatus));
        info.setPublishDate(null);
        info.setRouteId(routeId);
        info.setWriteLog(Integer.valueOf(writeLog));
        OrganizationInfoBean provider = new OrganizationInfoBean();
        provider.setOrgId(orgId);
        info.setProvider(provider);

        this.serviceManager.updateServiceInfo(info);
		return SUCCESS_JSON;
	}
	public Page getAPIDetails(Model model)
	{
		String routeId=model.getValueNotEmpty("routeId");
		ServiceInfo info=this.serviceManager.getServiceInfo(routeId);
		model.put("info",info);
		List<ServiceParameterInfo> list=serviceParameterService.getParameterList(routeId);
		model.put("list",list);
		ResponseTemplateInfo responseInfo=configResponseService.getResponseTemplateByRouteId(routeId);
		model.put("responseInfo", responseInfo);
		//获取请求参数列表
		
		return new Page("service/api");
	}
	/**
	 * 获取非资源目录的服务列表
	 * @param model
	 * @return
	 */
	public PageList<ServiceInfo> getWebServiceListNotResource(Model model)
	{
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		String routeName=model.getValue("routeName");
		String publishURL=model.getValue("publishURL");
		return this.serviceManager.getWebServiceListNotResource(start, pageSize,routeName,publishURL);
	}
	/**
	 * 获取非资源目录的文件列表
	 * @param model
	 * @return
	 */
	public PageList<ServiceInfo> getFileListNotResource(Model model)
	{
		int start=model.getInt("start");
		int pageSize=model.getInt("limit");
		String routeName=model.getValue("routeName");
		String publishURL=model.getValue("publishURL");
		return this.serviceManager.getFileListNotResource(start, pageSize,routeName,publishURL);
	}
	private String getProvider(String provider)
	{
		if(BeanDefineConfigue.getProperty("ORG_DEFAULT_ID").equals(provider))
		{
			provider="";
		}
		return provider;
	}
	/**
	 * 修改一条文件详细信息
	 * @param model
	 * @return
	 */
	public String updateFileDetail(Model model){
		//得到修改需要用到的4个参数
		String routeId=model.getValueNotEmpty("routeId");
		String fileName=model.getValueNotEmpty("fileName");
		String isAuth=model.getValueNotEmpty("isAuth");
		String isStatus=model.getValueNotEmpty("isStatus");
		Boolean b= this.serviceManager.updateFileDetail(routeId, fileName,isAuth,isStatus);
		if(b){
			return "{'msg':'保存成功','success':true}";
		}
		return "{'msg':'保存失败','success':false}";
	}
}
