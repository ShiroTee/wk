
var echartColors=['#c23531','#00C000', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
/**
 * 页面加载完成
 */
$(function(){
	//setBg();
	setViewInitShow();
	initChartBox();
	
	initOrgChart("e_orgChart");
	initServiceChart("e_busiChart");
	initAssetChart("e_assetChart");
	initThemeChart("e_themeChart");
	setHScorll();
	initShowVIew();
});
/**
 * 初始化显示大图区域
 * @param type   service-服务对象 org-组织机构 asset-信息资源 theme-协同主题
 */
var flipster;
function initShowVIew()
{
	var initStart='center';
	if(returnType)
	{
		var items=$("#chartBox > .flip-item");
		for(var i=0;i<items.length;i++)
		{
			var type=$(items[i]).data("type");
			if(type==returnType)
			{
				initStart=i;
				break;
			}
		}
	}
	flipster=$("#viewShowBox").flipster({
			itemContainer: 			'#chartBox', // Container for the flippin' items.
			itemSelector: 			'.flip-item', // Selector for children of itemContainer to flip
			style:							'carousel', // Switch between 'coverflow' or 'carousel' display styles
			start: 							initStart, // Starting item. Set to 0 to start at the first, 'center' to start in the middle or the index of the item you want to start with.
			
			enableKeyboard: 		true, // Enable left/right arrow navigation
			enableMousewheel: 	true, // Enable scrollwheel navigation (up = left, down = right)
			enableTouch: 				true, // Enable swipe navigation for touch devices
			
			enableNav: 					false, // If true, flipster will insert an unordered list of the slides
			enableNavButtons: 	false, // If true, flipster will insert Previous / Next buttons
			
			onItemSwitch: 			function(){} // Callback function when items are switches
		});
}
/**
 * 设置初始显示到中间的图形
 */
function setViewInitShow()
{
	//$("#chartBox .echart:eq(0)").show();
	$("#viewHScroll .item").click(function(){
		var chart=$(this).data("chart");
		//("#chartBox .echart").hide();
		//$("#"+chart).show(500);
		flipster.flipster('jump', $("#"+chart));
	});
	$("#viewHScroll .item").on("dblclick",function(e){
		var chart=$(this).data("chart");
		var url=$("#"+chart+" .echart").data("url");
		if(url && url!="")
		{
			window.location.href=url;
		}
	});
}
/**
 * 设置水平滚动显示小图
 */
function setHScorll()
{
	var owl=$('#viewHScroll').owlCarousel({
		loop:true,
		margin:80,
		nav:true,
		dots:false,
        items:4,
        navText:['<i class="fa fa-chevron-circle-left "></i>','<i class="fa fa-chevron-circle-right "></i>']
	});
}
/**
 * 设置背景
 */
function setBg()
{
	var ph=$("#bgout").height();
	var victor = new Victor("bgbox", "bgout");
	victor(["#002c4a", "#005584"]).set();	
}
/**
 * 初始图形大小
 */
function initChartBox()
{
	var cw=$("#chartBox").width();
	var ch=$("#chartBox").height();
	var bh=$(document).height()-340;
	ch=(ch>240 ? ch:240);
	if(bh>ch)
	{
		ch=bh;
		$("#viewShowBox").height(bh+60);
		$("#chartBox").height(ch);
	}
	$("#e_orgChart").width(cw);
	$("#e_orgChart").height(ch);
	
	$("#e_busiChart").width(cw);
	$("#e_busiChart").height(ch);
	
	$("#e_assetChart").width(cw);
	$("#e_assetChart").height(ch);
	
	$("#e_themeChart").width(cw);
	$("#e_themeChart").height(ch);
	
	$(".echart").on("dblclick",function(e){
		var url=$(this).data("url");
		if(url!="")
		{
			window.location.href=url;
		}
	});
}

/**
 * 初始组织机构图形
 * @param chartId
 */
function initOrgChart(chartId)
{
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(chartId));
    var elabels=[];
    var edatas=[];
    var url=ampPreUrl+"/totalViewHandler/qryOrgTypeCount";
    $.ajax({url:url,type:"POST",dataType:"json",data:{rootOrgId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		if(data.length>0)
			{
    			for(var i=0;i<data.length;i++)
    			{
    				var item=data[i];
        			elabels.push(item.orgTypeName);
        			edatas.push(item.orgTypeCount);
    			}
			}
    		else
    		{
    			elabels=["机构类型"];
    			edatas=[0];
    		}
		    // 指定图表的配置项和数据
		    var option = {
//		    	backgroundColor:'#ffffff',
		        title: {
		            text: '组织机构视角',
		            textStyle:{
						//color: '#ffffff'
					}
		        },
		        tooltip:{formatter:"{b0}:{c0}个"},
//		        legend: {
//		            data:['委办局个数'],
//		            textStyle:{
//						color: '#ffffff'
//					}
//		        },
		       xAxis: { 
		        	/**axisLine:{
						lineStyle:{
							color:'yellow'
						}
					},
					axisLabel:{
						textStyle:{
							color:'yellow'
						}
					},
					axisTick :{
						lineStyle:{
							color:'yellow'
						}
					}**/
		        },
		        yAxis: {
		        	data: elabels
		        	/**axisLine:{
						lineStyle:{
							color:'yellow'
						}
					},
					axisLabel:{
						textStyle:{
							color:'yellow'
						}
					},
					axisTick :{
						lineStyle:{
							color:'yellow'
						}
					}**/
		        },
		        series: [
				            {
					            name: '委办局个数',
					            type: 'bar',
					            data: edatas,
					            itemStyle:{
					            	normal:{
					            		color:function(e){
					            			return echartColors[e.dataIndex%11];
					            		}
					            	}
					            },
					            textStyle:{
									//color: '#ffffff'
								}
				            }
		               ]
		    };
		
		    // 使用刚指定的配置项和数据显示图表。
		    myChart.setOption(option);
    	}
    });
}
/**
 * 初始服务对象图形
 * @param chartId
 */
