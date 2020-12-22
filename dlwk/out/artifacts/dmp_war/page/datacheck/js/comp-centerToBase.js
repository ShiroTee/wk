//动态生成表格字段
//分页栏目行数
// 各种参数
var queryForm;
var queryForm_centertobase;
// 各种链接
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
// 委办局下拉
var RootDataJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getRootData";
// 委办局表下拉
var tableNamesJsonStoreURL = REQUEST_URL_BASE
		+ "dataConfigHandler/getTableNameListByWBJ";
// 对账结果统计
var queryListUrl = REQUEST_URL_BASE
		+ "centerToBaseCompHandler/getCompareResult";
		var anchorShow='100%';

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
			// 查询所有或者 一个委办局表的全部对账信息
			var gridStoreFields_centertobase = [ 'WBJBM', 'WBJJC', 'BM',
					'BHZMC', 'SUPPLY', 'ACCEPT', 'DIFF', 'COMPAREDATE',
					'startDate', 'endDate' ];

			// 清洗结果统计表格
			var gridStore_centertobase = new Ext.data.JsonStore({
				id : 'gridStore_centertobase',
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
				fields : gridStoreFields_centertobase,
				// 定义默认以TABLECOUNT字段，降序排列
				sortInfo : {
					field : "DIFF",
					direction : "DESC"
				}
			});
// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
/*	function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}*/
			// 分页显示控件
			var pagingToolbar_centertobase = new Ext.PagingToolbar(
					{
						pageSize : pageSize,
						store : gridStore_centertobase,
						displayInfo : true,
						displayMsg : '<span style="padding-right: 150px;padding-left: 40px">显示记录 {0} - {1}条 &nbsp;&nbsp;总共 {2}条<span>',
						emptyMsg : '<span style="padding-right: 200px;padding-left: 40px">没有记录</span>'
					});

			var grid_centertobase = new Ext.grid.GridPanel({
				id : "grid_centertobase",
				store : gridStore_centertobase,
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
							header : "委办局别名",
							width : 5,
							dataIndex : 'WBJBM',
							renderer : formatQtip,
							sortable : true,
							hidden : true
						},
						{
							header : "委办局",
							width : 5,
							dataIndex : 'WBJJC',
							renderer : formatQtip,
							sortable : true
						},
						{
							header : "表名",
							width : 5,
							dataIndex : 'BM',
							renderer : formatQtip,
							sortable : true,
							hidden : true
						},
						{
							header : "表名",
							width : 10,
							dataIndex : 'BHZMC',
							renderer : formatQtip,
							sortable : true
						},
						{
							header : "提供数据总量（条）",
							width : 5,
							dataIndex : 'SUPPLY',
							renderer : formatQtip,
							sortable : true,
							hidden : false
						},
						{
							header : "入库数据总量(条)",
							width : 5,
							dataIndex : 'ACCEPT',
							renderer : formatQtip,
							sortable : true
						},
						{
							header : "对账日期",
							width : 5,
							dataIndex : 'COMPAREDATE',
							renderer : formatQtip,
							sortable : true
						},
						{
							header : "数据差异（条）",
							width : 5,
							dataIndex : 'DIFF',
							sortable : true,
							renderer : function(value, metadata, record,
									rowIndex, colIndex, store) {
								return "<span style='color:red;'>" + value
										+ "</span>";
							}
						}, {
							header : "查询日期起",
							width : 5,
							dataIndex : 'startDate',
							renderer : formatQtip,
							sortable : true,
							hidden : true
						}, {
							header : "查询日期止",
							width : 5,
							dataIndex : 'endDate',
							renderer : formatQtip,
							sortable : true,
							hidden : true
						} ]
			});

			// 格式化'异常数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
			function renderOper_centertobase(value, metadata, record, rowIndex,
					colIndex, store) {
				var result;
				if (record.get('FAILED') != 0) {
					result = "<font color='blue'><a href='javascript:void(0)' onclick='showMore_centertobase(\""
							+ record.get('DATARULECODE')
							+ "\", \""
							+ record.get('INSERTDATE')
							+ "\");'>异常数据详情</a></font>";
				} else {
					result = "<font color='gray'><span>异常数据详情</span></font>";
				}
				return result;
			}

			// 信息概要表格双击事件
			grid_centertobase.addListener('rowdblclick',
					rowdblclickFn_centertobase);
			function rowdblclickFn_centertobase(grid, rowindex, e) {
				// 获取委办局别名代号
				var record = grid.getSelectionModel().getSelected();
				// if (record.get('FAILED') != 0) {
				// showMore_centertobase(record.get('DATARULECODE'), record
				// .get('INSERTDATE'));
				// }
			}

			/*-----------------生成下拉列表------------------------------------------------*/
			var getRootDataJsonStore_centertobase = new Ext.data.JsonStore({ // 委办局填充的数据
				url : RootDataJsonStoreURL,
				fields : new Ext.data.Record.create(
						[ 'wbjCode', 'wbjShortName' ])
			});

			// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
			getRootDataJsonStore_centertobase.on("load", function() {
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
				getRootDataJsonStore_centertobase.insert(0, qb_record);
			});

			// 委办局下拉列表
			var comboAllWbj_centertobase = new Ext.form.ComboBox({
				store : getRootDataJsonStore_centertobase,
				listeners : {
					select : function(serviceInterfaceCombox, record, index) {
						// 首先清除之后的下拉列表内容
						tableNames_centertobase.clearValue();
						var combo1 = Ext.getCmp("comboAllWbj_centertobase");
						// 根据选择的委办局，获取此委办局下所有表
						var combo = Ext.getCmp("tableNames_centertobase");
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
				id : "comboAllWbj_centertobase",
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

			// 某委办局下所有表
			var tableNamesJsonStore_centertobase = new Ext.data.JsonStore({ // 委办局填充的数据
				url : tableNamesJsonStoreURL,
				fields : new Ext.data.Record.create([ 'tableNameEn',
						'tableNameZh' ])
			});

			// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
			tableNamesJsonStore_centertobase.on("load", function() {
				var PersonRecord2 = Ext.data.Record.create([ {
					name : 'tableNameEn',
					type : 'string'
				}, {
					name : 'tableNameZh',
					type : 'string'
				} ]);
				var qb_record2 = new PersonRecord2({
					tableNameEn : '',
					tableNameZh : '全部'
				});
				tableNamesJsonStore_centertobase.insert(0, qb_record2);
			});

			// 委办局表名下拉列表
			var tableNames_centertobase = new Ext.form.ComboBox({
				store : tableNamesJsonStore_centertobase,
				valueField : "tableNameEn",
				displayField : "tableNameZh",
				mode : 'local',
				forceSelection : true,
				id : "tableNames_centertobase",
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

			// 查询各条件 面板
		var queryCodeFormItems_centertobase = [
		{
			layout : 'column',
			style : 'margin-left: 60px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .25,
				layout : 'form',
				items : [comboAllWbj_centertobase]
			},
			{
				columnWidth : .25,
				layout : 'form',
				items : [tableNames_centertobase]
			},{
				columnWidth : .5,
				layout : 'column',
				items : [ {
					labelWidth : 60,
					layout : 'form',
					items :
					[
						{
							xtype : 'label',
							fieldLabel : '对账日期'
						}
					]
				},{
					xtype : 'datefield',
					fieldLabel : '',
					name : 'starttime_date',
					id : 'starttime_date_centertobase',
					altFormats : 'Y-m-d',
					format : 'Y-m-d',
					width : 110,
					editable:false,
					anchor : anchorShow
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
					name : 'endtime_date',
					id : 'endtime_date_centertobase',
					altFormats : 'Y-m-d',
					editable:false,
					width : 110,
					format : 'Y-m-d',// 用以覆盖本地化的默认日期格式化字串
					anchor : anchorShow
				} ]
			}
			]
		}];


			// 点击查询按钮。点击重置按钮对数据进行重置
//			queryForm_centertobase = new Ext.FormPanel({
//				id : 'queryForm_centertobase',
//				monitorResize : true,
//				region : 'north',
//				labelAlign : 'left',
//				buttonAlign : 'center',
//				collapsible : true,
//				titleCollapse : true,
//				frame : true,
//				// 设置表单模块的样式
//				bodyStyle : "margin-top: 10px;",
//				title : '查询条件',
//				autoWidth : true,
//				autoHeight : true,
//				items : queryCodeFormItems_centertobase,
//				buttons : [],
//				keys : [ { // 处理键盘回车事件
//					key : Ext.EventObject.ENTER,
//					fn : queryFunc_centertobase,
//					scope : this
//				} ]
//			});
			
			// 查询功能
			function queryFunc_centertobase() {
				if(Ext.get('starttime_date_centertobase').getValue()!="" && Ext.get('endtime_date_centertobase').getValue()!="" && Ext.get('starttime_date_centertobase').getValue()>Ext.get('endtime_date_centertobase').getValue()){
					Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
					return;
				}
				gridStore_centertobase.baseParams = queryForm.getForm().getValues();
				Ext.apply(gridStore_centertobase.baseParams, {
					start : 0,
					pageSize : pageSize
				});
				gridStore_centertobase.load({
					params : gridStore_centertobase.baseParams
				});
			}
			/** *****以下为注册各页面组件方法******************************* */
			// 提示标签提示的内容;
			setTip("按时间段统计显示中心前置和基础库数据对帐的结果,如果数据有较大差异,用红色字体显示,差异较小用蓝色字体显示.");
			// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
			queryForm = setQueryForm("queryForm_centertobase", queryCodeFormItems_centertobase, queryFunc_centertobase);
			// 查询面板中的按钮组
			var formButton = [ {
				text : '查询',
				iconCls : 'icon_query',
				handler : function() {
					queryFunc_centertobase();
				}
			},
			{
				text : '重置',
				iconCls : 'icon_reset',
				handler : function() {
					queryForm.getForm().reset();
				}
			} ];
			// 将定义的按钮组放入获取的面板中，如：放入查询面板中
			queryForm.addButton(formButton);
			// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
//			setTbar(grid,topToolbarItems);
			// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
			setPaging(grid_centertobase);
			// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
			setMainPanel("content_6", grid_centertobase);
		});
