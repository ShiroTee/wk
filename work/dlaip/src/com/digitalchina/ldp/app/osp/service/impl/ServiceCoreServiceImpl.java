package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.app.osp.common.StringUtils;
import com.digitalchina.ldp.app.osp.dao.ServiceCoreDao;
import com.digitalchina.ldp.app.osp.dao.UserSpaceDao;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.ServiceCoreService;
import com.digitalchina.ldp.app.osp.util.ServiceMgr;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ServiceCoreServiceImpl extends BaseService implements
		ServiceCoreService {

	@Autowired
	private ServiceCoreDao serviceCoreDao;
	@Autowired
	private UserSpaceDao userSpaceDao;

	/**
	 * 通过服务类别查询服务列表
	 * */
	@Override
	public PageList<ServiceBean> listServiceByType(int start, int size, String serviceType, String keyWord) {
		PageList<ServiceBean> result = serviceCoreDao.listServiceByType(start, size, serviceType, keyWord);
		
		additionalInfo(result);
		
		return result;
	}

	@Override
	public PageList<ServiceTypeBean> listServiceType(int start, int size, String parentType, String keyWord) {
		PageList<ServiceTypeBean> pageList = serviceCoreDao.listServiceType(start, size, parentType);
		if (null != pageList && pageList.getCount() > 0) {
			for (ServiceTypeBean serviceTypeBean : pageList.getList()) {
				serviceTypeBean.setInnerServiceCount(serviceCoreDao.getServiceCount(serviceTypeBean.getServTypeId(), keyWord));
			}
		}
		return pageList;
	}

	@Override
	public PageList<ServiceBean> listFreshService(int start, int size, String parentType) {

		PageList<ServiceBean> result = serviceCoreDao.listFreshService(start, size, parentType);

		additionalInfo(result);

		return result;
	}

	@Override
	public PageList<ServiceBean> searchService(int start, int size, String keyWord, String parentType) {
		PageList<ServiceBean> result = serviceCoreDao.searchService(start, size, keyWord, parentType);
		
		additionalInfo(result);
		
		return result;
	}

	@Override
	public void saveFavoriteService(String userId, String serviceId) {
		UserCollectService us = new UserCollectService();
		us.setCollectId(StringUtils.getPrimarykeyId());
		us.setCollectStatus("1");
		us.setCollectTime(new Date());
		us.setResId(serviceId);
		us.setUserId(userId);
		serviceCoreDao.saveFavoriteService(us);
	}

	@Override
	public String isServiceFavorited(String userId, String serviceId) {
		return serviceCoreDao.isServiceFavorited(userId, serviceId);
	}

	@Override
	public ServiceBean getServiceDetail(String serviceId) {
		
		//查询服务基本信息
		ServiceBean serviceBean = serviceCoreDao.getServiceById(serviceId);
		
		//查询服务访问量，调用量信息
		if(null != serviceBean){
			int invokingTimes 	= serviceCoreDao.getServiceInvokingCount(serviceId);
			int accessTimes		= serviceCoreDao.getServiceAccessCount(serviceId);
			int collectTimes	= serviceCoreDao.getServiceCollectCount(serviceId);
			int commentTimes	= serviceCoreDao.getServiceCommentCount(serviceId);
			
			serviceBean.setClickingCount(accessTimes);
			serviceBean.setInvokingCount(invokingTimes);
			serviceBean.setCommentCount(commentTimes);
			serviceBean.setCollectCount(collectTimes);
			
			ServiceMgr.combineServiceAPIURL(serviceBean);
		}
		
		return adaptForWebPage(serviceBean);
	}
	
	/**
	 * 保存快捷评论
	 * */
	@Override
	public String saveComment(String userId, String serviceId, String qcFlag, String content) {
		
		QuickCommentBean qcb = serviceCoreDao.getQuickCommentByFlag(qcFlag);
		if(null != qcb){
			
			ServiceCommentBean scb = new ServiceCommentBean();
			
			scb.setComm_id(UUID.randomUUID().toString());
			scb.setComm_detail(content);
			scb.setComm_time(new Date());
			scb.setQuickCommentId(qcb.getQcId());
			scb.setRes_id(serviceId);
			scb.setUser_id(userId);
			
			return serviceCoreDao.saveServiceComment(scb);
		}
		return BS_PARAM.BS_RET_FAILED;
	}

	@Override
	public List<QuickCommentBean> getQuickCommentByServiceId(
			String serviceId) {
		
		List<ServiceCommentBean> scbList = serviceCoreDao.getAllComment(serviceId);
		List<QuickCommentBean> qcbList = serviceCoreDao.getAllQuickComment();
		
		
		for(QuickCommentBean qcb:qcbList){
			//将所有的预设评论的数量初始化为0
			qcb.setCount(0);
			
			for(ServiceCommentBean scb:scbList){
				if(scb.getQuickCommentId() == qcb.getQcId()){
					qcb.setCount(qcb.getCount() + 1);
				}
			}
		}
		
		return qcbList;
	}

	@Override
	public PageList<ServiceCommentBean> getComment(String serviceId, String qcFlag,
			int start, int size) {
		
		PageList<ServiceCommentBean> resultList = null;
		
		QuickCommentBean qcb = serviceCoreDao.getQuickCommentByFlag(qcFlag);
		
		if(null != qcb){
			resultList =  serviceCoreDao.getServiceComment(serviceId, qcb.getQcId(), start, size);
			
			for(ServiceCommentBean scb:resultList.getList()){
				UserBean uBean = userSpaceDao.lookupUserByUserId(scb.getUser_id());
				if(null != uBean){
					scb.setUserName(uBean.getUserName());
				}
			}
		}
		
		return resultList;
	}

	@Override
	public int getCommentCountByFlag(String serviceId, String qcFlag) {
		
		int result = 0;
		
		QuickCommentBean qcb = serviceCoreDao.getQuickCommentByFlag(qcFlag);
		
		if(null != qcb){
			result =  serviceCoreDao.getCommentCountByFlag(serviceId, qcb.getQcId());
		}
		
		return result;
	}

	@Override
	public PageList<ServiceBean> listService(int start, int size, String serviceType, String keyWord, int sortType) {
		PageList<ServiceBean> pageList = serviceCoreDao.listService(start, size, serviceType, keyWord, sortType);
		for (ServiceBean bean : pageList.getList()) {
			adaptForWebPage(bean);
		}
		return pageList;
	}

	/**
	 * 私有方法，补充点击量信息跟调用量信息
	 * */
	private void additionalInfo(PageList<ServiceBean> list){
		if(null != list && list.getCount() > 0){
			List<ServiceBean> srvList = list.getList();
			for(ServiceBean sb:srvList){
				sb.setInvokingCount(serviceCoreDao.getServiceInvokingCount(sb.getResId()));
				sb.setClickingCount(serviceCoreDao.getServiceAccessCount(sb.getResId()));
				sb.setCommentCount(serviceCoreDao.getServiceCommentCount(sb.getResId()));
				sb.setCollectCount(serviceCoreDao.getServiceCollectCount(sb.getResId()));
				
				adaptForWebPage(sb);
			}
		}
	}
	
	/**
	 * 前后台数据的适合，比如后台有些字段使用了码表，则需要读取码表中的码值，以显示在前台页面
	 * 
	 * */
	private ServiceBean adaptForWebPage(ServiceBean sb){
		
		if(null != sb){
			ServiceCodeTable sctFree = serviceCoreDao.getServiceCodeTable(sb.getIsFree());
			if(null != sctFree){
				sb.setIsFreeStr(sctFree.getName());
			}
			
			ServiceCodeTable sctAuth = serviceCoreDao.getServiceCodeTable(sb.getIsAuth());
			if(null != sctAuth){
				sb.setIsAuthStr(sctAuth.getName());
			}
		}
		
		return sb;
	}

	@Override
	public ServiceBean getServiceById(String id) {
		return serviceCoreDao.getServiceById(id);
	}

	@Override
	public ServiceUrlBean getServiceUrlById(String id) {
		return serviceCoreDao.getServiceUrlById(id);
	}
}
