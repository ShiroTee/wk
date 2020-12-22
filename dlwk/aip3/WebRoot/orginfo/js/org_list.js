var treeModel = null;
$(function()
{
	AutoLayout.exec('#org-tree-box',43 + 15);
	AutoLayout.exec('#org-table-box',62 + 15);
	treeModel = new $.TreeModel(
	{
		el : "org-tree",
		call : function(node)
		{
			var resourceId = node.nodeId;
			workspace.reload("org/list.html",
			{
				parentId : resourceId
			});

		},
	});
	var sel = $("#org-parent-select");
	var value = sel.attr("value");
	sel.find("option[value='" + value + "']").attr("selected", true);
	$("#org-save-btn").click(function()
	{
	
		if($(this).attr('disabled') == 'disabled')
		{
			return;
		}
		var parentId = $(this).attr("parentId");
		var modal=$("#org-user-list-modal");
		$.modal(
		{
			url : "org/info.html",
			title : "新增机构信息",
			data :
			{
				op : "add",
				parentId : parentId
			}
		});
	});
	$("#org-table tbody tr").each(function()
	{
		var td = $(this).find("td:eq(4)");

		td.find("a:eq(0)").click(function()
		{
			var orgId = $(this).attr("orgId");
			$.modal(
			{
				url : "org/info.html",
				title : "编辑机构信息",
				data :
				{
					op : "edit",
					orgId : orgId
				}
			});
		});
		// 删除组织机构
		td.find("a:eq(1)").click(function()
		{
			var orgId = $(this).attr("orgId");
			var parentId = $("#org-save-btn").attr("parentId");
			$.confirm("确认删除?", function()
			{
				$.submitData(
				{
					url : "org/delete.json",
					data :
					{
						orgId : orgId
					},
					sucFun : function(data)
					{
						$.message("删除组织机构信息成功");
						workspace.reload("org/list.html",
						{
							parentId : parentId
						});
					}
				});
			});
		});
		// 往组织机构中添加用户
		td.find("a:eq(2)").click(function()
		{
			var orgId = $(this).attr("orgId");
			
			$.modal(
			{
				url : "org/userList.html",
				title : "用户列表",
				size:"modal-lg",
				data :
				{
					orgId : orgId,
					op:"edit"
				}
			});
		});
	});
	$("#org-search-btn").click(function()
	{
		var searchWord = $("#org-search-text").val();
		var parentId = $("#org-save-btn").attr("parentId");
		workspace.reload("org/list.html",
		{
			searchWord : searchWord,
			parentId : parentId
		});
	});
	$("#org-search-text").keydown(function(e)
	{
		if (e.keyCode == 13)
		{
			$("#org-search-btn").click();
		}
	});
});