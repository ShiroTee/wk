'use strict';
define(["dojo/_base/lang"],
function(a) {
    var d, l = {
        textStyle: {
            color: "#00a5ff",
            fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
            fontSize: 14,
            fontWeight: "normal"
        }
    },
    k = {
        trigger: "item",
        formatter: "{a} \x3cbr/\x3e{b}: {c} ({d}%)"
    },
    m = {
        tooltip: a.clone(k),
        label: {
            normal: {
                show: !1
            }
        },
        labelLine: {
            normal: {
                show: !1
            },
            emphasis: {
                normal: {
                    show: !1
                }
            }
        },
        center: ["50%", "52%"]
    },
    n = {
        label: {
            normal: {
                show: !0,
                textStyle: {
                    color: "#00a5ff"
                }
            }
        },
        labelLine: {
            normal: {
                show: !0,
                length: 12,
                length2: 8,
                lineStyle: {
                    color: "#fff"
                }
            }
        }
    },
    p = {
        top: 36,
        right: 18,
        bottom: 32,
        left: 48
    },
    q = {},
    f = {
        show: !0,
        lineStyle: {
            color: "#00a0e8",
            width: 1,
            opacity: .2
        }
    },
    g = {
        show: !1,
        lineStyle: {
            color: "#00a0e8",
            width: 1,
            opacity: .2
        }
    },
    h = {
        show: !1
    },
    e = {
        textStyle: {
            color: "#00a5ff"
        }
    },
    r = {
        color: "#00a2ff"
    },
    t = {
        splitLine: {
            show: !1
        },
        axisLine: {
            show: !1
        },
        axisTick: {
            show: !1
        },
        axisLabel: e
    },
    u = ["#23B286 #45C3BB #02A9CB #0167D5 #0147FF #3A2CE4 #616B13 #AE8221 #F983D7 #856DFA #406FFF #5FB3FC #5CFDE8".split(" "), "#0293F8 #F777D6 #FE7D76 #FCB582 #C7FF9B #88FEA4 #61FFE7 #56B9FF".split(" "), "#9F53FF #8F8F8A #6338DE #530E63 #06467B #571E9E #142181 #087C7C #0B7B60 #605D11 #0B7B60".split(" "), "#3A2CE4 #0147FF #0167D5 #02A9CB #45C3BB #23B286".split(" "), ["#3FC362", "#BB6C44"], "#3A2CE5 #034BFF #02A9CB #42C4B8 #23B286 #45C3BB".split(" "), "#AE8221 #F983D7 #856DFA #406FFF #5FB3FC #5CFDE8 #8EFDA0 #C2FD9E #FFC992 #FA7671".split(" "), "#8C3F00 #3BE4E6 #A5266E #AD7875 #FFF11D #9DBE51 #546D7D #922B31 #856DFA #406FFF".split(" "), ["#3BE4E6", "#5E0E63", "#0167D5"]];
    d = {
        getTitle: function(b) {
            var c = a.clone(l);
            c.text = b;
            return c
        },
        getPie: function(b) {
            var c = a.clone(m);
            b && (c = c[b]);
            return c
        },
        getPie2: function(b) {
            var c = a.clone(n);
            b && (c = c[b]);
            return c
        },
        getLine: function(b) {
            var c = a.clone(q);
            b && (c = c[b]);
            return c
        },
        getGrid: function(b) {
            return a.clone(p)
        },
        getColor: function(b) {
            b ? b: b = 0;
            return a.clone(u[b])
        },
        getBaseLine: function() {
            return a.clone(v)
        },
        getBaseColumn: function() {
            return a.clone(w)
        },
        getBaseFunnel: function() {
            return a.clone(x)
        },
        getValuexAxis: function() {
            return a.clone(y)
        },
        getyAxis: function() {
            return a.clone(t)
        },
        getNameTextStyle: function() {
            return a.clone(r)
        }
    };
    var y = {
        type: "value",
        splitLine: f,
        axisLine: g,
        axisTick: h,
        axisLabel: e
    },
    v = {
        title: d.getTitle("\u5f90\u5dde\u5e02\u4eba\u5747GDP\u4e0a\u5347\u6298\u7ebf"),
        grid: d.getGrid(),
        xAxis: {
            type: "category",
            splitLine: f,
            axisLine: g,
            axisTick: h,
            axisLabel: e,
            data: []
        },
        yAxis: {
            type: "value",
            splitLine: f,
            axisLine: g,
            axisTick: h,
            axisLabel: e,
            min: 2460,
            max: 2640
        },
        series: [{
            type: "line",
            showSymbol: !1,
            data: []
        }]
    },
    w = {
        title: d.getTitle("\u516c\u5171\u8d22\u653f\u9884\u7b97\u6536\u5165"),
        grid: d.getGrid(),
        xAxis: {
            type: "category",
            axisLine: a.clone(g),
            axisTick: a.clone(h),
            axisLabel: a.clone(e),
            splitLine: a.clone(f),
            data: [2011, 2012, 2013, 2014, 2015]
        },
        yAxis: {
            type: "value",
            min: 1,
            max: 100,
            axisLine: a.clone(g),
            axisTick: a.clone(h),
            axisLabel: a.clone(e),
            splitLine: a.clone(f)
        },
        series: []
    },
    x = {
        tooltip: a.mixin(k, {
            trigger: "item",
            formatter: "{a} \x3cbr/\x3e{b}: {c}"
        }),
        series: [{
            name: "\u7528\u7535\u884c\u4e1aTOP5",
            type: "funnel",
            top: 30,
            bottom: 12,
            width: "70%",
            left: "15%",
            minSize: "30%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
                normal: {
                    show: !0,
                    position: "inside"
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: "solid"
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 0
                }
            },
            data: []
        }],
        color: ["#A0171A", "#C21A1E", "#CB5626", "#E98A27", "#FAB818"]
    };
    return d
});