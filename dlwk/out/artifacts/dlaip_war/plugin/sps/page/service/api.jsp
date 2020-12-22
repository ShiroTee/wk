<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.digitalchina.ldp.app.sps.bean.ServiceInfo"%>
<%@ page import="java.util.List"%>
<%@ page import="com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo"%>

<%@ page import="com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo"%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
<%
	ServiceInfo info = (ServiceInfo) request.getAttribute("info");
	List<ServiceParameterInfo> list = (List<ServiceParameterInfo>) request
			.getAttribute("list");
	ResponseTemplateInfo responseInfo = (ResponseTemplateInfo) request
			.getAttribute("responseInfo");
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--[if lt IE 9]>
  <script src="../../js/html5shiv.min.js"></script>
  <script src="../../js/respond.min.js"></script>
<![endif]-->


<title><%=info.getRouteName()%></title>
<!-- Bootstrap -->
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<link
	href="<%=request.getContextPath()%>/resource/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">
<link
	href="<%=request.getContextPath()%>/resource/bootstrap/css/prettify.css"
	type="text/css" rel="stylesheet" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/bootstrap/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/bootstrap/js/prettify.js"></script>
</head>

<body onload="prettyPrint();">

	<div class="panel panel-default">
		<div class="panel-body">
			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="label label-success"><%=info.getRouteName()%>接口功能描述</span>
				</div>
				<div class="panel-body">
					<%=info.getRouteDesc() == null ? "" : info.getRouteDesc()%>
				</div>
			</div>

			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="label label-info">API接口调用说明</span>
				</div>
				<div class="panel-body">
					<B>http请求方式:</B> GET <a
						href="<%=info.getShowURL()%><%=info.getIsAuth() == 1 ? "?timestamp=时间戳&authKey=授权KEY&testService=true"
					: "?testService=true"%>"><%=info.getShowURL()%><%=info.getIsAuth() == 1 ? "?timestamp=时间戳&authKey=授权KEY"
					: ""%></a>&nbsp;&nbsp;&nbsp;<a
						href="<%=info.getShowURL()%>?testService=true<%=info.getIsAuth() == 1 ? "&authKey=授权KEY&timestamp=时间戳"
					: ""%>"
						onclick="onlineTest();">测试</a>
				</div>
			</div>

			<div class="panel panel-default">
				<!-- Default panel contents -->
				<div class="panel-heading">
					<span class="label label-warning">请求参数说明</span>
				</div>


				<!-- Table -->
				<table class="table">
					<tr>
						<td><B>参数名称</B></td>
						<td><B>参数类型</B></td>
						<td><B>最大长度</B></td>
						<td><B>默认值</B></td>
						<td><B>是否必须</B></td>
						<td><B>参数说明</B></td>
					</tr>
					<%
						for (ServiceParameterInfo s : list)
						{
							if (s.getType() == 0)
							{
					%>
					<tr>
						<td><%=s.getName()%></td>
						<td><%=s.getDataType()%></td>
						<td><%=s.getMaxLength() == null ? "" : s.getMaxLength()%></td>
						<td><%=s.getDefaultValue() == null ? "" : s
							.getDefaultValue()%></td>
						<td><%=s.getIsNull() == 1 ? "是" : "否"%></td>
						<td><%=s.getParameterDesc() == null ? "" : s
							.getParameterDesc()%></td>
					</tr>
					<%
						}
					%>
					<%
						}
					%>

				</table>
			</div>


			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="label label-danger">返回消息样例</span>
				</div>
				<%
					if (info.getRouteType().equals("http"))
					{
				%>
				<div class="panel-body">
					<B>JSON格式:</B>
					<pre class=”prettyprintlinenumsLang-js”>
   <%=responseInfo.getJsonResponse() == null ? ""
						: responseInfo.getJsonResponse()%>
</pre>
					<B>XML格式:</B>
					<pre class=”prettyprintlinenumsLang-xml”>
  <xmp>
<%=responseInfo.getXmlResponse() == null ? ""
						: responseInfo.getXmlResponse()%>
</xmp>
</pre>
				</div>
				<%
					}
					else
					{
%>
	<div class="panel-body">
		&nbsp;&nbsp;<a href="<%=info.getShowURL()%>?wsdl" target="_blank">查看WSDL文档</a>
	</div>
	
<% 
					}
				%>

			</div>


			<div class="panel panel-default">
				<!-- Default panel contents -->
				<div class="panel-heading">
					<span class="label label-primary">响应参数说明</span>
				</div>


				<!-- Table -->
				<table class="table">
					<tr>
						<td><B>参数名称</B></td>
						<td><B>参数类型</B></td>
						<td><B>最大长度</B></td>
						<td><B>默认值</B></td>
						<td><B>是否必须</B></td>
						<td><B>参数说明</B></td>
					</tr>
					<%
						for (ServiceParameterInfo s : list)
						{
							if (s.getType() == 1)
							{
					%>
					<tr>
						<td><%=s.getName()%></td>
						<td><%=s.getDataType()%></td>
						<td><%=s.getMaxLength() == null ? "" : s.getMaxLength()%></td>
						<td><%=s.getDefaultValue() == null ? "" : s
							.getDefaultValue()%></td>
						<td><%=s.getIsNull() == 1 ? "是" : "否"%></td>
						<td><%=s.getParameterDesc() == null ? "" : s
							.getParameterDesc()%></td>
					</tr>
					<%
						}
					%>
					<%
						}
					%>
				</table>
			</div>
			<div class="panel panel-default">
				<div class="panel-heading">
					<span class="label label-danger">示例代码</span>
				</div>
				<div class="panel-body">
					<B>JSONP方式:</B>
					<pre class=”prettyprintlinenumsLang-js”>

function getData() {
  var requestUrl ='<%=info.getShowURL()%>';
  var param = {
  <%
						ServiceParameterInfo s = null;
						for (int i = 0; i < list.size(); i++)
						{
							s = list.get(i);
							if (s.getType() == 0)
							{
					%>
  	<%=s.getName()%>:'请求参数'<%=i == (list.size() - 1) ? "" : ","%>
  <%
  	}
  	}
  %>
  };
  $.ajax({
    url: requestUrl,
    dataType : 'jsonp',
    jsonp : "jsonpcallback",
    data : param,
    success : function(data) {
      //返回成功处理返回消息
      //....
    },
    error : function(response) {
      //异常处理
    },
    timeout:6000
  });
}
</pre>
				</div>
			</div>
</body>
</html>