var tempHtml ;
//弹出窗口中Tab对象
var inftabs ;
//弹出窗口对象
var detailWindow ;
//用来保存一条服务的详细内容(json对象)
var servInfo ;
//requestParameter表格的HTML字符串
var xtsrHtml1 = '<table border="1"><tr><th id="t11">参数名称</th><th id="t12">参数类型</th><th id="t13">参数描述</th><th id="t14">备注</th><tr>';
var xtsrHtml2 = '</table>';
//yysr表格的HTML字符串
//var yysrHtml1 = '<table border="1"><tr><th id="t21">名称</th><th id="t22">类型</th><th id="t23">是否必须</th><th id="t24">示例值</th><th id="t25">默认值</th><th id="t26">描述</th><tr>';
//responseParameter表格的HTML字符串
//var fhjgHtml1 = '<table border="1"><tr><th id="t31">名称</th><th id="t32">类型</th><th id="t33">是否必须</th><th id="t34">示例值</th><th id="t35">描述</th><tr>';

// 新建弹出窗口中的TAB面板
function newInftabs() {
	inftabs = new Ext.TabPanel({
		activeTab : 0,
		enableTabScroll : true,
		bodyStyle: "font-size:13px;",
		items : [ {
			id : 'requestParameter',
			title : '请求参数',
			cls : [ 'sinfotab', 'xtsrtab' ],
			autoScroll : true,
			html : ''
		}, {
			id : 'responseParameter',
			title : '响应参数',
			cls : [ 'sinfotab' ],
			autoScroll : true,
			html : ''
		}, {
			id : 'url',
			title : '发布地址',
			cls : [ 'sinfotab', 'textConPadding' ],
			autoScroll : true,
			html : ''
		}, {
			id : 'demoCode',
			title : '示例代码',
			cls : [ 'sinfotab', 'demoCode' ],
			autoScroll : true,
			html : ''
		}, {
			id : 'desc',
			title : '服务描述',
			cls : [ 'sinfotab', 'textConPadding' ],
			autoScroll : true,
			html : ''
		}]
	});
}

// 新建弹出的窗口
function newDetailWindow() {
	detailWindow = new Ext.Window({
		title : '',
		frame: false,
		layout : 'fit',
		width : 600,
		height : 400,
		closeAction : 'close', // *比较关键* 关闭窗口时，窗口对也关闭，不保留，如果值为"hide"，则窗口对象是隐藏的，对象一直存在。
		autoScroll : true,
		plain : true,
		modal : true,
		resizable : true,
		items : [ inftabs ]
	});
}

