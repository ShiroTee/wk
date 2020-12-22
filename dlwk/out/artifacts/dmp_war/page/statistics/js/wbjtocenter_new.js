var REQUEST_URL_BASE = PROJECT_ROOT + "/app/http/dmp/";
var url = PROJECT_ROOT+"/app/http/dmp/olapWbjqzZxqzaHandler/getDataForEcharts?param_data=1";
var year_month_arr = [];
var supply_arr = [];
var accept_arr = [];
function DrawEChart(ec) {
	//加载图表            
	var chartContainer = document.getElementById("main");
	var myChart = ec.init(chartContainer);
option = {
    title : {
        text: '委办局前置与中心前置对账统计'
        //subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['委办局前置库提供数据总量','中心前置库入库总量']
    },
    toolbox: {
        show : true,
        feature : {
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : year_month_arr
        }
    ],
    yAxis : [
        {
            type : 'value',
            'name':'单位（千条）'
        }
    ],
    series : [
        {
            name:'委办局前置库提供数据总量',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'},color :'#FFA500'}},
            data:supply_arr
        },
        {
            name:'中心前置库入库总量',
            type:'line',
            smooth:true,
            itemStyle: {normal: {areaStyle: {type: 'default'},color :'#EE7AE9'}},
            data:accept_arr
        }
    ]
};                                       
    myChart.setOption(option);
    //加载委办局选项
    $.ajax( {
	url : REQUEST_URL_BASE + "dataConfigHandler/getRootDataForSelect",
	type : "GET",
	data: {rodom:Math.random()},
    dataType: "json",
	success : function(data) {
    	var selectData = data.list;
    	for ( var i = 0; i < selectData.length; i++) {
    		document.getElementById("ps5").options.add(new Option(selectData[i].wbjShortName,selectData[i].wbjCode)); 
    	}
	},
	error : function(text) {
	}
}); 
   
	}
    $(function(){
		//图表渲染的容器对象           
				require.config( {
					paths : {
						'echarts' : '../../resource/echarts/echarts', //echarts.js的路径
						//'echarts/chart/bar' : '../../resource/echarts/echarts', //echarts.js的路径     
						'echarts/chart/line' : '../../resource/echarts/echarts' //echarts.js的路径     
					}
				});
				showData('','','');
    });
function showData(param_wbj,param_startdate,param_enddate) {
	$("#main").show();
	       var last_url= url;
	       if(param_wbj != ''){
	    	   last_url += "&param_wbj="+param_wbj;
	       }
	       if(param_startdate != ''){
	    	   last_url += "&param_startdate="+param_startdate;
	       }
	       if(param_enddate != ''){
	    	   last_url += "&param_enddate="+param_enddate;
	       }
           $.ajax({
           type: "GET",
           url: last_url,
           data: {rodom:Math.random()},
           dataType: "json",
           success: function(data){
			   var c = data.count ;
               if(c != 0 && c != undefined){
			   var chartData = data.list;
			   year_month_arr = [];
               supply_arr = [];
               accept_arr = [];
			   for ( var k = 0; k < chartData.length; k++) {
				   year_month_arr.push(chartData[k].YEAR_MONTH);
				   if(chartData[k].SUPPLYCOUNT !='' && chartData[k].SUPPLYCOUNT != undefined){
				       supply_arr.push(chartData[k].SUPPLYCOUNT);
				   }else{
					   supply_arr.push('-');
				   }
				   if(chartData[k].ACCEPTCOUNT != '' && chartData[k].ACCEPTCOUNT != undefined){
				       accept_arr.push(chartData[k].ACCEPTCOUNT);
				   }else{
					   accept_arr.push('-');
				   }
			   }
				require( [ 'echarts', 'echarts/chart/line' ],
				//回调函数       
						DrawEChart);
				}else{
					alert("没有统计记录"); 
					$("#main").hide();
				}
                    }
       });
}

function selectShowData() {
	showData(jQuery("#ps5").val(),jQuery("#p5start").val(),jQuery("#p5end").val());
}

function resetQueryForm() {
	$("select").val(''); 
	jQuery("#p5start").val('');
	jQuery("#p5end").val('');
}
