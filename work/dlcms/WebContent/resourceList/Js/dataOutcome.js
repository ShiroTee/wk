
$(document).ready(function () {
    //getDataUpdateList(pageNo_init, pageSize_init);
    
	var myDate = new Date();
	var end_date = formatDate2(myDate);
	$("#start_date").val("2014-01-01");
	$("#end_date").val(end_date);

    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day= myDate.getDate();
    var monthly="";
    if(month==1 && day<6){
        monthly = year*1-1+"-11";
    }else if(month==1 && day>=6){
        monthly = year*1-1+"-12";
    }else if(month==2 && day<6){
        monthly = year*1-1+"-12";
    }else if(month>=2 && day>=6){
        monthly = year+"-"+(month*1-1);
    }else if(month>2 && day<6){
        monthly = year+"-"+(month*1-2);
    }

    $("#monthly_month").attr("realvalue",monthly);
    $("#monthly_month").val(monthly);

    var yearly="";
    if(month==1 && day<6){
        yearly=year*1-2;
    }else {
        yearly=year*1-1;
    }

    $('#annual_year').attr("realvalue",yearly);
    $('#annual_year').val(yearly);

    initDataOrder();
});
//id；表格的id
function kkpagerGisinitbyId(pagerid,tableid,pno,totalRecords,limit){
    $("#"+pagerid).addClass("kkpager");
    $("#"+pagerid).show();
    var total=parseInt((totalRecords-1)/limit)+1;
    kkpagerGis.pagetableid = tableid;
    kkpagerGis.pagerid=pagerid;
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
//id；表格的id
function kkpagerGis1initbyId(pagerid,tableid,pno,totalRecords,limit){
    $("#"+pagerid).addClass("kkpager");
    $("#"+pagerid).show();
    var total=parseInt((totalRecords-1)/limit)+1;
    kkpagerGis1.pagetableid = tableid;
    kkpagerGis1.pagerid=pagerid;
    kkpagerGis1.total=total;
    kkpagerGis1.totalRecords=totalRecords;
    kkpagerGis1.pagelimit = limit;
    //生成分页控件
    kkpagerGis1.generPageHtml({
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
//id；表格的id
function kkpagerGis2initbyId(pagerid,tableid,pno,totalRecords,limit){
    $("#"+pagerid).addClass("kkpager");
    $("#"+pagerid).show();
    var total=parseInt((totalRecords-1)/limit)+1;
    kkpagerGis2.pagetableid =tableid;
    kkpagerGis2.pagerid=pagerid;
    kkpagerGis2.total=total;
    kkpagerGis2.totalRecords=totalRecords;
    kkpagerGis2.pagelimit = limit;
    //生成分页控件
    kkpagerGis2.generPageHtml({
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
//----------------------------------------------数据月报开始--------------------------------------------------
function monthlyReport() {
    hideall();
    $("#monthly").show();

    //var time = $("#monthly_month").attr("realvalue").split("-");
    var time = $('#monthly_month').val().split("-");
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day =myDate.getDate();
    if(time==undefined){
        alert("请输入查询时间！");
        return;
    }
    if(year<time[0]){
        alert(time[0]+"年"+time[1]+"月数据还没生成");
        return;
    }
    if(day<5 && (month*1-1)==time[1]){
        alert(time[0]+"年"+time[1]+"月数据还没生成");
        return;
    }
    if(year==time[0] && month==time[1]){
        alert(time[0]+"年"+time[1]+"月数据还没生成");
        return;
    }
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getMonthlyReport",
        dataType: 'jsonp',
        jsonp: "jsonpcallback",
        data: {year: time[0], month: time[1]},
        success: function (data) {
            if (data.success) {
                fillMonthlyReport(data.data,time[0],time[1]);
            }
        },
        error: function (response) {
            console.error(response);
        },
        timeout: 12000
    });
}
function fillMonthlyReport(data,year,month) {
    $("#monthlySubmitDatafy").show();
    $("#monthlySubmitData").show();
    $("#monthlyNotSubmitData").show();
    $("#monthlyApplicationTimes").show();
    $("#monthlyreportTime").show();
    $("#monthlyreportHead").show();
    if(data!=null){

        var gxsj=data['gxsj'];
        var mygxsj=data['mygxsj'];
        var yy=data['yy'];
        if(mygxsj==null && gxsj==null && yy==null){
            alert("没有查到相应数据");
            return;
        }
        $("#monthlySubmitDatafy").empty();
        $("#monthlySubmitData").empty();
        $("#monthlyNotSubmitData").empty();
        $("#monthlyApplicationTimes").empty();
        $("#monthlyreportTime").empty();
        $("#monthlyreportHead").empty();
        var len=gxsj.length;
        var tbody = '';
        for (var a = 0; a < len; a++) {
            if(a>8){
                tbody = tbody + "<tr id='monthlygxsjtr"+a+"' style='display:none;' >";
            }else{
                tbody = tbody + "<tr id='monthlygxsjtr"+a+"' >";
            }
            var value = gxsj[a];
            tbody = tbody + '  <td>'+checkUndefind(value['WBJ'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['SJL'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['GXSJL'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['TJRQQ'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['TJRQZ'])+'</td>  ';
            tbody = tbody  +"</tr>";
        }
        $("#monthlySubmitData").html(tbody);
        //$("#monthlySubmitData").innerHTML = tbody;

        if(len>9){//添加分页
            kkpagerGisinitbyId('monthlySubmitDatafy','monthlygxsj',1,len,9);
        }

        var len=mygxsj.length;
        var tbody = '';
        for (var a = 0; a < len; a++) {
            if(a>8){
                tbody = tbody + "<tr id='monthlymygxsjtr"+a+"' style='display:none;' >";
            }else{
                tbody = tbody + "<tr id='monthlymygxsjtr"+a+"' >";
            }
            var value = mygxsj[a];
            tbody = tbody + '  <td>'+checkUndefind(value['WBJ'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['SJL'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['TJRQQ'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['TJRQZ'])+'</td>  ';
            tbody = tbody  +"</tr>";
        }
        $("#monthlyNotSubmitData").html(tbody);
        //$("#monthlyNotSubmitData").innerHTML = tbody;
        if(len>9){//添加分页
            kkpagerGis1initbyId('monthlyNotSubmitDatafy','monthlymygxsj',1,len,9);
        }
        var len=yy.length;
        var tbody = '';
        for (var a = 0; a < len; a++) {
            if(a>8){
                tbody = tbody + "<tr id='monthyytr"+a+"' style='display:none;' >";
            }else{
                tbody = tbody + "<tr id='monthyytr"+a+"' >";
            }
            var value = yy[a];
            tbody = tbody + '  <td>'+checkUndefind(value['APPLICATIONNAME'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['USERORG'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['SUM'])+'</td>  ';
            tbody = tbody  +"</tr>";
        }
        $("#monthlyApplicationTimes").html(tbody);
        if(len>9){//添加分页
            kkpagerGis2initbyId('monthlyApplicationTimesfy','monthyy',1,len,9);
        }
        var fbsj = "发布时间："+year+"年"+(month*1+1)+"月6日";
        if(month*1>11){
            fbsj = "发布时间："+(year*1)+1+"年1月6日";
        }
        //$("#monthlyreportTime").innerHTML = fbsj;
        //$("#monthlyreportHead").innerHTML = year+"年"+month+"月的数据月报";

        $("#monthlyreportTime").html(fbsj);
        $("#monthlyreportHead").html(year+"年"+month+"月的数据月报");
            var height= $(".warp_right").height();
            $(".warp_left").height(height-110);
    }
}
//----------------------------------------------数据月报结束--------------------------------------------------
//----------------------------------------------数据年报开始--------------------------------------------------
function annualReport() {
    hideall();
    //----显示年报----
    $("#annual").show();

    //var year = $('#annual_year').attr("realvalue").split("-")[0];
    var year = $('#annual_year').val();
    var myDate = new Date();
    var year2 = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day=myDate.getDate();
    if($('#annual_year').attr("realvalue")==undefined){
        alert("请输入查询时间！");
        return;
    }
    if(year2<=year){
        alert(year+"年数据还没生成");
        return;
    }else{
        if(month==1 && day<6){
            alert("数据还没生成(在每年的1月6号生成)");
            return;
        }
    }
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getAnnualReport",
        dataType: 'jsonp',
        jsonp: "jsonpcallback",
        data: {year: year},
        success: function (data) {
            if (data.success) {
                fillAnnualReport(data.data, year);
            }
        },
        error: function (response) {
            console.error(response);
        },
        timeout: 12000
    });
}
function fillAnnualReport(data, year) {

    $("#annualApplicationTimes").show();
    $("#annualSubmitData").show();
    $("#annualreportTime").show();
    $("#annualreportHead").show();
    if(data!=null ){

        var gxsj=data['gxsj'];
        var all=data['all'];
        var yy=data['yy'];
        if(all==null || all.length==0){
            alert("没有查到相应数据");
            return;
        }
        $("#annualreportTime").empty();
        $("#annualreportHead").empty();
        var len=gxsj.length;
        var tbody = '';
        for (var a = 0; a < len; a++) {
            if(a>8){
                tbody = tbody + "<tr id='annualgxsjtr"+a+"' style='display:none;' >";
            }else{
                tbody = tbody + "<tr id='annualgxsjtr"+a+"' >";
            }
            var value = gxsj[a];
            tbody = tbody + '  <td>'+(a+1)+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['WBJ'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['SJL'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['GXSL'])+'</td>  ';
            tbody = tbody  +"</tr>";
        }
        $("#annualSubmitData").html(tbody);
        //$("#annualSubmitData").innerHTML =tbody;
        if(len>9){//添加分页
            kkpagerGisinitbyId('annualSubmitDatafy','annualgxsj',1,len,9);
        }
        var len=all.length;
        if(len>=1){
            var tjqrq =all[0]['TJRQQ'].split('-');
            var tjqrz =all[0]['TJRQZ'].split('-');
            $("#tjrqq").html(tjqrq[0]+"年"+tjqrq[1]+"月"+tjqrq[2]+"日");
            $("#tjrqz").html(tjqrz[0]+"年"+tjqrz[1]+"月"+tjqrz[2]+"日");
            $("#wbjs").html(all[0]['WBJS']);
            $("#rkgxsjlb").html(all[0]['RKKGXSJLBS']);
            $("#rkgxsjl").html(all[0]['RKKGXSJL']);
            $("#rksjl").html(all[0]['RKKSJL']);
            $("#frgxsjlb").html(all[0]['FRKGXSJLBS']);
            $("#frgxsjl").html(all[0]['FRKGXSJL']);
            $("#frsjl").html(all[0]['FRKSJL']);
            $("#zxgxsjlb").html(all[0]['ZXGXSJLBS']);
            $("#zxgxsjl").html(all[0]['ZXKGXSJL']);
            $("#zxsjl").html(all[0]['ZXKSJL']);
            $("#hgjjgxsjlb").html(all[0]['HGJJKGXSJLBS']);
            $("#hgjjgxsjl").html(all[0]['HGJJKGXSJL']);
            $("#hgjjsjl").html(all[0]['HGJJKSJL']);
        }
        var len=yy.length;
        var tbody = '';
        for (var a = 0; a < len; a++) {
            if(a>8){
                tbody = tbody + "<tr id='annualyytr"+a+"' style='display:none;' >";
            }else{
                tbody = tbody + "<tr id='annualyytr"+a+"' >";
            }
            var value = yy[a];
            tbody = tbody + '  <td>'+(a+1)+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['APPLICATIONNAME'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['USERORG'])+'</td>  ';
            tbody = tbody + '  <td>'+checkUndefind(value['SUM'])+'</td>  ';
            tbody = tbody  +"</tr>";
        }
        $("#annualApplicationTimes").html(tbody);
       // $("#annualApplicationTimes").innerHTML =tbody;
        if(len>9){//添加分页
            kkpagerGis1initbyId('annualApplicationTimesfy','annualyy',1,len,9);
        }
        //$("#annualreportTime").innerHTML ="发布时间："+(year*1+1)+"年1月6日";
        //$("#annualreportHead").innerHTML =year+"年的数据年报";
        $("#annualreportTime").html("发布时间："+(year*1+1)+"年1月6日");
        $("#annualreportHead").html(year+"年的数据年报");

        var height= $(".warp_right").height();
        $(".warp_left").height(height-110);
    }
}
//----------------------------------------------数据年报结束--------------------------------------------------
//---------------------------------------数据排名开始-----------------------------------------------
function initDataOrder() {
    hideall();
    $("#order").show();
    $(".sjcg_cx_box").show();
	var requestUrl = getGrURL() + "dataOutComeHandler/getOlapWbjData";
    var type = $("#lx_type").val();
    if(type=="1"){
        $("#submitTimes").show();
        $("#applicationTimes").hide();
    }else {
        $("#submitTimes").hide();
        $("#applicationTimes").show();
    }
	var start = $("#start_date").val();
	var end = $("#end_date").val();
	
	var param = {
		type : type,
		start : start,
		end : end
	};
    var myObj = document.getElementById('timesCatche');
    $.data(myObj, 'param', param);
	$.ajax({
	    url: requestUrl,
	    dataType : 'jsonp',
	    jsonp : "jsonpcallback",
	    data : param,
	    success : function(data) {
	    	showDataOrder(data,type);
	    },
	    error : function(response) {
	      alert(response);
	    },
	    timeout:6000
	  });
}

function exportData(){
    var myObj = document.getElementById('timesCatche');
    var param = $.data(myObj, 'param');
    var requestUrl = getGrURL() + "dataOutComeHandler/getOlapWbjDataExport";
    $.ajax({
        url: requestUrl,
        data:param,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        success : function(data) {
            if(data.data.path!='' && data.data.path!=undefined){
                window.open(getGrURL().split('/service/api')[0]+data.data.path,'_blank');
            }else{
                alert("下载文件出错，请重新下载！");
            }
        },
        error : function(response) {
            alert(response);
        },
        timeout:6000
    });

}

function showDataOrder(data,type){
    if(data!=undefined && data.length>0){
        var d=data;
        var len = d.length;
        if(type==1){
            var tbody="";
            for (var a = 0; a < len; a++) {
                if(a>8){
                    tbody = tbody + "<tr id='submittr"+a+"' style='display:none;' >";
                }else{
                    tbody = tbody + "<tr id='submittr"+a+"' >";
                }
                var value = d[a];
                tbody = tbody + '  <td>'+(a+1)+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['ORG_NAME'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['DATA_TYPE'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['CIRCLE'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['BELONG_CIRCLE'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['SUBMIT_DATE'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['DATA_COUNT'])+'</td>  ';
                tbody = tbody  +"</tr>";
            }
            $("#submitTimesTbody").html(tbody);
            //$("#submitTimesTbody").innerHTML =tbody;
            if(len>9){//添加分页
                kkpagerGisinitbyId('submitTimesfy','submit',1,len,9);
            }
        }else{
            var tbody="";
            for (var a = 0; a < len; a++) {
                if(a>8){
                    tbody = tbody + "<tr id='applicationtr"+a+"' style='display:none;' >";
                }else{
                    tbody = tbody + "<tr id='applicationtr"+a+"' >";
                }
                var value = d[a];
                tbody = tbody + '  <td>'+(a+1)+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['APPLICATIONNAME'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['USERORG'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['SUM'])+'</td>  ';
                tbody = tbody + '  <td>'+checkUndefind(value['USETIME'])+'</td>  ';
                tbody = tbody  +"</tr>";
            }
            $("#applicationTimesTbody").html(tbody);
            //$("#applicationTimesTbody").innerHTML =tbody;
            if(len>9){//添加分页
                kkpagerGis1initbyId('applicationTimesfy','application',1,len,9);
            }
        }
        var height= $(".warp_right").height();
        $(".warp_left").height(height-110);
    }else{
        alert("没有查询到数据！");
    }


}
//---------------------------------------数据排名结束-----------------------------------------------
//---------------------------------------五大库数据量统计开始-----------------------------------------------
function initOlapWdkData() {
    hideall();
    var div=$("#bi");
    div.show();
    var requestUrl = getGrURL() + "dataOutComeHandler/getOlapWdkData";
    $.ajax({
        url: requestUrl,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        success : function(data) {
            $('<div id="main" style="height:500px;padding:10px; width:700px; margin:auto"></div>').appendTo(div).attr({'width': 760,'height': 510});
            showolapWdkData(data);
        },
        error : function(response) {
            alert(response);
        },
        timeout:6000
    });
}
function showolapWdkData(data){
    var QUS = new Array();
    var QD = new Array();
    var PRO = new Array();
    PRO[0] = '五大库数据量统计图';
    PRO[1] = '条';

    var QUN = {};
    QUN["name"] = '数量';
    QUN["type"] = 'bar';

    var QUNARR = new Array();

    for(var i=0; i < data.length;i++){
        QD[i] =  data[i].DBNAME;
        QUNARR[i] = data[i].NM;
    }
    QUN["data"] = QUNARR;
    QUS[0] = QUN;
    initBarChart(PRO,QD,QUS);
    var height= $(".warp_right").height();
    $(".warp_left").height(height-110);
}
//---------------------------------------五大库数据量统计结束-----------------------------------------------

/*
 * 数组去重
 */
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

function  formatDate2(value){
    return (new Date(value)).Format("yyyy-MM-dd");
}
Date.prototype.Format = function(fmt) { //author: meizz
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

//字段的值是否为undefined
function checkUndefind(value,replaceChar){
    if(replaceChar==undefined){
        replaceChar='-';
    }
    var re =  value==undefined?replaceChar:value;
    return re
}

//--菜单切换隐藏所有应用--
function hideall(){
//------数据年报----
    $("#annual").hide();
    $("#annualreportHead").hide();
    $("#annualreportTime").hide();
    $("#annualApplicationTimes").hide();
    $("#annualSubmitData").hide();
    $("#annualApplicationTimesfy").hide();
    $("#annualSubmitDatafy").hide();

    //------数据月报----
    $("#monthly").hide();
    $("#monthlyreportHead").hide();
    $("#monthlyreportTime").hide();
    $("#monthlySubmitData").hide();
    $("#monthlyApplicationTimes").hide();
    $("#monthlyNotSubmitData").hide();
    $("#monthlySubmitDatafy").hide();
    $("#monthlyApplicationTimesfy").hide();
    $("#monthlyNotSubmitDatafy").hide();

    //------数据排名----
    $("#order").hide();
    $(".sjcg_cx_box").hide();
    $("#submitTimesTbody").empty();
    $("#submitTimesfy").empty();
    $("#submitTimes").hide();
    $("#applicationTimesTbody").empty();
    $("#applicationTimesfy").empty();
    $("#applicationTimes").hide();

    //----五库数据排名---
    $("#bi").hide();

}