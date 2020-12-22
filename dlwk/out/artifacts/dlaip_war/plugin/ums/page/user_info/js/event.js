function showUserWin()
{
	var userinfoWin = new Ext.Window(
	{
		layout : 'fit',
		width :465,
		height :480,
		id : 'UserWin',
		title : '新增用户信息',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ createUserForm() ],
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("UserWin").close();
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler : function()
			{
				if (Ext.getCmp("userInfoForm").getForm().isValid())
				{
					saveUserInfo();
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
				Ext.getCmp('userInfoForm').form.reset();
			}
		} ]

	});
	userinfoWin.show();
}
function createGroupRadio()
{
	var groupR =
	{
		xtype : 'radiogroup',
		fieldLabel : '用户类型',
		width : 240,
		columns : [ 120, 120 ],
		vertical : true,
		items : [
		{
			boxLabel : '普通用户',
			name : 'userLevel',
			inputValue : '0',
			checked : true
		},
		{
			boxLabel : '应用管理员',
			name : 'userLevel',
			inputValue : '1'
		} ]
	};
	return groupR;
}
function createUserForm()
{

	var userInfoForms = new Ext.FormPanel(
			{
				labelSeparator : "：",
				frame : true,
				id : "userInfoForm",
				width : 360,
				border : false,
				autoHeight : true,
				buttonAlign : 'center',
				bodyStyle : 'padding:5px 5px 5px 30px',
				items : [
						{
							xtype : 'textfield',
							name : 'name',
							width : 240,
							regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
							regexText : "有非法字符或空格",
							maxLength : 45,
							maxLengthText : "用户名最大长度不能超过45个字符！",// 提示文本
							allowBlank : false,
							blankText : '请输入用户姓名',
							fieldLabel : '<span style="color:red;">*</span>用户姓名'
						},
						{
							allowBlank : false,
							xtype : 'textfield',
							name : 'loginName',
							id : 'loginName',
							width : 240,
							regex : /^[a-zA-Z0-9_]+$/,
							regexText : "只能由字母和数字下划线组成！",
							blankText : '登录名',
							maxLength : 15,// 允许输入的最大字符数20
							maxLengthText : "登陆用户最大长度不能超过10个字符！",// 提示文本
							fieldLabel : '<span style="color:red;">*</span>登录名'
						},
						{
							xtype : 'textfield',
							inputType : 'password',
							name : 'loginPassword',
							width : 240,
							allowBlank : false,
							blankText : '登陆密码',
							maxLength : 15,
							maxLengthText : "密码最大长度不能超过10个字符！",
							fieldLabel : '<span style="color:red;">*</span>登陆密码'
						},
						{
							xtype : 'textfield',
							inputType : 'password',
							name : 'loginPasswordto',
							width : 240,
							allowBlank : false,
							blankText : '验证登陆密码',
							maxLength : 15,// 允许输入的最大字符数10
							maxLengthText : "密码最大长度不能超过10个字符！",// 提示文本
							fieldLabel : '<span style="color:red;">*</span>验证登陆密码'
						},
						{
							xtype : 'textfield',
							name : 'cardNo',
							width : 240,
							allowBlank : true,
							blankText : '身份证号码',
							regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
							maxLength : 18,
							maxLengthText : "身份证号码最大长度不能超过18个字符！",
							fieldLabel : '身份证号码'
						},
						{
							xtype : 'radiogroup',
							fieldLabel : '性别',
							width : 240,
							columns : [ 120, 120 ],
							vertical : true,
							items : [
							{
								boxLabel : '男',
								name : 'sex',
								inputValue : 'B',
								checked : true
							},
							{
								boxLabel : '女',
								name : 'sex',
								inputValue : 'G'
							}

							]
						},
						createOrganizationComboxTree('addUserInfoFormsOrg'),
						{
							xtype : 'textfield',
							name : 'employeeNo',
							width : 240,
							maxLength : 20,
							maxLengthText : "职位最大长度不能超过20个字符！",
							fieldLabel : '员工编号'
						},
						{
							xtype : 'textfield',
							name : 'position',
							width : 240,
							allowBlank : true,
							blankText : '职位',
							maxLength : 20,
							maxLengthText : "职位最大长度不能超过20个字符！",
							fieldLabel : '职位'
						},
						{
							xtype : 'textfield',
							name : 'phone',
							width : 240,
							regex : /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
							regexText : "请检查格式",
							allowBlank : true,
							blankText : '联系电话',
							maxLength : 20,// 允许输入的最大字符数20
							maxLengthText : "联系电话最大长度不能超过20个字符！",// 提示文本
							fieldLabel : '联系电话'
						},
						{
							xtype : 'textfield',
							name : 'email',
							width : 240,
							regex : /^\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\;\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*(\;)*\s*$/,
							regexText : "请检查邮件格式",
							allowBlank : true,
							blankText : '电子邮件',
							maxLength : 50,
							maxLengthText : "电子邮件最大长度不能超过50个字符！",
							fieldLabel : '电子邮件'
						}, createCheckBoxApp(),
						{
							xtype : 'radiogroup',
							fieldLabel : '状态',
							width : 240,
							columns : [ 120, 120 ],
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
							name : 'orgId',
							id : "ORG_ID_VALUE",
							hidden : true
						} ]
			});
	return userInfoForms;
}
function createOrganizationComboxTree(organizationNameId, searchId, width, flag)
{
	var createOrganizationComboxTree = new Ext.form.ComboBox(
	{
		editable : false,
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'orgId', 'orgName' ],
			data : [ [] ]
		}),
		mode : 'local',
		triggerAction : 'all',
		fieldLabel : '<span style="color:red;">*</span>所属机构',
		emptyText : '请选择机构',
		width : width ? width : 240,
		allowBlank : flag,
		blankText : '所属机构不能不为空',
		displayField : 'name',
		id : organizationNameId,
		hiddenName : 'orgName',
		heigth : 200,
		valueField : 'orgId',
		tpl : "<tpl for='.'><div style='height:200px'><div id='"
				+ organizationNameId + "tree3'></div></div></tpl>",
		selectedClass : '',
		onSelect : Ext.emptyFn
	});
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : orgRootName,
		draggable : false,
		id : orgRootId,
		heigth : 200,
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
		width : 235,
		autoHeight : true
	});
	comboxTree.on('click', function(node)
	{
		createOrganizationComboxTree.setValue(node.attributes.text);

		if (Ext.getCmp("ORG_ID_VALUE") != undefined)
		{
			Ext.getCmp("ORG_ID_VALUE").setValue(node.attributes.id);
		}
		if (searchId != undefined)
		{
			Ext.getCmp(searchId).setValue(node.attributes.id);
		}
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
		comboxTree.render(organizationNameId + 'tree3');
	});

	return createOrganizationComboxTree;
}
function saveUserInfo()
{
	var form = Ext.getCmp("userInfoForm");
	var appIds = Ext.getCmp("lovcombo_1").getValue();
	var fileInfo = getUploadXml(Ext.getCmp("loginName").getValue(), Ext.getCmp(
			"loginName").getValue());

	var url = getHandlerRequestUrl()
			+ "userInfoManagerHandler/saveUserInfo?appIds=" + appIds
			+ "&fileInfo=" + fileInfo;
	submitForm(form, url, "保存用户信息异常", function()
	{
		Ext.Msg.alert('提示', "保存用户信息成功", function()
		{

			Ext.getCmp("UserWin").close();
			Ext.getCmp("gridUserId").store.reload();
		});

	});
}
function showEditUserWin()
{
	var editUserWin = new Ext.Window(
	{
		layout : 'fit',
		width : 430,
		height :425,
		id : 'editUserWin',
		title : '用户信息编辑',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items : [ createEditUserForm() ],
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("editUserWin").close();
			}
		},
		{
			text : '修改',
			iconCls : 'icon_save',
			handler : function()
			{
				if (Ext.getCmp("editUserInfoForm").getForm().isValid())
				{
					updataUserInfo();
				} else
				{
					Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
				}
			}
		} /*
			 * , { text : '重置', iconCls : 'icon_reset', handler : function() { } }
			 */]

	});
	var grid = Ext.getCmp("gridUserId");
	var recs = grid.getSelectionModel().getSelections();
	if (recs.length != 1)
	{
		Ext.Msg.alert('提示', "每次只能对一条用户信息进行编辑");
		return false;
	}
	var userId = recs[0].get("userId");
	var form = Ext.getCmp("editUserInfoForm");
	editUserWin.show();
	var url = getHandlerRequestUrl()
			+ "userInfoManagerHandler/getUserInfoById?userId=" + userId;
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
					Ext.getCmp("addUserInfoFormsOrg").setValue(
							result.data.orgInfo.orgName);
					Ext.getCmp("ORG_ID_VALUE").setValue(
							result.data.orgInfo.orgId);
					var appList = result.data.appList;
					var appNameList = [];
					var appIdList = [];
					for ( var i = 0; i < appList.length; i++)
					{
						appNameList.push(appList[i].appName);
						appIdList.push(appList[i].appId);
					}
					if (appNameList.length > 0)
					{
						Ext.getCmp("lovcombo_1").setRawValue(
								appNameList.join(","));
						Ext.getCmp("hidden_appIds").setValue(
								appIdList.join(","));
					}
					Ext.getCmp('photoUrl').getEl().dom.src = result.data.imageUrl ? result.data.imageUrl
							: getContextPath()
									+ "resource/ext/resources/images/default_photo.png";
				},
				failure : function(form, action)
				{// 加载失败的处理函数
					var result = Ext.util.JSON
							.decode(action.response.responseText);
					Ext.Msg.alert('提示', "获取用户信息异常" + result.msg);
				}
			});
}
function createEditUserForm()
{
	var userInfoForms = new Ext.FormPanel(
			{
				labelSeparator : "：",
				frame : true,
				id : "editUserInfoForm",
				border : false,
				autoHeight : true,
				buttonAlign : 'center',
				bodyStyle : 'padding:5px 5px 5px 5px',
				items : [
						{
							xtype : 'textfield',
							name : 'name',
							width : 240,
							regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
							regexText : "有非法字符或空格",
							maxLength : 45,
							maxLengthText : "用户名最大长度不能超过45个字符！",// 提示文本
							allowBlank : false,
							blankText : '请输入用户姓名',
							fieldLabel : '<span style="color:red;">*</span>用户姓名'
						},
						{
							allowBlank : false,
							xtype : 'textfield',
							name : 'loginName',
							width : 240,
							editable : false,
							disabled : true,
							blankText : '登录名',
							maxLength : 15,// 允许输入的最大字符数20
							maxLengthText : "登陆用户最大长度不能超过10个字符！",// 提示文本
							fieldLabel : '<span style="color:red;">*</span>登录名'
						},
						{
							xtype : 'radiogroup',
							fieldLabel : '性别',
							width : 240,
							columns : [ 120, 120 ],
							vertical : true,
							items : [
							{
								boxLabel : '男',
								name : 'sex',
								inputValue : 'B',
								checked : true
							},
							{
								boxLabel : '女',
								name : 'sex',
								inputValue : 'G'
							}

							]
						},
						{
							xtype : 'textfield',
							name : 'cardNo',
							width : 240,
							allowBlank : true,
							blankText : '身份证号码',
							regex : /^(\d{18,18}|\d{15,15}|\d{17,17}x)$/,
							maxLength : 18,
							maxLengthText : "身份证号码最大长度不能超过18个字符！",
							fieldLabel : '身份证号码'
						},
						createOrganizationComboxTree('addUserInfoFormsOrg'),
						{
							xtype : 'textfield',
							name : 'employeeNo',
							width : 240,
							maxLength : 20,
							maxLengthText : "职位最大长度不能超过20个字符！",
							fieldLabel : '员工编号'
						},
						{
							xtype : 'textfield',
							name : 'position',
							width : 240,
							allowBlank : true,
							blankText : '职位',
							maxLength : 20,
							maxLengthText : "职位最大长度不能超过20个字符！",
							fieldLabel : '职位'
						},
						{
							xtype : 'textfield',
							name : 'phone',
							width : 240,
							regex : /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
							regexText : "请检查格式",
							allowBlank : true,
							blankText : '联系电话',
							maxLength : 20,// 允许输入的最大字符数20
							maxLengthText : "联系电话最大长度不能超过20个字符！",// 提示文本
							fieldLabel : '联系电话'
						},
						{
							xtype : 'textfield',
							name : 'email',
							width : 240,
							allowBlank : true,
							blankText : '电子邮件',
							maxLength : 50,
							regex : /^\s*\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\;\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)*(\;)*\s*$/,
							regexText : "请检查邮件格式",
							maxLengthText : "电子邮件最大长度不能超过50个字符！",
							fieldLabel : '电子邮件'
						}, createCheckBoxApp(),
						{
							xtype : 'radiogroup',
							fieldLabel : '状态',
							width : 240,
							columns : [ 120, 120 ],
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
							name : 'orgId',
							id : "ORG_ID_VALUE",
							hidden : true
						},
						{
							xtype : 'textfield',
							name : 'appIds',
							id : "hidden_appIds",
							hidden : true
						},
						{
							xtype : 'textfield',
							name : 'userId',
							hidden : true
						} ]
			});
	return userInfoForms;
}
function updataUserInfo()
{
	var form = Ext.getCmp("editUserInfoForm");
	var fileInfo = getUploadXml(new Date().getTime(), new Date().getTime());
	var val = Ext.getCmp("lovcombo_1").getValue();
	var rawValue = Ext.getCmp("lovcombo_1").getRawValue();
	if (!(rawValue != "" && val == ""))
	{
		Ext.getCmp("hidden_appIds").setValue(
				Ext.getCmp("lovcombo_1").getValue());
	}
	var url = getHandlerRequestUrl()
			+ "userInfoManagerHandler/editUserInfo?fileInfo=" + fileInfo;
	submitForm(form, url, "修改用户信息异常", function()
	{
		Ext.Msg.alert('提示', "修改用户信息成功", function()
		{

			Ext.getCmp("editUserWin").close();
			Ext.getCmp("gridUserId").store.reload();
		});

	});
}
function deleteUserInfo()
{
	var grid = Ext.getCmp("gridUserId");
	var list = getGridList(grid, "userId");
	if (list.length == 0)
	{
		Ext.Msg.alert('提示', "请选择要删除的数据");
		return false;
	}
	var userIds = list.join(",");
	var url = getHandlerRequestUrl()
			+ "userInfoManagerHandler/deleteUserInfoById?userIds=" + userIds;
	deleteData(url, "删除用户信息异常", function()
	{
		Ext.getCmp("gridUserId").store.reload();
	});
}
function searchUserInfo()
{
	var name = Ext.getCmp("search_name").getValue();
	var loginName = Ext.getCmp("search_loginName").getValue();
	var orgId = Ext.getCmp("searchOrgId").getValue();
	var url = getHandlerRequestUrl()
			+ "userInfoManagerHandler/searchForUser?name=" + name
			+ "&loginName=" + loginName + "&" + orgId;
	var grid = Ext.getCmp("gridUserId");

	grid.store.reload(
	{
		params :
		{
			start : 0,
			limit : pageSize,
			name : name,
			loginName : loginName,
			isSearch : 'Y',
			orgId : orgId
		}
	});
	grid.store.baseParams =
	{
		start : 0,
		limit : pageSize,
		name : name,
		loginName : loginName,
		isSearch : 'Y',
		orgId : orgId
	};

}
/**
 * 创建岗位角色列表窗口
 */
