/*
	@page6
	@宏观经济分析
 */var _tmpData = null;
var dataz = null;
var leftChart1 = null;
var midChart1 = null, midChart2 = null;
var rightChart1 = null, rightChart2 = null;
var charts = new Array();
window.onload = function() {
	dataz = commonClass._commAjax('/page6/data');
	pageLoad();
	
	//动画
//	charts.push(leftChart1);
    charts.push(midChart1);
    charts.push(midChart2);
    charts.push(rightChart1);
    charts.push(rightChart2);
    
    animationAfterStill.autoPlay(charts);
};
function pageLoad() {
	$(".header_date").text(commonClass._getDate());
	leftCorPanel.init();
	rightCorPanel.init();
	middelCorPanel.init();
	window.onresize = function() {
		barEx.resize();
	}
}
var leftCorPanel = {
	init : function() {
		barEx = this.left();
	},

	left : function() {
		var a = {
			title : {
				text : "部门资源满足度",
				textStyle : {
					color : "#FFF",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : 'axis',
				formatter : "{b}<br /> <span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#F12E52'></span>{a0}: {c0}<br />" +
						"<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#FFD000'></span>{a1}: {c1}",
			// position:[10,10]
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "部门资源满足度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : '3%',
				right : '15%',
				bottom : '3%',
				containLabel : true
			},
			dataZoom : [
					{
						type : 'slider',
						yAxisIndex : 0,
						filterMode : 'filter',
						start : 90,
						end : 55,
						borderColor:'rgba(158,183,212,0.5)',
						backgroundColor : '#031019',
						dataBackground : {
							lineStyle : {
								color : '#9EB7D4',
								width : 1,
								opacity : 0.8
							},
							areaStyle : {
								color : '#9EB7D4',
								opacity : 0.3
							}
						},
//						showDataShadow : true,//默认'auto'
						handleIcon : 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
						handleSize : '100%',
						handleStyle : {
							color : '#fff',
							shadowBlur : 3,
							shadowColor : 'rgba(0, 0, 0, 0.1)',
							shadowOffsetX : 2,
							shadowOffsetY : 2,
							opacity : 0.8
						},
						width : 20,
						right : '3%'
					}, {
						type : 'inside',
						xAxisIndex : 0,
						filterMode : 'empty'
					}, {
						type : 'inside',
						yAxisIndex : 0,
						filterMode : 'empty'
					} ],
			xAxis : {
				type : 'value',
				splitLine : {
					show : false
//					lineStyle : {
//						color : "#00a0e8",
//						width : 1,
//						opacity : .2
//					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisLabel : {
					show : false
				},
				axisTick : {
					show : false
				}
			},
			yAxis : {
				type : 'category',
				axisLine : {
					onZero : false
				},
				boundaryGap : false,
				data : dataz.left1.left1_name,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					},
					// interval : 0,
					formatter : function(a) {

						return commonClass._jName(a);
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				}
			// splitArea : {
			// show : !0,
			// areaStyle : {
			// color : [ "rgba(0,0,0,0.3)" ]
			// }
			// }
			},
			series : [ {
				name : '信息资源需求量',
				type : 'line',
				smooth : true,
				lineStyle : {
					normal : {
						width : 3,
						color : '#F12E52',
						shadowColor : 'rgba(0,0,0,0.4)',
						shadowBlur : 10,
						shadowOffsetY : 10
					}
				},
				data : dataz.left1.left1_data1,
			}, {
				name : '信息资源已获取量',
				type : 'line',
				smooth : true,
				lineStyle : {
					normal : {
						width : 3,
						color : '#FFD000',
						shadowColor : 'rgba(0,0,0,0.4)',
						shadowBlur : 10,
						shadowOffsetY : 10
					}
				},
				data : dataz.left1.left1_data2,
			} ]
		}, 
		leftChart1 = echarts.init(document.getElementById("left"));
		// a.dataZoom.start += 5;
//		a.dataZoom.end += 5;
//		a.animation = false;
		leftChart1.setOption(a);
		charts.push(leftChart1);
		return leftChart1;
	}

}, rightCorPanel = {
	init : function() {
		pieIndustryAve = this.loadPieIndustryAve();
		bubbleIndustyr = this.loadPieIndustryAve1()
	},
	loadPieIndustryAve1 : function() {

		var datas = dataz.right1;
		series_data1 = [ {
			name : "数据库",
			stack : "no",
			color : "#F7C700",
			data : datas.right1_data1
		}, {
			name : "电子表格",
			stack : "no",
			color : "#56D780",
			data : datas.right1_data2
		}, {
			name : "图形图像",
			stack : "no",
			color : "#FE7A18",
			data : datas.right1_data3
		}, {
			name : "电子文件",
			stack : "no",
			color : "#6AADFC",
			data : datas.right1_data4
		}, {
			name : "流媒体",
			stack : "no",
			color : "#7977DA",
			data : datas.right1_data5
		}, {
			name : "其它",
			stack : "no",
			color : "#F12E52",
			data : datas.right1_data6
		}];

		rightChart1 = echarts.init(document.getElementById("ifram_right")), d = [], e = {
//			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
//					.split(" "),
			title : {
				text : "部门电子化存储程度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "部门电子化存储程度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			dataZoom : {
				type : 'slider',
				xAxisIndex : 0,
				filterMode : 'filter',
				start : 5,
				end : 45,
				borderColor:'rgba(158,183,212,0.5)',
				backgroundColor : '#031019',
				dataBackground : {
					lineStyle : {
						color : '#9EB7D4',
						width : 1,
						opacity : 0.8
					},
					areaStyle : {
						color : '#9EB7D4',
						opacity : 0.3
					}
				},
				handleIcon : 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize : '100%',
				handleStyle : {
					color : '#fff',
					shadowBlur : 3,
					shadowColor : 'rgba(0, 0, 0, 0.1)',
					shadowOffsetX : 2,
					shadowOffsetY : 2,
					opacity : 0.8
				},
				
				realtime : true,
				height : 20,
				bottom : '2%',
				
				// 顶部数字展示pzr
				itemStyle : {
					// 柱形图圆角，鼠标移上去效果
					emphasis : {
						barBorderRadius : [ 10, 10, 10, 10 ]
					},

					normal : {
						// 柱形图圆角，初始化效果
						barBorderRadius : [ 10, 10, 10, 10 ]
					}
				},
			},
			grid : {
				left : "15%",
				right : "10%",
				top : "20%",
				bottom : "20%",
				containLabel : !1
			},
			xAxis : [ {
				type : "category",
				data : datas.right1_name,
				axisTick : {
					alignWithLabel : !0,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisLabel : {
					textStyle : {
						color : "#c2d6ef"
					},
					// interval : 1,
					formatter : function(a) {
						return commonClass._jName(a);
					}
				},
				splitLine : {
					show : false,
				}
			} ],
			yAxis : {
//				name : "信息资源数量",
				type : "value",
				splitNumber : 5,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				}
			},
			series : null
		};

		$.each(series_data1, function(a, e) {
			d.push({
				name : e.name,
				yAxisIndex : 0,
				type : "bar",
				barWidth : "45%",
				stack : e.stack,
				itemStyle : {
					normal : {
						color : e.color
					}
				},
				data : e.data
			});
		});
		e.series = d;
		rightChart1.setOption(e);
	},
	loadPieIndustryAve : function() {
		var datas = dataz.right2;
		var maps = {
			series_data1 : [ {
				name : "国家垂直系统",
				stack : "提交",
				color : "#FF2950",
				data : datas.right2_data3
			}, {
				name : "省级系统",
				stack : "提交",
				color : "#FECD00",
				data : datas.right2_data4
			}, {
				name : "州级系统",
				stack : "提交",
				color : "#4ECAFB",
				data : datas.right2_data5
			}, {
				name : "市级系统",
				stack : "提交",
				color : "#ffb570",
				data : datas.right2_data6
			}, {
				name : "自行开发",
				stack : "提交",
				color : "#90d760",
				data : datas.right2_data7
			}]

//			series_data2 : [ {
//				name : "系统产生",
//				stack : "提交",
//				color : "#2EFF71",
//				data : datas.right2_data1
//			}, {
//				name : "非系统产生",
//				stack : "提交",
//				color : "#EAF1F9",
//				data : datas.right2_data2
//			} ]
		};

		rightChart2 = echarts.init(document.getElementById("IndustryAvearageEx")), d = [], e = {
			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "部门信息化建设程度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "部门信息化建设程度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			dataZoom : {
				type : 'slider',
				xAxisIndex : 0,
				filterMode : 'filter',
				realtime : true,
				start : 5,
				end : 45,
				borderColor:'rgba(158,183,212,0.5)',
				backgroundColor : '#031019',
				dataBackground : {
					lineStyle : {
						color : '#9EB7D4',
						width : 1,
						opacity : 0.8
					},
					areaStyle : {
						color : '#9EB7D4',
						opacity : 0.3
					}
				},
				handleIcon : 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize : '100%',
				handleStyle : {
					color : '#fff',
					shadowBlur : 3,
					shadowColor : 'rgba(0, 0, 0, 0.1)',
					shadowOffsetX : 2,
					shadowOffsetY : 2,
					opacity : 0.8
				},
				height : 20,
				bottom : '2%',
			},
			grid : {
				left : "15%",
				right : "10%",
				top : "20%",
				bottom : "20%",
				containLabel : !1
			},
			xAxis : [ {
				type : "category",
				data : datas.right2_name,
				axisTick : {
					show : false
//					alignWithLabel : !0,
//					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisLabel : {
					textStyle : {
						color : "#c2d6ef"
					},
					// interval : 7,
					formatter : function(a) {
						return commonClass._jName(a);
					}
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
//				name : "业务系统数量",
				type : "value",
				splitNumber : 5,
				min : 0,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				}
			// splitArea : {
			// show : !0,
			// areaStyle : {
			// color : [ "rgba(0,0,0,0.3)" ]
			// }
			// }
			}, {
//				name : "信息资源数量",
				type : "value",
				splitNumber : 5,
				min : 0,
				axisLabel : {
					show : false
//					formatter : "{value}",
//					textStyle : {
//						fontSize : 13,
//						color : "#00a0e8"
//					}
				},
				splitLine : {
					show : false,
//					lineStyle : {
//						color : "#00a0e8",
//						width : 1,
//						opacity : .2
//					}
				},
				axisLine : { 
					show : false
//					lineStyle : {
//						color : "#00a0e8",
//						width : 1,
//						opacity : .2
//					}
				},
				axisTick : {
					show : false
				}
			} ],
			series : null
		};
		$.each(maps.series_data1, function(a, e) {
			d.push({
				name : e.name,
				type : "bar",
				barWidth : "25%",
				stack : e.stack,
				itemStyle : {
					normal : {
						color : e.color
					}
				},
				data : e.data
			})
		});

//		$.each(maps.series_data2, function(a, e) {
//			d.push({
//				name : e.name,
//				type : "line",
//				stack : e.stack,
//				yAxisIndex : 1,
//				itemStyle : {
//					normal : {
//						color : e.color
//					}
//				},
//				data : e.data
//			})
//		});
		e.series = d;
		rightChart2.setOption(e);
	}
}, middelCorPanel = {
	init : function() {
		industryDesity = this.loadIndustryDesity();
		// industryCloud = this.loadIndustryDesity1();
		industryCloud1 = this.createFourRateEx();
	},
	createFourRateEx : function() {
		var total = [],mid1_data1 = [],mid1_data2 = [];
		$.each(dataz.mid1.mid1_code, function(a, e) {
			total.push({
				code : e,
				value : dataz.mid1.mid1_total[a]
			});
			mid1_data1.push({
				code : e,
				value : dataz.mid1.mid1_data1[a]
			});
			mid1_data2.push({
				code : e,
				value : dataz.mid1.mid1_data2[a]
			});
		});
		midChart1 = echarts.init(document.getElementById("fourRateEx")), d = [], e = {
			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "部门信息资源共享便捷度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
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
				top : 16,
				feature : {
					saveAsImage : {
						name : "部门信息资源共享便捷度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			grid : {
				right : "6%",
			},
			legend : {
				orient : 'horizontal',
				x : 'right',
				y : 'top',
				itemGap : 5,
				//[ '信息资源总量', '有系统支撑', '可共享', '可开放' ]
				data : [
					{
						name : '信息资源总量',
						textStyle : {
							color : '#908BFE'
						}
					},{
						name : '可共享',
						textStyle : {
							color : '#FF274E'
						}
					},{
						name : '可开放',
						textStyle : {
							color : '#FBCC00'
						}
					}]
			},
			calculable : true,
			dataZoom : {
				type : 'slider',
				xAxisIndex : 0,
				filterMode : 'filter',
				realtime : true,
				start : 5,
				end : 45,
				borderColor:'rgba(158,183,212,0.5)',
				backgroundColor : '#031019',
				dataBackground : {
					lineStyle : {
						color : '#9EB7D4',
						width : 1,
						opacity : 0.8
					},
					areaStyle : {
						color : '#9EB7D4',
						opacity : 0.3
					}
				},
				handleIcon : 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize : '100%',
				handleStyle : {
					color : '#fff',
					shadowBlur : 3,
					shadowColor : 'rgba(0, 0, 0, 0.1)',
					shadowOffsetX : 2,
					shadowOffsetY : 2,
					opacity : 0.8
				},
				height : 20,
				bottom : '2%',
				
			},
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : dataz.mid1.mid1_name,
				axisTick : {
					show : false
//					alignWithLabel : !0,
//					length : 0
				},
				axisLine : {
					color : "#c2d6ef",
					width : 1.5,
					opacity : .8
				},
				axisLabel : {
					textStyle : {
						color : "#c2d6ef"
					},
					// interval : 2,
					formatter : function(a) {
						return commonClass._jName(a);
					}
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
//				name : "信息资源数量",
				type : 'value',
				splitNumber : 5,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				}
			} ],
			series : [

			{
				name : '信息资源总量',
				type : 'line',
				itemStyle : {
					normal : {
						color : '#908BFE',
						areaStyle : {
							opacity : 0.3,
							type : 'default'
						}
					}
				},
				lineStyle : {
					normal : {
						color : '#908BFE',
						width : 1.5
					}
				},
				data : total
			}, {
				name : '可共享',
				type : 'line',
				smooth : true,
				itemStyle : {
					normal : {
						color : '#FF274E',
						areaStyle : {
							opacity : 0.3,
							type : 'default'
						}
					}
				},
				lineStyle : {
					normal : {
						color : '#FF274E',
						width : 1.5
					}
				},
				data : mid1_data1
			}, {
				name : '可开放',
				type : 'line',
				smooth : true,
				itemStyle : {
					normal : {
						color : '#FBCC00',
						areaStyle : {
							opacity : 0.3,
							type : 'default'
						}
					}
				},
				lineStyle : {
					normal : {
						color : '#FBCC00',
						width : 1.5
					}
				},
				data : mid1_data2

			} ]
		};

		midChart1.setOption(e);
		//下钻至第七屏对应委办局详情分析
		midChart1.on('click',function(params){
			location.href = '../page_7/page.html?tit=' + params.data.code;
		});
	},
	createFourTotalRateEx : function() {
		var c = echarts.init(document.getElementById("fourAndTotalEx")), d = [], e = {
			title : {
				text : "信息资源总量和四大库信息资源数量",
				textStyle : {
					fontSize : 15,
					color : "#018ccd",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				}
			},
			toolbox : {
				right : 16,
				top : 16,
				feature : {
					saveAsImage : {
						name : "信息资源总量和四大库信息资源数量",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : "30%",
				right : "0%",
				top : "20%",
				bottom : "20%",
				containLabel : !1
			},
			xAxis : [ {
				type : "category",
				data : a.xAxis_data,
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
				// interval : 0
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
				type : "value",
				min : 0,
				axisLine : {
					lineStyle : {
						color : "#072543"
					}
				},
				axisTick : {
					length : 10
				},
				axisLabel : {
					textStyle : {
						color : "#09b7ff"
					}
				},
				splitLine : {
					lineStyle : {
						color : "#031d34"
					}
				}
			} ],
			series : null
		};
		$.each(a.series_data, function(a, e) {
			d.push({
				name : e.name,
				type : "bar",
				barWidth : "25%",
				stack : e.stack,
				itemStyle : {
					normal : {
						color : e.color
					}
				},
				data : e.data
			})
		});
		e.series = d;

		c.setOption(e);

		c.on('dataZoom', function(params) {
			alert(1)
		});
	},

	loadIndustryDesity : function() {
		var mid2_data1 = [],mid2_data2 = [];
		$.each(dataz.mid2.mid2_code1, function(a, e) {
			mid2_data1.push({
				code : e,
				value : dataz.mid2.mid2_data1[a]
			});
		});
		$.each(dataz.mid2.mid2_code2, function(a, e) {
			mid2_data2.push({
				code : e,
				value : dataz.mid2.mid2_data2[a]
			});
		});
		
		midChart2 = echarts.init(document.getElementById("IndustryDesIncreEx")), d = [], e = {
			color : "#00BFFF #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "部门资源依赖度对比",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					animation : false
				}
			},
			toolbox : {
				right : 16,
				top : 16,
				feature : {
					saveAsImage : {
						name : "部门资源依赖度对比",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			dataZoom : [ {
				type : 'slider',
				xAxisIndex : [0,1],
				filterMode : 'filter',
				realtime : true,
				start : 5,
				end : 45,
				borderColor:'rgba(158,183,212,0.5)',
				backgroundColor : '#031019',
				dataBackground : {
					lineStyle : {
						color : '#9EB7D4',
						width : 1,
						opacity : 0.8
					},
					areaStyle : {
						color : '#9EB7D4',
						opacity : 0.3
					}
				},
				handleIcon : 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize : '100%',
				handleStyle : {
					color : '#fff',
					shadowBlur : 3,
					shadowColor : 'rgba(0, 0, 0, 0.1)',
					shadowOffsetX : 2,
					shadowOffsetY : 2,
					opacity : 0.8
				},
				height : 20,
				bottom : '2%'
			}, {
				type : 'inside',
				realtime : true,
				start : 30,
				end : 70,
				xAxisIndex : [ 0, 1 ]
			} ],
			grid : [ {
				left : 60,
				right : 50,
				height : '28%'
			}, {
				left : 60,
				right : 50,
				top : '58%',
				height : '30%'
			} ],
			xAxis : [ {
				type : 'category',
				// boundaryGap : false,
				data : dataz.mid2.mid2_name2,
				// silent: false,
				// axisLine: {onZero: true},
				splitArea : {
					show : false
				},
				axisTick : {
					show : false
//					alignWithLabel : !0,
//					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisLabel : {
					show : false,
					textStyle : {
						color : "#c2d6ef"
					},
					// interval : 3,
//					formatter : function(a) {
//						return commonClass._jName(a);
//					}
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : "#072543"
					}
				}
			}, {
				gridIndex : 1,
				type : 'category',
				// boundaryGap : false,
				axisLine : {
					onZero : true
				},
				data : dataz.mid2.mid2_name1,
				position : 'top',
				splitArea : {
					show : false
				},
				axisTick : {
					show : false,
//					alignWithLabel : !0,
//					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisLabel : {
					show : false,
//					textStyle : {
//						color : "#09b7ff"
//					},
//					formatter : function(a) {
//						return commonClass._jName(a);
//					}
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
//				name : '被需求信息资源数量',
				type : 'value',
				splitNumber : 5,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				}
			}, {
				gridIndex : 1,
//				name : '需求信息资源数量',
				splitNumber : 5,
				type : 'value',
				inverse : true,
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					}
				},
				splitLine : {
					show : !0,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				}
			} ],
			series : [ {
				name : '被需求信息资源数量',
				type : 'bar',
				itemStyle : {
					normal : {
						color : '#F7C700'
					}
				},
				symbolSize : 8,
				hoverAnimation : false,
				data : mid2_data2,
			}, {
				name : '需求信息资源数量',
				type : 'bar',
				itemStyle : {
					normal : {
						color : '#54C7FD'
					}
				},
				xAxisIndex : 1,
				yAxisIndex : 1,
				symbolSize : 8,
				hoverAnimation : false,
				data : mid2_data1,

			} ]
		};
		midChart2.setOption(e);
		//下钻至第七屏对应委办局详情分析
		midChart2.on('click',function(params){
			location.href = '../page_7/page.html?tit=' + params.data.code;
		});
	},
	loadIndustryDesity1 : function() {
		var a;
		var itemStyle = {
			normal : {},
			emphasis : {
				barBorderWidth : 1,
				shadowBlur : 10,
				shadowOffsetX : 0,
				shadowOffsetY : 0,
				shadowColor : 'rgba(0,0,0,0.5)'
			}
		};
		var c = echarts.init(document.getElementById("IndustryDesIncreEx1")), d = [], e = {
			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			tooltip : {},
			dataZoom : {
				show : true,
				realtime : true,
				start : 0,
				end : 100
			},
			animationDuration : 5000,
			xAxis : {
				data : [ '市发展和改革委员会', '市经济和信息化委员会', '市公安局', '市民政局', '市司法局',
						'市规划管理局', '市交通运输委员会', '市林业和园林管理局', '市工商局', '市旅游局',
						'市城市管理委员会', '市城乡房产管理局', '市国有资产监督管理委员会', '市残疾人联合会',
						'市防震减灾局', '市教育局', '市科学技术局', '市财政局', '市国土资源局',
						'市人力资源和社会保障局', '市城乡建设委员会', '市水务局', '市商务委',
						'市文化广电新闻出版局', '市卫生和计划生育委员会', '市环境保护局', '市统计局',
						'市食品药品监督管理局', '市国税局', '市地税局', '市安全生产监督管理局',
						'市住房公积金管理中心', '市金融工作办公室', '市应急办', '市质监局', '市人民政府政务服务中心' ],
				silent : false,
				axisLine : {
					onZero : true
				},
				splitLine : {
					show : false
				},
				splitArea : {
					show : false
				},
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
				// interval : 3
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			},
			yAxis : {
				name : "需求信息资源数量",

				inverse : true,
				splitArea : {
					show : false
				},
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
			},
			grid : {
				left : "5%",
				right : "4%",
				bottom : "30%",
				top : "3%",
				containLabel : !0,
				show : !1
			},
			series : [ {
				name : '需求信息资源数量',
				type : 'bar',
				stack : 'one',
				itemStyle : itemStyle,
				data : [ 103, 63, 558, 20, 34, 31, 18, 15, 11, 24, 97, 38, 21,
						19, 21, 29, 41, 50, 39, 299, 37, 60, 43, 25, 85, 45,
						122, 71, 231, 58, 72, 31, 26, 128, 15, 17 ]
			} ]
		};
		c.setOption(e);
	},
	loadIndustryCloud : function() {
		$("#IndustrySurvialEx")
				.html(
						"\x3ca style\x3d'font-size:33px;'\x3e\u6279\u53d1\u548c\u96f6\u552e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:30px;'\x3e\u5236\u9020\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:28px;'\x3e\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:27px;'\x3e\u5efa\u7b51\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:26px;width:120px;'\x3e\u79d1\u5b66\u7814\u7a76\u3001\u6280\u672f\u670d\u52a1\u548c\u5730\u8d28\u52d8\u67e5\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u623f\u5730\u4ea7\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:24px;'\x3e\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u53ca\u90ae\u653f\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;width:120px;'\x3e\u4fe1\u606f\u4f20\u8f93\u3001\u8ba1\u7b97\u673a\u670d\u52a1\u548c\u8f6f\u4ef6\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;'\x3e\u5c45\u6c11\u670d\u52a1\u548c\u5176\u4ed6\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u91d1\u878d\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u6559\u80b2\x3c/a\x3e\x3ca style\x3d'font-size:19px;width:120px;'\x3e\u7535\u529b\u3001\u7164\u6c14\u53ca\u6c34\u7684\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:18px;width:120px;'\x3e\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u8d74\u76d1\x3c/a\x3e\x3ca style\x3d'font-size:18px;'\x3e\u91c7\u77ff\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:15px;width:120px;'\x3e\u536b\u751f\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u798f\u5229\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:14px;'\x3e\u516c\u5171\u7ba1\u7406\u548c\u793e\u4f1a\u7ec4\u7ec7\x3c/a\x3e");
		var a = $("#IndustrySurvialEx").height();
		loadLabelCloud("IndustrySurvialEx", a / 2 - 40)
	},
	laodIndustryCloudLable : function() {
		var a = echarts.init(document.getElementById("IndustrySurvialEx"));
		a
				.setOption({
					animationDuration : 5000,
					title : {
						text : "\u884c\u4e1a\u4f01\u4e1a\u5e73\u5747\u5b58\u6d3b\u5e74\u9650",
						textStyle : {
							fontSize : 15,
							color : "#018ccd",
							fontWeight : "normal",
							fontFamily : "Microsoft YaHei"
						}
					},
					dataZoom : {
						show : true,
						realtime : true,
						start : 0,
						end : 100
					},
					tooltip : {
						textStyle : {},
						formatter : function(a, c, d) {
							c = a.data.value;
							return a.name
									+ "\x3cbr\x3e\u4f01\u4e1a\u6570(\u5bb6):"
									+ c[0]
									+ "\x3cbr\x3e\u5b58\u6d3b\u5e74\u9650(\u5e74):"
									+ c[1]
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
						gridSize : 12,
						size : [ "100%", "100%" ],
						sizeRange : [ 12, 66 ],
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
						data : [
								{
									name : "\u79d1\u5b66\u7814\u7a76\u3001\u6280\u672f\u670d\u52a1\u548c\u5730\u8d28\u52d8\u67e5\u4e1a",
									value : [ 11236, 3.6 ],
									textStyle : {
										normal : {
											color : "#026bb8"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u5236\u9020\u4e1a",
									value : [ 34374, 6.5 ],
									textStyle : {
										normal : {
											color : "#026bb8"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u6279\u53d1\u548c\u96f6\u552e\u4e1a",
									value : [ 64784, 5.4 ],
									textStyle : {
										normal : {
											color : "#b6ff00"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a",
									value : [ 17734, 4.1 ],
									textStyle : {
										normal : {
											color : "#0ebcf6"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a",
									value : [ 5852, 5.1 ],
									textStyle : {
										normal : {
											color : "#f00"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u53ca\u90ae\u653f\u4e1a",
									value : [ 4758, 6.2 ],
									textStyle : {
										normal : {
											color : "#34b647"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u4fe1\u606f\u4f20\u8f93\u3001\u8ba1\u7b97\u673a\u670d\u52a1\u548c\u8f6f\u4ef6\u4e1a",
									value : [ 1112, 5.6 ],
									textStyle : {
										normal : {
											color : "#486497"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u623f\u5730\u4ea7\u4e1a",
									value : [ 4950, 5.2 ],
									textStyle : {
										normal : {
											color : "#ff6a00"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u5c45\u6c11\u670d\u52a1\u548c\u5176\u4ed6\u670d\u52a1\u4e1a",
									value : [ 3836, 6.6 ],
									textStyle : {
										normal : {
											color : "#d1d74d"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u91d1\u878d\u4e1a",
									value : [ 2122, 9.8 ],
									textStyle : {
										normal : {
											color : "#087ba5"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a",
									value : [ 1488, 3.7 ],
									textStyle : {
										normal : {
											color : "#02ef50"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a",
									value : [ 1387, 6.9 ],
									textStyle : {
										normal : {
											color : "#338f13"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u6559\u80b2",
									value : [ 521, 2.4 ],
									textStyle : {
										normal : {
											color : "#338f13"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u7535\u529b\u3001\u7164\u6c14\u53ca\u6c34\u7684\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a",
									value : [ 503, 5.2 ],
									textStyle : {
										normal : {
											color : "#669abd"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u8d74\u76d1",
									value : [ 471, 5.8 ],
									textStyle : {
										normal : {
											color : "#d09d34"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u91c7\u77ff\u4e1a",
									value : [ 280, 10.6 ],
									textStyle : {
										normal : {
											color : "#0879a3"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u536b\u751f\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u798f\u5229\u4e1a",
									value : [ 203, 4.2 ],
									textStyle : {
										normal : {
											color : "#9a5a12"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								},
								{
									name : "\u516c\u5171\u7ba1\u7406\u548c\u793e\u4f1a\u7ec4\u7ec7",
									value : [ 4, 12.8 ],
									textStyle : {
										normal : {
											color : "#c9d019"
										},
										emphasis : {
											fontWeight : "bolder"
										}
									}
								} ]
					} ],
					animationEasing : "Linear"
				});
		return a
	}
};