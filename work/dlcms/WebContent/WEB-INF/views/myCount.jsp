<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
   String basePath =  request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8;">
<title>个人信息  - 大理市信息资源管理中心</title>

		<link href="<%=basePath%>r/cms/Css/base.css" rel="stylesheet" type="text/css"/>
		<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath%>r/cms/Css/footer.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
        <link href="<%=basePath%>r/cms/Css/tooltips.css" rel="stylesheet" type="text/css" />
		
		<script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>
		<script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
		<script src="<%=basePath%>r/cms/Js/simplefoucs.js" type="text/javascript"></script>
	    <script src="<%=basePath%>ap/js/globalInterfaceDomain.js" type="text/javascript"></script>
		<script src="<%=basePath%>resourceList/Js/utils.js" type="text/javascript"></script>
		<script src="<%=basePath%>resourceList/Js/myCount.js" type="text/javascript"></script>
		<!-- 分页控件开始 -->
		
		<script type="text/javascript" src="<%=basePath%>r/cms/pager/js/kkpager.min.js"></script>
		<link  href="<%=basePath%>r/cms/pager/css/kkpager.css" rel="stylesheet" type="text/css"/>
		
		<script type="text/javascript" >
			var userId="${userId}";
		 	function getURL() {
				return  "${platformAdd}/service/api/sps/";
			}
		</script>
<style type="text/css">
	table {width:100%;background:#c1c1c1;text-align:center;border-bottom:0px;}
	table tr {height:38px;line-height:38px;}
	table tr:hover td {background: #f8fbfe;}
	table th {background:url(<%=basePath%>r/cms/Images/th_bg.jpg) repeat-x;}
	table td {background:#fff;}
</style>


</head>
<body>
<%@ include file="include/head.jsp"%>
<script type="text/javascript">
$("#grxx").addClass("current2");
</script>
<div class="warp_content">
	<div class="warp_tit">您现在正在浏览： 
	<a href="/">首页</a>
	<span>&gt;</span><a href="/csdsc/personInformationAct.jhtml">个人信息</a>
	<span>&gt;</span>我的统计
	</div>

	<div class="warp_left">
    <h2>个人信息</h2>
	<ul>
		<li><a href="/csdsc/personInformationAct.jhtml">基本信息</a></li>		
		<li><a href="/csdsc/myApprovalAct">我的申请</a></li>
		<li><a href="/csdsc/myTodoAct?type=1">我的待办</a></li>
		<li><a href="/csdsc/myTodoAct?type=2">我的已办</a></li>
		<li><a class="current" href="/csdsc/myCountAct">我的统计</a></li>
	</ul>
	</div>

	<div class="warp_right">
		<div class="tit">
        	<h3><label id="bt">我的统计</label></h3>
        </div>
		<table id="myApproval" cellspacing="1" class="myApproval">
			<thead>
				<tr>
					<th width="33%">申请数量</th>
					<th width="33%">待办数量</th>
					<th width="34%">已办数量</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td width="33%"><a id="td1"/></td>
					<td width="33%"><a id="td2"/></td>
					<td width="34%"><a id="td3"/></td>
				</tr>
			</tbody>
		</table>
	</div>  
</div> 
</body>
<%@ include file="include/bottom.jsp"%>
</html>