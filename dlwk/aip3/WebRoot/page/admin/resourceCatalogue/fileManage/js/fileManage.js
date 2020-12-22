var currentNode = "";
var treeModel_fileManage = null;
$(function() {

	queryFileList();
	$(function() {
		AutoLayout.exec('#file-gov-tree-box', 43 + 15);
		AutoLayout.exec('#file-table-box', 62 + 16);

		treeModel_fileManage = new $.TreeModel({
			ifcheck_online :true,
			if_checkbox_caught_action:true,
			fold_item : true,
			el : "file-gov-tree",
			call : function(node) {
				var resourceId = node.nodeId;
				treeModel_fileManage.select(node.nodeId);
				currentNode = node.nodeId;
				queryFileList(node.nodeId);

			},
		});

//		$('body').delegate('.md-fileDetails', 'click', showDetails).delegate('.md-authorize', 'click',
//				function() {
//					authorizeList(this, 'edit');
//				}).delegate('.md-authorize-list', 'click', function() {
//			authorizeList(this);
//		});

		$("table th input[type='checkbox']").click(onMdTableAllCheck);

	});

	$("#fileName_fileManager").bind('keypress', function(event) {
		if (event.keyCode == "13")
			queryFileList();
	});

	$("#publishURL_fileManager").bind('keypress', function(event) {
		if (event.keyCode == "13")
			queryFileList();
	});
	
})

/**
 * 文件列表查询
 * 
 * @param node
 */
function queryFileList(node) {
	var params = {
		downloadURL : baseURL + $("#publishURL_fileManager").val(),
		fileName : $("#fileName_fileManager").val(),
		provider : currentNode
	};
	if (null != node) {
		params['provider'] = node;
	}

	updatePagination("serviceInfo/getFileServicePageList.json", params, 0, 8,
			function(data) {
				fileList_fileManager(data);
			}, "#fileManagePage");
}

/**
 * 表格全选/不选
 * 
 * @param {}
 *            e
 */
function onMdTableAllCheck(e) {
	var check = $(this).is(":checked");
	$("#file-table tr input[type='checkbox']").prop({
		"checked" : check
	});
}
function showDetails(obj) {
	
	console.log(11111);
	var fileId = obj.attr("data-fileId"), fileName = obj.attr(
			"data-fileName");
	$.modal({
		url : "admin/resourceCatalogue/fileDetails.html",
		title : fileName,
		data : {
			op : "edit",
			fileId : fileId
		}
	});
}
/*
 * * isEdit == true --> 新增授权 * isEdit == false --> 查看授权列表
 */
function authorizeList(el, op) {
	var fileId = el.attr("data-fileId"), fileName = el.attr(
			"data-fileName");
	var url = "";
	if(op == 2){
		url = "admin/resourceCatalogue/userList_fileManage.html";
	}
	else{
		url = "admin/resourceCatalogue/fileAuthorize.html";
	}
	$.modal({
		url : url,
		title : (op == 2 ? '文件授权-' : '查看授权人员-') + fileName,
		data : {
			op : op,
			routeId :　fileId
		}
	});
}

/**
 * 文件列表组装
 * 
 * @param data
 */
function fileList_fileManager(data) {
	var html = '';
	for (var i = 0; i < data.list.length; i++) {
		var content = data.list[i];
		html += '<tr>';
		html += '<td><label class="position-relative">'
				+ '<input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
		html += '<td style="width:150px"><div style="width:100px">' + content.fileName + '</div></td>';
		html += '<td><div style="width:70px">' + content.fileSizef + '</div></td>';
		var resource = '-';
		if (null != content.resource) {
			resource = content.resource.resourceName;
		}
		html += '<td style="width:150px" ><div style="width:100px">' + resource + '</div></td>';
		html += '<td style="width:150px"><div style=" width: 200px; word-break: break-all;">' + content.showURL + '</div></td>';
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
		html += '<div style="width: 110px;">'
				+ '<a class="md-fileDetails" onclick="showDetails($(this))" href="javascript:void(0);" title="详情" data-fileId="'
				+ content.routeId + '" data-fileName="文件管理说明.txt">'
				+ '<i class="icon icon-th-list mr5" aria-hidden="true"></i>'
		'</a>';
		if (content.isAuth == 0 && content.routeStatus == 1) {html += '<a class="md-download" href="' + content.showURL + '"  data-fileId="'
			+ content.routeId
			+ '" target="_Blank" onclick="" title="下载">'
			+ '<i class="icon icon-download mr5" aria-hidden="true"></i>'
			+ '</a>';
		} else {
			html += '<a style="color:gray"  target="view_window" class="md-download" href="javascript:void(0);"  >'
				+ '<i class="icon icon-download mr5" aria-hidden="true"></i>'
				+ '</a>';
		}
		html += '<a class="md-del" href="javascript:void(0);" onclick="deleteFile_fileManager($(this))" data-fileId="'
				+ content.routeId
				+ '" title="删除" file-name="'
				+ content.publishURL
				+ '">'
				+ '<i class="icon icon-trash mr5" aria-hidden="true"></i>'
				+ '</a>'
				+ '<a class="md-authorize" onclick="authorizeList($(this),2)" href="javascript:void(0);" title="文件授权"  data-fileId="'
				+ content.routeId
				+ '" '
				+ ' data-fileName="' + content.fileName + '">'
				+ '<i class="icon icon-user mr5" aria-hidden="true"></i>'
				+ '</a>'
				+ '<a class="md-authorize-list" onclick="authorizeList($(this))" href="javascript:void(0);" title="查看授权人员" data-fileId="'
				+ content.routeId
				+ '"'
				+ ' data-fileName="' + content.fileName + '">'
				+ '<i class="icon icon-group" aria-hidden="true"></i></a></div></td>';
	}
	$("#file-table-fileManager tbody").html(html);
}

function downloadFile(obj) {
	// $.ajax({
	// url:"serviceInfo/downLoadFile.json",
	// data:{fileId:obj.attr('data-fileId')},
	// dataType:"json",
	// type:"get",
	// success:function(data){
	// return;
	// }
	// })
	var url=record.get("showURL")+"?authKey=DFGHJLK&timestamp="+new Date().getTime();
	$("#downloadFrame").attr('src',
			"serviceInfo/downLoadFile.json?fileId=" + obj.attr('data-fileId'));
}

/**
 * 删除文件信息
 */
function deleteFile_fileManager(obj) {
	$.confirm("确认删除?", function() {
		$.ajax({
			url : "fileInfo/deleteRouteInfo.json",
			data : {
				routeId : obj.attr('data-fileId')
			},
			dataType : "json",
			type : "post",
			success : function(data) {
				if (data.success) {
					$.message("删除成功！");
					queryFileList();
					deleteFTPfile_fileManager(obj);
				}
				else{
					$.alert(data.msg);
				}
			}
		})
	});
}

function deleteFTPfile_fileManager(obj) {
	$.confirm("确认删除FTP文件?", function() {
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

/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm");
}