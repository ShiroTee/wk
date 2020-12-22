

$(function(){
	
	updateUser_fileManage();
	
	//键盘搜索事件
	$('#searchCondition_user_fileManage').bind('keypress', function(event) {
		if (event.keyCode == "13")
			updateUser_fileManage();
	})
	
	//表单选择框-不重复选择-事件
//	$('body').on('click', '.user_list_fileManager', function() {
//		var checked = $(this).is(':checked');
//		var current = $(this);
//		if (checked) {
//			operationID = $(this).val();
//			$(".user_list_fileManager").each(function() {
//				$(this).not(current).prop("checked", false);
//			});
//		}
//	})
	
})


function updateUser_fileManage(){
	var url = "authUserHandler/allowedUser.json";
	var condition = $("#searchCondition_user_fileManage").val();
	var params = {
		condition : condition,
		routeId : routeId_fileManage
	};
	updatePagination(url, params, 0, 8, function(data) {
		userList_fileMange(data);
	},"#userDIV_fileManage");
}

function userList_fileMange(data) {
	if(data == null){
		return 
	}
	var html = '';
	for (var i = 0; i < data.list.length; i++) {
		html += '<tr>';
		html += '<td><label class="position-relative"><input class="user_list_fileManager ace" type="checkbox" value="'
				+ data.list[i].USER_ID + '"/><span class="lbl"></span></label></td>';
		html += '<td>' + data.list[i].LOGIN_NAME + '</td>';
		html += '<td>' + data.list[i].NAME + '</td>';
		var remark = data.list[i].USER_REMARK == null ? "-"
				: data.list[i].USER_REMARK;
		html += '<td>' + remark + '</td>';
		html += '</tr>';
	}
	$("#userManage-list tbody").html(html);
}


function auth_fileManage(){
	var userList = [];
	$(".user_list_fileManager").each(function(){
		if($(this).is(":checked")){
			userList.push($(this).val());
		}
	})
	if(userList.length == 0){
		return;
	}
	$.ajax({
		url:"authRouteInfo/saveAuthRouteInfo.json",
		data:{selectedUser:userList.join(","),routeId:routeId_fileManage},
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.success){
				$.message("授权成功");
			}
			else{
				$.alert(data.msg);
			}
		}
	})
	
}
