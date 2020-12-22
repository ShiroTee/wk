// 每页显示行数
var pageSize = 20;
// 各种参数
var queryForm;
var queryFunc;
var resultTable;
var resultIRCTable;
var resultStore;
var resultIRCStore;
var showLog;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();

// zhyg
// 申请服务的请求URL地址
var requestUrl = "../getmyserv.jspx";
var requestIRCUrl = "../getmyircserv.jspx";

/**
 * 页面--用户申请的服务管理
 */
Ext.onReady(function() {
			// 初始化页面的时候时候会执行store_load方法，查询数据
			changeServerTab() ;
			Ext.QuickTips.init();
			Ext.form.Field.prototype.msgTarget = 'side';

			//加载“我已申请的信息资源服务列表”
			var resultStoreFields = [ 'sERVICEID', 'sERVICENAME',
					'sERVICEPROTOCAL', 'sERVICEURL', 'sTATUS', 'cATALOGUENAME',
					'sERVICETYPE', 'aUTHID', 'iD', 'aUDITSTATUS', 'tOTAL', 'pUBLISHDATE', 'rEGISTERDATE'];
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
										$("#myInfoServList").html("<h3>服务列表加载失败！ 请先<a href='/rdplogin.jspx'> [登陆]</a></h3>") ;
										return;
									} else if (o.status == "2") {
										//Ext.Msg.alert('提示', "访问RDP平台失败！");
										$("#myInfoServList").html("<h3>访问RDP平台失败！</h3>") ;
										return;
									} else if (o.status == "3") {
										//Ext.Msg.alert('提示', "当前登陆不是RDP平台用户，无查询结果!");
										$("#myInfoServList").html("<h3>当前登陆不是RDP平台用户，无查询结果!</h3>") ;
										return;
									} else if (o.status == "1") {
										//Ext.Msg.alert('提示', "通讯异常,请稍候再试！");
										$("#myInfoServList").html("<h3>通讯异常,请稍候再试！</h3>") ;
										return;
									}
								}
						}catch(e){
							//parent.document.body.innerHTML = response.responseText ;
						}
					}
				},
				id : 'resultStore',
				url : requestUrl,
				root : 'list',
				idProperty : 'iD',
				totalProperty : 'count',//总共XX条的对应JSON键名
				messageProperty : 'msg',
				fields : resultStoreFields,
				// 定义默认以申请日期字段，降序排列
				sortInfo : {
					field : "rEGISTERDATE",
					direction : "DESC"
				}
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
				width : 25,
				align : "center",
				dataIndex : 'sERVICEPROTOCAL',
				sortable : true
			}, {
				header : "服务类型",
				width : 40,
				dataIndex : 'sERVICETYPE',
				renderer : renderServiceType,
				sortable : true
			}, {
				header : "服务目录",
				width : 60,
				dataIndex : 'cATALOGUENAME',
				sortable : true
			}, {
				header : "URL",
				width : 100,
				dataIndex : 'sERVICEURL',
				sortable : true
			}, {
				header : "发布日期",
				width : 40,
				align : "center",
				dataIndex : 'pUBLISHDATE',
				renderer : subDateAndNullRenderer,
				sortable : true
			}, {
				header : "申请日期",
				width : 40,
				align : "center",
				dataIndex : 'rEGISTERDATE',
				renderer : subDateAndNullRenderer,
				sortable : true
			}, {
				header : "状态",
				width : 20,
				align : "center",
				dataIndex : 'sTATUS',
				renderer : renderStatus,
				sortable : true
			}, {
				header : "审批状态",
				width : 40,
				align : "center",
				dataIndex : 'aUDITSTATUS',
				renderer : renderAuditStatus,
				sortable : true
			} ]);

			// 格式化当前服务对应用户的审批状态
			function renderAuditStatus(value, metadata, record, rowIndex,
					colIndex, store) {
				if (value == "Y") {
					return "<font color='green'>已审批</font>";
				} else{
					return "<font color='red'>待审批</font>";
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
			
			// 格式化'服务类型'
			function renderServiceType(value, metadata, record, rowIndex, colIndex, store)
			{
				if (value == "public")
				{
					return "公共数据支撑服务";
				} else if (value == "gis")
				{
					return "第三方代理服务";
				} else if(value == "service")
				{
					return "业务数据服务";
				}else{
					return "无";
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
				height : 625,
				columnLines : true,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				border : false,		//是否显示行的边框
				// 分页栏
				bbar : pagingToolbar,
				renderTo : 'myInfoServList'	//显示的位置，指定DIV的ID值
			});
			
			// 双击事件
			resultTable.addListener('rowdblclick', rowdblclickFn);
			function rowdblclickFn(grid, rowindex, e) {
				// 获取请求数据里双击这一条服务的主键ID值，其中id必须显示在表格中，如果不需要显示，可以设置属性hidden:true将其隐藏。
				var servId = resultStore.getAt(rowindex).data.sERVICEID ;
				// 为config-serv-tabinfo.js中函数，为了方便目录页面共用。
				showinf(servId, '../../list/servinfo.do', 'myInfoServList');	
			}
		});


