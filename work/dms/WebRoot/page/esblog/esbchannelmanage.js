
var anchorSohw='100%';
var op_type;
// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
var detailPanel = Ext.getCmp('detailPanel');
var detailWindow = Ext.getCmp('detailWindow');
// 各种链接
var listUrl = "getChannel";
/**
 * 页面--转换操作跟踪情况列表展示
 */
Ext.onReady(function() {

	// 解决日期控件在IE浏览器下面显示不全的BUG
		Ext.override(Ext.menu.Menu, {
			autoWidth : function() {
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
		var resultStoreFields = ['CHANNEL_CODE', 'CHANNEL_NAME'];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : true,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			successProperty : 'success',
			// 获取数据的方式
			proxy : new Ext.data.HttpProxy( {
				method : 'POST',
				url : listUrl
			}),
			// 数据读取器
			reader : new Ext.data.JsonReader( {
				totalProperty : 'count', // 记录总数
				messageProperty : 'msg',
				root : 'list' // Json中的列表数据根节点
			}, resultStoreFields),
			listeners : {
				exception : function(dataProxy, type, action, options,
						response, arg) {
//					var o = Ext.decode(response.responseText);
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				}
			}
		});

		// 选择模型
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

		// 列表显示的字段
		var cm = new Ext.grid.ColumnModel( [
				sm,new Ext.grid.RowNumberer(),
				{
					header : "渠道代码",
					width : 100,
					align : 'center',
					dataIndex : 'CHANNEL_CODE',
					sortable : true
				},
				{
					header : "渠道名称",
					width : 100,
					align : 'center',
					dataIndex : 'CHANNEL_NAME',
					sortable : true
				} ]);		

		Ext.QuickTips.init();
	Ext.apply(Ext.QuickTips.getQuickTip(),{
		//maxWidth: 200,
		//minWidth: 100,
		//showDelay: 50,
		//trackMouse: true,
		//hideDelay: true,  
		//closable: true,
		//autoHide: false,
		//draggable: true,
		dismissDelay: 0
	});	
	// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
	function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}
	
		// 格式化'操作'
	function renderOper(value, metadata, record, rowIndex, colIndex, store)
	{
		var result = "<font color='blue'><a href=\"javascript:showLogWindow();\">报文详情</a></font>";
		return result;
	}
	
	    
	    var topToolbarItems = [ {
			xtype : 'tbbutton',
			text : '添加',
			iconCls : 'icon_add',
			disabled : false,
			handler : addDataSolution
		}, {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : '编辑',
			iconCls : 'icon_edit',
			disabled : false,
			handler : modDataSolution
		}, {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : "删除",
			iconCls : 'icon_delete',
			handler : delDataSolution
		}
		];

		//显示列表
		resultTable = new Ext.grid.GridPanel( {
			id : 'resultTable',
			autoScroll : true,
			loadMask : true,
			tbar :topToolbarItems,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			//		title : '记录列表',
			store : resultStore,
			cm : cm,
			sm : sm,
			trackMouseOver : true,
			forceLayout : true,
			border : false,
			frame : false,
			columnLines : true,
			stripeRows : true,
			bbar : [],
			viewConfig :
			{
				forceFit : true
			},
		});
		
		// 查询条件
		var queryFormItems = [ {
		layout : 'column',
		labelAlign : 'right',
		items : [ 		
			
{
			columnWidth : .35,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '渠道代码',
				allowBlank : true,
				maxLength : 80,
				name : 'param_channel_code',
				anchor : '90%'
			} ]
		},
{
			columnWidth : .35,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '渠道名称',
				allowBlank : true,
				maxLength : 80,
				name : 'param_channel_name',
				anchor : '80%'
			} ]
		}
			
		]
	} ];
		// center页面初始化事件
		resultStore.on('load', function(s, rec) {

		});

		// 查询功能
		function queryFunc() {
			resultStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(resultStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			resultStore.load( {
				params : resultStore.baseParams
			});

		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip(" 维护渠道信息，可以添加、修改和删除渠道信息。根据渠道编码、渠道名称，查询相应的渠道信息。");
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
		}, {
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				queryForm.getForm().reset();
			}
		} ];
		// 将定义的按钮组放入获取的面板中，如：放入查询面板中
		formPanelCmp.addButton(formButton);

		//		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
				//定义工具栏的元素组
