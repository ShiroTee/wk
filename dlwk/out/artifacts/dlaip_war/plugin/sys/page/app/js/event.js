function createAppWin()
{
	 new Ext.Window(
	{

		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		id : 'appWin',
		width : 500,
		height :400,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '新增应用',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items : [ createAppForm() ],
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("appWin").close();
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler : function()
			{
				var form = Ext.getCmp("appForm_");
				var appIds=Ext.getCmp("echeckBoxApp").getValue();
				var url = getHandlerRequestUrl() + "appInfoHandler/saveAppInfo?appIds="+appIds;
				submitForm(form, url, "创建应用失败", function()
				{
					Ext.Msg.alert('提示', "应用创建成功",function(){
						Ext.getCmp("appGrid").store.reload();
						Ext.getCmp("appWin").close();
					});
				});
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function()
			{
				Ext.getCmp("appForm_").form.reset();
			}
		} ]
	});
	Ext.getCmp("appWin").show();
}
function createAppForm()
{
	var width = 280;
	var appForm = new Ext.form.FormPanel(
	{
		labelSeparator : "：",
		frame : true,
		border : false,
		id : 'appForm_',
		bodyStyle : 'padding:15px 0px 0px 20px',
		fileUpload : true,
		labelAlign : 'right',
		items : [
		{
			xtype : 'textfield',
			name : 'id',
			hidden : true
		},
		{
			xtype : 'textfield',
			name : "name",
			width : width,
			allowBlank : false,
			fieldLabel : '应用名称'
		},
		{
			xtype : 'textfield',
			width : width,
			name : "appCode",
			fieldLabel : '应用代码'
		}, createAppTypeItems(),
		{
			xtype : 'radiogroup',
			fieldLabel : '是否是审批系统',
			width : 280,
			columns : [ 140, 140 ],
			vertical : true,
			items : [
			{
				boxLabel : '是',
				name : 'isApproveApp',
				inputValue : 'Y',
				checked :false
			},
			{
				boxLabel : '否',
				name : 'isApproveApp',
				inputValue : 'N',
				checked:true
			}

			]
		},
		{
			xtype : 'fileuploadfield',
			allowBlank : false,
			emptyText : '选择安装文件',
			fieldLabel : '选择文件',
			id : 'fileUploadItem',
			width : width,
			name : 'fileName'
		},{
			xtype : 'textfield',
			allowBlank : false,
			emptyText : '请输入可访问的URL',
			fieldLabel : 'URL',
			vtype:'url',
			id : 'inputURL',
			width : width,
			disabled:true,
			name : 'linkUrl'
		}, createUserCombox(width,null,"createAppTag"), createcheckBoxApp(),
		
		{
			xtype : 'textfield',
			width : width,
			name : "appProvider",
			fieldLabel : '应用提供商'
		},
		{
			xtype : 'textfield',
			width : width,
			name : "appVersion",
			fieldLabel : '版本号'
		}, createStatusItem() ]
	});
	return appForm;
}

function createAppTypeItems()
{

	var item =
	{
		xtype : 'radiogroup',
		fieldLabel : '应用类型',
		width : 280,
		columns : [ 140, 140 ],
		vertical : true,
		listeners :
		{
			'change' : function()
			{
				var obj = this.items.items;
				for ( var i in obj)
				{
					if (obj[i].checked && obj[i].inputValue == 1)
					{
						Ext.getCmp("fileUploadItem").disable();
						Ext.getCmp("inputURL").enable();
						break;
					}
					if (obj[i].checked && obj[i].inputValue == 0)
					{
						Ext.getCmp("fileUploadItem").enable();
						Ext.getCmp("inputURL").disable();
						break;
					}

				}
			}
		},

		items : [
		{
			boxLabel : '本地应用',
			name : 'appType',
			inputValue : '0',
			checked : true
		},
		{
			boxLabel : '第三方应用',
			name : 'appType',
			inputValue : '1'
		}

		]
	};
	return item;
}
function createcheckBoxApp()
{
	return new Ext.ux.form.LovCombo(
	{
		width : 280,
		id:"echeckBoxApp",
		hideOnSelect : false,
		maxHeight : 200,
		fieldLabel : '继承应用',
		store : new Ext.data.JsonStore({ // 填充的数据
			url : getHandlerRequestUrl() + 'appInfoHandler/getAppInfoList',
			autoLoad : true,
			fields : new Ext.data.Record.create([ 'appId', 'appName' ])
		}),
		triggerAction : 'all',
		valueField : 'appId',
		displayField : 'appName',
		mode : 'local'
	});
}