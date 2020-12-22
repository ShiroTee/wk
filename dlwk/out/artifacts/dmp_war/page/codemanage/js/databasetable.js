// 各种参数
var queryForm;
//保存选中的Record主键列id列表
var recordDBtIds = new Array();
//保存选中的Record对象
var recordDBtObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
var queryListUrl = REQUEST_URL_BASE + "dataBaseTableHandler/getDmpDataBaseTableList";
//删除数据请求url
var deleteUrl = REQUEST_URL_BASE + "dataBaseTableHandler/deleteDmpDataBaseTable";
//添加数据请求UrL
var addUrl = REQUEST_URL_BASE+"dataBaseTableHandler/addDmpDataBaseTable";
//修改数据Url
var updateUrl=REQUEST_URL_BASE+"dataBaseTableHandler/updateDmpDataBaseTable";
//创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorShow='90%';
var operType='';

var dateBaseWin;

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
				name : 'sjklx'
			}, {
				name : 'sjkmc'
			}, {
				name : 'bm'
			}, {
				name : 'bhzmc'
			}, {
				name:'zdtcount'
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
				id : "logJobGirds",
				store : gridStore,
				autoScroll : true, //是否留有滚动条
				loadMask : true,   //是否的遮罩效果
				buttonAlign : 'center', //按钮布局集中				
				border : false,    // 是否显示行的边框
				trackMouseOver : true,  // 鼠标停留时间
				forceLayout : true, 
				sm : sm ,
				tbar : [],            //工具条
				region : 'center',
				frame : false,     //是否留 frame 边框
				columnLines : true,   // 列分隔处显示分隔符
				stripeRows : true,    //显示行的分隔符
				bbar : [] ,      // 底部分页栏
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
				columns : [sm, new Ext.grid.RowNumberer(), {
				header : "基本库编码",
				dataIndex : 'sjklx',
				hidden : true,
				renderer : formatQtip,
				sortable : true
			}, {
				header : "基本库名称",
				width : 40,
				dataIndex : 'sjkmc',
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
			} ,{
				header:"字段总计",
				width : 40,
				dataIndex : 'zdtcount',
				renderer : formatQtip,
				sortable : true
			}]

		});
		
		var childStore = new Ext.data.JsonStore(
		{
			url :REQUEST_URL_BASE+"databasedmHandler/getDBtList",
			fields : new Ext.data.Record.create( [
					'sjklx', 'sjkmc' ])

		});
		
		var getChild = new Ext.form.ComboBox(
		{
			store : childStore,
			listeners :
			{
				select :  function(serviceInterfaceCombox,
						record, index)
						{
							tableNames.clearValue();
							tableNames.store.removeAll();
							var combo1 = Ext.getCmp("DBtComboValues");
							//根据选择的服务接口 加载服务接口下的方法
							var combo = Ext.getCmp("comboTableNames");
							
							combo.store.load((
							{
								params :
								{
								sjklx : combo1.getValue()
								}
							}));

						}
			},
			valueField : "sjklx",
			displayField : "sjkmc",
			forceSelection : true,
			id : "DBtComboValues",
			blankText : '基础库名称',
			emptyText : '全 部',
			hiddenName : 'sjklx',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '基础库名称',
			name : 'sjklx',
			anchor : anchorShow
		});
		
		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		childStore.on("load", function() {
			var PersonRecord = Ext.data.Record.create([ {
				name : 'sjklx',
				type : 'string'
			}, {
				name : 'sjkmc',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord({
				sjklx : '',
				sjkmc : '全部'
			});
			childStore.insert(0, qb_record);
		});
		
		
		var tableNames = new Ext.form.ComboBox(
		{
			store : new Ext.data.JsonStore(
					{
						url :REQUEST_URL_BASE+"dataBaseTableHandler/getTableNameListByDBt",
						fields : new Ext.data.Record.create( [
								'bm', 'bhzmc' ])

					}),
			valueField : "bm",
			displayField : "bhzmc",
			mode : 'local',
			forceSelection : true,
			id : "comboTableNames",
			blankText : '表汉字名称',
			emptyText : '全 部',
			hiddenName : 'bm',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '表汉字名称',
			name : 'bm',
			anchor : anchorShow
		});
		
		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
			tableNames.store.on("load", function() {
				var PersonRecord = Ext.data.Record.create([ {
					name : 'bm',
					type : 'string'
				}, {
					name : 'bhzmc',
					type : 'string'
				} ]);
				var qb_record = new PersonRecord({
					bm : '',
					bhzmc : '全部'
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
		
			var datebasefrom = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "datebasefromid",
						width : 360,
						border : false,
						autoHeight : true,
						buttonAlign : 'center',
						items : [
								{
									xtype : 'combo',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>基础库名称',
									id : "sjkmcs",
									width : 230,
									allowBlank : false,
									editable : false,
									blankText : '基础库名称',
									emptyText : '基础库名称',
									mode : 'local',
									hiddenName : 'sjklx',
									store : new Ext.data.JsonStore(
											{
												url :REQUEST_URL_BASE+"databasedmHandler/getDBtList",
												fields : new Ext.data.Record.create( [
														'sjklx', 'sjkmc' ])

											}),
									triggerAction : 'all',
									displayField : 'sjkmc',// 定义要显示的字段
									valueField : 'sjklx',// 定义值字段
									forceSelection : true,// 要求输入值必须在列表中存在
									resizable : true,// 允许改变下拉列表的大小
									typeAhead : true,// 允许自动选择匹配的剩余部分文本
									handleHeight : 10
								},{
									xtype : 'textfield',
									hidden : true,
									hideLabel : true,
									name : "sjkmc",
									id :   "sjkmcc"
								},{
									xtype : 'textfield',
									name : 'bm',
									id:'bmid',
									width : 230,
									 allowBlank:false,
									 blankText:'表名不能为空',
									 regex:/^[a-zA-Z0-9_]*$/,
									 regexText: '只能输入字母数字和下划线组合',
									 maxLength : 30,//允许输入的最大字符数10 
									 maxLengthText : "表名最大长度不能超过30个字符！",//提示文本 
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>表名'
								},
								{
									xtype : 'textfield',
									hidden : true,
									hideLabel : true,
									name : "bmText",
									id :   "tableName"
								},
								{
									xtype : 'textfield',
									name : 'bhzmc',
									width : 230,
									 allowBlank:false,
									 blankText:'表汉字名称不能为空',
									 regex: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
									  regexText: '检查是否有非法字符',
									 maxLength : 25,//允许输入的最大字符数30 
									 maxLengthText : "表汉字说明最大长度不能超过25个字符！",//提示文本
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>表汉字名称'
								} ,
								{
									xtype : 'textfield',
									name : 'zdtcount',
									width : 230,
									allowBlank:false,
									blankText:'请输入表字段总计',
									regex:/^[0-9]*$/,
									regexText: '只能输入整数类型数字',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>表字段总计'
								} 
								]			 
					});
	
		// 弹出面板
	 dateBaseWin = new Ext.Window(
	{
		
		layout : 'fit',
		width : 410,
		height : 220,
		id : 'dateBaseWin',
		title : '基础库数据表配置',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			datebasefrom
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
					id:'base_reset',
					handler : function()
					{
						if(operType == 'update'){
							Ext.getCmp("base_reset").setVisible(false);
						}else{
							Ext.getCmp('datebasefromid').form.reset();
						}
					}
				},{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						Ext.getCmp('dateBaseWin').hide();
					}
				}
		]
	});
	Ext.getCmp('sjkmcs').store.load(({}));
		// 回调函数
	function callbak()
	
	{	recordDBtIds=[];
		recordDBtObjs = [];
		Ext.getCmp("logJobGirds").store.reload();
		Ext.getCmp("dateBaseWin").hide();
		Ext.Msg.alert('提示信息', '操作成功！');
	}

	// 保存操作
	function subOper()
	{
		if (operType == 'add')
		{	
			var dbtName = Ext.getCmp("sjkmcs").getRawValue();
			
			Ext.getCmp("sjkmcc").setValue(dbtName);
			submitForm(Ext.getCmp('datebasefromid'), addUrl, "添加数据失败", callbak,dateBaseWin);
		} else if (operType == 'update')
		{
			submitForm(Ext.getCmp('datebasefromid'), updateUrl, "更新数据失败", callbak,dateBaseWin);
		} else
		{
			alert('操作失败！');
			return;
		}
	}
	// 添加弹出窗口
	function addData()
	{
		Ext.getCmp("dateBaseWin")
		.setTitle('添加基础库数据表配置')
		
		operType = 'add';
		Ext.getCmp('dateBaseWin').show().center();
		Ext.getCmp('datebasefromid').form.reset();
		Ext.getCmp('sjkmcs').enable();
		Ext.getCmp('bmid').enable();
		Ext.getCmp("base_reset").setVisible(true);
	}

	// 更新弹出窗口
	function updateData()
	{
		Ext.getCmp("dateBaseWin")
		.setTitle('修改基础库数据表配置')
		
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
			Ext.getCmp('dateBaseWin').show().center();
			Ext.getCmp('bmid').disable();
			Ext.getCmp('tableName').setValue(record.get('bm'));
			Ext.getCmp('datebasefromid').getForm().loadRecord(record);
			Ext.getCmp('datebasefromid').doLayout(true); // 重新调整版面布局
			Ext.getCmp('sjkmcs').disable();
		}
		Ext.getCmp("base_reset").setVisible(false);
	}
		//删除数据
		function delData(){
			var records = sm.getSelections();  // 针对所有选中数据,包括分页的
			if (records.length == 0)
			{
				Ext.Msg.alert('提示信息', '请选择数据!');
				return;
			} else {
				var recordIdArr = [];
				for ( var i = 0; i < records.length; i++) {
					var rec = records[i];
					recordIdArr.push(rec.get('bm'));
					var bmValue = rec.get('sjkmc');
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
									sjklx : bmValue
								},
								success : function(response, opts)
								{
									recordDBtIds = [];
									recordDBtObjs = [];
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
		
			var datebasefromto = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "datebasefromto",
						width : 360,
						border : false,
						autoHeight : true,
						buttonAlign : 'center',
						items : [
									{
									xtype : 'textfield',
									name : 'sjkmc',
									width : 240,
									readOnly : true,
									fieldLabel : '基础库名称' 
								},{
									xtype : 'textfield',
									name : 'bm',
									id:'bmidto',
									width : 240,
									readOnly : true,
									fieldLabel : '表名',
									regex:/^[a-zA-Z0-9_]*$/,
									regexText: '只能输入字母数字和下划线组合'
								},
								{
									xtype : 'textfield',
									hidden : true,
									hideLabel : true,
									readOnly : true,
									name : "bmText",
									id :   "tableNameto"
								},
								{
									xtype : 'textfield',
									name : 'bhzmc',
									width : 240,
									readOnly : true,
									 allowBlank:false,
									 blankText:'表汉字说明不能为空',
									 regex: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
									  regexText: '检查是否有非法字符',
									 maxLength : 25,//允许输入的最大字符数30 
									 maxLengthText : "表汉字名称最大长度不能超过25个字符！",//提示文本
									fieldLabel : '表汉字名称'
									} ,
								{
									xtype : 'textfield',
									name : 'zdtcount',
									width : 240,
//									height : 100,
//									 allowBlank:false,
									regex:/^[0-9]*$/,
									readOnly : true,
									regexText: '只能输入整数类型数字',
									blankText:'只能是整数类型',
									fieldLabel : '表字段总计'
								} 
								]			 
					});
		// 弹出面板
	var dateBaseWinto = new Ext.Window(
	{
		layout : 'fit',
		width : 400,
		height : 200,
		id : 'dateBaseWinto',
		title : '查看基础库数据表配置',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			datebasefromto
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
			Ext.getCmp('dateBaseWinto').show().center();
			Ext.getCmp('datebasefromto').getForm().loadRecord(records);
			Ext.getCmp('datebasefromto').doLayout(true); // 重新调整版面布局
			//Ext.getCmp('wbjbms').disable();
		}
		
	}
	//双击GridPanel中的一行，弹出查看窗口
			grid.addListener("rowdblclick", function(){
				 handler:{ selectData(); }
			});
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("配置基础库及各数据表，建立基础库和基础库数据表的关系.");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForms", queryFormItems, queryFunc);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryForms");
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
		formPanelCmp.addButton(formButton);
		//定义工具栏的元素组
		var topToolbarItems = [ {
			xtype : 'tbbutton',
			text : '添加',
			iconCls : 'icon_add',
			disabled : false,
			handler : addData
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
			disabled : false,
			handler : delData
		} ,{
			xtype : 'tbbutton',
			text : "查看",
			iconCls : 'icon_lookup',
			handler : selectData
		}];
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("dateBasetable_div_1", grid);
	});