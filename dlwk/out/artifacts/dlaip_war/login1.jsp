<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<title>用户登录</title>
<LINK href="css/Default.css" type=text/css rel=stylesheet>
<LINK href="css/xtree.css" type=text/css rel=stylesheet>
<LINK href="css/User_Login.css" type=text/css rel=stylesheet>
<script type="text/javascript"
	src="resource/scripts/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="resource/scripts/jquery.messager.js"></script>
<script language="javascript">
var isFullScreem = false;
function onResit()
{
	document.getElementById("loginUserName").value = "";
	document.getElementById("loginPassword").value = "";
}
window.onload = function run()
{
	//检测浏览器名及版本
	var browser =
	{
		msie : false,
		firefox : false,
		opera : false,
		safari : false,
		chrome : false,
		netscape : false,
		appname : 'unknown',
		version : 0
	}, userAgent = window.navigator.userAgent.toLowerCase();
	if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent))
	{
		//RegExp.$1正则表达式的第一个匹配项,第一个括号
		browser[RegExp.$1] = true;
		browser.appname = RegExp.$1;
		//RegExp.$2正则表达式的第二个匹配项,第二个括号
		browser.version = RegExp.$2;
	} else if (/version\D+(\d[\d.]*).*safari/.test(userAgent))
	{ // safari 
		browser.safari = true;
		browser.appname = 'safari';
		browser.version = RegExp.$2;
	}
	var str1 = browser.appname + browser.version;
	if (str1 == "msie8.0"||str1=="msie9.0"||str1=="chrome27.0.1453.94")
	{
		isFullScreem = true;
	}
};
//全屏打开页面
function fullScreemOpenPage(url)
{
	if (this.name != 'fullscreen')
	{

		window.open(url, 'fullscreen', 'fullscreen,scrollbars');
		window.opener = null;
		window.open("", "_self");
		window.close();

	}
}

function login(obj)
{	obj.disabled="disabled";
	document.getElementById("errorMsg").innerHTML =" <centr><font color='red' size='2px;'>正在登陆请稍后...</font></centr>";
	var loginName = document.getElementById("loginName").value;
	var loginPassword = document.getElementById("loginPassword").value;
	if (loginName == "")
	{
		var msg = "用户名不能为空";
		document.getElementById("errorMsg").innerHTML = "<centr><font color='red' size='2px;'>"
			+"信息提示:  "+ msg + "</font></centr>";
		obj.disabled="";
		document.getElementById("loginName").focus(true,100);
		return false;
	}if(loginPassword == ""){
		var msg = "密码不能为空";
		document.getElementById("errorMsg").innerHTML = "<centr><font color='red' size='2px;'>"
			+"信息提示:  "+ msg + "</font></centr>";
		obj.disabled="";
		document.getElementById("loginPassword").focus(true,100);
		return false;
	}
	$
	.ajax(
	{
		url : 'app/http/ums/loginHandler/login?number=' + Math
				.random(),

		type : 'POST',

		data :
		{
			loginName : loginName,
			loginPassword : loginPassword
		},

		dataType : 'json',

		timeout : 30000,

		error : function()
		{
			alert('请求超时');
		},

		success : function(result,action)
		{
			if (result.success)
			{
				document.location.href = "index.jsp";
			} else
			{
				document.getElementById("errorMsg").innerHTML = "<centr><font color='red' size='2px;'>"
					+"信息提示:"+ result.msg + "</font></centr>";
				document.getElementById("loginName").value = "";
				document.getElementById("loginPassword").value = "";
				obj.disabled="";
				document.getElementById("loginName").focus();

			}
		}

	});
}

document.onkeydown=function(event){ 
    e = event ? event :(window.event ? window.event : null); 
    if(e.keyCode==13){ 
        login(this);
    }
}
</script>
</HEAD>
<BODY id=userlogin_body>
	<DIV></DIV>

	<DIV id=user_login>
		<DL>
			<DD id=user_top>
				<UL>
					<LI class=user_top_l></LI>
					<LI class=user_top_c></LI>
					<LI class=user_top_r></LI>
				</UL>
			<DD id=user_main>
				<UL>
					<LI class=user_main_l></LI>
					<LI class=user_main_c>
						<DIV class=user_main_box>
							<UL>
								<LI class=user_main_text>用户名：</LI>
								<LI class=user_main_input><INPUT class=TxtUserNameCssClass
									id="loginName" maxLength=20 name="loginName"></LI>
							</UL>
							<UL>
								<LI class=user_main_text>密 码：</LI>
								<LI class=user_main_input><INPUT class=TxtPasswordCssClass
									id="loginPassword" type=password name="loginPassword"></LI>
							</UL>
							<br/>
								<br/>
							<div id="errorMsg"></div>
						</DIV>
					</LI>
					<LI class=user_main_r><INPUT class=IbtnEnterCssClass
						id=IbtnEnter
						style="BORDER-TOP-WIDTH: 0px; BORDER-LEFT-WIDTH: 0px; BORDER-BOTTOM-WIDTH: 0px; BORDER-RIGHT-WIDTH: 0px"
						onclick='login(this);'
						type=image src="images/user_botton.gif" name=IbtnEnter></LI>
				</UL>
			<DD id=user_bottom>
				<UL>
					<LI class=user_bottom_l></LI>
					<LI class=user_bottom_c></LI>
					<LI class=user_bottom_r></LI>
				</UL>
			</DD>
		</DL>
	</DIV>
	<SPAN id=ValrUserName style="DISPLAY: none; COLOR: red"></SPAN>
	<SPAN id=ValrPassword style="DISPLAY: none; COLOR: red"></SPAN>
	<SPAN id=ValrValidateCode style="DISPLAY: none; COLOR: red"></SPAN>
	<DIV id=ValidationSummary1 style="DISPLAY: none; COLOR: red"></DIV>

	<DIV></DIV>

	</FORM>
</BODY>
</HTML>
