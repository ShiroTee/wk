$(function() {

	//组装业务领域和业务主题
	assembleFieldAndTopic();
	
	//组装显示热词
	assembleHotWord();
	list(1,1);
	/**
	 * 点击搜索刷新出列表
	 */
	$("#search_click").click(function() {
		list(1,1);
	})
	
	// 删除主题或领域事件
	$("body").delegate('i.icon_close', 'click', function() {
		delID=$(this).parent().attr("check_key");
		$(".topic").find("span").each(function(){
			if($(this).attr("check_key") == delID){
				$(this).removeClass("cur");
				
			}
		})
		$(".filter_line").find("a").each(function(){
			if($(this).attr("check_key") == delID){
				$(this).parent().removeClass("cur");
				$(".filter_line").find("a:first").parent().addClass("cur");
			}
		})
		list(1,1);
	}).delegate('.show_detail', 'click', function() {
		var resid = $(this).attr("resid");
		window.open( ctx + "/mdp/welcome/api/details.html?resid=" + resid);
	})
	// 搜索键盘事件注册
	$('#search_condition').bind('keyup', function(event) {
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

	$(".page_size").find("li").click(
			function() {
				$(".page_size").find("li").removeClass("cur");
				$(this).addClass("cur");
				$(".page_size").find("span").html($(this).context.innerHTML);
				$(".page_size").find("span").attr("page-size",
						$(this).attr("page-size"));
				list(1,1);
			})
})

/**
 * api数据分页显示
 * 
 * @param startPage
 */
function list(startPage,init_flag) {

	if (startPage == null || startPage == undefined) {
		startPage = 1;
	}
	var size = $(".page_size").find("span").attr("page-size");
	var condition = $("#search_condition").val();
	var topic = $(".topic_check").attr("check_key");
	var field = $(".field_check").attr("check_key");
	$
			.ajax({
				url : ctx + "/mdp/api/pageAPI.json",
				data : {
					condition : condition,
					start : startPage,
					size : size,
					topic : topic,
					field : field
				},
				dataType : "json",
				type : "post",
				success : function(data) {
					if(init_flag == 1 ){
						$("#page_").initPage(data.count,size,startPage,list,false);
					}
					$("#apiList .card").remove();
					for (var i = 0; i < data.list.length; i++) {
						var html = '';
						html += '<div class="card l" style=" opacity: 0; transition-delay: '
								+ 0.1
								* (i + 1)
								+ 's;">'
								+ '<div class="todo"><div><a resid="' + data.list[i].RES_ID + '"class="show_detail icon_detail">查看详情</a></div>'
								+ '<div class="splite"></div><div><a class="icon_basket mr15">加入资源车</a>'
								+ '<a class="icon_application">立即申请</a></div></div>'
								+ '<div class="title api">'
								+ data.list[i].RES_NM
								+ '</div>'
								//+ '<i class="icon_eye">' + data.list[i].COUNT + '</i>'
								+ '<i class="icon_invoke">' + data.list[i].COUNT + '</i></div>';
						$("#apiList").append(html);
						setTimeout(function() {
							$("#apiList .card").css("transform",
									"translateY(0px)").css("opacity", "1");
						}, 100);
					}
				}
			})
}

/**
 * 获取组装业务领域和应用主题
 */
function assembleFieldAndTopic() {

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

						$("#topic").html(topicHtml);
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



/**
 * 组装显示搜索热词
 */
function assembleHotWord(){
	
	$.ajax({
		url:ctx + "/mdp/api/getHotWord.json",
		type:"post",
		data:"",
		dataType:"json",
		success:function(data){
			var html = '';
			for(var i=0;i<data.length;i++){
				html += '<span onclick="hotClick($(this))" hotword=' + data[i].CONDITION +'>' + data[i].CONDITION + '</span>';
			}
			$("#hot_word").html(html);
		}
	})
}


/**
 * 点击热词响应事件
 */
function hotClick(obj){
	var hotword = obj.attr("hotword");
	$("#search_condition").val(hotword);
	list(1,1);
}
