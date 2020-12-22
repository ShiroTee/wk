var url2 = {
    rktj:"/service/api/csdsc/statisticChartHandler/getRktjCount?starDate=1990/01/01&stopDate=2222/01/01",
    frxx: "/service/api/csdsc/statisticChartHandler/getFrxxCount?xzqh=",
    jjsj:"/service/api/csdsc/statisticChartHandler/getJjsjCount?zblx=经济数据&zbnd=",
    rjsr: "/service/api/csdsc/statisticChartHandler/getRjsrzcCount",
    shxfp:"/service/api/csdsc/statisticChartHandler/getShxfpCount",
    rknltj:"/service/api/csdsc/statisticChartHandler/getRknltj",
    rkqrqc:"/service/api/csdsc/statisticChartHandler/getRkqrqc",
    qyfbxx:"/service/api/csdsc/statisticChartHandler/getQyfbxx",
    sletzxs:"/service/api/csdsc/statisticChartHandler/getSletzxs",
    lkzdlgxx:"/service/api/csdsc/statisticChartHandler/getlkzdlgxx"
};
function getURL(index){
    return biBaseUrl + url2[index];
}

function showhgjj(data,title,index,depth){
	$("#countxx").show();
	$("#div_fl").hide();
	$("#div_xzqh").hide();
	$("#div_nd").show();
	$("#div_qyfbdl").hide();
	$("#div_qyfbxxnd").hide();
	$("#div_kssj").hide();
	$("#div_jssj").hide();
	$("#openZdy").show();
	$("#return").show();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] =  title;
	PRO[1] = ['万元'];
	
	var QU = {};
	QU["name"] = '万元';
	QU["type"] = 'bar';
	var QUARR = new Array();

	if($("#zdyradio01"
			).is(':checked')){
		var k = 0;
		var n = 0;
		$('input[name="checkboxN"]:checked').each(function(){
			QUS[k] = {};
			QUS[k]["name"] = $(this).val();
			QUS[k]["type"] = 'bar';
			QUS[k]["data"] = new Array();	
			k++;
			
			for(var i=0; i < data.length;i++){
				if($(this).val() == data[i].ZBQC){
					if(QD.indexOf(data[i].ZBND) == -1){
						QD[n] = data[i].ZBND;
						n++;
					}
				}
			}
		});
		
		for(var i=0;i < data.length;i++){
			for(var x=0;x<QUS.length;x++){
				if(QUS[x]["name"] == data[i].ZBQC){
					for(var y=0;y<QD.length;y++){
						if(QD[y] == data[i].ZBND){
							QUS[x]["data"][y] = data[i].DQZ;
						}
					}
				}
			}
		}
		
	}else{
		var j=0;
		if(title == '经济数据信息图'){
			for(var i=0; i < data.length;i++){
				if($("#" + data[i].ZBQC + "").is(':checked')){
					QUARR[j] = data[i].DQZ;
					QD[j] =  data[i].ZBQC;
					j++;
				}
			}
		}else{
			for(var i=0; i < data.length;i++){
				QUARR[i] = data[i].DQZ;
				QD[i] =  data[i].ZBQC;
			}
		}
		QU["data"] = QUARR;	
		QUS[0] = QU;

	}
	$("#zdyDate").html($("#nd_select").html());

	var text=$("#nd_select").val();
	$("#zdyDate").find("option[text='"+text+"']").attr("selected",true);
	 $(":radio[name='zdy']").click(function(){
		 if($(this).val()=="按时间分类"){
			 $("#zdyDate").attr("disabled",true);    
			 $("#nd_select").attr("disabled",true);    
		 }
		 else{
			 $("#zdyDate").attr("disabled",false);    
			 $("#nd_select").attr("disabled",false);    
		 }
	 });
	if(depth == 1 || depth == 4) {
		initBarChart(PRO, QD, QUS, index, depth);
	}else if(depth == 2){
		PRO[2] = data[0].ZBQC;
		QD = new Array();
		for(var i=0; i < data.length;i++){
			QD[i] =  data[i].ZBND;
		}
		initBarChart(PRO, QD, QUS, index, depth);
	}else{
		var piQU = new Array();

		for(var i=0; i < data.length;i++){
			var QUC = {};
			QUC["value"] = data[i].DQZ;
			QUC["name"] = QD[i];
			piQU[i] = QUC;
		}

		initPieChart(PRO,QD,piQU,index,depth);
	}

}

