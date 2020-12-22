var resizeWindow = function() {
	$("#desktop").css({
		width : $(window).width(),
		height : $(window).height() - 38,
	});
	$("#tabs .tab").css({
		width : $(window).width(),
		height : $(window).height() - 38,
	});
	$(document.body).css({
		backgroundImage : "url('/download" + image + "')"
	});
	$(".backgroundImage").attr({
		src : '/download/' + image
	}).css({
		width : $(window).width(),
		height : $(window).height() - 38,
	});
};
$(function() {
	if (image == "" && images.length > 0) {
		image = images[0].imageUrl;
	}
	$(window).resize(resizeWindow);
	resizeWindow();
});

function appIconClick(e) {
	if (!$(this).hasClass("unlock")) {
		return;
	}
	if ($(this).children("b").hasClass("b_on")) {
		$("a#" + $(this).attr("id"), $("#desktop_liquid_gallery")).remove();
	} else {
		$(this).clone().removeClass("unlock").appendTo(
				$("ul", $("#desktop_liquid_gallery")));
	}
	$(this).children("b").toggleClass("b_on");
	makeGallery("desktop_liquid_gallery");
	$("#desktop_liquid_gallery li").sortable({
		items : "> a",
		update : saveUserSetting
	});
	saveUserSetting();
}

function appList(show) {
	if (show !== true && $("#app_list").is(":visible")) {
		$("#app_list").fadeOut();
	} else if (show === true && $("#app_list").is(":visible")) {
		return;
	} else {
		$("#app_list").css("top", $(window).height()).show().animate({
			top : 38
		}, 1000);
	}
}

function appSearch(text) {
	$("li", $("#app_list_gallery")).remove();
	var $ul = $("#slides", $("#app_list_gallery"));
	$(icons).each(
			function() {
				if (this.name.indexOf(text) == -1 && text != "") {
					return;
				}
				$a = $("<a></a>").attr({
					title : this.name,
					id : this.id,
					url : this.appUrl
				}).click(appIconClick).addClass("unlock").append(
						$("<img>").attr({
							src : "/download" + this.iconUrl
						})).append($("<span></span>").html(this.name)).append(
						$("<b></b>")).appendTo($ul);
				for (var i = 0; i < liquids.length; i++) {
					if (this.id == liquids[i]) {
						$a.find("b").addClass("b_on");
					}
				}
				for (var i = 0; i < solids.length; i++) {
					if (this.id == solids[i]) {
						$a.removeClass("unlock").find("b").addClass("b_on");
					}
				}
			});
	makeGallery("app_list_gallery");
	appList(true);
}

function iconClick() {
	var url = $(this).attr("url");
	if (url && url.substring(0, 1) != "#")
		window.open(url);
}

// 应用中心初始化
$(function() {
	var $ul = $("#slides", $("#app_list_gallery"));
	$(icons).each(
			function() {
				$a = $("<a></a>").attr({
					title : this.name,
					id : this.id,
					url : this.appUrl
				}).click(appIconClick).addClass("unlock").append(
						$("<img>").attr({
							src : "/download" + this.iconUrl
						})).append($("<span></span>").html(this.name)).append(
						$("<b></b>")).appendTo($ul);
				for (var i = 0; i < liquids.length; i++) {
					if (this.id == liquids[i]) {
						$a.find("b").addClass("b_on");
					}
				}
				for (var i = 0; i < solids.length; i++) {
					if (this.id == solids[i]) {
						$a.removeClass("unlock").find("b").addClass("b_on");
					}
				}
			});
	$(liquids).each(
			function() {
				var as = $("a", $("#app_list_gallery"));
				for (var i = 0; i < as.length; i++) {
					if (as[i].id == this) {
						$("#desktop_liquid_gallery").find("ul").append(
								$(as[i]).clone().find("b").removeClass("b_on")
										.parent().click(iconClick));
					}
				}
			});
	$(solids).each(
			function() {
				var as = $("a", $("#app_list_gallery"));
				for (var i = 0; i < as.length; i++) {
					if (as[i].id == this) {
						$("#desktop_solid_gallery").append(
								$(as[i]).clone().find("b").removeClass("b_on")
										.parent().click(iconClick));
					}
				}
			});
	var width = $(window).width() - 400;

	{// 桌面应用列表
		$("#desktop_liquid").css({
			margin : "0px auto",
			overflow : "hidden",
			position : "relative"
		});
		$("#desktop_liquid_gallery").width(width).height(
				$(window).height() - 298).find("ul").width(width).height(
				$(window).height() - 338);
		makeGallery("desktop_liquid_gallery");
		$("#desktop_liquid_gallery li").sortable({
			items : "> a",
			update : saveUserSetting
		});
	}

	{// 桌面固定应用列表
		$("#desktop_solid_gallery").sortable({
			items : "> a",
			update : saveUserSetting
		});
	}

	{// 应用列表
		$("#app_list_gallery").width(width).find("ul").width(width).height(
				$(window).height() - 78);
		makeGallery("app_list_gallery");
	}
});

