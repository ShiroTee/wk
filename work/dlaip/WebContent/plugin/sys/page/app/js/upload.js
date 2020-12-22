var WIDTH = 300;
Ext.onReady(function()
		{
			Ext.EventManager.onWindowResize(function()
			{
				var form = Ext.getCmp("fpFileUpload");
				form.syncSize();
			});
			var fpFileUpload = new Ext.Panel(
					{
						id : 'fpFileUpload',
						renderTo:document.body,
						frame :true,
						activeItem : 0,
						border : false,
						layout : 'card',
						autoHeight:true,
						buttonAlign : 'center',
						buttons : [
								'->',
								{
									id : 'movePrev',
									text : '上一步',
									hidden : true,
									handler : prevPanel
								},
								{
									text : '完成',
									id : 'moveSave',
									hidden : true,
									handler : function()
									{
										var cardId = fpFileUpload.layout.activeItem.id;
										//从系统中选择数据源
										if (cardId == "registerDataSourceGrid")
										{
											var grid = fpFileUpload.layout.activeItem;
											var list = getGridList(grid, "id");
											if (list.length == 0)
											{
												Ext.Msg
														.alert("提示",
																"至少选择一个数据源");
												return;
											}
											var ids = list.join("_");
											var radios = document
													.getElementsByName("radioname");
											var radioValue = "";
											for ( var i = 0; i < radios.length; i++)
											{
												if (radios[i].checked == true)
												{
													radioValue = radios[i].value;
													break;
												}
											}
											if (radioValue == "")
											{
												Ext.Msg.alert("提示",
														"至少选择一个默认数据源");
												return;
											}
											var appCode = Ext.getCmp(
													"appCodeText").getValue();
											var msgTip = Ext.MessageBox.show(
											{
												title : '提示',
												width : 250,
												msg : '正在提交数据......'
											});
											Ext.Ajax
													.request(
													{
														url : REQUEST_URL_BASE
																+ "rdp/appInstallHandler/addAppToDataSource?ids="
																+ ids
																+ "&isDefault="
																+ radioValue
																+ "&appCode="
																+ appCode,
														method : 'POST',
														success : function(
																response,
																options)
														{
															msgTip.hide();
															var result = Ext.util.JSON
																	.decode(response.responseText);
															if (result.success)
															{
																Ext.Msg
																		.alert(
																				"提示",
																				"数据源注册成功");
															} else
															{
																Ext.Msg
																		.alert(
																				'提示',"数据源注册异常："+ result.msg);
															}
														},
														failure : function(
																response,
																options)
														{
															var result = Ext.util.JSON
																	.decode(response.responseText);
															msgTip.hide();
															Ext.Msg
																	.alert(
																			'提示',
																			message
																					+ "异常码："
																					+ result.data);
														}
													});

										} else
										{
											var dataFormPanel = Ext
													.getCmp("addDataForm");
											var appCode = Ext.getCmp(
													"dataSourceAppCodeText")
													.getValue();
											url = "registerDataSource?appCode="
													+ appCode + "&dbName="
													+ appCode;
											submitForm(dataFormPanel, url,
													"数据源注册失败", function()
													{
														Ex.Msg.alert("提示",
																"注册成功")
													})
										}

									}
								},
								{
									id : 'moveNext',
									text : '下一步',
									handler : nextPanel
								} ],
						items : [addApp(), addData(), createDataSourceGrid()]
					});

		});

function prevPanel()
{
	var btnSave = Ext.getCmp("moveSave");
	btnSave.hide();
	var btnNext = Ext.getCmp("moveNext");
	btnNext.enable();
	var cardPanel = Ext.getCmp("fpFileUpload");
	var id = cardPanel.layout.activeItem.id;
	var panel = Ext.getCmp(id);
	var prevId = panel.prevId;
	var tempPanel = Ext.getCmp(prevId);
	prevId = tempPanel.prevId;
	if (prevId == null)
	{
		var btn = Ext.getCmp("movePrev");
		btn.disable();
	}
	setWindowTitle(tempPanel.labelName);
	cardPanel.layout.setActiveItem(tempPanel);
}

function setWindowTitle(title)
{
	var win = Ext.getCmp("addAppInfoForm");
	win.setTitle(title);
}

