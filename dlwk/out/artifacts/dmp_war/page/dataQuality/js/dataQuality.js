// 保存选中的Record主键列id列表
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/" ;
var queryListUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/getDataFileList";
var deleteUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/delDataQuality";
var importSolutionUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/importSolutionData";
var anchorShow='100%';
// 各种参数
var queryForm,showDetailDownId,downLoadSubAccessoryStr,downLoadSolveAccessoryStr;
var dafj;
var exceCodeManagerInfoWin;
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
		var gridDataStore = new Ext.data.Store({
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
				name : 'dataFrom'
			}, {
				name : 'rank'
			}, {
				name : 'content'
			}, {
				name : 'subUser'
			}, {
				name : 'subTime'
			}
			, {
				name : 'status'
			}, {
				//附件名称
				name : 'subAccessoryName'
			}, {
				//是否已经被导入到解决方案
				name : 'mark'
			}, {
				//是否已经被导入到解决方案
				name : 'solveContent'
			}, {
				//解决问题附件(用于判定详情页面的下载链接)
				name : 'solveAccessoryName'
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
				store : gridDataStore,
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
			columns : [sm, new Ext.grid.RowNumberer(),{
				header : "ID",
				dataIndex : 'id',
				hidden : true,
				sortable : true
			}, {
				header : "问题名称",
				renderer : formatQtip,
				width : 60,
				dataIndex : 'title',
				sortable : true
			}, {
				header : "问题来源",
				renderer : formatQtip,
				width : 25,
				dataIndex : 'dataFrom'
			}, {
				header : "问题等级",
				renderer : formatQtip,
				width : 30,
				dataIndex : 'rank'
			}, {
				header : "问题描述",
				renderer : formatQtip,
				width : 100,
				dataIndex : 'content'
			},{
				header : "提交人",
				renderer : formatQtip,
				width : 30,
				dataIndex : 'subUser'
			},{
				header : "提交日期",
				renderer : formatQtip,
				width : 30,
				dataIndex : 'subTime',
				renderer : dataStatus2
			}, {
				header : "状态",
				renderer : formatQtip,
				width : 30,
				dataIndex : "status",
				renderer : dataStatus
			}, {
				header : "解决问题附件名",
				dataIndex : 'subAccessoryName',
				hidden : true,
				renderer : isShowDetailDownLoadhref
			}, {
				header : "标志",
				renderer : formatQtip,
				dataIndex : 'mark',
				hidden : true,
				sortable : true
			}, {
				header : "答案内容",
				renderer : formatQtip,
				dataIndex : 'solveContent',
				hidden : true,
				sortable : true
			}, {
				header : "解决附件名",
				renderer : formatQtip,
				dataIndex : 'solveAccessoryName',
				hidden : true,
				sortable : true
			}]
		});
		
		// 双击事件
