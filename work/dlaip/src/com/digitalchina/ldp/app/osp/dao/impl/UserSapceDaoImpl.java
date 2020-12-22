package com.digitalchina.ldp.app.osp.dao.impl;

import com.digitalchina.ldp.app.osp.bean.UserActivityJoinBean;
import com.digitalchina.ldp.app.osp.bean.UserAppSubmitBean;
import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.app.osp.bean.UserCollectCourseBean;
import com.digitalchina.ldp.app.osp.dao.UserSpaceDao;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.defination.USER_COLUMN_DEF;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.dao.BaseDao;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserSapceDaoImpl extends BaseDao implements UserSpaceDao{

	@Override
	public UserBean lookupUserByUserId(String userId){
		return this.createBeanQuery(UserBean.class).eq(USER_COLUMN_DEF.COLUMN_USER_ID, userId).uniqueResult();
	}

	@Override
	public void saveUserInfo(UserBean bean) {

		this.createExecuteQuery().insert(bean, false);
	}

	@Override
	public void updateUserInfo(UserBean bean) {
		this.createExecuteQuery().update(bean);
	}

	@Override
	public UserBean lookupUserByLoginName(String name) {	
		
		UserBean ubBean = this.createBeanQuery(UserBean.class).addQueryParameter(USER_COLUMN_DEF.COLUMN_LOGIN_NAME, name).uniqueResult();
		
		if(null != ubBean){
			System.out.println("当前查询的用户为：" + name);
		}
		
		return ubBean;
	}

	@Override
	public List<DynamicBean> listUserInvokedService(String userId) {
		 StringBuilder sb = new StringBuilder();
		    sb.append(" SELECT DISTINCT t.route_id AS serviceId ");
		    sb.append("   FROM ESB_ROUTE_LOG t ");
		    sb.append(" WHERE t.USER_ID = ? ");
		    sb.append(" GROUP BY t.route_id ");

		    return this.createDynamicSqlQuery(sb.toString(),userId).list();
	}

	@Override
	public PageList<DynamicBean> listUserInvokedService(String userId,int start, int size) {
		
		StringBuilder sb = new StringBuilder();
		sb.append("select user_id,route_id as service_id,max(access_date) as last_date,COUNT(1) as invoke_count");
		sb.append(" from esb_route_log ");
		sb.append(" WHERE USER_ID = ? ");
		sb.append(" group by user_Id,route_id");
		sb.append(" order by last_date desc");
		
		return this.createDynamicSqlQuery(sb.toString(),userId).page(start, size);
	}

	@Override
	public PageList<UserActivityJoinBean> listJoinedActivity(String userId, int start,
			int size) {
		return this.createBeanQuery(UserActivityJoinBean.class).eq("userId", userId).sortForDesc(BS_PARAM.BS_JOIN_TIME).page(start, size);
	}

	@Override
	public PageList<UserCollectCourseBean> listCollectedCourse(String userId, int start,
			int size) {
		return this.createBeanQuery(UserCollectCourseBean.class).eq("userId", userId).sortForDesc(BS_PARAM.BS_COLLECT_TIME).page(start, size);
	}

	@Override
	public PageList<UserAppSubmitBean> listSubmittedApp(String userId,
			int start, int size) {
	    return this.createBeanQuery(UserAppSubmitBean.class).eq("userId", userId).sortForDesc(BS_PARAM.BS_SUB_TIME).page(start, size);
	}

	@Override
	public PageList<DynamicBean> listPosts(String userId, int start,
			int size) {
		String sql= "select JOURNAL_ID as journalId, journal_name as journalName,create_time as createTime, ";
		   sql+= " J_MODULE_ID as moduleId,(select M_SECTION_ID as sectionId from Community_MODULE where MODULE_ID=c.J_MODULE_ID) as sectionId ";
		   sql+= " from community_journal c where c.poster=?";
		   return this.createDynamicSqlQuery(sql,userId).page(start, size);
	}

	@Override
	public UserBean lookupUser(String loginName, String loginPassword) {
		return this.createBeanQuery(UserBean.class).eq(USER_COLUMN_DEF.COLUMN_LOGIN_NAME, loginName).eq(USER_COLUMN_DEF.COLUMN_LOGIN_PASSWORD, loginPassword).uniqueResult();
	}
}
