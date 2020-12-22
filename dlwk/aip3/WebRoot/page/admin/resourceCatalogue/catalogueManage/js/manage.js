	var cataloguetreeModel = null;
	var currentNode = "";
$(function()
{
	AutoLayout.exec('#catalogue-gov-tree-box',43 + 15);
	AutoLayout.exec('#catalogue-table-box',62 + 15);
	$("#dict-search-text").bind('keypress', function(event) {
		if (event.keyCode == "13")
			queryService();
	});
	
	queryService();
	cataloguetreeModel = new $.TreeModel(
	{
		el : "catalogue-gov-tree-catalogueManage",
		ifcheck_online :true,
		if_checkbox_caught_action:true,
		fold_item : true,
		call:function(node){
//			if(node.nodeId=="I_wJgN0CEeOlovfuVspipA"){
//				return;
//			}
			$("#catalogue_category").val("非空间");
			$("#structure_category").val("Arch_busi_uview");
			cataloguetreeModel.select(node.nodeId);
			$("#dict-search-text").val('');
			currentNode = node.nodeId;
			queryService(node.nodeId);
			
//			workspace.reload("sps/getOrgTree.html",{node:node.nodeId});
		}
	});
	
	$('body').delegate('.md-details','click',showDetails)
			 .delegate('.md-services','click',addServices)
			 .delegate('.md-files','click',addFiles);
			 
	$("table th input[type='checkbox']").click(onMdTableAllCheck);
	
	
});


/**
 * 更新发布状态
 */
function updateStatus(obj){
	var id = obj.attr("serviceID");
	var status = obj.attr("status");
	var upfunction = function(){
		$.ajax({url:"resourceCatalogue/updateStatus.json",
			data:{resourceIds:id,status:status},
			type:"post",
			dataType:"json",
			success:function(data){
				if(data.success){
					var massage = status == 0?"取消发布成功":"发布成功";
					$.message(massage);
					queryService();
				}
			},
		})
		
	}
	if(status == 0){
		$.confirm("是否确认取消",function(){
			upfunction();
		});
	}
	else{
		upfunction();
	}
}


function queryService(node){
	var params={
			orgId:currentNode,
			archCateId:$("#structure_category").val(),
			sm_flag:$("#catalogue_category").val(),
			assetName:$("#dict-search-text").val(),
			ispublish:$("#catalogue_ispublish").val()	
		};
	if(null != node){
		params['orgId'] = node;
	}
	updatePagination("resourceCatalogue/getPageList.json",params,0,8,function(data){
		sourceInit(data);
	},"#cataloguePageDIV");
}
/**
 * 组装委办局对应的服务
 * @param data
 */
function sourceInit(data){
	$("#catalogue-table tbody").html('');
	var html = '';
	for(var i=0;i<data.list.length;i++){
		var content = data.list[i];
		html += '<tr>';
		html += '<td><label class="position-relative">'
			 + '<input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
		html += '<td>' + content.resourceName + '</td>';
		var publevel = content.publicLv.publicLvName == undefined?"-":content.publicLv.publicLvName;
		html += '<td>' + publevel + '</td>';
		if(content.provider.orgName != null && content.provider.orgName != 'null'){
			html += '<td>' + content.provider.orgName + '</td>';
		}
		else{
			html += '<td>-</td>';
		}
		html += '<td>' + content.dictArchCateInfo.typNm + '</td>';
		
		var createDate = content.createDate == null ? "-" : TimestampToStr(content.createDate);
		html += '<td>' + createDate + '</td>';
		var updateRate = '-';
		if(content.updateRate != null){
			switch(content.updateRate){
			case 0 : updateRate = "实时";break;
			case 1 : updateRate = "日";break;
			case 2 : updateRate = "半月";break;
			case 3 : updateRate = "月";break;
			case 4 : updateRate = "季";break;
			case 5 : updateRate = "半季";break;
			case 6 : updateRate = "年";break;
			case 7 : updateRate = "半年";break;
			}
		}
	
		html += '<td>' + updateRate + '</td>';
		var finalUpdateDate = content.finalUpdateDate == null ? "-" : TimestampToStr(content.finalUpdateDate);
		html += '<td>' + finalUpdateDate + '</td>';
		html += '<td><div style="width: 80px;">'
			+ '<a class="md-details" href="javascript:void(0);" title="详情" data-catalogueId="' + content.resourceId + '" data-catalogueName="' + content.resourceName + '">'
			+ '<i class="icon icon-th-list mr5" aria-hidden="true"></i></a>';
		if(content.status == 1){
			html += '<a onclick="updateStatus($(this))" status=0 serviceID="' + content.resourceId + '" class="md-unpublic" href="javascript:void(0);" title="取消发布">'
			+ '<i class="icon icon-lock mr5" aria-hidden="true"></i>'
			+ '</a>';
		}
		else{
			html += '<a onclick="updateStatus($(this))" status=1 serviceID="' + content.resourceId + '" class="md-unpublic" href="javascript:void(0);" title="发布">'
			+ '<i class="icon icon-unlock mr5" aria-hidden="true"></i>'
			+ '</a>';
		}
			html += '<a class="md-services" href="javascript:void(0);" data-catalogueId="' + content.resourceId + '" data-catalogueName="' + content.resourceName + '" title="挂接服务">'
			+ '<i class="icon icon-cogs mr5" aria-hidden="true"></i>'
			+ '</a>'
			+ '<a data-catalogueId="' + content.resourceId + '" data-catalogueName="' + content.resourceName + '" class="md-files" href="javascript:void(0);" title="挂接文件">'
			+ '<i class="icon icon-file" aria-hidden="true"></i>'
			+ '</a></div></td>';
	}
	$("#catalogue-table tbody").html(html);
}
/**
* 表格全选/不选
* @param {} e
*/
function onMdTableAllCheck(e)
{
	var check=$(this).is(":checked");
	$("#catalogue-table tr input[type='checkbox']").prop({"checked":check});
}
function showDetails(){
	var catalogueId = $(this).attr("data-catalogueId"),
		catalogueName = $(this).attr("data-catalogueName");
	$.modal({
		url : "resourceCatalogue/details.html",
		title : catalogueName,
		size:'modal-lg',
		data :{
			op : "edit",
			resourceID : catalogueId
		}
	});
}
function addServices(){
	var catalogueId = $(this).attr("data-catalogueId"),
		catalogueName = $(this).attr("data-catalogueName");
	$.modal({
		url : "admin/resourceCatalogue/serviceList.html",
		title : '服务列表',
		size:'modal-lg',
		data :{
			op : "edit",
			id : catalogueId
		}
	});
}
function addFiles(){
	var catalogueId = $(this).attr("data-catalogueId"),
		catalogueName = $(this).attr("data-catalogueName");
	$.modal({
		url : "admin/resourceCatalogue/fileList.html",
		title : '文件列表',
		size:'modal-lg',
		data :{
			op : "edit",
			id : catalogueId,
			catalogueName : catalogueName
		}
	});
}


/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd");
}