var animationAfterStill = {
	autoPlay: function(charts,midChart1,graphNames) {
		var active = 0;
		var i = 0;
		var temp = -1;
		var dataIndex = 0;
		var options = [];
		
		$('body').bind("mousedown keyup", function() {
			active = 0;
			i = 0;
			if (options.length != 0) {
				for (var i = 0; i < options.length; i++) {
					if (charts[i] != undefined) {
						charts[i].setOption(options[i])
					}
				}
//				showRandom(midChart1,$.inArray('市经济和信息化委员会',graphNames));
				options.splice(0, options.length)
			}
		});
		$('body').bind("mousemove", function() {
			active = 0;
			i = 0;
			if (options.length != 0) {
				for (var i = 0; i < options.length; i++) {
					if (charts[i] != undefined) {
						charts[i].setOption(options[i])
					}
				}
//				showRandom(midChart1,$.inArray('市经济和信息化委员会',graphNames));
				options.splice(0, options.length)
			}
		});
		setInterval(function() {
			if (active == 1 && i <= 20) {
				active = 0;
				$.each(charts, function(index, chart) {
					options.push(chart.getOption())
				});
				setTimeout(function() {
					if (i <= 20 && options.length != 0) {
						if (i == 0) {
							i++;
							reloadChart(charts, 0);
							reloadChart(charts, 1);
							reloadChart(charts, 2);
//							dataIndex = getIndex();
//							showRandom(midChart1,dataIndex);
//							temp = dataIndex;
						} else if (i - 10 == 0) {
							i++;
							reloadChart(charts, 3);
							this.numAnimate_float("total_num", dataz.right1.ZY_NUM);
							this.numAnimate_float("total_num1", dataz.right1.SJ_NUM);
//							dataIndex = getIndex();
//							showRandom(midChart1,dataIndex);
//							temp = dataIndex;
						} else if (i - 20 == 0) {
							i = 0;
							reloadChart(charts, 4);
							reloadChart(charts, 5);
							this.numAnimate_float("l1", dataz.right1.ZW_NUM);
							this.numAnimate_float("l2", dataz.right1.JG_NUM);
							this.numAnimate_float("l3", dataz.right1.SX_NUM);
//							dataIndex = getIndex();
//							showRandom(midChart1,dataIndex);
//							temp = dataIndex;
						} else i++;
						var id = setTimeout(arguments.callee, 450);
						if (i == 0) {
							window.clearTimeout(id)
						}
					}
				}, 450)
			} else {
				active++
			}
		}, 7500);

		function reloadCharts(charts, i) {
			for (var j = 0; j <= i; j++) {
				charts[j].clear();
				charts[j].setOption(options[j])
			}
		};

		function reloadChart(charts, i) {
			charts[i].clear();
			charts[i].setOption(options[i])
		};
		
//		function showRandom(chart,dataIndex){
//			chart.dispatchAction({
//			    type: 'focusNodeAdjacency',
//			    // 使用 seriesId 或 seriesIndex 或 seriesName 来定位 series.
//			    seriesIndex: 0,
//			    // 使用 dataIndex 来定位节点。
//			    dataIndex: dataIndex
//			});
//		};
		
		function getIndex(){
			dataIndex = Math.ceil(Math.random()*70);
			while(temp == dataIndex){
				dataIndex = Math.ceil(Math.random()*70);
			}
			return dataIndex;
		};

		function numAnimate_int(a, c) {
			try {
				$("." + a).animateNumber({
					number: Number(c)
				}, 2500)
			} catch (d) {
				console.log(d)
			}
		};

		function numAnimate_float(a, c) {
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
	},
};