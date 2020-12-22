<%@ page language="java"  pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<html>
<%@include file="../common.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/Ext.ux.form.LovCombo.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/lovcombo.css">
<script type="text/javascript" src="js/Ext.ux.util.js"></script>
<script type="text/javascript" src="js/Ext.ux.form.LovCombo.js"></script>
	<script type='text/javascript' src='js/service_list.js'></script>
	<script type='text/javascript' src='js/event.js'></script>
	<script type='text/javascript' src='js/parameter/list.js'></script>
	<script type='text/javascript' src='js/parameter/event.js'></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/base64.js"></script>
<script>
	var orgRootName="<%=BeanDefineConfigue.getProperty("ORG_ROOT_ORG_NAME")%>";
	var orgRootId="<%=BeanDefineConfigue.getProperty("ORG_DEFAULT_ID")%>";
</script>
<body>

</body>
</html>