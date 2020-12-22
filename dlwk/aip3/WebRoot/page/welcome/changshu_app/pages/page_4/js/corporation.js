var _tmpData = null;
window.onload = function() {
    _tmpData = corporData;
    pageLoad()
};
function pageLoad() {
    $(".header_date").text(commonClass._getDate());
    leftCorPanel.init();
    rightCorPanel.init();
    middelCorPanel.init();
    window.onresize = function() {
        barEx.resize();
        barEx1.resize();
        radarEx.resize();
        dieBar.resize();
        dieBarex.resize();
        industryDesity.resize();
        industryCloud.resize();
        PieIndustryPer.resize();
        pieIndustryAve.resize();
        bubbleIndustyr.resize()
    }
}
var leftCorPanel = {
    init: function() {
        barEx = this.createBarEx();
        barEx1 = this.createBarEx1();
        radarEx = this.createRadar();
        dieBar = this.createDieBar();
        dieBarex = this.createDieBarEX()
    },
    createBarEx1: function() {
        for (var a = _tmpData.left.newIndustry.data2010.series_data_share,
        b = _tmpData.left.newIndustry.data2010.xAxis_data,
        c = 0,
        d = 0; d < b.length; d++) {
            var e = b[d].length;
            e > c && (c = e)
        }
        a = {
            title: {
                right: 0,
                textAlign: "left",
                subtext: "2014\u5e74",
                subtextStyle: {
                    color: "#018ccd",
                    fontWeight: "bold"
                }
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: -85,
                right: "0%",
                bottom: "-10%",
                top: "23%",
                containLabel: !0
            },
            xAxis: [{
                type: "value",
                inverse: !0,
                axisLabel: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                splitLine: {
                    show: !1
                }
            }],
            yAxis: [{
                type: "category",
                axisLabel: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                inverse: !0,
                axisLine: {
                    show: !1
                },
                data: b
            }],
            series: [{
                name: "\u4f01\u4e1a\u6570(\u5bb6)",
                type: "bar",
                barWidth: "45%",
                barGap: "0",
                label: {
                    normal: {
                        show: !0,
                        position: "left"
                    }
                },
                data: [{
                    value: a[0],
                    itemStyle: {
                        normal: {
                            color: "#fd713e"
                        }
                    }
                },
                {
                    value: a[1],
                    itemStyle: {
                        normal: {
                            color: "#fdaf3e"
                        }
                    }
                },
                {
                    value: a[2],
                    itemStyle: {
                        normal: {
                            color: "#fdd43e"
                        }
                    }
                },
                {
                    value: a[3],
                    itemStyle: {
                        normal: {
                            color: "#b2d464"
                        }
                    }
                },
                {
                    value: a[4],
                    itemStyle: {
                        normal: {
                            color: "#67d489"
                        }
                    }
                }]
            }]
        };
        b = echarts.init(document.getElementById("NewIndustryBarEx1"));
        b.setOption(a);
        return b
    },
    createBarEx: function() {
        var a = _tmpData.left.newIndustry.data2015.series_data_share.reverse();
        option = {
            title: {
                right: 63,
                textAlign: "right",
                subtext: "2016\u5e74",
                subtextStyle: {
                    color: "#018ccd",
                    fontWeight: "bold"
                }
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: -25,
                right: "12%",
                bottom: "-10%",
                top: "23%",
                containLabel: !0
            },
            xAxis: {
                type: "value",
                axisLabel: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                splitLine: {
                    show: !1
                }
            },
            yAxis: {
                type: "category",
                axisLabel: {
                    show: !1,
                    interval: 9
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                data: _tmpData.left.newIndustry.data2015.xAxis_data.reverse()
            },
            series: [{
                name: "\u4f01\u4e1a\u6570(\u5bb6)",
                type: "bar",
                barWidth: "45%",
                label: {
                    normal: {
                        show: !0,
                        position: "right"
                    }
                },
                data: [{
                    value: a[0],
                    itemStyle: {
                        normal: {
                            color: "#67d489"
                        }
                    }
                },
                {
                    value: a[1],
                    itemStyle: {
                        normal: {
                            color: "#b2d464"
                        }
                    }
                },
                {
                    value: a[2],
                    itemStyle: {
                        normal: {
                            color: "#fdd43e"
                        }
                    }
                },
                {
                    value: a[3],
                    itemStyle: {
                        normal: {
                            color: "#fdaf3e"
                        }
                    }
                },
                {
                    value: a[4],
                    itemStyle: {
                        normal: {
                            color: "#fd713e"
                        }
                    }
                }]
            }]
        };
        a = echarts.init(document.getElementById("NewIndustryBarEx"));
        a.setOption(option);
        return a
    },
    createRadar: function() {
        var a = _tmpData.left.IndustrySuv.data,
        a = {
            title: {
                text: "\u4f01\u4e1a\u5bb6\u6570",
                textStyle: {
                    color: "#018ccd",
                    fontSize: 15,
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {},
            radar: {
                indicator: _tmpData.left.IndustrySuv.info,
                center: ["50%", "55%"],
                name: {
                    textStyle: {
                        color: "#00a0e8",
                        fontSize: 14
                    }
                },
                nameGap: 12,
                splitArea: {
                    areaStyle: {
                        color: "#03162b",
                        shadowColor: "rgba(0, 0, 0, 0.3)",
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 0, 0.3)"
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(0, 0, 0, 0.5)",
                        width: 1
                    }
                }
            },
            series: [{
                name: "",
                type: "radar",
                symbolSize: 6,
                label: {
                    normal: {
                        show: !1,
                        position: [ - 10, -20],
                        formatter: function(a) {
                            return a.value
                        },
                        textStyle: {
                            color: "#ff0"
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        type: "dashed",
                        color: "#ff0",
                        opacity: .5
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.RadialGradient(.5, .5, .6, [{
                            offset: 0,
                            color: "#00ff21"
                        },
                        {
                            offset: 1,
                            color: "#b6ff00"
                        }]),
                        opacity: .5
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.RadialGradient(.5, .5, .8, [{
                            offset: 0,
                            color: "#00ff21"
                        },
                        {
                            offset: 1,
                            color: "#b6ff00"
                        }])
                    }
                },
                data: [{
                    name: "\u4f01\u4e1a\u5b58\u6d3b\u5e74\u9650",
                    value: a
                }]
            }]
        },
        b = echarts.init(document.getElementById("SurvivalTimeBarEx"));
        b.setOption(a);
        return b
    },
    createDieBarEX: function() {
    	for (var a = _tmpData.left.DieIndustry.data2010.series_data_share,
    	        b = _tmpData.left.DieIndustry.data2010.xAxis_data,
    	        c = 0,
    	        d = 0; d < b.length; d++) {
    	            var e = b[d].length;
    	            e > c && (c = e)
    	        }
//        var a = _tmpData.left.DieIndustry.data2010.series_data_share,
        a = {
            title: {
                right: 0,
                textAlign: "left",
                subtext: "2014\u5e74",
                subtextStyle: {
                    color: "#018ccd",
                    fontWeight: "bold"
                }
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: -40,
                right: "0%",
                bottom: "-10%",
                top: "23%",
                containLabel: !0
            },
            xAxis: [{
                type: "value",
                inverse: !0,
                axisLabel: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                splitLine: {
                    show: !1
                }
            }],
            yAxis: [{
                type: "category",
                axisLabel: {
                    show: !1,
                    interval: 0,
                    formatter: function(a, b) {}
                },
                axisTick: {
                    show: !1
                },
                inverse: !0,
                axisLine: {
                    show: !1
                },
                data: b
            }],
            series: [{
                name: "\u4f01\u4e1a\u6570(\u5bb6)",
                type: "bar",
                barWidth: "45%",
                barGap: "0",
                label: {
                    normal: {
                        show: !0,
                        position: "left"
                    }
                },
                data: [{
                    value: a[0],
                    itemStyle: {
                        normal: {
                            color: "#8407d3"
                        }
                    }
                },
                {
                    value: a[1],
                    itemStyle: {
                        normal: {
                            color: "#4154e6"
                        }
                    }
                },
                {
                    value: a[2],
                    itemStyle: {
                        normal: {
                            color: "#419ae6"
                        }
                    }
                },
                {
                    value: a[3],
                    itemStyle: {
                        normal: {
                            color: "#2eb9aa"
                        }
                    }
                },
                {
                    value: a[4],
                    itemStyle: {
                        normal: {
                            color: "#2eb979"
                        }
                    }
                }]
            }]
        },
        b = echarts.init(document.getElementById("DieIndustryBarEX"));
        b.setOption(a);
        return b
    },
    createDieBar: function() {
        var a = _tmpData.left.DieIndustry.data2015.series_data_share.reverse();
        option = {
            title: {
                right: 63,
                textAlign: "right",
                subtext: "2016\u5e74",
                subtextStyle: {
                    color: "#018ccd",
                    fontWeight: "bold"
                }
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                }
            },
            grid: {
                left: -25,
                right: "15%",
                bottom: "-10%",
                top: "23%",
                containLabel: !0
            },
            xAxis: {
                type: "value",
                axisLabel: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                splitLine: {
                    show: !1
                }
            },
            yAxis: {
                type: "category",
                axisLabel: {
                    show: !1,
                    interval: 9
                },
                axisTick: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                data: _tmpData.left.DieIndustry.data2015.xAxis_data.reverse()
            },
            series: [{
                name: "\u4f01\u4e1a\u6570(\u5bb6)",
                type: "bar",
                barWidth: "45%",
                label: {
                    normal: {
                        show: !0,
                        position: "right"
                    }
                },
                data: [{
                    value: a[0],
                    itemStyle: {
                        normal: {
                            color: "#2eb979"
                        }
                    }
                },
                {
                    value: a[1],
                    itemStyle: {
                        normal: {
                            color: "#2eb9aa"
                        }
                    }
                },
                {
                    value: a[2],
                    itemStyle: {
                        normal: {
                            color: "#419ae6"
                        }
                    }
                },
                {
                    value: a[3],
                    itemStyle: {
                        normal: {
                            color: "#4154e6"
                        }
                    }
                },
                {
                    value: a[4],
                    itemStyle: {
                        normal: {
                            color: "#8407d3"
                        }
                    }
                }]
            }]
        };
        a = echarts.init(document.getElementById("DieIndustryBar"));
        a.setOption(option);
        return a
    }
},
rightCorPanel = {
    init: function() {
        PieIndustryPer = this.loadPieIndustryPer();
        pieIndustryAve = this.loadPieIndustryAve();
        bubbleIndustyr = this.loadBubbleIndustry()
    },
    loadPieIndustryPer: function() {
        var a = {
            color: "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900".split(" "),
            title: {
                text: "\u884c\u4e1a\u4f01\u4e1a\u6570\u91cf\u5360\u6bd4",
                textStyle: {
                    fontSize: 15,
                    color: "#018ccd",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} \x3cbr/\x3e{b}: {c}\u5bb6 "
            },
            animationDuration: 2E3,
            series: [{
                name: "\u884c\u4e1a\u6570\u91cf\u5360\u6bd4",
                type: "pie",
                selectedMode: "single",
                radius: [0, "40%"],
                startAngle: 180,
                label: {
                    normal: {
                        show: !1,
                        position: "inner"
                    }
                },
                labelLine: {
                    normal: {
                        show: !1
                    }
                },
                data: _tmpData.right.IndustryPercent.data1
            },
            {
                name: "\u4f01\u4e1a\u6570\u91cf\u5360\u6bd4",
                type: "pie",
                radius: ["60%", "80%"],
                startAngle: 180,
                label: {
                    normal: {
                        show: !1
                    }
                },
                labelLine: {
                    normal: {
                        show: !1,
                        length: 2
                    }
                },
                data: _tmpData.right.IndustryPercent.data2
            }]
        },
        b = echarts.init(document.getElementById("IndustryPercentEx"));
        b.setOption(a);
        return b
    },
    loadPieIndustryAve: function() {
        var a = {
            color: "#47551f #a54e10 #d13836 #684aad #00467f #926d6a #1a31f2 #85272d #27857f #d13836 #6a8f92 #f2db1a #36cfd1 #8f8f8a #8fad4a #7f3900 #4c5772 #211c49 #14b01a #8d238c #448950 #087c7c".split(" "),
            title: {
                text: "\u884c\u4e1a\u5e73\u5747\u6ce8\u518c\u8d44\u672c\u5360\u6bd4",
                textStyle: {
                    fontSize: 15,
                    color: "#018ccd",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {
                trigger: "item",
                formatter: "{a} \x3cbr/\x3e{b}: {c}\u4e07\u5143"
            },
            animationDuration: 2E3,
            series: [{
                name: "\u884c\u4e1a\u5e73\u5747\u6ce8\u518c\u8d44\u672c\u5360\u6bd4",
                type: "pie",
                selectedMode: "single",
                radius: [0, "40%"],
                startAngle: 180,
                label: {
                    normal: {
                        show: !1,
                        position: "inner"
                    }
                },
                labelLine: {
                    normal: {
                        show: !1
                    }
                },
                data: _tmpData.right.IndustryAveSal.data1
            },
            {
                name: "\u4f01\u4e1a\u5e73\u5747\u6ce8\u518c\u8d44\u672c\u5360\u6bd4",
                type: "pie",
                radius: ["60%", "80%"],
                startAngle: 180,
                label: {
                    normal: {
                        show: !1
                    }
                },
                labelLine: {
                    normal: {
                        show: !1,
                        length: 2
                    }
                },
                data: _tmpData.right.IndustryAveSal.data2
            }]
        },
        b = echarts.init(document.getElementById("IndustryAvearageEx"));
        b.setOption(a);
        return b
    },
    loadBubbleIndustry: function() {
        for (var a = _tmpData.right.IndustryBuble.data,
        b = "#f16e15 #fee235 #457bdb #bda29a #ffb570 #90d760 #81c3ff #c23531 #fee235 #00BFFF #d48265 #76EE00 #749f83 #FF34B3 #BF3EFF #546570 #00EE00 #211c49 #962364 #8fad4a #36cfd1 #7f3900".split(" "), c = [], d = 0; d < a.length; d++) {
            var e = {};
            e.value = a[d];
            e.itemStyle = {
                normal: {
                    color: new echarts.graphic.RadialGradient(.3, .3, .5, [{
                        offset: 0,
                        color: b[d]
                    },
                    {
                        offset: 1,
                        color: b[d + 1]
                    }]),
                    opacity: .6
                }
            };
            c.push(e)
        }
        option = {
            color: ["#dd4444", "#fec42c", "#80F1BE"],
            title: {
                text: "\u884c\u4e1a\u5c31\u4e1a",
                textStyle: {
                    fontSize: 15,
                    color: "#018ccd",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {
                formatter: function(a) {
                    return a.data.value[3] + "\x3cbr\x3eGDP(\u4ebf\u5143)" + a.data.value[0] + "\x3cbr\x3e\u4f01\u4e1a\u6570(\u5bb6):" + a.data.value[1] + "\x3cbr\x3e\u5c31\u4e1a\u4eba\u6570(\u4eba)" + a.data.value[2]
                }
            },
            grid: {
                left: "3%",
                right: "10%",
                bottom: "3%",
                top: "30%",
                containLabel: !0,
                show: !0,
                borderColor: "#031d34"
            },
            xAxis: {
                type: "value",
                name: "\u4ebf\u5143",
                nameLocation: "end",
                nameGap: 0,
                max: 700,
                axisLabel: {
                    formatter: function(a) {
                        return a
                    }
                },
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                }
            },
            yAxis: {
                type: "value",
                name: "企业数(家)",
                //nameGap: 0,
                min: 0,
                max: 10000,
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                scale: !0
            },
            series: [{
                name: "\u5c31\u4e1a\u4eba\u6570",
                data: c,
                type: "scatter",
                symbolSize: function(a) {
                    return Math.sqrt(a[2]) / 15
                },
                label: {
                    emphasis: {
                        show: !0,
                        textStyle: {
                            color: "#018ccd"
                        },
                        position: "top"
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: "rgba(120, 36, 50, 0.5)",
                        shadowOffsetY: 5
                    }
                }
            }]
        };
        a = echarts.init(document.getElementById("IndustryBubbleEx"));
        a.setOption(option);
        return a
    }
},
middelCorPanel = {
    init: function() {
        industryDesity = this.loadIndustryDesity();
        industryCloud = this.laodIndustryCloudLable()
    },
    loadIndustryDesity: function() {
        var a = _tmpData.middel.IndustryDesIncre.IndustryDestiy.xAxis_data,
        b = _tmpData.middel.IndustryDesIncre.IndustryIncre.data,
        c;
        c = _tmpData.middel.IndustryDesIncre.IndustryDestiy.data;
        a = {
            title: {
                text: "\u4f01\u4e1a\u5bc6\u5ea6",
                textStyle: {
                    fontSize: 15,
                    color: "#018ccd",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {
                trigger: "item",
                alwaysShowContent: !1,
                axisPointer: {
                    type: "none"
                },
                formatter: "{a} \x3cbr/\x3e{b} : {c}"
            },
            grid: {
                left: "3%",
                right: "5%",
                bottom: "3%",
                top: "27%",
                containLabel: !0,
                show: !0,
                borderColor: "#031d34"
            },
            yAxis: [{
                type: "value",
                name: "\u5bc6\u5ea6(\u5bb6/\u4e07\u4eba)",
                nameGap: 12,
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                        fontSize: 13,
                        color: "#00a0e8"
                    }
                },
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                splitArea: {
                    show: !0,
                    areaStyle: {
                        color: ["rgba(0,0,0,0.3)"]
                    }
                }
            },
            {
                type: "value",
                name: "\u4f01\u4e1a\u6570(\u4e07\u5bb6)",
                nameTextStyle: {
                    color: "#00a0e8"
                },
                nameGap: 12,
                min: 0,
                max:10,
                splitLine: {
                    show: !1
                },
                axisLine: {
                    show: !1
                },
                axisLabel: {
                    formatter: "{value}",
                    textStyle: {
                        fontSize: 13,
                        color: "#00a0e8"
                    }
                }
            }],
            xAxis: {
                type: "category",
                boundaryGap: !1,
                splitLine: {
                    show: !0,
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#00a0e8",
                        width: 1,
                        opacity: .2
                    }
                },
                data: a
            },
            series: [{
                name: "\u4f01\u4e1a\u5bc6\u5ea6(\u5bb6/\u4e07\u4eba)",
                type: "line",
                smooth: !1,
                symbolSize: [15, 10],
                symbol: "circle",
                itemStyle: {
                    normal: {
                        color: "#a27f06",
                        barBorderRadius: [3, 3, 0, 0]
                    }
                },
                lineStyle: {
                    normal: {
                        width: 3,
                        color: "#ffd800"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#03162b",
                        borderColor: "#ffd800",
                        borderWidth: 3,
                        opacity: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#018ccd"
                        },
                        {
                            offset: 1,
                            color: "#06304b"
                        }], !1),
                        opacity: .2
                    }
                },
                data: c
            },
            {
                name: "\u4f01\u4e1a\u6570(\u4e07\u5bb6)",
                type: "line",
                smooth: !1,
                symbolSize: [15, 10],
                symbol: "circle",
                yAxisIndex: 1,
                lineStyle: {
                    normal: {
                        width: 3,
                        color: "#15befc"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#03162b",
                        borderColor: "#15befc",
                        borderWidth: 3,
                        opacity: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#ffd800"
                        },
                        {
                            offset: 1,
                            color: "#000"
                        }], !1),
                        opacity: .5
                    }
                },
                data: b
            }]
        };
        b = echarts.init(document.getElementById("IndustryDesIncreEx"));
        b.setOption(a);
        return b
    },
    loadIndustryCloud: function() {
        $("#IndustrySurvialEx").html("\x3ca style\x3d'font-size:33px;'\x3e" +
        		"批发和零售业\x3c/a\x3e\x3ca style\x3d'font-size:30px;'\x3e" +
        		"制造业\x3c/a\x3e\x3ca style\x3d'font-size:28px;'\x3e" +
        		"租赁和商务服务业\x3c/a\x3e\x3ca style\x3d'font-size:27px;'\x3e" +
        		"科学研究和技术服务业\x3c/a\x3e\x3ca style\x3d'font-size:26px;width:120px;'\x3e" +
        		"建筑业\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e" +
        		"交通运输、仓储和邮政业\x3c/a\x3e\x3ca style\x3d'font-size:25px;'\x3e" +
        		"房地产业\x3c/a\x3e\x3ca style\x3d'font-size:24px;'\x3e" +
        		"信息传输、软件和信息技术服务业\x3c/a\x3e\x3ca style\x3d'font-size:23px;width:120px;'\x3e" +
        		"居民服务、修理和其他服务业\x3c/a\x3e\x3ca style\x3d'font-size:23px;'\x3e" +
        		"金融业\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e" +
        		"文化、体育和娱乐业\x3c/a\x3e\x3ca style\x3d'font-size:22px;'\x3e" +
        		"农、林、牧、渔业\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e" +
        		"住宿和餐饮业\x3c/a\x3e\x3ca style\x3d'font-size:20px;'\x3e" +
        		"水利、环境和公共设施管理业\x3c/a\x3e\x3ca style\x3d'font-size:19px;width:120px;'\x3e" +
        		"电力、热力、燃气及水生产和供应业\x3c/a\x3e\x3ca style\x3d'font-size:18px;width:120px;'\x3e" +
        		"卫生和社会工作\x3c/a\x3e\x3ca style\x3d'font-size:18px;'\x3e" +
        		"采矿业\x3c/a\x3e\x3ca style\x3d'font-size:15px;width:120px;'\x3e" +
        		"教育\x3c/a\x3e\x3ca style\x3d'font-size:14px;'\x3e" +
        		"公共管理、社会保障和社会组织\x3c/a\x3e\x3c/a\x3e\x3ca style\x3d'font-size:14px;'\x3e" +
        		"国际组织\x3c/a\x3e");
        var a = $("#IndustrySurvialEx").height();
        loadLabelCloud("IndustrySurvialEx", a / 2 - 40)
    },
    laodIndustryCloudLable: function() {
        var a = echarts.init(document.getElementById("IndustrySurvialEx"));
        a.setOption({
            animationDuration: 3E3,
            title: {
                text: "\u884c\u4e1a\u4f01\u4e1a\u5e73\u5747\u5b58\u6d3b\u5e74\u9650",
                textStyle: {
                    fontSize: 15,
                    color: "#018ccd",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {
                textStyle: {},
                formatter: function(a, c, d) {
                    c = a.data.value;
                    return a.name + "\x3cbr\x3e\u4f01\u4e1a\u6570(\u5bb6):" + c[0] + "\x3cbr\x3e\u5b58\u6d3b\u5e74\u9650(\u5e74):" + c[1]
                }
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                top: "27%",
                containLabel: !0,
                show: !1
            },
            series: [{
                type: "wordCloud",
                gridSize: 12,
                size: ["100%", "100%"],
                sizeRange: [12, 66],
                width: "100%",
                height: "100%",
                rotationRange: [0, 0],
                center: ["40%", "47%"],
                clickable: !0,
                shape: "circle",
                autoSize: {
                    enable: !0,
                    minSize: 12
                },
                data: [{
                    name: "批发和零售业",
                    value: [7456,6.3],
                    textStyle: {
                        normal: {
                            color: "#026bb8"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "制造业",
                    value: [5817,5.2],
                    textStyle: {
                        normal: {
                            color: "#026bb8"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "租赁和商务服务业",
                    value: [1955,6.8],
                    textStyle: {
                        normal: {
                            color: "#b6ff00"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "科学研究和技术服务业",
                    value: [1409,5.6],
                    textStyle: {
                        normal: {
                            color: "#0ebcf6"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "建筑业",
                    value: [907,4.6],
                    textStyle: {
                        normal: {
                            color: "#f00"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "交通运输、仓储和邮政业",
                    value: [864, 6.7],
                    textStyle: {
                        normal: {
                            color: "#34b647"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "房地产业",
                    value: [642,6.4],
                    textStyle: {
                        normal: {
                            color: "#486497"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "信息传输、软件和信息技术服务业",
                    value: [609,5.9],
                    textStyle: {
                        normal: {
                            color: "#ff6a00"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "居民服务、修理和其他服务业",
                    value: [480, 6.6],
                    textStyle: {
                        normal: {
                            color: "#d1d74d"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "金融业",
                    value: [404,5.8],
                    textStyle: {
                        normal: {
                            color: "#087ba5"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "文化、体育和娱乐业",
                    value: [256,4.6],
                    textStyle: {
                        normal: {
                            color: "#02ef50"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "农、林、牧、渔业",
                    value: [238,4.2],
                    textStyle: {
                        normal: {
                            color: "#338f13"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "住宿和餐饮业",
                    value: [226,5.7],
                    textStyle: {
                        normal: {
                            color: "#338f13"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "水利、环境和公共设施管理业",
                    value: [130,5.9],
                    textStyle: {
                        normal: {
                            color: "#669abd"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "电力、热力、燃气及水生产和供应业",
                    value: [118,5.4],
                    textStyle: {
                        normal: {
                            color: "#d09d34"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "卫生和社会工作",
                    value: [101,5.8],
                    textStyle: {
                        normal: {
                            color: "#0879a3"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "采矿业",
                    value: [50,6.2],
                    textStyle: {
                        normal: {
                            color: "#9a5a12"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "教育",
                    value: [41, 4.6],
                    textStyle: {
                        normal: {
                            color: "#c9d019"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "公共管理、社会保障和社会组织",
                    value: [35,5.3],
                    textStyle: {
                        normal: {
                            color: "#c9d019"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                },
                {
                    name: "国际组织",
                    value: [2,6],
                    textStyle: {
                        normal: {
                            color: "#c9d019"
                        },
                        emphasis: {
                            fontWeight: "bolder"
                        }
                    }
                }]
            }],
            animationEasing: "Linear"
        });
        return a
    }
};