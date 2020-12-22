//文件上传
function openFileUploadWin()
{
	var list = getGridList(Ext.getCmp("rdGrid"), "resourceId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "请选择一条资源目录上传文件");
		return false;
	}

	var win = new Ext.Window(
	{

		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height : 300,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '文件上传',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items : [ createFileUploadForm() ],
		buttons : [
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						win.close();
					}
				},
				{
					text : '上传',
					iconCls : 'icon_save',
					handler : function()
					{
						var url = getHandlerRequestUrl()
								+ "serviceInfoHandler/uploadFile";
						submitForm(Ext.getCmp("routFormFile"), url, "",
								function()
								{
									Ext.Msg.alert('提示', "文件上传成功", function()
									{
										win.close();
									});
								});
					}
				} ]
	});
	win.show();
	Ext.getCmp("resourceIdHidden").setValue(list[0]);
	list = getGridList(Ext.getCmp("rdGrid"), "resourceName");
	Ext.getCmp("routeNameText").setValue(list[0]);
}
function createFileUploadForm()
{
	var width = 220;
	return new Ext.form.FormPanel(
	{
		labelSeparator : "：",
		frame : true,
		border : false,
		id : 'routFormFile',
		bodyStyle : 'padding:15px 0px 0px 20px',
		fileUpload : true,
		labelAlign : 'right',
		items : [
		{
			name : 'resourceId',
			xtype : 'textfield',
			id : 'resourceIdHidden',
			hidden : true
		},
		{
			xtype : 'textfield',
			name : "resourceName",
			id : 'routeNameText',
			width : width,
			allowBlank : false,
			disabled : true,
			fieldLabel : '资源目录'
		},
		{
			xtype : 'textfield',
			name : "routeName",

			width : width,
			allowBlank : false,
			fieldLabel : '显示名称'
		},
		{
			xtype : 'radiogroup',
			fieldLabel : '授权类型',
			width : width,
			columns : [ 110, 110 ],
			vertical : true,
			items : [
			{
				boxLabel : '授权访问',
				name : 'isAuth',
				inputValue : '1',
				checked : true
			},
			{
				boxLabel : '公开',
				name : 'isAuth',
				inputValue : '0'
			}

			]
		},
		{
			xtype : 'fileuploadfield',
			allowBlank : false,
			emptyText : '选择文件',
			buttonText : '选择文件',
			fieldLabel : '选择文件',
			id : 'fileUploadItem',
			width : width,
			name : 'fileName'
		},
		{
			xtype : 'textarea',
			name : 'routeDesc',
			width : 240,
			anchor : '92% 30%',
			fieldLabel : '文件描述'
		} ]
	});
}
// 资源订阅窗口
function openSubscriptionWin()
{
	var win = new Ext.Window(
	{
		closeAction : 'close',
		resizable : false,
		width : 700,
		height : 480,
		shadow : true,
		title : '资源订阅',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items : [ createSubscriptionForm(), createRouteGrid() ],
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{

			}
		},
		{
			text : '订阅',
			iconCls : 'icon_save',
			handler : function()
			{
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function()
			{
			}
		} ]
	});
	win.show();
}
// 订阅资源集合
function createRouteGrid()
{
	var columns = [ new Ext.grid.RowNumberer(),
	{
		dataIndex : 'resourceId',
		hidden : true
	},
	{
		dataIndex : 'resourceName',
		header : "名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'name',
		header : "创建人",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'publicLv',
		header : "公开级别",
		sortable : true,
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='red'>主动公开</font>";
			} else if (value == 1)
			{
				return "<font color='yellow'>被动公开</font>";
			} else if (value == 2)
			{
				return "<font color='green'>不公开</font>";
			}
		},
		width : 80
	},
	{
		dataIndex : 'provider',
		header : "提供商",
		width : 80
	},
	{
		dataIndex : 'pubDate',
		header : "发布日期",
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
		}, Ext.data.Record.create([
		{
			name : 'resourceId'
		},
		{
			name : 'resourceName'
		},
		{
			name : 'provider'
		},
		{
			name : 'publicLv'
		},
		{
			name : 'pubDate'
		},
		{
			name : 'name',
			mapping : function(data)
			{
				return jsonConvert(data, "createUser", "name");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "resourceCatalogueInfoHandler/getPageList"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		height : 255,
		store : gridStore,
		border : false,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		viewConfig :
		{
			forceFit : true
		}
	});
}
function createSubscriptionForm()
{
	return new Ext.FormPanel(
	{
		labelAlign : 'right',
		labelSeparator : "：",
		frame : true,
		border : false,
		buttonAlign : 'center',
		items : [
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .5,
				labelWidth : 80,
				layout : 'form',
				items : [
				{
					xtype : 'textfield',
					allowBlank : false,
					name : 'name',
					width : 225,
					fieldLabel : '申请人'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					allowBlank : false,
					name : 'orgName',
					width : 225,
					fieldLabel : '所属机构'
				} ]
			} ]
		},
		{

			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .97,
				labelWidth : 80,
				layout : 'form',
				items : [
				{
					xtype : 'textarea',
					name : 'parameterDesc',
					width : '100%',
					fieldLabel : '申请用途'
				},
				{
					xtype : 'hidden',
					name : 'parameterId'
				} ]
			} ]

		} ]

	});

}
function publishRd(msg, status)
{

	Ext.MessageBox.confirm("提示", msg, function(btnId)
	{
		if (btnId == 'yes')
		{
			var grid = Ext.getCmp("rdGrid");
			var list = getGridList(grid, "resourceId");
			if(list.length==0)
			{
				Ext.Msg.alert('错误提示', "请选择一条数据");
				return;
			}
			var resourceIds = list.join(",");

			var url = getHandlerRequestUrl()
					+ "resourceCatalogueInfoHandler/updaeRdStatus?resourceIds="
					+ resourceIds + "&status=" + status;
			submitToServer(url, "加入路由管理器失败", function()
			{
				grid.store.reload();
				// var toolbar = grid.getTopToolbar();
				// for ( var i = 0; i < 5; i++)
				// {
				// toolbar.getComponent(i).disable();
				// }
			});
		}
	});
}
function showDetailWin()
{
	if (!isAlone('rdGrid'))
	{
		return false;
	}
	var win = new Ext.Window(
	{
		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		width : 620,
		height : 450,
		shadow : true,
		title : '资源目录详情',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				win.close();
			}
		} ],
		items : [ createResourceTabPanel() ]
	});
	win.show();
}
function createResourceTabPanel()
{
	return new Ext.TabPanel(
	{
		activeTab : 0, // 设置默认选择的选项卡
		items : [
		{
			title : '资产详情',
			items : [ createDetailForm() ]
		},
		{
			title : '资源组成',
			items : [ createMetaGrid() ]
		},
		{
			title : '文件列表',
			items : [ FileListGrid() ]
		},
		{
			title : 'Web服务列表',
			items : [ createWebServiceGrid() ]
		},
		{
			title : '更新信息',
			items : [ updateInfo() ]
		} ]
	});
}
function createDetailForm()
{
	var FORM_WIDTH = 200;
	var form = new Ext.FormPanel(
	{
		labelAlign : 'right',
		labelSeparator : "：",
		frame : true,
		border : false,
		height : 430,
		reader : new Ext.data.JsonReader(
		{
			successProperty : 'success',
		}, [
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
			name : 'typeName',
			mapping : function(data)
			{
				return jsonConvert(data, "dictArchCateInfo", "typNm");
			}
		},
		{
			name : 'createDate',
			mapping : function(data)
			{
				if (data.createDate)
				{
					return formatDate(data.createDate, "");
				}
				return "-";
			}
		},
		{
			name : 'pubDate',
			mapping : function(data)
			{
				if (data.pubDate)
				{
					return formatDate(data.pubDate, "");
				}
				return "-";

			}
		},
		{
			name : 'publicLv',
			mapping : function(data)
			{
				return jsonConvert(data, "publicLv", "publicLvName");
			}
		},
		{
			name : 'secrLv',
			mapping : function(data)
			{
				return jsonConvert(data, "secrLv", "secrTypeName");
			}
		},
		{
			name : 'serverObject'
		},
		{
			name : 'updateRate'
		},
		{
			name : 'finalUpdateDate'
		},
		{
			name : 'keyword'
		},
		{
			name : 'resAbstract'
		},
		{
			name : 'remark'
		} ]),
		items : [
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'resourceName',
					fieldLabel : '资产名称'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'provider',
					fieldLabel : '提供方'
				} ]
			} ]
		},
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'pubDate',
					fieldLabel : '发布日期'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'createDate',
					fieldLabel : '创建日期'
				} ]
			} ]
		},
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'publicLv',
					fieldLabel : '共享级别'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'secrLv',
					fieldLabel : '保密级别'
				} ]
			} ]
		},
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'typeName',
					fieldLabel : '架构类别'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'keyword',
					fieldLabel : '关键字'
				} ]
			} ]
		},
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .99,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textarea',
					width : '95%',
					name : 'resAbstract',
					fieldLabel : '摘要'
				},
				{
					xtype : "hidden",
					name : "updateRate",
					id : "updateRate"
				},
				{
					xtype : "hidden",
					name : "finalUpdateDate",
					id : "finalUpdateDate"
				} ]
			} ]
		},
		{
			layout : 'column',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				columnWidth : .99,
				layout : 'form',
				labelWidth : 60,
				items : [
				{
					xtype : 'textarea',
					width : '95%',
					name : 'remark',
					fieldLabel : '备注'
				} ]
			} ]
		} ]

	});
	var grid = Ext.getCmp("rdGrid");
	var record = grid.getSelectionModel().getSelected();
	var resourceId = record.get("resourceId");
	var url = getHandlerRequestUrl()
			+ "resourceCatalogueInfoHandler/getResourceDetail?resourceId="
			+ resourceId
	// loadForm(form, url, "获取资源目录详情异常");
	form.getForm().load(
	{
		url : url,
		method : 'POST'
	});
	return form;
}
function showMetaInfoWin()
{
}
/**
 * 创建元数据表格
 */
