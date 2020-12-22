$(function() {

	assembleDetails();

	// 资源组成展开事件
	$('#catalogueManageCollapseThree').on('show.bs.collapse', function() {
		resourceConsitute();
	});

	// 服务列表展开事件
	$('#catalogueManageCollapseFive').on('show.bs.collapse', function() {
		serviceConsitute();
	});
	
	// 文件列表展开事件
	$('#catalogueManageCollapseFour').on('show.bs.collapse', function() {
		fileConsitute();
	});

})


//tab 1\2 ----------------------------------------------------
function assembleDetails() {
	var listJSON = JSON.parse(list);
	var content = listJSON[0];
	$("#resourceName").html(content.resourceName);
	if (content.pubDate != null) {
		$("#pubDate").html(TimestampToStr(content.pubDate));
	}
	if (content.publicLv != null) {
		$("#gxjb").html(content.publicLv.publicLvName);
	}
	$("#jglb").html(content.dictArchCateInfo.typNm);
	$("#provider").html(content.provider.orgName);
	$("#createDate").html(TimestampToStr(content.createDate));
	if (content.secrLv != null) {
		$("#bmjb").html(content.secrLv.secrTypeName);
	}
	$("#keyword").html();
	$("#zaiyao").html();
	$("#beizhu").html();

	if (content.finalUpdateDate != null) {
		$("#udateTime").val(TimestampToStr(content.finalUpdateDate));
	}
	 if(content.updateRate != null ){
			$("#updateRate_catalogueDetails").val(content.updateRate);
	 }
	 
	 /**
	  * 表格全选/不选
	  */
	 tableAllCheck("catalogueManageTable");
	 tableAllCheck("fileConsituteTable");
	 tableAllCheck("serviceConsituteTable");
	 
	 
	 /**
	  * 禁用/启用 资源组成
	  */
	 
	 $("#catalogueStart").click(function(){
		 var ids = [];
		 var tables = [];
		 $("#catalogueManageTable tbody tr input[type='checkbox']").each(function(){
			 if($(this).is(":checked")){
				 ids.push($(this).parent().parent().parent().attr("mataid"));
				 tables.push($(this).parent().parent().parent().attr("typcd"));
			 }
		 })
		 resourceConsituteAction(ids,tables,'1');
	 })
	 
	 $("#catalogueStop").click(function(){
		 var ids = [];
		 var tables = [];
		 $("#catalogueManageTable tbody tr input[type='checkbox']").each(function(){
			 if($(this).is(":checked")){
				 ids.push($(this).parent().parent().parent().attr("mataid"));
				 tables.push($(this).parent().parent().parent().attr("typcd"));
			 }
		 })
		 resourceConsituteAction(ids,tables,'0');
		 
	 })
}


/**
 * 更新频率
 */
function editRate_catalogueDetails(){
	if($("#updateRate_catalogueDetails").val() == ""){
		$.alert("请选择更新频率");
		return;
	}
	if($("#udateTime").val() == ""){
		$.alert("请选择最后更新时间");
		return;
	}
	var data = {
			resourceId : resourceId,
			updateRate : $("#updateRate_catalogueDetails").val(),
			finalUpdateDate : $("#udateTime").val()
	}
	$.ajax({
		url : "resourceCatalogueInfoHandler/editRate.json",
		data:data,
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.success){
				$.message("保存成功！");
			}
			else{
				$.alert(data.msg);
			}
		}
	})
}

//tab 3----------------------------------------------------
/**
 * 资源组成后台请求
 */
function resourceConsitute() {
	$("#catalogueManageTable th input[type='checkbox']").prop("checked",false);
	$.ajax({
		url : "mataInfo/getMataInfoByResourceId.json",
		data : {
			resourceId : resourceId
		},
		dataType : "json",
		type : "post",
		success : function(data) {
			var html = '';
			for (var i = 0; i < data.list.length; i++) {
				var content = data.list[i];
				html += '<tr mataId="' + content.metaInfoId
						+ '" typCd="' + content.resource.dictArchCateInfo.typCd + '" status="' + content.status + '"><td><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
				html += '<td>' + content.field.fieldName + '</td>';
				html += '<td>' + content.field.pyName + '</td>';
				html += '<td>' + content.field.dataType + '</td>';
				html += '<td>' + content.dataLength + '</td>';
				if (content.status == 0) {
					html += '<td style="color:red">已禁用</td>';
					html += '<td><a onclick="singleStartOrStop($(this))" href="javascript:void(0)" >启动</a></td>';
				} else {
					html += '<td style="color:green">已启用</td>';
					html += '<td><a onclick="singleStartOrStop($(this))" href="javascript:void(0)" >禁用</a></td>';
				}
				html += '</td>';
			}
			$("#catalogueManageTable tbody").html(html);
		}
	})
}


