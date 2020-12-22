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
	setTip("岗位信息管理");
	var postInfoMainPanel = createPostInfoMainPanel();
	setPagingTwo(Ext.getCmp("postInfoGrid"));
	setMainPanel(document.body, postInfoMainPanel);
	Ext.getCmp("treePost").setHeight(Ext.getCmp("postInfoGrid").getHeight());
	Ext.EventManager.onWindowResize(function()
	{
	});
}
function createPostInfoMainPanel()
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
		[ createPostInfoLeftTreePanel(), createRightPostInfoGridPanel() ]
	});
	return panel;
}
function createPostInfoLeftTreePanel()
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
		columnWidth : .2,
		split : true,
		id : 'treePost',
		root : root,
		autoScroll : true,
		listeners :
		{
			click : function(node, e)
			{
				var grid = Ext.getCmp("postInfoGrid");
				Ext.apply(grid.store.baseParams,
				{
					start : 0,
					limit : pageSize,
					orgId : node.id
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
function createRightPostInfoGridPanel()
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
		}, Ext.data.Record.create(
		[
		{
			name : 'postId'
		},
		{
			name : 'postName'
		},
		{
			name : 'orgName',
			mapping : 'orgInfo.shortName'
		},
		{
			name : 'appName',
			mapping : 'app.appName'
		},
		{
			name : 'appId',
			mapping : 'app.appId'
		},
		{
			name : 'createDate'
		},
		{
			name : 'status'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "postInfoManagerHandler/getPostInfoPageList"
		}),
		sortInfo :
		{
			field : "postName",
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
		id : "postInfoGrid",
		columnWidth : .8,
		tbar : createToolbar(),
		sm : sm,
		store : gridStore,
		stripeRows : true,
		closable : true,
		autoScroll : true,
		bbar :
		[],
		viewConfig :
		{
			autoFill : true
		},
		columns :
		[ sm, new Ext.grid.RowNumberer(),
		{
			dataIndex : 'id',
			hidden : true
		},
		{
			dataIndex : 'appId',
			hidden : true
		},
		{
			header : "岗位名称",
			width : 30,
			dataIndex : 'postName',
			sortable : true
		},
		{
			header : "所属机构",
			width : 30,
			dataIndex : 'orgName',
			sortable : true
		},
		{
			header : "所属应用",
			width : 30,
			dataIndex : 'appName',
			sortable : true
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
			renderer : formatStatus,
			sortable : true
		} ]

	});
	return grid;
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar(
	{
		autoWidth : true
	});
	toolbar.addButton(new Ext.Button(
	{
		text : "新增",
		handler : showPostWin,
		iconCls : 'icon_add'
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "编辑",
		iconCls : 'icon_edit',
		handler : showEditPostInfoWin
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		handler : deletePostInfo
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "角色分配",
		iconCls : 'icon_lookup',
		handler : showRoleListWin
	}));
	toolbar.addFill();
	toolbar.addText("岗位名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchForPost();
				}
			}
		},
		width : 200
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : searchForPost
	}));
	return toolbar;
}
