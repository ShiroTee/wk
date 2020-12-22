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
Ext.BLANK_IMAGE_URL = getContextPath()
		+ 'resource/ext/resources/images/default/s.gif';
Ext.chart.Chart.CHART_URL = getContextPath()
+ 'resource/ext/resources/charts.swf';
Ext.onReady(init);
function init() {
	setTip("系统日志分析");
	var tabPanel=createTabPanel();
	var grid = Ext.getCmp("StatisticAnalysisGrid");

	
	//setPaging(grid);
	setMainPanel(document.body, tabPanel);
	Ext.EventManager.onWindowResize(function() {
		grid.getView().refresh();
	});
	//grid.setHeight(grid.getHeight()-30);
}
function createGrid() {
	var fields = [ 'handler_', 'interval', "avg_time", "max_time",
			"re_count", "re_raee", "exception_count","more_avg_count","more_avg_raee","name"];
	
	var columnLabel = new Ext.grid.ColumnModel([
			{
				header : "业务模块",
				dataIndex : 'handler_',
				width:100,
				renderer:formatQtip_,
				sortable : true
			},
			{
				header : "汇总时间段",
				width:200,
				dataIndex : 'interval',
				sortable : true
			},
			{
				header : "请求数(次)",
				dataIndex : 're_count',
				sortable : true
			},
			{
				header : "平均响应时间(毫秒)",
				dataIndex : 'avg_time',
				sortable : true
			},
			{
				header : "响应时间最大值(毫秒)",
				dataIndex : 'max_time',
				sortable : true
			},
			{
				header : "大于平均(次)",
				dataIndex : 'more_avg_count',
				sortable : true
			},
			{
				header : "大于平均占比(%)",
				dataIndex : 'more_avg_raee',
				sortable : true
			},
			{
				header : "异常数(次)",
				dataIndex : 'exception_count',
				sortable : true
			},
			{
				header : "异常占比(%)",
				dataIndex : 're_raee',
				sortable : true
			}
			]);
	var gridStore = new Ext.data.JsonStore({
		autoLoad : {
			params : {
				interval:Ext.getCmp("intervalTime").getValue(),
				startDate:new Date().format("Y-m-d")
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
			},
			load:function()
			{
				if(!Ext.getCmp("linechart"))
				{
					var lineChart=createLineChart(gridStore);
					Ext.getCmp("linechartPanel").add(lineChart)
					var panel=createRequestCountPanel(gridStore);
					Ext.getCmp("linechartPanel").add(panel)
					Ext.getCmp("linechartPanel").doLayout();
				}
				
				
			}
		},
		url : getHandlerRequestUrl() + "logStatisticAnalysisHandler/httpLogStatisticAnalysis",
		root : 'list',
		idProperty : 'ID',
		messageProperty : 'msg',
		fields : fields
	});
	var loadMarsk = new Ext.LoadMask(document.body, {
	    msg  : '数据分析中，请稍候...',
	    disabled : false,
	    store : gridStore
	});
	var grid = new Ext.grid.GridPanel({
		autoScroll : true,
		id:'StatisticAnalysisGrid',
		width : '100%',
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		cm : columnLabel,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		autoWidth : true,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			forceFit : true
		}
	});

	return grid;
}
function formatDate(value) {

	var date = new Date(value);
	return date.format('Y-m-d H:i:s');
}
function createTabPanel()
{
	var toolbar = new Ext.Toolbar({
		autoWidth : true
	});
	// 添加业务模块下来框
	toolbar.addText("业务模块：");
	var requesturl = requestUrlCombox();
	toolbar.addItem(requesturl);
	// 添加开始时间段
	toolbar.addText("开始时间段：");
	var startDate = startDatefield();
	toolbar.addItem(startDate);
	// 添加总汇时间
	toolbar.addText("总汇时间：");
	var intervalTime = intervalTimeComboBox();
	toolbar.addItem(intervalTime);

	toolbar.addButton(new Ext.Button({
		text : "汇总",
		iconCls : 'icon_query',
		handler : function() {
			
			var grid = Ext.getCmp("StatisticAnalysisGrid");
			
			Ext.getCmp("linechartPanel").setTitle('HTTP请求响应时间['+Ext.util.Format.date(Ext.getCmp("startDate").getValue(), 'Y-m-d')+"]");
			Ext.getCmp("RequestCountPanel").setTitle('HTTP请求次数['+Ext.util.Format.date(Ext.getCmp("startDate").getValue(), 'Y-m-d')+"]");
			grid.store.reload({
				params : {
					startDate: Ext.util.Format.date(Ext.getCmp("startDate").getValue(), 'Y-m-d'),
					handler:Ext.getCmp("requestUrlId").getValue(),
					interval:Ext.getCmp("intervalTime").getValue()
				}
			});

			grid.store.baseParams = {
				interval:Ext.getCmp("intervalTime").getValue(),
				startDate: Ext.util.Format.date(Ext.getCmp("startDate").getValue(), 'Y-m-d'),
				handler:Ext.getCmp("requestUrlId").getValue()
			};
		}
	}));
	return new Ext.TabPanel(
			{
				autoDestroy : true,
				draggable : false,
				tbar : toolbar,
				closable : true,
				width : '100%',
				activeTab: 0,
				items:[{
					title:'表格视图',
					items:[createGrid()]
				},{
					title:'图表视图',
					items:[createLinechartPanel()]
				}]
			});
			return p;
}
function createLinechartPanel()
{
   return new Ext.Panel({
        title:' HTTP请求响应时间['+Ext.util.Format.date(Ext.getCmp("startDate").getValue(), 'Y-m-d')+"]",
        width:'100%',
        layout:'fit',
        autoHeight:true,
        id:'linechartPanel'
    });
}
function createRequestCountPanel(store)
{
	return new Ext.Panel({
        title:'HTTP请求次数['+Ext.util.Format.date(Ext.getCmp("startDate").getValue(), 'Y-m-d')+"]",
        width:'100%',
        layout:'fit',
        autoHeight:true,
        id:'RequestCountPanel',
        items:{
            xtype: 'linechart',
            store:store,
            xField: 'name',            
            series:[  
   		                {type:'line',displayName:'请求总数(次)',yField:'re_count',style:{color:0x008000}},  
   		                {type:'line',displayName:'异常总数(次)',yField:'exception_count',style:{color:0xFF0000}}
   		            ],  
   		            
   		     extraStyle:  
   		            {  
   		                legend:  
   		                {  
   		                    display: 'bottom',  
   		                    padding: 5,  
   		                    font:  
   		                    {  
   		                        family: 'Tahoma',  
   		                        size: 13  
   		                    }  
   		                }  
   		            },         
            
   			listeners: {
   				itemclick: function(o){
   					
   				}
   			}
        }
    });
}
function createLineChart(store)
{
	return  {
         xtype: 'linechart',
         store:store,
         id:'linechart',
      
         xField: 'name',            
         series:[  
		                {type:'line',displayName:'平均响应时间(毫秒)',yField:'avg_time',style:{color:0x0033FF}},  
		                {type:'line',displayName:'最大响应时间(毫秒)',yField:'max_time',style:{color:0x66CC00}}
		            ],  
		            
		     extraStyle:  
		            {  
		                legend:  
		                {  
		                    display: 'bottom',  
		                    padding: 5,  
		                    font:  
		                    {  
		                        family: 'Tahoma',  
		                        size: 13  
		                    }  
		                }  
		            },         
         
			listeners: {
				itemclick: function(o){
					
				}
			}
     }
}
function formatQtip_(value,metadata)
{
	var title = "";
	var tip = value;
	metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
	return tip;
}