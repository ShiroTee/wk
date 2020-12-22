<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@include file="common.jsp" %>
<%
	StringBuffer sb=new StringBuffer();
	sb.append("{header:'ID',dataIndex :'iD',hidden:false,sortable :true,width:80},");
	sb.append("{header:'主机名称',dataIndex:'nAME',hidden :false,sortable:true,width:80},");
	sb.append("{header:'系统类型',dataIndex:'tYPE',hidden :false,sortable:true,width:80},");
	sb.append("{header:'IP地址',dataIndex :'iPADDRESS',hidden:false,sortable:true,width:80}");
%>
<jsp:include page="/page/extjspage/gridpanel.jsp" flush="true">
<jsp:param name="columnList" value="[{name:'iD'},{name:'nAME'},{name:'tYPE'},{name:'iPADDRESS'}]" />
<jsp:param name="divId" value="div_body" />
<jsp:param name="columnConfig" value="<%=sb.toString() %>"/>
<jsp:param name="url" value="/dms/spring/dms/dmsHostMonitorHandler/getHostList"/>
<jsp:param name="gridName" value="logGridPanel"/>
<jsp:param name="isShowToolBar" value="true"/>
<jsp:param name="title" value="&nbsp;示例表格"/>
</jsp:include>
<script type='text/javascript' src='test.js'></script>
</head>
	<body onload="load();">
		<div id='div_body' style="width: 100%; height:100%;"></div>
	</body>
</html>