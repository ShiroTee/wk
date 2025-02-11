﻿/*
 * @desc:获取选择表格的数据
 */
// 初始化页面上的按钮URL
var init_button_url = "../ums.htm?actionType=permission_action&method=initButton&radmon=" + Math.random() + "&id=";
var REQUEST_URL_BASE ="";
var statisticUrl = "http://10.6.10.210:7001/bicenterfin/Chart";
var common_grid = null;
var ROOT_BASE="";
var OFFICE_ORGID="010183453002001";
var GOVSERVICE_ORGID="010183453004003";
var INFORMATION_ORGID="010183453004004";
/*
 * Grid列表：获取列表的id值，返回一个数组
 */
function getDataIdList(grid)
{
	var recs = grid.getSelectionModel().getSelections();
	var list = [];
	for ( var i = 0; i < recs.length; i++)
	{
		var rec = recs[i];
		list.push(rec.get('id'))
	}
	return list;
}

/*
 * Grid列表：根据传入的字段名称，返回一个该字段的数组
 */
function getGridList(grid, column)
{
	var recs = grid.getSelectionModel().getSelections();
	var list = [];
	for ( var i = 0; i < recs.length; i++)
	{
		var rec = recs[i];
		list.push(rec.get(column))
	}
	return list;
}

/*
 * @desc:加载表单数据 @param:btn:按钮 @param:form:表单对象 @param:url:表单对象URL地址
 * @param:message:加载数据提示错误
 */
function loadForm(form, url, message)
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
		},
		failure : function(form, action)
		{// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.data);
		}
	});
}

function loadAuthFormCallBack(form, url, message){
	form.form.reset();
	form.form.load(
	{
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action)
		{},
		failure : function(form, action)
		{// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.data);
		}
	});
}

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
			Ext.getCmp("methodCom").enable();
			Ext.getCmp("methodCom").enable();
			var requestParameter = Ext.getCmp("requestParameter").getValue();
			var responseParameter=Ext.getCmp("responseParameter").getValue();
			requestParameter =  strAnsi2Unicode(decode64(requestParameter));//decodeURIComponent(requestParameter);
			responseParameter = strAnsi2Unicode(decode64(responseParameter));
			var catalogueName = action.result.data.demoCode;
			Ext.getCmp("comboxWithTree").setValue(catalogueName);
			//显示数据服务类型
			var serviceType = action.result.data.serviceType;
			var serviceTypeValue = '';
			if('service'==serviceType){
				serviceTypeValue = '业务数据服务';
			}else if('gis'==serviceType){
				serviceTypeValue = '空间数据服务';
			}else{
				serviceTypeValue = '公共数据支撑服务';
			}
			Ext.getCmp("serviceTypeId").setValue(serviceTypeValue);
			
			
			var protocal = action.result.data.protocal;
			var checkitems = Ext.getCmp('checkboxgroup').items;   
			for (var i = 0; i < checkitems.length; i++) {   
				checkitems.itemAt(i).setValue(false);
			}  
			//根据后台返回的protocal,去动态选中checkBox
		    if('soap'==protocal){
		    	checkitems.itemAt(2).setValue(true); 
		    }else if('http'==protocal){
		    	checkitems.itemAt(0).setValue(true); 
		    }else{
		    	checkitems.itemAt(1).setValue(true); 
		    }
			var result = Ext.util.JSON.decode(requestParameter);
			for ( var i = 0; i < result.length; i++)
			{
				var grid = Ext.getCmp("requestGrid");
				grid.stopEditing();
				var p = new Ext.data.Record(
				{
					name :result[i].name,
					dataType : result[i].dataType,
					dataDescs :result[i].dataDescs,
					remarks :result[i].remarks
				});
				grid.store.insert(0,p);
				grid.startEditing(0, 0);
			}
			var publishUrl = action.result.data.publishUrl;
			Ext.getCmp("publishUrlId").setValue(publishUrl);
			
			result=Ext.util.JSON.decode(responseParameter);
			for ( var i = 0; i < result.length; i++)
			{
				var grid = Ext.getCmp("responseGrid");
				grid.stopEditing();
				var p = new Ext.data.Record(
				{
					name :result[i].name,
					dataType : result[i].dataType,
					dataDescs :result[i].dataDescs,
					remarks :result[i].remarks
				});
				grid.store.insert(0,p);
				grid.startEditing(0, 0);
			}
		},
		failure : function(form, action)
		{// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.data);
		}
	});
}
/*
 * 提交Form表单数据
 */
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
				Ext.Msg.alert("提示", "有必填项！");
			}
		}
	});
}

