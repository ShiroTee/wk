


$(function(){
	
	//组装业务领域和业务主题
	assembleFieldAndTopic();
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
	
	$("body").delegate('.filter_box .filter_category i,.filter_box #entity_topic.filter_list span','click',function(){
		debugger
		list(1,1);
	});
	
	
	// 搜索键盘事件注册
	$('#entity_search').bind('keyup', function(event) {
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
	var condition = $("#entity_search").val();
	var topic = $("#entity_topic span.cur").attr("check_key");
	var field = $(".filter_category i.cur").attr("check_key");
	$
			.ajax({
				url : ctx + "/mdp/api/pageEntityStore.json",
				data : {
					condition : condition,
					start : startPage,
					size : size,
					topic : topic,
					field : field,
					type:2
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					if(init_flag == 1 ){
						$("#page_").initPage(data.count,size,startPage,list,false);
					}
					$("#entity_list").html('');
					$('.paging').show();			
					if(data.list.length == 0){
						$("#entity_list").append('<div class="noRel">暂无资源</div>');
						$('.paging').hide();
						return;
					}
					var html = [];
					for (var i = 0,webapppic,remark; i < data.list.length; i++) {
						webapppic = data.list[i].WEBAPP_PIC;
						remark = data.list[i].WEBAPP_REMARK == null?"":data.list[i].WEBAPP_REMARK;
						
						html.push('<div class="card" id="' + data.list[i].WEBAPP_ID + '">');
						html.push('<div class="img_box">');
						html.push('<img title="' + remark + '" src="'
									+ ctx + '/mdp/static/resources/' + webapppic 
									+ '" onerror="javascript:this.src=\'' 
									+ ctx + '/webapp/resources/images/Default_1.png\'" alt="" onclick="queryResourceInfoById(\''
									+ data.list[i].WEBAPP_ID + '\')">');
						html.push('</div>');
						html.push('<div class="title">' + data.list[i].WEBAPP_NAME + '</div>');
						html.push('<div class="tag">');
						html.push('<div>');
						html.push('<i class="icon_time">' + TimestampToStr(data.list[i].CREATE_DATE) + '</i>');
						html.push('<i class="icon_download">4,211</i>');
						html.push('</div>');
						html.push('</div>');
						html.push('</div>');
					}
					$("#entity_list").append(html.join(''));
					setTimeout(function(){
						$('.card').each(function(i,item){
							$(this).css('transform','translateY(0px)').css('opacity','1').css('transition-delay', i*0.1 + 's');
						});
					},100);
				}
			})
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
				var fieldHtml = '<span><i class="cur">全部</i></span>';
				for (var i = 0; i < data.field.length; i++) {
					fieldHtml += '<span><i check_key='
							+ data.field[i].CODE
							+ '>'
							+ data.field[i].NAME + '</i></span>';
				}

				$(".filter_category").html(fieldHtml);

				var topicHtml = '<span class="filter_all cur">全部</span>';
				for (var i = 0; i < data.topic.length; i++) {
					topicHtml += '<span check_key='
							+ data.topic[i].CODE
							+ '>'
							+ data.topic[i].NAME + '</span>'
				}

				$("#entity_topic").html(topicHtml);
			}
		}
	})
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
	