function initServiceChart(chartId)
{
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(chartId));
    var elabels=[];
    var edatas=[];
    var url=ampPreUrl+"/totalViewHandler/qryBusServeTypeCount";
    $.ajax({url:url,type:"POST",dataType:"json",data:{rootOrgId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		if(data.length>0)
			{
    			for(var i=0;i<data.length;i++)
    			{
    				var item=data[i];
        			elabels.push(item.serveObjName);
        			edatas.push({name:item.serveObjName,value:item.serveObjCount});
    			}
			}
    		else
    		{
    			elabels=["服务对象"];
    			edatas=[{name:"服务对角",value:0}];
    		}
		    // 指定图表的配置项和数据
		    var option = {
//		    	backgroundColor:'#ffffff',
		        title: {
		            text: '服务对象视角',
		            textStyle:{
						//color: '#ffffff'
					}
		        },
		        textStyle:{
					//color: '#ffffff'
				},
		        tooltip: {formatter:"{a0}：<br/>{b0}:{c0}项"},
		        legend: {
		        	 data: elabels,
		        	 textStyle:{
							//color: '#ffffff'
						}
		        },
		        series: [{
		            name: '业务事项',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            legendHoverLink:true,
		            data:edatas,
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }],
		        color:echartColors
		    };
		    // 使用刚指定的配置项和数据显示图表。
		    myChart.setOption(option);
    	}
    });
}
/**
 * 初始信息资产图形
 * @param chartId
 */
