package com.digitalchina.ldp.app.osp.service;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;


public interface UserSpaceService {
	public UserBean lookupUserByUserId(String userId);
	
	public UserBean lookupUserByLoginName(String name);
	
	public PageList<UserCollectService> listCollectedService(String userId,int start,int size);
	
	public PageList<UserInvokedService> listInvokedService(String userId,int start,int size);
	
	public PageList<ActivityBean> listJoinedActivity(String userId,int start,int size);
	
	public PageList<UserCollectCourseBean> listCollectedCourse(String userId,int start,int size);
	
	public PageList<UserAppSubmitBean> listSubmittedApp(String userId,int start,int size);
	
	public PageList<BBSBean> listJoinedBBSPost(String userId,int start,int size);
	
	public UserBean register(Model model);
	
	public UserBean register(String userName,String loginName);

	public PageList<DynamicBean> listPosts(String userId,
			int start, int size);

	UserBean lookupUser(String loginName, String loginPassword);
}
