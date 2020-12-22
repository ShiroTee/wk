var transferData ="";
var trabsferQueryConditon ={};

function initBarChart(PRO,QD,QU,index,depth){
	var myChart = echarts.init(document.getElementById('main')); 
	if(index=='jjsj' && depth==1 && $("#zdyradio02").is(':checked')){
		myChart.on('click', function (param) {
			var requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getJjsjCountGroupbyYear?zblx=" + QD[param.dataIndex];
			refuChar(requestUrl,index,depth+1);
		});	
	}else if(index == 'jjsj' && depth == 2){
		myChart.on('click', function (param) {
			var requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getJjsjCount?zblx=" + PRO[2] + "&zbnd=";
			refuChar(requestUrl,index,depth+1);
		});
	}
	
    var option = {
    		title: {text: PRO[0],x: 'center', y: 'top' }, 
            tooltip: {trigger: 'axis'},    
            legend: {show: true,x: 'right',y: 'top',data:  PRO[1]},
            /*toolbox: {
            	show: true,
            	feature: {  
                    mark: {show: true},    
                    dataZoom: {  
                        show: true,  
                        title: {dataZoom: '区域缩放',dataZoomReset: '区域缩放后退'}  
                    },   
                    dataView: {show: true, readOnly: true},    
                    magicType: {show: true, type: ['line', 'bar']},   
                    restore: {show: true}, 
                    saveAsImage: {show: true}  
                }  
            },  */
            calculable: false,   
            xAxis: [{show: true,type: 'category',data:QD,axisLabel:{rotate:-15}}],
            yAxis: [{show: true,type: 'value'}],
            series:QU
        }; 

   
    myChart.setOption(option);
}

//城镇农村居民人均收入支出
function initBarChart2(PRO,QD,QU){
	var myChart = echarts.init(document.getElementById('main')); 
	
		    var option = {
    		title: {text: PRO[0],x: 'center', y: 'top' }, 
            tooltip: {trigger: 'axis'},    
            legend: {show: true,x: 'center',y: 'bottom',data:  [PRO[1],PRO[2],PRO[3],PRO[4]]},
            /*toolbox: {
            	show: true,
            	feature: {  
                    mark: {show: true},    
                    dataZoom: {  
                        show: true,  
                        title: {dataZoom: '区域缩放',dataZoomReset: '区域缩放后退'}  
                    },   
                    dataView: {show: true, readOnly: true},    
                    magicType: {show: true, type: ['line', 'bar']},   
                    restore: {show: true}, 
                    saveAsImage: {show: true}  
                }  
            },  */
            calculable: false,   
            xAxis: [{show: true,type: 'category',data:QD,axisLabel:{rotate:-40}}],
            yAxis: [{show: true,type: 'value'}],
            series:QU
        }; 

   
    myChart.setOption(option);
}




//数据成果_数据排名_柱状图
function initDataOrderBarChart(name,PRO,QD,QU){
	var myChart = echarts.init(document.getElementById('main')); 
    var option = {
    		title: {text:name,x: 'center', y: 'top' }, 
            tooltip: {trigger: 'axis', 
            	     axisPointer : { type : 'shadow' },
	            	formatter:function(params,ticket,callback){
	            		var data = params;
	            		var res = '';
	            		var flag = true;
	            		for(var i=0; i < data.length;i++){
	            			if(data[i].value){
	            				if(flag){
	            					flag=false;
	            					res=data[i]['name']+'<br>'+data[i]['seriesName']+' : '+data[i]['value'];
	            				}else{
	            					res=res+'<br>'+data[i]['seriesName']+' : '+data[i]['value'];
	            				}
	            			}
	            		}
	            		
	            		 setTimeout(function (){
				                // 仅为了模拟异步回调
				                callback(ticket, res);
				            }, 500);
	            		 
	            		  return 'loading';
	            	}
            },    
            legend: {show: false,x: 'center',y: 'bottom',data: PRO},  
            grid: { left: '3%',right: '4%', bottom: '3%', containLabel: true },
            toolbox: {
            	show: true,
            	feature: {  
                    mark: {show: true},    
                    dataZoom: {  
                        show: true,  
                        title: {dataZoom: '区域缩放',dataZoomReset: '区域缩放后退'}  
                    },   
                    dataView: {show: true, readOnly: true},    
                    magicType: {show: true, type: ['line', 'bar']},   
                    restore: {show: true}, 
                    saveAsImage: {show: true}  
                }  
            },  
            calculable: false,   
            xAxis: [{show: true,type: 'category',data:QD}], 
            yAxis: [{show: true,type: 'value',splitArea: {show: true}}],               
            series:QU
        }; 

    myChart.setOption(option);
}