//		 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		//setTbar(grid,topToolbarItems);
		//setTbar(resultTable,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);

		//添加服务
		function addDataSolution() {
			op_type = 'add';
            serviceWin('add');
		}
		
	    //修改服务
		function modDataSolution() {
			op_type = 'mod';
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
        serviceWin('mod');
		Ext.getCmp('dataQualityFormInfo').getForm().loadRecord(record);
		Ext.getCmp('CHANNEL_CODE_OLD').setValue(record.get('CHANNEL_CODE'));
		Ext.getCmp('CHANNEL_CODE').disable();
		Ext.getCmp('dataQualityFormInfo').doLayout(true); // 重新调整版面布局
		
	}
            
		}
		
		function serviceWin(typename){
			if(typename == 'add'){
				typename = '添加';
			}else{
				typename = '修改';				
			}
			var exceDataSolutionWin = new Ext.Window( {
				layout : 'fit',
				id : 'addDataSolution',
				closeAction : 'close',
				resizable : false,
				width : 600,
				height : 180,
				shadow : true,
				title : typename+'渠道',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items : [ createDataSolutionForm() ]
			});
			exceDataSolutionWin.show();
		}
		function delDataSolution(){
					var records = sm.getSelections(); // 针对所有选中数据,包括分页的
		if (records.length == 0)
		{
			Ext.Msg.alert('提示信息', '请选择数据!');
			return;
		} else {
			var recordIdArr = [];
			for ( var i = 0; i < records.length; i++) {
				var rec = records[i];
				recordIdArr.push(rec.get('CHANNEL_CODE'));
				var ids = rec.get('CHANNEL_CODE');
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
							url :  "delete",
							method : 'POST',
							params :
							{
								jsonData : Ext.util.JSON.encode(recordIdArr)
							},
							success : function(response, opts)
							{
								
								 var resObj = Ext.decode(response.responseText);
								 if(resObj.success==false){
									 Ext.Msg.alert("提示信息",resObj.msg);
								 }else{
									 Ext.Msg.alert('提示信息','操作成功！');
								 }
								recordIds = [];
								recordObjs = [];
								Ext.getCmp("resultTable").store.reload();
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
	    // 添加数据的from
		function createDataSolutionForm() {
			var dataQualityFormInfo = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dataQualityFormInfo",
						width : 360,
						border : false,
						autoHeight : true,
						buttonAlign : 'center',
						items : [{
							xtype : 'textfield',
							hidden : true,
							hideLabel : true,
							name : "CHANNEL_CODE_OLD",
							id : "CHANNEL_CODE_OLD"
						},
						{
							xtype : 'textfield',
							width : 400,
							allowBlank : false,
							blankText : '渠道代码',
							name : 'CHANNEL_CODE',
							id : "CHANNEL_CODE",
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>渠道代码'
						},						
						{
							xtype : 'textfield',
							width : 400,
							allowBlank : false,
							blankText : '渠道名称',
							name : 'CHANNEL_NAME',
							id : "CHANNEL_NAME",
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>渠道名称'
						}],
						buttons : [
								{
									text : '保存',
									iconCls : 'icon_save',
									handler : function() {
										var submitUrl,win;
										if(op_type =='add'){
										    submitUrl=  "add";
										}else{
											submitUrl= "update";
										}
										dataQualityFormInfo.getForm().submit({
												clientValidation : true, // 进行客户端验证
												waitMsg : '数据正在提交.....', // 提示信息
												waitTitle : '请稍等', // 标题
												url : submitUrl,
												method : 'POST',
												success : function(dataQualityFormInfo,action) {
													win =  Ext.getCmp("addDataSolution");
													var grid = Ext.getCmp("resultTable");
													grid.store.reload();
													win.close();
													Ext.Msg.alert('提示信息','操作成功！');
												},
												failure : function(dataQualityFormInfo,action) {
			                                        var result = Ext.util.JSON.decode(action.response.responseText);
			                                        Ext.MessageBox.alert('提示信息', result.msg);
												}
											})
									}
								}
								,
								{
										text : '关闭',
										iconCls : 'icon_close',
										handler : function()
										{
											Ext.getCmp('addDataSolution').close();
										}
									}]
					});
			return dataQualityFormInfo;
		}

	});