/**
 * 单个服务组成启用或停止
 */
function singleStartOrStop(obj){
	var ids = [];
	var tables = [];
	ids.push(obj.parent().parent().attr("mataId"));
	tables.push(obj.parent().parent().attr("typCd"));
	var status = obj.parent().parent().attr("status");
	if("1" == status){
		status = '0';
	}
	else{
		status = '1';
	}
	resourceConsituteAction(ids,tables,status);
}


/**
 * 资源组成禁用启用操作
 * @param ids
 * @param action 0代表禁用，1代表启动
 */
function resourceConsituteAction(ids,tables,value){
	$.ajax({
		url:"resourceCatalogueInfoHandler/updateAllStopOrStart.json",
		type:"post",
		dataType:"json",
		data:{ids:ids.join(","),tableNames:tables.join(","),value:value},
		success:function(data){
			resourceConsitute();
		}
	})
}



//tab 4 -----------------------------------------------
/**
 * 文件组成列表
 */
function fileConsitute(){
	$("#fileConsituteTable th input[type='checkbox']").prop("checked",false);
	var data = {
			resourceId:resourceId,
			start:0,
			limit:1000
	}
	$.ajax({
		url:"welcome/serviceInfo/getFileServiceByResourceId.json",
		data:data,
		dataType:"json",
		type:"post",
		success:function(data){
			var html='';fileConsituteTable
			for(var i=0;i<data.list.length;i++){
				var content = data.list[i];
				html += '<tr serviceId="' + content.routeId
				+ '"><td><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
				html += '<td style="width:150px">' + content.routeName + '</td>';
				html += '<td>' + content.fileSizef + '</td>';
				html += '<td>' + content.showURL + '</td>';
				if(content.runningStatus == 1){
					html += '<td style="color:green">启用</td>';
				}
				else{
					html += '<td style="color:red">禁用</td>';
				}
				html += '<td>' + TimestampToStr(content.publishDate) + '</td>';
				html +='</tr>';
			}
			$("#fileConsituteTable tbody").html(html);
		}
	})
}

/**
 * 移除选中服务
 */
function deleteService(tableName){
	
	var deleteFun = function(){
		var ids = [];
		$("#" + tableName + " tbody tr input[type='checkbox']").each(function(){
			if($(this).is(":checked")){
				ids.push($(this).parent().parent().parent().attr("serviceid"));
			}
		})
		
		$.ajax({
			url:"resourceCatalogueInfoHandler/deleteServiceInfo.json",
			data:{routeIds:ids.join(",")},
			dataType:"json",
			type:"post",
			success:function(data){
				fileConsitute();
				serviceConsitute();
				$.message("移除成功！");
			}
			
		})
	}
	
	$.confirm("是否确认移除！",function(){
		deleteFun();
	});
}


//tab 5---------------------------------------
/**
 * 资源服务组成列表
 */
function serviceConsitute() {
	$("#serviceConsituteTable th input[type='checkbox']").prop("checked",false);
	$.ajax({
		url : "welcome/serviceInfo/getWebServiceByResourceId.json",
		data : {
			resourceId : resourceId,
			start : 0,
			limit : 1000
		},
		dataType : "json",
		type : "post",
		success : function(data) {

			var html = '';
			for (var i = 0; i < data.list.length; i++) {
				var content = data.list[i];
				html += '<tr serviceId="' + content.routeId
						+ '"><td><label class="position-relative"><input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
				html += '<td>' + content.routeName + '</td>';
				html += '<td>' + content.showURL + '</td>';
				html += '<td>' + content.routeType + '</td>';
				html += '<td style="color:green">启用</td>';
				html += '<td>' + TimestampToStr(content.publishDate) + '</td>';
				html +='</tr>';
			}
			$("#serviceConsituteTable tbody").html(html);
		}
		})
}


//common---------------------------------------------
/**
 * 表格全选/不选
 * @param tableName表格名
 */

function tableAllCheck(tableName){
	var table = $("#" + tableName);
	table.find("th input[type='checkbox']").click(function(){
		var check=$(this).is(":checked");
		table.find("tr input[type='checkbox']").prop({"checked":check});
	})
}

/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm:ss");
}