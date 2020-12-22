/*
	@page3
	@宏观经济分析
 */var _tmpData = null;
var dataz = null;
var dataz_mid = null;
var leftChart1 = null, leftChart2 = null, leftChart3 = null;
var rightChart1 = null, rightChart2 = null;
var midChart1 = null;
window.onload = function() {
	dataz = commonClass._commAjax('/page3/data');
	dataz_mid = commonClass._commAjax('/page3/data_iframe_mid');
	pageLoad();
	
	//动画
	var charts = new Array();
	charts.push(leftChart1);
    charts.push(leftChart3);
    charts.push(midChart1);
    charts.push(rightChart1);
    charts.push(rightChart2);
    
    animationAfterStill.autoPlay(charts);
};
window.onresize = function(){
	$(".corporation_left").height('-webkit-calc(100% - 61px)');
	$(".corporation_left").height('calc(100% - 61px)');
	$(".corporation_left").width('-webkit-calc(27%)');
	$(".corporation_left").width('calc(27%)');
	leftChart1.resize();
//	leftChart2.resize();
	leftChart3.resize();
	rightChart1.resize();
	rightChart2.resize();
	midChart1.resize();
};
function pageLoad() {
	$(".header_date").text(commonClass._getDate());
	leftCorPanel.init();
	rightCorPanel.init();
	middelCorPanel.init();
};

