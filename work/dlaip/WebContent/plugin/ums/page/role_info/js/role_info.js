Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init() {
	setTip("角色管理");
	var grid = createRoleGrid();
	setPaging(grid);
	setMainPanel(document.body, grid);
	Ext.EventManager.onWindowResize(function() {
	});
}
function createRoleGrid() {
	var fields = [ 'roleId', 'roleName', "status", "createDate", {
		name : 'appName',
		mapping : 'app.appName'
	}, {
		name : 'appId',
		mapping : 'app.appId'
	} ];
	var sm = new Ext.grid.CheckboxSelectionModel();
	var columnLabel = new Ext.grid.ColumnModel([ sm,
			new Ext.grid.RowNumberer(), {
				header : "角色名称",
				dataIndex : 'roleName',
				sortable : true
			}, {
				header : "所属应用",
				dataIndex : 'appName',
				sortable : true
			}, {
				header : "状态",
				dataIndex : 'status',
				renderer : formatStatus
			}, {
				header : "创建时间",
				dataIndex : 'createDate',
				renderer : formatDate,
				sortable : true
			}, {
				hidden : true,
				dataIndex : 'appId'
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
		url : getHandlerRequestUrl() + "roleInfoHandler/getRoleInfoList",
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel({
		autoScroll : true,
		width : '100%',
		id : "roleGrid",
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
		viewConfig : {
			forceFit : true
		}
	});

	return grid;
}
function createToolbar() {
	var toolbar = new Ext.Toolbar({
		autoWidth : true
	});
	toolbar.addButton(new Ext.Button({
		text : "新增",
		iconCls : 'icon_add',
		handler : function() {
			showRoleInfoWin("ADD");
			Ext.getCmp("role_reset").setVisible(true);
		}
	}));
	toolbar.addButton(new Ext.Button({
		text : "编辑",
		iconCls : 'icon_edit',
		handler : function() {
			var grid = Ext.getCmp("roleGrid");
			var list = getGridList(grid, "roleId");
			if (list.length != 1) {
				Ext.Msg.alert('提示', "每次只能对一条机构数据进行编辑");
				return false;
			}
			var roleId = list[0];
			showRoleInfoWin(roleId);
			Ext.getCmp("role_reset").setVisible(false);
		}
	}));
	toolbar.addButton(new Ext.Button({
		text : "删除",
		iconCls : 'icon_delete',
		handler : deleteRoleInfo
	}));
	toolbar.addButton(new Ext.Button({
		text : "资源分配",
		iconCls : 'icon_lookup',
		handler : resourceTreeWin
	}));
	toolbar.addButton(new Ext.Button({
		text : "图标设置",
		iconCls : 'icon_lookup',
		handler : showResourceWin
	}));
	toolbar.addFill();
	toolbar.addText("角色名称:");
	toolbar.addItem(new Ext.form.TextField({
		name : "roleName",
		id : 'search_RoleName'
	}));
	toolbar.addButton(new Ext.Button({
		text : "搜索",
		iconCls : 'icon_query',
		handler : function() {
			var roleName=Ext.getCmp("search_RoleName").getValue();
			if(""!=search_RoleName)
			{
				var grid = Ext.getCmp("roleGrid");
				grid.store.reload({
					params : {
						start : 0,
						limit : pageSize,
						roleName : roleName
					}
				});
				grid.store.baseParams = {
					start : 0,
					limit : pageSize,
					roleName : roleName
				};
			}
			
		}
	}));
	toolbar.addText("&nbsp;");
	toolbar.addText("&nbsp;");
	toolbar.addText("&nbsp;");
	return toolbar;
}
