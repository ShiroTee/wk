/**
 * 分组菜单列表
 */
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
var pageSize = 20;
var queryForm;
var gridStore;
var grid;
var gridHeight;
var appGrid;
var appDataSourecePanel;
Ext.BLANK_IMAGE_URL = getContextPath()+ '/resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init() 
{
	var grid = createGrid();
	setTip("查看数据库连接池性能情况");
	setPaging(grid);
	setMainPanel("datasource_info_div", grid);
	Ext.EventManager.onWindowResize(function()
	{
		grid.getView().refresh();
		grid.getTopToolbar().setWidth("100%");
	});
}
function createGrid() {
	var fields = [ 'connectionActiveCount', 'connectionActiveCountMax',
			"connectionCloseCount", "connectionCommitCount",
			"connectionConnectCount", "connectionConnectLastTime",
			"connectionConnectingCount", "connectionConnectingCountMax",
			"connectionRollbackCount", "name","connectionConnectMillisMax","connectionConnectMillisTotal","createdTime"];
	var columnLabel = new Ext.grid.ColumnModel([ {
		header : "数据源名称",
		dataIndex : 'name',
		width:40,
		sortable : true
	}, {header : "创建时间",
	dataIndex : 'createdTime',
	renderer : formatDate,
	width:80,
	sortable : true
},{
		header : "当前连接数",
		dataIndex : 'connectionActiveCount',
		width:40,
		sortable : true
	}, {
		header : "连接池最大连接数",
		dataIndex : 'connectionActiveCountMax',
		width:55,
		sortable : true
	}, {
		header : "关闭次数",
		dataIndex : 'connectionCloseCount',
		width:30,
		sortable : true
	}, {
		header : "事务提交次数",
		width:45,
		dataIndex : 'connectionCommitCount',
		sortable : true
	}, {
		header : "连接创建次数",
		width:40,
		dataIndex : 'connectionConnectCount',
		sortable : true
	}, {
		header : "最后创建时间",
		renderer : formatDate,
		width:80,
		dataIndex : 'connectionConnectLastTime',
		sortable : true
	},{
		header : "最大创建并发数",
		width : 60,
		dataIndex : 'connectionConnectingCountMax'
	}, {
		header : "回滚次数",
		width :40,
		dataIndex : 'connectionRollbackCount'
	} , {
		header : "最大消耗时间(毫秒)",
		width :60,
		dataIndex : 'connectionConnectMillisMax'
	} , {
		header : "总消耗时间(毫秒)",
		width :60,
		dataIndex : 'connectionConnectMillisTotal'
	}]);
	var gridStore = new Ext.data.JsonStore(
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
				sortInfo:{field: "name", direction:"ASC"},
				url : getHandlerRequestUrl() + "dataSourceInfoHandler/getDataSourceInfoInfo",
				root : 'list',
				idProperty : 'ID',
				totalProperty : 'count',
				messageProperty : 'msg',
				fields : fields
			});
			var grid = new Ext.grid.GridPanel(
			{
				autoScroll : true,
				width : '100%',
				loadMask : true,
				buttonAlign : 'center',
				monitorResize : true,
				//title : '资源列表',
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
				viewConfig :
				{
					forceFit : true
				}
			});

			return grid;
}
function formatDate(value) {

	var date = new Date(value);
	return date.format('Y-m-d H:i:s');
}