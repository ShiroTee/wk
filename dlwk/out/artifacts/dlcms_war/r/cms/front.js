Cms = {};
/**
 * 浏览次数
 */
Cms.viewCount = function(base, contentId, viewId, commentId, downloadId, upId,
		downId) {
	viewId = viewId || "views";
	commentId = commentId || "comments";
	downloadId = downloadId || "downloads";
	upId = upId || "ups";
	downId = downId || "downs";
	$.getJSON(base + "/content_view.jspx", {
		contentId : contentId
	}, function(data) {
		if (data.length > 0) {
			$("#" + viewId).text(data[0]);
			$("#" + commentId).text(data[1]);
			$("#" + downloadId).text(data[2]);
			$("#" + upId).text(data[3]);
			$("#" + downId).text(data[4]);
		}
	});
}
/**
 * 站点流量统计
 */
Cms.siteFlow = function(base, page, referer) {
	/* alert(base + '--' + page + '--' + referer) ; */
	$.get(base + "/flow_statistic.jspx", {
		page : page,
		referer : referer
	});
}
/**
 * 成功返回true，失败返回false。
 */
Cms.up = function(base, contentId, origValue, upId) {
	upId = upId || "ups";
	var updown = $.cookie("_cms_updown_" + contentId);
	if (updown) {
		return false;
	}
	$.cookie("_cms_updown_" + contentId, "1");
	$.get(base + "/content_up.jspx", {
		"contentId" : contentId
	}, function(data) {
		$("#" + upId).text(origValue + 1);
	});
	return true;
}
/**
 * 成功返回true，失败返回false。
 */
Cms.down = function(base, contentId, origValue, downId) {
	downId = downId || "downs";
	var updown = $.cookie("_cms_updown_" + contentId);
	if (updown) {
		return false;
	}
	$.cookie("_cms_updown_" + contentId, "1");
	$.get(base + "/content_down.jspx", {
		contentId : contentId
	}, function(data) {
		$("#" + downId).text(origValue + 1);
	});
	return true;
}
/**
 * 获取附件地址
 */
Cms.attachment = function(base, contentId, n, prefix) {
	$.get(base + "/attachment_url.jspx", {
		"cid" : contentId,
		"n" : n
	}, function(data) {
		var url;
		for ( var i = 0; i < n; i++) {
			url = base + "/attachment.jspx?cid=" + contentId + "&i=" + i
					+ data[i];
			$("#" + prefix + i).attr("href", url);
		}
	}, "json");
}
/**
 * 提交评论
 */
Cms.comment = function(callback, form) {
	form = form || "commentForm";
	$("#" + form).validate({
		submitHandler : function(form) {
			$(form).ajaxSubmit({
				"success" : callback,
				"dataType" : "json"
			});
		}
	});
}
/**
 * 获取评论列表
 * 
 * @param siteId
 * @param contentId
 * @param greatTo
 * @param recommend
 * @param orderBy
 * @param count
 */
Cms.commentList = function(base, c, options) {
	c = c || "commentListDiv";
	$("#" + c).load(base + "/comment_list.jspx", options);
}
/**
 * 客户端包含登录
 */
Cms.loginCsi = function(base, c, options) {
	c = c || "loginCsiDiv";
	$("#" + c).load(base + "/login_csi.jspx", options);
}
/**
 * 向上滚动js类
 */