function saveUserSetting() {
	liquids = [];
	solids = [];
	$("a", $("#desktop_liquid_gallery")).each(function() {
		liquids.push($(this).attr("id"));
	});
	$("a", $("#desktop_solid_gallery")).each(function() {
		solids.push($(this).attr("id"));
	});

	$.ajax({
		type : "POST",
		url : getHandlerRequestUrl() + "sys/userSettingHandler/save",
		data : {
			backgroundImageUrl : image,
			liquidIconSequence : liquids.join(","),
			solidIconSequence : solids.join(",")
		}
	});
}

// 首页天气
function add_zero(temp) {
	if (temp < 10)
		return "0" + temp;
	else
		return temp;
}
var d = new Date();
var week;
switch (d.getDay()) {
case 1:
	week = "星期一";
	break;
case 2:
	week = "星期二";
	break;
case 3:
	week = "星期三";
	break;
case 4:
	week = "星期四";
	break;
case 5:
	week = "星期五";
	break;
case 6:
	week = "星期六";
	break;
default:
	week = "星期天";
}
var years = d.getFullYear();
var month = add_zero(d.getMonth() + 1);
var days = add_zero(d.getDate());
var hours = add_zero(d.getHours());
var minutes = add_zero(d.getMinutes());
var seconds = add_zero(d.getSeconds());
// var ndate = "当前时间：" + years + "年" + month + "月" + days + "日 " + hours + ":" +
// minutes + ":" + seconds + " " + week;

if (hours <= "12") {
	var sxw = "上午";
} else {
	var sxw = "下午";
}

$(function() {
	$("#times").html(
			"<b>" + hours + ":" + minutes + "</b><span>" + sxw + "</span><u>"
					+ month + "月" + days + "日 " + week + "</u>");
	getWeather();
});

function getWeather() {
	$
			.ajax({
				url : getHandlerRequestUrl() + "sys/indexHandler/doWeather",
				type : 'get',
				cache : false,
				dataType : 'html',
				success : function(result) {
					result = eval("(" + result + ")");
					var wdStr = "";
					var weather = "";
					var city = result.weatherinfo.city;
					var imgUrl = "";
					if (result.weatherinfo.week == "星期一") {
						wdStr = result.weatherinfo.temp1;
						weather = result.weatherinfo.weather1;
					} else if (result.weatherinfo.week == "星期二") {
						wdStr = result.weatherinfo.temp2;
						weather = result.weatherinfo.weather2;
					} else if (result.weatherinfo.week == "星期三") {
						wdStr = result.weatherinfo.temp3;
						weather = result.weatherinfo.weather3;
					} else if (result.weatherinfo.week == "星期四") {
						wdStr = result.weatherinfo.temp4;
						weather = result.weatherinfo.weather4;
					} else if (result.weatherinfo.week == "星期五") {
						wdStr = result.weatherinfo.temp5;
						weather = result.weatherinfo.weather5;
					} else if (result.weatherinfo.week == "星期六") {
						wdStr = result.weatherinfo.temp6;
						weather = result.weatherinfo.weather6;
					} else if (result.weatherinfo.week == "星期天") {
						wdStr = result.weatherinfo.temp7;
						weather = result.weatherinfo.weather7;
					}
					if (weather == "晴") {
						imgUrl = "<img src=\"images/index/weather/sunny.png\" />";
					} else if (weather == "阴") {
						imgUrl = "<img src=\"images/index/weather/m-cloudy-night.png\" />";
					} else if (weather.indexOf("多云") > -1) {
						imgUrl = "<img src=\"images/index/weather/partly-cloudy.png\" />";
					} else if (weather.indexOf("雨") > -1) {
						imgUrl = "<img src=\"images/index/weather/sunny.png\" />";
					} else if (weather.indexOf("雪") > -1) {
						imgUrl = "<img src=\"images/index/weather/sunny.png\" />";
					}
					$("#weather").html(
							'<b>' + wdStr + '</b><span>' + imgUrl + '<br/>'
									+ result.weatherinfo.city + '<br />'
									+ weather + '</span><u></u>');
				}
			});
}

