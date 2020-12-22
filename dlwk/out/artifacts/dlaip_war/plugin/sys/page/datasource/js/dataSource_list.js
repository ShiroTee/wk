/**
 * 分组菜单列表
 */
//保存选中的Record主键列id列表
var recordIds = new Array();
//保存选中的Record对象
var recordObjs = new Array();
var pageSize = 20;
var queryForm;
var gridStore;
var grid;
var gridHeight;
var appGrid;
var appDataSourecePanel;
Ext.BLANK_IMAGE_URL = PROJECT_ROOT+'/resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	var toolbar = new Ext.Toolbar( {
		height : 30,
		id : Math.random() + ""
	});
	// 按钮数
	toolbar.addButton(new Ext.Button( {
		text : "添加",
		iconCls : 'icon_add',
		handler : addData
	}
	));
	toolbar.addButton(new Ext.Button( {
		text : "编辑",
		iconCls : 'icon_edit',
		handler : updateData
	}
	));
	toolbar.addButton(new Ext.Button( {
		text : "删除",
		iconCls : 'icon_delete',
		handler : delData
	}));
	toolbar.addButton(new Ext.Button( {
		text : "查看应用",
		iconCls : 'icon_lookup',
		handler : showApp
	}));
	toolbar.addButton(new Ext.Button( {
		text : "数据备份",
		iconCls : 'icon_lookup',
		handler:function()
		{
			Ext.Msg.alert('提示', "该功能建设中...");
		}
	}));
	// 选择模型 
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		listeners :
		{
			// 选中
			'rowselect' : function(sm, row, rec)
			{
				// 保存勾选中的Record的主键id值
				if (!recordIds.contains(rec.get("id")))
				{
					recordIds.push(rec.get("id"));
					recordObjs.push(rec);
				}
			},
			// 不选中
			'rowdeselect' : function(sm, row, rec)
			{
				if (recordIds.contains(rec.get("id")))
				{
					recordIds.remove(rec.get("id"));
					recordObjs.remove(rec);
				}
			}
		},
		singleSelect:true
	});
	gridStore = new Ext.data.Store( {
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},
		id : 'gridStore',
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options,
					response, arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			},
			'load' : function(store, record, options)
			{
				/**
				 * 每次store加载(load事件)完后,遍历store,比较每条Record的主键列id是否在recordIds中,
				 * 若存在则将Record保存到临时变量records中,最后调用selMod.selectRecords(records,
				 * true).
				 */
				var records = new Array();
				gridStore.each(function(record)
				{
					if (recordIds.contains(record.get('id')))
					{
						records.push(record);
					}
				});
				// 以后每次load数据时，都会默认选中
				sm.selectRecords(records, true);
		   }
		},
		reader : new Ext.data.JsonReader( {
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create( [ {
			name : 'id'
		}, {
			name : 'name'
		},{
			name : 'dataKey'
		},{
			name : 'type'
		},{
			name : 'dataBaseName'
		},{
			name : 'addDate'
		},{
			name : 'status'
		} ])),

		proxy : new Ext.data.HttpProxy( {
			url : REQUEST_URL_BASE+"/rdp/dataSourceInfoHandler/getDataSourceInfoForPageList"
		})
	});
    grid = new Ext.grid.GridPanel(
	{
		id : 'dataSoureceGrid',
		//columnWidth : .8,
		autoScroll : true,
		tbar : toolbar,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		region : 'center',
		store : gridStore,
		sm : sm,
		border : false, // 是否显示行的边框
		columns : [sm, new Ext.grid.RowNumberer(),
		{
			header : "ID",
			dataIndex : 'id',
			hidden : true,
			sortable : true
		},
		{
			header : "数据源名称",
			dataIndex : 'name',
			sortable : true
		},
		{
			header : "数据源标识",
			dataIndex : 'dataKey',
			sortable : true
		},
		{
			header : "数据库类型",
			dataIndex : 'type',
			sortable : true
		},
		{
			header : "数据库名称",
			dataIndex : 'dataBaseName',
			sortable : true
		},
		{
			header : "添加时间",
			dataIndex : 'addDate',
			sortable : true,
			renderer:formatDate
		},
		{
			header : "状态",
			dataIndex : 'status',
			sortable : true,
			renderer:formatStatus
		} ],
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
    

	var appToolbar = new Ext.Toolbar( {
		height : 30,
		id : Math.random() + ""
	});
	// 按钮数
	appToolbar.addButton(new Ext.Button( {
		text : "返回",
		iconCls : 'icon_back',
		handler : backData
	}
	));
	var appGridStore = new Ext.data.Store( {
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},
		id : 'appGridStore',
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options,
					response, arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		reader : new Ext.data.JsonReader( {
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create( [ {
			name : 'dataKey'
		},{
			name : 'appCode'
		},{
			name : 'appName'
		} ])),

		proxy : new Ext.data.HttpProxy( {
			url : REQUEST_URL_BASE+"/rdp/dataSourceInfoHandler/getDataSourceAppInfo"
		})
	});
	appGrid = new Ext.grid.GridPanel(
			{
				id : 'appGrid',
				//columnWidth : .8,
				autoScroll : true,
				tbar : appToolbar,
				loadMask : true,
				buttonAlign : 'center',
				monitorResize : true,
				region : 'center',
				store : appGridStore,
				border : false, // 是否显示行的边框
				columns : [new Ext.grid.RowNumberer(),
				{
					header : "数据源标识",
					dataIndex : 'dataKey',
					sortable : true
				},
				{
					header : "应用代码",
					dataIndex : 'appCode',
					sortable : true
				},
				{
					header : "应用名称",
					dataIndex : 'appName',
					sortable : true
				}],
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
	appDataSourecePanel = new Ext.Panel({
		id : 'mainCard',
		layout : 'card',
		activeItem : 0,
		autoWidth : true,
		titleCollapse : true,
		autoHeight : true,
		items : [grid, appGrid]
	});
    
  	var queryFormItems = createSearchFormPanel();
	queryForm = setQueryForm("dataSourceQueryForm", queryFormItems, queryFunc);
	var formButton = [
	{
		text : '查询',
		iconCls : 'icon_query',
		handler : function()
		{
			queryFunc();
		}
	},
	{
		text : '重置',
		iconCls : 'icon_reset',
		handler : function()
		{
			queryForm.getForm().reset();
		}
	} ];
	queryForm.addButton(formButton);
	setTip("数据源信息模块。可以添加、编辑、删除数据源信息，查看使用相应数据源的应用。也可以通过数据源名称、应用代码和应用名称来搜索相应的数据源信息。");
	setPaging(grid);
	setMainPanel("dataSourceGrid_div", appDataSourecePanel);
	//panel.doLayout();
}


//查询功能
function queryFunc()
{
	gridStore.baseParams = queryForm.getForm().getValues();
	Ext.apply(gridStore.baseParams,
	{
		start : 0,
		limit : pageSize
//		appId : appId,
//		name : name,
//		appCode :appCode
	});
	gridStore.load(
	{
		params : gridStore.baseParams
	});
	appDataSourecePanel.layout.setActiveItem(0);
}

//添加分组数据
function addData() {
	var dataSoureceInfoWin = new Ext.Window(
	{
		layout : 'fit',
		id : 'dataSoureceInfoWin',
		closeAction : 'close',
		resizable : false,
		width : 500,
		height :460,
		shadow : true,
		title : '添加数据源信息',
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		animCollapse : true,
		items:[createAddDataForm()]
	});
	dataSoureceInfoWin.show();
}

function updateData() {
	var records = recordObjs; // 针对所有选中数据,包括分页的
	if (records.length == 0)
	{
		Ext.Msg.alert('提示信息','请选择数据!');
		return;
	} else if(records.length > 1){
		Ext.Msg.alert('提示信息','请选择一行数据!');
		return;
	} else {
		var updateGroupInfoWin = new Ext.Window(
		{
			layout : 'fit',
			id : 'updateDataSourceInfoWin',
			closeAction : 'close',
			resizable : false,
			width : 500,
			height :460,
			shadow : true,
			title : '修改数据源信息',
			modal : true,
			closable : true,
			bodyStyle : 'padding:5 5 5 5',
			animCollapse : true,
			items:[createAddDataForm()]
		});
		var rec = records[0];
		var id = rec.get('id');
		var url = REQUEST_URL_BASE+"rdp/dataSourceInfoHandler/getDataSourceInfo?dataId="+id;
		updateGroupInfoWin.show();
		var form = Ext.getCmp("dataSoureceInfoForm");
		loadForm(form,url,"获取数据源信息异常");
		Ext.getCmp("formDataId").setValue(id);
	}
}
function delData(){
	var records = recordObjs; // 针对所有选中数据,包括分页的
	if (records.length == 0)
	{
		Ext.Msg.alert('提示信息','请选择数据!');
		return;
	} else {
		var recordIdArr = [];
		for ( var i = 0; i < records.length; i++)
		{
			var rec = records[i];
			recordIdArr.push(rec.get('id'));
		}
		if (recordIdArr.length != 0)
		{
			Ext.Msg.confirm("提示", "确定要执行删除吗？", function(btn, text)
			{
				if (btn == "yes")
				{
					Ext.Ajax.request(
					{
						// 发送请求
						url : REQUEST_URL_BASE+"rdp/dataSourceInfoHandler/deleteDataSourceInfo",
						method : 'POST',
						params :
						{
							jsonData : Ext.util.JSON.encode(recordIdArr)
						},
						success : function(response, opts)
						{
							recordIds = [];
							recordObjs = [];
							var grid = Ext.getCmp("dataSoureceGrid");
							
							grid.store.load((
							{
								params :
								{
									start : 0,
									limit : 20
								}

							}));
						},
						failure : function(response, opts)
						{
							Ext.MessageBox.show(
							{
								title : '错误',
								msg : '删除失败!请联系管理员',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
						}
					});
				}
			});
		} 
	}
	
}


function createAddDataForm()
{
	var dataSoureceInfoForm = new Ext.FormPanel(
			{
				labelSeparator : "：",
				frame : false,
				id : "dataSoureceInfoForm",
				border : false,
				//autoHeight : true,
				labelAlign : 'right',
				buttonAlign : 'center',
				items : [
						{
						    xtype : 'textfield',
							hidden : true,
							hideLabel : true,
							name : "formDataId",
							id : "formDataId"
						},	
						{
							xtype : 'textfield',
							width : 330,
							allowBlank : false,
							blankText : '数据源名称',
							name : 'name',
							height : 40,
							fieldLabel : '数据源名称'
						},
						{
							xtype : 'textfield',
							width : 330,
							allowBlank : false,
							blankText : '数据源标识',
							name : 'dataKey',
							height : 40,
							fieldLabel : '数据源标识'
						},
						{
							xtype : 'textfield',
							width : 330,
							allowBlank : false,
							blankText : 'IP',
							name : 'url',
							height : 40,
							fieldLabel : 'IP'
						},
						{
							xtype : 'textfield',
							width : 330,
							allowBlank : false,
							blankText : '端口号',
							name : 'port',
							height : 40,
							fieldLabel : '端口号'
						},
						{
							xtype : 'combo',
							fieldLabel : '数据库类型',
							width : 120,
							height : 100,
							allowBlank : false,
							blankText : '数据库类型',
							emptyText : '数据库类型',
							mode : 'local',
							hiddenName : 'type',
							store : new Ext.data.SimpleStore(
							{
								fields : [ 'name', 'id' ],
								data : [ [ 'ORACLE', 'ORACLE' ]]
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
							width : 330,
							allowBlank : false,
							blankText : '数据库用户',
							name : 'user',
							height : 40,
							fieldLabel : '数据库用户'
						},
						{
							xtype : 'textfield',
							inputType : 'password',
							width : 330,
							allowBlank : false,
							name : 'password',
							height : 40,
							fieldLabel : '数据库密码'
						},
						{
							xtype : 'textfield',
							width : 330,
							allowBlank : false,
							blankText : '数据库名称',
							name : 'dataBaseName',
							height : 40,
							fieldLabel : '数据库名称'
						},
						{
							xtype : 'combo',
							fieldLabel : '状态',
							width : 120,
							height : 100,
							allowBlank : false,
							blankText : '状态',
							emptyText : '状态',
							mode : 'local',
							hiddenName : 'status',
							store : new Ext.data.SimpleStore(
							{
								fields : [ 'name', 'id' ],
								data : [ [ '启用', 'Y' ],
										[ '停用', 'N' ]]
							}),
							triggerAction : 'all',
							displayField : 'name',// 定义要显示的字段
							valueField : 'id',// 定义值字段
							forceSelection : true,// 要求输入值必须在列表中存在
							resizable : true,// 允许改变下拉列表的大小
							typeAhead : true,// 允许自动选择匹配的剩余部分文本
							handleHeight : 10
						} ],
				buttons : [
						{
							text : '重置',
							iconCls : 'icon_reset',
							handler : function()
							{
								dataSoureceInfoForm.form.reset();
							}
						},
						{
							text : '保存',
							iconCls : 'icon_save',
							handler : function()
							{
								var msg = "数据源信息添加失败！";
								var submitUrl = REQUEST_URL_BASE+"rdp/dataSourceInfoHandler/addDataSourceInfo";
								var dataId = Ext.getCmp("formDataId").getValue();
								if(dataId.length>0)
								{
									msg = "数据源信息修改失败！";
									submitUrl = REQUEST_URL_BASE+"rdp/dataSourceInfoHandler/updateDataSourceInfo?dataId="+dataId;
									submitForm(dataSoureceInfoForm, submitUrl,msg, callbakUpdate);
								}else{
									submitForm(dataSoureceInfoForm, submitUrl,msg, callbak);
								}
							}
						} ]
			});
	return dataSoureceInfoForm;
}

function callbak()
{
	var win=Ext.getCmp("dataSoureceInfoWin");
	win.close();
	var grid = Ext.getCmp("dataSoureceGrid");
	recordIds = [];
	recordObjs = [];			
				grid.store.load((
				{
					params :
					{
						start : 0,
						limit : 20
						//node : pid
					}

				}));
}
function callbakUpdate()
{
	var win=Ext.getCmp("updateDataSourceInfoWin");
	win.close();
	var grid = Ext.getCmp("dataSoureceGrid");
	recordIds = [];
	recordObjs = [];		
				grid.store.load((
				{
					params :
					{
						start : 0,
						limit : 20
					}

				}));
}
//创建搜索面板
function createSearchFormPanel()
{
	var comboBoxStore = new Ext.data.JsonStore(
	{ // 填充的数据
		url : REQUEST_URL_BASE+"/rdp/dataSourceInfoHandler/getAppInfo",
		//root:'data',
		autoLoad : true,
		fields : new Ext.data.Record.create( [
		{
			name: 'appId',mapping:'id'
		}, 
		{    
			name: 'name',mapping:'name'
		} 
		                                      ])
	});
	var comboxAppName = new Ext.form.ComboBox(
	{
		store : comboBoxStore,
		id : "appNameComboBox",
		width : 150,
		valueField : "appId",
		displayField : "name",
		forceSelection : true,
		emptyText : '全部 ',
		editable : false,
		triggerAction : 'all',
		typeAhead : true,
		allowBlank : true,
		hiddenName : 'appId'
	});
	//comboxAppName.Items.Insert(0, "全部"); 
	var queryFormItems = [
	{
		layout : 'column',
		labelAlign : 'right',
		style : 'margin-left: 220px;',
		items : [
		{
			columnWidth : .1,
			items : [
			{
				fieldLabel : ' ',
				layout : 'column',
				html : ""
			} ]
		},
		{
			columnWidth : .3,
			layout : 'form',
			items : [
			{
				xtype : 'textfield',
				fieldLabel : '数据源名称',
				allowBlank : true,
				maxLength : 30,
				name : 'name',
				anchor : '100%'
			}]
		},
		{
			columnWidth : .3,
			layout : 'form',
			items : [
			{
				xtype : 'textfield',
				fieldLabel : '数据源标识',
				allowBlank : true,
				maxLength : 30,
				name : 'dataKey',
				anchor : '100%'
			}]
		}]
	} ];
	return queryFormItems;
}

function showApp() {
	var records = recordObjs; // 针对所有选中数据,包括分页的
	if (records.length == 0)
	{
		Ext.Msg.alert('提示信息','请选择数据!');
		return;
	} else if(records.length > 1){
		Ext.Msg.alert('提示信息','请选择一行数据!');
		return;
	} else {
		var rec = records[0];
		var dataKey = rec.get('dataKey');
		Ext.apply(appGrid.store.baseParams,
				{
					start : 0,
					limit : pageSize,
					dataKey :dataKey
				});
		appGrid.store.load(
				{
					params : appGrid.store.baseParams
				});
//		setPaging(appGrid);
//		gridHeight = grid.getHeight();
//		appGrid.setHeight(gridHeight);
		appDataSourecePanel.layout.setActiveItem(1);
		
	}
}

function backData() {
	//grid.setHeight(gridHeight);
	appDataSourecePanel.layout.setActiveItem(0);
}

function formatDate(value)
{
	
	var date=new Date(value);
	return date.format('Y-m-d H:i:s');                        
}
function formatStatus(value)
{
	if(value=="Y")
	{
		return "<font color='green'>启用</font>";
	}
	else
	{
		return "<font color='red'>禁用</font>";
	}
}