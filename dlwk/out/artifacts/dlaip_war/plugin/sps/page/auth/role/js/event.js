function showRoleInfoWin(flag)
{
	var roleInfoWin = new Ext.Window(
	{
		layout : 'fit',
		id : 'assetRoleInfoWin',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height : 220,
		shadow : true,
		title : flag == "ADD" ? '添加角色信息' : '编辑角色信息',
		modal : true,
		closable : true,
		bodyStyle : 'padding:5 5 5 5',
		buttonAlign : 'center',
		animCollapse : true,
		items : [ createRoleInfoForm() ],
		buttons : [

		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("assetRoleInfoWin").close();
			}
		},
		{
			text : flag == "ADD" ? "保存" : "修改",
			iconCls : 'icon_save',
			handler : flag == "ADD" ? saveRoleInfo : function()
			{

				if (Ext.getCmp("roleInfoForm").getForm().isValid())
				{
					updateRoleInfo(flag);
				} else
				{
					Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
				}
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			id : 'role_reset',
			handler : function()
			{
				Ext.getCmp("roleInfoForm").form.reset();
			}
		} ]
	});

	roleInfoWin.show();
	if (flag != "ADD")
	{
		var url = getHandlerRequestUrl()
				+ "assetRoleHandler/getAssetRoleInfo?roleId=" + flag;
		var form = Ext.getCmp("roleInfoForm");
		form.form.reset();
		form.form
				.load(
				{
					waitMsg : '正在加载数据请稍后',
					waitTitle : '提示',
					url : url,
					method : 'POST',
					success : function(form, action)
					{
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.getCmp("roleAppCombox").setValue(
								result.data.app.appId);
					},
					failure : function(form, action)
					{
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.Msg.alert('提示', message + result.msg);
					}
				});
	}
}
function createRoleInfoForm()
{
	var roleInfoForm = new Ext.FormPanel(
	{
		labelSeparator : "：",
		frame : false,
		id : "roleInfoForm",
		border : false,
		bodyStyle : 'padding:15px 0px 20px 0px',
		labelAlign : 'right',
		buttonAlign : 'center',
		items : [
		{
			xtype : 'textfield',
			name : "roleId",
			hidden : true
		},
		{
			xtype : 'textfield',
			width : 240,
			allowBlank : false,
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 50,// 允许输入的最大字符数
			maxLengthText : "最大长度不能超过50个字符！",// 提示文本
			blankText : '角色名称',
			name : 'roleName',
			height : 40,
			fieldLabel : '角色名称'
		}, createStatusItem(),
		{
			xtype : 'textarea',
			width : '90%',
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 255,// 允许输入的最大字符数
			maxLengthText : "最大长度不能超过255个字符！",// 提示文本
			name : 'remark',
			fieldLabel : '备注'
		} ]
	});
	return roleInfoForm;
}
function saveRoleInfo()
{
	var form = Ext.getCmp("roleInfoForm");
	if (form.getForm().isValid())
	{
		var url = getHandlerRequestUrl() + "assetRoleHandler/saveAssetRoleInfo";
		submitForm(form, url, "保存角色信息异常", function()
		{
			Ext.Msg.alert('提示', "保存角色信息成功", function()
			{
				assetRole_callback();
			});
		});
	} else
	{
		Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
	}

}
function assetRole_callback()
{
	var grid = Ext.getCmp("assetRoleGrid");
	grid.store.reload();
	Ext.getCmp("assetRoleInfoWin").close();
}
function updateRoleInfo(roleId)
{
	var url = getHandlerRequestUrl() + "assetRoleHandler/eidtAssetRoleInfo?roleId="
			+ roleId;
	var form = Ext.getCmp("roleInfoForm");
	submitForm(form, url, "修改角色信息异常", function()
	{
		Ext.Msg.alert('提示', "修改角色信息成功", function()
		{
			assetRole_callback();
		});
	});
}
function deleteRoleInfo()
{
	var grid = Ext.getCmp("assetRoleGrid")
	var record = grid.getSelectionModel().getSelected();
	var url = getHandlerRequestUrl()
			+ "assetRoleHandler/deleteAssetRoleInfo?roleId="+record.get("roleId");
	deleteData(url, "删除角色失败", function()
	{
		grid.store.reload();
	});
}
function searchRole()
{
	var grid = Ext.getCmp("assetRoleGrid");
	var toolbar = grid.getTopToolbar();
	grid.store.reload(
	{
		params :
		{
			roleName : toolbar.get(7).getValue(),
			start : 0,
			limit : 20
		}
	});

	grid.store.baseParams =
	{
		roleName : toolbar.get(7).getValue(),
		start : 0,
		limit : 20
	};
}