$(function() {
	$('#userMenu,#user').bind({
		'mouseenter' : function() {
			if (!$('#userMenu').is(":visible")) {
				$('#userMenu').slideDown(200);
				$('#imageMenu').hide();
			}
			try {
				clearTimeout(timer);
			} catch (e) {
			}
		},
		'mouseleave' : function() {
			timer = setTimeout(function() {
				$('#userMenu').hide();
			}, 200);
		}
	});
	$('#imageMenu,#skin').bind({
		'mouseenter' : function() {
			if (!$('#imageMenu').is(":visible")) {
				$('#imageMenu').slideDown(200);
				$('#userMenu').hide();
			}
			try {
				clearTimeout(timer);
			} catch (e) {
			}
		},
		'mouseleave' : function() {
			timer = setTimeout(function() {
				$('#imageMenu').hide();
			}, 200);
		}
	});
});

// 初始化换肤
$(function() {
	$(images).each(function() {
		if (!this.appId || this.appId.indexOf("sys") == -1) {
			return true;
		}
		$("<a></a>").html(this.name).attr({
			"href" : "#none",
			url : this.imageUrl
		}).click(function() {
			image = $(this).attr("url");
			resizeWindow();
			saveUserSetting();
		}).appendTo($("#imageMenu"));
	});
});

// 用户信息
function userInfo() {
	$.ajax({
		url : getHandlerRequestUrl() + "sys/indexHandler/loadUserInfo",
		type : 'get',
		dataType : 'json',
		success : function(r, a) {
			$('#userInfo').modal({
				containerCss : {
					height : 400,
					width : 500
				},
				onClose : function(dialog) {
					$("body").css("overflow", "auto"); // 释放body的滑动条
					$.modal.close();
				}
			});
		}
	});
}

// 用户信息
function passwd1() {
	$('#passwd').modal({
		containerCss : {
			height : 400,
			width : 500
		},
		onClose : function(dialog) {
			$("body").css("overflow", "auto"); // 释放body的滑动条
			$.modal.close();
		}
	});
}

function passwd2() {
	var old = $("#passwd_old").val();
	var newP = $("#passwd_new").val();
	var newP2 = $("#passwd_new2").val();

	if (newP != newP2) {
		alert("两次密码输入不一致");
		return;
	}

	$.ajax({
		url : getHandlerRequestUrl() + "sys/indexHandler/passwd",
		type : 'post',
		dataType : 'html',
		cache : false,
		data : {
			"old" : old,
			"new" : newP
		},
		success : function(r, a) {
			r = eval("(" + r + ")");
			if (r.success === true) {
				$("body").css("overflow", "auto"); // 释放body的滑动条
				$.modal.close();
			} else {
				alert(r.msg);
			}
		},
		error : function() {
			alert("系统异常");
		}
	});
}

function modify() {
	document.getElementById("emailAddress1").style.display = "none";
	document.getElementById("emailAddress2").style.display = "block";
	document.getElementById("telphone1").style.display = "none";
	document.getElementById("telphone2").style.display = "block";
	document.getElementById("saveButton").disabled = false;
	document.getElementById("titleImage1").style.display = "none";
	document.getElementById("titleImage2").style.display = "block";
	document.getElementById("titleImageUpload").style.display = "block";
	return;
}

