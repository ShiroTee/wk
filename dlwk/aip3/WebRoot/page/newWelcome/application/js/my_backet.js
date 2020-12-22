


//	var backet_route = '<%=session.getAttribute("route")%>';

$(function() {
	if(window.history.length != 1){
		$('.go_back').removeClass('hide');
	}
	$('.main_page')
			.delegate(
					'input[type="checkbox"]',
					'change',
					function() {
						var checked = $(this)[0].checked;
						if ($(this).parent().hasClass('checkAll')) {
							$('input[type="checkbox"]').each(function() {
								$(this)[0].checked = checked;
								if (checked) {
									$(this).parent().addClass('c_on');
								} else {
									$(this).parent().removeClass('c_on');
								}
							});
						} else if ($(this).parent().hasClass('CatalogAll')) {
							$(this).parent().toggleClass('c_on');
							$('#rc_CatalogList input[type="checkbox"]').each(
									function() {
										$(this)[0].checked = checked;
										if (checked) {
											$(this).parent().addClass('c_on');
										} else {
											$(this).parent()
													.removeClass('c_on');
										}
									});
						} else if ($(this).parent().hasClass('ApiAll')) {
							$(this).parent().toggleClass('c_on');
							$('#rc_ApiList input[type="checkbox"]').each(
									function() {
										$(this)[0].checked = checked;
										if (checked) {
											$(this).parent().addClass('c_on');
										} else {
											$(this).parent()
													.removeClass('c_on');
										}
									});
						} else {
							$(this).parent().toggleClass('c_on');
						}
						$('.apply_num span')
								.html(
										$('#rc_CatalogList label.c_on,#rc_ApiList label.c_on').length);
					})
	
					init_my_backet();
					
})

function myBasket() {
	var searchtext = $('.empty_search_box .search_input').val();
	location.href = ctx + '/mdp/welcome/resourceCatalog/query.html' 
		+ (searchtext &&  searchtext.length > 0 ? '?searchtext=' + searchtext : '');
}
function delResources() {
	$('#rc_CatalogList label.c_on,#rc_ApiList label.c_on').remove();
	if ($('#rc_CatalogList label').length == 0) {
		$('#rc_CatalogList').parents('.cart_shop').hide();
	}
	if ($('#rc_ApiList label').length == 0) {
		$('#rc_ApiList').parents('.cart_shop').hide();
	}
	if ($('#rc_CatalogList label,#rc_ApiList label').length == 0) {
		$('#basket').hide();
		$('#emptyBasket').show();
	}

}
function apply(route,api) {
	var routes = [],apis = [];
	if(route || api){
		route ? routes.push(route) : null;
		api ? apis.push(api) : null;
	}else{
		if ($('#rc_CatalogList label.c_on,#rc_ApiList label.c_on').length == 0) {
			$.msg("请选择需要申请的资源！");
			return;
		}
	
		$(".routecheck").each(function(){
			if($(this).is(":checked")){
				routes.push($(this).attr("routeid"));
			}
		})
	
		$(".apicheck").each(function(){
			if($(this).is(":checked")){
				apis.push($(this).attr("routeid"));
			}
		})
	}
	if(routes.length == 0 && apis.length == 0){
		return;
	}
	var data ={
			apiSelect : apis.join(","),
			routeSelect : routes.join(",")
	}
 
	
	$.ajax({
		url : ctx + "/mdp/welcome/resourceCar/saveSelectResource.json",
		data : data , 
		dataType : "json",
		type : "post",
		success : function(data){
			if(data.success){
				 $.ajax({
						url : ctx + '/mdp/admin/applyResourceController/checkAppyExist.json',
						method : "post",
						dataType : "json",
						data :  {
							resourceId:$(this).attr("routeid")
						} ,
						success : function(d) {
							 if(d.success){
								 location.href = ctx + '/mdp/admin/applyResourceController/applyResource.html';
							 }else{
								 $.alert(d.msg);
							 }
							 
						},
						error : function(data, status, e){ 
							 window.location= ctx +'/mdp/login.html';
							 //?page=mdp/welcome/application/my_basket.html
						}
					}); 
			}
			else{
				$.alert(data.msg);
			}
		}
		
	})
	
	
	
}