function nextPanel()
{
	var form = Ext.getCmp("addAppInfoForm");
	var appCode = Ext.getCmp("appCodeText").getValue();
	var value = Ext.getCmp("dataradiogroup").getRawValue();
	var value = Ext.getCmp("dataradiogroup").getValue().inputValue;
	var cardPanel = Ext.getCmp("fpFileUpload");
	var cardId = cardPanel.layout.activeItem.id;
	//应用注册面板
	if (cardId == "addAppInfoForm")
	{
		//提交表单
		submitForm(form, "uploadAppPackage", "应用注册失败", function()
		{

			var panel = Ext.getCmp(cardId);
			if (value == "Y")
			{
				panel.nextId = "registerDataSourceGrid";
			}
			var nextId = panel.nextId;
			var btnPrev = Ext.getCmp("movePrev");
			btnPrev.enable();
			var tempPanel = Ext.getCmp(nextId);
			nextId = tempPanel.nextId;
			if (nextId == null)
			{
				var btn = Ext.getCmp("moveNext");
				btn.disable();
				var btnSave = Ext.getCmp("moveSave");
				btnSave.show();
			} else
			{
				var movePrev = Ext.getCmp("movePrev");
				movePrev.show();
			}
			setWindowTitle(tempPanel.labelName);
			Ext.getCmp("dataBaseNameText").setValue(appCode);
			Ext.getCmp("dataSourceAppCodeText").setValue(appCode);
			cardPanel.layout.setActiveItem(tempPanel);
		});
	}

}
//创建数据源表格
function createDataSourceGrid()
{
	var fields = [ 'name', 'dataBaseName', "addDate", "status", "id" ];
	var cb = new Ext.grid.CheckboxSelectionModel();
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		header : '默认数据源',
		singleSelect : true
	});
	var columnLabel = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(),
			cb,
			{
				header : "数据源名称",
				dataIndex : 'name',
				sortable : true
			},
			{
				header : "数据库名称",
				dataIndex : 'dataBaseName',
				sortable : true
			},
			{
				header : "创建时间",
				dataIndex : 'addDate',
				sortable : true,
				renderer : formatDate
			},
			{
				header : "状态",
				dataIndex : 'status',
				sortable : true,
				renderer : formatStatus
			},
			{
				header : "默认数据源",
				dataIndex : 'id',
				sortable : true,
				renderer : rendererRadio
			},
			{
				header : "ID",
				width : 80,
				dataIndex : 'id',
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
		url : REQUEST_URL_BASE
				+ "rdp/dataSourceInfoHandler/getDataSourceInfoForPageList",
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel(
	{
		id : 'registerDataSourceGrid',
		height : 337,
		bodyStyle : 'padding:5px 0px 0px 0px',
		prevId : "addAppInfoForm",
		nextId : null,
		border : false,
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
			pageSize : pageSize,
			store : gridStore,
			displayInfo : true,
			displayMsg : '显示第{0}条数据到{1}条数据,一共有{2}条数据',
			emptyMsg : '没有记录'
		}),
		viewConfig :
		{
			autoFill : true
		}
	});

	return grid;
}
function submitData()
{
	var submitData = new Ext.form.FormPanel(
	{
		frame : true,
		prevId : "addDataForm",
		id : "submitData",
		nextId : null,
		labelName : "添加数据源信息",
		items : [
		{
			xtype : 'textfield',
			allowBlank : false,
			width : WIDTH,
			fieldLabel : '应用名称',
			name : 'appName'
		} ]
	});
	return submitData;
}

