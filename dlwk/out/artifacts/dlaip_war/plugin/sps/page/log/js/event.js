function showLogDetails(logId)
{
	new Ext.Window(
	{
		layout : 'fit',
		width : 450,
		height :360,
		title : '日志详情',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		items : [ createRouteLogForm(logId)]

	}).show();
}
// 调用记录搜索
function search()
{
	var grid = Ext.getCmp("webServiceGrid");
	var toolbar = grid.getTopToolbar();
	grid.store.reload(
	{
		params :
		{
			exception : toolbar.get(1).getValue(),
			routeType : toolbar.get(4).getValue(),
			routeName : toolbar.get(6).getValue(),
			startDate : Ext.util.Format.date(toolbar.get(8).getValue(), 'Y-m-d'),
			endDate :Ext.util.Format.date(toolbar.get(10).getValue(), 'Y-m-d'),
			start : 0,
			limit : pageSize
		}
	});

	grid.store.baseParams =
	{
		start : 0,
		limit : pageSize,
		exception : toolbar.get(1).getValue(),
		routeType : toolbar.get(4).getValue(),
		routeName : toolbar.get(6).getValue(),
		startDate : Ext.util.Format.date(toolbar.get(8).getValue(), 'Y-m-d'),
		endDate : Ext.util.Format.date(toolbar.get(10).getValue(), 'Y-m-d')
	};
}
function createRouteLogForm(logId)
{
	var form= new Ext.FormPanel(
	{
		labelSeparator : "：",
		frame : true,
		border : false,
		autoHeight : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5px 5px 5px 30px',
		reader : new Ext.data.JsonReader(
		{
			successProperty : 'success',
		}, [
		{
			name : 'routeName',
			mapping:function(data)
			{
				return data.route.routeName;
			}
		},
		{
			name : 'accessDate',
			mapping : function(data)
			{
				return formatDate(data.accessDate, "");
			}
		},
		{
			name : 'user',
			mapping : function(data)
			{
				str= jsonConvert(data, "user", "name");
				if(""==str)
				{
					return "匿名";
				}
				return str;
			}
		},
		{
			name : 'orgName',
			mapping : function(data)
			{
				if(data.user)
				{
					return data.user.orgInfo.orgName;
				}
				return "-";
			}
		},
		{
			name : 'input'
		},
		{
			name : 'output'
		}]),
		items : [
		{
			xtype : 'textfield',
			name : 'routeName',
			width : 274,
			fieldLabel : '服务名称'
		},
		{
			xtype : 'textfield',
			name : 'accessDate',
			width : 274,
			fieldLabel : '调用日期'
		},
		{
			xtype : 'textfield',
			name : 'user',
			width : 274,
			fieldLabel : '调用用户'
		},
		{
			xtype : 'textfield',
			name : 'orgName',
			width : 274,
			fieldLabel : '调用机构'
		},
		{
			xtype : 'textarea',
			name : 'input',
			anchor : '98% 20%',
			fieldLabel : '输入参数'
		},
		{
			xtype : 'textarea',
			name : 'output',
			anchor : '98% 40%',
			fieldLabel : '输出参数'
		} ]
	});
	var url= getHandlerRequestUrl()+"routeLogInfoHandler/getRouteLogDetail?logId="+logId
	form.getForm().load(
			{
				url : url,
				method : 'POST'
			});
	return form;
}
