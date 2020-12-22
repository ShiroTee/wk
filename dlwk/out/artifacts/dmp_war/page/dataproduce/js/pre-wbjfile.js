// 各种参数
var queryForm_wbjFile;
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
var listUrl = REQUEST_URL_BASE + "wbjFileInfoHandler/getWBJFileInfo";
var infoUrl = REQUEST_URL_BASE + "wbjFileInfoHandler/getOneFileInfo";
var oneMonthUrl = REQUEST_URL_BASE + "wbjFileInfoHandler/getOneMonthAdd";
var addUrl = "";
var oneMonthTable;
var pageSize = 18;


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
		var resultStoreFields_wbjFile = [ 'WBJJC', 'FILECOUNT', 'RECORDS',
				'FILESIZECOUNT', 'startDate', 'endDate', 'WBJBM' ];
		// 某一个委办局表的详细信息
		var oneWBJStoreFields_wbjFile = [ 'ADDDATE', 'WBJJC', 'FILENAME',
				'FILETYPE', 'FILEDESC', 'BHZMC', 'RECORDS', 'FILESIZE',
				'startDate', 'endDate', 'WBJBM' ];
		// 查询结果数据
		resultStore_wbjFile = new Ext.data.JsonStore( {
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
			id : 'resultStore_wbjFile',
			url : listUrl,
			root : 'list',
			idProperty : 'ID',
			totalProperty : 'count',
			messageProperty : 'msg',
			fields : resultStoreFields_wbjFile,
			//定义默认以TABLECOUNT字段，降序排列
			sortInfo : {
				field : "FILECOUNT",
				direction : "DESC"
			}
		});
		// 一个委办局详情结果数据
		oneWBJStore_wbjFile = new Ext.data.JsonStore( {
			autoLoad : false,
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
			id : 'oneWBJStore_wbjFile',
			url : infoUrl,
			//root : 'data',
			idProperty : 'ID',
			totalProperty : 'totalProperty',
			messageProperty : 'msg',
			fields : oneWBJStoreFields_wbjFile,
			//定义默认以ADDDATE字段排序
			sortInfo : {
				field : "ADDDATE",
				direction : "DESC"
			}
		});

		var resultCm_wbjFile = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer(), {
					header : "委办局",
					width : 10,
					dataIndex : 'WBJJC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "文件总数(个)",
					width : 10,
					dataIndex : 'FILECOUNT',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "全部文件数据记录总量(条)",
					width : 10,
					dataIndex : 'RECORDS',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "文件总大小(K)",
					width : 10,
					dataIndex : 'FILESIZECOUNT',
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
					renderer : formatQtip,
					width : 10,
					dataIndex : 'endDate',
					sortable : true,
					hidden : true
				}, {
					header : "记录总量详情",
					width : 5,
					dataIndex : 'WBJBM',
					renderer : renderOper_wbjFile,
					sortable : false
				} ]);
		// 查询详情结果显示的字段(一个委办局)
		var oneWBJCm_wbjFile = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer(), {
					header : "委办局",
					width : 5,
					dataIndex : 'WBJJC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "文件名",
					renderer : formatQtip,
					width : 10,
					dataIndex : 'FILENAME',
					sortable : true
				}, {
					header : "文件描述",
					width : 10,
					dataIndex : 'FILEDESC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "对应数据表",
					width : 10,
					dataIndex : 'BHZMC',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "数据总数",
					width : 5,
					dataIndex : 'RECORDS',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "文件大小(K)",
					width : 5,
					dataIndex : 'FILESIZE',
					renderer : formatQtip,
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
					header : "文件类型",
					width : 5,
					dataIndex : 'FILETYPE',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "上传日期",
					width : 8,
					dataIndex : 'ADDDATE',
					renderer : formatQtip,
					sortable : true
				} ]);

		// 格式化'数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
		function renderOper_wbjFile(value, metadata, record, rowIndex,
				colIndex, store) {
			var result;
			if (record.get('FILECOUNT') != 0) {
				result = "<font color='blue'><a href='javascript:void(0)' onclick='showMore_wbjFile(\""
						+ record.get('WBJJC')
						+ "\", \""
						+ record.get('WBJBM')
						+ "\", \""
						+ record.get('FILECOUNT')
						+ "\", \""
						+ record.get('startDate')
						+ "\", \""
						+ record.get('endDate') + "\");'>详&nbsp;情</a></font>";
			} else {
				result = "<font color='gray'><span>详&nbsp;情</span></font>";
			}
			return result;
		}

		//gridPanel求合功能插件
		var summary = new Ext.ux.grid.GridSummary();

		// 首页查询结果显示的列表
		resultTable_wbjFile = new Ext.grid.GridPanel( {
			id : 'resultTable_wbjFile',
			autoScroll : false,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			store : resultStore_wbjFile,
			//plugins: [summary],
			border : false, // 是否显示行的边框
			cm : resultCm_wbjFile,
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
			// 分页栏
			bbar : new Ext.PagingToolbar( {
				pageSize : pageSize,
				store : resultStore_wbjFile,
				displayMsg : '显示{0}-{1}条,共{2}条',
				plugins: new Ext.ux.ProgressBarPager(),
				emptyMsy : '没有记录',
				displayInfo : true
			}),
		});

		// 一个委办局表查询结果显示的列表
		oneWBJTable_wbjFile = new Ext.grid.GridPanel( {
			id : 'oneWBJTable_wbjFile',
			autoScroll : false,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			//title : '委办局文件表详情',
			store : oneWBJStore_wbjFile,
			cm : oneWBJCm_wbjFile,
			trackMouseOver : true,
			forceLayout : true,
			frame : false,
			autoWidth : true,
			//				height : 300,
			columnLines : true,
			stripeRows : true,
			viewConfig : {
				forceFit : true
			}
		/*buttons : [ {
			text : '返回',
			handler : changeCard_wbjFile
		} ]*/
		});

		// 信息概要表格双击事件
		//			resultTable_wbjFile.addListener('rowdblclick', rowdblclickFn_wbjFile);
		//			function rowdblclickFn_wbjFile(grid, rowindex, e) {
		//				// 获取委办局别名代号
		//				var record = grid.getSelectionModel().getSelected();
		//				if(record.get('FILECOUNT') != 0){
		//					showMore_wbjFile(record.get('WBJBM'), record.get('startDate'), record.get('endDate'));
		//				}
		//			}

		/** ****************** '状态'-->下拉列表 ***********************************/
		// 定义ComboBox 的数据源,获取委办局的名称列表
		var WBnameStore_wbjFile = new Ext.data.JsonStore( { // 填充的数据
					url : REQUEST_URL_BASE + "wbjFileInfoHandler/getRootData",
					fields : new Ext.data.Record.create( [ 'wbjbm', 'wbjjc' ])
				});

		// 当下拉列表加载完毕后，将“全部”下拉项装载到下拉列表第一项。
		WBnameStore_wbjFile.on("load", function() {
			var PersonRecord_wbjFile = Ext.data.Record.create( [ {
				name : 'wbjbm',
				type : 'string'
			}, {
				name : 'wbjjc',
				type : 'string'
			} ]);
			var qb_record_wbjFile = new PersonRecord_wbjFile( {
				wbjbm : '',
				wbjjc : '全部'
			});
			WBnameStore_wbjFile.insert(0, qb_record_wbjFile);
		});

		var comboWBname_wbjFile = new Ext.form.ComboBox( {
			store : WBnameStore_wbjFile,
			id : "comboWBname_wbjFile",
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
		var queryFormItems_wbjFile = [ {
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
						items : [ comboWBname_wbjFile ]
					} ]
				} ]
			}, {
				columnWidth : .7,
				layout : 'form',
				items : [ {
					fieldLabel : '上传日期',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						width : 100,
						name : 'starttime_date',
						id : 'starttime_date_wbjFile',
						altFormats : 'Y-m-d',
						editable : false,
						format : 'Y-m-d',
						anchor : anchorShow
					}, {
						layout : 'form',
						labelWidth : 17,
						labelSeparator : ' ',
						labelAlign : 'center',
						items : [ {
							xtype : 'label',
							fieldLabel : '至'
						} ]
					}, {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'endtime_date',
						id : 'endtime_date_wbjFile',
						altFormats : 'Y-m-d',
						editable : false,
						width : 100,
						format : 'Y-m-d',
						anchor : anchorShow
					} ]
				} ]
			} ]
		} ];

		var mainCard_wbjFile = new Ext.Panel( {
			id : 'mainCard',
			layout : 'card',
			activeItem : 0,
			autoWidth : true,
			// x:300,
			// y:50,
			// floating:true,
			titleCollapse : true,
			autoHeight : true,
			items : [ resultTable_wbjFile, oneWBJTable_wbjFile ]
		});

		// 卡片切换
		//function changeCard_wbjFile() {
		//mainCard_wbjFile.layout.setActiveItem(0);
		//}

		// 数据详情表格，显示某一个委办局下的所有表及各个表的数据量详情。
		showMore_wbjFile = function(wbjjc, wbjbm, tablecount, startDate,
				endDate) {

			// 重新建GridPanel和弹出窗口，以防止上次的数据有缓存。
			oneMonthTable = dynGridPanel(infoUrl, wbjbm, null, wbjbm, null,
					startDate, endDate, tablecount);

			newDetailWindow();

			// 显示窗口
			detailWindow.setTitle(wbjjc + "原始文件详情");

			detailWindow.show().center();

			//				if (!wbjbm) {
			//				} else {
			//					oneWBJStore_wbjFile.load({
			//						params : {
			//							wbjCode : wbjbm,
			//							starttime_date : startDate,
			//							endtime_date : endDate
			//						}
			//					});
			//					// center切换卡片
			//					mainCard_wbjFile.layout.setActiveItem(1);
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

		/** *************************功能集合********************** */
		// 查询功能
		function queryFunc_wbjFile() {
			if (Ext.get('starttime_date_wbjFile').getValue() != ""
					&& Ext.get('endtime_date_wbjFile').getValue() != ""
					&& Ext.get('starttime_date_wbjFile').getValue() > Ext.get(
							'endtime_date_wbjFile').getValue()) {
				Ext.Msg.alert("错误提示", "开始时间不能大于结束时间！");
				return;
			}
			resultStore_wbjFile.baseParams = queryForm_wbjFile.getForm()
					.getValues();
			resultStore_wbjFile.baseParams.wbjCode = Ext.getCmp(
					'comboWBname_wbjFile').getValue();
			Ext.apply(resultStore_wbjFile.baseParams, {
				start : 0,
				pageSize : pageSize
			});
			resultStore_wbjFile.load( {
				params : resultStore_wbjFile.baseParams
			});
			//从Store中清空所有Record对象，并触发clear事件。
			//				oneWBJStore_wbjFile.removeAll() ;
			mainCard_wbjFile.layout.setActiveItem(0);
		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按时间段统计各委办局前置机中新增数据交换文件总个数,总记录数等.点击详情后,可查看各数据交换文件名、记录数、文件大小及文件类型.");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm_wbjFile = setQueryForm("queryForm_wbjFile",
				queryFormItems_wbjFile, queryFunc_wbjFile);

		//定义工具栏的元素组
		var topToolbarItems = [ {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : '返&nbsp;回',
			iconCls : 'icon_back',
			disabled : false,
			handler : function() {
				mainCard_wbjFile.layout.setActiveItem(0);
			}
		}, {
			xtype : 'tbseparator'
		} ];
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		//setTbar(oneWBJTable_wbjFile, topToolbarItems);

		// 根据ID获取组件。例如获取查询面板组件
		//			var formPanelCmp = new Ext.getCmp("queryForm_wbjFile");
		// 查询面板中的按钮组
		var formButton = [ {
			text : '查询',
			iconCls : 'icon_query',
			handler : function() {
				queryFunc_wbjFile();
			}
		}, {
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				queryForm_wbjFile.getForm().reset();
			}
		} ];
		// 将定义的按钮组放入获取的面板中，如：放入查询面板中
		queryForm_wbjFile.addButton(formButton);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		//setPaging(resultTable_wbjFile);
		//setPaging(oneWBJTable_wbjFile);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("content_3", mainCard_wbjFile);

	});

