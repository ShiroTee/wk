var dataSrc = PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getEsbLogPieData";
var anchorSohw='100%';
var chartData;
var myChart;
var optionpie_bar;
var name_arr = [];
var value_arr = [];
var value_per_arr = [];
// 各种链接
var getLogDetail = 'getLogDetail';
/**
 * 页面--转换操作跟踪情况列表展示
 */
$(function() {
		require.config( {
					paths : {
						'echarts' : '../../resource/echarts/echarts', //echarts.js的路径 
                        'echarts/chart/bar' : '../../resource/echarts/echarts'         
					}
				});
		getPieData(dataSrc);
		
	//初始化下拉框
    $.ajax( {
	url : PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getTypeComBoxForJ",
	type : "GET",
	data: {rodom:Math.random()},
    dataType: "json",
	success : function(data) {
    	var selectData = data.list;
    	for ( var i = 0; i < selectData.length; i++) {
    		$("#ps5").get(0).options.add(new Option(selectData[i].TYPE_NAME,selectData[i].TYPE_ID)); 
    	}
	},
	error : function(text) {
	}
}); 
    
    	//初始化下拉框
    $.ajax( {
	url : PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getChannelComBoxForJ",
	type : "GET",
	data: {rodom:Math.random()},
    dataType: "json",
	success : function(data) {
    	var selectData = data.list;
    	for ( var i = 0; i < selectData.length; i++) {
    		$("#ps6").get(0).options.add(new Option(selectData[i].CHANNEL_NAME,selectData[i].CHANNEL_CODE)); 
    	}
	},
	error : function(text) {
	}
}); 

	});
function getPieData(url){
		   $.ajax({
           type: "GET",
           url: url,
           data: {rodom:Math.random()},
           dataType: "json",
           success : function(data) {
			var c = data.count;
			var tbody = "";
			name_arr  = [];
			value_arr = [];
			value_per_arr =[];
			if (c != 0 && c != undefined) {
				chartData = data.list;
				for ( var i = 0; i < chartData.length; i++) {
					name_arr.push(chartData[i].service_name+'');
					value_arr.push(chartData[i].SERVICES_COUNT);
					value_per_arr.push(chartData[i].STATUSPER1);
				}
				require( [ 'echarts', 'echarts/chart/bar' ],
				    //回调函数       
						DrawEChart);
			} else {
				alert("没有统计记录");
				$("#main").hide();
			}
		}
       });
}
function DrawEChart(ec) {
	$("#main").show();
	//图表渲染的容器对象           
	var chartContainer = $("#main").get(0);
	//加载图表            
	myChart = ec.init(chartContainer);
	optionpie_bar = {
		title : {
			text : 'ESB服务统计',
			//subtext : '--按照月份',
			x : 'left'

		},
		tooltip : {
			trigger : 'axis'
		},
		calculable : false,
		legend : {
                x:'center',
                'data':['调用次数','成功率（%）']
            },
        toolbox : {
                'show':true, 
                //orient : 'vertical',
                x: 'right', 
                //y: 'center',
                'feature':{
                    'magicType':{'show':true,'type':['line','bar']},
                    'restore':{'show':true},
                    'saveAsImage':{'show':true}
                }
            },
		xAxis : [ {
			type : 'category',
			data : name_arr
		} ],
		yAxis : [ 
			{
			    type : 'value',
			    'name':'调用次数'
			} ,
			{
			    type : 'value',
			    'max':100,
			    'name':'成功率（%）'
			} 
			],
		series : [ {

			name : '调用次数',
			yAxisIndex : 0,
			type : 'bar',
			data : value_arr,
			center : [ '10%', '15%' ],
			itemStyle : {
				normal : {
					label : {
						show : true,
						position : 'inside',
						formatter : function(a, b, c, d) {
							return c + ""
						},
						textStyle : {
							color : '#000'
						}
					},
					//color :'#FF9E01',//,'#FF9E01'],
					labelLine : {
						show : false
					}
				}
			}
		},
		{

			name : '成功率（%）',
			yAxisIndex : 1,
			type : 'bar',
			data : value_per_arr,
			center : [ '10%', '15%' ],
			itemStyle : {
				normal : {
					label : {
						show : true,
						position : 'inside',
						formatter : function(a, b, c, d) {
							return c + ""
						},
						textStyle : {
							color : '#000'
						}
					},
					//color :'#FF9E01',//,'#FF9E01'],
					labelLine : {
						show : false
					}
				}
			}
		}]
	};
	myChart.setOption(optionpie_bar);
} 

function selectShowData() {
        getPieData(PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getEsbLogPieData?typeMax="
        	+$("#ps5").val()+"&channel="+$("#ps6").val()
        	+"&startTime="+$("#p5start").val()+"&endTime="+$("#p5end").val());

}
function resetQueryForm() {
	$("#p5start").val('');
	$("#p5end").val('');
	$("select").val(''); 
}


function randomColor(){
　　var colorStr=Math.floor(Math.random()*0xFFFFFF).toString(16).toUpperCase();
　　return "#"+"000000".substring(0,6-colorStr)+colorStr;
}
 
/**
 * 十六进制颜色转换为RGB颜色
 * @param color 要转换的十六进制颜色
 * @return RGB颜色
 */
function colorHexToRGB(color){
　　color=color.toUpperCase();
　　var regexpHex=/^#[0-9a-fA-F]{3,6}$/;//Hex
　　if(regexpHex.test(color)){
　　　　var hexArray=new Array();
　　　　var count=1;
　　　　for(var i=1;i<=3;i++){
　　　　　　if(color.length-2*i>3-i){
　　　　　　　　hexArray.push(Number("0x"+color.substring(count,count+2)));
　　　　　　　　count+=2;
　　　　　　}else{
　　　　　　　　hexArray.push(Number("0x"+color.charAt(count)+color.charAt(count)));
　　　　　　　　count+=1;
　　　　　　}
　　　　}
　　　　return "RGB("+hexArray.join(",")+")";
　　}else{
　　　　return color;
　　}
}

 