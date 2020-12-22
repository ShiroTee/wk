/**
 * 获取非资源目录服务列表，资源目录可以直接在此处进行服务关联
 * 
 * @returns {Ext.grid.GridPanel}
 */
function showWebServiceGrid()
{
	if(!isAlone('rdGrid')){
		return false;
	}
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			rowselect : function()
			{
				//选中直接启用即可，必然有被选中数据
				var but=Ext.getCmp('toolbar_save_but2');
				but.enable();
			},
			rowdeselect : function()
			{
				var but=Ext.getCmp('toolbar_save_but2');
				var grid=Ext.getCmp("serviceSelectGrid");
				var recs = grid.getSelectionModel().getSelections();
				if(recs.length>0){
					but.enable();
				}else{
					but.disable();
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
		dataIndex : 'showURL',
		header : "发布地址",
		sortable : true,
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
			name : 'showURL'
		},
		{
			name : 'publishDate'
		},
		{
			name : 'isAuth'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "serviceInfoHandler/getWebServiceListNotResource"
		})
	});
	var pagebar = new Ext.PagingToolbar(
	{
		xtype : "bbar",
		pageSize : limit,
		frame : false,
		border : false,
		width : screen_width - 7,
		style : 'border:0px solid gray;',
		store : gridStore,
		displayInfo : true,
		plugins : new Ext.ux.ProgressBarPager(
		{
			style : "width:999px;"
		}),
		emptyMsg : '<span style="padding-left: 650px">没有记录</span>'
	});
	var toolbar = new Ext.Toolbar();
	toolbar
			.addButton(new Ext.Button(
					{
						text : '保存',
						disabled:true,
						id:'toolbar_save_but2',
						handler : function()
						{
							var grid = Ext.getCmp("rdGrid");
							var record = grid.getSelectionModel().getSelected();
							var resourceId = record.get("resourceId");
							grid = Ext.getCmp("serviceSelectGrid");
							var list = getGridList(grid, "routeId");
							Ext.Ajax
									.request(
									{
										url : getHandlerRequestUrl()
												+ "/resourceCatalogueInfoHandler/saveWebServiceInto?resourceId="
												+ resourceId + "&serviceIds="
												+ list.join(","),
										method : 'POST',
										success : function(response, options)
										{
											var result = Ext.util.JSON
													.decode(response.responseText);
											if (result.success)
											{
												grid.getStore().reload();
												Ext.Msg.alert('提示', "保存成功");

											} else
											{
												Ext.Msg.alert('提示', result.msg);
											}
										},
										failure : function(response, options)
										{
											var result = Ext.util.JSON
													.decode(response.responseText);
											Ext.Msg.alert('提示', result.data);
										}
									});
						},
						iconCls : 'icon_save'
					}));
	toolbar.addButton({
		text:'注册服务',
		iconCls:'icon_add',
		handler:openRegisterServiceWin
	});
	toolbar.addFill();
	toolbar.addText("服务名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		width : 200,
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					query_webService();
				}
			}
		}
	}));
	toolbar.addText(" 发布地址:");
	toolbar.addItem(new Ext.form.TextField(
	{
		width : 200,
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					query_webService();
				}
			}
		}
	}));
	toolbar.addButton(
	{
		text : '搜索',
		iconCls : 'icon_query',
		handler:query_webService
	});
	var grid = new Ext.grid.GridPanel(
	{
		autoScroll : true,
		tbar : toolbar,
		id : 'serviceSelectGrid',
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
//		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		bbar : pagebar,
		viewConfig :
		{
			forceFit : true
		}
	});
	var win = new Ext.Window(
	{
		layout : 'fit',
		closeAction : 'close',
		autoScroll : true,
		resizable : false,
//		width : '100%',
		width : 880,
		height:380,
		maximizable : false,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '服务列表',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items :
		[ grid ]
	});
	win.show();
//	win.maximize();
}
function query_webService()
{
	var grid = Ext.getCmp("serviceSelectGrid");
	var toolbar = grid.getTopToolbar();
	grid.store
			.reload(
			{
				params :
				{
					routeName : toolbar.get(4).getValue(),
					publishURL :toolbar.get(6).getValue(),
					start:0,
					limit : pageSize
				}
			});

	grid.store.baseParams =
	{
			routeName : toolbar.get(4).getValue(),
			publishURL : toolbar.get(6).getValue(),
			start:0,
			limit : pageSize
	};
}