function createMetaGrid()
{
	var grid = Ext.getCmp("rdGrid");
	var record = grid.getSelectionModel().getSelected();
	var resourceId = record.get("resourceId");
	var sm = new Ext.grid.CheckboxSelectionModel();
	var columns = [
			sm,
			new Ext.grid.RowNumberer(),
			{
				dataIndex : 'metaInfoId',
				hidden : true
			},
			{
				dataIndex : 'fieldName',
				header : "名称",
				sortable : true,
				width : 80
			},
			{
				dataIndex : 'pyName',
				header : "标示符",
				sortable : true,
				width : 60
			},
			{
				dataIndex : 'dataType',
				header : "数据类型",
				width : 60
			},
			{
				dataIndex : 'dataLength',
				header : "字段长度",
				width : 60
			},
			{
				dataIndex : 'status',
				header : "状态",
				width : 40,
				renderer : function(value)
				{
					if (value)
					{
						if (value == 0)
						{
							return "<font color='red'>已禁用</font>";
						}
					}
					return "<font color='green'>已启用</font>";
				}
			},
			{
				dataIndex : 'status',
				header : "操作",
				width : 40,
				align : 'center',
				renderer : function(value)
				{
					if (value)
					{
						if (value == 0)
						{
							return "<span style='color:blue;font-weight:bold;cursor:pointer;' onclick='updateStatus(1);'>启用</span>";
						}
					}
					return "<span style='color:blue;font-weight:bold;cursor:pointer;' onclick='updateStatus(0);'>禁用</span>";
				}
			} ];
	var gridStore = new Ext.data.Store(
	{
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
			name : 'fieldName',
			mapping : function(data)
			{
				return jsonConvert(data, "field", "fieldName");
			}
		},
		{
			name : 'pyName',
			mapping : function(data)
			{
				return jsonConvert(data, "field", "pyName");
			}
		},
		{
			name : 'dataType',
			mapping : function(data)
			{
				return jsonConvert(data, "field", "dataType");
			}
		},
		{
			name : 'dataLength'
		},
		{
			name : 'status'
		},
		{
			name : 'metaInfoId'
		},
		{
			name : 'dictArchCateInfo',
			mapping : function(data)
			{
				return jsonConvert(data, "resource", "dictArchCateInfo");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "metaInfoHandler/getMetaInfoByResourceId?resourceId="
					+ resourceId
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		loadMask : true,
		height : 400,
		id : 'event_myGrid1',
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
		tbar : [
		{
			text : "全部禁用",
			iconCls : 'icon_stop',
			handler : function()
			{
				updateAllStopOrStart(0);
			}
		},
		{
			text : "全部启用",
			iconCls : 'icon_start',
			handler : function()
			{
				updateAllStopOrStart(1);
			}
		} ],
		listeners :
		{
			render : function()
			{
				this.getStore().load(
				{
					params :
					{
						start : 0,
						limit : pageSize
					}
				})
			}
		},
		viewConfig :
		{
			forceFit : true
		}
	});
}
function FileListGrid()
{
	var grid = Ext.getCmp("rdGrid");
	var record = grid.getSelectionModel().getSelected();
	var resourceId = record.get("resourceId");
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			rowselect : function()
			{
				Ext.getCmp("f_f_grid").getTopToolbar().get(0).enable();
			},
			rowdeselect : function()
			{
				Ext.getCmp("f_f_grid").getTopToolbar().get(0).disable();
			}
		},
		singleSelect : true
	});
	var columns = [ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'routeId',
		hidden : true
	},
	{
		dataIndex : 'fileName',
		header : "名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'fileSizef',
		header : "大小",
		sortable : true,
		width : 40
	},
	{
		dataIndex : 'showURL',
		header : "下载地址",
		sortable : true,
		width : 160
	},
	{
		dataIndex : 'routeStatus',
		header : "状态",
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
				successProperty : 'success',
				listeners :
				{
					exception : function(dataProxy, type, action, options,
							response, arg)
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
					name : 'routeId'
				},
				{
					name : 'fileSizef'
				},
				{
					name : 'routeStatus'
				},
				{
					name : 'fileName'
				},
				{
					name : 'showURL'
				},
				{
					name : 'publishDate'
				} ])),
				proxy : new Ext.data.HttpProxy(
						{
							url : getHandlerRequestUrl()
									+ "serviceInfoHandler/getFileServiceByResourceId?resourceId="
									+ resourceId
						})
			});
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(
	{
		text : '移除',
		iconCls : 'icon_delete',
		disabled : true,
		handler : function()
		{
			deleteIntoService(Ext.getCmp("f_f_grid"));
		}
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		tbar : toolbar,
		width : '100%',
		loadMask : true,
		buttonAlign : 'center',
		height : 400,
		monitorResize : true,
		store : gridStore,
		id : 'f_f_grid',
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		bbar : [],
		listeners :
		{
			render : function()
			{
				this.getStore().load(
				{
					params :
					{
						start : 0,
						limit : pageSize
					}
				})
			}
		},
		viewConfig :
		{
			forceFit : true
		}
	});
}
function updateInfo()
{
	return new Ext.Panel(
			{
				layout : 'column',
				listeners :
				{
					render : function()
					{
						Ext.getCmp("updateRateCombo").setValue(Ext.getCmp("updateRate").getValue());
						var longDate=Ext.getCmp("finalUpdateDate").getValue();
						Ext.getCmp("finalUpdateDateI").setValue(longDate);
						
					}
				},
				bodyStyle : "padding:10px;margin-left:10px;",
				items : [
						{
							xtype : 'label',
							frame : true,
							text : '更新频率:'
						},
						{
							xtype : 'combo',
							width : 200,
							mode : 'local',
							id : "updateRateCombo",
							editable : false,
							store : new Ext.data.SimpleStore(
							{
								fields : [ 'key', 'value' ],
								data : [ [ '实时', '0' ], [ '日', '1' ],
										[ '半月', '2' ], [ '月', '3' ],
										[ '季', '4' ], [ '半季', '5' ],
										[ '年', '6' ], [ '半年', '7' ] ]
							}),
							triggerAction : 'all',
							displayField : 'key',
							valueField : 'value',
							forceSelection : true,
							resizable : true,
							typeAhead : true,
							emptyText : "请选择",
							handleHeight : 10
						},
						{
							xtype : 'label',
							text : ""
						},
						{
							xtype : 'label',
							frame : true,
							text : '最后更新时间:'
						},
						{
							xtype : 'datetimefield',
							id : "finalUpdateDateI",
							editable :true,
							width : 200,
							format : 'Y-m-d H:i:s'
						},
						{
							xtype : "button",
							frame : true,
							text : "保存",
							handler : function()
							{
								var grid = Ext.getCmp("rdGrid")
								var record = grid.getSelectionModel().getSelected();
								var finalUpdateDate=Ext.util.Format.date(Ext.getCmp("finalUpdateDateI").getValue(), 'Y-m-d H:i:s');
								var resourceId = record.get("resourceId");
								var url = getHandlerRequestUrl()
										+ "resourceCatalogueInfoHandler/editRate?updateRate="
										+ Ext.getCmp("updateRateCombo")
												.getValue()
										+ "&finalUpdateDate="
										+ finalUpdateDate+"&resourceId="+resourceId;
								submitToServer(url, "修改频率信息失败", function()
								{
									Ext.Msg.alert('提示', "修改成功",function(){
										Ext.getCmp("rdGrid").getStore().reload();
									});
								});
							}
						} ]
			});
}
function createWebServiceGrid()
{
	var grid = Ext.getCmp("rdGrid")
	var record = grid.getSelectionModel().getSelected();
	var resourceId = record.get("resourceId");
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			rowselect : function()
			{
				Ext.getCmp("s_grid").getTopToolbar().get(0).enable();
			},
			rowdeselect : function()
			{
				Ext.getCmp("s_grid").getTopToolbar().get(0).disable();
			}
		},
		singleSelect : true
	});
	var columns = [ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'routeId',
		hidden : true
	},
	{
		dataIndex : 'routeName',
		header : "名称",
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
		header : "协议",
		width : 40
	},
	{
		dataIndex : 'routeStatus',
		header : "状态",
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
		header : "发布时间",
		renderer : formatDate,
		width : 80
	} ];
	var gridStore = new Ext.data.Store(
			{
				successProperty : 'success',
				listeners :
				{
					exception : function(dataProxy, type, action, options,
							response, arg)
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
					name : 'routeName'
				},
				{
					name : 'routeType'
				},
				{
					name : 'showURL'
				},
				{
					name : 'routeStatus'
				},
				{
					name : 'routeId'
				},
				{
					name : 'publishDate'
				} ])),
				proxy : new Ext.data.HttpProxy(
						{
							url : getHandlerRequestUrl()
									+ "serviceInfoHandler/getWebServiceByResourceId?resourceId="
									+ resourceId
						})
			});
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(
	{
		text : '移除',
		iconCls : 'icon_delete',
		disabled : true,
		handler : function()
		{
			deleteIntoService(Ext.getCmp("s_grid"));
		}
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		tbar : toolbar,
		width : '100%',
		height : 400,
		id : 's_grid',
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
		bbar : [],
		listeners :
		{
			render : function()
			{
				this.getStore().load(
				{
					params :
					{
						start : 0,
						limit : pageSize
					}
				});
			}
		},
		viewConfig :
		{
			forceFit : true
		}
	});
}
/**
 * 搜索资源目录
 */
