Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
var thisNodeId=userPOrgId;
var cateCombo=new  Ext.form.ComboBox({
	xtype : 'combo',
	mode : 'local',
	listeners:{
		select:function()
		{
			var assetName=Ext.getCmp("assetName_search").getValue();
			var sm_flag=Ext.getCmp("sm_flag_search").getValue();
			Ext.getCmp("rdGrid").getStore().reload({
				params :
				{
					assetName:assetName,
					start : 0,
					orgId : thisNodeId,
					limit : pageSize,
					archCateId:cateCombo.getValue(),
					sm_flag:sm_flag
				}
			});
			Ext.getCmp("rdGrid").getStore().baseParams ={
				assetName:assetName,
				start : 0,
				orgId : thisNodeId,
				limit : pageSize,
				archCateId:cateCombo.getValue(),
				sm_flag:sm_flag
			};
		}
	},
	store : new Ext.data.SimpleStore(
	{
		fields :
		[ 'key', 'value' ],
		data :
		[
		[ '信息视图', 'Arch_busi_uview' ],
		[ '逻辑实体', 'Arch_dm_entity' ],
		[ '物理数据库', 'Arch_dm_phdb' ],
		[ '概念主题', 'Arch_dm_sbj'],[ '全部', ''] ]
	}),
	triggerAction : 'all',
	displayField : 'key',
	valueField : 'value',
	value : "Arch_busi_uview",
	width : 80,
	forceSelection : true,
	resizable : true,
	typeAhead : true,
	handleHeight : 10
});