function saveModify() {
	var emailAddress = $("#emailAddress").val().replace(" ", "");
	var telphone = $("#telphone").val().replace(" ", "");
	if (!emailAddress == "") {
		var reg1 = /^\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\;\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*(\;)*\s*$/;
		if (!reg1.test(emailAddress)) {
			alert(emailAddress + "不是有效的email地址，请输入有效的E_mail！");
			$("#emailAddress").focus();
			return;
		} else if (emailAddress.length > 50) {
			alert("电子邮件最大长度不能超过50个字符！");
			$("#emailAddress").focus();
			return;
		}
	}
	if (!telphone == "") {
		var reg2 = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
		if (!reg2.test(telphone)) {
			alert(telphone + "不是有效的电话号码，请输入有效的电话号码!");
			$("#telphone").focus();
			return;
		} else if (telphone.length > 20) {
			alert("联系电话最大长度不能超过20个字符！");
			$("#telphone").focus();
			return;
		}
	}
	$('#userInfoForm')[0].action = getHandlerRequestUrl()
			+ "sys/indexHandler/userInfoModify";
	$('#userInfoForm')[0].submit();
	$("body").css("overflow", "auto"); // 释放body的滑动条
	$.modal.close();
}

UpLoadFileCheck = function() {
	this.AllowExt = ".jpg,.gif,.bmp";// 允许上传的文件类型 0为无限制 每个扩展名后边要加一个"," 小写字母表示
	this.AllowImgFileSize = 0;// 允许上传文件的大小 0为无限制 单位：KB
	this.AllowImgWidth = 0;// 允许上传的图片的宽度 0为无限制 单位：px(像素)
	this.AllowImgHeight = 0;// 允许上传的图片的高度 0为无限制 单位：px(像素)
	this.ImgObj = new Image();
	this.ImgFileSize = 0;
	this.ImgWidth = 0;
	this.ImgHeight = 0;
	this.FileExt = "";
	this.ErrMsg = "";
	this.IsImg = false;// 全局变量
};

UpLoadFileCheck.prototype.CheckExt = function(obj) {
	this.ErrMsg = "";
	this.ImgObj.src = obj.value;
	if (obj.value == "") {
		this.ErrMsg = "\n请选择一张照片";
	} else {
		this.FileExt = obj.value.substr(obj.value.lastIndexOf("."))
				.toLowerCase();
		if (this.AllowExt != 0 && this.AllowExt.indexOf(this.FileExt) == -1)// 判断文件类型是否允许上传
		{
			this.ErrMsg = "\n该文件类型不允许上传。请上传 " + this.AllowExt
					+ " 类型的文件，当前文件类型为" + this.FileExt;
		}
	}
	if (this.ErrMsg != "") {
		this.ShowMsg(this.ErrMsg, false);
		return false;
	} else
		return this.CheckProperty(obj);
};

UpLoadFileCheck.prototype.CheckProperty = function(obj) {
	if (this.ImgObj.readyState != "complete")//
	{
		sleep(1000);// 一秒使用图能完全加载
	}
	this.ImgFileSize = Math.round(this.ImgObj.fileSize / 1024 * 100) / 100;// 取得图片文件的大小
	if (this.AllowImgFileSize != 0 && this.AllowImgFileSize < this.ImgFileSize)
		this.ErrMsg = this.ErrMsg + "\n文件大小超过限制。请上传小于" + this.AllowImgFileSize
				+ "KB的文件，当前文件大小为" + this.ImgFileSize + "KB";

	if (this.ErrMsg != "") {
		this.ShowMsg(this.ErrMsg, false);
		return false;
	} else
		return true;
};

UpLoadFileCheck.prototype.ShowMsg = function(msg, tf) {
	alert(msg);
};
function sleep(num) {
	var tempDate = new Date();
	var tempStr = "";
	var theXmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	while ((new Date() - tempDate) < num) {
		tempStr += "\n" + (new Date() - tempDate);
		try {
			theXmlHttp.open("get", "about:blank?JK=" + Math.random(), false);
			theXmlHttp.send();
		} catch (e) {
			;
		}
	}
	// containerDiv.innerText=tempStr;
	return;
}

function imageCheck(obj) {
	var d = new UpLoadFileCheck();
	d.IsImg = true;
	d.AllowImgFileSize = 100;
	// d.CheckExt(obj);
}