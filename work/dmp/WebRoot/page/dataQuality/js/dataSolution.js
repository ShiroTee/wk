
// 各种参数
var anchorShow='100%';
var queryForm;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/" ;
var queryListUrl = REQUEST_URL_BASE+ "dataKnowledgeHandler/getKnowledgeSolutionList";
var deleteUrl = REQUEST_URL_BASE+ "dataKnowledgeHandler/delKnowledgeSolution";

var exceDataSolutionWin;

var updateDataSolutionWin;

//添加删除标志
var flag;

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
	var gridDataSolutionStore = new Ext.data.Store({
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
			name : 'title'
		}, {
			name : 'content'
		}, {
			name : 'subTime'
		}, {
			name : 'answer'
		}, {
			name : 'type'
		}, {
			name : 'subAccessoryName'
		}, {
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
				sm : sm,
				id : "dataQualityListGird",
				store : gridDataSolutionStore,
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
				tbar : [],            //工具条
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
			columns : [ sm, new Ext.grid.RowNumberer(), {
				header : "ID",
				dataIndex : 'id',
				hidden : true,
				sortable : true
			}, {
				header : "问题名称",
				renderer : formatQtip,
				width : 40,
				dataIndex : 'title',
				sortable : true
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
			}, {
				header : "提交日期",
				renderer : formatQtip,
				width : 28,
				dataIndex : 'subTime',
				renderer : dataStatus2
			},{
				header : "来源",
				renderer : formatQtip,
				width : 28,
				dataIndex : "type"
			}, {
				header : "问题附件",
				width : 30,
				dataIndex : "subAccessoryName",
				renderer : showAccessory2
			}, {
				header : "答案附件",
				width : 30,
				dataIndex : "solutionAccessoryName",
				renderer : showAccessory
			}]
		});
		var comboErrorProvinces = new Ext.form.ComboBox(
		{
			store : new Ext.data.SimpleStore(
					{
						fields : [ 'sourceFrom', 'id' ],
						data : [ ['全部',null],
								 [ '手工录入', '0' ],
								 [ '问题库导入', '1' ]]
					}),
			valueField : 'id',// 定义值字段
			displayField : 'sourceFrom',// 定义要显示的字段
			mode : 'local',
			forceSelection : true,
			id : "dataSorceFromId",
			blankText : '问题来源',
			emptyText : '全 部',
			hiddenName : 'dataSorceFrom',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '来源',
			anchor : anchorShow
		});
		
		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		comboErrorProvinces.store.on("load", function() {
			var PersonRecord = Ext.data.Record.create([ {
				name : 'id',
				type : 'string'
			}, {
				name : 'sourceFrom',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord({
				id : '',
				sourceFrom : '全部'
			});
			comboErrorProvinces.store.insert(0, qb_record);
		});
		// 查询条件
		var queryDataSolutionFormItems = [
		{
			layout : 'column',
			style : 'margin-left: 60px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .25,
				layout : 'form',
				items : [{
					xtype : 'textfield',
					anchor : anchorShow,
					allowBlank : true,
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
						anchor : anchorShow
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
						anchor : anchorShow
					} ]
				} ]
			} 
			]
		}];
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

		//答案附件
		function showAccessory(value, metadata, record, rowIndex, colIndex, store) {
			if(value.length>0){
				return "<font color='blue'><a title='下载答案附件"+record.get('solutionAccessoryName')+"' href='javascript:void(0)' onclick='downAccesoryUrl(\"" + record.get('id') + "\",\"3\")'>"+record.get('solutionAccessoryName')+"</a></font>";
			}else{
				return "";
			}
		}
		
		//问题附件
		function showAccessory2(value, metadata, record, rowIndex, colIndex, store) {
			if(value.length>0){
				return "<font color='blue'><a title='下载问题附件"+record.get('subAccessoryName')+"' href='javascript:void(0)' onclick='downAccesoryUrl(\"" + record.get('id') + "\",\"4\")'>"+record.get('subAccessoryName')+"</a></font>";
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
							width : 330,
							allowBlank : false,
							blankText : '请填写问题名称',
							name : 'questionSolutionTitle',
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题名称',
							maxLength : 20,
							maxLengthText : "录入问题名称最大长度不能超过20个字符！",
							id : "addQuestionSolveTitle"
						}, {
							xtype : 'textarea',
							name : 'questionContent',
							width : 330,
							height : 130,
							allowBlank : false,
							blankText : '请填写问题描述',
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题描述',
							maxLength : 300,
							maxLengthText : "问题描述最大长度不能超过300个字符！",
							id : 'questionContentId'
						}, {
							xtype : 'textarea',
							name : 'questionAnswer',
							width : 330,
							height : 130,
							fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题答案',
							allowBlank : false,
							blankText : '请填写问题答案',
							maxLength : 300,
							maxLengthText : "问题答案最大长度不能超过300个字符！",
							id : 'questionAnswerId'
						}, {
							xtype : 'textfield',
							fieldLabel : '上传附件',
							name : 'userfile',
							id : 'userfile',
							inputType : 'file',
							blankText : 'File can\'t not empty.',
							width : 330
						} ,{html:'<input id="resetForm" type=reset style="display:none;">',border:false}],
						buttons : [
								{
									iconCls : 'icon_save',
									text : '保存',
									handler : function() {
										var submitUrl,win;
										var dataId = Ext.getCmp("addQuestionId").getValue();
										if(dataId.length>0){
											submitUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/updateKnowledgeSolution?id"+dataId;
										}else{
											submitUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/addKnowledgeSolution";
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
													
													var window;
													if(flag == 'add')
													{
														window = exceDataSolutionWin;
													}
													if(flag == 'update')
													{
														window = updateDataSolutionWin;
													}
													window.getEl().mask();
													Ext.Msg.alert("提示","有数据项未通过验证，请仔细检查！",function(){window.getEl().unmask();},this);
													if(action.result)Ext.Msg.alert("提示", action.result.msg,function(){window.getEl().unmask();},this);
										 			
												}
											})
									}
								},
								{
									text : '重置',
									iconCls : 'icon_reset',
									id:'solution_icon',
									handler : function() {
									var dataId = Ext.getCmp("addQuestionId").getValue();
										if(dataId.length>0){
											Ext.getCmp("solution_icon").setVisible(false);
										}else{
											document.getElementById('resetForm').click();
										dataQualityFormInfo.form.reset();
										}
									}
								} ,{
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

		function addDataSolution() {
			flag = 'add';
			
			 exceDataSolutionWin = new Ext.Window( {
				layout : 'fit',
				id : 'addDataSolution',
				closeAction : 'close',
				resizable : false,
				width : 520,
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
		
		
		function dataStatus2(value, metadata, record, rowIndex, colIndex, store){
			var returnStr = record.get('subTime');
			
			var retuenStr2 = new Date(returnStr).format("Y-m-d");
			
			var retuenStr3 = "<font>"+retuenStr2+"</font>";
			
			//Ext.Msg.alert(retuenStr2);
			
			return retuenStr3;
		}
		
		
		function editDataSolution(){
			
			flag = 'update';
			
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
					width : 520,
					height :420,
					shadow : true,
					title : '修改数据质量知识库信息',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items:[createDataSolutionForm()]
				});
				var rec = records[0];
				var id = rec.get('id');
				var url = REQUEST_URL_BASE+"dataKnowledgeHandler/getDataSoultionInfo?id="+id;
				updateDataSolutionWin.show();
				var form = Ext.getCmp("dataQualityFormInfo");
				loadDataSolutionCallBack(form,url,"获取知识数据异常");
			}
			Ext.getCmp("solution_icon").setVisible(false);
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
									recordIds = [];
									recordObjs = [];
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
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("对数据交换中，用户经常遇到的问题进行统一解答");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryDataSolutionForm", queryDataSolutionFormItems, queryFunc);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryDataSolutionForm");
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
		//定义工具栏的元素组
		var topToolbarItems = [ 
		    {
				text : "添加",
				iconCls : 'icon_add',
				handler : addDataSolution
			},
			 {
				text : "编辑",
				iconCls : 'icon_edit',
				handler : editDataSolution
			},
			{
				text : "删除",
				iconCls : 'icon_delete',
				handler : delDataSolution
			}
		];
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("dataSolution_div_1", grid);
	});

function downAccesoryUrl(id,type){
		var downUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/downloadFile?type="+type+"&id="+id;
		window.location.href=downUrl;
}
