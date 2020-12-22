<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.*"%>
<%@ page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<%@ page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page
	import="com.digitalchina.ldp.app.ums.service.UserInfoManagerService"%>
<%@ page
	import="com.digitalchina.ldp.app.ums.service.OrgInfoManagerService"%>
<%@ page
	import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%

	UserInfoBean userInfoBean = (UserInfoBean) session
			.getAttribute(Constant.USER_SESSION_ID);
	if (userInfoBean == null)
	{
		request.getRequestDispatcher("login.jsp").forward(request,response);
	} else
	{
		if("classics_model".equals(request.getParameter("loginModel")))
		{
			request.getRequestDispatcher("plugin/index.jsp").forward(
					request, response);
		}
		else if("desktop_model".equals(request.getParameter("loginModel")))
		{
			request.getRequestDispatcher("plugin/desktop.jsp").forward(
					request, response);
		}
		else
		{
			request.getRequestDispatcher("plugin/desktop.jsp").forward(
					request, response);
		}
	}
%>