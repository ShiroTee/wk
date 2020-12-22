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
var REQUEST_URL_BASE = PROJECT_ROOT + "/app/http/dmp/";
var listUrl = REQUEST_URL_BASE + "centerTableInfoHandler/getWBJTableInfo";
var infoUrl = REQUEST_URL_BASE + "centerTableInfoHandler/getOneTableInfo";
var oneMonthUrl = REQUEST_URL_BASE + "centerTableInfoHandler/getOneMonthAdd";
var addUrl = "";
var anchorShow = '100%';
var oneMonthTable;
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
		var resultStoreFields_center = [ 'WBJJC', 'TABLECOUNT', 'ADDSUM',
				'startDate', 'endDate', 'WBJBM' ];

		// 查询结果数据
		resultStore_center = new Ext.data.JsonStore( {
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
			id : 'resultStore_center',
			url : listUrl,
			root : 'list',
			idProperty : 'ID',
			totalProperty : 'count',
			messageProperty : 'msg',
			fields : resultStoreFields_center
		// 定义默认以TABLECOUNT字段，降序排列
				//				sortInfo : {
				//					field : "ADDSUM",
				//					direction : "DESC"
				//				}
				});

		// 首页查询框，查询结果显示的字段
		var resultCm_center = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer(), {
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
					header : "数据总量(条)",
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
					renderer : renderOper_center,
					sortable : false
				} ]);

		// 格式化'数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
		function renderOper_center(value, metadata, record, rowIndex, colIndex,
				store) {
			var result;
			if (record.get('ADDSUM') != 0) {
				result = "<font color='blue'><a href='javascript:void(0)' onclick='showMore_center(\""
						+ record.get('WBJJC')
						+ "\", \""
						+ record.get('TABLECOUNT')
						+ "\", \""
						+ record.get('WBJBM')
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
		function renderOper2_center(value, metadata, record, rowIndex,
				colIndex, store) {
			var result;
			if (record.get('ADDSUM') != 0) {
				result = "<font color='blue'><a href='javascript:void(0)' onclick='showOneMonth_center(\""
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

		// 首页查询结果显示的列表
		resultTable_center = new Ext.grid.GridPanel( {
			id : 'resultTable_center',
			autoScroll : true,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			//				title : '中心前置数据表信息统计',
			store : resultStore_center,
			border : false, // 是否显示行的边框
			cm : resultCm_center,
			trackMouseOver : true,
			forceLayout : true,
			frame : false,
			autoWidth : true,
			columnLines : true,
			stripeRows : true,
			viewConfig : {
				forceFit : true
			},
			// 分页栏
			bbar : []
		});

		// 信息概要表格双击事件
		//			resultTable_center.addListener('rowdblclick', rowdblclickFn_center);
		//			function rowdblclickFn_center(grid, rowindex, e) {
		//				// 获取委办局别名代号
		//				var record = grid.getSelectionModel().getSelected();
		//				if (record.get('ADDSUM') != 0) {
		//					showMore_center(record.get('WBJBM'), record
		//							.get('startDate'), record.get('endDate'));
		//				}
		//			}

		// 信息概要表格双击事件
		//			oneWBJTable_center
		//					.addListener('rowdblclick', rowdblclickFn2_center);
		//			function rowdblclickFn2_center(grid, rowindex, e) {
		//				// 获取委办局别名代号
		//				var record = grid.getSelectionModel().getSelected();
		//				if (record.get('ADDSUM') != 0) {
		//					showOneMonth_center(record.get('WBJBM'), record
		//							.get('WBJJC'), record.get('BHZMC'), record
		//							.get('BM'));
		//				}
		//			}

		/** ****************** '状态'-->下拉列表 ********************************** */
		// 定义ComboBox 的数据源,获取委办局的名称列表
		var WBnameStore_center = new Ext.data.JsonStore( { // 填充的数据
					url : REQUEST_URL_BASE + "dataConfigHandler/getRootData",
					fields : new Ext.data.Record.create( [ 'wbjCode',
							'wbjShortName' ])
				});

		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		WBnameStore_center.on("load", function() {
			var PersonRecord_center = Ext.data.Record.create( [ {
				name : 'wbjCode',
				type : 'string'
			}, {
				name : 'wbjShortName',
				type : 'string'
			} ]);
			var qb_record_center = new PersonRecord_center( {
				wbjCode : '',
				wbjShortName : '全部'
			});
			WBnameStore_center.insert(0, qb_record_center);
		});

		var comboWBname_center = new Ext.form.ComboBox( {
			store : WBnameStore_center,
			id : "comboWBname_center",
			anchor : anchorShow,
			valueField : "wbjCode",// 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : "wbjShortName",// 下拉框显示内容
			forceSelection : true, // 值为true时将限定选中的值为列表中的值，值为false则允许用户将任意文本设置到字段
			blankText : '委办局名称不能为空',
			emptyText : '全 部 ',
			editable : false,
			triggerAction : 'all',// 显示所有下列数.必须指定为'all'
			typeAhead : true,
			allowBlank : true, // 是否允许为空
			name : 'wbjCode'// 作为form提交时传送的参数名
		});

		// 查询条件
		var queryFormItems_center = [ {
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
						items : [ comboWBname_center ]
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
						id : 'starttime_date_center',
						altFormats : 'Y-m-d',
						editable : false,
						width : 100,
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
						id : 'endtime_date_center',
						altFormats : 'Y-m-d',
						editable : false,
						width : 100,
						format : 'Y-m-d',
						anchor : anchorShow
					} ]
				} ]
			} ]
		} ];
		var mainCard_center = new Ext.Panel( {
			id : 'mainCard_center',
			layout : 'card',
			activeItem : 0,
			autoWidth : true,
			// x:300,
			// y:50,
			// floating:true,
			titleCollapse : true,
			items : [ resultTable_center ]
		});

		// 卡片切换
		/*	function changeCard_center() {
				mainCard_center.layout.setActiveItem(0);
			}*/

		// 数据详情弹出框，显示某一个委办局下的所有表及各个表的数据量详情。
		showMore_center = function(wbjjc, tablecount, wbjbm, startDate, endDate) {
			//				if (!wbjbm) {
			//				} else {
			//					
			//					creatGridPanel_center1();
			//					
			//					oneWBJStore_center.load({
			//						params : {
			//							wbjCode : wbjbm,
			//							starttime_date : startDate,
			//							endtime_date : endDate
			//						}
			//					});

			creatGridPanel_center1(tablecount, wbjbm, startDate, endDate);

			// center切换卡片
			//mainCard_center.layout.setActiveItem(1);

			oneMonthTable = oneWBJTable_center;

			newDetailWindow();

			// 显示窗口
			detailWindow.setTitle(wbjjc + "数据抽取详情");

			detailWindow.show().center();
			//				}
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

		function creatGridPanel_center1(tablecount, wbjbm, startDate, endDate) {
			// 弹出窗口里的表格
			var oneWBJStoreFields_center = [ 'WBJJC', 'BHZMC', 'BM', 'ADDSUM',
					'startDate', 'endDate', 'WBJBM' ];

			// 一个委办局详情结果数据
			oneWBJStore_center = new Ext.data.JsonStore( {
				autoLoad : true,
				successProperty : 'success',
				baseParams : {
					wbjCode : wbjbm,
					starttime_date : startDate,
					endtime_date : endDate,
					tableCount : tablecount
				},
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
					}
				},
				id : 'oneWBJStore_center',
				url : infoUrl,
				// root : 'data',
				idProperty : 'ID',
				totalProperty : 'totalProperty',
				messageProperty : 'msg',
				fields : oneWBJStoreFields_center
			});

			// 分页显示控件
			var errorInfoToolbar_dataclean = new Ext.PagingToolbar( {
				pageSize : pageSize,
				store : oneWBJStore_center,
				displayMsg : '显示{0}-{1}条,共{2}条',
				plugins: new Ext.ux.ProgressBarPager(),
				emptyMsy : '没有记录',
				displayInfo : true
			});

			// 查询详情结果显示的字段(一个委办局)
			var oneWBJCm_center = new Ext.grid.ColumnModel( [
					new Ext.grid.RowNumberer(), {
						header : "委办局",
						width : 10,
						dataIndex : 'WBJJC',
						renderer : formatQtip,
						sortable : true
					}, {
						header : "数据表名称",
						renderer : formatQtip,
						width : 10,
						dataIndex : 'BHZMC',
						sortable : true
					}, {
						header : "数据表表名",
						renderer : formatQtip,
						width : 10,
						dataIndex : 'BM',
						sortable : true
					}, {
						header : "新增数据总量(条)",
						renderer : formatQtip,
						width : 10,
						dataIndex : 'ADDSUM',
						sortable : true
					}, {
						header : "查询日期起",
						renderer : formatQtip,
						width : 10,
						dataIndex : 'startDate',
						sortable : true,
						hidden : true
					}, {
						header : "查询日期止",
						renderer : formatQtip,
						width : 10,
						dataIndex : 'endDate',
						sortable : true,
						hidden : true
					}, {
						header : "新增详情",
						width : 5,
						dataIndex : 'WBJBM',
						renderer : renderOper2_center,
						sortable : false
					} ]);

			// 一个委办局表查询结果显示的列表
			oneWBJTable_center = new Ext.grid.GridPanel( {
				id : 'oneWBJTable_center',
				autoScroll : true,
				loadMask : true,
				buttonAlign : 'center',
				monitorResize : true,
				region : 'center',
				// title : '中心前置数据表详情',
				store : oneWBJStore_center,
				// border : false, // 是否显示行的边框
				cm : oneWBJCm_center,
				trackMouseOver : true,
				forceLayout : true,
				frame : false,
				autoWidth : true,
				columnLines : true,
				stripeRows : true,
				// bbar : [],
				viewConfig : {
					forceFit : true
				},
				tbar : [],
				/*
				 * buttons : [ { text : '返回', handler : changeCard_center } ]
				 */
				// 分页栏
				bbar : errorInfoToolbar_dataclean
			});
		}

		function creatGridPanel_center(wbjbm,bm) {
			// 弹出窗口里的表格
			var oneMonthStoreFields_center = [ 'ADDDATE', 'ADDCOUNT' ];
			oneMonthStore_center = new Ext.data.JsonStore( {
				autoLoad : true,
				successProperty : 'success',
				baseParams : {
				wbjCode : wbjbm,
				bm : bm
				},
				listeners : {
					exception : function(dataProxy, type, action, options,
							response, arg) {
						var o = Ext.util.JSON.decode(response.responseText);
						if (!o.success) {
							Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
						}
					}
				},
				id : 'oneMonthStore_center',
				url : oneMonthUrl,
				//root : 'data',
				idProperty : 'ID',
				totalProperty : 'totalProperty',
				messageProperty : 'msg',
				fields : oneMonthStoreFields_center
			});
			
			
			
			// 分页显示控件
			var errorInfoToolbar_dataadd = new Ext.PagingToolbar( {
				pageSize : pageSize,
				store : oneMonthStore_center,
				displayMsg : '显示{0}-{1}条,共{2}条',
				plugins: new Ext.ux.ProgressBarPager(),
				emptyMsy : '没有记录',
				displayInfo : true
			});

			var oneMonthCm_center = new Ext.grid.ColumnModel( [
					new Ext.grid.RowNumberer(), {
						header : "新增日期",
						width : 4,
						dataIndex : 'ADDDATE',
						sortable : true
					}, {
						header : "新增数据量(条)",
						width : 6,
						dataIndex : 'ADDCOUNT',
						sortable : true
					} ]);

			oneMonthTable_center = new Ext.grid.GridPanel( {
				id : 'oneMonthTable_center',
				autoScroll : false,
				loadMask : true,
				buttonAlign : 'center',
				monitorResize : true,
				region : 'center',
				//title : '新增数据统计',
				store : oneMonthStore_center,
				border : false, // 是否显示行的边框
				cm : oneMonthCm_center,
				trackMouseOver : true,
				forceLayout : true,
				frame : true,
				autoWidth : true,
				height : 500,
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				bbar : errorInfoToolbar_dataadd
			});
		}

		// 新建弹出的窗口
		function newDetailWindow_center() {
			detailWindow_center = new Ext.Window( {
				title : '',
				layout : 'fit',
				width : 500,
				height : 300,
				closeAction : 'close', // *比较关键*
				// 关闭窗口时，窗口对也关闭，不保留，如果值为"hide"，则窗口对象是隐藏的，对象一直存在。
				autoScroll : false,
				plain : true,
				modal : true,
				resizable : true,
				items : [ oneMonthTable_center ],
				listeners : {

					close : function() {
						// 解除模态窗口
				detailWindow.getEl().unmask();
			}
		}
			});
		}

		// 点击“新增数据详情”时触发
		showOneMonth_center = function(wbjbm, wbjjc, bhzmc, bm) {
			// 重新建GridPanel和弹出窗口，以防止上次的数据有缓存。
			creatGridPanel_center(wbjbm,bm);
			newDetailWindow_center();
//			oneMonthStore_center.load( {
//				params : {
//					wbjCode : wbjbm,
//					bm : bm
//				}
//			});
			// 显示窗口
			detailWindow_center.setTitle(bhzmc + "新增数据统计");
			//oneMonthTable_center.setTitle(bhzmc);
			detailWindow_center.show().center();
			
			//开启父窗口模态窗口
			detailWindow.getEl().mask();
		};

		/** *************************功能集合********************** */
		// 查询功能
		function queryFunc_center() {
			if (Ext.get('starttime_date_center').getValue() != ""
					&& Ext.get('endtime_date_center').getValue() != ""
					&& Ext.get('starttime_date_center').getValue() > Ext.get(
							'endtime_date_center').getValue()) {
				Ext.Msg.alert("错误提示", "开始时间不能大于结束时间！");
				return;
			}
			resultStore_center.baseParams = queryForm.getForm().getValues();
			resultStore_center.baseParams.wbjCode = Ext.getCmp(
					'comboWBname_center').getValue();
			Ext.apply(resultStore_center.baseParams, {
				start : 0,
				pageSize : pageSize
			});
			resultStore_center.load( {
				params : resultStore_center.baseParams
			});
			mainCard_center.layout.setActiveItem(0);
		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按时间段统计中心前置数据库中各委办局新增记录总数,点击详情后,可查看中心前置库中各数据交换表每天新增数据记录总数.");

		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm_center", queryFormItems_center,
				queryFunc_center);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryForm_center");
		// 查询面板中的按钮组
		var formButton = [ {
			text : '查询',
			iconCls : 'icon_query',
			handler : function() {
				queryFunc_center();
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
		setPaging(resultTable_center);
		//			setPaging(oneWBJTable_center);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("content_2", mainCard_center);
	});
