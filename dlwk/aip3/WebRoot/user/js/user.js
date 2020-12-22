$(function()
{
	var userPage = $("#userPage");
	if (userPage.length == 1)
	{
		userPage.pagination(
		{
			total : userPage.attr("total"),
			pageSize : DEFAULT_PAGE_SIZE,
			pageIndex : userPage.attr("pageIndex"),
			firstBtnText : '首页',
			lastBtnText : '尾页',
			prevBtnText : '上一页',
			nextBtnText : '下一页'
		});
		userPage.on("pageClicked", function(event, data)
		{
			var searchWord = $("#user-search-text").val();
			var reqData =
			{
				searchWord : searchWord,
				pageIndex : data.pageIndex,
				pageSize : data.pageSize
			};
			workspace.reload("user/list.html", reqData);
		});
	}

	$("#user-table tbody tr").each(function()
	{
		event($(this));
	});
	$("#user-save-btn").click(showUserInfo);
	$("#user-search-btn").click(function()
	{
		var searchWord = $("#user-search-text").val();
		workspace.reload("user/list.html",
		{
			searchWord : searchWord
		});
	});
	$("#user-search-text").keydown(function(event)
	{
		event.stopPropagation();
		if (event.keyCode == 13)
		{
			$("#user-search-btn").click();
		}
	});
	$("#user-search-text").focus();
});
function event(tr)
{
	var td = tr.find("td:eq(6)");
	// 编辑事件
	td.find("a:eq(0)").click(showUserInfo);
	// 功能定义
	td.find("a:eq(1)").click(function()
	{
		var userId = $(this).attr("userId");
		var name = tr.find("td:eq(2)").html();
		configUserRole(userId, name);
	});
	// 删除事件
	td.find("a:eq(2)").click(deleteUser);
};
function configUserRole(userId, name)
{
	$.modal(
	{
		url : "user/roleList.html",
		title : "为<font color='red'>" + name + "</font>配置角色",
		data :
		{
			userId : userId
		}
	});
};
function showUserInfo()
{
	var userId = $(this).attr("userId");
	var op = "add";
	if (userId)
	{
		op = "edit";
	}
	$.modal(
	{
		url : "user/info.html",
		title : "用户信息",
		data :
		{
			userId : userId,
			op : op
		}
	});
};
function deleteUser()
{
	var userId = $(this).attr("userId");
	$.confirm("您确定要删除吗?", function()
	{
		$.submitData(
		{
			url : "user/delete.json",
			data :
			{
				userId : userId
			},
			sucFun : function(data)
			{
				$.message("删除用户成功");
				workspace.reload("user/list.html");
			}
		});
	});
};