package com.digitalchina.ldp.app.osp.util;

import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;

public class ServiceMgr {

	/**
	 * 获取服务容器SSP的IP地址
	 * */
	public static String getSSP_IPAddress(){
		return BeanDefineConfigue.getProperty("publishURL");
	}
	
	
	/**
	 * 获取服务容器SSP的端口号
	 * */
	public static String getSSP_Port(){
		return BeanDefineConfigue.getProperty("publishPort");
	}
	
	/**
	 * 依据服务的协议类型，获取服务的次级接入地址
	 * 
	 * 入参只能下只下三种之一
	 * 
	 * http   ----->     service
	 * soap   ----->     ws
     * ftp    ----->     ftp/download
	 * */
	public static String getSSP_BasePath(String srvType){
		return BeanDefineConfigue.getProperty(srvType + "PublishBasePath");
	}
	
	
	/**
	 * 为指定的服务设置其直接的调用地址
	 * 
	 * 
	 * 
	 * */
	public static String combineServiceAPIURL(ServiceBean sb){
		String apiUrl = "http://"
						+BeanDefineConfigue.getProperty("publishURL")
						+":"
						+BeanDefineConfigue.getProperty("publishPort")
						+"/"
						+BeanDefineConfigue.getProperty(sb.getResTyp() + "PublishBasePath")
						+"/"
						+sb.getPublishUrl();
		
		sb.setApiUrl(apiUrl);
		
		return apiUrl;
	}
}
