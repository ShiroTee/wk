$(function() {

    $("#userGroup-right #q_listPagination").removeAttr("style");
    $("#userGroup-right #q_listPagination").css('float', 'right');

	// 用户组表格tr点击事件
	$("#user_group_list_box tbody").delegate("tr","click",function() {

		// 改变tr背景颜色
		$(this).parent().find("tr").removeClass("tableTrBackGroundColor");
		$(this).addClass("tableTrBackGroundColor");
		// 获取groupid
		var groupId = $(this).find("td:eq(0)").attr("groupid");
		// 获取用户组内人员
		getGroupUser(groupId);
		
	});
	

	//新增用户事件
	$("#userGroup-add").click(function() {
		if($("#user_group_list_box .tableTrBackGroundColor").size()>0){
			$.modal({
				url : "admin/userGroup/addUser.html",
				title : "新增用户",
				data : {
					op : "add"
				}
			});
		}else{
			$.alert("请先选择用户组！");
			return;
		}
	});
	
	//用户列表点击事件
	$("#userGroup-table tbody").delegate("tr","click",function() {
		// 改变tr背景颜色
		$(this).parent().find("tr").removeClass("tableTrBackGroundColor");
		$(this).addClass("tableTrBackGroundColor");
		
	});
	
	
	//移除用户事件
	$("#userGroup-alter").click(function(){
		var userId=$("#userGroup-table .tableTrBackGroundColor:eq(0)").attr("userId");
		var groupId=$("#user_group_list_box .tableTrBackGroundColor:eq(0)").find("td:eq(0)").attr("groupid");
		var params={userId:userId,groupId:groupId};
		if($("#userGroup-table .tableTrBackGroundColor").size()>0){
			$.confirm("你确认要删除选中的用户吗？",function(e){
			    $.ajax({url:"admin/userGroup/removeUserFromGroup.json",type:"POST",dataType:"json",data:params,
			    success:function(){
			    	$.alert("删除用户成功！",function(e){
			    		//刷新列表
			    		getGroupUser(groupId);
			    	});
			    	$.closeModal();
			    }});
			},
			function(e){
				$.closeModal();
			});
		}else{
			$.alert("请选择要移除的用户！");
			return;
		}
	});
	


});

// 使用组id查找相应的用户
function getGroupUser(groupId) {
	var params = {
		groupId : groupId
	};
	var d=new Date();
	// 查询模型关联的元数据
	updatePagination("admin/userGroup/getUserByGroup.json?time="+d.getTime(),
			params,100,15,
			function(data, pageIndex) {
				$("#userGroup-table tbody").empty();
				var list = data.list;
				var html = "";
				if (list.length > 0) {
					for (var i = 0; i < list.length; i++) {
						var item = list[i];
						var tr = '<tr userId="'+item.user_id+'">';
						tr += '<td class="table-td">' + item.login_name
								+ '</td>';
						tr += '<td class="table-td">' + item.name + '</td>';
						// tr+='<td class="table-td">'+item.email+'</td>';
						tr += '<td class="table-td">' + item.user_tel + '</td>';
						tr += '</tr>';
						html += tr;
					}
				} else {
					html = '<tr><td colspan="5" style="color: red; text-align: center;">暂无可添加用户</td></tr>';
				}
				$("#userGroup-table tbody").html(html);
			}, "#userGroup-table");

}