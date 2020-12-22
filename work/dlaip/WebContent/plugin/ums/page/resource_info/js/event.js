//打开机构新增窗口
function openResourceInfoWin(flag)
{
	var treePanel = Ext.getCmp("resourceInfoTree");
	var node = treePanel.getSelectionModel().getSelectedNode();
	if(node!=null&&flag=="ADD"&&node.id==resouceRootId)
	{
		return;
	}
	if (node == null && flag == "ADD")
	{
		Ext.Msg.alert('错误提示', "请选中一个资源树树节点");
		return;
	}

	var resourceInfoWin = new Ext.Window(
	{
		layout : 'fit',
		width : 480,
		height : 400,
		title : flag == "ADD" ? '新增资源信息' : '编辑资源信息',
		closeAction : 'close',
		id : "resourceInfoWin",
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5px 5px 5px 5px',
		items : [ createResourceInfoForm(flag) ],
		buttons : [

		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("resourceInfoWin").close();
			}
		},
		{
			text : flag == "ADD" ? "保存" : "修改",
			iconCls : 'icon_save',
			id : 'saveResourceBtn',
			handler : flag == "ADD" ? saveResourceInfo : function()
			{
				updateResourceInfo(flag);
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			id : 'icon_reset',
			handler : function()
			{
				Ext.getCmp("resourceInfoForm").form.reset();
			}
		} ]
	});
	resourceInfoWin.show();
	if (flag != "ADD")
	{
		var url = getHandlerRequestUrl()
				+ "resourceInfoHandler/getResourceInfo?resourceId=" + flag;
		var form = Ext.getCmp("resourceInfoForm");
		form.form.reset();
		form.form
				.load(
				{
					waitMsg : '正在加载数据请稍后',// 提示信息
					waitTitle : '提示',// 标题
					url : url,
					method : 'POST',// 请求方式
					success : function(form, action)
					{
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.getCmp("pRouseComboxTree").setValue(
								result.data.pid.resourceName);
						Ext.getCmp("resourcePidType").setValue(
								result.data.pid.resourceType);
						Ext.getCmp("resourcePid").setValue(
								result.data.pid.resourceId);
						Ext.getCmp("resourceAppId").setValue(
								result.data.app.appId);
					},
					failure : function(form, action)
					{// 加载失败的处理函数
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.Msg.alert('提示', "获取资源信息异常" + result.msg);
					}
				});
	} else
	{
		Ext.getCmp("resourcePName").setValue(node.text);
		Ext.getCmp("resourcePid").setValue(node.id);
		Ext.getCmp("resourcePidType").setValue(node.attributes.resourceType);
	}
}
function createResourceInfoForm(flag)
{
	var resourceInfoForm = new Ext.FormPanel(
			{
				labelSeparator : "：",
				frame : true,
				id : "resourceInfoForm",
				bodyStyle : 'padding:15px 0px 20px 20px',
				border : false,

				buttonAlign : 'center',
				items : [
						flag == "ADD" ?
						{
							xtype : 'textfield',
							name : 'pName',
							id : "resourcePName",
							width : 280,
							allowBlank : false,
							readOnly : true,
							maxLength : 50,
							fieldLabel : '<span style="color:red;">*</span>父节点名称'
						} : createRouseComboxTree(),
						{
							xtype : 'textfield',
							name : 'resourceName',
							width : 280,
							regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
							regexText : "有非法字符或空格",
							maxLength : 50,// 允许输入的最大字符数
							maxLengthText : "最大长度不能超过50个字符！",// 提示文本
							allowBlank : false,
							blankText : '资源名称',
							maxLength : 50,
							fieldLabel : '<span style="color:red;">*</span>资源名称'
						},
						{
							xtype : 'radiogroup',
							fieldLabel : '<span style="color:red;">*</span>资源类型',
							width : 280,
							columns : 3,
							listeners :
							{
								'change' : function()
								{
									var obj = this.items.items;
									for ( var i in obj)
									{
										if (obj[i].checked
												&& obj[i].inputValue == 2)
										{
											Ext.getCmp("resourceUrl").disable();
											Ext.getCmp("saveResourceBtn")
													.enable();
											break;
										}
										if (obj[i].checked
												&& obj[i].inputValue == 3
												|| obj[i].checked
												&& obj[i].inputValue == 5)
										{
											if (Ext.getCmp("resourcePidType")
													.getValue() == ""
													|| Ext.getCmp(
															"resourcePidType")
															.getValue() != 0)
											{
												Ext.Msg.alert('错误提示',
														"父节点类型必须为系统页面");
												Ext.getCmp("saveResourceBtn")
														.disable();
												break;
											}
											Ext.getCmp("resourceUrl").enable();
											break;
										} else
										{
											Ext.getCmp("resourceUrl").enable();
											Ext.getCmp("saveResourceBtn")
													.enable();
										}
									}
								}
							},
							items : [
							{
								boxLabel : '系统页面',
								name : 'resourceType',
								inputValue : '0',
								checked : true
							},
							{
								boxLabel : '外部系统URL',
								name : 'resourceType',
								inputValue : '1'
							},
							{
								boxLabel : '虚拟目录',
								name : 'resourceType',
								inputValue : '2'
							},
							{
								boxLabel : '按钮',
								name : 'resourceType',
								inputValue : '3'
							},
							{
								boxLabel : '服务资源',
								name : 'resourceType',
								inputValue : '4'
							} ]
						},
						{
							xtype : 'textfield',
							name : 'resourceUrl',
							id : "resourceUrl",
							width : 280,
							maxLength : 512,
							fieldLabel : 'URL'
						},
						{
							xtype : 'numberfield',
							name : 'orderNumber',
							width : 280,
							allowBlank : false,
							blankText : '序号',
							minValue : 1,
							maxValue : 20,
							fieldLabel : '<span style="color:red;">*</span>序号'
						},
						{
							xtype : 'radiogroup',
							fieldLabel : '状态',
							width : 280,
							columns : [ 140, 140 ],
							vertical : true,
							items : [
							{
								boxLabel : '启用',
								name : 'status',
								inputValue : 'Y',
								checked : true
							},
							{
								boxLabel : '禁用',
								name : 'status',
								inputValue : 'N'
							}

							]
						},
						{
							xtype : 'textfield',
							name : 'resourcePid',
							id : 'resourcePid',
							hidden : true
						},
						{
							xtype : 'textfield',
							name : 'resourceId',
							hidden : true
						},
						{
							xtype : 'textarea',
							name : 'postDesc',
							width : 280,
							anchor : '91% 30%',
							fieldLabel : '资源描述'
						},
						{
							xtype : 'textfield',
							name : 'resourcePidType',
							id : 'resourcePidType',
							hidden : true
						} ]
			});
	return resourceInfoForm;
}
function saveResourceInfo()
{
	var url = getHandlerRequestUrl() + "resourceInfoHandler/saveResourceInfo";
	var form = Ext.getCmp("resourceInfoForm");
	submitForm(form, url, "保存资源信息异常", function()
	{
		Ext.Msg.alert('提示', "保存资源信息成功", function()
		{
			resource_callback();
		});

	});
}
function resource_callback()
{
	var tree = Ext.getCmp("resourceInfoTree");
	tree.root.reload();
	var grid = Ext.getCmp("resourceInfoGrid");
	grid.store.reload();
	Ext.getCmp("resourceInfoWin").close();
}
function createRouseComboxTree()
{
	
	var rouseComboxTree = new Ext.form.ComboBox(
			{
				editable : false,
				store : new Ext.data.SimpleStore(
				{
					fields : [ 'resourceId', 'resourceName' ],
					data : [ [] ]
				}),
				mode : 'local',
				triggerAction : 'all',
				fieldLabel : '<span style="color:red;">*</span>父节点',
				emptyText : '请选择父节点',
				width : 280,
				allowBlank : false,
				blankText : '父节点不能不为空',
				displayField : 'resourceName',
				id : "pRouseComboxTree",
				hiddenName : 'resourcePName',
				valueField : 'resourceId',
				tpl : "<tpl for='.'><div style='height:220px'><div id='tree3'></div></div></tpl>",
				selectedClass : '',
				onSelect : Ext.emptyFn
			});

	var root = new Ext.tree.AsyncTreeNode(
	{
		text : '资源树',
		draggable : false,
		id : 'ROOT',
		expanded : true,
		url : '#',
		loader : new Ext.tree.TreeLoader(
		{
			dataUrl : getHandlerRequestUrl()
					+ "resourceInfoHandler/getResourceInfoTree"
		})
	});
	var comboxTree = new Ext.tree.TreePanel(
	{
		animate : true,
		split : true,
		singleExpand : true,
		lines : false,
		autoScroll : true,
		root : root,
		width : 280,
		height : 500
	});

	comboxTree.on('click', function(node)
	{
		rouseComboxTree.setValue(node.attributes.text);
		// Ext.getCmp("menuPnameValueId").setValue(node.attributes.id);
		rouseComboxTree.collapse();// 隐藏树列表
	}, this,
	{
		stopEvent : true
	});
	comboxTree.on('expandnode', function(node)
	{
	}, this,
	{
		stopEvent : true
	});
	rouseComboxTree.on('expand', function()
	{
		comboxTree.render('tree3');
	});
	return rouseComboxTree;
}
function updateResourceInfo(resourceId)
{
	var url = getHandlerRequestUrl()
			+ "resourceInfoHandler/updateResourceInfo?resourceId=" + resourceId;
	var form = Ext.getCmp("resourceInfoForm");
	submitForm(form, url, "修改资源信息异常", function()
	{
		Ext.Msg.alert('提示', "修改资源信息成功", function()
		{
			resource_callback();
		});
	});
}
function deleteResourceInfo()
{

	var grid = Ext.getCmp("resourceInfoGrid");
	var list = getGridList(grid, "resourceId");
	if (list.length < 1)
	{
		Ext.Msg.alert('提示', "至少选择一条操作数据");
		return false;
	}
	var url = getHandlerRequestUrl()
			+ "resourceInfoHandler/deleteResourceInfo?resourceIds="
			+ list.join(",");
	deleteData(url, "", function()
	{
		grid.store.reload();
	});
}
function searchForResource()
{
	var resourceType = Ext.getCmp("ComboBoxResourceType").getValue();
	var resourceUrl = Ext.getCmp("search_resourceUrl").getValue();
	Ext.getCmp("resourceInfoGrid").store.reload(
	{
		params :
		{
			start : 0,
			limit : pageSize,
			search : 'search',
			resourceType : resourceType,
			resourceUrl : resourceUrl
		}
	});
	Ext.getCmp("resourceInfoGrid").store.baseParams =
	{
		start : 0,
		limit : pageSize,
		search : 'search',
		resourceType : resourceType,
		resourceUrl : resourceUrl
	};
}
