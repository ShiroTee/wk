//var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
/*
 * 提交Form表单数据
 */

/**
 * 格式化小数
 * 
 * @param x
 * @return
 */
function changeTwoDecimal(x)  
{  
	var length = x.toString().indexOf(".")+5;
	var x = x.toString().substr(0,length);
	var f_x = parseFloat(x);  
	if (isNaN(f_x))  
	{  
		alert('function:changeTwoDecimal->parameter error');  
		return false;  
	}  
	var f_x = Math.round(x*1000000)/10000;  
	return f_x;  
}
function submitForm(form, url, message, callback)
{
	form.form.submit(
	{
		clientValidation : true, // 进行客户端验证
		waitMsg : '正在提交数据请稍后', // 提示信息
		waitTitle : '提示', // 标题
		url : url,
		method : 'POST', // 请求方式
		success : function(form, action)
		{
			var result = Ext.util.JSON.decode(action.response.responseText);
			callback();
		},
		failure : function(form, action)
		{ // 加载失败的处理函数
			if (action.response != null)
			{
				var result = Ext.util.JSON.decode(action.response.responseText);
				Ext.Msg.alert('提示', message + "异常代码：" + result.msg);
			} else
			{
				Ext.Msg.alert("提示", "有数据项未通过验证，请仔细检查！");
			}
		}
	});
}

/** ************************数组操作--函数开始***************************** */
function RemoveArray(array, attachId)
{
	if (array.length > 0)
	{
		for ( var i = 0, n = 0; i < array.length; i++)
		{
			if (array[i] != attachId)
			{
				array[n++] = array[i]
			}
		}
		array.length -= 1;
	}
}
function containsArray(array, attachId)
{
	for ( var i = 0; i < array.length; i++)
	{
		if (array[i] == attachId)
		{
			return true;
			break;
		}
	}
	return false;
}
Array.prototype.remove = function(obj)
{
	return RemoveArray(this, obj);
};
Array.prototype.contains = function(obj)
{
	return containsArray(this, obj);
};

function loadFormCallBack(form, url, messages)
{
	form.form.reset();
	form.form.load(
	{
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action)
		{
			var name = action.result.data.name;
			Ext.getCmp("addFormRuleName").setValue(name);
			
			var dataSource = action.result.data.dataSource;
			Ext.getCmp("addFormWBJCode").setValue(dataSource);
			Ext.getCmp("addFormWBJCode").disable();
			
			var tableName = action.result.data.tableName;
			Ext.getCmp("addFormTablCode").setValue(tableName).disable();
			
			var columnName = action.result.data.columnName;
			Ext.getCmp("addFormTableColumnCombox").setValue(columnName).disable();
			
			var dataRuleType = action.result.data.dataRuleType;
			Ext.getCmp("ruleTypeId").setValue(dataRuleType);
			
			// add 2013.4.15
			var columnRuleName = action.result.data.dataRuleName;
			Ext.getCmp("columnRuleTypeId").setValue(columnRuleName);
			
			var columnRuleId = action.result.data.columnRuleId;
			Ext.getCmp("columnRuleValue").setValue(columnRuleId);
			
			
			var desc = action.result.data.desc;
			Ext.getCmp("wbjRuleDescription").setValue(desc);
			
			var id = action.result.data.id;
			Ext.getCmp("addFormDataId").setValue(id);
			
		},
		failure : function(form, action)
		{// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', messages + result.data);
		}
	});
}