function initLineChart(PRO,QD,QU){
	var myChart = echarts.init(document.getElementById('main')); 
	
    var option = {
    		title: {text: PRO[0],x: 'center', y: 'top' }, 
            tooltip: {trigger: 'axis'},    
            legend: {show: true,x: 'center',y: 'bottom',data: [PRO[1],PRO[2],PRO[3]]},  
            toolbox: {
            	show: true,
            	feature: {  
                    mark: {show: true},    
                    dataZoom: {  
                        show: true,  
                        title: {dataZoom: '区域缩放',dataZoomReset: '区域缩放后退'}  
                    },   
                    dataView: {show: true, readOnly: true},    
                    magicType: {show: true, type: ['line', 'bar']},   
                    restore: {show: true}, 
                    saveAsImage: {show: true}  
                }  
            },  
            calculable: false,   
//          dataZoom:{orient:"horizontal",show:true,start:20,end:60},
            xAxis: [{show: true,type: 'category',data:QD,axisLabel:{rotate:-60}}],  
            yAxis: [{show: true,type: 'value'}],
            series:QU
        }; 
	
    myChart.setOption(option);
}

function initLineChart(PRO,QD,QU,index,depth){
	var myChart = echarts.init(document.getElementById('main')); 
	
	if(index==10 && depth==1 && $("#fl_select").val()=="0" ){
		myChart.on('click', function (param) {
			var requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getlkzdlgxx?type=" + QD[param.dataIndex];
			refuChar(requestUrl,index,depth+1);
		});	
	}
	
    var option = {
    		title: {text: PRO[0],x: 'center', y: 'top' }, 
            tooltip: {trigger: 'axis'},    
            legend: {show: true,x: 'right',y: 'top',data: [PRO[1],PRO[2],PRO[3]]},
            /*toolbox: {
            	show: true,
            	feature: {  
                    mark: {show: true},    
                    dataZoom: {  
                        show: true,  
                        title: {dataZoom: '区域缩放',dataZoomReset: '区域缩放后退'}  
                    },   
                    dataView: {show: true, readOnly: true},    
                    magicType: {show: true, type: ['line', 'bar']},   
                    restore: {show: true}, 
                    saveAsImage: {show: true}  
                }  
            },  */
            calculable: false,   
//          dataZoom:{orient:"horizontal",show:true,start:20,end:60},
            xAxis: [{show: true,type: 'category',data:QD,axisLabel:{rotate:-60}}],  
            yAxis: [{show: true,type: 'value'}],
            series:QU
        }; 
	
    myChart.setOption(option);
}

function initPieChart(PRO,QD,QU,index,depth){
    var myChart = echarts.init(document.getElementById('main'));

	if(index=='jjsj' && depth==3 && $("#zdyradio02").is(':checked')){
		myChart.on('click', function (param) {
			var requestUrl = biBaseUrl + "/service/api/csdsc/statisticChartHandler/getJjsjCount?zblx=" + QD[param.dataIndex] + "&zbnd=";
			refuChar(requestUrl,index,depth+1);
		});
	}

    var option = {
    		title : {text: PRO[0],x:'center'},
    		tooltip : {trigger: 'item',formatter: "{a}<br/>{b} : {c} ({d}%)"},
    		legend: {orient : 'vertical',x : 'left',data:QD},
    		toolbox: {
    			show : true,
    		    feature : {restore : {show: true}}
    		   },
    		
    		calculable : false,
    		series : [
    		           {
    		              name:'饼图实例',
    		              type:'pie',
    		              selectedMode:'single',
    		              radius : '55%',
    		              center: ['50%', '60%'],
    		              data:QU
    		            }
    		          ]
    };
    
    myChart.setOption(option); 
}