function shownzxt(data,title){
	$("#countxx").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] =  title;
	PRO[1] = '男';
	PRO[2] = '女';
	PRO[3] = '所有';
	var QU1 = {};
	var QU2 = {};
	var QU3 = {};
	QU1["name"] = '男';
	QU1["type"] = 'line';
	QU2["name"] = '女';
	QU2["type"] = 'line';
	QU3["name"] = '所有';
	QU3["type"] = 'line';
	var QUARR1 = new Array();
	var QUARR2 = new Array();
	var QUARR3 = new Array();
	for(var i=0; i < data.length;i++){
		QUARR1[i] = data[i].MAN;
		QUARR2[i] = data[i].WOMAN;
		QUARR3[i] = data[i].ALLCOUNT;
		QD[i] =  data[i].NLD;
	}
	QU1["data"] = QUARR1;
	QU2["data"] = QUARR2;
	QU3["data"] = QUARR3;
	QUS[0] = QU1;
	QUS[1] = QU2;
	QUS[2] = QU3;
	initLineChart(PRO,QD,QUS);
}

function showndjj(data,title){
	$("#countxx").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] =  title;
	PRO[1] = '万元';
	
	var QU = {};
	QU["name"] = '万元';
	QU["type"] = 'bar';
	var QUARR = new Array();
	
	for(var i=0; i < data.length;i++){
		QUARR[i] = data[i].DQZ;
		QD[i] =  data[i].ZBND;
	}
	QU["data"] = QUARR;
	QUS[0] = QU;
	initBarChart(PRO,QD,QUS);
}

function showfrtj(data){
	$("#countxx").show();
	$("#div_fl").hide();
	$("#div_xzqh").show();
	$("#div_nd").hide();
	$("#div_qyfbdl").hide();
	$("#div_qyfbxxnd").hide();
	$("#div_kssj").hide();
	$("#div_jssj").hide();
	$("#openZdy").hide();
	$("#return").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] = '法人信息统计图';
	PRO[1] = '数量';
	
	var QUS = new Array();
	
	for(var i=0; i < data.length;i++){
		var QUC = {};
		QUC["value"] = data[i].NUM;
		QUC["name"] = data[i].FRLXMC;
		QUS[i] = QUC;
		QD[i] =  data[i].FRLXMC;
	}
    initPieChart(PRO,QD,QUS);
}

function showrktj(data){
	$("#countxx").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] = '人口统计信息图';
	PRO[1] = ['男','女'];
	var QUN = {};
	var QUV = {};
	QUN["name"] = '男';
	QUN["type"] = 'bar';
	QUV["name"] = '女';
	QUV["type"] = 'bar';
	var jn = 0;
	var jv = 0;
	var QUNARR = new Array();
	var QUVARR = new Array();
	
	for(var i=0; i < data.length;i++){
		if(data[i].XB == '男'){
			QUNARR[jn] = data[i].NUM;
			QD[jn] =  data[i].QHMC;
			jn ++ ;
		}else if(data[i].XB == '女'){
			QUVARR[jv] =  data[i].NUM;
			jv ++ ;
		}
	}
	QUN["data"] = QUNARR;
	QUV["data"] = QUVARR;
	QUS[0] = QUN;
	QUS[1] = QUV;
	initBarChart(PRO,QD,QUS);
	
}

function showqrqc(data){
	$("#countxx").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] = '人口迁入、迁出统计图';
	PRO[1] = ['迁入','迁出'];
	
	var QUN = {};
	var QUV = {};
	QUN["name"] = '迁入';
	QUN["type"] = 'bar';
	QUV["name"] = '迁出';
	QUV["type"] = 'bar';

	var QUNARR = new Array();
	var QUVARR = new Array();
	
	for(var i=0; i < data.length;i++){
		QD[i] =  data[i].ND;
		QUNARR[i] = data[i].QR;
		QUVARR[i] =  data[i].QC;
	}
	QUN["data"] = QUNARR;
	QUV["data"] = QUVARR;
	QUS[0] = QUN;
	QUS[1] = QUV;
	initBarChart(PRO,QD,QUS);
	
}

