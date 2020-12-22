
// 保存选中的Record主键列id列表
var queryListUrl = "getDataFileList";
var deleteUrl = "delDataQuality";
var importSolutionUrl = "importSolutionData";
// 各种参数
var anchorSohw='100%';
var queryForm,showDetailDownId,downLoadSubAccessoryStr,downLoadSolveAccessoryStr; 
var gridDataStore;
var dafjFlag;
var getAnswerWin;

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
		gridDataStore = new Ext.data.Store({
			autoLoad : {
				params : {
					start : 0,
					limit : pageSize
				}
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
			reader : new Ext.data.JsonReader( {
				totalProperty : "count",
				root : "list"
			}, Ext.data.Record.create( [ {
				name : 'id'
			}, {
				name : 'name'
			}, {
				name : 'errType'
			}, {
				name : 'logDate'
			}, {
				name : 'logField'
			},  {
				name : 'clbz'
			}, {
				//是否已经被导入到解决方案
				name : 'mark'
			}, {
				//是否已经被导入到解决方案
				name : 'clff'
			}, {
				//解决问题附件(用于判定详情页面的下载链接)
				name : 'solveAccessoryName'
			}, {
				//解决问题附件(用于判定详情页面的下载链接)
				name : 'erroReason'
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
			sm : sm,
			id : "dataQualityListGird",
			tbar : [],
			store : gridDataStore,
			frame : false,
			border : false,
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
			columns : [sm, new Ext.grid.RowNumberer(),{
				header : "ID",
				dataIndex : 'id',
				hidden : true,
				sortable : true
			}, {
				header : "问题名称",
				width : 60,
				dataIndex : 'name',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "问题来源",
				width : 30,
				renderer : formatQtip,
				dataIndex : 'errType'
			}, {
				header : "发生时间",
				width : 40,
				dataIndex : 'logDate',
				renderer : formatQtip
			}, {
				header : "问题描述",
				width : 50,
				dataIndex : 'logField',
				renderer : renderOper
			},{
				header : "问题答案",
				width : 50,
				dataIndex : "clbz",
				renderer : dataStatus
			}, {
				header : "标志",
				dataIndex : 'mark',
				hidden : true,
				renderer : formatQtip,
				sortable : true
			}, {
				header : "是否处理",
				dataIndex : 'clff',
				hidden : true,
				renderer : formatQtip,
				sortable : true
			}, {
				header : "解决附件名称",
				dataIndex : 'solveAccessoryName',
				hidden : true,
				renderer : formatQtip,
				sortable : true
			}, {
				header : "错误原因",
				dataIndex : 'erroReason',
				hidden : true,
				renderer : formatQtip,
				sortable : true
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
		function dataStatus(value, metadata, record, rowIndex, colIndex, store){
			var showStr = "未&nbsp;解&nbsp;决",accesoryStr='';
			var returnStr = "<font color='blue'><a href='javascript:void(0)' onclick='solveQuestion(\"" + record.get('id') + "\",\"" + record.get('name') + "\")'>"+showStr+"</a>"+accesoryStr+"</font>";
			if('F'!=record.get('clbz')){
				showStr = "问题解决详情";
				returnStr = "<font color='blue'><a href='javascript:void(0)' onclick='showQuestionDetail(\"" + record.get('id') + "\")'>"+showStr+"</a>"+accesoryStr+"</font>";
			}
			return returnStr;
		}
		
				
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
					anchor: anchorSohw,
					blankText : '问题名称',
					name : 'name',
					width : 130,
					fieldLabel : '问题名称',
					id : "name"
				}]
			},
			{
				columnWidth : .7,
				layout : 'form',
				items : [ {
					fieldLabel : '发生时间',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'startTime',
						width : 120,
						id : 'startTime',
						altFormats : 'Y-m-d',
						format : 'Y-m-d',
						editable:false,
						anchor: anchorSohw
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
						name : 'endTime',
						id : 'endTime',
						altFormats : 'Y-m-d',
						width : 120,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
					} ]
				} ]
			} 
			]
		}];
		
//		function formatDate(value, metadata, record, rowIndex, colIndex, store){
//			return new Date(value).format("Y-m-d h:m:s")
//		}
		
	function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}
		
		// 格式化'查看日志信息'
		function renderOper(value, metadata, record, rowIndex, colIndex, store) {
			var result = "<font color='blue'><a href=\"javascript:showEditWindow();\">作业日志详情</a></font>";
			return result;
		}
		
		// 弹出编辑页面
		showEditWindow = function() {
			var record = grid.getSelectionModel().getSelected();
			if (record.data.length == 0) {
				alert('未检测到数据!');
			} else {
				var id = record.get("id");
				Ext.Ajax.request( {
					url : 'getLogMessage?id=' + id,
					method : 'post',
					success : function(response, options) {
						var results = eval("(" + Ext.encode(response.responseText)+ ")");
						Ext.getCmp('logShowField').setValue(results);
						detailWindow.show().center();
					},
					failure : function(response, options) {
						var result = Ext.util.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', "异常码：" + result.data);
					}
				});
			}
		}
		
		// 弹出的面板
		detailPanel = new Ext.Panel( {
			frame : false,
			id : 'detailPanel',
			bodyStyle : 'padding-left:10px; padding-top:5px; padding-bottom:5px; border:0px',
			autoScroll : true,
			defaults : {
				selectOnFocus : true, // 点击即选中
				width : '100%',
				height : '100%',
				xtype : "textarea"
			},
			items : [ {
				textArea : 'logField',
				id : 'logShowField',
				name : 'logShowField',
				xtype : 'textarea',
				region : 'center',
				allowBlank : false,
				readOnly :true,
				grow : true,//根据内容自动伸缩
				width : 700,
				height : 450,
				html : 'logShowField'
			} ]
		});

		// 弹出的窗口
		detailWindow = new Ext.Window( {
			layout : 'fit',
			title : '作业日志详细信息',
			width : 730,
			height : 450,
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


		// 查询功能
		function queryFunc() {
			gridDataStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(gridDataStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			gridDataStore.load( {
				params : gridDataStore.baseParams
			});
		}
		
		/**
		 * 导入数据到解决方案
		 */
		function importSolution(){
			var records = sm.getSelections(); // 针对所有选中数据,包括分页的
			if (records.length != 1)
			{
				Ext.MessageBox.alert("提示","请选择一个数据");
				return;
			} else {
				Ext.Msg.confirm("提示", "确定要导出吗？", function(btn, text)
				{
					if (btn == "yes")
					{
						var recordIdArr = [];
						var flag = false;
						for ( var i = 0; i < records.length; i++)
						{
							var rec = records[i];
							recordIdArr.push(rec.get('id'));
							if('F' == rec.get('clbz')){
								flag = true;
							}
						}
						if(flag){
							Ext.Msg.alert('提示信息','请选择已解决的问题数据!');
							return;
						}
						if (recordIdArr.length != 0)
						{
							Ext.Ajax.request(
							{
								// 发送请求
								url : importSolutionUrl,
								method : 'POST',
								params :
								{
									jsonStr : Ext.util.JSON.encode(recordIdArr)
								},
								success : function(response, opts)
								{
									Ext.MessageBox.alert("提示","导出成功，请刷新典型案例解决方案列表查看！");
								},
								failure : function(response, opts)
								{
									Ext.MessageBox.show(
									{
										title : '错误',
										msg : '导出失败!请联系管理员',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});
						}
					}
				});
			}
		}
		

		function getInfoPanel(){
			var infoPanel = new Ext.FormPanel(
			{
				
				//title : '数据知识库问题详情',
				bodyStyle : 'padding: 5px',
				width : '100%',
				autoHeight : true,
				frame : true,
				layout : "form", // 整个大的表单是form布局
				labelWidth : 65,
				collapsible : false,
				buttonAlign : 'center',
				items : [{ 
			        layout : "column", 
			        items : [{
			           columnWidth : .5, 
			           layout : "form", 
			           items : [{
			              xtype : "textfield",
			              fieldLabel : "问题名称",
			              anchor : '80%',
			              readOnly : true,
			              id : "showTitleId"
			             }]
			           }, {
			           columnWidth : .5,
			           layout : "form",
			           items : [{
			              xtype : "textfield",
			              fieldLabel : "发生时间",
			              readOnly : true,
			              id : "showSubTimeId",
			              anchor : '80%'
			             }]
			          }]
			       }, { layout : "column", // 从左往右的布局
				        items : [ {
					           columnWidth : .5,
					           layout : "form",
					           items : [{
					              xtype : "textfield",
					              fieldLabel : "解决人",
					              readOnly : true,
					              id : "showSolveUserId",
					              anchor : '80%'
					             }]
					          }, {
					           columnWidth : .5,
					           layout : "form",
					           items : [{
					              xtype : "textfield",
					              readOnly : true,
					              fieldLabel : "解决时间",
					              id : "showSolveTimeId",
					              anchor : '80%'
					             }]
					          }]
			         },{// 行三
					        layout : "column", // 从左往右的布局
					        items : [{
					           columnWidth : .9, // 该列有整行中所占百分比
					           layout : "form",
					           items : [{
					        	  xtype : 'textarea',
									name : 'questionContent',
					                anchor : '100%',
									readOnly : true,
									height : 120,
									fieldLabel : '问题描述',
									id : 'showQuestionContentId'
					            }]
					           }, {
					           columnWidth : .4,
					           layout : "form",
					           items : [{
					              id : "showSubQuestionAccessoryId",
					              name : "showSubQuestionAccessory"
					             }]
					          }]
			         },
			         {// 行三
		        	  layout : "column", // 从左往右的布局
				          items : [{
				              columnWidth : .9, // 该列有整行中所占百分比
					          layout : "form",
					          items : [{
					        	  xtype : 'textarea',
									name : 'questionAnswer',
					                anchor : '100%',
									readOnly : true,
									height : 120,
									fieldLabel : '问题答案',
									id : 'showQuestionAnswerId'
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
						Ext.getCmp("qualityWin").close();
				    }
				}]
			});
			return infoPanel;
		}
			
		showQuestionDetail = function(id){
			showDetailDownId = id;
			if (id.length == 0){
				alert('未检测到数据!');
			} else {
				// 从后台查询详细信息
				var msgTip = Ext.MessageBox.show(
						{
							title : '提示',
							width : 250,
							msg : '正在读取信息请稍后......'
						});
				var qualityWin = new Ext.Window( {
					layout : 'fit',
					id : 'qualityWin',
					closeAction : 'close',
					resizable : false,
					width : 900,
					height : 425,
					shadow : true,
					title : '问题解决详情',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items : [ getInfoPanel() ]
				});
				Ext.Ajax.request(
						{
							url : "getDataQualityBeanInfo",
							method : 'POST',
							params :
							{
								id : id
							},
							success : function(response, options)
							{
								msgTip.hide();
								var result = Ext.util.JSON.decode(response.responseText);
								if (result.success)
								{
									Ext.getCmp("showTitleId").setValue(result.data.name);
									//字符串转Date:  new   Date(Date.parse(s.replace(/-/g,   "/")));
									//alert(new Date(Date.parse((result.data.logDate).replace(/-/g,"/"))).format("Y-m-d H:i:s"));
									Ext.getCmp("showSubTimeId").setValue(result.data.logDate);
									Ext.getCmp("showSolveUserId").setValue(result.data.clpy);
									Ext.getCmp("showSolveTimeId").setValue(new Date(result.data.clrq).format("Y-m-d H:i:s"));
									Ext.getCmp("showQuestionAnswerId").setValue(result.data.clff);
									Ext.getCmp("showQuestionContentId").setValue(result.data.erroReason);
									if(result.data.solveAccessoryName)
									{
										if(result.data.solveAccessoryName.length != 0){
											downLoadSolveAccessoryStr = "<span style='font-size:9pt;'>答案附件:<a title='下载答案附件' href='javascript:void(0);' onclick='downLoadshowQuestionAccessoryUrl(\"2\")' style='text-decoration: none; margin-left: 25px;'>"+result.data.solveAccessoryName+"</a></span>";
										}
										Ext.getCmp("showSolveQuestionAccessoryId").body.update(downLoadSolveAccessoryStr);
									}
									
								} else
								{
									Ext.Msg.alert('提示', "异常码：" + result.msg);
								}
							},
							failure : function(response, options)
							{
								var result = Ext.util.JSON.decode(response.responseText);
								msgTip.hide();
								Ext.Msg.alert('提示', "异常码：" + result.data);
							}
						});
				qualityWin.show();
			}
		}
		
		/**
		 * 删除数据问题
		 */
		function delDataQuality(){
				var records = sm.getSelections(); // 针对所有选中数据,包括分页的
				if (records.length == 0)
				{
					Ext.Msg.alert('提示信息','请选择数据!');
					return;
				} else {
					var recordIdArr = [];
					for ( var i = 0; i < records.length; i++)
					{
						var rec = records[i];
						recordIdArr.push(rec.get('id'));
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
										jsonStr : Ext.util.JSON.encode(recordIdArr)
									},
									success : function(response, opts)
									{
										gridDataStore.reload();
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
		
		var questionCard = new Ext.Panel({
			id : 'mainCard',
			layout : 'card',
			activeItem : 0,
			autoWidth : true,
			titleCollapse : true,
			autoHeight : true,
			items : [grid]
		});
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("因异常而造成数据处理流程中断的问题，对其解决情况进行跟踪。");
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
			text : '编辑',
			id : 'btnStart',
			iconCls : 'icon_edit',
			disabled : false,
			handler : updateDataQuality
		}, {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : "删除",
			iconCls : 'icon_delete',
			handler : delDataQuality
		}, {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : "导出到典型案例解决方案",
			//iconCls : 'icon_export',
			iconCls : 'icon_export_new',
			handler : importSolution
		} ];
//		 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("knowledgeQuality_div", questionCard);
		
		
});

function solveQuestion(id,title,questionDesc){
	 getAnswerWin = new Ext.Window(
			{
				layout : 'fit',
				id : 'dataAnswerWin',
				closeAction : 'close',
				resizable : false,
				width : 700,
				height :435,
				shadow : true,
				title : '解决问题',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items:[createDataAnswerForm(id,title,questionDesc)]
			});
	getAnswerWin.show();
}


function updateDataQuality(){
	var records = sm.getSelections(); // 针对所有选中数据,包括分页的
	if (records.length == 0)
	{
		Ext.Msg.alert('提示信息','请选择数据!');
		return;
	} else if (records.length != 1)
	{
		Ext.Msg.alert('提示信息','请选择一条数据！');
		return;
	} else {
		var rec = records[0];
		if(rec.get('status') == 0){
			Ext.Msg.alert('提示','对不起，你只能修改状态为查看详情的问题！');
			return;
		}
		var id = rec.get('id'),title=rec.get('name'),questionDesc=rec.get('erroReason'),answer = rec.get('clff'),dafj = rec.get('solveAccessoryName');
		getAnswerWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'dataAnswerWin',
					closeAction : 'close',
					resizable : false,
					width : 700,
					height :435,
					shadow : true,
					title : '解决问题',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items:[createDataAnswerForm(id,title,questionDesc,answer,dafj)]
				});
		getAnswerWin.show();
	}

	
}

function createDataAnswerForm(id,title,questionDesc,answer,dafj){
	if(dafj==undefined||dafj=='')dafj='无';
	
	var dataQualityFormInfo = new Ext.FormPanel({
				labelSeparator : "：",
				
				id : "solveDataQuestionFormInfo",
				width : 360,
				border : false,
				frame : true,
				fileUpload : true,
				autoHeight : true,
				buttonAlign : 'center',
				items : [{
					xtype : 'textfield',
					hidden : true,
					hideLabel : true,
					name : "solveDataHiddenId",
					id : "solveDataHiddenId"
				},{
					xtype : 'textfield',
					width : 500,
					allowBlank : false,
					blankText : '问题名称',
					name : 'sloveQuestionTitle',
					fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题名称',
					id : "solveQuestionTitle"
				}, {
					xtype : 'textarea',
					name : 'questionDescName',
					width : 500,
					height : 100,
					allowBlank:false,
					fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题描述',
					id : 'questionDescId'
				}, {
					xtype : 'textarea',
					name : 'solveQuestionAnswer',
					width : 500,
					height : 140,
					allowBlank:false,
					fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题答案',
					id : 'solveQuestionAnswerId'
				}, 
				
				
				{
					layout : "column",
					columnWidth : 1,
					border : true,
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
											width : 440,
											allowBlank:false,
											disabled:true,
											fieldLabel : '答案附件',
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
											Ext.Msg.confirm("提示", "答案附件将会被删除，是否删除？", function(btn, text)
													{
														if (btn == "yes")
														{
															var submitUrl = "delDafj?solveDataHiddenId="+Ext.getCmp('solveDataHiddenId').getValue();
															
															Ext.Ajax.request( {
																url : submitUrl,
																method : 'post',
																success : function(response, options) {
																	
																	gridDataStore.reload();
																	Ext.getCmp('dataAnswerWin').close();
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
					width :495,
					name : 'userfile',
					id : 'userfile',
					inputType : 'file',
					blankText : 'File can\'t not empty.'
				}],
				buttons : [/*{
							text : '重置',
							iconCls : 'icon_reset',
							handler : function() {
								dataQualityFormInfo.form.reset();
							}
						},*/{
							text : '保存',
							iconCls : 'icon_save',
							handler : function() {
								var submitUrl = "solveQuestionData?id"+id,win;
								
								if(Ext.getCmp("solveQuestionAnswerDafjId").getValue()!='无'&&Ext.getCmp("userfile").getValue()!='')
								{
									Ext.Msg.confirm("提示", "答案附件将会被覆盖，是否覆盖？", function(btn, text)
											{
												if (btn == "yes")
												{
													submitForm(dataQualityFormInfo, submitUrl, "保存数据失败", callbak,getAnswerWin);
												}
												
											});
								}
								else
								{
									submitForm(dataQualityFormInfo, submitUrl, "保存数据失败", callbak,getAnswerWin);
								}
								
								
//								dataQualityFormInfo.getForm().submit({
//										clientValidation : true, // 进行客户端验证
//										waitMsg : '数据正在提交.....', // 提示信息
//										waitTitle : '请稍等', // 标题
//										url : submitUrl,
//										method : 'POST',
//										success : function(dataQualityFormInfo,action) {
//											win = Ext.getCmp("dataAnswerWin");
//											var grid = Ext.getCmp("dataQualityListGird");
//											grid.store.reload();
//											win.close();
//											Ext.Msg.alert('提示信息','操作成功！');
//										},
//										failure : function(dataQualityFormInfo,action) {
//											Ext.Msg.alert("提示","操作失败！");
//										}
//									})
							}
						} ,
					{
						text : '关闭',
						iconCls : 'icon_close',
						handler : function()
						{			
							
							gridDataStore.reload();
							
							Ext.getCmp('dataAnswerWin').close();
							
						}
					}]
			});
	Ext.getCmp("solveDataHiddenId").setValue(id);
	Ext.getCmp("solveQuestionTitle").setValue(title).disable();
	Ext.getCmp("questionDescId").setValue(questionDesc);
	Ext.getCmp("solveQuestionAnswerId").setValue(answer);
	Ext.getCmp("solveQuestionAnswerDafjId").setValue(dafj);
	
	if(Ext.getCmp("solveQuestionAnswerDafjId").getValue()=='无')
	{
		Ext.getCmp("release_person").disabled = true;
	}
	
	return dataQualityFormInfo;
}





//回调函数
function callbak()
{
	win = Ext.getCmp("dataAnswerWin");
	var grid = Ext.getCmp("dataQualityListGird");
	grid.store.reload();
	win.close();
	Ext.Msg.alert('提示信息','操作成功！');
}


function downLoadshowQuestionAccessoryUrl(type){
	 downAccesoryUrl(showDetailDownId,type);
}

// 数据详情弹出框，显示某一个委办局下的所有表及各个表的数据量详情。
function downAccesoryUrl(id,type){
	var downUrl = "downloadFile?type="+type+"&id="+id;
	window.location.href=downUrl;
}

