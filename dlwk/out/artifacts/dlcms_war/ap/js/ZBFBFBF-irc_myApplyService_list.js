// 每页显示行数
var pageSize = 20;
// 各种参数
var queryForm;
var queryFunc;
var resultTable;
var resultStore;
var showLog;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();

// zhyg
// 申请服务的请求URL地址
var requestUrl = "../getmyserv.jspx";

/**
 * 页面--用户申请的服务管理
 */
Ext.onReady(function() {
			// 初始化页面的时候时候会执行store_load方法，查询数据
			changeServerTab() ;
			Ext.QuickTips.init();
			Ext.form.Field.prototype.msgTarget = 'side';

			var resultStoreFields = [ 'sERVICEID', 'sERVICENAME',
					'sERVICEPROTOCAL', 'sERVICEURL', 'sTATUS', 'cATALOGUENAME',
					'sERVICETYPE', 'aUTHID', 'iD', 'aUDITSTATUS', 'tOTAL' ];
			resultStore = new Ext.data.JsonStore({
				autoLoad : true,
				baseParams : {
					start : 0,
					limit : pageSize
				},
				successProperty : 'success',
				listeners : {
					exception : function(dataProxy, type, action, options,
							response, arg) {
						try{
							var o = Ext.util.JSON.decode(response.responseText);
								if (!o.success) {
									if (o.status == "0") {
										//Ext.Msg.alert('提示', "服务列表加载失败！  [请先登陆]");
										$("#myServList").html("<h3>服务列表加载失败！ 请先<a href='/rdplogin.jspx'> [登陆]</a></h3>") ;
										return;
									} else if (o.status == "2") {
										//Ext.Msg.alert('提示', "访问RDP平台失败！");
										$("#myServList").html("<h3>访问RDP平台失败！</h3>") ;
										return;
									} else if (o.status == "3") {
										//Ext.Msg.alert('提示', "当前登陆不是RDP平台用户，无查询结果!");
										$("#myServList").html("<h3>当前登陆不是RDP平台用户，无查询结果!</h3>") ;
										return;
									} else if (o.status == "1") {
										//Ext.Msg.alert('提示', "通讯异常,请稍候再试！");
										$("#myServList").html("<h3>通讯异常,请稍候再试！</h3>") ;
										return;
									}
								}
						}catch(e){
							parent.document.body.innerHTML = response.responseText ;
						}
					}
				},
				id : 'resultStore',
				url : requestUrl,
				root : 'list',
				idProperty : 'iD',
				totalProperty : 'count',//总共XX条的对应JSON键名
				messageProperty : 'msg',
				fields : resultStoreFields
			});

			// 列表显示的字段
			var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), {
				header : "iD",
				dataIndex : 'iD',
				hidden : true,
				sortable : true
			}, {
				header : "sERVICEID",
				dataIndex : 'sERVICEID',
				hidden : true,
				sortable : true
			}, {
				header : "服务名称",
				width : 60,
				dataIndex : 'sERVICENAME',
				sortable : true
			}, {
				header : "协议",
				width : 40,
				dataIndex : 'sERVICEPROTOCAL',
				sortable : true
			}, {
				header : "服务类型",
				width : 40,
				dataIndex : 'sERVICETYPE',
				sortable : true
			}, {
				header : "服务目录",
				width : 60,
				dataIndex : 'cATALOGUENAME',
				sortable : true
			}, {
				header : "URL",
				width : 160,
				dataIndex : 'sERVICEURL',
				sortable : true
			}, {
				header : "状态",
				width : 40,
				dataIndex : 'sTATUS',
				renderer : renderStatus,
				sortable : true
			}, {
				header : "审批状态",
				width : 40,
				dataIndex : 'aUDITSTATUS',
				renderer : renderAuditStatus,
				sortable : true
			} ]);

			// 格式化当前服务对应用户的审批状态
			function renderAuditStatus(value, metadata, record, rowIndex,
					colIndex, store) {
				if (value == "Y") {
					return "<font color='green'>已审批</font>";
				} else if (value == "N") {
					return "<font color='red'>待审批</font>";
				} else {
					return "<font color='blue'>未申请</font>";
				}
			}

			// 格式化'状态'
			function renderStatus(value, metadata, record, rowIndex, colIndex,
					store) {
				if (value == "Y") {
					return "<img src='../../../r/cms/www/red/img/GreenStatus.png' width='16',height='16' title='启用'>";
				} else if (value == "N") {
					return "<img src='../../../r/cms/www/red/img/redstatus.png' width='16',height='16' title='停用'>";
				} else {
					return "<font color='yellow'>未知状态</font>";
				}
			}

			// 分页显示控件
			var pagingToolbar = new Ext.PagingToolbar(
					{
						pageSize : pageSize,
						store : resultStore,
						displayInfo : true,
						displayMsg : '<span style="padding-right: 150px;padding-left: 40px">显示记录 {0} - {1}条 &nbsp;&nbsp;总共 {2}条<span>',
						emptyMsg : '<span style="padding-right: 350px;padding-left: 40px">没有记录</span>'
					});

			// 显示的列表
			resultTable = new Ext.grid.GridPanel({
				id : 'resultTable',
				autoScroll : true,
				scrollOffset: 0, //不加这个的话，会在grid的最右边有个空白，留作滚动条的位置
				loadMask : true,
				buttonAlign : 'center',
				monitorResize : true,
				region : 'center',
				store : resultStore,
				cm : cm,
				trackMouseOver : true,
				forceLayout : true,
				frame : false,
				width : '101.9%',
				height : 622,
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				monitorResize : true,
				border : false,		//是否显示行的边框
				// 分页栏
				bbar : pagingToolbar,
				renderTo : 'myServList'	//显示的位置，指定DIV的ID值
			});
		});

function changeServerTab(){
	$("#dataserver_tab").click(function(){
		$(".server_type").addClass("servertab_curr");
		$(this).addClass("servertab_curr_font") ;
		$("#infoserver_tab").removeClass("servertab_curr_font") ;
	});
	
	$("#infoserver_tab").click(function(){
		$(".server_type").removeClass("servertab_curr");
		$(this).addClass("servertab_curr_font") ;
		$("#dataserver_tab").removeClass("servertab_curr_font") ;
	});
}



