package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.app.osp.bean.ServiceTestingBean;
import com.digitalchina.ldp.app.osp.bean.ServiceUrlBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.ServiceCoreService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.app.osp.util.ServiceMgr;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.net.SocketTimeoutException;
import java.util.Enumeration;

@Component
public class ServiceTestingHandler extends AbstractHandler {
	private static Logger logger = Logger.getLogger(ServiceTestingHandler.class.getName());
	@Autowired
	private ServiceCoreService serviceCoreService;
	
	/**
	 * 根据页面传参返回服务请求调用地址
	 */
	@HttpService
	public ServiceTestingBean getServiceUrl(Model model) {
		AuthUtil.writeInfo(model, logger);
		
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		ServiceBean serviceBean = serviceCoreService.getServiceById(serviceId);
		String apiUrl = ServiceMgr.combineServiceAPIURL(serviceBean);
		
		return new ServiceTestingBean(apiUrl);
	}
	
	
	/**
	 * 根据页面传参返回服务请求调用地址
	 */
	@SuppressWarnings("unchecked")
	@HttpService
	public String doTestingService(Model model) {
		AuthUtil.writeInfo(model, logger);
		
		String resdata = "";
		String authKey = model.getValue(BS_PARAM.BS_SERVICE_AUTHKEY);
		String reqUrl = model.getValue(BS_PARAM.BS_SERVICE_REQ_URL);
		String requestType = model.getValue(BS_PARAM.BS_SERVICE_REQ_TYPE);
		
		String serviceId = model.getValue(BS_PARAM.BS_SERVICE_ID_STR);
		String proxyParam = getProxyParam(serviceId);
		
		if(requestType.equals(BS_PARAM.BS_SERVICE_HTTP_POST)){
			PostMethod post = new PostMethod(reqUrl+"?"+BS_PARAM.BS_SERVICE_AUTHKEY+"="+authKey + proxyParam);
			Enumeration<String> parameterNames = model.getRequest().getParameterNames();
			while(parameterNames.hasMoreElements()){
				String nextElement = parameterNames.nextElement();
				if(nextElement.equals(BS_PARAM.BS_SERVICE_REQ_URL) 
						|| nextElement.equals(BS_PARAM.BS_SERVICE_REQ_TYPE)){
					continue ;
				}else{
					post.addParameter(nextElement, model.getValue(nextElement));
				}
			}
			
			try {
				// Post XML Message
				HttpClient client = new HttpClient();
				client.getParams().setContentCharset("utf-8");
				client.getParams().setSoTimeout(20000);
				client.executeMethod(post);
				// Receive response message
				if (post.getStatusCode() == HttpStatus.SC_OK ) {
					resdata = post.getResponseBodyAsString();
				} else {
					resdata = post.getResponseBodyAsString();
					if(resdata == null || resdata == ""){
						resdata = post.getStatusLine().toString();
					}
				}
				
			} catch(SocketTimeoutException timeoute){
				resdata = "{\"errorMsg\" : \"远程服务不能访问\"}";
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				post.releaseConnection();
			}
		}else if(requestType.equals(BS_PARAM.BS_SERVICE_HTTP_GET)){
			StringBuilder sb = new StringBuilder();
			Enumeration<String> parameterNames = model.getRequest().getParameterNames();
			while(parameterNames.hasMoreElements()){
				String nextElement = parameterNames.nextElement();
				if(nextElement.equals(BS_PARAM.BS_SERVICE_REQ_URL) 
						|| nextElement.equals(BS_PARAM.BS_SERVICE_REQ_TYPE)){
					continue ;
				}else{
					sb.append("&" + nextElement + "=" + model.getValue(nextElement));
				}
			}
			
			GetMethod get = new GetMethod(reqUrl+"?"+sb.toString()+proxyParam);
			try {
				// Post XML Message
				HttpClient client = new HttpClient();
				client.getParams().setContentCharset("utf-8");
				client.getParams().setSoTimeout(20000);
				client.executeMethod(get);
				// Receive response message
				if (get.getStatusCode() == HttpStatus.SC_OK ) {
					resdata = get.getResponseBodyAsString();
				} else {
					resdata = get.getResponseBodyAsString();
					if(resdata == null || resdata == ""){
						resdata = get.getStatusLine().toString();
					}
				}
			} catch(SocketTimeoutException timeoute){
				resdata = "{\"errorMsg\" : \"远程服务不能访问\"}";
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				get.releaseConnection();
			}
		}
//		System.out.println(resdata);
		return resdata;
	}


	private String getProxyParam(String serviceId) {
		String paramStr = "";
        ServiceUrlBean serviceUrlById = serviceCoreService.getServiceUrlById(serviceId);
        String srvUrl = serviceUrlById.getSrvUrl();
        if (srvUrl.contains("?")) {
            paramStr = "&" + srvUrl.substring(srvUrl.indexOf("?") + 1);
        }
		return paramStr;
	}
}
