package com.digitalchina.ldp.app.osp.service;

import com.digitalchina.ldp.app.osp.bean.ServiceBean;
import com.digitalchina.ldp.bean.PageList;


/**
 * 用于服务的各项统计
 * */
public interface ServiceStatisticService {

	/**
	 * 依据调用次数查询服务详情列表，由高到低
	 * */
	public PageList<ServiceBean> listServiceByInvoking(int start,int size);
	

	/**
	 *依据点击量查询服务列表 
	 * */
	public PageList<ServiceBean> listServiceByAccessing(int start,int size);

	/**
	 * 依据收藏数查询服务列表
	 */
	public PageList<ServiceBean> listServiceByCollectCount(int start, int size, String parentType);


	public PageList<ServiceBean> listServiceByCollect(int start, int size);
	
}
