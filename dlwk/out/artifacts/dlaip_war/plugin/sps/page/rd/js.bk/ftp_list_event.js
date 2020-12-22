/**
 * 获取非资源目录文件列表，资源目录可以直接在此处进行文件挂接
 * 
 * @returns {Ext.grid.GridPanel}
 */
function showFileGrid()
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
				//选中直接启用即可，不必多余判断
				var but=Ext.getCmp('toolbar_save_but1');
				but.enable();
			},
			rowdeselect : function()
			{
				var but=Ext.getCmp('toolbar_save_but1');
				var grid=Ext.getCmp("fileSelectGrid");
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
		header : "文件名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'fileSizef',
		header : "文件大小",
		sortable : true,
		width : 40
	},
	{
		dataIndex : 'showURL',
		header : "下载地址",
		sortable : true,
		width : 240
	},
	{
		dataIndex : 'routeStatus',
		header : "文件状态",
		renderer : function(value)
		{
			if (value == 1)
			{
				return "<font color='green'>启用</font>";
			}
			return "<font color='red'>禁用</font>";
		},
		width : 40
	},
	{
		dataIndex : 'publishDate',
		header : "上传时间",
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
			name : 'fileSizef'
		},
		{
			name : 'routeName'
		},
		{
			name : 'routeStatus'
		},
		{
			name : 'showURL'
		},
		{
			name : 'publishDate'
		}])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "serviceInfoHandler/getFileListNotResource"
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
						id:'toolbar_save_but1',
						disabled:true,
						handler : function()
						{
							var grid = Ext.getCmp("rdGrid");
							var record = grid.getSelectionModel().getSelected();
							var resourceId = record.get("resourceId");
							grid = Ext.getCmp("fileSelectGrid");
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
	toolbar.addButton(
	{
		text : '上传文件',
		iconCls : 'icon_add',
		handler : openFileUploadWin
	});
	toolbar.addFill();
	toolbar.addText("文件名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		width : 200,
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					query_file();
				}
			}
		}
	}));
	toolbar.addText(" 下载地址:");
	toolbar.addItem(new Ext.form.TextField(
	{
		width : 200,
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					query_file();
				}
			}
		}
	}));
	toolbar.addButton(
	{
		text : '搜索',
		iconCls : 'icon_query',
		handler:query_file
	});
	var grid = new Ext.grid.GridPanel(
	{
		autoScroll : true,
		tbar : toolbar,
		id : 'fileSelectGrid',
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
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
		resizable : false,
		autoScroll : true,
		width : 880,
		height:380,
		maximizable : false,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '文件列表',
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
function query_file()
{
	var grid = Ext.getCmp("fileSelectGrid");
	var toolbar = grid.getTopToolbar();
	grid.store.reload(
	{
		params :
		{
			routeName : toolbar.get(4).getValue(),
			publishURL : toolbar.get(6).getValue(),
			start : 0,
			limit : pageSize
		}
	});

	grid.store.baseParams =
	{
		routeName : toolbar.get(4).getValue(),
		publishURL : toolbar.get(6).getValue(),
		start : 0,
		limit : pageSize
	};
}