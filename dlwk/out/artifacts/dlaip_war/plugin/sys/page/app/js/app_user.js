function createAppForUserWin()
{
	var grid = Ext.getCmp("appGrid");
	var list = getGridList(grid, "appId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "请选择一条应用信息");
		return false;
	}
	var appId = list[0];
	var win = new Ext.Window(
	{

		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		width : 650,
		height : 500,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '用户列表',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items : [ createAppUserGrid(appId) ]
	});
	win.show();
}
function createAppUserGrid(appId)
{
	var fields = [
	{
		name : "appId",
		mapping : "app.appId"
	},
	{
		name : "userId",
		mapping : "user.userId"
	},
	{
		name : "loginName",
		mapping : 'user.loginName'
	},
	{
		name : "status",
		mapping : 'user.status'
	},
	{
		name : "name",
		mapping : 'user.name'
	},
	{
		name : "finallyLoginDate",
		mapping : 'user.finallyLoginDate'
	},
	{
		name : "finallyLoginOutDate",
		mapping : "user.finallyLoginOutDate"
	} ];
	var cb = new Ext.grid.CheckboxSelectionModel();
	var columnLabel = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),
			cb,
			{
				header : "用户名称",
				dataIndex : 'name'
			},
			{
				header : "登录名称",
				dataIndex : 'loginName'
			},
			{
				header : "最后一次登录时间",
				dataIndex : 'finallyLoginDate',
				width : 130,
				renderer : function(value)
				{
					if (!value || "" == value)
					{
						return "-";
					}
					var date = new Date(value);
					return date.format("Y-m-d H:i:s");
				}
			},
			{
				header : "最后一次登出时间",
				dataIndex : 'finallyLoginOutDate',
				width : 130,
				renderer : function(value)
				{
					if (!value || "" == value)
					{
						return "-";
					}
					var date = new Date(value);
					return date.format("Y-m-d H:i:s");
				}
			},
			{
				header : "状态",
				dataIndex : 'status'
			},
			{
				hidden : true,
				dataIndex : 'userId'
			},
			{
				hidden : true,
				dataIndex : 'appId'
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
		url : getHandlerRequestUrl() + "appUserInfoHandler/getUserInfoByAppId?appId="+appId,
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var toolbar = new Ext.Toolbar(
	{
		autoWidth : true
	});
	toolbar.addButton(new Ext.Button(
	{
		text : '移除',
		iconCls : 'icon_delete',
		handler : function()
		{
			grid = toolbar.findParentByType('grid');
			list = getGridList(grid, "appId");
			if (list.length == 0)
			{
				Ext.Msg.alert('错误提示', "请选择一条用户信息");
				return false;
			}
			var appId = list[0];
			list = getGridList(grid, "userId");
			var userId = list[0];
			removeUser(userId, appId);
		}
	}));
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : toolbar,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		cm : columnLabel,
		sm : cb,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		bbar : new Ext.PagingToolbar(
		{
			xtype : "bbar",
			pageSize : pageSize,
			frame : false,
			border : false,
			style : 'border:0px solid gray;',
			store : gridStore,
			displayInfo : true,
			plugins : new Ext.ux.ProgressBarPager(
			{
				style : "width:999px;"
			}),
			emptyMsg : '<span style="padding-left: 650px">没有记录</span>'
		}),
		viewConfig :
		{
			forceFit : true
		}
	});
}
function removeUser(userId, appId)
{
	var url = getHandlerRequestUrl() + "appUserInfoHandler/removeUser?userId="
			+ userId + "&appId=" + appId;
	deleteData(url, "删除用户移除", function()
	{

	});

}