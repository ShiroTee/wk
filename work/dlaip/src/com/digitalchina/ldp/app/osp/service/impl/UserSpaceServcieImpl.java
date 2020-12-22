package com.digitalchina.ldp.app.osp.service.impl;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.app.osp.dao.UserSpaceDao;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.defination.USER_COLUMN_DEF;
import com.digitalchina.ldp.app.osp.service.*;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.app.osp.util.CommonUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import com.digitalchina.ldp.service.BaseService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 用户空间服务实例
 * 
 * */
@Service
public class UserSpaceServcieImpl extends BaseService implements
		UserSpaceService {
	private static Logger logger = Logger.getLogger(UserSpaceServcieImpl.class.getName());
	@Autowired
	private ServiceCoreService serviceCoreService;
	@Autowired
	private ServiceStatisticService serviceStatisticService;
	@Autowired
	private UserSpaceDao userSpaceDao;
	@Autowired
	private ActivityService activityService;
	@Autowired
	private CourseQueryService courseQueryService;
	@Autowired
	private ApplicationService applicationService;

	/**
	 * 依据用户ID查询用户信息
	 * 
	 * */
	@Override
	public UserBean lookupUserByUserId(String userId) {
		return wrapUser(userSpaceDao.lookupUserByUserId(userId));
	}

	/**
	 * 依据登录名称查询用户 信息
	 * */
	@Override
	public UserBean lookupUserByLoginName(String name) {
		return wrapUser(userSpaceDao.lookupUserByLoginName(name));
	}

	/**
	 * 包装用户的非持久化信息
	 * */
	private UserBean wrapUser(UserBean ub) {
		if (null != ub) {
			setServiceCollectCount(ub);

			setServiceInvokeCount(ub);

			setActivityCount(ub);

			setCourseCount(ub);

			setApplicationCount(ub);

			setBBSCount(ub);
		}

		return ub;
	}

	/**
	 * 注册用户
	 * 
	 * 接收的关键参数为用户登录名，用户级别
	 * 
	 * 自动为用户生成用户标识（ID），默认使用登录名作为用户名
	 * 
	 * 如果用户级别有权限调用服务运营平台中发布的服务，则自动为其生成调用KEY，KEY的有效期限（默认6个月）
	 * */
	@Override
	public UserBean register(Model model) {

		String loginName = model.getValueNotEmpty(BS_PARAM.BS_USER_LOGIN_NAME_STR);

		UserBean userBean = userSpaceDao.lookupUserByLoginName(loginName);
		if (null == userBean) {

			userBean = new UserBean();
			userBean.setUserId(UUID.randomUUID().toString());
			userBean.setLoginName(loginName);
			userBean.setUserLevel(BS_PARAM.D_USER_VIP_LEVEL);
			userBean.setUserName(loginName);
			userBean.setUserPoints(BS_PARAM.D_USER_DEFAULT_SCORE);
			userBean.setAuthKey(AuthUtil.generateAuthKey());

			try {
				// 对密码进行hash
				userBean.setLoginPassword(CommonUtil.sha256(model.getValueNotEmpty(BS_PARAM.BS_USER_LOGIN_PASSWORD_STR)));
			} catch (Exception e) {
				logger.warn("写入用户password时发生错误");
			}

			try {
				userBean.setUserEmail(model.getValue(USER_COLUMN_DEF.COLUMN_USER_EMAIL));
				userBean.setUserPhone(model.getValue(USER_COLUMN_DEF.COLUMN_USER_PHONE));
			} catch (Exception e) {
				logger.warn("写入用户email或phone时发生错误");
			}

			Calendar rightNow = Calendar.getInstance();
			userBean.setKeyCrtTime(rightNow.getTime());
			rightNow.add(Calendar.MONTH, 6);
			userBean.setKeyAbortTime(rightNow.getTime());

			userSpaceDao.saveUserInfo(userBean);
		} else {
			// 登录名已存在
			return null;
		}

		return userBean;
	}

	/**
	 * 通过用户ID查询其收藏过的所有服务，此处为新功能，故需要开发自己的DAO实现
	 * 
	 * */
	@Override
	public PageList<UserCollectService> listCollectedService(String userId,
			int start, int size) {

		// 首先查询用户与服务的收藏关系
		PageList<UserCollectService> rep = this
				.createBeanQuery(UserCollectService.class)
				.addQueryParameter(BS_PARAM.BS_USER_ID_STR, userId)
				.setJoin(true).sortForDesc(BS_PARAM.BS_COLLECT_TIME).page(start, size);

		if (null != rep && rep.getCount() > 0) {
			// 查询每个服务的详情
			List<UserCollectService> repList = rep.getList();
			for (UserCollectService ufs : repList) {
				ServiceBean sb = serviceCoreService.getServiceDetail(ufs
						.getResId());
				if (null != sb) {
					ufs.setServiceName(sb.getResNm());
					ufs.setServiceDesc(sb.getServDesc());
				}
			}
		}

		return rep;
	}

	//用户调用服务
	@Override
	public PageList<UserInvokedService> listInvokedService(String userId,
			int start, int size) {
		PageList<DynamicBean> rep = userSpaceDao.listUserInvokedService(userId, start, size);
		PageList<UserInvokedService> list = new PageList<UserInvokedService>();
		List<UserInvokedService> listService = new ArrayList<UserInvokedService>();
		int count=0;
		
		for (DynamicBean db : rep.getList()) {
			String serviceId = db.getValue("service_id");
			Date lastDate = db.getValue(Date.class, "last_date");
			int invokeCount = Integer.parseInt(db.get("invoke_count").toString());
			ServiceBean sb = serviceCoreService.getServiceDetail(serviceId);
			if (null != sb) {
				String serviceName = sb.getResNm();
				UserInvokedService ui = new UserInvokedService();
				ui.setUserId(userId);
				ui.setServiceId(serviceId);
				ui.setServiceName(serviceName);
				ui.setInvokeCount(invokeCount);
				ui.setLastInvoteDate(lastDate);
				listService.add(ui);
				count++;
			}
		}
		list.setList(listService);
		list.setCount(count);
		
		return list;
	}

	/**
	 * 汇总并设置用户收藏的服务总数
	 * */
	private void setServiceCollectCount(UserBean ub) {
		int count = this.createBeanQuery(UserCollectService.class)
				.addQueryParameter(BS_PARAM.BS_USER_ID_STR, ub.getUserId())
				.count();

		ub.setServiceCollectCount(count);
	}

	/**
	 * 汇总并设置用户调用过的服务总数
	 * */
	private void setServiceInvokeCount(UserBean ub) {
		List<DynamicBean> list = userSpaceDao.listUserInvokedService(ub
				.getUserId());
		
		ub.setServiceInvokeCount(list.size());
	}

	/**
	 * 汇总并设置用户参与过的活动总数
	 * */
	private void setActivityCount(UserBean ub) {
		int count = this.createBeanQuery(UserActivityJoinBean.class)
				.addQueryParameter(BS_PARAM.BS_USER_ID_STR, ub.getUserId())
				.count();
		ub.setActivityCount(count);
	}

	/**
	 * 汇总并设置用户收藏的教程总数
	 * */
	private void setCourseCount(UserBean ub) {
		int count = this.createBeanQuery(UserCollectCourseBean.class)
				.addQueryParameter(BS_PARAM.BS_USER_ID_STR, ub.getUserId())
				.count();
		ub.setCourseCount(count);
	}

	/**
	 * 汇总并设置用户提交过的应用总数
	 * */
	private void setApplicationCount(UserBean ub) {
		int count = this.createBeanQuery(UserAppSubmitBean.class)
				.addQueryParameter(BS_PARAM.BS_USER_ID_STR, ub.getUserId())
				.count();
		ub.setApplicationCount(count);
	}

	/**
	 * 汇总并设置用户参与过的帖子总数
	 * */
	private void setBBSCount(UserBean ub) {
		ub.setBbsCount(0);
	}

	/**
	 * 用户参加的活动
	 */
	@Override
	public PageList<ActivityBean> listJoinedActivity(String userId, int start,
			int size) {
		PageList<UserActivityJoinBean> list = userSpaceDao.listJoinedActivity(userId, start, size);
		PageList<ActivityBean> result = new PageList<ActivityBean>();
		List<ActivityBean> activityList = new ArrayList<ActivityBean>();
		int count = 0;
		for(UserActivityJoinBean u : list.getList()){
			ActivityBean activityBean = activityService.getActivityById(u.getActId());
			if(activityBean != null){
				activityList.add(activityBean);
				count++;
			}
		}
		result.setList(activityList);
		result.setCount(count);
		return result;
	}
	
	/**
	 * 用户收藏的教程
	 */
	@Override
	public PageList<UserCollectCourseBean> listCollectedCourse(String userId, int start,
			int size) {
		PageList<UserCollectCourseBean> list = userSpaceDao.listCollectedCourse(userId, start, size);
		for(UserCollectCourseBean u : list.getList()){
			CourseBean courseBean = courseQueryService.getCourseById(u.getCourseId());
			if(courseBean != null){
				u.setCourseName(courseBean.getCourseName());
				u.setCourseType(courseBean.getCourseType());
			}
		}
		return list;
	}

	/**
	 * 用户提交应用
	 * */
	@Override
	public PageList<UserAppSubmitBean> listSubmittedApp(String userId, int start,
			int size) {
		PageList<UserAppSubmitBean> list = userSpaceDao.listSubmittedApp(userId, start, size);
		for(UserAppSubmitBean u : list.getList()){
			ApplicationBean applicationBean = applicationService.getApplication(u.getAppId());
			if(applicationBean != null){
				u.setAppName(applicationBean.getAppName());
				u.setAppType(applicationBean.getAppType());
			}
		}
		return list;
	}

	@Override
	public PageList<BBSBean> listJoinedBBSPost(String userId, int start,
			int size) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserBean register(String userName, String loginName) {

		UserBean userBean = userSpaceDao.lookupUserByLoginName(loginName);
		if (null == userBean) {

			userBean = new UserBean();
			userBean.setUserId(UUID.randomUUID().toString());
			userBean.setLoginName(loginName);
			userBean.setUserLevel(BS_PARAM.D_USER_VIP_LEVEL);
			userBean.setUserName(userName);
			userBean.setUserPoints(BS_PARAM.D_USER_DEFAULT_SCORE);
			userBean.setAuthKey(AuthUtil.generateAuthKey());

			Calendar rightNow = Calendar.getInstance();
			userBean.setKeyCrtTime(rightNow.getTime());
			rightNow.add(Calendar.MONTH, 6);
			userBean.setKeyAbortTime(rightNow.getTime());

			userSpaceDao.saveUserInfo(userBean);
		} else {
			userBean.setUserName(userName);
			userSpaceDao.saveUserInfo(userBean);
		}

		return userBean;
	}

	@Override
	public PageList<DynamicBean> listPosts(String userId,
			int start, int size) {
		PageList<DynamicBean> list = userSpaceDao.listPosts(userId, start, size);
		return list;
	}

	@Override
	public UserBean lookupUser(String loginName, String loginPassword) {
		return wrapUser(userSpaceDao.lookupUser(loginName, loginPassword));
	}
}