var middelCorPanel = {
	init : function() {
		mid2 = this.mid2();
	},
	mid2 : function(){
		var lines = [];
		$.each(dataz_mid.mid1.line, function(index, value, array) {
			if(null != value){
				lines.push({source: value.NAME1, target: value.NAME2, weight: 1, name: '需求'});
//				lines.push({source: value.name1_1, target: value.name2_2, weight: 1, name: '需求'});
			}		
		});
		var colors = "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" ");
		var names = [];
		$.each(dataz_mid.mid1.name, function(i, n) {
			var size = 17;
			$.each(lines,function(index,line){
				if(n.NAME == line.source || n.NAME == line.target){
					size += 0.1;
				}
			});	
			names.push({name : n.NAME,
//						"label" : commonClass._jName(n.name)
						symbolSize : size>30?30:size,
						itemStyle : {
							normal : {
								color : colors[i],
							}
						}
			});
		});
		
		midChart1 = echarts.init(document.getElementById("mid2")), d = [], e = {
			
			title : {
				text : "",
				textStyle : {
					fontSize : 15,
					color : "#018ccd",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			toolbox : {
				right : 16,
				itemSize : 16,
				feature : {
					saveAsImage : {
						name : '信息资源部门依赖关系分析',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
//						iconStyle : {
//							normal : {
//								color : '#A4AAB3',
//							}
//						},
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
		        trigger: 'item',
		        formatter: function (params) {
		            if (params.dataType == 'edge') {    // is edge
		            	return params.data.target + ' ' + params.data.name + ' ' + params.data.source
		            } else {    // is node
		            	return params.data.name
		            }
		        }
		    },
		    
		    series: [{
	            name: '信息资源部门依赖关系分析',
	            type: 'graph',
	            layout: 'circular',
	            circular: {
	                rotateLabel: true,
	            },
	            data: names.sort(function(a,b){return a.symbolSize-b.symbolSize}),
	            links: lines,
	            roam: 'scale',
	            width : '62%',
	            height : '62%',
	            hoverAnimation : true,
	            symbol : 'circle',
	            focusNodeAdjacency: true,
	            markPoint : {},
	            label: {
	                normal: {
	                	show: true,
	                    position: 'right',
	                    textStyle: {
	                        color: '#00a0e8',
	                    },
	                    formatter: function(n){
	                    	return commonClass._jName(n.name);
	                    },
	                },
	               emphasis : {
	            	   show: true
	               }
	            },
	            lineStyle: {
	                normal: {
	                    color: '#00a0e8',
	                    curveness: 0.3
	                },
	                emphasis: {
	                    linkStyle : {}
	                }
	            }
	        }]
		};
		midChart1.setOption(e);
	}

}, leftCorPanel = {
	init : function() {
		PieIndustryPer = this.infoNeedRatePre();
		pieIndustryAve = this.loadPieIndustryAve();
		bubbleIndustyr = this.loadBubbleIndustry();
	},
	infoNeedRatePre : function() {
		var total = 0;
		var isf = 0;

		if (dataz.left1 != null && dataz.left1 != '') {
			total = dataz.left1[0].VALUE;
			isf = dataz.left1[1].VALUE;
		}

		var radius = 0;
		if (total != 0) {
			radius = ((isf * 100) / total).toFixed(2);
		}
		
		//百分比数值的位置
		var position = '';
		if(radius >= 50){
			position = 'inside';
		}else if(radius < 50){
			position = 'right';
		}
		
		leftChart1 = echarts.init(document.getElementById("infoNeedRate")), d = [], e = {
			title : {
				text : "信息资源需求被满足度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			toolbox : {
				right : 16,
				itemSize : 16,
				feature : {
					saveAsImage : {
						name : '信息资源需求被满足度',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
//						iconStyle : {
//							normal : {
//								color : '#A4AAB3',
//							}
//						},
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				position : [ 10, 10 ],
				formatter : function(a) {
					return '已获取到信息资源需求量:' + isf + '<br/>' + '信息资源需求量:' + total
				}
			},
			grid : {
				top : '40%',
				bottom : '8%',
				left : '8%',
				right : '8%',
				height : document.getElementById("infoNeedRate").offsetHeight * 0.5,
				containLabel : false
			},
			xAxis : {
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
			yAxis : [{
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
			},{
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
			}],
			series : [
					{
						name : '已获取信息资源需求量比例',
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
									fontWeight : 'bold',
									fontFamily : 'Microsoft YaHei',
									fontSize : 35
								}
							}
						},
						itemStyle : {
							normal : {
								barBorderRadius : [5,0,0,5],
								shadowBlur : 10,
								shadowColor : '#111',
								color : '#2FD04F'
							}
						},
						data : [ radius ],
						z : 10
					},{
						type : 'bar',
						barWidth : '100%',
						yAxisIndex : 1,
						silent : true,
						// barMaxWidth: '100%',
						itemStyle : {
							normal : {
								barBorderRadius : 5,
								color : '#42475B'
							}
						},
						data : [100],
					}]

		};
		leftChart1.setOption(e);
		//点击下钻到第六屏
		leftChart1.on('click',function(){
			location.href='../page_6/page.html';
		});
	},
	loadPieIndustryAve : function() {
		var a = {
			title : {
				text : "信息资源需求数据要求分析",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 2500,
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '信息资源需求数据要求分析',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				trigger : 'axis'
			},
			grid : {
				left : "5%",
				right : "5%",
				bottom : "15%",
				top : "25%",
				containLabel : false,
				show : false,
				borderColor : "#031d34"
			},
			legend : {
				show : true,
				orient : 'vertical',
				right : '10%',
				y : 'top',
				itemGap : 5,
				data : [
					{
						name : '供给信息资源',
						textStyle : {
							color : '#FFC402'
						}
					},{
						name : '需求信息资源',
						textStyle : {
							color : '#FF5F56'
						}
					}]
			},
			xAxis : {
				type : 'category',
				boundaryGap : false,
				data : ["年","季","月","天","实时","其他" ],
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
					interval : 0,
				// formatter: function(a){
				//								
				// return commonClass._jName(a);
				// }
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			},
			yAxis : {
				type : 'value',
				position : 'left',
				axisLabel : {
					show : false,
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					},
					interval : 1
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
			series : [ {
				name : '供给信息资源',
				type : 'line',
				lineStyle : {
					normal : {
						color : '#FFC402'
					}
				},
				itemStyle : {
					normal : {
						color : '#FFC402'
					}
				},
				data : dataz.left3.data2,
			}, {
				name : '需求信息资源',
				type : 'line',
				lineStyle : {
					normal : {
						color : '#FF5F56'
					}
				},
				itemStyle : {
					normal : {
						color : '#FF5F56'
					}
				},
				data : dataz.left3.data1,
			} ]
		};
		leftChart3 = echarts.init(document.getElementById("IndustryAvearageEx"));
		leftChart3.setOption(a);
		return leftChart3;
	},
	loadBubbleIndustry : function() {
		var stackBar = {
			xAxis_data1 : dataz.right1.infname,
			series_data1 : [ {
				name : "被需求次数",
				stack : "no",
				color : "#d13e44",
				data : []
			} ],
		};
		
		$.each(dataz.right1.depcode,function(i,n){
			stackBar.series_data1[0].data.push({
				depcode: dataz.right1.depcode[i],
				depname: dataz.right1.depname[i],
				value: dataz.right1.data[i]
			});
			
		});
		rightChart1 = echarts.init(document.getElementById("infoBubbleEx")), d = [], e = {
			title : {
				text : "需求频率最高信息资源Top20",
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
						name : '需求频率最高信息资源Top20',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				},
				formatter : function(params){
					return params[0].name + "\x3cbr\x3e被需求次数:" + params[0].data.value
					+ "\x3cbr\x3e从属政务部门:" + params[0].data.depname;
				}
			},
			animationDuration : 5000,
			grid : {
				left : "10%",
				right : "10%",
				top : "15%",
				bottom : "8%",
				containLabel : !1
			},
			xAxis : [ {
				type : "category",
				position : 'bottom',
				data : stackBar.xAxis_data1,
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
					show : false,
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			yAxis : [ {
				// name:"需求次数",
				type : 'value',
				position : 'left',
				axisLabel : {
					show : false,
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#00a0e8"
					},
					interval : 0
				},
				splitLine : {
					show : true,
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				},
				axisTick : {
					show : false,
					length : 0
				},
				axisLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				}
			} ],
			series : null
		};
		$.each(stackBar.series_data1, function(a, e) {
			d.push({
				name : e.name,
				type : "bar",
				barWidth : "50%",
				stack : e.stack,
				itemStyle : {
					normal : {
						color : "#50DBCA"
					}
				},
				data : e.data
			})
		});
		e.series = d;
		rightChart1.setOption(e);
		//下钻至对应委办局详情分析
		rightChart1.on('click',function(params){
//			console.info(params);
			//切分参考打印信息
			var tit = params.data.depcode;
			location.href='../page_7/page.html?tit=' + tit;
		});
	}
}, rightCorPanel = {
	init : function() {
		industryDesity = this.loadIndustryDesity();
		// industryCloud = this.laodIndustryCloudLable();
//		mid1 = this.mid1();
	},
	
	loadIndustryDesity : function() {
		var seriesData = [];
		$.each(dataz.right2.depcode,function(i,n){
			seriesData.push({
				depcode: dataz.right2.depcode[i],
				depname: dataz.right2.depname[i],
				value: dataz.right2.data[i]
			});
			
		});
		
		a = {
			color : "#fee235 #FF34B3 #749f83 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #00BFFF #d48265 #76EE00 #FF34B3 #BF3EFF #546570 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "需求信息资源最多业务事项Top20",
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
						name : '需求信息资源最多业务事项Top20',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				},
				formatter : function(params) {
					return params[0].name + "\x3cbr\x3e被需求次数:" + params[0].data.value
					+ "\x3cbr\x3e从属政务部门:" + params[0].data.depname;
				}
			},
			animationDuration : 5000,
			grid : {
				left : "10%",
				right : "10%",
				top : "15%",
				bottom : "8%",
				containLabel : !1
			},
			xAxis : [ {
				type : 'category',
				data : dataz.right2.busname,
				splitLine : {
					show : false,
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
					show : false,
					length : 0
				},
				axisLabel : {
					show : false,
				},
			} ],
			yAxis : [ {
				// name:"需求信息资源",
				type : 'value',
				position : 'left',
				axisLabel : {
					show : false,
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#00a0e8"
					},
				},
				axisTick : {
					show : false,
					length : 0
				},
				splitLine : {
					show : true,
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
				}
			} ],
			series : [ {
				name : '需求信息资源',
				type : 'bar',
				barWidth : '50%',
				itemStyle : {
					normal : {
						color : "#FEECC1"
					}
				},
				data : seriesData
			}]
		};
		rightChart2 = echarts.init(document.getElementById("IndustryDesIncreEx"));
		rightChart2.setOption(a);
		//下钻至对应委办局详情分析
		rightChart2.on('click',function(params){
//			console.info(params);
			var tit = params.data.depcode;
			location.href='../page_7/page.html?tit=' + tit;
		});
		return rightChart2;
	},

	laodIndustryCloudLable : function() {
		var a = echarts.init(document.getElementById("IndustrySurvialEx"));
		a.setOption({
			animationDuration : 5000,
			title : {
				text : "信息资源需求热度分析",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				textStyle : {},
				formatter : function(a, c, d) {
					c = a.data.value;
					return a.name + "\x3cbr\x3e影响部门个数:" + c[0]
							+ "\x3cbr\x3e被需求信息资源数量:" + c[1]
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
				size : [ "10%", "10%" ],
				sizeRange : [ 8, 26 ],
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
				data : [ {
					name : "市发展和改革委员会",
					value : [ 3, 75 ],
					textStyle : {
						normal : {
							color : "#f16e15"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市经济和信息化委员会",
					value : [ 6, 65 ],
					textStyle : {
						normal : {
							color : "#026bb8"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市公安局",
					value : [ 2, 34 ],
					textStyle : {
						normal : {
							color : "#b6ff00"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市民政局",
					value : [ 7, 83 ],
					textStyle : {
						normal : {
							color : "#0ebcf6"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市司法局",
					value : [ 9, 66 ],
					textStyle : {
						normal : {
							color : "#f00"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市规划管理局",
					value : [ 5, 64 ],
					textStyle : {
						normal : {
							color : "#34b647"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市交通运输委员会",
					value : [ 1, 11 ],
					textStyle : {
						normal : {
							color : "#486497"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市林业和园林管理局",
					value : [ 4, 4 ],
					textStyle : {
						normal : {
							color : "#ff6a00"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市工商局",
					value : [ 6, 82 ],
					textStyle : {
						normal : {
							color : "#d1d74d"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市旅游局",
					value : [ 2, 77 ],
					textStyle : {
						normal : {
							color : "#087ba5"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市城市管理委员会",
					value : [ 2, 89 ],
					textStyle : {
						normal : {
							color : "#02ef50"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市城乡房产管理局",
					value : [ 6, 90 ],
					textStyle : {
						normal : {
							color : "#fee235"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市国有资产监督管理委员会",
					value : [ 4, 78 ],
					textStyle : {
						normal : {
							color : "#457bdb"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市残疾人联合会",
					value : [ 0, 75 ],
					textStyle : {
						normal : {
							color : "#bda29a"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市防震减灾局",
					value : [ 6, 51 ],
					textStyle : {
						normal : {
							color : "#ffb570"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市教育局",
					value : [ 8, 27 ],
					textStyle : {
						normal : {
							color : "#90d760"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市科学技术局",
					value : [ 5, 31 ],
					textStyle : {
						normal : {
							color : "#81c3ff"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市财政局",
					value : [ 0, 74 ],
					textStyle : {
						normal : {
							color : "#c23531"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市国土资源局",
					value : [ 6, 59 ],
					textStyle : {
						normal : {
							color : "#fee235"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市人力资源和社会保障局",
					value : [ 0, 20 ],
					textStyle : {
						normal : {
							color : "#00BFFF"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市城乡建设委员会",
					value : [ 4, 87 ],
					textStyle : {
						normal : {
							color : "#d48265"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市水务局",
					value : [ 3, 76 ],
					textStyle : {
						normal : {
							color : "#76EE00"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市商务委",
					value : [ 0, 97 ],
					textStyle : {
						normal : {
							color : "#749f83"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市文化广电新闻出版局",
					value : [ 7, 95 ],
					textStyle : {
						normal : {
							color : "#FF34B3"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市卫生和计划生育委员会",
					value : [ 6, 60 ],
					textStyle : {
						normal : {
							color : "#BF3EFF"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市环境保护局",
					value : [ 6, 82 ],
					textStyle : {
						normal : {
							color : "#546570"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市统计局",
					value : [ 5, 27 ],
					textStyle : {
						normal : {
							color : "#00EE00"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市食品药品监督管理局",
					value : [ 8, 83 ],
					textStyle : {
						normal : {
							color : "#211c49"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市国税局",
					value : [ 2, 22 ],
					textStyle : {
						normal : {
							color : "#962364"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市地税局",
					value : [ 2, 33 ],
					textStyle : {
						normal : {
							color : "#8fad4a"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市安全生产监督管理局",
					value : [ 6, 25 ],
					textStyle : {
						normal : {
							color : "#36cfd1"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市住房公积金管理中心",
					value : [ 8, 44 ],
					textStyle : {
						normal : {
							color : "#7f3900"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市金融工作办公室",
					value : [ 4, 67 ],
					textStyle : {
						normal : {
							color : "#CFB300"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市应急办",
					value : [ 0, 14 ],
					textStyle : {
						normal : {
							color : "#0193F5"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市质监局",
					value : [ 7, 46 ],
					textStyle : {
						normal : {
							color : "#4CAF50"
						},
						emphasis : {
							fontWeight : "bolder"
						}
					}
				}, {
					name : "市人民政府政务服务中心",
					value : [ 2, 56 ],
					textStyle : {
						normal : {
							color : "#D8D662"
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