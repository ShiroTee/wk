Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);

function init()
{
	var grid = createGrid();
	setTip("授权信息管理");
	setPaging(grid);
	setMainPanel(document.body, grid);
}
function createGrid()
{
	var sm = new Ext.grid.CheckboxSelectionModel(
	{
		singleSelect : true,
		header:"",
		listeners :
		{
			rowselect : function()
			{
				var grid = Ext.getCmp("authInfoGrid");
				var toolbar = grid.getTopToolbar();
				var record = this.getSelected();
				var status = record.get("status");
				toolbar.getComponent(2).enable();
				if (status == 1)
				{
					toolbar.getComponent(1).enable();
				} else if (status == 0)
				{
					toolbar.getComponent(0).enable();
				}
			},
			rowdeselect : function()
			{
				var grid = Ext.getCmp("authInfoGrid");
				var toolbar = grid.getTopToolbar();
				for ( var i = 0; i < 3; i++)
				{
					toolbar.getComponent(i).disable();
				}
			}
		}
	});
	var columns =
	[ sm, new Ext.grid.RowNumberer(),
	{
		dataIndex : 'authId',
		hidden : true
	},
	{
		dataIndex : 'userId',
		hidden : true
	},
	{
		dataIndex : 'authKey',
		header : "授权KEY",
		renderer : function(value)
		{
			return rendererOfSearch(searchText, value);
		},
		width : 80
	},
	{
		dataIndex : 'name',
		header : "名称",
		sortable : true,
		renderer : function(value)
		{
			return rendererOfSearch(searchText, value);
		},
		width : 80
	},
	{
		dataIndex : 'loginName',
		header : "登录名",
		renderer : function(value)
		{
			return rendererOfSearch(searchText, value);
		},
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'addDate',
		header : "授权时间",
		sortable : true,
		renderer : formatDate,
		width : 80
	},
	{
		dataIndex : 'status',
		header : "状态",
		renderer : function(value)
		{
			if (value == 1)
			{
				return "<font color='green'>启用</font>";
			}
			return "<font color='red'>禁用</font>";
		},
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
		}, Ext.data.Record.create(
		[
		{
			name : 'authId'
		},
		{
			name : 'userId',
			mapping : function(data)
			{
				return jsonConvert(data, "user", "userId");
			}
		},
		{
			name : 'name',
			mapping : function(data)
			{
				return jsonConvert(data, "user", "name");
			}
		},
		{
			name : 'loginName',
			mapping : function(data)
			{
				return jsonConvert(data, "user", "loginName");
			}
		},
		{
			name : 'addDate'
		},
		{
			name : 'status'
		},
		{
			name : 'authKey'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + "authInfoHandler/getPageList"
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		tbar : createToolbar(),
		id : 'authInfoGrid',
		loadMask : true,
		buttonAlign : 'center',
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
		}
	});
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();

	toolbar.addButton(new Ext.Button(
	{
		text : '启用',
		disabled : true,
		iconCls : 'icon_start',
		handler : startAuthInfo
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : '禁用',
		disabled : true,
		iconCls : 'icon_stop',
		handler : stopAutInfo
	}));
	/*
	toolbar.addButton(new Ext.Button(
	{
		text : '删除',
		disabled : true,
		iconCls : 'icon_delete'
	}));
	*/
	toolbar.addButton(new Ext.Button(
	{
		text : '资产目录明细',
		disabled : true,
		iconCls : 'icon_delete',
		handler : showAssetDetail
	}));
	toolbar.addFill();
	toolbar.addItem({
		xtype:'textfield',
		id:"textArgs",
		listeners :
		{
			specialkey : function(field, e)
			{
				if (e.getKey() == Ext.EventObject.ENTER)
				{
					searchAuth();
				}
			},
			focus:function()
			{
				onFocusClear(this);
			}
		},
		emptyText:"登录名 姓名 KEY",
		width:200
	});
	toolbar.addButton({
		xtype:'button',
		text:'搜索',
		
		iconCls:"icon_query",
		handler:searchAuth
	});
	toolbar.addItem({
		html:"&nbsp;&nbsp;&nbsp;&nbsp;"
	})
	return toolbar;
}
//创建显示资产目录明细窗口
function showAssetDetail(){
	//获取被选中数据的id，作为参数
	var key=Ext.getCmp("authInfoGrid").getSelectionModel().getSelected().get("authId");
	var store=new Ext.data.Store({
		autoLoad :{
			params : {
				start : 0,
				limit : pageSize
			}
		},
		autoLoad:false,
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options,response, arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		reader : new Ext.data.JsonReader({
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create([{
			name : 'resourceId'//1资产id
		},{
			name : 'resourceName'//2资产名称
		},{
			name : 'pubDate'//3发布时间
		},{
			name : 'provider'//4提供者
		},{
			name : 'status'//5状态
		}])),
		proxy : new Ext.data.HttpProxy( {
			url : getHandlerRequestUrl() + "resourceCatalogueInfoHandler/getPageListByAuthKey"
		})
	});
	//选择框
	var sm=new Ext.grid.CheckboxSelectionModel({
		singleSelect : true,
		header:"",
    	listeners:{
        	'rowdeselect': function(s){
        		if(s.getCount( )!= this.grid.getStore().getCount()){
        			//通过sm得到已选的行的总数，和表中这一页的行数做比较，如果不相等表示还有为选项，则通过下面代码将标题栏的勾选状态去掉。
        			var hd_checker = this.grid.getEl().select('div.x-grid3-hd-checker');
        			var hd = hd_checker.first();
        			if(hd != null){ 
        				hd.addClass('x-grid3-hd-checker-on');
        				hd.removeClass('x-grid3-hd-checker-on'); //这个是去掉上面标题中的
        			}
        		}    
        	}
        }
    });
	//grid
	var grid=new Ext.grid.GridPanel({
		region: 'center',
	    xtype: 'grid',	 
	    title:false,
	    id:'list_showAssetDetailGrid',
	    store:store,
	    sm:sm,
	    tbar:[{
	    	xtype: 'button',
	    	text : "删除",
			iconCls : 'icon_delete',
			handler:function(){
				deleteAssetDetail(key);
			}
	    }],
        bbar :[],
	    columns:[
	        sm,
	        new Ext.grid.RowNumberer(),//显示行号
	        {
	        	header : "编号",
				dataIndex : 'resourceId',
				align:"center",
				hidden:true
	        },{
	        	header : "资源名称",
				width:170,
				align:"center",
				dataIndex : 'resourceName'
	        },{
	        	header : "发布时间",
				width:120,
				align:"center",
				dataIndex : 'pubDate',
				renderer:formatDate       	
	        },{
	        	header : "提供方",
				width:120,
				align:"center",
				dataIndex : 'provider',
				renderer:function(e){
					return e.orgId;				
				}
	        },{
	        	header : "状态",
				width:120,
				align:"center",
				dataIndex : 'status',
				renderer:function(e){
					if(1==e){
						return "<font color='green'>正常</font>";
					}else{
						return "<font color='red'>禁用</font>";
					}			
				}
	        }]
	});
	new Ext.Window({
		id:'list_showAssetDetailWin',
		width : 650,
		height : 350,
		resizable:false,
		title:'资产目录明细',
		modal:true,
		layout:'fit',
		items:[grid],
        listeners:{
        	'afterrender':function(win,eOpts){
        		setPaging(grid,pageSize);
        		//查询并显示数据
        		list_queryFunc(grid,key);
        	}
        }
	}).show();
}
//删除资产详细数据
function deleteAssetDetail(authId){
	var grid=Ext.getCmp('list_showAssetDetailGrid');
	var dataModel=grid.getSelectionModel();
	var count = dataModel.getSelections().length;
	//如果不是选择一条，提醒他必须选择一条数据
	if(1!==count){
		Ext.Msg.alert('系统提示', '请选择需要删除的数据');
		return false;
	}
	//开始执行删除
	Ext.Msg.confirm("提示", "确定要删除这条数据吗？",function(select, text){
		if("yes"==select){
			var assetId=dataModel.getSelections()[0].data.resourceId;
			//请求执行删除的方法
			Ext.Ajax.request({
				url : getHandlerRequestUrl() + "resourceCatalogueInfoHandler/deleteData",
				method : 'POST',
				params:{
					'assetId':assetId,
					'authId':authId
				},
				success : function(response, opts){						
					Ext.Msg.alert('系统提示', '操作成功');
					//重新加载数据
					list_queryFunc(grid,authId);
				},
				failure : function(response, opts){
					var result=eval("("+response.responseText+")");
					Ext.Msg.alert('系统提示', result.msg);
				}
			});	
		}
	});
}
//加载grid的数据并显示
function list_queryFunc(grid,key){
	var gridStore=grid.getStore();
	Ext.apply(gridStore.baseParams,{
		start : 0,
		limit : pageSize,
		key:key
	});
	gridStore.load({
		params : gridStore.baseParams
	});
}