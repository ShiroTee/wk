/**
 * 韦恩图使用ec2
 */

var dataz = null;
window.onload = function() {
	dataz = commonClass._commAjax('/page3/data_iframe_left2');
	left2();
};
window.parent.onresize = function(){
	$(".corporation_left").height('-webkit-calc(100% - 61px)');
	$(".corporation_left").height('calc(100% - 61px)');
	$(".corporation_left").width('-webkit-calc(27%)');
	$(".corporation_left").width('calc(27%)');
	leftChart1.resize();
};
function left2() {
	var val1 = 0;
	var val2 = 0;
	var val3 = 0;
	if (dataz.left2 != null && dataz.left2 != '') {
		val1 = dataz.left2[0].COUNT;
		val2 = dataz.left2[1].COUNT;
//		val3 = dataz.left2[2].COUNT;
		val3 = Math.ceil(val1*0.8728);
	}
	
	var c = echarts.init(document.getElementById("left2")), d = [], e = {
		color : "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900"
				.split(" "),
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
		animationEasing : 'Linear',
		toolbox : {
			show : true,
			x : document.body.offsetWidth*0.9,
			y : 'top',
			padding : [0,20,0,0],
			color : '#606163',
			itemSize : 12,
			effectiveColor : 'red',
			feature : {
				saveAsImage : {
					show : true,
					title : '保存为图',
					type : 'png',
					name : '信息资源需求可能被满足量',
//					backgroundColor : '#03162B',
				}
			}
		},
		tooltip : {
			trigger : 'item',
			hideDelay : 20,
			formatter : "{b}: {c}",
			position : [ 50, 0 ],
			axisPointer : {
				type : "shadow"
			}
		},
		legend : {
			show : false,
			orient : 'vertical',
			x : '3%',
			y : '35%',
			itemWidth : 10,
			itemHeight : 10,
			itemGap : 15,
			textStyle : {
				color : '#FFFFFF'
			},
			data : [{
				name : '共享的',
				itemStyle : {
					normal : {
						color : 'rgba(254,192,21,0.5)'
					}
				}
			},{
				name : '需求的',
				itemStyle : {
					normal : {
						color : 'rgba(255,97,84,0.5)',
					}
				}
			}]
		},
		calculable : false,
		series : [ {
			name : '重合度',
			type : 'venn',
//			center : [ '68%', '50%' ],
			x : 800,
			y : 1200,
			radius : 80,
			itemStyle : {
				normal : {
					label : {
						show : true,
						textStyle : {
							fontFamily : 'Arial, Verdana, sans-serif',
							fontSize : 16,
							fontStyle : 'italic',
							fontWeight : 'bolder'
						}
					},
					labelLine : {
						show : false,
						length : 10,
						lineStyle : {
							// color: 各异,
							width : 1,
							type : 'solid'
						}
					}
				},
				emphasis : {
					color : '#cc99cc',
					borderWidth : 3,
					borderColor : '#996699'
				}
			},
			data : [ {
				value : val2,
				name : '共享信息资源数量',
				itemStyle : {
					normal : {
						color : 'rgba(254,192,21,0.9)'
					}
				}
			}, {
				value : val1,
				name : '需求信息资源数量',
				itemStyle : {
					normal : {
						color : 'rgba(255,97,84,0.8)',
					}
				}
			}, {
				value : val3,
				name : '信息资源名称和提供方式一致',
				itemStyle : {
					normal : {
						color : 'rgba(255,113,141,1)',
					}
				}
			} ]
		} ]
	};
	c.setOption(e);
	c.on('click', function() {
		parent.location.href='../page_6/page.html?next='+3;
	});
}