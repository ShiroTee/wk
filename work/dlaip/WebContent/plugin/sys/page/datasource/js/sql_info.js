/**
 * 分组菜单列表
 */
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
var pageSize = 20;
var queryForm;
var gridStore;
var grid;
var gridHeight;
var appGrid;
var appDataSourecePanel;
Ext.BLANK_IMAGE_URL = PROJECT_ROOT
		+ '/resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init() {
	var grid = createGrid();
	setTip("查看数据库连接池性能情况");
	setPaging(grid);
	setMainPanel("sql_info_div", grid);
	Ext.EventManager.onWindowResize(function() {
		grid.getView().refresh()
		grid.getTopToolbar().setWidth("100%");
	})
}
function createGrid() {
	var fields = [ 'sQL', 'effectedRowCount', "errorCount", "executeCount",
			"fetchRowCount", "lastTime", "maxTimespan", "maxTimespanOccurTime",
			"totalTime", "errorCount", "iD" ];
	var toolbar = new Ext.Toolbar({
		autoWidth : true
	});// 按钮数
	var cb = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true
	});
	toolbar.addText("SQL类型：");
	toolbar.addItem(new Ext.form.ComboBox({
		mode : 'local',
		hiddenName : "sqlType",
		store : new Ext.data.SimpleStore({
			fields : [ 'name', 'id' ],
			data : [ [ '全部', 'ALL' ], [ '错误SQL', 'ERROR' ],[ 'SELECT', 'SELECT' ],
					[ 'UPDATE', 'UPDATE' ], [ 'INSERT', 'INSERT' ],
					[ 'DELETE', 'DELETE' ] ]
		}),
		listeners : {
			select : function(combo, record, index) {
				var grid = new Ext.getCmp("sqlInfoGrid");
				grid.store.load({
					params : {
						sqlType : combo.getValue()
					}
				})
			}
		},
		triggerAction : 'all',
		displayField : 'name',
		valueField : 'id',
		value : "ALL",
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	var copyBtn = new Ext.ux.CopyButton({
		text : '复制SQL',
		iconCls : 'icon_copy',
		getValue : function() {
			var grid = Ext.getCmp("sqlInfoGrid");
			var list = getGridList(grid, "sQL");
			if (list.length != 1) {
				Ext.Msg.alert("提示", "每次只能对一条数据进行操作");
				return;
			}
			var sql = list[0];
			sql = strAnsi2Unicode(decode64(sql));
			return sql;
		}
	});
	toolbar.addButton(copyBtn);
	toolbar.addButton({
		text : "重置",
		iconCls : 'icon_reset',
		handler : function() {
			Ext.MessageBox.confirm("提示", "你确定要清理所有数据吗?", function(btnId) {
				if (btnId == 'yes') {
					var msgTip = Ext.MessageBox.show({
						title : '提示',
						width : 250,
						msg : '正在清理数据...'
					});
					var url = REQUEST_URL_BASE + "rdp/dataSourceInfoHandler/clear?type=1";
					Ext.MessageBox.confirm("提示", "你要导出sql数据吗?", function(btnId) {
					if (btnId == 'yes') {
						window.location.href = REQUEST_URL_BASE + "rdp/dataSourceInfoHandler/clear?type=2";
					}else{
						Ext.Ajax.request({
							url : url,
							method : 'POST',
							success : function(response, options) {
								msgTip.hide();
								var result = Ext.util.JSON.decode(response.responseText);
								if (result.success) {
									var grid = Ext.getCmp("sqlInfoGrid");
									grid.getStore().reload();
									
								} else {
									Ext.Msg.alert('提示', "异常码：" + result.msg);
								}
							},
							failure : function(response, options) {
								var result = Ext.util.JSON
								.decode(response.responseText);
								msgTip.hide();
								Ext.Msg.alert('提示', "异常码：" + result.data);
							}
							});
						}
					});
					
				}

			});
		}
	});
	toolbar.addButton({
		text : "导出为EXECL",
		iconCls : 'icon_export',
		handler : function() {
			window.location.href = REQUEST_URL_BASE + "rdp/dataSourceInfoHandler/clear";
		}
	});
	var columnLabel = new Ext.grid.ColumnModel([ cb, {
		header : "SQL语句",
		dataIndex : 'sQL',
		width : 40,
		renderer : formatQtip,
		sortable : true
	}, {
		header : "影响函数",
		dataIndex : 'effectedRowCount',
		width : 20,
		sortable : true
	}, {
		header : "执行错误数",
		dataIndex : 'errorCount',
		width : 30,
		sortable : true
	}, {
		header : "执行次数",
		dataIndex : 'executeCount',
		width : 30,
		sortable : true
	}, {
		header : "读取行数",
		width : 30,
		dataIndex : 'fetchRowCount',
		sortable : true
	}, {
		header : "最后一次执行时间",
		width : 50,
		dataIndex : 'lastTime',
		renderer : formatDate,
		sortable : true
	}, {
		header : "最慢消耗时间(ms)",
		width : 40,
		dataIndex : 'maxTimespan',
		sortable : true
	}, {
		header : "最慢发生的时间",
		width : 50,
		renderer : formatDate,
		sortable : true,
		dataIndex : 'maxTimespanOccurTime'
	}, {
		header : "总消耗时间(ms)",
		width : 40,
		dataIndex : 'totalTime'
	}, {
		header : "执行错误数",
		width : 40,
		sortable : true,
		dataIndex : 'errorCount'
	}, {
		header : "错误详情",
		renderer : formatHref,
		width : 40,
		dataIndex : 'iD'
	} ]);
	var gridStore = new Ext.data.JsonStore({
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},

		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options, response,
					arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		sortInfo : {
			field : "lastTime",
			direction : "DESC"
		},
		url : REQUEST_URL_BASE + "rdp/dataSourceInfoHandler/getSQLInfoList",
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel({
		autoScroll : true,
		id : "sqlInfoGrid",
		width : '100%',
		loadMask : true,
		tbar : toolbar,
		buttonAlign : 'center',
		sm : cb,
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
		viewConfig : {
			forceFit : true
		}
	});

	return grid;
}
function formatDate(value) {

	var date = new Date(value);
	return date.format('Y-m-d H:i:s');
}
function formatQtip(value, metadata, record, rowIndex, columnIndex, store) {
	var title = "";
	var tip = value;
	tip = strAnsi2Unicode(decode64(tip))
	metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
	return tip;
}
function formatHref(value, metadata, record, rowIndex, colIndex, store) {
	var errorCount = record.get("errorCount");

	if (errorCount > 0) {
		var result = "<font color='blue'><a href='javascript:void(0)' onclick='showErrorWin(\""
				+ value + "\");'>详&nbsp;情</a></font>";
		return result;
	}
	return "无";

}
function showErrorWin(id) {
	var form = new Ext.form.FormPanel({
		autoHeight : true,
		frame : true,
		items : [ {
			xtype : 'textfield',
			name : "lastErrorTime",
			id : "lastErrorTimeText",
			anchor : '100%',
			fieldLabel : "执行时间"
		}, {
			xtype : 'textarea',
			id : "lastErrorMessageText",
			name : "lastErrorMessage",
			anchor : '100% 30%',
			fieldLabel : "错误消息"
		}, {
			xtype : 'textarea',
			id : "lastErrorStackTraceText",
			name : "lastErrorStackTrace",
			anchor : '100% 70%',
			fieldLabel : "堆栈信息"

		} ]
	})
	var win = new Ext.Window({
		height : 400,
		width : 600,
		frame : true,
		items : [ form ]
	});
	var url = REQUEST_URL_BASE
			+ "rdp/dataSourceInfoHandler/getSQLErrorInfo?id=" + id;
	var msgTip = Ext.MessageBox.show({
		title : '提示',
		width : 250,
		msg : '正在加载数据...'
	});
	Ext.Ajax
			.request({
				url : url,
				method : 'POST',
				success : function(response, options) {
					msgTip.hide();
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success) {
						var date = new Date(result.data.lastErrorTime);

						Ext.getCmp("lastErrorTimeText").setValue(
								date.format('Y-m-d H:i:s'));
						Ext
								.getCmp("lastErrorMessageText")
								.setValue(
										strAnsi2Unicode(decode64(result.data.lastErrorMessage)));
						Ext
								.getCmp("lastErrorStackTraceText")
								.setValue(
										strAnsi2Unicode(decode64(result.data.lastErrorStackTrace)));
						win.show();
					} else {
						Ext.Msg.alert('提示', "数据加载异常" + "异常码：" + result.msg);
					}
				},
				failure : function(response, options) {
					var result = Ext.util.JSON.decode(response.responseText);
					msgTip.hide();
					Ext.Msg.alert('提示', "数据加载异常" + "异常码：" + result.data);
				}
			});

}