var dataSrc = PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getEsbChannelPieData";
var chartData;
var myChart;
var pie_categories = [];
var pie_datas = [];
var has_require = false;
/**
 * 页面--转换操作跟踪情况列表展示
 */
$(function() {
		require.config( {
					paths : {
						'echarts' : '../../resource/echarts/echarts', //echarts.js的路径 
                        'echarts/chart/pie' : '../../resource/echarts/echarts'         
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
            pie_categories = [];
            pie_datas = [];
			if (c != 0 && c != undefined) {
				chartData = data.list;
				for ( var i = 0; i < chartData.length; i++) {
					pie_categories.push(chartData[i].channel_name);
					pie_datas.push( {
						name : chartData[i].channel_name,
						value : chartData[i].SERVICES_COUNT
					});
				}
				//只需要加载一次
				if(!has_require){
				    require( [ 'echarts', 'echarts/chart/pie' ],
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

function initMychart(ec){
	//图表渲染的容器对象           
	var chartContainer = document.getElementById("main");
	//加载图表            
	myChart = ec.init(chartContainer);
	DrawEChart();
}
function DrawEChart() {
	optionpie_category = {
		title : {
			text : '服务各渠道调用次数分布图',
			x : 'center'
		},
		legend : {
			orient : 'vertical',
			x : 'left',
			data : pie_categories
		},
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		calculable : false,
		series : [ {
			name : '调用渠道',
			type : 'pie',
			selectedMode : 'single',
			radius : '55%',
			center : [ '50%', '45%' ],
			itemStyle : {
				normal : {
					label : {
						show : true,
						position : 'outer',
						formatter : function(a, b, c, d) {
							return b + "(" + c + ")"
						},
						textStyle : {
							color : '#000'	
						}
					},
					labelLine : {
						show : true
					}
				}
			},
			selectedOffset : 10,
			data : pie_datas
		} ]
	};
	myChart.setOption(optionpie_category,true);
}

function selectShowData() {
        getPieData(PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getEsbChannelPieData?typeMax="
        	+$("#ps5").val()+"&service="+$("#ps6").val()
        	+"&startTime="+$("#p5start").val()+"&endTime="+$("#p5end").val());
}
function resetQueryForm() {
	$("#p5start").val('');
	$("#p5end").val('');
	$("select").val(''); 
}

function changeServiceList(){
	//初始化下拉框
	var pid = $("#ps5").val();
    $.ajax( {
	url : PROJECT_ROOT + "/app/http/dms/esbLogTypeHandler/getServiceComBoxForJ?pid="+pid,
	type : "GET",
	data: {rodom:Math.random()},
    dataType: "json",
	success : function(data) {
		$("#ps6").empty();
		$("#ps6").get(0).options.add(new Option('全部',''));
    	var selectData = data.list;
    	for ( var i = 0; i < selectData.length; i++) {
    		$("#ps6").get(0).options.add(new Option(selectData[i].SERVICE_NAME,selectData[i].SERVICE_ID)); 
    	}
	},
	error : function(text) {
	}
}); 
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

 