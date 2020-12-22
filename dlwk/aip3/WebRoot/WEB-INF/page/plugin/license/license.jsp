<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="${ctx }/resources/jquery/jquery-1.11.2.min.js"></script>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="${ctx}/page/plugin/license/css/license.css"/>
<title>产品授权</title>
</head>
<style>
	html{	
    	background:url(${ctx }/page/welcome/index/images/p2_background@2x.png);
    	background-size: 100%;
    	background-repeat: no-repeat;
    	background-attachment: fixed;
    	background-position: top 60px left;
	}
	body{
		background:rgba(255,255,255,0) !important;
	}
</style>
<body>
      <div style="text-align:center;margin:0 auto;padding-top:60px;"><h1 id="msg">产品授权</h1></div>
      <div style="text-align:center;margin:0 auto;padding-top:20px;">请尽快获取license授权文件;</div>
      <div style="text-align:center;margin:0 auto;padding-top:0px;">请点击下方按钮生成rawInfo文件，然后发送至售后中心获取授权文件license;</div>
      <div style="text-align:center;margin:0 auto;padding-top:0px;">获取的授权文件license放置到license文件夹下。</div>
      
   <div style="text-align:center;margin:0 auto;padding-top:100px; ">  <a href="javascript:;" class="button button-royal button-rounded button-giant" id="authFile">授权文件</a></div>
  
</body>
<script type="text/javascript">
   var endDate = '${endDate}';
   var ctx = '${ctx}';
</script>
<script type="text/javascript" src="${ctx }/common/javascript/util.js"></script>
<script type="text/javascript" src="${ctx}/page/plugin/license/js/license.js"></script>
<script src="js/license.js"></script>
</html>