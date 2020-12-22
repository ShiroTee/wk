package com.digitalchina.ldp.app.sps.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.digitalchina.ldp.app.ums.bean.ResourceInfoBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;
import com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo;
import com.digitalchina.ldp.app.smp.common.util.RouteManagerContainer;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
import com.digitalchina.ldp.app.sps.bean.ResourceCatalogueInfo;
import com.digitalchina.ldp.app.sps.bean.RouteTypeInfo;
import com.digitalchina.ldp.app.sps.bean.ServiceInfo;
import com.digitalchina.ldp.app.sps.dao.ServiceInfoDao;
import com.digitalchina.ldp.app.sps.service.AccreditationService;
import com.digitalchina.ldp.app.sps.service.ServiceManager;
import com.digitalchina.ldp.app.ums.bean.AppInfoBean;
import com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import com.digitalchina.ldp.orm.query.BeanQuery;
import com.digitalchina.ldp.service.BaseService;
@Service
public class ServiceManagerImpl extends BaseService implements ServiceManager
{

	@Autowired
	private ServiceInfoDao serviceInfoDao;
	@Autowired
	private AccreditationService accreditationService;

	@Override
	public void saveServiceInfo(ServiceInfo service)
	{
		String matchOnUriPrefix = this.serviceInfoDao.find(
				service.getPublishURL(), service.getMatchOnUriPrefix());
		if (matchOnUriPrefix != null)
		{
			throw new ServiceException("动态地址[" + matchOnUriPrefix + "**]已被注册");
		}
		if (service.getMatchOnUriPrefix() == 0)
		{
			if (this.createBeanQuery(ServiceInfo.class)
					.eq("publishURL", service.getPublishURL()).count() > 0)
			{
				throw new ServiceException("发布地址[" + service.getPublishURL()
						+ "]已被注册");
			}
		}
		if (service.getResource() != null)
		{
			BeanQuery<ResourceCatalogueInfo> query = this.createBeanQuery(
					ResourceCatalogueInfo.class).eq("resourceId",
					service.getResource().getResourceId());
			query.selectFields("provider");
			ResourceCatalogueInfo b = query.uniqueResult();
			if (b == null)
			{
				throw new ServiceException("资源目录不存在或已被删除");
			}
			service.setProvider(b.getProvider());
		}
		this.createExecuteQuery().insert(service, false);
		// 保存响应模板
		ResponseTemplateInfo info = new ResponseTemplateInfo();
		info.setRoute(service);
		this.createExecuteQuery().insert(info, false);
		/**
		 * 如果serviceType=2则网RESOURCE_INFO_TABLE注册一条数据，并且resourceType=4
		 * 需要特别处理授权类型
		 */
		if (service.getServiceType() == 2)
		{
			ResourceInfoBean r = new ResourceInfoBean();
			r.setApp(new AppInfoBean("sps"));
			r.setCreateDate(new Date());
			r.setFoliage("Y");
			r.setOrderNumber(1);
			r.setPid(new ResourceInfoBean("sps"));
			r.setResourceName(service.getRouteName());
			r.setResourceType(4);
			r.setResourceUrl(service.getRouteId());
			r.setStatus("Y");
			this.createExecuteQuery().insert(r, false);
		}

	}

