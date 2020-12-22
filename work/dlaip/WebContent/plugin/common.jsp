<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map.Entry"%>
<%@page import="com.digitalchina.ldp.common.util.StringUtils"%>
<%
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
String appCode = "";
String appCode_="";
String path=request.getServletPath();
String arrays[]=path.split("/");

if(arrays.length>=4)
{
	if(arrays[1].equals("plugin"))
	{
		appCode = "plugin/"+arrays[2];
		appCode_=arrays[2];
	}
}
%>
	<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<script language="javascript">
var appCode="<%=appCode_%>";
</script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/icons.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/mainpanel.js"></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-base.js'></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-all.js'></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-lang-zh_CN.js'></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/common.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ux/GroupSummary.css" />
		
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/paneltip.css" />
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/screensize.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/GroupSummary.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/ux/ProgressBarPager.js"></script>
    	<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/HeaderColumn.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/HeaderColumn.css" />
		<script type="text/javascript" src="<%=request.getContextPath()%>/javascript/app_common.js"></script>
		<script>
	Ext.Ajax.on('requestcomplete', checkUserSessionStatus, this);
	function checkUserSessionStatus(conn, response, options) {
		var result = Ext.util.JSON.decode(response.responseText);
		if(!result.success&&result.msg=="用户会话已过期")
		{
			parent.window.location.reload();
		}
		}
</script>
		
	</head>