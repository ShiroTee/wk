var treeModel = null;
$(function()
{
	AutoLayout.exec('#resource-tree-box',43 + 15);
	AutoLayout.exec('#table_box',62 + 15);
	var dataTable = $("#resourceTable");
	clickEvent();
	treeModel = new $.TreeModel(
	{
		el : "tree_",
		call : function(node)
		{
			var resourceId = node.nodeId;
			var nodeType = node.nodeType;
			if (nodeType == 0 || nodeType == 3)
			{
				workspace.reload("resource/list.html",
				{
					resourceId : resourceId
				});
			}

		},
	});
	treeModel.expandAll();
	var nodeId = $("#tree_").attr("value");
	treeModel.select(nodeId);
	// 表格单击事件
	function clickEvent()
	{
		dataTable.find("tbody tr").each(function()
		{
			$(this).find("td:eq(4) a:eq(1)").click(deleteResource);
			$(this).find("td:eq(4) a:eq(0)").click(getResourceInfo);
		});
	}
	;

	// 新增资源窗口
	$("#saveResourceBtn").click(function()
	{
		var data =
		{
			op : "add",
			parentId : $(this).attr("pId")
		};
		$.modal(
		{
			url : "resource/info.html",
			title : "新增资源",
			data : data
		})
	});
});
// 删除资源
function deleteResource()
{
	var resourceId = $(this).attr("id");
	var tr = $(this).parent().parent().parent();
	$.confirm("是否删除该资源?", function()
	{
		$.submitData(
		{
			url : "resource/delete.json",
			data :
			{
				resourceId : resourceId
			},
			sucFun : function(d)
			{
				tr.remove();
				// 如果删除的是页面或目录则刷新左边树
				treeModel.deleteNode(resourceId);
				$.message("资源删除成功");
			}
		});
	});
};
// 查看资源详情
function getResourceInfo()
{
	var resourceId = $(this).attr("id");
	$.modal(
	{
		url : "resource/info.html",
		title : "新增资源",
		data :
		{
			op : "edit",
			resourceId : resourceId
		}
	})
};