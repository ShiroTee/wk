$(function() {
	$("table th input[type='checkbox']").click(onMdTableAllCheck);
	service_authorityDetails();
	// 服务列表展开事件
	$('#authority-service-list').on('show.bs.collapse', function() {
		service_authorityDetails();
	});

	// 文件列表展开事件
	$('#file-info-pane').on('show.bs.collapse', function() {
		fileAuthority_authorityDetails();
	});
})

/**
 * 表格全选/不选
 * @param {} e
 */
function onMdTableAllCheck(e) {
	var check = $(this).is(":checked");
	$(this).closest('table').find('tr input[type="checkbox"]').prop({
		"checked" : check
	});
}

/**
 * 展开查看授权服务详情
 */
function service_authorityDetails(){
	var params = {
			authId:authorityId,
			routeType : "service"
		};
		updatePagination("serviceInfo/getPageListByAuthKey.json", params, 0, 3,
				function(data) {
			serviceAuthority_authorityDetails_data(data);
				}, "#serviceList-authorityDetails");
}

/**
 * 删除文件关联关系
 */
function deleteData_authorityDetails(type){
	var fileID = '';
	if(type == 1){
		$(".service_check_authorityDetails").each(function(){
			if($(this).is(":checked")){
				fileID = $(this).attr("routeid");
			}
		})
	}
	else{
		$(".file_check_authorityDetails").each(function(){
			if($(this).is(":checked")){
				fileID = $(this).attr("routeid");
			}
		})
	}
	if('' == fileID){
		return;
	}
	
	$.ajax({
		url : "ResourceCatalogueInfoHandler/deleteData.json",
		data : {routeId : fileID,authId : authorityId},
		dataType　: "json",
		type : "post",
		success:function(data){
			if(data.success){
				$.message("移除成功！");
				fileAuthority_authorityDetails();
			}
			else{
				$.alert(data.msg);
			}
		}
	})
}
/**
 * 展开查看具体授权文件分页
 * 
 */
function fileAuthority_authorityDetails(){
	var params = {
			authId:authorityId,
			routeType : "ftp"
		};
		updatePagination("serviceInfo/getPageListByAuthKey.json", params, 0, 3,
				function(data) {
			fileAuthority_authorityDetails_data(data);
				}, "#fileList-authorityDetails");
}


/**
 * 展开查看具体授权文件分页数据组装
 * 
 */
function fileAuthority_authorityDetails_data(data){
	if(data.list.length == 0){
		$("#authority-file-list tbody").html('<tr><td colspan="5" style="color: red; text-align: center;">暂无授权服务</td></tr>');
		return;
	}
	var html = '';
	for(var i=0;i<data.list.length;i++){
		var content = data.list[i];
		
		html += '<tr><td><label class="position-relative"><input type="checkbox" '
					+ 'class="ace file_check_authorityDetails" routeid="' + content.routeId + '"><span class="lbl"></span></label></td>';
		html += '<td>' + content.fileName + '</td>';
		html += '<td>' + TimestampToStr_authorityDetails(content.publishDate) + '</td>';
		html += '<td>' + content.provider.orgName + '</td>';
		if(content.runningStatus == 1){
			html += '<td style="color:green">正常</td>';
		}
		else{
			html += '<td style="color:red">异常</td>';
		}
		html += '</tr>';
	}
	$("#authority-file-list tbody").html(html);
	
}


function serviceAuthority_authorityDetails_data(data){
	if(data.list.length == 0){
		return;
	}
	var html = '';
	for(var i=0;i<data.list.length;i++){
		var content = data.list[i];
		
		html += '<tr><td><label class="position-relative"><input type="checkbox" '
					+ 'class="ace service_check_authorityDetails"><span class="lbl"></span></label></td>';
		html += '<td>' + content.routeName + '</td>';
		html += '<td>' + TimestampToStr_authorityDetails(content.publishDate) + '</td>';
		html += '<td>' + content.provider.orgName + '</td>';
		if(content.runningStatus == 1){
			html += '<td style="color:green">正常</td>';
		}
		else{
			html += '<td style="color:red">异常</td>';
		}
		html += '</tr>';
	}
	$("#authority-service-list tbody").html(html);
}



/**
 * timestamp 转时间字符串
 */
function TimestampToStr_authorityDetails(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm:ss");
}
