<%@ page language="java" pageEncoding="UTF-8"%>
<%
	session.invalidate();
	if (request.getRemoteUser() == null) {
		response.sendRedirect("login.jsp");
	} else {
		response.sendRedirect("/cas/logout");
	}
%>