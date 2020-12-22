<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>信息资产管理-后台应用V3.0</title>
<meta name="description" content="">
<meta name="keywords" content="">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if !IE]> -->
<script src="${ctx}/resources/ace/assets/js/jquery.min.js"></script>
<!-- <![endif]-->
<!--[if IE]>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<![endif]-->
<!--[if !IE]> -->
<script type="text/javascript">window.jQuery || document.write("<script src='${ctx}/resources/ace/assets/js/jquery-2.0.3.min.js'>"+"<"+"script>");</script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='${ctx}/resources/ace/assets/js/jquery-1.10.2.min.js'>"+"<"+"script>");
</script>
<![endif]-->
<script src="${ctx}/common/javascript/util.js"></script>
<script src="${ctx}/common/javascript/cookieUtils.js"></script>
<link rel="stylesheet" href="${ctx }/resources/css/style.css">
<link rel="stylesheet" href="${ctx }/common/css/login.css">

<script>
	var CTX = "${ctx}";
</script>
</head>
<body>

<div class="wrapper">
<header>信息资产管理-后台应用V3.0</header>
<ul class="bg-bubbles">
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
<section >	
    <div class="login_text">用户登录</div>
    <div class="login_box">
    	<div class="bg-bubbles-blur">
    		<ul class="bg-bubbles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
    	</div>
    	<div id="tipMsg">
    		<img src="${ctx }/common/images/error.png" /><span></span>
    	</div>
        <div>
            <input id="loginName"  class="loginName" placeholder="用户名" maxlength="24" autocomplete="off" value="${loginName }">
            <i></i>
        </div>
        <div>
            <input id="loginPassword" class="loginPassword" type="password" placeholder="密码" value="${loginPassword }">
            <i></i>
        </div>
        <% 
        	if(session.getAttribute(Constant.SHOW_CAPTCHA_CODE)!=null){ 
        %>
        	<div id="captcha-div" class="code_box show-captcha">
	        	<div class="code_input">
	                <input id="captchaCode" placeholder="验证码" maxlength="4" autocomplete="off">
	                <i></i>
	            </div>
	            <div class="code_img">
	                <img src="${ctx }/captcha" width="74" height="34">
	            </div>
	        </div>
        <%
        	} 
        %>
            
        <div class="remenber_box">
            <input type="checkbox" id="remember-me" ${checked}>
            <div class="remenber_unchecked" title="公共场所不建议自动登录，以防账号丢失"></div>
            <label for="remember-me" title="公共场所不建议自动登录，以防账号丢失">
            	记住账号
            	<!-- <span id="tipMsg" class="hide">公共场所不建议自动登录，以防账号丢失</span> -->
            </label>
        </div>
        <div>
        	<input id="loginBtn" class="loginBtn enable" type="button" value="登录" loginToken="${loginToken}"
				webAppKey="${WEB_APP_KEY }" remberLogin="${remberLogin }">
		</div>
		
    </div>
</section>
<section style="display: none;">	
    <div class="login_text">修改初始密码</div>
    <div class="login_box">
    	<div class="bg-bubbles-blur">
    		<ul class="bg-bubbles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
    	</div>
    	<div id="tipMsg">
    		<img src="${ctx }/common/images/error.png" /><span></span>
    	</div>
        <div>
            <input placeholder="密码" maxlength="24" autocomplete="off" type="password" class="loginPassword">
            <i></i>
        </div>
        <div>
            <input type="password" placeholder="重复密码" class="loginPassword">
            <i></i>
        </div>
        <div>
        	<input class="loginBtn enable" type="button" value="修改密码">
		</div>
		
    </div>
</section>
</div>
</div>
<footer class="foot">
	    <div class="footIn">
	        <table width="100%" style="font-size: 14px;color: rgba(255, 255, 255, 0.5);text-align: left;">
	        	<tr>
	        		<td width="20%">
	        			<img src="${ctx }/resources/images/footer_dcitssvg.svg">
        			</td>
	        		<td width="20%" rowspan="3"></td>
	        		<td width="20%" rowspan="3"></td>
	        		<td width="20%" rowspan="3">
	        			<a target="_blank" href="http://118.190.17.253:8080/">
							<img src="${ctx }/resources/images/footer_knowledge.png">
						</a></td>
	        		<td width="20%" rowspan="3">
	        			<a target="_blank" href="http://118.190.17.220:5080/">
	        				<img src="${ctx }/resources/images/footer_info.png">
	        			</a>
	        		</td>
	        	</tr>
	        	<tr  style="font-size: 14px;color: rgba(255, 255, 255, 1);">
	        		<td style="font-size: 16px;padding-top: 8px;">
	        			城市级信息资产管理平台
        			</td>
	        	</tr>
	        	<tr  style="font-size: 12px;color: rgba(255, 255, 255, 0.55);">
	        		<td>
	        			Copy Right © DCITS
        			</td>
	        	</tr>
	        </table>
	    </div>
	</footer>
<script src="${ctx}/resources/amui/js/jquery.md5.js"></script>
<script src="${ctx}/resources/amui/js/jquery.cookie.js"></script>
<script src="${ctx}/resources/amui/js/jquery.base64.js"></script>
<script src="${ctx}/common/javascript/login.js"></script>
<script>
$(function()
{
	var loginError="${loginError}";
	if(loginError)
	{
		setErrorMsg(loginError, $("#loginPassword"));
	}
});
</script>
</body>
</html>