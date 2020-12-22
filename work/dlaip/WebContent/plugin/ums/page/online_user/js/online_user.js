Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	setTip("在线用户列表");
	var grid = createOnlineUserGrid();
	setMainPanel(document.body, grid);
	Ext.EventManager.onWindowResize(function()
	{
	});
}
function createOnlineUserGrid()
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
			name : 'userId'
		},
		{
			name : 'name'
		},
		{
			name : 'loginName'
		},
		{
			name : 'organizationId'
		},
		{
			name : 'finallyLoginDate'
		},
		{
			name : 'orgName',
			mapping : function(data)
			{
				return jsonConvert(data, "orgInfo", "orgName");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "onLineUserHandler/getOnLineUserList"
		})
	});
	var cb = new Ext.grid.CheckboxSelectionModel();
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		handler:function()
		{
			var list=getGridList(Ext.getCmp("onLineUserGrid"),"loginName");
			if(list.length==0)
			{
				return;
			}
			Ext.MessageBox.confirm("提示", "删除的用户将被强制退出系统,是否继续?", function(btnId) {
				if (btnId == 'yes')
				{
					
					Ext.Ajax.request({
						url : getHandlerRequestUrl()+ "onLineUserHandler/deleteOnlineUser?selectLoginNames="+list.join(","),
						method : 'POST',
						success : function(response, options) {
							var result = Ext.util.JSON.decode(response.responseText);
							if (result.success) {
								Ext.getCmp("onLineUserGrid").getStore().reload();
							} else {
								Ext.Msg.alert('提示', message + "异常码：" + result.msg);
							}
						},
						failure : function(response, options) {
							var result = Ext.util.JSON.decode(response.responseText);
							Ext.Msg.alert('提示', "删除用户异常["+result+"]");
						}
					});
				}
			});
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "刷新",
		iconCls : 'icon_refresh',
		handler:function()
		{
			Ext.getCmp("onLineUserGrid").getStore().reload();
		}
	}));
	var grid = new Ext.grid.GridPanel(
	{

		frame : false,
		border : false, // 是否显示表格的边框
		tbar : toolbar,
		id : "onLineUserGrid",
		sm : sm,
		store : gridStore,
		stripeRows : true,
		closable : true,
		autoScroll : true,
		viewConfig :
		{
			autoFill : true
		},
		columns :
		[ sm, new Ext.grid.RowNumberer(),
		{
			dataIndex : 'userId',
			width : 30,
			hidden : true
		},
		{
			header : "姓名",
			width : 30,
			dataIndex : 'name',
			sortable : true
		},
		{
			header : "登陆名",
			width : 30,
			dataIndex : 'loginName',
			sortable : true
		},
		{
			header : "所属机构",
			width : 30,
			dataIndex : 'orgName',
			sortable : true
		},

		{
			header : "登录时间",
			width : 40,
			dataIndex : 'finallyLoginDate',
			renderer : formatDate,
			sortable : true
		} ]

	});
	return grid;
}