Cms.UpRoller = function(rid, speed, isSleep, sleepTime, rollRows, rollSpan,
		unitHight) {
	this.speed = speed;
	this.rid = rid;
	this.isSleep = isSleep;
	this.sleepTime = sleepTime;
	this.rollRows = rollRows;
	this.rollSpan = rollSpan;
	this.unitHight = unitHight;
	this.proll = $('#roll-' + rid);
	this.prollOrig = $('#roll-orig-' + rid);
	this.prollCopy = $('#roll-copy-' + rid);
	// this.prollLine = $('#p-roll-line-'+rid);
	this.sleepCount = 0;
	this.prollCopy[0].innerHTML = this.prollOrig[0].innerHTML;
	var o = this;
	this.pevent = setInterval(function() {
		o.roll.call(o)
	}, this.speed);
}
Cms.UpRoller.prototype.roll = function() {
	if (this.proll[0].scrollTop > this.prollCopy[0].offsetHeight) {
		this.proll[0].scrollTop = this.rollSpan + 1;
	} else {
		if (this.proll[0].scrollTop % (this.unitHight * this.rollRows) == 0
				&& this.sleepCount <= this.sleepTime && this.isSleep) {
			this.sleepCount++;
			if (this.sleepCount >= this.sleepTime) {
				this.sleepCount = 0;
				this.proll[0].scrollTop += this.rollSpan;
			}
		} else {
			var modCount = (this.proll[0].scrollTop + this.rollSpan)
					% (this.unitHight * this.rollRows);
			if (modCount < this.rollSpan) {
				this.proll[0].scrollTop += this.rollSpan - modCount;
			} else {
				this.proll[0].scrollTop += this.rollSpan;
			}
		}
	}
}
Cms.LeftRoller = function(rid, speed, rollSpan) {
	this.rid = rid;
	this.speed = speed;
	this.rollSpan = rollSpan;
	this.proll = $('#roll-' + rid);
	this.prollOrig = $('#roll-orig-' + rid);
	this.prollCopy = $('#roll-copy-' + rid);
	this.prollCopy[0].innerHTML = this.prollOrig[0].innerHTML;
	var o = this;
	this.pevent = setInterval(function() {
		o.roll.call(o)
	}, this.speed);
}
Cms.LeftRoller.prototype.roll = function() {
	if (this.proll[0].scrollLeft > this.prollCopy[0].offsetWidth) {
		this.proll[0].scrollLeft = this.rollSpan + 1;
	} else {
		this.proll[0].scrollLeft += this.rollSpan;
	}
}
/**
 * 收藏信息
 */
Cms.collect = function(base, cId, operate, showSpanId, hideSpanId) {
	$.post(base + "/member/collect.jspx", {
		"cId" : cId,
		"operate" : operate
	}, function(data) {
		if (data.result) {
			if (operate == 1) {
				alert("收藏成功！");
				$("#" + showSpanId).show();
				$("#" + hideSpanId).hide();
			} else {
				alert("取消收藏成功！");
				$("#" + showSpanId).hide();
				$("#" + hideSpanId).show();
			}
		} else {
			alert("请先登录");
		}
	}, "json");
}
/**
 * 列表取消收藏信息
 */
Cms.cmsCollect = function(base, cId, operate) {
	$.post(base + "/member/collect.jspx", {
		"cId" : cId,
		"operate" : operate
	}, function(data) {
		if (data.result) {
			if (operate == 1) {
				alert("收藏成功！");
			} else {
				alert("取消收藏成功！");
				$("#tr_" + cId).remove();
			}
		} else {
			alert("请先登录");
		}
	}, "json");
}
/**
 * 检测是否已经收藏信息
 */
Cms.collectexist = function(base, cId, showSpanId, hideSpanId) {
	$.post(base + "/member/collect_exist.jspx", {
		"cId" : cId
	}, function(data) {
		if (data.result) {
			$("#" + showSpanId).show();
			$("#" + hideSpanId).hide();
		} else {
			$("#" + showSpanId).hide();
			$("#" + hideSpanId).show();
		}
	}, "json");
};

//判断字符串是否为空工具方法
Cms.isNotBlank = function(){
	for(var i = 0; i < arguments.length; i++){
		str = arguments[i] ;
		if(str === "" || str == "null" || str === null || str == undefined){
			return false;
		}
	}
	return true ; 
};


/**
 * （热点与最新服务 + 新闻）tab页切换效果--美工
 */
function go_to(ao) {
	var h = document.getElementById("tab").getElementsByTagName("h3");
	var d = document.getElementById("tab_con").getElementsByTagName("div");
    for (var i = 0; i < h.length; i++) {
        if (ao - 1 == i) {
            h[i].className = " up";
            d[i].className = " block newserv";
        } else {
            h[i].className = " ";
            d[i].className = " ";
        };
    };
};


/**
 * （热点与最新服务 + 新闻）tab页切换效果--zhyg
 */
