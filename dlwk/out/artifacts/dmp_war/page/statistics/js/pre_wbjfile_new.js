var url = PROJECT_ROOT+"/app/http/dmp/wbjFileInfoHandler/getDatasByDate?param_data=1";
var date_arr = [];
var xAxis_arr = [];
var records_arr1 = [];
var filesize_arr1 = [];
var records_arr2 = [];
var filesize_arr2 = [];
var records_arr3 = [];
var filesize_arr3 = [];
var records_arr4 = [];
var filesize_arr4 = [];
var records_arr5 = [];
var filesize_arr5 = [];
var records_arr6 = [];
var filesize_arr6 = [];
var records_arr7 = [];
var filesize_arr7 = [];
var records_arr8 = [];
var filesize_arr8 = [];
var records_arr9 = [];
var filesize_arr9 = [];
var records_arr10 = [];
var filesize_arr10 = [];
var records_arr11 = [];
var filesize_arr11 = [];
var records_arr12 = [];
var filesize_arr12 = [];
function DrawEChart(ec) {
		var chartContainer = document.getElementById("main");
	//加载图表            
	var myChart = ec.init(chartContainer);
option = {
    timeline:{
        data:date_arr,
        label : {
            formatter : function(s) {
                return s.slice(0, 7);
            }
        },
        autoPlay : true,
        playInterval : 1000
    },
    options:[
        {
            title : {
                'text':'委办局原始文件统计'
                //'subtext':'数据来自国家统计局'
            },
            tooltip : {'trigger':'axis'},
            legend : {
                x:'right',
                'data':['文件总数','文件总大小']
            },
            toolbox : {
                'show':true, 
                orient : 'vertical',
                x: 'right', 
                y: 'center',
                'feature':{
                    'magicType':{'show':true,'type':['line','bar','stack','tiled']},
                    'restore':{'show':true},
                    'saveAsImage':{'show':true}
                }
            },
            calculable : true,
            grid : {'y':80,'y2':140},
            xAxis : [{
                'type':'category',
                'axisLabel':{'interval':0},
                'data':xAxis_arr
            }],
            yAxis : [
                {
                    'type':'value',
                    'name':'文件总数（个）'
                },
                {
                    'type':'value',
                    'name':'文件总大小（M）'
                }
            ],
            series : [
                {
                    'name':'文件总数',
                    'type':'bar',
                    'markLine':{
                        symbol : ['arrow','none'],
                        symbolSize : [4, 2],
                        itemStyle : {
                            normal: {
                                lineStyle: {color:'orange'},
                                borderColor:'orange',
                                label:{
                                    position:'left',
                                    formatter:function(a,b,c){return Math.round(c)},
                                    textStyle:{color:'orange'}
                                }
                            }
                        },
                        'data':[{'type':'average','name':'平均值'}]
                    },
                    'data': records_arr1
                },
                {
                    'name':'文件总大小','yAxisIndex':1,'type':'bar',
                    'data': filesize_arr1
                }
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr2},
                {'data': filesize_arr2}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr3},
                {'data': filesize_arr3}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr4},
                {'data': filesize_arr4}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr5},
                {'data': filesize_arr5}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr6},
                {'data': filesize_arr6}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr7},
                {'data': filesize_arr7}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr8},
                {'data': filesize_arr8}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr9},
                {'data': filesize_arr9}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr10},
                {'data': filesize_arr10}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr11},
                {'data': filesize_arr11}
            ]
        },
        {
            title : {'text':'委办局原始文件统计'},
            series : [
                {'data': records_arr12},
                {'data': filesize_arr12}
            ]
        }
    ]
};
                                      
    myChart.setOption(option,true);
	}
    $(function(){
		//图表渲染的容器对象           
				require.config( {
					paths : {
						'echarts' : '../../resource/echarts/echarts', //echarts.js的路径      
						'echarts/chart/bar' : '../../resource/echarts/echarts'
					}
				});
				showData('');
    });

function showData(param_enddate) {
		   var last_url= url;
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
			   var month_data;
			   date_arr = [];
xAxis_arr = [];
records_arr1 = [];
filesize_arr1 = [];
records_arr2 = [];
filesize_arr2 = [];
records_arr3 = [];
filesize_arr3 = [];
records_arr4 = [];
filesize_arr4 = [];
records_arr5 = [];
filesize_arr5 = [];
records_arr6 = [];
filesize_arr6 = [];
records_arr7 = [];
filesize_arr7 = [];
records_arr8 = [];
filesize_arr8 = [];
records_arr9 = [];
filesize_arr9 = [];
records_arr10 = [];
filesize_arr10 = [];
records_arr11 = [];
filesize_arr11 = [];
records_arr12 = [];
filesize_arr12 = [];
			   for ( var k = 1; k <= chartData.length; k++) {
				   date_arr.push(chartData[k-1].param_month+"-01");
				   month_data = chartData[k-1].param_data;
				   if(k == 1){
					   for ( var j = 0; j < month_data.length; j++) {
                           if(j%5==0){
                               xAxis_arr.push(month_data[j].WBJJC);
                           }else if(j%5==1){
                               xAxis_arr.push('\n'+month_data[j].WBJJC);
                           }else if(j%5==2){
                               xAxis_arr.push('\n\n'+month_data[j].WBJJC);
                           }else if(j%5==3){
                               xAxis_arr.push('\n\n\n'+month_data[j].WBJJC);
                           } else if(j%5==4){
                               xAxis_arr.push('\n\n\n\n'+month_data[j].WBJJC);
                           }
					       records_arr1.push(month_data[j].RECORDS);
					       filesize_arr1.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 2){
					   for ( var j = 0; j < month_data.length; j++) {
					   records_arr2.push(month_data[j].RECORDS);
					   filesize_arr2.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 3){
					   for ( var j = 0; j < month_data.length; j++) {
					   records_arr3.push(month_data[j].RECORDS);
					   filesize_arr3.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 4){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr4.push(month_data[j].RECORDS);
					   filesize_arr4.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 5){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr5.push(month_data[j].RECORDS);
					   filesize_arr5.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 6){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr6.push(month_data[j].RECORDS);
					   filesize_arr6.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 7){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr7.push(month_data[j].RECORDS);
					   filesize_arr7.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 8){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr8.push(month_data[j].RECORDS);
					   filesize_arr8.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 9){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr9.push(month_data[j].RECORDS);
					   filesize_arr9.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 10){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr10.push(month_data[j].RECORDS);
					   filesize_arr10.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 11){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr11.push(month_data[j].RECORDS);
					   filesize_arr11.push(month_data[j].FILESIZECOUNT);
					   }
				   }else if(k == 12){
					    for ( var j = 0; j < month_data.length; j++) {
					   records_arr12.push(month_data[j].RECORDS);
					   filesize_arr12.push(month_data[j].FILESIZECOUNT);
					   }
				   }
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
	jQuery("#param_enddate").val(jQuery("#p5end").val());
	showData(jQuery("#param_enddate").val());
}

function resetQueryForm() {
	jQuery("#param_enddate").val('');
	jQuery("#p5end").val('');
}