//加载“我已申请的数据资源服务列表”
function loadMyDataServ(){
	var resultIRCStoreFields = ['id', 'text','type','status','addTime','auditDate','disabletime'];
	resultIRCStore = new Ext.data.JsonStore({
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
								$("#myDataServList").html("<h3>服务列表加载失败！ 请先<a href='/rdplogin.jspx'> [登陆]</a></h3>") ;
								return;
							} else if (o.status == "2") {
								//Ext.Msg.alert('提示', "访问RDP平台失败！");
								$("#myDataServList").html("<h3>访问RDP平台失败！</h3>") ;
								return;
							} else if (o.status == "3") {
								//Ext.Msg.alert('提示', "当前登陆不是RDP平台用户，无查询结果!");
								$("#myDataServList").html("<h3>当前登陆不是RDP平台用户，无查询结果!</h3>") ;
								return;
							} else if (o.status == "1") {
								//Ext.Msg.alert('提示', "通讯异常,请稍候再试！");
								$("#myDataServList").html("<h3>通讯异常,请稍候再试！</h3>") ;
								return;
							}
						}
				}catch(e){
					//parent.document.body.innerHTML = response.responseText ;
				}
			}
		},
		id : 'resultIRCStore',
		url : requestIRCUrl,
		root : 'list',
		idProperty : 'id',
		totalProperty : 'count',//总共XX条的对应JSON键名
		messageProperty : 'msg',
		fields : resultIRCStoreFields,
		// 定义默认以申请日期字段，降序排列
		sortInfo : {
			field : "auditDate",
			direction : "DESC"
		}
	});

	// 列表显示的字段
	var IRCcm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), {
		header : "ID",
		dataIndex : 'id',
		hidden : true,
		sortable : true
	}, {
		header : "资源名称",
		width : 300,
		dataIndex : 'text',
		sortable : true
	}, {
		header : "资源类型",
		width : 144,
		align : "center",
		dataIndex : 'type',
		renderer : renderRestype,
		sortable : true
	}, {
		header : "发布日期",
		width : 140,
		align : "center",
		dataIndex : 'addTime',
		renderer : dateAndNullRenderer,
		sortable : true
	}, {
		header : "失效日期",
		width : 143,
		align : "center",
		dataIndex : 'disabletime',
		renderer : dateAndNullRenderer,
		sortable : true
	}, {
		header : "申请日期",
		width : 140,
		align : "center",
		dataIndex : 'auditDate',
		renderer : dateAndNullRenderer,
		sortable : true
	}, {
		header : "审批状态",
		width : 110,
		align : "center",
		dataIndex : 'status',
		renderer : renderAudit,
		sortable : true
	} ]);

	// 格式化当前服务对应用户的审批状态
	function renderAudit(value, metadata, record, rowIndex,
			colIndex, store) {
		if (value == 1) {
			return "<font color='green'>审批通过</font>";
		} else if (value === "0") {
			return "<font color='red'>正在审批</font>";
		} else {
			return "<font color='blue'>申请状态" + value + "</font>";
		}
	}

	// 格式化'数据类型'
	function renderRestype(value, metadata, record, rowIndex, colIndex,
			store) {
		if (value == "1") {
			return "数据库资源";
		} else if (value == "2") {
			return "文件资源";
		}else{
			return "类型" + value;
		}
	}

	// 分页显示控件
	var pagingIRCToolbar = new Ext.PagingToolbar(
		{
			pageSize : pageSize,
			store : resultIRCStore,
			displayInfo : true,
			displayMsg : '<span style="padding-right: 150px;padding-left: 40px">显示记录 {0} - {1}条 &nbsp;&nbsp;总共 {2}条<span>',
			emptyMsg : '<span style="padding-right: 350px;padding-left: 40px">没有记录</span>'
		});

	// 显示的列表
	resultIRCTable = new Ext.grid.GridPanel({
		id : 'resultIRCTable',
		autoScroll : true,
		scrollOffset: 0, //不加这个的话，会在grid的最右边有个空白，留作滚动条的位置
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		region : 'center',
		store : resultIRCStore,
		cm : IRCcm,
		trackMouseOver : true,
		forceLayout : true,
		frame : false,
		autoWidth : true,
		height : 625,
		width : '101.9%',
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			forceFit : true
		},
		border : false,		//是否显示行的边框
		// 分页栏
		bbar : pagingIRCToolbar,
		renderTo : 'myDataServList'	//显示的位置，指定DIV的ID值
	});
	// 双击事件
	resultIRCTable.addListener('rowdblclick', irc_rowdblclickFn);
	function irc_rowdblclickFn(grid, rowindex, e) {
		// 获取请求数据里双击这一条服务的主键ID值，其中id必须显示在表格中，如果不需要显示，可以设置属性hidden:true将其隐藏。
		var servId = resultIRCStore.getAt(rowindex).data.id ;
		var servType = resultIRCStore.getAt(rowindex).data.type ;
		var servName = resultIRCStore.getAt(rowindex).data.text ;
		// 为config-serv-tabinfo.js中函数，为了方便目录页面共用。
		irc_showinf(servName, servId, servType, '../../irc/irc_servinfo.jspx', 'myDataServList');	
	}
}

