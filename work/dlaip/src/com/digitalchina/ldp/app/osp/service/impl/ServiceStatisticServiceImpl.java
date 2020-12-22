package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.app.osp.dao.ServiceCoreDao;
import com.digitalchina.ldp.app.osp.dao.ServiceStatisticDao;
import com.digitalchina.ldp.app.osp.service.ServiceCoreService;
import com.digitalchina.ldp.app.osp.service.ServiceStatisticService;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceStatisticServiceImpl implements ServiceStatisticService {

	@Autowired
	private ServiceStatisticDao serviceStatisticDao;

	@Autowired
	private ServiceCoreDao serviceCoreDao;

	@Autowired
	private ServiceCoreService serviceCoreService;

	@Override
	public PageList<ServiceBean> listServiceByInvoking(int start, int size) {

		// 从服务日志表中读取服务ID及其当前的调用次数
		PageList<DynamicBean> listByInvoking = serviceStatisticDao
				.listServiceByInvoking(start, size);

		List<ServiceBean> listService = new ArrayList<ServiceBean>();
		PageList<ServiceBean> result = new PageList<ServiceBean>();
		result.setCount(0);
		result.setList(listService);

		if (null != listByInvoking && listByInvoking.getCount() > 0) {

			List<DynamicBean> list = listByInvoking.getList();

			int count = 0;

			// 依次读取每个服务的详情
			for (DynamicBean db : list) {

				String serviceId = db.getValue("route_id");

				ServiceBean service = serviceCoreService
						.getServiceDetail(serviceId);
				if (null != service) {

					listService.add(service);

					count++;
				}
			}

			result.setCount(count);
		}
		return result;
	}

	
	@Override
	public PageList<ServiceBean> listServiceByAccessing(int start, int size) {
		// 从服务日志表中读取服务ID及其当前的调用次数
		PageList<DynamicBean> listByAccess = serviceStatisticDao.listServiceByAccessing(start, size);

		List<ServiceBean> listService = new ArrayList<ServiceBean>();
		PageList<ServiceBean> result = new PageList<ServiceBean>();
		result.setCount(0);
		result.setList(listService);

		if (null != listByAccess && listByAccess.getCount() > 0) {

			List<DynamicBean> list = listByAccess.getList();

			int count = 0;

			// 依次读取每个服务的详情
			for (DynamicBean db : list) {

				String serviceId = db.getValue("service_id");

				ServiceBean service = serviceCoreService.getServiceDetail(serviceId);
				if (null != service) {

					listService.add(service);

					count++;
				}
			}

			result.setCount(count);
		}
		return result;
	}

	@Override
	public PageList<ServiceBean> listServiceByCollectCount(int start, int size, String parentType) {
		PageList<ServiceBean> resultPageList = new PageList<ServiceBean>();
		List<ServiceBean> list = new ArrayList<ServiceBean>();
		PageList<DynamicBean> pageList = serviceStatisticDao.listServiceByCollectCount(start, size, parentType);
		resultPageList.setCount(pageList.getCount());
		for (DynamicBean dynamicBean : pageList.getList()) {
			String serviceId = dynamicBean.getValue("res_id");
			ServiceBean serviceBean = serviceCoreService.getServiceDetail(serviceId);

			int invokingTimes = serviceCoreDao.getServiceInvokingCount(serviceId);
			int accessTimes = serviceCoreDao.getServiceAccessCount(serviceId);
			int collectTimes = serviceCoreDao.getServiceCollectCount(serviceId);
			int commentTimes = serviceCoreDao.getServiceCommentCount(serviceId);

			serviceBean.setClickingCount(accessTimes);
			serviceBean.setInvokingCount(invokingTimes);
			serviceBean.setCommentCount(commentTimes);
			serviceBean.setCollectCount(collectTimes);

			list.add(serviceBean);
		}
		resultPageList.setList(list);
		return resultPageList;
	}


	@Override
	public PageList<ServiceBean> listServiceByCollect(int start, int size) {
		PageList<DynamicBean> listCollect = serviceStatisticDao.listServiceByCollect(start,size);
		List<ServiceBean> listService = new ArrayList<ServiceBean>();
		PageList<ServiceBean> result = new PageList<ServiceBean>();
		int count = 0 ;
		
		if (null != listCollect && listCollect.getCount() > 0) {
			for(DynamicBean db : listCollect.getList()){
				String serviceId = db.getValue("res_id");
				ServiceBean service = serviceCoreService.getServiceDetail(serviceId);
				
				if (null != service) {
	
					listService.add(service);
	
					count++;
				}
			}
			result.setList(listService);
			result.setCount(count);
		}	
		return result;
	}
}
