
var anchorSohw='70%';
// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
// 各种链接
var listUrl = "getLogJobList";
var directoryComboxUrl = "getDirectoryList";
//var pageSize=15;

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
		// 初始化页面的时候时候会执行store_load方法，查询数据
//		Ext.QuickTips.init();
//		Ext.form.Field.prototype.msgTarget = 'side';

				// 定义GroupingView模版的显示结果
//				var tmpFunction = Ext.grid.GroupingView.prototype.initTemplates;
//				Ext.grid.GroupingView.prototype.initTemplates = function() {
//					tmpFunction.call(this);
//					if (this.startGroup && this.tplFunction) {
//						Ext.apply(this.startGroup, this.tplFunction);
//					}
//				};
		
				// 定义一个通用的扩展统计功能
//				Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v,
//						record, field) {
//		
//					return v + (record.data.estimate * record.data.rate);
//				};
//		
//				// 使用扩展的的统计功能
//				var summary = new Ext.ux.grid.GroupSummary();

		var resultStoreFields = [ 'idJob', 'jobName', 'status', 'startDate',
				'endDate', 'replayDate', 'logDate', 'govName' ];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : false,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			sortInfo : {
				field : 'idJob',
				direction : 'desc'
			},
			//统计
			//groupField : 'govName',
//			successProperty : 'success',
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
			//			,load:function(s, rec){
			//				
			//				alert(Ext.encode(resultStore.reader.jsonData))
			//			}
			}
		});
		
			//定时器
		/*	var t;
		 function timedCount(){ 
		 t=setTimeout("timedCount()",1000);	
		 gridStore.reload();  
		 }*/
		var task = {
			run : function() {
				var obj = Ext.getCmp("resultTable");
				if (obj != null) {
					obj.getStore().reload();
				}
			},
			interval : 15000 * 2
		}
		Ext.TaskMgr.start(task);
		//Ext.TaskMgr.stop(task);//关闭定时器 ,现由index.jsp中关闭当前active tab来释放

		// 选择模型
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 列表显示的字段
		var cm = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer(),
				{
					header : 'jobId',
					align : 'center',
					width : 20,
					dataIndex : 'idJob',
					sortable : true,
					hidden : true,
					renderer : formatQtip

				},
				{
					id : 'jobName',
					header : "作业名称",
					align : 'center',
					width : 180,
					dataIndex : 'jobName',
					sortable : true,
					renderer : formatQtip
				},
				{
					id : 'govName',
					header : "所属委办局",
					align : 'center',
					width : 80,
					dataIndex : 'govName',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "状态",
					align : 'center',
					width : 60,
					dataIndex : 'status',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "启动时间",
					align : 'center',
					width : 120,
					dataIndex : 'replayDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s.u') : '';
//					}
					renderer : formatQtip
					
				},
				{
					header : "停止时间",
					align : 'center',
					width : 120,
					dataIndex : 'logDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s ') : '';
//					}
					renderer : formatQtip
					
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

//显示列表
	resultTable = new Ext.grid.GridPanel(
	{
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
		columnLines : true,   // 列分隔处显示分隔符
		stripeRows : true,    //显示行的分隔符
		trackMouseOver : true,  // 鼠标停留时间
		forceLayout : true,
		border : false,
		frame : false,
//		view : groupingView,
//		plugins : summary,
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
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : anchorSohw,
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'directoryId', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'directoryName' // 下拉框显示内容
		});
		//directoryDataCombox.reset();
		directoryDataJsonStore.load(); // 载入下拉框的信息

		// 查询条件
		var queryFormItems = [ {
			layout : 'column',
			style : 'margin-left: 160px;',
			labelAlign : 'right',
			items : [ {
				columnWidth : .5,
				layout : 'form',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '作业名称',
					allowBlank : true,
					maxLength : 30,
					name : 'jobName',
					anchor : anchorSohw
				} ]
			}, {
				columnWidth : .5,
				layout : 'form',
				items : [ {
					fieldLabel : '委办局',
					layout : 'column',
					items : [ {
						items : [ directoryDataCombox ]
					} ]
				} ]
			} ]
		} ];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
//		queryForm = new Ext.FormPanel( {
//			id : 'queryForm',
//			monitorResize : true,
//			region : 'north',
//			labelAlign : 'left',
//			buttonAlign : 'center',
//			collapsible : true,
//			frame : true,
//			title : '查询条件',
//			autoWidth : true,
//			autoHeight : true,
//			items : queryFormItems,
//			buttons : [ {
//				text : '查询',
//				iconCls : 'icon_query',
//				handler : function() {
//					queryFunc();
//				}
//			}, {
//				text : '重置',
//				iconCls : 'icon_reset',
//				handler : function() {
//					queryForm.getForm().reset();
//				}
//			} ],
//			keys : [ { // 处理键盘回车事件
//				key : Ext.EventObject.ENTER,
//				fn : queryFunc,
//				scope : this
//			} ]
//		});
//
//		
//		queryForm.render('service_div_1');
		

		// 主容器
//		var myViewPort = new Ext.Viewport( {
//			//items : [ queryForm, resultTable, detailTable ],
//			items : [ queryForm, resultTable ],
//			layout : 'border',
//			boder : false,
//			forceLayout : true
//		});

		/** *************************功能集合********************** */
		// center页面初始化事件
		resultStore.on('load', function(s, rec) {

		});

		// 查询功能
		function queryFunc() {
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
		setTip(" 对各作业目前的运行状态进行展示，页面会在设定的监控频率下定时刷新。");
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
		//定义工具栏的元素组
//		var topToolbarItems = [ {
//			xtype : 'tbbutton',
//			text : '启动监控',
//			id : 'btnStart',
//			iconCls : 'icon_start',
//			disabled : false,
//			handler : function() {
//				alert("你在点启动按钮哦！");
//			}
//		}, {
//			xtype : 'tbseparator'
//		}, {
//			xtype : 'tbbutton',
//			text : '暂停监控',
//			iconCls : 'icon_stop'
//		}, {
//			xtype : 'tbseparator'
//		}, {
//			xtype : 'tbbutton',
//			text : '增加',
//			iconCls : 'icon_add'
//		}, {
//			xtype : 'tbseparator'
//		}, {
//			xtype : 'tbbutton',
//			text : '编辑',
//			iconCls : 'icon_edit'
//		}, {
//			xtype : 'tbseparator'
//		}, {
//			xtype : 'tbbutton',
//			text : "删除",
//			iconCls : 'icon_delete'
//		}, {
//			xtype : 'tbseparator'
//		}, {
//			xtype : 'tbbutton',
//			text : "导出",
//			iconCls : 'icon_printer'
//		}, {
//			xtype : 'tbseparator'
//		}, {
//			xtype : 'tbbutton',
//			text : "重置",
//			iconCls : 'icon_reset'
//		} ];
//		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
//		setTbar(resultTable,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);
		
		

	});