	@Override
	public PageList<ServiceInfo> getPageList(String routeType,
			Integer routeStatus, int start, int pageSize)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		if (!StringUtils.isEmpty(routeType))
		{
			query.eq("routeType", routeType);
		}
		if (routeStatus != null)
		{
			query.eq("routeStatus", routeStatus);
		}
		query.setJoin(true);
		return query.page(start, pageSize);
	}

	@Override
	public List<ServiceInfo> getListByResourcesId(String resourceId,
			Integer routeStatus, String routeType)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		if (!StringUtils.isEmpty(routeType))
		{
			query.eq("routeType", routeType);
		}
		if (routeStatus != null)
		{
			query.eq("routeStatus", routeStatus);
		}
		query.eq("resource", resourceId);
		return query.list();
	}

	@Override
	public ServiceInfo getServiceInfo(String routeId)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
			//	.setJoin(true).setJoinBean("OrganizationInfoBean");
		ServiceInfo bean = query.eq("routeId", routeId).uniqueResult();
		if (bean == null)
		{
			throw new ServiceException("服务不存在或已被删除");
		}
		return bean;
	}

	@Override
	public PageList<ServiceInfo> getWebServicePageList(int start, int pageSize,
			String routeType, Integer routeStatus, String provider)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		query.unequal("routeType", "ftp");
		if (routeType != null)
		{
			query.unequal("routeType", routeType);
		}
		if (provider != null)
		{
			query.eq("provider", provider);
		}
		query.setJoin(true);
		query.setJoinLeftJoin();
		query.sortForDesc("publishDate");
		return query.page(start, pageSize);
	}

	@Override
	public PageList<ServiceInfo> getFileServicePageList(int start,
			int pageSize, Integer routeStatus, String provider)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		if (routeStatus != null)
		{
			query.eq("routeStatus", routeStatus);
		}
		if (provider != null)
		{
			query.eq("provider", provider);
		}
		query.eq("routeType", "ftp");
		query.setJoin(true);
		query.setJoinLeftJoin();
		query.sortForDesc("publishDate");
		return query.page(start, pageSize);
	}

	@Override
	public PageList<ServiceInfo> getFileServiceList(String userId,
			String resourceId, int start, int pageSize)
	{
		// return serviceInfoDao.getFileList(resourceId,start,pageSize);
		boolean authenticated = accreditationService.isAuth(userId, resourceId);
		PageList<ServiceInfo> pageList = this
				.createBeanQuery(ServiceInfo.class).eq("resource", resourceId)
				.eq("routeType", "ftp").page(start, pageSize);
		List<ServiceInfo> list = pageList.getList();
		List<ServiceInfo> removeList = new ArrayList<ServiceInfo>();
		for (ServiceInfo si : list)
		{
			if (0 == si.getRouteStatus())
			{
				// 本文件为不可用状态,添加到待删除列表
				removeList.add(si);
				continue;
			}
			if (1 == si.getIsAuth())
			{
				// 需要授权的
				if (!authenticated)
				{
					// 未找到授权信息
					// 屏蔽下载地址
					si.setPublishURL("");
				}
			}
		}
		list.removeAll(removeList);
		return pageList;
	}

	@Override
	public PageList<ServiceInfo> getWebServiceList(String resourceId,
			int start, int pageSize)
	{
	  return this.createBeanQuery(ServiceInfo.class)
          .eq("resource", resourceId).unequal("routeType","ftp")
          .selectFields("routeStatus","routeName","routeDesc","routeType","publishDate","publishURL","routeId","writeLog","isAuth")
          .page(start, pageSize);
	}

	@Override
	public PageList<ServiceInfo> searchWebService(Map<String, String> args,
			int start, int pageSize)
	{

		return null;
	}

	@Override
	public void deleteRoute(String routeId)
	{
		/**
		 * 如果是web服务则删除容器信息 如果是ftp服务则删除FTP服务器上的文件信息
		 */
		ServiceInfo s = this.createBeanQuery(ServiceInfo.class)
				.eq("routeId", routeId).setJoin(true)
				.setJoinBean("ResourceCatalogueInfo")
				.selectFields("resource.resourceName").uniqueResult();
		if (s != null)
		{
			throw new ServiceException("请先删除与资产目录("
					+ s.getResource().getResourceName() + ")的挂接关系");
		}
		List<RmiRouteManager> routeManages = BeanDefineConfigue.getBean(
				RouteManagerContainer.class, "routeManagerContainer", null)
				.getRouteManagers();
		RmiRouteManager rmiRouteManager = routeManages.get(0);
		if (rmiRouteManager.getRouteStatus(routeId) == 1)
		{

			throw new ServiceException("服务或文件正在运行，请先在服务管理器中移除该服务");
		}
		// 删除参数配置信息
		Map<String, Object> args = new HashMap<String, Object>(1);
		args.put("routeInfo", routeId);
		this.createExecuteQuery().delete(ServiceParameterInfo.class, args);
		// 删除模板配置信息
		args.remove("routeInfo");
		args.put("route", routeId);

		this.createExecuteQuery().delete(ResponseTemplateInfo.class, args);
		this.createExecuteQuery().delete(ServiceInfo.class, routeId);
	}

	@Override
	public void updateServiceInfo(ServiceInfo info)
	{
		ServiceInfo s = this.createBeanQuery(ServiceInfo.class)
				.eq("routeId", info.getRouteId()).uniqueResult();
		if (s == null)
		{
			throw new ServiceException("服务信息不存在或已被删除");
		}
		info.setMatchOnUriPrefix(s.getMatchOnUriPrefix());
		List<RmiRouteManager> routeManages = BeanDefineConfigue.getBean(
				RouteManagerContainer.class, "routeManagerContainer", null)
				.getRouteManagers();
		
		//TODO LUOX 新注册的服务路由管理器中会不存在么?
//		if(!routeManages.isEmpty()){
			RmiRouteManager rmiRouteManager = routeManages.get(0);
			if (info.getPrxoyURL() != null
					&& !info.getPrxoyURL().equals(s.getPrxoyURL()))
			{
				if (rmiRouteManager.getRouteStatus(info.getRouteId()) == 1)
				{
					throw new ServiceException("代理地址已变更请先在路由管理器中移除该服务");
				}
	
			}
			if (info.getWriteLog() != s.getWriteLog()
					&& rmiRouteManager.getRouteStatus(info.getRouteId()) == 1)
			{
				throw new ServiceException("请先在路由管理器中移除该服务");
			}
//		}
		this.createExecuteQuery().update(info);
	}

	@Override
	public PageList<ServiceInfo> getWebServiceListNotResource(int start,
			int pageSize, String routeName, String publishURL)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		query.eq("serviceType", 2);
		query.unequal("routeType", "ftp");
		query.eq("routeStatus", 1);
		if (!"".equals(routeName))
		{
			query.like("routeName", routeName);
		}
		if (!"".equals(publishURL))
		{
			query.like("publishURL", publishURL);
		}
		return query.page(start, pageSize);
	}

	@Override
	public PageList<ServiceInfo> searchForWebService(int start, int pageSize,
			Map<String, Object> args)
	{
		String routeName = args.get("routeName").toString();
		String routeType = args.get("routeType").toString();
		String publishURL = args.get("publishURL").toString();
		String prxoyURL = args.get("prxoyURL").toString();
		String provider = args.get("provider").toString();
		String servTypeId = args.get("servTypeId").toString();
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		query.setJoin(true);
		query.setJoinLeftJoin();
		query.sortForDesc("publishDate");
		query.unequal("routeType", "ftp");
		if (!"".equals(routeName))
		{
			query.like("routeName", routeName);
		}
		if (!"".equals(routeType))
		{
			query.eq("routeType", routeType);
		}
		if (!"".equals(publishURL))
		{
			query.like("publishURL", publishURL);
		}
		if (!"".equals(prxoyURL))
		{
			query.like("prxoyURL", prxoyURL);
		}
		if (!"".equals(provider))
		{
			Map<String, OrganizationInfoBean> tempMap = new HashMap<String, OrganizationInfoBean>();
			this.orgChilds(provider, tempMap);
			query.eq("provider", provider);
		}
		
		if(!"".equals(servTypeId) && !"0".equals(servTypeId)){
			if(servTypeId.length() == 1){
				query.afterLike("routeTypeInfo", servTypeId);
			}else{
				query.eq("routeTypeInfo", servTypeId);
			}
		}
		return query.page(start, pageSize);
	}
	
	@SuppressWarnings("unused")
	private void servTypeChilds(String rootId,
			List<String> tempList)
	{
		List<RouteTypeInfo> list = this
				.createBeanQuery(RouteTypeInfo.class).eq("parantTypeId", rootId)
				.selectFields("servTypeId").list();
		for (RouteTypeInfo rtInfo : list)
		{
			if (!tempList.contains(rtInfo.getServTypeId()))
			{
				tempList.add(rtInfo.getServTypeId());
				servTypeChilds(rtInfo.getServTypeId(), tempList);
			}
		}
	}
	
	@SuppressWarnings("unused")
	private void servTypeChilds(String rootId,
			Map<String,RouteTypeInfo> tempMap)
	{
		List<RouteTypeInfo> list = this
				.createBeanQuery(RouteTypeInfo.class).eq("parantTypeId", rootId)
				.selectFields("servTypeId").list();
		for (RouteTypeInfo rtInfo : list)
		{
			if (!tempMap.containsKey(rtInfo.getServTypeId()))
			{
				tempMap.put(rtInfo.getServTypeId(),rtInfo);
				servTypeChilds(rtInfo.getServTypeId(), tempMap);
			}
		}
	}


	private void orgChilds(String rootId,
			Map<String, OrganizationInfoBean> tempMap)
	{
		List<OrganizationInfoBean> list = this
				.createBeanQuery(OrganizationInfoBean.class).eq("pid", rootId)
				.selectFields("orgId").list();
		for (OrganizationInfoBean o : list)
		{
			if (!tempMap.containsKey(o.getOrgId()))
			{
				tempMap.put(o.getOrgId(), o);
				orgChilds(o.getOrgId(), tempMap);
			}
		}
	}

	@Override
	public void editServiceByResouce(String[] arrays, String resourceId)
	{

		ResourceCatalogueInfo r = this
				.createBeanQuery(ResourceCatalogueInfo.class)
				.eq("resourceId", resourceId).uniqueResult();
		if (r == null)
		{
			throw new ServiceException("资产目录不存在或已被删除");
		}
		ServiceInfo info = null;
		for (String serviceId : arrays)
		{
			info = new ServiceInfo();
			info.setRouteId(serviceId);
			info.setResource(r);
			info.setServiceType(0);
			info.setProvider(r.getProvider());
			this.createExecuteQuery().update(info);
		}

	}

	@Override
	public void updateResouceIsNull(String routeId)
	{
		serviceInfoDao.update(routeId);
	}

	@Override
	public PageList<ServiceInfo> getFileListNotResource(int start,
			int pageSize, String routeName, String publishURL)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		query.eq("serviceType", 2);
		query.unequal("routeType", "http");
		query.unequal("routeType", "soap");
		query.eq("routeStatus", 1);
		if (!"".equals(routeName))
		{
			query.like("routeName", routeName);
		}
		if (!"".equals(publishURL))
		{
			query.like("publishURL", publishURL);
		}
		return query.page(start, pageSize);
	}

	@Override
	public PageList<ServiceInfo> searchForFile(int start, int pageSize,
			Map<String, Object> args)
	{
		BeanQuery<ServiceInfo> query = this.createBeanQuery(ServiceInfo.class);
		String provider = args.get("provider").toString();
		String fileName = args.get("fileName").toString();
		String downloadURL = args.get("downloadURL").toString();
		query.eq("routeType", "ftp");
		if (!"".equals(provider))
		{
			query.eq("provider", provider);
		}
		if (!"".equals(fileName))
		{
			query.like("fileName", fileName);
		}
		if (!"".equals(downloadURL))
		{
			query.like("publishURL", downloadURL);
		}
		query.setJoin(true);
		query.setJoinLeftJoin();
		query.sortForDesc("publishDate");
		return query.page(start, pageSize);
	}

	@Override
	public Boolean updateFileDetail(String routeId, String fileName,
			String isAuth, String isStatus)
	{
		ServiceInfo obj = new ServiceInfo();
		obj.setFileName(fileName);
		obj.setIsAuth(Integer.parseInt(isAuth));
		obj.setRouteId(routeId);
		obj.setRouteStatus(Integer.parseInt(isStatus));
		this.createExecuteQuery().update(obj);
		return true;
	}
}
