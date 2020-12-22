/*
 * @desc:获取选择表格的数据
 */
// 初始化页面上的按钮URL
var init_button_url = "../ums.htm?actionType=permission_action&method=initButton&radmon="
		+ Math.random() + "&id=";
// var REQUEST_URL_BASE = "../../../spring/ldp.scala?";
var REQUEST_URL_BASE = "/rdp/app/http/";
var ROOT_RUL = "spring";
var PROJECT_ROOT = "";// 工程根目录
var common_grid = null;
var ORG_ROOT_ID="013898422";
var biUrl = "http://10.6.10.25:7001/bi/opencontrol.jsp?action=visitDirect.do&user=administrator&pwd=000000&showToolbar=false&displayMode=001001&path=/共享报表/兰州数据中心/";
/*
 * Grid列表：获取列表的id值，返回一个数组
 */
function getDataIdList(grid) {
	var recs = grid.getSelectionModel().getSelections();
	var list = [];
	for ( var i = 0; i < recs.length; i++) {
		var rec = recs[i];
		list.push(rec.get('id'))
	}
	return list;
}

/*
 * Grid列表：根据传入的字段名称，返回一个该字段的数组
 */
function getGridList(grid, column) {
	var recs = grid.getSelectionModel().getSelections();
	var list = [];
	for ( var i = 0; i < recs.length; i++) {
		var rec = recs[i];
		list.push(rec.get(column))
	}
	return list;
}

/*
 * @desc:加载表单数据 @param:btn:按钮 @param:form:表单对象 @param:url:表单对象URL地址
 * @param:message:加载数据提示错误
 */
function loadForm(form, url, message) {
	form.form.reset();
	form.form.load({
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		failure : function(form, action) {// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.msg);
		}
	});
}
function loadFormAndCallBack(form, url, message, callback) {
	form.form.reset();
	form.form.load({
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action) {
			if (callback != undefined) {
				callback();
			}
		},
		failure : function(form, action) {// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.data);
		}
	});
}
function loadAuthFormCallBack(form, url, message) {
	form.form.reset();
	form.form.load({
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action) {
		},
		failure : function(form, action) {// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.data);
		}
	});
}

function loadFormCallBack(form, url, messages) {
	form.form.reset();
	form.form.load({
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action) {
			Ext.getCmp("methodCom").enable();
			Ext.getCmp("methodCom").enable();
			var requestParameter = Ext.getCmp("requestParameter").getValue();
			var responseParameter = Ext.getCmp("responseParameter").getValue();
			requestParameter = decodeURIComponent(requestParameter);
			responseParameter = decodeURIComponent(responseParameter);
			var catalogueName = action.result.data.demoCode;
			Ext.getCmp("comboxWithTree").setValue(catalogueName);
			// 显示数据服务类型
			var serviceType = action.result.data.serviceType;
			var serviceTypeValue = '';
			if ('service' == serviceType) {
				serviceTypeValue = '业务数据服务';
			} else if ('gis' == serviceType) {
				serviceTypeValue = '空间数据服务';
			} else {
				serviceTypeValue = '公共数据支撑服务';
			}
			Ext.getCmp("serviceTypeId").setValue(serviceTypeValue);

			var protocal = action.result.data.protocal;
			var checkitems = Ext.getCmp('checkboxgroup').items;
			for ( var i = 0; i < checkitems.length; i++) {
				checkitems.itemAt(i).setValue(false);
			}
			// 根据后台返回的protocal,去动态选中checkBox
			if ('soap' == protocal) {
				checkitems.itemAt(2).setValue(true);
			} else if ('http' == protocal) {
				checkitems.itemAt(0).setValue(true);
			} else {
				checkitems.itemAt(1).setValue(true);
			}
			var result = Ext.util.JSON.decode(requestParameter);
			for ( var i = 0; i < result.length; i++) {
				var grid = Ext.getCmp("requestGrid");
				grid.stopEditing();
				var p = new Ext.data.Record({
					name : result[i].name,
					dataType : result[i].dataType,
					dataDescs : result[i].dataDescs,
					remarks : result[i].remarks
				});
				grid.store.insert(0, p);
				grid.startEditing(0, 0);
			}
			result = Ext.util.JSON.decode(responseParameter);
			for ( var i = 0; i < result.length; i++) {
				var grid = Ext.getCmp("responseGrid");
				grid.stopEditing();
				var p = new Ext.data.Record({
					name : result[i].name,
					dataType : result[i].dataType,
					dataDescs : result[i].dataDescs,
					remarks : result[i].remarks
				});
				grid.store.insert(0, p);
				grid.startEditing(0, 0);
			}
		},
		failure : function(form, action) {// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', message + result.data);
		}
	});
}
/*
 * 提交Form表单数据
 */
