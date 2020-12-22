$(function()
{
	var form = new Form("role-form");
	$("#role-save-sbtn").click(function()
	{
		form.submit(
		{
			url : "role/add.json",
			type : "post",
			sucFun : function(data)
			{
				$.closeModal();
				$.message("添加角色信息成功");
				workspace.reload("role/list.html");
			}
		});
	});
	$("#role-edit-sbtn").click(function()
	{

		form.submit(
		{
			url : "role/edit.json",
			type : "post",
			sucFun : function(data)
			{
				$.closeModal();
				$.message("修改角色信息成功");
				workspace.reload("role/list.html");
			}
		});
	});
});