//		grid.addListener('rowdblclick', rowdblclickFn);
//		function rowdblclickFn(grid, rowindex, e)
//		{
//			var record = grid.getSelectionModel().getSelected();
//			showQuestionDetail(record.get('id'));
//		}
		
		var comboErrorProvinces = new Ext.form.ComboBox(
		{
			store : new Ext.data.SimpleStore(
					{
						fields : [ 'sourceFrom', 'id' ],
						data : [ ['全部',null],
								 [ '委办局用户', '1' ],
						         [ '运维人员', '2' ]]
					}),
			valueField : 'id',// 定义值字段
			displayField : 'sourceFrom',// 定义要显示的字段
			mode : 'local',
			forceSelection : true,
			id : "dataSourceFromId",
			blankText : '来源',
			emptyText : '全 部',
			hiddenName : 'dataSourceFrom',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '问题来源',
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
		
		var comboQualityRankProvinces = new Ext.form.ComboBox(
				{
					store : new Ext.data.SimpleStore(
							{
								fields : [ 'sourceFrom', 'id' ],
								data : [ ['全部',null],
										 [ '低', '低' ],
								         [ '中', '中' ],
										 [ '高', '高' ]]
							}),
					valueField : 'id',// 定义值字段
					displayField : 'sourceFrom',// 定义要显示的字段
					mode : 'local',
					forceSelection : true,
					id : "dataRankFromId",
					blankText : '问题等级',
					emptyText : '全 部',
					hiddenName : 'dataSorceFrom',
					editable : false,
					triggerAction : 'all',
					allowBlank : true,
					fieldLabel : '问题等级',
					anchor : anchorShow
				});
				
				
				// 查询条件
				var queryDataSolutionFormItems = [
				{
					layout : 'column',
					style : 'margin-left: 20px;',
					labelAlign : 'right',
					items : [
					{
						columnWidth : .2,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							anchor : anchorShow,
							allowBlank : true,
							blankText : '问题',
							name : 'questionQTitle',
							fieldLabel : '问题名称',
							id : "addQuestionQTitle"
						}]
					},
					{
						columnWidth : .2,
						layout : 'form',
						items : [comboErrorProvinces]
					},
					{
						columnWidth : .2,
						layout : 'form',
						items : [comboQualityRankProvinces]
					},
					{
						columnWidth : .4,
						layout : 'form',
						items : [ {
							fieldLabel : '提交日期',
							layout : 'column',
							items : [ {
								xtype : 'datefield',
								fieldLabel : '',
								name : 'startTimeQuality',
								id : 'startTimeQualityId',
								altFormats : 'Y-m-d',
								format : 'Y-m-d',
								width : 100,
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
								name : 'endTimeQuality',
								id : 'endTimeQualityId',
								altFormats : 'Y-m-d',
								width : 100,
								format : 'Y-m-d',
								editable:false,
								anchor : anchorShow
							} ]
						} ]
					} 
					]
				}];


		function isShowDetailDownLoadhref(value, metadata, record, rowIndex, colIndex, store){
			
		}
		

		// 查询功能
		function queryFunc() {
			if(Ext.get('startTimeQualityId').getValue()!="" && Ext.get('endTimeQualityId').getValue()!="" && Ext.get('startTimeQualityId').getValue()>Ext.get('endTimeQualityId').getValue()){
				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
				return;
			}
			gridDataStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(gridDataStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			gridDataStore.load( {
				params : gridDataStore.baseParams
			});
		}
		
		function dataStatus(value, metadata, record, rowIndex, colIndex, store){
			var showStr = "未&nbsp;解&nbsp;决",accesoryStr='';
			if(record.get('subAccessoryName').length != 0){
				accesoryStr = "<a href='javascript:void(0)' onclick='downAccesoryUrl(\"" + record.get('id') + "\",\"1\")'>(附件)</a>";
				downLoadSubAccessoryStr = "<span style='font-size:9pt;'>问题附件:&nbsp;&nbsp;&nbsp;&nbsp;</span><a href='javascript:void(0);' title='下载问题附件' onclick='downLoadshowQuestionAccessoryUrl(\"1\")'>"+record.get('subAccessoryName')+"</a>";
			}
			if(record.get('solveAccessoryName').length != 0){
				downLoadSolveAccessoryStr = "<span style='font-size:9pt;'>答案附件:&nbsp;&nbsp;&nbsp;&nbsp;</span><a href='javascript:void(0);' title='下载答案附件' onclick='downLoadshowQuestionAccessoryUrl(\"2\")'>"+record.get('solveAccessoryName')+"</a>";
			}
			var returnStr = "<font color='blue'><a href='javascript:void(0)' onclick='solveQuestion(\"" + record.get('id') + "\",\"" + record.get('title') + "\",\"" + record.get('content') + "\")'>"+showStr+"</a>"+accesoryStr+"</font>";
			
			if('0'!=record.get('status')){
				showStr = "查看解决详情";
				returnStr = "<font color='blue'><a href='javascript:void(0)' onclick='showQuestionDetail(\"" + record.get('id') + "\")'>"+showStr+"</a></font>";
			}
			return returnStr;
		}
		
		function dataStatus2(value, metadata, record, rowIndex, colIndex, store){
			var returnStr = record.get('subTime');
			
			var retuenStr2 = new Date(returnStr).format("Y-m-d");
			
			var retuenStr3 = "<font>"+retuenStr2+"</font>";
			
			//Ext.Msg.alert(retuenStr2);
			
			return retuenStr3;
		}
		
		// 添加数据的from
		function createDataQualityForm()
		{
			var dataQualityFormInfo = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : true,
						id : "dataQualityFormInfo",
						width : 360,
						border : false,
						fileUpload: true,  
						autoHeight : true,
						buttonAlign : 'center',
						items : [{
									xtype : 'textfield',
									width : 300,
									allowBlank : false,
									blankText : '请填写问题名称',
									name : 'questionTitle',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题名称',
									maxLength : 20,
									maxLengthText : "问题最大长度不能超过20个字符！",//提示文本
									id : "addQuestionTitle"
								},
								{
									xtype : 'combo',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题等级',
									width : 300,
									allowBlank : false,
									blankText : '问题等级',
									emptyText : '问题等级',
									editable : false,
									mode : 'local',
									hiddenName : 'questionRank',
									id : 'questionRankId',
									store : new Ext.data.SimpleStore(
									{
										fields : [ 'rank', 'id' ],
										data : [ [ '低', '低' ],
												 [ '中', '中' ],
												 [ '高', '高' ]]
									}),
									triggerAction : 'all',
									displayField : 'rank',// 定义要显示的字段
									valueField : 'id',// 定义值字段
									forceSelection : true,// 要求输入值必须在列表中存在
									resizable : true,// 允许改变下拉列表的大小
									typeAhead : true,// 允许自动选择匹配的剩余部分文本
									handleHeight : 10
								},
								{
									xtype : 'combo',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题来源',
									width : 300,
									allowBlank : false,
									editable : false,
									blankText : '来源',
									emptyText : '请填写问题来源',
									mode : 'local',
									hiddenName : 'questionFrom',
									id : 'questionFromId',
									store : new Ext.data.SimpleStore(
									{
										fields : [ 'sourceFrom', 'id' ],
										data : [ [ '委办局用户', '1' ],
												 [ '运维人员', '2' ]]
									}),
									triggerAction : 'all',
									displayField : 'sourceFrom',// 定义要显示的字段
									valueField : 'id',// 定义值字段
									forceSelection : true,// 要求输入值必须在列表中存在
									resizable : true,// 允许改变下拉列表的大小
									typeAhead : true,// 允许自动选择匹配的剩余部分文本
									handleHeight : 10
								},
								{
									xtype : 'textarea',
									name : 'questionDesc',
									width : 300,
									height : 130,
									allowBlank : false,
									blankText : '请填写问题描述',
									fieldLabel : '<span style="color:red;font-size:13pt;">*</span>问题描述',
									maxLength : 300,
									maxLengthText : "问题描述最大长度不能超过300个字符！",//提示文本
									id : 'questionDescription'
								},
								{
							        xtype : 'textfield',
							        fieldLabel : '上传附件',
							        name : 'userfile',
							        id : 'userfile',
							        inputType : 'file',
							        blankText : 'File can\'t not empty.',
							        width : 300
							       // anchor : '100%'
						       }
								,{html:'<input id="resetForm" type=reset style="display:none;">',border:false}
								],
						 buttons : [
									{
										iconCls : 'icon_save',
										text : '保存',
										handler : function()
										{
									        dataQualityFormInfo.getForm().submit({
									        	 clientValidation : true, // 进行客户端验证
									    		 waitMsg : '数据正在提交.....', // 提示信息
									    		 waitTitle : '请稍等', // 标题
										         url : REQUEST_URL_BASE+"dataKnowledgeHandler/addDataQuality",
										         method : 'POST',
										         success : function(dataQualityFormInfo, action)
										 		 {
										        	var win = Ext.getCmp("addDataQuality");
													var grid =Ext.getCmp("dataQualityListGird");
													grid.store.reload();
													win.close();
													Ext.Msg.alert('提示信息', '操作成功！');
										 		 },
										 		 failure : function(dataQualityFormInfo, action)
										 		 { 
										 			exceCodeManagerInfoWin.getEl().mask();
										 			Ext.Msg.alert("提示", "有数据项未通过验证，请仔细检查！",function(){exceCodeManagerInfoWin.getEl().unmask();},this);
										 			if(action.result)Ext.Msg.alert("提示", action.result.msg,function(){exceCodeManagerInfoWin.getEl().unmask();},this);
										 			
										 		 }
									        })
										}
								     },
								     {
									text : '重置',
									iconCls : 'icon_reset',
									handler : function()
										{
								    	 	document.getElementById('resetForm').click();
											dataQualityFormInfo.form.reset();
										}
									},{
							text : '关闭',
							iconCls : 'icon_close',
							handler : function() {
								Ext.getCmp('addDataQuality').close();
							}
						}]
					});
			return dataQualityFormInfo;
		}
		
		
		// 添加异常规则数据
		function addDataQuality() {
			exceCodeManagerInfoWin = new Ext.Window(
					{
						layout : 'fit',
						id : 'addDataQuality',
						closeAction : 'close',
						resizable : false,
						width : 500,
						height :342,
						shadow : true,
						title : '添加数据质量问题',
						modal : true,
						closable : true,
						bodyStyle : 'padding:5 5 5 5',
						animCollapse : true,
						items:[createDataQualityForm()]
					});
			exceCodeManagerInfoWin.show();
		}
		/**
		 * 导入数据到解决方案
		 */
		function importSolution(){
			var records = sm.getSelections();
			if (records.length != 1)
			{
				Ext.Msg.alert('提示信息','请选择一条数据!');
				return;
			} else {
				var recordIdArr = [];
				var flag = false;
				for ( var i = 0; i < records.length; i++)
				{
					var rec = records[i];
					recordIdArr.push(rec.get('id'));
					if('0' == rec.get('status')){
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
							var o = Ext.util.JSON.decode(response.responseText);
							if (o.msg) {
								Ext.Msg.alert('提示', o.msg);
							}
							else
							{
								Ext.MessageBox.alert("提示","导出成功，请刷新异常案例解决方案查看！");
							}
							//alert(response.responseText);
							
						},
						failure : function(response, opts)
						{
							//alert(response.responseText);
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
			}
		}
		
		
			// 组件数组
			var formItems = [{ // 行1
		        layout : "column", // 从左往右的布局
		        items : [{
		           columnWidth : .3, // 该列有整行中所占百分比
		           layout : "form", // 从上往下的布局
		           items : [{
		              xtype : "textfield",
		              fieldLabel : "问题名称",
		              width : 120,
		              readOnly : true,
		              id : "showTitleId"
		             }]
		           }, {
		           columnWidth : .3,
		           layout : "form",
		           items : [{
		              xtype : "textfield",
		              fieldLabel : "提交人",
		              readOnly : true,
		              id : "showSubUserId",
		              width : 120
		             }]
		          }, {
		           columnWidth : .3,
		           layout : "form",
		           items : [{
		              xtype : "textfield",
		              readOnly : true,
		              fieldLabel : "提交时间",
		              id : "showSubTimeId",
		              width : 150
		             }]
		          }]
		       }, { layout : "column", // 从左往右的布局
			        items : [{
				           columnWidth : .3, // 该列有整行中所占百分比
				           layout : "form", // 从上往下的布局
				           items : [{
				              xtype : "textfield",
				              fieldLabel : "问题来源",
				              readOnly : true,
				              id : "showDataSourceFromId",
				              width : 120
				             }]
				          }, {
				           columnWidth : .3,
				           layout : "form",
				           items : [{
				              xtype : "textfield",
				              fieldLabel : "解决人",
				              readOnly : true,
				              id : "showSolveUserId",
				              width : 120
				             }]
				          }, {
				           columnWidth : .3,
				           layout : "form",
				           items : [{
				              xtype : "textfield",
				              readOnly : true,
				              fieldLabel : "解决时间",
				              id : "showSolveTimeId",
				              width : 150
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
								anchor : '95%',
//								width : 440,
								height : 100,
								readOnly : true,
								fieldLabel : '问题描述',
								id : 'showQuestionContentId'
				            }]
				           }, {
				           columnWidth : .4,
				           layout : "form",
				           items : [{
				              id : "showSubQuestionAccessoryId",
				              name : "showSubQuestionAccessory",
				              html: downLoadSubAccessoryStr
				             }]
				          }]
		         },{// 行三
	        	  layout : "column", // 从左往右的布局
			          items : [{
			              columnWidth : .9, // 该列有整行中所占百分比
				          layout : "form",
				          items : [{
				        	  xtype : 'textarea',
								name : 'questionAnswer',
								anchor : '95%',
//								width : 440,
								height : 100,
								readOnly : true,
								fieldLabel : '问题答案',
								id : 'showQuestionAnswerId'
				            }]
			          }, {
				           columnWidth : .4,
				           layout : "form",
				           items : [{
				              id : "showSolveQuestionAccessoryId",
				              name : "showSolveQuestionAccessory",
				              html:  downLoadSolveAccessoryStr
				             }]
			         }]
		         }]
			         
	function getInfoPanel(){
		// 展示面板
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
			items : [formItems],
			tbar : [],
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
				
		//定义工具栏的元素组
		var topToolbarItems = [ {
			xtype : 'tbseparator'
		}, {
			xtype : 'tbbutton',
			text : '返&nbsp;回',
			iconCls : 'icon_back',
			disabled : false,
			handler : function() {
				Ext.getCmp("qualityWin").close();
			}
		}, {
			xtype : 'tbseparator'
		} ];
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(getInfoPanel(),topToolbarItems);	
				
				
		var questionCard = new Ext.Panel({
			id : 'mainCard',
			layout : 'card',
			activeItem : 0,
			autoWidth : true,
			titleCollapse : true,
			autoHeight : true,
			items : [grid]
		});
		
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
							url : REQUEST_URL_BASE + "dataKnowledgeHandler/getDataQualityBeanInfo",
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
									
									Ext.getCmp("showTitleId").setValue(result.data.title);
									Ext.getCmp("showSubUserId").setValue(result.data.subUser);
									Ext.getCmp("showSubTimeId").setValue(new Date(result.data.subTime).format("Y-m-d H:i:s"));
									Ext.getCmp("showDataSourceFromId").setValue(result.data.dataFrom);
									Ext.getCmp("showSolveUserId").setValue(result.data.solveUser);
									Ext.getCmp("showSolveTimeId").setValue(new Date(result.data.solveTime).format("Y-m-d H:i:s"));
									Ext.getCmp("showQuestionContentId").setValue(result.data.content);
									Ext.getCmp("showQuestionAnswerId").setValue(result.data.solveContent);
									
									
										downLoadSubAccessoryStr = "<span style='font-size:9pt;'>问题附件:&nbsp;&nbsp;&nbsp;&nbsp;</span><a href='javascript:void(0);' title='下载问题附件' onclick='downLoadshowQuestionAccessoryUrl(\"1\")'>"
											+ result.data.subAccessoryName
											+ "</a>";

									if(result.data.subAccessoryName==undefined)
									{
										downLoadSubAccessoryStr = "";
										
									}
									
									
									downLoadSolveAccessoryStr = "<span style='font-size:9pt;'>答案附件:&nbsp;&nbsp;&nbsp;&nbsp;</span><a href='javascript:void(0);' title='下载答案附件' onclick='downLoadshowQuestionAccessoryUrl(\"2\")'>"
											+ result.data.solveAccessoryName
											+ "</a>";
									
									if(result.data.solveAccessoryName==undefined)
									{
										downLoadSolveAccessoryStr = "";
										
									}
									
									Ext.getCmp("showSolveQuestionAccessoryId").body.update(downLoadSolveAccessoryStr);
									Ext.getCmp("showSubQuestionAccessoryId").body.update(downLoadSubAccessoryStr);
									
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
				var records = sm.getSelections();; // 针对所有选中数据,包括分页的
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
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("对数据交换中，用户遇到的问题进行人工在线解答");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm", queryDataSolutionFormItems, queryFunc);
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
		//定义工具栏的元素组
		var topToolbarItems = [ 
		    {
			text : "添加",
			iconCls : 'icon_add',
			handler : addDataQuality
			},
			 {
				text : "编辑",
				iconCls : 'icon_edit',
				handler : updateDataQuality
			},
			{
				text : "删除",
				iconCls : 'icon_delete',
				handler : delDataQuality
			},{
				text : "导出到常见问题与解答",
				iconCls : 'icon_export_new',
				handler : importSolution
			}
		];
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("dataQuality_div_1", questionCard);
});

function solveQuestion(id,title,questionDesc){
	
	if(dafj==undefined||dafj=='')dafj='无';
	
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
	var records = sm.getSelections();; // 针对所有选中数据,包括分页的
	if (records.length != 1)
	{
		Ext.Msg.alert('提示信息','请选择一条数据');
		return;
	} else {
		var rec = records[0];
//		if(rec.get('status') == 0){
//			Ext.Msg.alert('提示','对不起，你只能修改状态为查看解决详情的问题！');
//			return;
//		}
		var id = rec.get('id'),title=rec.get('title'),questionDesc=rec.get('content'),answer = rec.get('solveContent');
		dafj = rec.get('solveAccessoryName');
		 getAnswerWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'dataAnswerWin',
					closeAction : 'close',
					resizable : false,
					width : 550,
					height :420,
					shadow : true,
					title : '解决问题',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items:[createDataAnswerForm(id,title,questionDesc,answer)]
				});
		getAnswerWin.show();
	}

	
}