function showsrzc(data){
	$("#countxx").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] = '人均收入支出信息图';
	//PRO[1] = '元/人';
	PRO[1] = '城镇人均收入';
	PRO[2] = '城镇人均支出';
	PRO[3] = '农村人均收入';
	PRO[4] = '农村人均支出';
	
	var QUNC = {};
	var QUVC = {};
	var QUNN = {};
	var QUVN = {};
	QUNC["name"] = '城镇人均收入';
	QUNC["type"] = 'line';
	QUVC["name"] = '城镇人均支出';
	QUVC["type"] = 'line';
	QUNN["name"] = '农村人均收入';
	QUNN["type"] = 'line';
	QUVN["name"] = '农村人均支出';
	QUVN["type"] = 'line';
	
	var jnc = 0;
	var jvc = 0;
	var jnn = 0;
	var jvn = 0;
	var QUNCARR = new Array();
	var QUVCARR = new Array();
	var QUNNARR = new Array();
	var QUVNARR = new Array();
	
	for(var i=0; i < data.length;i++){
		if(data[i].ZBQC == '城镇人均收入'){
			QUNCARR[jnc] = data[i].DQZ;
			QD[jnc] =  data[i].ZBND;
			jnc ++ ;
		}else if(data[i].ZBQC == '城镇人均支出'){
			QUVCARR[jvc] =  data[i].DQZ;
			jvc ++ ;
		}else if(data[i].ZBQC == '农村人均收入'){
			QUNNARR[jnn] =  data[i].DQZ;
			jnn ++ ;
		}else if(data[i].ZBQC == '农村人均支出'){
			QUVNARR[jvn] =  data[i].DQZ;
			jvn ++ ;
		}
	}
	
	QUNC["data"] = QUNCARR;
	QUVC["data"] = QUVCARR;
	QUNN["data"] = QUNNARR;
	QUVN["data"] = QUVNARR;
	QUS[0] = QUNC;
	QUS[1] = QUVC;
	QUS[2] = QUNN;
	QUS[3] = QUVN;
	initBarChart2(PRO,QD,QUS);
	
}

function showqyfbxx(data){
	$("#countxx").show();
	$("#div_fl").hide();
	$("#div_xzqh").hide();
	$("#div_nd").hide();
	$("#div_qyfbdl").show();
	$("#div_qyfbxxnd").show();
	$("#div_kssj").hide();
	$("#div_jssj").hide();
	$("#openZdy").hide();
	$("#return").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] = '企业分布情况统计图';
	PRO[1] = '数量';
	
	var QUS = new Array();
	
	for(var i=0; i < data.length;i++){
		var QUC = {};
		QUC["value"] = data[i].SL;
		QUC["name"] = data[i].XL;
		QUS[i] = QUC;
		QD[i] =  data[i].XL;
	}
	initPieChart(PRO,QD,QUS);
}

function showsletzxs(data){
	$("#countxx").hide();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] = '适龄儿童与在校生统计图';
	PRO[1] = ['适龄儿童','在校生'];
	
	var QUN = {};
	var QUV = {};
	QUN["name"] = '适龄儿童';
	QUN["type"] = 'bar';
	QUV["name"] = '在校生';
	QUV["type"] = 'bar';

	var QUNARR = new Array();
	var QUVARR = new Array();
	
	for(var i=0; i < data.length;i++){
		QD[i] =  data[i].QHMC;
		QUNARR[i] = data[i].SLET;
		QUVARR[i] =  data[i].ZXS;
	}
	QUN["data"] = QUNARR;
	QUV["data"] = QUVARR;
	QUS[0] = QUN;
	QUS[1] = QUV;
	initBarChart(PRO,QD,QUS);
}

function showlkzdlgxx(data,title,index,depth){
	if($("#fl_select").val()=="0"){
		 $("#xzqh_select").attr("disabled",false); 
		 $("#kssj_select").attr("disabled",true);    
		 $("#jssj_select").attr("disabled",true);    
	}else{
		 $("#xzqh_select").attr("disabled",true); 
		 $("#kssj_select").attr("disabled",false);    
		 $("#jssj_select").attr("disabled",false); 
	}
	$("#countxx").show();
	$("#div_fl").show();
	$("#div_xzqh").show();
	$("#div_nd").hide();
	$("#div_qyfbdl").hide();
	$("#div_qyfbxxnd").hide();
	$("#div_kssj").show();
	$("#div_jssj").show();
	$("#openZdy").hide();
	$("#return").show();
	
	var QUS = new Array();
	var QD = new Array();
	var PRO = new Array();
	PRO[0] =  title;
	PRO[1] = '旅客数量';
	PRO[2] = '旅馆数量';
	PRO[3] = '床位数量';
	var QU1 = {};
	var QU2 = {};
	var QU3 = {};
	QU1["name"] = '旅客数量';
	QU1["type"] = 'line';
	QU2["name"] = '旅馆数量';
	QU2["type"] = 'line';
	QU3["name"] = '床位数量';
	QU3["type"] = 'line';
	var QUARR1 = new Array();
	var QUARR2 = new Array();
	var QUARR3 = new Array();
	for(var i=0; i < data.length;i++){
		QUARR1[i] = data[i].LKSL;
		QUARR2[i] = data[i].LGSL;
		QUARR3[i] = data[i].CWSL;
		QD[i] =  data[i].HZB;
	}
	QU1["data"] = QUARR1;
	QU2["data"] = QUARR2;
	QU3["data"] = QUARR3;
	QUS[0] = QU1;
	QUS[1] = QU2;
	QUS[2] = QU3;
	initLineChart(PRO,QD,QUS,index,depth);
}