//动态添加GridPanel
function dynGridPanel(initUrl, initGridId, initTitle, wbjbm, bm, startDate,
		endDate, tablecount) {

	var resultStoreFields = [ 'ADDDATE', 'WBJJC', 'FILENAME', 'FILETYPE',
			'FILEDESC', 'BHZMC', 'RECORDS', 'FILESIZE', 'startDate', 'endDate',
			'WBJBM' ];

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

	var oneMonthCm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(), {
		header : "委办局",
		width : 5,
		dataIndex : 'WBJJC',
		renderer : formatQtip,
		sortable : true
	}, {
		header : "文件名",
		renderer : formatQtip,
		width : 10,
		dataIndex : 'FILENAME',
		sortable : true
	}, {
		header : "文件描述",
		width : 10,
		dataIndex : 'FILEDESC',
		renderer : formatQtip,
		sortable : true
	}, {
		header : "对应数据表",
		width : 10,
		dataIndex : 'BHZMC',
		renderer : formatQtip,
		sortable : true
	}, {
		header : "数据总数",
		width : 5,
		dataIndex : 'RECORDS',
		renderer : formatQtip,
		sortable : true
	}, {
		header : "文件大小(K)",
		width : 5,
		dataIndex : 'FILESIZE',
		renderer : formatQtip,
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
		header : "文件类型",
		width : 5,
		dataIndex : 'FILETYPE',
		renderer : formatQtip,
		sortable : true
	}, {
		header : "上传日期",
		width : 8,
		dataIndex : 'ADDDATE',
		renderer : formatQtip,
		sortable : true
	} ]);

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
		title : initTitle,
		stripeRows : true,
		loadMask : true,
		autoExpandColumn : 2
	});

	return dynGrid;
}