//人口图谱
function initLinkChart(PRO,QD,QU){
	var myChart = echarts.init(document.getElementById('main'));
    $("#mask").hide();
	option = {
	    tooltip : {
	    	trigger: 'item',
	    	formatter:function(params,ticket,callback){
                var res="";
		          if(params.name==PRO.name){
		        	  res=PRO.value;
		        	 return res;
		          } else{
		        	  var type = PRO.name;
		        	  var name =  PRO.value;
		        	  if(!isNaN(params.value)){
						  res = params['5']['table_desc'];
                          return res;
		     			 }else{
		     				 res="关系";
                          return res;
		     			 }
		            }
				},
				padding:2,
				borderRadius: 2,
				backgroundColor:'#6DB2F5'
			
	    },
	    toolbox: {show : true,feature:{restore:{show:true}},  
	    		  magicType: {show: true, type: ['force', 'chord']},
	    		  saveAsImage : {show: true}},
	    legend:{x:'left',data:['人口库相关','法人库相关','征信库相关']},
	    series : [
	        {
	            type:'force',
	            name : "关系",
	            ribbonType: false,
	            categories : [{name:'人物'},{name: '人口库相关'},{name:'法人库相关'},{name:'征信库相关'}],
	            itemStyle: {
	                normal: {
	                    label: {show: true,textStyle: {color: '#333'}},
	                    nodeStyle : {brushType:'both',borderColor:'rgba(255,215,0,0.4)',borderWidth:1},
	                    linkStyle: {
	                        type: 'curve',
                            color: '#0000FF'
	                    }
	                }
	            },
	            minRadius : 18,
	            maxRadius : 25,
	            gravity: 1.1,
	            scaling: 1.1,
	            draggable: true,
	            linkSymbol: 'arrow',
	            roam: 'move',
	            nodes:QU,
	            links:QD
	        }
	    ]
	};
	myChart.on('click', focus);
	//myChart.on('dblclick', dbact);
	myChart.setOption(option);
	function focus(param) {
	    var data = param.data;
	    var links = option.series[0].links;
	    var nodes = option.series[0].nodes;
	    if ( data.source !== undefined && data.target !== undefined ) { //点击的是边

	    } else { // 点击的是点
          $("#showConDeteil").empty();
          var firsttype = data.query_type;
          var firstvalue = data.query_value;
          var tablename = data.table_name;
		  var value = data.uuid;
          var title = data.table_desc;
          var obj = $("#p20Detail");
            $("#p20Populationfy").empty();
            obj.empty();
            $("#mask").css("height",520);
            $("#mask").css("width",784);
            $("#p20msg").html("<div id='p20msg2' style='position:absolute;height:520px;width:784px;z-index:200;'><div  style='height:520px;width:784px;top:250px;left:340px;position:absolute;z-index:200;color:#33ff00'><span style=' background-color: #FFF;'>数据加载中，请稍候</span></div></div>");
            $('#p20msg2').css({'left': $('#bi').offset().left,'top':$('#bi').offset().top});
            $('#mask').css({'left': $('#bi').offset().left,'top':$('#bi').offset().top});
            $("#mask").show();
            $("#p20msg2").show();
            $.ajax({
                url: encodeURI(globalInterfaceDomain+"/csdsc/statisticChartHandler/getRelationExpand?"+t),
                dataType : 'jsonp',
                data:{tablename:tablename,firsttype:firsttype,firstvalue:firstvalue,value:value},
                jsonp : "jsonpcallback",
                success : function(data) {
                    if(data != undefined && data.data != undefined && data.data != null){
                        transferData =data;
                        trabsferQueryConditon['firsttype'] =firsttype;
                        trabsferQueryConditon['firstvalue']=firstvalue;
                        trabsferQueryConditon['fathertable']=tablename;

                        $("#mask").hide();
                        $("#p20msg2").hide();
                        var index = layer.open({
                            type: 2,
                            title: title,
                            closeBtn: 1,
                            area:['1200px','660px'],
                            skin: 'layui-layer-nobg', //没有背景色
                            content:'/rktp/detail.html',
                            fix: false
                        });
                        layer.full(index);
                    }else{
                        $("#mask").hide();
                        $("#p20msg2").hide();
                        alert("没有查询到信息");
                    }
                },

                complete: function(){
                    $("#mask").hide();
                    $("#p20msg2").hide();
                },
                error : function(response) {
                    alert(response.statusText);
                },
                timeout:60000
            });
	    }
	}     
}

