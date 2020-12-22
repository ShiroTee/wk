$(function() {

	//组装业务领域和业务主题
	assembleFieldAndTopic();
	
	//组装显示热词
	assembleHotWord();
	//查询列表
	list(1,1);
	/**
	 * 点击搜索刷新出列表
	 */
	$("#search_click").click(function() {
		list(1,1);
	})
	
	$("body").delegate('.card .img_box img', 'click', function() {
		var resid = $(this).attr("resid");
		location.href = ctx + "/mdp/welcome/api/details.html?resid=" + resid;
	}).delegate('.card .img_box div', 'click', function() {
		//var resid = $(this).attr("resid");
		//addBasket($(this));
	}).delegate('.filter_box .filter_category i,.filter_box #topic.filter_list span','click',function(){
		list(1,1);
	});
	// 搜索键盘事件注册
	$('#search_condition').bind('keyup', function(event) {
		if (event.keyCode == "13")
			list(1,1);
	})
	
	// 跳页键盘事件注册
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
	var topic = $("#topic span.cur").attr("check_key");
	var field = $(".filter_category i.cur").attr("check_key");
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
					$("#apiList").html('');
					$('.paging').show();			
					if(data.list.length == 0){
						$("#apiList").append('<div class="noRel">暂无资源</div>');
						$('.paging').hide();
						return;
					}
					var html = [];
					for (var i = 0; i < data.list.length; i++) {
						html.push('<div class="card">');
						html.push('<div class="img_box">');
						html.push('<img src="' + ctx + '/resources/images/api_icon.svg" resid="' + data.list[i].RES_ID + '">');
						html.push('<div routeid="'+data.list[i].asset_id+'" data-name="'+data.list[i].asset_name+'">加入资源车</div>');
						html.push('</div>');
						html.push('<div class="title">'+data.list[i].RES_NM+'</div>');
						html.push('<div class="tag">');
						html.push('<div>');
						html.push('<i class="icon_invoke">'+data.list[i].COUNT+'</i>');
						html.push('</div>');
						html.push('</div>');
						html.push('</div>');
					}
					$("#apiList").append(html.join(''));
					setTimeout(function(){
						$('.card').each(function(i,item){
							$(this).css('transform','translateY(0px)').css('opacity','1').css('transition-delay', i*0.1 + 's');
						});
					},100);
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
						var fieldHtml = '<span><i class="cur" check_key="">全部</i></span>';
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

						$("#topic").html(topicHtml);
					}
				}
			})
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
				html += '<li onclick="hotClick($(this))" hotword=' + data[i].CONDITION +'>' + data[i].CONDITION + '</li>';
			}
			$("#hot_word").html(html);
		}
	})
}


/**
 * 点击热词响应事件
 */
function hotClick(obj){
	cancelBubble();
	var hotword = obj.attr("hotword");
	$("#search_condition").val(hotword);
	list(1,1);
}
