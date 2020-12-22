Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	setTip("文件管理");
	var panel = createMainPanel();
	setPagingTwo(Ext.getCmp("fileGrid"));
	setMainPanel(document.body, panel);
	Ext.getCmp("treeHeight_1").setHeight(Ext.getCmp("fileGrid").getHeight());
	Ext.EventManager.onWindowResize(function()
	{
	});
}
function createMainPanel()
{
	var panel = new Ext.Panel(
	{
		layout : 'column',
		autoWidth : true,
		defaults :
		{// 设置默认属性
			bodyStyle : 'background-color:#FFFFFF;',// 设置面板体的背景色
			frame : true
		},
		items : [ createLeftTreePanel_1(), createGrid_1() ]
	});
	return panel;
}
function createLeftTreePanel_1()
{
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : orgRootName,
		id : orgRootId,
		draggable : false,
		expanded : true,
		loader : new Ext.tree.TreeLoader(
		{
			dataUrl : getContextPath()
					+ "app/http/aip/orgInfoManagerHandler/getOrgInfoTree"
		})
	});
	var tree = new Ext.tree.TreePanel(
			{
				frame : true,
				columnWidth : .2,
				animate : true,
				id : 'treeHeight_1',
				root : root,
				border : false,
				autoScroll : true,
				listeners :
				{
					click : function(node, e)
					{
						var grid = Ext.getCmp("fileGrid");
						Ext.apply(grid.store.baseParams,
						{
							start : 0,
							limit : pageSize,
							provider : node.id
						});
						grid.store.load(
						{
							params : grid.store.baseParams
						});
					}
				},
				hrefTarget : 'mainContent'
			});
	return tree;
}
function createGrid_1()
{
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true,
		header:"",
		listeners :
		{
			rowselect : function()
			{
				var grid=Ext.getCmp("fileGrid");
				var record=this.getSelected();
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).enable();
				if(record.get("isAuth")==0)
				{
					toolbar.getComponent(1).enable();
				}
				toolbar.getComponent(2).enable();
				toolbar.getComponent(0).enable();
			},
			rowdeselect : function()
			{
				var grid=Ext.getCmp("fileGrid");
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).disable();
				toolbar.getComponent(1).disable();
				toolbar.getComponent(2).disable();
			}
		}
	});
	var columns = [ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'routeId',
		hidden : true
	},
	{
		dataIndex : 'fileName',
		header : "文件名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'fileSizef',
		header : "文件大小",
		sortable : true,
		width : 40
	},
	{
		dataIndex : 'resourceName',
		header : "挂接资源目录",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'showURL',
		header : "下载地址",
		sortable : true,
		width : 240
	},
	{
		dataIndex : 'isAuth',
		header : "授权类型",
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='green'>完全公开</font>";
			}
			return "<font color='red'>授权访问</font>";
		},
		width : 40
	},
	{
		dataIndex : 'routeStatus',
		header : "文件状态",
		renderer : function(value)
		{
			if (value == 1)
			{
				return "<font color='green'>启用</font>";
			}
			return "<font color='red'>禁用</font>";
		},
		width : 40
	},
	{
		dataIndex : 'publishDate',
		header : "上传时间",
		renderer : formatDate,
		width : 80
	} ,{
		dataIndex : 'publishURL',
		hidden:true
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
		}, Ext.data.Record.create([
		{
			name : 'routeId'
		},
		{
			name:'routeName'
		},
		{
			name : 'fileSizef'
		},
		{
			name : 'fileName'
		},
		{
			name : 'routeStatus'
		},
		{
			name : 'showURL'
		},
		{
			name : 'publishDate'
		},
		{
			name:'publishURL'
		},
		{
			name : 'isAuth'
		},
		{
			name : 'resourceName',
			mapping : function(data)
			{
				return jsonConvert(data, "resource", "resourceName");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + "serviceInfoHandler/getFileServicePageList"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar_1(),
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		id:'fileGrid',
		border : false, // 是否显示行的边框
		sm : sm,
		columnWidth : .8,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		bbar : [],
		viewConfig :
		{
			forceFit : true
		}
	});
}
function createToolbar_1()
{
	var toolbar = new Ext.Toolbar();
	toolbar.addButton(new Ext.Button({
		text:'查看详情',
		iconCls:'icon_sms',
		disabled : true,
		handler:function(){
			//获得当前选择的数据
			var dataModel=Ext.getCmp('fileGrid').getSelectionModel();
			var count = dataModel.getSelections().length;
			//如果不是选择一条，提醒他必须选择一条数据
			if(1!==count){
				Ext.Msg.alert('系统提示', '请选择一条数据再查看详情');
				return false;
			}
			var data=dataModel.getSelections()[0].data;
			var myWindow=new Ext.Window({
				id:'list_detail_win',
				width : 420,
				height : 320,
				title:'文件详细信息',
				modal:true,				
				layout:'fit',
				items:[{
					xtype:'form',
					url:getHandlerRequestUrl() + "serviceInfoHandler/updateFileDetail",
					defaultType:'textfield',
					title:false,
					id:'list_detail_win_form',
					buttonAlign : 'center',
					header:false,
					labelAlign:'right',
					bodyStyle : 'padding:15px 10px',
					defaults : {
						msgTarget:'side',//侧面报错
						width : 240,
						style:'margin-top:5px;'
					},
					items:[{
						value:data.routeId,
						name:'routeId',
						id:'list_detail_routeId',
						hidden:true
					},{
						fieldLabel : '<span style="color:red;">*</span>文件名称',
						allowBlank : false,
						value:data.fileName,
						name:'fileName',
						id:'list_detail_fileName'
					},{
						fieldLabel : '文件路径',
						allowBlank : false,
						value:data.publishURL,
						readOnly : true,
						name:'routeName',
						id:'list_detail_routeName'
					},{
						fieldLabel : '文件大小',
						allowBlank : false,
						value:data.fileSizef,
						readOnly : true,
						name:'fileSizef',
						id:'list_detail_fileSizef'
					},{
						fieldLabel : '下载地址',
						allowBlank : false,
						value:data.showURL,
						readOnly : true,
						name:'showURL',
						id:'list_detail_showURL'
					},{
						xtype : 'radiogroup',
						fieldLabel : '授权类型',
//						vertical : true,
						items : [{
							boxLabel : '授权访问',
							name : 'isAuth',
							inputValue : '1',
							checked : data.isAuth==1?true:false
						},{
							boxLabel : '公开',
							name : 'isAuth',
							inputValue : '0',
							checked:data.isAuth==0?true:false
						}]
					},{
						xtype : 'radiogroup',
						fieldLabel : '文件状态',
//						vertical : true,
						items : [{
							boxLabel : '启用',
							name : 'isStatus',
							inputValue : '1',
							checked:data.routeStatus==1?true:false
						},{
							boxLabel : '禁用',
							name : 'isStatus',
							inputValue : '0',
							checked:data.routeStatus==0?true:false
						}]
					}],
					buttons: [{
						text: '保存',
						iconCls:'icon_save',
						formBind: true,
						handler: function() {
							this.setDisabled(true);//禁用掉按钮防止重复提交
							var form = Ext.getCmp("list_detail_win_form").getForm();
							if (form.isValid()) {													
								form.submit({
									success : function(form, action) {
										//调用查询方法刷新数据
										searchFile();
										//成功提示
										Ext.Msg.alert("提示",action.result.msg);	
										//成功之后关闭窗口
										myWindow.close();
									},
									failure : function(form, action) {
										if(action.result){
											Ext.Msg.alert("提示",action.result.msg);	
										}else{
											Ext.Msg.alert("提示","请求失败");	
										}										
									}
								});
							}	
						}
					}]
				}]
			});
			myWindow.show();
		}
	}));
	toolbar.addButton(new Ext.Button({
		text:'下载',
		iconCls:'icon_download',
		disabled : true,
		handler:function()
		{
			var grid=Ext.getCmp("fileGrid");
			var record = grid.getSelectionModel().getSelected();
			//document.location.href =record.get("showURL")+"?authKey=DFGHJLK&timestamp="+new Date().getTime();
			var url=record.get("showURL")+"?authKey=DFGHJLK&timestamp="+new Date().getTime();
			window.open(url,"_blank");
		}
	}));
	toolbar.addButton(new Ext.Button({
		text:'删除',
		iconCls:'icon_delete',
		disabled : true,
		handler:deleteFile
	}));
	toolbar.addFill();
	toolbar.addText("文件名称:");
	toolbar.addItem(new Ext.form.TextField(
			{
				id : 'fileName_input',
				emptyText:'包含文件名称的字符',
				listeners :
				{
					specialkey : function(field, e)
					{
						if (e.getKey() == Ext.EventObject.ENTER)
						{
							searchFile();
						}
					},
					focus:function()
					{
						onFocusClear(this);
					}
				},
				width : 200
			}));
	toolbar.addText("下载地址:");
	toolbar.addItem(new Ext.form.TextField(
			{
				id : 'downloadURL_input',
				emptyText:'自动加上前缀:http://10.6.10.38:9090/ftp/download/',
				listeners :
				{
					specialkey : function(field, e)
					{
						if (e.getKey() == Ext.EventObject.ENTER)
						{
							searchFile();
						}
					},
					focus:function()
					{
						this.setValue("");
					}
				},
				width : 300
			}));
	toolbar.addButton(new Ext.Button(
			{
				text : "搜索",
				iconCls : 'icon_query',
				handler:searchFile
			}));
	
	return toolbar;
}

