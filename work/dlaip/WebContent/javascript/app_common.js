function getHandlerRequestUrl()
{
	var contextPath =getContextPath();
	return  contextPath + "app/http/"+appCode+"/";
}
function getContextPath()
{
	var obj = window.location;
	var contextPath = obj.pathname.split("/")[1];
	if("plugin"==contextPath)
	{
		return "/";
	}
	if("index.jsp"==contextPath)
	{
		return "/";
	}
	return "/" + contextPath + "/";
}
function formatDate(value, format)
{

	if (!value || "" == value) {
		return "";
	}
	var date = new Date(value);
	return date.format("Y-m-d H:i:s");
}
function formatStatus(value)
{
	if (value == "Y")
	{
		return "<font color='green'>启用</font>";
	}
	return "<font color='red'>禁用</font>";
}
function search_(url, message, callback)
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
/**
 * EXTJS4版本
 * @param url
 * @param message
 * @param callback
 */
function search4_(url, message, callback)
{
	Ext.Ajax.request(
	{
		url : url,
		method : 'POST',
		success : function(response, options)
		{
			var result =  Ext.decode(response.responseText);
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
			var result =  Ext.decode(response.responseText);
			Ext.Msg.alert('提示', message + "异常码：" + result.msg);
		}
	});
}
function createStatusItem()
{
	var item =
	{
		xtype : 'radiogroup',
		fieldLabel : '状态',
		width : 240,
		columns : [ 120, 120 ],
		vertical : true,
		items : [
		{
			boxLabel : '启用',
			name : 'status',
			inputValue : 'Y',
			checked : true
		},
		{
			boxLabel : '禁用',
			name : 'status',
			inputValue : 'N'
		}

		]
	};
	return item;
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
function createAppCombox(width,label,itemId)
{
	if(!itemId)
	{
		itemId=new Date().getTime()+"";
	}
	return new Ext.form.ComboBox({
		mode : 'local',
		displayField : 'appName',
		valueField : 'appCode',
		triggerAction : 'all',
		displayField : 'appName',
		valueField : 'appId',
		width :width?width:280,
		id:itemId,
		allowBlank : false,
		hiddenName : 'appId',
		fieldLabel:label?label:"所属应用",
		store : new Ext.data.JsonStore({ // 填充的数据
			url : getHandlerRequestUrl() + 'appInfoHandler/getAppInfoList',
			autoLoad : true,
			fields : new Ext.data.Record.create([ 'appId', 'appName' ])
		}),
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	});
}
function createUserCombox(width,itemId,createAppTag)
{
	if(!itemId)
	{
		itemId=new Date().getTime()+",";
	}
	if(!createAppTag)
	{
		createAppTag="";
	}
	
	var p = new Ext.form.ComboBox(
	{
		mode : 'local',
		displayField : 'name',
		valueField : 'userId',
		triggerAction : 'all',
		width : width ? width : 280,
		emptyText : '请选择用户',
		allowBlank : false,
		hiddenName : 'userId',
		fieldLabel : "创建人",
		id:itemId,
		store : new Ext.data.JsonStore(
				{ // 填充的数据
					url : getHandlerRequestUrl()
							+ 'userInfoManagerHandler/getUserList?createAppTag='+createAppTag,
					autoLoad : true,
					fields : new Ext.data.Record.create([ 'userId', 'name' ])
				}),
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	});
	return p;
}
function createFieldLabel(fieldLabel)
{
	return "<font color='red'>*</font>"+fieldLabel;
}