<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/> 
<html>
<%@include file="../common.jsp" %>
<%
	StringBuffer sb=new StringBuffer();
	sb.append("{header:'ID',dataIndex :'iD',hidden:true,sortable :true,width:20},");
	sb.append("{header:'主机名称',dataIndex:'nAME',hidden :false,sortable:true,width:80,renderer : formatQtip},");
	sb.append("{header:'系统类型',dataIndex:'tYPE',hidden :false,sortable:true,width:80,renderer : formatQtip},");
	sb.append("{header:'IP地址',dataIndex :'iPADDRESS',hidden:false,sortable:true,width:80,renderer : formatQtip},");
	sb.append("{header:'系统描述',dataIndex :'sYSDESC',hidden:true,sortable:true,width:80,renderer : formatQtip},");
	sb.append("{header:'监控状态',dataIndex :'sTATUS',hidden:false,sortable:true,renderer : renderMonitorStatus,width:80},");
	sb.append("{header:'网络状况',dataIndex :'nETSTATUS',hidden:false,sortable:true,renderer : renderNetStatus,width:80},");
	sb.append("{header:'数据库状况',dataIndex :'dBSTATUS',hidden:false,sortable:true,renderer : renderDbStatus,width:80},");
	sb.append("{header:'主机状况',dataIndex :'wARNINGSTATUS',hidden:false,sortable:true,renderer : renderWarningStatus,width:60},");
	sb.append("{header:'操作',width:80,renderer : renderOper,dataIndex :'iD'}");
	String filePage=commonPath+"gridpanel.jsp";
	String dataUrl=request.getContextPath()+"/spring/dms/dmsHostMonitorHandler/getHostList";
%>
<jsp:include page="<%=filePage %>" flush="true">
<jsp:param name="columnList" value="[{name:'iD'},{name:'nAME'},{name:'tYPE'},{name:'iPADDRESS'},{name:'sYSDESC'},{name:'sTATUS'},{name:'cOLLECTDATE'},{name:'fREQUENCY'},{name:'wARNINGSTATUS'},{name:'nETSTATUS'},{name:'uSERNAME'},{name:'pASSWORD'},{name:'hOSTPORT'},{name:'dATABASENAME'},{name:'dATABASEPORT'},{name:'dBSTATUS'}]" />
<jsp:param name="divId" value="div_body" />
<jsp:param name="columnConfig" value="<%=sb.toString() %>"/>
<jsp:param name="url" value="getHostList"/>
<jsp:param name="gridName" value="logGridPanel"/>
<jsp:param name="isShowCheckBox" value="true"/>
<jsp:param name="isShowToolBar" value="true"/>
<jsp:param name="showQuryPanel" value="true"/>
<jsp:param name="showHintPanle" value="true"/>
<jsp:param name="hintString" value="别这样，别人看到会骂人的!"/>
<jsp:param name="gridId" value="monitorGridId"/>
<jsp:param name="formId" value="queryFormId"/>
</jsp:include>
	<body onload="load();">
		<div id='div_body' style="width: 100%; height: 100%;"></div>
	</body>
</html>