/*
 * 删除数据
 */
function deleteData(url, message, callback)
{
	Ext.MessageBox.confirm("提示", "您确定要删除吗?", function(btnId)
	{

		if (btnId == 'yes')
		{
			var msgTip = Ext.MessageBox.show(
			{
				title : '提示',
				width : 250,
				msg : '正在删除信息请稍后......'
			});
			Ext.Ajax.request(
			{
				url : url,
				method : 'POST',
				success : function(response, options)
				{
					msgTip.hide();
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
					msgTip.hide();
					Ext.Msg.alert('提示', message + "异常码：" + result.data);
				}
			});
		}

	});
}

/*
 * 创建一个窗口
 */
function createWin(width)
{
	commonWin = new Ext.Window(
	{
		layout : 'fit',
		width : width,
		closeAction : 'close',
		autoHeight : true,
		resizable : false,
		shadow : true,
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		animCollapse : true
	});
	return commonWin;
}

/*
 * 创建一个FormPanel
 */
function createNewForm(id)
{
	var idd = id == null || "" == id ? Math.random() + "" : id;
	Ext.form.Field.prototype.msgTarget = 'side';// 统一指定错误信息提示方式
	var newForm = new Ext.FormPanel(
	{
		labelSeparator : "：",
		frame : true,
		border : false,
		autoHeight : true,
		id : idd
	});
	return newForm;
}

/*
 * 创建一个TextField @desc:创建文本框对象 @param:name 该表单域的HTML name 属性值(默认值为 "").
 * @param:lable 要显示的名称 @param:isEmpty 是否为空 @param:emptyMsg 为空时的提示信息 @param:width
 * 宽度 @param:hidden 是否隐藏
 */
function createTextField(name, label, isEmpty, emptyMsg, width, hidden)
{
	var textField = new Ext.form.TextField(
	{
		width : width,
		allowBlank : isEmpty,
		blankText : emptyMsg,
		name : name,
		fieldLabel : label,
		hidden : hidden
	});
	return textField;
}

/*
 * 创建一个TextArea
 */
function createTextArea(name, label, isEmpty, emptyMsg, width, hidden)
{
	var textArea = new Ext.form.TextArea(
	{
		width : width,
		allowBlank : isEmpty,
		blankText : emptyMsg,
		name : name,
		fieldLabel : label,
		hidden : hidden
	});
	return textArea;
}

/*
 * 创建一个ComboBox
 */
function createComboBox(fieldLabel, width, isEmpty, emptyMsg, blankText, name, store)
{
	var combox = new Ext.form.ComboBox(
	{
		mode : 'local',
		hiddenName : name,
		width : width,
		allowBlank : isEmpty,
		blankText : blankText,
		emptyText : emptyMsg,
		store : store,
		triggerAction : 'all',
		displayField : 'name',
		valueField : 'id',
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	});
	return combox;
}

/*
 * 创建一个Window，并显示
 */
function show_win(url, obj, windowId, title, width)
{
	var win = new Ext.Window(
	{
		layout : 'fit',
		id : windowId,
		width : width,
		closeAction : 'close',
		autoScroll : true,
		height : 500,
		resizable : false,
		shadow : true,
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		animCollapse : true,
		autoLoad :
		{
			url : url,
			scripts : true

		}
	});
	win.show();
	win.setTitle(title);
	obj.setValue("");
}

// 该方法为按钮测试方法没有实际意义。但不能删除
function test(btn)
{
	alert("test");
}

function setGrid(grid)
{
	common_grid = grid;
}

function getGrid()
{
	return common_grid;
}
//json日期格式转换为正常格式
function jsonDateFormat(jsonDate) {
    try {
    	//var date = new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10));
        var date = new Date(parseInt(jsonDate));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        //var hours = date.getHours();
        //var minutes = date.getMinutes();
        //var seconds = date.getSeconds();
        //var milliseconds = date.getMilliseconds();
        return date.getFullYear() + "-" + month + "-" + day;
    } catch (ex) {
        return "";
    }
}
