// 各种参数
var queryForm;
//保存选中的Record主键列id列表
var recordDBtIds = new Array();
//保存选中的Record对象
var recordDBtObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
var queryListUrl = REQUEST_URL_BASE + "dmJhmodeHandler/getDmpDmJhmodeList";
//删除数据请求url
var deleteUrl = REQUEST_URL_BASE + "dmJhmodeHandler/deleteDmpDmJhmode";
//添加数据请求UrL
var addUrl = REQUEST_URL_BASE+"dmJhmodeHandler/addDmpDmJhmode";
//创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorShow='90%';
var dmjhmodeWin;

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
				name : 'WBJBM'
			}, {
				name : 'WBJQC'
			}, {
				name : 'WBJJC'
			}, {
				name : 'JHMODE'
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
				id : "dmjhmodegrid",
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
				dataIndex : 'WBJBM',
				renderer : formatQtip,
				width : 60,
				sortable : true
			}, {
				header : "委办局全称",
				width : 60,
				dataIndex : 'WBJQC',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "委办局简称",
				width : 60,
				dataIndex : 'WBJJC',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "交换模式",
				width : 60,
				dataIndex : 'JHMODE',
				renderer :JHmode,
				sortable : true
			} ]

		});
		
		function JHmode(value, metadata, record, rowIndex, colIndex,
				store) {
			var result ;
			if(record.get('JHMODE')==1){
				result="文件交换模式";
			}
			if(record.get('JHMODE') ==2){
				result="数据库交换模式";
			}
			return result;
		}
		var getRootDataJsonStore = new Ext.data.JsonStore(
				{ //填充的数据
					url : REQUEST_URL_BASE + "dataConfigHandler/getRootData",
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
		var comboErrorProvinces = new Ext.form.ComboBox(
		{
			store : getRootDataJsonStore,
			valueField : "wbjCode",
			displayField : "wbjShortName",
			forceSelection : true,
			id : "dmJhmodeValue_1",
			blankText : '委办局简称',
			emptyText : '全 部',
			hiddenName : 'wbjCode',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '委办局简称',
			name : 'wbjCode',
			anchor : anchorShow
		});
		
		var statusData = [[null,'全部'],['1', '文件交换模式'], ['2', '数据库交换模式']];
		// 定义ComboBox 的数据源
		var statusStore = new Ext.data.SimpleStore(
		{
			fields : ['text', 'value'],
			data : statusData
		});
		// 定义下拉框
		var statusCombox = new Ext.form.ComboBox(
		{
			fieldLabel : '交换模式', 
			name : 'jhmode', 
			hiddenName : 'jhmode',
			allowBlank : true, // 是否允许为空
			blankText : '交换模式',
			emptyText : '全 部', // 没有默认值时,显示的字符串
			typeAhead : true,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : anchorShow,
			store : statusStore,
			valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'value' // 下拉框显示内容
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
				items : [comboErrorProvinces]
			},
			{
				columnWidth : .4,
				layout : 'form',
				items : [statusCombox]
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
			var dmJhmodeForm = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dmJhmodeFormid",
						width : 360,
						border : false,
						autoHeight : false,
						buttonAlign : 'center',
							items : [
						         {
									xtype : 'textfield',
									name : 'WBJBM',
									width : 240,
									id:'wbjbms',
									 allowBlank:false,
									 blankText:'委办局编码不能为空',
									 regex:/^[a-zA-Z_][a-zA-Z_]*$/,	
									 maxLength : 30,//允许输入的最大字符数32
									 maxLengthText : "委办局编码最大长度不能超过30个字符！",//提示文本
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>委办局编码'
								},
						         {
									xtype : 'textfield',
									name : 'WBJQC',
									width : 240,
									maxLength : 30,//允许输入的最大字符数20 
									 maxLengthText : "委办局全称最大长度不能超过30个字符！",//提示文本
									fieldLabel : '委办局全称'
								},
								{
									xtype : 'textfield',
									name : 'WBJJC',
									width : 240,
									allowBlank:false,
									 blankText:'委办局简称不能为空',
									 maxLength : 20,//允许输入的最大字符数10 
									 maxLengthText : "委办局简称最大长度不能超过20个字符！",//提示文本
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>委办局简称'
								},
								{
									xtype : 'combo',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>交换模式',
									name : 'JHMODE', 
									hiddenName : 'JHMODE',
									allowBlank : false, // 是否允许为空
									emptyText : '全 部', // 没有默认值时,显示的字符串
									typeAhead : true,
									triggerAction : 'all', // 显示所有下列数.必须指定为'all'
									forceSelection : true,
									editable : false,
									mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
									width : 240,
									store : statusStore,
									valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
									displayField : 'value' // 下拉框显示内容
								}]					
					});
		
		
		//添加数据的from
			var dmJhmodeFormto = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dmJhmodeFormidto",
						width : 360,
						border : false,
						autoHeight : false,
						buttonAlign : 'center',
							items : [
						         {
									xtype : 'textfield',
									name : 'WBJBM',
									width : 230,
									readOnly : true,
									id:'wbjbmsto',
									 allowBlank:false,
									 blankText:'委办局编码不能为空',
									 regex:/^[a-zA-Z_][a-zA-Z_]*$/,	
									 maxLength : 6,//允许输入的最大字符数6
									 maxLengthText : "委办局编码最大长度不能超过6个字符！",//提示文本
									fieldLabel : '委办局编码'
								},
						         {
									xtype : 'textfield',
									name : 'WBJQC',
									width : 230,
									readOnly : true,
									maxLength : 20,//允许输入的最大字符数20 
									 maxLengthText : "委办局全称最大长度不能超过20个字符！",//提示文本
									fieldLabel : '委办局全称'
								},
								{
									xtype : 'textfield',
									name : 'WBJJC',
									width : 230,
									readOnly : true,
									allowBlank:false,
									 blankText:'委办局简称不能为空',
									 maxLength : 20,//允许输入的最大字符数20
									 maxLengthText : "委办局简称最大长度不能超过20个字符！",//提示文本
									fieldLabel : '委办局简称'
								},
								{
									xtype : 'combo',
									fieldLabel : '交换模式',
									name : 'JHMODE', 
									readOnly : true,
									hiddenName : 'JHMODE',
									allowBlank : false, // 是否允许为空
									emptyText : '请选择模式', // 没有默认值时,显示的字符串
									typeAhead : true,
									triggerAction : 'all', // 显示所有下列数.必须指定为'all'
									forceSelection : true,
									editable : false,
									mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
									width : 230,
									store : statusStore,
									valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
									displayField : 'value' // 下拉框显示内容
								}]					
					});
		// 弹出面板
	 dmjhmodeWin = new Ext.Window(
	{
		layout : 'fit',
		width : 410,
		height : 220,
		id : 'dmjhmodeWin',
		title : '委办局数据交换方式配置',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			dmJhmodeForm
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
					id:'dm_icon',
					handler : function(subOper)
					{
					if(subOper=='update'){
						Ext.getCmp("dm_icon").setVisible(false);
					}
					else{
						Ext.getCmp('dmJhmodeFormid').form.reset();
					}
					}
				},{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						Ext.getCmp('dmjhmodeWin').hide();
					}
				}
		]
	});
	
		// 弹出面板
	var dmjhmodeWinto = new Ext.Window(
	{
		layout : 'fit',
		width : 400,
		height : 200,
		id : 'dmjhmodeWinto',
		title : '查看委办局数据交换方式配置',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			dmJhmodeFormto
		]
	});
	
	// 弹出窗口
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
			Ext.getCmp('dmjhmodeWinto').show().center();
			Ext.getCmp('dmJhmodeFormidto').getForm().loadRecord(records);
			Ext.getCmp('dmJhmodeFormidto').doLayout(true); // 重新调整版面布局
			//Ext.getCmp('wbjbms').disable();
		}
		
	}
	
	//双击GridPanel中的一行，弹出查看窗口
			grid.addListener("rowdblclick", function(){
				 handler:{ selectData(); }
			});
		// 回调函数
	function callbak()
	{	recordDBtIds=[];
		recordDBtObjs = [];
		Ext.getCmp("dmjhmodegrid").store.reload();	
		Ext.getCmp("dmjhmodeWin").hide();
		Ext.Msg.alert('提示信息', '操作成功！');
		Ext.getCmp("dmJhmodeValue_1").store.load(({}));
	}

	// 保存操作
	function subOper()
	{
		var wbjbm = Ext.getCmp("wbjbms").getValue();
		if (operType == 'add')
		{	
			submitForm(Ext.getCmp('dmJhmodeFormid'), addUrl, "添加数据失败", callbak,dmjhmodeWin);
		} else if (operType == 'update')
		{	
			submitUrl = REQUEST_URL_BASE+"dmJhmodeHandler/updateJhmode?wbjbm="+wbjbm;
			submitForm(Ext.getCmp('dmJhmodeFormid'), submitUrl, "更新数据失败", callbak,dmjhmodeWin);
		} else
		{
			alert('操作失败！');
			return;
		}
	}
	// 添加弹出窗口
	function addData()
	{
		Ext.getCmp("dmjhmodeWin")
		.setTitle('添加委办局数据交换方式配置')
		
		operType = 'add';
		Ext.getCmp('dmjhmodeWin').show().center();
		Ext.getCmp('dmJhmodeFormid').form.reset();
		Ext.getCmp('wbjbms').enable();
		Ext.getCmp("dm_icon").setVisible(true);
	}

	// 更新弹出窗口
	function updateData()
	{
		Ext.getCmp("dmjhmodeWin")
		.setTitle('修改委办局数据交换方式配置')
		
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
			Ext.getCmp('dmjhmodeWin').show().center();
			Ext.getCmp('dmJhmodeFormid').getForm().loadRecord(record);
			Ext.getCmp('dmJhmodeFormid').doLayout(true); // 重新调整版面布局
			Ext.getCmp('wbjbms').disable();
		}
		Ext.getCmp("dm_icon").setVisible(false);
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
					recordIdArr.push(rec.get('WBJBM'));
					var bmValues = rec.get('WBJBM');
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
									wbjbm : bmValues
								},
								success : function(response, opts)
								{
									recordDBtIds = [];
									recordDBtObjs = [];
									gridStore.reload();
									Ext.getCmp("dmJhmodeValue_1").store.load(({}));
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
		
		
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("配置各委办局数据交换的方式，目前有文件方式和数据库方式两种.");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm_1", queryFormItems, queryFunc);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryForm_1");
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
		},{
			xtype : 'tbbutton',
			text : "编辑",
			iconCls : 'icon_edit',
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
		setMainPanel("dmpDmJhmode_div_1", grid);
	});