// 每页显示行数
//var pageSize = 20;
// 各种参数
var queryForm;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT + "/app/http/dmp/";
var queryListUrl = REQUEST_URL_BASE + "dataConfigHandler/getDataConfigList";
var deleteUrl = REQUEST_URL_BASE + "dataConfigHandler/delDataConfig";
var addUrl = "";
// 创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorShow='90%';

var exceCodeManagerInfoWin;
var updateCodeManagerInfoWin


Ext
		.onReady(function() {
			var toolbar = new Ext.Toolbar({
				height : 30,
				id : Math.random() + ""
			});
			// 按钮数
			toolbar.addButton(new Ext.Button({
				text : "添加",
				iconCls : 'icon_add',
				handler : addData
			}));
			toolbar.addButton(new Ext.Button({
				text : "编辑",
				iconCls : 'icon_edit',
				handler : updateData
			}));
			toolbar.addButton(new Ext.Button({
				text : "删除",
				iconCls : 'icon_delete',
				handler : delData
			}));
			toolbar.addButton(new Ext.Button({
				text : "查看",
			iconCls : 'icon_lookup',
			handler : selectData
			}));
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
	
	var gridStore = new Ext.data.Store( {
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options, response,
					arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			} 
		},
				reader : new Ext.data.JsonReader({
					totalProperty : "count",
					root : "list"
				}, Ext.data.Record.create([ {
					name : 'id'
				}, {
					name : 'name'
				}, {
					name : 'dataSource'
				}, {
					name : 'tableName'
				}, {
					name : 'columnName'
				}, {
					name : 'dataRuleType'
				}, {
					name : 'dataRuleName'
				}, {
					name : 'dataRuleCode'
				} ])),
				proxy : new Ext.data.HttpProxy({
					url : queryListUrl
				})
			});
		this.sm=new Ext.grid.CheckboxSelectionModel(
            {
        listeners:{
        'rowdeselect': function(s){
           if(s.getCount( )!= this.grid.getStore().getCount()){
           //通过sm得到已选的行的总数，和表中这一页的行数做比较，如果不相等表示还有为选项，则通过下面代码将标题栏的勾选状态去掉。
               var hd_checker = this.grid.getEl().select('div.x-grid3-hd-checker');
          var hd = hd_checker.first();
          if(hd != null){ 
               hd.addClass('x-grid3-hd-checker-on');
               hd.removeClass('x-grid3-hd-checker-on'); //这个是去掉上面标题中的
                   }
                   }    
        }
        }
     }
     );
			var cb = new Ext.grid.CheckboxSelectionModel();

			var grid = new Ext.grid.GridPanel({
				id : "dataListGird",
				tbar : toolbar,
				store : gridStore,
				autoScroll : true, //是否留有滚动条
				loadMask : true,   //是否的遮罩效果
				buttonAlign : 'center', //按钮布局集中			
				border : false,    // 是否显示行的边框
				trackMouseOver : true,  // 鼠标停留时间
				forceLayout : true, 
				region : 'center',
				sm : sm ,
				frame : false,     //是否留 frame 边框
				columnLines : true,   // 列分隔处显示分隔符
				stripeRows : true,    //显示行的分隔符
				bbar : [] ,      // 底部分页栏
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
				columns : [ sm, new Ext.grid.RowNumberer(), {
					header : "ID",
					dataIndex : 'id',
					hidden : true,
					sortable : true
				}, {
					header : "委办局名称",
					width : 60,
					dataIndex : 'dataSource',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "委办局表名",
					width : 60,
					dataIndex : 'tableName',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "字段名",
					width : 60,
					dataIndex : 'columnName',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "规则名称",
					width : 60,
					dataIndex : 'name',
					renderer : formatQtip,
					sortable : true
				},{
					header : "规则类型",
					width : 60,
					dataIndex : 'dataRuleType',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "字段处理类型",
					width : 70,
					dataIndex : 'dataRuleName',
					renderer : formatQtip,
					sortable : true
				}, {
					header : "规则代码",
					width : 140,
					dataIndex : 'dataRuleCode',
					renderer : formatQtip,
					sortable : true
				} ]

			});

			var getRootDataJsonStore = new Ext.data.JsonStore({ // 填充的数据
				url : REQUEST_URL_BASE + "dataConfigHandler/getRootData",
				fields : new Ext.data.Record.create(
						[ 'wbjCode', 'wbjShortName' ])
			});

// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		getRootDataJsonStore.on("load", function() {
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
			getRootDataJsonStore.insert(0, qb_record);
		});

			var comboProvinces = new Ext.form.ComboBox({
				store : getRootDataJsonStore,
				listeners : {
					select : function(serviceInterfaceCombox, record, index) {
						var combo1 = Ext.getCmp("wbjComboNameValue");
						// 根据选择的服务接口 加载服务接口下的方法
						var combo = Ext.getCmp("formComboTableName");
						combo.clearValue();
						combo.store.removeAll()
						var combo2 = Ext.getCmp("tableColumnCombox");
						combo2.clearValue();
						combo2.store.removeAll();
						combo.store.load(({
							params : {
								wbjCode : combo1.getValue()
							}
						}))

					}
				},
				valueField : "wbjCode",
				displayField : "wbjShortName",
				forceSelection : true,
				id : "wbjComboNameValue",
				blankText : '委办局名称',
				emptyText : '全 部',
				hiddenName : 'wbjCode',
				editable : false,
				triggerAction : 'all',
				allowBlank : true,
				fieldLabel : '委办局名称',
				name : 'wbjCode',
				anchor : anchorShow
			});

			var tableNames = new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					url : REQUEST_URL_BASE
							+ "dataConfigHandler/getTableNameListByWBJ",
					fields : new Ext.data.Record.create([ 'tableNameEn',
							'tableNameZh' ])

				}),
				listeners : {
					select : function(serviceInterfaceCombox, record, index) {
						var combo1 = Ext.getCmp("formComboTableName");
						// 根据选择的服务接口 加载服务接口下的方法
						var combo = Ext.getCmp("tableColumnCombox");
						combo.clearValue();
						combo.store.removeAll();
						combo.store.load(({
							params : {
								tableCode : combo1.getValue()
							}
						}))

					}
				},
				valueField : "tableNameEn",
				displayField : "tableNameZh",
				mode : 'local',
				forceSelection : true,
				id : "formComboTableName",
				blankText : '委办局表名',
				emptyText : '全 部',
				hiddenName : 'tableNameEn',
				editable : false,
				triggerAction : 'all',
				allowBlank : true,
				fieldLabel : '委办局表名',
				name : 'tableNameEn',
				anchor : anchorShow
			});
			
			// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		tableNames.store.on("load", function() {
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
			tableNames.store.insert(0, qb_record);
		});
			
			// 定义下拉框
			var tableColumnCombox = new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					url : REQUEST_URL_BASE
							+ "dataConfigHandler/getTableColumnNameByTName",
					fields : new Ext.data.Record.create([ 'columnNameEn',
							'columnNameZh' ])

				}),
				valueField : "columnNameEn",
				displayField : "columnNameEn",
				mode : 'local',
				forceSelection : true,
				id : "tableColumnCombox",
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
		tableColumnCombox.store.on("load", function() {
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
			tableColumnCombox.store.insert(0, qb_record);
		});

			// 查询条件
			var queryCodeFormItems = [ {
				layout : 'column',
				labelAlign : 'right',
				style : 'margin-left: 80px;',
				items : [ {
					columnWidth : .3,
					layout : 'form',
					items : [ comboProvinces ]
				}, {
					columnWidth : .3,
					layout : 'form',
					items : [ tableNames ]
				}, {
					columnWidth : .3,
					layout : 'form',
					items : [ tableColumnCombox ]
				} ]
			} ];

			// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
			queryForm = new Ext.FormPanel({
				id : 'queryForm',
				monitorResize : true,
				region : 'north',
				labelAlign : 'left',
				buttonAlign : 'center',
				collapsible : true,
				frame : true,
				title : '查询条件',
				autoWidth : true,
				autoHeight : true,
				items : queryCodeFormItems,
				buttons : [ {
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
				} ],
				keys : [ { // 处理键盘回车事件
					key : Ext.EventObject.ENTER,
					fn : queryFunc,
					scope : this
				} ]
			});
			// 查询功能
			function queryFunc() {
				gridStore.baseParams = queryForm.getForm().getValues();
				Ext.apply(gridStore.baseParams, {
					start : 0,
					limit : pageSize
				});
				gridStore.load({
					params : gridStore.baseParams
				});
			}

			// 添加数据的from
			function createAddDataForm() {
				var addDataFormInfo = new Ext.FormPanel(
						{
							labelSeparator : "：",
							frame : true,
							id : "CodeManagerInfo",
							width : 360,
							border : false,
							autoHeight : true,
							buttonAlign : 'center',
							items : [
									{
										xtype : 'textfield',
										hidden : true,
										hideLabel : true,
										name : "addFormDataId",
										id : "addFormDataId"
									},
									{
										xtype : 'textfield',
										width : 300,
										allowBlank : false,
										blankText : '规则名称不能为空',
										name : 'name',
									    regexText: '只能输入汉字',
									    maxLength : 20,
									    maxLengthText : "名称最大长度不能超过20个字符！",//提示文本
										fieldLabel : '<span style="color:red;font-size:13pt;">*</span>规则名称',
										id : "addFormRuleName"
									},
									{
										xtype : 'combo',
										fieldLabel : '<span style="color:red;font-size:13pt;">*</span>委办局名称',
										id : "addFormWBJCode",
										width : 300,
										allowBlank : false,
										blankText : '委办局名称',
										emptyText : '委办局名称',
										editable : false,
										mode : 'local',
										hiddenName : 'wbjCode',
										store : getRootDataJsonStore,
										listeners : {
											select : function(combo, record,
													index) {
												var combo1 = Ext
														.getCmp("addFormWBJCode");
												// 根据选择的服务接口 加载服务接口下的方法
												var combo = Ext
														.getCmp("addFormTablCode");
												combo.clearValue();
												var combo2 = Ext
														.getCmp("addFormTableColumnCombox");
												combo2.clearValue();
												combo.store.load(({
													params : {
														wbjCode : combo1
																.getValue()
													}
												}))

											}
										},
										triggerAction : 'all',
										displayField : 'wbjShortName',// 定义要显示的字段
										valueField : 'wbjCode',// 定义值字段
										forceSelection : true,// 要求输入值必须在列表中存在
										resizable : true,// 允许改变下拉列表的大小
										typeAhead : true,// 允许自动选择匹配的剩余部分文本
										handleHeight : 10
									},
									{
										xtype : 'textfield',
										hidden : true,
										hideLabel : true,
										name : "addFormWBJName",
										id : "addFormWBJName"
									},
									{
										xtype : 'combo',
										fieldLabel : '<span style="color:red;font-size:13pt;">*</span>委办局表名',
										width : 300,
										allowBlank : false,
										blankText : '委办局表名',
										emptyText : '委办局表名',
										editable : false,
										mode : 'local',
										hiddenName : 'tableCode',
										id : 'addFormTablCode',
										store : new Ext.data.JsonStore(
												{
													url : REQUEST_URL_BASE
															+ "dataConfigHandler/getTableNameListByWBJ",
													fields : new Ext.data.Record.create(
															[ 'tableNameEn',
																	'tableNameZh' ])

												}),
										listeners : {
											select : function(
													serviceInterfaceCombox,
													record, index) {
												var combo1 = Ext
														.getCmp("addFormTablCode");
												// 根据选择的服务接口 加载服务接口下的方法
												var combo = Ext
														.getCmp("addFormTableColumnCombox");
												combo.clearValue();
												combo.store.load(({
													params : {
														tableCode : combo1
																.getValue()
													}
												}))

											}
										},
										triggerAction : 'all',
										displayField : 'tableNameZh',// 定义要显示的字段
										valueField : 'tableNameEn',// 定义值字段
										forceSelection : true,// 要求输入值必须在列表中存在
										resizable : true,// 允许改变下拉列表的大小
										typeAhead : true,// 允许自动选择匹配的剩余部分文本
										handleHeight : 10
									},
									{
										xtype : 'textfield',
										hidden : true,
										hideLabel : true,
										name : "tableNameValue",
										id : "tableNameValue"
									},
									{
										xtype : 'combo',
										fieldLabel : '<span style="color:red;font-size:13pt;">*</span>字段名',
										width : 300,
										allowBlank : false,
										blankText : '字段名',
										emptyText : '字段名',
										editable : false,
										mode : 'local',
										hiddenName : 'columnCode',
										store : new Ext.data.JsonStore(
												{
													url : REQUEST_URL_BASE
															+ "dataConfigHandler/getTableColumnNameByTName",
													fields : new Ext.data.Record.create(
															[ 'columnNameEn',
																	'columnNameZh' ])

												}),
										id : "addFormTableColumnCombox",
										triggerAction : 'all',
										displayField : 'columnNameEn',// 定义要显示的字段
										valueField : 'columnNameEn',// 定义值字段
										forceSelection : true,// 要求输入值必须在列表中存在
										resizable : true,// 允许改变下拉列表的大小
										typeAhead : true,// 允许自动选择匹配的剩余部分文本
										handleHeight : 10
									},
									{
										xtype : 'textfield',
										hidden : true,
										hideLabel : true,
										name : "columnNameValue",
										id : "columnNameValue"
									},
									{
										xtype : 'combo',
										fieldLabel : '<span style="color:red;font-size:13pt;">*</span>规则类型',
										width : 300,
										allowBlank : false,
										blankText : '规则类型',
										emptyText : '规则类型',
										editable : false,
										mode : 'local',
										hiddenName : 'ruleType',
										id : 'ruleTypeId',
										store : new Ext.data.SimpleStore({
											fields : [ 'name', 'id' ],
											data : [ [ '清洗规则', '1' ],
													[ '比对规则', '2' ],
													[ '转换规则', '3' ],
													[ '加载规则', '4' ],
													[ '抽取规则', '5' ] ]
										}),
										listeners : {
											select : function(
													serviceInterfaceCombox,
													record, index) {
												// 根据选择的服务接口 加载服务接口下的方法
												var combo = Ext
														.getCmp("columnRuleTypeId");
												combo.store.load(({}))
											}
										},
										triggerAction : 'all',
										displayField : 'name',// 定义要显示的字段
										valueField : 'id',// 定义值字段
										forceSelection : true,// 要求输入值必须在列表中存在
										resizable : true,// 允许改变下拉列表的大小
										typeAhead : true,// 允许自动选择匹配的剩余部分文本
										handleHeight : 10
									},
									{
										xtype : 'combo',
										fieldLabel : '<span style="color:red;font-size:13pt;">*</span>字段处理类型',
										width : 300,
										allowBlank : false,
										blankText : '请选择字段处理类型',
										emptyText : '请选择处理类型',
										editable : false,
										mode : 'local',
										hiddenName : 'columnRuleName',
										id : 'columnRuleTypeId',
										store : new Ext.data.JsonStore(
												{
													url : REQUEST_URL_BASE
															+ "dataConfigHandler/getColumnRuleName",
													fields : new Ext.data.Record.create(
															[ 'columnRuleId',
																	'columnRuleName' ])

												}),
										triggerAction : 'all',
										displayField : 'columnRuleName',// 定义要显示的字段
										valueField : 'columnRuleId',// 定义值字段
										forceSelection : true,// 要求输入值必须在列表中存在
										resizable : true,// 允许改变下拉列表的大小
										typeAhead : true,// 允许自动选择匹配的剩余部分文本
										handleHeight : 10
									}, {
										xtype : 'textfield',
										hidden : true,
										hideLabel : true,
										name : "columnRuleValue",
										id : "columnRuleValue"
									}, {
										xtype : 'textarea',
										name : 'desc',
										width : 300,
										height : 140,
									    maxLength : 100,
									    maxLengthText : "描述最大长度不能超过100个字符！",//提示文本
										fieldLabel : '<span>&nbsp;&nbsp;</span>描述',
										id : 'wbjRuleDescription'
									} ],
							buttons : [
									{
										iconCls : 'icon_save',
										text : '保存',
										handler : function() {
											var wbjName = Ext.getCmp(
													"addFormWBJCode")
													.getRawValue();
											Ext.getCmp("addFormWBJName")
													.setValue(wbjName);

											var tableName = Ext.getCmp(
													"addFormTablCode")
													.getRawValue();
											Ext.getCmp("tableNameValue")
													.setValue(tableName);

											var columnName = Ext.getCmp(
													"addFormTableColumnCombox")
													.getRawValue();
											Ext.getCmp("columnNameValue")
													.setValue(columnName);

											var submitUrl, msg = "添加数据失败";
											var dataId = Ext.getCmp(
													"addFormDataId").getValue();
											if (dataId.length > 0) {
												submitUrl = REQUEST_URL_BASE
														+ "dataConfigHandler/updateDataConfig?dataId="
														+ dataId;
												msg = "修改失败"
												submitForm(addDataFormInfo,
														submitUrl, msg,
														callUpdatebak,updateCodeManagerInfoWin);
											} else {
												var columnRuleValue = Ext
														.getCmp(
																"columnRuleTypeId")
														.getRawValue();
												Ext
														.getCmp(
																"columnRuleValue")
														.setValue(
																columnRuleValue);

												submitUrl = REQUEST_URL_BASE
														+ "dataConfigHandler/addDataConfig";
												submitForm(addDataFormInfo,
														submitUrl, msg, callbak,exceCodeManagerInfoWin);
											}
										}
									}, {
										text : '重置',
										iconCls : 'icon_reset',
										id:'exce_icon',
										handler : function() {
										var dataId = Ext.getCmp("addFormDataId").getValue();
											if (dataId.length > 0) {
											Ext.getCmp("exce_icon").setVisible(false);
											}else {
													addDataFormInfo.form.reset();
											}
										}
									} ,														
									{
										text : '关闭',
										iconCls : 'icon_close',
										handler : function()
										{
											var dataId = Ext.getCmp(
													"addFormDataId").getValue();
											if (dataId.length > 0) {
												Ext.getCmp('updateCodeManagerInfoWin').close();
											}else{
												Ext.getCmp('exceCodeManagerInfoWin').close();
											}
										}
									}]
						});
				return addDataFormInfo;
			}

			function callbak() {
				var win = Ext.getCmp("exceCodeManagerInfoWin");
				var grid = Ext.getCmp("dataListGird");
				win.close();
				Ext.Msg.alert('提示信息', '操作成功！');
				grid.store.reload();
			}
			function callUpdatebak() {
				var win = Ext.getCmp("updateCodeManagerInfoWin");
				var grid = Ext.getCmp("dataListGird");
				win.close();
				Ext.Msg.alert('提示信息', '操作成功！');
				grid.store.reload();
			}

			// 添加异常规则数据
			function addData() {
				 exceCodeManagerInfoWin = new Ext.Window({
					layout : 'fit',
					id : 'exceCodeManagerInfoWin',
					closeAction : 'close',
					resizable : false,
					width : 480,
					height : 435,
					shadow : true,
					title : '添加异常规则代码',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items : [ createAddDataForm() ]
				});
				exceCodeManagerInfoWin.show();
				var combo = Ext.getCmp("addFormWBJCode");
				combo.store.load(({}))
			}

			function updateData() {
				var list = getGridList(Ext.getCmp("dataListGird"), "id");
				if (list.length == 0)
				{
					Ext.Msg.alert('提示信息', '请选择数据!');
					return;
				} else if (list.length > 1)
				{
					Ext.Msg.alert('提示信息', '请选择一行数据!');
					return;
				}
				 updateCodeManagerInfoWin = new Ext.Window({
					layout : 'fit',
					id : 'updateCodeManagerInfoWin',
					closeAction : 'close',
					resizable : false,
					width : 480,
					height : 435,
					shadow : true,
					title : '修改异常规则代码',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items : [ createAddDataForm() ]
				});

				var id = list[0]
				var url = REQUEST_URL_BASE
						+ "dataConfigHandler/getConfigInfo?dataId=" + id;
				updateCodeManagerInfoWin.show();
				var form = Ext.getCmp("CodeManagerInfo");
				loadDataFormCallBack(form, url, "获取服务信息异常");
				var comBox = Ext.getCmp("columnRuleTypeId");
				Ext.getCmp("exce_icon").setVisible(false);
				comBox.store.load(({}));
			}

			function delData() {
				var records = sm.getSelections(); // 针对所有选中数据,包括分页的
				if (records.length == 0) {
					Ext.Msg.alert('提示信息', '请选择数据!');
					return;
				} else {
					var recordIdArr = [];
					for ( var i = 0; i < records.length; i++) {
						var rec = records[i];
						recordIdArr.push(rec.get('id'));
					}
					if (recordIdArr.length != 0) {
						Ext.Msg.confirm("提示", "确定要执行删除吗？", function(btn, text) {
							if (btn == "yes") {
								Ext.Ajax.request({
									// 发送请求
									url : deleteUrl,
									method : 'POST',
									params : {
										jsonData : Ext.util.JSON
												.encode(recordIdArr)
									},
									success : function(response, opts) {
										recordIds = [];
										recordObjs = [];
										gridStore.reload();
									},
									failure : function(response, opts) {
										Ext.MessageBox.show({
											title : '错误',
											msg : '删除失败!请联系管理员',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								});
							}
						});
					}
				}

			}
		// 添加数据的from
			
				var exceptionfromto = new Ext.FormPanel(
						{
							labelSeparator : "：",
							frame : true,
							id : "exceptionfromto",
							width : 360,
							border : false,
							autoHeight : true,
							buttonAlign : 'center',
							items : [
							
								{
									xtype : 'textfield',
									name : 'name',
									width : 250,
									readOnly : true,
									fieldLabel : '规则名称'
								} ,{
									xtype : 'textfield',
									name : 'dataSource',
									width : 250,
									readOnly : true,
									fieldLabel : '委办局名称'
								} ,
								{
									xtype : 'textfield',
									name : 'tableName',
									width : 250,
									readOnly : true,
									fieldLabel : '委办局表名'
								} ,
								{
									xtype : 'textfield',
									name : 'columnName',
									width : 250,
									readOnly : true,
									fieldLabel : '字段名'
								} ,
								{
									xtype : 'textfield',
									name : 'dataRuleType',
									width : 250,
									readOnly : true,
									fieldLabel : '规则类型'
								} ,{
									xtype : 'textfield',
									name : 'dataRuleName',
									width : 250,
									readOnly : true,
									fieldLabel : '字段处理类型'
								} 
								,{
									xtype : 'textarea',
									name : 'dataRuleCode',
									width : 250,
									readOnly : true,
									fieldLabel : '规则代码'
								} 
									]
						});
			
var exceptionWinto = new Ext.Window(
	{
		layout : 'fit',
		width : 400,
		height : 310,
		id : 'exceptionWinto',
		title : '查看异常规则代码',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			exceptionfromto
		]
	});				
//查看
	function selectData()
	{
		
		var records = sm.getSelections();
		if (records.length == 0)
		{
			Ext.Msg.alert('提示信息', '请选择数据!');
			return;
		} else if (records.length > 1)
		{
			Ext.Msg.alert('提示信息', '请选择一行数据!');
			return;
		} else
		{
			records = sm.getSelected();
			Ext.getCmp('exceptionWinto').show().center();
			Ext.getCmp('exceptionfromto').getForm().loadRecord(records);
			Ext.getCmp('exceptionfromto').doLayout(true); // 重新调整版面布局
		}
		
	}
	
		//双击GridPanel中的一行，弹出查看窗口
			grid.addListener("rowdblclick", function(){
				 handler:{ selectData(); }
			});
			
			/** *****以下为注册各页面组件方法******************************* */
			// 提示标签提示的内容;
			setTip("异常代码的基础配置模块，针对某个委办局、某张数据交换表、某个字段的清洗规则、转换规则、比对规则等基础代码的配置.");
			// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
			queryForm = setQueryForm("queryForm", queryCodeFormItems, queryFunc);
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
			// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
			// setTbar(grid,topToolbarItems);
			// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
			setPaging(grid);
			// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
			setMainPanel("exceptionCodeManager_div_1", grid);
		});
