'use strict';
define(["dojo/_base/declare", "dojo/_base/html", "./../../../echartsCommon", "./../../../BaseWidget", "dojo/text!./../../../Template.html"],
function(b, f, a, c, d) {
    var e = {
        title: a.getTitle("五十亿元产业"),
        tooltip: {
            position: "top",
            formatter: "{a}: {c}\u4ebf\u5143"
        },
        yAxis: {
            min: 0,
            max: 6000,
            name: "(\u4ebf\u5143)",
            nameGap: 8,
            splitNumber: 4
        },
        xAxis: {
            data: [2012, 2013, 2014, 2015, 2016]
        },
        grid: {
            top: 45,
            left: 54
        },
        series: [{
            name: "\u5de5\u4e1a\u603b\u4ea7\u503c",
            type: "bar",
            barWidth: 20,
            data: [4405.52,4559.71,4581.24,4554.3,4577.1]
        }],
        color: a.getColor(4)
    };
    return b([c], {
        baseClass: "widget5",
        templateString: d,
        postCreate: function() {},
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            this.chart.setOption(a.getBaseColumn());
            this.chart.setOption(e)
        }
    })
});