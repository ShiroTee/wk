<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<html>
<%@include file="../common.jsp"%>
<script>
	var orgRootName="<%=BeanDefineConfigue.getProperty("ORG_ROOT_ORG_NAME")%>";
	var orgRootId="<%=BeanDefineConfigue.getProperty("ORG_DEFAULT_ID")%>";
	<%
		UserInfoBean userInfoBean = (UserInfoBean) session
			.getAttribute(Constant.USER_SESSION_ID);
	%>
	var userOrgId="<%=userInfoBean.getOrgInfo().getOrgId()%>";
	var userOrgName="<%=userInfoBean.getOrgInfo().getOrgName()%>";
	var userPOrgId;
	var userPOrgName;
	//请求当前用户的根节点下的一级祖节点信息
	$.ajax( {
		url : getHandlerRequestUrl() + 'orgInfoManagerHandler/getPOrgInfoById',
		type : 'post',
		async : false,//此处同步请求
		dataType : 'json',
		data:{"orgId":userOrgId},
		success : function(data) {
			//转化成json对象
			var org = eval(data).data;
			userPOrgId=org.orgId;
			userPOrgName=org.orgName;
		}
	});
</script>
	<link rel="stylesheet" type="text/css" href="js/js/Ext.ux.form.LovCombo.css">
	<link rel="stylesheet" type="text/css" href="js/js/lovcombo.css">
	<script type="text/javascript" src="js/js/Ext.ux.util.js"></script>
	<script type="text/javascript" src="js/js/Ext.ux.form.LovCombo.js"></script>
	<script type='text/javascript' src='js/rd_list.js'></script>
	<script type='text/javascript' src='js/event.js'></script>
	<script type='text/javascript' src='../service/js/event.js'></script>
<body>

</body>
</html>