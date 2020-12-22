<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
   String basePath =  request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   	<meta http-equiv="X-UA-Compatible" content="IE=8;">
       <title>信息资源目录 - 大理市信息资源中心</title>
	<script src="/r/cms/front.js" type="text/javascript"></script>
	<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/index.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
      	<script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>
	<script src="<%=basePath%>r/cms/Js/des.js" type="text/javascript"></script>
	<script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
 	<script type="text/javascript" >
 	</script>

	<style type="text/css">
	    body,h1,h2,h3,h4,h5,h6,p,input,tr,dl,dt,dd,ul,li,img{margin:0px; padding:0px; list-style:none; border:none;}
		table,th,td,tr{margin:0px; padding:0px; list-style:none;}
		body{ font-size:14px; color:#464646; font-family:"微软雅黑";}
		a{text-decoration:none; color:#464646;}
		input{cursor:pointer; font-family:"微软雅黑";}
		.clear{clear:both;}
	    .black_overlay_new{ display: none; position:fixed; top: 0%; left: 0%; width: 100%; min-height:1000px; height: 100%;background-color:#ECF5FA; z-index:1001; -moz-opacity: 0.5; opacity:.50; filter: alpha(opacity=100); }
	</style>
</head>
<body>
	<!--第一个win-->
  	<div id="light_1" class="white_content">
  		<h1>登录<a href = "javascript:goback();" class="close"><img src="<%=basePath%>r/cms/Images/close.png" /></a></h1>
    	<div class="warp" style="padding:0;margin:auto;">
    		<div id="tab_con2" style="">
       			<div width="100%">
					存在非法参数，请重新录入。
       			</div>
    		</div>
    	</div>
   	</div>
	<div id="fade_new" class="black_overlay_new"></div> 
	<div class="clear"></div>
</body>
</html>