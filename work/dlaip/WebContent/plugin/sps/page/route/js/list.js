Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);

function init()
{
	var grid = createGrid();
	setTip("服务管理容器，监控服务容器运行状态");
	setPaging(grid);
	setMainPanel(document.body, grid);
}
function createGrid()
{
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			rowselect : function()
			{
				var record = this.getSelected();
				var isStarted = record.get("started");
				var isStarting = record.get("starting");
				var grid = Ext.getCmp("routeGrid");
				var toolbar = grid.getTopToolbar();
				if ("" == isStarted.toString())
				{
					// 发布
					toolbar.getComponent(3).enable();
				} else if ("true" == isStarted.toString())
				{
					if ("false" == isStarting.toString())
					{
						// 删除
						toolbar.getComponent(0).enable();
						// 暂停
						toolbar.getComponent(2).enable();
					}
				} else
				{
					// 启动
					toolbar.getComponent(1).enable();
				}
			},
			rowdeselect : function()
			{
				var toolbar = Ext.getCmp("routeGrid").getTopToolbar();
				for ( var i = 0; i <= 3; i++)
				{
					toolbar.getComponent(i).disable();
				}
			}
		},
		header:"",
		singleSelect : true
	});
	var columns =
	[ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'routeId',
		hidden : true
	},
	{
		dataIndex : 'routeName',
		header : "名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'publishURL',
		header : "发布地址",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'prxoyURL',
		header : "代理地址",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'routeType',
		header : "协议类型",
		width : 80
	},
	{
		dataIndex : 'started',
		header : "状态",
		renderer : function(value)
		{
			if (value.toString() == "true")
			{
				return "<font color='green'>启动中</font>";
			} else if (value.toString() === "false")
			{
				return "<font color='red'>暂停</font>";
			} else
			{
				return "<font color='red'>停止</fond>";
			}

		},
		width : 80
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
		}, Ext.data.Record.create(
		[
		{
			name : 'routeId'
		},
		{
			name : 'routeName'
		},
		{
			name : 'routeType'
		},
		{
			name : 'started'
		},
		{
			name : 'starting'
		},
		{
			name : 'publishURL'
		},
		{
			name : 'prxoyURL'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + "routeInfoHandler/search"
		}),
		sortInfo: {  
			field : 'started',  
	        direction: "ASC"  
	    }
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		id : 'routeGrid',
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
		bbar :
		[],
		viewConfig :
		{
			forceFit : true
			
		}
	});
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();

	toolbar.addButton(new Ext.Button(
	{
		text : "暂停",
		iconCls : 'icon_stop',
		disabled : true,
		handler : function()
		{
			var url = getHandlerRequestUrl()
					+ "routeInfoHandler/stopRoute?routeId="
					+ getSelectedRouteId();
			submitToServer(url, "停止路由失败", function()
			{
				var grid = Ext.getCmp("routeGrid");
				refurbisGrid(grid);
				Ext.Msg.alert('提示', "停止路由成功");
			});
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "启动",
		iconCls : 'icon_start',
		disabled : true,
		handler : function()
		{
			var url = getHandlerRequestUrl()
					+ "routeInfoHandler/startRoute?routeId="
					+ getSelectedRouteId();
			submitToServer(url, "启动路由失败", function()
			{
				var grid = Ext.getCmp("routeGrid");
				refurbisGrid(grid);
				Ext.Msg.alert('提示', "路由启动成功");
			});
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "移除",
		iconCls : 'icon_delete',
		disabled : true,
		handler : function()
		{
			var url = getHandlerRequestUrl()
					+ "routeInfoHandler/removeRoute?routeId="
					+ getSelectedRouteId();
			deleteRoute(url, "移除路由异常", function()
			{
				var grid = Ext.getCmp("routeGrid");
				refurbisGrid(grid);
				Ext.Msg.alert('提示', "移除路由成功");
			});
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "发布",
		iconCls : 'icon_release',
		disabled : true,
		handler : function()
		{
			var url = getHandlerRequestUrl()
					+ "routeInfoHandler/addRoute?routeId="
					+ getSelectedRouteId();
			submitToServer(url, "加入路由管理器失败", function()
			{
				var grid = Ext.getCmp("routeGrid");
				refurbisGrid(grid);
				Ext.Msg.alert('提示', "加入路由管理器成功");
			});
		}
	}));
	toolbar.addFill();
	toolbar.addText("服务类别：");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		id : 'route_type',
		store : new Ext.data.SimpleStore(
		{
			fields :
			[ 'key', 'value' ],
			data :
			[
			[ '全部', '' ],
			[ 'HTTP', 'http' ],
			[ 'SOAP', 'soap' ],
			[ 'FTP服务', 'ftp' ] ]
		}),
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchRoute();
				}
			}
		},
		triggerAction : 'all',
		displayField : 'key',
		valueField : 'value',
		value : "",
		width : 120,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addText("服务状态：");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		id : 'route_status',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchRoute();
				}
			}
		},
		store : new Ext.data.SimpleStore(
		{
			fields :
			[ 'key', 'value' ],
			data :
			[
			[ '全部', '0' ],
			[ '暂停', '1' ],
			[ '停止', '2' ],
			[ '运行', '3' ] ]
		}),
		triggerAction : 'all',
		displayField : 'key',
		valueField : 'value',
		value : "0",
		width : 120,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addText("服务名称：");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'route_Name',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchRoute();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:'输入包含服务名称的字符',
		width : 200
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler :searchRoute
	}));
	toolbar.addText("&nbsp;&nbsp;");
	return toolbar;
}
function searchRoute()
{
	//获取服务状态
	var started = Ext.getCmp("route_status").getValue();
	var routeName = Ext.getCmp("route_Name").getValue();
	var routeType = Ext.getCmp("route_type").getValue();
	var grid = Ext.getCmp("routeGrid");
	grid.store.reload(
	{
		params :
		{
			routeType : routeType,
			routeName : routeName,
			started : started,
			start : 0,
			limit : 20
		}
	});
	grid.store.baseParams =
	{
		routeType : routeType,
		routeName : routeName,
		started : started,
		start : 0,
		limit : 20
	};
}
// 获取路由ID
function getSelectedRouteId()
{
	var grid = Ext.getCmp("routeGrid");
	var list = getGridList(grid, "routeId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "请选择要操作的路由");
		return false;
	}
	return list[0];
}
function refurbisGrid(grid)
{
	grid.store.reload();
	grid.getSelectionModel().clearSelections();
	var toolbar = grid.getTopToolbar();
	for ( var i = 0; i <= 3; i++)
	{
		toolbar.getComponent(i).disable();
	}
}
// 刷新状态
function refurbishBtn(grid)
{

}