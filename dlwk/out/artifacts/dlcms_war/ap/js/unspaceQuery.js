//---------------------------------------公共变量------------------------------------

var baseUrl = globalInterfaceDomain+"/csdsc/onlineInformationHandler/";
var t = "authKey="+authKey+"&timestamp="+new Date().getTime();
var upload1;

//---------------------------------------公共变量-------------------------------------

//---------------------------------------加载调用方法-------------------------------------
$(function(){
	loadPs2();
	loadPs10();
	loadPs11();
	loadPs13();
    //低保核查使用
    fileUpload();
});
//---------------------------------------加载调用方法-------------------------------------
//------------------------------------------------------系统方法---------------------------------------------------------
//------------------------------------选择菜单调用方法开始------------------------------------------
//重置所有表单和表格
function resetFormAndTable(){
    restP1Form();
    restP2Form();
    restP3Form();
    restP4Form();
    restP98Form();
    restP97Form();
    restP96Form();
    restP95Form();
    restP7Form();
    restP5Form();
    restP6Form();
    restP8Form();
    restP9Form();
    restP10Form();
    restP11Form();
    restP20detailForm();//人口图谱
    restP20Form();//人口图谱
    restP101Form();//低保核查
    restP102Form();//入住率
    restP103Form();//案件审理
    restP104Form();//客栈分析
    restP105Form();//旅游执法
    restP106Form();//客源分析
    restP108Form();//信息核查
    restP109Form();//就业核查
    restP110Form();//医疗分析
    restP111Form();//退伍安置
    restP112Form();//惠农补贴
    restP113Form();//少数民族少儿入园率
    restP115Form();//宗教教职人员
    restP116Form();//宗教社团监管
    restP117Form();//特少民族学生管理
    restP118Form();//流动少数民族管理
    //restP119Form();//少数民族分析
    //restP120Form();//流动少数民族分析
    restP121Form();//招商监管
    restP123Form();
    restP124Form();
}
function changeDiv(obj,index){
    hidenDiv();
    $("#appInfo").hide();
    //正式系统
    if(globalInterfaceDomain!="http://localhost:6565/service/api" && globalInterfaceDomain!="http://1.10.4.191:6565/service/api"){
        resetFormAndTable();
    }
    $("#tab_con .current").removeClass("current");
    $(obj).addClass("current");
    $("#p"+index).toggle(500);
    if(index =='20'){
        $("#populationli").click();
    }
    kkpagerGis._clickHandler(1,0);
    $("#p"+index+"table").empty();
    $("tr[id^='tr']").remove();
    $("#kkpagerGis").remove();

    //点击菜单时查询展示数据
	if(index==119){
        queryp119_SSMZFX();
        useApplicationTimes('少数民族分析');
	}
	if(index==120){
        queryp120_LDSSMZFX();
        useApplicationTimes('流动少数名族分析');
	}


}
//隐藏所有div
function hidenDiv(){
    $(".right").each(function(index,obj){
        $(this).hide();
    });
}
//------------------------------------选择菜单调用方法结束------------------------------------------

//------------------------------------分页控件初始化开始----------------------------------------
function kkpagerinit(pno,totalRecords,limit){
    var total=parseInt((totalRecords-1)/limit)+1;
    kkpagerGis.pagetableid = '';
    kkpagerGis.total=total;
    kkpagerGis.totalRecords=totalRecords;
    kkpagerGis.pagelimit = limit;
    //生成分页控件
    kkpagerGis.generPageHtml({
        pno: pno,
        mode : 'click', //可选，默认就是link
        //总页码
        total: total,
        //总数据条数
        totalRecords: totalRecords,
        //链接算法
        click: function (n,sum,pagelimit) {
            //获取第n页数据
            var small = pagelimit*(n-1);
            var large = pagelimit*n-1;

            for(var i=0;i<sum;i++){
                var tr = $("#tr"+i);
                if(i>=small && i<=large){
                    tr.css("display","table-row");
                }else{
                    tr.css("display","none");
                }
            }
            this.selectPage(n);//页码跳转
        }
    },true);
}
//id；表格的id
function kkpagerinitbyId(id,pno,totalRecords,limit){
    var total=parseInt((totalRecords-1)/limit)+1;
    kkpagerGis.pagetableid = id;
    kkpagerGis.total=total;
    kkpagerGis.totalRecords=totalRecords;
    kkpagerGis.pagelimit = limit;
    //生成分页控件
    kkpagerGis.generPageHtml({
        pno: pno,
        mode : 'click', //可选，默认就是link
        //总页码
        total: total,
        //总数据条数
        totalRecords: totalRecords,
        //链接算法
        click: function (n,sum,pagelimit,tid) {
            //获取第n页数据
            var small = pagelimit*(n-1);
            var large = pagelimit*n-1;

            for(var i=0;i<sum;i++){
                var tr = $("#"+tid+"tr"+i);
                if(i>=small && i<=large){
                    tr.css("display","table-row");
                }else{
                    tr.css("display","none");
                }
            }
            this.selectPage(n);//页码跳转
        }
    },true);
}

function kkpagerinitAppbyId(id,pno,totalRecords,limit){
    var total=parseInt((totalRecords-1)/limit)+1;
    appDescFy.pagetableid = id;
    appDescFy.total=total;
    appDescFy.totalRecords=totalRecords;
    appDescFy.pagelimit = limit;
    //生成分页控件
    appDescFy.generPageHtml({
        pno: pno,
        mode : 'click', //可选，默认就是link
        //总页码
        total: total,
        //总数据条数
        totalRecords: totalRecords,
        //链接算法
        click: function (n,sum,pagelimit,tid) {
            //获取第n页数据
            var small = pagelimit*(n-1);
            var large = pagelimit*n-1;

            for(var i=0;i<sum;i++){
                var tr = $("#"+tid+"_"+i);
                if(i>=small && i<=large){
                    tr.css("display","table-row");
                }else{
                    tr.css("display","none");
                }
            }
            this.selectPage(n);//页码跳转
        }
    },true);
}
//-------------------------------------分页控件初始化结束---------------------------------------

//-------------------------------------------------------系统方法--------------------------------------------------------

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
				      alert(response.statusText);
				    },
				    timeout:60000
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
							$("#p2 form")[1].reset();
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
				    		$("#p2 form")[1].reset();
				    		alert("无该人员信息");
				    	}
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//人口详细信息查询
function queryp101(){
    var msg;
	var papersNum = $.trim($("#p92sfzjh").val());
//人员基本信息
	if(pname != ""  || papersNum != ""){
		var id="101persontable"
		 $.ajax({
			 url: encodeURI(baseUrl+"getPopulationXxInfo?papersNum="+papersNum+"&"+t),
			    dataType : 'jsonp',
//			    data:{papersType:papersType,papersNum:papersNum},
			    jsonp : "jsonpcallback",
			    success : function(data) {
			    	var obj = data;
			    	var table= "";
			    	var XM="";
			    	var CYM="";
			    	var XB="";
			    	var MC="";
			    	var ZJLX="";
			    	var SFZJH="";
			    	var DQHMC="";
			    	var FKSZD="";
			    	var HKXZ="";
			    	var JZDZ="";
			    	var XZZ="";
			    	var HYZK="";
			    	var CSRR="";
			    	var GLZT="";
			    	if(obj != undefined && obj.length >0){
			    		 for(var i=0;i<obj.length;i++){
			    			 if(data[i].XM == undefined){
			    				 XM="";
			    			 }else{
			    				 XM=data[i].XM;
			    			 }
			    			 
			    			 if(data[i].CYM == undefined){
			    				 CYM="";
			    			 }else{
			    				 CYM = data[i].CYM;
			    			 }
			    			 
			    			 if(data[i].XB == undefined){
			    				 XB="";
			    			 }else{
			    				 XB = data[i].XB;
			    			 }
			    			 
			    			 if(data[i].MC == undefined){
			    				 MC="";
			    			 }else{
			    				 MC=data[i].MC;
			    			 }
			    			 
			    			 if(data[i].ZJLX == undefined) {
			    				 ZJLX="";
			    			 }else{
			    				 ZJLX=data[i].ZJLX;
			    			 }
			    			 
			    			 if(data[i].SFZJH == undefined){
			    				 SFZJH="";
			    			 }else{
			    				 SFZJH=data[i].SFZJH;
			    			 }
			    			 
			    			 if(data[i].DQHMC == undefined){
			    				 DQHMC="";
			    			 }else{
			    				 DQHMC=data[i].DQHMC;
			    				 
			    			 }
			    			 
			    			 if(data[i].FKSZD == undefined){
			    				 FKSZD="";
			    			 }else{
			    				 FKSZD=data[i].FKSZD;
			    				 
			    			 }
			    			 
			    			 if(data[i].HKXZ == undefined){
			    				 HKXZ="";
			    			 }else{
			    				 HKXZ=data[i].HKXZ;
			    				 
			    			 }
			    			 
			    			 if(data[i].JZDZ == undefined){
			    				 JZDZ="";
			    			 }else{
			    				 JZDZ=data[i].JZDZ;
			    				 
			    			 }
			    			 
			    			 if(data[i].XZZ == undefined){
			    				 XZZ="";
			    			 }else{
			    				 XZZ=data[i].XZZ;
			    				 
			    			 }
			    			 if(data[i].HYZK == undefined){
			    				 HYZK="";
			    			 }else{
			    				 HYZK=data[i].HYZK;
			    			 }
			    			 
			    			 if(data[i].CSRR == undefined){
			    				 CSRR="";
			    			 }else{
			    				 CSRR=new Date(data[i].CSRR).format('yyyy-MM-dd');
			    			 }
			    			 if(data[i].GLZT == undefined){
			    				 GLZT="";
			    			 }else{
			    				 GLZT=data[i].GLZT;
			    			 }
			    			 
	         			table ="<tr><td >姓名：</td><td><input type='text' disabled='disabled' value="+XM+" style='width:120px;' class='text' /></td>"+
			    			 "<td>姓别：</td><td><input disabled='disabled' type='text' value="+XB+" style='width:120px;' class='text' /></td>"+
			    			 "<td>管理状态：</td><td><input disabled='disabled' type='text' value="+GLZT+" style='width:120px;' class='text' /></td></tr>"+
			    			 "<tr><td>民族：</td><td><input disabled='disabled' type='text' value="+MC+" style='width:120px;' class='text' /></td>"+
			    			 "<td>婚姻状况：</td><td><input disabled='disabled' type='text' value="+HYZK+" style='width:120px;' class='text' /></td>"+
			    			 "<td>出生日期：</td><td><input disabled='disabled' type='text' value="+CSRR+" style='width:120px;' class='text' /></td></tr>"+
			    			 "<tr><td>所属区县：<td colspan='5' ><input disabled='disabled' type='text' value="+DQHMC+" style='width:650px;' class='text' /></td></tr>";	
			    			 }
			    		 $("#"+id).html(table);
			    	}else{
			    		$("#"+id).html("<tr ><td colspan='10'>当前无人员信息记录！</td></tr>");
			    	}
			    },
			    error : function(response) {
			      alert(response.statusText);
			    },
			    timeout:60000
			  });
	}
}
//法人查询
function queryp3(){
	 var porgName = $.trim($("#porgName").val());
	 var porgCode = $.trim($("#porgCode").val());
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
				    url: encodeURI(baseUrl+"getLegalPersonInfo?porgName="+porgName+"&porgCode="+porgCode+"&"+t),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data.data;
				    	if(obj != undefined){
							$("#p3 form")[1].reset();
				    		$("#orgName").val(obj.orgName);
				    		$("#regOrgName").val(obj.regOrgName);
				    		$("#orgCode").val(obj.orgCode);
				    		$("#regNumber").val(obj.regNumber);
							if(obj.registerDate !=null)
				    		$("#registerDate").val(new Date(obj.registerDate).format('yyyy-MM-dd'));
							//if(obj.startDate !=null && obj.endDate !=null )
				    		//$("#busnissTime").val(new Date(obj.startDate).format('yyyy-MM-dd')+"至"+new Date(obj.endDate).format('yyyy-MM-dd'));
							$("#busnissTime").val(obj.busnissTime);
							$("#buildWay").val(obj.buildWay);
				    		$("#unit").val(obj.unit);
				    		$("#legalPersonType").val(obj.legalPersonType);
				    		$("#orgType").val(obj.orgType);
							if(obj.logoutDate !=null)
				    		$("#logoutDate").val(new Date(obj.logoutDate).format('yyyy-MM-dd'));
				    		$("#orgAddress").val(obj.orgAddress);
				    	}else{
				    		$("#p3 form")[1].reset();
				    		alert("无该法人信息");
				    	}
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
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
							$("#jgmc").val(obj.jgmc);
							$("#jgdm").val(obj.jgdm);
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
				      alert(response.statusText);
				    },
				    timeout:60000
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
				    	var obj = data;
                        $("#p13 form")[1].reset();
				    	if(obj == undefined){
                            $("#p13 form")[1].reset();
                            alert("无该学校信息");
                        }else{
                            var len = data.length;
                            var sumTr =  Math.floor(len/3);
                            var tr="";
                            for(var i=0;i<sumTr;i++){
                                var one =data[i*3];
                                var two =data[i*3+1];
                                var three =data[i*3+2];
                                tr =tr+ "<tr><td align='left' >"+
                                    "<a style='cursor: pointer;' onclick=\"p13_show('"+one['XXBSM']+"','"+one['XXDM']+"','"+one['ZGBM']+"','"+one['DWLB']+"','"+one['XJ']+"','"+one['XC']+"','"+one['LXDH']
									+"','"+one['WZ']+"','"+one['JXNY']+"','"+one['DZ']+"','"+one['YB']+"','"+one['XXMC']+"')\">"+checkUndefind(one['XXMC'],'-')+"</a>"+"</td><td align='left'>"+
                                    "<a style='cursor: pointer;' onclick=\"p13_show('"+two['XXBSM']+"','"+two['XXDM']+"','"+two['ZGBM']+"','"+two['DWLB']+"','"+two['XJ']+"','"+two['XC']+"','"+two['LXDH']
                                +"','"+two['WZ']+"','"+two['JXNY']+"','"+two['DZ']+"','"+two['YB']+"','"+two['XXMC']+"')\">"+checkUndefind(two['XXMC'],'-')+"</a>"+"</td><td align='left'>"+
                                    "<a style='cursor: pointer;' onclick=\"p13_show('"+three['XXBSM']+"','"+three['XXDM']+"','"+three['ZGBM']+"','"+three['DWLB']+"','"+three['XJ']+"','"+three['XC']+"','"+three['LXDH']
                                +"','"+three['WZ']+"','"+three['JXNY']+"','"+three['DZ']+"','"+three['YB']+"','"+three['XXMC']+"')\">"+checkUndefind(three['XXMC'],'-')+"</a>"+
                                    "</td></tr>";
                            }
                            if(3*sumTr<len){
                                tr =tr+ "<tr>";
                                for(var i=0;i<len-sumTr*3;i++){
                                    var one =data[sumTr*3+i]
                                    tr=tr+"<td align='left'><a style='cursor: pointer;' onclick=\"p13_show('"+checkUndefind(one['XXMC'],'-')+"')\">"+checkUndefind(one['XXMC'],'-')+"</a>"+"</td>"
                                }
                                tr=tr+"</tr>";
                            }
                            $("#p13_item").html(tr);

				    	}
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }


