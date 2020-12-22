$(function()
{
	$("#user-select-role-div").find("input[type='checkbox']").click(function()
	{
		if ($(this).is(":checked"))
		{
			$(this).closest("li").addClass("selected");
		} else
		{
			$(this).closest("li").removeClass("selected");
		}
	});
	// 为用户添加角色
	$("#user-role-add-btn").click(function()
	{
		removeRole("not-role", "user-in-role");
	});
	// 移除用户
	$("#user-role-remove-btn").click(function()
	{
		removeRole("user-in-role", "not-role");
	});
	// 全部添加
	$("#user-role-addall-btn").click(function()
	{
		removeAllRole("not-role", "user-in-role");
	});
	// 全部移除
	$("#user-role-removeall-btn").click(function()
	{
		removeAllRole("user-in-role", "not-role");
	});
	// 保存用户与角色的对应关系
	$("#user-role-save-sbtn").click(function()
	{
		var roles = [];
		var userId=$(this).attr("userId");
		$("#user-in-role input[type='checkbox']").each(function()
		{
			roles.push($(this).val());
		});
		$.submitData(
		{
			url : "user/configRole.json",
			data :
			{
				userId : userId,
				roleIds : roles.join(",")
			},
			sucFun : function(data)
			{
				$.closeModal();
				$.message("操作成功");
			}
		});
	});
});
function removeAllRole(removeEl, addEl)
{
	var select = [];
	$("#" + removeEl + " input[type='checkbox']").each(function()
	{
		$(this).removeAttr("checked");
		var li = $(this).closest("li");
		li.removeClass("selected");
		select.push(li)
	});
	$("#" + addEl).append(select);
}
function removeRole(removeEl, addEl)
{
	var select = [];
	$("#" + removeEl + " input[type='checkbox']").each(function()
	{
		if ($(this).is(":checked"))
		{
			$(this).removeAttr("checked");
			var li = $(this).closest("li");
			li.removeClass("selected");
			select.push(li)
		}
	});
	$("#" + addEl).append(select);
}