// 显示服务详情
var showinf = function(servId, getServInfoURL, animEl) {
	$.get(getServInfoURL, {		//getServInfoURL:根据服务ID获取服务详情的URL
		id : servId
	}, function(data) {
		servInfo = eval('(' + data + ')') ;
		if(servInfo.success != true){
			Ext.MessageBox.show({
				title : '详情提示',
				msg : "查询详情失败  [" + servInfo.msg + "]",
				buttons : {
					ok : '确定'
				},
				animEl : animEl
			});
			return;
		}
		servInfo = servInfo.data ;
		newInftabs() ;
		newDetailWindow() ;
		//服务描述
		inftabs.get('desc').html = servInfo.desc ;		//get方法与findById方法都可以。
		
		//requestParameter表格的HTML内容字符串拼接--请求参数
		tempHtml = xtsrHtml1;
		var requestParameter = servInfo.requestParameter ? eval("(" + servInfo.requestParameter + ")") : '' ;
		for(var i = 0; i < requestParameter.length; i++){
			tempHtml += '<tr><td>' + requestParameter[i].name +'</td><td>' + requestParameter[i].dataType +'</td><td>' + requestParameter[i].dataDescs +'</td><td>' + requestParameter[i].remarks +'</td></tr>' ;
		}
		tempHtml += xtsrHtml2;
		inftabs.findById('requestParameter').html = tempHtml ;
		
		//responseParameter表格的HTML内容字符串拼接--响应参数
		tempHtml = xtsrHtml1;
		var responseParameter = servInfo.responseParameter ? eval("(" + servInfo.responseParameter + ")") : '' ;
		for(var i = 0; i < responseParameter.length; i++){
			tempHtml += '<tr><td>' + responseParameter[i].name +'</td><td>' + responseParameter[i].dataType +'</td><td>' + responseParameter[i].dataDescs +'</td><td>' + responseParameter[i].remarks +'</td></tr>' ;
		}
		tempHtml += xtsrHtml2 ;
		inftabs.findById('responseParameter').html = tempHtml ;
		
		//发布地址
		inftabs.findById('url').html = "URL: " + servInfo.publishUrl ;
		//示例代码
		var demoCode = '<div style="width:99.5%;border:1px #e3e3e3 solid;"><div style="width:100%;font-family:' + "'" +  'Consolas' + "'" +  ', ' + "'" +  'Courier New' + "'" +  ';font-size:12px;border-bottom:1px solid #e3e3e3;margin-top:5px;color:#000000;">&nbsp;Java 代码&nbsp;</div><table style="width:100%;font-family:' + "'" +  'Consolas' + "'" +  ', ' + "'" +  'Courier New' + "'" +  ';font-size:12px;vertical-align:text-top;line-height:15px;" border="0" cellspacing="0" cellpadding="0"><tr><td style="color:#008284;background-color:#e3e3e3;vertical-align:text-top;"><div style="margin:7px;text-align:right;white-space:nowrap;"><nobr>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br></nobr></div></td><td style="background-color:#008284;padding:1px;"><div style="border:1px #008284 solid;"></div></td><td style="background-color:#efefef;width:100%;vertical-align:text-top;color:#000000;"><div style="margin:7px;"><span style="color:#0000ff;">public</span><span style="color:#000000;">&nbsp;</span><span style="color:#8000ff;">String</span><span style="color:#000000;">&nbsp;interfaceTest()<BR>{<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#8000ff;">String</span><span style="color:#000000;">&nbsp;responseMsg&nbsp;=&nbsp;</span><span style="color:#800000;">""</span><span style="color:#000000;">;<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;1.构造HttpClient的实例<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;HttpClient&nbsp;httpClient&nbsp;=&nbsp;</span><span style="color:#0000ff;">new</span><span style="color:#000000;">&nbsp;HttpClient();<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;用于测试的http接口的url<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#8000ff;">String</span><span style="color:#000000;">&nbsp;url&nbsp;=&nbsp;</span><span style="color:#800000;">"http://localhost:8080/UpDown/httpServer?param1="<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#000000;">&nbsp;+&nbsp;param1&nbsp;+&nbsp;</span><span style="color:#800000;">"&amp;param2="</span><span style="color:#000000;">&nbsp;+&nbsp;param2;<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;2.创建GetMethod的实例<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;GetMethod&nbsp;getMethod&nbsp;=&nbsp;</span><span style="color:#0000ff;">new</span><span style="color:#000000;">&nbsp;GetMethod(url);<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;使用系统系统的默认的恢复策略<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,<br/>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#0000ff;">new</span><span style="color:#000000;">&nbsp;DefaultHttpMethodRetryHandler());<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#0000ff;">try</span><span style="color:#000000;">{<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;3.执行getMethod,调用http接口<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;httpClient.executeMethod(getMethod);<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;4.读取内容<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#8000ff;">byte</span><span style="color:#000000;">[]&nbsp;responseBody&nbsp;=&nbsp;getMethod.getResponseBody();<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;5.处理返回的内容<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;responseMsg&nbsp;=&nbsp;</span><span style="color:#0000ff;">new</span><span style="color:#000000;">&nbsp;</span><span style="color:#8000ff;">String</span><span style="color:#000000;">(responseBody);<BR>&nbsp;&nbsp;&nbsp;&nbsp;}<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#0000ff;">catch</span><span style="color:#000000;">&nbsp;(HttpException&nbsp;e)<BR>&nbsp;&nbsp;&nbsp;&nbsp;{<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<BR>&nbsp;&nbsp;&nbsp;&nbsp;}<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#0000ff;">catch</span><span style="color:#000000;">&nbsp;(IOException&nbsp;e)<BR>&nbsp;&nbsp;&nbsp;&nbsp;{<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.printStackTrace();<BR>&nbsp;&nbsp;&nbsp;&nbsp;}<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#0000ff;">finally</span><span style="color:#000000;"><BR>&nbsp;&nbsp;&nbsp;&nbsp;{<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#008000;">//&nbsp;6.释放连接<BR></span><span style="color:#000000;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getMethod.releaseConnection();<BR>&nbsp;&nbsp;&nbsp;&nbsp;}<BR>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style="color:#0000ff;">return</span><span style="color:#000000;">&nbsp;responseMsg;<BR>}<BR></span></div></td></tr></table></div>' ;
		inftabs.findById('demoCode').html = demoCode ;
		//修改标题
		detailWindow.setTitle("&nbsp;" + servInfo.name + "--详细信息") ;
		// 显示窗口
		detailWindow.show().center();
		tempHtml = '' ;
	});
};
	
		
