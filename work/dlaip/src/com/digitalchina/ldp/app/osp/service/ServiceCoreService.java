package com.digitalchina.ldp.app.osp.service;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.bean.PageList;

import java.util.List;

public interface ServiceCoreService {
	
    public PageList<ServiceBean> listServiceByType(int start, int size, String serviceType, String keyWord);

    public PageList<ServiceTypeBean> listServiceType(int start, int size, String parentType, String keyWord);

    public PageList<ServiceBean> listFreshService(int start, int size, String parentType);

	public PageList<ServiceBean> searchService(int start, int size, String keyWord, String parentType);
   
	public ServiceBean getServiceDetail(String id);

    public void saveFavoriteService(String userId, String serviceId);

    public String isServiceFavorited(String userId, String serviceId);
    
    public ServiceBean getServiceById(String id);

	public ServiceUrlBean getServiceUrlById(String id);

	/**
	 * 保存评论
	 * */
	public String saveComment(String userId, String serviceId, String qcFlag, String content);
	
	
	/**
	 * 依据标签读取评论列表
	 * */
	public PageList<ServiceCommentBean> getComment(String serviceId,String qcFlag,int start,int size);
	
	
	/**
	 * 读取指定服务的快捷评论的数目
	 * */
	public List<QuickCommentBean> getQuickCommentByServiceId(String serviceId);
	
	
	/**
	 * 读取某一标签下的评论数
	 * */
	public int getCommentCountByFlag(String serviceId,String qcFlag);

	public PageList<ServiceBean> listService(int start, int size, String serviceType, String keyWord, int sortType);
}
