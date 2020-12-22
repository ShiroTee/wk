package com.digitalchina.ldp.app.sps.service;


import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.sps.bean.ServiceInfo;
import com.digitalchina.ldp.bean.PageList;

public interface ServiceManager
{
	/**
	 * 保存一条服务记录
	 * @param service
	 */
	public void saveServiceInfo(ServiceInfo service);
	/**
	 * 获取服务列表
	 * @param routeType
	 * @param routeStatus
	 * @param start
	 * @param pageSize
	 * @return
	 */
	public PageList<ServiceInfo> getPageList(String routeType,Integer routeStatus,int start,int pageSize);
	/**
	 * 根据资源目录ID获取服务列表
	 * @param resourceId
	 * @return
	 */
	public List<ServiceInfo> getListByResourcesId(String resourceId,Integer routeStatus,String routeType);
	/**
	 * 获取服务详情
	 * @param routeId
	 * @return
	 */
	public ServiceInfo getServiceInfo(String routeId);
	public PageList<ServiceInfo> getWebServicePageList(int start,int pageSize,String routeType,Integer routeStatus,String provider);
	public PageList<ServiceInfo> getFileServicePageList(int start,int pageSize,Integer routeStatus,String provider);
	public PageList<ServiceInfo> getFileServiceList(String userId,String resourceId,int start,int pageSize);
	public PageList<ServiceInfo> getWebServiceList(String resourceId,int start,int pageSize);
	public PageList<ServiceInfo> searchWebService(Map<String,String> args,int start,int pageSize);
	/**
	 * 删除路由信息
	 * @param routeId
	 */
	public void deleteRoute(String routeId);
	/**
	 * 修改服务信息
	 * @param info
	 */
	public void updateServiceInfo(ServiceInfo info);
	/**
	 * 获取非资源目录的服务列表
	 * @return
	 */
	public PageList<ServiceInfo> getWebServiceListNotResource(int start,int pageSize,String routeName,String publishURL);
	/**
	 * 搜索服务列表
	 * @param start
	 * @param pageSize
	 * @param args
	 * @return
	 */
	public PageList<ServiceInfo> searchForWebService(int start,int pageSize,Map<String,Object> args);
	/**
	 * 搜索文件列表
	 * @param start
	 * @param pageSize
	 * @param args
	 * @return
	 */
	public PageList<ServiceInfo> searchForFile(int start,int pageSize,Map<String,Object> args);
	public void editServiceByResouce(String[] arrays,String resourceId);
	/**
	 * 根据routeId修改资源目录ID为null
	 * @param routeId
	 */
	public void updateResouceIsNull(String routeId);
	/**
	 * 获取非资源目录的文件列表
	 * @return
	 */
	public PageList<ServiceInfo> getFileListNotResource(int start,int pageSize,String routeName,String publishURL);
	/**
	 * 修改一条文件信息
	 * @param routeId
	 * @param fileName
	 * @param isAuth
	 * @param isStatus
	 * @return
	 */
	public Boolean updateFileDetail(String routeId, String fileName,String isAuth,String isStatus);
}
