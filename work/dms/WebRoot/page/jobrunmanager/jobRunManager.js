
var anchorSohw='70%';
// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
// 各种链接
var listUrl = "getLogJobList";
var directoryComboxUrl = "getDirectoryList";
//var pageSize=15;

/**
 * 页面--作业运行状态情况列表展示
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
		// 初始化页面的时候时候会执行store_load方法，查询数据
//		Ext.QuickTips.init();
//		Ext.form.Field.prototype.msgTarget = 'side';

				// 定义GroupingView模版的显示结果
//				var tmpFunction = Ext.grid.GroupingView.prototype.initTemplates;
//				Ext.grid.GroupingView.prototype.initTemplates = function() {
//					tmpFunction.call(this);
//					if (this.startGroup && this.tplFunction) {
//						Ext.apply(this.startGroup, this.tplFunction);
//					}
//				};
		
				// 定义一个通用的扩展统计功能
//				Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v,
//						record, field) {
//		
//					return v + (record.data.estimate * record.data.rate);
//				};
//		
//				// 使用扩展的的统计功能
//				var summary = new Ext.ux.grid.GroupSummary();

		var resultStoreFields = [ 'idJob', 'jobName', 'status', 'startDate',
				'endDate', 'replayDate', 'logDate', 'govName','isRepeat','jobId', 'dir','id_directory' ];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : false,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			sortInfo : {
				field : 'idJob',
				direction : 'desc'
			},
			//统计
			groupField : 'govName',
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
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				}
			//			,load:function(s, rec){
			//				
			//				alert(Ext.encode(resultStore.reader.jsonData))
			//			}
			}
		});
		
			//定时器
		/*	var t;
		 function timedCount(){ 
		 t=setTimeout("timedCount()",1000);	
		 gridStore.reload();  
		 }*/
		var task = {
			run : function() {
				var obj = Ext.getCmp("resultTable");
				if (obj != null) {
//					obj.getStore().reload();
					queryFunc();
				}
			},
			interval : 15000 * 2
		}
		Ext.TaskMgr.start(task);
		//Ext.TaskMgr.stop(task);//关闭定时器 ,现由index.jsp中关闭当前active tab来释放

		var sm = new Ext.grid.CheckboxSelectionModel(
				{
					singleSelect : true,
					header:"",
					listeners :
					{
					
						rowselect : function()
						{
							var grid = Ext.getCmp("resultTable");
							var record = this.getSelected();
							var status = record.get("status");
							var isRepeat = record.get("isRepeat");
							var toolbar = grid.getTopToolbar();
							if (!("running" == status||"start" == status))
							{
								toolbar.getComponent(0).enable();
							} 
							if (!("Y" == isRepeat))
							{
								toolbar.getComponent(1).enable();
							}
							if ("Y" == isRepeat)
							{
								toolbar.getComponent(2).enable();
								toolbar.getComponent(0).disable();
							}

						},
						rowdeselect : function()
						{
							var grid = Ext.getCmp("resultTable");
							var toolbar = grid.getTopToolbar();
							for ( var i = 0; i < 3; i++)
							{
								toolbar.getComponent(i).disable();
							}

						}
					}
				});

		// 列表显示的字段
		var cm = new Ext.grid.ColumnModel( [
				sm,
			    new Ext.grid.RowNumberer(),
			    {
					header : 'id_directory',
					align : 'center',
					width : 20,
					dataIndex : 'id_directory',
					sortable : true,
					hidden : true,
					renderer : formatQtip

				},
				{
					header : 'jobId',
					align : 'center',
					width : 20,
					dataIndex : 'jobId',
					sortable : true,
					hidden : true,
					renderer : formatQtip

				},
				{
					header : "作业名称",
					align : 'center',
					width : 340,
					dataIndex : 'jobName',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "所属委办局",
					align : 'center',
					width : 130,
					dataIndex : 'govName',
					sortable : true,
					hidden : true,
					renderer : formatQtip
				},
				{
					header : "流程状态",
					align : 'center',
					width : 130,
					dataIndex : 'status',
					sortable : true,
					renderer : function(value) {
					//alert(PROJECT_ROOT);
						   if (value == 'start') {
						    return "<img src="+PROJECT_ROOT+"images/icons/blue.png />";
						   } else if(value=='end'){
							   return "<img src="+PROJECT_ROOT+"images/icons/yellow.png />";
						   }else if(value=='stop'){
							   return "<img src="+PROJECT_ROOT+"images/icons/red.png />";
						   }else if(value=='running'){
							   return "<img src="+PROJECT_ROOT+"images/icons/green.png />";
						   }else{
							   return "<img src="+PROJECT_ROOT+"images/icons/grey.png />";
						   }
						  }
//					renderer : formatQtip
				},
				{
					header : "启动时间",
					align : 'center',
					width : 230,
					dataIndex : 'startDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s.u') : '';
//					}
					renderer : formatQtip
					
				},
				{
					header : "停止时间",
					align : 'center',
					width : 230,
					dataIndex : 'endDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s ') : '';
//					}
					renderer : formatQtip
					
				},
				{
					header : "是否轮循",
					align : 'center',
					width : 130,
					dataIndex : 'isRepeat',
					sortable : true,
					renderer : function(value) {
						   if (value == 'Y') {
						    return "<font color='red'>是</font>";
						   } else{
							   return "<font color='blue'>否</font>";
						   }
						  }
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s ') : '';
//					}
					//renderer : formatQtip
					
				}
				]);
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
	
	
	 

