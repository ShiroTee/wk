$(function()
{
	var userPage = $("#org-user-page");
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
			var reqData =
			{
				pageIndex : data.pageIndex,
				pageSize : data.pageSize
			};
			workspace.reload("user/list.html", reqData);
		});
	}

	$("#org-user-table tbody tr").each(function()
	{
		event($(this));
	});
	$("#org-user-table thead tr th input").click(function()
	{
		var checked = $(this).is(":checked");
		if (checked)
		{
			$("#org-user-remove-btn").removeAttr("disabled");
			$("#org-user-save-sbtn").removeAttr("disabled");
		} else
		{
			$("#org-user-remove-btn").attr("disabled", "disabled");
			$("#org-user-save-sbtn").attr("disabled", "disabled");
		}
		$("#org-user-table tr").each(function()
		{
			$(this).find("td:eq(0) input").prop(
			{
				checked : checked
			});
		});
	});
	// 往新增用户页面
	$("#org-user-save-btn").click(function()
	{
		var orgId = $(this).attr("orgId");
		$.modal(
		{
			url : "org/userList.html",
			title : "用户列表",
			size : "modal-lg",
			data :
			{
				orgId : orgId,
				op : "add"
			}
		});
	});
	// 添加用户
	$("#org-user-save-sbtn").click(function()
	{
		var users = [];
		var orgId = $(this).attr("orgId");
		$("#org-user-table tr").each(function()
		{
			var checkbox = $(this).find("td:eq(0) input");
			if (checkbox.is(":checked"))
			{
				users.push(checkbox.val());
			}
		});
		$.submitData(
		{
			url : "org/addUser.json",
			data :
			{
				orgId : orgId,
				users : users.join(",")
			},
			sucFun : function(data)
			{
				$.modal(
				{
					url : "org/userList.html",
					title : "用户列表",
					size : "modal-lg",
					data :
					{
						orgId : orgId,
						op : "edit"
					}
				});
			}
		});
	});
	$("#org-user-return-btn").click(function()
	{
		var orgId = $(this).attr("orgId");
		$.modal(
		{
			url : "org/userList.html",
			title : "用户列表",
			size : "modal-lg",
			data :
			{
				orgId : orgId,
				op : "edit"
			}
		});
	});
	$("#org-user-table tr").each(function()
	{
		var checked = false;
		$(this).find("td:eq(0) input").click(function()
		{
			var checkbox = $(this);
			if ($(this).is(":checked"))
			{
				$("#org-user-remove-btn").removeAttr("disabled");
				$("#org-user-save-sbtn").removeAttr("disabled");
			} else
			{
				$("#org-user-table tr").each(function()
				{
					checked = $(this).find("td:eq(0) input").is(":checked");
				});
				if (checked)
				{
					$("#org-user-remove-btn").removeAttr("disabled");
					$("#org-user-save-sbtn").removeAttr("disabled");
				} else
				{
					$("#org-user-remove-btn").attr("disabled", "disabled");
					$("#org-user-save-sbtn").attr("disabled", "disabled");
				}
			}
		});
	});
	// 移除用户
	$("#org-user-remove-btn").click(function()
	{
		var orgId = $(this).attr("orgId");
		var users = [];
		$("#org-user-table tr").each(function()
		{
			var checkbox = $(this).find("td:eq(0) input");
			if (checkbox.is(":checked"))
			{
				users.push(checkbox.val());
			}
		});
		removeUser(users, orgId);

	});
	// 搜索用户
	$("#org-user-search-btn").click(function()
	{
		var orgId = $(this).attr("orgId");
		$.modal(
		{
			url : "org/userList.html",
			title : "用户列表",
			size : "modal-lg",
			data :
			{
				orgId : orgId,
				op : "add",
				searchWord:$("#org-user-search-text").val()
			}
		});

	});
});
function event(tr)
{
	var td = tr.find("td:eq(7)");
	td.find("a").click(function()
	{
		var userId = $(this).attr("userId");
		var orgId = $("#org-user-remove-btn").attr("orgId");
		removeUser([ userId ], orgId);
	});
};
function removeUser(users, orgId)
{
	$.submitData(
	{
		url : "org/remove.json",
		data :
		{
			orgId : orgId,
			users : users.join(",")
		},
		sucFun : function(data)
		{
			$.each(users, function(i, item)
			{
				var table = $("#org-user-table");
				table.find("input[type='checkbox'][value='" + item + "']")
						.parent().parent().remove();
			});
		}
	});
}