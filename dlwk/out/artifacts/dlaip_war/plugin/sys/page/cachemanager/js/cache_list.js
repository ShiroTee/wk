
Ext.BLANK_IMAGE_URL = getContextPath()+'/resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	var toolbar = new Ext.Toolbar( {
		height : 30,
		id : Math.random() + ""
	});
	// 按钮数
	toolbar.addButton(new Ext.Button( {
		text : "清理缓存",
		iconCls : 'icon_delete',
		handler:function()
		{
			var grid=Ext.getCmp("cacheGrid");
			var list=getGridList(grid,"key");
			
			if(list==null||list.length==0)
			{
				Ext.Msg.alert('提示',"至少选择一条数据进行操作!");
				return false;
			}
			var keys=list.join(":");
			Ext.MessageBox.confirm("提示", "您确定要清理选中的缓存吗?", function(btnId)
					{

						if (btnId == 'yes')
						{
							var msgTip = Ext.MessageBox.show(
							{
								title : '提示',
								width : 250,
								msg : '正在清理缓存...'
							});
							Ext.Ajax.request(
							{
								url:getHandlerRequestUrl()+"cacheManagerHandler/clearCache?keys="+keys,
								method : 'POST',
								success : function(response, options)
								{
									msgTip.hide();
									var result = Ext.util.JSON.decode(response.responseText);
									if (result.success)
									{
										Ext.Msg.alert('提示', "清理成功",function(){
											Ext.getCmp("cacheGrid").getStore().reload();
										});
									} else
									{
										Ext.Msg.alert('提示', "缓存清理异常,异常码：" + result.msg);
									}
								},
								failure : function(response, options)
								{
									var result = Ext.util.JSON.decode(response.responseText);
									msgTip.hide();
									Ext.Msg.alert('提示',"缓存清理异常,异常码：" + result.data);
								}
							});
						}

					});
		}
	}));
	
	// 选择模型 
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
	});
	gridStore = new Ext.data.Store( {
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options,
					response, arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		reader : new Ext.data.JsonReader( {
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create( [ {
			name : 'key'
		}, {
			name : 'className'
		},{
			name : 'methodName'
		},{
			name : 'cateDate'
		},{
			name : 'expirationTime'
		},{
			name : 'lastUpdatdDate'
		},{
			name : 'lastAccessDate'
		},{
			name : 'count'
		} ])),

		proxy : new Ext.data.HttpProxy( {
			url : getHandlerRequestUrl()+"cacheManagerHandler/getCathcList"
		})
	});
    grid = new Ext.grid.GridPanel(
	{
		id : 'cacheGrid',
		//columnWidth : .8,
		autoScroll : true,
		tbar : toolbar,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		region : 'center',
		store : gridStore,
		sm : sm,
		border : false, // 是否显示行的边框
		columns : [sm, new Ext.grid.RowNumberer(),
		{
			header : "KEY",
			dataIndex : 'key',
			
			hidden : true,
			sortable : true
		},
		{
			header : "类名",
			dataIndex : 'className',
			renderer : formatQtip,
			sortable : true
		},
		{
			header : "方法名",
			dataIndex : 'methodName',
			sortable : true
		},
		{
			header : "创建时间",
			dataIndex : 'cateDate',
			sortable : true
		},
		{
			header : "最后更新时间",
			dataIndex : 'lastUpdatdDate',
			sortable : true
		},
		{
			header : "最新访问时间",
			dataIndex : 'lastAccessDate',
			sortable : true
		},
		{
			header : "失效时间",
			dataIndex : 'expirationTime',
			sortable : true
		},
		{
			header : "缓存数量",
			dataIndex : 'count',
			sortable : true
		} ],
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		bbar : [],
		viewConfig :
		{
			forceFit : true
		}
	});
		var cacheManagerPanel = new Ext.Panel({
		id : 'mainCard',
		layout : 'card',
		activeItem : 0,
		autoWidth : true,
		titleCollapse : true,
		autoHeight : true,
		items : [grid]
	});
	setTip("查看当前系统缓存信息,并可对缓存进行清理操作!");
	setPaging(grid);
	setMainPanel("cacheManagerPanel_div", cacheManagerPanel);
}
function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
{
	var title = "";
	var tip = value;
	metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
	return value;
}

	