function createDataAnswerForm(id,title,questionDesc,answer){
	if(dafj==undefined||dafj=='')dafj='无';
	
	var dataQualityFormInfo = new Ext.FormPanel(
			{
				labelSeparator : "：",
				frame : true,
				id : "solveDataQuestionFormInfo",
				width : 360,
				border : false,
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
					width : 360,
					allowBlank : false,
					blankText : '问题',
					name : 'sloveQuestionTitle',
					fieldLabel : '问题名称',
					id : "solveQuestionTitle"
				}, {
					xtype : 'textarea',
					name : 'questionDescName',
					width : 360,
					height : 100,
					fieldLabel : '问题描述',
					maxLength : 300,
				 	maxLengthText : "名称最大长度不能超过300个字符！",//提示文本
					id : 'questionDescId'
				},
				
				{
					xtype : 'textarea',
					name : 'solveQuestionAnswer',
					width : 360,
					height : 100,
					allowBlank : false,
					blankText : '请填写问题答案',
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
											width : 305,
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
															var submitUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/delDafj?solveDataHiddenId="+Ext.getCmp('solveDataHiddenId').getValue();
															
															Ext.Ajax.request( {
																url : submitUrl,
																method : 'post',
																success : function(response, options) {
																	
																	var win = Ext.getCmp("dataAnswerWin");
																	var grid =Ext.getCmp("dataQualityListGird");
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
					id : 'userfile',
					inputType : 'file',
					width : 360,
					blankText : 'File can\'t not empty.'
				} 
				],
				buttons : [
						
						{
							iconCls : 'icon_save',
									text : '保存',
							handler : function() {
								var submitUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/solveQuestionData?id="+id,win;
								
								
								
								
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
							handler : function() {
								Ext.getCmp('dataAnswerWin').close();
							}
						}]
			});
	Ext.getCmp("solveDataHiddenId").setValue(id);
	Ext.getCmp("solveQuestionTitle").setValue(title).disable();
	Ext.getCmp("questionDescId").setValue(questionDesc).disable();
	Ext.getCmp("solveQuestionAnswerId").setValue(answer);
	Ext.getCmp("solveQuestionAnswerDafjId").setValue(dafj);
	
	if(Ext.getCmp("solveQuestionAnswerDafjId").getValue()=='无')
	{
		Ext.getCmp("release_person").disabled = true;
	}
	
	dafj = '';
	
	
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
	var downUrl = REQUEST_URL_BASE + "dataKnowledgeHandler/downloadFile?type="+type+"&id="+id;
	window.location.href=downUrl;
}