function p13_show(XXBSM,XXDM,ZGBM,DWLB,XJ,XC,LXDH,WZ,JXNY,DZ,YB,XXMC) {
    $("#xxmc").val(checkUndefind(XXMC,'-'));
    $("#xxbsm").val(checkUndefind(XXBSM,'-'));
    $("#xxdm").val(checkUndefind(XXDM,'-'));
    $("#zgbm").val(checkUndefind(ZGBM,'-'));
    $("#dwlb").val(checkUndefind(DWLB,'-'));
    $("#xj").val(checkUndefind(XJ,'-'));
    $("#xz").val(checkUndefind(XC,'-'));
    $("#p13_lxdh").val(checkUndefind(LXDH,'-'));
    $("#wz").val(checkUndefind(WZ,'-'));
    $("#jxny").val(checkUndefind(JXNY,'-'));
    $("#dz").val(checkUndefind(DZ,'-'));
    $("#yb").val(checkUndefind(YB,'-'));
}
//税务信息查询
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
				      alert(response.statusText);
				    },
				    timeout:60000
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
				    		var lxdh=obj.lXDH.replace(/,/g, '');
				    		$("#LXDH").val(lxdh);
				    		$("#XSBZRS").val(obj.xSBZRS);
				    		$("#HYBZJE").val(obj.hYBZJE);
				    		$("#JTRKZSRY").val(obj.jTRKZSRY);
				    		$("#ZDSHBZBZ").val(obj.zDSHBZBZ);
				    		$("#KHYH").val(obj.kHYH);
				    	}else{
				    		$("#p18 form")[1].reset();
				    		alert("无该低保人员信息");
				    	}
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//婚姻信息查询
function queryp7(){
	 var pname = $.trim($("#p7name").val());
	 var papersType = $("#ps7").val();
	 var papersTypeText = $("#ps7").find("option:selected").text().replace("(","（");
	 var papersNum = $.trim($("#p7papersNum").val());

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
				    	if(data.data != undefined) {
                            $("#argMap1").val(JSON.stringify(data.data.argMap));
                            $("#queryLogId").val(data.data.queryLogId);
                            $("#mdata").val(JSON.stringify(data.data.list));
                        }
				    	var obj = data.data.list;

				    	var tbody = "";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){


                                var ZZH=checkUndefind(obj[i].ZZH);
                                 var DJXZ=checkUndefind(obj[i].DJXZ);
                                 var DJRQ=checkUndefind(obj[i].DJRQ);
                                 var NAN=checkUndefind(obj[i].NAN);
                                 var NANZJ=checkUndefind(obj[i].NANZJ);
                                 var NV=checkUndefind(obj[i].NV);
                                 var NVZJ=checkUndefind(obj[i].NVZJ);

 			    			    if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+ZZH+"</td><td>"+DJXZ+"</td><td>"+DJRQ+"</td><td>"+NAN+"</td><td>"+NANZJ+"</td><td>"+NV+"</td><td>"+NVZJ+"</td></tr>";
					    		} else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+ZZH+"</td><td>"+DJXZ+"</td><td>"+DJRQ+"</td><td>"+NAN+"</td><td>"+NANZJ+"</td><td>"+NV+"</td><td>"+NVZJ+"</td></tr>";
					    		}
				    		 }
				    		 $("#p7table").html(tbody);
						     $("#p7fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);

				    		 
				    	}else{
							$("#p7table").html("<tr ><td colspan='7'>无婚姻登记记录</td></tr>");
							$("#p7fy").html("");
				    	}
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//宏观经济
function queryp19(name){
	 var id = "p19table";
	//清空查询结果
	 $("#"+id).empty();
	 $("#p19fy").empty();
	
		 msg="统计时间不能为空！";
		 var type = $("#p19type").val();
		 var time = $("#p19time").val();
		 var typename = "";
		
	 if(time == ""){
		 alert(msg);
		 return;
	 }
	 if(name==undefined){
		 name="";
	 }
	 
	 if(type == ""){
		 type= "year";
		
	 }
	 if(type == "year"){
		 typename = "年度指标";
	 }else if(type == "month"){
		 typename = "月度指标";
	 }
	  
	if(time != ""  ){
		 
		$.ajax({
	    url: encodeURI(baseUrl+"getMacroeconomicInfo?time="+time+"&type="+type+"&name="+name+"&"+t),
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    success : function(data) {

	    	var tbody = "";
	    	var indicatorsFullName="";
	    	var indicatorsUnit="";
	    	var curindicatorsUnitrentValue="";
	    	var totalValue="";
	    	var growthValue="";
	    	var alllen = data.length;
	    	if(data != undefined && alllen >0){
	    		 for(var i=0;i<alllen;i++){
	    			obj = data[i];
	    			 if(obj.indicatorsFullName == undefined){
	    				 indicatorsFullName="-";
	    			 }else{
	    				var len = obj.indicatorsCode.length;
	    				 indicatorsFullName=obj.indicatorsFullName;
	    				 
	    				if(len>4){//子项添加空格
	    					var space ="&nbsp;&nbsp;&nbsp;&nbsp;";
	    					var word=""
	    					var size = len/2 - 2;
	    					for(var j=0; j<size; j++){
	    						word = word+space;
	    					}
	    					indicatorsFullName=word+indicatorsFullName;
	    				}
	    			 }
	    			 if(obj.indicatorsUnit == undefined){
	    				 indicatorsUnit="-";
	    			 }else{
	    				 indicatorsUnit=obj.indicatorsUnit;
	    			 }
	    			 if(obj.currentValue == undefined){
	    				 currentValue="-";
	    			 }else{
	    				 currentValue = obj.currentValue;
	    			 }
	    			 if(obj.totalValue == undefined){
	    				 totalValue="-";
	    			 }else{
	    				 totalValue=obj.totalValue;
	    			 }
	    			 if(obj.growthValue == undefined) {
	    				 growthValue="-";
	    			 }else{
	    				 growthValue=obj.growthValue;
	    			 }
	    			 
	    			if(i<=9){
		    			 tbody +="<tr id='tr"+i+"'><td align='left'>"+indicatorsFullName+"</td><td>"+typename+"</td><td>"+indicatorsUnit+"</td><td>"+currentValue+"</td><td>"+totalValue+"</td><td>"+growthValue+"</td></tr>";
		    		}
		    		else{
		    			 tbody +="<tr id='tr"+i+"' style='display:none'><td align='left'>"+indicatorsFullName+"</td><td>"+typename+"</td><td>"+indicatorsUnit+"</td><td>"+currentValue+"</td><td>"+totalValue+"</td><td>"+growthValue+"</td></tr>";
		    		}
	    		 }
	    		 $("#"+id).html(tbody);
	    		
			     $("#p19fy").html("<div id='kkpagerGis'></div>");
		    	 kkpagerinit(1,data.length,10);
	    		 
	    	}else{
	    			 
	    			$("#"+id).html("<tr ><td colspan='10'>无该查询条件的宏观经济记录，请检查查询条件！</td></tr>");
	    			$("#p19fy").html("");
	    	}
	    
	    },
	    error : function(response) {
	      alert(response.statusText);
	    },
	    timeout:60000
	  });
	}
 }
//宏观经济指标变换显示的时间格式
function p19showTime(){
    var type = $("#p19type").val();
    if(type=="month"){
        WdatePicker({dateFmt:'yyyy-MM',isShowToday: false});
    }else{
        WdatePicker({dateFmt:'yyyy',isShowToday: false});
    }
}

function p19ClearTime(){
    $("#p19time").val("");
    $("#p19target").val("");
    $("#p19table").empty();
    $("#p19fy").empty();
}
//宏观经济查询条件没有指标
function queryp19NoZB(){
	 queryp19("");
}
//宏观经济查询条件有指标
function queryp19ZB(){
	 var name = $("#p19target").val();
	 queryp19(name);
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
			    				if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+XM+"</td><td>"+SFZHM+"</td><td>"+XB+"</td><td>"+CSNY+"</td><td>"+CJXZ+"</td><td>"+JFSD+"</td><td>"+DWMC+"</td><td>"+DWSBBH+"</td><td>"+JNZT+"</td><td>"+GRSBBH+"</td></tr>";
					    		}
					    		else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+XM+"</td><td>"+SFZHM+"</td><td>"+XB+"</td><td>"+CSNY+"</td><td>"+CJXZ+"</td><td>"+JFSD+"</td><td>"+DWMC+"</td><td>"+DWSBBH+"</td><td>"+JNZT+"</td><td>"+GRSBBH+"</td></tr>";
					    		}
				    		 }
				    		 $("#"+id).html(tbody);
						     $("#p14fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);
				    		 
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='10'>当前无个人社保记录！</td></tr>");
				    			$("#p14fy").html("");
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//房屋产权登记信息
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
				    			
				    			if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+new Date(HTQDSJ).format('yyyy-MM-dd')+"</td><td>"+DZXMMC+"</td><td>"+ZDWZ+"</td><td>"+SRR+"</td><td>"+HTBH+"</td><td>"+TDYT+"</td><td>"+TDMJ+"</td><td>"+HTJK+"</td></tr>";
					    		}
					    		else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+new Date(HTQDSJ).format('yyyy-MM-dd')+"</td><td>"+DZXMMC+"</td><td>"+ZDWZ+"</td><td>"+SRR+"</td><td>"+HTBH+"</td><td>"+TDYT+"</td><td>"+TDMJ+"</td><td>"+HTJK+"</td></tr>";
					    		}
				    		 }
				    		 $("#"+id).html(tbody);
						     $("#p15fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='10'>当前无土地出让信息！</td></tr>");
				    			$("#p15fy").html("");
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//税务局纳税信息
 function queryp99(){
	 var pname,papersNum,msg,id;
	
		 msg="纳税人名称不能为空！";
		  pname = $.trim($("#p99name").val());
		  nsrsbh = $.trim($("#p99nsrsbh").val());
		 
		  id = "p99table";
	
	 if(pname == ""){
		 alert(msg);
		 return;
	 }
	  
	
		if(pname != ""  ){
			 $.ajax({
				    url: encodeURI(baseUrl+"getNsInfo?nsrmc="+pname+"&nsrsbh="+nsrsbh+"&"+t+"&page=1&count=10"),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;

				    	var tbody = "";
				    	var NSRMC="";
				    	var NSRSBH="";
				    	var ZSXM="";
				    	var ZSPM="";
				    	var SJJE="";
				    	var SKSSQQ="";
				    	var SKSSQZ="";
				    	var JKRQ="";
				    	var ZSSWJG="";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].NSRMC == undefined){
				    				 NSRMC="-";
				    			 }else{
				    				 NSRMC=data[i].NSRMC;
				    			 }
				    			 if(data[i].NSRSBH == undefined){
				    				 NSRSBH="-";
				    			 }else{
				    				 NSRSBH=data[i].NSRSBH;
				    				 
				    			 }
				    			 if(data[i].ZSXM == undefined){
				    				 ZSXM="-";
				    			 }else{
				    				 ZSXM = data[i].ZSXM;
				    			 }
				    			 if(data[i].ZSPM == undefined){
				    				 ZSPM="-";
				    			 }else{
				    				 ZSPM=data[i].ZSPM;
				    				 
				    			 }
				    			 if(data[i].SJJE == undefined) {
				    				 SJJE="-";
				    			 }else{
				    				 SJJE=data[i].SJJE;
				    				 
				    			 }
				    			 if(data[i].SKSSQQ == undefined){
				    				 SKSSQQ="-";
				    			 }else{
				    				 SKSSQQ=data[i].SKSSQQ;
				    				 
				    			 }
				    			 if(data[i].SKSSQZ == undefined){
				    				 SKSSQZ="-";
				    			 }else{
				    				 SKSSQZ=data[i].SKSSQZ;
				    				 
				    			 }
				    			 if(data[i].JKRQ == undefined){
				    				 JKRQ="-";
				    			 }else{
				    				 JKRQ=data[i].JKRQ;
				    				 
				    			 }
				    			 if(data[i].ZSSWJG == undefined){
				    				 ZSSWJG="-";
				    			 }else{
				    				 ZSSWJG=data[i].ZSSWJG;
				    				 
				    			 }
				    			if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+NSRMC+"</td><td>"+NSRSBH+"</td><td>"+ZSXM+"</td><td>"+ZSPM+"</td><td>"+SJJE+"</td><td>"+SKSSQQ+"</td><td>"+SKSSQZ+"</td><td>"+JKRQ+"</td><td>"+ZSSWJG+"</td></tr>";
					    		}
					    		else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+NSRMC+"</td><td>"+NSRSBH+"</td><td>"+ZSXM+"</td><td>"+ZSPM+"</td><td>"+SJJE+"</td><td>"+SKSSQQ+"</td><td>"+SKSSQZ+"</td><td>"+JKRQ+"</td><td>"+ZSSWJG+"</td></tr>";
					    		}
				    		 }
				    		 $("#"+id).html(tbody);
						     $("#p99fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);
				    	}else{
				    			$("#"+id).html("<tr ><td colspan='10'>当前无纳税信息记录！</td></tr>");
				    			$("#p99fy").html("");
				    	}
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//人口基础信息模糊查询
 function queryp94(){
	 var msg,id;
		 msg="姓名不能为空！";
		 var pname = $.trim($("#p94name").val());
		 
		  id = "p94table";
	
	 if(pname == ""){
		 alert(msg);
		 return;
	 }
	  
	
		if(pname != "" ){
			 $.ajax({
				 url: encodeURI(baseUrl+"getRkxxmhInfo?pname="+pname+"&"+t+"&page=1&count=10"),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;
				    	var tbody = "";
				    	var XM="";
				    	/*var CYM="";*/
				    	var XB="";
				    	var MC="";
				    	var ZJLX="";
				    	var SFZJH="";
				    	var DQHMC="";
				    	var XZZ="";
				    	/*var HYZK="";*/
				    	var GLZT="";
				    /*	var HKXZ=""; */
				    	var CSRR="";
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].XM == undefined){
				    				 XM="-";
				    			 }else{
				    				 XM=data[i].XM;
				    			 }
				    			 
				    		/*	 if(data[i].CYM == undefined){
				    				 CYM="-";
				    			 }else{
				    				 CYM=data[i].CYM;
				    			 }*/
				    			 
				    			 if(data[i].XB == undefined){
				    				 XB="-";
				    			 }else{
				    				 XB = data[i].XB;
				    			 }
				    			 
				    			 if(data[i].MC == undefined){
				    				 MC="-";
				    			 }else{
				    				 MC=data[i].MC;
				    			 }
				    			 
				    			 if(data[i].ZJLX == undefined) {
				    				 ZJLX="-";
				    			 }else{
				    				 ZJLX=data[i].ZJLX;
				    			 }
				    			 
				    			 if(data[i].SFZJH == undefined){
				    				 SFZJH="-";
				    			 }else{
				    				 SFZJH=data[i].SFZJH;
				    			 }
				    			 
				    			 if(data[i].DQHMC== undefined){
				    				 DQHMC="-";
				    			 }else{
				    				 DQHMC=data[i].DQHMC;
				    			 }
				    			 
				    			 if(data[i].XZZ == undefined){
				    				 XZZ="-";
				    			 }else{
				    				 XZZ=data[i].XZZ;
				    				 
				    			 }
				    			/* if(data[i].HYZK == undefined){
				    				 HYZK="-";
				    			 }else{
				    				 HYZK=data[i].HYZK;
				    			 }*/
				    			 
				    			 if(data[i].GLZT == undefined){
				    				 GLZT="-";
				    			 }else{
				    				 GLZT=data[i].GLZT;
				    			 }
				    			 
				    			/* if(data[i].HKXZ == undefined){
				    				 HKXZ="-";
				    			 }else{
				    				 HKXZ=data[i].HKXZ;
				    			 }*/
				    			 
				    			 if(data[i].CSRR == undefined){
				    				 CSRR="-";
				    			 }else{
				    				 CSRR=new Date(data[i].CSRR).format('yyyy-MM-dd');
				    			 }
				    						    			 
				    			if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+XM+"</td><td>"+XB+"</td><td>"+MC+"</td><td>"+ZJLX+"</td><td>"+SFZJH+"</td><td>"+DQHMC+"</td><td>"+XZZ+"</td><td>"+GLZT+"</td><td>"+CSRR+"</td></tr>";
					    		}
					    		else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+XM+"</td><td>"+XB+"</td><td>"+MC+"</td><td>"+ZJLX+"</td><td>"+SFZJH+"</td><td>"+DQHMC+"</td><td>"+XZZ+"</td><td>"+GLZT+"</td><td>"+CSRR+"</td></tr>";
					    		}
				    		 }
				    		 $("#"+id).html(tbody);
						     $("#p94fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='10'>当前无人口信息记录！</td></tr>");
				    			$("#p94fy").html(""); 
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
//法人信息模糊查询
 function queryp93(){
	 var msg,id;
		 msg="姓名不能为空！";
		 var pname = $.trim($("#p93name").val());
		 
		  id = "p93table";
	
	 if(pname == ""){
		 alert(msg);
		 return;
	 }
	  
	
		if(pname != "" ){
			 $.ajax({
				 url: encodeURI(baseUrl+"getFrmhInfo?pname="+pname+"&"+t+"&page=1&count=10"),
				    dataType : 'jsonp',
				    jsonp : "jsonpcallback",
				    success : function(data) {
				    	var obj = data;
				    	var tbody = "";
				    	var FRMC="";
				    	var ZZJGDM="";
				    	var GSZCH="";
				    	var CLRQ="";
				    	var FRZS="";
				    	var FRLXMC="";
				    	var FDDBR=""; 
				    	if(obj != undefined && obj.length >0){
				    		 for(var i=0;i<obj.length;i++){
				    			 if(data[i].FRMC == undefined){
				    				 FRMC="-";
				    			 }else{
				    				 FRMC=data[i].FRMC;
				    			 }
				    			 
				    			 if(data[i].ZZJGDM == undefined){
				    				 ZZJGDM="-";
				    			 }else{
				    				 ZZJGDM = data[i].ZZJGDM;
				    			 }
				    			 
				    			 if(data[i].GSZCH == undefined){
				    				 GSZCH="-";
				    			 }else{
				    				 GSZCH=data[i].GSZCH;
				    			 }
				    			 
				    			 if(data[i].CLRQ == undefined) {
				    				 CLRQ="-";
				    			 }else{
				    				 CLRQ=data[i].CLRQ;
				    			 }
				    			 
				    			 if(data[i].FRZS == undefined){
				    				 FRZS="-";
				    			 }else{
				    				 FRZS=data[i].FRZS;
				    				 
				    			 }
				    			 
				    			 if(data[i].FRLXMC == undefined){
				    				 FRLXMC="-";
				    			 }else{
				    				 FRLXMC=data[i].FRLXMC;
				    			 }
				    			 
				    			 if(data[i].FDDBR == undefined){
				    				 FDDBR="-";
				    			 }else{
				    				 FDDBR=data[i].FDDBR;
				    			 }
				    			 
				    			if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+FRMC+"</td><td>"+ZZJGDM+"</td><td>"+GSZCH+"</td><td>"+CLRQ+"</td><td>"+FRZS+"</td><td>"+FRLXMC+"</td><td>"+FDDBR+"</td></tr>";
					    		}
					    		else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+FRMC+"</td><td>"+ZZJGDM+"</td><td>"+GSZCH+"</td><td>"+CLRQ+"</td><td>"+FRZS+"</td><td>"+FRLXMC+"</td><td>"+FDDBR+"</td></tr>";
					    		}
				    		 }
				    		 $("#"+id).html(tbody);
						     $("#p93fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='10'>当前无法人信息记录！</td></tr>");
				    			$("#p93fy").html(""); 
				    	}
				    	
				    
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
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
				    			if(i<=9){
					    			 tbody +="<tr id='tr"+i+"'><td>"+data[i].DSRMC+"</td><td>"+DSRZJHM+"</td><td>"+CFMC+"</td><td>"+JDRQ+"</td><td>"+CFJDSWH+"</td><td>"+CFBM+"</td></tr>";
					    		}
					    		else{
					    			 tbody +="<tr id='tr"+i+"' style='display:none'><td>"+data[i].DSRMC+"</td><td>"+DSRZJHM+"</td><td>"+CFMC+"</td><td>"+JDRQ+"</td><td>"+CFJDSWH+"</td><td>"+CFBM+"</td></tr>";
					    		}
				    		 }
				    		 $("#"+id).html(tbody);
						     $("#p"+type+"fy").html("<div id='kkpagerGis'></div>");
					    	 kkpagerinit(1,obj.length,10);
				    	}else{
				    			 
				    			$("#"+id).html("<tr ><td colspan='6'>当前无该条件下的行政处罚记录信息！</td></tr>");
				    			$("#p"+type+"fy").html("");
				    	}
				    	
				    },
				    error : function(response) {
				      alert(response.statusText);
				    },
				    timeout:60000
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
				      alert(response.statusText);
				    },
				    timeout:60000
				  });
		}
		
 }
