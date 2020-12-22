package com.digitalchina.ldp.app.osp.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.digitalchina.ldp.app.osp.bean.UserBean;
import com.digitalchina.ldp.app.osp.defination.BS_PARAM;
import com.digitalchina.ldp.bean.Model;

public class BSUitl {

	
	/**
	 * 获取SESSION中的登录用户的信息
	 * */
	public static String getSessionUserId(Model model){
		
		String id = null;
		
		String timeLog = "在时间点：" + CommonUtil.getCurrentTime() + "   ";
		
		HttpServletRequest request = model.getRequest();

		HttpSession session = request.getSession();
		
		System.out.println(timeLog + "getSessionUserId时取得的sessionID是：" + session.getId());
		
		System.out.println("SESSION中的信息为：" + session.getAttribute(BS_PARAM.D_SESSION_USER_INFO));

		id = (String) session.getAttribute(BS_PARAM.D_SESSION_USER_INFO);
		
		return id;
	}
	
	/**
	 * 将登录的用户信息设置到SESSION中
	 * */
	public static void setSessionUserId(Model model,UserBean ub){
		
		String timeLog = "在时间点：" + CommonUtil.getCurrentTime() + "   ";
		
		HttpServletRequest request = model.getRequest();

		HttpSession session = request.getSession();
		
		System.out.println(timeLog + "登录时取得的sessionID是：" + session.getId());

		session.setAttribute(BS_PARAM.D_SESSION_USER_INFO, ub.getUserId());
	}
	
	/**
	 * 将登录的用户信息设置到SESSION中
	 * */
	public static void setSessionNoUser(Model model){
		
		String timeLog = "在时间点：" + CommonUtil.getCurrentTime() + "   ";
		
		HttpServletRequest request = model.getRequest();

		HttpSession session = request.getSession();
		
		System.out.println(timeLog + "退出时取得的sessionID是：" + session.getId());
		
		String userId = (String) session.getAttribute(BS_PARAM.D_SESSION_USER_INFO);
		
		if(null != userId){
			
			session.removeAttribute(BS_PARAM.D_SESSION_USER_INFO);
			
			System.out.println(timeLog + "用户ID:" + userId + "已注销登录");
		}else {
			System.out.println(timeLog + "未知用户已注销登录");
		}
	}
}
