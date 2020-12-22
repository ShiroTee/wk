 
var baseUrl = globalInterfaceDomain+"/csdsc/onlineInformationHandler/";
var t = "authKey="+authKey+"&timestamp="+new Date().getTime();
//var baseUrl = "http://10.6.10.115:8080/csdsc/service/api/csdsc/onlineInformationHandler/";
$(function(){
	//hidenDiv();
	//$("#p1").show();
	loadPs2();
	loadPs11();
	loadPs13();

	 
 });
//企业信息模糊查询
function queryqymhcx(start){
	var qymc=$.trim($("#p20name").val());
	var zch=$.trim($("#p20papersNum").val());
	var jyfw=$.trim($("#p20range").val());
	var fddbr=$.trim($("#p20represent").val());
	var xzqh=$.trim($("#p20area").val());
	 $.ajax({
		    url: encodeURI(baseUrl+"getLegalPersonList?"+t),
		    dataType : 'jsonp',
		    data:{qymc:qymc,zch:zch,jyfw:jyfw,fddbr:fddbr,xzqh:xzqh,pageNo:start,pageSize:10},
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	var tbody="";
		    	var obj=data.data.listBeans;
		    	
		    	if(obj!=undefined){
					for(var i=0;i<obj.length;i++){
						if(obj[i].jgmc == undefined){obj[i].jgmc = "";}
						if(obj[i].yyzzh == undefined){obj[i].yyzzh = "";}
						if(obj[i].gslx == undefined){obj[i].gslx = "";}
						if(obj[i].fddbr == undefined){obj[i].fddbr = "";}
						if(obj[i].hydl == undefined){obj[i].hydl = "";}
						if(obj[i].zcdz == undefined){obj[i].zcdz = "";}
						if(obj[i].zcsj == undefined){obj[i].zcsj = "";}
						if(obj[i].jyfw == undefined){obj[i].jyfw = "";}
						if(obj[i].qhmc == undefined){obj[i].qhmc = "";}
					}
		    		for(var i=0;i<obj.length;i++){
		    			tbody+="<tr><td>"+obj[i].jgmc+"</td><td>"+obj[i].yyzzh
		    			+"</td><td>"+obj[i].gslx+"</td><td>"+obj[i].fddbr+"</td><td>"+obj[i].hydl
		    			+"</td><td>"+obj[i].zcdz+"</td><td>"+obj[i].zcsj+"</td>" +
							"<td title='"+obj[i].jyfw+"'>"+obj[i].jyfw.substr(0,10);
						if(obj[i].jyfw.length>10){
							tbody+="...</td>";
						}else{
							tbody+="</td>";
						}
						tbody+="<td>"+obj[i].qhmc+"</td></tr>";
		    		}
		    		if(obj.length==0){
		    			tbody="<tr><td colspan='8'>暂无数据</td></tr>";
		    		}
		    		$("#p20table").html(tbody);
		    		pageSkip(start,data.data.allpage,data.data.allcounts);
		    	}
		    	
		    },
		    error : function() {
		      alert("查询超时");
		    },
		    timeout:6000
		  });
	
}
//企业信息模糊查询分页
function pageSkip(start,totalPage,totalRecords){
	var pageNo =start; //开始页	 
	if (!pageNo) { pageNo = 1;}
	 
	kkpager.init({
		
		pno: pageNo,
		total: totalPage,//总页码
		totalRecords: totalRecords,//总数据条数
		mode : 'click',
		click : function(n){
			queryqymhcx(n);
		  	return false;
		}
		
	});
	// $("#kkpager").val("");
	kkpager.generPageHtml();
	$("#kkpager").show();
}
//全员人口查询
function queryp1(){
	 var administrativeRegionId = $("#ps11").val();
	 var sex = $("#ps12").val();
	 var year = $("#ps13").val();
	 var administrativeRegionName = $("#ps11").find("option:selected").text();
	 var yearName = $("#ps13").find("option:selected").text();
			 $.ajax({
				    url: encodeURI(baseUrl+"getTotalPopulationInfo?"+t),
				    dataType : 'jsonp',
				    data:{administrativeRegionId:administrativeRegionId,year:year},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data.data;
				    	var tbody = "";
				    	if(obj != undefined ){
				    		var total = obj.maleNum + obj.femaleNum;
				    		var nanNum = "-";
				    		var nvNum = "-";
				    		if(sex ==0){
				    			nanNum = obj.maleNum;
				    			nvNum = obj.femaleNum;
				    		}
				    		if(sex ==1){
				    			nanNum = obj.maleNum;
				    		}
				    		if(sex ==2){
				    			nvNum = obj.femaleNum;
				    		}
				    	tbody ="<tr>"+"<td>"+obj.administrativeRegionName+"</td>"+"<td>"+obj.statisticalYear+"</td>"+"<td>"+total+"</td>"+"<td>"+nanNum+"</td>"+"<td>"+nvNum+"</td>"+"</tr>";
				    	}else{
				    		tbody = "<tr><td>"+administrativeRegionName+"</td><td>"+yearName+"</td><td>-</td><td>-</td><td>-</td></tr>"
				    	}
				    	$("#p1table").html(tbody);
				    	
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		
}
//人口基础信息查询
 function queryp2(){
	 var pname = $.trim($("#pname").val());
	 var papersType = $("#ps2").val();
	 var papersNum = $.trim($("#ppapersNum").val());
	 if(pname == ""){
		 alert("姓名不能为空！");
		 return;
	 }
	 if(papersNum == ""){
		 alert("证件号码不能为空！");
		 return;
	 }
		if(pname != "" && papersNum != ""){
			 $.ajax({
				    url: encodeURI(baseUrl+"getPopulationBaseInfo?pname="+pname+"&"+t),
				    dataType : 'jsonp',
				    data:{papersType:papersType,papersNum:papersNum},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data.data;
				    	if(obj != undefined){
							$("#photo").attr("src", "data:image/png;base64," + obj.photo);
				    		$("#name").val(obj.name);
				    		$("#usedName").val(obj.usedName);
				    		$("#sex").val(obj.sex);
				    		$("#nation").val(obj.nation);
				    		$("#papersType").val(obj.papersType);
				    		$("#papersNum").val(obj.papersNum);
				    		$("#religion").val(obj.religion);
				    		$("#educationDegree").val(obj.educationDegree);
				    		$("#maritalStatus").val(obj.maritalStatus);
				    		$("#politicsStatus").val(obj.politicsStatus);
				    		$("#accountType").val(obj.accountType);
				    		$("#birthdate").val(new Date(obj.birthdate).format('yyyy-MM-dd'));
				    	}else{
				    		alert("无该人员信息");
				    	}
				    },
				    timeout:6000
				  });
		}
		
 }
//法人查询
 function queryp3(){
	 var porgName = $.trim($("#porgName").val());
	 var porgCode = $.trim($("#porgCode").val());
	 var yyzzh=$.trim($("#porgLicenseNum").val());
	 if(porgName == ""){
		 alert("机构名称不能为空！");
		 return;
	 }
//	 if(porgCode == ""){
//		 alert("机构代码不能为空！");
//		 return;
//	 }
//
//	 var  reg=/^[_0-9a-zA-Z]{8}-[_0-9a-zA-Z]$/;
//     if(!reg.test(porgCode)){
//		 alert("机构代码格式不正确！");
//		 return;
//	 }
		if(porgName != ""){
			 $.ajax({
				    url: encodeURI(baseUrl+"getLegalPersonInfo?porgName="+porgName+"&porgCode="+porgCode+"&yyzzh="+yyzzh+"&"+t),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
						var tbody="";
				    	var obj = data.data;
				    	if(obj != undefined){
							tbody += "<td>"+obj.qyqc+"</td>";
							tbody += "<td>"+obj.yyzzh+"</td>";
							tbody += "<td>-</td>";
							tbody += "<td>"+obj.fddbr+"</td>";
							tbody += "<td>"+obj.gslx+"</td>";
							if(obj.zcsj == undefined){
								tbody += "<td>-</td>";
							}else{
								tbody += "<td>"+new Date(obj.zcsj).format('yyyy-MM-dd')+"</td>";
							}
							tbody += "<td>"+obj.zcdz+"</td>";
							tbody += "<td>"+obj.hyml+"</td>";
							tbody += "<td>"+obj.xzqh+"</td>";
				    	}else{
				    		tbody = "无该法人信息";
				    	}
						$("#p3table").html(tbody);
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }
//组织结构代码查询
 function queryp12(){
	 var porgName = $.trim($("#porgName2").val());
	 var porgCode = $.trim($("#porgCode2").val());
	 if(porgName == ""){
		 alert("机构名称不能为空！");
		 return;
	 }
	 if(porgCode == ""){
		 alert("机构代码不能为空！");
		 return;
	 }
	 var  reg=/^[_0-9a-zA-Z]{8}-[_0-9a-zA-Z]$/;
     if(!reg.test(porgCode)){
		 alert("机构代码格式不正确！");
		 return;
	 }
		if(porgName != ""){
			 $.ajax({
				    url: encodeURI(baseUrl+"getZzjgdmDataInfo?jgmc="+porgName+"&jgdm="+porgCode+"&"+t),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {	    	
				    	var obj = data.data;
				    	if(obj != undefined){
							$("#p12 form")[1].reset();
				    		$("#fbdw").val(obj.fbdw);
				    		$("#gljg").val(obj.gljg);
				    		if(obj.TDYTrq !=null)
				    		$("#TDYTrq").val(new Date(obj.TDYTrq).format('yyyy-MM-dd'));
				    		$("#TDYTjgmc").val(obj.TDYTjgmc);
				    		$("#jgdz").val(obj.jgdz);
							//if(obj.startDate !=null && obj.endDate !=null )
				    		//$("#busnissTime").val(new Date(obj.startDate).format('yyyy-MM-dd')+"至"+new Date(obj.endDate).format('yyyy-MM-dd'));
							$("#fddbrmc").val(obj.fddbrmc);
							$("#fddbrsfzhm").val(obj.fddbrsfzhm);
				    		$("#jglx").val(obj.jglx);
				    		$("#bzjgmc").val(obj.bzjgmc);
				    		if(obj.bzrq !=null)
					    	$("#bzrq").val(new Date(obj.bzrq).format('yyyy-MM-dd'));
				    		if(obj.fzrq !=null)
				    		$("#fzrq").val(new Date(obj.fzrq).format('yyyy-MM-dd'));	   
							if(obj.zfrq !=null)
				    		$("#zfrq").val(new Date(obj.zfrq).format('yyyy-MM-dd'));				    		
				    	}else{
				    		$("#p12 form")[1].reset();
				    		alert("无该组织机构信息");
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }
//学校信息查询
 function queryp13(){
	 var porgName = $.trim($("#schoolName").val());
	 if(porgName == ""){
		 alert("学校名称不能为空！");
		 return;
	 }
		if(porgName != ""){
			 $.ajax({
				    url: encodeURI(baseUrl+"getSchoolDataInfo?xxmc="+porgName+"&"+t),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {	    	
				    	var obj = data.data;
				    	if(obj != undefined){
							$("#p13 form")[1].reset();
				    		$("#xxbTDMJ").val(obj.xxbTDMJ);
				    		$("#xxdm").val(obj.xxdm);
				    		$("#zgbm").val(obj.zgbm);
				    		$("#dwlb").val(obj.dwlb);
				    		$("#xj").val(obj.xj);
							//if(obj.startDate !=null && obj.endDate !=null )
				    		//$("#busnissTime").val(new Date(obj.startDate).format('yyyy-MM-dd')+"至"+new Date(obj.endDate).format('yyyy-MM-dd'));
							$("#xz").val(obj.xz);
							$("#lxdh").val(obj.lxdh);
				    		$("#wz").val(obj.wz);
				    		$("#jxny").val(obj.jxny);	   
				    		$("#dz").val(obj.dz);	
				    		$("#yb").val(obj.yb);
				    	}else{
				    		$("#p13 form")[1].reset();
				    		alert("无该学校信息");
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }

function clickTime(){
	var type = $("#type").val();
	if(type=="2"){
		$("#monStart").show();
		$("#monEnd").show();
	}else{
		$("#monStart").hide();
		$("#monEnd").hide();
	}
}


//宏观经济查询
 function queryp4(start){
	 $("#my_chart").hide();
	 $("#p4table").empty();
	 var zbdm = $("#zbdm").val();
	 var yearStart = $("#ps4").val();
	 var yearEnd = $("#yearEnd").val();
	 var monStart = $("#monStart").val();
	 var monEnd = $("#monEnd").val();
	 var xzqh = $("#xzqh").val();
	 var type = $("#type").val();
	 if(type=="1"){
		 if(yearStart>yearEnd){
			 alert("起止时间要小于结束时间！");
			 return false;
		 }
	 }
	 var names = new Array();
	 var datas = new Array();
	 var zzz = new Array();
			 $.ajax({
				    url: encodeURI(baseUrl+"getMacroeconomicInfoList?"+t),
				    dataType : 'jsonp',
				    data:{zbdm:zbdm,yearStart:yearStart,yearEnd:yearEnd,monStart:monStart,monEnd:monEnd,xzqh:xzqh,type:type,pageNo:start,pageSize:11},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data.data.listBeans;
				    	var tbody = "";
						var time="";
						var dw="";
				    	var current="-";
				    	var growth="-";
				    	if(obj.length>0){
							var j=0;
							if(obj[0].indicatorsUnit!=undefined){
								dw="（"+obj[0].indicatorsUnit+"）";
							}
							$("#title").empty();
							$("#title").html("<th>时间</th><th>当期值"+dw+"</th><th>增长（%）</th>");
				    		 for(var i=0;i<obj.length;i++){
								 if(type=="1"){
									 time=obj[i].indicatorsYear+"年";
								 }
								 if(type=="2"){
									 time=obj[i].indicatorsYear+"年"+obj[i].indicatorsMonth+"月";
								 }
								 if(type=="3"){
									 time=obj[i].indicatorsYear+"年第"+obj[i].indicatorsQuarter+"季度";
								 }
				    			 current = obj[i].currentValue;
								 if(obj[i].currentValue!=undefined){
									 datas[j]=current;
									 names[j]=time;
									 zzz[j]=obj[i].growthValue;
									 j = j + 1;
								 }else{
									 current = "-";
								 }
								 if(obj[i].growthValue != undefined){
									 growth = parseFloat(obj[i].growthValue).toFixed(2);
								 }else{
									 growth = "-";
								 }
								 tbody +="<tr>"+"<td>"+time+"</td>"+"<td>"+current+"</td>"+"<td>"+growth+"</td></tr>";
				    		 }
							myChart(listManage(datas),listManage(names),listManage(zzz),dw);
				    	}else{
				    		tbody="<tr><td colspan=\"3\">暂无数据</td></tr>";
				    	}
				    	$("#p4table").html(tbody);
						pageHgjj(start,10,data.data.allpage);
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		
 }

//宏观经济查询分页
function pageHgjj(start,pageSize,totalRecords){
	var totalRecords = totalRecords;//总记录数
	var totalPage = Math.ceil(totalRecords / pageSize);//总页数
	var pageNo =start; //开始页
	if (!pageNo) { pageNo = 1;}

	kkpagerOrg.init({

		pno: pageNo,
		total: totalPage,//总页码
		totalRecords: totalRecords,//总数据条数
		mode : 'click',
		click : function(n){
			queryp4(n);
			return false;
		}

	});
	kkpagerOrg.generPageHtml();
	$("#kkpagerOrg").show();
}


function listManage(list){
	var datas = new Array();
	var num=list.length-1;
	for(var i=0;i<list.length;i++){
		datas[num]=list[i];
		num = num-1;
	}
	return datas;
}

function myChart(datas,names,zzz,dw){
	var PRO = new Array();
	PRO[0]=['当期值','增长'];
	PRO[1]=['当期值'+dw];
	var QUS = [{
		name:'当期值',
		type:'bar',
		barWidth:23,
		itemStyle: {
			normal: {
				color:'#836FFF'
           }
        },
		data:datas
	},{
		name:'增长',
		yAxisIndex: 1,
		itemStyle: {
			normal: {
				color:'#00CD00'
			}
		},
		type:'line',
		data:zzz
	}];
	initLineChart(PRO,names,QUS);
}
function initLineChart(PRO,QD,QU){
	$("#my_chart").show();
	var  myChart;
	myChart = echarts.init(document.getElementById('my_chart'));
	var option = {
		//title: {text: PRO[0],x: 'center', y: 'top' },
		tooltip: {trigger: 'axis'},
		legend: {show: true,x : 'left',data:PRO[0]},
		toolbox: {
			show: true,
			feature: {
				mark: {show: false},
				dataZoom: {
					show: false,
					title: {dataZoom: '区域缩放',dataZoomReset: '区域缩放后退'}
				},
				dataView: {show: false, readOnly: true},
				magicType: {show: false, type: ['line', 'bar']},
				restore: {show: false},
				saveAsImage: {show: false}
			}
		},
		grid : {
			x : 120
		},
		calculable: false,
		xAxis: [{show: true,type: 'category',data:QD,axisLabel :{interval:2},splitLine: { show: false },axisTick: {show: false},axisLine: {show:false,lineStyle: {color: 'white'}}}],
		yAxis: [{show: true,splitLine: { show: false },type: 'value',name:PRO[1]},{show: true,splitLine: { show: false },type: 'value',name:'增长（%）'}],
		series:QU
	};

	myChart.setOption(option);
}

//税务查询
 function queryp16(){
	 var porgName = $.trim($("#p16Name").val());
	 if(porgName == ""){
		 alert("纳税人名称不能为空！");
		 return;
	 }
	
		if(porgName != ""){
			param={nsrmc:porgName};
			 $.ajax({
				    url: encodeURI(baseUrl+"getSwInfo"),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    data:param,
				    success : function(data) {
				    	var obj = data.data;
				    	
				    	if(obj != undefined){
							$("#p16 form")[1].reset();
				    		$("#NSRMC").val(obj.nSRMC);	
				    		$("#NSRSBH").val(obj.nSRSBH);
				    		$("#ZGSWJG").val(obj.zGSWJG);
				    		$("#GDGHLX").val(obj.gDGHLX);
				    		$("#NSRZT").val(obj.nSRZT);
							if(obj.dJRQ!=null )
				    		$("#DJRQ").val(new Date(obj.dJRQ).format('yyyy-MM-dd'));
							
							
				    	}else{
				    		$("#p16 form")[1].reset();
				    		alert("无该纳税人信息");
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  } );			
		}
		
 }
  //低保查询
 function queryp18(){
	 var porgName = $.trim($("#p18Name").val());
	 var porgCode = $.trim($("#p18sfzhm").val());
	 if(porgName == ""){
		 alert("姓名不能为空！");
		 return;
	 }
	 if(porgCode == ""){
		 alert("身份证不能为空！");
		 return;
	 }

		if(porgName != ""){
			 $.ajax({
				    url: encodeURI(baseUrl+"getDbInfo?hzxm="+porgName+"&hzsfzhm="+porgCode+"&"+t),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data.data;
				    	if(obj != undefined){
							$("#p18 form")[1].reset();					
				    		$("#HZXM").val(obj.hZXM);
				    		$("#HZSFZHM").val(obj.hZSFZHM);
				    		$("#DBZL").val(obj.dBZL);
				    		$("#YHZH").val(obj.yHZH);				    
				    		if(obj.dJSJ !=null)
				    		$("#DJSJ").val(new Date(obj.dJSJ).format('yyyy-MM-dd'));
				    		$("#DBZJHM").val(obj.dBZJHM);
				    		$("#JTZZ").val(obj.jTZZ);
				    		$("#LXDH").val(obj.lXDH);
				    		$("#XSBZRS").val(obj.xSBZRS);
				    		$("#HYBZJE").val(obj.hYBZJE);
				    		$("#JTRKZSRY").val(obj.jTRKZSRY);
				    		$("#ZDSHBZBZ").val(obj.zDSHBZBZ);
				    		$("#KHYH").val(obj.kHYH);
				    		
							//if(obj.startDate !=null && obj.endDate !=null )
				    		//$("#busnissTime").val(new Date(obj.startDate).format('yyyy-MM-dd')+"至"+new Date(obj.endDate).format('yyyy-MM-dd'));
				    	}else{
				    		$("#p18 form")[1].reset();
				    		alert("无该低保人员信息");
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }
//婚姻信息查询
 function queryp7(){
	 var pname = $.trim($("#p7name").val());
	 var papersType = $("#ps7").val();
	 var papersTypeText = $("#ps7").find("option:selected").text().replace("(","（");
	 var papersNum = $.trim($("#p7papersNum").val());
	 
	 //var pname1 = $.trim($("#p71name").val());
	// var papersType1 = $("#ps71").val();
	 //var papersType1 = $("#ps71").find("option:selected").text().replace("(","（");
	// var papersNum1 = $.trim($("#p71papersNum").val());
	 var papersType1 = "";
	 var papersNum1 = "";
	 var pname1 = rdpUserName ;
	 
	 var userName = rdploginName;
 
	 
	 if(pname == ""){
		 alert("检索姓名不能为空！");
		 return;
	 }
	 if(papersNum == ""){
		 alert("检索证件号码不能为空！");
		 return;
	 }
	
		if(pname != "" && papersNum != "" ){
			 $.ajax({
				    url: encodeURI(baseUrl+"getMarriageRegister?pname="+pname+"&pname1="+pname1+"&papersType1="+papersType1+"&papersTypeText="+papersTypeText+"&userName="+userName+"&"+t),
				    dataType : 'jsonp',
				    data:{papersType:papersType,papersNum:papersNum,papersNum1:papersNum1},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	if(data.data != undefined){
				    		$("#argMap1").val(JSON.stringify(data.data.argMap));
				    		$("#queryLogId").val(data.data.queryLogId);
				    		$("#mdata").val(JSON.stringify(data.data.list));
				    		
				    	}
				    	var obj = data.data.list;

				    	data = data.data.list;
						var ZZH="";
						var DJXZ="";
						var DJRQ="";
						var NAN="";
						var NANZJ="";
						var NV="";
						var NVZJ="";
				    	var tbody = "";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
							 if(data[i].ZZH == undefined){
				    				 ZZH="-";
				    			 }else{
				    				 ZZH=data[i].ZZH;
				    			 }
				    			 if(data[i].DJXZ == undefined){
				    				 DJXZ="-";
				    			 }else{
				    				 DJXZ=data[i].DJXZ;
				    				 
				    			 }
				    			 if(data[i].DJRQ == undefined){
				    				 DJRQ="-";
				    			 }else{
				    				 DJRQ = new Date(data[i].DJRQ).format('yyyy-MM-dd')
				    			 }
				    			 if(data[i].NAN == undefined){
				    				 NAN="-";
				    			 }else{
				    				 NAN=data[i].NAN;
				    				 
				    			 }
				    			 if(data[i].NANZJ == undefined) {
				    				 NANZJ="-";
				    			 }else{
				    				 NANZJ=data[i].NANZJ;
				    				 
				    			 }
				    			 if(data[i].NV == undefined){
				    				 NV="-";
				    			 }else{
				    				 NV=data[i].NV;
				    				 
				    			 }
								  if(data[i].NVZJ == undefined){
				    				 NVZJ="-";
				    			 }else{
				    				 NVZJ=data[i].NVZJ;
				    				 
				    			 }
				    			 tbody +="<tr>"+"<td>"+ZZH+"</td>"+"<td>"+DJXZ+"</td>"+"<td>"+DJRQ+"</td>"+"<td>"+NAN+"</td>"+"<td>"+NANZJ+"</td>"+"<td>"+NV+"</td>"+"<td>"+NVZJ+"</td>"+"</tr>";
				    		 }
				    		 $("#p7table").html(tbody);
				    		 //$("#printButton").show();
				    		 
				    	}else{
				    		if(obj  != undefined){
				    			$("#p7table").html("<tr ><td colspan='7'>无婚姻登记记录</td></tr>");
				    			//$("#printButton").show();
				    		}else{
				    			$("#p7table").html("<tr ><td colspan='7'>无该人员信息</td></tr>");
				    			//$("#printButton").hide();
				    		}
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }
//个人社保
 function queryp14(){
	 var pname,papersNum,msg,id;
	
		 msg="姓名不能为空！";
		  pname = $.trim($("#p14name").val());
		  //papersType = $("#ps5").val();
		  sfzhm = $.trim($("#p14sfzhm").val());
		 
		  id = "p14table";
	
	 if(pname == ""){
		 alert(msg);
		 return;
	 }
	  
	
		if(pname != ""  ){
			 $.ajax({
				    url: encodeURI(baseUrl+"getRycbInfo?xm="+pname+"&sfzhm="+sfzhm+"&"+t+"&page=1&count=10"),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;

				    	var tbody = "";
				    	var XM="";
				    	var SFZHM="";
				    	var XB="";
				    	var CSNY="";
				    	var CJXZ="";
				    	var JFSD="";
				    	var DWMC="";
				    	var DWSBBH="";
				    	var JNZT="";
				    	var GRSBBH="";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].XM == undefined){
				    				 XM="-";
				    			 }else{
				    				 XM=data[i].XM;
				    			 }
				    			 if(data[i].SFZHM == undefined){
				    				 SFZHM="-";
				    			 }else{
				    				 SFZHM=data[i].SFZHM;
				    				 
				    			 }
				    			 if(data[i].XB == undefined){
				    				 XB="-";
				    			 }else{
				    				 XB = data[i].XB;
				    			 }
				    			 if(data[i].CSNY == undefined){
				    				 CSNY="-";
				    			 }else{
				    				 CSNY=data[i].CSNY;
				    				 
				    			 }
				    			 if(data[i].CJXZ == undefined) {
				    				 CJXZ="-";
				    			 }else{
				    				 CJXZ=data[i].CJXZ;
				    				 
				    			 }
				    			 if(data[i].JFSD == undefined){
				    				 JFSD="-";
				    			 }else{
				    				 JFSD=data[i].JFSD;
				    				 
				    			 }
				    			 if(data[i].DWMC == undefined){
				    				 DWMC="-";
				    			 }else{
				    				 DWMC=data[i].DWMC;
				    				 
				    			 }
				    			 if(data[i].DWSBBH == undefined){
				    				 DWSBBH="-";
				    			 }else{
				    				 DWSBBH=data[i].DWSBBH;
				    				 
				    			 }
				    			 if(data[i].JNZT == undefined){
				    				 JNZT="-";
				    			 }else{
				    				 JNZT=data[i].JNZT;
				    				 
				    			 }
				    			 if(data[i].GRSBBH == undefined){
				    				 GRSBBH="-";
				    			 }else{
				    				 GRSBBH=data[i].GRSBBH;
				    				 
				    			 }
				    			 tbody +="<tr>"+"<td>"+XM+"</td>"+"<td>"+SFZHM+"</td>"+"<td>"+XB+"</td>"+"<td>"+CSNY+"</td>"+"<td>"+CJXZ+"</td>"+"<td>"+JFSD+"</td>"+"<td>"+DWMC+"</td>"+"<td>"+DWSBBH+"</td>"+"<td>"+JNZT+"</td>"+"<td>"+GRSBBH+"</td>"+"</tr>";
				    		 }
				    		 $("#"+id).html(tbody);
				    		 
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='10'>当前无个人社保记录！</td></tr>");
				    			 
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }
//个人社保
 function queryp15(){
	 var startdate,lastdate;
	
	 startdate = $("#p15start").val();
	 lastdate = $("#p15end").val();	 
		  id = "p15table";
	
	 if(startdate == ""){
		 alert("开始时间不能空");
		 return;
	 }
	 if(lastdate == ""){
		 alert("截止时间不能空");
		 return;
	 }
	
	  var param={
		"startdate" :startdate,
		"lastdate" :lastdate
	  }
	
		if(startdate != ""  ){
			 $.ajax({
				    url: encodeURI(baseUrl+"getTdcrInfo?page=1&count=10"),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    data:param,
				    success : function(data) {
				    	var obj = data;

				    	var tbody = "";
				    	var HTQDSJ="";
				    	var DZXMMC="";
				    	var ZDWZ="";
				    	var SRR="";
				    	var HTBH="";
				    	var TDYT="";
				    	var TDMJ="";
				    	var HTJK="";
				    	var ZBRY="";
				    	var SBRY="";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].HTQDSJ == undefined){
				    				 HTQDSJ="-";
				    			 }else{
				    				 HTQDSJ=data[i].HTQDSJ;
				    			 }
				    			 if(data[i].DZXMMC == undefined){
				    				 DZXMMC="-";
				    			 }else{
				    				 DZXMMC=data[i].DZXMMC;
				    				 
				    			 }
				    			 if(data[i].ZDWZ == undefined){
				    				 ZDWZ="-";
				    			 }else{
				    				 ZDWZ = data[i].ZDWZ;
				    			 }
				    			 if(data[i].SRR == undefined){
				    				 SRR="-";
				    			 }else{
				    				 SRR=data[i].SRR;
				    				 
				    			 }
				    			 if(data[i].HTBH == undefined) {
				    				 HTBH="-";
				    			 }else{
				    				 HTBH=data[i].HTBH;
				    				 
				    			 }
				    			 if(data[i].TDYT == undefined){
				    				 TDYT="-";
				    			 }else{
				    				 TDYT=data[i].TDYT;
				    				 
				    			 }
				    			 if(data[i].TDMJ == undefined){
				    				 TDMJ="-";
				    			 }else{
				    				 TDMJ=data[i].TDMJ;
				    				 
				    			 }
				    			 if(data[i].HTJK == undefined){
				    				 HTJK="-";
				    			 }else{
				    				 HTJK=data[i].HTJK;
				    				 
				    			 }
				    			
				    			 tbody +="<tr>"+"<td>"+new Date(HTQDSJ).format('yyyy-MM-dd')+"</td>"+"<td>"+DZXMMC+"</td>"+"<td>"+ZDWZ+"</td>"+"<td>"+SRR+"</td>"+"<td>"+HTBH+"</td>"+"<td>"+TDYT+"</td>"+"<td>"+TDMJ+"</td>"+"<td>"+HTJK+"</td>"+"</tr>";
				    		 }
				    		 $("#"+id).html(tbody);
				    		 
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='10'>当前无土地出让记录！</td></tr>");
				    			 
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }
//行政处罚
 function queryp56(type){
	 var pname,papersNum,start,end,msg,id;
	 var papersType = -1;
	 if(type == 1){
		 msg="姓名不能为空！";
		  pname = $.trim($("#p5name").val());
		  //papersType = $("#ps5").val();
		  papersNum = $.trim($("#p5papersNum").val());
		  start = $("#p5start").val();
		  end = $("#p5end").val();
		  id = "p5table";
	 }else{
		 msg = "当事人名称不能为空！";
		 pname = $.trim($("#p6name").val());
		  //papersType = $("#ps6").val();
		  papersNum = $.trim($("#p6papersNum").val());
		  start = $("#p6start").val();
		  end = $("#p6end").val();
		  id = "p6table";
	 }
	 
	 if(pname == ""){
		 alert(msg);
		 return;
	 }
	  
	
		if(pname != ""  ){
			 $.ajax({
				    url: encodeURI(baseUrl+"getAdministrativePunishment?pname="+pname+"&"+t),
				    dataType : 'jsonp',
				    data:{papersType:papersType,papersNum:papersNum,start:start,end:end,type:type},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;

				    	var tbody = "";
				    	var DSRZJHM="";
				    	var CFMC="";
				    	var DSRMC="";
				    	var JDRQ="";
				    	var CFJDSWH="";
				    	var CFBM="";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].DSRZJHM == undefined){
				    				 DSRZJHM="-";
				    			 }else{
				    				 DSRZJHM=data[i].DSRZJHM;
				    			 }
				    			 if(data[i].CFMC == undefined){
				    				 CFMC="-";
				    			 }else{
				    				 CFMC=data[i].CFMC;
				    				 
				    			 }
				    			 if(data[i].JDRQ == undefined){
				    				 JDRQ="-";
				    			 }else{
				    				 JDRQ = new Date(data[i].JDRQ).format('yyyy-MM-dd')
				    			 }
				    			 if(data[i].DSRMC == undefined){
				    				 DSRMC="-";
				    			 }else{
				    				 DSRMC=data[i].DSRMC;
				    				 
				    			 }
				    			 if(data[i].CFJDSWH == undefined) {
				    				 CFJDSWH="-";
				    			 }else{
				    				 CFJDSWH=data[i].CFJDSWH;
				    				 
				    			 }
				    			 if(data[i].CFBM == undefined){
				    				 CFBM="-";
				    			 }else{
				    				 CFBM=data[i].CFBM;
				    				 
				    			 }
				    			 tbody +="<tr>"+"<td>"+data[i].DSRMC+"</td>"+"<td>"+DSRZJHM+"</td>"+"<td>"+CFMC+"</td>"+"<td>"+JDRQ+"</td>"+"<td>"+CFJDSWH+"</td>"+"<td>"+CFBM+"</td>"+"</tr>";
				    		 }
				    		 $("#"+id).html(tbody);
				    		 
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='6'>当前无行政处罚记录！</td></tr>");
				    			 
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }

//荣誉查询
 function queryp89(type){
	 var pname,papersType,papersNum,start,end,msg,id,msg1,noDataMsg;
	 if(type == 1){
		 msg="证件号码不能为空！";
		 msg1="姓名不能为空！";
		  pname = $.trim($("#p8name").val());
		  papersType = $("#ps8").val();
		  papersNum = $.trim($("#p8papersNum").val());
		  start = $("#p8start").val();
		  end = $("#p8end").val();
		  id = "p8table";
		  noDataMsg="未查询到该人员的荣誉信息！";
		  
	 }else{
		 msg = "机构代码不能为空！";
		 msg1 = "机构名称不能为空！";
		 pname = $.trim($("#p9name").val());
		  papersNum = $.trim($("#p9papersNum").val());
		  start = $("#p9start").val();
		  end = $("#p9end").val();
		  id = "p9table";
		  noDataMsg="未查询到该法人的荣誉信息！";
	 }
	 
	 if(pname == ""){
		 alert(msg1);
		 return;
	 }
	 if(papersNum == ""){
		 alert(msg);
		 return;
	 }
	  
	
		if(pname != ""  ){
			 $.ajax({
				    url: encodeURI(baseUrl+"getHonor?pname="+pname+"&t"),
				    dataType : 'jsonp',
				    data:{papersType:papersType,papersNum:papersNum,start:start,end:end,type:type},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;
				    	 
				    	var tbody = "";
				    	var ZSBH="";
				    	var RYMC="";
				    	var RYSX="";
				    	var RYDJ="";
				    	var PDRQ="";
				    	var PDDW="";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].ZSBH == undefined){
				    				 ZSBH="-";
				    			 }else{
				    				 ZSBH=data[i].ZSBH;
				    			 }
				    			 if(data[i].RYMC == undefined){
				    				 RYMC="-";
				    			 }else{
				    				 RYMC=data[i].RYMC;
				    				 
				    			 }
				    			 if(data[i].PDRQ == undefined){
				    				 PDRQ="-";
				    			 }else{
				    				 PDRQ = new Date(data[i].PDRQ).format('yyyy-MM-dd')
				    			 }
				    			 if(data[i].RYSX == undefined){
				    				 RYSX="-";
				    			 }else{
				    				 RYSX=data[i].RYSX;
				    				 
				    			 }
				    			 if(data[i].RYDJ == undefined) {
				    				 RYDJ="-";
				    			 }else{
				    				 RYDJ=data[i].RYDJ;
				    				 
				    			 }
				    			 if(data[i].PDDW == undefined){
				    				 PDDW="-";
				    			 }else{
				    				 PDDW=data[i].PDDW;
				    				 
				    			 }
				    			 
							    	 
				    			 tbody +="<tr>"+"<td>"+ZSBH+"</td>"+"<td>"+RYMC+"</td>"+"<td>"+RYSX+"</td>"+"<td>"+RYDJ+"</td>"+"<td>"+PDRQ+"</td>"+"<td>"+PDDW+"</td>"+"</tr>";
				    		 }
				    		 $("#"+id).html(tbody);
				    		 
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='6'>"+noDataMsg+"</td></tr>");
				    			 
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		}
		
 }

 
//公共事业
 function queryp1011(type){
	 var pname,papersType,papersNum,start,end,msg,msg1,id;
	 if(type == 1){
		 msg="用户名或证（表）号应至少填写一个！";
		  pname = $.trim($("#p10name").val());
		  papersType = $("#ps10").val();
		  papersNum = $.trim($("#p10papersNum").val());
		  start = "";
		  end = "";
		  id = "p10table";
	 }else{
		 msg = "机构代码不能为空！";
		 msg1 = "机构名称不能为空！";
		 pname = $.trim($("#p11name").val());
		  papersNum = $.trim($("#p11papersNum").val());
		  start = $("#p11start").val();
		  end = $("#p11end").val();
		  id = "p11table";
	 }
	 
	
	 
 if(type == 1){
	 if(pname == "" && papersNum == ""){
		 alert(msg);
		 return;
	 }
 }else{
	 if(pname == ""){
		 alert(msg1);
		 return;
	 }
	 if(papersNum == ""){
		 alert(msg);
		 return;
	 }
		 
 }
  
	/*
	 * 公共事业
	 * GGSYDWMC	VARCHAR2(100)	Y			公共事业单位名称
QFYWZL	VARCHAR2(100)	Y			欠费业务种类
QFJE	NUMBER(12,2)	Y			欠费金额
QFSSSD	DATE	Y			欠费所属时段
TQTS	NUMBER	Y			拖欠天数
QFBJRQ	DATE	Y			欠费补交日期
QFBJJE	NUMBER(12,2)	Y			欠费补交金额
	 */
			 $.ajax({
				    url: encodeURI(baseUrl+"getPublicUtilities?pname="+pname+"&"+t),
				    dataType : 'jsonp',
				    data:{papersType:papersType,papersNum:papersNum,start:start,end:end,type:type},
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;
				    	if(type == 1){
					    	var tbody = "";
					    	var YHM="";
					    	var GGSYDWMC="";
					    	var MC="";
					    	var ZBH="";
					    	var DZ="";
					    	var QFJE="";
					    	var QFNY="";
					    	if(obj != undefined && obj.length >0){
					    		 for(var i=0;i<obj.length;i++){
					    			 if(data[i].YHM == undefined){
					    				 YHM="-";
					    			 }else{
					    				 YHM=data[i].YHM;
					    			 }
					    			 if(data[i].GGSYDWMC == undefined){
					    				 GGSYDWMC="-";
					    			 }else{
					    				 GGSYDWMC=data[i].GGSYDWMC;
					    				 
					    			 }
					    			 if(data[i].QFNY == undefined){
					    				 QFNY="-";
					    			 }else{
					    				 QFNY = new Date(data[i].QFNY).format('yyyy-MM')
					    			 }
					    			 if(data[i].MC == undefined){
					    				 MC="-";
					    			 }else{
					    				 MC=data[i].MC;
					    				 
					    			 }
					    			 if(data[i].ZBH == undefined) {
					    				 ZBH="-";
					    			 }else{
					    				 ZBH=data[i].ZBH;
					    				 
					    			 }
					    			 if(data[i].DZ == undefined){
					    				 DZ="-";
					    			 }else{
					    				 DZ=data[i].DZ;
					    				 
					    			 }
					    			 if(data[i].QFJE == undefined){
					    				 QFJE="-";
					    			 }else{
					    				 QFJE=data[i].QFJE;
					    			 }
					    			 
					    			 tbody +="<tr>"+"<td>"+GGSYDWMC+"</td>"+"<td>"+YHM+"</td>"+"<td>"+MC+"</td>"+"<td>"+ZBH+"</td>"+"<td>"+DZ+"</td>"+"<td>"+QFJE+"</td>"+"<td>"+QFNY+"</td>"+"</tr>";
					    		 }
					    		 $("#"+id).html(tbody);
					    		 
					    	}else{
					    			 
					    			$("#"+id).html("<tr ><td colspan='7'>当前无欠费信息！</td></tr>");
					    			 
					    	}
					    	
					    
					    
				    	}else{
					    	var tbody = "";
					    	var GGSYDWMC="";
					    	var QFYWZL="";
					    	var QFJE="";
					    	var QFSSSD="";
					    	var TQTS="";
					    	var QFBJRQ="";
					    	var QFBJJE="";
					    	if(obj != undefined && obj.length >0){
					    		 for(var i=0;i<obj.length;i++){
					    			 if(data[i].GGSYDWMC == undefined){
					    				 GGSYDWMC="-";
					    			 }else{
					    				 GGSYDWMC=data[i].GGSYDWMC;
					    			 }
					    			 if(data[i].QFJE == undefined){
					    				 QFJE="-";
					    			 }else{
					    				 QFJE=data[i].QFJE;
										
					    				 
					    			 }
					    			 if(data[i].QFSSSD == undefined){
					    				 QFSSSD="-";
					    			 }else{
					    				 QFSSSD = new Date(data[i].QFSSSD).format('yyyy-MM-dd')
					    			 }
					    			 if(data[i].TQTS == undefined){
					    				 TQTS="-";
					    			 }else{
					    				 TQTS=data[i].TQTS;
					    				 
					    			 }
					    			 if(data[i].QFBJJE == undefined) {
					    				 QFBJJE="-";
					    			 }else{
					    				 QFBJJE=data[i].QFBJJE;
										   
					    				 
					    			 }
					    			 if(data[i].QFYWZL == undefined) {
					    				 QFYWZL="-";
					    			 }else{
					    				 QFYWZL=data[i].QFYWZL;
					    				 
					    			 }
					    			 if(data[i].QFBJRQ == undefined){
					    				 QFBJRQ="-";
					    			 }else{
					    				 QFBJRQ = new Date(data[i].QFBJRQ).format('yyyy-MM-dd')
					    				 
					    			 }
					    			 
					    			 tbody +="<tr>"+"<td>"+GGSYDWMC+"</td>"+"<td>"+QFYWZL+"</td>"+"<td>"+QFJE+"</td>"+"<td>"+QFSSSD+"</td>"+"<td>"+TQTS+"</td>"+"<td>"+QFBJRQ+"</td>"+"<td>"+QFBJJE+"</td>"+"</tr>";
					    		 }
					    		 $("#"+id).html(tbody);
					    		 
					    	}else{
					    			 
					    			$("#"+id).html("<tr ><td colspan='7'>当前无欠费信息！</td></tr>");
					    			 
					    	}
					    	
					    
					    
				    	}
				    },
				    error : function(response) {
				      alert(response);
				    },
				    timeout:6000
				  });
		
 }

 function changeDiv(obj,index,type){
	 hidenDiv();
	 resetFormAndTable();
	 $("li a").removeClass("current");
	 if(type=='1'){
		$(".clse3").html("公共查询");
	 }else{
	    $(".clse3").html("专有查询");
	 }
	 $(".title").html($(obj).html());
	 $(obj).addClass("current");
	 $("#p"+index).toggle(500);
 }


function hgjj(obj,index,zbdm,name,value,type){
	hidenDiv();
	resetFormAndTable();
	$("#type").val(value);
	if(value=='2'){
		$("#monStart").show();
		$("#monEnd").show();
	}else{
		$("#monStart").hide();
		$("#monEnd").hide();
	}
	$("li a").removeClass("current");
	$(obj).addClass("current");
	if(type=='1'){
		$(".clse3").html("公共查询");
	 }else{
	    $(".clse3").html("专有查询");
	 }
	$(".title").html($(obj).html());
	$("#p"+index).toggle(500);
	$("#zbdm").val(zbdm);
	$("#hgjjname").html(name);
	queryp4(1);
}


 //隐藏所有div
 function hidenDiv(){
	 $(".right").each(function(index,obj){
		 $(this).hide();
	 });
 }
 
 //获取行政区划
 function loadPs11(){
	  $.ajax({
		    url: baseUrl+"getMarkTableContentByType",
		    dataType : 'jsonp',
		    data:{tableType:3},
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	var count = data.length;
		    	var str="";
		    	if(count != undefined && count >0){
		    		var flag = "";
		    		for(var i=0; i<count; i++){
		    			if(i==0){
		    				flag = "selected";
		    			}else{
		    				flag = "";
		    			}
		    			str += "<option value='"+data[i].DM+"'"+flag+">"+data[i].MC+"</option>"
		    			
		    		}
		    	}
		    	$("#ps11").append(str);
		    },
		    error : function(response) {
		      alert(response);
		    },
		    timeout:6000
		  });
 }
 
 //获取统计年份
 function loadPs13(){
	  $.ajax({
		    url: baseUrl+"getMarkTableContentByType",
		    dataType : 'jsonp',
		    data:{tableType:2},
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	var count = data.length;
		    	var str="";
		    	if(count != undefined && count >0){
		    		var flag = "";
		    		for(var i=0; i<count; i++){
		    			if(i==0){
		    				flag = "selected";
		    			}else{
		    				flag = "";
		    			}
		    			str += "<option value='"+data[i].DM+"'"+flag+">"+data[i].MC+"</option>"
		    			
		    		}
		    	}
		    	$("#ps13").html(str);
		    	//$("#ps4").html("<option></option>"+str);
				//$("#yearEnd").html("<option></option>"+str);
		    },
		    error : function(response) {
		      alert(response);
		    },
		    timeout:6000
		  });
 }
 //获取所有证件类型
 function loadPs2(){
	  $.ajax({
		    url: baseUrl+"getMarkTableContentByType",
		    dataType : 'jsonp',
		    data:{tableType:1},
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	var count = data.length;
		    	var str="";
		    	if(count != undefined && count >0){
		    		var flag = "";
		    		for(var i=0; i<count; i++){
		    			if(i==0){
		    				flag = "selected";
		    			}else{
		    				flag = "";
		    			}
		    			str += "<option value='"+data[i].DM+"'"+flag+">"+data[i].MC+"</option>"
		    			
		    		}
		    	}
		    	$("#ps2").html(str);
		    	$("#ps7").html(str);
		    	$("#ps8").html(str);
		    	//$("#ps10").html(str);
		    	//$("#ps5").append(str.replace("selected", ""));
		    	//$("#ps6").append(str.replace("selected", ""));
		    	$("#ps71").html(str);
		    },
		    error : function(response) {
		      alert(response);
		    },
		    timeout:6000
		  });
 }
 //重置所有表单和表格
 function resetFormAndTable(){
	 restP1Form();
	 restP2Form();
	 restP3Form();
	 restP4Form();
	 restP7Form();
	 restP5Form();
	 restP6Form();
	 restP8Form();
	 restP9Form();
	 restP10Form();
	 restP11Form();
	 restP20Form();
 }
 function restP20Form(){
	 //企业信息模糊查询重置
	 $("#p20 form")[0].reset();
	 $("#p20table").html(createTr(9));
	 $("#kkpager").html("");
 }
 function restP1Form(){
	//全员人口重置
	 $("#p1 form")[0].reset();
	 $("#p1table").html(createTr(5));
 }
 function restP2Form(){
	 //人口基础信息
	 $("#p2 form")[0].reset();
	 //$("#p2 form")[1].reset();
 }
 function restP3Form(){
	 //法人口基础信息
	 $("#p3 form")[0].reset();
	 //$("#p3 form")[1].reset();
 }
 function restP4Form(){
	//宏观经济重置
	 $("#p4 form")[0].reset();
	 $("#p4table").html(createTr(5));
	 $("#kkpagerOrg").html("");
 }
 function restP5Form(){
	 //个人行政处罚
	 $("#p5 form")[0].reset();
	 $("#p5table").html(createTr(6));
 }
 function restP6Form(){
	 //法人行政处罚
	 $("#p6 form")[0].reset();
	 $("#p6table").html(createTr(6));
 }
 function restP7Form(){
	 //婚姻登记
	 $("#p7 form")[0].reset();
	 $("#p7table").html(createTr(7));
	 //$("#printButton").hide();
 }
 function restP8Form(){
	 //个人荣誉
	 $("#p8 form")[0].reset();
	 $("#p8table").html(createTr(6));
 }
 function restP9Form(){
	 //法人荣誉
	 $("#p9 form")[0].reset();
	 $("#p9table").html(createTr(6));
 }
 function restP10Form(){
	 //个人公共事业
	 $("#p10 form")[0].reset();
	 $("#p10table").html(createTr(7));
 } 
 function restP11Form(){
	 //法人公共事业
	 $("#p11 form")[0].reset();
	 $("#p11table").html(createTr(7));
 }
 function restP12Form(){
	 //法人口基础信息
	 $("#p12 form")[0].reset();
	 $("#p12 form")[1].reset();
 }
 function restP13Form(){
	 //法人口基础信息
	 $("#p13 form")[0].reset();
	 $("#p13 form")[1].reset();
 }
 function restP14Form(){
	 //法人口基础信息
	 $("#p14 form")[0].reset();
	 $("#p14 form")[1].reset();
 }
 function restP15Form(){
	 //法人口基础信息
	 $("#p15 form")[0].reset();
	 $("#p15 form")[1].reset();
 }
 function restP16Form(){
	 //法人口基础信息
	 $("#p16 form")[0].reset();
	 $("#p16 form")[1].reset();
 }
 function restP17Form(){
	 //法人口基础信息
	 $("#p17 form")[0].reset();
	 $("#p17 form")[1].reset();
 }
 function restP18Form(){
	 //法人口基础信息
	 $("#p18 form")[0].reset();
	 $("#p18 form")[1].reset();
 }
 function createTr(num){
	 var str="<tr>";
	 for(var i=0;i<num; i++){
		 str+="<td></td>";
	 }
	 str+="</tr>";
	 return str;
 }
 //弹出打印窗口
 function printM(){
	 var left = ($(window).width()-650)/2;
	 var top = ($(window).height()-530)/2;
	 window.open   ('../ap/servol/print.html',   'newwindow',   'height=530,   width=650,   top='+top+',   left='+left+',   toolbar=no,   menubar=no,   scrollbars=no,   resizable=yes,location=no,   status=no') ;
 }
 //控制弹出一个子窗口../ap/servol/print.html
 var w=null; 
 function openWindow(theURL,winName,features) { //v2.0 
   if(w!=undefined&&isOpen()){ 
    w.close(); 
   } 
    w=window.open("",winName,features); 
    w.location.replace(theURL); 
 } 
 function isOpen() 
 { 
   try 
   { 
   w.document; 
   return true; 
   } 
   catch(ex) 
   {} 

   return false; 
 } 
 

 function changeselectvalue(data){
	 if(data=="个体经营"){
		 $("#table16").empty();	
		 $("#table16").html( "  	<tr> "+
			     "	<td class='one'> 登记注册类型:</td>"+
			       " <td class='two'><input type='text' id='djzclx'/></td>"+
			 "   </tr>"+
			  "  <tr>"+
			    "	<td class='one'>开业（设立）日期:</td>"+
			    "   <td class='two'><input type='text' id='kyslrq'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "  	<td class='one'>,批准设立机关:</td>"+
			 "       <td class='two'><input type='text' id='pzsljg'/></td>"+
			 "   </tr>"+
			 "  <tr>"+
			 "   	<td class='one'>生产经营期限:</td>"+
			 "       <td class='two'><input type='text' id='scjyqx'/></td>"+
			 "  </tr>"+
			 "  <tr>"+
			 "    	<td class='one'>,证照名称:</td>"+
			 "       <td class='two'><input type='text' id='zzmc'/></td>"+
			 "  </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>证照号码:</td>"+
			 "       <td class='two'><input type='text' id='zzhm'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>注册地址:</td>"+
			 "       <td class='two'><input type='text' id='zcdz'/></td>"+
			  "  </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>注册地邮政编码:</td>"+
			 "       <td class='two'><input type='text' id='zcdzbh'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "  	<td class='one'>注册地联系电话:</td>"+
			 "      <td class='two'><input type='text' id='zcdlxdh'/></td>"+
			 "   </tr>"+
			"	<tr>"+
			 "   	<td class='one'>生产经营地址:</td>"+
			  "      <td class='two'><input type='text' id='scjydz'/></td>"+
			  "  </tr>   "+
			  "  <tr>"+
			   " 	<td class='one'>生产经营地邮政编码:</td>"+
			  "      <td class='two'><input type='text' id='scjydyzbm'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>生产经营地联系电话:</td>"+
			  "      <td class='two'><input type='text' id='scjydlxdh'/></td>"+
			  "  </tr>"+
			  "  <tr>"+
			   " 	<td class='one'>网站网址:</td>"+
			  "      <td class='two'><input type='text' id='wzwz'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>国标行业:</td>"+
			 "       <td class='two'><input type='text' id='gbhy'/></td>"+
			 "  </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>业主姓名:</td>"+
			 "      <td class='two'><input type='text' id='yzxm'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>业主国籍或户籍地:</td>"+
			 "       <td class='two'><input type='text' id='yzgjhhjd'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "  	<td class='one'>业主固定电话:</td>"+
			 "       <td class='two'><input type='text' id='yzgddh'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "   	<td class='one'>业主移动电话:</td>"+
			 "       <td class='two'><input type='text' id='yzyddh'/></td>"+
			 "   </tr>"+
			 "   <tr>"+
			 "  	<td class='one'>业主电子邮箱:</td>"+
			 "      <td class='two'><input type='text' id='yzdyyx'/></td>"+
			 "   </tr>"+
			 "  <tr>"+
			 "   	<td class='one'>业主身份证件名称:</td>"+
			 "      <td class='two'><input type='text' id='yzsfzjmc'/></td>"+
			 "   </tr>"+
			 "  <tr>"+
			 "   	<td class='one'>业主证件号码:</td>"+
			 "      <td class='two'><input type='text' id='yzzjhm'/></td>"+
			  "  </tr>"+
			 "   <tr>"+
			 "  	<td class='one'>业主经营范围:</td>"+
			 "       <td class='two'><input type='text' id='yzjyfw'/></td>"+
			 "   </tr>");
			 
	 }
	 if(data=="单位纳税人"){
		 $("#table16").empty();
		 $("#table16").html( "  	<tr> "+
     "	<td class='one'> 纳税人状态:</td>"+
       " <td class='two'><input type='text' id='nsrzt'/></td>"+
 "   </tr>"+
  "  <tr>"+
    "	<td class='one'>登记注册类型:</td>"+
    "   <td class='two'><input type='text' id='djzclx'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "  	<td class='one'>组织机构代码:</td>"+
 "       <td class='two'><input type='text' id='zzjgdm'/></td>"+
 "   </tr>"+
 "  <tr>"+
 "   	<td class='one'>批准设立机关:</td>"+
 "       <td class='two'><input type='text' id='pzsljg'/></td>"+
 "  </tr>"+
 "   <tr>"+
 "   	<td class='one'>批准设立证明或文件:</td>"+
 "       <td class='two'><input type='text' id='pzslzmhwj'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "   	<td class='one'>税务登记类型:</td>"+
 "       <td class='two'><input type='text' id='swdjlx'/></td>"+
  "  </tr>"+
 "   <tr>"+
 "   	<td class='one'>登记日期:</td>"+
 "       <td class='two'><input type='text' id='djrq'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "  	<td class='one'>开业日期:</td>"+
 "      <td class='two'><input type='text' id='kyrq'/></td>"+
 "   </tr>"+
"	<tr>"+
 "   	<td class='one'>生产经营期限起:</td>"+
  "      <td class='two'><input type='text' id='scjyqxq'/></td>"+
  "  </tr>   "+
  "  <tr>"+
   " 	<td class='one'>生产经营期限止:</td>"+
  "      <td class='two'><input type='text' id='scjyqxz'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "   	<td class='one'>证照名称:</td>"+
  "      <td class='two'><input type='text' id='zzmc'/></td>"+
  "  </tr>"+
  "  <tr>"+
   " 	<td class='one'>证照号码:</td>"+
  "      <td class='two'><input type='text' id='zzhm'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "   	<td class='one'>注册地址:</td>"+
 "       <td class='two'><input type='text' id='zcdz'/></td>"+
 "  </tr>"+
 "   <tr>"+
 "   	<td class='one'>注册地址邮政编码:</td>"+
 "      <td class='two'><input type='text' id='zcdzyjbm'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "   	<td class='one'>注册地址联系电话:</td>"+
 "       <td class='two'><input type='text' id='zcdzlxdh'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "  	<td class='one'>生产经营地址:</td>"+
 "       <td class='two'><input type='text' id='scjydz'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "   	<td class='one'>生产经营地址邮政编码:</td>"+
 "       <td class='two'><input type='text' id='scjydzyzbm'/></td>"+
 "   </tr>"+
 "   <tr>"+
 "  	<td class='one'>生产经营地址联系电话:</td>"+
 "      <td class='two'><input type='text' id='scjydzlxdh'/></td>"+
 "   </tr>"+
 "  <tr>"+
 "   	<td class='one'>核算方式:</td>"+
 "      <td class='two'><input type='text' id='hsfs'/></td>"+
 "   </tr>"+
 "  <tr>"+
 "   	<td class='one'>单位性质:</td>"+
 "      <td class='two'><input type='text' id='dwxz'/></td>"+
  "  </tr>"+
 "   <tr>"+
 "  	<td class='one'>国标行业:</td>"+
 "       <td class='two'><input type='text' id='gbhy'/></td>"+
 "   </tr>"+
  "  <tr>"+
  "  	<td class='one'>经营范围:</td>"+
 "       <td class='two'><input type='text' id='jyfw'/></td>"+
  "  </tr>"+
   " <tr>"+
  "  	<td class='one'>行政区划:</td>"+
  "      <td class='two'><input type='text' id='xzqh'/></td>"+
  "  </tr>"+
  "  <tr>"+
  "  	<td class='one'>法定代表人（负责人）姓名:</td>"+
  "      <td class='two'><input type='text' id='fddbrfzrxm'/></td>"+
  "  </tr>"+
   " <tr>"+
  "  	<td class='one'>法定代表人（负责人）身份证件类型:</td>"+
   "     <td class='two'><input type='text' id='fddbrfzrsfzjlx'/></td>"+
  "  </tr>"+
   "  <tr>"+
   " 	<td class='one'>法定代表人（负责人）身份证件号码:</td>"+
  "      <td class='two'><input type='text' id='fddbrfzrsfzjhm'/></td>"+
  "  </tr>"+
  "    <tr>"+
  "  	<td class='one'>,法定代表人（负责人）固定电话:</td>"+
  "      <td class='two'><input type='text' id='frdbrfzrgddh'/></td>"+
  "  </tr>"+
  "    <tr>"+
  " 	<td class='one'>法定代表人（负责人）移动电话:</td>"+
  "      <td class='two'><input type='text' id='fddbrfzryddh'/></td>"+
   " </tr>"+
  "    <tr>"+
   " 	<td class='one'>法定代表人（负责人）电子邮箱:</td>"+
   "     <td class='two'><input type='text' id='fddbrfzrdzyx'/></td>"+
  "  </tr>"+
   "   <tr>"+
  "  	<td class='one'>发照日期:</td>"+
 "       <td class='two'><input type='text' id='fzrq'/></td>"+
 "   </tr> ");
	 }
	 
 }
 
 