function initZdyCheckBox(){
	var requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getJjsjCount?zblx=经济数据&zbnd=0";
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    		var list01 = new Array();
	    		var zdy="";
	    		var end="<div class='clear'></div>"
	    				+"<label title='按时间分类'><input id='zdyradio01' name='zdy' type='radio' value='按时间分类' />按时间分类</label>"
	    				+"<label title='按经济类型分类'><input id='zdyradio02' name='zdy' type='radio' value='按经济类型分类'  checked='checked'/>按经济类型分类</label>"
	    				+"<span>日期<select  id='zdyDate'></select></span>"
	    				+"<div class='clear'></div>"
	    				+"<div><button id='OkZdy'class='ml250 mt20'>确定</button><button id='closeZdy'class='ml50 mt20'>关闭</button></div>";
	    		for(var i=0;i<data.length;i++){
                    addIndexOf();
	    			if(list01.indexOf(data[i]['ZBQC'])==-1){
	    				list01.push(data[i]['ZBQC']);
	    				zdy+="<label title='"+data[i]['ZBQC']+"'><input  type='checkbox' name='checkboxN' id='"+data[i]['ZBQC']+"' value='"+data[i]['ZBQC']+"' checked='checked' />"+data[i]['ZBQC']+"</label>";
	    			}
	    				
	    		}
	    		$("#zdy").html(zdy+end);
	    		$("#zdyDate").attr("disabled",false);    
	    		$("#nd_select").attr("disabled",false);
	    		$("#closeZdy").click(function(){
	    			$("#zdy").slideUp(500);
	    		})
	    		$("#OkZdy").click(function(){
	    			var text=$("#zdyDate").val();
	    			$("#nd_select").find("option[text='"+text+"']").attr("selected",true);
	    			var index = $("#div_xzqh").val();
	    			var requestUrl = getURL(index);
	    			
	    			refuChar(requestUrl,index);
	    			$("#zdy").slideUp(500);
	    		})

	    		$("#nd_select").change(function(){
	    			var text=$("#nd_select").val();
	    			$("#zdyDate").find("option[text='"+text+"']").attr("selected",true);
	    			var index = $("#div_xzqh").val();
	    			var requestUrl = getURL(index);
	    			refuChar(requestUrl,index);
	    			$("#zdy").slideUp(500);
	    			  
	    		});
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}

function initXzqhSelectList(){
	var requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getXzqh"
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	for(var i=0; i < data.length;i++){
	    		$("#xzqh_select").append("<option value='"+ data[i].QHMC +"'>"+ data[i].QHMC +"</option>");
	    	}
	    	initZbndSelectList();
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}
function initZbndSelectList(){	
	requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getZbnd"
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	for(var i=0; i < data.length;i++){
	    		$("#nd_select").append("<option value='"+ data[i].ZBND +"'>"+ data[i].ZBND +"</option>");
	    	}
	    	initSEndSelectList();
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}
function initSEndSelectList(){	
	requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getLknd"
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	for(var i=0; i < data.length;i++){
	    		$("#kssj_select").append("<option value='"+ data[i].ND +"'>"+ data[i].ND +"</option>");
	    		$("#jssj_select").append("<option value='"+ data[i].ND +"'>"+ data[i].ND +"</option>");
	    	}
	    	initQyfbxxndSelectList();
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}
function initQyfbxxndSelectList(){	
	requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getqyfbxxnd"
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	for(var i=0; i < data.length;i++){
	    		$("#qyfbxxnd_select").append("<option value='"+ data[i].ND +"'>"+ data[i].ND +"</option>");
	    		
	    	}
	    	initQyfbdlSelectList();
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}
function initQyfbdlSelectList(){	
	requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getqyfbdl"
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
	    	for(var i=0; i < data.length;i++){
	    		$("#qyfbdl_select").append("<option value='"+ data[i].DL +"'>"+ data[i].DL +"</option>");
	    	}
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}

