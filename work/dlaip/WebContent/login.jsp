<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<%@ page import="com.digitalchina.ldp.common.constant.Constant"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><%=BeanDefineConfigue.getProperty("SYSTEM_TITLE") %></title>
<link href="css/slm_n.css" type=text/css rel=stylesheet />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/css/icons.css" />
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-base.js'></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-all.js'></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-lang-zh_CN.js'></script>
<script type="text/javascript"
	src="resource/scripts/jquery-1.9.1.min.js"></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/javascript/login.js'></script>
<style type="text/css">
html {
	background: #0872c1;
	background-color: #0872c1;
}
</style>

<script type="text/javascript">
	var msg="";
</script>
<%
if(request.getParameter("cmsLogin")!=null)
{
	response.sendRedirect("login.html");
}
if(session.getAttribute(Constant.USER_SESSION_ID)!=null)
{
	response.sendRedirect("index.jsp");
}

%>
</head>
<body class="login_n_bg">
	<div class="login_n_topbg">
		<div class="login_n_top_n"></div>
	</div>
	<div class="login_n_bg01">
		<div class="login_n_bg02" id="login_n_bg02">
		</div>
	</div>
</body>
</html>