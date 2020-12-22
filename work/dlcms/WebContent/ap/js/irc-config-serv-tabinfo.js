var tempHtml ;
//弹出窗口中Tab对象
var inftabsType1 ;
//弹出窗口对象
var ircInfodetailWindow ;
//用来保存一条服务的详细内容(json对象)
var servInfo ;
//requestParameter表格的HTML字符串
var xtsrHtmlType1 = '<table border="1"><tr><th id="t11">名  称</th><th id="t12">描  述</th><tr>';
var xtsrHtml1 = '<table border="1"><tr><th>字段名</th><th>字段类型</th><th>字段长度</th><th>字段描述</th><tr>';
var xtsrHtml2 = '</table>';
//yysr表格的HTML字符串
//var yysrHtml1 = '<table border="1"><tr><th id="t21">名称</th><th id="t22">类型</th><th id="t23">是否必须</th><th id="t24">示例值</th><th id="t25">默认值</th><th id="t26">描述</th><tr>';
//responseParameter表格的HTML字符串
//var fhjgHtml1 = '<table border="1"><tr><th id="t31">名称</th><th id="t32">类型</th><th id="t33">是否必须</th><th id="t34">示例值</th><th id="t35">描述</th><tr>';

// 新建弹出窗口中的TAB面板，适用于数据资源类型1
function newInftabsType1() {
	inftabsType1 = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		bodyStyle: "font-size:13px;",
		items : [ {
			id : 'pubinfo',
			title : '资源发布信息',
			cls : [ 'sinfotab' ],
			autoScroll : true,
			html : ''
		}, {
			id : 'tableinfo',
			title : '资源表字段详情',
			cls : [ 'sinfotab' ],
			autoScroll : true,
			html : ''
		}]
	});
}

// 新建弹出的窗口
function irc_newDetailWindow(content) {
	ircInfodetailWindow = new Ext.Window({
		title : '',
		cls : [ 'extwindowbg' ],
		frame: false,
		layout : 'fit',
		width : 600,
		height : 300,
		closeAction : 'close', // *比较关键* 关闭窗口时，窗口对也关闭，不保留，如果值为"hide"，则窗口对象是隐藏的，对象一直存在。
		autoScroll : true,
		plain : true,
		modal : true,
		resizable : true,
		items : content
	});
}

