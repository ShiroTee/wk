// 各种参数
var queryForm;
var queryForm_dataclean;
// 显示“异常数据详情”函数
var showMore_dataclean;
// 各种链接
var REQUEST_URL_BASE =PROJECT_ROOT+ "/app/http/dmp/";
// 委办局下拉
var RootDataJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getRootData";
// 委办局表下拉
var tableNamesJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getTableNameListByWBJ";
// 委办局表字段下拉
var tableColumnJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getTableColumnNameByTName";
// 清洗规则下拉
var cleanRuleJsonStoreURL = REQUEST_URL_BASE
		+ "cleanDataManHandler/getDataRule";
// 数据清洗结果统计
var queryListUrl = REQUEST_URL_BASE + "cleanDataManHandler/getCleanResult";
// 根据清洗代号查询异常数据需要显示的字段及字段名
var fieldAndFieldnameUrl = REQUEST_URL_BASE
		+ "cleanDataManHandler/getErrorFiledAndName";
// 查询异常数据详情
var errorListUrl = REQUEST_URL_BASE
		+ "cleanDataManHandler/getOneDayFailedInfo";
var anchorShow='100%';

var oneMonthTable;
Ext
		.onReady(function() {
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
			var gridStoreFields_dataclean = [ 'DATASOURCE', 'DATARULECODE',
					'DATARULENAME','COLUMNNAMEVALUE','TABLENAMEVALUE','EXCEPTIONBM','NAME','TABLENAME', 'INSERTDATE', 'SUCCESS', 'FAILED',
					'startDate', 'endDate', 'DATASOURCEVALUE', 'SHOWINFO' ];

			// 清洗结果统计表格
			var gridStore_dataclean = new Ext.data.JsonStore({
				id : 'gridStore_dataclean',
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
				fields : gridStoreFields_dataclean,
				// 定义默认以TABLECOUNT字段，降序排列
				sortInfo : {
					field : "FAILED",
					direction : "DESC"
				}
			});
			var grid_dataclean = new Ext.grid.GridPanel({
				id : "grid_dataclean",
				store : gridStore_dataclean,
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
							header : "清洗规则",
							width : 5,
							dataIndex : 'DATARULENAME',
							renderer : formatQtip,
							sortable : true
							//hidden : true
						},
						{
							header : "清洗规则代码",
							width : 5,
							dataIndex : 'DATARULECODE',
							renderer : formatQtip,
							sortable : true
						},
						{
							header : "统计日期",
							width : 5,
							dataIndex : 'INSERTDATE',
							renderer : formatQtip,
							sortable : true,
							hidden : false
						},
						{
							header : "清洗成功数据量(条)",
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
							renderer : function(value, metadata, record,
									rowIndex, colIndex, store) {
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
						}
						/*, {
							header : "异常数据详情",
							width : 7,
							dataIndex : 'SHOWINFO',
							renderer : formatQtip,
							sortable : true,
							hidden : false,
							renderer : renderOper_dataclean
						} */],
				// 分页栏
				bbar : []
			});

			// 格式化'异常数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
			function renderOper_dataclean(value, metadata, record, rowIndex,
					colIndex, store) {
				var result;
				if (record.get('FAILED') != 0) {
					result = "<font color='blue'><a href='javascript:void(0)' onclick='showMore_dataclean(\""
						+ record.get('TABLENAME')
						+ "\", \""
							+ record.get('DATARULECODE')
							+ "\", \""
							+ record.get('TABLENAMEVALUE')
							+"\", \""
							+ record.get('EXCEPTIONBM')
							+"\", \""
							+ record.get('NAME')
							+"\", \""
							+ record.get('COLUMNNAMEVALUE')
							+"\", \""
							+ record.get('INSERTDATE')
							+ "\");'>异常数据详情</a></font>";
				} else {
					result = "<font color='gray'><span>异常数据详情</span></font>";
				}
				return result;
			}

			// 信息概要表格双击事件
//			grid_dataclean.addListener('rowdblclick', rowdblclickFn_dataclean);
//			function rowdblclickFn_dataclean(grid, rowindex, e) {
//				// 获取委办局别名代号
//				var record = grid.getSelectionModel().getSelected();
//				if (record.get('FAILED') != 0) {
//					showMore_dataclean(record.get('DATARULECODE'),record
//							.get('TABLENAMEVALUE'), record
//							.get('COLUMNNAMEVALUE'),record
//							.get('INSERTDATE'));
//				}
//			}

			/*-----------------生成下拉列表------------------------------------------------*/
			var getRootDataJsonStore_dataclean = new Ext.data.JsonStore({ // 委办局填充的数据
				url : RootDataJsonStoreURL,
				fields : new Ext.data.Record.create(
						[ 'wbjCode', 'wbjShortName' ])
			});

			// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
			getRootDataJsonStore_dataclean.on("load", function() {
				var PersonRecord = Ext.data.Record.create([ {
					name : 'wbjCode',
					type : 'string'
				}, {
					name : 'wbjShortName',
					type : 'string'
				} ]);
				var qb_record = new PersonRecord({
					wbjCode : '',
					wbjShortName : '全部'
				});
				getRootDataJsonStore_dataclean.insert(0, qb_record);
			});

			// 委办局下拉列表
			var comboAllWbj_dataclean = new Ext.form.ComboBox({
				store : getRootDataJsonStore_dataclean,
				listeners : {
					select : function(serviceInterfaceCombox, record, index) {
						// 首先清除之后的下拉列表内容
						tableNames_dataclean.clearValue();
						tableNames_dataclean.store.removeAll();
						tableColumnCombox_dataclean.clearValue();
						tableColumnCombox_dataclean.store.removeAll();
						cleanRuleCombox_dataclean.clearValue();
						cleanRuleCombox_dataclean.store.removeAll();
						var combo1 = Ext.getCmp("comboAllWbj_dataclean");
						// 根据选择的服务接口 加载服务接口下的方法
						var combo = Ext.getCmp("tableNames_dataclean");
						combo.store.load(({
							params : {
								wbjCode : combo1.getValue()
							}
						}));

					}
				},
				valueField : "wbjCode",
				displayField : "wbjShortName",
				forceSelection : true,
				id : "comboAllWbj_dataclean",
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
			var tableNames_dataclean = new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					id : "tableNamesStore_dataclean",
					url : tableNamesJsonStoreURL,
					fields : new Ext.data.Record.create([ 'tableNameEn',
							'tableNameZh' ])

				}),
				listeners : {
					select : function(serviceInterfaceCombox, record, index) {
						// 首先清除之后的下拉列表内容
						tableColumnCombox_dataclean.clearValue();
						tableColumnCombox_dataclean.store.removeAll();
						cleanRuleCombox_dataclean.clearValue();
						cleanRuleCombox_dataclean.store.removeAll();
						var combo1 = Ext.getCmp("tableNames_dataclean");
						// 根据选择的服务接口 加载服务接口下的方法
						var combo = Ext.getCmp("tableColumnCombox_dataclean");
						combo.store.load(({
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
				id : "tableNames_dataclean",
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
			tableNames_dataclean.store.on("load", function() {
				var PersonRecord = Ext.data.Record.create([ {
					name : 'tableNameEn',
					type : 'string'
				}, {
					name : 'tableNameZh',
					type : 'string'
				} ]);
				var qb_record = new PersonRecord({
					tableNameEn : '',
					tableNameZh : '全部'
				});
				tableNames_dataclean.store.insert(0, qb_record);
			});

			// 某委办局字段下拉列表
			var tableColumnCombox_dataclean = new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					url : tableColumnJsonStoreURL,
					fields : new Ext.data.Record.create([ 'columnNameEn',
							'columnNameZh' ])

				}),
				listeners : {
					select : function(serviceInterfaceCombox, record, index) {
						// 首先清除之后的下拉列表内容
						cleanRuleCombox_dataclean.clearValue();
						cleanRuleCombox_dataclean.store.removeAll();
						var combo1 = Ext.getCmp("tableColumnCombox_dataclean");
						// 根据选择的服务接口 加载服务接口下的方法
						var combo = Ext.getCmp("cleanRuleCombox_dataclean");
						combo.store.load(({
							params : {
								wbjCode : comboAllWbj_dataclean.getValue(),
								tableCode : tableNames_dataclean.getValue(),
								columnNameEn : combo1.getValue()
							}
						}));

					}
				},
				valueField : "columnNameEn",
				displayField : "columnNameEn",
				mode : 'local',
				forceSelection : true,
				id : "tableColumnCombox_dataclean",
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
			tableColumnCombox_dataclean.store.on("load", function() {
				var PersonRecord = Ext.data.Record.create([ {
					name : 'columnNameEn',
					type : 'string'
				}, {
					name : 'columnNameZh',
					type : 'string'
				} ]);
				var qb_record = new PersonRecord({
					columnNameEn : '',
					columnNameEn : '全部'
				});
				tableColumnCombox_dataclean.store.insert(0, qb_record);
			});

			// 委办局列某字段下清洗规则下拉列表
			var cleanRuleCombox_dataclean = new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					url : cleanRuleJsonStoreURL,
					fields : new Ext.data.Record.create([ 'dataRuleCode',
							'dataRuleName' ])

				}),
				valueField : "dataRuleCode",
				displayField : "dataRuleName",
				mode : 'local',
				forceSelection : true,
				id : "cleanRuleCombox_dataclean",
				blankText : '清洗规则',
				emptyText : '全 部',
				hiddenName : 'DataRuleCode',
				editable : false,
				triggerAction : 'all',
				allowBlank : true,
				fieldLabel : '清洗规则',
				name : 'DataRuleCode',
				anchor : anchorShow
			});

			// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
			cleanRuleCombox_dataclean.store.on("load", function() {
				var PersonRecord = Ext.data.Record.create([ {
					name : 'dataRuleCode',
					type : 'string'
				}, {
					name : 'dataRuleName',
					type : 'string'
				} ]);
				var qb_record = new PersonRecord({
					dataRuleCode : '',
					dataRuleName : '全部'
				});
				cleanRuleCombox_dataclean.store.insert(0, qb_record);
			});

			// 查询各条件 面板
			var queryCodeFormItems_dataclean = [ {
				layout : 'column',
				labelAlign : 'right',
				margins : '10px',
				items : [ {
					columnWidth : .17,
					layout : 'form',
					labelWidth : 50,
					items : [ comboAllWbj_dataclean ]
				}, {
					columnWidth : .17,
					layout : 'form',
					labelWidth : 30,
					items : [ tableNames_dataclean ]
				}, {
					columnWidth : .17,
					layout : 'form',
					labelWidth : 45,
					items : [ tableColumnCombox_dataclean ]
				}, {
					columnWidth : .17,
					layout : 'form',
					labelWidth : 60,
					items : [ cleanRuleCombox_dataclean ]
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
							id : 'starttime_date_dataclean',
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
							id : 'endtime_date_dataclean',
							altFormats : 'Y-m-d',
							editable:false,
							format : 'Y-m-d',
							anchor : anchorShow
						} ]
					} ]
				} ]
			} ];

			// 查询功能
			function queryFunc_dataclean() {
				if(Ext.get('starttime_date_dataclean').getValue()!="" && Ext.get('endtime_date_dataclean').getValue()!="" && Ext.get('starttime_date_dataclean').getValue()>Ext.get('endtime_date_dataclean').getValue()){
					Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
					return;
				}
				gridStore_dataclean.baseParams = queryForm_dataclean.getForm()
						.getValues();
				Ext.apply(gridStore_dataclean.baseParams, {
					start : 0,
					pageSize : pageSize
				});
				gridStore_dataclean.load({
					params : gridStore_dataclean.baseParams
				});
				// 销毁异常表格，显示主表格
				grid_dataclean.show();
				if (Ext.getCmp("errorInfoGrid_dataclean")) {
					Ext.getCmp("errorInfoGrid_dataclean").destroy();
				}
			}

			showMore_dataclean = function(TABLENAME,DATARULECODE,TABLENAMEVALUE,EXCEPTIONBM,NAME,COLUMNNAMEVALUE ,INSERTDATE ) {
//			alert(TABLENAME+FAILED) ;
				
				// 动态生成表格字段
				Ext.Ajax
						.request({
							url : fieldAndFieldnameUrl,
							method : 'GET',
							params : {
								DataRuleCode : DATARULECODE
							},
							success : function(responseObject_dataclean) {
								var responseArray_dataclean = Ext.util.JSON
										.decode(responseObject_dataclean.responseText);
								
								// var fieldNames = responseArray.fieldsNames;
								// alert(Ext.util.JSON.encode(responseArray.columModle));
								// 异常数据表格
								var errorInfostore_dataclean = new Ext.data.JsonStore(
										{
											autoLoad : false,
											baseParams : {
												start : 0,
												pageSize : pageSize,
												DataRuleCode : DATARULECODE,
												TableNameValue : TABLENAMEVALUE,
												ExceptionBm : EXCEPTIONBM,
												Name : NAME,
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
														Ext.Msg
																.alert(
																		'错误提示',
																		"加载数据异常！异常信息："
																				+ o.msg);
													}
												}
											},
											id : 'errorInfostore_dataclean',
											url : errorListUrl,
											root : 'list',
											idProperty : 'ID',
											totalProperty : 'count',
											messageProperty : 'msg',
											fields : responseArray_dataclean.field
										// 定义默认以TABLECOUNT字段，降序排列
										// sortInfo : {
										// field : "FAILED",
										// direction : "DESC"
										// }
										});
								
								
								
								var colMArray = new Array();
							    
							    var arr = responseArray_dataclean.fieldName;
							    
							    colMArray[0] = new Ext.grid.RowNumberer();
							    
							    for(var i=0; i<arr.length; i++) {
							    	
							    	colMArray[i+1] = arr[i];
							    	
							    }
							    
								var errorInfoCm_dataclean = new Ext.grid.ColumnModel(colMArray
										);

								// 异常详情“异常字段”格式化
								// function failedOper_dataclean(value,
								// metadata, record, rowIndex,colIndex, store) {
								// return '<span style="color:red;">' + value +
								// '</span>' ;
								// }
								

								// 分页显示控件
								var errorInfoToolbar_dataclean = new Ext.PagingToolbar(
										{
											pageSize : pageSize,
											store : errorInfostore_dataclean,
											displayInfo : true,
											plugins : new Ext.ux.ProgressBarPager(),
											emptyMsg : '<span>没有记录</span>'
										});

								var errorInfoGrid_dataclean = new Ext.grid.GridPanel(
										{
											id : "errorInfoGrid_dataclean",
											store : errorInfostore_dataclean,
											buttonAlign : 'center',
											autoWidth : true,
											height : grid_dataclean.getHeight(),
											frame : false,
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
												cm : errorInfoCm_dataclean,
											// 顶部工具栏
											tbar : [],
											// 分页栏
											bbar : errorInfoToolbar_dataclean
										});
								
								//定义工具栏的元素组
								var topToolbarItems = [ {
									xtype : 'tbseparator'
								}, {
									xtype : 'tbbutton',
									text : '返&nbsp;回',
									iconCls : 'icon_back',
									disabled : false,
									handler : function() {
										// 销毁异常表格，显示主表格
										grid_dataclean.show();
										Ext.getCmp("errorInfoGrid_dataclean").destroy();
									}
								}, {
									xtype : 'tbseparator'
								} ];
								// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
								//setTbar(errorInfoGrid_dataclean,topToolbarItems);

								// 加载异常数据表格
								errorInfostore_dataclean.load({
									params : {
										DataRuleCode : DATARULECODE,
										insertDate : INSERTDATE
									}
								});
								// 隐藏主表格，加载异常详细表格
								//grid_dataclean.hide();
								//errorInfoGrid_dataclean.render('content_4');
								
								
								
								oneMonthTable = errorInfoGrid_dataclean;
								
								newDetailWindow();
								
								// 显示窗口
								detailWindow.setTitle(TABLENAME+"数据清洗异常数据详情");

								detailWindow.show().center();
								
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
			setTip("按时间段统计各委办局数据清洗成功记录总数和不满足清洗规则的记录总数,点击异常数据详情后,可查看异常数据的异常字段,用红色字体显示.");
			// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
			queryForm_dataclean = setQueryForm("queryForm_dataclean",
					queryCodeFormItems_dataclean, queryFunc_dataclean);
			// 根据ID获取组件。例如获取查询面板组件
			var formPanelCmp = new Ext.getCmp("queryForm_dataclean");
			// 查询面板中的按钮组
			var formButton = [ {
				text : '查询',
				iconCls : 'icon_query',
				handler : function() {
					queryFunc_dataclean();
				}
			}, {
				text : '重置',
				iconCls : 'icon_reset',
				handler : function() {
					// 首先清除之后的下拉列表内容
					tableNames_dataclean.store.removeAll();
					tableColumnCombox_dataclean.store.removeAll();
					cleanRuleCombox_dataclean.store.removeAll();
					queryForm_dataclean.getForm().reset();
				}
			} ];
			// 将定义的按钮组放入获取的面板中，如：放入查询面板中
			formPanelCmp.addButton(formButton);
			// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
			setPaging(grid_dataclean);
			// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
			setMainPanel("content_4", grid_dataclean);
		});
