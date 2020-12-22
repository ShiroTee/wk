<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.bean.UserInfoBean"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<html>
<%@include file="../../../common.jsp" %>
<script>
	var orgRootName="数字办";
	var orgRootId="ROOT";
	var resouceRootId="<%=BeanDefineConfigue.getProperty("RESOURCE_ID")%>";
</script>
<script type="text/javascript" src="js/resource_info.js"></script>
<script type="text/javascript" src="js/event.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/desktop_icon.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/js/ux/css/data-view.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/ux/DataView-more.js"></script>
	<body>
	
	</body>
</html>