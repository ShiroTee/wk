Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	setTip("信息资产目录列表");
	var panel = createMainPanel();
	setPagingTwo(Ext.getCmp("serviceGrid"));
	setMainPanel(document.body, panel);
	Ext.getCmp("treeHeight_").setHeight(Ext.getCmp("serviceGrid").getHeight());
	Ext.EventManager.onWindowResize(function()
	{
	});
}
function createMainPanel()
{
	var panel = new Ext.Panel(
	{
		layout : 'column',
		autoWidth : true,
		defaults :
		{// 设置默认属性
			bodyStyle : 'background-color:#FFFFFF;',// 设置面板体的背景色
			frame : true
		},
		items :
		[ createLeftTreePanel(), createGrid() ]
	});
	return panel;
}
function createLeftTreePanel()
{
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : orgRootName,
		id : orgRootId,
		draggable : false,
		expanded : true,
		loader : new Ext.tree.TreeLoader(
		{
			dataUrl : getContextPath()
					+ "app/http/aip/orgInfoManagerHandler/getOrgInfoTree"
		})
	});
	var tree = new Ext.tree.TreePanel(
	{
		frame : true,
		columnWidth : .2,
		animate : true,
		id : 'treeHeight_',
		root : root,
		border : false,
		autoScroll : true,
		listeners :
		{
			click : function(node, e)
			{
				var grid = Ext.getCmp("serviceGrid");
				Ext.apply(grid.store.baseParams,
				{
					start : 0,
					limit : pageSize,
					provider : node.id
				});
				grid.store.load(
				{
					params : grid.store.baseParams
				});
			}
		},
		hrefTarget : 'mainContent'
	});
	return tree;
}
function createGrid()
{
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		singleSelect : true,
		header:"",
		listeners :
		{
			rowselect : function()
			{
				var grid = Ext.getCmp("serviceGrid");
				var record = this.getSelected();
				var routeType = record.get("routeType");
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).enable();
				toolbar.getComponent(1).enable();
				if ("soap" == routeType)
				{
					toolbar.getComponent(2).enable();
				} else if ("http" == routeType)
				{
					toolbar.getComponent(3).enable();
				}
				toolbar.getComponent(4).enable();
				toolbar.getComponent(5).enable();

			},
			rowdeselect : function()
			{
				var grid = Ext.getCmp("serviceGrid");
				var toolbar = grid.getTopToolbar();
				for ( var i = 0; i < 6; i++)
				{
					toolbar.getComponent(i).disable();
				}

			}
		}
	});
	var columns =
	[ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'routeId',
		hidden : true
	},
	{
		dataIndex : 'routeName',
		header : "服务名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'resourceName',
		header : "挂接资源目录",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'showURL',
		header : "发布地址",
		sortable : true,
		renderer:formatQtip,
		width : 200
	},
	{
		dataIndex : 'routeType',
		header : "协议类型",
		width : 40
	},
	{
		dataIndex : 'isAuth',
		header : "授权类型",
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='green'>完全公开</font>";
			}
			return "<font color='red'>授权访问</font>";
		},
		width : 40
	},
	{
		dataIndex : 'routeStatus',
		header : "服务状态",
		renderer : function(value)
		{
			if (value == 1)
			{
				return "<font color='green'>启用</font>";
			}
			return "<font color='red'>禁用</font>";
		},
		width : 40
	},
	{
		dataIndex : 'publishDate',
		header : "发布时间",
		renderer : formatDate,
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
			name : 'routeStatus'
		},
		{
			name : 'showURL'
		},
		{
			name : 'publishDate'
		},
		{
			name : 'isAuth'
		},
		{
			name : 'resourceName',
			mapping : function(data)
			{
				return jsonConvert(data, "resource", "resourceName");
			}
		},{
			name:'orgId',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgId");
			}
		},{
			name:'orgName',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgName");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "serviceInfoHandler/searchWebService"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar(),
		columnWidth : .8,
		loadMask : true,
		buttonAlign : 'center',
		id : 'serviceGrid',
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
		text : '服务详情',
		disabled : true,
		iconCls : 'icon_sms',
		handler : showServiceDetails
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '参数配置',
		disabled : true,
		iconCls : 'icon_edit',
		handler : createParameterWin
	}));

	toolbar.addButton(new Ext.Button(
	{
		text : '查看WSDL',
		disabled : true,
		iconCls : 'icon_query',
		handler : function()
		{
			var grid = Ext.getCmp("serviceGrid");
			var record = grid.getSelectionModel().getSelected();
			window.open(record.get("showURL") + "?wsdl", "_blank")
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '配置响应模板',
		disabled : true,
		iconCls : 'icon_apply',
		handler : configResponse
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '删除服务',
		disabled : true,
		iconCls : 'icon_delete',
		handler : deleteService
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : 'API文档',
		// disabled : true,
		iconCls : 'icon_delete',
		disabled : true,
		handler : function()
		{
			var grid = Ext.getCmp("serviceGrid");
			var record = grid.getSelectionModel().getSelected();
			var url = getHandlerRequestUrl()
					+ "serviceInfoHandler/getAPIDetails?routeId="
					+ record.get("routeId");
			var grid = Ext.getCmp("serviceGrid");
			grid.getSelectionModel().clearSelections();
			window.open(url, "_blank")
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '注册服务',
		iconCls : 'icon_add',
		handler : addService
	}));
	toolbar.addFill();
	toolbar.addText("服务名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'serviceName_text_',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchForWebService();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:'输入包含服务名称的字符',
		width :150
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '搜索',
		iconCls : 'icon_query',
		handler:searchForWebService
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '高级搜索',
		handler:showSearchForm,
		iconCls : 'icon_query'
	}));
	return toolbar;
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