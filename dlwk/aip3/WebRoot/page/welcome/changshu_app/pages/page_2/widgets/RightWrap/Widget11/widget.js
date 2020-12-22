'use strict';
define(["dojo/_base/declare", "dojo/_base/html", "./../../echartsCommon", "./../../BaseWidget", "dojo/text!./../../Template.html"],
function(b, f, a, c, d) {
    var e = {
        title: a.getTitle("\u793e\u4f1a\u6d88\u8d39\u54c1\u96f6\u552e\u603b\u989d\u6298\u7ebf"),
        tooltip: {
            trigger: "axis",
            formatter: function(a) {
                return  "常熟增长率: " + a[0].value + "%\x3cbr\x3e" + a[1].seriesName + ": " + a[1].value + "%"
            }
        },
        xAxis: {
            splitNumber: 5,
            data: [2012, 2013, 2014, 2015, 2016]
        },
        grid: {
            top: "48",
            left: 40
        },
        yAxis: {
            min: 8,
            max: 22,
            splitNumber: 7,
            name: "%",
            nameGap: 10
        },
        series: [{
            name: "常熟增长率",
            type: "line",
            showSymbol: !1,
            data: [17.2,13,9.6,9.2,9.6]
        },
        {
            name: "苏州增长率",
            type: "line",
            showSymbol: !1,
            data: [14.5,13,11.9,8.8,10.7]
        }],
        color: a.getColor(4)
    };
    return b([c], {
        baseClass: "widget11",
        templateString: d,
        postCreate: function() {},
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            this.chart.setOption(a.getBaseLine());
            this.chart.setOption(e)
        }
    })
});