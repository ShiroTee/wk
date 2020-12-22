/*
	@首页
	@数据交换共享分析
    @2016-12-5
 */var _tmpData = null;
var dataz = null;
var leftChart1 = null, leftChart2 = null, leftChart3 = null;
var rightChart1 = null, rightChart2 = null, midChart1 = null, midChart2 = null;
var graphNames = [];
var startPos = [], endPos = [];	
window.onload = function() {
	dataz = commonClass._commAjax('/page1/data');
	pageLoad();
	//动画
	var charts = new Array();
	charts.push(leftChart1);
    charts.push(leftChart2);
    charts.push(leftChart3);
    charts.push(midChart2);
    charts.push(rightChart1);
    charts.push(rightChart2);
    
    animationAfterStill.autoPlay(charts,midChart1,graphNames);
	
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
	leftPanel.ini();
	rightPanel.ini();
	containerPanel.ini();
	containerPanel_rightIcon.ini();
	containerPanel_leftIcon.ini();

	// 整合统计
	$(".total_num").text(dataz.right1.ZY_NUM);
	this.numAnimate_float("total_num", dataz.right1.ZY_NUM);
	$(".total_num1").text(dataz.right1.SJ_NUM);
	this.numAnimate_float("total_num1", dataz.right1.SJ_NUM);
	$(".l1").text(dataz.right1.ZW_NUM);
	this.numAnimate_float("l1", dataz.right1.ZW_NUM);
	$(".l2").text(dataz.right1.JG_NUM);
	this.numAnimate_float("l2", dataz.right1.JG_NUM);
	$(".l3").text(dataz.right1.SX_NUM);
	this.numAnimate_float("l3", dataz.right1.SX_NUM);
}

