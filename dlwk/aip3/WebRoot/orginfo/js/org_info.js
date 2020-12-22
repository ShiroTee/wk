$(function()
{
	var form = new Form("org-form");
	var orgForm=$("#org-form");
	orgForm.find("input[type='checkbox']").change(function()
	{
		if($(this).is(":checked"))
		{
			orgForm.find("input[name='orgCode']").attr("disabled","disabled");
			orgForm.find("input[name='orgCode']").attr("placeholder","自动生成机构编码");
			$(this).val("1");
		}
		else
		{
			orgForm.find("input[name='orgCode']").removeAttr("disabled");
			orgForm.find("input[name='orgCode']").attr("placeholder","请输入组织机构编码");
			$(this).val("0");
		}
	});
	$("#org-save-sbtn").click(function()
	{
		var parentId = form.getFieldValue("parentId", "input");
		form.submit(
		{
			url : "org/add.json",
			type : "post",
			sucFun : function(data)
			{

				$.closeModal();
				$.message("保存自增机构信息成功");
				workspace.reload("org/list.html",
				{
					parentId : parentId
				});
			}
		});
	});
	$("#org-edit-sbtn").click(function()
	{
		var parentId = form.getFieldValue("parentId", "input");
		form.submit(
		{
			url : "org/edit.json",
			type : "post",
			sucFun : function(data)
			{

				$.closeModal();
				$.message("修改字典信息成功");
				workspace.reload("org/list.html",
				{
					parentId : parentId
				});
			}
		});
	});
});