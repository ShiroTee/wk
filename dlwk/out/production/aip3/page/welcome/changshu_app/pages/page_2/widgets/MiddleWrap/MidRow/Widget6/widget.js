'use strict';
define("dojo/_base/declare dojo/_base/lang dojo/_base/html ./../../../echartsCommon ./../../../BaseWidget dojo/text!./../../../Template.html".split(" "),
function(b, c, g, a, d, e) {
    var f = {
        title: a.getTitle("GDP\u7ed3\u6784"),
        tooltip: c.mixin(a.getPie("tooltip"), {
            position: "top",
        	formatter: "{b}\x3cbr\x3e{c}\u4ebf\u5143\x3cbr\x3e ({d}%)"
        }),
        series: [{
            type: "pie",
            selectedMode: "single",
            selectedOffset: 4,
            // radius: ["0%", "36%"],
            // center: ["50%", "54%"],
            label: a.getPie("label"),
            labelLine: a.getPie("labelLine"),
            data: [{
                name: "第一产业增加值",
                value: 42.76
            },
            {
                name: "第二产业增加值",
                value: 1082.43
            },
            {
                name: "第三产业增加值",
                value: 987.2,
                selected: !0
            }],
            color: a.getColor(8)
        }]
    };
    return b([d], {
        baseClass: "widget6",
        templateString: e,
        postCreate: function() {},
        startup: function() {
            this.chart = echarts.init(this.chartNode);
            this.chart.setOption(f)
        }
    })
});