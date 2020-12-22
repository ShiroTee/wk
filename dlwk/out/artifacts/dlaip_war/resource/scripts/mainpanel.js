var limit =50;
var pageSize =50;
//提示组件
var tipCmp ;
//查询面板组件
var queryFormCmp ;
//主面板
var mainPanelCmp ;
//表格高度
var gridHeight ;
//屏幕高度
var screen_height ;
//屏幕宽度
var screen_width ;
//获取屏幕尺寸
$(function(){
	screen_height = getScreen_height() ;
	screen_width = getScreen_width() ;
});
//初始化提示栏
function setTip(tip){
//	var tipStr1 = "<a href='javascript:void(0)' class='closetip' onclick='closetip()'><img src='images/cross_grey_small.png' title='Close this notification' alt='close'></a>" ; 
	var tipStr2 = "<div class='tipcontent'>" ;
	var tipStr3 = "</div>" ;
	var tipStr = tipStr2 + tip + tipStr3 ;
	var panel = new Ext.Panel({
		id : 'closetip',
		border:false,
		height:30,
		cls : 'notification information png_bg',
		html : tipStr
	});
	tipCmp = panel;
	return panel;
};

//构造一个FORM面板，传入表单的ID、和提交时触发的函数
function setQueryForm(formId,queryFormItems,queryFunc){
	var queryForm = new Ext.form.FormPanel({
		id : formId,
		monitorResize : true,
		labelAlign : 'left',
		items : queryFormItems,
		style: "overflow:hidden; height:90px;",
		frame : true,
		border : false,
		bodyStyle : 'padding:10px 0 0;background-color:#DFE8F6;',
		buttons:[],
		buttonAlign:"center",
		keys : [ { // 处理键盘回车事件
			key : Ext.EventObject.ENTER,
			fn : queryFunc,
			scope : this
		} ]
	});
	queryFormCmp = queryForm;
	return queryForm;
};

//创建一个主面板，里面可以放置任意组件，主要放置表格等。
function setMainPanel(divId,cmp){
	gridHeight = screen_height ;
	//首先判断，页面元素是否存在，构建mainpanel的item参数
	var mainPanelCmpItem = [] ;
	if(typeof(tipCmp) != "undefined"){
		//减去提示栏高度
		gridHeight = gridHeight - 30;
		mainPanelCmpItem.push(tipCmp);
	}
	if(typeof(queryFormCmp) != "undefined"){
		gridHeight = (gridHeight - 100) ;
		mainPanelCmpItem.push(queryFormCmp);
	}
	if(typeof(cmp) != "undefined"){
		//判断传入的cmp的类型
		if(cmp instanceof Ext.grid.GridPanel){
			cmp.setHeight(gridHeight) ;
		}else{
			var cmpArray = cmp.findByType('grid') ;
			for(var i = 0; i < cmpArray.length; i++){
//				alert(i + "+" + gridHeight) ;
				cmpArray[i].setHeight(gridHeight) ;
			}
		}
		mainPanelCmpItem.push(cmp);
	}
	//扫描本页面中作了TIP标签的元素，以当鼠标移上去时显示TIP标签
	Ext.QuickTips.init();
	//构建整个iframe主面板
	mainPanelCmp = new Ext.Panel({
		frame : false,
		border : true,
		applyTo : divId,
		width:'100%',
		bodyStyle : 'background-color: #DFE8F6;',
		items : mainPanelCmpItem
	});
}

//创建一个主面板，里面可以放置任意组件，此组件里的所有表格水平排列，高度平均分配。
function setMainPanelByHGrid(divId,cmp){
	gridHeight = screen_height ;
	//首先判断，页面元素是否存在，构建mainpanel的item参数
	var mainPanelCmpItem = [] ;
	if(typeof(tipCmp) != "undefined"){
		//减去提示栏高度
		gridHeight = gridHeight - 30;
		mainPanelCmpItem.push(tipCmp);
	}
	if(typeof(queryFormCmp) != "undefined"){
			gridHeight = (gridHeight - 100) ;
		mainPanelCmpItem.push(queryFormCmp);
	}
	if(typeof(cmp) != "undefined"){
		var cmpArray = cmp.findByType('grid') ;
		for(var i = 0; i < cmpArray.length; i++){
			cmpArray[i].setHeight(gridHeight/(cmpArray.length)) ;
		}
		mainPanelCmpItem.push(cmp);
	}
	//扫描本页面中作了TIP标签的元素，以当鼠标移上去时显示TIP标签
	Ext.QuickTips.init();
	//构建整个iframe主面板
	mainPanelCmp = new Ext.Panel({
		frame : false,
		border : true,
		render : divId,
		bodyStyle : 'background-color: #DFE8F6;',
		items : mainPanelCmpItem
	});
}

//设置表格的分页栏目
function setPaging(gridCmp){
	var pagebar = new Ext.PagingToolbar({
		xtype : "bbar",
		pageSize : pageSize,
		frame : false,
		border : false,
		width : screen_width-7,
		style   : 'border:0px solid gray;',
		store : gridCmp.getStore(),
		displayInfo : true,
		plugins: new Ext.ux.ProgressBarPager({style : "width:999px;"}),
		emptyMsg : '<span style="padding-left: 650px">没有记录</span>'
	});
	//为传入的表格添加底部分页栏
	gridCmp.getBottomToolbar().add(pagebar);
};
//设置表格的分页栏目,处理页面右边有treePanel的情况
function setPagingTwo(gridCmp){
	var pagebar = new Ext.PagingToolbar({
		xtype : "bbar",
		pageSize : pageSize,
		frame : false,
		border : false,
		width : screen_width-305,
		style   : 'border:0px solid gray;',
		store : gridCmp.getStore(),
		displayInfo : true,
		plugins: new Ext.ux.ProgressBarPager({style : "width:999px;"}),
		emptyMsg : '<span style="padding-left: 650px">没有记录</span>'
	});
	//为传入的表格添加底部分页栏
	gridCmp.getBottomToolbar().add(pagebar);
};

//设置表格的顶部工具栏
function setTbar(gridCmp,barItems) {
	gridCmp.getTopToolbar().add(barItems);
}

// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
{
	var title = "";
	var tip = value;
	metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
	return value;
};

function closetip(){
	$(".closetip").parent().parent().parent().fadeTo(400, 0, function () { 
		$(".closetip").parent().parent().parent().slideUp(400);
	});
	if(mainComponent instanceof Ext.grid.GridPanel){
		setTimeout(function(){
			mainComponent.setHeight(gridHeight + 36) ;
		},900) ;
	}else{
		var cmpArray = mainComponent.findByType('grid') ;
		for ( var i = 0; i < cmpArray.length; i++) {
//			alert(i + "+" + cmpArray[i].getHeight()) ;
			if(i == 0){
				cmpArray[i].setHeight(gridHeight + 36);
			}else{
//				cmpArray[i].setHeight(gridHeight + 36);
			}
		}
	}
	//当关闭提示栏时，重置表格的高度，让其重新渲染
	return false;
};
function dateFormat(value, metadata, record, rowIndex, columnIndex, store){
	if(value ==''){
		return '';
	}
	var dateFormat = new Date(value).format("Y-m-d")
	return dateFormat;
}