//仪表盘显示
/* 仪表盘显示
 * id: 页面控件的id
 * title：标题，string
 * name：所占比例的名称，string
 * scale: 所占比例，20,30
 */
function initDashBoard(id,scale,name,title) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:title,
                type:'gauge',
                startAngle: 180,   //开始角度, 有效输入范围：[-180,180]
                endAngle: 0,
                center : ['50%', '90%'],    // 默认全局居中
                radius : 95,           //半径，支持绝对值（px）和百分比，百分比计算min(width, height) / 2 * 75%,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 70 //半径的宽度
                    }
                },
                axisTick: {            // 坐标轴小标记
                    splitNumber: 10,   // 每份split细分多少段
                    length :12,        // 属性length控制线长
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    formatter: function(v){
                        switch (v+''){
                            case '10': return '低';
                            case '50': return '中';
                            case '90': return '高';
                            default: return '';
                        }
                    },
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 6,
                        fontWeight: 'bolder'
                    }
                },
                pointer: {
                    width:10,
                    length: '90%',
                    color: 'rgba(255, 20, 255, 0.8)'
                },
                title : {
                    show : true,
                    offsetCenter: [0, '-60%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 10
                    }
                },
                detail : {
                    show : true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 20,
                    height: 10,
                    offsetCenter: [0, -10],       // x, y，单位px
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 10
                    }
                },
                data:[{value: scale, name: name}]
            }
        ]
    };
    myChart.setOption(option);
}

/* 饼图
 * id: 页面控件的id
 * title：标题，string
 * dataTypes: 数据类别，string[]
 * datd: list<map<string,String>>展示的数据
 *             例子：[{value:335, name:'直接访问'}]
 */
function initPieCharts(id,title,dataTypes,data){
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        title : {text: title,x:'left'},
        legend: {orient : 'vertical',x : 'right',data:dataTypes},
        calculable : false,
        series : [
            {
                name:title,
                type:'pie',
                selectedMode:'single',
                itemStyle : {
                    normal : {
                        label : {
                            position : 'inner',
                            formatter : function (params) {
                                return (params.percent - 0).toFixed(0) + '%('+params.value+')';
                            }
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            formatter : "{b}\n{d}%({c})"
                        }
                    }
                },
                radius : ['0%', '90%'],
                center: ['50%', '60%'],
                data: data
            }
        ]
    };
    myChart.setOption(option);
}

/* 饼图
 * id: 页面控件的id
 * title：标题，string
 * dataTypes: 数据类别，string[]
 * datd: list<map<string,String>>展示的数据
 *             例子：[{value:335, name:'直接访问'}]
 */
function kzfxinitPieChart(id,title,dataTypes,data){
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        title : {text: title,x:'center'},
        legend: {orient : 'vertical',x : 'right',data:dataTypes},
        calculable : false,
        series : [
            {
                name:title,
                type:'pie',
                selectedMode:'single',
                itemStyle : {
                    normal : {
                        label : {
                            position : 'inner',
                            formatter : function (params) {
                                return  title+'\n'+(params.percent - 0).toFixed(0) + '%('+params.value+')';
                            }
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            formatter : "{b}"+title+"\n{d}%({c})"
                        }
                    }
                },
                radius : ['0%', '70%'],
                center: ['45%', '60%'],
                data: data
            }
        ]
    };
    myChart.setOption(option);
}

/* 折线图
 * id:页面控件的id
 * title：标题，string
 * xTypes: x轴数据类别，string[]
 * dataTypes：折线类别的描述，string[]
 * datd:list<map<string,Object>>展示的数据
 *             例子：[{name:XXX,type:line,datd:[1,2,3,4,5,6]}]
 */
function lineChart(id,title,xTypes,dataTypes,data,f,s,type) {
    if(s==undefined || s==''){
        s='{value}';
    }
    if(type==undefined || type==''){
        type='axis';
    }
    var myChart = echarts.init(document.getElementById(id));
    var  option = {
        title: {text: title, x: "center"},
        tooltip: {trigger: type,
            formatter: f
        },
        legend: {x: 'center',y:'bottom', data: dataTypes},
        xAxis: [{type:'category',data:xTypes,boundaryGap:false}],
        yAxis: [{type: 'value', axisLabel : {formatter: s}}],
        calculable: true,
        series: data
    };
    myChart.setOption(option);
}

