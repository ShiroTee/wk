'use strict';
define(["dojo/_base/declare", "dojo/_base/html", "./../../echartsCommon", "./../../BaseWidget", "dojo/text!./../../Template.html"],
function(b, f, a, c, d) {
    var e = {
        title: a.getTitle("一般公共预算收入"),
        tooltip: {
            formatter: "{c}\u4ebf\u5143"
        },
        xAxis: {
            data: [2012, 2013, 2014, 2015, 2016, 2017]
        },
        yAxis: {
            min: 0,
            max: 200,
            splitNumber: 7,
            name: "\u4ebf\u5143"
        },
        grid: {
            top: 48,
            left: 40
        },
        series: [{
            type: "bar",
            barWidth:10,
//            itemStyle: {
//                normal: {
//                    color: "#6600FF",
//                    opacity: 1
//                }
//            },
            data: [128.15,138.58,147.4,157.7,173.58]
        }],
        color: a.getColor(1)
    };
    return b([c], {
        baseClass: "widget10",
        templateString: d,
        postCreate: function() {},
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            this.chart.setOption(a.getBaseColumn());
            this.chart.setOption(e)
        }
    })
});