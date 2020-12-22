<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map.Entry"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/> 
<html>
<%
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
String appCode = "";
if (request.getAttribute("appCode") != null)
{
	appCode = request.getAttribute("appCode").toString();
	appCode = "app-install/"+appCode + "/";
}
%>
	<head>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/<%=appCode %>css/icons.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/mainpanel.js"></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-base.js'></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-all.js'></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-lang-zh_CN.js'></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/common.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ux/GroupSummary.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/<%=appCode %>css/paneltip.css" />
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/screensize.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/GroupSummary.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/jsMap.js"></script>
		 <script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/ux/ProgressBarPager.js"></script>
		<script language="javascript">
			PROJECT_ROOT="<%=request.getContextPath()%>/<%=appCode%>";
		</script>
		<script type="text/javascript" src="esbservicetypemanage.js"></script>
		</head>
	<body>
		<div id='service_div_1' style="width: 100%; height: 100%;"></div>
	</body>
</html>