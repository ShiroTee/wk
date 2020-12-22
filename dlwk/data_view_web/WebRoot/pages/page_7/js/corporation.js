/*
	@page 7
	@宏观经济
 */var _tmpData = null;
var dataz = null;
var dataz_names = null;
var leftChart1 = null, leftChart2 = null, leftChart3 = null, leftChart4 = null;
var midChart1 = null, midChart2 = null, midChart3 = null;
var rightChart1 = null, rightChart2 = null;
var charts = new Array();
	//名称顺序
	var orderNames = ["大理市公安局","大理市安全生产监督管理局","大理市财政局（国资委）","大理市残疾人联合会","大理市城市管理综合行政执法局","大理市档案局",
		"大理市地方税务局","大理市发展和改革局","大理市妇联","大理市工商联合会","大理市工业和信息化局","大理市供销社","大理市公安局交警大队","大理市规划局",
		"大理市规划局旅游度假区分局","大理市国家税务局","大理市国土资源局","大理市国土资源局旅游度假区分局","大理市环境保护局","大理市机构编制办公室",
		"大理市纪委","大理市交通运输局","大理市教育局","大理市林业局","大理市旅游文化体育广播电视局","大理市民政局（老龄办）","大理市民族宗教事务局","大理市农业局","大理市气象局",
		"大理市人力资源和社会保障局","大理市人民法院","大理市人民防空办公室","大理市商务局","大理市审计局","大理市审计局旅游度假区分局",
		"大理市市场监督管理局","大理市水务局","大理市司法局","大理市统计局","大理市外事办","大理市委党史研究室","大理市委党校","大理市委政法委",
		"大理市卫生和计划生育局","大理市文化产业发展办公室","大理市畜牧局","大理市政府法制局","大理市政务服务管理局","大理市住房和城乡建设局","大理市总工会",
		"大理团市委","大理银监分局","大理州烟草公司大理分公司（烟草专卖局）","创新工业园区财政局","创新工业园区城市管理综合行政执法局","创新工业园区地税分局","创新工业园区发展和改革局","创新工业园区法制局",
		"创新工业园区工商分局","创新工业园区工业和信息化局","创新工业园区规划分局","创新工业园区国税局","创新工业园区国土分局","创新工业园区环保分局",
		"创新工业园区人力资源和社会保障局","创新工业园区土地收购储备交易中心","创新工业园区招商合作局","创新工业园区住房和城乡建设局","海开委财政局","旅游度假区产业规划投资服务中心","旅游度假区产业规划投资服务中心",
		"旅游度假区大理市古城保护管理局","旅游度假区党委、管委会办公室","旅游度假区党务群团工作部","旅游度假区地方税务局","旅游度假区国家税务局","旅游度假区监察室",
		"旅游度假区建设环保局","旅游度假区经济贸易财政局","旅游度假区林业园林局","旅游度假区群众工作局（信访局）","旅游度假区人力资源和社会保障局","旅游度假区社会事业局",
		"旅游度假区土地收购储备中心","旅游度假区招商局"];
