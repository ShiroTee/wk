var REQUEST_URL_BASE = PROJECT_ROOT + "/app/http/dmp/";
var url = PROJECT_ROOT+"/app/http/dmp/recordHandler/getDataBarByDate?param_data=1";
var name_arr = [];
var data1_arr = [];
var data2_arr = [];
var title = '基础库数据统计柱状图';
var show_level = 1;
var param_rotate = 0;
function DrawEChart(ec) {
	//加载图表            
	var chartContainer = document.getElementById("main");
	var myChart = ec.init(chartContainer);
option = {
    title : {
        text: title
        //subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['入库记录数','入库数据项']
    },
    toolbox: {
        show : true,
        feature : {
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    grid : {'y2':100},
    xAxis : [
        {
            type : 'category',
            axisLabel:{'interval':0},
            axisLabel :{rotate:param_rotate},
            data : name_arr
        }
    ],
    yAxis : [
        {
        	name : '记录数（千条）',
            type : 'value'
        },
        {
        	name : '数据项（千个）',
            type : 'value'
        }
    ],
    series : [
        {
            name:'入库记录数',
            type:'bar',
            itemStyle:{normal: {color: '#FF6600'}},
            data:data1_arr
        },
        {
            name:'入库数据项',
            type:'bar',
            yAxisIndex:1,
            itemStyle:{normal: {color: '#04D215'}},
            data:data2_arr
        }
    ]
};                                     
    myChart.setOption(option);
    var ecConfig = require('echarts/config');
    myChart.on(ecConfig.EVENT.CLICK, eConsole);
	}
    $(function(){  
		//图表渲染的容器对象           
				require.config( {
					paths : {
						'echarts' : '../../resource/echarts/echarts', //echarts.js的路径    
						'echarts/chart/bar' : '../../resource/echarts/echarts'
					}
				});
				showData('','');
    });				
function showData(param_startdate,param_enddate) {
	       param_rotate = 0;
	       $("#main").show();
	       title = '基础库数据统计柱状图';
	       show_level = 1;
	       var last_url= url;
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
               name_arr = [];
               data1_arr = [];
               data2_arr = [];
			   for ( var k = 0; k < chartData.length; k++) {
				   name_arr.push(chartData[k].SHOW_NAME);
				   data1_arr.push(chartData[k].DATACOUNT);
				   data2_arr.push(chartData[k].ZDCOUNT);
			   }
				require( [ 'echarts', 'echarts/chart/bar' ],
				//回调函数       
						DrawEChart);
				}else{
					alert("没有统计记录"); 
					$("#main").hide();
				}
                    }
       });
}

function showDataByWbj(param_wbjjc) {
	       param_rotate = 35;
	       show_level = 2;
	       title = param_wbjjc+"-基础库数据统计柱状图";
	       var wbj_last_url= PROJECT_ROOT+"/app/http/dmp/recordHandler/getDataBarByDb?param_wbjjc="+encodeURI(encodeURI(param_wbjjc));
	       if(jQuery("#param_startdate").val() != ''){
	    	   wbj_last_url += "&param_startdate="+jQuery("#param_startdate").val();
	       }
	       if(jQuery("#param_enddate").val() != ''){
	    	   wbj_last_url += "&param_enddate="+jQuery("#param_enddate").val();
	       }
           $.ajax({
           type: "GET",
           url: wbj_last_url,
           data: {rodom:Math.random()},
           //contentType: "application/x-www-form-urlencoded; charset=utf-8", 
           dataType: "json",
           success: function(data){
			   var c = data.count ;
               if(c != 0 && c != undefined){
			   var chartData = data.list;
               name_arr = [];
               data1_arr = [];
               data2_arr = [];
			   for ( var k = 0; k < chartData.length; k++) {
				   name_arr.push(chartData[k].SHOW_NAME);
				   data1_arr.push(chartData[k].DATACOUNT);
				   data2_arr.push(chartData[k].ZDCOUNT);
			   }
				require( [ 'echarts', 'echarts/chart/bar' ],
				//回调函数       
						DrawEChart);
				}else{
					alert("没有统计记录"); 
				}
                    }
       });
}

function selectShowData() {
	jQuery("#param_startdate").val(jQuery("#p5start").val());
	jQuery("#param_enddate").val(jQuery("#p5end").val());
	showData(jQuery("#param_startdate").val(),jQuery("#param_enddate").val());
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
            showDataByWbj(param.name); 
        }
	}else{
		if (confirm("确认上钻？")) {
		    showData(jQuery("#param_startdate").val(),jQuery("#param_enddate").val());
		}
	}
}
