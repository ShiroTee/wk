'use strict';
define(["dojo/_base/declare", "dojo/_base/html", "./../../../echartsCommon", "./../../../BaseWidget", "dojo/text!./../../../Template.html"],
function(b, f, a, c, d) {
    var e = {
        title: a.getTitle("\u4eba\u5747GDP"),
        tooltip: {
            trigger: "axis",
            formatter: "{b}\u5e74: {c}\u5143"
        },
        grid: {
            top: 45,
            left: 56,
        },
        xAxis: {
            data: [2012,2013,2014,2015,2016]
        },
        yAxis: {
            min: 120000,
            max: 150000,
            name: "(\u5143)",
            nameGap: 8
        },
        series: [{
            name: "s1",
            lineStyle: {
                normal: {
                    color: "#EA2E24"
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(234,46,36, 0.5)"
                    },
                    {
                        offset: 1,
                        color: "rgba(234,46,36, 0)"
                    }])
                }
            },
            data: [129800,130577,134088,135431,139768]
        }]
    };
    return b([c], {
        baseClass: "widget8",
        templateString: d,
        postCreate: function() {},
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            this.chart.setOption(a.getBaseLine());
            this.chart.setOption(e)
        }
    })
});