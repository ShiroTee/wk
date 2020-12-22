<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<html>
<%@include file="../common.jsp"%>
<script>
	var orgRootName="<%=BeanDefineConfigue.getProperty("ORG_ROOT_ORG_NAME")%>";
	var orgRootId="<%=BeanDefineConfigue.getProperty("ORG_DEFAULT_ID")%>";
</script>
<link rel="stylesheet" type="text/css" href='<%=request.getContextPath()%>/resource/ext/js/ux/fileuploadfield/css/fileuploadfield.css' />
<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ux/fileuploadfield/FileUploadField.js'></script>

	<!-- uploadify -->
	<link href="uploadify/uploadify.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="uploadify/jquery.uploadify.js"></script>
	<script type="text/javascript" src="uploadify/my-uploadify.js"></script>
	
	<script type='text/javascript' src='js/timepickerfield.js'></script>
	<script type='text/javascript' src='js/rd_list.js'></script>
	<script type='text/javascript' src='js/event.js'></script>
	<script type='text/javascript' src='../service/js/event.js'></script>
	<script type='text/javascript' src='js/webservice_list_event.js'></script>
	<script type='text/javascript' src='js/ftp_list_event.js'></script>
<body>

</body>
</html>