function queryp4(){
	 var sqr = $.trim($("#p4_sqr").val());
	 var kkdd = $.trim($("#p4_kkdd").val());
	 var kkxz = $.trim($("#p4_kkxz").val());
	/* var kkgg = $.trim($("#p4_kkgg").val());*/
	 var sgzdmj = $.trim($("#p4_sgzdmj").val());
	 var sgqssj = $.trim($("#p4_sgqssj").val());
	 var sgjssj = $.trim($("#p4_sgjssj").val());
	 var tzqfr = $.trim($("#p4_tzqfr").val());
	 var blsj = $.trim($("#p4_blsj").val());
	 var lxdh = $.trim($("#p4_lxdh").val());
	 var bz = $.trim($("#p4_bz").val());
	 var reg = new RegExp("[u4E00-u9FFF]+","g");
		if(reg.test(tzqfr)){
			alert("通知签发人只能输入汉字！");  
			return;
		}
	 if(sgqssj>sgjssj){
		 alert("施工开始日期或施工结束日期不正确！");
		 return;
	 }
	 if(sqr == ""){
		 alert("申请人不能为空！");
		 return;
	 }
	 if(kkdd == ""){
		 alert("开口地点不能为空！");
		 return;
	 }
	 if(kkxz == ""){
		 alert("开口性质不能为空！");
		 return;
	 }
	 if(sgzdmj == ""){
		 alert("施工占道面积不能为空！");
		 return;
	 }
	 if(sgqssj == ""){
		 alert("施工起始日期不能为空！");
		 return;
	 }
	 if(sgjssj == ""){
		 alert("施工结束日期不能为空！");
		 return;
	 }
	/* if(lxdh == ""){
		 alert("联系电话不能为空！");
		 return;
	 }*/
	 $.ajax({
		    url: encodeURI(baseUrl+"putJdccrkxkInfo?"),
		    dataType : 'jsonp',
		    data:{sqr:sqr,
		    	kkdd:kkdd,
		    	kkxz:kkxz,
		    /*	kkgg:kkgg,*/
		    	sgzdmj:sgzdmj,
		    	sgqssj:sgqssj,
		    	sgjssj:sgjssj,
		    	tzqfr:tzqfr,
		    	blsj:blsj,
		    	lxdh:lxdh,
		    	bz:bz,
		    },
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	alert("提交成功");
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });	
}
function queryp98(){
	 var sqr = $.trim($("#p98_sqr").val());
	 var kwyy = $.trim($("#p98_kwyy").val());
	 var kwdd = $.trim($("#p98_kwdd").val());
	 var kwgghmj = $.trim($("#p98_kwgghmj").val());
	 var sgzdgghmj = $.trim($("#p98_sgzdgghmj").val());
	 var sgqssj = $.trim($("#p98_sgqssj").val());
	 var sgjssj = $.trim($("#p98_sgjssj").val());
	 var tzqfr = $.trim($("#p98_tzqfr").val());
	 var blsj = $.trim($("#p98_blsj").val());
	 var lxdh = $.trim($("#p98_lxdh").val());
	 var bz = $.trim($("#p98_bz").val());
	 var reg = new RegExp("[u4E00-u9FFF]+","g");
		if(reg.test(tzqfr)){
			alert("通知签发人只能输入汉字！");  
			return;
		}
	 
	 if(sgqssj>sgjssj){
		 alert("施工起始时间或施工结束时间输入不正确！");
		 return;
	 }
	 
	 if(sqr == ""){
		 alert("申请人不能为空！");
		 return;
	 }
	 if(kwdd == ""){
		 alert("开挖地点不能为空！");
		 return;
	 }
	 if(kwgghmj == ""){
		 alert("开挖规格和面积不能为空！");
		 return;
	 }
	 if(kwyy == ""){
		 alert("开挖原因不能为空！");
		 return;
	 }
	 if(sgzdgghmj == ""){
		 alert("施工占道规格和面积不能为空！");
		 return;
	 }
	 if(sgqssj == ""){
		 alert("施工起始日期不能为空！");
		 return;
	 }
	 if(sgjssj == ""){
		 alert("施工结束日期不能为空！");
		 return;
	 }
	/* if(lxdh == ""){
		 alert("联系电话不能为空！");
		 return;
	 }*/
	 $.ajax({
		    url: encodeURI(baseUrl+"putCsdlkwxkxxInfo?"),
		    dataType : 'jsonp',
		    data:{sqr:sqr,
		    	kwyy:kwyy,
		    	kwdd:kwdd,
		    	kwgghmj:kwgghmj,
		    	sgzdgghmj:sgzdgghmj,
		    	sgqssj:sgqssj,
		    	sgjssj:sgjssj,
		    	tzqfr:tzqfr,
		    	blsj:blsj,
		    	lxdh:lxdh,
		    	bz:bz,
		    },
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	alert("提交成功");
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });	
}
function queryp97(){
	 var sqr = $.trim($("#p97_sqr").val());
	 var szdd = $.trim($("#p97_szdd").val());
	 var lx = $.trim($("#p97_lx").val());
	 var sl = $.trim($("#p97_sl").val());
	 var zmj = $.trim($("#p97_zmj").val());
	 var hzszqssj = $.trim($("#p97_hzszqssj").val());
	 var hzszzzsj = $.trim($("#p97_hzszzzsj").val());
	 var tzqfr = $.trim($("#p97_tzqfr").val());
	 var blsj = $.trim($("#p97_blsj").val());
	 var lxdh = $.trim($("#p97_lxdh").val());
	 var bz = $.trim($("#p97_bz").val());
	 var reg = new RegExp("[u4E00-u9FFF]+","g");
		if(reg.test(tzqfr)){
			alert("通知签发人只能输入汉字！");  
			return;
		}
	 if(hzszqssj>hzszzzsj){
		 alert("核准设置开始日期或核准设置结束日期设置不正确！");
		 return;
	 }
	 if(sqr == ""){
		 alert("申请人不能为空！");
		 return;
	 }
	 if(szdd == ""){
		 alert("设置地点不能为空！");
		 return;
	 }
	 if(lx == ""){
		 alert("类型不能为空！");
		 return;
	 }
	 $.ajax({
		    url: encodeURI(baseUrl+"putHwggszxxInfo?"),
		    dataType : 'jsonp',
		    data:{sqr:sqr,
		    	szdd:szdd,
		    	lx:lx,
		    	sl:sl,
		    	zmj:zmj,
		    	hzszqssj:hzszqssj,
		    	hzszzzsj:hzszzzsj,
		    	tzqfr:tzqfr,
		    	blsj:blsj,
		    	lxdh:lxdh,
		    	bz:bz,
		    },
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	alert("提交成功");
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });	
}
function queryp96(){
	 var sqr = $.trim($("#p96_sqr").val());
	 var zdyy = $.trim($("#p96_zdyy").val());
	 var sgzddd = $.trim($("#p96_sgzddd").val());
	 var sgzdzmj   = $.trim($("#p96_sgzdzmj").val());
	 var zdqssj  = $.trim($("#p96_zdqssj").val());
	 var zdzzsj  = $.trim($("#p96_zdzzsj").val());
	 var zdsd   = $.trim($("#p96_zdsd").val());
	 var tzqfr = $.trim($("#p96_tzqfr").val());
	 var blsj = $.trim($("#p96_blsj").val());
	 var lxdh = $.trim($("#p96_lxdh").val());
	 var bz = $.trim($("#p96_bz").val());
	 var reg = new RegExp("[u4E00-u9FFF]+","g");
		if(reg.test(tzqfr)){
			alert("通知签发人只能输入汉字！");  
			return;
		}
	 if(zdqssj>zdzzsj){
		 alert("占道起始日期或占道结束日期不正确！");
		 return;
	 }
	 if(sqr == ""){
		 alert("申请人不能为空！");
		 return;
	 }
	 if(sgzddd == ""){
		 alert("占道地点不能为空！");
		 return;
	 }
	 $.ajax({
		    url: encodeURI(baseUrl+"putSgzycsdlxkxxInfo?"),
		    dataType : 'jsonp',
		    data:{
		    	sqr:sqr,
		    	zdyy:zdyy,
		    	sgzddd:sgzddd,
		    	sgzdzmj:sgzdzmj,
		    	zdqssj:zdqssj,
		    	zdzzsj:zdzzsj,
		    	tzqfr:tzqfr,
		    	blsj:blsj,
		    	lxdh:lxdh,
		    	bz:bz,
		    },
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	alert("提交成功");
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });	
}
function queryp95(){
	 var sqr = $.trim($("#p95_sqr").val());
	 var zdyy = $.trim($("#p95_zdyy").val());
	 var zddd = $.trim($("#p95_zddd").val());
	 var zdzmj   = $.trim($("#p95_sgzdzmj").val());
	 var zdqssj  = $.trim($("#p95_zdqssj").val());
	 var zdzzsj  = $.trim($("#p95_zdzzsj").val());
	 var zdsd   = $.trim($("#p95_zdsd").val());
	 var tzqfr = $.trim($("#p95_tzqfr").val());
	 var blsj = $.trim($("#p95_blsj").val());
	 var lxdh = $.trim($("#p95_lxdh").val());
	 var bz = $.trim($("#p95_bz").val());
	 var reg = new RegExp("[u4E00-u9FFF]+","g");
		if(reg.test(tzqfr)){
			alert("通知签发人只能输入汉字！");  
			return;
		}
	 if(zdqssj>zdzzsj){
		 alert("占道开始日期或占道结束日期不正确！");
		 return;
	 }
	 if(sqr == ""){
		 alert("申请人不能为空！");
		 return;
	 }
	 if(zddd == ""){
		 alert("占道地点不能为空！");
		 return;
	 }
	 $.ajax({
		    url: encodeURI(baseUrl+"putJyxzycsdlxkxxInfo?"),
		    dataType : 'jsonp',
		    data:{sqr:sqr,
		    	zdyy:zdyy,
		    	zddd:zddd,
		    	zdzmj:zdzmj,
		    	zdqssj:zdqssj,
		    	zdzzsj:zdzzsj,
		    	zdsd:zdsd,
		    	tzqfr:tzqfr,
		    	blsj:blsj,
		    	lxdh:lxdh,
		    	bz:bz,
		    },
		    jsonp : "jsonpcallback",
		    success : function(data) {
		    	alert("提交成功");
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });	
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
				      alert(response.statusText);
				    },
				    timeout:60000
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
		      alert(response.statusText);
		    },
		    timeout:60000
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
		    	/*$("#ps4").html(str);*/
		    	$("#ps19").html(str);
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
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
		    	$("#ps3").html(str);
		    	$("#ps7").html(str);
		    	$("#ps8").html(str);
		    	//$("#ps10").html(str);
		    	//$("#ps5").append(str.replace("selected", ""));
		    	//$("#ps6").append(str.replace("selected", ""));
		    	$("#ps71").html(str);
		    	
		    	$("#ps33").html(str);
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });
 }
 function loadPs10(){
	  $.ajax({
		    url: baseUrl+"getMarkTableContentByType",
		    dataType : 'jsonp',
		    data:{tableType:4},
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
		    	$("#ps10").html(str);
		    },
		    error : function(response) {
		      alert(response.statusText);
		    },
		    timeout:60000
		  });
}
 function restP1Form(){
	//全员人口重置
	 $("#p1 form")[0].reset();
	 $("#p1table").html(createTr(5));
 }
 function restP2Form(){
	 //人口基础信息
	 $("#p2 form")[0].reset();
	 $("#p2 form")[1].reset();
 }
