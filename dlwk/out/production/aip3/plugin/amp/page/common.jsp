<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map.Entry"%>
<%@page import="com.digitalchina.ldp.common.util.StringUtils"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	String appCode = "";
	String path = request.getServletPath();
	String arrays[] = path.split("/");
	String appCode_="";
	if(arrays.length>=4)
{
	if(arrays[1].equals("plugin"))
	{
		appCode = "plugin/"+arrays[2]+"/";
		appCode_=arrays[2];
	}
}
%>
<head>
<script language="javascript">
var appCode="<%=appCode%>";
</script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/<%=appCode%>css/icons.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/scripts/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/scripts/mainpanel.js"></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-base.js'></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-all.js'></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-lang-zh_CN.js'></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/common.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/resources/css/ux/GroupSummary.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/<%=appCode%>css/paneltip.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/scripts/screensize.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/GroupSummary.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/ux/ProgressBarPager.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/HeaderColumn.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/resources/css/HeaderColumn.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/<%=appCode%>javascript/app_common.js"></script>
<script>
	//默认window不能移出屏幕
	Ext.override(Ext.Window, {
		//constrain : true,
		constrainHeader : true,
		modal : true
	});
</script>
</head>