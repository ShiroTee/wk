// 各种参数
var queryForm;
//保存选中的Record主键列id列表
var recordWbjIds = new Array();
//保存选中的Record对象
var recordWbjObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
var queryListUrl = REQUEST_URL_BASE + "wbjHandler/getDmpWbjList";
var deleteUrl = REQUEST_URL_BASE + "wbjHandler/deleteDmpWbj";
var addUrl = REQUEST_URL_BASE+ "wbjHandler/addDmpWbj";
var updateUrl=REQUEST_URL_BASE+"wbjHandler/updateDataConfig"
//创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorShow='90%';

var wbjsjjhWin;

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
		reader : new Ext.data.JsonReader( {
				totalProperty : "count",
				root : "list"
			}, Ext.data.Record.create( [ {
				name : 'wbjbm'
			}, {
				name : 'wbjjc'
			}, {
				name : 'bm'
			}, {
				name : 'bhzmc'
			}, {
				name : 'zdzj'
			}])),
			proxy : new Ext.data.HttpProxy( {
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

		var grid = new Ext.grid.GridPanel( {
				id : "logJobGird",
				store : gridStore,
				autoScroll : true, //是否留有滚动条
				loadMask : true,   //是否的遮罩效果
				buttonAlign : 'center', //按钮布局集中		
				border : false,    // 是否显示行的边框
				trackMouseOver : true,  // 鼠标停留时间
				forceLayout : true, 
				tbar : [],            //工具条
				sm : sm ,
				region : 'center',
				frame : false,     //是否留 frame 边框
				columnLines : true,   // 列分隔处显示分隔符
				stripeRows : true,    //显示行的分隔符
				bbar : [] ,      // 底部分页栏
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
			columns : [sm, new Ext.grid.RowNumberer(), {
				header : "委办局编码",
				dataIndex : 'wbjbm',
				hidden : true,
				renderer : formatQtip,
				sortable : true
			}, {
				header : "委办局名称",
				width : 40,
				dataIndex : 'wbjjc',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "表名",
				width : 40,
				dataIndex : 'bm',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "表汉字名称",
				width : 40,
				dataIndex : 'bhzmc',
				renderer : formatQtip,
				sortable : true
			} , {
				header : "字段总计",
				width : 40,
				dataIndex : 'zdzj',
				renderer : formatQtip,
				sortable : true
			}]

		});
		var getRootDataJsonStore = new Ext.data.JsonStore(
				{ //填充的数据
					url : REQUEST_URL_BASE + "wbjHandler/getRootData",
					fields : new Ext.data.Record.create( [
							'wbjCode', 'wbjShortName' ])
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
		
		
		var getChild = new Ext.form.ComboBox(
		{
			store : getRootDataJsonStore,
			listeners :
			{
				select :  function(serviceInterfaceCombox,
						record, index)
						{ 	
							tableNames.clearValue();
							tableNames.store.removeAll();
							var combo1 = Ext.getCmp("wbjComboValue");
							//根据选择的服务接口 加载服务接口下的方法
							var combo = Ext.getCmp("comboSTableName");
							combo.store.load((
							{
								params :
								{
									wbjCode : combo1.getValue()
								}
							}));

						}
			},
			valueField : "wbjCode",
			displayField : "wbjShortName",
			forceSelection : true,
			id : "wbjComboValue",
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
		
		var tableNames = new Ext.form.ComboBox(
		{
			store : new Ext.data.JsonStore(
					{
						url : REQUEST_URL_BASE + "wbjHandler/getTableNameListByWBJ",
						fields : new Ext.data.Record.create( [
								'tableNameEn', 'tableNameZh' ])

					}),
			valueField : "tableNameEn",
			displayField : "tableNameZh",
			mode : 'local',
			forceSelection : true,
			id : "comboSTableName",
			blankText : '表汉字名称',
			emptyText : '全 部',
			hiddenName : 'tableNameEn',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '表汉字名称',
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
		
		// 查询条件
		var queryFormItems = [
		{
			layout : 'column',
			style : 'margin-left: 140px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .4,
				layout : 'form',
				items : [getChild]
			},
			{
				columnWidth : .4,
				layout : 'form',
				items : [tableNames]
			}
			]
		}];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
		queryForm = new Ext.FormPanel( {
			id : 'queryForm',
			monitorResize : true,
			region : 'north',
			labelAlign : 'left',
			buttonAlign : 'center',
			collapsible : true,
			frame : true,
			autoWidth : true,
			items : queryFormItems,
			buttons : [],
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
			gridStore.load( {
				params : gridStore.baseParams
			});
		}
		
		//添加数据的from
			var wbjsjjhfoForm = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "CodeManagerInfo",
						width : 340,
						border : false,
						autoHeight : true,
						buttonAlign : 'center',
						items : [
								{
									xtype : 'combo',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>委办局名称',
									id : "addFormWBJName",
									width : 230,
									allowBlank : false,
									editable : false,
									blankText : '委办局名称',
									emptyText : '委办局名称',
									mode : 'local',
									hiddenName : 'wbjCode',
									store : getRootDataJsonStore,
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
									name : "addFormHiddenWBJName",
									id : "addFormHiddenWBJName"
								},
								{
									xtype : 'textfield',
									width : 230,
									allowBlank : false,
									blankText : '请填写表名',
									name : 'bm',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>表名',
									regex:/^[a-zA-Z0-9_]*$/,
									regexText: '只能输入字母数字和下划线组合',
									id : "addFormRuleName"
								}
								,{
									xtype : 'textfield',
									hidden : true,
									hideLabel : true,
									name : "wbbm",
									id :   "wbjbmid"
								},
								{
									xtype : 'textfield',
									allowBlank : false,
									name : 'bhzmc',
									blankText : '请填写名称',
									width : 230,
									regex: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								    regexText: '检查是否有非法字符',
								    maxLength : 25,
								    maxLengthText : "表汉字名称最大长度不能超过25个字符！",//提示文本
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>表汉字名称'
								},{
									xtype : 'textfield',
									name : 'zdzj',
									width : 230,
									allowBlank : false,
									blankText : '请填表字段总计',
									regex:/^[0-9]*$/,
									regexText: '只能输入整数类型数字',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>表字段总计'
								}  ]
					});
		
		// 弹出面板
	wbjsjjhWin = new Ext.Window(
	{
		layout : 'fit',
		width : 410,
		height : 220,
		id : 'wbjsjjhWin',
		title : '委办局数据交换表配置',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			wbjsjjhfoForm
		],
		buttons :
		[
				{
					text : '保存',
					iconCls : 'icon_save',
					handler : subOper
				},
				
					{
					text : '重置',
					iconCls : 'icon_reset',
					id:'wbj_icon',
					handler : function(subOper)
					{
					if(subOper=='update'){
						Ext.getCmp("wbj_icon").setVisible(false);
					}
					else{
						Ext.getCmp('CodeManagerInfo').form.reset();
					}
					}
				},
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						Ext.getCmp('wbjsjjhWin').hide();
					}
				}
				
						
		]
	});
	Ext.getCmp('addFormWBJName').store.load(({}));
		// 回调函数
	function callbak()
	{	recordWbjIds=[];
		recordWbjObjs = [];
		Ext.getCmp("logJobGird").store.reload();
		Ext.getCmp("wbjsjjhWin").hide();
		Ext.Msg.alert('提示信息', '操作成功！');
	}

	// 保存操作
	function subOper()
	{
		if (operType == 'add')
		{	
			var wbjName = Ext.getCmp("addFormWBJName").getRawValue();
				Ext.getCmp("addFormHiddenWBJName").setValue(wbjName);
			submitForm(Ext.getCmp('CodeManagerInfo'), addUrl, "添加数据失败", callbak,wbjsjjhWin);
		} else if (operType == 'update')
		{
			submitForm(Ext.getCmp('CodeManagerInfo'), updateUrl, "更新数据失败", callbak,wbjsjjhWin);
		} else
		{
			alert('操作失败！');
			return;
		}
	}
	// 添加弹出窗口
	function addData()
	{
		Ext.getCmp("wbjsjjhWin")
		.setTitle('添加委办局数据交换表配置')
		
		operType = 'add';
		Ext.getCmp('wbjsjjhWin').show().center();
		Ext.getCmp('CodeManagerInfo').form.reset();
		Ext.getCmp('addFormWBJName').enable();
		Ext.getCmp('addFormRuleName').enable();
		Ext.getCmp("wbj_icon").setVisible(true);
	}

	// 更新弹出窗口
	function updateData()
	{
		Ext.getCmp("wbjsjjhWin")
		.setTitle('修改委办局数据交换表配置')
		
		operType = 'update';
		var record = sm.getSelections();
		if (record.length == 0)
		{
			Ext.Msg.alert('提示信息', '请选择数据!');
			return;
		} else if (record.length > 1)
		{
			Ext.Msg.alert('提示信息', '请选择一行数据!');
			return;
		} else
		{
			record = sm.getSelected();
			Ext.getCmp('wbjsjjhWin').show().center();
			Ext.getCmp('addFormRuleName').disable();	
			Ext.getCmp('wbjbmid').setValue(record.get('bm'));
			Ext.getCmp('CodeManagerInfo').getForm().loadRecord(record);
			Ext.getCmp('CodeManagerInfo').doLayout(true); // 重新调整版面布局
			Ext.getCmp('addFormWBJName').disable();
		}
		Ext.getCmp("wbj_icon").setVisible(false);
	}
		//删除数据
		function delData(){
			var records = sm.getSelections(); // 针对所有选中数据,包括分页的
			if (records.length == 0)
			{
				Ext.Msg.alert('提示信息', '请选择数据!');
				return;
			} else {
				var recordIdArr = [];
				for ( var i = 0; i < records.length; i++) {
					var rec = records[i];
					recordIdArr.push(rec.get('bm'));
					var bmValue = rec.get('bhzmc');
			}

				if (recordIdArr.length != 0)
				{
					Ext.Msg.confirm("提示", "确定要执行删除吗？", function(btn, text)
					{
						if (btn == "yes")
						{
							Ext.Ajax.request(
							{
								// 发送请求
								url : deleteUrl,
								method : 'POST',
								params :
								{
									jsonData : Ext.util.JSON.encode(recordIdArr),
									wbjbm : bmValue
								},
								success : function(response, opts)
								{
									recordWbjIds = [];
									recordWbjObjs = [];
									gridStore.reload();
								},
								failure : function(response, opts)
								{
									Ext.MessageBox.show(
									{
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
		//添加数据的from
			var wbjsjjhfromto = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "wbjsjjhfromto",
						width : 340,
						border : false,
						autoHeight : true,
						buttonAlign : 'center',
						items : [
								
								{
									xtype : 'textfield',
									name : 'wbjjc',
									width : 240,
									readOnly : true,
									fieldLabel : '委办局名称'
								} ,
								{
									xtype : 'textfield',
									width : 240,
									allowBlank : false,
									blankText : '请填写表名',
									name : 'bm',
									readOnly : true,
									fieldLabel : '表名',
									regex:/^[a-zA-Z0-9_]*$/,
									regexText: '只能输入字母数字和下划线组合',
									id : "addFormRuleNametto"
								}
								,{
									xtype : 'textfield',
									hidden : true,
									hideLabel : true,
									name : "wbbm",
									id :   "wbjbmidto"
								},
								{
									xtype : 'textfield',
									allowBlank : false,
									name : 'bhzmc',
									readOnly : true,
									blankText : '请填写名称',
									width : 240,
									regex: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
								    regexText: '检查是否有非法字符！',
								    maxLength : 25,
								    maxLengthText : "表汉字名称最大长度不能超过25个字符！",//提示文本
									fieldLabel : '表汉字名称'
								},{
									xtype : 'textfield',
									name : 'zdzj',
									width : 240,
									readOnly : true,
									regex:/^[0-9]*$/,
									regexText: '只能输入整数类型数字',
									fieldLabel : '表字段总计'
								}  ]
					});
		
	var wbjsjjhWinto = new Ext.Window(
	{
		layout : 'fit',
		width : 400,
		height : 200,
		id : 'wbjsjjhWinto',
		title : '查看委办局数据交换表配置',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			wbjsjjhfromto
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
			Ext.getCmp('wbjsjjhWinto').show().center();
			Ext.getCmp('wbjsjjhfromto').getForm().loadRecord(records);
			Ext.getCmp('wbjsjjhfromto').doLayout(true); // 重新调整版面布局
			//Ext.getCmp('wbjbms').disable();
		}
		
	}
		//双击GridPanel中的一行，弹出查看窗口
			grid.addListener("rowdblclick", function(){
				 handler:{ selectData(); }
			});
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("配置委办局数据交换表，建立委办局和数据交换表及字段数量的关系.");
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
		//定义工具栏的元素组
		var topToolbarItems = [ {
			xtype : 'tbbutton',
			text : '添加',
			id : 'btnStart',
			iconCls : 'icon_add',
			disabled : false,
			handler : function() {
				addData();
			}
		},
		{
			xtype : 'tbbutton',
			text : '编辑',
			iconCls : 'icon_edit',
			disabled : false,
			handler : updateData
		},{
			xtype : 'tbbutton',
			text : '删除',
			iconCls : 'icon_delete',
			handler : function() {
				delData();
			}
		},{
			xtype : 'tbbutton',
			text : "查看",
			iconCls : 'icon_lookup',
			handler : selectData
		}];
		 //利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("wbjsjjh_div_1", grid);
	});
