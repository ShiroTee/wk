// 各种参数
var queryForm;
var queryFunc;
var resultTable;
var resultStore;
var showLog;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
// 各种链接
// 各种参数
var anchorShow = '100%';
var REQUEST_URL_BASE = PROJECT_ROOT + "/app/http/dmp/";
var listUrl = REQUEST_URL_BASE + "wbjTableInfoHandler/getWBJTableInfo";
var infoUrl = REQUEST_URL_BASE + "wbjTableInfoHandler/getOneTableInfo";
var oneMonthUrl = REQUEST_URL_BASE + "wbjTableInfoHandler/getOneMonthAdd";
var addUrl = "";
var oneMonthTable2;
var oneMonthTable3;

// zhyg
// var listUrl = 'produce/js/zhyg.json';

/**
 * 页面--用户申请的服务管理
 */
Ext.onReady(function() {
	// 解决日期控件在IE浏览器下面显示不全的BUG
		Ext.override(Ext.menu.Menu, {
			autoWidth : function() {
				this.width += "px";
			}
		});

		// 解决日期控件在IE浏览器下面上下显示不全的BUG
		Ext.override(Ext.menu.Menu, {
			autoHeight : function() {
				this.height += "px";
			}
		});
		// 查询所有或者 一个委办局表的总概要信息
		var resultStoreFields = [ 'WBJJC', 'TABLECOUNT', 'ADDSUM', 'startDate',
				'endDate', 'WBJBM' ];
		// 某一个委办局表的详细信息
		var oneWBJStoreFields = [ 'WBJJC', 'BHZMC', 'BM', 'ADDSUM',
				'startDate', 'endDate', 'WBJBM' ];
		// 查询结果数据
		resultStore = new Ext.data.JsonStore( {
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
			id : 'resultStore',
			url : listUrl,
			root : 'list',
			idProperty : 'ID',
			totalProperty : 'count',
			messageProperty : 'msg',
			fields : resultStoreFields
		// 定义默认以ADDSUM字段，降序排列
				// sortInfo : {field: "ADDSUM", direction: "DESC"}
				});

		// 一个委办局详情结果数据
		oneWBJStore = new Ext.data.JsonStore( {
			autoLoad : false,
//			 baseParams : {
//			 start : 0,
//			 pageSize : pageSize
//			 },
			successProperty : 'success',
			listeners : {
				exception : function(dataProxy, type, action, options,
						response, arg) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				},
				'load' : function(store, record, options) {
					/**
					 * 每次store加载(load事件)完后,遍历store,比较每条Record的主键列id是否在recordIds中,
					 * 若存在则将Record保存到临时变量records中,最后调用selMod.selectRecords(records,
					 * true).
					 */
					// var records = new Array();
				// resultStore.each(function(record) {
				// if (recordIds.contains(record.get('ID'))) {
				// records.push(record);
				// }
				// });
				// // 以后每次load数据时，都会默认选中
				// sm.selectRecords(records, true);
			}
			},
			id : 'oneWBJStore',
			url : infoUrl,
			//root : 'data',
			idProperty : 'ID',
			totalProperty : 'totalProperty',
			messageProperty : 'msg',
			fields : oneWBJStoreFields
		});
		// 首页查询框，查询结果显示的字段
		var resultCm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(),
				{
					header : "委办局",
					width : 10,
					dataIndex : 'WBJJC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "数据表总数(张)",
					width : 10,
					dataIndex : 'TABLECOUNT',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "新增数据总量(条)",
					width : 10,
					dataIndex : 'ADDSUM',
					renderer : formatQtip,
					sortable : true
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
					header : "新增详情",
					width : 5,
					dataIndex : 'WBJBM',
					renderer : renderOper,
					sortable : false
				} ]);
		// 查询详情结果显示的字段(一个委办局)
		var oneWBJCm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(),
				{
					header : "委办局",
					width : 10,
					dataIndex : 'WBJJC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "数据表名称",
					width : 10,
					dataIndex : 'BHZMC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "数据表表名",
					width : 10,
					dataIndex : 'BM',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "新增数据总量(条)",
					width : 10,
					dataIndex : 'ADDSUM',
					renderer : formatQtip,
					sortable : true
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
					header : "新增详情",
					width : 5,
					dataIndex : 'WBJBM',
					renderer : renderOper2,
					sortable : false
				} ]);

		// 格式化'数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
		function renderOper(value, metadata, record, rowIndex, colIndex, store) {
			var result;
			if (record.get('ADDSUM') != 0) {
				result = "<font color='blue'><a href='javascript:void(0)' onclick='showMore(\""
						+ record.get('WBJJC')
						+ "\", \""
						+ record.get('WBJBM')
						+ "\", \""
						+ record.get('TABLECOUNT')
						+ "\", \""
						+ record.get('startDate')
						+ "\", \""
						+ record.get('endDate') + "\");'>详&nbsp;情</a></font>";
			} else {
				result = "<font color='gray'><span>详&nbsp;情</span></font>";
			}
			return result;
		}

		// 格式化'一个月数据新增详情'列 --[value:单元格的数据值/metadata:单元格元数据]
		function renderOper2(value, metadata, record, rowIndex, colIndex, store) {
			var result;
			if (record.get('ADDSUM') != 0) {
				result = "<font color='blue'><a href='javascript:void(0)' onclick='showOneMonth(\""
						+ record.get('WBJBM')
						+ "\", \""
						+ record.get('WBJJC')
						+ "\", \""
						+ record.get('BHZMC')
						+ "\", \""
						+ record.get('BM') + "\");'>详&nbsp;情</a></font>";
			} else {
				result = "<font color='gray'><span>详&nbsp;情</span></font>";
			}
			return result;
		}

		// gridPanel求合功能插件
		var summary = new Ext.ux.grid.GridSummary();

		// 首页查询结果显示的列表
		resultTable = new Ext.grid.GridPanel( {
			id : 'resultTable',
			autoScroll : true,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			store : resultStore,
			//plugins : [ summary ],
			border : false, // 是否显示行的边框
			cm : resultCm,
			trackMouseOver : true,
			forceLayout : true,
			frame : false,
			autoWidth : true,
			//				height : 300,
			columnLines : true,
			stripeRows : true,
			viewConfig : {
				forceFit : true
			},
			// 如果要加顶部工具栏目或者分页工具栏，必须写
			// 分页栏
			bbar : new Ext.PagingToolbar( {
				pageSize : pageSize,
				store : resultStore,
				displayMsg : '显示{0}-{1}条,共{2}条',
				plugins: new Ext.ux.ProgressBarPager(),
				emptyMsy : '没有记录',
				displayInfo : true
			}),
		// 底部分页栏
				});

		// 一个委办局表查询结果显示的列表
		var oneWBJTable = new Ext.grid.GridPanel( {
			id : 'oneWBJTable',
			autoScroll : true,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			//	title : '委办局数据表详情',
			store : oneWBJStore,
			frame : false,
			cm : oneWBJCm,
			trackMouseOver : true,
			forceLayout : true,
			autoWidth : true,
			//				height : 300,
			columnLines : true,
			stripeRows : true,
			viewConfig : {
				forceFit : true
			}

		});

		// 信息概要表格双击事件
		//			resultTable.addListener('rowdblclick', rowdblclickFn);
		//			function rowdblclickFn(grid, rowindex, e) {
		//				// 获取委办局别名代号
		//				var record = grid.getSelectionModel().getSelected();
		//				if (record.get('ADDSUM') != 0) {
		//					showMore(record.get('WBJBM'), record.get('startDate'),
		//							record.get('endDate'));
		//				}
		//			}

		// 某个委办局详情 表格双击事件
		//			oneWBJTable.addListener('rowdblclick', rowdblclickFn2);
		//			function rowdblclickFn2(grid, rowindex, e) {
		//				// 获取委办局别名代号
		//				var record = grid.getSelectionModel().getSelected();
		//				if (record.get('ADDSUM') != 0) {
		//					showOneMonth(record.get('WBJBM'), record.get('WBJJC'),
		//							record.get('BHZMC'), record.get('BM'));
		//				}
		//			}

		/** ****************** '状态'-->下拉列表 ********************************** */
		// 定义ComboBox 的数据源,获取委办局的名称列表
		var WBnameStore = new Ext.data.JsonStore( { // 填充的数据
					url : REQUEST_URL_BASE + "wbjTableInfoHandler/getRootData",
					fields : new Ext.data.Record.create( [ 'wbjbm', 'wbjjc' ])
				});

		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		WBnameStore.on("load", function() {
			var PersonRecord = Ext.data.Record.create( [ {
				name : 'wbjbm',
				type : 'string'
			}, {
				name : 'wbjjc',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord( {
				wbjbm : '',
				wbjjc : '全部'
			});
			WBnameStore.insert(0, qb_record);
		});

		var comboWBname = new Ext.form.ComboBox( {
			store : WBnameStore,
			id : "comboWBname",
			anchor : anchorShow,
			valueField : "wbjbm",// 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : "wbjjc",// 下拉框显示内容
			forceSelection : true, // 值为true时将限定选中的值为列表中的值，值为false则允许用户将任意文本设置到字段
			blankText : '委办局名称不能为空',
			emptyText : '全 部 ',
			editable : false,
			triggerAction : 'all',// 显示所有下列数.必须指定为'all'
			typeAhead : true,
			allowBlank : true, // 是否允许为空
			name : 'wbjbm'// 作为form提交时传送的参数名
		});

		// 查询条件
		var queryFormItems = [ {
			layout : 'column',
			labelAlign : 'right',
			labelWidth : 70,
			style : 'margin-left: 140px;',
			items : [ {
				columnWidth : .3,
				layout : 'form',
				items : [ {
					fieldLabel : '委办局',
					layout : 'column',
					items : [ {
						items : [ comboWBname ]
					} ]
				} ]
			}, {
				columnWidth : .7,
				layout : 'form',
				items : [ {
					fieldLabel : '新增日期',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'starttime_date',
						id : 'starttime_date',
						altFormats : 'Y-m-d',
						editable : false,
						width : 110,
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
						width : 100,
						name : 'endtime_date',
						id : 'endtime_date',
						altFormats : 'Y-m-d',
						editable : false,
						format : 'Y-m-d',
						anchor : anchorShow
					} ]
				} ]
			} ]
		} ];

		var mainCard = new Ext.Panel( {
			id : 'mainCard',
			layout : 'card',
			activeItem : 0,
			// x:300,
			// y:50,
			// floating:true,
			titleCollapse : true,
			items : [ resultTable, oneWBJTable ]
		});

		// 卡片切换
		/*function changeCard() {
			oneWBJTable.setHeight(gridHeight);
			oneWBJTable.doLayout();
			//alert(gridHeight) ;
			mainCard.layout.setActiveItem(0);
		}*/

		// 数据详情弹出框，显示某一个委办局下的所有表及各个表的数据量详情。
		//			showMore = function(wbjbm, startDate, endDate) {
		//				if (!wbjbm) {
		//				} else {
		//					oneWBJStore.load({
		//						params : {
		//							wbjCode : wbjbm,
		//							starttime_date : startDate,
		//							endtime_date : endDate
		//						}
		//					});
		//					// center切换卡片
		//					mainCard.layout.setActiveItem(1);
		//				}
		//			};

		// 点击“新增数据详情”时触发
		showMore = function(wbjjc, wbjbm, tablecount, startDate, endDate) {

			// 重新建GridPanel和弹出窗口，以防止上次的数据有缓存。

			oneMonthTable3 = dynGridPanel('2', infoUrl, wbjbm, null, wbjbm,
					null, startDate, endDate, tablecount);

			newDetailWindow2();

			// 显示窗口
			detailWindow2.setTitle(wbjjc + "原始数据详情");

			detailWindow2.show().center();
		};

		// 点击“新增数据详情”时触发
		showOneMonth = function(wbjbm, wbjjc, bhzmc, bm) {

			// 重新建GridPanel和弹出窗口，以防止上次的数据有缓存。

			oneMonthTable2 = dynGridPanel('1', oneMonthUrl, wbjbm, bhzmc,
					wbjbm, bm, null, null, null);

			//creatGridPanel();
			newDetailWindow();
			//				oneMonthStore.load({
			//					params : {
			//						wbjCode : wbjbm,
			//						bm : bm
			//					}
			//				});
			// 显示窗口
			detailWindow.setTitle(bhzmc + "新增数据统计");
			//oneMonthTable.setTitle(bhzmc);
			detailWindow.show().center();
		};

		// 新建弹出的窗口
		function newDetailWindow2() {
			detailWindow2 = new Ext.Window( {
				title : '',
				layout : 'fit',
				width : 700,
				height : 450,
				closeAction : 'close', // *比较关键*
				// 关闭窗口时，窗口对也关闭，不保留，如果值为"hide"，则窗口对象是隐藏的，对象一直存在。
				autoScroll : true,
				plain : true,
				modal : true,
				resizable : true,
				items : [ oneMonthTable3 ]
			});
		}

		// 新建弹出的窗口
		function newDetailWindow() {
			detailWindow = new Ext.Window( {
				title : '',
				layout : 'fit',
				width : 500,
				height : 300,
				closeAction : 'close', // *比较关键*
				// 关闭窗口时，窗口对也关闭，不保留，如果值为"hide"，则窗口对象是隐藏的，对象一直存在。
				autoScroll : true,
				plain : true,
				modal : true,
				resizable : true,
				items : [ oneMonthTable2 ],
				listeners : {

					close : function() {
					//解除模态窗口
					detailWindow2.getEl().unmask();
			}
		}
			});

			//开启父窗口模态窗口
			detailWindow2.getEl().mask();
		}

		// 查询功能
		function queryFunc() {
			if (Ext.get('starttime_date').getValue() != ""
					&& Ext.get('endtime_date').getValue() != ""
					&& Ext.get('starttime_date').getValue() > Ext.get(
							'endtime_date').getValue()) {
				Ext.Msg.alert("错误提示", "开始时间不能大于结束时间！");
				return;
			}
			resultStore.baseParams = queryForm.getForm().getValues();
			resultStore.baseParams.wbjCode = Ext.getCmp('comboWBname')
					.getValue();
			Ext.apply(resultStore.baseParams, {
				start : 0,
				pageSize : pageSize
			});
			resultStore.load( {
				params : resultStore.baseParams
			});
			mainCard.layout.setActiveItem(0);
		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按时间段统计各委办局前置机数据库中新增记录总数,点击详情后,可查看各数据交换表每天新增数据记录总数.");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm", queryFormItems, queryFunc);
		// 根据ID获取组件。例如获取查询面板组件

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
			//oneWBJTable.setHeight(gridHeight);
			//oneWBJTable.doLayout();
			//alert(gridHeight) ;
			mainCard.layout.setActiveItem(0);
		}
		}, {
			xtype : 'tbseparator'
		} ];
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
//		setTbar(oneWBJTable, topToolbarItems);

		//			var formPanelCmp = new Ext.getCmp("queryForm");
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
		queryForm.addButton(formButton);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		//setPaging(resultTable);
		//setPaging(oneWBJTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("content_1", mainCard);

	});