function restP20Form(){
    //人口基础信息
    $("#p20type").val("身份证");
    $("#ppapersNum2").attr("value","");
    $("#bi").html('');
}
function restP20detailForm(){
    //人口基础信息
    $("#keyValue").attr("value","");
    $("#dtree").html('');
    $("#p20formDetail").html('');
    $("#p20formdetailfy").html('');
    $("#detailmask").hide();
    $("#p20msgdetail").hide();
}
 function restP3Form(){
	 //法人口基础信息
	 $("#p3 form")[0].reset();
	 $("#p3 form")[1].reset();
 }
 function restP4Form(){
	//机动车出入口许可证重置
	 $("#p4 form")[0].reset();
	 $("#p4_sqr").attr("value","");
	 $("#p4_kkdd").attr("value","");
	 $("#p4_kkxz").attr("value","");
	 $("#p4_kkgg").attr("value","");
	 $("#p4_sgzdmj").attr("value","");
	 $("#p4_sgqssj").attr("value","");
	 $("#p4_sgjssj").attr("value","");
	 $("#p4_tzqfr").attr("value","");
	 $("#p4_blsj").attr("value","");
	 $("#p4_lxdh").attr("value","");
	 $("#p4_bz").attr("value","");
 }
 function restP98Form(){
		//城市道路开挖许可信息重置
		 $("#p98 form")[0].reset();
		 $("#p98_sqr").attr("value","");
		 $("#p98_kwyy").attr("value","");
		 $("#p98_kwdd").attr("value","");
		 $("#p98_kwgghmj").attr("value","");
		 $("#p98_sgzdgghmj").attr("value","");
		 $("#p98_sgqssj").attr("value","");
		 $("#p98_sgjssj").attr("value","");
		 $("#p98_tzqfr").attr("value","");
		 $("#p98_blsj").attr("value","");
		 $("#p98_lxdh").attr("value","");
		 $("#p98_bz").attr("value","");
	 }
 function restP97Form(){
		//店面招牌/户外广告设置信息重置
		 $("#p97 form")[0].reset();
		 $("#p97_sqr").attr("value","");
		 $("#p97_szdd").attr("value","");
		 $("#p97_lx").attr("value","");
		 $("#p97_sl").attr("value","");
		 $("#p97_gg1").attr("value","");
		 $("#p97_gg2").attr("value","");
		 $("#p97_gg3").attr("value","");
		 $("#p97_zmj").attr("value","");
		 $("#p97_hzszqssj").attr("value","");
		 $("#p97_hzszzzsj").attr("value","");
		 $("#p97_tzqfr").attr("value","");
		 $("#p97_blsj").attr("value","");
		 $("#p97_lxdh").attr("value","");
		 $("#p97_bz").attr("value","");
	 }
 function restP96Form(){
		//城市道路开挖许可信息重置
		 $("#p96 form")[0].reset();
		 $("#p96_sqr").attr("value","");
		 $("#p96_zdyy").attr("value","");
		 $("#p96_sgzddd").attr("value","");
		 $("#p96_zdgg1").attr("value","");
		 $("#p96_zdgg2").attr("value","");
		 $("#p96_zdgg3").attr("value","");
		 $("#p96_sgzdzmj").attr("value","");
		 $("#p96_zdqssj").attr("value","");
		 $("#p96_zdjssj").attr("value","");
		 $("#p96_tzqfr").attr("value","");
		 $("#p96_blsj").attr("value","");
		 $("#p96_lxdh").attr("value","");
		 $("#p96_bz").attr("value","");
	 }
 function restP95Form(){
		//城市道路开挖许可信息重置
		 $("#p95 form")[0].reset();
		 $("#p95_sqr").attr("value","");
		 $("#p95_zdyy").attr("value","");
		 $("#p95_zddd").attr("value","");
		 $("#p95_zdgg1").attr("value","");
		 $("#p95_zdgg2").attr("value","");
		 $("#p95_zdgg3").attr("value","");
		 $("#p95_zdzmj").attr("value","");
		 $("#p95_zdqssj").attr("value","");
		 $("#p95_zdjssj").attr("value","");
		 $("#p95_zdsd").attr("value","");
		 $("#p95_tzqfr").attr("value","");
		 $("#p95_blsj").attr("value","");
		 $("#p95_lxdh").attr("value","");
		 $("#p95_bz").attr("value","");
	 }
 function restP95Form(){
		//城市道路开挖许可信息重置
		 $("#p95 form")[0].reset();
		 $("#p95_sqr").attr("value","");
		 $("#p95_zdyy").attr("value","");
		 $("#p95_zddd").attr("value","");
		 $("#p95_zdgg1").attr("value","");
		 $("#p95_zdgg2").attr("value","");
		 $("#p95_zdgg3").attr("value","");
		 $("#p95_zdzmj").attr("value","");
		 $("#p95_zdqssj").attr("value","");
		 $("#p95_zdjssj").attr("value","");
		 $("#p95_zdsd").attr("value","");
		 $("#p95_tzqfr").attr("value","");
		 $("#p95_blsj").attr("value","");
		 $("#p95_lxdh").attr("value","");
		 $("#p95_bz").attr("value","");
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
	 //登记
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
 function restP18Form(){
	 //法人口基础信息
	 $("#p18 form")[0].reset();
	 $("#p18 form")[1].reset();
 }
 function restP99Form(){
	 //纳税信息
	 $("#p99 form")[0].reset();
	 $("#p99 form")[1].reset();
 }
 function restP94Form(){
	 //人口基础信息模糊查询
	 $("#p94 form")[0].reset();
	 $("#p94 form")[1].reset();
 }
 function restP93Form(){
	 //人口基础信息模糊查询
	 $("#p93 form")[0].reset();
	 $("#p93 form")[1].reset();
 }


//-------------------------------------------人口图谱开始-----------------------------------------
function showPopulationinfo(){
    var type = $("#p20type").val();
    var value = $.trim($("#ppapersNum2").val());

    if(value == ""){
        alert("查询字段不能为空！");
        return;
    }
    if(value != ""){
        showRktpcx(type,value);
    }
}
//人员基本信息
function showSubjectInfo(){
    var value = $.trim($("#keyValue").val());
    if(value == ""){
        alert("查询字段不能为空！");
        return;
    }
    $("#kkpagerGis").empty();
    $("tr[id^='tr']").remove();
    $("#kkpagerGis").remove();
    $("#p20formdetailfy").empty();
    $("#p20formDetail").empty();
    $("#dtree").empty();
    $("#detail").html(' <tr style="font-weight: bold;"> <td width="623px">数据详细信息</td> </tr>');
    $("#detailmask").css("height",630);
    $("#detailmask").css("width",784);
    $("#p20msgdetail").html("<div id='p20msg2' style='position:absolute;height:620px;width:780px;z-index:200;'><div  style='top:300px;left:340px;position:absolute;z-index:200;color:#33ff00'><span style=' background-color: #FFF;' >数据加载中，请稍候</span></div></div>");
    $('#p20msg2').css({'left': $('#p20resultdetial').offset().left-3,'top':$('#p20resultdetial').offset().top-3});
    $('#detailmask').css({'left': $('#p20resultdetial').offset().left-3,'top':$('#p20resultdetial').offset().top-3});
    $("#detailmask").show();
    $("#p20msgdetail").show();
    $.ajax({
        url: encodeURI(baseUrl+"getPopulationRelativeInfo?"+t),
        dataType : 'jsonp',
        data:{value:value},
        jsonp : "jsonpcallback",
        success : function(data) {
            if(data != undefined && data.length >= 1){
                var len = data.length;
                var f = [];
                var c = {};
                var t="";
                for(var i=0; i<len; i++) {
                    var department = data[i]['tableDepartment'];
                    var flag = true;
                    if(i==0){
                        f.push(department)
                        c[department] = '<li style="text-align:left;padding:3px 3px 3px 3px;"><div style="cursor:pointer;color:#0000FF" onclick="p20fromdetailInfo(\''+data[i]['tableName']+'\',\''+data[i]['value']+'\',\''+ data[i]['tableDesc']+'\')">&nbsp;&nbsp;&nbsp;&nbsp;' +
                            data[i]['tableDesc']+'</div><hr style="height:1px;border:none;border-top:1px dashed #0066CC;" /></li>';
                    }else{
                        for(var a=0; a<f.length;a++){
                            if(f[a]==department){
                                flag=false;
                                c[department] = c[department]+'<li style="text-align:left;padding:3px 3px 3px 3px;"><div style="cursor:pointer;color:#0000FF" onclick="p20fromdetailInfo(\''+data[i]['tableName']+'\',\''+data[i]['value']+'\',\''+ data[i]['tableDesc']+'\')">&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    data[i]['tableDesc']+'</div><hr style="height:1px;border:none;border-top:1px dashed #0066CC;" /></li>';
                                break;
                            }
                        }
                        if(flag==true){
                            f.push(department);
                            c[department] = '<li style="text-align:left;padding:3px 3px 3px 3px;"><div style="cursor:pointer;color:#0000FF" onclick="p20fromdetailInfo(\''+data[i]['tableName']+'\',\''+data[i]['value']+'\',\''+ data[i]['tableDesc']+'\')">&nbsp;&nbsp;&nbsp;&nbsp;' +
                                data[i]['tableDesc']+'</div><hr style="height:1px;border:none;border-top:1px dashed #0066CC;" /></li>';
                        }
                    }
                }
                for(var a=0; a<f.length;a++){
                    var d =f[a]
                    t=t+'<li style="padding:3px 3px 3px 3px; margin:0px;text-align:left;"><span style="font-weight:bold;font-size:14px">'+d+'<hr/>'+c[d]+'</span></li>'
                }
                $("#dtree").html(t);
                $("#detailmask").hide();
                $("#p20msgdetail").hide();
            }else {
                $("#detailmask").hide();
                $("#p20msgdetail").hide();
                alert("没有查询到信息");
            }

        },
        error : function(response) {
            $("#detailmask").hide();
            $("#p20msgdetail").hide();
            alert(response.statusText);
        },
        timeout:60000
    });
}
//显示人口图谱
function showRktpcx(type,value){
    var div=$("#bi");
    $('#bi').empty();
    $('<div id="main" style="height:500px;padding:10px; width:700px; margin:auto"></div>').appendTo(div).attr({'width': 760,'height': 510});
    $.ajax({
        url: encodeURI(globalInterfaceDomain+"/csdsc/statisticChartHandler/getRelation?"+t),
        dataType : 'jsonp',
        data:{type:type,value:value},
        jsonp : "jsonpcallback",
        success : function(data) {
            if(data != undefined && data.length == 3 && data[1].length>0){
                initLinkChart(data[0],data[1],data[2]);
            }else{
                $("#p2 form")[1].reset();
                alert("无该人员信息");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
//显示人口图谱
function getRKTPqueryItem(){
    var select=$("#p20type");
    select.empty();
    $.ajax({
        url: encodeURI(baseUrl+"getRKTPQueryType?"+t),
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        success : function(data) {
            if(data != undefined){
                var len = data.length;
                var option ='';
                for(var i=0; i<len; i++){
                    option=option+'<option value="'+data[i]["QUERY_FIELD"]+'">'+data[i]["QUERY_FIELD_NAME"]+'</option>';
                }
                select.html(option);
            }else{

                alert("请重新刷新页面");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function p20fromdetailInfo(tableName,queryvalue,tableDesc){
    $("#kkpagerGis").empty();
    $("tr[id^='tr']").remove();
    $("#kkpagerGis").remove();
    $("#p20formdetailfy").empty();
    $("#p20formDetail").empty();
    $.ajax({
        url: encodeURI(baseUrl+"getPopulationDetail?tableName="+tableName+"&value="+queryvalue+"&"+t),
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        success : function(data) {
            if(data != undefined && data.length>=1) {
                var tbody = "";
                var len = data.length;
                for (var a = 0; a < len; a++) {
                    if(a>8){
                        tbody = tbody + "<tr id='p20formDetailtr"+a+"' style='display:none;' align='left'><td style='padding-left:6px;border-bottom:1px solid #a2bae1'>";
                    }else{
                        tbody = tbody + "<tr id='p20formDetailtr"+a+"' align='left'><td style='padding-left:6px;border-bottom:1px solid #a2bae1'>";
                    }
                    var value = data[a];
                    for (var key in value) {
                        tbody = tbody + '  ['+value[key]+']  ';
                    }
                    tbody = tbody  +"</td></tr>";
                }
                $("#detail").html(' <tr style="font-weight: bold;"> <td width="623px">数据详细信息('+tableDesc+')</td> </tr>')
                $("#p20formDetail").html('<tbody>' + tbody + '</tbody>');
                if(len>12){//添加分页
                    $("#p20formdetailfy").html("<div id='kkpagerGis'></div>");
                    kkpagerinitbyId('p20formDetail',1,len,9);
                }
                window.location.href = "#detail";
            }else{
                alert("没有查询到信息");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
//-------------------------------------------人口图谱结束-----------------------------------------


//-----------------------------------低保核查-------------------------------------------
//低保核查修改查询类型
function dbhcQueryTypeChange(){
    var type = $("#p101type").val();
    if(type=="single"){
        $("#singleTr").show();
        $("#manyTr").hide();
    }else{
        $("#manyTr").show();
        $("#singleTr").hide();
    }
}

function queryp101_dbhc(){
   var type = $("#p101type").val();
   var start = $("#p101dateStart").val();
   var end = $("#p101dateEnd").val();
    if(start==''){
        alert('请选择开始核查日期');
        return;
    }
    if(end==''){
        alert('请选择结束核查日期');
        return;
    }
    if(type=="single"){
        var sfzjh = $("#p101papersNum").val();
        if(sfzjh==''){
            alert('请填写身份证号');
            return;
        }
        $.ajax({
            url: baseUrl+'getDBHC?type='+type+'&sfzjh='+sfzjh+'&start='+start+'&end='+end+'&'+t,
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            success : function(data) {
                if(data.success==false){
                    alert(data.msg);
                }else{
                    dbhc_show(data);
                }
            },
            error : function(response) {
                alert(response.statusText);
            },
            timeout:60000
        });
    }else{
        var filename =$("#dbhc_file").val();
        if(!filename){
            alert("请选择文件");
            return;
        }
        upload1.addPostParam("type" , type);
        upload1.addPostParam("start",start);
        upload1.addPostParam("end",end);
        upload1.addPostParam("authKey",authKey);
        upload1.addPostParam("timestamp", new Date().getTime());
        upload1.startUpload(0);
        $("#dbhc_file").val("");
    }
}
//上传成功
function uploadSuccess(file, data) {
    var json = eval("(" + data + ")");
    dbhc_show(json);
}
function fileQueued(file){
    $("#dbhc_file").val(file.name);
}
function dbhc_export(){
    var start = $("#p101dateStart").val();
    var end = $("#p101dateEnd").val();
    var myObj = document.getElementById('dbhc_catche');
    var list = $.data(myObj, 'sfzjh');
    if(start==''){
        alert('请选择开始核查日期');
        return;
    }
    if(end==''){
        alert('请选择结束核查日期');
        return;
    }
    if(list==undefined ||list==null){
    	alert("没有数据，无法导出");
    	return;
	}
   location.href = "/csdsc/dbhcDownLoad?start="+start+"&end="+end+"&list="+list;

}
function dbhc_show(data){
    $("#p101fy").html("");
    $("#p101table").html("");
    if (data.length>0) {
        var len = data.length;
        var tbody = "";
        var show = "display:table-row;";
        var sfzhs =new Array();
        for(var i=0;i<len; i++){
            if(i>9){
                show = "display:none;";
            }else{
                show = "display:table-row;";
            }
            sfzhs.push(data[i]['SFZH']);
            tbody=tbody+"<tr style='"+show+"' id='p101tabletr"+i+"'>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['HH'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['XM'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['SFZH'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['YHZGX'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['HJXZ'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['HJDZ'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['JTZZ'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['DBBZLB'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['SCZS'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['XB'],'-')+"</td>";

            tbody=tbody+"<td>"+checkUndefind(data[i]['NL'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['MZ'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['ZZMM'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['JYZK'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['LDNL'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['JKZK'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['YJGJSE'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['GSZCZJ'],'-')+"</td>";

            tbody=tbody+"<td>"+checkUndefind(data[i]['FCLX'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['FCJG'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['FCMJ'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['FCWZ'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['YXSSBJE'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['SFYCL'],'-')+"</td>";
            tbody=tbody+"<td>"+checkUndefind(data[i]['NSQK'],'-')+"</td>";

            tbody=tbody+"</tr>";
        }
        var myObj = document.getElementById('dbhc_catche');
        $.data(myObj, 'sfzjh', sfzhs.join("-"));
        $("#p101table").html(tbody);
        if(len>10){
            $("#p101fy").html("<div id='kkpagerGis'></div>");
            kkpagerinitbyId('p101table',1,len,10);
        }
    } else {
        alert("没有查询到数据！");
    }
}
//文件上传
function fileUpload(){
    var uploadOptions ={  //提交路径   上传图片的服务器     
        upload_url:  baseUrl+"getDBHC",
        //上传文件的名称 
        file_post_name: "excel",
        // 下面自己按照字面意思理解 
        file_size_limit:"102400", // 100MB     
        file_types : "*.xls",
        file_types_description : "excel Files",
        file_upload_limit:"100",
        file_queue_limit: "1",
        // 按钮的处理 
        button_placeholder_id : "swfu-placeholder",
        button_width: 80,
        button_height: 22,
        button_image_url : "../r/cms/www/red/swfupload/images/button_60x22.png",
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
        button_cursor: SWFUpload.CURSOR.HAND,
        // Flash Settings  swf文件的路径，需要修改为two服务器的地址     
        flash_url :  globalInterfaceDomain.split('service/api')[0]+"swfupload/swfupload/swfupload.swf",
        use_query_string : true,
        file_queued_handler:fileQueued,
        upload_success_handler:uploadSuccess,
        debug: false
    };
    upload1 = new SWFUpload(uploadOptions);
}
//低保核查
function restP101Form(){
    $("#dbhc_file").val('');
    $("#p101papersNum").val('');
    $("#p101name").val('');
    $("#p101dateStart").val('');
    $("#p101dateEnd").val('');
    $("#p101type").val("single");
    $("#singleTr").show();
    $("#manyTr").hide();
    $("#p101table").html('');
    $("#p101fy").html('');
}
//------------------------------------低保核查-----------------------------------------

//----------------------------------入住率分析开始---------------------------------
function queryp102_lkzd_rzl(){
    var param = checkTwoDate('102');
    var sj = getMonths(param);
     $("#rzlfx").show();
    $("#div_guest").show();
    var myObj = document.getElementById('rzl_catche');
    $.data(myObj, 'rzl', param);
        $.ajax({
            url:  baseUrl+"getRZLFX?"+t,
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            data : param,
            success : function(data) {
                if(data!=undefined && data.length>=1){
                    var len = data.length;
                    var months=new Array();//横轴
                    var desc = ['入住率','经济型酒店入住率','特色民居客栈入住率','星级酒店入住率'];//折线描述
                    //折线图data
                    var jdrzl = {name:'入住率',type:'line',data:[],all:data};
                    var jjxrzl = {name:'经济型酒店入住率',type:'line',data:[],all:data};
                    var tsrzl = {name:'特色民居客栈入住率',type:'line',data:[],all:data};
                    var xjrzl = {name:'星级酒店入住率',type:'line',data:[],all:data};

                    var thead ="<tr style='font-weight:bold;'><td>入住率(%)</td>";
                    var jjxjdrzl_tr = "<tr><td>经济型酒店</td>";
                    var xjjdrzl_tr = "<tr><td>星级酒店</td>";
                    var tsjdrzl_tr = "<tr><td>特色民居客栈</td>";
                    for(var i=0;i<len;i++){
                        var one = data[i];
                        months.push(one['TJYF']);
                        thead=thead+"<td>"+one['TJYF']+"</td>";
                        jdrzl['data'].push(one['JDRZL']);
                        jjxrzl['data'].push(one['JJXJDRZL']);
                        jjxjdrzl_tr=jjxjdrzl_tr+"<td>"+one['JJXJDRZL']+"%"+"</td>";
                        tsrzl['data'].push(one['TSMJKZRZL']);
                        tsjdrzl_tr=tsjdrzl_tr+"<td>"+one['TSMJKZRZL']+"%"+"</td>";
                        xjrzl['data'].push(one['XJJDRZL']);
                        xjjdrzl_tr=xjjdrzl_tr+"<td>"+one['XJJDRZL']+"%"+"</td>";
                    }
                    //表格
                    thead =thead+"</tr>";
                    jjxjdrzl_tr =jjxjdrzl_tr +"</tr>";
                    xjjdrzl_tr =xjjdrzl_tr + "</tr>";
                    tsjdrzl_tr =tsjdrzl_tr +"</tr>";
                    $("#p102table_guest").html(thead+tsjdrzl_tr+xjjdrzl_tr+jjxjdrzl_tr);

                    //折线图
                    $("#lkzd_rzl").empty();
                    lineChart('lkzd_rzl','入住率统计',months,desc,[jdrzl,jjxrzl,tsrzl,xjrzl],lk_formater,'{value}%');
                    initPieCharts('lkzd_fe',['酒店'],['暂无数据'],[{name:'暂无数据',value:100}]);
                }else{
                    alert("没有查询到数据！");
                }
            },
            error : function(response) {
                alert(response.statusText);
            },
            timeout:60000
        });
        initDashBoard('lkzd_all',0,'','');
        initDashBoard('lkzd_ts',0,'','');
        initDashBoard('lkzd_xj',0,'','');
        initDashBoard('lkzd_jj',0,'','');
}

//文件下载
function rzl_export(){
    var myObj = document.getElementById('rzl_catche');
    var param = $.data(myObj, 'rzl');
    var start = param['start'];
    var end = param['end'];
    location.href="/csdsc/rzlDownLoad?start="+start+"&end="+end;
}
function restP102Form(){
    $("#p102dateStart").val('');
    $("#p102dateEnd").val('');
    $("#lkzd_rzl").html('');
    $("#lkzd_fe").html('');
    $("#lkzd_all").html('');
    $("#lkzd_ts").html('');
    $("#lkzd_xj").html('');
    $("#lkzd_jj").html('');
    $("#p102table_guest").html('');
    $("#div_guest").hide();
    $("#rzlfx").hide();

}
//----------------------------------入住率分析结束---------------------------------

//----------------------------------客源分析开始---------------------------------
function queryp106_lkzd_ky(){
    var param = checkTwoDate('106');
    $("#div_analysis").show();
        $.ajax({
            url:  baseUrl+"getKYTJ?"+t,
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            data : param,
            success : function(data) {
                if(data!=undefined && data.data!=undefined){

                    var tjsf =data['data']['sftjrs'];
                    var len = tjsf.length;
                    var tjyf =data['data']['yftjrs'];
                    var sfdata = new Array();
                    for(var i=0;i<len;i++){
                        sfdata.push({name:tjsf[i]['NAME'],value:tjsf[i]['VALUE'],time:param});
                    }

                    var len = tjyf.length;
                    var yfdata = {name:'总数',data:0,type:'line'};
                    var yf=new Array();
                    var data=new Array();
                    for(var i=0;i<len;i++){
                        yf.push(tjyf[i]['TJYF']);
                        data.push(tjyf[i]['SUM']);
                    }
                    yfdata['data']=data;

                    $("#lkzd_ky").empty();
                    initRangeTreeCharts('lkzd_sfbl',sfdata);
                    lineChart('lkzd_ky','省份统计',yf,['总数'],[yfdata],ky_formater,'','item');
                }else{
                    alert("没有查询到数据！");
                }
            },
            error : function(response) {
                alert(response.statusText);
            },
            timeout:60000
        });
        $("#range").show();
        initRangeCharts('lkzd_nvbl',[{name:'暂无数据',value:0}]);
        initRangeCharts('lkzd_nlbl',[{name:'暂无数据',value:0}]);
    }
function restP106Form(){
    $("#p106dateStart").val('');
    $("#p106dateEnd").val('');
    $("#p102table_analysis").html('');
    $("#lkzd_nvbl").html('');
    $("#lkzd_nlbl").html('');
    $("#lkzd_ky").html('');
    $("#lkzd_sfbl").html('');
    $("#div_analysis").hide();
}
//----------------------------------客源分析结束---------------------------------
//------------------------------客栈分析开始--------------------
function queryp104_kzfx(){
    var param = checkTwoDate('104');
    $.ajax({
        url: baseUrl+'getKZFX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : param,
        success : function(data) {
            if(data!=undefined){
               var hotels = data['data']['hotels'];
               var len = hotels.length;
                var yf=new Array();
                var d=new Array();
                for(var i=0;i<len;i++){///合并同类数据：tjyf,type相同
                    var one =hotels[i];
                    var has = false;
                    yf.push(one['TJYF']);
                    for(var j=0;j<d.length;j++){
                        if(one['TYPE']==d[j]['TYPE'] && one['TJYF']==d[j]['TJYF']){
                            d[j]['JDS']=d[j]['JDS']+one['JDS'];
                            has=true;
                        }
                    }
                    if(has==false){
                        d.push({TYPE:one['TYPE'],JDS:one['JDS'],TJYF:one['TJYF']});
                    }
                }
                yf=unique(yf);//月份去重
                var hoteldata = new Array();
                var desc = new Array();
                for(var i=0;i<d.length;i++){//组装数据
                    var one =d[i];
                    var has = false;
                    for(var j=0;j<hoteldata.length;j++){
                        if(hoteldata[j]['name']==one['TYPE']){
                            hoteldata[j]['data'].push(one['JDS']);
                            hoteldata[j]['tjyf'].push(one['TJYF']);
                            has=true;
                        }
                    }
                    if(has==false){
                        hoteldata.push({name:one['TYPE'],data:[one['JDS']],tjyf:[one['TJYF']],type:'line',extra:hotels});
                        desc.push(one['TYPE']);
                    }
                }
                var yfLen = yf.length;

                //补充不足的月份
                for(var j=0;j<hoteldata.length;j++){
                      var jds=  hoteldata[j]['data'];
                      var tjyf= hoteldata[j]['tjyf'];
                      var jdsLen=jds.length;
                      var sjjds=new Array();
                      for(var i=0;i<yfLen;i++){
                          var hasYf=false;
                          for(var n=0;n<jdsLen;n++){
                              if(yf[i]==tjyf[n]){
                                  hasYf=true;
                                  sjjds.push(jds[n]);
                              }
                          }
                          if(hasYf==false){
                              sjjds.push(null);
                          }
                      }
                    hoteldata[j]['data']=sjjds;
                }

                //lineChart('kzfx_kzs','客栈分析',yf,desc,hoteldata,kz_formater,'','item');
                kzfx_line('kzfx_kzs',yf,hoteldata);
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

function restP104Form(){
    $("#p104dateStart").val('');
    $("#p104dateEnd").val('');
    $("#kzfx_kzs").html('');
    $("#kzfx_fjs").html('');
    $("#kzfx_cws").html('');
    $("#p104table").html('');
}

function kzfx_line(container, desc, data,title) {
    $('#'+container).highcharts({
        chart: {
            type: 'spline'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: title
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: desc//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: '酒店数'
            }
        },
        tooltip : {
            formatter : function() {
                var tjyf = this.x;
                var data = this.y;
                var name = this.series.name
                var content = '<b>' + this.x + '</b><br/>'+name+':'+data;
                show_fjs_cws(name,tjyf);
                return content;
            }
        },
        plotOptions: {
            series: {
                cursor: 'pointer', //鼠标移到图表上时鼠标的样式
                events: {//监听点的鼠标事件
                    click: function (e) {
                        var s= e.point.category;
                        var name = this.name;

                        //show_fjs_cws(name,s);
                    }
                }
            }
        },
        series: data
            /*[{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]*/
    });
}


function show_fjs_cws(type,tjyf){
    var param ={type:type,tjyf:tjyf};
    $.ajax({
        url: baseUrl+'getKZFX_tj?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : param,
        success : function(data) {
            if(data!=null ){
                var hotels = data['data']['hotels'];
                var len = hotels.length;
                var fjs=new Array();
                var cws =new Array();
                var wz=new Array();
                var has=false;
                for(var i=0;i<len;i++){
                    var one =hotels[i];
                        for(var j=0;j<fjs.length;j++){
                            if(fjs[j]['wz']==one['WZ']){
                                fjs[j]['value']= fjs[j]['value'] + one['FJS'];
                                cws[j]['value']= cws[j]['value'] + one['CWS'];
                                has=true;
                            }
                        }
                        if(has==false){
                            fjs.push({name:one['WZ'],value:one['FJS']});
                            cws.push({name:one['WZ'],value:one['CWS']});
                            wz.push(one['WZ']);
                        }
                }

                kzfxinitPieChart('kzfx_fjs',['房间数'],wz,fjs);
                kzfxinitPieChart('kzfx_cws',['床位数'],wz,cws);
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

//------------------------------客栈分析结束--------------------

//------------------------------旅游执法开始--------------------
function queryp105_lyzf(){
    var name = $("#lyzf_lgmc").val();
    $.ajax({
        url: baseUrl+'getLYZF?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {name:name},
        success : function(data) {
            if(data['data']!=undefined){
                var hotels = data['data']['hotels'];
                var len = hotels.length;
                var tr="";
                var sumTr =  Math.floor(len/3);
                for(var i=0;i<sumTr;i++){
                    var one =hotels[i*3];
                    var two =hotels[i*3+1];
                    var three =hotels[i*3+2];

                    tr =tr+ "<tr><td align='left' >"+
                        "<a style='cursor: pointer;' onclick=\"lyzf_show('"+checkUndefind(one['LGMC'],'-')+"','"+checkUndefind(one['FR'],'-')+"','"+checkUndefind(one['LGDH'],'-')+"','"+checkUndefind(one['LGDZ'],'-')+"')\">"+checkUndefind(one['LGMC'],'-')+"</a>"+"</td><td align='left'>"+
                        "<a style='cursor: pointer;' onclick=\"lyzf_show('"+checkUndefind(two['LGMC'],'-')+"','"+checkUndefind(two['FR'],'-')+"','"+checkUndefind(two['LGDH'],'-')+"','"+checkUndefind(two['LGDZ'],'-')+"')\">"+checkUndefind(two['LGMC'],'-')+"</a>"+"</td><td align='left'>"+
                        "<a style='cursor: pointer;' onclick=\"lyzf_show('"+checkUndefind(three['LGMC'],'-')+"','"+checkUndefind(three['FR'],'-')+"','"+checkUndefind(three['LGDH'],'-')+"','"+checkUndefind(three['LGDZ'],'-')+"')\">"+checkUndefind(three['LGMC'],'-')+"</a>"+
                        "</td></tr>";
                }
                if(3*sumTr<len){
                    tr =tr+ "<tr>";
                    for(var i=0;i<len-sumTr*3;i++){
                        var one =hotels[sumTr*3+i]
                       tr=tr+"<td align='left'><a style='cursor: pointer;' onclick=\"lyzf_show('"+checkUndefind(one['LGMC'],'-')+"','"+checkUndefind(one['FR'],'-')+"','"+checkUndefind(one['LGDH'],'-')+"','"+checkUndefind(one['LGDZ'],'-')+"')\">"+checkUndefind(one['LGMC'],'-')+"</a>"+"</td>"
                    }
                    tr=tr+"</tr>";
                }

                $("#lyzf_item").html(tr);
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

function lyzf_show(lgmc,fr,lgdh,lgdz) {
    $("#lyzf_lgmc_show").val(lgmc);
    $("#lyzf_lgdh_show").val(lgdh);
    $("#lyzf_lgfr_show").val(fr);
    $("#lyzf_lgdz_show").val(lgdz);
}

function restP105Form(){
    $("#lyzf_lgmc_show").val('');
    $("#lyzf_lgdh_show").val('');
    $("#lyzf_lgfr_show").val('');
    $("#lyzf_lgdz_show").val('');
    $("#lyzf_item").html('');
    $("#lyzf_lgmc").val('');
}
//------------------------------旅游执法结束-------------------

///------------------------------案件审理开始--------------------
function queryp103_AJSL(){
    var name= $("#ajsl_name").val();
    var sfzjh= $("#ajsl_sfzjh").val();
    if(name==''){
        alert("姓名不能为空！");
        return;
    }
    if(sfzjh==''){
        alert("身份证号码不能为空！");
        return;
    }
    $.ajax({
        url: baseUrl+'getAJSL?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh},
        success : function(data) {
            if(data!=undefined && data['data']!=undefined){
                //家庭关系
                $("#p103item").html('');
               var jtgx = data['data']['jtgx'];
                var jtgxFlag=false;
                if(jtgx!=undefined && jtgx.length>0){
                    jtgxFlag=true;
                    var lenjtgx = jtgx.length;
                    $("#p103item").append("<a style='cursor: pointer;margin-right: 150px;font-size:20px;' onclick=\"p103_show('jtgx',"+lenjtgx+",'户籍')\">户籍信息</a>");
                   var tbody = '';
                    for (var a = 0; a < lenjtgx; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p103AJSLjtgxtr"+a+"' style='display:none;' >";
                        }else{
                            tbody = tbody + "<tr id='p103AJSLjtgxtr"+a+"' >";
                        }
                        var value = jtgx[a];
                             tbody = tbody + '  <td>'+checkUndefind(value['JTGX'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['XM'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['SFZH'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['XB'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['HH'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['LXFS'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['MLXZ'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['MZ'])+'</td>  ';
                             tbody = tbody + '  <td>'+checkUndefind(value['GLZT'])+'</td>  ';
                        tbody = tbody  +"</tr>";
                    }
                    $("#p103table_jtgx").html(tbody);
                }

                //车辆信息
                var clxx = data['data']['clxx'];
                var clxxFlag=false;
                if(clxx!=undefined && clxx.length>0) {
                    clxxFlag=true;
                    var lenclxx = clxx.length;
                    $("#p103item").append("<a style='cursor: pointer;margin-right: 150px;font-size:20px;' onclick=\"p103_show('clxx',"+lenclxx+",'车辆')\">车辆信息</a>");
                    var tbody = '';
                    for (var a = 0; a < lenclxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p103AJSLclxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p103AJSLclxxtr" + a + "' >";
                        }
                        var value = clxx[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['JDCSYR']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SFZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['HPHM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['FDJH']) + '</td>  ';
                        tbody = tbody + "</tr>";
                    }
                    $("#p103table_clxx").html(tbody);
                }

                //房产信息
                var fcxx = data['data']['fcxx'];
                var fcxxFlag=false;
                if(fcxx!=undefined && fcxx.length>0) {
                    fcxxFlag=true;
                    var lenfcxx = fcxx.length;
                    $("#p103item").append("<a style='cursor: pointer;margin-right: 150px;font-size:20px;' onclick=\"p103_show('fcxx',"+lenfcxx+",'房产')\">房产信息</a>");
                    var tbody = '';
                    for (var a = 0; a < lenfcxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p103AJSLfcxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p103AJSLfcxxtr" + a + "' >";
                        }
                        var value = fcxx[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['XM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SFZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['MJ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZL']) + '</td>  ';
                        tbody = tbody + "</tr>";
                    }
                    $("#p103table_fcxx").html(tbody);
                }

                //婚姻信息
                var hyxx = data['data']['hyxx'];
                var hyxxFlag = false;
                if(hyxx!=undefined && hyxx.length>0) {
                    hyxxFlag=true;
                    var lenhyxx = hyxx.length;
                    $("#p103item").append("<a style='cursor: pointer;margin-right: 150px;font-size:20px;' onclick=\"p103_show('hyxx',"+lenhyxx+",'婚姻')\">婚姻信息</a>");
                    var tbody = '';
                    for (var a = 0; a < lenhyxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p103AJSLhyxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p103AJSLhyxxtr" + a + "' >";
                        }
                        var value = hyxx[a];
                        //tbody = tbody + '  <td>'+checkUndefind(value['ZZH'])+'</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZFSFZJH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZFXM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZFSFZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QZSFZJH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QZXM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QZSFZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['TYPE']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['RQ']) + '</td>  ';
                        tbody = tbody + "</tr>";
                    }
                    $("#p103table_hyxx").html(tbody);
                }

                //工商注册信息
                var gszcxx = data['data']['gszcxx'];
                var gszcxxFlag=false;
                if(gszcxx!=undefined && gszcxx.length>0) {
                    gszcxxFlag=true;
                    var lengszcxx = gszcxx.length;
                    $("#p103item").append("<a style='cursor: pointer;margin-right: 110px;font-size:20px;' onclick=\"p103_show('gszcxx',"+lengszcxx+",'工商注册')\">工商注册信息</a>");
                    var tbody = '';
                    for (var a = 0; a < lengszcxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p103AJSLgszcxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p103AJSLgszcxxtr" + a + "' >";
                        }
                        var value = gszcxx[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['MC']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QYLX']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['JYZ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['LXDH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['JYFW']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['DZ']) + '</td>  ';
                        //tbody = tbody + '  <td>'+checkUndefind(value['SFZH'])+'</td>  ';

                        tbody = tbody + "</tr>";
                    }
                    $("#p103table_gszcxx").html(tbody);
                }

                //纳税信息
                var nsxx = data['data']['nsxx'];
                var nsxxFlag = false;
                if(nsxx!=undefined  && nsxx.length>0) {
                    nsxxFlag=true;
                    var lennsxx = nsxx.length;
                    $("#p103item").append("<a style='cursor: pointer;margin-right: 150px;font-size:20px;' onclick=\"p103_show('nsxx',"+lennsxx+",'纳税')\">纳税信息</a>");
                    var tbody = '';
                    for (var a = 0; a < lennsxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p103AJSLnsxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p103AJSLnsxxtr" + a + "' >";
                        }
                        var value = nsxx[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['NSRMC']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['NSRSBH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SKSSQQ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SKSSQZ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SE']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZSXM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SFZH']) + '</td>  ';
                        tbody = tbody + "</tr>";
                    }
                    $("#p103table_nsxx").html(tbody);
                }
                if(nsxxFlag==false && gszcxxFlag==false && hyxxFlag==false && clxxFlag==false && fcxxFlag==false && jtgxFlag==false){
                    alert("没有查询到数据！");
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP103Form(){
    $("#ajsl_name").val('');
    $("#p103item").html('');
    $("#ajsl_sfzjh").val('');
    $("#p103table_clxx").html('');
    $("#p103table_fcxx").html('');
    $("#p103table_gszcxx").html('');
    $("#p103table_hyxx").html('');
    $("#p103table_nsxx").html('');
    $("#p103table_jtgx").html('');
    $("#p103fy").html("");
    $("#p103title").html('');
}
function p103_show(item,sum,name) {
    $("#p103title").html(name+"详细信息");
    $("[id^=p103_]").hide();
    $("#p103fy").html("");
    if (sum > 9) {//添加分页
        $("#p103fy").html("<div id='kkpagerGis'></div>");
        kkpagerinitbyId('p103AJSL'+item, 1, sum, 9);
    }
    $("#p103_"+item).show();
}
//------------------------------案件审理结束--------------------

 ///------------------------------信息核实开始--------------------
function queryp108_XXHS(){
    var name= $("#p108_name").val();
    var sfzjh= $("#p108_sfzjh").val();
    if(name==''){
        alert("姓名不能为空！");
        return;
    }
    if(sfzjh==''){
        alert("身份证号码不能为空！");
        return;
    }
    $.ajax({
        url: baseUrl+'getXXHS?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh,name:name},
        success : function(data) {
            if(data!=undefined ){
               var  XXHS = data['data']['XXHS'];
                var xxhsFlag=false;
                if(XXHS!=undefined && XXHS.length>0) {
                    xxhsFlag=true;
                    var len = XXHS.length;
                    var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p108 XXHStr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p108 XXHStr" + a + "' >";
                        }
                        var value = XXHS[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['JSZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['YXQ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['XM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SFZH']) + '</td>  ';
                        tbody = tbody + "</tr>";
                    }
                    $("#p108table").html(tbody);
                }

                //工商注册信息
                var gszcxx = data['data']['GSZCXX'];
                var gszcxxFlag=false;
                if(gszcxx!=undefined && gszcxx.length>0) {
                    gszcxxFlag=true;
                    var lengszcxx = gszcxx.length;
                    var tbody = '';
                    for (var a = 0; a < lengszcxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p108XXHCgszcxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p108XXHCgszcxxtr" + a + "' >";
                        }
                        var value = gszcxx[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['MC']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QYLX']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['JYZ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['LXDH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['JYFW']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['DZ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['SFZH'])+'</td>  ';

                        tbody = tbody + "</tr>";
                    }
                    $("#p108table_gszcxx").html(tbody);
                    if (lengszcxx > 9) {//添加分页
                        $("#p108fy").html("<div id='kkpagerGis'></div>");
                        kkpagerinitbyId('p108XXHCgszcxx', 1, lengszcxx, 9);
                    }
                }
                
                if(xxhsFlag==false && gszcxxFlag==false){
                    alert("没有查询到数据！");
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP108Form(){
    $("#p108_name").val('');
    $("#p108_sfzjh").val('');
    $("#p108table").html('');
    $("#p108table_gszcxx").html('');
    $("#p108fy").html('');
}
//------------------------------信息核实结束--------------------

 ///------------------------------就业核查开始--------------------
function queryp109_JYHC(){
    var name= $("#p109_name").val();
    var sfzjh= $("#p109_sfzjh").val();
    $.ajax({
        url: baseUrl+'getJYHC?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh,name:name},
        success : function(data) {
            if(data!=undefined){
               var JYHC = data['data']['JYHC'];
                var jyhcFlag=false;
                if(JYHC!=undefined && JYHC.length>0){
                    jyhcFlag=true;
                   var len = JYHC.length;
                   var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p109JYHCtr"+a+"' style='display:none;' >";
                        }else{
                            tbody = tbody + "<tr id='p109JYHCtr"+a+"' >";
                        }
                        var value = JYHC[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['JTGX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['XM'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['SFZH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['XB'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['HH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['LXFS'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['MLXZ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['MZ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['GLZT'])+'</td>  ';
                        tbody = tbody  +"</tr>";
                    }
                    $("#p109table").html(tbody);
                }


                //婚姻信息
                var hyxx = data['data']['HYXX'];
                var hyxxFlag=false;
                if(hyxx!=undefined && hyxx.length>0) {
                    hyxxFlag=true;
                    var lenhyxx = hyxx.length;
                    var tbody = '';
                    for (var a = 0; a < lenhyxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p109JYHChyxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p109JYHChyxxtr" + a + "' >";
                        }
                        var value = hyxx[a];
                        //tbody = tbody + '  <td>'+checkUndefind(value['ZZH'])+'</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZFXM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZFSFZJH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['ZFSFZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QZXM']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QZSFZJH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QZSFZH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['TYPE']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['RQ']) + '</td>  ';
                        tbody = tbody + "</tr>";
                    }
                    $("#p109table_hyxx").html(tbody);
                }

                //工商注册信息
                var gszcxx = data['data']['GSZCXX'];
                var gszcxxFlag=false;
                if(gszcxx!=undefined && gszcxx.length>0) {
                    gszcxxFlag=true;
                    var lengszcxx = gszcxx.length;
                    var tbody = '';
                    for (var a = 0; a < lengszcxx; a++) {
                        if (a > 8) {
                            tbody = tbody + "<tr id='p109JYHCgszcxxtr" + a + "' style='display:none;' >";
                        } else {
                            tbody = tbody + "<tr id='p109JYHCgszcxxtr" + a + "' >";
                        }
                        var value = gszcxx[a];
                        tbody = tbody + '  <td>' + checkUndefind(value['MC']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['QYLX']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['JYZ']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['LXDH']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['JYFW']) + '</td>  ';
                        tbody = tbody + '  <td>' + checkUndefind(value['DZ']) + '</td>  ';
                        //tbody = tbody + '  <td>'+checkUndefind(value['SFZH'])+'</td>  ';

                        tbody = tbody + "</tr>";
                    }
                    $("#p109table_gszcxx").html(tbody);
                    if(lengszcxx>9){//添加分页
                        $("#p109fy").html("<div id='kkpagerGis'></div>");
                        kkpagerinitbyId('p109JYHCgszcxx',1,lengszcxx,9);
                    }
                }
                if(jyhcFlag==false && hyxxFlag==false && gszcxxFlag==false){
                    alert("没有查询到数据！");
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP109Form(){
    $("#p109fy").html('');
    $("#p109_name").val('');
    $("#p109_sfzjh").val('');
    $("#p109table").html('');
    $("#p109table_hyxx").html('');
    $("#p109table_gszcxx").html('');
}
//------------------------------就业核查结束--------------------

 ///------------------------------医疗分析开始--------------------
function queryp110_YLFX(){
    var startDate= $("#p110_startDate").val();
    var endDate= $("#p110_endDate").val();
    if(startDate==''){
        alert("请选择开始时间");
        return ;
    }
    if(endDate==''){
        alert("请选择结束时间");
        return ;
    }
    if(startDate>endDate){
        alert('开始时间必须在结束时间之前');
        return;
    }
    $.ajax({
        url: baseUrl+'getYLFX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {startDate:startDate,endDate:endDate},
        success : function(data) {
            if(data!=undefined && data['data']['YLFX'].length>0){
                $("#ylfxTable").show();
               var YLFX = data['data']['YLFX'];
               var len = YLFX.length;
               var tbody = '';
               var czzc = new Array();
                var ylzc = new Array();
                var bfb = new Array();
                var yf=new Array();
                for (var a = 0; a < len; a++) {
                    var value = YLFX[a];
                    if(a>8){
                        tbody = tbody + "<tr id='p110YLFXtr"+a+"' style='display:none;' name='ylfx_"+value['TJYF']+"' >";
                    }else{
                        tbody = tbody + "<tr id='p110YLFXtr"+a+"' name='ylfx_"+value['TJYF']+"' >";
                    }

                         tbody = tbody + '  <td>'+checkUndefind(value['TJYF'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['YLZC'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['BFB'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['CZZC'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['TBZZ'])+'</td>  ';
                    tbody = tbody  +"</tr>";
                    czzc.push(value['CZZC']);
                    ylzc.push(value['YLZC']);
                    bfb.push(value['BFB'].substr(0,value['BFB'].length-1));
                    yf.push(value['TJYF']);
                }
                $("#p110table").html(tbody);
                if(len>9){//添加分页
                    $("#p110formfy").html("<div id='kkpagerGis'></div>");
                    kkpagerinitbyId('p110YLFX',1,len,9);
                }

                lineChart('ylfx_ylfx','支出',yf,['财政支出','医疗支出'],[{name:'财政支出',data:czzc,type:'line'},{name:'医疗支出',data:ylzc,type:'line'}],ylzc_formater,'','');
                lineChart('ylfx_bfb','医疗支出占比',yf,['百分比'],[{name:'百分比',data:bfb,type:'line'}],ylzcbfb_formater,'{value}%','');

            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP110Form(){
    $("#ylfxTable").hide();
    $("#p110_startDate").val('');
    $("#p110_endDate").val('');
    $("#p110table").html('');
    $("#p110formfy").html('');
    $("#ylfx_ylfx").html('');
    $("#ylfx_bfb").html('');
}
//------------------------------医疗分析结束--------------------

 ///-----------------------------退伍安置开始--------------------
function queryp111_TWAZ(){
    var dwmc= $("#p111_dwmc").val();
    var gwlb= $("#p111_gwlb").val();
    var ryfl= $("#p111_ryfl").val();
    if(dwmc==''){
        alert("单位名称不能为空！");
        return;
    }
    $.ajax({
        url: baseUrl+'getTWAZ?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {dwmc:dwmc,gwlb:gwlb,ryfl:ryfl},
        success : function(data) {
            if(data!=undefined ){
               var TWAZ = data['data']['TWAZ'];
                if(TWAZ!=undefined){
                   var len = TWAZ.length;
                   var tbody = '';
                   if(len>0){
                       for (var a = 0; a < len; a++) {
                           if(a>8){
                               tbody = tbody + "<tr id='p111TWAZtr"+a+"' style='display:none;' >";
                           }else{
                               tbody = tbody + "<tr id='p111TWAZtr"+a+"' >";
                           }
                           var value = TWAZ[a];
                           var kbrs=checkUndefind(value['KBRS']);
                           if(kbrs*1<0){
                               kbrs='<font color="red">异常</font>';
                           }
                           tbody = tbody + '  <td>'+checkUndefind(value['MC'])+'</td>  ';
                           tbody = tbody + '  <td>'+checkUndefind(value['FDDBR'])+'</td>  ';
                           tbody = tbody + '  <td>'+checkUndefind(value['LXDH'])+'</td>  ';
                           tbody = tbody + '  <td>'+checkUndefind(value['RYBZ'])+'</td>  ';
                           tbody = tbody + '  <td>'+checkUndefind(value['CYRS'])+'</td>  ';
                           tbody = tbody + '  <td>'+kbrs+'</td>  ';
                           tbody = tbody  +"</tr>";
                       }
                       $("#p111table").html(tbody);
                       if(len>9){//添加分页
                           $("#p111TWAZfy").html("<div id='kkpagerGis'></div>");
                           kkpagerinitbyId('p111TWAZ',1,len,9);
                       }
				   }else{
                       alert("没有查询到数据！");
				   }
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP111Form(){
    $("#p111_dwmc").val('');
    $("#p111_gwlb").val('');
    $("#p111_ryfl").val('');
    $("#p111table").html('');
    $("#p111TWAZfy").html('');
    $("#p111Detail").hide();
}
function p111_show(name,num){
    $("#p111Detail").show();
    $("#p111DetailTable").html('');
    $.ajax({
        url: baseUrl+'getKBRYXXXX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {name:5},
        success : function(data) {
            if(data!=undefined ){
                var detail = data['data']['KBRYXXXX'];
                if(detail!=undefined){
                    var len = detail.length;
                    var tbody = '';
                    for (var a = 0; a < len; a++) {
                        tbody = tbody + "<tr id='p111detailtr"+a+"' >";
                        var value = detail[a];
                        tbody = tbody + '  <td>'+checkUndefind(value['DWMC'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['GWLB'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['BZJFXS'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['LDR'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['RS'])+'</td>  ';
                        tbody = tbody  +"</tr>";
                    }
                    $("#p111DetailTable").html(tbody);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

//-------------------------------退伍安置结束--------------------
///------------------------------惠农补贴开始--------------------
function queryp112_HNBT(){
    var sfzjh= $("#p112_sfzjh").val();
    var name= $("#p112_name").val();
    if(name==''){
        alert('姓名不能为空');
        return;
    }
    if(sfzjh==''){
        alert('身份证号不能为空');
        return;
    }

    $.ajax({
        url: baseUrl+'getHNBT?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh,name:name},
        success : function(data) {
            if(data!=undefined && data['data']['HNBT'].length>0){
               var HNBT = data['data']['HNBT'];
                if(HNBT!=undefined){
                   var len = HNBT.length;
                   var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p112HNBTtr"+a+"' style='display:none;' >";
                       }else{
                           tbody = tbody + "<tr id='p112HNBTtr"+a+"' >";
                       }
                       var value = HNBT[a];
                        tbody = tbody + '  <td>'+checkUndefind(value['HH'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['JTGX'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['XM'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['SFZH'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['XB'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['MZ'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['DZ'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['SFYB'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['SFDB'])+'</td>  ';
                        tbody = tbody  +"</tr>";
                   }
                   $("#p112table").html(tbody);
                    if(len>9){//添加分页
                      $("#p112HNBTfy").html("<div id='kkpagerGis'></div>");
                      kkpagerinitbyId('p112HNBT',1,len,9);
                   }
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP112Form(){
   $("#p112_sfzjh").val('');
   $("#p112_name").val('');
   $("#p112table").html('');
   $("#p112HNBTfy").html('');
}
//------------------------------惠农补贴结束--------------------

 ///------------------------------少数民族少儿入园率开始--------------------
function queryp113_SSMZYERYL(){
    var endDate= $("#p113_endDate").val();
    var startDate= $("#p113_startDate").val();
    if(startDate==''){
        alert('开始时间不能为空');
        return;
    }
    if(endDate==''){
       alert('结束时间不能为空'); 
        return;
    }

    $.ajax({
        url: baseUrl+'getSSMZYERYL?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {endDate:endDate,startDate:startDate},
        success : function(data) {
            if(data!=undefined && data['data']['SSMZYERYL'].length>0){
               var SSMZYERYL = data['data']['SSMZYERYL'];
                if(SSMZYERYL!=undefined){
                   var len = SSMZYERYL.length;
                   var tbody = '';
                    var ssryl={};
                    var ryl={};
                    var sj=new Array();
                    for (var a = 0; a < len; a++) {
                       var value = SSMZYERYL[a];
                        if(a==0){
                            ssryl={name:'少数名族幼儿入园率',data:[value['SSMZSLETRYL']],type:'line',extra:SSMZYERYL};
                            ryl={name:'幼儿入园率',data:[value['SLETRYL']],type:'line',extra:SSMZYERYL};
                        }else{
                           ssryl['data'].push(value['SSMZSLETRYL']);
                           ryl['data'].push(value['SLETRYL']);
                        }
                        sj.push(value['TJYF']);
                   }
                    lineChart('p113_ryl','入园率',sj,['少数名族幼儿入园率','幼儿入园率'],[ssryl,ryl],yeryl_formater,'{value}%','');
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP113Form(){
   $("#p113_endDate").val('');
   $("#p113_startDate").val('');
    $("#p113_ryl").html('');
    $("#p113_rys").html('');

}
//------------------------------少数民族少儿入园率结束--------------------

///------------------------------宗教教职人员开始--------------------
function queryp115_ZJJZRYXX(){
    var sfzjh= $("#p115sfzjh").val();
    var name= $("#p115name").val();
    if(sfzjh==''){
       alert('身份证件号码不能为空'); 
        return;
     }
    if(name==''){
       alert('名称不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getZJJZRYXX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh,name:name},
        success : function(data) {
            $("[id^=p115_]").hide();
            $("#p115item").html('');
            $("#p115title").html('');
            if(data!=undefined && data['success']==true){

                var JZRY = data['data']['JZRY'];
                if(JZRY==undefined ||JZRY.length<1){
                    alert("没有查询到数据！");
                    return;
                }

               var YLBX = data['data']['YLBX'];
                var ylbxFlag=false;
                if(YLBX!=undefined &&  YLBX.length>0){
                    ylbxFlag=true;
                    var len = YLBX.length;
                    $("#p115item").append("<a style='cursor: pointer;margin-right: 100px;font-size:20px;' onclick=\"p115_show('YLBX',"+len+",'养老保险')\">养老保险信息</a>");

                   var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p115YLBXtr"+a+"' style='display:none;' >";
                       }else{
                           tbody = tbody + "<tr id='p115YLBXtr"+a+"' >";
                       }
                       var value = YLBX[a];
                         tbody = tbody + '  <td>'+checkUndefind(value['GRBH'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['CSRQ'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['XM'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['DWBH'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['DWMC'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['CBSJ'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['CJGZRQ'])+'</td>  ';
                       tbody = tbody  +"</tr>";
                   }
                   $("#p115YLBXtable").html(tbody);
                }

                var yilbxFlag=false;
               var YILBX = data['data']['YILBX'];
                if(YILBX!=undefined && YILBX.length>0){
                    yilbxFlag=true;
                   var len = YILBX.length;
                    $("#p115item").append("<a style='cursor: pointer;margin-right: 100px;font-size:20px;' onclick=\"p115_show('YILBX',"+len+",'医疗保险')\">医疗保险信息</a>");

                    var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p115YILBXtr"+a+"' style='display:none;' >";
                       }else{
                           tbody = tbody + "<tr id='p115YILBXtr"+a+"' >";
                       }
                       var value = YILBX[a];
                        tbody = tbody + '  <td>'+checkUndefind(value['GRBH'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['CSRQ'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['XM'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['DWBH'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['DWMC'])+'</td>  ';
                        tbody = tbody + '  <td>'+checkUndefind(value['CJGZRQ'])+'</td>  ';
                       tbody = tbody  +"</tr>";
                   }
                   $("#p115YILBXtable").html(tbody);
                }
               var sybxFlag=false;
               var SYBX = data['data']['SYBX'];
                if(SYBX!=undefined && SYBX.length>0){
                    sybxFlag=true;
                   var len = SYBX.length;
                    $("#p115item").append("<a style='cursor: pointer;margin-right: 100px;font-size:20px;' onclick=\"p115_show('SYBX',"+len+",'失业保险')\">失业保险信息</a>");

                    var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p115SYBXtr"+a+"' style='display:none;' >";
                       }else{
                           tbody = tbody + "<tr id='p115SYBXtr"+a+"' >";
                       }
                       var value = SYBX[a];
                         tbody = tbody + '  <td>'+checkUndefind(value['GRBH'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['GRCBRQ'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['JBJG'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['XM'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['RYZS'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['DWBH'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['DWMC'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['JBRQ'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['CBZS'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['GRJFZS'])+'</td>  ';
                       tbody = tbody  +"</tr>";
                   }
                   $("#p115SYBXtable").html(tbody);
                    if(yilbxFlag==false && ylbxFlag==false && sybxFlag==false){
                        alert("没有查询到数据！");
                    }
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP115Form(){
    $("#p115item").html('');
    $("#p115sfzjh").val('');
    $("#p115name").val('');
    $("#p115YLBXtable").html('');
    $("#p115YILBXtable").html('');
    $("#p115SYBXtable").html('');
    $("#p115fy").html("");
    $("#p115title").html('');
}
function p115_show(item,sum,name) {
    $("#p115title").html(name+"详细信息");
    $("[id^=p115_]").hide();
    $("#p115fy").html("");
    if (sum > 9) {//添加分页
        $("#p115fy").html("<div id='kkpagerGis'></div>");
        kkpagerinitbyId('p115'+item, 1, sum, 9);
    }
    $("#p115_"+item).show();
}
//------------------------------宗教教职人员结束--------------------

///------------------------------宗教社团监管开始--------------------
function queryp116_ZJSTJG(){
    var stname= $("#p116_stname").val();
    if(stname==''){
       alert('社团名称不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getZJSTJG?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {stname:stname},
        success : function(data) {
            if(data!=undefined && data['success']==true){
               var ZJSTJG = data['data']['ZJSTJG'];
                if(ZJSTJG!=undefined){
                   var len = ZJSTJG.length;
                    var sumTr =  Math.floor(len/3);
                    var tr="";
                    for(var i=0;i<sumTr;i++){
                        var one =ZJSTJG[i*3];
                        var two =ZJSTJG[i*3+1];
                        var three =ZJSTJG[i*3+2];

                        tr =tr+ "<tr><td align='left' >"+
                            "<a style='cursor: pointer;' onclick=\"p116zjtt_show('"+checkUndefind(one['MC'],'-')+"','"+checkUndefind(one['JB'],'-')+"','"+checkUndefind(one['FZRXM'],'-')+"','"+checkUndefind(one['TTLXDH'],'-')+"','"+checkUndefind(one['DZ'],'-')+"')\">"+checkUndefind(one['MC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p116zjtt_show('"+checkUndefind(two['MC'],'-')+"','"+checkUndefind(two['JB'],'-')+"','"+checkUndefind(two['FZRXM'],'-')+"','"+checkUndefind(two['TTLXDH'],'-')+"','"+checkUndefind(two['DZ'],'-')+"')\">"+checkUndefind(two['MC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p116zjtt_show('"+checkUndefind(three['MC'],'-')+"','"+checkUndefind(three['JB'],'-')+"','"+checkUndefind(three['FZRXM'],'-')+"','"+checkUndefind(three['TTLXDH'],'-')+"','"+checkUndefind(three['DZ'],'-')+"')\">"+checkUndefind(three['MC'],'-')+"</a>"+
                            "</td></tr>";
                    }
                    if(3*sumTr<len){
                        tr =tr+ "<tr>";
                        for(var i=0;i<len-sumTr*3;i++){
                            var one =ZJSTJG[sumTr*3+i]
                            tr=tr+"<td align='left'><a style='cursor: pointer;' onclick=\"p116zjtt_show('"+checkUndefind(one['MC'],'-')+"','"+checkUndefind(one['JB'],'-')+"','"+checkUndefind(one['FZRXM'],'-')+"','"+checkUndefind(one['TTLXDH'],'-')+"','"+checkUndefind(one['DZ'],'-')+"')\">"+checkUndefind(one['MC'],'-')+"</a>"+"</td>"
                        }
                        tr=tr+"</tr>";
                    }
                    $("#p116zjtt_item").html(tr);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP116Form(){
    $("#p116_stname").val('');
    $("#p116zjtt_item").html('');
    $("#p116_stmc").val('');
    $("#p116_fzrxm").val('');
    $("#p116_lxdh").val('');
    $("#p116_dz").val('');
}
function p116zjtt_show(mc,jb,fzrxm,ttlxdh,dz) {
    $("#p116_stmc").val(mc);
    $("#p116_fzrxm").val(fzrxm);
    $("#p116_lxdh").val(ttlxdh);
    $("#p116_dz").val(dz);
}
//------------------------------宗教社团监管结束--------------------

///------------------------------特少民族学生管理开始--------------------
function queryp117_TSMZXSGL(){
    var xxname= $("#p117_xxname").val();
    if(xxname==''){
       alert('学校名称不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getTSMZXSGL?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {xxname:xxname},
        success : function(data) {
            if(data!=undefined && data['data']['TSMZXSGL'].length>0){
               var TSMZXSGL = data['data']['TSMZXSGL'];
                if(TSMZXSGL!=undefined && TSMZXSGL.length>0){
                    var len = TSMZXSGL.length;
                    var sumTr =  Math.floor(len/3);
                    var tr="";
                    for(var i=0;i<sumTr;i++){
                        var one =TSMZXSGL[i*3];
                        var two =TSMZXSGL[i*3+1];
                        var three =TSMZXSGL[i*3+2];

                        tr =tr+ "<tr><td align='left' >"+
                            "<a style='cursor: pointer;' onclick=\"p117tssmz_show('"+checkUndefind(one['XXMC'],'-')+"')\">"+checkUndefind(one['XXMC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p117tssmz_show('"+checkUndefind(two['XXMC'],'-')+"')\">"+checkUndefind(two['XXMC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p117tssmz_show('"+checkUndefind(three['XXMC'],'-')+"')\">"+checkUndefind(three['XXMC'],'-')+"</a>"+
                            "</td></tr>";
                    }
                    if(3*sumTr<len){
                        tr =tr+ "<tr>";
                        for(var i=0;i<len-sumTr*3;i++){
                            var one =TSMZXSGL[sumTr*3+i]
                            tr=tr+"<td align='left'><a style='cursor: pointer;' onclick=\"p117tssmz_show('"+checkUndefind(one['XXMC'],'-')+"')\">"+checkUndefind(one['XXMC'],'-')+"</a>"+"</td>"
                        }
                        tr=tr+"</tr>";
                    }
                    $("#p117tssmz_item").html(tr);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP117Form(){
    $("#p117_xxname").val('');
    $("#p117tssmz_item").html('');
    $("#p117rs").hide();
    $("#p117TSMZXSGLtable").html('');
}
function p117tssmz_show(name){
    $.ajax({
        url: baseUrl+'getTSMZXSGLDetail?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {xxname:name},
        success : function(data) {
            if(data!=undefined && data['data']['Detail'].length>0){
                var TSMZXSGL = data['data']['Detail'];
                if(TSMZXSGL!=undefined && TSMZXSGL.length>0) {
                    $("#p117rs").show();
                    var len = TSMZXSGL.length;
                    var sumTr =  Math.floor(len/3);
                    var tr="";
                    for(var i=0;i<sumTr;i++){
                        var one =TSMZXSGL[i*3];
                        var two =TSMZXSGL[i*3+1];
                        var three =TSMZXSGL[i*3+2];

                        tr =tr+ "<tr><td >"+checkUndefind(one['MZ'],'-')+"</td><td>"+checkUndefind(one['RS'],'-')+"</td>" +
                                "<td >"+checkUndefind(two['MZ'],'-')+"</td><td>"+checkUndefind(two['RS'],'-')+"</td>" +
                                "<td>"+checkUndefind(three['MZ'],'-')+"</td><td>"+checkUndefind(three['RS'],'-')+"</td></tr>";
                    }
                    if(3*sumTr<len){
                        if(len-sumTr==2){
                            tr =tr+ "<tr>";
                            var one =TSMZXSGL[len-1]
                            var two =TSMZXSGL[len-2]
                            tr=tr+"<td>"+checkUndefind(one['MZ'],'-')+"</td><td>"+checkUndefind(one['RS'],'-')+"</td>" +
                                "<td>"+checkUndefind(two['MZ'],'-')+"</td><td>"+checkUndefind(two['RS'],'-')+"</td><td></td><td></td>"
                            tr=tr+"</tr>";
                        }else{
                            tr =tr+ "<tr>";
                            var one =TSMZXSGL[len-1]
                            tr=tr+"<td>"+checkUndefind(one['MZ'],'-')+"</td><td>"+checkUndefind(one['RS'],'-')+"</td><td></td><td></td><td></td><td></td>"
                            tr=tr+"</tr>";
                        }

                    }
                    $("#p117TSMZXSGLtable").html(tr);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
//------------------------------特少民族学生管理结束--------------------

///------------------------------流动少数名族管理开始--------------------
function queryp118_LDSSMZGL(){
    var sfzjh= $("#p118_sfzjh").val();
    var name= $("#p118_name").val();
    if(sfzjh==''){
       alert('身份证件号不能为空'); 
        return;
     }
    if(name==''){
       alert('姓名不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getLDSSMZGL?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh,name:name},
        success : function(data) {
            if(data!=undefined && data['data']!=undefined){
               var value = data['data']['LDSSMZGL'][0];
                if(value!=undefined){
                    $("#p118R_lxdh").val(checkUndefind(value['LXDH'],'-'));
                    $("#p118R_jzdz").val(checkUndefind(value['JZDZ']));
                    $("#p118R_xm").val(checkUndefind(value['XM']));
                    $("#p118R_sfzjh").val(checkUndefind(value['SFZHM']));
                    $("#p118R_dbsyy").val(checkUndefind(value['DBSYY']));
                    $("#p118R_dbsrq").val(checkUndefind(value['DBSRQ']));
                    $("#p118R_mz").val(checkUndefind(value['MZ']));
                    $("#p118R_xb").val(checkUndefind(value['XB']));
                }else{
                    alert("没有查询到数据！");
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP118Form(){
    $("#p118_sfzjh").val('');
    $("#p118_name").val('');
    $("#p118R_lxdh").val('');
    $("#p118R_jzdz").val('');
    $("#p118R_xm").val('');
    $("#p118R_sfzjh").val('');
    $("#p118R_dbsyy").val('');
    $("#p118R_dbsrq").val('');
    $("#p118R_mz").val('');
    $("#p118R_xb").val('');
}
//------------------------------流动少数名族管理结束--------------------

///------------------------------少数名族分析开始--------------------
function queryp119_SSMZFX(){
    $.ajax({
        url: baseUrl+'getSSMZFX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {},
        success : function(data) {
            if(data!=undefined && data['data']['SSMZFX'].length>0){
               var SSMZFX = data['data']['SSMZFX'];
               var hz=0;
                var ssmz=0;
                if(SSMZFX!=undefined){
                   var len = SSMZFX.length;
                    var all=new Array();
                    var ssmzs=new Array();
                    var xtype=new Array();
                    for (var a = 0; a < len; a++) {
                        var value = SSMZFX[a];
                        var rs = checkUndefind(value['RS'])
                        var mz = checkUndefind(value['MZ']);
                        var xzqy = checkUndefind(value['XZQY']);
                        xtype.push(xzqy);
                        if(mz=='汉族'){
                            hz=hz+rs;
                        }else{
                            ssmz=ssmz+rs;
                        }
                        var flag=false;
                        for(var i=0,lens=all.length;i<lens;i++){
                            if(all[i]['name']==xzqy){
                                all[i]['data']=all[i]['data']+rs;
                                if(mz!='汉族'){
                                    ssmzs[i]['data']=ssmzs[i]['data']+rs;
                                }
                                flag=true;
                            }
                        }
                        if(flag==false){
                            all.push({name:xzqy,type:'line',data:rs});
                            if(mz!='汉族'){
                                ssmzs.push({name:xzqy,type:'line',data:rs});
                            }else{
                                ssmzs.push({name:xzqy,type:'line',data:0});
                            }
                        }
                   }
                    xtype=unique(xtype);
                   var  allData={name:'所有民族',type:'line',data:[],extra:SSMZFX};
                    var ssmzData={name:'少数民族',type:'line',data:[],extra:SSMZFX};
                    for(var s=0;s<xtype.length;s++){
                        for(var i=0;i<all.length;i++){
                            if(xtype[s]==all[i]['name']){
                                allData.data.push(all[i]['data']);
                                ssmzData.data.push(ssmzs[i]['data']);
                            }
                        }
                    }
                    initRangeCharts("ssmzfx_zb",[{name:'汉族',value:hz},{name:'少数民族',value:ssmz}]);
                    lineChart('ssmzfx_xzqy','各民族数量',xtype,['所有民族','少数民族'],[allData,ssmzData],ssmz_formater,'','item');
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP119Form(){
    $("#ssmzfx_zb").html("");
    $("#ssmzfx_xzqy").html("");
    $("#ssmzfx_xzqy_mz").html("");
}
//------------------------------少数名族分析结束--------------------

///------------------------------流动少数名族分析开始--------------------
function queryp120_LDSSMZFX(){
    $.ajax({
        url: baseUrl+'getLDSSMZFX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {},
        success : function(data) {
            if(data!=undefined && data['data']['LDSSMZFX'].length>0){
                var LDSSMZFX = data['data']['LDSSMZFX'];
                if(LDSSMZFX!=undefined){
                    var len = LDSSMZFX.length;
                    var all=new Array();
                    var ssmzs=new Array();
                    var xtype=new Array();
                    for (var a = 0; a < len; a++) {
                        var value = LDSSMZFX[a];
                        var rs = checkUndefind(value['RS'])
                        var xzqy = checkUndefind(value['XZQY']);
                        xtype.push(xzqy);
                        var flag=false;
                        for(var i=0,lens=all.length;i<lens;i++){
                            if(all[i]['name']==xzqy){
                            ssmzs[i]['data']=ssmzs[i]['data']+rs;
                                flag=true;
                            }
                        }
                        if(flag==false){
                            all.push({name:xzqy,type:'line',data:rs});
                            ssmzs.push({name:xzqy,type:'line',data:rs});
                        }
                    }
                    xtype=unique(xtype);
                    var  allData={name:'少数民族',type:'line',data:[],extra:LDSSMZFX};
                    for(var s=0;s<xtype.length;s++){
                        for(var i=0;i<all.length;i++){
                            if(xtype[s]==all[i]['name']){
                                allData.data.push(all[i]['data']);
                            }
                        }
                    }
                    lineChart('ldssmzfx_xzqy','少数民族数量',xtype,['少数民族'],[allData],ldssmz_formater,'','item');
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP120Form(){
    $("#ldssmzfx_xzqy").html("");
    $("#ldssmzfx_xzqy_mz").html("");
}
//------------------------------流动少数名族分析结束--------------------

///------------------------------招商监管开始--------------------
function queryp121_zsjg(){
    var srr= $("#p121_srr").val();
    if(srr==''){
       alert('受让人不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getzsjg?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {srr:srr},
        success : function(data) {
            if(data!=undefined && data['data']['zsjg'].length>0){
               var zsjg = data['data']['zsjg'];
                if(zsjg!=undefined){
                   var len = zsjg.length;
                   var tbody = '';
                    for (var a = 0; a < len; a++) {
                        if(a>8){
                            tbody = tbody + "<tr id='p121zsjgtr"+a+"' style='display:none;' >";
                       }else{
                           tbody = tbody + "<tr id='p121zsjgtr"+a+"' >";
                       }
                       var value = zsjg[a];
                        tbody = tbody + '  <td>'+checkUndefind(value['HTBH'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['SRR'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['ZDWZ'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['HTQDSJ'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['ZDXMMC'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['TDYT'])+'</td>  ';
                         tbody = tbody + '  <td>'+checkUndefind(value['TDMJGQ'])+'</td>  ';
                       tbody = tbody  +"</tr>";
                   }
                   $("#p121zsjgtable").html(tbody);
                    if(len>9){//添加分页
                      $("#p121zsjgfy").html("<div id='kkpagerGis'></div>");
                      kkpagerinitbyId('p121zsjg',1,len,9);
                   }
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP121Form(){
    $("#p121_srr").val('');
    $("#p121zsjgfy").html('');
    $("#p121zsjgtable").html('');
}
//------------------------------招商监管结束--------------------

///------------------------------教职人员监管开始--------------------
function queryp122_JZRYJG(){
    var sfzjh= $("#p122_sfzjh").val();
    var name= $("#p122_name").val();
    if(sfzjh==''){
       alert('身份证件号不能为空'); 
        return;
     }
    if(name==''){
       alert('姓名不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getJZRYJG?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {sfzjh:sfzjh,name:name},
        success : function(data) {
            if(data!=undefined && data['data']!=undefined){
               var JZRYJG = data['data']['JZRYJG'];
                if(JZRYJG!=undefined){
                   var len = JZRYJG.length;
                   if(len>0){
                       for (var a = 0; a < len; a++) {
                           var value = JZRYJG[a];
                           $("#p122_xzcfjys").val(checkUndefind(value['XZCFCS']));
                           $("#p122_xm").val(checkUndefind(value['XM']));
                           $("#p122_dz").val(checkUndefind(value['JZDZ']));
                           $("#p122_sfztry").val(checkUndefind(value['SFZTRY']));
                           $("#p122_xb").val(checkUndefind(value['XB']));
                           $("#p122_mz").val(checkUndefind(value['MZ']));
                       }
                       if(checkUndefind(JZRYJG[0]['XZCFCS'])*1>0){
                           $("#p122_xq").html('<a onclick="p122_show(\''+sfzjh+'\')" style="color: #0a9fe1;cursor: pointer;margin-left:6px;">详情</a>');
                       }
				   }else{
                       alert("没有查询到数据！");
				   }
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
function restP122Form(){
    $("#p122_sfzjh").val('');
    $("#p122_name").val('');
}
function p122_show(sfzjh){
    $("#p122_cfxx").show();
        $.ajax({
            url: baseUrl+'getJZRYJGItem?'+t,
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            data : {sfzjh:sfzjh},
            success : function(data) {
                $("#p122_item").html('');
                if(data!=undefined && data['data']!=undefined){
                    var AJXZCF = data['data']['AJXZCF'];
                    if(AJXZCF!=undefined && AJXZCF.length>0){
                        var len = AJXZCF.length;
                        $("#p122_item").append('<a id="p122item_AJXZCF" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'AJXZCF\','+len+')">' +
                            '大理市安监局行政处罚信息</a><hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trAJXZCFtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trAJXZCFtr"+a+"' >";
                            }
                            var value = AJXZCF[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_AJXZCF").append(tbody);
                        p122detail_show('AJXZCF',len);
                    }
                    var CXZDXZCF = data['data']['CXZDXZCF'];
                    if(CXZDXZCF!=undefined && CXZDXZCF.length>0){
                        var len = CXZDXZCF.length;
                        $("#p122_item").append('<a id="p122item_CXZDXZCF" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'CXZDXZCF\','+len+')">' +
                            '创新工业园区国税局行政处罚信息</a><hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trCXZDXZCFtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trCXZDXZCFtr"+a+"' >";
                            }
                            var value = CXZDXZCF[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_CXZDXZCF").append(tbody);
                    }
                    var FYZFRY = data['data']['FYZFRY'];
                    if(FYZFRY!=undefined && FYZFRY.length>0){
                        var len = FYZFRY.length;
                        $("#p122_item").append('<a id="p122item_FYZFRY" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'FYZFRY\','+len+')">' +
                            '失信被执行人员信息</a><hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trFYZFRYtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trFYZFRYtr"+a+"' >";
                            }
                            var value = FYZFRY[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_FYZFRY").append(tbody);
                    }
                    var FZZDXZCF = data['data']['FZZDXZCF'];
                    if(FZZDXZCF!=undefined && FZZDXZCF.length>0){
                        var len = FZZDXZCF.length;
                        $("#p122_item").append('<a id="p122item_FZZDXZCF" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'FZZDXZCF\','+len+')">' +
                            '大理市法制局重大行政处罚案件信息</a><hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trFZZDXZCFtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trFZZDXZCFtr"+a+"' >";
                            }
                            var value = FZZDXZCF[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_FZZDXZCF").append(tbody);
                    }
                    var GONGSXZCF = data['data']['GONGSXZCF'];
                    if(GONGSXZCF!=undefined && GONGSXZCF.length>0){
                        var len = GONGSXZCF.length;
                        $("#p122_item").append('<a id="p122item_GONGSXZCF" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'GONGSXZCF\','+len+')">' +
                            '大理市工商局行政处罚信息</a>' +
                            '<hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trGONGSXZCFtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trGONGSXZCFtr"+a+"' >";
                            }
                            var value = GONGSXZCF[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_GONGSXZCF").append(tbody);
                    }
                    var GSXZCF = data['data']['GSXZCF'];
                    if(GSXZCF!=undefined && GSXZCF.length>0){
                        var len = GSXZCF.length;
                        $("#p122_item").append('<a id="p122item_GSXZCF" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'GSXZCF\','+len+')">' +
                            '大理市国税局行政处罚信息</a>' +
                            '<hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trGSXZCFtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trGSXZCFtr"+a+"' >";
                            }
                            var value = GSXZCF[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_GSXZCF").append(tbody);
                    }
                    var ZJZDXZCF = data['data']['ZJZDXZCF'];
                    if(ZJZDXZCF!=undefined && ZJZDXZCF.length>0){
                        var len = ZJZDXZCF.length;
                        $("#p122_item").append('<a id="p122item_ZJZDXZCF" style="margin-left:6px;margin-right: 3px;margin-top:6px;cursor: pointer;" onclick="p122detail_show(\'ZJZDXZCF\','+len+')">' +
                            '大理市安监局重大行政处罚信息</a>' +
                            '<hr style="border-top:1px dashed #a2bae1;margin-top: 6px;margin-bottom: 3px;">');
                        var tbody = "";
                        for (var a = 0; a < len; a++) {
                            if(a>8){
                                tbody = tbody + "<tr id='p122trZJZDXZCFtr"+a+"' style='display:none;' >";
                            }else{
                                tbody = tbody + "<tr id='p122trZJZDXZCFtr"+a+"' >";
                            }
                            var value = ZJZDXZCF[a];
                            tbody = tbody + '  <td>'+checkUndefind(value['CFLX'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFWH'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['CFRQ'])+'</td>  ';
                            tbody = tbody + '  <td>'+checkUndefind(value['WFSS'])+'</td>  ';
                            tbody = tbody  +"</tr>";
                        }
                        $("#p122table_ZJZDXZCF").append(tbody);
                    }
                }
            },
            error : function(response) {
                alert(response.statusText);
            },
            timeout:60000
        });
}
function p122detail_show(item,len){
    $("tbody[id^='p122table_']").hide();
    $("tr[id^='p122tr']").hide();
    $("a[id^='p122item_']").css('color','');

    $("#p122table_"+item).show();
    $("#p122item_"+item).css('color','red');
    $("#p122thcflx").width('auto');
    $("#p122thcfss").width('auto');
    $("#p122thcfsj").width('auto');
    $("#p122thcfwh").width('auto');

    if(len>9){
        $("#p122_fy").html("<div id='kkpagerGis'></div>");
        kkpagerinitbyId("p122tr"+item,1,len,9);
        for(var i=0; i<9; i++){
            $("#p122tr"+item+"tr"+i).show();
        }
    }else{
        $("#p122_fy").html('');
        for(var i=0; i<len; i++){
            $("#p122tr"+item+"tr"+i).show();
        }
    }
        var cflx=$("#p122thcflx").width();
        var cfsj=$("#p122thcfsj").width();
        var cfwh=$("#p122thcfwh").width();
        var cfss=$("#p122thcfss").width();
        if(cflx*1<25){
            $("#p122thcflx").width(28);
        }
        if(cfwh*1<25){
            $("#p122thcfwh").width(28);
        }
        if(cfsj*1<25){
            $("#p122thcfsj").width(28);
        }
        if(cfss*1<25){
            $("#p122thcfss").width(28);
        }
}
//------------------------------教职人员监管结束--------------------

//------------------------------通用方法------------------------
//字段的值是否为undefined
function checkUndefind(value,replaceChar){
    if(replaceChar==undefined){
        replaceChar='-';
    }
    var re =  value==undefined?replaceChar:value;
    return re=='undefined'?replaceChar:re;
}
//数组去重
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
//计算两个时间之间的年月
function getMonths(param){
    var sj=new Array();
    var startTime = param['start'].split('-');
    var endTime = param['end'].split('-');
    var v =endTime[0]*1-startTime[0]*1;
    for(var i=0;i<=v;i++){
        var temp=startTime[1]*1;
        if(i==0){
            temp=startTime[1]*1;
        }else{
            temp=1;
        }
        if(startTime[0]*1+i<endTime[0]){
            while(temp<=12 ){
                if(temp<10){
                    sj.push(startTime[0]*1+i+'-0'+temp);
                }else{
                    sj.push(startTime[0]*1+i+'-'+temp);
                }
                temp++;
            }
        }else if(startTime[0]*1+i==endTime[0]){
            while(temp<=endTime[1]*1 ){
                if(temp<10){
                    sj.push(startTime[0]*1+i+'-0'+temp);
                }else{
                    sj.push(startTime[0]*1+i+'-'+temp);
                }
                temp++;
            }
        }
    }

    return sj;
}
//校验两个时间
function checkTwoDate(num){
    var start = $("#p"+num+"dateStart").val();
    var end = $("#p"+num+"dateEnd").val();
    if(start==''){
        alert("请选择开始时间");
        return ;
    }
    if(end==''){
        alert("请选择结束时间");
        return ;
    }
    if(start>end){
        alert('开始时间必须在结束时间之前');
        return;
    }
    var param = {
        start : start,
        end : end
    };

    return param;
}
function createTr(num){
    var str="<tr>";
    for(var i=0;i<num; i++){
        str+="<td></td>";
    }
    str+="</tr>";
    return str;
}
//------------------------------通用方法------------------------

//------------------------------特殊方法------------------------
//方法执行之前
Function.prototype.before=function ( func ){
    var __self=this;
    return function(){
        if(func.apply(this,arguments)===false){
            return false;
        }
        return __self.apply(this,arguments);
    }
}

//方法执行之后
Function.prototype.after=function ( func ){
    var __self=this;
    return function(){
        var ret = __self.apply(this,arguments);
        if(ret===false){
            return false;
        }
        func.apply(this,arguments);

        return ret;
    }
}
//测试执行时间
function GetSpemdTime(func){
    var start = new Date().getTime();//起始时间
    func();//执行待测函数
    var end = new Date().getTime();//接受时间
    return (end - start)+"ms";//返回函数执行需要时间
}


var spendTime=function( func,func_name){
    return func=(function(){
        var d;
        return func.before(function(){
            d=+new Date;
        }).after(function(){
            console.log(new Date-d+"--name:"+func_name);
        })
    });
}

//-------------------------------查询功能描述开始-----------------------
function queryGnms(type){

    $.ajax({
        url: baseUrl+'getApplictionInfo?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {type:type},
        success : function(data) {
            if(data!=undefined ){
                var desc = data['data']['desc'];
                if(desc!=undefined) {
                	$('#gnms').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+desc[0]['INFO']);
                }

                var type = data['data']['type'];
                if(type!=undefined ) {
                    var len = type.length;
                    var tr="<tr><th>数据源</th><th>支撑数据类</th><th>详情</th></tr>";
                    for (var a = 0; a < len; a++) {
                        var one =type[a];
                        if(a>6){
                            tr =tr+ "<tr id='gnsjl_"+a+"' style='display:none;'><td>"+one['DATA_WBJ']+"</td><td>"+one['DATA_NAME']+"</td><td >"+
                                "<a style='cursor: pointer;' href='/csdsc/resourceCategoryAct.jhtml?type=dataInfo&name="+encodeURI(one['DATA_NAME'])+"' target='_blank'>详细信息</a>" +
                                "</td></tr>";
                        }else{
                            tr =tr+ "<tr id='gnsjl_"+a+"'><td>"+one['DATA_WBJ']+"</td><td>"+one['DATA_NAME']+"</td><td >"+
                                "<a style='cursor: pointer;' href='/csdsc/resourceCategoryAct.jhtml?type=dataInfo&name="+encodeURI(one['DATA_NAME'])+"' target='_blank'>详细信息</a>" +
                                "</td></tr>";
                        }
                    }

                    $("#gnsjl").html(tr);
                    if(len>6){//添加分页
                        $("#applicationDescFy").html("<div id='appDesc'></div>");
                        kkpagerinitAppbyId('gnsjl',1,len,6);
                    }else {
                        $("#applicationDescFy").html("");
                    }
                }
                $("#appInfo").slideToggle("slow","swing");
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

//-------------------------------查询功能描述结束-----------------------

//------------------------------特殊方法------------------------
 ///------------------------------环评信息查询开始--------------------
function queryp123_HPXXCX(){
    var dwmc= $("#p123_dwmc").val();
    if(dwmc==''){
       alert('单位名称不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getHPXXItem?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {dwmc:dwmc},
        success : function(data) {
            if(data!=undefined && data['data']['HPXXCX'].length>0){
               var HPXXCX = data['data']['HPXXCX'];
                if(HPXXCX!=undefined){
                   var len = HPXXCX.length;
                    var sumTr =  Math.floor(len/3);
                    var tr="";
                    for(var i=0;i<sumTr;i++){
                        var one =HPXXCX[i*3];
                        var two =HPXXCX[i*3+1];
                        var three =HPXXCX[i*3+2];

                        tr =tr+ "<tr><td align='left' >"+
                            "<a style='cursor: pointer;' onclick=\"p123_show('"+checkUndefind(one['DWMC'],'-')+"')\">"+checkUndefind(one['DWMC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p123_show('"+checkUndefind(two['DWMC'],'-')+"')\">"+checkUndefind(two['DWMC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p123_show('"+checkUndefind(three['DWMC'],'-')+"')\">"+checkUndefind(three['DWMC'],'-')+"</a>"+
                            "</td></tr>";
                    }
                    if(3*sumTr<len){
                        tr =tr+ "<tr>";
                        for(var i=0;i<len-sumTr*3;i++){
                            var one =HPXXCX[sumTr*3+i]
                            tr=tr+"<td align='left'><a style='cursor: pointer;' onclick=\"p123_show('"+checkUndefind(one['DWMC'],'-')+"')\">"+checkUndefind(one['DWMC'],'-')+"</a>"+"</td>"
                        }
                        tr=tr+"</tr>";
                    }
                    $("#p123_item").html(tr);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

function p123_show(dwmc) {
    $.ajax({
        url: baseUrl+'getHPXXCX?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {dwmc:dwmc},
        success : function(data) {
            if(data!=undefined && data['data']['HPXXCX'].length>0){
                var HPXXCX = data['data']['HPXXCX'];
                var tbody = '';
                var len = HPXXCX.length;
                for (var a = 0; a < len; a++) {
                    if(a>8){
                        tbody = tbody + "<tr id='p123hpxxtr"+a+"' style='display:none;' >";
                    }else{
                        tbody = tbody + "<tr id='p123hpxxtr"+a+"' >";
                    }
                    var value = HPXXCX[a];
                    tbody = tbody + '  <td>'+checkUndefind(value['DWMC'])+'</td>  ';
                    tbody = tbody + '  <td>'+checkUndefind(value['XMMC'])+'</td>  ';
                    tbody = tbody + '  <td>'+checkUndefind(value['JSDD'])+'</td>  ';
                    tbody = tbody + '  <td>'+checkUndefind(value['SPSJ'])+'</td>  ';
                    tbody = tbody  +"</tr>";
                }
                $("#p123hpxxtable").html(tbody);
                if(len>9){//添加分页
                    $("#p123hpxxfy").html("<div id='kkpagerGis'></div>");
                    kkpagerinitbyId('p123hpxx',1,len,9);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
//------------------------------环评信息查询结束--------------------
function restP123Form(){
    $("#p123_dwmc").val('');
    $("#p123_dwmc1").val('');
    $("#p123_xmmc").val('');
    $("#p123_jsdd").val('');
    $("#p123_spsj").val('');
    $("#p123_item").html('');
}

 ///------------------------------食品安全宣传开始--------------------
function queryp124_SPAQXC(){
    var stmc= $("#p124_stmc").val();
    if(stmc==''){
       alert('社团名称不能为空'); 
        return;
     }
    $.ajax({
        url: baseUrl+'getSPAQXC?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {stmc:stmc},
        success : function(data) {
            if(data!=undefined && data['data']['SPAQXC'].length>0){
               var SPAQXC = data['data']['SPAQXC'];
                if(SPAQXC!=undefined){
                   var len = SPAQXC.length;
                    var sumTr =  Math.floor(len/3);
                    var tr="";
                    for(var i=0;i<sumTr;i++){
                        var one =SPAQXC[i*3];
                        var two =SPAQXC[i*3+1];
                        var three =SPAQXC[i*3+2];

                        tr =tr+ "<tr><td align='left' >"+
                            "<a style='cursor: pointer;' onclick=\"p124_show('"+checkUndefind(one['STMC'],'-')+"','"+checkUndefind(one['FZR'],'-')+"','"+checkUndefind(one['STDZ'],'-')+"','"+checkUndefind(one['LXDH'],'-')+"')\">"+checkUndefind(one['STMC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p124_show('"+checkUndefind(two['STMC'],'-')+"','"+checkUndefind(two['FZR'],'-')+"','"+checkUndefind(two['STDZ'],'-')+"','"+checkUndefind(two['LXDH'],'-')+"')\">"+checkUndefind(two['STMC'],'-')+"</a>"+"</td><td align='left'>"+
                            "<a style='cursor: pointer;' onclick=\"p124_show('"+checkUndefind(three['STMC'],'-')+"','"+checkUndefind(three['FZR'],'-')+"','"+checkUndefind(three['STDZ'],'-')+"','"+checkUndefind(three['LXDH'],'-')+"')\">"+checkUndefind(three['STMC'],'-')+"</a>"+
                            "</td></tr>";
                    }
                    if(3*sumTr<len){
                        tr =tr+ "<tr>";
                        for(var i=0;i<len-sumTr*3;i++){
                            var one =SPAQXC[sumTr*3+i]
                            tr=tr+"<td align='left'><a style='cursor: pointer;' onclick=\"p124_show('"+checkUndefind(one['STMC'],'-')+"','"+checkUndefind(one['FZR'],'-')+"','"+checkUndefind(one['STDZ'],'-')+"','"+checkUndefind(one['LXDH'],'-')+"')\">"+checkUndefind(one['STMC'],'-')+"</a>"+"</td>"
                        }
                        tr=tr+"</tr>";
                    }
                    $("#p124_item").html(tr);
                }
            }else{
                alert("没有查询到数据！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}

function p124_show(stmc,fzr,stdz,lxdh) {
    $("#p124_stmc1").val(stmc);
    $("#p124_fzr").val(fzr);
    $("#p124_stdz").val(stdz);
    $("#p124_lxdh").val(lxdh);
}
//------------------------------食品安全宣传结束--------------------
function restP124Form(){
    $("#p124_item").html('');
    $("#p124_stmc").val('');
    $("#p124_stmc1").val('');
    $("#p124_fzr").val('');
    $("#p124_stdz").val('');
    $("#p124_lxdh").val('');
}

//------------------------------应用使用次数统计开始--------------------
function useApplicationTimes(name){
    var date=new Date().Format("yyyy-MM-dd hh:mm:ss.S");
    var param ={rdpUserName: rdpUserName,
        rdpUserOrg: rdpUserOrgId,
        rdpUserOrgId: rdpUserOrg,
        rdploginName:rdploginName,
        useCount:1,
        useTime:date,
        applicationName:name};
    if(!rdpUserName || !rdpUserOrgId || !rdploginName){
        console.log("应用"+name+"使用次数统计失败！");
        return;
	}
    $.ajax({
        url: baseUrl+'addApplictionTimes?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : param,
        success : function(data) {
            if(data!=undefined && data['success']==true && data['data']['flag']==1){
                console.log("应用"+name+"使用次数统计成功！");
            }else{
                console.log("应用"+name+"使用次数统计失败！");
            }
        },
        error : function(response) {
            alert(response.statusText);
        },
        timeout:60000
    });
}
//------------------------------应用使用次数统计结束--------------------
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+" : this.getMonth()+1,         //月份
        "d+" : this.getDate(),          //日
        "h+" : this.getHours(),          //小时
        "m+" : this.getMinutes(),         //分
        "s+" : this.getSeconds(),         //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds()       //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
