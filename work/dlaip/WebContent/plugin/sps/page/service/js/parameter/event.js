function saveParameterInfo(routeId,win)
{
	var url=getHandlerRequestUrl() + "serviceParameterServiceHandler/saveParameterInfo?routeId="+routeId;
	
	submitForm(win.getComponent(0),url,"保存参数异常",function(){
		win.getComponent(1).store.reload();
		win.getComponent(0).form.reset();
	})
}
function rowclickLoadForm(value)
{
	var grid=Ext.getCmp("parameterGrid");
	var win=grid.findParentByType("window");
	var recs = grid.getSelectionModel().getSelections();
	if(recs.length==1)
	{
		win.getComponent(0).form.reset();
		win.getComponent(0).form.loadRecord(recs[0]);
	}
	
}
function deleteParameterInfo(value)
{
	var url=getHandlerRequestUrl() + "serviceParameterServiceHandler/deleteParameterInfo?parameterId="+value;
	deleteData(url,"删除参数异常",function(){
		var grid=Ext.getCmp("parameterGrid").store.reload();
	});
}