//矩形图
function initRangeCharts(id,data){
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
        },
        calculable : false,
        series : [

            {
                name:'',
                type:'treemap',
                size : ['100%', '100%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position : 'inner',
                            formatter: "{b}: {c}"
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                        }
                    }
                },
                data:data
            }
        ]
    };
    myChart.setOption(option);
}

//矩形图
function initRangeTreeCharts(id,data){
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
        },
        calculable : false,
        series : [

            {
                name:'',
                type:'treemap',
                size : ['100%', '100%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position : 'inner',
                            formatter: "{b}"
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                        }
                    }
                },
                data:data
            }
        ]
    };
    myChart.on('click', clickItem);

    myChart.setOption(option);
    function clickItem(param) {
        var name=param['name'];
        var time=param['data']['time'];
        $.ajax({
            url: baseUrl+'getKYFX_SFRS?'+t,
            dataType : 'jsonp',
            jsonp : "jsonpcallback",
            data : {name:name,start:time['start'],end:time['end']},
            success : function(data) {
                if(data['data']!=undefined){
                    var tjrs=data['data']['tjrs'];
                    var sftjrs=data['data']['sftjrs'];
                    var yf=new Array();
                    var rsdata = {name:'总数',data:0,type:'line'};
                    if(tjrs!=undefined && tjrs.length>0){

                        var data=new Array();
                        for(var i=0;i<tjrs.length;i++){
                                yf.push(tjrs[i]['TJYF']);
                                data.push(tjrs[i]['SUM']);
                        }
                    }
                    rsdata['data']=data;
                    var sfdata = {name:name,data:0,type:'line'};
                    if(sftjrs!=undefined && sftjrs.length>0){
                        var data=new Array();
                        for(var j=0;j<yf.length;j++) {
                            var flag=false;
                            for (var i = 0; i < sftjrs.length; i++) {
                                if(yf[j]==sftjrs[i]['TJYF']){
                                    flag=true;
                                    data.push(sftjrs[i]['VALUE']);
                                }
                            }
                            if(flag==false){
                                data.push(0);
                            }
                        }
                    }
                    sfdata['data']=data;

                    lineChart('lkzd_ky','所属省份统计',yf,['总数',name],[rsdata,sfdata],ky_formater,'','item');
                }
            },
            error : function(response) {
                alert(response);
            },
            timeout:6000
        });
    }
}

//旅客分析
function lk_formater(params,ticket,callback){
    var len = params.length;
    var hotels = new Array();
    var yf = params[0][1];
    for(var i=0;i<len;i++) {
        if(params[i][0]=='星级酒店入住率'){
            var all = params[i]['series']['all'];
            var lens = all.length;
            for(var j=0;j<lens;j++) {
                if(all[j]['TJYF']==yf){
                    var hotel =  all[j]['XJJD'];
                    hotels.push({name:'星级酒店',value:hotel});
                    $("#lyfx_xjhotel").val(hotel);
                    $("#lyfx_xjfjs").val(all[j]['XJJDFJS']);
                }
            }
            $("#lyfx_xjrzl").val(params[i]['data']+"%");
            initDashBoard('lkzd_xj', params[i]['data'],'星级酒店','入住率');
        }else if(params[i][0]=='特色民居客栈入住率'){
            var all = params[i]['series']['all'];
            var lens = all.length;
            for(var j=0;j<lens;j++) {
                if(all[j]['TJYF']==yf) {
                    var hotel =  all[j]['TSMJKZ'];
                    hotels.push({name: '特色民居客栈', value: hotel});
                    $("#lyfx_tshotel").val(hotel);
                    $("#lyfx_tsfjs").val(all[j]['TSMJKZFJS']);
                }
            }
            $("#lyfx_tsrzl").val(params[i]['data']+"%");
            initDashBoard('lkzd_ts', params[i]['data'],'特色民居客栈','入住率');
        }else if(params[i][0]=='经济型酒店入住率'){
            var all = params[i]['series']['all'];
            var lens = all.length;
            for(var j=0;j<lens;j++) {
                if(all[j]['TJYF']==yf) {
                    var hotel = all[j]['JJXJD'];
                    hotels.push({name: '经济型酒店', value: hotel});
                    $("#lyfx_jjxhotel").val(hotel);
                    $("#lyfx_jjxfjs").val(all[j]['JJXJDFJS']);
                }
            }
            $("#lyfx_jjxrzl").val(params[i]['data']+"%");
            initDashBoard('lkzd_jj', params[i]['data'],'经济型酒店','入住率');
        }else if(params[i][0]=='入住率'){
            $("#lyfx_rzl").val(params[i]['data']+"%");
            initDashBoard('lkzd_all', params[i]['data'],'所有酒店','入住率');
        }
    }
    $("#lyfx_hotel").val($("#lyfx_jjxhotel").val()*1+$("#lyfx_tshotel").val()*1+ $("#lyfx_xjhotel").val()*1);
    $("#lyfx_fjs").val($("#lyfx_jjxfjs").val()*1+$("#lyfx_tsfjs").val()*1+ $("#lyfx_xjfjs").val()*1);
    initPieCharts('lkzd_fe',['酒店'],['星级酒店','特色民居客栈','经济型酒店'],hotels);
    return params[0][1];
}

