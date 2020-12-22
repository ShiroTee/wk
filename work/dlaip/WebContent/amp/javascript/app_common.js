function getHandlerRequestUrl()
{
	var contextPath = getContextPath();
	return contextPath + "app/http/sps/";
}
function getContextPath()
{
	var obj = window.location;
	var contextPath = obj.pathname.split("/")[1];
	if ("plugin" == contextPath)
	{
		return "/";
	}
	return "/" + contextPath + "/";
}
function formatDate(value, format)
{	
	format = "Y-m-d H:i:s";
	var date = new Date(value);
	return date.format(format);
}
function openTab(url, title)
{
	var tabPanel = parent.Ext.getCmp('workspacePanel');
	var html = '<iframe id="mainFrame" name="mainFrame" src="'
			+ getContextPath() + appCode;
	html += url
			+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';
	var tabPage = tabPanel.add(
	{// 动态添加tab页
		title : title,
		id : Math.random() + "",
		closable : true,
		html : html
	});
	tabPanel.setActiveTab(tabPage);// 设置当前tab页

}
// 向服务端提交数据
function submitToServer(url, message, callback)
{
	Ext.Ajax.request(
	{
		url : url,
		method : 'POST',
		success : function(response, options)
		{
			var result = Ext.util.JSON.decode(response.responseText);
			if (result.success)
			{
				callback();
			} else
			{
				Ext.Msg.alert('提示', message + "异常码：" + result.msg);
			}
		},
		failure : function(response, options)
		{
			var result = Ext.util.JSON.decode(response.responseText);
			Ext.Msg.alert('提示', message + "异常码：" + result.msg);
		}
	});
}
function jsonConvert(data,name,key)
{
	if (data[name] && data[name][key])
	{
		return data[name][key];
	} else
	{
		return "";
	}
}