

$(function(){

	pageInit();
	
	$("#publish_addr").bind('keypress', function(event) {
		if (event.keyCode == "13")
			pageInit();
	});
	
	$("#serviceName").bind('keypress', function(event) {
		if (event.keyCode == "13")
			pageInit();
	});
	
	$('#addService,#backToList').click(function(){
		if(resource_from == '2'){
			return;
		}
		$('div[data-show-box]').toggle();
	});
})



//初始化--------------------------------

function pageInit(){
	var params = {
			publishURL:$("#publish_addr").val(),
			routeName:$("#serviceName").val()
	}
	updatePagination("serviceInfoHandler/getWebServiceListNotResource.json",params,0,4,function(data){
		initServiceList(data);
	},"#pageDIV_serviceList");
}

/**
 * 初始化列表
 */
function initServiceList(data){
	var html = '';
	for(var i=0;i<data.list.length;i++){
		var content = data.list[i];
		html += '<tr serviceId="' + content.routeId + '">';
		html += '<td><label class="position-relative">'
			 + '<input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
		html += '<td>' + content.routeName + '</td>';
		html += '<td>' + content.showURL + '</td>';
		html += '<td>' + content.routeType + '</td>';
		if(content.isAuth == 1){
			html += '<td style="color:red">授权访问</td>';
		}
		else{
			html += '<td style="color:green">完全公开</td>';
		}
		html += '<td>' + TimestampToStr(content.publishDate) + '</td>';
	}
	$("#service-table tbody").html(html);
}


/**
 * 保存对应服务
 */

function saveService(){
	var serviceIds = [];
	$("#service-table tbody tr input[type='checkbox']").each(function(){
		if($(this).is(":checked")){
			serviceIds.push($(this).parent().parent().parent().attr("serviceid"));
		}
	})
	if(serviceIds.length == 0){
		return;
	}
	var data = {
			resourceId:resourceID,
			serviceIds:serviceIds.join(",")
	}
	data['from'] = 1;
	if(resource_from == '2'){
		data['userId'] = userID_service;
		data['from'] = 2;
	}
	$.ajax({
		url:"resourceCatalogueInfoHandler/saveWebServiceInto.json",
		data:data,
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.success){
				pageInit();
				$.message("保存成功");
			}
			else{
				$.alert(data.msg);
			}
		}
	})
}


//服务添加项------------------------------
/**
 * 重置添加栏
 */
function reset_serviceList(){
	$("#serviceType_serviceList").val("http");
	$("#serviceName_serviceList").val("");
	$("#serviceAddr_serviceList").val("");
	$("input[name='matchOnUriPrefix'][value=0]").prop("checked","checked");
	$("#service_addr_serviceList").val("");
	$("input[name='isAuth'][value=1]").prop("checked","checked");
	$("input[name='writeLog'][value=1]").prop("checked","checked");
	$("#serviceDesc_serviceList").val("");
}

/**
 * 添加服务
 */
function addService_serviceList(){
	var form = new Form("form_serviceList");
	var params = $("#form_serviceList").serialize(); 
	$.ajax({
		url : "serviceInfoHandler/registerRouteInfo.json",
		type : "post",
		dataType : "json",
		data : params,
		success : function(data){
			if(data.success){
				if(resource_from != '2'){
					$('div[data-show-box]').toggle();
				}
				$.message("增加服务信息成功");
			}
			else{
				$.message(data.msg);
			}
		}
	})
	
//	form.submit(
//			{
//				url : "serviceInfoHandler/registerRouteInfo.json",
//				type : "post",
//				sucFun : function(data)
//				{
//					$('div[data-show-box]').toggle();
//					$.message("增加服务信息成功");
//				}
//			});
}


/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm:ss");
}