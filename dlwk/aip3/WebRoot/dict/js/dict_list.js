var treeModel = null;
$(function()
{
	AutoLayout.exec('#dict-tree-box',43 + 15);
	AutoLayout.exec('#dict-table-box',62 + 15);
	var dictPage = $("#dict-list-box .m-pagination");
	if (dictPage.length == 1)
	{
		dictPage.pagination(
		{
			total : dictPage.attr("total"),
			pageSize :20,
			pageIndex : dictPage.attr("pageIndex"),
			firstBtnText : '首页',
			lastBtnText : '尾页',
			prevBtnText : '上一页',
			nextBtnText : '下一页',
			showInfo : true,
			infoFormat : "总记录总:{total}条"
		});
		dictPage.on("pageClicked", function(event, data)
		{
			var searchWord = $("#dict-search-text").val();
			var parentId = $("#dict-save-btn").attr("parentId");
			var reqData =
			{
				searchWord : searchWord,
				parentId : parentId,
				pageIndex : data.pageIndex,
				pageSize : data.pageSize
			};
			workspace.reload("dict/list.html", reqData);
		});
	}
	;
	treeModel = new $.TreeModel(
	{
		el : "dict-tree",
		call : function(node)
		{
			var resourceId = node.nodeId;
			workspace.reload("dict/list.html",
			{
				parentId : resourceId
			});

		},
	});
	var sel = $("#dict-parent-select");
	var value = sel.attr("value");
	sel.find("option[value='" + value + "']").attr("selected", true);
	$("#dict-save-btn").click(function()
	{
		var parentId = $(this).attr("parentId");
		$.modal(
		{
			url : "dict/info.html",
			title : "新增字典信息",
			data :
			{
				op : "add",
				parentId : parentId
			}
		});
	});
	$("#dict-table tbody tr").each(function()
	{
		var td = $(this).find("td:eq(4)");
		var tr = $(this);
		td.find("a:eq(0)").click(function()
		{
			var dictId = $(this).attr("dictId");
			$.modal(
			{
				url : "dict/info.html",
				title : "编辑字典信息",
				data :
				{
					op : "edit",
					dictId : dictId
				}
			});
		});
		td.find("a:eq(1)").click(function()
		{
			var dictId = $(this).attr("dictId");
			var parentId = $("#dict-save-btn").attr("parentId");
			$.confirm("确认删除?", function()
			{
				$.submitData(
				{
					url : "dict/delete.json",
					data :
					{
						dictId : dictId
					},
					sucFun : function(data)
					{
						$.message("删除字典信息成功");
						tr.remove();
						treeModel.deleteNode(dictId);
					}
				});
			});
		});
	});
	$("#dict-search-btn").click(function()
	{
		var searchWord = $("#dict-search-text").val();
		var parentId = $("#dict-save-btn").attr("parentId");
		workspace.reload("dict/list.html",
		{
			searchWord : searchWord,
			parentId : parentId
		});
	});
	$("#dict-search-text").keydown(function(e)
	{
		if (e.keyCode == 13)
		{
			$("#dict-search-btn").click();
		}
	});
});