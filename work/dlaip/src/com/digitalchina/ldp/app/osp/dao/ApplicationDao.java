package com.digitalchina.ldp.app.osp.dao;

import com.digitalchina.ldp.app.osp.bean.ApplicationBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

public interface ApplicationDao {
	
    public ApplicationBean listApplication(String appId);
    
    public Boolean updateApplication(String subId);
    
    public PageList<UserAppSubmitBean> listAppSubmit(int start, int size);
    
    public PageList<UserAppSubmitBean> listUserAppSubmit(int start, int size, String userId); 
    
    public void AddUserApplicatio(UserAppSubmitBean uasb,ApplicationBean ab);
    
    public PageList<DynamicBean> queryAppRank(int start, int pageSize);
    
    public int getNumApplication();
}
