var cataloguetreeModel_userinfo;
$(function()
{
	$("#userinfo_orgList").click(function(e){
		 if($("#gov_tree_userinfo").hasClass("hide")){
		 $("#gov_tree_userinfo").removeClass("hide");
		 }
		 else{
			 $("#gov_tree_userinfo").addClass("hide");
		 }
		　e.stopPropagation();// 阻止冒泡到body
	})
	 $(" body").click(function(){
　　			$("#gov_tree_userinfo").addClass("hide");
	 });
	$("#orgNameText").on("input",function(event) {
		 $("#gov_tree_userinfo").removeClass("hide");
			var node = cataloguetreeModel_userinfo.findNode($("#orgNameText").val());
			if(node != null){
				$("#orgName").val(node.text);
				$("#orgId").val(node.nodeid);
			}
	});
	
	$('#orgNameText').bind('keypress', function(event) {
		if (event.keyCode == "13" || event.keyCode == "9"){
			$("#orgNameText").val($("#orgName").val());
		}
		$("#gov_tree_userinfo").addClass("hide");
			
	})
	
	$("#gov_tree_userinfo").click(function(e){// 自己要阻止
	　　e.stopPropagation();// 阻止冒泡到body
	});
	$.ajax({
		url : ctx + "/mdp/admin/resourceCatalogue/getOrgInfo.json",
		type : "post",
		dataType : "json",
		data :　"",
		success : function(data){
			$("#gov_tree_userinfo").attr("treeData",JSON.stringify(data))
			cataloguetreeModel_userinfo = new $.TreeModel(
					{
						el : "gov_tree_userinfo",
						ifcheck_online :true,
						if_checkbox_caught_action:true,
						fold_item : true,
						call:function(node){
							cataloguetreeModel_userinfo.select(node.nodeId);
							currentNode = node.nodeId;
							$("#orgNameText").val(node.text);
							$("#orgName").val(node.text);
							$("#orgId").val(currentNode);
						}
					});
			if($("#orgId").val()!=null){
				cataloguetreeModel_userinfo.expandSelect($("#orgId").val());
			}
			 $("#gov_tree_userinfo").addClass("hide");
		}
	})
			
			
	function getRoles()
	{
		var arrays=$("#user-form input[type='checkbox']").filter(":checked");
		var list=[];
		$.each(arrays,function(i,item)
		{
			list.push($(this).val());
		});
		return list.join(",");
	};
	var form = new Form("user-form");
	$("#user-edit-sbtn").click(function()
	{
		form.submit(
		{
			url : ctx+"/mdp/user/edit.json",
			type : "post",
			sucFun : function(data)
			{
				$.closeModal();
				$.message("修改用户信息成功");
				workspace.reload("user/list.html");
			}
		});
	});
	$("#user-rest-btn").click(function()
	{
		form.rest();
	});
	$("#user-save-sbtn").click(function()
	{
		
		
		form.submit(
		{
			url : ctx+"/mdp/user/add.json",
			type : "post",
			sucFun : function(data)
			{
				
				$.closeModal();
				$.message("添加用户成功");
				workspace.reload("user/list.html");
			}
		});
	});
	
	
	// ***************************测试联想事件
	$("#orgNameText").click(function(e) {
		$("#gov_tree_userinfo").removeClass("hide");
		　e.stopPropagation();// 阻止冒泡到body
	})

	$("#downShow").click(function(e) {
		var isFocus = $("#orgNameText").is(":focus");
		var displayValue = $("#gov_tree_userinfo").hasClass("hide");
		if (displayValue) {
			$("#gov_tree_userinfo").removeClass("hide");
		} else {
			$("#gov_tree_userinfo").addClass("hide");
		}
		　e.stopPropagation();// 阻止冒泡到body
	})
});