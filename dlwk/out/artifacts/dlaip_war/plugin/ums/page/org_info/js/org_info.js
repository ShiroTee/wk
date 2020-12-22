Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	setTip("机构信息管理");
	var mainPanel=createMainPanel();
	setPagingTwo(Ext.getCmp("orgInfoGrid"));
	setMainPanel(document.body,mainPanel);
	Ext.getCmp("orgTree").setHeight(Ext.getCmp("orgInfoGrid").getHeight());
	Ext.EventManager.onWindowResize(function()
	{
		// grid.getView().refresh();
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
		items : [ createLeftTreePanel(), createRightGridPanel() ]
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
			dataUrl : getHandlerRequestUrl()
					+ "orgInfoManagerHandler/getOrgInfoTree"
		})
	});
	var tree = new Ext.tree.TreePanel(
	{
		frame : true,
//		layout:"fit",
		columnWidth : .2,
		split : true,
		root : root,
		id : "orgTree",
		autoScroll : true,
		listeners :
		{
			click : function(node, e)
			{
				if(!node.isLeaf())
				{
					var grid = Ext.getCmp("orgInfoGrid");
					grid.store.load(
					{
						params :{
							start : 0,
							limit : pageSize,
							orgPid : node.id,
							orgName : Ext.getCmp("search_orgName").getValue()
						}
					});
					grid.store.baseParams =
					{
						start : 0,
						limit : pageSize,
						orgPid : node.id,
						orgName : Ext.getCmp("search_orgName").getValue()
					};
				}
				
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
			name : 'orgId'
		},
		{
			name : 'orgName'
		},
		{
			name : 'shortName'
		},
		{
			name : 'orgCode'
		},
		{
			name : 'linkMan'
		},
		{
			name : 'createDate'
		},
		{
			name : 'phoneNumber'
		},
		{
			name : 'status'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "orgInfoManagerHandler/getOrgInfoPageList"
		})
	});
	new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.grid.GridPanel(
	{

		frame : false,
		border : false, // 是否显示表格的边框
		id : "orgInfoGrid",
		columnWidth : .8,
		tbar : createToolbar(),
		sm : sm,
		store : gridStore,
		stripeRows : true,
		closable : true,
		autoScroll : false,
		bbar : [],
		viewConfig :
		{
			autoFill : true
		},
		columns : [ sm, new Ext.grid.RowNumberer(),
		{
			dataIndex : 'orgId',
			hidden : true
		},
		
		{
			header : "机构编码",
			width : 30,
			dataIndex : 'orgCode',
			sortable : true
		},
		{
			header : "机构名称",
			dataIndex : 'orgName',
			width :60,
			sortable : true
		},
		{
			header : "机构简称",
			width : 30,
			dataIndex : 'shortName',
			sortable : true
		},
		{
			header : "机构负责人",
			width : 30,
			dataIndex : 'linkMan',
			hidden : true,
			sortable : true
		},
		{
			header : "机构联系电话",
			width : 30,
			dataIndex : 'phoneNumber'
		},
		{
			header : "创建时间",
			width : 30,
			dataIndex : 'createDate',
			renderer : formatDate,
			sortable : true
		},
		{
			header : "状态",
			width : 30,
			dataIndex : 'status',
			renderer:formatStatus,
			sortable : true
		}

		]

	});
	return grid;
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar(
	{
		autoWidth : true,
		iconCls : 'icon_add'
	});
	toolbar.addButton(new Ext.Button(
	{
		text : "新增",
		iconCls : 'icon_add',
		handler : openOrgAddWin
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "编辑",
		iconCls : 'icon_edit',
		handler:showOrgEditWin
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		handler:deleteOrgInfo
	}));
	toolbar.addFill();
	toolbar.addText("机构名称:");
	toolbar.addItem(new Ext.form.TextField({
		id:'search_orgName'
	}));
	toolbar.addButton(new Ext.Button({
		text:'搜索',
		iconCls : 'icon_query',
		handler:searchOrgInfo
	}));
	return toolbar;
}
