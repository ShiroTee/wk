Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init()
{
	var grid = createServiceGridPanel();
	setTip("服务日志查询");
	setPaging(grid);
	setMainPanel(document.body, grid);
	Ext.EventManager.onWindowResize(function()
	{
		grid.getView().refresh();
	});
}
function createServiceGridPanel()
{
	var fields = [ 'serviceId', {
        name : 'appName',
        mapping : 'systemId.appName'
    }, 'serviceMethod', "createDate", "isException", "serviceName", "inParam",
            "outParam" ];
	var toolbar= createToolbar();
	var columnLabel = new Ext.grid.ColumnModel([
            {
				header : "系统名称",
				dataIndex : 'appName',
				width : 40,
				sortable : true
			},
			{
				header : "服务名称",
				dataIndex : 'serviceName',
				width : 40,
				sortable : true
			},
			{
				header : "方法名称",
				dataIndex : 'serviceMethod',
				width : 80,
				sortable : true
			},
			{
				header : "记录日期",
				dataIndex : 'createDate',
				width : 50,
				renderer:formatDate,
				sortable : true
			},
			{
				header : "是否异常",
				dataIndex : 'isException',
				renderer : function(value)
				{
					if (value ==1)
					{
						return "<font color='red'>是</font>";
					}
					return "<font color='green'>否</font>";
				},
				width : 55,
				sortable : true
			},
			{
				header : "详情",
				width : 45,
				dataIndex : 'serviceId',
				renderer : function(value)
				{
					return "<a href='#' onclick='showServiceLogsWin(\"" + value
							+ "\");'>详细</a>";
				},
				sortable : true
			} ]);
	var gridStore = new Ext.data.JsonStore({
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize,
				isException :Ext.getCmp("serviceLogCombox").getValue()
				//loginUserName : Ext.getCmp("logsUserCombox").getValue(),
				//appCode : Ext.getCmp("logsAppCodeCombox").getValue(),
				
				//requestUrl : Ext.getCmp("logsRequestURLText").getValue()
			}
		},
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options, response,
					arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		url : getHandlerRequestUrl() + "serviceLogInfoHandler/query",
		root : 'list',
		idProperty : 'ID',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var grid = new Ext.grid.GridPanel({
		autoScroll : true,
		width : '100%',
		id : "serviceLogGrid",
		tbar :toolbar,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		// title : '资源列表',
		store : gridStore,
		border : false, // 是否显示行的边框
		cm : columnLabel,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		bbar : [],
		viewConfig : {
			forceFit : true
		}
	});
	return grid;
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();
	toolbar.addText("系统名称：");
	toolbar.addItem(createAppCombox(100));
	toolbar.addText("&nbsp;开始时间：");
	toolbar.addItem(
	{
		xtype : 'datefield',
		name : 'startDate',
		width : 100,
		format : 'Y-m-d',
		editable : false
	});
	toolbar.addText("&nbsp;结束时间：");
	toolbar.addItem(
	{
		xtype : 'datefield',
		name : 'endDate',
		width : 100,
		format : 'Y-m-d',
		editable : false
	});
	toolbar.addText("是否异常：");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		id : 'serviceLogCombox',
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'name', 'id' ],
			data : [ [ '全部', '' ], [ '异常', '1' ], [ '正常', '0' ] ]
		}),
		triggerAction : 'all',
		displayField : 'name',
		valueField : 'id',
		value :'',
		width : 80,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	toolbar.addButton(new Ext.Button(
	{
		text : "搜索",
		iconCls : 'icon_query',
		handler : function()
		{
			var grid=Ext.getCmp("serviceLogGrid");
			var startDate=toolbar.getComponent(3).getValue();
			var endDate=toolbar.getComponent(5).getValue();
			grid.store.reload({
				params : {
					appId :toolbar.getComponent(1).getValue(),
					startDate:startDate==""?"":Ext.util.Format.date(startDate,'Y-m-d'),
					endDate:endDate==""?"":Ext.util.Format.date(endDate,'Y-m-d'),
					isException:toolbar.getComponent(7).getValue(),
					start : 0,
					limit : 20
				}
			});
		}
	}));
	return toolbar;
}

function showServiceLogsWin(serviceId) {
    var win = new Ext.getCmp('serviceLogDetailWin');
    var paperForm = win.getComponent(0).getForm();
    paperForm.reset();
    var grid = Ext.getCmp("serviceLogGrid");
    var i = grid.getStore().find("serviceId", serviceId);
    var data = grid.getStore().getAt(i).data;
    var data2 = {};
    for (i in data) {
        data2[i] = data[i];
    }
    data2["createDate"] = formatDate(data2["createDate"], 'Y-m-d hh24:mi:ss');
    paperForm.setValues(data2);
    var isException_id = Ext.getCmp("isException_id");
    isException_id.setValue(data2["isException"]);
    win.show();
}