//客源分析
function ky_formater(params,ticket,callback){
    var yf = params[1];
    var sf = params[0];
    $.ajax({
        url: baseUrl+'getKYFX_NLXB?'+t,
        dataType : 'jsonp',
        jsonp : "jsonpcallback",
        data : {name:sf,tjyf:yf},
        success : function(data) {
            if(data['data']!=undefined){
                var nl=data['data']['nl'];
                var xb=data['data']['xb'];
                if(nl!=undefined && nl.length>0){
                    var nldata = new Array();
                    for(var i=0;i<nl.length;i++){
                        nldata.push({name:nl[i]['NL'],value:nl[i]['SUM']});
                    }
                    initRangeCharts('lkzd_nlbl',nldata);
                }
                if(xb!=undefined && xb.length>0){
                    var xbdata = new Array();
                    for(var i=0;i<xb.length;i++){
                        xbdata.push({name:xb[i]['XB'],value:xb[i]['SUM']});
                    }
                    initRangeCharts('lkzd_nvbl',xbdata);
                }
            }
        },
        error : function(response) {
            alert(response);
        },
        timeout:6000
    });

    return params[0]+'('+params['data']+')';
}

//客栈分析
function kz_formater(params,ticket,callback){

    var fjs=new Array();
    var cws =new Array();
    var data = params['series']['extra'];
    var len = data.length;
    var extra = new Array();
    var yf = params[1];
    var name = params[0];
    var wz=new Array();
    for(var i=0;i<len;i++){
        var one =data[i];
        if(yf==one['TJYF'] && one['TYPE']==name){
            extra.push(one);
            var has = false;
            for(var j=0;j<fjs.length;j++){
                if(fjs[j]['wz']==one['WZ']){
                    fjs[j]['value']= fjs[j]['value'] + one['FJS'];
                    cws[j]['value']= cws[j]['value'] + one['CWS'];
                    has=true;
                }
            }
            if(has==false){
                fjs.push({name:one['WZ'],value:one['FJS'],extras:extra});
                cws.push({name:one['WZ'],value:one['CWS'],extras:extra})
                wz.push(one['WZ']);
            }
        }
    }

    kzfxinitPieChart('kzfx_fjs',['房间数'],wz,fjs);
    kzfxinitPieChart('kzfx_cws',['床位数'],wz,cws);
    return params[0]+'('+params['data']+')';
}
//医疗分析
function ylzc_formater(params,ticket,callback) {

        var yf = params[0][1];
        $("tr[name^=ylfx_]").css("color","");
        $("tr[name=ylfx_"+yf+"]").css("color","red");
        return params[0][1];
}

//医疗分析_百分比
function ylzcbfb_formater(params,ticket,callback) {

    var yf = params[0][1];
    $("tr[name^=ylfx_]").css("color","");
    $("tr[name=ylfx_"+yf+"]").css("color","red");
    return params[0][1];
}

