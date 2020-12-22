function configWin()
{
	new Ext.Window(
	{
		layout : 'column',
		width : 750,
		height : 400,
		title : '资产权限配置',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ createLeftPanel(), createCenterPanel(), createRightPanel() ],
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler:function()
			{
				this.findParentByType("window").close(); 
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler : saveSelects
		} ]

	}).show();
}
function createLeftPanel()
{
	var grid = Ext.getCmp("assetRoleGrid")
	var record = grid.getSelectionModel().getSelected();
	var roleId = record.get("roleId");
	var url = getHandlerRequestUrl() + "assetRoleHandler/getNotInRole?roleId="
			+ roleId;
	return createGrid("未添加", url, "df");
}
function createRightPanel()
{
	var grid = Ext.getCmp("assetRoleGrid")
	var record = grid.getSelectionModel().getSelected();
	var roleId = record.get("roleId");
	var url = getHandlerRequestUrl() + "assetRoleHandler/getInRole?roleId="
			+ roleId;
	return createGrid("已添加", url, "dff");
}
function createCenterPanel()
{
	return new Ext.Panel(
	{
		columnWidth : .1,
		title : '操作',
		bodyStyle : 'padding:5 5 5 5',
		items : [ new Ext.Button(
		{
			text : '添加',
			handler : addAsset,
			width : 60
		}),
		{
			frame : false,
			height : 66,
			bodyStyle : 'background-color:#FFF',
			border : false
		}, new Ext.Button(
		{
			text : '移除',
			handler : removeAsset,
			width : 60
		}),
		{
			frame : false,
			height : 66,
			bodyStyle : 'background-color:#FFF',
			border : false
		}, new Ext.Button(
		{
			text : '添加全部',
			width : 60,
			handler : addAssetAll
		}),
		{
			frame : false,
			height : 66,
			bodyStyle : 'background-color:#FFF',
			border : false
		}, new Ext.Button(
		{
			text : '移除全部',
			width : 60,
			handler:removeAseetAll
		})],
		height : 390
	});
}
function createGrid(title, url, id)
{
	var sm = new Ext.grid.CheckboxSelectionModel();
	var columns = [ sm,
	{
		dataIndex : 'resourceId',
		hidden : true
	},
	{
		dataIndex : 'orgId',
		hidden : true
	},
	{
		dataIndex : 'resourceName',
		header : "名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'provider',
		header : "提供方",
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
		}, Ext.data.Record.create([
		{
			name : 'resourceId'
		},
		{
			name : 'resourceName'
		},
		{
			name : 'provider',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgName");
			}
		},
		{
			name : 'orgId',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgId");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : url
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		title : title,
		columnWidth : .45,
		loadMask : true,
		buttonAlign : 'center',
		id : id,
		height : 330,
		border : false,
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		columnLines : true,
		stripeRows : true,
		bbar : new Ext.PagingToolbar(
		{
			pageSize : pageSize,
			store : gridStore,
			displayInfo : true,
			displayMsg : '{0}-{1}条,共{2}条',
			emptyMsg : '没有记录'
		}),
		viewConfig :
		{
			forceFit : true
		}
	});
}
function addAsset()
{
	var grid = Ext.getCmp("df")
	var record = grid.getSelectionModel().getSelections();
	if (record.length < 1)
	{
		Ext.Msg.alert('提示', "请在左边选取至少一条数据");
		return;
	}

	grid1 = Ext.getCmp("dff");
	for ( var i = 0; i < record.length; i++)
	{
		grid.getStore().remove(record[i]);
		grid1.getStore().insert(0, record[i]);
	}
}
function addAssetAll()
{
	var grid = Ext.getCmp("df")
	grid.getSelectionModel().selectAll();
	var record = grid.getSelectionModel().getSelections();
	if (record.length < 1)
	{
		Ext.Msg.alert('提示', "请在左边选取至少一条数据");
		return;
	}

	grid1 = Ext.getCmp("dff");
	for ( var i = 0; i < record.length; i++)
	{
		grid.getStore().remove(record[i]);
		grid1.getStore().insert(0, record[i]);
	}
}
function removeAsset()
{
	var grid = Ext.getCmp("dff")
	var record = grid.getSelectionModel().getSelections();
	if (record.length < 1)
	{
		Ext.Msg.alert('提示', "请在右边选取至少一条数据");
		return;
	}

	grid1 = Ext.getCmp("df");
	for ( var i = 0; i < record.length; i++)
	{
		grid.getStore().remove(record[i]);
		grid1.getStore().insert(0, record[i]);
	}
}
function removeAseetAll()
{
	var grid = Ext.getCmp("dff");
	grid.getSelectionModel().selectAll();
	grid1 = Ext.getCmp("df");
	var record = grid.getSelectionModel().getSelections();
	for ( var i = 0; i < record.length; i++)
	{
		grid.getStore().remove(record[i]);
		grid1.getStore().insert(0, record[i]);
	}
	
}
function saveSelects()
{
	var grid = Ext.getCmp("dff")
	grid.getSelectionModel().selectAll();
	var record = grid.getSelectionModel().getSelections();
	var list = [];
	for ( var i = 0; i < record.length; i++)
	{
		list.push(record[i].get("resourceId"));
	}
	var grid = Ext.getCmp("assetRoleGrid")
	var record = grid.getSelectionModel().getSelected();
	var roleId = record.get("roleId");
	var url=getHandlerRequestUrl()+"assetRoleHandler/saveRoleAndAsset?roleId="+roleId;
	
	Ext.Ajax.request(
	{
		url : url,
		method : 'POST',
		params: { assetIds:list.join(",") },
		success : function(response, options)
		{
			var result = Ext.util.JSON.decode(response.responseText);
			if (result.success)
			{
				Ext.Msg.alert('提示',"数据保存成功",function(){
					Ext.getCmp("dff").getStore().reload();
					Ext.getCmp("df").getStore().reload();
					
				});
	
			} else
			{
				Ext.Msg.alert('提示', "保存数据异常：" + result.msg);
			}
		},
		failure : function(response, options)
		{
			var result = Ext.util.JSON.decode(response.responseText);
			Ext.Msg.alert('提示',  "保存数据异常：" + result.data);
		}
	});
}