//显示列表
	resultTable = new Ext.grid.GridPanel(
	{
		id : 'resultTable',
		tbar: new Ext.Toolbar(),
		autoScroll : true,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		region : 'center',
//		title : '记录列表',
		store : resultStore,
		sm : sm,
		cm : cm,
		columnLines : true,   // 列分隔处显示分隔符
		stripeRows : true,    //显示行的分隔符
		trackMouseOver : true,  // 鼠标停留时间
		forceLayout : true,
		border : false,
		frame : false,
//		view : groupingView,
//		plugins : summary,
		view: new Ext.grid.GroupingView(),
		viewConfig :
		{
			forceFit : true
		},
		bbar : []
		
	});

		/** ****************** '委办局'-->下拉列表 ********************************** */
		// 定义动态数据
		var directoryDataJsonStore = new Ext.data.JsonStore( {
			url : directoryComboxUrl,
			//root : 'data',
			fields : new Ext.data.Record.create( [ 'directoryId',
					'directoryName' ])
		});
		// 定义下拉框
		var directoryDataCombox = new Ext.form.ComboBox( {
			fieldLabel : '', // UI标签名称
			store : directoryDataJsonStore,
			// name : 'directoryDataCom', // 作为form提交时传送的参数名
			hiddenName : 'directoryId',
			allowBlank : true, // 是否允许为空
			emptyText : '---请选择---', // 没有默认值时,显示的字符串
			typeAhead : true,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : anchorSohw,
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'directoryId', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'directoryName' // 下拉框显示内容
		});
		//directoryDataCombox.reset();
		directoryDataJsonStore.load(); // 载入下拉框的信息

		// 查询条件
		var queryFormItems = [ {
			layout : 'column',
			style : 'margin-left: 350px;',
			labelAlign : 'right',
			items : [ 
//			          {
//				columnWidth : .5,
//				layout : 'form',
//				items : [ {
//					xtype : 'textfield',
//					fieldLabel : '作业名称',
//					allowBlank : true,
//					maxLength : 30,
//					name : 'jobName',
//					anchor : anchorSohw
//				} ]
//			}, 
			{
				columnWidth : .5,
				layout : 'form',
				items : [ {
					fieldLabel : '委办局',
					layout : 'column',
					items : [ {
						items : [ directoryDataCombox ]
					} ]
				} ]
			} ]
		} ];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
//		queryForm = new Ext.FormPanel( {
//			id : 'queryForm',
//			monitorResize : true,
//			region : 'north',
//			labelAlign : 'left',
//			buttonAlign : 'center',
//			collapsible : true,
//			frame : true,
//			title : '查询条件',
//			autoWidth : true,
//			autoHeight : true,
//			items : queryFormItems,
//			buttons : [ {
//				text : '查询',
//				iconCls : 'icon_query',
//				handler : function() {
//					queryFunc();
//				}
//			}, {
//				text : '重置',
//				iconCls : 'icon_reset',
//				handler : function() {
//					queryForm.getForm().reset();
//				}
//			} ],
//			keys : [ { // 处理键盘回车事件
//				key : Ext.EventObject.ENTER,
//				fn : queryFunc,
//				scope : this
//			} ]
//		});
//
//		
//		queryForm.render('service_div_1');
		

		// 主容器