function showPostListWin()
{
	var grid = Ext.getCmp("gridUserId");
	var list = getGridList(grid, "userId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "每次只能对一条数据进行操作");
		return false;
	}
	var userId = list[0];
	var postListWin = new Ext.Window(
	{
		layout : 'fit',
		id : 'postListWin',
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
		userId : userId,
		items : [ createUserPostGrid(userId) ]
	});
	postListWin.show();
}
function createUserPostGrid(userId)
{

	var fields = [
	{
		name : "id"
	},
	{
		name : "postName",
		mapping : "post.postName"
	},
	{
		name : "name",
		mapping : function(data)
		{
			return jsonConvert(data, "user", "name");
		}
	},
	{
		name : "loginName",
		mapping : function(data)
		{
			return jsonConvert(data, "user", "loginName");
		}
	},
	{
		name : "appName",
		mapping : function(data)
		{
			if (data.post.app && data.post.app.appName)
			{
				return data.post.app.appName;
			}
			return "";
		}
	},
	{
		name : "status"
	},
	{
		name : "createDate"
	},
	{
		name : "postId",
		mapping : "post.postId"
	} ];
	var sm = new Ext.grid.CheckboxSelectionModel();
	var columnLabel = new Ext.grid.ColumnModel([ sm,
			new Ext.grid.RowNumberer(),
			{
				header : "岗位名称",
				dataIndex : 'postName',
				width : 80,
				sortable : true
			},
			{
				header : "所属应用",
				dataIndex : 'appName',
				width : 80,
				sortable : true
			},
			{
				header : "用户名称",
				dataIndex : 'name',
				width : 50,
				sortable : true
			},
			{
				header : "登录名",
				width : 50,
				dataIndex : 'loginName'
			},
			{
				header : "添加时间",
				dataIndex : 'createDate',
				width : 100,
				renderer : formatDate,
				sortable : true
			},
			{
				header : "状态",
				dataIndex : 'status',
				width : 40,
				renderer : function(value)
				{
					if (value != "")
					{
						if ("Y" == value)
						{
							return "<font color='green'>启用</font>";
						}
						return "<font color='red'>停用</font>";
					}
					return "-";
				}
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
				dataIndex : 'postId',
				hidden : true
			},
			{
				dataIndex : 'id',
				hidden : true
			} ]);
	var gridStore = new Ext.data.JsonStore(
	{
		autoLoad :
		{
			params :
			{
				start : 0,
				limit : 100000
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
		url : getHandlerRequestUrl()
				+ "userPostInfoHandler/getPostInfoByUserId?userId=" + userId,
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		id : "user_post_add_grid",
		tbar : createToolbarU_(),
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
function createToolbarU_()
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
			var userId = new Ext.getCmp("postListWin").userId;
			var grid = Ext.getCmp("user_post_add_grid");
			var list = getGridList(grid, "postId");
			if (list.length == 0)
			{
				Ext.Msg.alert('错误提示', "至少选择一条角色数据");
				return false;
			}
			var url = getHandlerRequestUrl()
					+ "userPostInfoHandler/addUserToPostInfo?userId=" + userId
					+ "&postIds=" + list.join(",");
			search_(url, "添加岗位到用户异常", function()
			{
				grid.store.reload(
				{
					params :
					{
						start : 0,
						limit : 10000
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
			var grid = Ext.getCmp("user_post_add_grid");
			var list = getGridList(grid, "id");
			if (list.length == 0)
			{
				Ext.Msg.alert('错误提示', "至少选择一条角色数据");
				return false;
			}
			var url = getHandlerRequestUrl()
					+ "userPostInfoHandler/remvoePostInfoByUser?ids="
					+ list.join(",");
			deleteData(url, "是否移除该岗位下的角色信息", function()
			{
				var grid = Ext.getCmp("user_post_add_grid");
				grid.store.reload(
				{
					params :
					{
						queryFlag : "ADD",
						start : 0,
						limit : 10000
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
			toolbar.getComponent(6).setValue("");
			var grid = Ext.getCmp("user_post_add_grid");
			grid.store.reload(
			{
				params :
				{
					queryFlag : "ADD",
					start : 0,
					limit : 10000,
					postName:""
				}
			});
			grid.store.baseParams=
			{
					queryFlag : "ADD",
					start : 0,
					limit : 10000,
					postName:""
			};
			toolbar.getComponent(1).enable();
			toolbar.getComponent(0).disable();
			toolbar.getComponent(3).enable();
			toolbar.getComponent(5).disable();
			grid = Ext.getCmp("gridUserId");
			var l = getGridList(grid, "name");
			Ext.getCmp("postListWin").setTitle("已添加到该用户[" + l[0] + "]的岗位列表信息");
		}
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "未添加",
		iconCls : 'icon_delete',
		disabled : true,
		handler : function(btn)
		{
			var grid = Ext.getCmp("user_post_add_grid");
			toolbar.getComponent(6).setValue("");
			grid.store.reload(
			{
				params :
				{
					start : 0,
					limit : 10000,
					queryFlag : "",
					postName:""
				}
			});
			grid.store.baseParams=
			{
					queryFlag : "",
					start : 0,
					limit : 10000,
					postName:""
			};
			toolbar.getComponent(2).enable();
			toolbar.getComponent(0).enable();
			toolbar.getComponent(1).disable();
			toolbar.getComponent(5).enable();
			Ext.getCmp("postListWin").setTitle("未添加到该用户的岗位列表");
		}
	}));
	toolbar.addFill();
	toolbar.addText("岗位名称:");
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
			var grid = Ext.getCmp("user_post_add_grid");
			grid.store.reload(
			{
				params :
				{
					start : 0,
					limit : 10000,
					postName : toolbar.getComponent(6).getValue()
				}
			});
			grid.store.baseParams=
			{
					postName :  toolbar.getComponent(6).getValue()
			};
		}
	}));
	return toolbar;
}
function createCheckBoxApp()
{
	var formStore = new Ext.data.Store(
	{
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + 'appInfoHandler/getAppInfoList'
		}),
		reader : new Ext.data.JsonReader(
		{}, [ 'appId', 'appName' ])
	});

	var lc = new Ext.ux.form.LovCombo(
	{
		id : 'lovcombo_1',
		width : 240,
		hideOnSelect : false,
		maxHeight : 200,
		fieldLabel : '所属应用',
		store : formStore,
		triggerAction : 'all',
		valueField : 'appId',
		displayField : 'appName',
		mode : 'local'
	});
	lc.getStore().load();
	return lc;
}
function resetPassword()
{

	var grid = Ext.getCmp("gridUserId");
	var recs = grid.getSelectionModel().getSelections();
	if (recs.length != 1)
	{
		Ext.Msg.alert('提示', "每次只能对一条数据进行操作");
		return false;
	}
	var url = getHandlerRequestUrl()
			+ "userInfoManagerHandler/resetPassword?userId="
			+ recs[0].get("userId");
	Ext.MessageBox.confirm("提示", "您确定要重置选中用户的密码吗(新密码：123456)？", function(btnId)
	{

		if (btnId == 'yes')
		{
			Ext.Ajax.request(
			{
				url : url,
				method : 'POST',
				success : function(response, options)
				{
					var result = Ext.util.JSON.decode(response.responseText);
					if (result.success)
					{
						Ext.Msg.alert('提示', "密码已经重置成功");
					} else
					{
						Ext.Msg.alert('提示', "异常码：" + result.msg);
					}
				},
				failure : function(response, options)
				{
					var result = Ext.util.JSON.decode(response.responseText);
					Ext.Msg.alert('提示', message + "异常码：" + result.data);
				}
			});
		}

	});
}
// 创建图片组件
function createImagPanel()
{
	var panel = new Ext.Panel(
	{
		layout : "column",
		fieldLabel : '照片',
		items : [
		{
			xtype : 'box', // 或者xtype: 'component',
			width : 100, // 图片宽度
			height : 100, // 图片高度
			id : 'photoUrl',
			columnWidth : .4,

			autoEl :
			{
				tag : 'img', // 指定为img标签
				src : '#' // 指定url路径
			}
		},
		{
			xtype : 'fileuploadfield',
			columnWidth : .6,
			buttonText : '选择图片',
			emptyText : '选择图片',
			id : 'fileUploadItem',
			name : 'fileAddress'
		} ]
	});
	return panel;
}
function getUploadXml(name, matterPaperId)
{
	var xml = "<fileInfo><type>3</type><name>"
			+ name
			+ "</name><matterPaperId>"
			+ matterPaperId
			+ "</matterPaperId><appId>ums</appId><disableDate></disableDate><userType></userType><userCardId></userCardId><userCardType></userCardType><fileType></fileType><represent></represent><workflowId></workflowId></fileInfo>";
	return xml;
}
function showImportWin()
{
	var win = new Ext.Window(
	{
		layout : 'fit',
		width : 440,
		autoHeight : true,
		title : '导入用户信息',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		buttons : [
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						win.close();
					}
				},
				{
					text : '保存',
					iconCls : 'icon_save',
					handler : function()
					{
						var url = getHandlerRequestUrl()
								+ "importUserInfoHandler/importUserInfo";
						var form = Ext.getCmp("importUserInfoForm");
						submitForm(form, url, "导入用户信息失败", function(data)
						{
							Ext.Msg.alert('提示', "成功:" + data.count + "(个) 失败："
									+ data.loseCount + "(个)");
							Ext.getCmp("gridUserId").store.reload();
							win.close();
						});
					}
				},
				{
					text : '重置',
					iconCls : 'icon_reset',
					handler : function()
					{
						Ext.getCmp('importUserInfoForm').form.reset();
					}
				} ],
		items : [ new Ext.form.FormPanel(
		{

			labelSeparator : "：",
			frame : true,
			width : '100%',
			id : 'importUserInfoForm',
			border : false,
			fileUpload : true,
			autoHeight : true,
			buttonAlign : 'center',
			bodyStyle : 'padding:5px 5px 5px 5px',
			items : [
			{
				xtype : 'fileuploadfield',
				buttonText : '选择',
				emptyText : '选择EXCEL文件',
				name : 'userExcel',
				width : 280,
				fieldLabel : '选择EXCEL文件'
			} ]
		}) ]
	});
	win.show();
}