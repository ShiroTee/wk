// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailPanel = Ext.getCmp('detailPanel');
var detailWindow = Ext.getCmp('detailWindow');
// 功能参数
var showLogWindow;
var queryFunc;
// 各种链接
var listUrl = 'getWarningDataList';
var getLogInfoUrl = 'getLogMessage';

/**
 * 页面--列表展示
 */
Ext.onReady(function()
{
	// 解决日期控件在IE浏览器下面显示不全的BUG
	Ext.override(Ext.menu.Menu,
	{
		autoWidth : function()
		{
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
	// 初始化页面的时候时候会执行store_load方法，查询数据
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';

	// 定义GroupingView模版的显示结果
	var tmpFunction = Ext.grid.GroupingView.prototype.initTemplates;
	Ext.grid.GroupingView.prototype.initTemplates = function()
	{
		tmpFunction.call(this);
		if (this.startGroup && this.tplFunction)
		{
			Ext.apply(this.startGroup, this.tplFunction);
		}
	};

	// 定义一个通用的扩展统计功能
	Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field)
	{
		return v + (record.data.estimate * record.data.rate);
	};

	// 使用扩展的的统计功能
	var summary = new Ext.ux.grid.GroupSummary();

	var resultStoreFields =
	[
			'BATCHID', 'JOBNAME', 'LINESREAD', 'LINESWRITTEN', 'LINESUPDATED', 'LINESINPUT', 'LINESOUTPUT', 'LINESREJECTED', 'ERRORS', 'STARTDATE', 'ENDDATE', 'STATUS', 'LOGDATE', 'CHANNELID'
	];
	resultStore = new Ext.data.GroupingStore(
	{
		id : 'resultStore',
		autoLoad : true,
		remoteSort : true,
		baseParams :
		{
			start : 0,
			limit : pageSize
		},
		sortInfo :
		{
			field : 'JOBID',
			direction : 'desc'
		},
		//groupField : 'JOBNAME',
		successProperty : 'success',
		// 获取数据的方式
		proxy : new Ext.data.HttpProxy(
		{
			method : 'POST',
			url : listUrl
		}),
		// 数据读取器
		reader : new Ext.data.JsonReader(
		{
			totalProperty : 'count', // 记录总数
			messageProperty : 'msg',
			root : 'list' // Json中的列表数据根节点
		}, resultStoreFields),
		listeners :
		{
			exception : function(dataProxy, type, action, options, response, arg)
			{
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success)
				{
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		}
	});

	// 选择模型
	var sm = new Ext.grid.CheckboxSelectionModel();

	// 列表显示的字段
	var cm = new Ext.grid.ColumnModel(
	[
			new Ext.grid.RowNumberer(),
			{
				header : "作业名称",
				width : 140,
				align : 'center',
				dataIndex : 'JOBNAME',
				sortable : true,
				summaryType : 'count',
				summaryRenderer : function(v, params, data)
				{
					return ((v === 0 || v > 1) ? '(' + v + ' 条数据)' : '(1 条数据)');
				},
				renderer : formatQtip
			},
			{
				header : "状态",
				width : 40,
				align : 'center',
				dataIndex : 'STATUS',
				sortable : true,
				renderer : formatQtip
			},
			{
				header : "启动时间",
				width : 130,
				align : 'center',
				dataIndex : 'STARTDATE',
				sortable : true,
				renderer : formatQtip
			},
			{
				header : "停止时间",
				width : 130,
				align : 'center',
				dataIndex : 'ENDDATE',
				sortable : true,
				renderer : formatQtip
			},
			{
				header : "记录时间",
				width : 130,
				align : 'center',
				dataIndex : 'LOGDATE',
				sortable : true,
				renderer : formatQtip
			},
			{
				header : '读取',
				width : 50,
				align : 'center',
				dataIndex : 'LINESREAD',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : '写入',
				width : 50,
				align : 'center',
				dataIndex : 'LINESWRITTEN',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : '更新',
				width : 50,
				align : 'center',
				dataIndex : 'LINESUPDATED',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : '输入',
				width : 50,
				align : 'center',
				dataIndex : 'LINESINPUT',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : '输出',
				width : 50,
				align : 'center',
				dataIndex : 'LINESOUTPUT',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : '拒绝',
				width : 50,
				align : 'center',
				dataIndex : 'LINESREJECTED',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : '错误',
				width : 50,
				align : 'center',
				dataIndex : 'ERRORS',
				sortable : true,
				summaryType : 'sum',
				renderer : formatQtip
			},
			{
				header : "操作",
				width : 80,
				align : 'center',
				dataIndex : '',
				renderer : renderOper,
				sortable : true
			}
	]);

	// 格式化'操作'
	function renderOper(value, metadata, record, rowIndex, colIndex, store)
	{
		var result = "<font color='blue'><a href=\"javascript:showLogWindow();\">日志详情</a></font>";
		return result;
	}

	// 弹出的面板
	detailPanel = new Ext.Panel(
	{
		frame : false,
		title : '',
		id : 'detailPanel',
		bodyStyle : 'padding-left:10px; padding-top:5px; padding-bottom:5px; border:0px',
		autoScroll : false,
		defaults :
		{
			selectOnFocus : true, // 点击即选中
			width : '100%',
			height : '100%',
			xtype : "textarea"
		},
		items :
		[
			{
				id : 'LOGFIELD',
				name : 'LOGFIELD',
				xtype : 'textarea',
				region : 'center',
				allowBlank : true,
				readOnly :true,
				grow : true,// 根据内容自动伸缩
				width : 705,
				height : 450,
				html : ''
			}
		]
	});

	// 弹出的窗口
	detailWindow = new Ext.Window(
	{
		layout : 'fit',
		width : 730,
		id : 'detailWindow',
		height : 450,
		title : '日志详细信息',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items :
		[
			detailPanel
		],
		buttons :
		[
			{
				text : '关闭',
				iconCls : 'icon_close',
				handler : function()
				{
					detailWindow.hide();
				}
			}
		]
	});

	// 弹出日志详细信息
	showLogWindow = function()
	{
		var record = resultTable.getSelectionModel().getSelected();
		if (record.data.length == 0)
		{
			alert('未检测到数据!');
		} else
		{
			var batchId = record.get("BATCHID");
			var channelId = record.get("CHANNELID");
			// 从后台读取数据
			Ext.Ajax.request(
			{
				url : getLogInfoUrl,
				params :
				{
					channelId : channelId,
					batchId : batchId
				},
				method : 'POST',
				success : function(response, options)
				{
					var result = Ext.decode(response.responseText);
					result = eval(result);
					detailWindow.show().center();
					Ext.getCmp('LOGFIELD').setValue(result[0].LOGFIELD);
					Ext.getCmp('detailPanel').doLayout(true); // 重新调整版面布局
				},
				failure : function(response, options)
				{
					var result = Ext.util.JSON.decode(response.responseText);
					Ext.Msg.alert('提示', "异常码：获取日志信息失败!" + result.data);
				}
			});
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

	// 分页显示控件
	var pagingToolbar = new Ext.PagingToolbar(
	{
		pageSize : pageSize,
		store : resultStore,
		displayInfo : true,
		displayMsg : '<span style="padding-right: 150px;padding-left: 40px">显示记录 {0} - {1}条 &nbsp;&nbsp;总共 {2}条<span>',
		emptyMsg : '<span style="padding-right: 200px;padding-left: 40px">没有记录</span>'
	});

	// 按钮工具栏
	var toolBar = new Ext.Toolbar(
	{
		items :
		[
			{
				text : '展开/收缩',
				id : 'btnToggle',
				iconCls : 'icon_explan',
				disabled : false,
				handler : function()
				{
					if (resultStore.data.length == 0)
					{
						alert('未发现数据！');
						return;
					} else
					{
						/**
						 * 显示或隐藏统计项 summary.toggleSummaries();
						 */
						resultTable.getView().toggleAllGroups();
					}
				}
			}
		]
	});

	var groupingView = new Ext.grid.GroupingView(
	{
		sortAscText : "升序",
		sortDescText : "降序",
		columnsText : "表格字段",
		groupByText : "使用当前字段进行分组",
		showGroupsText : "表格分组",
		groupTextTpl : "<span style='color: blue; font-family: '幼圆'; font-size: 14;'>{text}(共{[values.rs.length]}条)</span>",
		tplFunction :
		{
			stat : function(text, values)
			{
				return "";
			}
		}
	});

	// 显示的列表
	resultTable = new Ext.grid.GridPanel(
	{
		id : 'resultTable',
		autoScroll : true,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		region : 'center',
		// title : '记录列表',
		store : resultStore,
		cm : cm,
		sm : sm,
		trackMouseOver : false,
		forceLayout : true,
		frame : false,
		// width : '100%',
		// height : '100%',
		border : true,
		columnLines : true,
		stripeRows : true,
//		view : groupingView,
//		plugins : summary,
		viewConfig :
		{
			forceFit : true
		},
		// 工具栏
		tbar : [],
		// 分页栏
		bbar : []
	});

	// 查询条件
	var queryFormItems =
	[
		{
			layout : 'column',
			labelAlign : 'right',
			labelWidth : 200,
			items :
			[
					{
						columnWidth : .4,
						layout : 'form',
						items :
						[
							{
								xtype : 'textfield',
								fieldLabel : '作业名称',
								allowBlank : true,
								maxLength : 30,
								name : 'name',
								anchor : '90%'
							}
						]
					},
					{
						columnWidth : .6,
						layout : 'column',
						items :
						[
								{
									labelWidth : 60,
									layout : 'form',
									items :
									[
										{
											xtype : 'label',
											fieldLabel : '记录时间'
										}
									]
								},
								{
									xtype : 'datefield',
									fieldLabel : '',
									name : 'starttime_date',
									id : 'starttime_date',
									width:150,
									altFormats : 'Y-m-d',
									format : 'Y-m-d',
									editable:false,
									anchor : '100%'
								},
								{
									layout : 'form',
									labelWidth : 17,
									labelSeparator : ' ',
									labelAlign : 'right',
									items :
									[
										{
											xtype : 'label',
											fieldLabel : '至'
										}
									]
								},
								{
									xtype : 'datefield',
									fieldLabel : '',
									name : 'endtime_date',
									id : 'endtime_date',
									altFormats : 'Y-m-d',
									width:150,
									editable:false,
									format : 'Y-m-d',// 用以覆盖本地化的默认日期格式化字串
									anchor : '100%'
								}
						]
					}
			]
		}
	];

	// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
	// queryForm = new Ext.FormPanel(
	// {
	// id : 'queryForm',
	// monitorResize : true,
	// region : 'north',
	// labelAlign : 'left',
	// buttonAlign : 'center',
	// collapsible : true,
	// frame : true,
	// title : '查询条件',
	// autoWidth : true,
	// autoHeight : true,
	// items : queryFormItems,
	// buttons :
	// [
	// {
	// text : '查询',
	// iconCls : 'icon_query',
	// handler : function ()
	// {
	// queryFunc();
	// }
	// },
	// {
	// text : '重置',
	// iconCls : 'icon_reset',
	// handler : function ()
	// {
	// queryForm.getForm().reset();
	// }
	// }
	// ],
	// keys :
	// [
	// { // 处理键盘回车事件
	// key : Ext.EventObject.ENTER,
	// fn : queryFunc,
	// scope : this
	// }
	// ]
	// });

	// queryForm.render('div_body');
	// resultTable.render('div_body');

	// 主容器
	// var myViewPort = new Ext.Viewport(
	// {
	// items :
	// [
	// queryForm, resultTable
	// ],
	// layout : 'border',
	// boder : false,
	// forceLayout : true
	// });

	/** *************************功能集合********************** */
	// center页面初始化事件
	resultStore.on('load', function(s, rec)
	{

	});

	// 查询功能
	function queryFunc()
	{
		if(Ext.get('starttime_date').getValue()!="" && Ext.get('endtime_date').getValue()!="" && Ext.get('starttime_date').getValue()>Ext.get('endtime_date').getValue()){
			Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
			return;
		}
		resultStore.baseParams = queryForm.getForm().getValues();
		Ext.apply(resultStore.baseParams,
		{
			start : 0,
			limit : pageSize
		});
		resultStore.load(
		{
			params : resultStore.baseParams
		});
	}

	/** *****以下为注册各页面组件方法******************************* */
	// 提示标签提示的内容;
	setTip("各作业在运行过程中，由于未知异常而造成流程中断，使作业不能正常运行下去而发出的预警。");
	// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
	queryForm = setQueryForm("queryForm", queryFormItems, queryFunc);
	// 查询面板中的按钮组
	var formButton =
	[
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
			}
	];
	// 将定义的按钮组放入获取的面板中，如：放入查询面板中
	queryForm.addButton(formButton);
	// 定义工具栏的元素组
//	var topToolbarItems =
//	[
//		{
//			xtype : 'tbbutton',
//			text : '展开/收缩',
//			id : 'btnToggle',
//			iconCls : 'icon_explan',
//			disabled : false,
//			handler : function()
//			{
//				if (resultStore.data.length == 0)
//				{
//					alert('未发现数据！');
//					return;
//				} else
//				{
//					/**
//					 * 显示或隐藏统计项 summary.toggleSummaries();
//					 */
//					resultTable.getView().toggleAllGroups();
//				}
//			}
//		}
//	];
	
	var topToolbarItems =
	[
		{
			xtype : 'tbbutton',
			text : '展开/收缩',
			id : 'btnToggle',
			//iconCls : 'icon_explan',
			iconCls : 'icon_explantwo',//默认是展开 -
			disabled : false,
			handler : function(obj)
			{
				if (resultStore.data.length == 0)
				{
					alert('未发现数据！');
					//obj.setIconClass('icon_explantwo') ;//-
					if(obj.iconCls=='icon_explan'){
						obj.setIconClass('icon_explantwo') ;
					}else{
						obj.setIconClass('icon_explan') ;
					}
					return;
				} else
				{
					/**
					 * 显示或隐藏统计项 summary.toggleSummaries();
					 */
					//alert(obj.iconCls) ;//+
					if(obj.iconCls=='icon_explantwo'){
						obj.setIconClass('icon_explan') ;
					}else{
						obj.setIconClass('icon_explantwo') ;
					}
					resultTable.getView().toggleAlls();
					//obj.setIconClass('icon_explantwo') ;
				}
			}
		}
	];
	// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
	//setTbar(resultTable, topToolbarItems);
	// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
	setPaging(resultTable);
	// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
	setMainPanel("div_body", resultTable);

});
