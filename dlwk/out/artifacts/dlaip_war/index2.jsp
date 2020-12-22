<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%
	UserInfoBean userInfoBean=(UserInfoBean)session.getAttribute(Constant.USER_SESSION_ID);
	if(userInfoBean==null)
	{
		response.sendRedirect("login.jsp");
	}
	else
	{
		request.getRequestDispatcher("plugin/desktop.jsp").forward(request,response);
	}
%>