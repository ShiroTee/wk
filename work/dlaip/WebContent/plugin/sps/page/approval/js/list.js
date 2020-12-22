Ext.BLANK_IMAGE_URL = getContextPath()+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);

function init()
{
	var xx = true;
	var grid = createGrid();
	setTip("我的申请");
	setPaging(grid);
	setMainPanel(document.body, grid);
}
function createGrid()
{
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true,
		listeners :
		{
			rowselect : function()
			{
				var grid=Ext.getCmp("fileGrid");
				var record=this.getSelected();
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).enable();
				if(record.get("isAuth")==1)
				{
					toolbar.getComponent(1).enable();
				}
			},
			rowdeselect : function()
			{
				var grid=Ext.getCmp("fileGrid");
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).disable();
				toolbar.getComponent(1).disable();
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
	} ];
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
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		id : 'serviceGrid',
		monitorResize : true,
		store : gridStore,
		id:'fileGrid',
		border : false, // 是否显示行的边框
		sm : sm,
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
	toolbar.addButton(new Ext.Button({
		text:'审批',
		iconCls:'icon_edit',
		disabled : true,
		handler:function()
		{
			var grid=Ext.getCmp("myApplicationGrid");
			var record = grid.getSelectionModel().getSelected();
			record.get('approval_id');
			//document.location.href =record.get("showURL")+"?authKey=DFGHJLK&timestamp="+new Date().getTime();
			var url=record.get("showURL")+"?authKey=DFGHJLK&timestamp="+new Date().getTime();
			window.open(url,"_blank")
		}
	}));
	return toolbar;
}