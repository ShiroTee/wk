// 各种参数
var queryForm;
var queryForm_datatrans;
// 显示“异常数据详情”函数
var showMore_dataComp;
// 各种链接
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
// 委办局下拉
var RootDataJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getRootData";
// 委办局表下拉
var tableNamesJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getTableNameListByWBJ";
// 委办局表字段下拉
var tableColumnJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getTableColumnNameByTName";
// 委办局表字段下拉
var cleanRuleJsonStoreURL = REQUEST_URL_BASE
		+ "compDataManHandler/getDataRule";
// 数据转换结果统计
var queryListUrl = REQUEST_URL_BASE + "compDataManHandler/getCompResult";
// 根据比对代号查询异常数据需要显示的字段及字段名
var fieldAndFieldnameUrl = REQUEST_URL_BASE
		+ "compDataManHandler/getErrorFiledAndName";
// 查询异常数据详情
var errorListUrl = REQUEST_URL_BASE
		+ "compDataManHandler/getOneDayFailedInfo";

var getCompDetailInfo = REQUEST_URL_BASE
		+ "compDataManHandler/getCompDetailInfo";
var anchorShow='100%';
var oneMonthTable;
Ext.onReady(function() {
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
	// 查询所有或者 一个委办局表的总概要信息
		var gridStoreFields_datatrans = [ 'DATASOURCE', 'DATARULECODE',
				'DATARULENAME','COLUMNNAMEVALUE','TABLENAMEVALUE','TABLENAME', 'INSERTDATE', 'SUCCESS', 'FAILED', 'startDate',
				'endDate', 'DATASOURCEVALUE', 'SHOWINFO' ];

		// 比对结果统计表格
		var gridStore_datatrans = new Ext.data.JsonStore( {
			id : 'gridStore_datatrans',
			autoLoad : true,
			baseParams : {
				start : 0,
				pageSize : pageSize
			},
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
			url : queryListUrl,
			root : 'list',
			idProperty : 'ID',
			totalProperty : 'count',
			messageProperty : 'msg',
			fields : gridStoreFields_datatrans,
			// 定义默认以TABLECOUNT字段，降序排列
			sortInfo : {
				field : "FAILED",
				direction : "DESC"
			}
		});
		var grid_datatrans = new Ext.grid.GridPanel( {
				id : "grid_datatrans",
				store : gridStore_datatrans,
				autoScroll : true, //是否留有滚动条
				loadMask : true,   //是否的遮罩效果
				buttonAlign : 'center', //按钮布局集中		
				border : false,    // 是否显示行的边框
				trackMouseOver : true,  // 鼠标停留时间
				forceLayout : true,  
				region : 'center', 
				frame : false,     //是否留 frame 边框
				columnLines : true,   // 列分隔处显示分隔符
				stripeRows : true,    //显示行的分隔符
				bbar : [] ,      // 底部分页栏
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
			columns : [
					new Ext.grid.RowNumberer(),
					{
						header : "委办局",
						width : 5,
						dataIndex : 'DATASOURCE',
						renderer : formatQtip,
						sortable : true
					},
					{
							header : "表名",
							width : 5,
							dataIndex : 'TABLENAME',
							renderer : formatQtip,
							sortable : true
						
					},
					{
							header : "字段名",
							width : 5,
							dataIndex : 'COLUMNNAMEVALUE',
							renderer : formatQtip,
							sortable : true
							
					},
					{
						header : "比对规则编码",
						width : 5,
						dataIndex : 'DATARULECODE',
						renderer : formatQtip,
						sortable : true
					},
					{
						header : "比对规则",
						width : 5,
						dataIndex : 'DATARULENAME',
						renderer : formatQtip,
						sortable : true,
						//hidden : true
					},
					{
						header : "统计日期",
						width : 5,
						dataIndex : 'INSERTDATE',
						renderer : formatQtip,
						sortable : true
						
					},
					{
						header : "比对成功数据量(条)",
						width : 5,
						dataIndex : 'SUCCESS',
						renderer : formatQtip,
						sortable : true
					},
					{
						header : "不满足规则数据量(条)",
						width : 5,
						dataIndex : 'FAILED',
						sortable : true,
						renderer : function(value, metadata, record, rowIndex,
								colIndex, store) {
							return "<span style='color:red;'>" + value
									+ "</span>";
						}
					}, {
						header : "查询日期起",
						width : 10,
						dataIndex : 'startDate',
						renderer : formatQtip,
						sortable : true,
						hidden : true
					}, {
						header : "查询日期止",
						width : 10,
						dataIndex : 'endDate',
						renderer : formatQtip,
						sortable : true,
						hidden : true
					}, {
						header : "委办局别名",
						width : 5,
						dataIndex : 'DATASOURCEVALUE',
						renderer : formatQtip,
						sortable : true,
						hidden : true
					}, {
						header : "异常数据详情",
						width : 5,
						dataIndex : 'SHOWINFO',
						renderer : formatQtip,
						sortable : true,
						hidden : false,
						renderer : renderOper_datatrans
					} ],
			// 分页栏
			bbar : []
		});

		// 格式化'异常数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
		function renderOper_datatrans(value, metadata, record, rowIndex,
				colIndex, store) {
			var result;
			if (record.get('FAILED') != 0) {
				result = "<font color='blue'><a href='javascript:void(0)' onclick='showMore_dataComp(\""
						+ record.get('TABLENAME')
						+ "\", \""
						+ record.get('DATARULECODE')
						+ "\", \""
						+ record.get('TABLENAMEVALUE')
						+"\", \""
						+ record.get('COLUMNNAMEVALUE')
						+"\", \""
						+ record.get('INSERTDATE') + "\");'>异常数据详情</a></font>";
			} else {
				result = "<font color='gray'><span>异常数据详情</span></font>";
			}
			return result;
		}

		// 信息概要表格双击事件
//		grid_datatrans.addListener('rowdblclick', rowdblclickFn_datatrans);
//		function rowdblclickFn_datatrans(grid, rowindex, e) {
//			// 获取委办局别名代号
//			var record = grid.getSelectionModel().getSelected();
//			if (record.get('FAILED') != 0) {
//				showMore_dataComp(record.get('DATARULECODE'),record
//							.get('TABLENAMEVALUE'), record
//							.get('COLUMNNAMEVALUE'),
//				 record.get('INSERTDATE'));
//			}
//		}

		/*-----------------生成下拉列表------------------------------------------------*/
		var getRootDataJsonStore_datatrans = new Ext.data.JsonStore( { // 委办局填充的数据
					url : RootDataJsonStoreURL,
					fields : new Ext.data.Record.create( [ 'wbjCode',
							'wbjShortName' ])
				});

		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		getRootDataJsonStore_datatrans.on("load", function() {
			var PersonRecord = Ext.data.Record.create( [ {
				name : 'wbjCode',
				type : 'string'
			}, {
				name : 'wbjShortName',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord( {
				wbjCode : '',
				wbjShortName : '全部'
			});
			getRootDataJsonStore_datatrans.insert(0, qb_record);
		});

		// 委办局下拉列表
		var comboAllWbj_datatrans = new Ext.form.ComboBox( {
			store : getRootDataJsonStore_datatrans,
			listeners : {
				select : function(serviceInterfaceCombox, record, index) {
					// 首先清除之后的下拉列表内容
			tableNames_datatrans.clearValue();
			tableNames_datatrans.store.removeAll();
			tableColumnCombox_datatrans.clearValue();
			tableColumnCombox_datatrans.store.removeAll();
			transRuleCombox_datatrans.clearValue();
			transRuleCombox_datatrans.store.removeAll();
			var combo1 = Ext.getCmp("comboAllWbj_datatrans");
			// 根据选择的服务接口 加载服务接口下的方法
			var combo = Ext.getCmp("tableNames_datatrans");
			combo.store.load(( {
				params : {
					wbjCode : combo1.getValue()
				}
			}));

		}
	},
	valueField : "wbjCode",
	displayField : "wbjShortName",
	forceSelection : true,
	id : "comboAllWbj_datatrans",
	blankText : '委办局',
	emptyText : '全 部',
	hiddenName : 'wbjCode',
	editable : false,
	triggerAction : 'all',
	allowBlank : true,
	fieldLabel : '委办局',
	name : 'wbjCode',
	anchor : anchorShow
		});

		// 委办局表名下拉列表
		var tableNames_datatrans = new Ext.form.ComboBox( {
			store : new Ext.data.JsonStore( {
				url : tableNamesJsonStoreURL,
				fields : new Ext.data.Record.create( [ 'tableNameEn',
						'tableNameZh' ])

			}),
			listeners : {
				select : function(serviceInterfaceCombox, record, index) {
					// 首先清除之后的下拉列表内容
			tableColumnCombox_datatrans.clearValue();
			tableColumnCombox_datatrans.store.removeAll();
			transRuleCombox_datatrans.clearValue();
			transRuleCombox_datatrans.store.removeAll();
			var combo1 = Ext.getCmp("tableNames_datatrans");
			// 根据选择的服务接口 加载服务接口下的方法
			var combo = Ext.getCmp("tableColumnCombox_datatrans");
			combo.store.load(( {
				params : {
					tableCode : combo1.getValue()
				}
			}));

		}
	},
	valueField : "tableNameEn",
	displayField : "tableNameZh",
	mode : 'local',
	forceSelection : true,
	id : "tableNames_datatrans",
	blankText : '表名',
	emptyText : '全 部',
	hiddenName : 'tableNameEn',
	editable : false,
	triggerAction : 'all',
	allowBlank : true,
	fieldLabel : '表名',
	name : 'tableNameEn',
	anchor : anchorShow
		});

		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		tableNames_datatrans.store.on("load", function() {
			var PersonRecord = Ext.data.Record.create( [ {
				name : 'tableNameEn',
				type : 'string'
			}, {
				name : 'tableNameZh',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord( {
				tableNameEn : '',
				tableNameZh : '全部'
			});
			tableNames_datatrans.store.insert(0, qb_record);
		});

		// 某委办局字段下拉列表
		var tableColumnCombox_datatrans = new Ext.form.ComboBox( {
			store : new Ext.data.JsonStore( {
				url : tableColumnJsonStoreURL,
				fields : new Ext.data.Record.create( [ 'columnNameEn',
						'columnNameZh' ])

			}),
			listeners : {
				select : function(serviceInterfaceCombox, record, index) {
					// 首先清除之后的下拉列表内容
			transRuleCombox_datatrans.clearValue();
			transRuleCombox_datatrans.store.removeAll();
			var combo1 = Ext.getCmp("tableColumnCombox_datatrans");
			// 根据选择的服务接口 加载服务接口下的方法
			var combo = Ext.getCmp("transRuleCombox_datatrans");
			combo.store.load(( {
				params : {
					wbjCode : comboAllWbj_datatrans.getValue(),
					tableCode : tableNames_datatrans.getValue(),
					columnNameEn : combo1.getValue()
				}
			}));

		}
	},
	valueField : "columnNameEn",
	displayField : "columnNameEn",
	mode : 'local',
	forceSelection : true,
	id : "tableColumnCombox_datatrans",
	blankText : '字段名',
	emptyText : '全 部',
	hiddenName : 'columnNameEn',
	editable : false,
	triggerAction : 'all',
	allowBlank : true,
	fieldLabel : '字段名',
	name : 'columnNameEn',
	anchor : anchorShow
		});

		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		tableColumnCombox_datatrans.store.on("load", function() {
			var PersonRecord = Ext.data.Record.create( [ {
				name : 'columnNameEn',
				type : 'string'
			}, {
				name : 'columnNameZh',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord( {
				columnNameEn : '',
				columnNameEn : '全部'
			});
			tableColumnCombox_datatrans.store.insert(0, qb_record);
		});

		// 委办局列某字段下比对规则下拉列表
		var transRuleCombox_datatrans = new Ext.form.ComboBox( {
			store : new Ext.data.JsonStore( {
				url : cleanRuleJsonStoreURL,
				fields : new Ext.data.Record.create( [ 'dataRuleCode',
						'dataRuleName' ])

			}),
			valueField : "dataRuleCode",
			displayField : "dataRuleName",
			mode : 'local',
			forceSelection : true,
			id : "transRuleCombox_datatrans",
			blankText : '比对规则',
			emptyText : '全 部',
			hiddenName : 'DataRuleCode',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '比对规则',
			name : 'dataRuleCode',
			anchor : anchorShow
		});

		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		transRuleCombox_datatrans.store.on("load", function() {
			var PersonRecord = Ext.data.Record.create( [ {
				name : 'DataRuleCode',
				type : 'string'
			}, {
				name : 'DataRuleName',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord( {
				dataRuleCode : '',
				dataRuleName : '全部'
			});
			transRuleCombox_datatrans.store.insert(0, qb_record);
		});

		// 查询各条件 面板
		var queryCodeFormItems_datatrans = [ {
			layout : 'column',
			labelAlign : 'right',
			margins : '10px',
			items : [ {
				columnWidth : .17,
				layout : 'form',
				labelWidth : 50,
				items : [ comboAllWbj_datatrans ]
			}, {
				columnWidth : .17,
				layout : 'form',
				labelWidth : 30,
				items : [ tableNames_datatrans ]
			}, {
				columnWidth : .17,
				layout : 'form',
				labelWidth : 45,
				items : [ tableColumnCombox_datatrans ]
			}, {
				columnWidth : .17,
				layout : 'form',
				labelWidth : 60,
				items : [ transRuleCombox_datatrans ]
			}, {
				columnWidth : .32,
				layout : 'form',
				labelWidth : 60,
				items : [ {
					fieldLabel : '统计日期',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'starttime_date',
						id : 'starttime_date_datatrans',
						altFormats : 'Y-m-d',
						editable:false,
						format : 'Y-m-d',
						anchor : anchorShow
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
						name : 'endtime_date',
						id : 'endtime_date_datatrans',
						altFormats : 'Y-m-d',
						editable:false,
						format : 'Y-m-d',
						anchor : anchorShow
					} ]
				} ]
			} ]
		} ];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
		queryForm_datatrans = new Ext.FormPanel( {
			id : 'queryForm_datatrans',
			monitorResize : true,
			region : 'north',
			labelAlign : 'left',
			buttonAlign : 'center',
			collapsible : true,
			titleCollapse : true,
			frame : true,
			// 设置表单模块的样式
			bodyStyle : "margin-top: 10px;",
			title : '查询条件',
			autoWidth : true,
			autoHeight : true,
			items : queryCodeFormItems_datatrans,
			buttons : {
				// 设置按钮模块的样式
				style : "margin: 10px auto;",
				items : [ {
					text : '查询',
					handler : function() {
						queryFunc_datatrans();
					}
				}, {
					text : '重置',
					handler : function() {
						// 首先清除之后的下拉列表内容
					tableNames_datatrans.store.removeAll();
					tableColumnCombox_datatrans.store.removeAll();
					transRuleCombox_datatrans.store.removeAll();
					queryForm_datatrans.getForm().reset();
				}
				} ]
			},
			keys : [ { // 处理键盘回车事件
				key : Ext.EventObject.ENTER,
				fn : queryFunc_datatrans,
				scope : this
			} ]
		});
		// 查询功能
		function queryFunc_datatrans() {
			if(Ext.get('starttime_date_datatrans').getValue()!="" && Ext.get('endtime_date_datatrans').getValue()!="" && Ext.get('starttime_date_datatrans').getValue()>Ext.get('endtime_date_datatrans').getValue()){
				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
				return;
			}
			gridStore_datatrans.baseParams = queryForm.getForm().getValues();
			Ext.apply(gridStore_datatrans.baseParams, {
				start : 0,
				pageSize : pageSize
			});
			gridStore_datatrans.load( {
				params : gridStore_datatrans.baseParams
			});
			//销毁异常表格，显示主表格
			grid_datatrans.show();
			if (Ext.getCmp("errorInfoGrid_datatrans")) {
				Ext.getCmp("errorInfoGrid_datatrans").destroy();
			}
		}

		showMore_dataComp = function(TABLENAME,DATARULECODE,TABLENAMEVALUE,COLUMNNAMEVALUE , INSERTDATE) {
			// 动态生成表格字段
			Ext.Ajax
					.request( {
						url : fieldAndFieldnameUrl,
						method : 'GET',
						params : {
							DataRuleCode : DATARULECODE
						},
						success : function(responseObject_datatrans) {
							var responseArray_datatrans = Ext.util.JSON
									.decode(responseObject_datatrans.responseText);
							var errorInfostore_datatrans = new Ext.data.JsonStore(
									{
										autoLoad : false,
										baseParams : {
											start : 0,
											pageSize : pageSize,
											DataRuleCode : DATARULECODE,
											TableNameValue : TABLENAMEVALUE,
											ColumnNameValue : COLUMNNAMEVALUE,
											insertDate : INSERTDATE
										},
										successProperty : 'success',
										listeners : {
											exception : function(dataProxy,
												type, action, options,
													response, arg) {
												var o = Ext.util.JSON
														.decode(response.responseText);
												if (!o.success) {
													Ext.Msg.alert('错误提示',
															"加载数据异常！异常信息："
																	+ o.msg);
												}
											}
										},
										id : 'errorInfostore_datatrans',
										url : errorListUrl,
										root : 'list',
										idProperty : 'ID',
										totalProperty : 'count',
										messageProperty : 'msg',
										fields : responseArray_datatrans.field
									});
							var colMArray = new Array();
						    
						    var arr = responseArray_datatrans.fieldName;
						    
						    colMArray[0] = new Ext.grid.RowNumberer();
						    
						    for(var i=0; i<arr.length; i++) {
						    	
						    	colMArray[i+1] = arr[i];
						    	
						    }
						    
							var errorInfoCm_datatrans = new Ext.grid.ColumnModel(
									colMArray);

							// 分页显示控件
//							var errorInfoToolbar_datatrans = new Ext.PagingToolbar(
//									{
//										pageSize : pageSize,
//										store : errorInfostore_datatrans,
//										displayInfo : true,
//										displayMsg : '<span style="padding-right: 150px;padding-left: 40px">显示记录 {0} - {1}条 &nbsp;&nbsp;总共 {2}条<span>',
//										emptyMsg : '<span style="padding-right: 200px;padding-left: 40px">没有记录</span>'
//									});
							
							// 分页显示控件
							var errorInfoToolbar_datatrans = new Ext.PagingToolbar(
									{
										pageSize : pageSize,
										store : errorInfostore_datatrans,
										displayInfo : true,
										plugins : new Ext.ux.ProgressBarPager(),
										emptyMsg : '<span>没有记录</span>'
									});
							
							
							var errorInfoGrid_datatrans = new Ext.grid.GridPanel(
									{
										id : "errorInfoGrid_datatrans",
										store : errorInfostore_datatrans,
										buttonAlign : 'center',
										autoWidth : true,
										height : 405,
										frame : true,
										border : true, // 是否显示行的边框
										loadMask : true,
										columnLines : true,
										forceLayout : true,
										stripeRows : true,
										trackMouseOver : true,
										autoScroll : true,
										closable : true,
										viewConfig :
										{
											forceFit : true
										},
										cm : errorInfoCm_datatrans,
										// 顶部工具栏
										tbar : [],
										// 分页栏
										bbar : errorInfoToolbar_datatrans
									});
									
									//定义工具栏的元素组
			var topToolbarItems = [ {
					xtype : 'tbseparator'
					}, 
					{
					xtype : 'tbbutton',
					text : '返&nbsp;回',
					iconCls : 'icon_back',
					disabled : false,
					handler : function() {
					grid_datatrans.show();
					Ext.getCmp("errorInfoGrid_datatrans").destroy();
						}
						}, 
						{
					xtype : 'tbseparator'
								} ];
					// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
					//setTbar(errorInfoGrid_datatrans,topToolbarItems);
									

							// 加载异常数据表格
							errorInfostore_datatrans.load( {
								params : {
									DataRuleCode : DATARULECODE,
									insertDate : INSERTDATE
								}
							});
							//隐藏主表格，加载异常详细表格
//							grid_datatrans.hide();
//							errorInfoGrid_datatrans.render('content_5');
							
							
							oneMonthTable = errorInfoGrid_datatrans;
							
							newDetailWindow();
							
							// 显示窗口
							detailWindow.setTitle(TABLENAME+"数据比对异常数据详情");

							detailWindow.show().center();
							
							
							
							
							

							// 双击事件
							/*
							errorInfoGrid_datatrans.addListener('rowdblclick',
									rowdblclickFn);
							function rowdblclickFn(grid, rowindex, e) {
								var record = grid.getSelectionModel()
										.getSelected();
								// 动态生成表格字段
								Ext.Ajax.request( {
											url : getCompDetailInfo,
											method : 'GET',
											params : {
												start : 0,
												pageSize : pageSize,
												dataExceptionId : record.get("EXCEPTION_ID"),
												DataRuleCode : DATARULECODE,
												insertDate : INSERTDATE
											},
											success : function(responseObject_datatrans) {
												var reslut = Ext.util.JSON.decode(responseObject_datatrans.responseText)
												var exceDataSolutionWin = new Ext.Window(
														{
															layout : 'fit',
															id : 'dataCompWin',
															closeAction : 'close',
															resizable : false,
															width : 540,
															height : 420,
															shadow : true,
															title : '异常数据比对详情',
															modal : true,
															closable : true,
															bodyStyle : 'padding:5 5 5 5',
															animCollapse : true,
															items : [{// 行三
														        layout : "column", // 从左往右的布局
														        items : [{
														           columnWidth : .5, // 该列有整行中所占百分比
														           layout : "form",
														           items : [{
															              id : "errorDataId",
															              name : "errorDataId",
															              height: 400,
															              html : reslut.leftData
															             }]
											                    }, {
														           columnWidth : .5,
														           layout : "form",
														           items : [{
															              id : "rightDataId",
															              name : "rightDataId",
															              height: 400,
														            	  html : reslut.rightData
														             }]
														          }]
												         }],
												         listeners : {

															close : function() {
															// 解除模态窗口
															detailWindow.getEl().unmask();
														}
													},
															buttons:[{text:"取消",handler : function() {
																exceDataSolutionWin.close();
																
															}} ]
														});
												exceDataSolutionWin.show();
												
												//开启父窗口模态窗口
												detailWindow.getEl().mask();
											}
										});
							}
							
							*/
						}
					});
		};
		
		// 新建弹出的窗口
		function newDetailWindow() {
			detailWindow = new Ext.Window( {
				title : '',
				layout : 'fit',
				width : 800,
				height : 450,
				closeAction : 'close', // *比较关键*
				// 关闭窗口时，窗口对也关闭，不保留，如果值为"hide"，则窗口对象是隐藏的，对象一直存在。
				autoScroll : true,
				plain : true,
				modal : true,
				resizable : true,
				items : [ oneMonthTable ]
			});
		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按时间段统计各委办局数据比对成功记录总数和不满足比对规则的记录总数,点击异常数据详情后,可查看异常数据的异常字段,用红色字体显示.");
		
		
		
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm_datatrans",
				queryCodeFormItems_datatrans, queryFunc_datatrans);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryForm_datatrans");
		// 查询面板中的按钮组
		var formButton = [ {
			text : '查询',
			iconCls : 'icon_query',
			handler : function() {
				queryFunc_datatrans();
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
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid_datatrans);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("content_5", grid_datatrans);
	});