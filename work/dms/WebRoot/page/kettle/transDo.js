
// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
// 各种链接
var listUrl = "getLogTransList";
var directoryComboxUrl = "getDirectoryList";

// 功能参数
var showLogWindow;
var queryFunc;

/**
 * 页面--作业运行状态情况列表展示
 */
Ext.onReady(function() {

	// 解决日期控件在IE浏览器下面显示不全的BUG
		Ext.override(Ext.menu.Menu, {
			autoWidth : function() {
				this.width += "px";
			}
		});
// 解决日期控件在IE浏览器下面上下显示不全的BUG
		Ext.override(Ext.menu.Menu,
	{
		autoHeight : function()
		{
			this.height += "px";
		}
	});
		var resultStoreFields = [ 'idBatch', 'transName', 'jobName', 'govName',
				'status', 'startDate', 'endDate', 'replayDate', 'logDate',
				'linesRead', 'linesWritten', 'linesUpdated', 'linesInput',
				'linesOutput', 'linesRejected', 'errors', 'logField','batchFlag' ];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : false,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			sortInfo : {
				field : 'transName',
				direction : 'desc'
			},
			successProperty : 'success',
			// 获取数据的方式
			proxy : new Ext.data.HttpProxy( {
				method : 'POST',
				url : listUrl
			}),
			// 数据读取器
			reader : new Ext.data.JsonReader( {
				totalProperty : 'count', // 记录总数
				messageProperty : 'msg',
				root : 'list' // Json中的列表数据根节点
			}, resultStoreFields),
			listeners : {
				exception : function(dataProxy, type, action, options,
						response, arg) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				}
			}
		});

		// 选择模型
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 列表显示的字段
		var cm = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer(),
				{
					header : 'idBatch',
					width : 20,
					align : 'center',
					dataIndex : 'idBatch',
					sortable : true,
					hidden : true

				},
				{
					header : "转换名称",
					width : 120,
					align : 'center',
					dataIndex : 'transName',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "所属作业",
					width : 120,
					align : 'center',
					dataIndex : 'jobName',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "所属委办局",
					width : 50,
					align : 'center',
					dataIndex : 'govName',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "批次号",
					width : 45,
					align : 'center',
					dataIndex : 'batchFlag',
					sortable : true,
					renderer : formatQtip,
					hidden : false
				},
				{
					header : "启动时间",
					width : 80,
					align : 'center',
					dataIndex : 'replayDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s') : '';
//					}
					renderer : formatQtip
				},
				{
					header : "结束时间",
					width : 80,
					align : 'center',
					dataIndex : 'logDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s') : '';
