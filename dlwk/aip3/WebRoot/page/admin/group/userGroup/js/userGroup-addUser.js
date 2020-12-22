$(function(){
	getUsers();
	
	//添加用户按钮事件
	$("#userGroup-selectUser").click(function(){
		addUser();
	});
	
	//搜索用户按钮事件
	$("#userGroupAdd-searchUserBtn").click(function(){
		var keyWord=$("#userGroupAdd-searchUser").val();
		getUsers(keyWord);
	});
	
	
	
	
});

//获取新增用户模态框中用户列表信息
function getUsers(keyWord){
	var groupId=$("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
	var params = {groupId:groupId,keyWord:keyWord};
	var d=new Date();
	// 查询模型关联的元数据
	updatePagination(
			"admin/userGroup/getUsers.json?time="+d.getTime(),params,100,10,
			function(data, pageIndex) {
				$("#non-users tbody").empty();
				var list = data.list;
				var html = "";
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						var item = list[i];
						var tr = '<tr>';
						tr += '<td><input type="checkbox" userId='+item.user_id+' name="select_role"></td>';
						tr += '<td class="table-td">' + item.login_name
								+ '</td>';
						tr += '<td class="table-td">' + item.name + '</td>';
						// tr+='<td class="table-td">'+item.email+'</td>';
						tr += '<td class="table-td">' + item.user_tel + '</td>';
						tr += '</tr>';
						html += tr;
					}
				} else {
					html = '<tr><td colspan="5" style="color: red; text-align: center;">暂无可关联的元数据</td></tr>';
				}
				$("#non-users tbody").html(html);
				$("#userGroup-userList .m-pagination").css("margin-top","0px");
			}, "#userGroup-userList");
}

//组中添加用户方法
function addUser(){
	var groupId=$("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
	var userId= new Array();
	$("#userGroup-userList input:checked").each(function(){ 
		userId.push($(this).attr("userId")); 
	}) ;
	if(userId.length>0){
		$("#userGroup-selectUser").attr("disabled","disabled");
		var d=new Date();
		    $.ajax({
				url : "admin/userGroup/addUserToGroup.json?time="+d.getTime(),
				type : "POST",
				dataType : "json",
				data : {groupId:groupId,userId:userId.join(",")},
				success : function() {
					$.alert("用户添加成功！", function(e) {
						getGroupUser(groupId);
					});
				$.closeModal();
			}
		});
	}else{
		$.alert("请选择要添加的用户！");
	}
	
}