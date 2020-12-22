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
	var grid = createAppGrid();
	setTip("应用管理列表");
	setPaging(grid);
	setMainPanel("appGrid", grid);
	Ext.EventManager.onWindowResize(function()
	{
		grid.getView().refresh();
		grid.getTopToolbar().setWidth("100%");
	});
}
// 创建应用列表表格
function createAppGrid()
{
	var fields = [ 'appName', 'appCode',
	{
		name : 'name',
		mapping : 'appUser.name'
	}, "createDate", "appStatus", "appId", "appVersion", "isApproveApp" ];
	var toolbar = new Ext.Toolbar(
	{
		autoWidth : true
	});
	toolbar.addButton(new Ext.Button(
	{
		text : '创建应用',
		iconCls : 'icon_save',
		handler : createAppWin
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "编辑",
		iconCls : 'icon_edit',
		handler : onShowAppWin

	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "卸载应用",
		iconCls : 'icon_delete',

		handler : onDelAppInfo

	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "安装应用",
		iconCls : 'icon_start',
		id : "onInstallAppButton",
		disabled : true,
		handler : onInstallApp

	}));

	toolbar.addButton(new Ext.Button(
	{
		text : "更新应用",
		iconCls : 'icon_refresh',
		disabled : true

	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "管理用户",
		iconCls : 'icon_apply',
		handler : createAppForUserWin
	}));
	toolbar.addFill();
	var cb = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			rowselect : function()
			{
				var record = this.getSelected();
				var status = record.get("appStatus");
				// 未安装显示安装按钮启用
				if ("N" == status)
				{
					Ext.getCmp("onInstallAppButton").enable();
				}

				else if ("Y" == status)
				{
					Ext.getCmp("onInstallAppButton").disable();
				}
			},
			rowdeselect : function()
			{
				Ext.getCmp("onInstallAppButton").disable();
			}
		},
		singleSelect : true
	});
	var columnLabel = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(),
			cb,
			{
				header : "应用名称",
				dataIndex : 'appName',
				sortable : true
			},
			{
				header : "应用代码",
				dataIndex : 'appCode',
				sortable : true
			},
			{
				header : "创建人",
				dataIndex : 'name',
				sortable : true
			},
			{
				header : "是否为审批系统",
				dataIndex : 'isApproveApp',
				renderer : function(value)
				{
					if ("Y" == value)
					{
						return "是";
					}
					return "否";
				},
				sortable : true
			},
			{
				header : "创建时间",
				dataIndex : 'createDate',
				sortable : true,
				renderer : formatDate
			},
			{
				header : "当前版本",
				dataIndex : 'appVersion',
				sortable : true
			},
			{
				header : "状态",
				dataIndex : 'appStatus',
				sortable : true,
				renderer : formatStatus
			},

			{
				header : "ID",
				width : 80,
				dataIndex : 'appId',
				hidden : true
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
		url : getHandlerRequestUrl() + "appInfoHandler/getAppInfoPageList",
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel(
	{
		id : 'appGrid',
		autoScroll : true,
		width : '100%',
		tbar : toolbar,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		// title : '资源列表',
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
		bbar : [],
		viewConfig :
		{
			forceFit : true
		}
	});

	return grid;
}
function formatDate(value)
{

	var date = new Date(value);
	return date.format('Y-m-d');
}
function formatStatus(value)
{
	if (value == "Y")
	{
		return "<font color='green'>已安装</font>";
	} else
	{
		return "<font color='red'>未安装</font>";
	}
}
function onShowAppWin()
{
	var grid = Ext.getCmp("appGrid");
	var list = getGridList(grid, "appId");
	if (list.length != 1)
	{
		Ext.Msg.alert("提示", "每次只能对一条数据进行编辑");
		return;
	}
	var appId = list[0];
	var width = 280;
	var appForm = new Ext.form.FormPanel(
	{
		labelSeparator : "：",
		frame : true,
		border : false,
		id : 'edit_appForm_',
		bodyStyle : 'padding:15px 0px 0px 20px',
		labelAlign : 'right',
		items : [
		{
			xtype : 'textfield',
			name : 'appId',
			hidden : true
		},
		{
			xtype : 'textfield',
			name : "appName",
			width : width,
			allowBlank : false,
			fieldLabel : '应用名称'
		},
		{
			xtype : 'textfield',
			width : width,
			name : "appCode",
			fieldLabel : '应用代码',
			disabled : true
		},
		{
			xtype : 'radiogroup',

			fieldLabel : '应用类型',
			width : 280,
			columns : [ 140, 140 ],
			vertical : true,
			listeners :
			{
				'change' : function()
				{
					var obj = this.items.items;
					for ( var i in obj)
					{
						if (obj[i].checked && obj[i].inputValue == 1)
						{
							Ext.getCmp("inputURL").enable();
							break;
						}
						if (obj[i].checked && obj[i].inputValue == 0)
						{

							Ext.getCmp("inputURL").disable();
							break;
						}

					}
				}
			},
			items : [
			{
				boxLabel : '本地应用',
				name : 'appType',
				inputValue : '0',
				checked : true
			},
			{
				boxLabel : '第三方应用',
				name : 'appType',
				inputValue : '1'
			}

			]
		},
		{
			xtype : 'radiogroup',
			fieldLabel : '是否是审批系统',
			width : 280,
			columns : [ 140, 140 ],
			vertical : true,
			items : [
			{
				boxLabel : '是',
				name : 'isApproveApp',
				inputValue : 'Y',
				checked : false
			},
			{
				boxLabel : '否',
				name : 'isApproveApp',
				inputValue : 'N',
				checked : true
			}

			]
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			emptyText : '请输入可访问的URL',
			fieldLabel : 'URL',
			vtype : 'url',
			id : 'inputURL',
			width : width,
			name : 'linkUrl'
		},
		{
			xtype : 'textfield',
			fieldLabel : '创建人',
			id : 'createUser',
			width : width,
			disabled : true,
			name : 'createUser'
		},
		{
			xtype : 'textfield',
			width : width,
			name : "provider",
			fieldLabel : '应用提供商'
		},
		{
			xtype : 'textfield',
			width : width,
			name : "appVersion",
			fieldLabel : '版本号'
		}, createStatusItem() ]
	});
	new Ext.Window(
			{

				layout : 'fit',
				closeAction : 'close',
				resizable : false,
				id : 'updateAppInfoWin',
				width : 500,
				height : 400,
				bodyStyle : 'padding:5 5 5 5',
				shadow : true,
				title : '应用编辑',
				modal : true,
				closable : true,
				animCollapse : true,
				buttonAlign : 'center',
				items : [ appForm ],
				buttons : [
						{
							text : '关闭',
							iconCls : 'icon_close',
							handler : function()
							{
								Ext.getCmp("updateAppInfoWin").close();
							}
						},
						{
							text : '保存',
							iconCls : 'icon_save',
							handler : function()
							{

								var submitUrl = getHandlerRequestUrl()
										+ "appInfoHandler/editAppInfo";
								submitForm(appForm, submitUrl, "应用修改失败",
										updateCallbak);
							}
						} /*
							 * , { text : '重置', id:'_reset', iconCls :
							 * 'icon_reset', handler : function() {
							 * Ext.getCmp("appForm").form.reset(); } }
							 */]
			});

	function updateCallbak()
	{
		Ext.getCmp("updateAppInfoWin").close();
		Ext.getCmp("appGrid").store.load((
		{
			params :
			{
				start : 0,
				limit : 20
			}
		}));
	}

	var url = getHandlerRequestUrl() + "appInfoHandler/getAppInfo?appId="
			+ appId;
	appForm.form.load(
	{
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action)
		{
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.getCmp("createUser").setValue(result.data.appUser.name);
			if (result.data.appType == 0)
			{
				Ext.getCmp("inputURL").disable();
			}

		},
		failure : function(form, action)
		{// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', "获取应用基本信息异常");
		}
	});
	Ext.getCmp("updateAppInfoWin").show();

}
function onDelAppInfo()
{

	var grid = Ext.getCmp("appGrid");
	var list = getGridList(grid, "appId");
	if (list.length != 1)
	{
		Ext.Msg.alert("提示", "每次只能对一条数据进行操作");
		return;
	}
	var appId = list[0];
	var url = getHandlerRequestUrl() + "appInfoHandler/uninstall?appId="
			+ appId;
	deleteData(url, "卸载应用失败", function()
	{
		Ext.Msg.alert("提示", "卸载应用成功", function()
		{
			Ext.getCmp("appGrid").store.load((
			{
				params :
				{
					start : 0,
					limit : 20
				}
			}));
		});

	});
}
function onInstallApp()
{
	// installApp
	var grid = Ext.getCmp("appGrid");
	var list = getGridList(grid, "appId");
	if (list.length != 1)
	{
		Ext.Msg.alert("提示", "每次只能对一条数据进行编辑");
		return;
	}
	var appId = list[0];

	var url = getHandlerRequestUrl() + "appInfoHandler/installApp?appId="
			+ appId;
	Ext.MessageBox.confirm("提示", "你确定要安装应用？", function(btnId)
	{

		if (btnId == 'yes')
		{
			var msgTip = Ext.MessageBox.show(
			{
				title : '提示',
				width : 250,
				msg : '正在安装应用请稍后......'
			});
			Ext.Ajax.request(
			{
				url : url,
				method : 'POST',
				success : function(response, options)
				{
					msgTip.hide();
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success)
					{
						Ext.Msg.alert('提示', "应用安装成功", function()
						{
							// document.location.href=PROJECT_ROOT+"/app-install/rdp/page/desktop.jsp";
							parent.location.reload();
						});
					} else
					{
						Ext.Msg.alert('提示', "安装应用异常，异常信息：" + result.msg);
					}
				},
				failure : function(response, options)
				{
					var result = Ext.util.JSON.decode(response.responseText);
					msgTip.hide();
					Ext.Msg.alert('提示', message + "异常码：" + result.data);
				}
			});
		}

	});
}