function initAssetChart(chartId)
{
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(chartId));
    var elabels=[];
    var easset=[];
    var esys=[];
    var url=ampPreUrl+"/totalViewHandler/qryOrgAssetAndSysCount";
    $.ajax({url:url,type:"POST",dataType:"json",data:{rootOrgId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
	,success:function(data, textStatus, jqXHR){
		if(data.length>0)
		{
			for(var i=0;i<data.length;i++)
			{
				var item=data[i];
    			elabels.push(item.orgName);
    			easset.push({name:item.orgName,value:item.infoCount,asset:item.infoCount,sys:item.sysCount});
    			esys.push({name:item.orgName,value:item.sysCount,asset:item.infoCount,sys:item.sysCount});
			}
		}
		else
		{
			elabels=["组织机构"];
			easset=[0];
			esys=[0];
		}
		// 指定图表的配置项和数据
	    var option = {
//	    	backgroundColor:'#ffffff',
	        title: {
	            text: '信息资产视角',
	            textStyle:{
					//color: '#ffffff'
				}
	        },
	        tooltip: {formatter:function(params, ticket, callback)
	        	{
	        	   var item=params.data; 
	        	   var tip="<b>"+item.name+"</b><br/>信息资源："+item.asset+"项<br/>信息系统："+item.sys+"个";
	        	   
	        	   return tip;
	        	}},
	        legend: {
	            data:['信息资源','信息系统'],
	            textStyle:{
					//color: '#ffffff'
				}
	        },
	        xAxis: {
	            data: elabels
	           /** axisLine:{
					lineStyle:{
						color:'yellow'
					}
				},
				axisLabel:{
					textStyle:{
						color:'yellow'
					}
				},
				axisTick :{
					lineStyle:{
						color:'yellow'
					}
				}**/
	        },
	        yAxis: {
	        	/**axisLine:{
					lineStyle:{
						color:'yellow'
					}
				},
				axisLabel:{
					textStyle:{
						color:'yellow'
					}
				},
				axisTick :{
					lineStyle:{
						color:'yellow'
					}
				}**/
	        },
	        series: [
	           {
		            name: '信息资源',
		            type: 'bar',
		            stack:'org',
		            maxWidth:100,
		            data: easset
	           },
	           {
		           name: '信息系统',
		           type: 'bar',
		           stack:'org',
		           maxWidth:100,
		           data: esys
	           }
	        ],
	        color:echartColors
	    };

	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	}
    });
}
/**
 * 初始协同主题图形
 * @param chartId
 */
function initThemeChart(chartId)
{
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(chartId));
    var elabels=[];
    var edatas=[];
    var url=ampPreUrl+"/totalViewHandler/qryThemeOwnEleCount";
    $.ajax({url:url,type:"POST",dataType:"json",data:{rootOrgId:rootOrgId},complete:function(XMLHttpRequest, textStatus){}
	,success:function(data, textStatus, jqXHR){
		if(data.length>0)
		{
			for(var i=0;i<data.length;i++)
			{
				var item=data[i];
    			elabels.push(item.subjectname);
    			edatas.push(item.elecount);
			}
		}
		else
		{
			elabels=["主题"];
			edatas=[0];
		}
		
		// 指定图表的配置项和数据
	    var option = {
//	    	backgroundColor:'#ffffff',
	        title: {
	            text: '协同主题视角',
	            textStyle:{
					//color: '#ffffff'
				}
	        },
	        tooltip: {formatter:"{b0}<br/>拥有元数据：{c0}项"},
//	        legend: {
//	            data:['主题']
//	        },
	        xAxis: {
	            data: elabels
	           /** axisLine:{
					lineStyle:{
						color:'yellow'
					}
				},
				axisLabel:{
					textStyle:{
						color:'yellow'
					}
				},
				axisTick :{
					lineStyle:{
						color:'yellow'
					}
				}**/
	        },
	        yAxis: {
	        	/**axisLine:{
					lineStyle:{
						color:'yellow'
					}
				},
				axisLabel:{
					textStyle:{
						color:'yellow'
					}
				},
				axisTick :{
					lineStyle:{
						color:'yellow'
					}
				}**/
	        },
	        series: [{
	            name: '主题',
	            type: 'bar',
	            data: edatas,
	            maxWidth:100,
	            itemStyle:{
	            	normal:{
	            		color:function(e){
	            			return echartColors[e.dataIndex%11];
	            		}
	            	}
	            }
	        }]
	    };

	    // 使用刚指定的配置项和数据显示图表。
	    myChart.setOption(option);
	}
    });
}