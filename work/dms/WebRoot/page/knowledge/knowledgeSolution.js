
// 各种参数
var queryForm;
var queryListUrl = "getKnowledgeSolutionList?mark=1";
var deleteUrl = "delKnowledgeSolution";
var anchorSohw='100%'; 
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
			name : 'answer'
		}, {
			name : 'type'
		}, {
			name : 'subTime'
		},{
			name : 'solutionAccessoryName'
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
			frame : false,
			border : true,
			sm : sm,
//			title : "数据质量知识库解决方案列表",
			id : "dataQualityListGird",
			tbar : [],
			store : gridDataSolutionStore,
			columnLines : true,   // 列分隔处显示分隔符
			stripeRows : true,    //显示行的分隔符
			trackMouseOver : true,  // 鼠标停留时间
			closable : true,
			autoScroll : true,
			loadMask : true,
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
				header : "问题名称",
				width : 80,
				dataIndex : 'title',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "来源",
				renderer : formatQtip,
				width : 50,
				dataIndex : "type"
			}, {
				header : "导入日期",
				width : 60,
				dataIndex : 'subTime',
				renderer : function(v2)
				 {
					return new Date(v2) ? new Date(v2).dateFormat('Y-m-d') : '';
				 }
			}, {
				header : "问题描述",
				renderer : formatQtip,
				width : 120,
				dataIndex : 'content'
			}, {
				header : "问题答案",
				renderer : formatQtip,
				width : 120,
				dataIndex : 'answer'
			},{
				header : "附件",
				width : 50,
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
		var comboErrorProvinces = new Ext.form.ComboBox(
		{
			store : new Ext.data.SimpleStore(
					{
						fields : [ 'sourceFrom', 'id' ],
						data : [ [ '全部', null ],
								 [ '问题库导入', '1' ]]
					}),
			valueField : 'id',// 定义值字段
			fieldLabel : '', // UI标签名称
			displayField : 'sourceFrom',// 定义要显示的字段
			mode : 'local',
			forceSelection : true,
			id : "dataSorceFromId",
			blankText : '来源',
			emptyText : '请选择',
			hiddenName : 'dataSorceFrom',
			editable : false,
			allowBlank : true, // 是否允许为空
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '来源',
			value : '全部', 
			anchor:anchorSohw
		});
		
		function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}
		
		// 查询条件
		var queryDataSolutionFormItems = [
		{
			layout : 'column',
			style : 'margin-left: 40px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .25,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					anchor:anchorSohw,
					blankText : '问题名称',
					name : 'questionTitle',
					fieldLabel : '问题名称',
					id : "addQuestionSolutionTitle"
				}]
			},
			{
				columnWidth : .25,
				layout : 'form',
				items : [comboErrorProvinces]
			},
			{
				columnWidth : .5,
				layout : 'form',
				items : [ {
					fieldLabel : '  导入日期',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'startTimeSoultion',
						id : 'startTimeSoultionId',
						altFormats : 'Y-m-d',
						format : 'Y-m-d',
						width : 110,
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

//		queryForm.render('knowledgeSolution_div');
//		grid.render('knowledgeSolution_div');

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
				return "<font color='blue'><a title='下载附件"+ record.get('solutionAccessoryName') +"' href='javascript:void(0)' onclick='downAccesoryUrl(\"" + record.get('id') + "\",\"3\")'>"+ record.get('solutionAccessoryName') +"</a></font>";
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
						labelAlign : 'right',
						buttonAlign : 'center',
						items : [{
							xtype : 'textfield',
							hidden : true,
							hideLabel : true,
							name : "addQuestionHiddenId",
							id : "addQuestionId"
						},{
							xtype : 'textfield',
							width : 330,
							allowBlank : false,
							blankText : '请填写名称',
							name : 'questionSolutionTitle',
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题名称',
							id : "addQuestionSolveTitle"
						}, {
							xtype : 'textarea',
							name : 'questionContent',
							width : 330,
							height : 150,
							allowBlank : false,
							blankText : '请填写问题描述',
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题描述',
							id : 'questionContentId'
						}, {
							xtype : 'textarea',
							name : 'questionAnswer',
							width : 330,
							height : 150,
							allowBlank : false,
							blankText : '请填写问题答案',
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题答案',
							id : 'questionAnswerId'
						}, {
							xtype : 'textfield',
							fieldLabel : '上传附件名',
							name : 'userfile',
							id : 'userfile',
							width : 330,
							inputType : 'file',
							blankText : 'File can\'t not empty.',
							anchor : '90%'
						} ],
						buttons : [
								{
									text : '重置',
									iconCls : 'icon_reset',
									id:'clear_btn',
									handler : function() {
										if(dataId.length>0){
											Ext.getCmp("clear_btn").disable();
										}else{
											dataQualityFormInfo.form.reset();
										}
									}
								},
								{
									text : '保存',
									iconCls : 'icon_save',
									handler : function() {
										var submitUrl,win;
										var dataId = Ext.getCmp("addQuestionId").getValue();
										var name = Ext.getCmp("addQuestionSolveTitle").getValue();
										if(name.length == 0){
											Ext.Msg.alert("提示","问题名称不能为空！");
											return;
										}
										var reason = Ext.getCmp("questionContentId").getValue();
										if(reason.length == 0){
											Ext.Msg.alert("提示","问题描述不能为空！");
											return;
										}
										var answer = Ext.getCmp("questionAnswerId").getValue();
										if(answer.length == 0){
											Ext.Msg.alert("提示","问题答案不能为空！");
											return;
										}
										
										if(dataId.length>0){
											submitUrl = "updateKnowledgeSolution?id"+dataId;
										}else{
											submitUrl = "addKnowledgeSolution";
										}
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
													Ext.Msg.alert("提示","操作失败！");
												}
											})
									}
								} ,
								{
									text : '关闭',
									iconCls : 'icon_close',
									handler : function()
									{						
										Ext.getCmp('updateDataSolutionWin').close();
									}
							}]
					});
			return dataQualityFormInfo;
		}
		
		function lookupDataSolutionForm() {
			var dataQualityFormInfo = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dataQualityFormInfo",
						width : 360,
						height : 400,
						border : false,
						fileUpload : true,
						labelAlign : 'right',
						buttonAlign : 'center',
//						autoHeight : true,
						items : [{
							xtype : 'textfield',
							hidden : true,
							hideLabel : true,
							name : "addQuestionHiddenId",
							id : "addQuestionId"
						},{
							xtype : 'textfield',
							width : 350,
							allowBlank : false,
							blankText : '名称',
							readOnly : true,
							name : 'questionSolutionTitle',
							fieldLabel : '问题名称',
							id : "addQuestionSolveTitle"
						}, {
							xtype : 'textarea',
							name : 'questionContent',
							readOnly : true,
							width : 350,
							height : 115,
							fieldLabel : '问题描述',
							id : 'questionContentId'
						}
//						, {
//							xtype : 'textarea',
//							name : 'questionAnswer',
//							readOnly : true,
//							width : 350,
//							height : 135,
//							fieldLabel : '问题答案',
//							id : 'questionAnswerId'
//						} 
						,{// 行三
				        	  layout : "column", // 从左往右的布局
					          items : [{
					              columnWidth : .9, // 该列有整行中所占百分比
						          layout : "form",
						          items : [{
						        	  xtype : 'textarea',
										name : 'questionAnswer',
						                anchor : '100%',
										readOnly : true,
										height : 115,
										fieldLabel : '问题答案',
										id : 'questionAnswerId'
						            }]
					          }, {
						           layout : "form",
						           items : [{
						              id : "showSolveQuestionAccessoryId",
						              name : "showSolveQuestionAccessory"
						              
						             }]
					         }]
				         }
						
						],
						buttons : [
						{
							text : '关闭',
							iconCls : 'icon_close',
							handler : function(){
								Ext.getCmp("updateDataSolutionWin").close();
						    }
						}]
					});
			return dataQualityFormInfo;
		}


		function addDataSolution() {
			var exceDataSolutionWin = new Ext.Window( {
				layout : 'fit',
				id : 'addDataSolution',
				closeAction : 'close',
				resizable : false,
				width : 540,
				height : 420,
				shadow : true,
				title : '添加解决方案知识库问题',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items : [ createDataSolutionForm() ]
			});
			exceDataSolutionWin.show();
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
				var updateDataSolutionWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'updateDataSolutionWin',
					closeAction : 'close',
					resizable : false,
					width : 540,
					height :450,
					shadow : true,
					title : '修改典型案例解决方案信息',
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
				loadDataSolutionCallBack(form,url,"获取知识数据异常");
				Ext.getCmp("clear_btn").setVisible(false);
			}
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
					Ext.getCmp("addQuestionId").setValue(action.result.data.id);
					Ext.getCmp("addQuestionSolveTitle").setValue(action.result.data.title);
					Ext.getCmp("questionContentId").setValue(action.result.data.content);
					Ext.getCmp("questionAnswerId").setValue(action.result.data.answer);
					
					if(action.result.data.solutionAccessoryName)
					{
						if(action.result.data.solutionAccessoryName.length != 0){
							downLoadSolveAccessoryStr = "<span style='font-size:9pt;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;答案附件:<a title='下载答案附件' href='javascript:void(0);' onclick='downAccesoryUrl(\"" + action.result.data.id + "\",\"3\")' style='text-decoration: none; margin-left: 15px;'>"+action.result.data.solutionAccessoryName+"</a></span>";
						}
						Ext.getCmp("showSolveQuestionAccessoryId").body.update(downLoadSolveAccessoryStr);
					}
					
				},
				failure : function(form, action)
				{// 加载失败的处理函数
					var result = Ext.util.JSON.decode(action.response.responseText);
					Ext.Msg.alert('提示', messages + result.data);
				}
			});
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
					width : 540,
					height :400,
					shadow : true,
					title : '查看典型案列解决方案信息',
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
				loadDataSolutionCallBack(form,url,"获取知识数据异常");
			}
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
		
		//双击GridPanel中的一行，弹出查看窗口
//			grid.addListener("rowdblclick", function(){
//				 handler:{ lookupSolution(); }
//			});
		
		
		
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("展示收集到的具有典型意义的问题处理解决方案，供系统使用人员参考学习。");
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
		var topToolbarItems = [ /*{
			xtype : 'tbbutton',
			text : '编辑',
			id : 'btnStart',
			iconCls : 'icon_edit',
			disabled : false,
			handler : editDataSolution
		}, {
			xtype : 'tbseparator'
		},*/ {
			xtype : 'tbbutton',
			text : "删除",
			iconCls : 'icon_delete',
			handler : delDataSolution
		}, {
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
		setMainPanel("knowledgeSolution_div", grid);
		
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
