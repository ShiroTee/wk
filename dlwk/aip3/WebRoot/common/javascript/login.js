/**
 * Created by Administrator on 2017/3/9.
 */
var clearCode;
$(function()
{
	if(!mycookie('referrer') && document.referrer.length > 0){
		mycookie('referrer',document.referrer,{ path: '/'})
	}
	function doEncrypt(v)
	{
		var result = "";
		for (var i = 0; i < v.length; i++)
		{
			var tmpch = v.charCodeAt(i);
			tmpch ^= 1;
			tmpch ^= 0xa;
			result += tmpch.toString(16);
		}
		return result.toUpperCase();
	}
	;
	var section = $("body section:eq(1)");
	section.find("input[type='button']").click(function()
	{
		var password1 = section.find("input[type='password']:eq(0)").val();
		var password2 = section.find("input[type='password']:eq(1)").val();
		if (password1 != password2)
		{
			$.alert("两次密码不同!");
			section.find("input[type='password']:eq(1)").val("");
			section.find("input[type='password']:eq(0)").val("");
			section.find("input[type='password']:eq(0)").focus();
			return false;
		}
		$.submitData(
		{
			url : "user/unlock.json",
			data :
			{
				password : doEncrypt(password1)
			},
			sucFun : function(data)
			{
				$.alert("修改成功!")
				window.location.reload();
			},
			errorFun : function(data)
			{
				section.find("input[type='password']:eq(1)").val("");
				section.find("input[type='password']:eq(0)").val("");
				section.find("input[type='password']:eq(0)").focus();
				$.alert(data.msg);
			}
		});
	});
	setTimeout(function()
	{
		window.location.reload();
	}, 1000 * 60 * 10);
	/*
	 * // 刷新验证码 $("#refresh-captcha").click(function() {
	 * $("#img-captcha").attr("src", CTX + "/captcha?t=" + Math.random()); });
	 */
	$(document).keydown(function(e)
	{
		if (e.keyCode == 13)
		{
			$("#loginBtn").click();
		}
	});
	$("#loginName").focus();
	if ($("#loginPassword").val() != "")
	{
		$("#loginPassword").keydown(function(e)
		{
			if (e.keyCode == 8)
			{
				$("#loginPassword").val("");
				$("#loginBtn").attr("remberLogin", "0");
				$("#loginPassword").unbind("keydown");
			}
		});
	}
	// 用户登录
	$("#loginBtn")
			.click(
					function()
					{
						// 验证用户名
						var loginName = $("#loginName").val();
						if ("" == loginName)
						{
							setErrorMsg("请输入用户名", $("#loginName"));
							return;
						}
						var loginPassword = $("#loginPassword");
						if ("" == loginPassword.val())
						{
							setErrorMsg("请输入密码", loginPassword);
							return;
						}
						// 要求输入验证码
						var captchaCode = $("#captchaCode").val();
						if ($("#captcha-div").hasClass("show-captcha"))
						{
							if (captchaCode == "")
							{
								setErrorMsg("请输入验证码", $("#captchaCode"));
								return;
							}
						} else
						{
							captchaCode = "captchaCode";
						}
						$(this).attr('disabled', "true").removeClass('enable');
						$(this).val("正在登录...");
						var btn = $(this);
						loginPassword = loginPassword.val();
						var isRember = $("#remember-me").is(':checked');
						if ($("#loginBtn").attr("remberLogin") == 0)
						{
							var webAppKey = $("#loginBtn").attr("webAppKey");
							loginPassword = $.md5(webAppKey + loginName
									+ doEncrypt($("#loginPassword").val()));
							loginPassword = $.base64.btoa(loginName + ":"
									+ webAppKey + ":" + loginPassword + ":"
									+ $("#loginBtn").attr("loginToken") + ":"
									+ captchaCode);
						} else
						{

							var arrays = $.base64.atob(loginPassword)
									.split(":");
							if (arrays.length != 3)
							{
								$("#loginPassword").val("");
								setErrorMsg("密码已失效", $("#loginPassword"));
								$('#loginBtn').removeAttr("disabled").addClass(
										'enable');
								$('#loginBtn').val("登录");
								return;
							}
							loginPassword = arrays[0] + ":" + arrays[1] + ":"
									+ arrays[2] + ":"
									+ $("#loginBtn").attr("loginToken") + ":"
									+ captchaCode;
							loginPassword = $.base64.btoa(loginPassword);
						}
						$
								.submitData(
								{
									url : "login.do",
									data :
									{
										loginName : loginName,
										loginPassword : loginPassword,
										isRember : isRember
									},
									sucFun : function(data)
									{
										var redirectUrl = "welcome/index.html";
										redirectUrl = mycookie('referrer') ? mycookie('referrer') : redirectUrl;
										redirectUrl = mycookie('redirectUrl') ? mycookie('redirectUrl') : redirectUrl;
										mycookie('referrer','',{ path: '/',expires:-1});
										mycookie('redirectUrl','',{ path: '/',expires:-1});
										window.location.href = redirectUrl;
									},
									errorFun : function(data)
									{

										if (data.msg == "请修改初化密码后再使用系统")
										{
											$("body section:eq(0)").hide();
											$("body section:eq(1)").show();
											$
													.alert("系统初始密码不允许登录，请修改为与初始密码不同的密码后再次登录!");
										} else
										{
											document
													.write("<form action='login.html' method='post' name='formx1' style='display:none'>");
											document
													.write("<input type='hidden' name='loginName' value='"
															+ loginName + "'>");
											document
													.write("<input type='hidden' name='loginError' value='"
															+ data.msg + "'>");
											document.write("</form>");
											document.formx1.submit();
											$("form[name='formx1']").remove();
										}

									}
								});
					});
	/*
	 * $("#loginName").focus(function() { if
	 * ($(this).parent().hasClass("am-input-group-danger")) {
	 * $(this).parent().removeClass("am-input-group-danger");
	 * $(this).parent().addClass("am-input-group-success"); } });
	 * $("#loginPassword").focus(function() { if
	 * ($(this).parent().hasClass("am-input-group-danger")) {
	 * $(this).parent().removeClass("am-input-group-danger");
	 * $(this).parent().addClass("am-input-group-success"); } });
	 */

	/*
	 * 清除X的事件
	 */
	$('.login_box div i').on('click', function()
	{
		$(this).hide();
		$(this).prev().val('').focus();
		/*
		 * 清除验证码后需还原状态
		 */
		if ($(this).prev().attr('id') == 'captchaCode')
		{
			clearCode = true;
			$(this).prev().removeClass('right_code').removeClass('error_code')// .unbind('focus');
			$(this).parent().unbind('mouseover').unbind('mouseout');
		}

	})
	/*
	 * 输入后显示清除的X
	 */
	$('#loginName,#loginPassword,#captchaCode').on('keyup', function()
	{
		$(this).next().show();
	})
	/*
	 * 点击更换验证码
	 */
	$('.code_img').on('click', function()
	{
		$(this).find('img').attr('src', CTX + "/captcha?t=" + Math.random());
	});
});
function setErrorMsg(text, input)
{
	// alert(text);
	input.focus();
	var timMsg = $("#tipMsg");
	// timMsg.css("border", "1px solid #e4393c");
	// timMsg.css("background-color", "#ffebeb");
	// text = '<i class="am-icon-minus-circle"></i>&nbsp;&nbsp;' + text;
	timMsg.show().find('span').html(text);
	// input.parent().removeClass("am-input-group-success");
	// input.parent().addClass("am-input-group-danger");
}
