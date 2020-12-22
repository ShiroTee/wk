/**
 * 停用授权
 */
var searchText="";
function rendererOfSearch(searchField, value)
{
	if (!value)
	{
		return "<font color='red'>-</font>";
	}
	return value.replace(new RegExp(searchField, 'g'), "<font color='red'>"
			+ searchField + "</font>");
}
function stopAutInfo()
{
	Ext.MessageBox.confirm("提示", "您确定要停用该授权吗？", function(btnId)
	{
		if (btnId == 'yes')
		{
			var grid = Ext.getCmp("authInfoGrid");
			var record = grid.getSelectionModel().getSelected();
			var authId = record.get("authId");
			var url = getHandlerRequestUrl() + "authInfoHandler/stop?authId="
					+ authId;
			submitToServer(url, "禁用授权信息失败", function()
			{
				btnCallback(grid);
			});
		}
	});

}
function startAuthInfo()
{
	Ext.MessageBox.confirm("提示", "您确定要启用该授权吗？", function(btnId)
	{
		if (btnId == 'yes')
		{
			var grid = Ext.getCmp("authInfoGrid");
			var record = grid.getSelectionModel().getSelected();
			var authId = record.get("authId");
			var url = getHandlerRequestUrl() + "authInfoHandler/start?authId="
					+ authId;
			submitToServer(url, "启用授权信息失败", function()
			{
				btnCallback(grid);
			});
		}
	});
}
function btnCallback(grid)
{
	grid.store.reload();
	grid.getSelectionModel().clearSelections();
	var toolbar = grid.getTopToolbar();
	for ( var i = 0; i < 3; i++)
	{
		toolbar.getComponent(i).disable();
	}
}
/**
 * 显示授权Key对应的资产目录列表信息
 */
function showRdWin()
{
	var win = new Ext.Window(
	{

		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height : 300,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '资产目录列表',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items :[],
	});
	win.show();
}
function createRdGrid()
{

	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		singleSelect : true,
		listeners :
		{
			rowselect : function()
			{
				var grid = Ext.getCmp("rdGrid");
				var record = this.getSelected();
				var toolbar = grid.getTopToolbar();
				for ( var i = 0; i < 3; i++)
				{
					toolbar.getComponent(i).enable();
				}
				if (record.get("status") == 0)
				{
					toolbar.getComponent(3).enable();
				} else if (record.get("status") == 1)
				{
					toolbar.getComponent(4).enable();
				}
			},
			rowdeselect : function()
			{
				var grid = Ext.getCmp("rdGrid");
				var toolbar = grid.getTopToolbar();
				for ( var i = 0; i < 5; i++)
				{
					toolbar.getComponent(i).disable();
				}
			}
		}
	});
	var columns = [ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'resourceId',
		hidden : true
	},
	{
		dataIndex : 'resourceName',
		header : "名称",
		sortable : true,
		width : 200
	},
	{
		dataIndex : 'publicLv',
		header : "公开级别",
		sortable : true,
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='red'>主动公开</font>";
			} else if (value == 1)
			{
				return "<font color='yellow'>被动公开</font>";
			} else if (value == 2)
			{
				return "<font color='green'>不公开</font>";
			}
		},
		width : 50
	},
	{
		dataIndex : 'provider',
		header : "提供方",
		width : 120
	},
	{
		dataIndex : 'pubDate',
		header : "发布日期",
		renderer : formatDate,
		width : 80
	},
	{
		dataIndex : 'status',
		header : "状态",
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='red'>待发布</font>";
			}
			return "<font color='green'>已发布</font>";
		},
		width : 50
	} ];
	var gridStore = new Ext.data.Store(
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
		reader : new Ext.data.JsonReader(
		{
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create([
		{
			name : 'resourceId'
		},
		{
			name : 'resourceName'
		},
		{
			name : 'publicLv'
		},
		{
			name : 'pubDate'
		},
		{
			name : 'status'
		},
		{
			name : 'provider',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgName");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "resourceCatalogueInfoHandler/getPageList"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		columnWidth : .8,
		tbar :[{
			xtype:'button',
			text:'删除',
			iconCls:'icon_delete'
		}],
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		bbar : [],
		viewConfig :
		{
			forceFit : true
		}
	});
}
function searchAuth()
{
	var grid=Ext.getCmp("authInfoGrid");
	var args=Ext.getCmp("textArgs").getValue();
	searchText=args;
	grid.store.baseParams["args"]=args;
	grid.store.reload(
			{
				params :
				{
					args:args,
					start : 0,
					limit : pageSize
				}
			});
	grid.getStore().reload();
	grid.store.baseParams =
	{
		start : 0,
		limit : pageSize,
		args:args
	};
}