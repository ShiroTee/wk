
// 各种参数
var queryForm;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var queryListUrl = "getKnowledgeSolutionList?mark=0";
var deleteUrl = "delKnowledgeSolution";
var anchorSohw='100%';

var updateDataSolutionWin;
var exceDataSolutionWin

Ext.onReady(function() {
	
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget="qtip";
	// 解决日期控件在IE浏览器下面左右显示不全的BUG
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
	var gridDataSolutionStore = new Ext.data.Store( {
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
			name : 'id'
		}, {
			name : 'title'
		}, {
			name : 'content'
		}, {
			name : 'subTime'
		}, {
			name : 'solutionAccessoryName'
		}])),
		proxy : new Ext.data.HttpProxy( {
			url : queryListUrl
		})
	});

	// 选择模型
//		var sm = new Ext.grid.CheckboxSelectionModel( {
//			listeners : {
//				// 选中
//				'rowselect' : function(sm, row, rec) {
//					// 保存勾选中的Record的主键id值
//					if (!recordIds.contains(rec.get("id"))) {
//						recordIds.push(rec.get("id"));
//						recordObjs.push(rec);
//					}
//				},
//				// 不选中
//				'rowdeselect' : function(sm, row, rec) {
//					if (recordIds.contains(rec.get("id"))) {
//						recordIds.remove(rec.get("id"));
//						recordObjs.remove(rec);
//					}
//				}
//			}
//		});

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
			frame : false,
			border : true,
			sm : sm,
			id : "dataQualityListGird",
			tbar : [],
			store : gridDataSolutionStore,
			closable : true,
			autoScroll : true,
			loadMask : true,
			columnLines : true,   // 列分隔处显示分隔符
			stripeRows : true,    //显示行的分隔符
			trackMouseOver : true,  // 鼠标停留时间
			
			bbar : [],
			viewConfig :
		{
			forceFit : true
		},
			columns : [ sm, new Ext.grid.RowNumberer(), {
				header : "ID",
				dataIndex : 'id',
				hidden : true,
				sortable : true
			}, {
				header : "知识点",
				width : 80,
				dataIndex : 'title',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "知识点详解",
				width : 280,
				dataIndex : 'content',
				renderer : showDetailContent,
				renderer : formatQtip
			}, {
				header : "提交日期",
				width : 60,
				dataIndex : 'subTime',
				renderer : formatDate,
			}, {
				header : "附件",
				width : 40,
				align : 'center',
				dataIndex : "solutionAccessoryName",
				renderer : showAccessory
			}]
		});
		
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
	
		function showDetailContent(value, metadata, record, rowIndex, colIndex, store){
			var content = record.get("content");
			if(content.length>60){
				return content.substr(0,60)+"&nbsp;&nbsp;<a href='javascript:void(0)' onclick='showDetailWin()'>详情</a>";
			}else{
				return content;
			}
		}
		
		function formatDate(value, metadata, record, rowIndex, colIndex, store){
			return new Date(record.get("subTime")).format("Y-m-d");
		}
		
		showDetailWin = function(){
			var content = grid.getSelectionModel().getSelected().get("content");
			Ext.getCmp("logShowField").setValue(eval("(" + Ext.encode(content)+ ")"));
			detailWindow.show().center();
		}
		
		
		// 弹出的面板
		detailPanel = new Ext.form.FormPanel( {
			frame : false,
			title : '操作业务信息',
			id : 'detailPanel',
			bodyStyle : 'padding:10px;border:0px',
			labelwidth : 60,
			labelAlign : 'top',
			autoScroll : true,
			items : [ {
				textArea : 'logField',
				id : 'logShowField',
				name : 'logShowField',
				xtype : 'textarea',
				region : 'center',
				allowBlank : false,
				grow : true,//根据内容自动伸缩
				width : 700,
				height : 500,
				html : 'logShowField'
			} ]
		});

		// 弹出的窗口
		detailWindow = new Ext.Window( {
			layout : 'fit',
			width : 700,
			height : 250,
			closeAction : 'hide',
			plain : true,
			modal : true,
			resizable : true,
			buttonAlign : 'center',
			items : [ detailPanel ],
			buttons : [ {
					text : '关闭',
					iconCls : 'icon_close',
					handler : function() {
						detailWindow.hide();
					}
				} ]
		});

		
		// 查询条件
		var queryDataSolutionFormItems = [
		{
			layout : 'column',
			style : 'margin-left: 160px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .3,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					anchor : anchorSohw,
					blankText : '知识点',
					name : 'questionTitle',
					fieldLabel : '知识点',
					id : "addQuestionSolutionTitle"
				}]
			},
			{
				columnWidth : .7,
				layout : 'form',
				items : [ {
					fieldLabel : '提交日期',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'startTimeSoultion',
						id : 'startTimeSoultionId',
						altFormats : 'Y-m-d',
						width : 110,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
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
						name : 'endTimeSoultion',
						id : 'endTimeSoultionId',
						altFormats : 'Y-m-d',
						width : 110,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
					} ]
				} ]
			} 
			]
		}];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
		queryForm = new Ext.FormPanel( {
			id : 'queryDataSolutionForm',
			monitorResize : true,
			region : 'north',
			labelAlign : 'left',
			buttonAlign : 'center',
			collapsible : true,
			frame : true,
			title : '查询条件',
			autoWidth : true,
			autoHeight : true,
			items : queryDataSolutionFormItems,
			buttons : [{
				text : '查询',
				iconCls : 'icon_query',
				handler : function() {
					queryFunc();
				}
			},{
				text : '重置',
				iconCls : 'icon_reset',
				handler : function() {
					queryForm.getForm().reset();
				}
			}]
		});

		// 查询功能
		function queryFunc() {
			if(Ext.get('startTimeSoultionId').getValue()!="" && Ext.get('endTimeSoultionId').getValue()!="" && Ext.get('startTimeSoultionId').getValue()>Ext.get('endTimeSoultionId').getValue()){
				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
				return;
			}
			gridDataSolutionStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(gridDataSolutionStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			gridDataSolutionStore.load( {
				params : gridDataSolutionStore.baseParams
			});
		}

		function showAccessory(value, metadata, record, rowIndex, colIndex, store) {
			if(value.length>0){
				//return "<font color='blue'><a href='javascript:void(0)' onclick='downAccesoryUrl(\"" + record.get('id') + "\",\"3\")'>打开及保存</a></font>";
				return "<font color='blue'><a title='下载附件"+record.get('solutionAccessoryName')+"' href='javascript:void(0)' onclick='downAccesoryUrl(\"" + record.get('id') + "\",\"3\")'>"+record.get('solutionAccessoryName')+"</a></font>";
			}else{
				return "";
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
						fileUpload : true,
						autoHeight : true,
						buttonAlign : 'center',
						items : [{
							xtype : 'textfield',
							hidden : true,
							hideLabel : true,
							name : "addQuestionHiddenId",
							id : "addQuestionId"
						},{
							xtype : 'textfield',
							width : 400,
							allowBlank : false,
							blankText : '知识点',
							name : 'questionSolutionTitle',
							id : "addQuestionSolveTitle",
							maxLength : 30,//允许输入的最大字符数6
							maxLengthText : "知识点最大长度不能超过30个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>知识点'
						}, {
							xtype : 'textarea',
							name : 'questionContent',
							width : 400,
							height : 140,
							id : 'questionContentIds',
							allowBlank:false,
							anchor:'90%',
							maxLength : 400,//允许输入的最大字符数6
							maxLengthText : "知识点详解最大长度不能超过400个字符！",//提示文本
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>知识点详解'
						}, 
						//附件删除
						{
							layout : "column",
							columnWidth : 1,
							border : true,
							id :'attach',
							items :
							[
									{
										layout : "form",
										border : false,
										items :
										[
												{
													xtype : 'textfield',
													name : 'solveQuestionAnswerDafj',
													width : 350,
													allowBlank:false,
													disabled:true,
													fieldLabel : '知识点附件',
													id : 'solveQuestionAnswerDafjId'
												}
										]
									}, new Ext.Button(
									{
										id : 'release_person',
										name : 'release_person',
										disabled:false,
										text : '删除附件',
										handler : function()
										{			
										var dataId = Ext.getCmp("addQuestionId").getValue();
										var win = dataId.length>0 ? Ext.getCmp("updateDataSolutionWin") : Ext.getCmp("addDataSolution");
										
													Ext.Msg.confirm("提示", "知识点附件将会被删除，是否删除？", function(btn, text)
															{
																if (btn == "yes")
																{
																	var submitUrl = "delDafj?solveDataHiddenId="+dataId;
																	
																	Ext.Ajax.request( {
																		url : submitUrl,
																		method : 'post',
																		success : function(response, options) {
																			
																			grid.store.reload();
																			win.close();
																		},
																		failure : function(response, options) {
																			var result = Ext.util.JSON.decode(response.responseText);
																			Ext.Msg.alert('提示', "异常码：" + result.data);
																		}
																	});
																}
																
															});
										}
									})
							]
						},
						
						{
							xtype : 'textfield',
							fieldLabel : '上传附件',
							name : 'userfile',
							width : 400,
							id : 'userfile',
							inputType : 'file',
							blankText : 'File can\'t not empty.',
							anchor : '90%'
						} ,{html:'<input id="resetForm" type=reset style="display:none;">',border:false}],
						buttons : [
								{
									text : '保存',
									iconCls : 'icon_save',
									handler : function() {
									
									var submitUrl,win;
									var dataId = Ext.getCmp("addQuestionId").getValue();
									win = dataId.length>0 ? Ext.getCmp("updateDataSolutionWin") : Ext.getCmp("addDataSolution");
									
									var window;
									if(dataId.length>0)
									{
										window = updateDataSolutionWin;
									}
									else
									{
										window = exceDataSolutionWin;
									}
									
									var name = Ext.getCmp("addQuestionSolveTitle").getValue();
									if(name.length == 0){
											
										window.getEl().mask();
										
										Ext.Msg.alert("提示","有数据项未通过的验证，请仔细检查！",function(){window.getEl().unmask();},this);
										return;
									}
									var reason = Ext.getCmp("questionContentIds").getValue();
									if(reason.length == 0){
										
											
										window.getEl().mask();
										
										Ext.Msg.alert("提示","有数据项未通过的验证，请仔细检查！",function(){window.getEl().unmask();},this);
										return;
									}
									if(dataId.length>0){
										submitUrl = "updateKnowledgeSolution?id"+dataId;
									}else{
										submitUrl = "addKnowledgeSolution";
									}
									
									
									
									if(Ext.getCmp("solveQuestionAnswerDafjId").getValue()!='无'&&Ext.getCmp("userfile").getValue()!='')
									{
										Ext.Msg.confirm("提示", "知识点附件将会被覆盖，是否覆盖？", function(btn, text)
												{
													if (btn == "yes")
													{
														
														dataQualityFormInfo.getForm().submit({
																clientValidation : true, // 进行客户端验证
																waitMsg : '数据正在提交.....', // 提示信息
																waitTitle : '请稍等', // 标题
																url : submitUrl,
																method : 'POST',
																success : function(dataQualityFormInfo,action) {
																	
																	var grid = Ext.getCmp("dataQualityListGird");
																	grid.store.reload();
																	win.close();
																	Ext.Msg.alert('提示信息','操作成功！');
																},
																failure : function(dataQualityFormInfo,action) {
																	window.getEl().mask();
																	Ext.Msg.alert("提示",action.result.msg,function(){window.getEl().unmask();},this);
																}
															})
													}
												});
									}else
									{
										dataQualityFormInfo.getForm().submit({
											clientValidation : true, // 进行客户端验证
											waitMsg : '数据正在提交.....', // 提示信息
											waitTitle : '请稍等', // 标题
											url : submitUrl,
											method : 'POST',
											success : function(dataQualityFormInfo,action) {
												win = dataId.length>0 ? Ext.getCmp("updateDataSolutionWin") : Ext.getCmp("addDataSolution");
												var grid = Ext.getCmp("dataQualityListGird");
												grid.store.reload();
												win.close();
												Ext.Msg.alert('提示信息','操作成功！');
											},
											failure : function(dataQualityFormInfo,action) {
												window.getEl().mask();
												Ext.Msg.alert("提示",action.result.msg,function(){window.getEl().unmask();},this);
											}
										})
									}
														
										
									}
								}
								,{
									text : '重置',
									iconCls : 'icon_reset',
									id:'clear_btn',
									handler : function() {
										var dataId = Ext.getCmp("addQuestionId").getValue();
										if(dataId.length>0){
											Ext.getCmp("clear_btn").setVisible(false);
										}else{
											document.getElementById('resetForm').click();
											dataQualityFormInfo.form.reset();
										}
									}
								},
								{
										text : '关闭',
										iconCls : 'icon_close',
										handler : function()
										{
											var dataId = Ext.getCmp(
													"addQuestionId").getValue();
											if (dataId.length > 0) {
												Ext.getCmp('updateDataSolutionWin').close();
											}else{
												Ext.getCmp('addDataSolution').close();
											}
										}
									}]
					});
			return dataQualityFormInfo;
		}
		
		
		// 查看数据的from
		function lookupDataSolutionForm() {
			var dataQualityFormInfo = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dataQualityFormInfo",
						width : 360,
						border : false,
						fileUpload : true,
						autoHeight : true,
						items : [{
							xtype : 'textfield',
							hidden : true,
							hideLabel : true,
							name : "addQuestionHiddenId",
							id : "addQuestionId"
						},{
							xtype : 'textfield',
							width : 400,
							allowBlank : false,
							blankText : '知识点',
							readOnly : true,
							name : 'questionSolutionTitle',
							fieldLabel : '知识点',
							id : "addQuestionSolveTitle"
						}, {
							xtype : 'textarea',
							name : 'questionContent',
							width : 400,
							readOnly : true,
							height : 180,
							fieldLabel : '知识点详解',
							id : 'questionContentIds'
						}, {
					           layout : "form",
					           items : [{
					              id : "questionAttach",
					              name : "showQuestionAttach"
					              
					             }]
				         }]
					});
			return dataQualityFormInfo;
		}

		function editDataSolution(){
			var records = sm.getSelections(); // 针对所有选中数据,包括分页的
			if (records.length == 0)
			{
				Ext.Msg.alert('提示信息','请选择数据!');
				return;
			} else if(records.length > 1){
				Ext.Msg.alert('提示信息','请选择一行数据!');
				return;
			} else {
				updateDataSolutionWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'updateDataSolutionWin',
					closeAction : 'close',
					resizable : false,
					width : 600,
					height :340,
					shadow : true,
					title : '修改知识点',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items:[createDataSolutionForm()]
				});
				var rec = records[0];
				var id = rec.get('id');
				var url = "getDataSoultionInfo?id="+id;
				updateDataSolutionWin.show();
				var form = Ext.getCmp("dataQualityFormInfo");
				loadDataSolutionCallBack(form,url,"获取知识数据异常",'edit');
				Ext.getCmp("clear_btn").setVisible(false);
			}
		}
		
		
		function addDataSolution() {
			
			 exceDataSolutionWin = new Ext.Window( {
				layout : 'fit',
				id : 'addDataSolution',
				closeAction : 'close',
				resizable : false,
				width : 600,
				height : 300,
				shadow : true,
				title : '添加知识点',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items : [ createDataSolutionForm() ]
			});
			exceDataSolutionWin.show();
			Ext.getCmp("attach").setVisible(false);
			Ext.getCmp("solveQuestionAnswerDafjId").setValue("无");
		}
		
		
		function loadDataSolutionCallBack(form,url,messages,flag){
			
			form.form.reset();
			form.form.load(
			{
				waitMsg : '正在加载数据请稍后',// 提示信息
				waitTitle : '提示',// 标题
				url : url,
				method : 'POST',// 请求方式
				success : function(form, action)
				{
				
					Ext.getCmp("addQuestionId").setValue(action.result.data.id);
					Ext.getCmp("addQuestionSolveTitle").setValue(action.result.data.title);
					Ext.getCmp("questionContentIds").setValue(action.result.data.content);
					
					//查看
					if(flag=='look')
					{
					
						var downLoadSolveAccessoryStr;
						//alert(action.result.data.solutionAccessoryName)
						if(action.result.data.solutionAccessoryName.length != 0){
							downLoadSolveAccessoryStr = "<span style='font-size:9pt;'>知识点附件：&nbsp;&nbsp;<a title='下载知识点附件' href='javascript:void(0);' onclick='downAccesoryUrl(\"" + action.result.data.id + "\",\"3\")' style='text-decoration: none; margin-left: 25px;'>"+action.result.data.solutionAccessoryName+"</a></span>";
						}
						Ext.getCmp("questionAttach").body.update(downLoadSolveAccessoryStr);
					
					}
					//编辑
					if(flag=='edit')
					{
						var dafj = action.result.data.solutionAccessoryName;
						if(dafj==undefined||dafj=='')dafj='无'
						Ext.getCmp("solveQuestionAnswerDafjId").setValue(dafj);
						if(Ext.getCmp("solveQuestionAnswerDafjId").getValue()=='无')
						{
							//Ext.getCmp("release_person").disabled = true;
							document.getElementById("release_person").disabled = true;
						}
					}
					
					
				},
				failure : function(form, action)
				{// 加载失败的处理函数
					var result = Ext.util.JSON.decode(action.response.responseText);
					Ext.Msg.alert('提示', messages + result.data);
				}
			});
		}

		/**
		 * 删除数据问题
		 */
		function delDataSolution() {
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
							Ext.Ajax.request( {
								// 发送请求
								url : deleteUrl,
								method : 'POST',
								params : {
									jsonStr : Ext.util.JSON.encode(recordIdArr)
								},
								success : function(response, opts) {
									gridDataSolutionStore.reload();
								},
								failure : function(response, opts) {
									Ext.MessageBox.show( {
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
		
		
		function lookupSolution(){
			var records = sm.getSelections(); // 针对所有选中数据,包括分页的
			if (records.length == 0)
			{
				Ext.Msg.alert('提示信息','请选择数据!');
				return;
			} else if(records.length > 1){
				Ext.Msg.alert('提示信息','请选择一行数据!');
				return;
			} else {
				var updateDataSolutionWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'updateDataSolutionWin',
					closeAction : 'close',
					resizable : false,
					width : 600,
					height :300,
					shadow : true,
					title : '查看知识点',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items:[lookupDataSolutionForm()]
				});
				var rec = records[0];
				var id = rec.get('id');
				var url = "getDataSoultionInfo?id="+id;
				updateDataSolutionWin.show();
				var form = Ext.getCmp("dataQualityFormInfo");
				loadDataSolutionCallBack(form,url,"获取知识数据异常",'look');
				Ext.getCmp("clear_btn").setVisible(false);
			}
		}
			//双击GridPanel中的一行，弹出查看窗口
//			grid.addListener("rowdblclick", function(){
//				 handler:{ lookupSolution(); }
//			});
		
			// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
	function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}
		
		
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("对数据监控的各个重要知识点进行详细讲解,供系统使用人员参考学习。");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryDataSolutionForm", queryDataSolutionFormItems, queryFunc);
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
		//定义工具栏的元素组
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
			handler : editDataSolution
		}, {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : "删除",
			iconCls : 'icon_delete',
			handler : delDataSolution
		}, 
		{
			xtype : 'tbseparator'
		},
		{
			xtype : 'tbbutton',
			text : "查看",
			iconCls : 'icon_lookup',
			handler : lookupSolution
		}
		];
//		 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("baseKnowledgeLib_div", grid);
					  baseKnowledgeLib_div
	});

function downAccesoryUrl(id,type){
	Ext.Msg.confirm("提示", "确定要下载吗？", function(btn, text)
	{
		if (btn == "yes")
		{
			var downUrl = "downloadFile?type="+type+"&id="+id;
			window.location.href=downUrl;
		}
	});
}