window.onload = function() {
	dataz_names = commonClass._commAjax('/page7/names');
	var thisURL = document.URL;
	var showval = null;
	var nameIndex = null;
	if (thisURL.indexOf('?') != -1) {
		///page.html?tit=7s_tYZWnEea50MvrzjARFA&i=7
		var getval = thisURL.split('?')[1];
		if(getval.indexOf('&') != -1){//从第七屏请求
			showval = getval.split("&")[0].split("=")[1];
			nameIndex = getval.split("&")[1].split("=")[1];
		}else{//从首屏或第二屏跳转请求,url中只有code
			showval = getval.split("=")[1];
			nameIndex = getNameIndex(dataz_names.names,showval);
		}
	}

	var pars = 'LdtLYNznEeS8NM2W5Y-afw';
	var i = 0;
	if (null != showval && '' != showval && null != nameIndex && '' != nameIndex) {
		pars = showval;
		i = nameIndex;
	};

	$('#title').html(orderNames[i]+'资源详情');
	dataz = commonClass._commAjax('/page7/data?tit=' + pars);
	$(".header_title_page7").css("background-position","0 " + -30*i + "px");
	pageLoad();
	
	//动画
	charts.push(leftChart1);
	charts.push(leftChart2);
	charts.push(leftChart3);
	charts.push(leftChart4);
    charts.push(midChart1);
//    charts.push(midChart2);
//    charts.push(midChart3);
    charts.push(rightChart1);
    charts.push(rightChart2);
    

    animationAfterStill.autoPlay(charts);
};
function pageLoad() {
	$(".header_date").text(commonClass._getDate());
	leftCorPanel.init();
	rightCorPanel.init();
	middelCorPanel.init();
	initNav();
	window.onresize = function() {
		left1.resize();
		left2.resize();
		// left4.resize();
		left5.resize();
//		right1.resize();
		mid1.resize();
		pieIndustryAve.resize();
		bubbleIndustyr.resize()
	}
}
var leftCorPanel = {
	init : function() {
		left1 = this.left1();
		left2 = this.left2();
		// left4 = this.left4();
		left5 = this.left5();
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		if (userAgent.indexOf("Chrome") > -1){
			left3 = this.left3_chrome();
		}else{
			left3 = this.left3();
		};
		left6 = this.left6();
		// dieBar = this.ringChart();
		// dieBarex = this.createDieBarEX()
	},
	left1 : function() {
		var datas = dataz.left1;
		var a = {
			title : {
				text : "信息资源金字塔",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'item',
				formatter : function(a) {
					return "部门信息  <br/>" + a.name + " : " + a.value[1] + "个";
				},
				position : [ 10, 10 ]
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "信息资源金字塔",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			calculable : true,
			series : [ {
				name : '部门信息',
				type : 'funnel',
				left : '10%',
				top : 30,
				x2 : 80,
				bottom : 20,
				width : '80%',
				// height: {totalHeight} - y - y2,
				sort : 'ascending',
				gap : 2,
				label : {
					normal : {
						show : true,
						position : 'inside'
					},
					emphasis : {
						textStyle : {
							fontSize : 20
						}
					}
				},
				labelLine : {
					normal : {
						length : 10,
						lineStyle : {
							width : 1,
							type : 'solid'
						}
					}
				},
				itemStyle : {
					normal : {
						borderColor : '#fff',
						borderWidth : 1
					}
				},
				data : [ {
					value : [ 25, datas.VAL1 ],
					name : '下设机构',
					itemStyle : {
						normal : {
							color : '#FFAA4D'
						}
					}
				}, {
					value : [ 50, datas.VAL2 ],
					name : '业务事项',
					itemStyle : {
						normal : {
							color : '#FF7376'
						}
					}
				}, {
					value : [ 75, datas.VAL3 ],
					name : '信息资源',
					itemStyle : {
						normal : {
							color : '#8EE972'
						}
					}
				}, {
					value : [ 100, datas.VAL4 ],
					name : '数据项',
					itemStyle : {
						normal : {
							color : '#00AADB'
						}
					}
				} ]
			} ]
		};
		leftChart1 = echarts.init(document.getElementById("left1"));
		leftChart1.setOption(a);
		return leftChart1
	},
	left2 : function() {
		var total = dataz.left2.TOTAL;
		var s = dataz.left2.VAL1;
		var radius = 0;
		if (total != 0) {
			radius = ((s * 100) / total).toFixed(2);
		}
		//百分比数值的位置
		var position = '';
		if(radius >= 50){
			position = 'inside';
		}else if(radius < 50){
			position = 'top';
		}
		var a = {
			title : {
				text : "电子信息化存储度",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				formatter : function(a) {
					return "部门信息资源存储介质  <br/> 电子信息化存储数量: " + a.data.number + "个";
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "电子信息化存储度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				top : '20%',
				bottom : '3%',
				left : '10%',
				right : '10%',
				width : document.getElementById("left2").offsetWidth * 0.8,
				containLabel : false
			},
			xAxis : [ {
				type : 'category',
				data : [],
				axisLabel : {
					show : false,
					inside : false,
					textStyle : {
						color : '#fff'
					}
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				},
				z : 10
			}, {
				type : 'category',
				axisLabel : {
					show : false,
				},
				axisTick : {
					show : false
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				},
				data : [],
			} ],
			yAxis : {
				type : 'value',
				axisLabel : {
					show : false,
					textStyle : {
						color : 'rgb(0,0,0,0)'
					}
				},
				max : 100,
				axisTick : {
					show : false
				},
				axisLine : {
					show : false
				},
				splitLine : {
					show : false
				},
				z : 10
			},
			series : [ {
				name : '信息资源量',
				type : 'bar',
				barWidth : '100%',
				// barMaxWidth: '100%',
				label : {
					normal : {
						show : true,
						position : position,
						formatter : '{c} %',
						textStyle : {
							color : '#FFFFFF',
							fontWeight : 'normal',
							fontFamily : 'Microsoft YaHei',
							fontSize : 30
						}
					}
				},
				itemStyle : {
					normal : {
						barBorderRadius : [ 5, 5, 5, 5 ],
						shadowBlur : 10,
						shadowColor : '#111',
						color : '#2FD04F'
					}
				},
				data : [{
					value : radius ,
					number : dataz.left2.VAL1
				}],
				z : 10
			}, {
				type : 'bar',
				barWidth : '100%',
				xAxisIndex : 1,
				silent : true,
				// barMaxWidth: '100%',
				itemStyle : {
					normal : {
						barBorderRadius : 5,
						color : '#42475B'
					}
				},
				data : [ 100 ],
			} ]
		};
		leftChart2 = echarts.init(document.getElementById("left2"));
		leftChart2.setOption(a);
		return leftChart2
	},
	left5 : function() {
		var data_mid2_1 = [],data_mid2_2 = [];
		$.each(dataz.mid2.mid2_1,function(i,n){
			if(n.NAME != undefined){
				data_mid2_1.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		$.each(dataz.mid2.mid2_2,function(i,n){
			if(n.NAME != undefined){
				data_mid2_2.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		var a = {
			color : "#FFAA4D #8EE972 #FECD8A #00AADB #6CD5C4 #AA92E0 #FE9BCA #FFBBA4 #9E9E9E"
					.split(" "),
			title : {
				text : "信息资源信息化程度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : "item",
				formatter : "{a} \x3cbr/\x3e{b}: {c}个 "
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "信息资源信息化程度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			series : [ {
				name : "系统数量",
				type : "pie",
				selectedMode : "single",
				radius : [ 0, "45%" ],
				clockwise : true,
				startAngle : 90,
				center : [ '50%', '55%' ],
				label : {
					normal : {
						show : !1,
						position : "inner"
					}
				},
				labelLine : {
					normal : {
						show : !1
					}
				},
				data : data_mid2_2
			}, {
				name : "数量",
				type : "pie",
				radius : [ "55%", "80%" ],
				clockwise : true,
				startAngle : 90,
				minAngle : 5,
				center : [ '50%', '55%' ],
				// label : {
				// normal : {
				// show : !1
				// }
				// },
				// labelLine : {
				// normal : {
				// show : true,
				// length : 2
				// }
				// },
				itemStyle : {
					normal : {
						label : {
							show : false
						},
						labelLine : {
							show : false
						},
						borderWidth : 4,
						borderColor : '#03162B',
					}
				},
				data : data_mid2_1
			} ]
		}, 
		midChart2 = echarts.init(document.getElementById("left5"));
		midChart2.setOption(a);
		charts.push(midChart2);
		return midChart2;
	},

	left3_chrome : function() {
		var info = [ "在线查询", "文件传输", "接口方式", "数据库对接", "前置机对接","其它" ];
		var names = [];
		var datas = [];
		var max = 0;
		// 确定雷达图MAX
		$.each(dataz.mid3, function(i,n) {
			max = n.VALUE-max >= 0 ? n.VALUE : max;
		});
		// 拼接雷达图坐标
		$.each(dataz.mid3, function(i,n) {
			if(n.NAME != undefined){
				names.push({
					name : n.NAME,
					max : max
				});
				datas.push(n.VALUE);
				// 将已添加到数组的元素从原始数组中去除
				info.splice($.inArray(n.NAME, info), 1);
			}
		});
		if(info.length > 0){
			// 将原始数组剩余元素添加到坐标轴数组,值均为0
			$.each(info, function(i, n) {
				names.push({
					name : info[i],
					max : max
				});
				datas.push(0);
			});
		}
		
		var a = {
			title : {
				text : "信息共享方式对比",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {	//提示框
				position:[10,10]
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "信息共享方式对比",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration: 5000,//进入动画时长ms
			radar : {
				radius:'65%',//半径
				indicator : names,
				center : [ "55%", "50%" ],
				splitNumber : 1,
				name : { 
					show:!0,
					textStyle : {
						color : "#A9BDD6",
						fontSize : 1,
						align:'center'
					},
					formatter: function(a, c, d) {	
						return a;
					}
				},
				nameGap : 12,
				splitArea : {
					areaStyle : {
						color : "rgba(116,42,53,0.3)",
						shadowColor : "rgba(0, 0, 0, 0.3)",
						shadowBlur : 10
					}
				},
				axisLine : {
					lineStyle : {
						color : "rgba(66,143,148,0.6)"
					}
				},
				splitLine : {
					lineStyle : {
						color : "#428f94",
						width : 1
					}
				}
			},
			series : [ {
				name : "",
				type : "radar",
				symbolSize : 1,
				label : {
					normal : {
						show : !1,
						position : [ -10, -20 ],

						textStyle : {
							color : "#ff0"
						}
					}
				},
				lineStyle : {
					normal : {
						type : "solid",
						color : "#FF625B",
						width : 2,
						opacity : 1
					}
				},
				areaStyle : {
					normal : {
						color : new echarts.graphic.RadialGradient(.5, .5, .6,
								[ {
									offset : 0,
									color : "rgba(0,0,0,0)"
								}, {
									offset : 0,
									color : "rgba(255,98,91,0.8)"
								} ]),
						opacity : .5
					}
				},
				itemStyle : {
					normal : {
						color : new echarts.graphic.RadialGradient(.5, .5, .8,
								[ {
									offset : 0,
									color : "rgba(0,0,0,0)"
								}, {
									offset : 1,
									color : "rgba(255,98,91,0.5)"
								} ])
					}
				},
				data : [ {
					name : "对外共享信息资源数量",
//					val:['在线查询','文件传输','接口方式','前置机对接','其他'],
					value : datas
				} ]
			} ]
		}, 
		midChart3 = echarts.init(document.getElementById("left3"));
		midChart3.setOption(a);
		return midChart3
	},
	
	left3 : function() {
		Highcharts.setOptions({
			lang:{
	            contextButtonTitle: "保存为图",
	            downloadJPEG:"下载 JPEG 图片",
	            downloadPDF:"下载 PDF 文件",
	            downloadPNG:"下载 PNG 文件",
	            downloadSVG:"下载 SVG 文件",
	            printChart:"打印图表"
	        }
		});
		
		var info = [ "在线查询", "文件传输", "接口方式", "数据库对接", "前置机对接","其他" ];
		var names = [];
		var datas = [];
		var max = 0;
		// 确定雷达图MAX
		$.each(dataz.mid3, function(i,n) {
			max = n.VALUE-max >= 0 ? n.VALUE : max;
		});
		// 拼接雷达图坐标
		$.each(dataz.mid3, function(i,n) {
			if(n.NAME != undefined){
				names.push({
					name : n.NAME,
					max : max
				});
				datas.push(n.VALUE);
				// 将已添加到数组的元素从原始数组中去除
				info.splice($.inArray(n.NAME, info), 1);
			}
		});
		if(info.length > 0){
			// 将原始数组剩余元素添加到坐标轴数组,值均为0
			$.each(info, function(i, n) {
				names.push({
					name : info[i],
					max : max
				});
				datas.push(0);
			});
		}

		var a = {
			chart : {
				polar : true,
				type : 'line',
				backgroundColor : "rgba(0,0,0,0)",
			},
			exporting: {
				 buttons: {
					 contextButton: {
						 height: 0.1,
						 width : 0.1,
						 menuItems: null,
//						 symbol: 'circle',
		                 symbolStrokeWidth: 2,
		                 symbolFill: '#03162B',
		                 symbolStroke: '#606163',
		                 x : -30,
		                 y : -7,
		                 onclick: function () {
							 this.exportChartLocal();
						 }
					 }
				 },
				 chartOptions: { // specific options for the exported image
			            plotOptions: {//导出时显示数据标签
			                series: {
			                    dataLabels: {
			                        enabled: true
			                    }
			                }
			            }
			      },
			      filename : '信息共享方式对比',
			      fallbackToExportServer: false
			},
			navigation : {
				buttonOptions: {
					symbolFill : '#03162B'
		         },
			},
			title : {
				text : '信息共享方式对比',
				// x: '',
				align : 'left',
				style : {
					color : "#FFF",
					fontSize : "15px",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			credits : {
				enabled : false
			},
			legend : {
				enabled : false
			},
			loading : {
				showDuration : 5000
			},
			pane : {
				size : '95%',
				center : [ "53%", "45%" ]
			// background:[{
			// backgroundColor: "#09b7ff"
			// }]
			},
			xAxis : {
				categories : [names[0].name,names[1].name,names[2].name,names[3].name,names[4].name,names[5].name],
				labels : {
					style : {
						color : "#A9BDD6",
						fontSize : 1,
						align : 'center'
					}
				},
				tickmarkPlacement : 'on',
				lineWidth : 0,
				gridLineColor : "#428F94",
				gridLineWidth : 1
			},
			yAxis : {
				gridLineInterpolation : 'polygon',
				lineColor : "#428F94",
				lineWidth : 1,
				gridLineColor : "#428F94",
				tickAmount : 1,
				gridLineWidth : 1,
				alternateGridColor : "#242537",
				// plotBands: [{color:"#4D5A69"},{color:"#3E4B5A"}],
				labels : {
					enabled : false
				},
				min : 0
			},
			tooltip : {
				shared : true,
				backgroundColor : "rgba(36,42,48,0.5)",
				borderColor : "rgba(36,42,48,0.5)",
				// pointFormat: '<span style="color:#FFF">111: <b></b><br/>'
				formatter : function() {
					var categories = [names[0].name,names[1].name,names[2].name,names[3].name,names[4].name,names[5].name];
					var values = datas;
					var tit = "<span> <b>对外共享信息资源数量\x3cbr\x3e</b><br/>";
					for (var i = 0; i < categories.length; i++) {
						tit += "<span>" + categories[i] + " : " + values[i]
								+ "<br/></span>";
					}
					return tit;
				},
				style : {
					color : '#FFF',
					fontSize : "15px",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				},
				hideDelay : 100
			},
			series : [ {
				name : '信息共享方式对比',
				data : datas,
				type : 'area',
				lineColor : '#FF625B',
				color : 'rgba(116,42,53,0.2)',
				pointPlacement : 'on'
			} ]
		};
		var chart = new Highcharts.Chart('left3', a);
	},
	left6 : function() {
		// left4":[{"name":"其它","value":1},{"name":"月","value":9}]
		var datas = [ {
			"name" : "每年",
			"value" : 0
		}, {
			"name" : "每季度",
			"value" : 0
		}, {
			"name" : "每月",
			"value" : 0
		}, {
			"name" : "每日",
			"value" : 0
		}, {
			"name" : "实时",
			"value" : 0
		}, {
			"name" : "其它",
			"value" : 0
		} ];
		$.each(datas, function(i1, n1) {
			$.each(dataz.left4, function(i2, n2) {
				if (n1.name == n2.NAME) {
					n1.value = n2.VALUE;
				}
			});
		});

		var a = {
			color : "#FE5CC1 #83DBCB #B7A2E5 #FF8789 #FFB669 #FFDB50"
					.split(" "),
			title : {
				text : "信息资源鲜活度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "信息资源鲜活度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			calculable : true,
			series : [ {
				name : '信息资源更新',
				type : 'pie',
				radius : [ 3, 75 ],
				center : [ '55%', '57%' ],
				clockwise : true,
				startAngle : 90,
				roseType : 'area',
				minAngle : 60,
				label : {
					normal : {
						show : true,
						textStyle : {
							color : '#A9BDD6'
						}
					},
					emphasis : {
						show : true
					}
				},
				lableLine : { // 引线样式设置无效
					normal : {
						show : true,
						length : 10,
						length2 : 0,
						lineStyle : {
							color : '#A9BDD6'
						}
					},
				},
				itemStyle : {
					normal : {
						borderWidth : 1.5,
						borderColor : '#03162B',
					}
				},
				data : datas
			} ]
		};
		leftChart4 = echarts.init(document.getElementById("left6"));
		leftChart4.setOption(a);
		return leftChart4
	}
}, rightCorPanel = {
	init : function() {
		// right1 = this.right1();
		right2 = this.right2();
		// right3 = this.right3();
	},
	right1 : function() {
		var a = {
			color : "#76EE00 #c23531 #FF34B3 #749f83 #f16e15 #457bdb #bda29a #ffb570 #90d760 #d48265 #FF34B3 #BF3EFF #546570 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "信息资源业务溯源",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			visualMap : {
				show : false,
				min : 0,
				max : 50,
				dimension : 0,
				inRange : {
					color : [ '#fee235', '#76EE00', '#c23531', '#FF34B3',
							'#749f83', ' #f16e15', '#457bdb', '#bda29a',
							'#ffb570', '#90d760' ]
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'axis'
			},
			grid : {
				left : "3%",
				right : "3%",
				bottom : "3%",
				top : "23%",
				containLabel : !0
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				splitLine : {
					show : false
				},
				data : [ '人事管理', '教育信息化平台建设、维护、应用及数据信息统计', '中学教育教学管理',
						'小学教育教学管理', '国际交流与合作管理', '特殊教育管理', '学前教育教学管理',
						'九年义务教育教学管理', '教育国际化', '全市教育资助和学校校产管理' ],
				axisTick : {
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#072543",
						width : 0
					}
				},
				axisLabel : {
					textStyle : {
						color : "#09b7ff"
					},
					interval : 2
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
				type : 'value',
				position : 'left',
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#00a0e8"
					},
					interval : 0
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#00a0e8",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#00a0e8",
						width : 1,
						opacity : .2
					}
				},
			// splitArea : {
			// show : !0,
			// areaStyle : {
			// color : [ "rgba(0,0,0,0.3)" ]
			// }
			// }
			} ],
			series : [ {
				name : '信息资源个数',
				type : 'bar',
				data : [ 14, 13, 7, 7, 6, 4, 4, 4, 4, 3 ]
			}, {
				name : '数据项个数',
				type : 'line',
				data : [ 67, 56, 31, 27, 23, 10, 8, 7, 6, 4 ]
			}, ]
		};
		var b = echarts.init(document.getElementById("right1"));
		b.setOption(a);
		return b
	},
	right2 : function() {
		var a = {
			color : "#76EE00 #c23531 #fee235 #FF34B3 #749f83 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #d48265 #FF34B3 #BF3EFF #546570 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "最需要资源政务部门Top10",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'axis'
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "最需要资源政务部门Top10",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			grid : {
				left : "1%",
				right : "5%",
				bottom : "3%",
				top : "27%",
				containLabel : true
			},
			visualMap : {
				show : false,
				min : 0,
				max : 10,
				dimension : 0,
				inRange : {
					color : [ '#D0A8FF', '#8A97FF' ]
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				splitLine : {
					show : false
				},
				data : dataz.right1.right1_name,
				axisTick : {
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#4C6383",
						width : 2
					}
				},
				axisLabel : {
					textStyle : {
						color : "#A9BDD6"
					},
					formatter : function(a) {
						return commonClass._jName(a);
					}
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#182A40"
					}
				}
			} ],
			yAxis : [ {
				// name:"资源数量",
				type : 'value',

				axisLabel : {
					show : false
				// formatter : "{value}",
				// textStyle : {
				// fontSize : 13,
				// color : "#00a0e8"
				// },
				// interval : 0
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#182A40",
						width : 1,
						opacity : .8
					}
				},
				axisTick : {
					show : false,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#4C6383",
						width : 2,
					// opacity : .2
					}
				},
			} ],
			series : [ {
				name : '信息资源需求数量',
				type : 'bar',
				data : dataz.right1.right1_data
			}, ]
		};
		rightChart1 = echarts.init(document.getElementById("right2"));
		rightChart1.setOption(a);
		return rightChart1
	},
	right3 : function() {
		var a = {
			color : "#76EE00 #c23531 #fee235 #FF34B3 #749f83 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #d48265 #FF34B3 #BF3EFF #546570 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "信息资源需求更新频率",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : 'axis'
			},
			animationDuration : 5000,
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				top : '20%',
				containLabel : true
			},
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : [ '市公安局', '市城市管理委员会', '市经济和信息化委员会', '市规划管理局', '市旅游局',
						'市国有资产监督管理委员会', '市科学技术局', '市城乡房产管理局', '市交通运输委员会',
						'市司法局', '市工商局', '市教育局', '市民政局', '市林业和园林管理局', '市残疾人联合会',
						'市防震减灾局' ],
				axisTick : {
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#072543",
						width : 0
					}
				},
				axisLabel : {
					textStyle : {
						color : "#09b7ff"
					},
					interval : 2
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
				type : 'value',
				nameGap : 12,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#00a0e8"
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#00a0e8",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#00a0e8",
						width : 1,
						opacity : .2
					}
				},
			// splitArea : {
			// show : !0,
			// areaStyle : {
			// color : [ "rgba(0,0,0,0.3)" ]
			// }
			// }
			} ],
			series : [ {
				name : '实时',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : [ 66, 11, 5, 1, 3, 2, 1, 3, 1, 2, 1, 2, 1, 1, 1, 1 ]
			}, {
				name : '旬',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : [ 66, 5, 4, 2, 1, 3, 3, 1, 2, 1, 1, 0, 1, 0, 2, 0 ]
			}, {
				name : '月',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : [ 84, 2, 14, 2, 5, 1, 3, 2, 2, 2, 1, 1, 1, 2, 1, 1 ]
			}, {
				name : '季度',
				type : 'line',
				stack : '总量',
				areaStyle : {
					normal : {}
				},
				data : [ 31, 6, 11, 3, 3, 1, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0 ]
			}, {
				name : '年',
				type : 'line',
				stack : '总量',
				label : {
					normal : {
						show : true,
						position : 'top'
					}
				},
				areaStyle : {
					normal : {}
				},
				data : [ 88, 7, 10, 2, 3, 1, 2, 1, 1, 0, 1, 1, 1, 2, 1, 0 ]
			}, {
				name : '其他',
				type : 'line',
				stack : '总量',
				label : {
					normal : {
						show : true,
						position : 'top'
					}
				},
				areaStyle : {
					normal : {}
				},
				data : [ 22, 26, 9, 9, 4, 5, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0 ]
			} ]
		};
		var b = echarts.init(document.getElementById("right3"));
		b.setOption(a);
		return b
	}
}, middelCorPanel = {
	init : function() {
		mid1 = this.mid1();// this.loadIndustryDesity();
		// mid2 = this.mid2();
		mid3 = this.mid3();
		// mid4 = this.mid4();
		mid5 = this.mid5();
	},
	mid1 : function() {
		var datas = dataz.left3.left3_1;
		var data_left3_2 = [];
		var series_data = [ {
			name : [ '信息资源总量', '信息资源总量' ],
			stack : "total",
			color : "#FFD636",
			data : [ datas.TOTAL, datas.TOTAL ]
		}, {
			name : [ '依申请开放', '无条件共享' ],
			stack : "no",
			color : "#B9EA81",
			data : [ datas.VAL1, datas.VAL3 ]
		}, {
			name : [ '无条件开放', '有条件共享' ],
			stack : "no",
			color : "#00C0A3",
			data : [ datas.VAL2, datas.VAL4 ]
		} , {
			name : [ '有条件开放' ],
			stack : "no",
			color : "#00AADB",
			data : [ datas.VAL5]
		} ];
		$.each(dataz.left3.left3_2,function(i,n){
			if(n.NAME != undefined){
				data_left3_2.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		
		var a = {
			color : "#6CD5C4 #FFAA4D #FF7376 #FE40AB #C2ADE6".split(" "),
			title : {
				text : "信息资源共享开放度",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				textStyle : {},
				formatter : function(aa, c, d) {

					var index = c.charAt(c.length - 1);
					var tit = "信息资源共享开放统计\x3cbr\x3e";
					tit += "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FFD636'></span>"
							+ series_data[0].name[index]
							+ ":"
							+ series_data[0].data[index]
							+ ""
							+ "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#B9EA81'></span>"
							+ series_data[1].name[index]
							+ ":"
							+ series_data[1].data[index]
							+ ""
							+ "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00C0A3'></span>"
							+ series_data[2].name[index]
							+ ":"
							+ series_data[2].data[index];
					if(series_data[3].name[index] != undefined){
						tit += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#00C0A3'></span>"
								+ series_data[3].name[index]
								+ ":"
								+ series_data[3].data[index]
					}
					return tit;

				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "信息资源共享开放度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : "-8%",
				right : "58%",
				bottom : "5%",
				top : "15%",
				containLabel : !0
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				splitLine : {
					show : false
				},
				data : [ '开放信息资源', '共享信息资源' ],
				axisTick : {
					show : false,
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					show : false,
					lineStyle : {
						color : "#072543",
						width : 0
					}
				},
				axisLabel : {
					textStyle : {
						color : "#A9BDD6"
					},
					interval : 0
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
				type : 'value',
				position : 'left',
				min : 0,
//				max : 500,
				axisLabel : {
					show : false
				// formatter : "{value}",
				// textStyle : {
				// fontSize : 13,
				// color : "#00a0e8"
				// },
				// interval : 0
				},
				axisTick : {
					show : false,
					length : 0
				},
				splitLine : {
					show : false,
				},
				axisLine : {
					show : false,
				},
			// splitArea : {
			// show : !0,
			// areaStyle : {
			// color : [ "rgba(0,0,0,0.3)" ]
			// }
			// }
			} ],
			series : null
		};
		leftChart3 = echarts.init(document.getElementById("mid1"));
		var d = [];
		d.push({
			name : '业务事项数量',
			type : 'pie',
			tooltip : {
				trigger : 'item',
				formatter : '{a} <br/>{b} : {c} ({d}%)'
			},
			center : [ '64%', '62%' ],
			radius : [ 0, 40 ],
			label : {
				normal : {
					textStyle : {
						color : '#A9BDD6'
					}
				}
			},
			labelLine : {
				normal : {
					length2 : 10,
					lineStyle : {
						color : '#A9BDD6'
					}
				}
			},
			itemStyle : {
				normal : {
					labelLine : {
						length : 20
					}
				}
			},
			data : data_left3_2
		});

		$.each(series_data, function(a, e) {
			d.push({
				name : e.name,
				type : "bar",
				barWidth : "25%",
				// barGap:"50%",
				// barCategoryGap:"10%",
				stack : e.stack,
				itemStyle : {
					normal : {
						color : e.color
					}
				},
				data : e.data
			})
		});
		a.series = d;
		leftChart3.setOption(a);
		return leftChart3
	},
	mid2 : function() {
		var a = {
			title : {
				text : "信息资源满足难度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			color : "#76EE00 #c23531 #fee235 #FF34B3 #749f83 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #d48265 #FF34B3 #BF3EFF #546570 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),

			animationDuration : 5000,
			tooltip : {
				trigger : 'axis',
			},
			grid : {
				left : "3%",
				right : "3%",
				bottom : "3%",
				top : "27%",
				containLabel : !0
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				splitLine : {
					show : false
				},
				data : [ '信息资源', '信息资源可被满足', '信息资源被满足' ],
				axisTick : {
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#072543",
						width : 0
					}
				},
				axisLabel : {
					textStyle : {
						color : "#09b7ff"
					},
					interval : 0,
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
				name : "数量",
				type : 'value',
				position : 'left',
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#00a0e8"
					},
					interval : 0
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#00a0e8",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#00a0e8",
						width : 1,
						opacity : .2
					}
				},
			// splitArea : {
			// show : !0,
			// areaStyle : {
			// color : [ "rgba(0,0,0,0.3)" ]
			// }
			// }
			} ],
			series : [ {
				name : '数量',
				type : 'bar',
				data : [ 362, 279, 67 ]
			}, ]
		};
		var b = echarts.init(document.getElementById("mid2"));
		b.setOption(a);
		return b
	},
	loadIndustryCloud : function() {
		$("#mid3")
				.html(
						"\x3ca style\x3d'font-size:33px;'\x3e\u6279\u53d1\u548c\u96f6\u552e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:30px;'\x3e\u5236\u9020\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:28px;'\x3e\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:27px;'\x3e\u5efa\u7b51\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:26px;width:120px;'\x3e\u79d1\u5b66\u7814\u7a76\u3001\u6280\u672f\u670d\u52a1\u548c\u5730\u8d28\u52d8\u67e5\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u623f\u5730\u4ea7\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:24px;'\x3e\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u53ca\u90ae\u653f\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;width:120px;'\x3e\u4fe1\u606f\u4f20\u8f93\u3001\u8ba1\u7b97\u673a\u670d\u52a1\u548c\u8f6f\u4ef6\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;'\x3e\u5c45\u6c11\u670d\u52a1\u548c\u5176\u4ed6\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u91d1\u878d\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u6559\u80b2\x3c/a\x3e\x3ca style\x3d'font-size:19px;width:120px;'\x3e\u7535\u529b\u3001\u7164\u6c14\u53ca\u6c34\u7684\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:18px;width:120px;'\x3e\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u8d74\u76d1\x3c/a\x3e\x3ca style\x3d'font-size:18px;'\x3e\u91c7\u77ff\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:15px;width:120px;'\x3e\u536b\u751f\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u798f\u5229\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:14px;'\x3e\u516c\u5171\u7ba1\u7406\u548c\u793e\u4f1a\u7ec4\u7ec7\x3c/a\x3e");
		var a = $("#IndustrySurvialEx").height();
		loadLabelCloud("mid3", a / 2 - 40)
	},
	mid3 : function() {

		var wordData = [];
		var color = [ "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff" ];

		var index = 0;
		$.each(dataz.mid1, function(a, e) {
			index++;
			if (a >= color.length) {
				a = index - a;
			}

			wordData.push({
				name : e.NAME,
				value : [ e.TOTAL ],
				textStyle : {
					normal : {
						color : color[a]
					},
					emphasis : {
						fontWeight : "bolder"
					}
				}
			})
		});

		midChart1 = echarts.init(document.getElementById("mid3"));
		midChart1.setOption({
			animationDuration : 5000,
			title : {
				text : "被需求频率最高信息资源Top20",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "被需求频率最高信息资源Top20",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				textStyle : {},
				formatter : function(a, c, d) {
					c = a.data.value;
					return a.name + "<br/>被需求的信息资源数量(个):" + c[0]
				}
			},
			grid : {
				left : "3%",
				right : "4%",
				bottom : "3%",
				top : "27%",
				containLabel : !0,
				show : !1
			},
			series : [ {
				type : "wordCloud",
				gridSize : 8,
				// size : [ "100%", "100%" ],
				sizeRange : [ 12, 18 ],
				width : "100%",
				height : "100%",
				rotationRange : [ 0, 0 ],
				center : [ "40%", "47%" ],
				clickable : !0,
				shape : "circle",
				autoSize : {
					enable : !0,
					minSize : 12
				},
				data : wordData,
			} ],
			animationEasing : "Linear"
		});
		return midChart1
	},
	mid5 : function() {
		// 确定数据最大值,辅助轴最大值要大于数据最大值
		var max = Math.max.apply(null, dataz.right2.right2_data);
		max = max + 1;
		// 确定辅助轴data数组
		var aux_data = [];
		for (var i = 0; i < dataz.right2.right2_data.length; i++) {
			aux_data[i] = max;
		}
		var a = {
			color : "#ffb570 #76EE00 #c23531 #fee235 #FF34B3 #749f83 #f16e15 #fee235 #457bdb #bda29a #90d760 #d48265 #FF34B3 #BF3EFF #546570 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "供给信息资源最多政务部门Top10",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : 'axis',
				formatter : '{b0}<br />{a0}:{c0}'
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "供给信息资源最多政务部门Top10",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : "3%",
				right : "3%",
				bottom : "3%",
				top : "23%",
				containLabel : true
			},
			// visualMap: {
			// show: false,
			// min: 0,
			// max: 50,
			// dimension: 0,
			// inRange: {
			// color: ['#90d760', '#BF3EFF', '#211c49', '#546570', '#962364',
			// '#36cfd1']
			// }
			// },
			calculable : true,
			xAxis : [ {
				type : 'category',
				splitLine : {
					show : false
				},
				data : dataz.right2.right2_name,
				axisTick : {
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#4C6383",
						width : 2
					}
				},
				axisLabel : {
					textStyle : {
						color : "#A9BDD6"
					},
					// interval : 0,
					formatter : function(a) {
						return commonClass._jName(a);
					}
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			}, {
				// 辅助 x 轴
				show : false,
				data : dataz.right2.right2_name
			} ],
			yAxis : [ {
				type : 'value',
				position : 'left',
				axisLabel : {
					show : false
				// formatter : "{value}",
				// textStyle : {
				// fontSize : 13,
				// color : "#00a0e8"
				// },
				// interval : 0
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#182A40",
						width : 1,
						opacity : .8
					}
				},
				axisTick : {
					show : false,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#4C6383",
						width : 2,
					// opacity : .2
					}
				},
				max : max
			} ],
			series : [ {
				name : '本部门对其他政务部门信息资源需求量',
				type : 'bar',
				barWidth : '45%',
				data : dataz.right2.right2_data,
				itemStyle : {
					normal : {
						barBorderRadius : 20,
						color : 'rgba(255,209,103,0.8)',
						shadowColor : 'rgba(0, 0, 0, 0.4)',
						shadowBlur : 20
					}
				}
			}, {
				// 辅助系列
				type : 'bar',
				silent : true,
				xAxisIndex : 1,
				itemStyle : {
					normal : {
						barBorderRadius : 20,
						color : 'rgba(255,209,103,0.4)'
					}
				},
				barWidth : '45%',
				data : aux_data
			} ]
		};
		rightChart2 = echarts.init(document.getElementById("mid5"));
		rightChart2.setOption(a);
		return rightChart2
	}
};

function initNav(){

	$(".nav-slide-o").append("<ul>");
	$.each(orderNames,function(i1,n1){
		$.each(dataz_names.names,function(i2,n2){
			if(n2.NAME == orderNames[i1]){
				$(".nav-slide-o").append('<li><a href="/data-view-web/pages/page_7/page.html?tit='+n2.CODE+'&i='+i1+'"><span>'+n2.NAME+'</span></a></li>')
			}
		});
	});
	$(".nav-slide-o").append("</ul>");
};

/**
 * 根据code获取对应的委办局的排序位置
 * @param array
 * @param code
 * @returns
 */
function getNameIndex(array,code){
	var i = null;
	$.each(orderNames,function(i1,n1){
		$.each(array,function(i2,n2){
			if(n2.CODE == code && n2.NAME == orderNames[i1]){
				i = i1;
			}
		});
	});
	return i;
}