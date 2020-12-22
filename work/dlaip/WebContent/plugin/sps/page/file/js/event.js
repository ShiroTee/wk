/**
 * 搜索文件
 */
function searchFile()
{
	var downloadURL="";
	var grid = Ext.getCmp("fileGrid");
	var toolbar = grid.getTopToolbar();
	if(Ext.getCmp("downloadURL_input").getValue()!="")
	{
		downloadURL = downloadURL_ + Ext.getCmp("downloadURL_input").getValue();
		Ext.getCmp("downloadURL_input").setValue(downloadURL);
	}
	grid.store
			.reload(
			{
				params :
				{
					downloadURL : downloadURL,
					fileName : toolbar.get(5).getValue(),
					start : 0,
					limit : pageSize
				}
			});

	grid.store.baseParams =
	{
			downloadURL : downloadURL,
			fileName : toolbar.get(5).getValue(),
			start : 0,
			limit : pageSize
	};
}
function deleteFile()
{
	var grid = Ext.getCmp("fileGrid");
	var record = grid.getSelectionModel().getSelected();
	var routeId = record.get("routeId");
	fileName=record.get("publishURL");
	var url = getHandlerRequestUrl()
			+ "fileInfoHandler/deleteRouteInfo?routeId=" + routeId;
	deleteData(url, "删除文件异常", function()
	{
		Ext.MessageBox.confirm("提示", "是否删除FTP上的文件?", function(btnId){
			if (btnId == 'yes')
			{
				Ext.Ajax.request(
						{
							url : getHandlerRequestUrl()+"fileInfoHandler/deleteFile?fileName="+fileName,
							method : 'POST',
							success : function(response, options)
							{
								
								var result = Ext.util.JSON.decode(response.responseText);
								if (result.success)
								{
									Ext.Msg.alert('提示', "删除FTP文件成功");
								} else
								{
									Ext.Msg.alert('提示', message + "异常码：" + result.msg);
								}
							},
							failure : function(response, options)
							{
								var result = Ext.util.JSON.decode(response.responseText);
								msgTip.hide();
								Ext.Msg.alert('提示', message + "异常码：" + result.data);
							}
						});
			}
		});
		grid.getStore().reload();
	});
}