<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map.Entry"%>
<%@page import="com.digitalchina.ldp.common.util.StringUtils"%>
<html>
<head>
<title>委办局原始数据管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
</head>
</html>
<%
	String formId = request.getParameter("formId");
	String showQuryPanel = request.getParameter("showQuryPanel");
	String showHintPanle = request.getParameter("showHintPanle");
	String hintString = request.getParameter("hintString");
	if (hintString == null) {
		hintString = "";
	}
	if (StringUtils.isEmpty("formId")) {
		formId = "formId";
	}
	int start = 0;
	int limit = 20;
	String title = request.getParameter("title");
	String divId = request.getParameter("divId");
	String columnList = request.getParameter("columnList");
	String gridId = request.getParameter("gridId");
	String url = request.getParameter("url");
	String gridName = request.getParameter("gridName");
	if (StringUtils.isEmpty(url)) {
		url = "#";
	}
	if (StringUtils.isEmpty(gridId)) {
		gridId = "girdId";
	}
	//配置表头信息
	String columnConfig = request.getParameter("columnConfig");
	//是否显示CheckBox
	boolean isShowCheckBox = false;
	if (!StringUtils.isEmpty(request.getParameter("isShowCheckBox"))) {
		if (request.getParameter("isShowCheckBox").equals("true")) {
			isShowCheckBox = true;
		}
	}
	boolean isShowNumber = true;
	if (!StringUtils.isEmpty(request.getParameter("isShowNumber"))) {
		if (request.getParameter("isShowNumber").equals("false")) {
			isShowCheckBox = false;
		}
	}
	if (!StringUtils.isEmpty(request.getParameter("start"))) {
		start = StringUtils.toNum(request.getParameter("start"));
	}

	if (!StringUtils.isEmpty(request.getParameter("limit"))) {
		limit = StringUtils.toNum(request.getParameter("limit"));
	}
	//是显示表格顶部工具条，默认不显示
	boolean isShowToolBar = false;
	if (!StringUtils.isEmpty(request.getParameter("isShowToolBar"))) {
		if (request.getParameter("isShowToolBar").equals("true")) {
			isShowToolBar = true;
		}
	}
	StringBuffer table = new StringBuffer();
	/* table.append("<div class='notification information png_bg'>") ; */
	/*table.append("<a href='javascript:void(0)' class='closetip' onclick='closetip()'><img src='images/cross_grey_small.png' title='Close this notification' alt='close'></a>");
	*/
	table.append("<div class='tipcontent'>");
	table.append("查询所要监控的服务器的网络、数据库等各项运行状态。");
	//table.append("Information notification. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate, sapien quis fermentum luctus, libero.");
	table.append("</div>");
	String grid_height = "0";
	/* String title_height = "31";
	if (title == null) {
		title_height = "31";
	} */
	if ("true".equals(showQuryPanel)) {
		grid_height = "screen_height - 93";
	} else {
		grid_height = "screen_height";
	}
	if ("true".equals(showHintPanle)) {
		grid_height = grid_height + " - 30";
	}
%>
<script language="javascript">
	//浏览器显示窗口尺寸
	var screen_width;
	var screen_height;
	$(function(){
		screen_width = getScreen_width() ;
		screen_height = getScreen_height() ;
	});
	
	// 全局变量
	var gridStore;
	var queryForm;
	var gridpanel = initGrid();
	var sm;

function init()
{
	Ext.QuickTips.init();
	var panel=new Ext.Panel({
		frame:false,
		border:false,
		applyTo:"<%=divId%>",
		bodyStyle: 'background-color: #DFE8F6;',
		items:[<%="true".equals(showHintPanle) ? "createHintPanle()," : ""%><%="true".equals(showQuryPanel) ? "initQueryForm()," : ""%>initGrid()]
	});
}
function createHintPanle()
{
	var panel=new Ext.Panel({
			border:false,
			height:30,
			cls : 'notification information png_bg',
			html : "<%=table.toString()%>"
		});
	return panel;
}
function createToolBar()
{
	var toolbar = new Ext.Toolbar({
		
		
	});
	
	return toolbar;
}
function initGrid()
{
	// 选择模型
	sm = new Ext.grid.CheckboxSelectionModel();
	
	//创建gridStroe
	gridStore = new Ext.data.Store(
		{autoLoad :{params :{start :<%=start%>,limit :<%=limit%>}},
		successProperty : 'success',
		listeners :
		{
			exception : function(dataProxy, type, action, options,
					response, arg)
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
		}, 
		Ext.data.Record.create(<%=columnList%>)),
		proxy : new Ext.data.HttpProxy({url :"<%=url%>"})
	});
	//创建grid
	var <%=gridName == null ? "gridPanel" : gridName%> = new Ext.grid.GridPanel(
	{

		frame : false,
		border : false,
		loadMask : true,
		height:<%=grid_height%>,
<%if (isShowToolBar) {%>
	tbar : createToolBar(),
<%}%>
		id : "<%=gridId%>",
		store : gridStore,
<%if (title != null) {%>
		title:'<%=title%>',
<%}%>
		viewConfig :
		{
			autoFill :true
		},
		stripeRows : true,
		sm : sm,
		bbar : new Ext.PagingToolbar(
		{
			id : 'pageT',
			pageSize :<%=limit%>,
			store : gridStore,
			displayInfo : true,
		
			emptyMsg : "没有记录",
			plugins: new Ext.ux.ProgressBarPager()
		}),
		columns : [
<%if (isShowCheckBox) {%>
		sm,<%}%>
<%if (isShowNumber) {%>
	new Ext.grid.RowNumberer(
		{
			//header : '行号',
			width : 30
		}),
<%}%><%=columnConfig%>]
	});
	return <%=gridName == null ? "gridPanel" : gridName%>;
}
//初始化查询面板
function initQueryForm()
{
	queryForm = new Ext.form.FormPanel(
	{
		id : '<%=formId%>',
		monitorResize : true,
		labelAlign : 'left',
		style: "height:85px;",
		frame : true,
		border : false,
		bodyStyle : 'padding:10px 0 0 0;background-color:#DFE8F6;',
		buttons:[],
		buttonAlign:"center"
	});
	return queryForm;
};
function closetip(){
	$(".close").parent().parent().parent().fadeTo(400, 0, function () { // Links with the class "close" will close parent
		$(".close").parent().parent().parent().slideUp(400);
	});
	if(Ext.getCmp('<%=gridId%>')){
		setTimeout(function(){
			Ext.getCmp('<%=gridId%>').setHeight(<%=grid_height%> + 36) ;
			Ext.getCmp('<%=gridId%>').doLayout() ;
		},900) ;
	}
	//当关闭提示栏时，重置表格的高度，让其重新渲染
	return false;
};
</script>