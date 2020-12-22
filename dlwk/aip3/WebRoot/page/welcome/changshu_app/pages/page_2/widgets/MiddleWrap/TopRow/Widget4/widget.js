'use strict';
define("dojo/_base/declare dojo/_base/lang dojo/_base/html ./../../../echartsCommon ./../../../BaseWidget dojo/text!./../../../Template.html".split(" "),
function(d, e, k, a, f, g) {
    var h = {
        title: a.getTitle("GDP"),
        tooltip: {
            formatter: function(a) {
                var c = a.seriesIndex,
                b;
                0 === c ? b = "\u4ebf\u5143": 1 === c && (b = "%");
                return a.seriesName + ": " + a.value + b
            }
        },
        visualMap: {
            type: "continuous",
            show: !1,
            min: 0,
            max: 2500,
            color: ["#FB3B3B", "#FFF54E"],
            seriesIndex: 0
        },
        grid: {
            top: 48,
            right: 38,
            bottom: 38,
            left: 60
        },
        xAxis: {
            data: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
        },
        yAxis: [{
            name: "(\u4ebf\u5143)",
            min: 0,
            max: 2500
        },
        e.mixin(a.getyAxis(), {
            name: "(%)",
            nameTextStyle: a.getNameTextStyle(),
            min: 6,
            max: 16
        })],
        series: [{
            name: "GDP",
            type: "bar",
            barWidth: 30,
            data: [1453.61,1710.45,1870.19,1980.31,2009.36,2044.88,2112.39]
        },
        {
            name: "\u589e\u957f\u7387",
            type: "line",
            yAxisIndex: 1,
            showSymbol: !0,
            symbol: "circle",
            symbolSize: 14,
            itemStyle: {
                normal: {
                    color: "#68FB3B",
                    borderWidth: 3,
                    borderType: "solid",
                    borderColor: "#68FB3B",
                    opacity: 1
                }
            },
            lineStyle: {
                normal: {
                    width: 3,
                    color: "#68FB3B"
                }
            },
            data: [13.6,12.2,10.2,9,7.5,7.2,7.5]
        }]
    };
    return d([f], {
        baseClass: "widget4",
        templateString: g,
        postCreate: function() {},
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            this.chart.setOption(a.getBaseLine());
            this.chart.setOption(h)
        }
    })
});