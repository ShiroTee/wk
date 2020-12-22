package com.digitalchina.ldp.app.osp.handler;

import com.digitalchina.ldp.app.osp.bean.*;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.app.osp.service.UserSpaceService;
import com.digitalchina.ldp.app.osp.util.AuthUtil;
import com.digitalchina.ldp.app.osp.util.BSUitl;
import com.digitalchina.ldp.app.osp.util.CommonUtil;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.annotation.HttpService;
import com.digitalchina.ldp.handler.AbstractHandler;
import com.digitalchina.ldp.orm.query.impl.DynamicBean;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


/**
 * 用户空间控制器
 * */
@Component
public class UserSpaceHandler extends AbstractHandler {
	private static Logger logger = Logger.getLogger(UserSpaceHandler.class.getName());
	@Autowired
	private UserSpaceService userSpaceService;
	
	
	/**
	 * 查询用户基本信息，通过用户ID
	 * 
	 * */
	@HttpService
	public UserBean lookupUserById(Model model){
		AuthUtil.writeInfo(model, logger);
		return userSpaceService.lookupUserByUserId(model.getValue(BS_PARAM.BS_USER_ID_STR));
	}
	
	/**
	 * 查询用户基本信息，通过用户登录名
	 * 
	 * */
	@HttpService
	public UserBean lookupUserByLoginName(Model model){
		AuthUtil.writeInfo(model, logger);
		return userSpaceService.lookupUserByLoginName(model.getValue(BS_PARAM.BS_USER_LOGIN_NAME_STR));
	}
	
	/**
	 * 从会话中读取已登录的用户信息
	 * 
	 * 如果返回null,表示用户未登录
	 * */
	@HttpService
	public UserBean lookupLoginUser(Model model){
		AuthUtil.writeInfo(model, logger);
		
		UserBean result = null;
		String logingUserId = BSUitl.getSessionUserId(model);

		if(null != logingUserId){
			System.out.println(logingUserId);
			
			result = userSpaceService.lookupUserByUserId(logingUserId);
		}else{
			System.out.println("当前会话无用户登录");
		}
		
		return result;
	}
	
	
	/**
	 * 查询用户收藏过的服务
	 * 
	 * */
	@HttpService
	public PageList<UserCollectService> listFavoriteService(Model model){
		AuthUtil.writeInfo(model, logger);

		int start = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		String logingUserId = BSUitl.getSessionUserId(model);
		if(null != logingUserId){
			return userSpaceService.listCollectedService(logingUserId, start, size);
		}
		
		return null;
	}
	
	/**
	 * 查询用户调用过的服务
	 * 
	 * */
	@HttpService
	public PageList<UserInvokedService> listInvokedService(Model model){
		AuthUtil.writeInfo(model, logger);

		int start = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		String logingUserId = BSUitl.getSessionUserId(model);
		if(null != logingUserId){
			return userSpaceService.listInvokedService(logingUserId, start, size);
		}
		
		return null;
	}
	
	/**
	 * 查询用户参与过的活动
	 * 
	 * */
	@HttpService
	public PageList<ActivityBean> listJoinedActivity(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		String logingUserId = BSUitl.getSessionUserId(model);
		if(null != logingUserId){
			return userSpaceService.listJoinedActivity(logingUserId, start, size);
		}
		
		return null;
	}
	
	/**
	 * 查询用户收藏过的教程
	 * 
	 * */
	@HttpService
	public PageList<UserCollectCourseBean> listCollectedCourse(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		String logingUserId = BSUitl.getSessionUserId(model);
		if(null != logingUserId){
			return userSpaceService.listCollectedCourse(logingUserId, start, size);
		}
		
		return null;
	}
	
	/**
	 * 查询用户提交过的应用
	 * 
	 * */
	@HttpService
	public PageList<UserAppSubmitBean> listSubmittedApp(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		String logingUserId = BSUitl.getSessionUserId(model);
		if(null != logingUserId){
			return userSpaceService.listSubmittedApp(logingUserId, start, size);
		}
		
		return null;
	}
	
