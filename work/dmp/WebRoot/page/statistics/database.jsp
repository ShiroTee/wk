<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@include file="../common.jsp" %>
<head>
<script type='text/javascript'
	src='js/common.js'></script>
<script type="text/javascript">
window.onload=function(){
	var data1 = "http://10.6.10.25:7001/bi/opencontrol.jsp?action=visitDirect.do&path=/共享报表/兰州数据中心/基础库数据管理&user=administrator&pwd=000000&params={[BI_DATE].time1}:{";
	var data2 = "};{[BI_DATE].time2}:{";
	var data3 = "}";
	var beginDay = getBeginDay();
	var endDay = getEndDay() ;
	var dataURL = data1 + beginDay + data2 + endDay + data3 ;
	document.getElementById("biframe").src = dataURL;
};
</script>
</head>
<body>
	<div style="width: 100%; height: 100%;">
		<iframe id="biframe" src=""  scrolling="auto" frameborder="0" width="100%" height="500"></iframe>
	</div>
</body>
</html>