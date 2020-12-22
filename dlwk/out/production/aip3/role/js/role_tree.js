$(function()
{
	AutoLayout.exec('#role-tree-box',43 + 15)
	var treeModel = new $.TreeModel(
	{
		el : "role_tree",
		multiselect:true
	});
	treeModel.expandAll();
	/**
	 * 保存功能定义
	 */
	$("#edit-resource-btn").click(function()
	{
		var btn=$(this);
		var roleId = $(this).attr("roleId");
		var values = treeModel.getSelectData();
		$.submitData(
		{
			url : 'role/configResource.json',
			type:"post",
			data :
			{
				roleId:roleId,
				resourceIds:values
			},
			sucFun:function(data)
			{
				$.message("操作成功");
			}
		});
	});
});