//					}
					renderer : formatQtip

				},
				{
					header : "记录时间",
					width : 80,
					align : 'center',
					dataIndex : 'logDate',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '读取',
					width : 23,
					align : 'center',
					dataIndex : 'linesRead',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '写入',
					width : 23,
					align : 'center',
					dataIndex : 'linesWritten',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '更新',
					width : 23,
					align : 'center',
					dataIndex : 'linesUpdated',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '输入',
					width : 23,
					align : 'center',
					dataIndex : 'linesInput',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '输出',
					width : 23,
					align : 'center',
					dataIndex : 'linesOutput',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '拒绝',
					width : 23,
					align : 'center',
					dataIndex : 'linesRejected',
					sortable : true,
					renderer : formatQtip

				}, {
					header : '错误',
					width : 23,
					align : 'center',
					dataIndex : 'errors',
					sortable : true,
					renderer : formatQtip

				}, {
					header : "操作",
					width : 40,
					align : 'center',
					dataIndex : '',
					renderer : renderOper
				} ]);
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
		// 弹出编辑页面
	showLogWindow = function() {
		var record = resultTable.getSelectionModel().getSelected();
		if (record.data.length == 0) {
			alert('未检测到数据!');
		} else {
			var id = record.get("transName");//encodeURI(encodeURI('skipHandler?idJob='+idJob+'&batchFlag='+batchFlag+'&govName='+govName))
			Ext.Ajax.request( {
				url : encodeURI(encodeURI('getLogMessage?id=' + id)),
				method : 'POST',
				success : function(response, options) {
					//response = eval("(" + Ext.encode(response) + ")");
					var results = eval("(" + Ext.encode(response.responseText)
							+ ")");
					Ext.getCmp('logShowField').setValue(results);
					detailWindow.show().center();
				},
				failure : function(response, options) {
					var results = Ext.util.JSON.decode(response.responseText);
					Ext.Msg.alert('提示', "异常码：" + results.data);
				}
			});
		}
	}

	// 格式化'查看日志信息'
	function renderOper(value, metadata, record, rowIndex, colIndex, store) {
		var result = "<font color='blue'><a href=\"javascript:showLogWindow();\">日志详情</a></font>";
		return result;
	}

	// 弹出的面板
	detailPanel = new Ext.form.FormPanel( {
		frame : false,
		title : '转化日志详细信息',
		id : 'detailPanel',
		bodyStyle : 'padding:10px;border:0px',
		labelwidth : 60,
		labelAlign : 'top',
		autoScroll : false,
		defaults : {
			selectOnFocus : true, // 点击即选中
			width : 300,
			height : 30,
			xtype : "textarea"
		},
		items : [ {
			textArea : 'logField',
			id : 'logShowField',
			name : 'logShowField',
			xtype : 'textarea',
			readOnly :true,
			grow : true,//根据内容自动伸缩
			//preventScrollbars : true,
			width : 700,
			height : 450,
			allowBlank : true,
			html : 'logShowField'
		} ]
	});

	// 弹出的窗口
	detailWindow = new Ext.Window( {
		layout : 'fit',
		width : 730,
		height : 450,
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ detailPanel ],
		buttons : [ {
			text : '关闭',
			iconCls : 'icon_close',
			handler : function() {
				detailWindow.hide();
			}
		} ]
	});

		//显示列表
		resultTable = new Ext.grid.GridPanel( {
			id : 'resultTable',
			autoScroll : true,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			border : true,
			store : resultStore,
			cm : cm,
			sm : sm,
			forceLayout : true,
			frame : false,
			columnLines : true,   // 列分隔处显示分隔符
			stripeRows : true,    //显示行的分隔符
			trackMouseOver : true,  // 鼠标停留时间
			viewConfig :
					{
					forceFit : true
					},
			bbar : []
		});

		/** ****************** '委办局'-->下拉列表 ********************************** */
		// 定义动态数据
		var directoryDataJsonStore = new Ext.data.JsonStore( {
			url : directoryComboxUrl,
			//root : 'data',
			fields : new Ext.data.Record.create( [ 'directoryId',
					'directoryName' ])
		});
		// 定义下拉框
		var directoryDataCombox = new Ext.form.ComboBox( {
			fieldLabel : '', // UI标签名称
			store : directoryDataJsonStore,
			// name : 'directoryDataCom', // 作为form提交时传送的参数名
			hiddenName : 'directoryId',
			allowBlank : true, // 是否允许为空
			emptyText : '---请选择---', // 没有默认值时,显示的字符串
			typeAhead : true,
			width : 110,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : '100%',
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'directoryId', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'directoryName' // 下拉框显示内容
		});
		directoryDataJsonStore.load(); // 载入下拉框的信息

		/** ****************** '成功、错误标志'-->下拉列表 ********************************** */
		// 定义静态数据
		var sysTypeData = [ [ '', '全部' ], [ '0', '成功' ], [ '1', '失败' ] ];
		// 定义ComboBox 的数据源
		var sysTypeStore = new Ext.data.SimpleStore( {
			fields : [ 'text', 'value' ],
			data : sysTypeData
		});

		// 定义下拉框
		var sysTypeCombox = new Ext.form.ComboBox( {
			fieldLabel : '', // UI标签名称
			//		name : 'sysTypeCom', // 作为form提交时传送的参数名
			hiddenName : 'errors',
			allowBlank : true, // 是否允许为空
			emptyText : '---请选择---', // 没有默认值时,显示的字符串
			typeAhead : true,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : '100%',
			width : 110,
			store : sysTypeStore,
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'value', // 下拉框显示内容
			regex : /[\u4e00-\u9fa5]/, // 只能输入中文.
			regexText : "只能输入中文!" // 使用正则表达式时,设置的错误提示
		});

		// 查询条件
		var queryFormItems = [ {
			layout : 'column',
			labelAlign : 'right',
			items : [ {
				columnWidth : .18,
				layout : 'form',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '转换名称',
					allowBlank : true,
					maxLength : 30,
					name : 'transName',
					anchor : '100%'
				} ]
			}, 
			{
				columnWidth : .24,
				layout : 'form',
				items : [ {
					fieldLabel : '委办局',
					layout : 'column',
					items : [ {
						items : [ directoryDataCombox ]
					} ]
				} ]
			},
			{
				columnWidth : .24,
				layout : 'form',
				items : [ {
					fieldLabel : '转换状态',
					layout : 'column',
					width : 110,
					items : [ {
						items : [ sysTypeCombox ]
					} ]
				} ]
			}, 
			{
				columnWidth : .34,
				layout : 'column',
				items : [ {
					labelWidth : 60,
					layout : 'form',
					items :
					[
						{
							xtype : 'label',
							fieldLabel : '记录时间'
						}
					]
				},{
					xtype : 'datefield',
					fieldLabel : '',
					name : 'replayDate',
					id : 'replayDate',
					editable:false,
					width : 100,
					altFormats : 'Y-m-d',
					format : 'Y-m-d',
					anchor : '100%'
				}, {
					layout : 'form',
					labelWidth : 17,
					labelSeparator : ' ',
					labelAlign : 'right',
					items : [ {
						xtype : 'label',
						fieldLabel : '至'
					} ]
				}, {
					xtype : 'datefield',
					fieldLabel : '',
					name : 'logDate',
					id : 'logDate',
					width : 100,
					editable:false,
					altFormats : 'Y-m-d',
					format : 'Y-m-d',// 用以覆盖本地化的默认日期格式化字串
					anchor : '100%'
				} ]
			} ]
		} ];
		// center页面初始化事件
		resultStore.on('load', function(s, rec) {

		});

		// 查询功能
		function queryFunc() {
			if(Ext.get('replayDate').getValue()!="" && Ext.get('logDate').getValue()!="" && Ext.get('replayDate').getValue()>Ext.get('logDate').getValue()){
				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
				return;
			}
			resultStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(resultStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			resultStore.load( {
				params : resultStore.baseParams
			});

		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip(" 对转换的今日和历史执行情况进行展示，点击每条记录的日志详情，可查看该转换运行的详细日志信息。");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm", queryFormItems, queryFunc);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryForm");
		// 查询面板中的按钮组
		var formButton = [ {
			text : '查询',
			iconCls : 'icon_query',
			handler : function() {
				queryFunc();
			}
		}, {
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				queryForm.getForm().reset();
			}
		} ];
		// 将定义的按钮组放入获取的面板中，如：放入查询面板中
		formPanelCmp.addButton(formButton);

		//		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		//		setTbar(resultTable,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);

	});