Cms.changeTab_hotpoint = function() {
	var intervalID;
	var curLi;
	$("#hotpoint .nav li a").mouseover(function() {
		curLi = $(this);
		intervalID = setInterval(onMouseOver, 250);// 鼠标移入的时候有一定的延时才会切换到所在项，防止用户不经意的操作
	});
	function onMouseOver() {
		$("#hotpoint .cur-sub-con").removeClass("cur-sub-con");
		$("#hotpoint .sub-con").eq($("#hotpoint .nav li a").index(curLi))
				.addClass("cur-sub-con");
		$("#hotpoint .cur").removeClass("cur");
		curLi.addClass("cur");
	}
	$("#hotpoint .nav li a").mouseout(function() {
		clearInterval(intervalID);
	});

	$("#hotpoint .nav li a").click(
			function() {// 鼠标点击也可以切换
				clearInterval(intervalID);
				$("#hotpoint .cur-sub-con").removeClass("cur-sub-con");
				$("#hotpoint .sub-con").eq(
						$("#hotpoint .nav li a").index(curLi)).addClass(
						"cur-sub-con");
				$("#hotpoint .cur").removeClass("cur");
				curLi.addClass("cur");
			});
};

/**
 * 显示当前系统日期--zhyg
 */
Cms.date = function() {
	var isnMonth = new Array("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月",
			"9月", "10月", "11月", "12月");
	var isnDay = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",
			"星期日");
	today = new Date();
	Year = today.getYear();
	Date = today.getDate();
	if (document.all)
		document.write("今天是: " + Year + "年" + isnMonth[today.getMonth()] + Date
				+ "日" + isnDay[today.getDay()]);
};

/**
 * 通知公告栏滚动函数--zhyg
 */
$.fn.myScroll = function(options) {
	//如果通知条数小10条则不滚动。
	if($("#topnews").find("li").length <= 10){
		return;
	}
	// 默认配置
	var defaults = {
		speed : 70, // 滚动速度,值越大速度越慢
		rowHeight : $("#topnews").find("li:first").height() + 5	// 每行的高度
	};
	var opts = $.extend({}, defaults, options), intId = [];

	function marquee(obj, step) {
		obj.find("ul").animate({
			marginTop : '-=2'
		}, 0, function() {
			var s = Math.abs(parseInt($(this).css("margin-top")));
			if (s >= step) {
				$(this).find("li").slice(0, 1).appendTo($(this));
				$(this).css("margin-top", 0);
			}
		});
	}

	this.each(function(i) {
		var sh = opts["rowHeight"], speed = opts["speed"], _this = $("#topnews");
		intId[i] = setInterval(function() {
			marquee(_this, sh);
		}, speed);
		_this.hover(function() {
			clearInterval(intId[i]);
		}, function() {
			intId[i] = setInterval(function() {
				marquee(_this, sh);
			}, speed);
		});
	});
}

/**
 * 专题专栏图片切换--zhyg
 */
$.fn.topicScroll = function(){
	var i = 0; // 初始化循环参数
	var data = $(this).children();
	var topicChange = function(){
		data.eq(i).css('display', 'block') ;	// 首先将需要显示的图片设置为显示，再进行以下操作，防止中间有间断。
		data.each(	// 将其余所有图片设置隐藏
				function(k){
					if(k != i){
						$(this).css('display', 'none') ;
					}
				}
		) ;
		i++;
		if(i >= data.length){	// 当循环完之后，从头再来。
			i = 0;
		}
	};
	setInterval(topicChange,2000);// 这里调整你的轮换时间，默认3秒
};

Cms.toTop = function() {
	// 首先将#back-to-top隐藏
	$("#back-to-top").hide();
	$(window).scroll(function() {
		// 当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
		if ($(window).scrollTop() > 100) {
			$("#back-to-top").fadeIn(400);
		} else {
			$("#back-to-top").fadeOut(400);
		}
	});
	// 当点击跳转链接后，回到页面顶部位置
	$("#back-to-top").click(function() {
		$('body,html').animate({
			scrollTop : 0
		}, 600);
		return false;
	});
};

//提交量统计上下移动数据   按钮特效
var exchangeresultHeight ;	//类exchangeresult的高度
var movedivHeight ;	//movediv的高度
var tempH ;	//保存需要上下移动的DIV超出外窗口的高度，以便计算最多可以上下移动多少
var movedivMarginTop = 0 ;	//保存向上移动了多少
var upInterval ;
var downInterval ;

