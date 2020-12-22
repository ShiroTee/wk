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
Ext.override(Ext.ux.form.LovCombo,
{
	beforeBlur : Ext.emptyFn
});
Ext.onReady(init);
function init()
{
	setTip("用户信息管理");
	var userMainPanel = createMainPanel();
	setPagingTwo(Ext.getCmp("gridUserId"));
	setMainPanel(document.body, userMainPanel);
	Ext.getCmp("treeHeight").setHeight(Ext.getCmp("gridUserId").getHeight());
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
		columnWidth : .2,
		split : true,
		id:'treeHeight',
		root : root,
		autoScroll : true,
		listeners :
		{
			click : function(node, e)
			{
				var grid = Ext.getCmp("gridUserId");
				
				grid.store.load(
				{
					params :
					{
						start : 0,
						limit : pageSize,
						orgId : node.id
					}
				});
				grid.store.baseParams=
				{
					start : 0,
					limit : pageSize,
					orgId : node.id,
					isSearch : 'N'
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
				limit : pageSize,
				isSearch : 'N'
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
			name : 'userId'
		},
		{
			name : 'name'
		},
		{
			name : 'sex'
		},
		{
			name : 'loginName'
		},
		{
			name : 'status'
		},
		{
			name : 'createDate'
		},
		{
			name : 'isAppAdmin'
		},
		{
			name : 'organizationId'
		},
		{
			name : 'orgName',mapping: function(data)
			{
				return jsonConvert(data, "orgInfo", "orgName");
			}
		},
		{
			name : 'postIds'
		},
		{
			name : 'postNames'
		},{
			name : 'userLevel'
		} ,{
			name : 'finallyLoginDate'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "userInfoManagerHandler/searchForUser"
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
	var cb = new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.grid.GridPanel(
	{

		frame : false,
		border : false, // 是否显示表格的边框
		id : "gridUserId",
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
			autoFill : true
		},
		columns : [ sm, new Ext.grid.RowNumberer(),
		{
			dataIndex : 'userId',
			width : 30,
			hidden : true
		},
		{
			header : "用户名",
			width : 30,
			dataIndex : 'name',
			sortable : true
		},
		{
			header : "登录名",
			width : 30,
			dataIndex : 'loginName',
			sortable : true
		},
		{
			header : "性别",
			width :10,
			dataIndex : 'sex',
			sortable : true,
			renderer:function(value){
				if("B"==value)
					{
						return "男";
					}
				else if("G"==value)
					{
						return "女";
					}
			}
		},
		{
			header : "所属机构",
			width : 30,
			dataIndex : 'orgName',
			sortable : true
		},
		{
			header : "添加时间",
			width :40,
			dataIndex : 'createDate',
			renderer : formatDate,
			sortable : true
		},
		{
			header : "最后一次登录时间",
			width :40,
			dataIndex :'finallyLoginDate',
			renderer :formatDate,
			sortable : true
		},
		{
			header : "状态",
			width :10,
			dataIndex : 'status',
			renderer : formatStatus,
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
		autoWidth : true

	});
	toolbar.addButton(new Ext.Button(
	{
		text : "新增",
		iconCls : 'icon_add',
		handler : function(){
			showUserWin();
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "编辑",
		iconCls : 'icon_edit',
		handler : function(){
			showEditUserWin();
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		handler : function(){
			deleteUserInfo();
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "配置岗位",
		iconCls : 'icon_lookup',
		handler:function(){
			showPostListWin();
		}
	}));
	toolbar.addButton(new Ext.Button(
			{
				text : "重置密码",
				iconCls : 'icon_updatePassword',
				handler:function()
				{
					resetPassword();
				}
			}));
	/*
	 * toolbar.addButton(new Ext.Button( { text : "导入", iconCls : 'icon_explan',
	 * handler:showImportWin }));
	 */
	toolbar.addSeparator();
	toolbar.addFill();
	toolbar.addText("用户姓名:");
	toolbar.addItem(new Ext.form.TextField(
	{
		name : "name",
		width:120,
		id : 'search_name'
	}));
	toolbar.addText("登录名:");
	toolbar.addItem(new Ext.form.TextField(
	{
		name : "loginName",
		width:120,
		id : 'search_loginName'
	}));
	toolbar.addItem(new Ext.form.TextField(
	{
		id : "searchOrgId",
		hidden : true
	}));
	toolbar.addText("机构:");
	toolbar.addItem(createOrganizationComboxTree("toolbarOrg", "searchOrgId",160,true));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : searchUserInfo
	}));
	return toolbar;
}
