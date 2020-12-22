$(function()
{
	var rolePage = $("#role-page");
	rolePage.pagination(
	{
		total : rolePage.attr("total"),
		pageSize :DEFAULT_PAGE_SIZE,
		pageIndex : rolePage.attr("pageIndex"),
		firstBtnText : '首页',
		lastBtnText : '尾页',
		prevBtnText : '上一页',
		nextBtnText : '下一页'
	});
	$("#roleInfoTable tbody tr").each(function()
	{
		event($(this));
	});
	$("#save-role-btn").click(function()
	{
		$.modal(
		{
			url:"role/info.html",
			title:"新增角色",
			data:{op:"add"}
		});
	});

});
function event(tr)
{
	var td = tr.find("td:eq(4)");
	// 编辑事件
	td.find("a:eq(0)").click(showRoleInfo);
	// 功能定义
	td.find("a:eq(1)").click(functionDefinition);
	// 删除事件
	td.find("a:eq(2)").click(deleteRoleInfo);
};
function deleteRoleInfo()
{
	var roleId = $(this).attr("roleId");
	$.confirm("您确定要删除吗", function(result)
	{
		$.submitData(
		{
			url : "role/delete.json",
			data :
			{
				roleId : roleId
			},
			sucFun(data)
			{
				$.closeModal();
				$.message("删除角色信息成功");
				workspace.reload("role/list.html");
			}
		});
	});
}
function functionDefinition()
{
	var roleId = $(this).attr("roleId");
	var roleName = $(this).attr("roleName");
	var html = '功能定义(<font color="red">' + roleName + '</font>)';
	$.modal({
		url:"role/resourceTree.html",
		title:html,
		data:{roleId : roleId}
	});
};
function showRoleInfo()
{
	var roleId = $(this).attr("roleId");
	$.modal({
		url:"role/info.html",
		title:"新增角色",
		data:
		{	op : "edit",
			roleId : roleId
		}
	});
}