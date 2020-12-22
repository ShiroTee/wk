<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String basePath = request.getContextPath();
String appCode = "";
if (request.getAttribute("appCode") != null)
{
	appCode = request.getAttribute("appCode").toString();
	appCode = "app-install/"+appCode + "/";
}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/>
<html>
  <head>
    <title>委办局原始数据管理</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="<%=request.getContextPath()%>/css/dmp-produce.css" rel="stylesheet" type="text/css" />
			<script language="javascript">
			PROJECT_ROOT="<%=request.getContextPath()%>";
		</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/echarts/esl.js"></script>
<script type="text/javascript" src="js/datacq_new.js"></script>
  </head>
  
  <body>
    <div id="form" class="div1" style="width:100%; height:40px;">
    <form action="">
 	 <span>开始日期：<input type="text" id="p5start" name = "p5start" value="" class="text"  onFocus="WdatePicker({maxDate:'#F{$dp.$D(\'p5end\');}',dateFmt:'yyyy-MM-dd'})"/></span>
     <span >截止日期：&nbsp;<input type="text" id="p5end" name="p5end" value=""  class="text"  onFocus="WdatePicker({minDate:'#F{$dp.$D(\'p5start\');}',dateFmt:'yyyy-MM-dd'})"/></span>
      <span style="width:230px;"></span>

     <input type="button" class="div-submit-btn" onclick="selectShowData();"/>
     <input type="button" class="div-reset-btn" onclick="resetQueryForm();"/>
     <input type="hidden" id = param_startdate>
     <input type="hidden" id = param_enddate>
    </form>
    </div>
     <div id="div1" style="width:100%; height:20px;"></div>
    <div id="main" style="width:100%; height:350px; "></div>
  </body>
</html>
