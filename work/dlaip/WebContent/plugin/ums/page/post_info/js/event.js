function showPostWin()
{
	var postInfoWin = new Ext.Window(
	{
		layout : 'fit',
		id : 'postInfoWin',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height :280,
		shadow : true,
		title : '添加岗位信息',
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		buttonAlign : 'center',
		animCollapse : true,
		items :
		[ createPostInfoForm() ],
		buttons :
		[

		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("postInfoWin").close();
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler : function()
			{
				if (Ext.getCmp("postInfoForm").getForm().isValid())
				{
					savePostInfo();
				} else
				{
					Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
				}

			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function()
			{
				Ext.getCmp("postInfoForm").form.reset();
			}
		} ]
	});
	var node = Ext.getCmp("treePost").getSelectionModel().getSelectedNode();

	postInfoWin.show();
	if (node != null)
	{
		Ext.getCmp(orgRootId).setValue(node.text);
		Ext.getCmp("organizationIdsAdd").setValue(node.id);
	}
}
function createPostInfoForm()
{
	var postInfoForm = new Ext.FormPanel(
	{
		labelSeparator : "：",
		frame : false,
		id : "postInfoForm",
		border : false,
		bodyStyle : 'padding:15px 0px 20px 0px',
		labelAlign : 'right',
		buttonAlign : 'center',
		items :
		[
		{
			xtype : 'textfield',
			name : "postId",
			hidden : true
		},
		{
			xtype : 'textfield',
			hidden : true,
			hideLabel : true,
			id : 'organizationIdsAdd',
			name : "orgId"
		},
		{
			xtype : 'textfield',
			width : 240,
			allowBlank : false,
			blankText : '岗位名称',
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 45,// 允许输入的最大字符数
			maxLengthText : "最大长度不能超过45个字符！",// 提示文本
			name : 'postName',
			height : 40,
			fieldLabel : '<span style="color:red;">*</span>岗位名称'
		}, createOrganizationComboxTree(),
				createAppCombox(240, "<span style='color:red;'>*</span>所属应用", "appComboxId"),
				{
					xtype : 'textarea',
					name : 'postDesc',
					width : 240,
					anchor : '90% 40%',
					fieldLabel : '岗位描述'
				},
				{
					xtype : 'radiogroup',
					fieldLabel : '状态',
					width : 240,
					columns :
					[ 120, 120 ],
					vertical : true,
					items :
					[
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
				} ]
	});
	return postInfoForm;
}
function createOrganizationComboxTree()
{
	var createOrganizationComboxTree = new Ext.form.ComboBox(
	{
		editable : false,
		store : new Ext.data.SimpleStore(
		{
			fields :
			[ 'orgId', 'orgName' ],
			data :
			[
			[] ]
		}),
		mode : 'local',
		triggerAction : 'all',
		fieldLabel : '<span style="color:red;">*</span>所属机构',
		emptyText : '请选择机构',
		width : 240,
		allowBlank : false,
		blankText : '所属机构不能不为空',
		displayField : 'name',
		id : orgRootId,
		hiddenName : 'orgName',
		valueField : 'orgId',
		tpl : "<tpl for='.'><div style='height:220px'><div id='" + orgRootId
				+ "tree3'></div></div></tpl>",
		selectedClass : '',
		onSelect : Ext.emptyFn
	});
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : orgRootName,
		draggable : false,
		id : orgRootId,
		expanded : true,
		loader : new Ext.tree.TreeLoader(
		{
			dataUrl : getHandlerRequestUrl()
					+ "orgInfoManagerHandler/getOrgInfoTree"
		})
	});
	var comboxTree = new Ext.tree.TreePanel(
	{
		id : 'comboxOrganizationTree',
		animate : true,
		split : true,
		singleExpand : true,
		lines : false,
		autoScroll : true,
		root : root,
		width : 240,
		height : 1350
	});
	comboxTree.on('click', function(node)
	{
		createOrganizationComboxTree.setValue(node.attributes.text);
		Ext.getCmp("organizationIdsAdd").setValue(node.attributes.id);
		createOrganizationComboxTree.collapse();// 隐藏树列表
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
	createOrganizationComboxTree.on('expand', function()
	{
		comboxTree.render(orgRootId + 'tree3');
	});
	return createOrganizationComboxTree;
}
function savePostInfo()
{
	var form = Ext.getCmp("postInfoForm");
	var url = getHandlerRequestUrl() + "postInfoManagerHandler/savePostInfo";
	submitForm(form, url, "保存岗位信息异常", function()
	{
		Ext.Msg.alert('提示', "保存岗位信息成功", function()
		{

			Ext.getCmp("postInfoGrid").store.reload();
			Ext.getCmp("postInfoWin").close();
		});

	});
}
function showEditPostInfoWin()
{
	var grid = Ext.getCmp("postInfoGrid");
	var list = getGridList(grid, "postId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "每次只能对一条数据进行编辑");
		return false;
	}
	var postInfoEditWin = new Ext.Window(
	{
		layout : 'fit',
		id : 'postInfoEditWin',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height : 280,
		shadow : true,
		title : '修改岗位信息',
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		buttonAlign : 'center',
		animCollapse : true,
		items :
		[ createPostInfoForm() ],
		buttons :
		[

		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("postInfoEditWin").close();
			}
		},
		{
			text : '修改',
			iconCls : 'icon_save',
			handler : function()
			{
				if (Ext.getCmp("postInfoForm").getForm().isValid())
				{
					updaePostInfo();
				} else
				{
					Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
				}

			}
		} ]
	});
	postInfoEditWin.show();
	var form = Ext.getCmp("postInfoForm");
	var url = getHandlerRequestUrl()
			+ "postInfoManagerHandler/getPostInfo?postId=" + list[0];
	form.form.load(
	{
		waitMsg : '正在加载数据请稍后',// 提示信息
		waitTitle : '提示',// 标题
		url : url,
		method : 'POST',// 请求方式
		success : function(form, action)
		{
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.getCmp(orgRootId).setValue(result.data.orgInfo.orgName);
			Ext.getCmp("appComboxId").setValue(result.data.app.appId);
			Ext.getCmp("organizationIdsAdd")
					.setValue(result.data.orgInfo.orgId);
		},
		failure : function(form, action)
		{// 加载失败的处理函数
			var result = Ext.util.JSON.decode(action.response.responseText);
			Ext.Msg.alert('提示', "获取用户信息异常" + result.msg);
		}
	});
}
function updaePostInfo()
{
	var form = Ext.getCmp("postInfoForm");
	var url = getHandlerRequestUrl() + "postInfoManagerHandler/editPostInfo";
	submitForm(form, url, "修改岗位信息异常", function()
	{
		Ext.Msg.alert('提示', "修改岗位信息成功", function()
		{

			Ext.getCmp("postInfoGrid").store.reload();
			Ext.getCmp("postInfoEditWin").close();
		});

	});
}
function deletePostInfo()
{
	var grid = Ext.getCmp("postInfoGrid");
	var list = getGridList(grid, "postId");
	if (list.length == 0)
	{
		Ext.Msg.alert('提示', "请选择要删除的数据");
		return false;
	}
	var postIds = list.join(",");
	var url = getHandlerRequestUrl()
			+ "postInfoManagerHandler/deletePostInfo?postIds=" + postIds;
	deleteData(url, "删除机构信息异常", function()
	{
		Ext.getCmp("postInfoGrid").store.reload();
	});
}
function showRoleListWin()
{
	var grid = Ext.getCmp("postInfoGrid");
	var list = getGridList(grid, "postId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "每次只能对一条数据进行操作");
		return false;
	}
	var postId = list[0];
	list = getGridList(grid, "appId");
	var appId = list[0];
	var roleListWin = new Ext.Window(
	{
		layout : 'fit',
		id : 'roleListWin',
		closeAction : 'close',
		resizable : false,
		width : 700,
		height : 450,
		shadow : true,
		title : '未添加到该岗位的角色列表',
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		buttonAlign : 'center',
		animCollapse : true,
		postId : postId,
		items :
		[ createPostRoleGrid(postId, appId) ]
	});
	roleListWin.show();
}
function createPostRoleGrid(postId, appId)
{

	var fields =
	[ 'roleId', 'roleName', "status", "createDate", "postName", "id" ];
	fields =
	[
	{
		name : 'roleId',
		mapping : 'roleInfo.roleId'
	},
	{
		name : 'roleName',
		mapping : 'roleInfo.roleName'
	},
	{
		name : 'status'
	},
	{
		name : 'createDate'
	},
	{
		name : 'postName',
		mapping : function(data)
		{
			return jsonConvert(data, "postInfo", "postName");
		}
	},
	{
		name : 'id'
	} ];
	var sm = new Ext.grid.CheckboxSelectionModel();
	var columnLabel = new Ext.grid.ColumnModel(
	[ sm, new Ext.grid.RowNumberer(),
	{
		header : "角色名称",
		dataIndex : 'roleName',
		width : 80,
		sortable : true
	},

	{
		header : "岗位名称",
		width : 80,
		dataIndex : 'postName'
	},
	{
		header : "添加时间",
		dataIndex : 'createDate',
		width : 100,
		renderer : formatDate,
		sortable : true
	},
	{
		header : "是否添加",
		dataIndex : 'status',
		renderer : function(value)
		{
			if (value != "")
			{
				return "<font color='green'>已添加</font>";
			}
			return "<font color='red'>未添加</font>";
		}
	},
	{
		header : "状态",
		dataIndex : 'status',
		renderer : function(value)
		{

			if (value != "")
			{
				if ("Y" == value)
				{
					return "<font color='green'>启用</font></a>";
				}
				return "<font color='red'>停用</font>";
			}
			return "-";
		}
	},
	{
		dataIndex : 'roleId',
		hidden : true
	},
	{
		dataIndex : 'id',
		hidden : true
	} ]);
	var gridStore = new Ext.data.JsonStore(
	{
		successProperty : 'success',
		autoLoad : true,
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
		url : getHandlerRequestUrl()
				+ "roleInfoHandler/getRoleInfoByPostId?postId=" + postId
				+ "&appId=" + appId,
		root : 'list',
		idProperty : 'ID',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		id : "post_role_add_grid",
		tbar : createToolbar_(),
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		sm : sm,
		store : gridStore,
		border : false, // 是否显示行的边框
		cm : columnLabel,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		viewConfig :
		{
			forceFit : true
		}
	});
	return grid;
}
function createToolbar_()
{
	var toolbar = new Ext.Toolbar(
	{
		autoWidth : true
	});
	toolbar.addButton(new Ext.Button(
	{
		text : "添加",
		iconCls : 'icon_add',
		handler : function()
		{
			var postId = new Ext.getCmp("roleListWin").postId;
			var grid = Ext.getCmp("post_role_add_grid");
			var list = getGridList(grid, "roleId");
			if (list.length == 0)
			{
				Ext.Msg.alert('错误提示', "至少选择一条角色数据");
				return false;
			}
			var submitText = postId + ":" + list.join(",");
			var url = getHandlerRequestUrl()
					+ "roleInfoHandler/saveRoleToPostInfo?postId=" + postId
					+ "&roleIds=" + list.join(",");
			search_(url, "添加角色到岗位异常", function()
			{
				grid.store.reload(
				{
					params :
					{
						start : 0,
						limit : 18
					}
				});
			});
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "移除",
		iconCls : 'icon_delete',
		disabled : true,
		handler : function()
		{
			var grid = Ext.getCmp("post_role_add_grid");
			var list = getGridList(grid, "id");
			if (list.length == 0)
			{
				Ext.Msg.alert('错误提示', "至少选择一条角色数据");
				return false;
			}
			var url = getHandlerRequestUrl()
					+ "roleInfoHandler/removeRoleInfoByPostId?ids="
					+ list.join(",");
			deleteData(url, "是否移除该岗位下的角色信息", function()
			{
				var grid = Ext.getCmp("post_role_add_grid");
				grid.store.reload(
				{
					params :
					{
						queryFlag : "ADD",
						start : 0,
						limit : 18
					}
				});
			});

		}
	}));

	toolbar.addButton(new Ext.Button(
	{
		text : "已添加",
		iconCls : 'icon_delete',
		handler : function(btn)
		{
			var grid = Ext.getCmp("post_role_add_grid");
			toolbar.getComponent(6).setValue("");
			grid.store.reload(
			{
				params :
				{
					queryFlag : "ADD",
					roleName : ""
				}
			});
			grid.store.baseParams =
			{
				queryFlag : "ADD"
			};
			toolbar.getComponent(1).enable();
			toolbar.getComponent(0).disable();
			toolbar.getComponent(3).enable();
			toolbar.getComponent(5).disable();
			// toolbar.getComponent(7).disable();
			btn.disable();
			grid = Ext.getCmp("postInfoGrid");
			var l = getGridList(grid, "postName");
			Ext.getCmp("roleListWin").setTitle("已添加到该岗位[" + l[0] + "]的角色列表信息");
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "未添加",
		iconCls : 'icon_delete',
		disabled : true,
		handler : function(btn)
		{
			var grid = Ext.getCmp("post_role_add_grid");
			toolbar.getComponent(6).setValue("");
			grid.store.reload(
			{
				params :
				{
					queryFlag : "",
					roleName : ""
				}
			});
			grid.store.baseParams =
			{
				queryFlag : ""
			};
			btn.disable();
			toolbar.getComponent(2).enable();
			toolbar.getComponent(0).enable();
			toolbar.getComponent(1).disable();
			toolbar.getComponent(5).enable();
			// toolbar.getComponent(7).enable();
			Ext.getCmp("roleListWin").setTitle("未添加到该岗位的角色列表");
		}
	}));
	toolbar.addFill();
	toolbar.addText("角色名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		width : 200
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : function()
		{

			var grid = Ext.getCmp("post_role_add_grid");
			grid.store.reload(
			{
				params :
				{
					roleName : toolbar.getComponent(6).getValue()
				}
			});
			grid.store.baseParams =
			{
				roleName : toolbar.getComponent(6).getValue()
			};
		}
	}));
	return toolbar;
}
/**
 * 岗位搜索
 */
function searchForPost()
{
	var grid = Ext.getCmp("postInfoGrid");
	var toolbar = grid.getTopToolbar();
	var postName = toolbar.get(6).getValue();
	if(postName!="")
	{
		grid.store
		.reload(
		{
			params :
			{
				postName:postName,
				start : 0,
				limit : pageSize
			}
		});
		grid.store.baseParams =
		{
				postName:postName,
				start : 0,
				limit : pageSize
		};
	}
	
}