var currentNode = "";
var treeModel_fileManage = null;
$(function() {
	
	$("#service_add_serviceManager").click(function(){
		$.modal({
			url : "admin/resourceCatalogue/serviceAdd.html",
			size:'modal-lg',
			data :{
				op : "edit",
			}
		});
	})
	queryServiceList();
	$(function() {
		AutoLayout.exec('#service-gov-tree-box', 43 + 15);
		AutoLayout.exec('#service-table-box', 62 + 16);

		treeModel_serviceManage = new $.TreeModel({
			ifcheck_online :true,
			if_checkbox_caught_action:true,
			fold_item : true,
			el : "service-gov-tree",
			call : function(node) {
				var resourceId = node.nodeId;
				treeModel_serviceManage.select(node.nodeId);
				currentNode = node.nodeId;
				queryServiceList(node.nodeId);

			},
		});

		$('body').delegate('.md-authorizeService', 'click',function() {
			authorizeList(this, 'edit');
		})
		.delegate('.md-authorizeService-list', 'click', function() {
			authorizeList(this);
		});

		$("table th input[type='checkbox']").click(onMdTableAllCheck);
	});

	$("#serviceName_serviceManager").bind('keypress', function(event) {
		if (event.keyCode == "13")
			queryServiceList();
	});

	/**
	 * 表格全选/不选
	 * 
	 * @param {}
	 *            e
	 */
	function onMdTableAllCheck(e) {
		var check = $(this).is(":checked");
		$("#service-table tr input[type='checkbox']").prop({
			"checked" : check
		});
	}
	/*
	 * * isEdit == true --> 新增授权 * isEdit == false --> 查看授权列表
	 */
	function authorizeList(el, op) {
		var fileId = $(el).attr("data-fileId"), fileName = $(el).attr(
				"data-fileName");
		var url = "";
		if(op == 'edit'){
			url = "admin/resourceCatalogue/userList_fileManage.html";
		}
		else{
			url = "admin/resourceCatalogue/fileAuthorize.html";
		}
		$.modal({
			url : url,
			title : (op == 'edit' ? '文件授权-' : '查看授权人员-') + fileName,
			data : {
				op : op,
				routeId :　fileId
			}
		});
	}
})

/**
 * 文件列表查询
 * 
 * @param node
 */
function queryServiceList(node) {
	var params = {
		routeName : $("#serviceName_serviceManager").val(),
		provider : currentNode
	};
	if (null != node) {
		params['provider'] = node;
	}
	updatePagination("serviceInfoHandler/searchWebService.json", params, 0, 8,
			function(data) {
				serviceList_serviceManager(data);
			}, "#serviceManagePage");
}

/**
 * 文件列表组装
 * 
 * @param data
 */
function serviceList_serviceManager(data) {
	var html = '';
	for (var i = 0; i < data.list.length; i++) {
		var content = data.list[i];
		html += '<tr>';
		html += '<td><label class="position-relative">'
				+ '<input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
		html += '<td style="width:150px"><div style="width:100px">' + content.routeName + '</div></td>';
		var resource = '-';
		if (null != content.resource) {
			resource = content.resource.resourceName;
		}
		html += '<td style="width:150px" ><div style="width:100px">' + resource + '</div></td>';
		html += '<td style="width:150px"><div style=" width: 200px; word-break: break-all;">' + content.showURL + '</div></td>';
		html += '<td style="width:50px"><div style=" width: 50px; word-break: break-all;">' + content.routeType + '</div></td>';
		if (content.isAuth == 1) {
			html += '<td style="color:red;width:100px"><div style="width:70px">授权访问</div></td>';
			;
		} else {
			html += '<td style="color:green;width:100px"><div style="width:70px">公开访问</div></td>';
		}
		
		if (content.routeStatus == 1) {
			html += '<td style="color:green;width:50px"><div style="width:50px">启用</div></td>';
		} else {
			html += '<td style="color:red;width:50px"><div style="width:50px">禁用</div></td>';
		}
		html += '<td><div style="width:120px">' + TimestampToStr(content.publishDate) + '</div></td>';
		html += '<td>';
		html += '<div style="width: 110px;">';
		html += '<a class="md-details" href="javascript:void(0);" title="详情" onclick="serviceDetails_serviceManager($(this))"'
			+ 'data-catalogueid="' + content.routeId + '" data-cataloguename="' + content.routeName + '"><i class="icon icon-th-list mr5" aria-hidden="true"></i></a>'
		html += '<a class="md-del" href="javascript:void(0);" onclick="deleteFile_serviceManager($(this))" data-fileId="'
				+ content.routeId
				+ '" title="删除" file-name="'
				+ content.publishURL
				+ '">'
				+ '<i class="icon icon-trash mr5" aria-hidden="true"></i>'
				+ '</a>'
				+ '<a class="md-authorizeService" href="javascript:void(0);" title="服务授权"  data-fileId="'
				+ content.routeId
				+ '" '
				+ ' data-fileName="' + content.routeName + '">'
				+ '<i class="icon icon-user mr5" aria-hidden="true"></i>'
				+ '</a>'
				+ '<a class="md-authorizeService-list" href="javascript:void(0);" title="查看授权人员" data-fileId="'
				+ content.routeId
				+ '" '
				+ ' data-fileName="' + content.routeName + '">'
				+ '<i class="icon icon-group" aria-hidden="true"></i></a></div></td>';
	}
	$("#service-table-serviceManager tbody").html(html);
}

/**
 * 删除文件信息
 */
function deleteFile_serviceManager(obj) {
	$.confirm("确认删除?", function() {
		$.ajax({
			url : "serviceInfoHandler/deleteRoute.json",
			data : {
				routeId : obj.attr('data-fileId')
			},
			dataType : "json",
			type : "post",
			success : function(data) {
				if (data.success) {
					$.message("删除成功！");
					queryServiceList();
				}
				else{
					$.alert(data.msg);
				}
			}
		})
	});
}

function deleteFTPfile_fileManager(obj) {
	$.confirm("确认删除?", function() {
		$.ajax({
			url : "fileInfo/deleteFile.json",
			data : {
				fileName : obj.attr('file-name')
			},
			dataType : "json",
			type : "post",
			success : function(data) {
				if (data.success) {
					$.message("删除成功！");

				}
			}
		})
	})
}

function serviceDetails_serviceManager(el){
	var serviceId = el.attr("data-catalogueid"), serviceName = el.attr("data-catalogueName");
	$.modal({
		url : "admin/resourceCatalogue/serviceDetails.html",
		title : serviceName,
		data : {
			op : "2",
			serviceId : serviceId
		}
	});
}

/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm");
}
