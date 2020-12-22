var dataSrc = PROJECT_ROOT + "/app/http/dms/cleanMonitorHandler/getJobEchartsData";
var chartData;
var myChart;
var has_require = false;
var wbj_arr = [];
var in_arr = [];
var out_arr = [];
var ex_arr =[];
var err_arr = [];
var show_level = 1;
var title;
/**
 * 页面--转换操作跟踪情况列表展示
 */
$(function() {
		require.config( {
					paths : {
						'echarts' : '../../resource/echarts/echarts', //echarts.js的路径 
                        'echarts/chart/bar' : '../../resource/echarts/echarts',
                        'echarts/theme/macarons' : '../../resource/echarts/theme/macarons' //主题
					}
				});
		getPieData(1,dataSrc,'清洗过程执行情况统计图');
	});
function getPieData(param_type,url,param_title){
	title=param_title;
	show_level = param_type;
		   $.ajax({
           type: "GET",
           url: url,
           data: {rodom:Math.random()},
           dataType: "json",
           success : function(data) {
			var c = data.count;
            wbj_arr = [];
            in_arr = [];
            out_arr = [];
            ex_arr =[];
            err_arr = [];
			if (c != 0 && c != undefined) {
				chartData = data.list;
				for ( var i = 0; i < chartData.length; i++) {
					if(chartData[i].LINESINPUT !=0 ||chartData[i].LINESOUTPUT !=0||chartData[i].LINESREJECTED !=0||chartData[i].ERRORS !=0){
					    wbj_arr.push(chartData[i].GOVNAME);
					    in_arr.push(chartData[i].LINESINPUT);
					    out_arr.push(chartData[i].LINESOUTPUT);
					    ex_arr.push(chartData[i].LINESREJECTED);
					    err_arr.push(chartData[i].ERRORS);
					}
				}
				if(wbj_arr.length >0){
					$("#main").show();
				}else{
					alert("没有统计记录");
				    $("#main").hide();
				}
//				require( [ 'echarts','echarts/theme/macarons', 'echarts/chart/bar' ],
//				    //回调函数       
//						initMychart);
				//只需要加载一次
				if(!has_require){
				    require( [ 'echarts','echarts/theme/macarons', 'echarts/chart/bar' ],
				    //回调函数       
						initMychart);
				    has_require = true;
				//第二次直接setOption
				}else{
					DrawEChart();
				}
			} else {
				alert("没有统计记录");
				$("#main").hide();
			}
		}
       });
}

function initMychart(ec,theme){
	//图表渲染的容器对象           
	var chartContainer = document.getElementById("main");
	//加载图表            
	myChart = ec.init(chartContainer,theme);
	DrawEChart();
	var ecConfig = require('echarts/config');
    myChart.on(ecConfig.EVENT.CLICK, eConsole);
}
function DrawEChart() {
option = {
    title : {
        text: title
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['输入数','输出数','异常数','错误数']
    },
    toolbox: {
        show : true,
        feature : {
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : wbj_arr
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '（单位：千）'
        }
    ],
    series : [
        {
            name:'输入数',
            type:'bar',
            data:in_arr
        },
        {
            name:'输出数',
            type:'bar',
            data:out_arr
        },
        {
            name:'异常数',
            type:'bar',
            data:ex_arr
        },
        {
            name:'错误数',
            type:'bar',
            data:err_arr
        }
    ]
};                 
	myChart.setOption(option,true);

}

function selectShowData() {
    jQuery("#param_startdate").val(jQuery("#p5start").val());
	jQuery("#param_enddate").val(jQuery("#p5end").val());
    getPieData(1,PROJECT_ROOT + "/app/http/dms/cleanMonitorHandler/getJobEchartsData?startTime="+$("#param_startdate").val()+"&endTime="+$("#param_enddate").val(),'清洗过程执行情况统计图');
}
function resetQueryForm() {
	jQuery("#param_startdate").val('');
	jQuery("#p5start").val('');
	jQuery("#param_enddate").val('');
	jQuery("#p5end").val('');
}
function eConsole(param) {
	if(show_level ==1){
		if (confirm("确认下钻？")) {
			var wbj_mc = param.name;
			var temp_url = PROJECT_ROOT + "/app/http/dms/cleanMonitorHandler/getChildJobEchartsData?startTime="
			+$("#param_startdate").val()+"&endTime="+$("#param_enddate").val()+"&wbj_mc="+encodeURI(encodeURI(wbj_mc));
            getPieData(2,temp_url,wbj_mc+"-清洗过程执行情况统计图"); 
        }
	}else{
		if (confirm("确认上钻？")) {
		        getPieData(1,PROJECT_ROOT + "/app/http/dms/cleanMonitorHandler/getJobEchartsData?startTime="
		        	+$("#param_startdate").val()+"&endTime="+$("#param_enddate").val(),'清洗过程执行情况统计图');
		}
	}
}

 