//幼儿入园率
function yeryl_formater(params,ticket,callback) {

    var plen = params.length;
    var str = "";
    for(var i=0;i<plen;i++){
        str=str+'<br>'+params[i]['seriesName']+'：'+params[i]['value']+'%';
    }
    var yf = params[0][1];
    var data= params[0]['series']['extra'];
    var len = data.length;
    for(var i=0;i<len;i++){
        var one = data[i];
        if(one['TJYF']==yf){
            initRangeTreeCharts('p113_rys',[{name:'少数名族幼儿入园数',value:one['SSMCSLETRYZS']},{name:'幼儿入园数',value:one['SLETRYZS']}])
        }
    }
    return params[0][1]+str;
}

//少数民族分析
function ssmz_formater(params,ticket,callback){

    var mzs=new Array();
    var data = params['series']['extra'];
    var len = data.length;
    var extra = new Array();
    var qy = params[1];
    var mzItem=new Array();
    for(var i=0;i<len;i++){
        var one =data[i];
        if(qy==one['XZQY']){
            mzs.push({name:one['MZ'],value:one['RS']});
            mzItem.push(one['MZ']);
        }
    }

    SSMZinitPieChart('ssmzfx_xzqy_mz','民族数',mzItem,mzs);
    return params[0]+'('+params['data']+')';
}

//流动少数民族分析
function ldssmz_formater(params,ticket,callback){

    var sqs=new Array();
    var data = params['series']['extra'];
    var len = data.length;
    var extra = new Array();
    var qy = params[1];
    var sqItem=new Array();
    for(var i=0;i<len;i++){
        var one =data[i];
        if(qy==one['XZQY']){
            sqs.push({name:one['SQ'],value:one['RS']});
            sqItem.push(one['SQ']);
        }
    }

    LDSSMZinitPieChart('ldssmzfx_xzqy_mz','社区少数民族数',sqItem,sqs);
    return params[0]+'('+params['data']+')';
}
/* 饼图
 * id: 页面控件的id
 * title：标题，string
 * dataTypes: 数据类别，string[]
 * datd: list<map<string,String>>展示的数据
 *             例子：[{value:335, name:'直接访问'}]
 */
function SSMZinitPieChart(id,title,dataTypes,data){
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        title : {text: title,x:'left'},
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: { x : 'center', y : 'bottom',data:dataTypes},
        calculable : false,
        series : [
            {
                name:title,
                type:'pie',
                selectedMode:'single',
                radius : ['0%', '45%'],
                center: ['45%', '55%'],
                data: data
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('pieSelected', function (param){
        var extra = option.series[0]['data'][0]['extra']
        var len =extra.length;
        var mz = param['target'];
        var mzData = new Array();
        var data=new Array();
        var item=new Array();
        for (var a = 0; a < len; a++) {
            if(mz==extra[a]['MZ']){
                item.push(extra[a]['XZQY']);
                mzData.push(extra[a]);
                if(data.length==0){
                    data.push({name:extra[a]['MZ'],type:"line",data:[extra[a]['RS']]});
                }else{
                   data[0]['data'].push(extra[a]['RS']);
                }
            }
        }
        lineChart('ssmzfx_xzqy',mz,item,[mz],data,ylzc_formater,'','');
    })
}

/* 饼图
 * id: 页面控件的id
 * title：标题，string
 * dataTypes: 数据类别，string[]
 * datd: list<map<string,String>>展示的数据
 *             例子：[{value:335, name:'直接访问'}]
 */
function LDSSMZinitPieChart(id,title,dataTypes,data){
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        title : {text: title,x:'left'},
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: { x : 'center', y : 'bottom',data:dataTypes},
        calculable : false,
        series : [
            {
                name:title,
                type:'pie',
                selectedMode:'single',
                radius : ['0%', '45%'],
                center: ['45%', '43%'],
                data: data
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('pieSelected', function (param){
        var extra = option.series[0]['data'][0]['extra']
        var len =extra.length;
        var mz = param['target'];
        var mzData = new Array();
        var data=new Array();
        var item=new Array();
        for (var a = 0; a < len; a++) {
            if(mz==extra[a]['MZ']){
                item.push(extra[a]['XZQY']);
                mzData.push(extra[a]);
                if(data.length==0){
                    data.push({name:extra[a]['MZ'],type:"line",data:[extra[a]['RS']]});
                }else{
                    data[0]['data'].push(extra[a]['RS']);
                }
            }
        }
        lineChart('ssmzfx_xzqy',mz,item,[mz],data,ylzc_formater,'','');
    })
}