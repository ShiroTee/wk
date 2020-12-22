<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map.Entry"%>
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
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/base64.js"></script>
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
		
		<%
		String commonPath="../extjspage/";
		
			Map<String,String> map=(Map<String,String>)request.getAttribute("jsMap");
			for(Entry<String,String> entry:map.entrySet())
			{
%>
				<script type="text/javascript" src="<%=request.getContextPath()%>/<%=appCode %>page/<%=entry.getValue() %>"></script>
<% 
			}
		%>
	</head>