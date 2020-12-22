function showDetailWin()
{
	var win = new Ext.Window(
	{
		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		width : 400,
		height : 420,
		shadow : true,
		title : '申请信息详情',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				win.close();
			}
		} ],
		items : [ createDetailForm() ]
	});
	win.show();
}

function createDetailForm()
{
	var FORM_WIDTH = 200;
	var form = new Ext.FormPanel(
	{
		labelAlign : 'right',
		labelSeparator : "：",
		frame : true,
		border : false,
		buttonAlign : 'center',
		reader : new Ext.data.JsonReader(
		{
			successProperty : 'success',
		}, [
		{
			name : 'proposerName'
		},
		{
			name : 'proposerOrgName'
		},{
			name : 'assetName'
		},{
			name : 'assetProvider'
		},{
			name : 'applyTime',
			mapping : function(data)
			{
				if (data.applyTime)
				{
					return formatDate(data.applyTime, "");
				}
				return "-";
			}
		},{
			name : 'stepName'
		},{
			name : 'dealTime'
		},{
			name : 'decision'
		},{
			name : 'comment'
		} ]),
		items : [
		    {
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'proposerName',
					fieldLabel : '申请人'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'proposerOrgName',
					fieldLabel : '申请人部门'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'assetName',
					fieldLabel : '资产名称'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'assetProvider',
					fieldLabel : '资产所有方'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'applyTime',
					fieldLabel : '申请日期'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'stepName',
					fieldLabel : '当前状态'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'dealTime',
					fieldLabel : '审批时间'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textfield',
					width : FORM_WIDTH,
					name : 'decision',
					fieldLabel : '审批结果'
				} ]
			},
			{
				columnWidth : .5,
				layout : 'form',
				labelWidth : 80,
				items : [
				{
					xtype : 'textarea',
					width : FORM_WIDTH,
					name : 'comment',
					fieldLabel : '审批意见'
				} ]
			}
		]

	});
	var grid = Ext.getCmp("myApplicationGrid");
	var record = grid.getSelectionModel().getSelected();
	var approvalId = record.get("approvalId");
	var url = getHandlerRequestUrl()
			+ "approvalHandler/loadDetail?approvalId="
			+ approvalId
	// loadForm(form, url, "获取资源目录详情异常");
	form.getForm().load(
	{
		url : url,
		method : 'POST'
	});
	return form;
}