//我的服务列表页面中，“信息资源服务”、“数据资源服务”两个TAB标签切换
function changeServerTab(){
	$("#infoserver_tab").click(function(){
		$(".server_type").removeClass("servertab_curr");
		$(this).addClass("servertab_curr_font") ;
		$("#dataserver_tab").removeClass("servertab_curr_font") ;
		$("#myDataServList").css("display","none") ;
		$("#myInfoServList").css("display","block") ;
	});
	
	$("#dataserver_tab").click(function(){
		$(".server_type").addClass("servertab_curr");
		$(this).addClass("servertab_curr_font") ;
		$("#infoserver_tab").removeClass("servertab_curr_font") ;
		$("#myInfoServList").css("display","none") ;
		$("#myDataServList").css("display","block") ;
		if(!resultIRCTable){
			//加载“我已申请的数据资源服务列表”
			loadMyDataServ();
		}
	});
}

//长型日期及空值转换
function dateAndNullRenderer(value, metadata, record, rowIndex, colIndex,
		store) {
	if (value == "") {
		return "无";
	}else{
		var date = new Date(value);
		return date.format('Y-m-d');
	}
}

//截取日期及空值转换
function subDateAndNullRenderer(value, metadata, record, rowIndex, colIndex,
		store) {
	if (value == "") {
		return "无";
	}else{
		var date = value.substring(0,10);
		return date;
	}
}

