$(function()
{
	var form = new Form("dict-form");
	var dictForm=$("#dict-form");
	dictForm.find("input[type='checkbox']").change(function()
	{
		if($(this).is(":checked"))
		{
			dictForm.find("input[name='value']").attr("disabled","disabled");
			$(this).val("1");
		}
		else
		{
			dictForm.find("input[name='value']").removeAttr("disabled");
			$(this).val("0");
		}
	});
	$("#dict-save-sbtn").click(function()
	{
		var parentId = form.getFieldValue("parentId", "input");
		form.submit(
		{
			url : "dict/add.json",
			type : "post",
			sucFun : function(data)
			{

				$.closeModal();
				$.message("保存字典信息成功");
				workspace.reload("dict/list.html",
				{
					parentId : parentId
				});
			}
		});
	});
	$("#dict-edit-sbtn").click(function()
	{
		var parentId = form.getFieldValue("parentId", "input");
		form.submit(
		{
			url : "dict/edit.json",
			type : "post",
			sucFun : function(data)
			{

				$.closeModal();
				$.message("修改字典信息成功");
				workspace.reload("dict/list.html",
				{
					parentId : parentId
				});
			}
		});
	});
});