Cms.udMove = function(){
	$('.upbutton, .downbutton').wrapInner('<span class="udhover"></span>').each(function () {
		$('span.udhover').css('opacity', 0).hover(function () {
			$(this).stop().fadeTo(400, 1);
		}, function () {
			$(this).stop().fadeTo(400, 0);
		});
	});
	movedivHeight = $("#movediv").height() ;
	exchangeresultHeight = $(".resultlist").height() ;
	tempH = movedivHeight - exchangeresultHeight ;
	//"向上翻"按钮绑定鼠标按下与弹起事件
	$("#upbutton").mousedown(function() {
		if(movedivMarginTop <= -10){		//向上与向下形成互锁
			downInterval = clearInterval(downInterval);
			upInterval = setInterval("upbuttonMoused()", 50);
		}
	});
	$("#upbutton").mouseup(function() {		//同时清除向上和向下周期函数
		downInterval = clearInterval(downInterval);
		upInterval = clearInterval(upInterval);
	});
	
	//"向下翻"按钮绑定鼠标按下与弹起事件
	$("#downbutton").mousedown(function() {
		if(tempH >= 10){		//向上与向下形成互锁
			upInterval = clearInterval(upInterval);
			downInterval = setInterval("downbuttonMoused()", 50);
		}
	});
	$("#downbutton").mouseup(function() {	//同时清除向上和向下周期函数
		upInterval = clearInterval(upInterval);
		downInterval = clearInterval(downInterval);
	});
};
//向上移动翻页
function upbuttonMoused(){
	if(movedivMarginTop <= -10){
		tempH += 10;
		movedivMarginTop += 10;
		$("#movediv").animate({
			marginTop : '+=10'
		}, 0);
	}else{
		upInterval = clearInterval(upInterval);
	}
}

//向下移动翻页
function downbuttonMoused(){
	if(tempH >= 10){
		tempH -= 10;
		movedivMarginTop -= 10;
		$("#movediv").animate({
			marginTop : '-=10'
		}, 0);
	}else{
		downInterval = clearInterval(downInterval);
	}
}

//首页地图展示，进入操作地图按钮效果
function oprMapBtn(){
	$("#mapdiv").hover(function(){
		$(".oprMap").stop().fadeTo(200, 1);
	}, function () {
		$(".oprMap").stop().fadeTo(200, 0.7);
	});
}


function refreshCaptcha() {
	var o = document.getElementById("imgcaptcha").src = "${base}/captcha.svl?d="
			+ new Date() * 1 + "";
}

//点击服务申请，当未登陆时，弹出登陆框
function loginDialog_open(){
	// 检测用户当前是否登陆
//	var isLoginURL = this.siteBase + "/rdpAct/checkLogin.jspx";
//	$.post(isLoginURL, function(data) {
//		data = eval("(" + data + ")");
//		if (data.status == 4 || data.status == 3) {
//			location.reload() ;
//			return;
//		} else {
//			$("#loginform").css({display : "block"});
//			$("#fade").css({display : "block"});
//			return;
//		}
//	});
	document.getElementById('loginform').style.display = "block";
	document.getElementById('fade').style.display = "block";
}

function loginDialog_close(){
	window.parent.dialog = "false";
	$("#loginform").css({display : "none"});
	$("#fade").css({display : "none"});
	$("#loginform form")[0].reset();	//重置
	$("#login_tip").html("");
}

function clear_tip(){
	$("#login_tip").html("");
}

