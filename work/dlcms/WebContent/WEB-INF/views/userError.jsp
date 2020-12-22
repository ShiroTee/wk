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

	<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/index.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
    <script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>
	<script src="<%=basePath%>r/cms/Js/des.js" type="text/javascript"></script>
	<script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
	<script src="<%=basePath%>r/cms/front.js" type="text/javascript"></script>
	<script type="text/javascript" >
	 	$(document).ready(function($){
			var caFlag = "${caFlag}";
			if(caFlag=="caFlag") {
				alert("CA认证失败！请检查UKEY是否正确插入且是否处于正常服务状态？");
				$("#login").click();
			}
			$("#tab2").tabso({                    //要切换的标签
				cntSelect:"#tab_con2",             //要切换的内容
				tabEvent:"mouseover",              //要触发的事件
				tabStyle:"fade",				   //要实现的动画效果
				onStyle:"current"				   //添加样式
			});
			$(".close").click(function(){
				$(this).parent().parent().hide();
				$("#fade").hide();
				});
			$(".closeBtn").click(function() {
				location.reload();
			  });
			showlogin_new();
		});
	
	 	function showlogin_new(){
			var obj = $("#light_1");
			var x = ($(window).width()- obj.width())/2;
			var y = ($(window).height()-obj.height())/2;
			obj.css("top",y).css("left",x);  
			obj.show();
			refreshCaptcha();
			//document.body.bgColor="#ECF5FA";
			$("#fade_new").show();
		}
	 
	 	function refreshCaptcha() {
			var o = document.getElementById("imgcaptcha").src = "/captcha.svl?d="+ new Date() * 1 + "";
		}


        function ligin_submit(formObj){
            var yhm = formObj.yhm.value ;
            var scode = formObj.scode.value ;
            var captcha = formObj.captcha.value ;

            if(!Cms.isNotBlank(yhm, scode,captcha)){
                if(yhm.length == 0){
                    alert("登录用户名未填写！");
                }else	if(scode.length == 0){
                    alert("登录密码未填写！");
                }else if(captcha.length == 0){
                    alert("验证码未填写！ ");
                }
                return false;
            }

            getKey(yhm,scode,captcha);

            return false;
        }


        function getKey(yhm,scode,captcha) {
            $.ajax({
                url: "/getUserKey.jspx",
                dataType: 'json',
                success: function (datas) {
                    if(datas){
                        var str=datas.split("_@@_");
                        var data=str[0];
                        var key=str[1];
                        yhm= strEnc(yhm,data,data,data);
                        scode= strEnc(scode,data,data,data);
                        $.ajax({
                            type: "post",
                            url: '/rdplogin_dialog.jspx',
                            async: false,
                            data: {"yhm": yhm, "scode": scode, "captcha": captcha,'key':key},
                            dataType: 'text',
                            success: function (results) {
                               var result = eval("(" + results + ")") ;;
                                if(result.success){
                                    location.reload();
                                }else{
                                    refreshCaptcha();
                                    formObj.yhm.value = "";
                                    formObj.captcha.value = "";
                                    formObj.scode.value="";
                                    formObj.scode.focus() ;
                                    $("#scode").val("");
                                    alert(result.error) ;
                                }
                            },
                            error: function () {
                                alert("系统出现异常，请联系管理员！");
                            }
                        });
                    }else {
                        $("#isComplete").html("<font color='red'>登录出现问题，稍后请重试！</font>");
                    }
                },
                error: function (response) {
                    alert(response.statusText);
                },
                timeout: 60000
            });

        }

	  	function clear_tip(formObj){
		    refreshCaptcha();
			formObj.yhm.value = "";
			formObj.captcha.value = "";
			formObj.scode.value="";
			$("#scode").val("");
			newstr_length=0;
			newstr="";
			formObj.scode.focus() ;
		}
		function imgClick() {
		 	window.location.href = "/logout.jspx?returnUrl=/";
	 	}
	 	function goback(){
		 	window.location.href = "/";
	 	}
 	</script>

	<style type="text/css">
	    body,h1,h2,h3,h4,h5,h6,p,input,tr,dl,dt,dd,ul,li,img{margin:0px; padding:0px; list-style:none; border:none;}
		table,th,td,tr{margin:0px; padding:0px; list-style:none;}
		body{ font-size:14px; color:#464646; font-family:"微软雅黑";}
		a{text-decoration:none; color:#464646;}
		input{cursor:pointer; font-family:"微软雅黑";}
		.clear{clear:both;}
	    #scode{left:100px;}
	    #scode1{left:100px;opacity:0;filter:alpha(opacity=0);z-index:2;font-size: x-small;}
	    .black_overlay_new{ display: none; position:fixed; top: 0%; left: 0%; width: 100%; min-height:1000px; height: 100%;background-color:#ECF5FA; z-index:1001; -moz-opacity: 0.5; opacity:.50; filter: alpha(opacity=100); } 
		.hidden::-ms-reveal { display: none; }
	</style>
</head>
<body>
	<!--第一个win-->
  	<div id="light_1" class="white_content">
  		<h1>登录<a href = "javascript:goback();" class="close"><img src="<%=basePath%>r/cms/Images/close.png" /></a></h1>
    	<div class="warp" style="padding:0;margin:auto;">
    		<div id="tab_con2" style="">
       			<table width="100%">
       				<form onsubmit="return ligin_submit(this);" id="formObj">
       				<tr><td class="one">用户名：</td><td><input type="text" name="yhm" id="yhm" autocomplete="off"/></td></tr>
           			<tr><td class="one">密&nbsp;&nbsp;&nbsp;码：</td><td> 
	    				<input type="password" id="scode" name="scode"/>
          				</td></tr>
            			<tr><td class="one">验证码：</td><td>
            				<input type="text" name="captcha" id="checkCode" autocomplete="off"/>
            	 			<input type="hidden" name="loginType" value="1"/>
            				<img onclick="refreshCaptcha();" id="imgcaptcha" style="width: 65px; height: 30px; vertical-align: middle;"/>
					</td></tr>
           			<tr><td colspan="2"><input type="submit" value="登录" class="sbt sbt1"/><input type="button" value="重置" class="res" onclick="clear_tip(formObj);"/></td></tr>
   					</form>
       			</table>
    		</div>
    	</div>
   	</div>
	<div id="fade_new" class="black_overlay_new"></div> 
	<div class="clear"></div>
</body>
</html>