var leftPanel = {
	ini : function() {
		this.ringChart();
		this.ringChart1();
		this.createBarEx();
		// this.createBarEx1();
		var show3D = true;
		if(window.navigator.userAgent.indexOf('Chrome')!=-1){  
			if(_mime("type", "application/vnd.chromium.remoting-viewer")){//360浏览器
			}else{// chrome
				show3D = false; 
//				$('.container_content').prepend('<img src="images/index/cd.png">');
			}
		}else if(!!window.ActiveXObject || "ActiveXObject" in window){ //IE
			$('#mid2').css('height', '140px');
			if(navigator.appName == "Microsoft Internet Explorer"){//IE 9 10
				if(navigator.appVersion.match(/9./i)=="9." || navigator.appVersion.match(/10./i)=="10."){
					show3D = false;
//					$('.container_content').prepend('<img src="images/index/cd.png">');
					$('.mid_down > .titColor').css('margin-right','52%');
				}
			}else {
				$('.mid_down > .titColor').css('margin-right','26%');
				$('.mid_down > .titColor').css('margin-left','0px');
			}
		};
		if(show3D){
			this.mid1();
		}else{
			this.mid1();
		};
		this.mid2();
		// this.numAnimate_float("total_num", 4608);
		// this.createBarEx();
		// this.createInfoResourceRateEx()
	},
	numAnimate_float : function(a, c) {
		try {
			$("." + a).animateNumber({
				number : parseFloat(c),
				easing : "easeInQuad",
				numberStep : function(a, e) {
					e = $(e.elem);
					a = 10 * a.toFixed(1) / 10;
					e.text(a)
				}
			}, 2500)
		} catch (d) {
			console.log(d)
		}
	},
	////////////////////////
	//散点+线集图
	mid1 : function() {
		var geoCoordMap = dataz.mid1_map;
			
		if(geoCoordMap == null || geoCoordMap == ''){
			return;
		}
		var mid_data = dataz.mid1_2;
		
		var BJData = [];
		for(var i=0;i<mid_data.length;i++){
			var bData = [];
			bData.push({name:mid_data[0].NAME}, {name:mid_data[i].NAME,code:22});
			BJData.push(bData);
		}

		var SHData = [
			   
			];

		var GZData = [
		    
		 
		];

		var aa = false;
		//var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var dataItem = data[i];
		        var fromCoord = geoCoordMap[dataItem[0].name];
		        var toCoord = geoCoordMap[dataItem[1].name];
		        if (fromCoord && toCoord) {
		            res.push({
		                fromName: dataItem[0].name,
		                toName: dataItem[1].name,
		                coords: [fromCoord, toCoord]
		            });
		        }
		    }
		    return res;
		};

		var color = ['#F8E71C', '#ffa022', '#46bee9'];
		var series = [];
		[['市人力资源和社会保障局', BJData], ['市经济和信息化委员会', SHData], ['市公安局', GZData]].forEach(function (item, i) {
		    series.push({
		        name: item[0],
		        type: 'lines',
		        zlevel: 1,
		        effect: {
		            show: true,
		            period: 10,
		            trailLength: 0.1,
		            color: '#fff',
		            symbolSize: 3
		        },
		        lineStyle: {
		            normal: {
		                color: color[i],
		                width: 0,
		                curveness: 0.2
		            }
		        },
		        data: convertData(item[1])
		    },
		    {
		        name: item[0],
		        type: 'lines',
		        zlevel: 2,
		        symbol: ['none', 'arrow'],
		        symbolSize: 10,
		        effect: {
		            show: true,
		            period: 6,
		            trailLength: 0,
		            //symbol: planePath,
		            symbolSize: 1
		        },
		        lineStyle: {
		            normal: {
		                color: color[i],
		                width: 1,
		                opacity: 0.6,
		                curveness: 0.2
		            }
		        },
		        data: convertData(item[1])
		    },
		    {
		        name: item[0],
		        type: 'effectScatter',
		        coordinateSystem: 'geo',
		        zlevel: 200,
		        rippleEffect: {
		            brushType: 'stroke'
		        },
		        symbolSize: function (values) {	
		        	if(values[2] == mid_data[0].VAL1){
		        		return 70;
		        	}else if(values[2] >= mid_data[4].VAL1){
		        		return 55;
		        	}else if(values[2] >= mid_data[14].VAL1){
		        		return 35;
		        	}
		            return 20;
		        },
		        label: {
		            normal: {
		                show: true,
		                //position: 'right',
		                formatter: function(params){
//		                	console.log(params)
		                	if(params.value[2] >= mid_data[4].VAL1){
		                		return commonClass._jName(params.name);
		                	}else{
		                		return '';
		                	}
		                },
		                textStyle:{
			            	 color: '#163D53'
			            }
		            },			          
		        },		       
		        itemStyle: {
		            normal: {
		                color: color[i]
		            }
		        },
		        data: item[1].map(function (dataItem) {
		            return {
		                name: dataItem[1].name,
		                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
		            };
		        })
		    });
		});

		var c = echarts.init(document.getElementById("mid1")), d = [], e = {

			tooltip : {
				formatter : function(a) {
					
					if(a.componentSubType == "effectScatter"){
						return a.data.name + "\x3cbr\x3e信息资源数量:" + a.data.value[2]
						+ "\x3cbr\x3e信息资源需求数量:" + a.data.value[3]
						+ "\x3cbr\x3e信息资源被需求数量:" + a.data.value[4]
						+ "\x3cbr\x3e坐标:" + a.data.value[0]+','+a.data.value[1]
					}
				},
				textStyle : {
					align : "left"
				}
			},
			animationDurationUpdate : 5000,
			grid : {
				left : 25,
				right : "12%",
				bottom : "-110%",
				top : "133%",
				containLabel : !0
			},
			geo : {
				show : false,
				map : 'guangdong',
				center : [113.26,23.13],
				zoom : 1.5,
				layoutCenter : ['40%','50%'],
				layoutSize : '80%',
				label : {
					emphasis : {
						show : false
					}
				},
				roam : false,
				itemStyle : {
					normal : {
						areaColor : '#323c48',
						borderColor : '#404a59'
					},
					emphasis : {
						areaColor : '#2a333d'
					}
				}
			},
			series : series
		};
		c.setOption(e);
		c.on('click', function(params) {
			window.location.assign('pages/page_7/page.html?tit='
					+ params.data.value[5]);
			// location.href=;
		});
	},
	mid2 : function() {
		var datas = dataz.mid2;
		var a = {
			xAxis_data : datas.name,

			series_data : [ {
				name : "对行政机关和事业单位服务业务事项数量(条)",
				stack : "no",
				color : "#F2D167",
				data : datas.val1
			}, {
				name : "对企业服务业务事项数量(条)",
				stack : "no",
				color : "#89D65C",
				data : datas.val2
			}, {
				name : "对事业单位服务业务事项数量(条)",
				stack : "no",
				color : "#6CAAE9",
				data : datas.val3
			}, {
				name : "对个人服务业务事项数量(条)",
				stack : "no",
				color : "#087ba5",
				data : datas.val4
			}, {
				name : "对社会组织服务业务事项数量(条)",
				stack : "no",
				color : "#FF7E9F",
				data : datas.val5
			}, {
				name : "对内部管理服务业务事项数量(条)",
				stack : "no",
				color : "#FC7918",
				data : datas.val6
			}, {
				name : "对行政机关服务业务事项数量(条)",
				stack : "no",
				color : "#F8E71C",
				data : datas.val7
			}, {
				name : "对个人和企业服务业务事项数量(条)",
				stack : "no",
				color : "#648CD9",
				data : datas.val8
			},{
				name : "服务业务事项数量(有业务支撑/条)",
				stack : "共享",
				color : "#AAE2FF",
				data : datas.val9
			}
			// { name: "对个人服务业务事项数量(有业务支撑/条)", stack: "共享", color: "#F2D167",
			// data: datas.val8 },
			// { name: "对企业服务业务事项数量(有业务支撑/条)", stack: "共享", color: "#89D65C",
			// data: datas.val7 },
			// { name: "对个人和企业服务业务事项数量(有业务支撑/条)", stack: "共享", color: "#6CAAE9",
			// data: datas.val6 },
			// { name: "对政府服务业务事项数量(有业务支撑/条)", stack: "共享", color: "#087ba5",
			// data: datas.val5 }
			],
		};
		midChart2 = echarts.init(document.getElementById("mid2")), d = [], e = {
			// tooltip : {
			// trigger : "axis",
			// axisPointer : {
			// type : "none"
			// },
			//				
			// },
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				},
				// formatter : function(a, c, d) {
				// return a[0].name
				// + "\x3cbr\x3e<span
				// style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#087ba5'></span>政府服务事项："+a[3].data+"，有业务系统支撑："+a[7].data+""
				// + "\x3cbr\x3e<span
				// style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#6CAAE9'></span>企业和个人事项："+a[2].data+"，有业务系统支撑："+a[6].data+""
				// + "\x3cbr\x3e<span
				// style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#89D65C'></span>企业服务事项："+a[1].data+"，有业务系统支撑："+a[5].data+""
				// + "\x3cbr\x3e<span
				// style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#F2D167'></span>个人服务事项："+a[0].data+"，有业务系统支撑："+a[4].data+""
				// },
				textStyle : {
					align : "left"
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '部门公众服务信息化程度Top10',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			grid : {
				left : "20%",
				right : "5%",
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
						color : "#A9BDD6"
					},
					interval : 0,
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
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				},
				axisTick : {
					show : !1,
					length : 10
				},
				axisLabel : {
					show : !1,
					textStyle : {
						color : "#09b7ff"
					}
				},
				splitLine : {
					show : !1,
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
		midChart2.setOption(e);
		//点击下钻到第二屏
		midChart2.on('click',function(){
			location.href='pages/page_2/page.html';
		});
	},
	ringChart : function() {
		var dd = dataz.left1;

		var wgx = 0;
		var ygx = 0;
		var bgx = 0;
		if (dd != '') {

			dd.forEach(function(val, index, arr) {
				if (val.TYPE == '社会公开') {
					wgx = val.COUNT;
				} else if (val.TYPE == '政府内部强制共享' || val.TYPE == '政府内部条件共享') {
					ygx = val.COUNT;
				}
				if (val.TYPE == '政府内部不共享') {
					bgx = val.COUNT;
				}
			});

		}
		var ridus = 0;

		total = wgx + ygx + bgx;
		if (total != 0) {
			ridus = (((wgx + ygx) * 100) / total).toFixed(2);
		};
		//根据百分比大小确定字体颜色
		var textColor = '';
		if(ridus <= 50){
			textColor = '#FF4F0C';
		}else if(ridus >= 80){
			textColor = 'lime';
		}else{
			textColor = '#fee235';
		};
		leftChart1 = echarts.init(document.getElementById("cuser1")), d = [], e = {
			animationDuration : 5000,
			tooltip : {
				formatter : function(a, c, d) {
					return '信息资源共享度' + "\x3cbr\x3e社会公开:" + wgx
							+ "\x3cbr\x3e政府内部条件共享:" + ygx + "\x3cbr\x3e政府内部不共享:"
							+ bgx
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '信息资源共享度',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			series : [ {
				name : '信息资源共享数量',
				type : 'gauge',

				startAngle : 180,
				endAngle : 0,
				splitNumber : 5,
				radius : '125%',
				center : [ '52%', '67%' ],
				axisLine : { // 坐标轴线
					lineStyle : { // 属性lineStyle控制线条样式
//						color : [ [ 0.50, '#FF4F0C' ], [ 0.80, '#fee235' ],
//								[ 1, 'lime' ] ],
						color : [[1,new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
		                    offset: 0,
							color: '#FF4F0C'
		                }, {
		                    offset: 0.7,
		                    color : '#fee235'
		                }, {
		                    offset: 1,
		                    color : 'lime'
		                }])]],
						width : 18,
						shadowColor : 'rgba(0,0,0,0)', // 默认透明
					}
				},
				axisTick : {
					show : false
				},
				axisLabel : { // 坐标轴小标记
					show : true,
					distance : -7,
					color : 'auto'
				},

				splitLine : { // 分隔线
					show : !1,
				},
				pointer : { // 分隔线
					length : '45%',
					shadowColor : '#fff', // 默认透明
					shadowBlur : 5
				},
				itemStyle : {
					normal : {
						color : '#F4F0EF'
					}
				},
				title : {
					offsetCenter : [ '-80%', '45%' ],
					textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight : 'bolder',
						fontSize : 12,
						fontStyle : 'italic',
						color : '#A9BDD6',
						shadowColor : '#fff', // 默认透明
						shadowBlur : 10
					}
				},
				detail : {
					show : true,
					backgroundColor : 'rgba(0,0,0,0)',
					borderWidth : 0,
					borderColor : '#ccc',
					width : 100,
					height : 40,
					offsetCenter : [ '-70%', '15%' ],
					formatter : '{value}%',
					textStyle : {
						color : textColor,
						fontSize : 27
					}
				},
				data : [ {
					value : ridus,
					name : '可共享'
				} ]
			} ]
		};
		leftChart1.setOption(e);
		//点击下钻到第二屏
		leftChart1.on('click',function(){
			location.href='pages/page_2/page.html';
		});
	},
	ringChart1 : function() {

		var dd = dataz.left2;

		var open = 0;
		var open_app = 0;
		var open_con = 0;
		var not_open = 0;
		if (dd != '') {

			dd.forEach(function(val, index, arr) {
				if (val.TYPE == '无条件') {//无条件开放
					open = val.COUNT;
				}else if (val.TYPE == '内部') {//依申请开放
					open_app = val.COUNT;
				}else if(val.TYPE == '秘密'){//有条件开放
					open_con = val.COUNT;
				}else if (val.TYPE == '机密' || val.TYPE == '绝密') {//不予开放
					not_open = val.COUNT;
				}
			});

		}
		var ridus = 0;

		total = open +open_con+ open_app+ not_open;
		if (total != 0) {
			ridus = (((open_con+ open_app+ not_open ) * 100) / total).toFixed(2);
		};
		//根据百分比大小确定字体颜色
		var textColor = '';
		if(ridus <= 50){
			textColor = '#FF4F0C';
		}else if(ridus >= 80){
			textColor = 'lime';
		}else{
			textColor = '#fee235';
		};

		leftChart2 = echarts.init(document.getElementById("cuser2")), d = [], e = {
			animationDuration : 5000,
			tooltip : {
				formatter : function(a, c, d) {
					return '保密等级' + "\x3cbr\x3e无条件:" + open + "\x3cbr\x3e内部:" + open_app+ "\x3cbr\x3e秘密:" + open_con+ "\x3cbr\x3e绝密:" + not_open
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '保密等级',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			series : [ {
				name : '信息资源开放数量',
				type : 'gauge',

				startAngle : 180,
				endAngle : 0,
				splitNumber : 5,
				radius : '125%',
				center : [ '50%', '67%' ],
				axisLine : { // 坐标轴线
					lineStyle : { // 属性lineStyle控制线条样式
//						color : [ [ 0.50, '#FF4F0C' ], [ 0.80, '#fee235' ],
//								[ 1, 'lime' ] ],
						color : [[1,new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
		                    offset: 0,
							color: '#FF4F0C'
		                }, {
		                    offset: 0.7,
		                    color : '#fee235'
		                }, {
		                    offset: 1,
		                    color : 'lime'
		                }])]],
						width : 18,
						shadowColor : 'rgba(0,0,0,0)', // 默认透明

					}
				},
				axisLabel : { // 坐标轴小标记
					show : !1,
					textStyle : { // 属性lineStyle控制线条样式
						fontWeight : 'bolder',
						color : '#fff',
						shadowColor : '#fff', // 默认透明
						shadowBlur : 10
					}
				},
				axisTick : {
					show : false
				},
				axisLabel : { // 坐标轴小标记
					show : true,
					distance : -7,
					color : 'auto'
				},
				splitLine : { // 分隔线
					show : !1,
				},
				pointer : { // 指针
					length : '45%',
					shadowColor : '#fff', // 默认透明
					shadowBlur : 5
				},
				itemStyle : {
					normal : {
						color : '#F4F0EF'
					}
				},
				title : {
					offsetCenter : [ '-80%', '45%' ],
					textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight : 'bolder',
						fontSize : 12,
						fontStyle : 'italic',
						color : '#A9BDD6',
						shadowColor : '#fff', // 默认透明
						shadowBlur : 10
					}
				},
				detail : {
					show : true,
					backgroundColor : 'rgba(0,0,0,0)',
					borderWidth : 0,
					borderColor : '#ccc',
					width : 100,
					height : 40,
					offsetCenter : [ '-70%', '15%' ],
					formatter : '{value}%',
					textStyle : {
						color : textColor,
						fontSize : 27
					}
				},
				data : [ {
					value : ridus,
					name : '保密'
				} ]
			} ]
		};
		leftChart2.setOption(e);
		//点击下钻到第二屏
		leftChart2.on('click',function(){
			location.href='pages/page_2/page.html';
		});
	},
	createBarEx : function() {
		// 处理数据(数据名称,数据,辅助轴数据)
		var names = [], values = [], aux_vals = [];
		var max = Math.max(dataz.right2.val1[0], dataz.right2.val2[0]);
		for (var i = 0; i < 10; i++) {
			//为页面上显示不会引起歧义,需要打乱原有数据值与委办局名称的对应关系
			//所以将迫切度的值与集中度的委办局名称对应,集中度的值与迫切度的委办局对应
			//但是这样会导致tooltip中显示信息不正确,所以在tooltip中需要获取当前委办局名称是这一组名称中的索引值,然后取另一组中索引值相同的委办局名称显示出来,才是正确的信息
			names.push(dataz.right2.name1[9 - i]);
			names.push(dataz.right2.name2[9 - i]);
			values.push({
				value : dataz.right2.val2[9 - i],
				itemStyle : {
					normal : {
						color : '#48BECD',
						barBorderRadius : [ 0, 5, 5, 0 ]
					}
				},
				label : {
					normal : {
						position : 'left'
					}
				}
			});
			values.push({
				value : dataz.right2.val1[9 - i] * -1,
				itemStyle : {
					normal : {
						color : '#648CD9',
						barBorderRadius : [ 5, 0, 0, 5 ]
					}
				},
				label : {
					normal : {
						position : 'right'
					}
				}
			});
			aux_vals.push(max);
			aux_vals.push(max * -1);
		}
		option = {
			title : {
				text : "迫切度     集中度",
				right : 'center',
				y : '1.5%',
				textStyle : {
					color : "#A9BDD6",
					fontSize : 15,
					fontWeight : "bold"
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '信息资源迫切集中Top10',
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
					var tips = '';
					if (params[0].value < 0) {
						var index = $.inArray(params[0].name, dataz.right2.name2);
						if(index != -1){
							tips += dataz.right2.name1[index];
						}
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
								+ "border-radius:10px;width:9px;height:9px;background-color:"
								+ params[0].color
								+ "'>"
								+ "</span>需要信息资源数量 : "
								+ params[0].value * -1;
					} else {
						var index = $.inArray(params[0].name, dataz.right2.name1);
						if(index != -1){
							tips += dataz.right2.name2[index];
						}
						tips += "\x3cbr\x3e<span style='display:inline-block;margin-right:5px;"
								+ "border-radius:10px;width:9px;height:9px;background-color:"
								+ params[0].color
								+ "'>"
								+ "</span>被需求信息资源数量 : " + params[0].value;
					}
					return tips;
				}
			},
			animationDuration : 5000,
			grid : {
				left : '4%',
				right : "4%",
				bottom : "1%",
				top : "10%",
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
				},
			},
			yAxis : {
				type : "category",
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
				},
				data : names
			},
			series : [ {
				name : "信息资源迫切集中Top10",
				type : "bar",
				// barCategoryGap:'6%',
				label : {
					normal : {
						show : true,
						formatter : function(a) {
							return commonClass._jName(a.name);
						},
						textStyle : {
							color : '#A9BDD6'
						}
					},

				},
				itemStyle : {
					normal : {
						barBorderRadius : [ 5, 0, 0, 5 ]
					}
				},
				data : values,
				z : 5
			}, {
				type : "bar",
				silent : true,
				barGap : '-100%',
				label : {
					normal : {
						show : false
					}
				},
				itemStyle : {
					normal : {
						color : '#303636',
						barBorderRadius : 5
					}
				},
				data : aux_vals
			} ]
		};
		rightChart1 = echarts.init(document.getElementById("left3"));
		rightChart1.setOption(option);
		//点击下钻至第三屏
		rightChart1.on('click',function(){
			location.href='pages/page_3/page.html?next=1';
		});
		return rightChart1;
	},
	
}, rightPanel = {
	ini : function() {
		this.ringChart();
		// this.createStackBar(this.tmpData.stackBar);
		this.right3();
	},
	right3 : function() {
		// "left3":[{"value":0},{"name":"其它","value":36},{"name":"数据库","value":3127},{"name":"电子表格","value":2146},{"name":"纸质文档","value":1515}],
		// data1 = [{value:2154, name:'电子表单'},{value:36, name:'其他'},{value:1519,
		// name:'纸制表单'},{value:3128, name:'数据库'},];
		var data_left3 = [];
		var data_legend = [];
		$.each(dataz.left3,function(i,n){
			data_left3.push({
				name : n.NAME,
				value : n.VALUE
			});
			data_legend.push({
				name : n.NAME,
				icon : 'rect',
				textStyle : {
					color : '#A9BDD6'
				}
			});
		});
		leftChart3 = echarts.init(document.getElementById("right3")), d = [], e = {
			color : "#86D854 #6AA9EB #087BA5 #F3D25D #FE7A18 #F8E71C".split(" "),
			tooltip : {
				trigger : 'item',
				position : [ 10, 10 ],
				formatter : "{a} <br/>{b} : {c} ({d}%)"
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '信息资源电子化存储率',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			animationDuration : 5000,
			legend : {
				show : true,
				orient : 'vertical',
				left : 'left',
				top : 'middle',
				itemGap : 5,
				data : data_legend
			},
			series : [ {
				name : '信息资源存放',
				type : 'pie',
				radius : [ '8%', '55%' ],
				center : [ '60%', '40%' ],
				minAngle : 5,
				data : data_left3,
				label : {
					normal : {
						show : false
					},
					emphasis : {
						show : false
					}
				},
				lableLine : {
					normal : {
						show : false,
						length : 0
					},
					emphasis : {
						show : false
					}
				},

				roseType : 'angle',
				animationType : 'scale',
				animationEasing : 'elasticOut'
			} ]
		};
		leftChart3.setOption(e);
		//点击下钻到第二屏
		leftChart3.on('click',function(){
			location.href='pages/page_2/page.html';
		});
	},
	ringChart : function() {

		var wordData = [];
		var color = [ "#fee235", "#026bb8", "#b6ff00", "#f00", "#34b647",
				"#486497", "#ff6a00", "#d1d74d", "#FF34B3", "#81c3ff",
				"#0ebcf6", "#d48265", "#76EE00", "#087ba5", "#02ef50",
				"#BF3EFF", "#749f83", "#00BFFF", "#c23531", "#ecfbec",
				"#09b7ff" ];

		var index = 0;
		$.each(dataz.right3, function(a, e) {
			index++;
			if (a >= color.length) {
				a = index - a;
			}

			wordData.push({
				name : e.NAME,
				value : [ e.COUNT, e.ISS ],// is 0 代表基础库
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

		rightChart2 = echarts.init(document.getElementById("right_ringChart"));
		rightChart2.setOption({
			animationDuration : 5000,
			tooltip : {
				textStyle : {},
				formatter : function(a, c, d) {
					c = a.data.value;
					return a.name + "\x3cbr\x3e信息资源:" + c[0]
				}
			},
			toolbox : {
				right : 16,
				feature : {
					saveAsImage : {
						name : '主题化信息资源',
						icon : 'M15,0 L10,0 L10,3 C10,3.6 9.6,4 9,4 L4,4 C3.4,4 3,3.6 3,3 L3,0 L1,0 C0.4,0 0,0.4 0,1 L0,15 C0,15.6 0.4,16 1,16 L15,16 C15.6,16 16,15.6 16,15 L16,1 L16,1 C16,0.44771525 15.5522847,3.42636147e-16 15,4.4408921e-16 Z M13,14 L3,14 L3,11 C3,10.4 3.4,10 4,10 L12,10 C12.6,10 13,10.4 13,11 L13,14 Z M7,0 L9,0 L9,3 L7,3 L7,0 Z',
						backgroundColor : '#03162B',
						title : '保存为图'
					}
				}
			},
			grid : {
				left : "3%",
				right : "20%",
				bottom : "3%",
				top : "3%",
				containLabel : !0,
				show : !1
			},
			series : [ {
				type : "wordCloud",
				gridSize : 4,
				// size : [ "100%", "100%" ],
				sizeRange : [ 12, 18 ],
				width : "97%",
				height : "97%",
				rotationRange : [ 0, 0 ],
				// center : [ "30%", "30%" ],
				clickable : !0,
				shape : "circle",
				autoSize : {
					enable : !0,
					minSize : 7
				},
				data : wordData,
				animationEasing : "Linear"
			} ]
		});

		rightChart2.on('click', function(params) {
			var name = params.name;
			var code = null;
			if (params.value[1] == '是') {
				location.href = 'pages/page_4/page.html'
			} else {
				$.each(dataz.right3,function(i,n){
					if(name == n.NAME){
						code = n.CODE;
					}
				});
				window.location.assign('pages/page_5/page.html?tit=' + code);
			}
			//
		});

//		return rightChart2;

	},
	createLineChart : function(a) {
		var c = echarts.init(document.getElementById("right_lineChart"));

		$.getJSON('json/npmdepgraph.min10.json', function(json) {
			c.hideLoading();
			c.setOption(option = {
				title : {
					text : 'NPM Dependencies'
				},
				animationDurationUpdate : 1500,
				animationEasingUpdate : 'quinticInOut',
				series : [ {
					type : 'graph',
					layout : 'none',
					// progressiveThreshold: 700,
					data : json.nodes.map(function(node) {
						return {
							x : node.x,
							y : node.y,
							id : node.id,
							name : node.label,
							symbolSize : node.size,
							itemStyle : {
								normal : {
									color : node.color
								}
							}
						};
					}),
					edges : json.edges.map(function(edge) {
						return {
							source : edge.sourceID,
							target : edge.targetID
						};
					}),
					label : {
						emphasis : {
							position : 'right',
							show : true
						}
					},
					roam : true,
					focusNodeAdjacency : true,
					lineStyle : {
						normal : {
							width : 0.5,
							curveness : 0.3,
							opacity : 0.7
						}
					}
				} ]
			}, true);
		});

	},
	createBarChart : function(a) {
		var c = echarts.init(document.getElementById("right_barChart"));
		c.setOption({
			tooltip : {
				trigger : "axis",
				axisPointer : {
					type : "none"
				}
			},
			grid : {
				left : "0%",
				right : "0%",
				bottom : "5%",
				top : "5%",
				containLabel : !0
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
						color : "#00A5FF"
					},
					interval : 0
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
				axisLine : {
					lineStyle : {
						color : "#072543",
						width : 0
					}
				},
				axisTick : {
					length : 0
				},
				axisLabel : {
					textStyle : {
						color : "#00A5FF"
					}
				},
				splitLine : {
					show : !1,
					lineStyle : {
						color : "#072543"
					}
				}
			} ],
			series : [ {
				name : a.series_name1,
				type : "bar",
				barWidth : "12%",
				barGap : .5,
				itemStyle : {
					normal : {
						color : "#40e457"
					}
				},
				data : a.series_data1
			}, {
				name : a.series_name2,
				type : "bar",
				barWidth : "12%",
				barGap : .5,
				itemStyle : {
					normal : {
						color : "#fb406c"
					}
				},
				data : a.series_data2
			} ]
		});
		this.eChartsResize(c)
	},
	eChartsResize : function(a) {
		var c = this;
		$(window).resize(function() {
			// c.createStackBar(rightPanel.tmpData.stackBar)
		})
	}
}, containerPanel = {
	list_bottom : [ {
		name : "\u4eba\u793e\u5c40",
		img : "RSJ",
		position : {
			x : 8,
			y : 260
		},
		num1 : 13,
		num2 : 53443,
		num3 : 32324,
		num4 : 33,
		num5 : 3
	}, {
		name : "\u4ea4\u901a\u5c40",
		img : "JTJ",
		position : {
			x : 0,
			y : 136
		},
		num1 : 7,
		num2 : 43343,
		num3 : 64324,
		num4 : 56,
		num5 : 7
	}, {
		name : "\u7edf\u8ba1\u5c40",
		img : "TJJ",
		position : {
			x : 79,
			y : 348
		},
		num1 : 11,
		num2 : 22343,
		num3 : 23424,
		num4 : 17,
		num5 : 5
	}, {
		name : "\u5de5\u5546\u5c40",
		img : "GSJ",
		position : {
			x : 75,
			y : 176
		},
		num1 : 12,
		num2 : 27443,
		num3 : 98224,
		num4 : 21,
		num5 : 2
	} ],
	list_right : [ {
		name : "\u516c\u5b89\u5c40",
		img : "GAJ",
		position : {
			x : 137,
			y : 15
		},
		num1 : 9,
		num2 : 23435,
		num3 : 23424,
		num4 : 19,
		num5 : 5
	}, {
		name : "\u56fd\u7a0e\u5c40",
		img : "GSJ",
		position : {
			x : 187,
			y : 95
		},
		num1 : 21,
		num2 : 32433,
		num3 : 12124,
		num4 : 24,
		num5 : 6
	}, {
		name : "\u5730\u7a0e\u5c40",
		img : "DSJ",
		position : {
			x : 220,
			y : 3
		},
		num1 : 22,
		num2 : 32443,
		num3 : 75434,
		num4 : 25,
		num5 : 7
	} ],
	list_left : [ {
		name : "\u516c\u79ef\u91d1",
		img : "GJJ",
		position : {
			x : 141,
			y : 96
		},
		num1 : 25,
		num2 : 43343,
		num3 : 36724,
		num4 : 12,
		num5 : 8
	}, {
		name : "\u536b\u8ba1\u59d4",
		img : "WJW",
		position : {
			x : 202,
			y : 180
		},
		num1 : 23,
		num2 : 21343,
		num3 : 32224,
		num4 : 23,
		num5 : 7
	}, {
		name : "\u6c11\u653f\u5c40",
		img : "MZJ",
		position : {
			x : 374,
			y : 285
		},
		num1 : 18,
		num2 : 32543,
		num3 : 76544,
		num4 : 13,
		num5 : 13
	} ],
	list_line : [ {
		end : [ .569, .492 ],
		start : [ .624, .052 ]
	}, {
		end : [ .569, .492 ],
		start : [ .595, .052 ]
	}, {
		end : [ .569, .492 ],
		start : [ .651, .052 ]
	}, {
		end : [ .547, .432 ],
		start : [ .487, .188 ]
	}, {
		end : [ .547, .432 ],
		start : [ .527, .177 ]
	}, {
		end : [ .616, .482 ],
		start : [ .729, .182 ]
	}, {
		end : [ .616, .482 ],
		start : [ .759, .182 ]
	}, {
		end : [ .616, .482 ],
		start : [ .775, .04 ]
	}, {
		end : [ .596, .532 ],
		start : [ .917, .344 ]
	}, {
		end : [ .596, .532 ],
		start : [ .91, .3 ]
	}, {
		end : [ .62, .552 ],
		start : [ .83, .419 ]
	}, {
		end : [ .62, .552 ],
		start : [ .929, .49 ]
	}, {
		end : [ .488, .494 ],
		start : [ .2, .335 ]
	}, {
		end : [ .488, .494 ],
		start : [ .2, .305 ]
	}, {
		end : [ .524, .574 ],
		start : [ .38, .833 ]
	}, {
		end : [ .488, .494 ],
		start : [ .29, .485 ]
	} ],
	imgPath : "images/index/poi/",
	ini : function() {
		// this.bottomList();
		// this.rightList();
		// this.leftList();
		// this.line()
	},
	bottomList : function() {
		var a = $(".container_content"), c = this.imgPath + "bottom/", d = "";
		$.each(this.list_bottom, function(a, b) {
			d += "\x3cdiv class\x3d'poi_img_type box' id\x3d'poi_img_b_" + a
					+ "' data-tooltip\x3d' " + "<table>" + ""
					+ "<tr><td align=\"right\">下属机构：</td><td align=\"left\">"
					+ b.num1 + "</td></tr>"
					+ "<tr><td>业务事项：</td><td align=\"left\">" + b.num2
					+ "</td></tr>" + "<tr><td>信息资源：</td><td align=\"left\">"
					+ b.num3 + "</td></tr>"
					+ "<tr><td>&nbsp;&nbsp;&nbsp数据项：</td><td align=\"left\">"
					+ b.num4 + "</td></tr>"
					+ "<tr><td>信息系统：</td><td align=\"left\">" + b.num5
					+ "</td></tr>" + "</table>" + "'  style\x3d'bottom:"
					+ b.position.x + "px;right:" + b.position.y
					+ "px'\x3e\x3cimg src\x3d'" + c + b.img
					+ ".png' /\x3e\x3c/div\x3e"
		});
		a.append(d);
		$.each(this.list_bottom, function(a, b) {
			$("#poi_img_b_" + a).darkTooltip()
		})
	},
	rightList : function() {
		var a = $(".container_content"), c = this.imgPath + "right/", d = "";
		$.each(this.list_right, function(a, b) {
			d += "\x3cdiv class\x3d'poi_img_type box' id\x3d'poi_img_r_" + a
					+ "' data-tooltip\x3d'" + "<table>" + ""
					+ "<tr><td align=\"right\">下属机构：</td><td align=\"left\">"
					+ b.num1 + "</td></tr>"
					+ "<tr><td>业务事项：</td><td align=\"left\">" + b.num2
					+ "</td></tr>" + "<tr><td>信息资源：</td><td align=\"left\">"
					+ b.num3 + "</td></tr>"
					+ "<tr><td>&nbsp;&nbsp;&nbsp数据项：</td><td align=\"left\">"
					+ b.num4 + "</td></tr>"
					+ "<tr><td>信息系统：</td><td align=\"left\">" + b.num5
					+ "</td></tr>" + "</table>" + "' style\x3d'bottom:"
					+ b.position.x + "px;right:" + b.position.y
					+ "px'\x3e \x3cimg src\x3d'" + c + b.img
					+ ".png'/\x3e\x3c/div\x3e"
		});
		a.append(d);
		$.each(this.list_bottom, function(a, b) {
			$("#poi_img_r_" + a).darkTooltip()
		})
	},
	leftList : function() {
		var a = $(".container_content"), c = this.imgPath + "left/", d = "";
		$.each(this.list_left, function(a, b) {
			d += "\x3cdiv class\x3d'poi_img_type box' id\x3d'poi_img_l_" + a
					+ "' data-tooltip\x3d'" + "<table>" + ""
					+ "<tr><td align=\"right\">下属机构：</td><td align=\"left\">"
					+ b.num1 + "</td></tr>"
					+ "<tr><td>业务事项：</td><td align=\"left\">" + b.num2
					+ "</td></tr>" + "<tr><td>信息资源：</td><td align=\"left\">"
					+ b.num3 + "</td></tr>"
					+ "<tr><td>&nbsp;&nbsp;&nbsp数据项：</td><td align=\"left\">"
					+ b.num4 + "</td></tr>"
					+ "<tr><td>信息系统：</td><td align=\"left\">" + b.num5
					+ "</td></tr>" + "</table>" + "' style\x3d'bottom:"
					+ b.position.x + "px;left:" + b.position.y
					+ "px'\x3e \x3cimg src\x3d'" + c + b.img
					+ ".png' /\x3e\x3c/div\x3e"
		});
		a.append(d);
		$.each(this.list_bottom, function(a, b) {
			$("#poi_img_l_" + a).darkTooltip()
		})
	},
	line : function() {
		echarts.init(document.getElementById("content_line")).setOption(
				this.getOption())
	},
	getOption : function() {
		var a = this.getSeriesData(this.list_line);
		return {
			grid : {
				left : 0,
				right : 0,
				top : 0,
				bottom : 0
			},
			xAxis : [ {
				type : "value",
				min : 0,
				max : 1,
				splitLine : {
					show : !1
				}
			} ],
			yAxis : [ {
				type : "value",
				min : 0,
				max : 1,
				splitLine : {
					show : !1
				},
				axisLine : {
					show : !1
				}
			} ],
			graphic : [ {
				id : "football-ground",
				type : "image",
				style : {
					x : 0,
					y : 0
				},
				left : 0,
				top : 0
			} ],
			series : [ {
				name : "",
				type : "lines",
				coordinateSystem : "cartesian2d",
				zlevel : 2,
				effect : {
					show : !0,
					period : 6,
					trailLength : 0,
					symbolSize : 6,
					color : new echarts.graphic.RadialGradient(.5, .5, .4, [ {
						offset : 0,
						color : "#ffffff"
					}, {
						offset : 1,
						color : "#F0F0F0"
					} ], !1)
				},
				lineStyle : {
					normal : {
						color : "rgba(255,255,255,0.9)",
						width : 1,
						opacity : .5,
						curveness : .15,
						shadowBlur : 10,
						shadowOffsetX : 2,
						shadowColor : "rgba(255, 255, 255, 0.5)"
					}
				},
				data : a
			} ]
		}
	},
	getSeriesData : function(a) {
		var c = [];
		$.each(a, function(a, e) {
			c.push({
				coords : [ e.start, e.end ]
			})
		});
		return c
	}
}, containerPanel_rightIcon = {
	list_bottom : [ {
		name : "\u4eb2\u5c5e\u4fe1\u606f",
		img : "r_1",
		position : {
			x : 8,
			y : 126
		},
		opacity : 1,
		num : 10279504
	}, {
		name : "\u53c2\u4fdd\u4fe1\u606f",
		img : "r_2",
		position : {
			x : 71,
			y : 23
		},
		opacity : 1,
		num : 1976432
	}, {
		name : "\u7f34\u5f81\u660e\u7ec6",
		img : "r_3",
		position : {
			x : 84,
			y : 153
		},
		opacity : 1,
		num : 4639798
	}, {
		name : "\u52b3\u52a8\u5408\u540c",
		img : "r_4",
		position : {
			x : 87,
			y : 95
		},
		opacity : 1,
		num : 931760
	}, {
		name : "\u5e38\u4f4f\u4eba\u53e3",
		img : "r_5",
		position : {
			x : 24,
			y : 32
		},
		opacity : 1,
		num : 10279504
	}, {
		name : "\u516c\u79ef\u91d1",
		img : "r_6",
		position : {
			x : 36,
			y : 106
		},
		opacity : 1,
		num : 1220631
	}, {
		name : "\u6b8b\u75be\u4eba\u5458",
		img : "r_7",
		position : {
			x : -10,
			y : 8
		},
		opacity : 1,
		num : 401519
	} ],
	imgPath : "images/index/rightIcon/",
	ini : function() {
		var a = $(".right_population"), c = this.imgPath, d = "";
		$.each(this.list_bottom, function(a, b) {
			var e = parseInt(3 * Math.random() + 1);
			d += "\x3cdiv class\x3d'poi_img_type box poi_img_flash_" + e
					+ "' id\x3d'poi_img_i_r_" + a + "' data-tooltip\x3d'"
					+ b.name + ":" + b.num + "\u6761' style\x3d'opacity:"
					+ b.opacity + ";bottom:" + b.position.x + "px;right:"
					+ b.position.y + "px'\x3e \x3cimg  src\x3d'" + c + b.img
					+ ".png' /\x3e\x3c/div\x3e"
		});
		a.append(d);
		$.each(this.list_bottom, function(a, b) {
			$("#poi_img_i_r_" + a).darkTooltip()
		})
	}
}, containerPanel_leftIcon = {
	list_bottom : [ {
		name : "\u4e2a\u4f53\u767b\u8bb0",
		img : "l_1",
		position : {
			x : 72,
			y : 88
		},
		opacity : 1,
		num : 3436321
	}, {
		name : "\u4f01\u4e1a\u7eb3\u7a0e",
		img : "l_2",
		position : {
			x : 22,
			y : 39
		},
		opacity : 1,
		num : 12399346
	}, {
		name : "\u4f01\u4e1a\u53d8\u66f4",
		img : "l_3",
		position : {
			x : 108,
			y : 70
		},
		opacity : 1,
		num : 197512
	}, {
		name : "\u4f01\u4e1a\u767b\u8bb0",
		img : "l_4",
		position : {
			x : 51,
			y : 2
		},
		opacity : 1,
		num : 1298049
	}, {
		name : "\u7a0e\u52a1\u4fe1\u606f",
		img : "l_5",
		position : {
			x : 92,
			y : 38
		},
		opacity : 1,
		num : 195977
	}, {
		name : "\u6cd5\u4eba\u4ee3\u8868",
		img : "l_6",
		position : {
			x : 49,
			y : 125
		},
		opacity : 1,
		num : 627596
	}, {
		name : "\u6ce8\u9500\u4fe1\u606f",
		img : "l_7",
		position : {
			x : 97,
			y : 138
		},
		opacity : 1,
		num : 129442
	} ],
	imgPath : "images/index/leftIcon/",
	ini : function() {
		var a = $(".left_medical"), c = this.imgPath, d = "";
		$.each(this.list_bottom, function(a, b) {
			var e = parseInt(3 * Math.random() + 1);
			d += "\x3cdiv class\x3d'poi_img_type box poi_img_flash_" + e
					+ "' id\x3d'poi_img_i_l_" + a + "' data-tooltip\x3d'"
					+ b.name + ":" + b.num + "\u6761' style\x3d'opacity:"
					+ b.opacity + ";bottom:" + b.position.x + "px;right:"
					+ b.position.y + "px'\x3e \x3cimg src\x3d'" + c + b.img
					+ ".png' /\x3e\x3c/div\x3e"
		});
		a.append(d);
		$.each(this.list_bottom, function(a, b) {
			$("#poi_img_i_l_" + a).darkTooltip()
		})
	}
};
//测试mime
    _mime =  function(option, value) {
          var mimeTypes = navigator.mimeTypes;
          for (var mt in mimeTypes) {
              if (mimeTypes[mt][option] == value) {
                  return true;
              }
          }
          return false;
      };
    
    //跳动数字
    numAnimate_int= function(a, c) {
		try {
			$("." + a).animateNumber({
				number: Number(c)
			}, 2500)
		} catch (d) {
			console.log(d)
		}
	},
	numAnimate_float= function(a, c) {
		try {
			$("." + a).animateNumber({
				number: parseFloat(c),
				easing: "easeInQuad",
				numberStep: function(a, e) {
					e = $(e.elem);
					a = 10 * a.toFixed(0) / 10;
					e.text(a)
				}
			}, 2500)
		} catch (d) {
			console.log(d)
		}
	}