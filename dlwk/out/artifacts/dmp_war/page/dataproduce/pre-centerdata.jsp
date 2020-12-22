<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String basePath = request.getContextPath();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/>
<html>
<%@include file="../common.jsp" %>
  <head>
    
    <title>委办局原始数据管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="<%=basePath%>/<%=appCode %>css/dmp-produce.css" /> <!-- 求合行的样式 -->
	<script type="text/javascript" src="<%=basePath%>/resource/scripts/Ext.ux.grid.GridSummary.js"></script> <!-- 表格求合插件 -->
	<script type="text/javascript" src="js/pre-centerdata.js"></script>
  </head>
  
  <body>
    <div id="content_2" style="width:100%; height:100%;"></div>
  </body>
</html>
