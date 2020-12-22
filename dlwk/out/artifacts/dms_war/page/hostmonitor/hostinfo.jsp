<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"/> 
<html>
<%@include file="../common.jsp" %>
	<body>
	<input type="hidden" value="<%=request.getAttribute("id").toString() %>" id="id"/>
	<input type="hidden" value="<%=request.getAttribute("type").toString() %>" id="type"/>
		<div id='div_body_1_2' style="width: 100%; height: 100%;"></div>
	</body>
</html>