<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<%
    String org_root_id = BeanDefineConfigue.getProperty("ORG_DEFAULT_ID");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<html>
<%@include file="../common.jsp"%>
<script type='text/javascript' src='js/approPostList.js'></script>
<script type='text/javascript' src='js/event.js'></script>
<script type='text/javascript'>
var root_org_id = '<%=org_root_id%>';
</script>
<style type="text/css">
.yellow_my_row_style table {
	background: yellow
}
.red_my_row_style table {
	background: red
}
</style>
<body>

</body>
</html>