//		var myViewPort = new Ext.Viewport( {
//			//items : [ queryForm, resultTable, detailTable ],
//			items : [ queryForm, resultTable ],
//			layout : 'border',
//			boder : false,
//			forceLayout : true
//		});

		/** *************************功能集合********************** */
		// center页面初始化事件
		resultStore.on('load', function(s, rec) {

		});

		// 查询功能
		function queryFunc() {

			//toolbar重置
			var grid = Ext.getCmp("resultTable");
			var toolbar = grid.getTopToolbar();
			for ( var i = 0; i < 3; i++)
			{
				toolbar.getComponent(i).disable();
			}
			
			resultStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(resultStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			resultStore.load( {
				params : resultStore.baseParams
			});

		}
		
		var updateDataSolutionWin;
		function jobRunTimeSet() {
			
				
					updateDataSolutionWin = new Ext.Window(
					{
						layout : 'fit',
						id : 'updateDataSolutionWin',
						closeAction : 'close',
						resizable : false,
						width : 340,
						height :245,
						shadow : true,
						title : '作业运行时间设置',
						modal : true,
						closable : true,
						bodyStyle : 'padding:5 5 5 5',
						animCollapse : true,
						items:[createDataSolutionForm()]
					});
					var url = "getJobRunTimeSetInfo"
					updateDataSolutionWin.show();
					var form = Ext.getCmp("dataQualityFormInfo");
					loadDataSolutionCallBack(form,url,"获取作业运行时间数据异常");
					
		}
		
		
		// 添加数据的from
		function createDataSolutionForm() {
			var dataQualityFormInfo = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dataQualityFormInfo",
						width : 340,
						height :300,
						border : false,
						fileUpload : true,
						autoHeight : true,
						buttonAlign : 'center',
						items : [
						{
							xtype : 'textfield',
							width : 200,
							allowBlank : false,
							blankText : '抽取作业时间',
							regex :/^[1-9]*[1-9][0-9]*$/,
							regexText :'必须为正整数',
							name : 'chouquname',
							id : "chouquid",
							maxLength : 30,//允许输入的最大字符数6
							maxLengthText : "知识点最大长度不能超过30个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>抽取作业(分钟)'
						},
						{
							xtype : 'textfield',
							width : 200,
							allowBlank : false,
							blankText : '清洗作业时间',
							regex :/^[1-9]*[1-9][0-9]*$/,
							regexText :'必须为正整数',
							name : 'qingxiname',
							id : "qingxiid",
							maxLength : 30,//允许输入的最大字符数6
							maxLengthText : "知识点最大长度不能超过30个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>清洗作业(分钟)'
						},
						{
							xtype : 'textfield',
							width : 200,
							allowBlank : false,
							blankText : '转换作业时间',
							regex :/^[1-9]*[1-9][0-9]*$/,
							regexText :'必须为正整数',
							name : 'zhuanhuanname',
							id : "zhuanhuanid",
							maxLength : 30,//允许输入的最大字符数6
							maxLengthText : "知识点最大长度不能超过30个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>转换作业(分钟)'
						},
						{
							xtype : 'textfield',
							width : 200,
							allowBlank : false,
							blankText : '比对作业时间',
							regex :/^[1-9]*[1-9][0-9]*$/,
							regexText :'必须为正整数',
							name : 'biduiname',
							id : "biduiid",
							maxLength : 30,//允许输入的最大字符数6
							maxLengthText : "知识点最大长度不能超过30个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>比对作业(分钟)'
						},
						{
							xtype : 'textfield',
							width : 200,
							allowBlank : false,
							blankText : '加载作业时间',
							regex :/^[1-9]*[1-9][0-9]*$/,
							regexText :'必须为正整数',
							name : 'jiazainame',
							id : "jiazaiid",
							maxLength : 30,//允许输入的最大字符数6
							maxLengthText : "知识点最大长度不能超过30个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>加载作业(分钟)'
						}],
						buttons:[
						{
							text :'保存',
							iconCls : 'icon_save',
							handler : updateJobRunTimeSetInfo
						},
						{
							text : '关闭',
							iconCls : 'icon_close',
							handler : function()
							{
								Ext.getCmp('updateDataSolutionWin').close();
							}
						}
						]
					});
			return dataQualityFormInfo;
		}
		
		
		function loadDataSolutionCallBack(form,url,messages){
			form.form.reset();
			form.form.load(
			{
				waitMsg : '正在加载数据请稍后',// 提示信息
				waitTitle : '提示',// 标题
				url : url,
				method : 'POST',// 请求方式
				success : function(form, action)
				{
				
					Ext.getCmp("chouquid").setValue(action.result.data.chouquvalue);
					Ext.getCmp("qingxiid").setValue(action.result.data.qingxivalue);
					Ext.getCmp("zhuanhuanid").setValue(action.result.data.zhuanhuanvalue);
					Ext.getCmp("biduiid").setValue(action.result.data.biduivalue);
					Ext.getCmp("jiazaiid").setValue(action.result.data.jiazaivalue);
					
				},
				failure : function(form, action)
				{// 加载失败的处理函数
					var result = Ext.util.JSON.decode(action.response.responseText);
					Ext.Msg.alert('提示', messages + result.data);
				}
			});
		}
		
		
		//保存作业时间设置数据
		function updateJobRunTimeSetInfo(form,url,messages){
			var cqid = Ext.getCmp("chouquid").getValue();
			var qxid = Ext.getCmp("qingxiid").getValue();
			var zhid = Ext.getCmp("zhuanhuanid").getValue();
			var bdid = Ext.getCmp("biduiid").getValue();
			var jzid = Ext.getCmp("jiazaiid").getValue();
			
			if(!(/^[1-9]*[1-9][0-9]*$/.test(cqid))||!(/^[1-9]*[1-9][0-9]*$/.test(qxid))||!(/^[1-9]*[1-9][0-9]*$/.test(zhid))||!(/^[1-9]*[1-9][0-9]*$/.test(bdid))||!(/^[1-9]*[1-9][0-9]*$/.test(jzid)))
			{
				alert("必须为正整数！");
				return;
			}
			
			
			Ext.Msg.confirm("提示", "确认保存？", function(btn, text)
			{
				if (btn == "yes")
				{
						
						
						var url = "updateJobRunTimeSetInfo?cqid="+cqid+"&qxid="+qxid+"&zhid="+zhid+"&bdid="+bdid+"&jzid="+jzid;
						var form = Ext.getCmp("dataQualityFormInfo");
						var messages = "保存作业运行时间数据异常";
						
						form.form.reset();
						form.form.load(
						{
							waitMsg : '正在加载数据请稍后',// 提示信息
							waitTitle : '提示',// 标题
							url : url,
							method : 'POST',// 请求方式
							success : function(form, action)
							{
							
								Ext.getCmp('updateDataSolutionWin').close();
								alert("保存作业运行时间数据成功！");
								queryFunc();
							},
							failure : function(form, action)
							{// 加载失败的处理函数
								Ext.getCmp('updateDataSolutionWin').close();
								var result = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('提示', messages + result.data);
							}
						});	
				}
			});
			
			
		}
		
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip(" 对各作业目前的运行状态进行展示，可设置作业运行时间。");
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
		}
		, {
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
			text : '启动作业',
			id : 'startjob',
			iconCls : 'icon_start',
			disabled : true,
			handler : function() {
				//alert("你在点启动作业按钮哦！");
				
				Ext.Msg.confirm("提示", "确认启动作业？", function(btn, text)
				{
					if (btn == "yes")
					{
								
								// 获取所有选中行
								var rows=Ext.getCmp('resultTable').getSelectionModel().getSelections();
//								var str = '';
//								for(var i=0;i <rows.length;i++){
//								str = str + rows[i].get('jobId')+rows[i].get('jobName')+rows[i].get('dir') ;
//								}
//								alert(str);
								var submitUrl = "runJob";
								Ext.Ajax.request( {
									url : submitUrl,
									method : 'post',
									params: { jobName:rows[0].get('jobName'), dir:rows[0].get('dir') },
									success : function(response, options) {
									var data = eval("(" + response.responseText + ")");
										if (!data.success) {
											Ext.Msg.alert('提示', "启动作业失败，异常码："+data.msg);
										}
										else
										{
											alert("启动作业成功！");
											queryFunc();
										}
									},
									failure : function(response, options) {
										var result = Ext.util.JSON.decode(response.responseText);
										Ext.Msg.alert('提示', "启动作业失败，异常码：" + result.data);
									}
								});
								
					}
				});
				
			}
		} ,
		{
			xtype : 'tbbutton',
			text : '启动轮循',
			id : 'startLoop',
			iconCls : 'icon_start',
			disabled : true,
			handler : function() {
				//alert("你在点启动轮循按钮哦！");
				
				Ext.Msg.confirm("提示", "确认启动轮循？", function(btn, text)
						{
							if (btn == "yes")
							{
										
										// 获取所有选中行
										var rows=Ext.getCmp('resultTable').getSelectionModel().getSelections();
//										var str = '';
//										for(var i=0;i <rows.length;i++){
//										str = str + rows[i].get('jobId')+rows[i].get('jobName')+rows[i].get('dir') ;
//										}
//										alert(str);
										var submitUrl = "runLoop";
										Ext.Ajax.request( {
											url : submitUrl,
											method : 'post',
											params: { jobName:rows[0].get('jobName'), dir:rows[0].get('dir'), jobId:rows[0].get('jobId'), idDirectory:rows[0].get('id_directory') },
											success : function(response, options) {
											var data = eval("(" + response.responseText + ")");
												if (!data.success) {
													Ext.Msg.alert('提示', "启动轮循失败，异常码："+data.msg);
												}
												else
												{
													alert("启动轮循成功！");
													queryFunc();
												}
											},
											failure : function(response, options) {
												var result = Ext.util.JSON.decode(response.responseText);
												Ext.Msg.alert('提示', "启动轮循失败，异常码：" + result.data);
											}
										});
										
							}
						});
				
				
			}
		} ,
		{
			xtype : 'tbbutton',
			text : '停止轮循',
			id : 'stopLoop',
			iconCls : 'icon_stop',
			disabled : true,
			handler : function() {
				//alert("你在点停止轮循按钮哦！");
				
				Ext.Msg.confirm("提示", "确认停止轮循？", function(btn, text)
						{
							if (btn == "yes")
							{
										
										// 获取所有选中行
										var rows=Ext.getCmp('resultTable').getSelectionModel().getSelections();
//										var str = '';
//										for(var i=0;i <rows.length;i++){
//										str = str + rows[i].get('jobId')+rows[i].get('jobName')+rows[i].get('dir') ;
//										}
//										alert(str);
										var submitUrl = "stopLoop?jobId="+rows[0].get('jobId');
										Ext.Ajax.request( {
											url : submitUrl,
											method : 'post',
											success : function(response, options) {
											var data = eval("(" + response.responseText + ")");
												if (!data.success) {
													Ext.Msg.alert('提示', "停止轮循失败，异常码："+data.msg);
												}
												else
												{
													alert("停止轮循成功！");
													queryFunc();
												}
											},
											failure : function(response, options) {
												var result = Ext.util.JSON.decode(response.responseText);
												Ext.Msg.alert('提示', "停止轮循失败，异常码：" + result.data);
											}
										});
										
							}
						});
				
				
			}
		},
		{
			xtype : 'tbbutton',
			text : '运行时间设置',
			id : 'runTimeSet',
			iconCls : 'icon_edit',
			disabled : false,
			handler : function() {
				//alert("你在点启动按钮哦！");
				jobRunTimeSet();
			}
		},
		{
			xtype : 'tbfill',
			disabled : false
		},
		{
			xtype : 'tbbutton',
			text : '停止',
			id : 'x1',
			iconCls : 'icon_red',
			disabled : false
		},
		{
			xtype : 'tbbutton',
			text : '结束',
			id : 'x2',
			iconCls : 'icon_yellow',
			disabled : false
		},
		{
			xtype : 'tbbutton',
			text : '开始',
			id : 'x3',
			iconCls : 'icon_blue',
			disabled : false
		},
		{
			xtype : 'tbbutton',
			text : '运行中',
			id : 'x4',
			iconCls : 'icon_green',
			disabled : false
		},
		{
			xtype : 'tbbutton',
			text : '未启动',
			id : 'x5',
			iconCls : 'icon_grey',
			disabled : false
		}];
		
		
		
//		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(resultTable,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);
		
		

	});