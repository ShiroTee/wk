Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
var sm;
var op_type;
Ext.onReady(init);

function init()
{
	var grid = createGrid();
	setTip("配置审批岗位");
	setPaging(grid);
	setMainPanel(document.body, grid);
}
function createGrid()
{
	sm = new Ext.grid.CheckboxSelectionModel();
	var columns =
	[ sm,new Ext.grid.RowNumberer(),
	{
		dataIndex : 'id',
		hidden : true
	},
	{
		dataIndex : 'node_name',
		header : "审批节点名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'orgName',
		header : "机构名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'postName',
		header : "岗位名称",
		sortable : true,
		width : 80
	}];
	var gridStore = new Ext.data.Store(
	{
		autoLoad :
		{
			params :
			{
				start : 0,
				limit : pageSize
			}
		},

		successProperty : 'success',
		listeners :
		{
			exception : function(dataProxy, type, action, options, response,
					arg)
			{
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success)
				{
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		reader : new Ext.data.JsonReader(
		{
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create(
		[
		{
			name : 'id'
		},
		{
			name : 'node_name'
		},
		{
			name : 'orgId',
            mapping : function(data)
			{
				return jsonConvert(data, "orgInfo", "orgId");
			}

		},
		{
			name : 'orgName',
            mapping : function(data)
			{
				return jsonConvert(data, "orgInfo", "orgName");
			}

		},
		{
			name : 'postId',
			mapping : function(data)
			{
				return jsonConvert(data, "postInfo", "postId");
			}
		},
		{
			name : 'postName',
			mapping : function(data)
			{
				return jsonConvert(data, "postInfo", "postName");
			}
		}])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + "approvalPostConfigHandler/findAllApprovalPost"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		id : 'approPostGrid',
		monitorResize : true,
		store : gridStore,
		sm:sm,
		border : false, // 是否显示行的边框
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		bbar :
		[],
		viewConfig :
		{
			forceFit : true
		}
	});
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();

	toolbar.addButton(new Ext.Button(
	{
		text : "添加",
		iconCls : 'icon_add',
		handler : addDataSolution
	}));
	
	toolbar.addButton(new Ext.Button(
	{
		text : "修改",
		iconCls : 'icon_edit',
		handler : modDataSolution
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "删除",
		iconCls : 'icon_delete',
		handler : delData
	}));
	toolbar.addFill();
	toolbar.addText("审批节点名称：");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'nodeName',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchRoute();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:'输入包含节点名称的字符',
		width : 200
	}));
	toolbar.addText("机构名称：");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'orgName',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchRoute();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:'输入包含机构名称的字符',
		width : 200
	}));
	toolbar.addText("岗位名称：");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'postName',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchRoute();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:'输入包含岗位名称的字符',
		width : 200
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler :searchRoute
	}));
	return toolbar;
}
		//添加
		function addDataSolution() {
			op_type = 'add';
            serviceWin('add');
		}
	    //修改
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
		Ext.getCmp('nodeComboBox1').setValue(record.get('node_name'));
		Ext.getCmp('typeComboxMax1').setValue(record.get('orgId'));
		Ext.getCmp('typeComboBox1').setValue(record.get('postId'));
		Ext.getCmp('typeComboxMax1').store.load();
		var combo1 = Ext.getCmp("typeComboxMax1");
		//根据选择的服务接口 加载服务接口下的方法
		var combo = Ext.getCmp("typeComboBox1");
		combo.store.load((
								{
									params :
									{
                                        param_orgid : combo1.getValue()
									}
								}));
		Ext.getCmp('nodeComboBox1').disable();
		Ext.getCmp('typeComboxMax1').disable();
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
				height : 230,
				shadow : true,
				title : typename+'审批岗位配置',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items : [ createDataSolutionForm() ]
			});
			exceDataSolutionWin.show();
		}
	    // 添加数据的from
		function createDataSolutionForm() {
            var typeMaxStore1 = new Ext.data.JsonStore(
			{
				url :getContextPath()+"app/http/aip/orgInfoManagerHandler/getOrgInfoTree?node="+root_org_id,
				fields : new Ext.data.Record.create( [ 'id',
					'text' ]),
				listeners: {    
                    load: function() {   
                        Ext.getCmp('typeComboxMax1').setValue(Ext.getCmp('typeComboxMax1').getValue());
                    }    
                } 

			});
			var typeComboxMax1 = new Ext.form.ComboBox(
			{
				store : typeMaxStore1,
				listeners :
				{
					select :  function(serviceInterfaceCombox,
							record, index)
							{
						        typeComboBox1.clearValue();
						        typeComboBox1.store.removeAll();
								var combo1 = Ext.getCmp("typeComboxMax1");
								//根据选择的服务接口 加载服务接口下的方法
								var combo = Ext.getCmp("typeComboBox1");
								combo.store.load((
								{
									params :
									{
										param_orgid : combo1.getValue()
									}
								}));

							}
				},
				valueField : "id",
				//mode : 'local',
				displayField : "text",
				forceSelection : true,
				id : "typeComboxMax1",
				blankText : '组织机构',
				emptyText : '全 部',
				hiddenName : 'orgCombox1',
				editable : false,
				triggerAction : 'all',
				allowBlank : false,
				fieldLabel : '<span style="color:red;font-size:13pt;">*</span>组织机构',
				name : 'orgCombox1',
				width :400
				//anchor : '100%'
			});
			
			var typeComboBox1 = new Ext.form.ComboBox(
			{
				store : new Ext.data.JsonStore(
						{
							url :getHandlerRequestUrl() +"approvalPostConfigHandler/getPostsByOrg",
							fields : new Ext.data.Record.create( [
									'id', 'name' ]),
				listeners: {    
                    load: function() {   
                        Ext.getCmp('typeComboBox1').setValue(Ext.getCmp('typeComboBox1').getValue());
                    }    
                } 

						}),
				valueField : "id",
				displayField : "name",
				mode : 'local',
				forceSelection : true,
				id : "typeComboBox1",
				blankText : '岗位',
				emptyText : '全 部',
				hiddenName : 'postCombox1',
				editable : false,
				triggerAction : 'all',
				allowBlank : false,
				fieldLabel : '<span style="color:red;font-size:13pt;">*</span>岗位',
				name : 'postCombox1',
				width :400
				//anchor : '100%'
			});
			
		    var nodeComboBox1 = new Ext.form.ComboBox(
			{
				store : new Ext.data.JsonStore(
						{
							url :getHandlerRequestUrl() + "approvalPostConfigHandler/getAllNodeName",
							fields : new Ext.data.Record.create( [
									'id', 'name' ]),
													listeners: {    
                    load: function() {    
                        Ext.getCmp('nodeComboBox1').setValue(Ext.getCmp('nodeComboBox1').getValue());
                    }    
                } 

						}),
				valueField : "id",
				displayField : "name",
				//mode : 'local',
				forceSelection : true,
				id : "nodeComboBox1",
				blankText : '审批节点名称',
				emptyText : '全 部',
				hiddenName : 'nodeCombox1',
				editable : false,
				triggerAction : 'all',
				allowBlank : false,
				fieldLabel : '<span style="color:red;font-size:13pt;">*</span>审批节点名称',
				name : 'nodeCombox1',
				width :400
				//anchor : '100%'
			});
		    
			
			
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
							name : "id",
							id : "id"
						},nodeComboBox1,typeComboxMax1,typeComboBox1],
						buttons : [
								{
									text : '保存',
									iconCls : 'icon_save',
									handler : function() {
										var submitUrl,win;
										if(op_type =='add'){
										    submitUrl= getHandlerRequestUrl() +"approvalPostConfigHandler/addApprovalPost";
										    if(Ext.getCmp('typeComboxMax1').getValue() =='' ||Ext.getCmp('typeComboBox1').getValue() ==''
											||Ext.getCmp('nodeComboBox1').getValue() ==''){
											    Ext.Msg.alert('提示信息','有必填项未填写！');
										     }else{
												dataQualityFormInfo.getForm().submit({
												clientValidation : true, // 进行客户端验证
												waitMsg : '数据正在提交.....', // 提示信息
												waitTitle : '请稍等', // 标题
												url : submitUrl,
												method : 'POST',
												success : function(dataQualityFormInfo,action) {
													win =  Ext.getCmp("addDataSolution");
													var grid = Ext.getCmp("approPostGrid");
													grid.store.reload();
													win.close();
													Ext.Msg.alert('提示信息','操作成功！');
												},
												failure : function(dataQualityFormInfo,action) {
												    var result = Ext.util.JSON.decode(action.response.responseText);
			                                        Ext.MessageBox.alert('提示', result.msg);
												}
											})
										}
										}else{
											submitUrl= getHandlerRequestUrl() +"approvalPostConfigHandler/update";
											if(Ext.getCmp('typeComboBox1').getValue() ==''){
											Ext.Msg.alert('提示信息','有必填项未填写！');
										}else{
												dataQualityFormInfo.getForm().submit({
												clientValidation : true, // 进行客户端验证
												waitMsg : '数据正在提交.....', // 提示信息
												waitTitle : '请稍等', // 标题
												url : submitUrl,
												method : 'POST',
												success : function(dataQualityFormInfo,action) {
													win =  Ext.getCmp("addDataSolution");
													var grid = Ext.getCmp("approPostGrid");
													grid.store.reload();
													win.close();
													Ext.Msg.alert('提示信息','操作成功！');
												},
												failure : function(dataQualityFormInfo,action) {
												    var result = Ext.util.JSON.decode(action.response.responseText);
			                                        Ext.MessageBox.alert('提示', result.msg);
												}
											})
										}
										}


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
function searchRoute()
{
	var nodeName = Ext.getCmp("nodeName").getValue();
	var orgName = Ext.getCmp("orgName").getValue();
	var postName = Ext.getCmp("postName").getValue();
	var grid = Ext.getCmp("approPostGrid");
	grid.store.reload(
	{
		params :
		{
			nodeName : nodeName,
			orgName : orgName,
			postName : postName,
			start : 0,
			limit : 20
		}
	});
	grid.store.baseParams =
	{
		nodeName : nodeName,
		orgName : orgName,
		postName : postName,
		start : 0,
		limit : 20
	};
}

	//删除数据
	function delData(){
		var records = sm.getSelections(); // 针对所有选中数据,包括分页的
		if (records.length == 0)
		{
			Ext.Msg.alert('提示信息', '请选择数据!');
			return;
		} else {
			var recordIdArr = '';
			for ( var i = 0; i < records.length; i++) {
				var rec = records[i];
				recordIdArr += rec.get('id')+',';
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
							url : getHandlerRequestUrl() +"approvalPostConfigHandler/delete",
							method : 'POST',
							params :
							{
								jsonData : recordIdArr
							},
							success : function(response, opts)
							{
								
								 var resObj = Ext.decode(response.responseText);
								 if(resObj.success==false){
									 Ext.Msg.alert("提示信息",resObj.msg);
								 }
								Ext.getCmp("approPostGrid").store.reload();
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
// 获取路由ID
function getSelectedRouteId()
{
	var grid = Ext.getCmp("approPostGrid");
	var list = getGridList(grid, "routeId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "请选择要操作的路由");
		return false;
	}
	return list[0];
}
function refurbisGrid(grid)
{
	grid.store.reload();
	grid.getSelectionModel().clearSelections();
	var toolbar = grid.getTopToolbar();
	for ( var i = 0; i <= 3; i++)
	{
		toolbar.getComponent(i).disable();
	}
}
// 刷新状态
function refurbishBtn(grid)
{

}