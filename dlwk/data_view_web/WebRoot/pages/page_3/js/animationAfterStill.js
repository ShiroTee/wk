var animationAfterStill = {
	autoPlay: function(charts) {
		var active = 0;
		var i = 0;
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
							reloadChart(charts, 1)
						} else if (i == 10) {
							i++;
							reloadChart(charts, 2);
						} else if (i == 20) {
							i = 0;
							reloadChart(charts, 3);
							reloadChart(charts, 4)
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
		}
	},
};