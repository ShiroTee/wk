var loadNHserv = function(){
	var getNewServURL = "list/NHserv.do?serv=n" ;
	var getHotServURL = "list/NHserv.do?serv=h" ;
	var morenew = '<div class="moreserv"><a title="查看更多二次开发平台服务" href="unspaservlist/index.jhtml" target="_blank">更多服务 &raquo;</a></div>' ;
	//获取最新服务列表
	$.get(
		getNewServURL,
		function(resData){
			var Njson = eval("(" + resData + ")") ;
			var Nserv = Njson.data ;	//最新服务列表
//			var Hserv = NHjson.hotserv.root ;	//最热服务列表
			
			//NhtmlXX为显示最新服务的行样式
			var Ntitle = '<tr><th class="th1">服务名称</th><th class="th2">服务描述</th><th class="th3">发布日期</th></tr>' ;
			var NhtmlArray = [
			'<tr><td class="td1"><a title="',
			'" href="javascript:void(0);" onclick="showinfo(',
			')">' ,
			'</a></td><td><span title="' ,
			'">',
			'</span></td><td><span>' ,
			'</span></td></tr>' ,
			];
			//加入标题行
			$(Ntitle).appendTo("#newserv") ;
			if(Njson.success != true) return;	//读取接口失败
			//根据返回的数据，循环加载每一条服务
			for(var i = 0; i < Nserv.length & i < 10; i++){
				var linecolor = '<tr class="linecol"><td class="td1"><a title="' ;
				var Nhtmlul = ((i%2?false:true)?linecolor:NhtmlArray[0])
						+ Nserv[i].serviceName
						+ NhtmlArray[1]
						+ "'"
						+ Nserv[i].serviceId
						+ "'"
						+ NhtmlArray[2]
						+ (Nserv[i].serviceName.length > 9 ? (Nserv[i].serviceName
								.substr(0, 9) + "...")
								: Nserv[i].serviceName)
						+ NhtmlArray[3]
						+ Nserv[i].serviceDesc
						+ NhtmlArray[4]
						+ ((!Nserv[i].serviceDesc || Nserv[i].serviceDesc == "") ? "无"
								: (Nserv[i].serviceDesc.length > 9 ? (Nserv[i].serviceDesc
										.substr(0, 9) + "...")
										: Nserv[i].serviceDesc))
						+ NhtmlArray[5] + Nserv[i].publishDate
						+ NhtmlArray[6];
				$(Nhtmlul).appendTo("#newserv") ;
			}
			//$(morenew).appendTo("#newserv") ;
			
			
		}
	) ;
	
	//获取最热服务列表
	$.get(
		getHotServURL,
		function(resData){
			var Hjson = eval("(" + resData + ")") ;
			var Hserv = Hjson.data ;//最新服务列表
			
			//HhtmlXX为显示最热服务的行样式
			var Htitle = '<tr><th class="th4">服务名称</th><th class="th5">访问热度</th><th class="th3">发布日期</th></tr>' ;
			var HhtmlArray = [
			      			'<tr><td class="td1"><a title="',
			    			'" href="javascript:void(0);" onclick="showinfo(',
			    			')">' ,
			    			'</a></td><td><span>',
			    			'</span></td><td><span>' ,
			    			'</span></td></tr>' ,
			    			];
			//加入标题行
			$(Htitle).appendTo("#hotserv") ;
			if(Hjson.success != true) return;	//读取接口失败
			//根据返回的数据，循环加载每一条服务
			for(var i = 0; i < Hserv.length & i < 10; i++){
				var linecolor = '<tr class="linecol"><td class="td1"><a title="' ;
				var Hhtmlul = ((i%2?false:true)?linecolor:HhtmlArray[0]) + Hserv[i].serviceName
						+ HhtmlArray[1] + "'" + Hserv[i].serviceId
						+ "'" + HhtmlArray[2]
						+ (Hserv[i].serviceName.length > 12 ? (Hserv[i].serviceName
								.substr(0, 12) + "...")
								: Hserv[i].serviceName)
						+ HhtmlArray[3]
						+ Hserv[i].callCount + HhtmlArray[4]
						+ Hserv[i].publishDate + HhtmlArray[5];
				$(Hhtmlul).appendTo("#hotserv") ;
			}
			//$(morenew).appendTo("#hotserv") ;
		}
	);
};

//点击服务名称时触发，调用config-serv-tabinfo.js中函数。
function showinfo(servId){
	showinf(servId , 'list/servinfo.do', 'tab');
};