function init()
{
	setTip("设置资产目录可以审批的人员");
	var userMainPanel = createMainPanel();
	setPagingTwo(Ext.getCmp("rdGrid"));
	setMainPanel(document.body, userMainPanel);
	Ext.getCmp("treeHeight").setHeight(Ext.getCmp("rdGrid").getHeight());
	Ext.EventManager.onWindowResize(function()
	{
	});
}
function createMainPanel()
{
	var panel = new Ext.Panel(
	{
		layout : 'column',
		autoWidth : true,
		defaults :
		{// 设置默认属性
			bodyStyle : 'background-color:#FFFFFF;',// 设置面板体的背景色
			frame : true
		},
		items :
		[ createLeftTreePanel(), createRightGridPanel() ]
	});
	return panel;
}
function createLeftTreePanel()
{
	if(!userPOrgId||!userPOrgName){
		Ext.Msg.alert('提示', "加载机构树菜单失败，请稍后再试");
		return false;
	}
	var root = new Ext.tree.AsyncTreeNode(
			{
				text : userPOrgName,
				id : userPOrgId,
				draggable : false,
				expanded : true,
				loader : new Ext.tree.TreeLoader(
				{
					dataUrl : getContextPath()
							+ "app/http/aip/orgInfoManagerHandler/getOrgInfoTree"
				})
			});
			var tree = new Ext.tree.TreePanel(
			{
				frame : true,
				columnWidth : .2,
				animate : true,
				id : 'treeHeight',
				root : root,
				border : false,
				/*
				 * tbar : [ { xtype : 'combo', mode : 'local', hiddenName : 'routeType',
				 * store : new Ext.data.SimpleStore( { fields : [ 'key', 'value' ], data : [ [
				 * '按组织结构', '0' ], [ '按主题分类', '1' ] ] }), triggerAction : 'all',
				 * displayField : 'key', valueField : 'value', forceSelection : true,
				 * resizable : true, typeAhead : true, value : '0', listeners : { select :
				 * function() { if (this.getValue() == 1) { var treeroot =
				 * tree.getRootNode(); // 得到根节点 treeroot.setText("主题分类");
				 * treeroot.loader = new Ext.tree.TreeLoader( { dataUrl :
				 * getContextPath() + 'app/http/sps/serviceCatalogHandler/getAsyncTree'
				 * }); treeroot.reload(); } else { var treeroot = tree.getRootNode(); //
				 * 得到根节点 treeroot.setText("组织机构"); treeroot.loader = new
				 * Ext.tree.TreeLoader( { dataUrl : getContextPath() +
				 * "app/http/aip/orgInfoManagerHandler/getOrgInfoTree" });
				 * treeroot.reload(); } // treeroot.expand(true); // 展开树
				 *  } }, handleHeight : 10 } ],
				 */
				autoScroll : true,
				listeners :
				{
					click : function(node, e)
					{
						var grid = Ext.getCmp("rdGrid");
						thisNodeId=node.id;
						Ext.apply(grid.store.baseParams,
						{
							start : 0,
							limit : pageSize,
							orgId : node.id,
							isSearch : 'N',
							assetName:Ext.getCmp("assetName_search").getValue(),
							archCateId:cateCombo.getValue()
						});
						grid.store.load(
						{
							params : grid.store.baseParams
						});
					}
				},
				hrefTarget : 'mainContent'
			});
			return tree;
}
function createRightGridPanel()
{

	var sm = new Ext.grid.CheckboxSelectionModel({});
	var columns =
	[ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'resourceId',
		hidden : true
	},
	{
		dataIndex : 'resourceName',
		header : "名称",
		sortable : true,
		width : 200
	},
	{
		dataIndex : 'publicLv',
		header : "共享级别",
		sortable : true,
		renderer : function(value)
		{
			if(value=="")
			{
				return "<font color='red'>-</font>";
			}
			return value;
		},
		width : 120
	},
	{
		dataIndex : 'provider',
		header : "提供方",
		width : 80
	},
	{
		dataIndex : 'status',
		header : "状态",
		renderer : function(value)
		{
			if (value == 0)
			{
				return "<font color='red'>待发布</font>";
			}
			return "<font color='green'>已发布</font>";
		},
		width : 50
	} ];
	var gridStore = new Ext.data.Store(
	{
		autoLoad :
		{
			params :
			{
				start : 0,
				limit : pageSize,
				orgId : thisNodeId,
				archCateId:cateCombo.getValue(),
				sm_flag:'非空间'
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
		}, Ext.data.Record.create(
		[
		{
			name : 'resourceId'
		},
		{
			name : 'resourceName'
		},
		{
			name : 'publicLv',mapping:function(data)
			{
				return jsonConvert(data, "publicLv", "publicLvName");
			}
		},
		{
			name : 'pubDate'
		},
		{
			name : 'status'
		},
		{
			name : 'typNm',
			mapping : function(data)
			{
				return jsonConvert(data, "dictArchCateInfo", "typNm");
			}
		},
		{
			name : 'providerId',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgId");
			}
		},
		{
			name : 'provider',
			mapping : function(data)
			{
				return jsonConvert(data, "provider", "orgName");
			}
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl()
					+ "resourceCatalogueInfoHandler/getPageList"
		})
	});
	gridStore.baseParams={archCateId:cateCombo.getValue()};
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		columnWidth : .8,
		tbar : createToolbar(),
		loadMask : true,
		buttonAlign : 'center',
		id : 'rdGrid',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		bbar :
		[],
		viewConfig :
		{
			forceFit : true
		},
		listeners:{
			afterrender:function(){
				gridStore.baseParams={archCateId:cateCombo.getValue(),
						sm_flag:Ext.getCmp("sm_flag_search").getValue(),
						assetName:Ext.getCmp("assetName_search").getValue(),
						orgId : thisNodeId};
			}
		}
	});
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();

	toolbar.addButton(new Ext.Button({
		text : "设置审批人",
		iconCls : 'icon_sms',
		handler : showAssociatedUsersWin
	}));
	
	toolbar.addFill();
	toolbar.addText("目录类别:");
	toolbar.addItem(new  Ext.form.ComboBox({
		width:60,
		xtype : 'combo',
		editable:false,
		displayField: 'name',
		valueField:'name',
		mode : 'local',
		id:'sm_flag_search',
		hiddenName:'sm_flag',
		triggerAction : 'all',
		value:'非空间',
		store: new Ext.data.SimpleStore({
			fields : ['name'],
			data:[["全部"],["空间"],["非空间"]]
		}),
		listeners:{
			select:function(){
				var assetName=Ext.getCmp("assetName_search").getValue();
				var sm_flag=Ext.getCmp("sm_flag_search").getValue();
				Ext.getCmp("rdGrid").getStore().reload({
					params :
					{
						assetName:assetName,
						start : 0,
						limit : pageSize,
						orgId : thisNodeId,
						archCateId:cateCombo.getValue(),
						sm_flag:sm_flag
					}
				});
				Ext.getCmp("rdGrid").getStore().baseParams ={
					assetName:assetName,
					start : 0,
					limit : pageSize,
					orgId : thisNodeId,
					archCateId:cateCombo.getValue(),
					sm_flag:sm_flag
				};
			}
		},
	}));
	toolbar.addText("&nbsp;架构类别:");
	toolbar.addItem(cateCombo);
	toolbar.addText("&nbsp;资产名称:");
	toolbar.addItem(new Ext.form.TextField(
	{
		id : 'assetName_search',
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchForAsset();
				}
			},
			focus : function()
			{
				onFocusClear(this);
			}
		},
		emptyText : '输入资产目录名称',
		width : 130
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : searchForAsset
	}));
	return toolbar;
}
function isAlone(gridId){
	var dataModel=Ext.getCmp(gridId).getSelectionModel();
	var count = dataModel.getSelections().length;
	//如果不是选择一条，提醒他必须选择一条数据
	if(1!==count){
		Ext.Msg.alert('系统提示', '请选择一条数据');
		return false;
	}
	return true;
}