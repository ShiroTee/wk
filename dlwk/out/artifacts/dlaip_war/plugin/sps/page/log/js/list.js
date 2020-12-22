Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);

function init()
{
	var grid = createGrid();
	setTip("服务日志访问记录");
	setPaging(grid);
	setMainPanel(document.body, grid);
}
function createGrid()
{
	var columns = [ new Ext.grid.RowNumberer(),
	{
		dataIndex : 'logId',
		hidden : true
	},
	{
		dataIndex : 'name',
		header : "姓名",
		renderer:function(value)
		{
			if(value=="")
			{
				return "<font color='green'>匿名</font>";
			}
			return "<font color='red'>"+value+"</font>";
		},
		width : 50
	},
	{
		dataIndex : 'routeName',
		header : "服务名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'showURL',
		header : "URL",
		width : 200
	},
	{
		dataIndex : 'routeType',
		header : "服务类别",
		sortable : true,
		width : 40
	},
	{
		dataIndex : 'accessDate',
		header : "调用时间",
		sortable : true,
		renderer : formatDate,
		width : 70
	},
	{
		dataIndex : 'exception',
		header : "是否异常",
		sortable : true,
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='green'>否</font>";
			}
			return "<font color='red'>是</font>";
		},
		width : 30
	},
	{
		dataIndex : 'logId',
		header : "操作",
		renderer : function(value)
		{
			var msg="\""+value+"\"";
			return  "<a href='#' onclick='showLogDetails("+msg+")'>详情</a>";
		},
		width : 30
	} ];
	var gridStore = new Ext.data.Store(
	{
		autoLoad :
		{
			params :
			{
				start :0,
				limit :50
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
			name : 'logId'
		},
		{
			name : 'accessDate'
		},
		{
			name : 'exception'
		},
		{
			name : 'publishURL'
		},
		{
			name : 'routeName',
			mapping : function(data)
			{
				return jsonConvert(data, "route", "routeName");
			}
		},
		{
			name : 'routeType',
			mapping : function(data)
			{
				return jsonConvert(data, "route", "routeType");
			}
		} ,{
			name : 'showURL',
			mapping : function(data)
			{
				return jsonConvert(data, "route", "showURL");
			}
		},{
			name : 'name',
			mapping : function(data)
			{
				return jsonConvert(data, "user", "name");
			}
		}  ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "routeLogInfoHandler/getRouteLogList"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		id:'webServiceGrid',
		store : gridStore,
		border : false, // 是否显示行的边框
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
function createToolbar()
{
	var toolbar = new Ext.Toolbar();
	toolbar.addText("是否异常：");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'key', 'value' ],
			data : [ [ '全部', '' ], [ '是', '1' ], [ '否', '0' ] ]
		}),
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					search();
				}
			}
		},
		triggerAction : 'all',
		displayField : 'key',
		valueField : 'value',
		value : "",
		width : 60,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addText("&nbsp;")
	toolbar.addText("服务类别：");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'key', 'value' ],
			data : [ [ '全部', '' ], [ 'HTTP服务', 'http' ], [ 'SOAP服务', 'soap' ],
					[ 'FTP服务', 'ftp' ] ]
		}),
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					search();
				}
			}
		},
		triggerAction : 'all',
		displayField : 'key',
		valueField : 'value',
		value : "",
		width : 120,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addText("&nbsp;服务名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'logsRequestURLText',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					search();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:'包含服务名称的字符',
		width : 200
	}));
	toolbar.addText("&nbsp;开始时间");
	toolbar.addItem(
	{
		xtype : 'datefield',
		name : 'startDate',
		width : 100,
		altFormats : 'Y-m-d',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					search();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		format : 'Y-m-d',
		editable : false
	});

	toolbar.addText("&nbsp;结束时间");
	toolbar.addItem(
	{
		xtype : 'datefield',
		name : 'endDate',
		width : 100,
		altFormats : 'Y-m-d',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					search();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		format : 'Y-m-d',
		editable : false
	});
	toolbar.addButton(new Ext.Button(
			{
				text : "搜索",
				iconCls : 'icon_query',
				handler:search
			}));
	return toolbar;
}