function refuChar(requestUrl,index,depth){

	// defalut set depth = 1
	if(typeof(depth) == "undefined"){
		depth = 1;
	}

	var selectType = $("#fl_select").val();
	var selectXzqh = $("#xzqh_select").val();
	var selectZbnd = $("#nd_select").val();
	var selectDL = $("#qyfbdl_select").val();
	var selectNd = $("#qyfbxxnd_select").val();
	var selectStart = $("#kssj_select").val();
	var selectEnd = $("#jssj_select").val();
	
	if(index == 'frxx'){
		requestUrl = requestUrl + selectXzqh;
	}else if(index == 'jjsj'){
		if(depth != 2) {
			if ($("#zdyradio01").is(':checked')) {
				requestUrl = requestUrl + "0";
			} else {
				requestUrl = requestUrl + selectZbnd;
			}
		}
		// else do nothing
	}else if(index == 'qyfbxx'){
		requestUrl = requestUrl + "?ys=" + selectDL + "&nf=" + selectNd;
	}else if(index == 'lkzdlgxx'){
		if(typeof(depth) == "undefined"||depth==1){
			depth = 1;
			requestUrl = requestUrl + "?type=" + selectType + "&xzqh=" + selectXzqh + "&start=" + selectStart + "&end=" + selectEnd;
		}else{
			requestUrl = requestUrl + "&xzqh=" + selectXzqh + "&start=" + selectStart + "&end=" + selectEnd;
		}

        if($("#fl_select").val()=="0"){
            $("#xzqh_select").attr("disabled",false);
            $("#kssj_select").attr("disabled",true);
            $("#jssj_select").attr("disabled",true);
        }else{
            $("#xzqh_select").attr("disabled",true);
            $("#kssj_select").attr("disabled",false);
            $("#jssj_select").attr("disabled",false);
        }
        $("#countxx").show();
        $("#div_fl").show();
        $("#div_xzqh").show();
        $("#div_nd").hide();
        $("#div_qyfbdl").hide();
        $("#div_qyfbxxnd").hide();
        $("#div_kssj").show();
        $("#div_jssj").show();
        $("#openZdy").hide();
        $("#return").show();
		
	}
	
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {
			if(data=="") {
				alert("暂无数据!");
				return;
			}
	    	var div=$("#bi");
	    	div.empty();
	    	if(index == 'rktj'){
                div.html('<div id="main" style="height:500px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 510});
	    		showrktj(data);
	    	}else if(index == 'frxx'){
                div.html('<div id="main" style="height:410px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 420});
	    		showfrtj(data);
	    	}else if(index == 'jjsj'){
                div.html('<div id="main" style="height:410px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 420});
				showhgjj(data,data[0].PZB + "信息图",index,depth);
	    	}else if(index == 'rjsr'){
                div.html('<div id="main" style="height:500px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 510});
	    		showsrzc(data,"人均收入支出信息图");
	    	}else if(index == 'shxfp'){
                div.html('<div id="main" style="height:500px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 510});
	    		showndjj(data,"社会消费品总额信息图");
	    	}else if(index == 'rknltj'){
                div.html('<div id="main" style="height:500px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 510});
	    		shownzxt(data,"人口年龄统计信息图");
	    	}else if(index == 'rkqrqc'){
                div.html('<div id="main" style="height:500px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 510});
	    		showqrqc(data,"人口迁入、迁出统计图");
	    	}else if(index == 'qyfbxx'){
                div.html('<div id="main" style="height:410px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 420});
	    		showqyfbxx(data,"企业分布情况统计图");
	    	}else if(index == 'sletzxs'){
                div.html('<div id="main" style="height:500px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 510});
	    		showsletzxs(data,"适龄儿童与在校生统计图");
	    	}else if(index == 'lkzdlgxx'){
                div.html('<div id="main" style="height:410px;padding:10px; width:800px; margin:auto"></div>');
                div.attr({'width': 960,'height': 420});
	    		showlkzdlgxx(data,"旅客住店与旅馆信息统计图",index,depth);
	    	}
	    	
	    	var obj = $("#light_3");
	    	var x = ($(window).width()- obj.width())/2;
	    	var y = ($(window).height()-obj.height())/2;
	    	obj.css("top",y).css("left",x);  
	    	obj.show();
	    	$("#fade").show();
            $("#bi").show();
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}

function addIndexOf(){
    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++)
            {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

}
