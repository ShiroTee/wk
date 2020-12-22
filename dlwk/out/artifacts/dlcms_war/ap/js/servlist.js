//被点击的节点的text名称
var nodeName;
//被点击的节点的id
var nodeId;
//表格
var resultTable;
var resultStore;

$(function() {	
	//如果未登陆显示登陆提示，如果已登陆显示申请按钮
//	if(parent.rdpUserName == undefined){
//		$("#apply_myservice_btn").css({display : "none"});
//		$("#login_tip").css({display : "block"});
//	} else {
//		$("#login_tip").css({display : "none"});
//		$("#apply_myservice_btn").css({display : "block"});
//	}
	
	//获取被点击的节点的text名称
	nodeName = decodeURI(getParaString("nodeName"));
	$("#servlisttitle").attr("title", nodeName) ;
	nodeName = nodeName.length < 11 ? nodeName : nodeName.substr(0, 8) + ".." ;	//防止标题太长，错乱
	$("#servlisttitle").html(nodeName) ;
	//获取被点击的节点的id
	nodeId = decodeURI(getParaString("id"));
	loadGrid(nodeId);
	Ext.QuickTips.init();	//显示TIP，如果allowBlank : false, blankText : '请输入电话号码',  才能显示。
});

/*******************根据服务目录树ID，获得相应节点下的所有服务条目************/
function loadGrid(nodeId) {
	var pageSize = 20;
	var listUrl = "../../list/servlist.do";
	var resultStoreFields = ['serviceName', 'serviceDesc', 'callCount', 'publishDate', 'serviceId', 'auditStatus'];
	//取得JSON数据存储器
	resultStore = new Ext.data.JsonStore({ 
		autoLoad : true,
		baseParams : {
			m : 'servlist',
			id : nodeId,
			start : 0,
			limit : pageSize
		},
		listeners : {
			load: function(obj, records, options) {
			    var recordArray = [];
			    if (parent.allSelectArray.length > 0) {
			        var flag = 0;
			        var len = parent.allSelectArray.length;
			        for (var j = 0; j < records.length; j++) {
			            for (var i = 0; i < len; i++) {
			                if (parent.allSelectArray[i].data.serviceId == records[j].data.serviceId) {
			                    recordArray.push(records[j]);
			                    flag++;
			                    break;
			                }
			            }
			            if (flag >= len) {
			                break;
			            }
			        }
			    };
			    sm.selectRecords(recordArray);
			},
			exception : function(dataProxy, type, action, options,
					response, arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('数据加载异常', "加载服务列表失败，请联系管理员！");
				}
			}
		},
		id : 'resultStore',
		url : listUrl,
		root : 'list',		//返回的JSON数据中，列数据的键名称
		totalProperty : 'count',//总共XX条的对应JSON键名
		fields : resultStoreFields, //字段，必须与列的dataIndex相匹配
		// 定义默认以publishDate字段，降序排列
		sortInfo : {
			field : "publishDate",
			direction : "DESC"
		}
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:false,	//只能选择一行
		listeners: {
			rowselect: function(obj, rowIndex, record) {
				//判断该行是否允许选中
				//smRowselect(obj, rowIndex, record);
				//选中时将记录放入一个数组中，以实现翻页保持选中
				for(var i = 0; i < parent.allSelectArray.length; i++){
            		if(record.data.serviceId == parent.allSelectArray[i].data.serviceId){
            			return ;
            		}
            	}
				parent.allSelectArray.push(record);
            },
            //反选时，从选中数组中删除相应记录
            rowdeselect: function(obj, rowIndex, record){
            	for(var i = 0; i < parent.allSelectArray.length; i++){
            		if(record.data.serviceId == parent.allSelectArray[i].data.serviceId){
            			parent.allSelectArray.splice(i, 1);
            			return ;
            		}
            	}
            }
        }
	}) ;
	// 当sm被选中时触发，取消当前行选择，状态为""(初始状态)或者"Z"(驳回状态，可以再申请)时才可以被选中。
	function smRowselect(obj, rowIndex, record){
		var auditStatus = record.get('auditStatus') ;
		if(auditStatus != '' && auditStatus != 'Z'){
			obj.deselectRow(rowIndex) ;
		} ;
	}
	
//	列模型数组对象
	var colArray = [new Ext.grid.RowNumberer(), {
		header : '服务名称',
		dataIndex : 'serviceName',
		width : 2,
		renderer : isAppliedRenderer,
		sortable : true
	}, {
		header : '服务描述',
		dataIndex : 'serviceDesc',
		width : 2,
		renderer : rendererNull,
		sortable : true
	}, {
		header : '访问量',
		dataIndex : 'callCount',
		width : 1,
		renderer : rendererNull,
		sortable : true
	}, {
		header : '发布日期',
		dataIndex : 'publishDate',
		width : 1,
		renderer : rendererNull,
		sortable : true
	}, {
		header : 'ID',
		dataIndex : 'serviceId',
		hidden : true
	}, {
		header : '申请状态',
		dataIndex : 'auditStatus',
		hidden : true
	}];
	
	//	如果用户已登陆且是RDP平台用户，则显示服务选择框，否则不显示
	if(window.parent.rdpUserName && window.parent.rdpUserOrg){
		colArray.unshift(sm) ;	//在数组最前面插入一个数据（选择模型）
		$("#servlisttitle").html($("#servlisttitle").html() + "<font color=#FDAF3A>(未申请列表)</font>") ;	//登陆后提示用户显示的是所有未申请服务
	}
	
	// 列表显示的字段
	var cm = new Ext.grid.ColumnModel(colArray);
	
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
//		title : nodeName + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;小提示：双击服务每行,查看服务详情。",
		store : resultStore,
		cm : cm,
		sm : sm,
		trackMouseOver : true, //当鼠标移上行时，行变色
		forceLayout : true,
		frame : false,		//是否显示frame有边框
		border : false,		//是否显示行的边框
		width : '100%',
		height : 582,
		columnLines : true,		//列与列之间的分隔线
		stripeRows : true,	//行以斑马线显示
		viewConfig : {
			forceFit : true	//自动填充满父窗口
		},
		// 分页栏
		bbar : pagingToolbar,
		renderTo : 'serlist'	//显示的位置，指定DIV的ID值
	});
	
	// 双击事件
	resultTable.addListener('rowdblclick', rowdblclickFn);
	function rowdblclickFn(grid, rowindex, e) {
		// 获取请求数据里双击这一条服务的主键ID值，其中id必须显示在表格中，如果不需要显示，可以设置属性hidden:true将其隐藏。
		var servId = resultStore.getAt(rowindex).data.serviceId ;
		// 为config-serv-tabinfo.js中函数，为了方便目录页面共用。
		showinf(servId, '../../list/servinfo.do', 'serlist');	
	}
	
};

//js获取url参数值 正则表达式法,实现HTML之间利用url传递值
function getParaString(name)
{
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
	{
		return unescape(r[2]);  //解码操作
	}
	return null;
}

//格式化空值
function rendererNull(value, metadata, record, rowIndex, colIndex,
		store) {
	if (value == "") {
		return "无";
	}else{
		return value;
	}
}

//格式化申请状态，将“已申请”的服务项加上【已申请字样】，状态为""(初始状态)或者"Z"(驳回状态，可以再申请)时才可以被选中。
function isAppliedRenderer(value, metadata, record, rowIndex, colIndex,
		store) {
	var auditStatus = record.get('auditStatus') ;
	if(auditStatus != '' && auditStatus != 'Z'){
		return '<span style="color:#F99902;">[已申请]</span>' + value ;
	}else{
		return value;
	} ;
}