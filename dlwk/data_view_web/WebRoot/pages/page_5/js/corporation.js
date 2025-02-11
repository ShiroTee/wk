﻿/*
	@page5
	@宏观经济分析
 */var _tmpData = null;
var mid1_data = null;
var leftChart1 = null, leftChart2 = null,leftChart3 = null;
var midChart1 = null, midChart2 = null, midChart3 = null;
var rightChart1 = null, rightChart2 = null;

window.onload = function() {
	mid1_data = commonClass._commAjax('/page5/mid1');
	middelCorPanel.init();

	var thisURL = document.URL;
	var showval = null;
	if (thisURL.indexOf('?') != -1) {
		var getval = thisURL.split('?')[1];
		showval = getval.split("=")[1];
	}

	var code = "wBkgYO4_EeSnu4BBYi_hhw";
	var name = "人口库";
	if (null != showval && '' != showval) {
		code = showval;
		$.each(mid1_data.mid1.code,function(i,n){
			if(n == code){
				name = mid1_data.mid1.name[i];
			}
		});
	}

	if (code != undefined && name != undefined) {
		pageLoad(code,name);
		console.log(dataz);
		//动画
		var charts = new Array();
		charts.push(leftChart1);
		charts.push(leftChart2);
	    charts.push(leftChart3);
	    charts.push(midChart1);
	    charts.push(midChart2);
	    charts.push(midChart3);
	    charts.push(rightChart1);
	    charts.push(rightChart2);
	    
	    animationAfterStill.autoPlay(charts);
	}
	
};
var dataz = null;
function pageLoad(code,name) {
	
	dataz = commonClass._commAjax('/page5/data?tit=' + code);

	leftCorPanel.init(name);
	rightCorPanel.init(name);

	window.onresize = function() {
		// barEx.resize();
		// barEx1.resize();
		radarEx.resize();
		dieBar.resize();
		dieBarex.resize();
		// industryDesity.resize();
		industryCloud.resize();
		PieIndustryPer.resize();
		pieIndustryAve.resize();
		bubbleIndustyr.resize()
	}
}
var leftCorPanel = {
	init : function(tit) {
		barEx = this.createInfoNeedEx(tit);
		barEx1 = this.createInfoResourceRateEx(tit);
		radarEx = this.createInfoResourceShareEx(tit);
		dieBar = this.ringChart(tit);
		dieBarex1 = this.createInfoResourceRateEx1(tit);
	},
	createInfoResourceRateEx1 : function(tit) {
		//更新主题名称
		$(".titletop").text(tit + "贡献需求部门Top5");
		var color = [ '#FF7124', "#FFB106", "#FFD600", "#AFD853", "#5DD684" ];
		var names1 = dataz.right1_1.name;
		var names2 = dataz.right1_2.name;
		var datas1 = [], datas2 = [];
		var aux_datas1 = [], aux_datas2 = [];
		if(dataz.right1_1.data.length == 0){
			dataz.right1_1.data = [0];
		}
		if(dataz.right1_2.data.length == 0){
			dataz.right1_2.data = [0];
		}
		
		var max = Math.max(dataz.right1_1.data[0], dataz.right1_2.data[0]);
		var min = Math.min(dataz.right1_1.data[0], dataz.right1_2.data[0]);
		var multiple = 1;
		//两项数据差值很大时会比较难看,所以给小的一组数值乘一个倍数以美化图表
		if(min != 0 && max != 0){
			multiple = Math.floor(max/min);
		}
		//比较出较小的一组数据
		if(dataz.right1_1.data[0] >= dataz.right1_2.data[0]){
			//right1_1较大,将right1_2中的数据扩大multiple倍
			$.each(dataz.right1_1.data, function(index, value) {
				datas1.push({
					value : value*-1,
					itemStyle : {
						normal : {
							color : color[index],
						}
					}
				});
				aux_datas1.push(max*-1);
			});
			$.each(dataz.right1_2.data, function(index, value) {
				datas2.push({
					value : value*multiple,
					itemStyle : {
						normal : {
							color : color[index],
						}
					}
				});
				//将较小数据的辅助数据-1作为标识
				aux_datas2.push(max-1);
			});
		}else {
			//right1_2较大,将right1_1中的数据扩大multiple倍
			$.each(dataz.right1_1.data, function(index, value) {
				datas1.push({
					value : value*-1*multiple,
					itemStyle : {
						normal : {
							color : color[index],
						}
					}
				});
				aux_datas1.push((max-1)*-1);
			});
			$.each(dataz.right1_2.data, function(index, value) {
				datas2.push({
					value : value,
					itemStyle : {
						normal : {
							color : color[index],
						}
					}
				});
				aux_datas2.push(max);
			});
		}
		
		option = {
			title : {
				text : "贡献         需求",
				right : 'center',
				top : '10%',
				textStyle : {
					color : "#A9BDD6",
					fontSize : 13,
					fontWeight : "bold"
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '贡献需求部门Top5',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "shadow"
				},
				formatter : function(params) {
					var tips = "信息资源数量";
//					console.info(params)	//params详细信息打印可见
					if(params.length < 4){	//单侧有数据
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
							+ "border-radius:10px;width:9px;height:9px;background-color:"
							+ params[0].color
							+ "'>"
							+ "</span>"
							+ params[0].name
							+" : "
							+ params[0].value * -1;
						return tips;
					}
					if(params[1].value*-1 > params[3].value){
						//说明params[2]是小数据,乘了multiple倍
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
							+ "border-radius:10px;width:9px;height:9px;background-color:"
							+ params[0].color
							+ "'>"
							+ "</span>"
							+ params[0].name
							+" : "
							+ params[0].value * -1;
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
							+ "border-radius:10px;width:9px;height:9px;background-color:"
							+ params[2].color
							+ "'>"
							+ "</span>"
							+ params[2].name
							+" : " + params[2].value / multiple ;
					}else{ 
						//params[0]是小数据
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
							+ "border-radius:10px;width:9px;height:9px;background-color:"
							+ params[0].color
							+ "'>"
							+ "</span>"
							+ params[0].name
							+" : "
							+ (params[0].value * -1) / multiple ;
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
							+ "border-radius:10px;width:9px;height:9px;background-color:"
							+ params[2].color
							+ "'>"
							+ "</span>"
							+ params[2].name
							+" : " + params[2].value;
					}
					
					return tips;
				}
			},
			animationDuration : 5000,
			grid : {
				left : '4%',
				right : "4%",
				bottom : "10%",
				top : "20%",
				containLabel : !1
			},
			xAxis : {
				type : "value",
				position : 'top',
				axisLine : {
					show : false
				},
				axisLabel : {
					show : false
				},
				axisTick : {
					show : false
				},
				splitLine : {
					show : false
				}
			},
			yAxis : [{
				type : "category",
				onZero : true,
				axisLine : {
					show : true,
					lineStyle : {
						color : '#03162B',
						width : 6
					}
				},
				axisLabel : {
					show : false
				},
				axisTick : {
					show : false
				},
				splitLine : {
					show : false
				},
				data : names1.reverse(),
				z : 30
			},{
				type : "category",
				offset : 15,
				axisLine : {
					show : false,
				},
				axisLabel : {
					show : false
				},
				axisTick : {
					show : false
				},
				splitLine : {
					show : false
				},
				data : names2.reverse(),
			}],
			series : [ {
				name : "信息资源数量",
				type : "bar",
				yAxisIndex: 0,
				label : {
					normal : {
						show : false,
						position : "insideRight",
						formatter : function(a){
							return commonClass._jName(a.name);
						},
						textStyle : {
							color : '#000000',
							fontWeight : 'normal'
						}
					}
				},
				barMinHeight : 10,
				data : datas1.reverse(),
				z : 20
			},{
				type : "bar",
				silent : true,
				yAxisIndex: 0,
				barGap : '-100%',
				label : {
					normal : {
						show : false
					}
				},
				itemStyle : {
					normal : {
						color : 'rgba(0,0,0,0)',
					}
				},
				data : aux_datas1
			},{
				name : "信息资源数量",
				type : "bar",
				yAxisIndex: 1,
				barGap : "0",
				label : {
					normal : {
						show : false,
						position : "insideLeft",
						formatter : function(a){
							return commonClass._jName(a.name);
						},
						textStyle : {
							color : '#000000',
							fontWeight : 'normal'
						}
					}
				},
				barMinHeight : 10,
				data : datas2.reverse(),
				z : 20
			},{
				type : "bar",
				silent : true,
				yAxisIndex: 1,
				barGap : '-100%',
				label : {
					normal : {
						show : false
					}
				},
				itemStyle : {
					normal : {
						color : 'rgba(0,0,0,0)',
					}
				},
				data : aux_datas2
			}]
		};
		rightChart1 = echarts.init(document.getElementById("NewIndustryBarEx1"));
		rightChart1.setOption(option);
		return rightChart1;
	},

	ringChart : function(tit) {
		var total = dataz.left1[1].TOTAL;
		var s = dataz.left1[0].TOTAL;
		var radius = 0;

		if (total != 0) {
			radius = ((s * 100) / total).toFixed(2);
		}
		
		//百分比数值的位置
		var position = '';
		if(radius >= 50){
			position = 'inside';
		}else if(radius < 50){
			position = 'right';
		}

		leftChart1 = echarts.init(document.getElementById("cuser1")), d = [], e = {
			title : {
				text : tit + "信息资源电子化建设程度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				formatter : function(a, c, d) {
					return '信息资源共享度' + "\x3cbr\x3e信息资源数量:" + total
							+ "\x3cbr\x3e业务系统支撑信息资源数量:" + s
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源电子化建设程度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				top : '40%',
				bottom : '13%',
				left : '8%',
				right : '8%',
				height : document.getElementById("cuser1").offsetHeight * 0.5,
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
			yAxis : [ {
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
			series : [ {
				name : '信息资源共享数量',
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
						barBorderRadius : [ 5, 0, 0, 5 ],
						shadowBlur : 10,
						shadowColor : '#111',
						color : '#2FD04F'
					}
				},
				data : [ radius ],
				z : 10
			}, {
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
				data : [ 100 ],
			} ]
		};
		leftChart1.setOption(e);
	},
	createInfoResourceShareEx : function(tit) {

		var datas = dataz.mid2;

		var wtotal = 0;
		var ytotal = 0;
		var btotal = 0;
		$.each(datas, function(index, val, array) {

			if (val.NAME == '无条件共享') {
				wtotal = val.VALUE;
			} else if (val.NAME == '有条件共享') {
				ytotal = val.VALUE;
			} else if (val.NAME == '不予共享') {
				btotal = val.VALUE;
			}
		});

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

		midChart2 = echarts.init(document.getElementById("infoResourceShareEx")), d = [], e = {
			// color : "#d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #81c3ff
			// #c23531 #fee235 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760
			// #00BFFF #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
			// .split(" "),
			color : [ '#FBCC00', '#9EF48F', '#6DAEFB' ],
			title : {
				text : tit + "信息资源共享度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : function(params){
					if(params.name != "占比"){
						return params.seriesName + '<br/>' + params.name +': '+params.value +' ('+ params.percent+')%'
					}
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源共享度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			legend : {
				orient : 'vertical',
				// x :
				// document.getElementById('infoResourceShareEx').offsetWidth /
				// 2,
				// y :
				// document.getElementById('infoResourceShareEx').offsetHeight *
				// 0.2,
				left : '50%',
				top : '17.5%',
				itemGap : document.getElementById('infoResourceShareEx').offsetHeight * 0.05,
				itemWidth : 0,
				data : [ '无条件共享', '有条件共享', '不予共享' ],
				textStyle : {
					color : '#EFFBFF'
				}
			},
			series : [ {
				name : '信息资源',
				type : 'pie',
				clockWise : false,
				radius : [ '70%', '80%' ],
				center : [ '50%', '60%' ],
				itemStyle : dataStyle,
				data : [ {
					value : wtotal,
					name : '无条件共享'
				}, {
					value : ytotal + btotal,
					name : '占比',
					itemStyle : placeHolderStyle
				} ]
			}, {
				name : '信息资源',
				type : 'pie',
				clockwise : false,
				startAngle : 90,
				radius : [ '50%', '60%' ],
				center : [ '50%', '60%' ],
				itemStyle : dataStyle,
				data : [ {
					value : ytotal,
					name : '有条件共享'
				}, {
					value : wtotal + btotal,
					name : '占比',
					itemStyle : placeHolderStyle
				} ]
			}, {
				name : '信息资源',
				type : 'pie',
				clockWise : false,
				radius : [ '30%', '40%' ],
				center : [ '50%', '60%' ],
				itemStyle : dataStyle,
				data : [ {
					value : btotal,
					name : '不予共享'
				}, {
					value : wtotal + ytotal,
					name : '占比',
					itemStyle : placeHolderStyle
				} ]
			} ]
		};
		midChart2.setOption(e);
	},
	createInfoNeedEx : function(tit) {
		var datas = [], names = [], total = 0;
		var color = [ '#F7C700', '#5DD684', '#6DAFFA' ,'#FF7124'];
		var num = 0;
		$.each(dataz.left3, function(i, n) {
			if (n.NAME != undefined) {
				names[i-num] = n.NAME;
				datas[i-num] = {
					value : n.VALUE,
					itemStyle : {
						normal : {
							color : color[i-num],
							barBorderRadius : 5
						}
					}
				};
				total += n.VALUE;
			}else{
				num ++;//剔除undefined项对索引的影响
			}
		});
		var aux_data = [];
		for (var i = 0; i < names.length; i++) {
			aux_data.push({
				value : total,
				itemStyle : {
					normal : {
						barBorderRadius : 5,
						color : color[i],
						opacity : 0.4
					}
				},
			});
		}
		leftChart3 = echarts.init(document.getElementById("infoNeedEx")), d = [], e = {
			title : {
				text : tit + "信息资源开放度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
//				trigger : 'axis',
			// formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源开放度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : '10%',
				right : '10%',
				top : '20%',
				bottom : '20%',
			},
			xAxis : [ {
				type : 'category',
				splitLine : {
					show : false
				},
				data : names,
				axisTick : {
					show : false
				},
				axisLine : {
					show : false
				},
				axisLabel : {
					textStyle : {
						color : "#FFFFFF"
					}
				},
			}, {
				// 辅助 x 轴
				show : false,
				data : names
			} ],
			yAxis : [ {
				type : 'value',
				position : 'left',
				axisLabel : {
					show : false
				},
				splitLine : {
					show : false
				},
				axisTick : {
					show : false,
					length : 0
				},
				axisLine : {
					show : false
				},
				max : total
			} ],
			series : [ {
				name : '信息资源数量',
				type : 'bar',
				barWidth : '50%',
				data : datas
			}, {
				// 辅助系列
				type : 'bar',
				xAxisIndex : 1,
				silent : true,
				barWidth : '50%',
				label : {
					normal : {
						show : false,
						position : 'top',
						formatter : function (){
							return ((datas*100)/aux_data[0]).toFixed(2) + '%';
						}
					}
				},
				data : aux_data
			} ]
		};
		leftChart3.setOption(e);
	},
	createInfoResourceRateEx : function(tit) {
		var data_left2 = [];
		$.each(dataz.left2,function(i,n){
			if(n.NAME != undefined){
				data_left2.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		
		leftChart2 = echarts.init(document.getElementById("infoResourceRateEx")), d = [], e = {
			color : [ '#F7C700', '#5DD684', '#6DAFFA', '#FF7124', '#8DE400' ],
			title : {
				text : tit + "信息资源电子化存储率",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b}: {c} ({d}%)"
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源电子化存储率",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			series : [ {
				name : '信息资源数量',
				type : 'pie',
				radius : '65%',
				minAngle : 3,
				clockwise : true,
				startAngle : 90,
				center : [ '50%', '60%' ],
				data : data_left2,
				label : {
					normal : {
						show : true,
						position : 'outside',
						textStyle : {
							color : '#FFFFFF'
						}
					},
					emphasis : {
						show : true,
						position : 'outside',
						textStyle : {
							fontSize : '14',
							fontWeight : 'normal'
						}
					}
				},
				labelLine : {
					normal : {
						lineStyle : {
							color : '#FFFFFF'
						}
					}
				},
				itemStyle : {
					normal : {
						borderWidth : 1,
						borderColor : '#03162B',
						label : {
							show : false,
							formatter : '{b}({d}%)',
						},
					}
				}
			} ]
		};
		leftChart2.setOption(e);
	},

	createRadar : function() {
		var a = _tmpData.left.IndustrySuv.data, a = {
			title : {
				text : "\u4f01\u4e1a\u5bb6\u6570",
				textStyle : {
					color : "#018ccd",
					fontSize : 15,
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {},
			animationDuration : 5000,
			radar : {
				indicator : _tmpData.left.IndustrySuv.info,
				center : [ "50%", "55%" ],
				name : {
					textStyle : {
						color : "#00a0e8",
						fontSize : 14
					}
				},
				nameGap : 12,
				splitArea : {
					areaStyle : {
						color : "#03162b",
						shadowColor : "rgba(0, 0, 0, 0.3)",
						shadowBlur : 10
					}
				},
				axisLine : {
					lineStyle : {
						color : "rgba(255, 255, 0, 0.3)"
					}
				},
				splitLine : {
					lineStyle : {
						color : "rgba(0, 0, 0, 0.5)",
						width : 1
					}
				}
			},
			series : [ {
				name : "",
				type : "radar",
				symbolSize : 6,
				label : {
					normal : {
						show : !1,
						position : [ -10, -20 ],
						formatter : function(a) {
							return a.value
						},
						textStyle : {
							color : "#ff0"
						}
					}
				},
				lineStyle : {
					normal : {
						type : "dashed",
						color : "#ff0",
						opacity : .5
					}
				},
				areaStyle : {
					normal : {
						color : new echarts.graphic.RadialGradient(.5, .5, .6,
								[ {
									offset : 0,
									color : "#00ff21"
								}, {
									offset : 1,
									color : "#b6ff00"
								} ]),
						opacity : .5
					}
				},
				itemStyle : {
					normal : {
						color : new echarts.graphic.RadialGradient(.5, .5, .8,
								[ {
									offset : 0,
									color : "#00ff21"
								}, {
									offset : 1,
									color : "#b6ff00"
								} ])
					}
				},
				data : [ {
					name : "\u4f01\u4e1a\u5b58\u6d3b\u5e74\u9650",
					value : a
				} ]
			} ]
		}, b = echarts.init(document.getElementById("SurvivalTimeBarEx"));
		b.setOption(a);
		return b
	},
	createDieBarEX : function() {
		var a = _tmpData.left.DieIndustry.data2010.series_data_share, a = {
			title : {
				right : 0,
				textAlign : "left",
				subtext : "2010\u5e74",
				subtextStyle : {
					color : "#018ccd",
					fontWeight : "bold"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "shadow"
				}
			},
			grid : {
				left : -40,
				right : "0%",
				bottom : "-10%",
				top : "23%",
				containLabel : !0
			},
			xAxis : [ {
				type : "value",
				inverse : !0,
				axisLabel : {
					show : !1
				},
				axisTick : {
					show : !1
				},
				axisLine : {
					show : !1
				},
				splitLine : {
					show : !1
				}
			} ],
			yAxis : [ {
				type : "category",
				axisLabel : {
					show : !1,
					interval : 0,
					formatter : function(a, b) {
					}
				},
				axisTick : {
					show : !1
				},
				inverse : !0,
				axisLine : {
					show : !1
				},
				data : _tmpData.left.DieIndustry.data2010.xAxis_data
			} ],
			series : [ {
				name : "\u4f01\u4e1a\u6570(\u5bb6)",
				type : "bar",
				barWidth : "45%",
				barGap : "0",
				label : {
					normal : {
						show : !0,
						position : "left"
					}
				},
				data : [ {
					value : a[0],
					itemStyle : {
						normal : {
							color : "#8407d3"
						}
					}
				}, {
					value : a[1],
					itemStyle : {
						normal : {
							color : "#4154e6"
						}
					}
				}, {
					value : a[2],
					itemStyle : {
						normal : {
							color : "#419ae6"
						}
					}
				}, {
					value : a[3],
					itemStyle : {
						normal : {
							color : "#2eb9aa"
						}
					}
				}, {
					value : a[4],
					itemStyle : {
						normal : {
							color : "#2eb979"
						}
					}
				} ]
			} ]
		}, b = echarts.init(document.getElementById("DieIndustryBarEX"));
		b.setOption(a);
		return b
	},
	createDieBar : function() {
		var a = _tmpData.left.DieIndustry.data2015.series_data_share.reverse();
		option = {
			title : {
				right : 63,
				textAlign : "right",
				subtext : "2015\u5e74",
				subtextStyle : {
					color : "#018ccd",
					fontWeight : "bold"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "shadow"
				}
			},
			grid : {
				left : -85,
				right : "15%",
				bottom : "-10%",
				top : "23%",
				containLabel : !0
			},
			xAxis : {
				type : "value",
				axisLabel : {
					show : !1
				},
				axisTick : {
					show : !1
				},
				axisLine : {
					show : !1
				},
				splitLine : {
					show : !1
				}
			},
			yAxis : {
				type : "category",
				axisLabel : {
					show : !1,
					interval : 9
				},
				axisTick : {
					show : !1
				},
				axisLine : {
					show : !1
				},
				data : _tmpData.left.DieIndustry.data2015.xAxis_data.reverse()
			},
			series : [ {
				name : "\u4f01\u4e1a\u6570(\u5bb6)",
				type : "bar",
				barWidth : "45%",
				label : {
					normal : {
						show : !0,
						position : "right"
					}
				},
				data : [ {
					value : a[0],
					itemStyle : {
						normal : {
							color : "#2eb979"
						}
					}
				}, {
					value : a[1],
					itemStyle : {
						normal : {
							color : "#2eb9aa"
						}
					}
				}, {
					value : a[2],
					itemStyle : {
						normal : {
							color : "#419ae6"
						}
					}
				}, {
					value : a[3],
					itemStyle : {
						normal : {
							color : "#4154e6"
						}
					}
				}, {
					value : a[4],
					itemStyle : {
						normal : {
							color : "#8407d3"
						}
					}
				} ]
			} ]
		};
		a = echarts.init(document.getElementById("DieIndustryBar"));
		a.setOption(option);
		return a
	}
}, rightCorPanel = {
	init : function(tit) {
		PieIndustryPer = this.infoNeedRatePre(tit);
		industryCloud = this.laodIndustryCloudLable(tit)
		// pieIndustryAve = this.loadPieIndustryAve(val,tit);
		// bubbleIndustyr = this.loadBubbleIndustry()
	},
	laodIndustryCloudLable : function(tit) {

		var wordData = [];
		var color = [ "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff" ];

		var index = 0;
		$.each(dataz.right2, function(a, e) {
			index++;
			if (a >= color.length) {
				a = index - a;
			}

			wordData.push({
				name : e.NAME,
				value : [ e.SUM ],
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

		rightChart2 = echarts.init(document.getElementById("IndustrySurvialEx"));
		rightChart2.setOption({
			backgroundColor : 'rgba(0,0,0,0)',
			animationDuration : 5000,
			title : {
				text : tit + "信息资源需求Top10",
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
					return a.name + "\x3cbr\x3e需求次数:" + c[0]
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源需求Top10",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			grid : {
				left : "3%",
				right : "6%",
				bottom : "1%",
				top : "5%",
				containLabel : !0,
				show : !1
			},
			series : [ {
				type : "wordCloud",
				gridSize : 5,
				size : [ "80%", "80%" ],
				sizeRange : [ 13, 18 ],
				width : "100%",
				height : "70%",
				rotationRange : [ 0, 0 ],
				center : [ "40%", "47%" ],
				clickable : !0,
				shape : "circle",
				autoSize : {
					enable : !0,
					minSize : 12
				},
				zlevel : 0,
				data : wordData
			} ],
			animationEasing : "Linear"
		});
		return rightChart2;
	},
	infoNeedRatePre : function(tit) {
		var data_mid3 = [];
		$.each(dataz.mid3,function(i,n){
			if(n.NAME != undefined){
				data_mid3.push({
					name : n.NAME,
					value : n.VALUE
				});
			}
		});
		
		midChart3 = echarts.init(document.getElementById("infoNeedRate")), d = [], e = {
			color : [ '#FF7124', '#FFC84A', '#8DE400', '#489BFF', '#F7C700','#5DD684' ],
			title : {
				text : tit + "信息资源共享方式",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源共享方式",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			series : [ {
				name : '信息资源数量',
				type : 'pie',
				radius : [ '15%', '55%' ],
				center : [ '50%', '55%' ],
				minAngle : 3,
				clockwise : true,
				startAngle : 90,
				data : data_mid3,
				label : {
					normal : {
						show : true,
						position : 'outside',
						textStyle : {
							color : '#FFFFFF'
						}
					},
					emphasis : {
						show : true,
						position : 'outside',
						textStyle : {
							fontSize : '14',
							fontWeight : 'normal'
						}
					}
				},
				labelLine : {
					normal : {
						lineStyle : {
							color : '#FFFFFF'
						}
					},
				},
				itemStyle : {
					normal : {
						borderWidth : 2,
						borderColor : '#03162B',
					},
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};
		midChart3.setOption(e);
	},

	loadPieIndustryPer : function() {
		var a = {
			color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
					.split(" "),
			title : {
				text : "\u884c\u4e1a\u4f01\u4e1a\u6570\u91cf\u5360\u6bd4",
				textStyle : {
					fontSize : 15,
					color : "#018ccd",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			tooltip : {
				trigger : "item",
				formatter : "{a} \x3cbr/\x3e{b}: {c}\u5bb6 "
			},
			animationDuration : 5000,
			series : [ {
				name : "\u884c\u4e1a\u6570\u91cf\u5360\u6bd4",
				type : "pie",
				selectedMode : "single",
				radius : [ 0, "40%" ],
				startAngle : 180,
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
				data : _tmpData.right.IndustryPercent.data1
			}, {
				name : "\u4f01\u4e1a\u6570\u91cf\u5360\u6bd4",
				type : "pie",
				radius : [ "60%", "80%" ],
				startAngle : 180,
				label : {
					normal : {
						show : !1
					}
				},
				labelLine : {
					normal : {
						show : !1,
						length : 2
					}
				},
				data : _tmpData.right.IndustryPercent.data2
			} ]
		}, b = echarts.init(document.getElementById("IndustryPercentEx"));
		b.setOption(a);
		return b
	},
	loadPieIndustryAve : function(val, tit) {
		var a = val.right.info_data;
		var c = echarts.init(document.getElementById("IndustryAvearageEx")), d = [], e = {
			color : "#8fad4a #36cfd1 #7f3900 #f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900  #962364"
					.split(" "),
			title : {
				text : tit + "信息资源贡献度",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				trigger : 'item',
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : tit + "信息资源贡献度",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			series : [ {
				name : '信息资源数量',
				type : 'pie',
				radius : '60%',
				clickable : !1,
				center : [ '52%', '55%' ],
				data : a.data_share_mode1,
				itemStyle : {
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
		};
		c.setOption(e);
	},
	loadBubbleIndustry : function() {
		for (var a = _tmpData.right.IndustryBuble.data, b = "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
				.split(" "), c = [], d = 0; d < a.length; d++) {
			var e = {};
			e.value = a[d];
			e.itemStyle = {
				normal : {
					color : new echarts.graphic.RadialGradient(.3, .3, .5, [ {
						offset : 0,
						color : b[d]
					}, {
						offset : 1,
						color : b[d + 1]
					} ]),
					opacity : .6
				}
			};
			c.push(e)
		}
		option = {
			title : {
				text : "信息资源需求结构",
				textStyle : {
					fontSize : 15,
					color : "#FFF",
					fontWeight : "normal",
					fontFamily : "Microsoft YaHei"
				}
			},
			animationDuration : 5000,
			tooltip : {
				formatter : function(a) {
					return a.data.value[3] + "\x3cbr\x3e业务事项(个)"
							+ a.data.value[1] + "\x3cbr\x3e信息资源(个):"
							+ a.data.value[0] + "\x3cbr\x3e重合度(%):"
							+ a.data.value[2]
				}
			},
			grid : {
				left : "3%",
				right : "10%",
				bottom : "3%",
				top : "25%",
				containLabel : !0,
				show : !0,
				borderColor : "#031d34"
			},
			xAxis : {
				type : "value",
				name : "信息资源",
				nameLocation : "end",
				nameGap : 9,
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
				}
			},
			yAxis : {
				type : "value",
				name : "业务事项数量",
				nameGap : 8,
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
				scale : !0
			},
			series : [ {
				name : "重合度",
				data : c,
				type : "scatter",
				symbolSize : function(a) {
					return Math.sqrt(a[2]) * 4
				},
				label : {
					emphasis : {
						show : !0,
						textStyle : {
							color : "#018ccd"
						},
						position : "top"
					}
				},
				itemStyle : {
					normal : {
						shadowBlur : 10,
						shadowColor : "rgba(120, 36, 50, 0.5)",
						shadowOffsetY : 5
					}
				}
			} ]
		};
		a = echarts.init(document.getElementById("infoBubbleEx"));
		a.setOption(option);
		return a
	}
}, middelCorPanel = {
	init : function() {
		industryDesity = this.loadIndustryDesity();
	},
	loadIndustryDesity : function() {
		option = {
			title : {
				text : "主题信息资源",
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
				formatter : function(a) {
					return a[0].name + "\x3cbr\x3e信息资源 : " + a[0].data
//							+ "\x3cbr\x3e需求信息资源:" + a[1].data
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : "主题信息资源",
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			visualMap : {
				show : false,
				min : 0,
				max : mid1_data.mid1.val1.length,
				dimension : 0,
				inRange : {
					color : [ '#60D585', '#F6C700', '#71AEF6' ]
				}
			},
			grid : {
				left : "3%",
				right : "3%",
				bottom : "3%",
				top : "20%",
				containLabel : !0,
				show : !0,
				borderColor : "#031d34"
			},
			calculable : true,
			xAxis : {
				type : 'category',
				splitLine : {
					show : false
				},
				data : mid1_data.mid1.name,
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
				// interval : 2,
				// formatter: function(a){
				//						
				// return commonClass._jName(a);
				// }
				},
				splitLine : {
					show : false,
				}
			},
			yAxis :  {
				// name:"数量",
				type : 'value',
				position : 'left',
				axisLabel : {
					formatter : "{value}",
					textStyle : {
						fontSize : 13,
						color : "#c2d6ef"
					},
					interval : 0
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
			} ,
			series : [ {
				name : '信息资源需求数量',
				type : 'bar',
				data : mid1_data.mid1.val1
//			}, {
//				name : '已被满足信息资源需求数量',
//				type : 'bar',
//				itemStyle : {
//					normal : {
//						opacity : 0.5
//					}
//				},
//				data : mid1_data.mid1.val2,
			}]
		};

		midChart1 = echarts.init(document.getElementById("IndustryDesIncreEx"));
		midChart1.setOption(option);

		midChart1.on('click', function(params) {
//			console.info(params);
			var theme_name = params.name;
			var theme_code = mid1_data.mid1.code[$.inArray(theme_name,mid1_data.mid1.name)];
			pageLoad(theme_code,theme_name);
		});

		return midChart1;
	},
	loadIndustryCloud : function() {
		$("#IndustrySurvialEx")
				.html(
						"\x3ca style\x3d'font-size:33px;'\x3e\u6279\u53d1\u548c\u96f6\u552e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:30px;'\x3e\u5236\u9020\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:28px;'\x3e\u79df\u8d41\u548c\u5546\u52a1\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:27px;'\x3e\u5efa\u7b51\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:26px;width:120px;'\x3e\u79d1\u5b66\u7814\u7a76\u3001\u6280\u672f\u670d\u52a1\u548c\u5730\u8d28\u52d8\u67e5\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u519c\u3001\u6797\u3001\u7267\u3001\u6e14\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e\u623f\u5730\u4ea7\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:24px;'\x3e\u4ea4\u901a\u8fd0\u8f93\u3001\u4ed3\u50a8\u53ca\u90ae\u653f\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;width:120px;'\x3e\u4fe1\u606f\u4f20\u8f93\u3001\u8ba1\u7b97\u673a\u670d\u52a1\u548c\u8f6f\u4ef6\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:23px;'\x3e\u5c45\u6c11\u670d\u52a1\u548c\u5176\u4ed6\u670d\u52a1\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u91d1\u878d\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e\u6587\u5316\u3001\u4f53\u80b2\u548c\u5a31\u4e50\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u4f4f\u5bbf\u548c\u9910\u996e\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e\u6559\u80b2\x3c/a\x3e\x3ca style\x3d'font-size:19px;width:120px;'\x3e\u7535\u529b\u3001\u7164\u6c14\u53ca\u6c34\u7684\u751f\u4ea7\u548c\u4f9b\u5e94\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:18px;width:120px;'\x3e\u6c34\u5229\u3001\u73af\u5883\u548c\u516c\u5171\u8bbe\u65bd\u7ba1\u8d74\u76d1\x3c/a\x3e\x3ca style\x3d'font-size:18px;'\x3e\u91c7\u77ff\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:15px;width:120px;'\x3e\u536b\u751f\u3001\u793e\u4f1a\u4fdd\u969c\u548c\u793e\u4f1a\u798f\u5229\u4e1a\x3c/a\x3e\x3ca style\x3d'font-size:14px;'\x3e\u516c\u5171\u7ba1\u7406\u548c\u793e\u4f1a\u7ec4\u7ec7\x3c/a\x3e");
		var a = $("#IndustrySurvialEx").height();
		loadLabelCloud("IndustrySurvialEx", a / 2 - 40)
	}
};