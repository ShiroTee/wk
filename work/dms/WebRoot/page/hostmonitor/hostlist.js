// 各种链接
var updateStatusUrl = 'updateMonitorStatus';
var updateUrl = 'updateHostInfo';
var addUrl="addHostInfo";
var detailUrl = 'skipHandler';
//添加cpu规则
var addCpuRuleUrl='getRamInfoCPUList';
//添加磁盘规则
var addDiscRuleUrl='getRamInfoDISCList';
//添加内存规则
var addRamRuleUrl='getRamInfoRAMList';
var anchorSohw='70%';
var addDiskUrl = 'getDiskList';
function load()
{
	Ext.onReady(init);
	var grid = new Ext.getCmp("monitorGridId");
	var toolbar = grid.getTopToolbar();
	toolbar.addButton(
	{
		text : '启动监控',
		id : 'btnStart',
		iconCls : 'icon_start',
		disabled : false,
		handler : function()
		{
			ssOperFun('Y');
		}
	});

	toolbar.addButton(
	{
		text : '暂停监控',
		id : 'btnStop',
		iconCls : 'icon_stop',
		disabled : false,
		handler : function()
		{
			ssOperFun('N');
		}
	});
	toolbar.addButton(
	{
		text : '添加',
		iconCls : 'icon_add',
		disabled : false,
		handler :function () {
			showAddWindow();
		}
	});
  toolbar.doLayout();
	var formItem = createQueryPanel();

	var formPanel = new Ext.getCmp("queryFormId");
	formPanel.add(formItem);
	formPanel.doLayout();
	var buttons = [
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
			formPanel.getForm().reset();
		}
	} ];
	var button = new Ext.Toolbar.Button(
	{
		text : '重置',
		iconCls : 'icon_reset',
		handler : function()
		{
			formPanel.getForm().reset();
		}
	});
	formPanel.addButton(buttons);
	formPanel.doLayout();

}
function ssOperFun(operator)
{
	var records = sm.getSelections(); // 针对所有选中数据,包括分页的
	if (records.length == 0)
	{
		alert('请选择数据!');
		return;
	} else
	{
		var jsonStr = [];

		for ( var i = 0; i < records.length; i++)
		{
			var rec = records[i];
			var status = rec.get('sTATUS');

			if (operator == 'Y')
			{
				if (status == 'N')
				{
					jsonStr.push(rec.get('iD'));
				}
			} else if (operator == 'N')
			{
				if (status == 'Y')
				{
					jsonStr.push(rec.get('iD'));
				}
			}
		}

		if (jsonStr.length != 0 && jsonStr != null)
		{
			Ext.Msg.confirm("提示", "确定要操作吗？", function(btn, text)
			{
				if (btn == "yes")
				{
					Ext.Ajax.request(
					{
						// 发送请求
						url : updateStatusUrl,
						method : 'POST',
						params :
						{
							jsonData : Ext.util.JSON.encode(jsonStr),
							qryState : operator
						},
						success : function(response, opts)
						{
							gridStore.reload();
						},
						failure : function(response, opts)
						{
							Ext.MessageBox.show(
							{
								title : '错误',
								msg : '更新信息失败，请重新尝试，或联系管理员。',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
						}
					});
				}
			});
		} else
		{
			var msg = '开启';
			if (operator == 'N')
			{
				msg = '暂停';
			}
			alert('主机已经全部' + msg + '监控，请勿重复操作！');
			return;
		}
	}
}

// 创建查询面板
function createQueryPanel()
{
	/** ****************** '主机类型'-->下拉列表 ********************************** */
	// 定义静态数据
	var sysTypeData = [ [ null, '全部' ], [ '1', 'Windows' ], [ '2', 'Linux' ] ];
	// 定义ComboBox 的数据源
	var sysTypeStore = new Ext.data.SimpleStore(
	{
		fields : [ 'text', 'value' ],
		data : sysTypeData
	});
	// 定义下拉框
	var sysTypeCombox = new Ext.form.ComboBox(
	{
		fieldLabel : '', // UI标签名称
		name : 'sysTypeCom', // 作为form提交时传送的参数名
		allowBlank : true, // 是否允许为空
		emptyText : '---请选择---', // 没有默认值时,显示的字符串
		typeAhead : true,
		triggerAction : 'all', // 显示所有下列数.必须指定为'all'
		forceSelection : true,
		editable : false,
		mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
		anchor : anchorSohw,
		store : sysTypeStore,
		value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
		valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
		displayField : 'value' // 下拉框显示内容
	});

	/** ****************** '网络状况'-->下拉列表 ********************************** */
	// 定义静态数据
	var netStatusData = [ [ null, '全部' ], [ 'Y', '正常' ], [ 'N', '异常' ] ];
	// 定义ComboBox 的数据源
	var netStatusStore = new Ext.data.SimpleStore(
	{
		fields : [ 'text', 'value' ],
		data : netStatusData
	});
	// 定义下拉框
	var netStatusCombox = new Ext.form.ComboBox(
	{
		fieldLabel : '', // UI标签名称
		name : 'netStatusCom', // 作为form提交时传送的参数名
		allowBlank : true, // 是否允许为空
		emptyText : '---请选择---', // 没有默认值时,显示的字符串
		typeAhead : true,
		triggerAction : 'all', // 显示所有下列数.必须指定为'all'
		forceSelection : true,
		editable : false,
		mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
		anchor : anchorSohw,
		store : netStatusStore,
		value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
		valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
		displayField : 'value' // 下拉框显示内容
	});
	// 查询条件
	var queryFormItems = [
	{
		layout : 'column',
		labelAlign : 'right',
		items : [
		{
			columnWidth : .3,
			layout : 'form',
			items : [
			{
				xtype : 'textfield',
				fieldLabel : '主机名称',
				allowBlank : true,
				maxLength : 30,
				name : 'name',
				anchor : anchorSohw
			} ]
		},
		{
			columnWidth : .3,
			layout : 'form',
			items : [
			{
				fieldLabel : '系统类型',
				layout : 'column',
				items : [
				{
					items : [ sysTypeCombox ]
				} ]
			} ]
		},
		{
			columnWidth : .3,
			layout : 'form',
			items : [
			{
				fieldLabel : '网络状况',
				layout : 'column',
				items : [
				{
					items : [ netStatusCombox ]
				} ]
			} ]
		} ]
	} ];
	return queryFormItems;
}
function queryFunc()
{
	gridStore.baseParams = queryForm.getForm().getValues();
	Ext.apply(gridStore.baseParams,
	{
		start : 0,
		limit : pageSize
	});
	gridStore.load(
	{
		params : gridStore.baseParams
	});
}
// 格式化'操作'
function renderOper(value, metadata, record, rowIndex, colIndex, store)
{
	var html = "<font color='blue'><a href=\"javascript:showEditWindow('"
			+ record + "');\">修改配置</a>&nbsp;|&nbsp;";
	var funMethod = "showDetailPage('" + value + "','" + record.get("tYPE")
			+ "')";
	html = html + "<a href=\"javascript:" + funMethod + ";\">详情</a>";

	return html;
}
// 格式化'网络状况'
function renderNetStatus(value, metadata, record, rowIndex, colIndex, store)
{
	if (value == "Y")
	{
		return "<img src='" + PROJECT_ROOT
				+ "images/GreenStatus.png' width='17',height='15' title='正常'>";
	} else if (value == "N")
	{
		return "<img src='" + PROJECT_ROOT
				+ "images/redstatus.png' width='17',height='15' title='异常'>";
	} else
	{
		return "<font color='yellow'>未知状态</font>";
	}
}
// 格式化'监控状况'
function renderMonitorStatus(value, metadata, record, rowIndex, colIndex, store)
{
	if (value == "Y")
	{
		return "<font color='green'>正在监控</font>";
	} else if (value == "N")
	{
		return "<font color='red'>停止监控</font>";
	} else
	{
		return "<font color='yellow'>未知状态</font>";
	}
}
// 格式化'主机状况'
function renderWarningStatus(value, metadata, record, rowIndex, colIndex, store)
{
	if (value == "Y")
	{
		return "<font color='red'>异常</font>";
	} else if (value == "N")
	{
		return "<font color='green'>正常</font>";
	} else
	{
		return "<font color='yellow'>未知状态</font>";
	}
}
function renderDbStatus(value, metadata, record, rowIndex, colIndex, store)
{
	if (value == "Y")
	{
		return "<font color='green'>正常</font>";
	} else if (value == "N")
	{
		return "<font color='red'>异常</font>";
	} else
	{
		return "<font color='yellow'>未知状态</font>";
	}
}
Ext.QuickTips.init();
	Ext.apply(Ext.QuickTips.getQuickTip(),{
		//maxWidth: 200,
		//minWidth: 100,
		//showDelay: 50,
		//trackMouse: true,
		//hideDelay: true,  
		//closable: true,
		//autoHide: false,
		//draggable: true,
		dismissDelay: 0
	});

// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
{
	var title = "";
	var tip = value;
	metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
	return value;
}
function showDetailPage(id,type)
{
	 window.location.href="/app/http/dms/hostInfoHandler/page"+'?id=' + id + encodeURI(encodeURI('&type=' + type));
	//window.location = detailUrl + '?id=' + id + encodeURI(encodeURI('&type=' + type));
}
function showEditWindow(record)
{
	// 弹出的面板
	var detailPanel = new Ext.form.FormPanel(
	{
		layout : 'form',
		frame : true,
		title : '',
		id : 'detailPanel',
		bodyStyle : 'padding:10px;border:0px',
		labelwidth : 60,
		labelAlign : 'right',
		autoScroll : true,
		defaults :
		{
			selectOnFocus : true, // 点击即选中
			width : 300,
			height : 30
		},
		items : [
		{
			fieldLabel : '隐藏的ID',
			name : 'iD',
			xtype : 'hidden'	
		},
		{
			fieldLabel : '名称',
			name : 'nAME',
			xtype : 'textfield',
			allowBlank : false,
			readOnly : false
		},
		{
			fieldLabel : '系统类型',
			id : 'tYPE',
			name : 'tYPE',
			xtype : 'combo',
			// 本地数据源 local/remote
			mode : 'local',
			// 设置为选项的text的字段
			displayField : "Name",
			// 设置为选项的value的字段
			valueField : "Id",
			// 是否可以输入，还是只能选择下拉框中的选项
			editable : false,
			typeAhead : true,
			value : 1,
			// 必须选择一项
			// forceSelection: true,
			// 输入部分选项内容匹配的时候显示所有的选项
			triggerAction : 'all',
			// selectOnFocus:true,
			// 数据
			store : new Ext.data.SimpleStore(
			{
				fields : ['Id', 'Name'],
				data : [[1, 'Windows'], [2, 'Linux']]
			}),
			listeners :
			{
				select : function(combo, record, index)
				{
					var type = combo.getValue();
					if (type != '')
					{
						showDataBaseInfo(type);
					}
				}
			}
		},
		{
			fieldLabel : '服务器IP',
			name : 'iPADDRESS',
			xtype : 'textfield',
			allowBlank : false,
			readOnly : false,
			regex : /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
			regexText : '只能输入IP地址'
		},
		{
			fieldLabel : '监控端口',
			name : 'hOSTPORT',
			allowBlank : false,
			xtype : 'numberfield',
			readOnly : false,
			maxValue : 65535, // 最大值
			minValue : 1
		},
		{
			fieldLabel : '监控频率',
			name : 'fREQUENCY',
			allowBlank : false,
			xtype : 'numberfield',
			readOnly : false
		},
			{
				xtype : 'combo',
				fieldLabel : 'CPU规则',
				id : "RATES",
				width : 300,
				allowBlank : true,
				blankText : 'CPU使用率',
				emptyText : 'CPU使用率',
				mode : 'local',
				hiddenName : 'vALUE',
				name: 'TEXT',
				store : new Ext.data.JsonStore(
					{
					url : addCpuRuleUrl,
					//root : 'data',
					fields : new Ext.data.Record.create( [
					'vALUE', 'tEXT' ])
					}),
				triggerAction : 'all',
				displayField : 'tEXT',// 定义要显示的字段
				valueField : 'vALUE',// 定义值字段
				forceSelection : true,// 要求输入值必须在列表中存在
				resizable : true,// 允许改变下拉列表的大小
				typeAhead : true,// 允许自动选择匹配的剩余部分文本
				handleHeight : 10
				},
				{
				xtype : 'combo',
				fieldLabel : '磁盘规则',
				id : "DISCS",
				width : 300,
				allowBlank : true,
				blankText : '磁盘剩余大小',
				emptyText : '磁盘剩余大小',
				mode : 'local',
				hiddenName : 'dISCID',
				name: 'DISC',
				listeners:{
					select : function(serviceInterfaceCombox, record, index){
					showDisc();
					}
				},
				store : new Ext.data.JsonStore(
					{
					url : addDiscRuleUrl,
					//root : 'data',
					fields : new Ext.data.Record.create( [
					'dISCID', 'dISC' ])
					}),
				triggerAction : 'all',
				displayField : 'dISC',// 定义要显示的字段
				valueField : 'dISCID',// 定义值字段
				forceSelection : true,// 要求输入值必须在列表中存在
				resizable : true,// 允许改变下拉列表的大小
				typeAhead : true,// 允许自动选择匹配的剩余部分文本
				handleHeight : 10
				},
				{
				xtype : 'combo',
				fieldLabel : '内存规则',
				id : "RAMS",
				width : 300,
				allowBlank : true,
				blankText : '内存使用率',
				emptyText : '内存使用率',
				mode : 'local',
				hiddenName : 'rAMID',
				name: 'RAM',
				store : new Ext.data.JsonStore(
					{
					url : addRamRuleUrl,
					//root : 'data',
					fields : new Ext.data.Record.create( [
					'rAMID', 'rAM' ])
					}),
				triggerAction : 'all',
				displayField : 'rAM',// 定义要显示的字段
				valueField : 'rAMID',// 定义值字段
				forceSelection : true,// 要求输入值必须在列表中存在
				resizable : true,// 允许改变下拉列表的大小
				typeAhead : true,// 允许自动选择匹配的剩余部分文本
				handleHeight : 10
				},
		{
			xtype : 'fieldset',
			fieldLabel : '数据库信息',
			title : '数据库信息',
			collapsible : true,
			autoHeight : true,
			checkboxToggle : true,
			defaults :
			{
				width : 200,
				height : 30
			},
			defaultType : 'textfield',
			labelAlign : 'left',
			labelWidth : 70,
			items : [
			{
				fieldLabel : '数据库名称',
				name : 'dATABASENAME',
				id : 'dATABASENAME',
				disabled : false,
				readOnly : false
			},
			{
				fieldLabel : '用户名',
				name : 'uSERNAME',
				xtype : 'textfield',
				readOnly : false
			},
			{
				fieldLabel : '密码',
				name : 'pASSWORD',
				inputType : 'password',
				xtype : 'textfield',
				readOnly : false
			},
			{
				fieldLabel : '数据库端口',
				id : 'dATABASEPORT',
				name : 'dATABASEPORT',
				xtype : 'numberfield',
				readOnly : false,
				maxValue : 65535, // 最大值
				minValue : 1
			}]
		}

		]
	});

	// 弹出的窗口
	var detailWindow = new Ext.Window(
	{
		layout : 'fit',
		width : 500,
		height :500,
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [detailPanel],
		buttons : [
		{
			text : '保存',
			iconCls : 'icon_save',
			handler : function()
			{
				submitForm(Ext.getCmp('detailPanel'),updateUrl, "信息有误！", function()
				{
					alert('更新成功！');
					detailWindow.close();
					gridStore.reload();
				});
			}
		},
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				detailWindow.close();
			}
		}]
	});
	
	function addDisc() {
			var combox =new Ext.form.ComboBox({
				fieldLabel : '请选择磁盘',
				id : "combox_1",
				width : 300,
				allowBlank : true,
				blankText : '磁盘',
				emptyText : '全部',
				mode : 'remote',
				hiddenName : 'daikName',
				name: 'daikName',
				store : new Ext.data.JsonStore(
					{
					url : addDiskUrl,
					//root : 'data',
					fields : new Ext.data.Record.create( [
					'diskid', 'daikName' ])
					}),
				triggerAction : 'all',
				displayField : 'daikName',// 定义要显示的字段
				valueField : 'diskid',// 定义值字段
				forceSelection : true,// 要求输入值必须在列表中存在
				resizable : true,// 允许改变下拉列表的大小
				typeAhead : true,// 允许自动选择匹配的剩余部分文本
				handleHeight : 10
		
			});
			var disclist = new Ext.Window(
			{
				layout : 'fit',
				id : 'disclist',
				closeAction : 'close',
				resizable : false,
				width : 400,
				height :100,
				shadow : true,
				title : '添加磁盘',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items:[combox],
					buttons : [
								{
							text : '清除',
							handler : function()
							{
								
							}
						},
						{
							text : '提交',
							handler : function()
							{
									
							}
					} ]
			});
			disclist.show();
		}
	function showDisc(){	
	var discid=Ext.getCmp('DISCS').getRawValue();
	if(discid.size!=0){
			addDisc();
		}
	}
	
	var combo = Ext.getCmp("RATES");
	combo.store.load(({}));
	
	var combo = Ext.getCmp("DISCS");
	combo.store.load(({}));
	
	var combo = Ext.getCmp("RAMS");
	combo.store.load(({}));
	
	detailWindow.show().center();
	var resultTable=Ext.getCmp("monitorGridId");
	var record = resultTable.getSelectionModel().getSelected();
	Ext.getCmp('detailPanel').getForm().loadRecord(record);
			Ext.getCmp('detailPanel').doLayout(true); // 重新调整版面布局
}
function showAddWindow(){
	// 弹出的面板
	var detailPanel = new Ext.form.FormPanel({
			layout : 'form',
			frame : true,
			title : '',
			id : 'detailAddPanel',
			bodyStyle : 'padding:10px;border:0px',
			labelwidth : 60,
			labelAlign : 'right',
			autoScroll : true,
			defaults :
				{
					selectOnFocus : true, // 点击即选中
					width : 300,
					height : 30
				},
			items : [
				{
					fieldLabel : '隐藏的ID',
					name : 'iD',
					xtype : 'hidden'
				},
				{
					fieldLabel : '名称',
					name : 'nAME',
					xtype : 'textfield',
					allowBlank : false,
					readOnly : false
				},
				{
					fieldLabel : '系统类型',
					id : 'tYPE',
					name : 'tYPE',
					xtype : 'combo',
					// 本地数据源 local/remote
					mode : 'local',
					// 设置为选项的text的字段
					displayField : "Name",
					// 设置为选项的value的字段
					valueField : "Id",
					// 是否可以输入，还是只能选择下拉框中的选项
					editable : false,
					typeAhead : true,
					value : 1,
					// 必须选择一项
					// forceSelection: true,
					// 输入部分选项内容匹配的时候显示所有的选项
					triggerAction : 'all',
					// selectOnFocus:true,
					// 数据
					store : new Ext.data.SimpleStore(
						{
							fields : ['Id', 'Name'],
							data : [[1, 'Windows'], [2, 'Linux']]
						}),
					listeners :
						{
							select : function(combo, record, index)
							{
								var type = combo.getValue();
								if (type != '')
								{
									//showDataBaseInfo(type);
								}
							}
						}
				},
				{
					fieldLabel : '服务器IP',
					name : 'iPADDRESS',
					xtype : 'textfield',
					allowBlank : false,
					readOnly : false,
					regex : /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
					regexText : '只能输入IP地址'
				},
				{
					fieldLabel : '监控端口',
					name : 'hOSTPORT',
					allowBlank : false,
					xtype : 'numberfield',
					readOnly : false,
					maxValue : 65535, // 最大值
					minValue : 1
				},
				{
					fieldLabel : '监控频率',
					name : 'fREQUENCY',
					allowBlank : false,
					xtype : 'numberfield',
					readOnly : false
				},
				{
					xtype : 'combo',
					fieldLabel : 'CPU规则',
					id : "RATES",
					width : 300,
					allowBlank : true,
					blankText : 'CPU使用率',
					emptyText : 'CPU使用率',
					mode : 'local',
					hiddenName : 'vALUE',
					name: 'TEXT',
					store : new Ext.data.JsonStore(
						{
							url : addCpuRuleUrl,
							//root : 'data',
							fields : new Ext.data.Record.create( [
								'vALUE', 'tEXT' ])
						}),
					triggerAction : 'all',
					displayField : 'tEXT',// 定义要显示的字段
					valueField : 'vALUE',// 定义值字段
					forceSelection : true,// 要求输入值必须在列表中存在
					resizable : true,// 允许改变下拉列表的大小
					typeAhead : true,// 允许自动选择匹配的剩余部分文本
					handleHeight : 10
				},
				{
					xtype : 'combo',
					fieldLabel : '磁盘规则',
					id : "DISCS",
					width : 300,
					allowBlank : true,
					blankText : '磁盘剩余大小',
					emptyText : '磁盘剩余大小',
					mode : 'local',
					hiddenName : 'dISCID',
					name: 'DISC',
					listeners:{
						select : function(serviceInterfaceCombox, record, index){
							showDisc();
						}
					},
					store : new Ext.data.JsonStore(
						{
							url : addDiscRuleUrl,
							//root : 'data',
							fields : new Ext.data.Record.create( [
								'dISCID', 'dISC' ])
						}),
					triggerAction : 'all',
					displayField : 'dISC',// 定义要显示的字段
					valueField : 'dISCID',// 定义值字段
					forceSelection : true,// 要求输入值必须在列表中存在
					resizable : true,// 允许改变下拉列表的大小
					typeAhead : true,// 允许自动选择匹配的剩余部分文本
					handleHeight : 10
				},
				{
					xtype : 'combo',
					fieldLabel : '内存规则',
					id : "RAMS",
					width : 300,
					allowBlank : true,
					blankText : '内存使用率',
					emptyText : '内存使用率',
					mode : 'local',
					hiddenName : 'rAMID',
					name: 'RAM',
					store : new Ext.data.JsonStore(
						{
							url : addRamRuleUrl,
							//root : 'data',
							fields : new Ext.data.Record.create( [
								'rAMID', 'rAM' ])
						}),
					triggerAction : 'all',
					displayField : 'rAM',// 定义要显示的字段
					valueField : 'rAMID',// 定义值字段
					forceSelection : true,// 要求输入值必须在列表中存在
					resizable : true,// 允许改变下拉列表的大小
					typeAhead : true,// 允许自动选择匹配的剩余部分文本
					handleHeight : 10
				},
				{
					xtype : 'fieldset',
					fieldLabel : '数据库信息',
					title : '数据库信息',
					collapsible : true,
					autoHeight : true,
					checkboxToggle : true,
					defaults :
						{
							width : 200,
							height : 30
						},
					defaultType : 'textfield',
					labelAlign : 'left',
					labelWidth : 70,
					items : [
						{
							fieldLabel : '数据库名称',
							name : 'dATABASENAME',
							id : 'dATABASENAME',
							disabled : false,
							readOnly : false
						},
						{
							fieldLabel : '用户名',
							name : 'uSERNAME',
							xtype : 'textfield',
							readOnly : false
						},
						{
							fieldLabel : '密码',
							name : 'pASSWORD',
							inputType : 'password',
							xtype : 'textfield',
							readOnly : false
						},
						{
							fieldLabel : '数据库端口',
							id : 'dATABASEPORT',
							name : 'dATABASEPORT',
							xtype : 'numberfield',
							readOnly : false,
							maxValue : 65535, // 最大值
							minValue : 1
						}]
				}

			]
		});

	// 弹出的窗口
	var detailAddWindow = new Ext.Window({
			layout : 'fit',
			width : 500,
			height :500,
			closeAction : 'close',
			plain : true,
			modal : true,
			resizable : true,
			buttonAlign : 'center',
			items : [detailPanel],
			buttons : [
				{
					text : '保存',
					iconCls : 'icon_save',
					handler : function()
					{
						submitForm(Ext.getCmp('detailAddPanel'),addUrl, "信息有误！", function()
						{
							alert('增加成功！');
							detailAddWindow.close();
							gridStore.reload();
						});
					}
				},
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						detailAddWindow.close();
					}
				}]
		});
	function addDisc() {
		var combox =new Ext.form.ComboBox({
			fieldLabel : '请选择磁盘',
			id : "combox_1",
			width : 300,
			allowBlank : true,
			blankText : '磁盘',
			emptyText : '全部',
			mode : 'remote',
			hiddenName : 'daikName',
			name: 'daikName',
			store : new Ext.data.JsonStore(
				{
					url : addDiskUrl,
					//root : 'data',
					fields : new Ext.data.Record.create( [
						'diskid', 'daikName' ])
				}),
			triggerAction : 'all',
			displayField : 'daikName',// 定义要显示的字段
			valueField : 'diskid',// 定义值字段
			forceSelection : true,// 要求输入值必须在列表中存在
			resizable : true,// 允许改变下拉列表的大小
			typeAhead : true,// 允许自动选择匹配的剩余部分文本
			handleHeight : 10

		});
		var disclist = new Ext.Window(
			{
				layout : 'fit',
				id : 'disclist',
				closeAction : 'close',
				resizable : false,
				width : 400,
				height :100,
				shadow : true,
				title : '添加磁盘',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items:[combox],
				buttons : [
					{
						text : '清除',
						handler : function()
						{

						}
					},
					{
						text : '提交',
						handler : function()
						{

						}
					} ]
			});
		disclist.show();
	}
	function showDisc(){
		var discid=Ext.getCmp('DISCS').getRawValue();
		if(discid.size!=0){
			addDisc();
		}
	}
	var combo = Ext.getCmp("RATES");
	combo.store.load(({}));
	var combo = Ext.getCmp("DISCS");
	combo.store.load(({}));
	var combo = Ext.getCmp("RAMS");
	combo.store.load(({}));
	detailAddWindow.show().center();
	Ext.getCmp('detailAddPanel').doLayout(true); // 重新调整版面布局
}