function addData()
{
	var addDataForm = new Ext.form.FormPanel(
	{
		frame : true,
		autoHeight : true,
		prevId : "addAppInfoForm",
		nextId : null,
		id : "addDataForm",
		labelName : "添加数据源信息",
		items : [
		{
			xtype : 'textfield',
			allowBlank : false,
			width : WIDTH,
			fieldLabel : '数据源名称',
			name : 'dataSourceName'
		},
		{
			xtype : 'textfield',
			allowBlank : false,
			width : WIDTH,
			fieldLabel : 'appCode',
			disabled : true,
			id : 'dataSourceAppCodeText',
			name : 'appCode'
		},
		{
			xtype : 'combo',
			fieldLabel : '数据库类型',
			width : WIDTH,
			height : 100,
			allowBlank : false,
			blankText : '请选择数据库类型',
			emptyText : '数据库类型',
			mode : 'local',
			hiddenName : 'dbType',
			store : new Ext.data.SimpleStore(
			{
				fields : [ 'name', 'id' ],
				data : [ [ 'ORACLE', 'ORACLE' ], [ 'MYSQL', 'MYSQL' ] ]
			}),
			triggerAction : 'all',
			displayField : 'name',// 定义要显示的字段
			valueField : 'id',// 定义值字段
			forceSelection : true,// 要求输入值必须在列表中存在
			resizable : true,// 允许改变下拉列表的大小
			typeAhead : true,// 允许自动选择匹配的剩余部分文本
			handleHeight : 10
		},
		{
			xtype : 'textfield',
			fieldLabel : '数据库名称',
			id : 'dataBaseNameText',
			width : WIDTH,
			disabled : true,
			name : 'dbName'
		},
		{
			xtype : 'textfield',
			fieldLabel : '数据库用户名',
			id : 'dbUserText',
			width : WIDTH,
			name : 'dbUser'
		},
		{
			xtype : 'textfield',
			fieldLabel : '数据库密码',
			id : 'dbPasswordText',
			width : WIDTH,
			name : 'dbPassword'
		} ]
	});
	return addDataForm;

}

function addApp()
{
	var shareData = new Ext.form.Radio(
	{
		boxLabel : '选择已有数据源',
		name : 'shareData',
		checked : true,
		inputValue : 'Y'
	});
	var createData = new Ext.form.Radio(
	{
		boxLabel : '创建数据源',
		name : 'shareData',
		inputValue : 'N'
	});
	var addAppInfoForm = new Ext.form.FormPanel(
	{
		frame : true,
//		autoHeight:true,
		height : 337,
		nextId : "addDataForm",
		prevId : null,
		id : "addAppInfoForm",
		bodyStyle : 'padding:30px 50px 50px 70px',
		border : false,
		labelName : "添加应用信息",
		fileUpload : true,
		items : [
		{
			xtype : 'textfield',
			allowBlank : false,
			width : WIDTH,
			style : "margin-top : 6px",
			fieldLabel : '应用名称',
			name : 'appName'
		},
		
		{
			xtype : 'textfield',
			allowBlank : false,
			width : WIDTH,
			id : 'appCodeText',
			style : "margin-top : 6px",
			fieldLabel : 'appCode',
			name : 'appCode'
		},
		

		{
			xtype : 'textfield',
			name : 'appProvider',
			style : "margin-top : 6px",
			width : WIDTH,
			fieldLabel : '应用提供商'
		},
		{
			xtype : 'textfield',
			style : "margin-top : 6px",
			name : 'appVersion',
			width : WIDTH,
			fieldLabel : '版本号'
		},
		{
			xtype : 'fileuploadfield',
			allowBlank : false,
			emptyText:'选择安装文件',
			fieldLabel : '选择文件',
			width : WIDTH,
			name : 'fileName'
		},
		
		{
			xtype : 'textarea',
			fieldLabel : '应用描述',
			style : "margin-top : 6px",
			width : WIDTH,
			name : 'appDesc'
		},
		{
			xtype : 'radiogroup',
			style : "margin-top : 6px",
			fieldLabel : '数据源创建方式',
			id : 'dataradiogroup',
			items : [ shareData, createData ]
		} ]
	});
	return addAppInfoForm;

}

function addItems()
{
	var items = [
	{
		xtype : 'textfield',
		allowBlank : false,
		width : WIDTH,
		fieldLabel : '应用名称',
		name : 'appName',
		disabled : true
	},
	{
		xtype : 'textfield',
		allowBlank : false,
		width : WIDTH,
		fieldLabel : 'APPCODE',
		name : 'appCode',
		disabled : true
	},
	{
		xtype : 'textfield',
		allowBlank : false,
		width : WIDTH,
		hidden : true,
		fieldLabel : 'APPCODE',
		name : 'appId',
		disabled : true
	},
	{
		xtype : 'textfield',
		allowBlank : false,
		width : WIDTH,
		hidden : true,
		fieldLabel : '默认管理员组名称',
		name : 'groupName'
	} ];
}
function formatDate(value)
{

	var date = new Date(value);
	return date.format('Y-m-d H:i:s');
}
function formatStatus(value)
{
	if (value == "Y")
	{
		return "<font color='green'>启用</font>";
	} else
	{
		return "<font color='red'>禁用</font>";
	}
}
function rendererRadio(value)
{
	return "<input type='radio' name='radioname' value='" + value + "'/>";
}