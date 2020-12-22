Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.override(Ext.form.ComboBox,
{
	onViewClick : function(doFocus)
	{
		var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
				.getAt(index);
		if (r)
		{
			this.onSelect(r, index);
		} else if (s.getCount() === 0)
		{
			this.collapse();
		}
		if (doFocus !== false)
		{
			this.el.focus();
		}
	}
});
Ext.onReady(init);
function init()
{
	setTip("资源管理");
	var mainPanel = createMainPanel();
	setPagingTwo(Ext.getCmp("resourceInfoGrid"));
	setMainPanel(document.body, mainPanel);
	Ext.EventManager.onWindowResize(function()
	{
		// grid.getView().refresh();
	});
	var tree = Ext.getCmp("resourceInfoTree");
	var node = tree.getRootNode();
	tree.getSelectionModel().select(node);
	Ext.getCmp("resourceInfoTree").setHeight(
			Ext.getCmp("resourceInfoGrid").getHeight());
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
		items : [ createLeftTreePanel(), createRightGridPanel() ]
	});
	return panel;
}
function createLeftTreePanel()
{
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : "资源树",
		id : "ROOT",
		draggable : false,
		expanded : true,
		loader : new Ext.tree.TreeLoader(
		{
			dataUrl : getHandlerRequestUrl()
					+ "resourceInfoHandler/getResourceInfoTree"
		})
	});
	var tree = new Ext.tree.TreePanel(
	{
		frame : true,
		columnWidth : .2,
		split : true,
		root : root,
		id : "resourceInfoTree",
		autoScroll : true,
		listeners :
		{
			click : function(node, e)
			{
				var grid = Ext.getCmp("resourceInfoGrid");
				grid.store.load(
				{
					params :
					{
						start : 0,
						limit : pageSize,
						pid : node.id
					}
				});
				grid.store.baseParams =
				{
					start : 0,
					limit : pageSize,
					pid : node.id
				};
			}
		},
		hrefTarget : 'mainContent'
	});
	return tree;
}
function createRightGridPanel()
{
	var sm = new Ext.grid.CheckboxSelectionModel();
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
			name : 'resourceType'
		},
		{
			name : 'resourceUrl'
		},
		{
			name : 'foliage'
		},
		{
			name : 'status'
		},
		{
			name : 'createDate'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "resourceInfoHandler/getPageListByPid"
		}),
		sortInfo :
		{
			field : "organizationName",
			direction : "ASC"
		}, // 默认按哪一列排序,比如按照创建日期排序,sortInfo:{field: "createDate",direction:
		// "ASC|DESC"}
		remoteSort : true
	// 服务器端排序
	});
	new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.grid.GridPanel(
	{

		frame : false,
		border : false, // 是否显示表格的边框
		id : "resourceInfoGrid",
		columnWidth : .8,
		tbar : createToolbar(),
		sm : sm,
		store : gridStore,
		stripeRows : true,
		closable : true,
		autoScroll : true,
		bbar : [],
		viewConfig :
		{
			forceFit : true
		},
		columns : [ sm, new Ext.grid.RowNumberer(),
		{
			dataIndex : 'resourceId',
			hidden : true
		},
		{
			dataIndex : 'foliage',
			hidden : true
		},
		{
			header : "资源名称",
			width : 60,
			dataIndex : 'resourceName',
			sortable : true
		},
		{
			header : "资源类型",
			dataIndex : 'resourceType',
			width : 40,
			renderer : function(value)
			{
				var type = "";
				if (value == 0)
				{
					type = "系统页面";
				} else if (value == 1)
				{
					type = "外部系统URL";
				} else if (value == 2)
				{
					type = "虚拟目录";
				} else if (value == 3)
				{
					type = "按钮";
				} else if (value == 4)
				{
					type = "服务资源";
				} else if (value == 5)
				{
					type = "资源";
				} else
				{
					type = "其他";
				}
				return type;
			},
			sortable : true
		},
		{
			header : "资源URL",
			width : 80,
			dataIndex : 'resourceUrl'
		},
		{
			header : "创建时间",
			width : 80,
			dataIndex : 'createDate',
			renderer : formatDate
		},
		{
			header : "状态",
			width : 30,
			dataIndex : 'status',
			renderer : formatStatus,
			sortable : true
		} ]

	});
	return grid;
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(new Ext.Button(
	{
		text : "新增",
		iconCls : 'icon_add',
		handler : function()
		{
			openResourceInfoWin("ADD");
			//Ext.getCmp("icon_reset").setVisible(true);
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "编辑",
		iconCls : 'icon_edit',
		handler : function()
		{
			var grid = Ext.getCmp("resourceInfoGrid");
			var list = getGridList(grid, "resourceId");
			if (list.length != 1)
			{
				Ext.Msg.alert('错误提示', "每次只能对一条数据进行编辑");
				return false;
			}
			openResourceInfoWin(list[0]);
			//Ext.getCmp("icon_reset").setVisible(false);
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		handler : deleteResourceInfo
	}));
	toolbar.addFill();

	toolbar.addText("资源类型:");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'name', 'id' ],
			data : [ [ '全部', '-1' ], [ '系统页面', '0' ], [ '外部系统URL', '1' ],
					[ '虚拟目录', '2' ], [ '按钮', '3' ], [ '事项', '4' ],
					[ '数据资源', '5' ] ]
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
		value : "-1",
		width : 100,
		id : 'ComboBoxResourceType',
		fieldLabel : "资源类型",
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addText("&nbsp;资源URL:");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'search_resourceUrl'
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : searchForResource
	}));
	return toolbar;
}
