package com.digitalchina.ldp.app.osp.service;



import com.digitalchina.ldp.app.osp.bean.ApplicationBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;
import com.digitalchina.ldp.bean.PageList;




import com.digitalchina.ldp.orm.query.impl.DynamicBean;




public interface ApplicationService {
	
    /**
     * 获取应用详情
     */
	public ApplicationBean getApplication(String appId);
	
	
	
	public int getNumApplication();
    /**
     * 获取热门应用
     */
	public PageList<ApplicationBean> getNewApplication(int p,int n);
	
    /**
     * 获取用户应用
     */
	public PageList<ApplicationBean> getUserApplication(String userId);
	
    /**
     * 提交用户应用
     */
	public void addUserApplicatio(UserAppSubmitBean uasb,ApplicationBean ab);

	/**
     * 用户应用排行
     */
	public PageList<DynamicBean> QueryAppRank(int start, int pageSize);
}
