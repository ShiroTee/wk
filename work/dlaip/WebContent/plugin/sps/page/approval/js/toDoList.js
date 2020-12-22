Ext.BLANK_IMAGE_URL = getContextPath()+ 'resource/ext/resources/images/default/s.gif';
var gridA
Ext.onReady(init);

function init()
{
	var xx = true;
	gridA = createGrid();
	setTip("待处理");
	setPaging(gridA);
	setMainPanel(document.body, gridA);
}
function createGrid()
{
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true,
		listeners :
		{
			rowselect : function()
			{
				var grid=Ext.getCmp("toDoGrid");
				var record=this.getSelected();
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).enable();
				toolbar.getComponent(1).enable();
				if(record.get("isAuth")==1)
				{
					toolbar.getComponent(1).enable();
					
				}
			},
			rowdeselect : function()
			{
				var grid=Ext.getCmp("toDoGrid");
				var toolbar = grid.getTopToolbar();
				toolbar.getComponent(0).disable();
				toolbar.getComponent(1).disable();
			}
		}
	});
	var columns = [ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'id',
		hidden : true
	},
	{
	  dataIndex : 'taskId',
	  hidden : true
	},
	{
		dataIndex : 'assetName',
		header : "资产名称",
		sortable : true,
		width : 120
	},
	{
		dataIndex : 'assetProviderName',
		header : "所有者",
		sortable : true,
		width : 100
	},
	{
		dataIndex : 'proposerName',
		header : "申请人",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'applyTime',
		header : "申请时间",
		sortable : true,
		renderer : function(value)
		{
		return formatDate(value, "");
		},
		width : 80
	},
	{
		dataIndex : 'status',
		header : "状态",
		sortable : true,
		width : 120
	}];
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
			name : 'id'
		},
		{
		  name : 'taskId'
		},
		{
			name : 'assetName'
		},
		{
			name : 'assetProviderName'
		},
		{
			name : 'proposerName'
		},
		{
			name : 'applyTime'
		},
		{
			name : 'status'
		}])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + "approvalHandler/getTodoList"
//		  url : '/service/api/sps/approvalHandler/getTodoList'
		})
	});
	return  new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		id : 'serviceGrid',
		monitorResize : true,
		store : gridStore,
		id:'toDoGrid',
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
	toolbar.addButton(new Ext.Button(
	{
		text : "详细信息",
		disabled : true,
		iconCls : 'icon_sms',
		handler:showDetailWin
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "处理",
		disabled : true,
		iconCls : 'icon_edit',
		handler:showDealWin
	}));
	return toolbar;
}