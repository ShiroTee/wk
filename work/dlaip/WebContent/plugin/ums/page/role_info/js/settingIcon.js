function showResourceWin()
{
	var grid = Ext.getCmp("roleGrid");
	var list = getGridList(grid, "roleId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "只能对一条数据进行操作");
		return false;
	}
	new Ext.Window(
	{
		layout : 'fit',
		width : 600,
		height : 360,
		title : '详情',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		items : [ createRGrid(list[0]) ]

	}).show();
}
function createRGrid(roleId)
{
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			rowselect : function()
			{
				var grid=Ext.getCmp("ICON_SETTING");
				var record = this.getSelected();
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).enable();
				toolbar.getComponent(1).enable();
				if (record.get("showDesktop")=="Y")
				{
					toolbar.getComponent(0).setText("不显示到桌面");
				}
				else
				{
					toolbar.getComponent(0).setText("显示到桌面");
				}
			},
			rowdeselect : function()
			{
				var grid=Ext.getCmp("ICON_SETTING");
				var record = this.getSelected();
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).disable();
				toolbar.getComponent(1).disable();
			}
		},
		singleSelect : true
	});
	var columns = [ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'id',
		hidden : true
	},
	{
		dataIndex : 'resourceName',
		header : "资源名称",
		sortable : true,
		width : 160
	},
	{
		dataIndex : 'showDesktop',
		header : "桌面快捷方式",
		sortable : true,
		renderer : function(value)
		{
			if ("Y" == value)
			{
				return "显示"
			}
			return "不显示";
		},
		width : 40
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
			name : 'id'
		},
		{
			name : 'resourceName',
			mapping : function(data)
			{
				return jsonConvert(data, "resourceInfo", "resourceName");
			}
		},
		{
			name : 'showDesktop'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "roleResourceInfoHandler/getRoleResourceByRole?roleId="
					+ roleId
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar_(),
		loadMask : true,
		buttonAlign : 'center',
		id:"ICON_SETTING",
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
		bbar : [],
		viewConfig :
		{
			forceFit : true
		}
	});
}
function createToolbar_()
{
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(new Ext.Button(
	{
		text : "显示",
		disabled : true,
		iconCls : 'icon_sms',
		handler:function()
		{
			var grid=Ext.getCmp("ICON_SETTING");
			var id=grid.getSelectionModel().getSelected().get("id");
			var showDesktop=this.getText()=="显示到桌面"?"Y":"N";
			var url=getHandlerRequestUrl()+ "roleResourceInfoHandler/setShowDesktop?id="+id+"&showDesktop="+showDesktop;
			search_(url,"修改异常",function(){
				grid.getStore().reload();
				grid.getSelectionModel().clearSelections();
			});
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "设置图标",
		disabled : true,
		iconCls : 'icon_sms',
		handler:settingIcon
	}));
	return toolbar;
}
function settingIcon()
{
		var store = new Ext.data.JsonStore(
		{
			url : getHandlerRequestUrl()+ "resourceInfoHandler/getIconList",
			fields : ['text']
		});
		store.load();
		var tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<div class="thumb-wrap" id="{text}">',
				'<div class="thumb"><div class="{text}" style="height: 48px; width: 48px;"></div></div>',
				'<span class="x-editable"></span></div>', '</tpl>',
				'<div class="x-clear"></div>');
		var icons_name = "";

		var panel = new Ext.Panel(
		{
			id : 'images-view',
			// frame : true,
			width : 580,
			height : 100000,
			autoScroll : true,
			layout : 'fit',
			items : new Ext.DataView(
			{
				store : store,
				// autoScroll : true,
				tpl : tpl,
				// autoHeight : true,
				multiSelect : true,
				overClass : 'x-view-over',
				itemSelector : 'div.thumb-wrap',
				emptyText : 'No images to display',

				plugins : [ new Ext.DataView.DragSelector() ],

				prepareData : function(data)
				{
					data.shortName = Ext.util.Format.ellipsis(data.name, 15);
					data.sizeString = Ext.util.Format.fileSize(data.size);
					return data;
				},

				listeners :
				{
					selectionchange :
					{
						fn : function(dv, nodes)
						{
							var l = nodes.length;
							if (l > 1)
							{
								Ext.Msg.alert("提示", "只能选中一个资源图片");
								return;
							} else
							{
								icons_name = nodes[0].id;
							}
							panel.setTitle('资源图片预览(' + l + ' 资源被选中)');
						}
					}
				}
			})
		});

		panel.addClass("image-view-pannel");
		var grid=Ext.getCmp("ICON_SETTING");
		var id=grid.getSelectionModel().getSelected().get("id");
		var url=getHandlerRequestUrl()+ "roleResourceInfoHandler/setIconCls?id="+id;
		var updateIconsWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'updateIconsWin',
					closeAction : 'close',
					resizable : false,
					width : 593,
					shadow : true,
					bodyStyle : 'padding:10',
					title : '资源图片',
					height : 380,
					modal : true,
					closable : true,
					animCollapse : true,
					items : [ panel ],
					buttons : [
					{
						text : "确定",
						handler : function()
						{
							if (icons_name.length != 0)
							{
								Ext.Ajax
										.request(
										{
											// 发送请求
											url : url,
											method : 'POST',
											params :
											{
												iconCls : icons_name
											},
											success : function(response, opts)
											{
												updateIconsWin.close();
												Ext.Msg.alert('错误提示',
														"修改资源Icon成功");
											},
											failure : function(response, opts)
											{
												Ext.MessageBox
														.show(
														{
															title : '错误',
															msg : '删除失败!请联系管理员',
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.ERROR
														});
											}
										});
							} else
							{
								Ext.Msg.alert('错误提示', "请选择一个资源图片");
							}
						}
					} ]
				});
		updateIconsWin.show();
}