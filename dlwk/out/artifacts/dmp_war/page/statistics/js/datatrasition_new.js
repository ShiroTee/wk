var REQUEST_URL_BASE = PROJECT_ROOT + "/app/http/dmp/";
var url = PROJECT_ROOT+"/app/http/dmp/transDataManHandler/getDataBarByDate?param_data=1";
var wbj_arr = [];
var data_success_arr = [];
var data_failed_arr = [];
var show_level = 1;
var title;
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
        data:['转换成功','转换失败']
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
    grid : {'y2':100},
    xAxis : [
        {
            type : 'category',
            axisLabel:{'interval':0,margin:20},
            data : wbj_arr
        }
    ],
    yAxis : [
        {
        	name : '数据量（千条）',
            type : 'value'
        }
    ],
    series : [
        {
            name:'转换成功',
            type:'bar',
            itemStyle:{normal: {color: '#FF6600'}},
            data:data_success_arr
        },
        {
            name:'转换失败',
            type:'bar',
            itemStyle:{normal: {color: '#04D215'}},
            data:data_failed_arr
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
						'echarts/chart/bar': '../../resource/echarts/echarts'
					}
				});
				showData('','');
    });		
function showData(param_startdate,param_enddate) {
	       title = '数据转换统计柱状图';
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
               wbj_arr = [];
               data_success_arr = [];
               data_failed_arr = [];
			   for ( var k = 0; k < chartData.length; k++) {
                   if(k%5==0){
                       wbj_arr.push(chartData[k].WBJJC);
                   }else if(k%5==1){
                       wbj_arr.push('\n'+chartData[k].WBJJC);
                   }else if(k%5==2){
                       wbj_arr.push('\n\n'+chartData[k].WBJJC);
                   }else if(k%5==3){
                       wbj_arr.push('\n\n\n'+chartData[k].WBJJC);
                   } else if(k%5==4){
                       wbj_arr.push('\n\n\n\n'+chartData[k].WBJJC);
                   }

				   data_success_arr.push(chartData[k].SUCCESS);
				   data_failed_arr.push(chartData[k].FAILED);
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

function showDataByWbj(param_wbjjc) {
	       param_wbjjc = param_wbjjc.replace('\n','');
	       show_level = 2;
	       title = param_wbjjc+"-数据转换统计柱状图";
	       var wbj_last_url= PROJECT_ROOT+"/app/http/dmp/transDataManHandler/getDataBarByWbj?param_wbjjc="+encodeURI(encodeURI(param_wbjjc));
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
           dataType: "json",
           success: function(data){
			   var c = data.count ;
               if(c != 0 && c != undefined){
			   var chartData = data.list;
               wbj_arr = [];
               data_success_arr = [];
               data_failed_arr = [];
			   for ( var k = 0; k < chartData.length; k++) {
				   wbj_arr.push(chartData[k].BHZMC);
				   data_success_arr.push(chartData[k].SUCCESS);
				   data_failed_arr.push(chartData[k].FAILED);
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