function submitForm(form, url, message, callback) {
	form.form
			.submit({
				clientValidation : true, // 进行客户端验证
				waitMsg : '正在提交数据请稍后', // 提示信息
				waitTitle : '提示', // 标题
				url : url,
				method : 'POST', // 请求方式
				success : function(form, action) {
					var result = Ext.util.JSON
							.decode(action.response.responseText);
					callback(result);
				},
				failure : function(form, action) { // 加载失败的处理函数
					if (action.response != null) {
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.Msg.alert('提示', message + "异常代码：" + result.msg);
					} else {
						Ext.Msg.alert("提示", "有必填项！");
					}
				}
			});
}

/*
 * 删除数据
 */
function deleteData(url, message, callback) {
	Ext.MessageBox.confirm("提示", "您确定要删除吗?", function(btnId) {

		if (btnId == 'yes') {
			var msgTip = Ext.MessageBox.show({
				title : '提示',
				width : 250,
				msg : '正在删除信息请稍后......'
			});
			Ext.Ajax.request({
				url : url,
				method : 'POST',
				success : function(response, options) {
					msgTip.hide();
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success) {
						callback();
					} else {
						Ext.Msg.alert('提示', message + "异常码：" + result.msg);
					}
				},
				failure : function(response, options) {
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
function createWin(width) {
	commonWin = new Ext.Window({
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
function createNewForm(id) {
	var idd = id == null || "" == id ? Math.random() + "" : id;
	Ext.form.Field.prototype.msgTarget = 'side';// 统一指定错误信息提示方式
	var newForm = new Ext.FormPanel({
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
function createTextField(name, label, isEmpty, emptyMsg, width, hidden) {
	var textField = new Ext.form.TextField({
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
function createTextArea(name, label, isEmpty, emptyMsg, width, hidden) {
	var textArea = new Ext.form.TextArea({
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
function createComboBox(fieldLabel, width, isEmpty, emptyMsg, blankText, name,
		store) {
	var combox = new Ext.form.ComboBox({
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
function show_win(url, obj, windowId, title, width) {
	var win = new Ext.Window({
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
		autoLoad : {
			url : url,
			scripts : true

		}
	});
	win.show();
	win.setTitle(title);
	obj.setValue("");
}

// 该方法为按钮测试方法没有实际意义。但不能删除
function test(btn) {
	alert("test");
}

function setGrid(grid) {
	common_grid = grid;
}

function getGrid() {
	return common_grid;
}

/** ************************数组操作--函数开始***************************** */
function RemoveArray(array, attachId) {
	if (array.length > 0) {
		for ( var i = 0, n = 0; i < array.length; i++) {
			if (array[i] != attachId) {
				array[n++] = array[i]
			}
		}
		array.length -= 1;
	}
}
function containsArray(array, attachId) {
	for ( var i = 0; i < array.length; i++) {
		if (array[i] == attachId) {
			return true;
			break;
		}
	}
	return false;
}
Array.prototype.remove = function(obj) {
	return RemoveArray(this, obj);
};
Array.prototype.contains = function(obj) {
	return containsArray(this, obj);
};
/** ************************结束***************************** */
function msgAlert(title, msg) {
	var htmlMsg = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + msg;
	var msgWindow = msgWindow || new Ext.Window({
		title : title,
		width : 210,
		height : 100,
		autoScroll : true,
		autoDestroy : true,
		closable : true,
		shadow : false,
		border : false,
		plain : true,
		draggable : false,
		modal : true,
		html : htmlMsg,
		buttons : [ {
			text : "关闭",
			handler : function() {
				msgWindow.close();
			}
		} ],
		iconCls : 'icon_warning '
	});
	// show时窗口自下而上滑动
	msgWindow.on('show',
			function() {
				// alert(document.documentElement.scrollWidth);
				msgWindow.setPosition(
						document.documentElement.scrollWidth / 5 + 200, 0);
				msgWindow.el.alignTo(document, "br-br", [ -600, -570 ]);
				msgWindow.el.slideIn('t', {
					duration : 1,
					callback : null,
					scope : this
				});

			});
	msgWindow.show();
}
function changeTwoDecimal(x) {
	var length = x.toString().indexOf(".") + 5;
	var x = x.toString().substr(0, length);
	var f_x = parseFloat(x);
	if (isNaN(f_x)) {
		alert('function:changeTwoDecimal->parameter error');
		return false;
	}
	var f_x = Math.round(x * 1000000) / 10000;
	return f_x;
}

function loadDataFormCallBack(form, url, messages) {
	form.form.reset();
	form.form.load({
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action) {
			var name = action.result.data.name;
			Ext.getCmp("addFormRuleName").setValue(name);

			var dataSource = action.result.data.dataSource;
			Ext.getCmp("addFormWBJCode").setValue(dataSource);
			Ext.getCmp("addFormWBJCode").disable();

			var tableName = action.result.data.tableName;
			Ext.getCmp("addFormTablCode").setValue(tableName).disable();

			var columnName = action.result.data.columnName;
			Ext.getCmp("addFormTableColumnCombox").setValue(columnName)
					.disable();

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
		failure : function(form, action) {// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', messages + result.data);
		}
	});
}


function showTablePageAndClose(url, title) {
	var href = location.href;
	href = href.substring(href.indexOf("app-install")+11,href.indexOf("page"));
	url = "/app-install"+href+url;
	var tabPanel = parent.Ext.getCmp("tabpanel");
	// 经典模式打开
	if (tabPanel != null) {
		var oldId =tabPanel.activeTab.id;
		//删除当前页面
		var tabPage = tabPanel.getComponent(oldId);
		if (tabPage != null) {
			tabPanel.remove(oldId);
		} 
		var id = url;
		var n = url.indexOf("?");
		if (n != -1) {
			id = id.substring(0, n);
		}
		var tabPage = tabPanel.getComponent(id);
		if (tabPage != null) {
			tabPanel.remove(id);
		}

		var html = '<iframe id="mainFrame" name="mainFrame" src="';
		html = html
				+ url
				+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';

		tabPage = tabPanel.add({// 动态添加tab页
			title : title,
			closable : true,
			id : id,
			html : html
		});
		tabPanel.setActiveTab(tabPage);// 设置当前tab页
	}
	// 桌面模式打开
	else {
		var desktop = this.parent.myDesktopApp.desktop;
		var id = "bogus"+this.name;
		var win = desktop.getWindow(id);
		win.close();
		desktop.createWinNewWindow(desktop,url,title,title);
	}
}
function showTablePageAndNotClose(url, title) {
	var href = location.href;
	href = href.substring(href.indexOf("app-install")+11,href.indexOf("page"));
	url = "/app-install"+href+url;
	var tabPanel = parent.Ext.getCmp("tabpanel");
	// 经典模式打开
	if (tabPanel != null) {
		var id = url;
		var n = url.indexOf("?");
		if (n != -1) {
			id = id.substring(0, n);
		}
		var tabPage = tabPanel.getComponent(id);
		if (tabPage != null) {
			tabPanel.remove(id);
		}

		var html = '<iframe id="mainFrame" name="mainFrame" src="';
		html = html
				+ url
				+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';

		tabPage = tabPanel.add({// 动态添加tab页
			title : title,
			closable : true,
			id : id,
			html : html
		});
		tabPanel.setActiveTab(tabPage);// 设置当前tab页
	}
	// 桌面模式打开
	else {
		var desktop = this.parent.myDesktopApp.desktop;
		desktop.createWinNewWindow(desktop,url,title,title);
	}
}	
function tablePageClose() {
	var tabPanel = parent.Ext.getCmp("tabpanel");
	// 经典模式打开
	if (tabPanel != null) {
		var oldId =tabPanel.activeTab.id;
		//删除当前页面
		var tabPage = tabPanel.getComponent(oldId);
		if (tabPage != null) {
			tabPanel.remove(oldId);
		} 
	}
	// 桌面模式打开
	else {
		var desktop = this.parent.myDesktopApp.desktop;
		var id = "bogus"+this.name;
		var win = desktop.getWindow(id);
		win.close();
	}
}