	/**
	 * 查询用户参与过的社区帖子
	 * 
	 * */
	@HttpService
	public PageList<DynamicBean> listPosts(Model model){
		AuthUtil.writeInfo(model, logger);
		int start = Integer.parseInt(model.getValue(BS_PARAM.BS_START_STR));
		int size = Integer.parseInt(model.getValue(BS_PARAM.BS_LIMIT_STR));
		
		String logingUserId = BSUitl.getSessionUserId(model);
		if(null != logingUserId){
			return userSpaceService.listPosts(logingUserId, start, size);
		}
		
		return null;
	}
	
	/**
	 * 查询用户的服务申请记录
	 * 
	 * */
	@HttpService
	public PageList<ServiceRequestBean> listServiceRequest(Model model){
		AuthUtil.writeInfo(model, logger);
		return null;
	}

	/**
	 * 登录
	 *
	 * 此接口目前只提供给威海大赛使用，因为此登录包含注册的功能，即登录时，未检测到用户，会自动将其注册
	 * */
	@HttpService
	public String login(Model model){
		AuthUtil.writeInfo(model, logger);

		System.out.println("》》》》》》》》》》》》LOG IN》》》》》》》》》》》》》");

		String timeLog = "在时间点：" + CommonUtil.getCurrentTime() + "   ";

		//获取登录名
		String loginName = model.getValueNotEmpty(BS_PARAM.BS_USER_LOGIN_NAME_STR);
		//获取用户名
		String userName = model.getValue(BS_PARAM.BS_USER_NAME_STR);

		UserBean loginUser = userSpaceService.lookupUserByLoginName(loginName);

		//若用户存在则将用户信息写入会话
		if (null == loginUser) {
			//如果只传了登录名，而没有传用户名的话，那么将登录名也设置为用户名
			if (userName == null || userName.trim().isEmpty()) {
				userName = loginName;
			}
			loginUser = userSpaceService.register(userName, loginName);

			System.out.println(timeLog + loginName + "登录时未取到用户信息，会将该用户注册到数据库中");
		}
		BSUitl.setSessionUserId(model,loginUser);

		System.out.println(timeLog + "登录的用户的登录名为:" + loginUser.getLoginName() + ",用户名为:" + loginUser.getUserName());

		return BS_PARAM.BS_ECODE_SUCCESS;
	}

	/**
	 * 总站登录
	 */
	@HttpService
	public String rootLogin(Model model) {
		AuthUtil.writeInfo(model, logger);

		String userId = BSUitl.getSessionUserId(model);
		if (null != userId) {
			// 用户已经登录
			return BS_PARAM.BS_RET_FAILED;
		}

		// 获取登录名
		String loginName = model.getValueNotEmpty(BS_PARAM.BS_USER_LOGIN_NAME_STR);
		// 获取登录密码的hash值
		String loginPassword = CommonUtil.sha256(model.getValueNotEmpty(BS_PARAM.BS_USER_LOGIN_PASSWORD_STR));
		// 查找用户
		UserBean loginUser = userSpaceService.lookupUser(loginName, loginPassword);
		// 设置用户
		BSUitl.setSessionUserId(model, loginUser);

		return BS_PARAM.BS_RET_SUCCESS;
	}

	/**
	 * 登出
	 * */
	@HttpService
	public String logOut(Model model){
		AuthUtil.writeInfo(model, logger);
		
		System.out.println("《《《《《《《《《《《《LOG OUT《《《《《《《《《《《《《《");
				
		BSUitl.setSessionNoUser(model);
		
		return BS_PARAM.BS_ECODE_SUCCESS;
	}
	
	/**
	 * 注册
	 * */
	@HttpService
	public String register(Model model){
		AuthUtil.writeInfo(model, logger);
		
		UserBean checkBean = userSpaceService.lookupUserByLoginName(model.getValue(BS_PARAM.BS_USER_LOGIN_NAME_STR));
		
		if(null != checkBean){
			return BS_PARAM.BS_RET_FAILED_DUPLICATE;
		}
		
		if(null != userSpaceService.register(model)){
			return BS_PARAM.BS_RET_SUCCESS;
		}
		
		return BS_PARAM.BS_RET_FAILED;
	}
}
