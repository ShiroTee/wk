function showRoleInfoWin(flag) {
	var roleInfoWin = new Ext.Window({
		layout : 'fit',
		id : 'roleInfoWin',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height : 200,
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
			handler : function() {
				Ext.getCmp("roleInfoWin").close();
			}
		}, {
			text : flag == "ADD" ? "保存" : "修改",
			iconCls : 'icon_save',
			handler : flag == "ADD" ? saveRoleInfo : function() {

				if (Ext.getCmp("roleInfoForm").getForm().isValid()) {
					updateRoleInfo(flag);
				} else {
					Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
				}
			}
		}, {
			text : '重置',
			iconCls : 'icon_reset',
			id : 'role_reset',
			handler : function() {
				Ext.getCmp("roleInfoForm").form.reset();
			}
		} ]
	});

	roleInfoWin.show();
	if (flag != "ADD") {
		var url = getHandlerRequestUrl()
				+ "roleInfoHandler/getRoleInfo?roleId=" + flag;
		var form = Ext.getCmp("roleInfoForm");
		form.form.reset();
		form.form
				.load({
					waitMsg : '正在加载数据请稍后',
					waitTitle : '提示',
					url : url,
					method : 'POST',
					success : function(form, action) {
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.getCmp("roleAppCombox").setValue(
								result.data.app.appId);
					},
					failure : function(form, action) {
						var result = Ext.util.JSON
								.decode(action.response.responseText);
						Ext.Msg.alert('提示', message + result.msg);
					}
				});
	}
}
function createRoleInfoForm() {
	var roleInfoForm = new Ext.FormPanel({
		labelSeparator : "：",
		frame : false,
		id : "roleInfoForm",
		border : false,
		bodyStyle : 'padding:15px 0px 20px 0px',
		labelAlign : 'right',
		buttonAlign : 'center',
		items : [ {
			xtype : 'textfield',
			name : "roleId",
			hidden : true
		}, {
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
			fieldLabel : '<span style="color:red;">*</span>角色名称'
		}, createAppCombox(240, "<span style='color:red;'>*</span>所属应用", "roleAppCombox"), createStatusItem() ]
	});
	return roleInfoForm;
}
function saveRoleInfo() {
	var form = Ext.getCmp("roleInfoForm");
	if (form.getForm().isValid()) {
		var url = getHandlerRequestUrl() + "roleInfoHandler/saveRoleInfo";
		submitForm(form, url, "保存角色信息异常", function() {
			Ext.Msg.alert('提示', "保存角色信息成功", function() {
				role_callback();
			});
		});
	} else {
		Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
	}

}
function role_callback() {
	var grid = Ext.getCmp("roleGrid");
	grid.store.reload();
	Ext.getCmp("roleInfoWin").close();
}
function updateRoleInfo(roleId) {
	var url = getHandlerRequestUrl() + "roleInfoHandler/eidtRoleInfo?roleId="
			+ roleId;
	var form = Ext.getCmp("roleInfoForm");
	submitForm(form, url, "修改角色信息异常", function() {
		Ext.Msg.alert('提示', "修改角色信息成功", function() {
			role_callback();
		});
	});
}
function deleteRoleInfo() {
	var grid = Ext.getCmp("roleGrid");
	var list = getGridList(grid, "roleId");
	if (list.length < 1) {
		Ext.Msg.alert('提示', "至少选择一条数据进行操作");
		return false;
	}
	var url = getHandlerRequestUrl()
			+ "roleInfoHandler/deleteRoleInfo?roleIds=" + list.join(",");
	deleteData(url, "", function() {
		grid.store.reload();
	});
}