function searchForAsset()
{
	var assetName = Ext.getCmp("assetName_search").getValue();
	var sm_flag = Ext.getCmp("sm_flag_search").getValue();
	var grid = Ext.getCmp("rdGrid");
	grid.store.reload(
	{
		params :
		{
			assetName : assetName,
			start : 0,
			orgId : thisNodeId,
			limit : pageSize,
			archCateId : cateCombo.getValue(),
			sm_flag : sm_flag
		}
	});
	grid.store.baseParams =
	{
		assetName : assetName,
		start : 0,
		orgId : thisNodeId,
		limit : pageSize,
		archCateId : cateCombo.getValue(),
		sm_flag : sm_flag
	};
}

/**
 * 删除资源目录下的服务
 */
function deleteIntoService(grid)
{
	var list = getGridList(grid, "routeId")
	if (list.length != 0)
	{
		var url = getHandlerRequestUrl()
				+ "resourceCatalogueInfoHandler/deleteServiceInfo?routeId="
				+ list[0];
		deleteData(url, "", function()
		{
			grid.getStore().reload();
		});
	}

}
/**
 * 启用或者禁用一列 资源组成 信息
 * 
 * @param value
 */
function updateStatus(value)
{
	var dataModel = Ext.getCmp('event_myGrid1').getSelectionModel();
	var count = dataModel.getSelections().length;
	// 如果不是选择一条，提醒他必须选择一条数据
	if (1 !== count)
	{
		Ext.Msg.alert('系统提示', '请选择一条记录');
		return false;
	}
	var str = value == 0 ? "禁用" : "启用";
	var updateValue = value == 0 ? 0 : 1;
	var data = dataModel.getSelected().data;
	Ext.MessageBox.confirm("提示", "你确定要" + str + "这条数据吗?", function(btnId)
	{
		if (btnId == 'yes')
		{
			var msgTip = Ext.MessageBox.show(
			{
				title : '提示',
				width : 249,
				msg : '正在处理...'
			});
			var url = getHandlerRequestUrl()
					+ "resourceCatalogueInfoHandler/updateStatus";
			Ext.Ajax.request(
			{
				url : url,
				method : 'POST',
				params :
				{
					'id' : data.metaInfoId,
					'tableName' : data.dictArchCateInfo.typCd,
					'value' : updateValue
				},
				success : function(response, options)
				{
					msgTip.hide();
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success)
					{
						Ext.getCmp('event_myGrid1').getStore().reload();
					} else
					{
						Ext.Msg.alert('提示', result.msg);
					}
				},
				failure : function(response, options)
				{
					msgTip.hide();
					Ext.Msg.alert('提示', "操作失败");
				}
			});
		}
	});
}
// 全部启用或者禁用资源组成
function updateAllStopOrStart(value)
{
	var dataModel = Ext.getCmp('event_myGrid1').getSelectionModel();
	var count = dataModel.getSelections().length;
	// 至少选择一条数据
	if (count < 1)
	{
		Ext.Msg.alert('系统提示', '尚未选择任何数据');
		return false;
	}
	var str = value == 0 ? "禁用" : "启用";
	var updateValue = value == 0 ? 0 : 1;
	var ids = "";
	var tableNames = "";
	for ( var i = 0; i < count; i++)
	{
		ids += dataModel.getSelections()[i].data.metaInfoId;
		tableNames += dataModel.getSelections()[i].data.dictArchCateInfo.typCd;
		if (i < count - 1)
		{
			ids += ",";
			tableNames += ",";
		}
	}
	Ext.MessageBox.confirm("提示", "你确定要" + str + "这些数据吗?", function(btnId)
	{
		if (btnId == 'yes')
		{
			var msgTip = Ext.MessageBox.show(
			{
				title : '提示',
				width : 249,
				msg : '正在处理...'
			});
			var url = getHandlerRequestUrl()
					+ "resourceCatalogueInfoHandler/updateAllStopOrStart";
			Ext.Ajax.request(
			{
				url : url,
				method : 'POST',
				params :
				{
					'ids' : ids,
					'tableNames' : tableNames,
					'value' : updateValue
				},
				success : function(response, options)
				{
					msgTip.hide();
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success)
					{
						Ext.getCmp('event_myGrid1').getStore().reload();
					} else
					{
						Ext.Msg.alert('提示', result.msg);
					}
				},
				failure : function(response, options)
				{
					msgTip.hide();
					Ext.Msg.alert('提示', "操作失败");
				}
			});
		}
	});
}