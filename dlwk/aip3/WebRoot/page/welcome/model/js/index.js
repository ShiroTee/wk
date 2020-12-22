


$(function(){
	
	//组装业务领域和业务主题
//	assembleFieldAndTopic();
	list(1,1);
	
	$(".page_size").find("li").click(
			function() {
				$(".page_size").find("li").removeClass("cur");
				$(this).addClass("cur");
				$(".page_size").find("span").html($(this).context.innerHTML);
				$(".page_size").find("span").attr("page-size",
						$(this).attr("page-size"));
				list(1,1);
			});
	
//	$("body").delegate('i.icon_close', 'click', function() {
//		delID=$(this).parent().attr("check_key");
//		$(".entity_topic").find("span").each(function(){
//			if($(this).attr("check_key") == delID){
//				$(this).removeClass("cur");
//				
//			}
//		})
//		$(".filter_line").find("a").each(function(){
//			if($(this).attr("check_key") == delID){
//				$(this).parent().removeClass("cur");
//				$(".filter_line").find("a:first").parent().addClass("cur");
//			}
//		})
//		list(1,1);
//	});
	
	
	// 搜索键盘事件注册
	$('#model_search').bind('keyup', function(event) {
		if (event.keyCode == "13")
			list(1,1);
	})
	
	// 搜索键盘事件注册
	$('.goto').bind('keyup', function(event) {
		if (event.keyCode == "13"){
			var goto_reg = /^[0-9]+$/;
			if (!goto_reg.test($(".goto").val())) {
				return;
			}
			list($(".goto").val(),1);
		}
	})
	
	/**
	 * 点击搜索刷新出列表
	 */
	$("#search_click").click(function() {
		list(1,1);
	})
})


function list(startPage,init_flag) {

	if (startPage == null || startPage == undefined) {
		startPage = 1;
	}
	var size = $(".page_size").find("span").attr("page-size");
	var condition = $("#model_search").val();
//	var topic = $(".topic_check").attr("check_key");
//	var field = $(".field_check").attr("check_key");
	$
			.ajax({
				url : ctx + "/mdp/api/pageEntityStore.json",
				data : {
					condition : condition,
					start : startPage,
					size : size,
					type:1
//					topic : "",
//					field : ""
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					if(init_flag == 1 ){
						$("#page_").initPage(data.count,size,startPage,list,false);
					}
					$("#model_list .card").remove();
					for (var i = 0; i < data.list.length; i++) {
						var html = '';
						var webapppic = data.list[i].WEBAPP_PIC;
						html += '<div id="' + data.list[i].WEBAPP_ID + '"class="card l" style=" opacity: 0; transition-delay: '
								+ 0.1
								* (i + 1)
								+ 's;">'
								+ '<div class="img_box">';
						var remark = data.list[i].WEBAPP_REMARK == null?"":data.list[i].WEBAPP_REMARK;
						html += '<img title="' + remark + '" src="'
							+ ctx
							+ '/mdp/static/resources/'
							+ webapppic
							+ '" onerror="javascript:this.src=\''
							+ ctx
							+ '/webapp/resources/images/Default_1.png\'" alt="" onclick="queryResourceInfoById(\''
							+ data.list[i].WEBAPP_ID + '\')">';
						html += '</div>' 
								+ '<div class="title api" title="' + data.list[i].WEBAPP_NAME + '">'
								+ data.list[i].WEBAPP_NAME
								+ '</div>'
								+ '<i class="icon_time">' + TimestampToStr(data.list[i].CREATE_DATE) + '</i>'
								+ '<i class="icon_download">4,211</i></div>';
						$("#model_list").append(html);
						setTimeout(function() {
							$("#model_list .card").css("transform",
									"translateY(0px)").css("opacity", "1");
						}, 100);
					}
				}
			})
}



/**
 * 组装应用领域和主题
 */
function assembleFieldAndTopic(){
	$
	.ajax({
		url : ctx + "/mdp/api/serviceAttr.json",
		data : "",
		dataType : "json",
		type : "post",
		success : function(data) {
			if (data.fieldName != null) {
				$("#topic_title").val(data.topicName);
				var fieldHtml = '<li class="cur"><a onclick="field_check($(this))" check_key="" href="javascript:void(0)">全部</a></li>';
				for (var i = 0; i < data.field.length; i++) {
					fieldHtml += '<li><a onclick="field_check($(this))" check_key='
							+ data.field[i].CODE
							+ ' href="javascript:void(0)">'
							+ data.field[i].NAME + '</a></li>';
				}

				$(".filter_line").html(fieldHtml);

				var topicHtml = '';
				for (var i = 0; i < data.topic.length; i++) {
					topicHtml += '<span onclick="topic_check($(this))" check_key='
							+ data.topic[i].CODE
							+ '>'
							+ data.topic[i].NAME + '</span>/'
				}

				$("#entity_topic").html(topicHtml);
			}
		}
	})
}




