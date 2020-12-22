package com.digitalchina.ldp.app.osp.dao;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.bean.PageList;

import java.util.List;

public interface ServiceCoreDao {
    public PageList<ServiceBean> listServiceByType(int start, int size, String serviceType, String keyWord);

    public PageList<ServiceTypeBean> listServiceType(int start, int size, String parentType);

    public PageList<ServiceBean> listFreshService(int start, int size, String parentType);

    public PageList<ServiceBean> searchService(int start, int size, String keyWord, String parentType);
    
    public ServiceBean getServiceById(String id);

    public ServiceUrlBean getServiceUrlById(String id);
    
    //收藏服务
    public void saveFavoriteService(UserCollectService us);

    //服务是否收藏
    public String isServiceFavorited(String userId, String serviceId);

    //获取指定服务的调用量
    public int getServiceInvokingCount(String serviceId);
	
	//获取指定服务的访问量
	public int getServiceAccessCount(String serviceId);
	
	//获取指定服务的收藏量
	public int getServiceCollectCount(String serviceId);
	
	//获取指定服务的评论数
	public int getServiceCommentCount(String serviceId);
	
    //获取服务分类下的服务数
    public int getServiceCount(String serviceType, String keyWord);
  
    //获取服务所需要的码表信息
    public ServiceCodeTable getServiceCodeTable(int code);
    
    //通过前台标记获取快捷评论内容
    public QuickCommentBean getQuickCommentByFlag(String flag);
    
    //读取所有预设的快捷评论
    public List<QuickCommentBean> getAllQuickComment();
    
    //保存用户对服务的评论
    public String saveServiceComment(ServiceCommentBean scb);
    
    //读取用户对服务的评论
    public ServiceCommentBean getServiceComment(String userId,String serviceId,int qcId);
    
    //读取所有用户使用指定标签的评论内容
    public PageList<ServiceCommentBean> getServiceComment(String serviceId,int qcId,int start,int size);
    
    //读取指定评论指定标签的评论数
    public int getCommentCountByFlag(String serviceId,int qcId);
    
    //读取服务的所有评论
    public List<ServiceCommentBean> getAllComment(String serviceId);

    public PageList<ServiceBean> listService(int start, int size, String serviceType, String keyWord, int sortType);
}
