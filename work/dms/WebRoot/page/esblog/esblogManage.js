
var anchorSohw='100%';
// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
var detailPanel = Ext.getCmp('detailPanel');
var detailWindow = Ext.getCmp('detailWindow');
// 各种链接
var listUrl = "getEsbLogManageList";
var getLogDetail = 'getLogDetail';
/**
 * 页面--转换操作跟踪情况列表展示
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
		var resultStoreFields = [ 'esbflowno', 'operstamp', 'serviceid', 'channelid', 'respstatus','flowstepid'];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : true,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			sortInfo : {
				field : 'name',
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
//					var o = Ext.decode(response.responseText);
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
					header : "流水号",
					width : 150,
					align : 'center',
					dataIndex : 'esbflowno',
					sortable : true
				},
				{
					header : "服务ID",
					width : 150,
					align : 'center',
					dataIndex : 'serviceid',
					sortable : true
				},
				{
					header : "渠道ID",
					width : 150,
					align : 'center',
					dataIndex : 'channelid',
					sortable : true
				},
				{
					header : "流水步骤",
					width : 45,
					align : 'center',
					dataIndex : 'flowstepid',
					sortable : true
				},
				{
					header : "执行结果",
					width : 45,
					align : 'center',
					dataIndex : 'respstatus',
					renderer : YSTATUS,
					sortable : true
				},
				{
					header : "执行时间",
					width : 80,
					align : 'center',
					dataIndex : 'operstamp',
					sortable : true
				},
				{
					header : "报文",
					width : 50,
					align : 'center',
					dataIndex : 'esbflowno',
					sortable : true,
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
	
			function YSTATUS(value, metadata, record, rowIndex, colIndex, store)
	{
		var ystatus;
		if (value == '成功')
		{
			ystatus = "<font color='green'>" + value + "</font>";
		}else
		{
			ystatus = "<font color='red'>" + value + "</font>";

		}
		return ystatus;
	}
	
		// 格式化'操作'
	function renderOper(value, metadata, record, rowIndex, colIndex, store)
	{
		var result = "<font color='blue'><a href=\"javascript:showLogWindow();\">报文详情</a></font>";
		return result;
	}
	
				//加载申请类型
			var applyTypeData = [ [ '', '全部' ],[ '1', '成功' ], [ '2', '失败' ]];
			// 定义ComboBox 的数据源
			var applyTypeStore = new Ext.data.SimpleStore(
			{
				fields : [ 'text', 'value' ],
				data : applyTypeData
			});
					var applyTypeCombox = new Ext.form.ComboBox(
					{
						store : applyTypeStore,
						valueField : "text",
						displayField : "value",
						forceSelection : true,
						id : "applyTypeCombox",
						blankText : '执行结果',
						emptyText : '全 部',
						hiddenName : 'res_status',
						editable : false,
						triggerAction : 'all',
						allowBlank : true,
						fieldLabel : '执行结果',
						name : 'res_status',
						width :100,
						mode : 'local',
						anchor : '100%'
					});

		//显示列表
		resultTable = new Ext.grid.GridPanel( {
			id : 'resultTable',
			autoScroll : true,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			//		title : '记录列表',
			store : resultStore,
			cm : cm,
			sm : sm,
			trackMouseOver : true,
			forceLayout : true,
			border : false,
			frame : false,
			columnLines : true,
			stripeRows : true,
			bbar : [],
			viewConfig :
			{
				forceFit : true
			},
		});

		// 查询条件
		var queryFormItems = [ {
		layout : 'column',
		labelAlign : 'right',
		items : [ {
			columnWidth : .3,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '流水号',
				allowBlank : true,
				maxLength : 80,
				name : 'esbflowno',
				anchor : '100%'
			} ]
		},
		{
			columnWidth : .2,
			layout : 'form',
				items : [ {
					fieldLabel : '执行结果',
					layout : 'column',
					items : [ {
						items : [ applyTypeCombox ]
					} ]
				} ]
		},
		{
				columnWidth : .36,
				layout : 'form',
				items : [ {
					fieldLabel : '执行时间',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'startTime',
						id : 'startTime',
						altFormats : 'Y-m-d',
						width : 110,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
					}, {
						layout : 'form',
						labelWidth : 17,
						labelAlign : 'center',
						items : [ {
							xtype : 'label',
							fieldLabel : '至'
						} ]
					}, {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'endTime',
						id : 'endTime',
						altFormats : 'Y-m-d',
						width : 110,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
					} ]
				} ]
			}
		]
	} ];
		// center页面初始化事件
		resultStore.on('load', function(s, rec) {

		});

		// 查询功能
		function queryFunc() {
			if(Ext.get('startTime').getValue()!="" && Ext.get('endTime').getValue()!="" && Ext.get('startTime').getValue()>Ext.get('endTime').getValue()){
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
		setTip(" 对各ESB服务流水报文信息进行跟踪。");
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
				//grow : true,// 根据内容自动伸缩
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
		title : '报文详细信息',
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
			var esbflowno = record.get("esbflowno");
			var flowstepid = record.get("flowstepid");
			// 从后台读取数据
			Ext.Ajax.request(
			{
				url : getLogDetail,
				params :
				{
					esbflowno : esbflowno,
					flowstepid : flowstepid
				},
				method : 'POST',
				success : function(response, options)
				{
					var result = Ext.decode(response.responseText);
					detailWindow.show().center();
					if(result!=''){
						Ext.getCmp('LOGFIELD').setValue("未找到相应的数据信息");
					}else{
						Ext.getCmp('LOGFIELD').setValue(strAnsi2Unicode(decode64(result.detialLog)));
					}
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