/**
 * 单击领域选择事件
 * 
 * @param obj
 */
function field_check(obj) {
	obj.parent().parent().find('li').each(function() {
		$(this).removeClass('cur');
	})
	obj.parent().addClass('cur');
	$(".field_check").remove();
	var breakkey = 0;
	$(".cur_search").find("span").each(function() {
		if ($(this).attr("check_key") == obj.attr("check_key")) {
			breakkey = 1;
		}
	})
	if (breakkey) {
		return;
	}
	var html = '<span class="field_check" check_key="' + obj.attr("check_key")
			+ '">' + obj.context.innerHTML
			+ '<i class="icon_close fa fa-close"></i></span>';

	$(".cur_search").append(html);
	list(1,1);
}

/**
 * 单击主题选择事件
 * 
 * @param obj
 */
function topic_check(obj) {
	obj.parent().find('span').each(function() {
		$(this).removeClass('cur');
	})
	obj.addClass('cur');

	$(".topic_check").remove();
	var breakkey = 0;
	$(".cur_search").find("span").each(function() {
		if ($(this).attr("check_key") == obj.attr("check_key")) {
			breakkey = 1;
		}
	})
	if (breakkey) {
		return;
	}
	var html = '<span class="topic_check" check_key="' + obj.attr("check_key")
			+ '">' + obj.context.innerHTML
			+ '<i class="icon_close fa fa-close"></i></span>';

	$(".cur_search").append(html);

	list(1,1);
}



function queryResourceInfoById(e) {
//	var id = e.attr("appid");
	var d = new Date();
	$.ajax({
		url : ctx + "/mdp/welcome/webapp/WebAppCode.json?time=" + d.getTime(),
		type : "get",
		dataType : "html",
		data : {
			id : e
		},
		success : function(data) {
			window.open(ctx + "/app/" + data);
		}
	});
}




/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp){
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd");
}

Date.prototype.format = function(format) {
	   var o = {
	       "M+": this.getMonth() + 1,
	       // month
	       "d+": this.getDate(),
	       // day
	       "h+": this.getHours(),
	       // hour
	       "m+": this.getMinutes(),
	       // minute
	       "s+": this.getSeconds(),
	       // second
	       "q+": Math.floor((this.getMonth() + 3) / 3),
	       // quarter
	       "S": this.getMilliseconds()
	       // millisecond
	   };
	   if (/(y+)/.test(format) || /(Y+)/.test(format)) {
	       format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	   }
	   for (var k in o) {
	       if (new RegExp("(" + k + ")").test(format)) {
	           format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	       }
	   }
	   return format;
	};

	
	/**
	 * 格式化json
	 */
	var formatJson = function(json, options) {
		var reg = null,
			formatted = '',
			pad = 0,
			PADDING = '    '; // one can also use '\t' or a different number of spaces
	 
		// optional settings
		options = options || {};
		// remove newline where '{' or '[' follows ':'
		options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
		// use a space after a colon
		options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
	 
		// begin formatting...
		if (typeof json !== 'string') {
			// make sure we start with the JSON as a string
			json = JSON.stringify(json);
		} else {
			// is already a string, so parse and re-stringify in order to remove extra whitespace
			json = JSON.parse(json);
			json = JSON.stringify(json);
		}
	 
		// add newline before and after curly braces
		reg = /([\{\}])/g;
		json = json.replace(reg, '\r\n$1\r\n');
	 
		// add newline before and after square brackets
		reg = /([\[\]])/g;
		json = json.replace(reg, '\r\n$1\r\n');
	 
		// add newline after comma
		reg = /(\,)/g;
		json = json.replace(reg, '$1\r\n');
	 
		// remove multiple newlines
		reg = /(\r\n\r\n)/g;
		json = json.replace(reg, '\r\n');
	 
		// remove newlines before commas
		reg = /\r\n\,/g;
		json = json.replace(reg, ',');
	 
		// optional formatting...
		if (!options.newlineAfterColonIfBeforeBraceOrBracket) {			
			reg = /\:\r\n\{/g;
			json = json.replace(reg, ':{');
			reg = /\:\r\n\[/g;
			json = json.replace(reg, ':[');
		}
		if (options.spaceAfterColon) {			
			reg = /\:/g;
			json = json.replace(reg, ':');
		}
	 
		$.each(json.split('\r\n'), function(index, node) {
			var i = 0,
				indent = 0,
				padding = '';
	 
			if (node.match(/\{$/) || node.match(/\[$/)) {
				indent = 1;
			} else if (node.match(/\}/) || node.match(/\]/)) {
				if (pad !== 0) {
					pad -= 1;
				}
			} else {
				indent = 0;
			}
	 
			for (i = 0; i < pad; i++) {
				padding += PADDING;
			}
	 
			formatted += padding + node + '\r\n';
			pad += indent;
		});
	 
		return formatted;
	};
	
