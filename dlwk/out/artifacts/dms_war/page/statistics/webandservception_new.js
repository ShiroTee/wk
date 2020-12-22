var dataSrc = PROJECT_ROOT + "/app/http/dms/alarmInfoHandler/getAlarmListByType";
var chartData;
var myChart;
var has_require = false;
var type_arr = [];
var monitor_arr = [];
var database_arr = [];
var ram_arr = [];
var disk_arr =[];
var cpu_arr = [];
var network_arr =[];
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
		getPieData(dataSrc);
	});
function getPieData(url){
		   $.ajax({
           type: "GET",
           url: url,
           data: {rodom:Math.random()},
           dataType: "json",
           success : function(data) {
			var c = data.count;
            type_arr = [];
            monitor_arr = [];
            database_arr = [];
            ram_arr = [];
            disk_arr =[];
            cpu_arr = [];
            network_arr =[];
			if (c != 0 && c != undefined) {
				chartData = data.list;
				var date_list;
				for ( var i = 0; i < chartData.length; i++) {
					type_arr.push(chartData[i].type_name);
					date_list = chartData[i].data_list;
					for ( var j = 0; j < date_list.length; j++) {
						if(chartData[i].type_name == '数据库告警'){
							monitor_arr.push(date_list[j].NAME);
							database_arr.push(date_list[j].SUM_COUNT);
						}else if(chartData[i].type_name == '内存告警'){
							ram_arr.push(date_list[j].SUM_COUNT);
						}else if(chartData[i].type_name == '磁盘告警'){
							disk_arr.push(date_list[j].SUM_COUNT);
						}else if(chartData[i].type_name == 'CPU告警'){
							cpu_arr.push(date_list[j].SUM_COUNT);
						}else if(chartData[i].type_name == '网络告警'){
							network_arr.push(date_list[j].SUM_COUNT);
						}
					}
				}
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
}
function DrawEChart() {
option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:type_arr
    },
    toolbox: {
        show : true,
        feature : {
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisLabel :{rotate:-35,margin:15},
            data : monitor_arr
        }
    ],
    grid : {'x':100,'y2':40},
    series : [
        {
            name:'数据库告警',
            type:'bar',
            stack: '总次数',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:database_arr
        },
        {
            name:'内存告警',
            type:'bar',
            stack: '总次数',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:ram_arr
        },
        {
            name:'磁盘告警',
            type:'bar',
            stack: '总次数',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:disk_arr
        },
        {
            name:'CPU告警',
            type:'bar',
            stack: '总次数',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:cpu_arr
        },
        {
            name:'网络告警',
            type:'bar',
            stack: '总次数',
            itemStyle : { normal: {label : {show: true, position: 'insideRight'}}},
            data:network_arr
        }
    ]
};
	myChart.setOption(option,true);
}

function selectShowData() {
        getPieData(PROJECT_ROOT + "/app/http/dms/alarmInfoHandler/getAlarmListByType?startTime="+$("#p5start").val()+"&endTime="+$("#p5end").val());
}
function resetQueryForm() {
	$("#p5start").val('');
	$("#p5end").val('');
}

 