// 显示服务详情
var irc_showinf = function(servName, servId, servType, getServInfoURL, animEl) {
	$.post(getServInfoURL, {		//getServInfoURL:根据服务ID获取服务详情的URL
		id : servId,
		servType : servType
	}, function(data) {
		servInfo = eval('(' + data + ')') ;
		if(!servInfo.success){
			Ext.MessageBox.show({
				title : '详情提示',
				msg : "查询详情失败  [" + servInfo.error + "]",
				buttons : {
					ok : '确定'
				},
				animEl : animEl
			});
			return;
		}
		servInfo = servInfo.data ;
		if(servType == '1'){
			newInftabsType1() ;
			irc_newDetailWindow(inftabsType1) ;
			//pubinfo表格的HTML内容字符串拼接--资源发布信息
			tempHtml = xtsrHtmlType1;
			var pubinfoParameter = servInfo.dataTableInfoBean ? servInfo.dataTableInfoBean : '' ;
			tempHtml += '<tr><td>资源名称</td><td>' + servInfo.text +'</td>' ;
			tempHtml += '<tr><td>资源类型</td><td>' + renderRestype(servInfo.type) +'</td>' ;
			tempHtml += '<tr><td>数据库表名</td><td>' + pubinfoParameter.tableName +'</td>' ;
			tempHtml += '<tr><td>资源生成日期</td><td>' + formatDate(servInfo.addTime) +'</td>' ;
			tempHtml += '<tr><td>资源失效日期</td><td>' + formatDate(servInfo.disabletime) +'</td>' ;
			tempHtml += xtsrHtml2;
			inftabsType1.findById('pubinfo').html = tempHtml ;
			
			//tableinfo表格的HTML内容字符串拼接--资源表字段详情
			tempHtml = xtsrHtml1;
			var tableinfoParameter = servInfo.dataTableInfoBean.dataColumnInfoBeans ? servInfo.dataTableInfoBean.dataColumnInfoBeans : '' ;
			for(var i = 0; i < tableinfoParameter.length; i++){
				tempHtml += '<tr><td>' + tableinfoParameter[i].columnname +'</td><td>' + tableinfoParameter[i].columntype +'</td><td>' + tableinfoParameter[i].columnlen +'</td><td>' + tableinfoParameter[i].columndes +'</td></tr>' ;
			}
			tempHtml += xtsrHtml2;
			inftabsType1.findById('tableinfo').html = tempHtml ;
		} else if(servType == '2'){
			Ext.MessageBox.show({
				title : '详情提示',
				msg : "文件资源无详情展示。",
				buttons : {
					ok : '确定'
				},
				animEl : animEl
			});
			return;
		} else if(false){
			var infHTMLType4_01 = '<table border="1"><tr><th class="t11">名  称</th><th class="t12">项 目 值</th><tr>';
			var infHTMLType4_02 = '<tr><td class="t13">类型名称:</td><td>' + servInfo.mc + '</td></tr>';
			var infHTMLType4_03 = '<tr><td class="t13">资源绝对路径:</td><td>' + servInfo.dirname + '</td></tr>';
			var infHTMLType4_04 = '<tr><td class="t13">FTP用户名:</td><td>' + servInfo.user + '</td></tr>';
			var infHTMLType4_05 = '<tr><td class="t13">FTP密码:</td><td>' + servInfo.pwd + '</td></tr>';
			var infHTMLType4_06 = '<tr><td class="t13">FTP端口:</td><td>' + servInfo.port + '</td></tr>';
			var infHTMLType4_07 = '<tr><td class="t13">FTP地址:</td><td>' + servInfo.address + '</td></tr>';
			var infHTMLType4_00 = '</table>';
			
			infHTMLType4 = infHTMLType4_01 + infHTMLType4_02 + infHTMLType4_03 + infHTMLType4_04 + infHTMLType4_05 + infHTMLType4_06 + infHTMLType4_07 + infHTMLType4_00 ;
			var infPannelType4 = new Ext.Panel({
				border : false,
				cls : 'ircinfo4',
				html : infHTMLType4
			});
			irc_newDetailWindow(infPannelType4) ;
		}else if(false){
			var infHTMLType6_01 = '<table border="1"><tr><th class="t11">名  称</th><th class="t12">项 目 值</th><tr>';
			var infHTMLType6_02 = '<tr><td class="t13">类型名称:</td><td>' + servInfo.mc + '</td></tr>';
			var infHTMLType6_03 = '<tr><td class="t13">资源名称:</td><td>' + servInfo.pubname + '</td></tr>';
			var infHTMLType6_04 = '<tr><td class="t13">资源文件名:</td><td>' + servInfo.file + '</td></tr>';
			var infHTMLType6_05 = '<tr><td class="t13">绝对路径:</td><td>' + servInfo.path + '</td></tr>';
			var infHTMLType6_00 = '</table>';
			
			infHTMLType6 = infHTMLType6_01 + infHTMLType6_02 + infHTMLType6_03 + infHTMLType6_04 + infHTMLType6_05 + infHTMLType6_00 ;
			var infPannelType6 = new Ext.Panel({
				border : false,
				cls : 'ircinfo4',
				html : infHTMLType6
			});
			irc_newDetailWindow(infPannelType6) ;
		}else{
			return;
		}
		//修改标题
		ircInfodetailWindow.setTitle("&nbsp;" + servName + "--详细信息") ;
		// 显示窗口
		ircInfodetailWindow.show();
		tempHtml = '' ;
	});
};

//长型日期及空值转换
function formatDate(dateValue) {
	var date = new Date(dateValue);
	return date.format('Y-m-d');
}

//格式化'数据类型'
function renderRestype(resType) {
	if (resType == "1") {
		return "数据库资源";
	} else if (resType == "2") {
		return "文件资源";
	}else{
		return "类型" + resType;
	}
}
		
