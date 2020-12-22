package com.digitalchina.ldp.app.osp.dao;


import com.digitalchina.ldp.app.osp.bean.UserActivityJoinBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;
import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.app.osp.bean.UserCollectCourseBean;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;

import java.util.List;

public interface UserSpaceDao {
	
	public UserBean lookupUserByUserId(String userId);
	
	public UserBean lookupUserByLoginName(String name);
	
	public List<DynamicBean> listUserInvokedService(String userId);
	
	public PageList<DynamicBean> listUserInvokedService(String userId,int start,int size);
	
	public void saveUserInfo(UserBean uib);
	
	public void updateUserInfo(UserBean uib);
	
	public PageList<UserActivityJoinBean> listJoinedActivity(String userId, int start,int size);
	
	public PageList<UserCollectCourseBean> listCollectedCourse(String userId, int start,int size);
	
	public PageList<UserAppSubmitBean> listSubmittedApp(String userId, int start,int size);

	public PageList<DynamicBean> listPosts(String userId, int start,
			int size);

	UserBean lookupUser(String loginName, String loginPassword);
}
