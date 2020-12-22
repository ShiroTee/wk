$(function() {
	$('body').delegate('#right-list tr td a.md-right-edit', 'click',
			function() {
				rightEdit(this, 'edit');
			}).delegate('#addRightRole', 'click', function() {
		rightEdit(this);
	}).delegate('#right-list tr td a.md-right-del', 'click', rightDel)
			.delegate('#right-list tr td a.md-right-set', 'click', function() {
				rightSet(this, 'catalogue');
			}).delegate('#right-list tr td a.md-right-user-set', 'click',
					function() {
						rightSet(this, 'user');
					});
	queryAuthorityInfo();
	$("#authority-args").bind('keypress', function(event) {
		if (event.keyCode == "13")
			queryAuthorityInfo();
	});
});

function queryAuthorityInfo() {
	var params = {
		args : $("#authority-args").val()
	};
	updatePagination("authorInfoHandler/getPageList.json", params, 0, 8,
			function(data) {
				authorityInfoInit(data);
			}, "#authorityManage-page");
}

/**
 * 组装授权列表信息
 * @returns
 */
function authorityInfoInit(data) {
	if (data.list.length == 0) {
		return;
	}
	var html = '';
	for (var i = 0; i < data.list.length; i++) {
		var content = data.list[i];
		html += '<tr>';
		html += '<td>' + content.authKey + '</td>';
		html += '<td>' + content.user.name + '</td>';
		html += '<td>' + content.user.loginName + '</td>';
		html += '<td>' + TimestampToStr_authorityManage(content.addDate)
				+ '</td>';

		if (content.status == 1) {
			html += '<td style="color:green">启用</td>';
		} else {
			html += '<td style="color:red">禁用</td>';
		}

		if (content.status == 1) {
			html += '<td><div>'
					+ '<a class="md-able" onclick="authorityStop($(this)) " href="javascript:void(0);" title="停用" data-authorityId="' + content.authId + '" >'
					+ '<i class="icon icon-stop mr5" aria-hidden="true"></i></a>'
		} else {
			html += '<td><div>'
					+ '<a class="md-able" onclick="authorityAble($(this))" href="javascript:void(0);" title="启用" data-authorityId="' + content.authId + '" >'
					+ '<i class="icon icon-play-circle mr5" aria-hidden="true"></i></a>'
		}
		html += '<a class="md-authority-detail" onclick="showDetails_authorityManage($(this))" href="javascript:void(0);" title="查看授权内容" data-authorityId="' + content.authId + '" >'
				+ '<i class="icon icon-search" aria-hidden="true"></i></a></div></td>';
		html += '</tr>';
	}

	$("#authority-table tbody").html(html);
}

function showDetails_authorityManage(obj) {
	var authorityId = obj.attr("data-authorityId");
	$.modal({
		url : "admin/resourceCatalogue/authorityDetails.html",
		title : '授权内容',
		size : 'modal-lg',
		data : {
			authorityId : authorityId
		}
	});
}


/**
 * 启用服务
 * @param el
 * @param able
 */
function authorityAble(obj) {
	var authorityId = obj.attr("data-authorityId");
	$.ajax({
		url :　"authorInfoHandler/start.json",
		type : "post",
		data : {authId : authorityId},
		dataType : "json",
		success : function(data){
			if(data.success){
				$.message("启动成功");
				queryAuthorityInfo();
			}
			else{
				$.alert(data.msg);
			}
		}
	})
}

/**
 * 停用服务
 * @param el
 * @param able
 */
function authorityStop(obj) {
	var authorityId = obj.attr("data-authorityId");
	$.confirm("确认停用?", function() {
		$.ajax({
			url :　"authorInfoHandler/stop.json",
			type : "post",
			data : {authId : authorityId},
			dataType : "json",
			success : function(data){
				if(data.success){
					$.message("停止成功");
					queryAuthorityInfo();
				}
				else{
					$.alert(data.msg);
				}
			}
		})
	});
}

function rightEdit(el, operate) {
	var roleId = $(el).attr("data-roleId");
	$.modal({
		url : "admin/resourceCatalogue/authorityRoleEdit.html",
		title : (operate == 'edit' ? '编辑' : '新增') + '角色信息',
		data : {
			operate : operate,
			roleId : roleId
		}
	});
}
function rightDel() {
	var roleId = $(this).attr("data-roleId"), title;
	$.confirm("确认删除?", function() {
		/*$.submitData(
		{
			url : "role/delete.json",
			data :
			{
				roleId : roleId
			},
			sucFun : function(data)
			{*/
		$.message("删除成功");
		/*tr.remove();
		treeModel.deleteNode(dictId);
		}
		});*/
	});
}
function rightSet(el, type) {
	var roleId = $(el).attr("data-roleId"), title, size;
	switch (type) {
	case 'catalogue':
		title = '资产权限配置', size = 'modal-lg';
		break;
	case 'user':
		title = '用户分配';
		break;
	}
	$.modal({
		url : "admin/resourceCatalogue/authorityRightSet.html",
		title : title,
		size : size,
		data : {
			type : type,
			roleId : roleId
		}
	});
}

/**
 * timestamp 转时间字符串
 */
function TimestampToStr_authorityManage(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm:ss");
}