function init_my_backet(){
	var apiObj ,routeObj ;
	var route = mycookie("routeList");
	var data =  {
			apiIds : "",
			routeIds : route
	}
	$.ajax({
		url : ctx + "/mdp/welcome/resourceCatalogue/getResourceDetailList.json",
		data : data,
		dataType : "json",
		type : "post",
		success : function(data){
			if(data.route != null){
				assembleRoutes(data.route);
			}
			if(data.route != null){
				assembleAPIs(data.api);
			}
		}
	})
}


function assembleRoutes(data){
	
	if(data.length == 0){
		
		return ;
	}
	$('#emptyBasket').hide();
	$("#basket").show();
	$("#route_cartshop").removeClass("hide");
	var html = '';
	for(var i=0;i<data.length;i++){
		var content = data[i];
		html += ''
		+ '<label class="exam_check">'
		+ '<div class="exam_checkbtn"></div>'
		+ '<input type="checkbox" class="routecheck" sessiontype="route" routeid = "' + content.resourceId + '">'
		+ '<div class="cart_col1">'
		+ 	'<div class="cart_img"><img src="' + ctx + '/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>'
		+ '</div>'
		+ '<div class="cart_col2">'
		+ 	'<div class="cart_detail">'
		+ 		'<p class="cart_name">' + content.resourceName + '</p>'
		+ 		'<div class="res_labs">'
		+ 			'<span class="res_lab">水利工程</span>'
		+ 			'<span class="res_lab">水库</span>'
		+ 		'</div></div></div>'
		+ '<div class="cart_col3"><div>'
		+ 	'<a href="javascript:void(0);" onclick="deleteSingleService($(this))" sessiontype="route" routeid = "' + content.resourceId + '">删除</a>'
		+ 	'<a href="javascript:void(0);" onclick="apply(\'' + content.resourceId + '\');">立即申请</a>'
		+ '</div></div></label>';
	}
	$("#rc_CatalogList").html(html);
	
}


/**
 * 组装api数据
 * @param data
 */
function assembleAPIs(data){
	if(data.length == 0){
		return ;
	}
	$('#emptyBasket').hide();
	$("#basket").show();
	$("#api_cartshop").removeClass("hide");
	var html = '';
	for(var i=0;i<data.length;i++){
		var content = data[i];
		html += '<label class="exam_check">'
		+ '<div class="exam_checkbtn"></div>'
		+ '<input type="checkbox" class="apicheck" sessiontype="api" routeid = "' + content.resourceId + '">'
		+ '<div class="cart_col1">'
		+ '<div class="cart_img"><img src="' + ctx + '/resources/images/api_icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>'
		+ '</div>'
		+ '<div class="cart_col2">'
		+ '<div class="cart_detail">'
		+ '<p class="cart_name">API</p>'
		+ '<div class="res_labs">'
		+ '<span class="res_lab">水利工程</span>'
		+ '<span class="res_lab">水库</span>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="cart_col3"><div>'	
		+ '<a href="javascript:void(0);">删除</a>'	
		+ '<a href="javascript:void(0);" onclick="apply();">立即申请</a>'
		+ '</div></div>'
		+ '</label>';
	}
	$("#rc_ApiList").html(html);
}

/**
 * 删除单个资源目录或api
 * @param el
 */
function deleteSingleService(el){
	$.confirm("是否确认删除",function(){
		var delRouteID = el.attr("routeid");
		var route = mycookie("routeList");
		route = route.replace(','+ delRouteID ,"").replace(delRouteID + ',',"").replace(delRouteID,"");
		mycookie("routeList",route,{ path: '/', expires: 30 });
		$("input[routeid=" + delRouteID + "]").parent().remove();
		setApplyResourceCount();
		delResources();
		$.message("删除成功");
	})
}


function deleteCheckResource(){
	var routes = [],apis = [];
	$(".routecheck").each(function(){
		if($(this).is(":checked")){
			routes.push($(this).attr("routeid"));
		}
	})
	
	$(".apicheck").each(function(){
		if($(this).is(":checked")){
			apis.push($(this).attr("routeid"));
		}
	})
	if(routes.length == 0 && apis.length == 0){
		return;
	}
	$.confirm("是否确认删除选中资源",function(){
			for(var i=0;i<routes.length;i++){
				var delRouteID = routes[i];
				var route = mycookie("routeList");
				route = route.replace(','+ delRouteID ,"").replace(delRouteID + ',',"").replace(delRouteID,"");
				mycookie("routeList",route,{ path: '/', expires: 30 });
				$("input[routeid=" + delRouteID + "]").parent().remove();
			}
			setApplyResourceCount();
			delResources();
			$.message("删除成功");
	})
	
}


