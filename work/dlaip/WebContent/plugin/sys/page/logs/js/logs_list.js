/**
 * 分组菜单列表
 */
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
var queryForm;
var gridStore;
var grid;
var gridHeight;
var appGrid;
var appDataSourecePanel;
Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	var grid = createGrid();
	setTip("系统日志审计");
	setPaging(grid);
	setMainPanel("logs_div", grid);
	Ext.EventManager.onWindowResize(function()
	{
		grid.getView().refresh();
	});
}
function createGrid()
{
	var fields = [ 'id', 'appCode', 'loginUser', "requestUrl", "isException",
			"errorMsg", "requestUseTime", "requestDate", 'logType','clientIpAddress'];
	var toolbar = new Ext.Toolbar(
	{
		autoWidth : true
	});// 按钮数
	toolbar.addText("日志类型：");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		id : 'logsIsExceptionCombox',
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'name', 'id' ],
			data : [ [ '全部', '0' ], [ '登录信息', '1' ], [ '业务日志', '2' ],
					[ '异常日志', '3' ] ]
		}),
		listeners :
		{
			select : function(combo, record, index)
			{
			}
		},
		triggerAction : 'all',
		displayField : 'name',
		valueField : 'id',
		value : "0",
		width : 80,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addText("&nbsp;按系统：");
	var appCombox = createAppCombox(100, "按系统", "logsAppCodeCombox");
	toolbar.addItem(appCombox);
	toolbar.addText("&nbsp;按用户：");
	var userCombox = createUserCombox(100, "logsUserCombox");
	toolbar.addItem(userCombox);
	toolbar.addText("&nbsp;开始时间");
	toolbar.addItem(
	{
		xtype : 'datefield',
		name : 'startDate',
		width : 100,
		altFormats : 'Y-m-d',
		format : 'Y-m-d',
		editable : false
	});
	toolbar.addText("&nbsp;结束时间");
	toolbar.addItem(
	{
		xtype : 'datefield',
		name : 'endDate',
		width : 100,
		altFormats : 'Y-m-d',
		format : 'Y-m-d',
		editable : false
	});
	toolbar.addText("&nbsp;请求路径:");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'logsRequestURLText',
		width : 200
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : function()
		{
			var grid = Ext.getCmp("logsGrid");
			grid.store.reload(
			{
				params :
				{
					loginUserName : Ext.getCmp("logsUserCombox").getValue(),
					appCode : Ext.getCmp("logsAppCodeCombox").getValue(),
					logType : Ext.getCmp("logsIsExceptionCombox").getValue(),
					requestUrl : Ext.getCmp("logsRequestURLText").getValue(),
					start : 0,
					limit :pageSize
				}
			});

			grid.store.baseParams =
			{
				start : 0,
				limit : pageSize,
				loginUserName : Ext.getCmp("logsUserCombox").getValue(),
				appCode : Ext.getCmp("logsAppCodeCombox").getValue(),
				logType : Ext.getCmp("logsIsExceptionCombox").getValue(),
				requestUrl : Ext.getCmp("logsRequestURLText").getValue()
			};
		}
	}));
	var columnLabel = new Ext.grid.ColumnModel([
			{
				header : "客户端IP",
				dataIndex : 'clientIpAddress',
				width : 40,
				sortable : true
			},
			{
				header : "系统CODE",
				dataIndex : 'appCode',
				width : 40,
				sortable : true
			},
			{
				header : "登录用户",
				dataIndex : 'loginUser',
				width : 40,
				sortable : true
			},
			{
				header : "请求路径",
				dataIndex : 'requestUrl',
				width : 100,
				sortable : true
			},
			{
				header : "请求耗时(毫秒)",
				dataIndex : 'requestUseTime',
				width : 30,
				sortable : true
			},
			{
				header : "请求时间",
				width :60,
				dataIndex : 'requestDate',
				renderer : formatDate,
				sortable : true
			},
			{
				header : "日志类型",
				dataIndex : 'logType',
				renderer : function(value)
				{
					if (value == 1)
					{
						return "<font color='blue'>登录信息</font>";
					} else if (value == 2)
					{
						return "<font color='green'>业务日志</font>";
					} else
					{
						return "<font color='red'>异常日志</font>";
					}

				},
				width :30,
				sortable : true
			},
			{
				header : "详情",
				width :20,
				dataIndex : 'id',
				renderer : function(value)
				{
					return "<a href='#' onclick='showLogsWin(\"" + value
							+ "\");'>详细</a>";
				},
				sortable : true
			} ]);
	var gridStore = new Ext.data.JsonStore(
	{
		autoLoad :
		{
			params :
			{
				start : 0,
				limit : pageSize,
				loginUserName : Ext.getCmp("logsUserCombox").getValue(),
				appCode : Ext.getCmp("logsAppCodeCombox").getValue(),
				logType : Ext.getCmp("logsIsExceptionCombox").getValue(),
				requestUrl : Ext.getCmp("logsRequestURLText").getValue()
			}
		},

		successProperty : 'success',
		listeners :
		{
			exception : function(dataProxy, type, action, options, response,
					arg)
			{
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success)
				{
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			},
			beforeload : function(store, records, options)
			{
				store.baseParams =
				{
					start : 0,
					limit : pageSize,
					loginUserName : Ext.getCmp("logsUserCombox").getValue(),
					appCode : Ext.getCmp("logsAppCodeCombox").getValue(),
					logType : Ext.getCmp("logsIsExceptionCombox").getValue(),
					requestUrl : Ext.getCmp("logsRequestURLText").getValue()
				}
			}
		},
		url : getHandlerRequestUrl() + "logsHandler/searchForParameter",
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		id : "logsGrid",
		tbar : toolbar,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		// title : '资源列表',
		store : gridStore,
		border : false, // 是否显示行的边框
		cm : columnLabel,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		bbar : [],
		viewConfig :
		{
			forceFit : true
		}
	});

	return grid;
}
function formatDate(value)
{

	var date = new Date(value);
	return date.format('Y-m-d H:i:s');
}
function showLogsWin(value)
{
	var win = new Ext.Window(
	{
		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		frame : true,
		renderTo : document.body,
		width : 500,
		height : 400,
		plain : true,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '详细',
		modal : false,
		closable : true,
		animCollapse : true,
		items : [ createTabPanel(value) ]
	});
	var url = getHandlerRequestUrl() + "logsHandler/getLogsDetail?logsId="
			+ value;
	win.show();
	var form = Ext.getCmp("logsDetailForm");
	loadForm(form, url, "获取日志详细信息异常");

}
function createTabPanel(value)
{
	var tabpanel = new Ext.TabPanel(
	{
		activeTab : 0,
		autoDestroy : true,
		draggable : false,
		closable : true,
		items : [ createForm(), createSQLGrid(value) ]
	});
	return tabpanel;
}
function createForm()
{
	var form = new Ext.form.FormPanel(
	{
		title : '详细信息',
		autoHeight : true,
		id : 'logsDetailForm',
		frame : true,
		items : [
		{
			xtype : 'textfield',
			name : 'formattingDate',
			width : 300,
			fieldLabel : '请求时间'
		},
		{
			xtype : 'textfield',
			name : 'appCode',
			width : 300,
			fieldLabel : '所属系统'
		},
		{
			xtype : 'textfield',
			name : 'loginUser',
			width : 300,
			fieldLabel : '登录用户'

		},
		{
			xtype : 'textfield',
			name : 'requestUrl',
			width : 300,
			fieldLabel : '请求路径'

		},
		{
			xtype : 'textfield',
			name : 'requestUseTime',
			width : 300,
			fieldLabel : '请求耗时(毫秒)'

		},
		{
			xtype : 'textarea',
			name : 'httpParameter',
			anchor : '100% 10%',
			fieldLabel : '使用参数'

		},
		{
			xtype : 'textarea',
			name : 'errorMsg',
			anchor : '100% 51%',
			fieldLabel : '异常消息'
		} ]
	});
	return form;
}
function createSQLGrid(logsId)
{
	var fields = [ 'sql', "sqlType" ];
	var cb = new Ext.grid.CheckboxSelectionModel(
	{
		singleSelect : true
	});
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(new Ext.ux.CopyButton(
	{
		text : '复制SQL',
		iconCls : 'icon_copy',
		getValue : function()
		{
			var grid = Ext.getCmp("logsSQLInfoGrid");
			var list = getGridList(grid, "sql");
			if (list.length != 1)
			{
				Ext.Msg.alert("提示", "每次只能对一条数据进行操作");
				return;
			}
			var sql = list[0];
			return sql;
		}
	}));
	var columnLabel = new Ext.grid.ColumnModel([ cb,
	{
		header : "SQL语句",
		dataIndex : 'sql',
		renderer : formatQtip,
		width : 70,
		sortable : true
	},
	{
		header : "类型",
		dataIndex : 'sqlType',
		width : 10,
		sortable : true
	} ]);
	var gridStore = new Ext.data.JsonStore(
	{
		autoLoad :
		{
			params :
			{
				start : 0,
				limit : pageSize
			}
		},

		successProperty : 'success',
		listeners :
		{
			exception : function(dataProxy, type, action, options, response,
					arg)
			{
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success)
				{
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		url : getHandlerRequestUrl() + "logsHandler/getSqlInfoList?logsId="
				+ logsId,
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel(
	{
		autoScroll : true,
		title : '执行的SQL',
		id : "logsSQLInfoGrid",
		tbar : toolbar,
		sm : cb,
		store : gridStore,
		border : false,
		cm : columnLabel,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		viewConfig :
		{
			forceFit : true
		}
	});

	return grid;
}
function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
{
	var title = "";
	var tip = value;
	metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
	return tip;
}