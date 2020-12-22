Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	setTip("资产角色管理");
	var grid = createRoleGrid();
	setPaging(grid);
	setMainPanel(document.body, grid);
	Ext.EventManager.onWindowResize(function()
	{
	});
}
function createRoleGrid()
{
	var fields = [ 'roleId', 'roleName', "status", "createDate" ];
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		singleSelect : true,
		header:"",
		listeners :
		{
			rowselect : function()
			{
				var grid = Ext.getCmp("assetRoleGrid");
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(1).enable();
				toolbar.getComponent(2).enable();
				toolbar.getComponent(3).enable();
				toolbar.getComponent(4).enable();

			},
			rowdeselect : function()
			{
				var grid = Ext.getCmp("assetRoleGrid");
				var toolbar = grid.getTopToolbar();
				for ( var i = 1; i <5; i++)
				{
					toolbar.getComponent(i).disable();
				}

			}
		}
	});
	var columnLabel = new Ext.grid.ColumnModel([ sm,
			new Ext.grid.RowNumberer(),
			{
				header : "角色名称",
				dataIndex : 'roleName',
				sortable : true
			},
			{
				header : "状态",
				dataIndex : 'status',
				renderer : function(value)
				{
					if (value == 1)
					{
						return "<font color='green'>启用</font>";
					}
					return "<font color='red'>禁用</font>";
				}

			},
			{
				header : "创建时间",
				dataIndex : 'createDate',
				renderer : formatDate,
				sortable : true
			},
			{
				hidden : true,
				dataIndex : 'roleId'
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
		url : getHandlerRequestUrl() + "assetRoleHandler/search",
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
		id : "assetRoleGrid",
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		sm : sm,
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
		handler : function()
		{
			showRoleInfoWin("ADD");
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "编辑",
		iconCls : 'icon_edit',
		disabled : true,
		handler : function()
		{
			var grid = Ext.getCmp("assetRoleGrid")
			var record = grid.getSelectionModel().getSelected();
			showRoleInfoWin(record.get("roleId"));
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		disabled : true,
		handler : deleteRoleInfo
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "权限分配",
		iconCls : 'icon_lookup',
		handler : configWin,
		disabled : true
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "用户分配",
		iconCls : 'icon_lookup',
		handler : configUser,
		disabled : true
	}));
	toolbar.addFill();
	toolbar.addText("角色名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		name : "roleName",
		id : 'search_RoleName'
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : searchRole
	}));
	toolbar.addText("&nbsp;");
	toolbar.addText("&nbsp;");
	toolbar.addText("&nbsp;");
	return toolbar;
}
