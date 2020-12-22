/*
	@page2
	@宏观经济分析
 */var _tmpData = null;
var dataz = null;
var leftChart1 = null, leftChart2 = null, leftChart3 = null;
var rightChart1 = null, rightChart2 = null;
var midChart1 = null, midChart2 = null;
window.onload = function() {
	dataz = commonClass._commAjax('/page2/data');
	pageLoad();
	
	//动画
	var charts = new Array();
	charts.push(leftChart1);
    charts.push(leftChart2);
    charts.push(leftChart3);
    charts.push(rightChart1);
    charts.push(rightChart2);
    
    animationAfterStill.autoPlay(charts);
};
window.onresize = function(){
	leftChart1.resize();
	leftChart2.resize();
	leftChart3.resize();
	rightChart1.resize();
	rightChart2.resize();
	midChart1.resize();
	midChart2.resize();
};

function pageLoad() {
	$(".header_date").text(commonClass._getDate());
	leftCorPanel.init();
	rightCorPanel.init();
	middelCorPanel.init();
};
var leftCorPanel = {
	init : function() {
		barEx = this.createInfoNeedEx();
		barEx1 = this.createInfoResourceRateEx();
		radarEx = this.createInfoResourceShareEx();
		dieBarex = this.createInfoResourceRateExs();
	},
	createInfoResourceShareEx : function() {
		var data_left2 = [];
		$.each(dataz.left2,function(i,n){
			if(n.NAME != undefined){
				data_left2.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		leftChart2 = echarts.init(document.getElementById("infoResourceShareEx")), d = [], e = {
			color : ['#11A9FC','#FCAF3D','#62D587','#FFD87D','#8E6EDB','#EA1F61'],
			title : {
				text : "信息资源开放等级",
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
						name : '信息资源共享方式',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c} ({d}%)"
			},
			series : [ {
				name : '信息资源获取方式',
				type : 'pie',
				radius : [ '28%', '70%' ],
				center : [ "45%", "57%" ],
				minAngle : 3,
				clockwise : true,
				startAngle : 90,
				data : data_left2,
				label: {
	                normal: {		                    
	                    show: true,
	                    position: 'outside',
	                },
	                emphasis: {
	                    show: true,
	                    position: 'outside',
	                    textStyle: {
	                        fontSize: '14',
	                        fontWeight: 'normal'
	                    }
	                }
	            },
	            labelLine :{
                	normal : {
                		length : 10,
                		length2 : 20	
                	},
                },
	            itemStyle: {
	            	normal : {
	            		borderWidth: 2,
	                	borderColor: '#03162B',
	            	},
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
			} ]
		};
		leftChart2.setOption(e);
	},
	createInfoNeedEx : function() {
		var data_left1 = [];
		$.each(dataz.left1,function(i,n){
			if(n.NAME != undefined){
				data_left1.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		leftChart1 = echarts.init(document.getElementById("fourAndTotalEx")), d = [], e = {
			color : ['#11A9FC','#FCAF3D','#62D587','#FFD87D','#8E6EDB','#EA1F61'],
			title : {
				text : "信息资源共享方式",
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
						name : '信息资源共享方式',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c} ({d}%)"
			},
			series : [ {
				name : '信息资源获取方式',
				type : 'pie',
				radius : [ '28%', '70%' ],
				center : [ "45%", "57%" ],
				minAngle : 3,
				clockwise : true,
				startAngle : 90,
				data : data_left1,
				label: {
	                normal: {		                    
	                    show: true,
	                    position: 'outside',
	                },
	                emphasis: {
	                    show: true,
	                    position: 'outside',
	                    textStyle: {
	                        fontSize: '14',
	                        fontWeight: 'normal'
	                    }
	                }
	            },
	            labelLine :{
                	normal : {
                		length : 10,
                		length2 : 20	
                	},
                },
	            itemStyle: {
	            	normal : {
	            		borderWidth: 2,
	                	borderColor: '#03162B',
	            	},
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
			} ]
		};
		leftChart1.setOption(e);
	},
	createInfoResourceRateEx : function() {

		var stackBar = {

			xAxis_data : dataz.right1.right1_name,

			series_data : [ {
				name : "无条件共享",
				stack : "共享",
				color : "rgba(93,214,132,0.8)",
//				barBorderRadius : [ 0, 0, 20, 20 ],
				// opacity : .8,
				data : dataz.right1.right1_w
			}, {
				name : "有条件共享",
				stack : "共享",
				color : "rgba(93,214,132,0.4)",
//				barBorderRadius : [ 20, 20, 0, 0 ],
				// opacity : .4,
				data : dataz.right1.right1_y
			}, ]
		};

		rightChart1 = echarts.init(document.getElementById("NewIndustryBarEx1")), d = [], e = {
			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "共享度最高Top10",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
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
				feature : {
					saveAsImage : {
						name : '共享度最高Top10',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : "8%",
				right : "5%",
				top : "15%",
				bottom : "15%",
				containLabel : !1
			},
			xAxis : [ {
				type : "category",
				data : stackBar.xAxis_data,
				axisTick : {
					alignWithLabel : !0,
					length : 5
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
				axisTick : {
					show : false
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
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				},
				axisLabel : {
					show : false
				// textStyle : {
				// color : "#09b7ff"
				// },
				},
				splitLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				}
			} ],
			series : null
		};

		$.each(stackBar.series_data, function(a, e) {
			d.push({
				name : e.name,
				type : "bar",
				barWidth : "50%",
				stack : e.stack,
				itemStyle : {
					normal : {
						barBorderRadius : e.barBorderRadius,
						color : e.color,
					// opacity : e.opacity
					}
				},
				data : e.data
			})
		});
		e.series = d;
		rightChart1.setOption(e);
		//点击下钻到第六屏
		rightChart1.on('click',function(){
			location.href='../page_6/page.html';
		});
	},
	createInfoResourceRateExs : function() {
		var stackBar1 = {

			xAxis_data : dataz.right2.right2_name,

			series_data : [ {
				name : "无条件",
				stack : "共享",
				color : "rgba(255,210,99,1)",
//				barBorderRadius : [ 0, 0, 20, 20 ],
				data : dataz.right2.right2_w
			}, {
				name : "秘密",
				stack : "共享",
				color : "rgba(255,210,99,0.6)",
//				barBorderRadius : [ 0, 0, 0, 0 ],
				data : dataz.right2.right2_s
			}, {
				name : "内部",
				stack : "共享",
				color : "rgba(255,210,99,0.3)",
//				barBorderRadius : [ 20, 20, 0, 0 ],
				data : dataz.right2.right2_y
			}]
		};
		rightChart2 = echarts.init(document.getElementById("NewIndustryBarExs1")), d = [], e = {
			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "开放度最高Top10",
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
						name : '开放度最高Top10',
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
				}
			},
			animationDuration : 5000,
			grid : {
				left : "8%",
				right : "5%",
				top : "15%",
				bottom : "15%",
				containLabel : !1
			},
			xAxis : [ {
				type : "category",
				data : stackBar1.xAxis_data,
				axisTick : {
					show : false
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
						color : "#c2d6ef",
						width : 1.5,
						opacity : .8
					}
				},
				axisTick : {
					show : false
				},
				axisLabel : {
					show : false
				// textStyle : {
				// color : "#c2d6ef"
				// },
				},
				splitLine : {
					lineStyle : {
						color : "#c2d6ef",
						width : 1,
						opacity : .2
					}
				}
			} ],
			series : null
		};
		$.each(stackBar1.series_data, function(a, e) {
			d.push({
				name : e.name,
				type : "bar",
				barWidth : "50%",
				stack : e.stack,
				itemStyle : {
					normal : {
						barBorderRadius : e.barBorderRadius,
						color : e.color,
					}
				},
				data : e.data
			})
		});
		e.series = d;
		rightChart2.setOption(e);
		//点击下钻到第六屏
		rightChart2.on('click',function(){
			location.href='../page_6/page.html';
		});
	},
	
}, rightCorPanel = {
	init : function() {
		// PieIndustryPer = this.infoNeedRatePre();
		pieIndustryAve = this.loadPieIndustryAve();
		// bubbleIndustyr = this.loadBubbleIndustry()
	},
	loadPieIndustryAve : function() {
		var dataStyle = {
			normal : {
				label : {
					show : false
				},
				labelLine : {
					show : false
				}
			}
		};
		var placeHolderStyle = {
			normal : {
				color : 'rgba(0,0,0,0)',
				label : {
					show : false
				},
				labelLine : {
					show : false
				}
			},
			emphasis : {
				color : 'rgba(0,0,0,0)'
			}
		};
//		 "left3":[{"name":"其它","value":180},{"name":"周","value":39},{"name":"季","value":55},{"name":"实时","value":4638},{"name":"年","value":1496},{"name":"日","value":15},{"name":"旬","value":1},{"name":"月","value":401}],
		var data_left3 = [ {
			"name" : "每年",
			"value" : 0
		}, {
			"name" : "每半年",
			"value" : 0
		},{
			"name" : "每季度",
			"value" : 0
		}, {
			"name" : "每月",
			"value" : 0
		}];
		$.each(data_left3, function(i1, n1) {
			$.each(dataz.left3, function(i2, n2) {
				if (n1.name == n2.NAME) {
					n1.value = n2.VALUE;
				}
			});
		});
		leftChart3 = echarts.init(document.getElementById("IndustryAvearageEx")), d = [], e = {
			color : [ '#8EAE44', '#3BCACE', '#813800', '#FFE04F', '#B55D16',
					'#4278DE', '#AE9FA4', '#FFB76C' ],
			title : {
				text : "资源鲜活度",
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
				feature : {
					saveAsImage : {
						name : '资源鲜活度',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				show : true,
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},

			series : [ {
				name : '信息资源',
				type : 'pie',
				radius : '60%',
				center : [ '50%', '50%' ],
				data : data_left3,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};
		leftChart3.setOption(e);
	},
	
}, middelCorPanel = {
	init : function() {
		industryDesity = this.loadIndustryDesity();
		industryCloud = this.laodIndustryCloudLable()
	},
	loadIndustryDesity : function() {
		var splitNames = [ {data : []},{data : []},{data : []},{data : []}];
		var splitValues = [
				[{data : []},{data : []},{data : []}],
				[{data : []},{data : []},{data : []}],
				[{data : []},{data : []},{data : []}],
				[{data : []},{data : []},{data : []}]
			];
		// 分组长度
		var count = Math.ceil(dataz.mid1.name.length / 4);
		// 切分为四组数据
		$.each(dataz.mid1.name, function(i, n) {
			if (i < count) {
				splitNames[0].data.push(n);
				splitValues[0][0].data.push(dataz.mid1.total[i]);
				splitValues[0][1].data.push(dataz.mid1.val1[i]);
				splitValues[0][2].data.push(dataz.mid1.val2[i]);
			} else if (i >= count && i < count * 2) {
				splitNames[1].data.push(n);
				splitValues[1][0].data.push(dataz.mid1.total[i]);
				splitValues[1][1].data.push(dataz.mid1.val1[i]);
				splitValues[1][2].data.push(dataz.mid1.val2[i]);
			} else if (i >= count * 2 && i < count * 3) {
				splitNames[2].data.push(n);
				splitValues[2][0].data.push(dataz.mid1.total[i]);
				splitValues[2][1].data.push(dataz.mid1.val1[i]);
				splitValues[2][2].data.push(dataz.mid1.val2[i]);
			} else if (i >= count * 3) {
				splitNames[3].data.push(n);
				splitValues[3][0].data.push(dataz.mid1.total[i]);
				splitValues[3][1].data.push(dataz.mid1.val1[i]);
				splitValues[3][2].data.push(dataz.mid1.val2[i]);
			}
		});
		
		var a = {
			baseOption : {
				timeline : {
					axisType : 'category',
					orient : 'horizontal',
					left: 'center',
			        top : 'bottom',
		            inverse : false,
					autoPlay : true,
					realtime : true,
					playInterval : 5000,
					controlPosition : 'right',
					data : [ 'part1', 'part2', 'part3', 'part4' ],
					lineStyle : {
						show : false
					},
					label : {
						position : 'right',
						normal : {
							show : false,
							textStyle : {
								color : '#c2d6ef'
							}
						},
					},
					controlStyle: {
		                showNextBtn: false,
		                showPrevBtn: false,
			        },
			        tooltip : {
						show : false
					}
				},
				title : {
					text : "信息资源共享开放度",
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
					feature : {
						saveAsImage : {
							name : '信息资源共享开放度',
							icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
							backgroundColor : '#03162B',
							title : '保存为图'
						}
					}
				},
				tooltip : {
					trigger : 'axis'
				},

				calculable : true,
				grid : {
					left : '3%',
					right : '4%',
					bottom : '15%',
					containLabel : true
				},
				legend : {
					orient : 'horizontal',
					right : 50,
					y : 'top',
					itemGap : 5,
					data : [ {
						name : '资源总量',
						textStyle : {
							color : '#FF7175'
						}
					}, {
						name : '可共享',
						textStyle : {
							color : '#00A5F8'
						}
					}, {
						name : '可开放',
						textStyle : {
							color : '#FEAD29'
						}
					} ]
				},
				xAxis : [ {
					type : 'category',
					axisLabel : {
						interval : 0
					},
					axisTick : {
						alignWithLabel : !0,
						length : 5
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
						formatter : function(a) {
							return commonClass._jName(a);
						}
					},
					axisTick : {
						show : false
					},
					splitLine : {
						show : false,
						lineStyle : {
							color : "#072543"
						}
					},
				} ],
				yAxis : [ {
					type : 'value',
					axisLine : {
						lineStyle : {
							color : "#c2d6ef",
							width : 1.5,
							opacity : .8
						}
					},
					axisTick : {
						show : false,
						length : 10
					},
					axisLabel : {
						textStyle : {
							color : "#c2d6ef"
						}
					},
					splitLine : {
						lineStyle : {
							color : "#c2d6ef",
							width : 1,
							opacity : .2
						}
					}
				} ],
				series : [ {
					name : '资源总量',
					type : 'line',
					smooth : true,
					itemStyle : {
						normal : {
							color : '#FF7175',
							areaStyle : {
								opacity : 0.4,
								type : 'default'
							}
						}
					},
					lineStyle : {
						normal : {
							color : '#FF7175',
							width : 1.5
						}
					},
				}, {
					name : '可共享',
					type : 'line',
					smooth : true,
					itemStyle : {
						normal : {
							color : '#00A5F8',
							areaStyle : {
								opacity : 0.4,
								type : 'default'
							}
						}
					},
					lineStyle : {
						normal : {
							color : '#00A5F8',
							width : 1.5
						}
					},
				}, {
					name : '可开放',
					type : 'line',
					smooth : true,
					itemStyle : {
						normal : {
							color : '#FEAD29',
							areaStyle : {
								opacity : 0.4,
								type : 'default'
							}
						}
					},
					lineStyle : {
						normal : {
							color : '#FEAD29',
							width : 1.5
						}
					},
				}]
			},
			options : [
				{
					xAxis : splitNames[0],
					series : splitValues[0]
				},{
					xAxis : splitNames[1],
					series : splitValues[1]
				},{
					xAxis : splitNames[2],
					series : splitValues[2]
				},{
					xAxis : splitNames[3],
					series : splitValues[3]
				}
			]
		},

		midChart1 = echarts.init(document.getElementById("IndustryDesIncreEx"));
		midChart1.setOption(a);
		return midChart1
	},
	loadIndustryCloud : function() {
		$("#IndustrySurvialEx")
				.html(
						"\x3ca style\x3d'font-size:33px;'\x3e\u6279\u53d1\u548c\u96f6\u552e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:30px;'\x3e\u5236\u9020\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:28px;'\x3e\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:27px;'\x3e\u5efa\u7b51\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:26px;width:120px;'\x3e\u79d1\u5b66\u7814\u7a76\u3001\u6280\u672f\u670d\u52a1\u548c\u5730\u8d28\u52d8\u67e5\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u623f\u5730\u4ea7\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:24px;'\x3e\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u53ca\u90ae\u653f\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;width:120px;'\x3e\u4fe1\u606f\u4f20\u8f93\u3001\u8ba1\u7b97\u673a\u670d\u52a1\u548c\u8f6f\u4ef6\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;'\x3e\u5c45\u6c11\u670d\u52a1\u548c\u5176\u4ed6\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u91d1\u878d\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u6559\u80b2\x3c/a\x3e\x3ca style\x3d'font-size:19px;width:120px;'\x3e\u7535\u529b\u3001\u7164\u6c14\u53ca\u6c34\u7684\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:18px;width:120px;'\x3e\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u8d74\u76d1\x3c/a\x3e\x3ca style\x3d'font-size:18px;'\x3e\u91c7\u77ff\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:15px;width:120px;'\x3e\u536b\u751f\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u798f\u5229\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:14px;'\x3e\u516c\u5171\u7ba1\u7406\u548c\u793e\u4f1a\u7ec4\u7ec7\x3c/a\x3e");
		var a = $("#IndustrySurvialEx").height();
		loadLabelCloud("IndustrySurvialEx", a / 2 - 40)
	},
	laodIndustryCloudLable : function() {

		var wordData = [];
		var color = [ "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff", "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff", "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff", "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff", "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff" ];

		var index = 0;
		$.each(dataz.mid2, function(a, e) {
			index++;
			if (a > color.length) {
				a = index - a;
			}

			wordData.push({
				name : e.SHORTNAME,
				showName : e.NAME,
				code : e.CODE,
				value : [ e.VAL1, e.VAL2 ],
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

		var splitWordData = [ {
			data : []
		}, {
			data : []
		}, {
			data : []
		}, {
			data : []
		} ];
		// 分组长度
		var count = Math.ceil(dataz.mid2.length / 4);
		// 切分词云数组
		$.each(wordData, function(i, n) {
			if (i < count) {
				splitWordData[0].data.push(n);
			} else if (i >= count && i < count * 2) {
				splitWordData[1].data.push(n);
			} else if (i >= count * 2 && i < count * 3) {
				splitWordData[2].data.push(n);
			} else if (i >= count * 3) {
				splitWordData[3].data.push(n);
			}
		});

		midChart2 = echarts.init(document.getElementById("IndustrySurvialEx"));
		var b = {
			baseOption : {
				timeline : {
					axisType : 'category',
					orient : 'vertical',
					left: 'left',
			        right: null,
			        top : '25%',
		            width: 46,
		            height: '50%',
		            inverse : true,
					autoPlay : true,
					playInterval : 5000,
					data : [ 'all', 'part1', 'part2', 'part3', 'part4' ],
					lineStyle : {
						show : false
					},
					label : {
						position : 'right',
						normal : {
							show : false,
							textStyle : {
								color : '#c2d6ef'
							}
						},
					},
					controlStyle: {
		                showNextBtn: false,
		                showPrevBtn: false,
			        }
				},
				animationDuration : 5000,
				title : {
					text : "资源丰富性",
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
							name : '资源丰富性',
							icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
							backgroundColor : '#03162B',
							title : '保存为图'
						}
					}
				},
				tooltip : {
					trigger : 'item',
					textStyle : {},
					formatter : function(params) {
						if(params.data.showName == undefined){
							return null
						}else{
							return params.data.showName + "\x3cbr\x3e信息资源:" + params.value[0]
							+ "\x3cbr\x3e数据项:" + params.value[1]
						}
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
					size : [ "100%", "90%" ],
					width : "90%",
					height : "100%",
					rotationRange : [ 0, 0 ],
					center : [ "49%", "47%" ],
					clickable : !0,
					shape : "circle",
					autoSize : {
						enable : !0,
						minSize : 12
					},
				} ],
				animationEasing : "Linear"
			},
			options : [ {
				series : [ {
					gridSize : 4,
					sizeRange : [ 14, 28 ],
					data : wordData
				} ]
			}, {
				series : [ {
					gridSize : 10,
					sizeRange : [ 18, 30 ],
					data : splitWordData[0].data
				} ]
			}, {
				series : [ {
					gridSize : 10,
					sizeRange : [ 18, 30 ],
					data : splitWordData[1].data
				} ]
			}, {
				series : [ {
					gridSize : 10,
					sizeRange : [ 18, 30 ],
					data : splitWordData[2].data
				} ]
			}, {
				series : [ {
					gridSize : 10,
					sizeRange : [ 18, 30 ],
					data : splitWordData[3].data
				} ]
			}, ]
		};
		midChart2.setOption(b);
		//点击下钻到第七屏委办局详情分析,需传递参数委办局code
		midChart2.on('click',function(params){
			if(params.componentType == 'series'){
				window.location.assign('../page_7/page.html?tit='
						+ params.data.code);
			}
		});
		
		return midChart2
	}
};