// /* 弹窗登陆提交操作 */
// function ligin_submit(formObj){
// 	var submitURL = this.siteBase + "/rdplogin_dialog.jspx" ;
// 	var username = formObj.username.value ;
// 	var password = formObj.password.value ;
// 	var captcha = formObj.captcha.value ;
//
//
// 	if(!Cms.isNotBlank(username, password,captcha)){
// 		$("#login_tip").html("请填写用户名,密码和验证码") ;
// 		formObj.username.focus() ;
// 		if(Cms.isNotBlank(username)){
// 			if(Cms.isNotBlank(password)){
// 				formObj.captcha.focus() ;
// 			}
// 			else
// 			{
// 				formObj.password.focus() ;
// 			}
// 		} else if(Cms.isNotBlank(username)){
// 			if(Cms.isNotBlank(captcha)){
// 				formObj.password.focus() ;
// 			}
// 			else
// 			{
// 				formObj.captcha.focus() ;
// 			}
// 		}
//
// 		else if(Cms.isNotBlank(captcha)){
// 			if(Cms.isNotBlank(username)){
// 				formObj.password.focus() ;
// 			}
// 			else
// 			{
// 				formObj.username.focus() ;
// 			}
// 		}
//
// 		else if(Cms.isNotBlank(password)){
// 			if(Cms.isNotBlank(username)){
// 				formObj.captcha.focus() ;
// 			}
// 			else
// 			{
// 				formObj.username.focus() ;
// 			}
// 		}
//
// 		return false;
// 	}
//     yhm= strEnc(yhm,"1","2","3");
//     scode= strEnc(scode,"1","2","3");
// 	$.post(submitURL, {"username" : username, "password" : password,"captcha":captcha}, function(data){
// 		data = eval("(" + data + ")") ;
// 		if(data.success){
// 			//location.reload() ;
// 			window.location.href = "/";
//
// 		}else{
// 			refreshCaptcha();
// 			$("#login_tip").html(data.error) ;
// 			formObj.username.value = "";
// 			formObj.password.value = "";
// 			formObj.captcha.value = "";
// 			formObj.username.focus() ;
// 		}
// 	}) ;
// 	return false;
// }
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
        url: encodeURI("/getUserKey.jspx"),
        dataType: 'json',
        success: function (data) {
            if(data){
                yhm= strEnc(yhm,data,data,data);
                scode= strEnc(scode,data,data,data);
                $.post("/rdplogin_dialog.jspx", {"yhm" : yhm, "scode" : scode,"captcha":captcha}, function(data){
                    //alert(data);
                    data = eval("(" + data + ")") ;
                    data = eval("(" + data + ")") ;
                    if(data.success){
                        //location.reload() ;
                        window.location.href = "/";

                    }else{
                        refreshCaptcha();
                        $("#login_tip").html(data.error) ;
                        formObj.username.value = "";
                        formObj.password.value = "";
                        formObj.captcha.value = "";
                        formObj.username.focus() ;
                    }
                }) ;
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
/*截取中心简介内容长度 */
Cms.aboutus_substr = function() {
	var newline = true;	//是否换行，第一段落不换行
    var content = "";	//截取的内容
	var maxLength = 180;	//需要展示的字符数量
    var containObj = $("#aboutus p") ;
	$("#aboutus").html("") ;
	for(var n = 0; n < containObj.length; n++){
		var text = $(containObj[n]).text();
        var tempcontent = $.trim(text);
        if (tempcontent.length > 0) {
            if (content.length < maxLength) {
				if (newline) {
					newline = false;
					content += "&nbsp;&nbsp;&nbsp;&nbsp;" + tempcontent.substr(0, maxLength);
					maxLength += 20 ;	//补偿空格(&nbsp;)所占用的字符长度。
				} else {
					content += "<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + tempcontent.substr(0, maxLength - content.length);
					maxLength += 25 ;	//补偿空格(&nbsp;)所占用的字符长度。
				}
            } else {
				content += "..." ;	//结尾加上省略号
				break;
            }
			if(tempcontent.length < 17) maxLength -= (17 - tempcontent.length) ;
        }
	}
	$("#aboutus").html(content);
};

var Auth_Content = "";
function onLoginWindow(path)
	{
		window.parent.dialog = "true";
		var url=path+"/rdplogin.jspx?alertType=alert";
//		var html = '<iframe id="mainFrame" name="mainFrame" src="';
//		html = html+ url+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';
		$.get(url, {
		}, function(data) {
			data = eval("(" + data + ")");
			Auth_Content = data.msg;
			loginDialog_open();
		});
		
		
//		var win=new Ext.Window(
//	{
//		layout : 'fit',
//		width : 365,
//		height :290,
//		border:false,
//		title : '用户登录',
//		closeAction : 'close',
//		frame:true,
//		buttonAlign : 'center',
//		items : [{html:html}]
//
//	});
//		win.show();
//		return false;
	}



