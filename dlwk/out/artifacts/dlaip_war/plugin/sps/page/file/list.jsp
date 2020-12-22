<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<html>
<%@include file="../common.jsp"%>
	<script type='text/javascript' src='js/list.js'></script>
	<script type='text/javascript' src='js/event.js'></script>
<script>
	var orgRootName="<%=BeanDefineConfigue.getProperty("ORG_ROOT_ORG_NAME")%>";

	var orgRootId="<%=BeanDefineConfigue.getProperty("ORG_DEFAULT_ID")%>";
	var downloadURL_="http://<%=BeanDefineConfigue.getProperty("publishURL")%>:<%=BeanDefineConfigue.getProperty("publishPort")%>/<%=BeanDefineConfigue.getProperty("ftpPublishBasePath")%>/";
</script>
<body>

</body>
</html>