//动态添加GridPanel
function dynGridPanel(flag, initUrl, initGridId, initTitle, wbjbm, bm,
		startDate, endDate, tablecount) {
	var resultStoreFields;

	if (flag == '1') {
		resultStoreFields = [ 'adddate', 'addcount' ];
	}

	if (flag == '2') {
		resultStoreFields = [ 'WBJJC', 'BHZMC', 'BM', 'ADDSUM', 'startDate',
				'endDate', 'WBJBM' ];
	}

	var propertysReader = new Ext.data.JsonReader( {
		totalProperty : 'count', // 记录总数
		messageProperty : 'msg',
		root : 'list' // Json中的列表数据根节点
	}, resultStoreFields);

	var gridStore = new Ext.data.Store( {
		autoLoad : true,
		url : initUrl,
		baseParams : {
			start : 0,
			limit : pageSize,
			wbjCode : wbjbm,
			bm : bm,
			starttime_date : startDate,
			endtime_date : endDate,
			tableCount : tablecount
		},
		reader : propertysReader,
		listeners : {
			scope : this,
			load : function() {
				// alert(gridStore.reader.jsonData)
		}
		}
	});

	var oneMonthCm;

	if (flag == '1') {
		oneMonthCm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(), {
			header : "新增日期",
			width : 4,
			dataIndex : 'adddate',
			sortable : true,
			renderer : renderOper3
		}, {
			header : "新增数据量（条）",
			width : 5,
			dataIndex : 'addcount',
			sortable : true
		} ]);

	}

	if (flag == '2') {
		oneMonthCm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(), {
			header : "委办局",
			width : 10,
			dataIndex : 'WBJJC',
			renderer : formatQtip,
			sortable : true
		}, {
			header : "数据表名称",
			width : 10,
			dataIndex : 'BHZMC',
			renderer : formatQtip,
			sortable : true
		}, {
			header : "数据表表名",
			width : 10,
			dataIndex : 'BM',
			renderer : formatQtip,
			sortable : true
		}, {
			header : "新增数据总量(条)",
			width : 10,
			dataIndex : 'ADDSUM',
			renderer : formatQtip,
			sortable : true
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
			header : "新增详情",
			width : 5,
			dataIndex : 'WBJBM',
			renderer : renderOper2,
			sortable : false
		} ]);

	}

	var dynGrid = new Ext.grid.GridPanel( {
		store : gridStore,
		cm : oneMonthCm,
		sm : new Ext.grid.RowSelectionModel( {
			singleSelect : true,
			listeners : {
				rowselect : function(sm, row, rec) {

				}
			}
		}),
		bbar : new Ext.PagingToolbar( {
			pageSize : pageSize,
			store : gridStore,
			displayMsg : '显示{0}-{1}条,共{2}条',
			plugins: new Ext.ux.ProgressBarPager(),
			emptyMsy : '没有记录',
			displayInfo : true
		}),
		viewConfig : {
			columnsText : '显示的列',
			scrollOffset : 20,
			sortAscText : '升序',
			sortDescText : '降序',
			forceFit : true
		},
		closeAction : 'hide',
		autoWidth : true,
		// autoHeight : true,
		// collapsible: true,
		// animCollapse: false,
		// iconCls: 'icon-news',
		id : initGridId,
		//title : initTitle,
		stripeRows : true,
		loadMask : true,
		autoExpandColumn : 2
	});

	// 格式化'一个月数据新增详情'列 --[value:单元格的数据值/metadata:单元格元数据]
	function renderOper2(value, metadata, record, rowIndex, colIndex, store) {
		var result;
		if (record.get('ADDSUM') != 0) {
			result = "<font color='blue'><a href='javascript:void(0)' onclick='showOneMonth(\""
					+ record.get('WBJBM')
					+ "\", \""
					+ record.get('WBJJC')
					+ "\", \""
					+ record.get('BHZMC')
					+ "\", \""
					+ record.get('BM') + "\");'>详&nbsp;情</a></font>";
		} else {
			result = "<font color='gray'><span>详&nbsp;情</span></font>";
		}
		return result;
	}

	//格式化日期
	function renderOper3(value, metadata, record, rowIndex, colIndex, store) {
		var returnStr = record.get('adddate');

		var retuenStr2 = new Date(returnStr).format("Y-m-d");

		return retuenStr2;
	}

	return dynGrid;
}