'use strict';
define("dojo/_base/declare dojo/_base/html dojo/_base/lang dojo/request dojo/topic ./../../echartsCommon ./../../BaseWidget dojo/text!./../../Template.html".split(" "), function(e, k, f, l, b, c, g, h) {
    var d = {
        title: c.getTitle("\u4ebf\u5143\u4ee5\u4e0a\u5728\u5efa\u9879\u76ee\u533a\u53bf\u533a\u57df\u5bf9\u6bd4"),
        tooltip: f.mixin(c.getPie("tooltip"), {
            position: "top",
            formatter: function(a) {
                var b = a.data.value;
                return a.name + "\x3cbr\x3e\u9879\u76ee\u4e2a\u6570:" + b[0] + "\x3cbr\x3e\u6295\u8d44\u989d(\u4ebf):" + b[1]
            }
        }),
        visualMap: {
            type: "continuous",
            show: !0,
            min: 0,
            max: 140,
            dimension: 0,
            bottom: 10,
            left: 10,
            itemWidth: 12,
            itemHeight: 60,
            textStyle: {
                color: "#fff"
            },
            color: ["#4649D9", "#7FF0F4"]
        },
        series: [{
            name: "",
            type: "map",
            mapType: "JiangSuXuZHou",
            top: 32,
            bottom: 14,
            data: [{
                value: [42, 58.0556],
                name: "\u4e30\u53bf"
            }, {
                value: [34, 98.153],
                name: "\u6c9b\u53bf"
            }, {
                value: [29, 62.6737],
                name: "\u7762\u5b81\u53bf"
            }, {
                value: [102, 273.9427],
                name: "\u65b0\u6c82\u5e02"
            }, {
                value: [107, 297.7374],
                name: "\u90b3\u5dde\u5e02"
            }, {
                value: [21, 35.8353],
                name: "\u8d3e\u6c6a\u533a"
            }, {
                value: [134, 469.037],
                name: "\u94dc\u5c71\u533a"
            }, {
                value: [7, 13.345],
                name: "\u9f13\u697c\u533a"
            }, {
                value: [7, 36.5668],
                name: "\u4e91\u9f99\u533a"
            }, {
                value: [17, 84.0995],
                name: "\u6cc9\u5c71\u533a"
            }, {
                value: [60, 228.5144],
                name: "\u7ecf\u6d4e\u5f00\u53d1\u533a"
            }]
        }]
    };
    return e([g], {
        baseClass: "widget3",
        mapReady: !1,
        templateString: h,
        postCreate: function() {
            var a = this;
            b.subscribe("xuzhouMap", function() {
                a.mapReady = !0
            })
        },
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            if (this.mapReady) this.chart.setOption(d);
            else {
                var a = this;
                b.subscribe("xuzhouMap", function() {
                    a.chart.setOption(d)
                })
            }
        },
        setData: function() {}
    })
});