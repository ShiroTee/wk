<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean" %>
<html>
<%@include file="../../../common.jsp" %>
<script>

<%
UserInfoBean userInfoBean=(UserInfoBean)session.getAttribute(Constant.USER_SESSION_ID);
%>
	var orgRootName="<%=userInfoBean.getOrgInfo().getOrgName()%>";
	var orgRootId="<%=userInfoBean.getOrgInfo().getOrgId()%>";
	var userLevel="<%=userInfoBean.getUserLevel()%>";
</script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/Ext.ux.form.LovCombo.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/lovcombo.css">
<link rel="stylesheet" type="text/css" href='<%=request.getContextPath()%>/resource/ext/js/ux/fileuploadfield/css/fileuploadfield.css' />
<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ux/fileuploadfield/FileUploadField.js'></script>
<script type="text/javascript" src="js/Ext.ux.util.js"></script>
<script type="text/javascript" src="js/Ext.ux.form.LovCombo.js"></script>
<script type="text/javascript" src="js/user_list.js"></script>
<script type="text/javascript" src="js/event.js"></script>

	<body>
	
	</body>
</html>