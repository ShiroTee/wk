$(function() {
	list(1,1);
	
	// 跳转到固定页码
	$('.goto').bind('keyup', function(event) {
		if (event.keyCode == "13"){
			var goto_reg = /^[0-9]+$/;
			if (!goto_reg.test($(".goto").val())) {
				return;
			}
			list($(".goto").val(),1);
		}
	});
	

	//每页数量点击事件
	$(".page_size").find("li").click(
		function() {
			$(".page_size").find("li").removeClass("cur");
			$(this).addClass("cur");
			$(".page_size").find("span").html($(this).context.innerHTML);
			$(".page_size").find("span").attr("page-size",
					$(this).attr("page-size"));
			list(1, 1);
	});

	//点击页码数字
	$(".page_list").find("li").click(
		function() {
			$(".page_list").find("li").removeClass("cur");
			$(this).addClass("cur");
			$(".page_list").find("span").html($(this).context.innerHTML);
			$(".page_list").find("span").attr("page_list",
					$(this).attr("page_list"));
			var startPage = $(".page_list .cur").text();
			list(startPage, 1);
	});
	
	
	//每一块数据库信息点击事件
	$("body").delegate('.card', 'click', function() {
		var mdId=$(this).attr("md_id");
		window.open(ctx+'/mdp/welcome/erRelation/erRelationTableRel.html?schemaId='+mdId);
	});
	
	//搜索按钮事件
	$(".search_btn").click(function(){
		var keyWord=$(".search_input").val();
		list(1, 1);
	});
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
	var size = $(".page_size .cur").attr("page-size"); 
	var condition = $(".search_input").val();
	var topic = $(".topic_check").attr("check_key");
	var field = $(".field_check").attr("check_key");
	$.ajax({
			url : ctx + "/mdp/welcome/erRelation/getSchemaJson.json",
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
					$("#mm_page").initPage(data.count,size,startPage,list,false);
				}
				$("#schema_card_list .card").remove();
				for (var i = 0; i < data.list.length; i++) {
					var html = '';
					var schema=data.list[i];
					html+=
					'		<div class="card transition_1 l" md_id='+schema.id+' style="opacity: 0; transition-delay: '+(0.1+0.1*i)+'s;">'+
					'			<div class="title">'+schema.name+'</div>'+
					'			<div class="tag">'+
					'				<span>数据库</span>'+
					'			</div>'+
					'			<i class="icon_eye">'+(schema.count==undefined?0:schema.count)+'</i>'+
//						'			<i class="icon_download">4,211</i>'+
					'		</div>';
					$("#schema_card_list").append(html);
					setTimeout(function() {
						$("#schema_card_list .card").css("transform",
								"translateY(0px)").css("opacity", "1");
					}, 100);
				}
			}
		})
}

