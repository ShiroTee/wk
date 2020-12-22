/*
	@首页
	@数据交换共享分析
    @2016-12-5
*/
var _tmpData = null;
window.onload = function() {
    _tmpData = data;
    pageLoad()
};
function pageLoad() {
    $(".header_date").text(commonClass._getDate());
    leftPanel.ini();
    rightPanel.ini();
    containerPanel.ini();
    containerPanel_rightIcon.ini();
    containerPanel_leftIcon.ini()
}
var leftPanel = {
    ini: function() {
        var a = _tmpData.left;
        $(".left_SKZL").text(a.SKZL);
        this.numAnimate_float("left_SKZL", a.SKZL);
        $(".left_GWBJTJL").text(a.GWBJTJL);
        this.numAnimate_float("left_GWBJTJL", a.GWBJTJL);
        $(".left_GWBJSYL").text(a.GWBJSYL);
        this.numAnimate_float("left_GWBJSYL", a.GWBJSYL);
        $(".left_RKXX").text(a.RKXX);
        this.numAnimate_int("left_RKXX", a.RKXX);
        $(".left_HGJJXX").text(a.HGJJXX);
        this.numAnimate_int("left_HGJJXX", a.HGJJXX);
        $(".left_FRXX").text(a.FRXX);
        this.numAnimate_int("left_FRXX", a.FRXX);
        $(".left_KJDL").text(a.KJDL);
        this.numAnimate_int("left_KJDL", a.KJDL);
        $(".left_XYZXXX").text(a.XYZXXX);
        this.numAnimate_int("left_XYZXXX", a.XYZXXX);
        this.notes_str(a.notes)
    },
    numAnimate_int: function(a, c) {
        try {
            $("." + a).animateNumber({
                number: Number(c)
            },
            2500)
        } catch(d) {
            console.log(d)
        }
    },
    numAnimate_float: function(a, c) {
        try {
            $("." + a).animateNumber({
                number: parseFloat(c),
                easing: "easeInQuad",
                numberStep: function(a, e) {
                    e = $(e.elem);
                    a = 10 * a.toFixed(1) / 10;
                    e.text(a)
                }
            },
            2500)
        } catch(d) {
            console.log(d)
        }
    },
    notes_str: function(a) {
        $(".index_left_bottom").lbyl({
            content: a,
            speed: 100,
            type: "fade"
        })
    }
},
rightPanel = {
    tmpData: null,
    ini: function() {
        this.tmpData = _tmpData.right;
        console.log(this.tmpData.SJSYL)
        this.ringChart(this.tmpData.SJSYL);
        this.createStackBar(this.tmpData.stackBar)
    },
    ringChart: function(a) {
        a = Number(a);
        $("#right_ringChart").radialIndicator({
            barColor: {
                0 : "#FF0000",
                33 : "#FFFF00",
                45 : "#0066FF",
                100 : "#02d56a"
            },
            percentage: !1,
            displayNumber: !1,
            frameTime: 50,
            format: function(a, d, e) {
                d = a + "%";
                $(".ringChartLabel").text(d);
                return a
            },
            fontSize: 18,
            initValue: 40
        }).data("radialIndicator").animate(Number(a))
    },
    createStackBar: function(a) {
        var c = echarts.init(document.getElementById("right_stackBarChart")),
        d = [],
        e = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "none"
                }
            },
            legend: {
                bottom: "2%",
                itemWidth: 12,
                itemHeight: 8,
                itemGap: 1,
//            	show:false,
//                x:'center',
//                y:'bottom',
                orient : 'horizontal',
                x : 'right',
                textStyle: {
                    color: "#777777"
                },
                data: a.legend_data
            },
            grid: {
            	width:"90%",
                left: "10%",
                right: "0%",
                top: "3%",
                bottom: "20%",
                containLabel: !1
            },
            xAxis: [{
                type: "category",
                data: a.xAxis_data,
                axisTick: {
                    alignWithLabel: !0,
                    length: 0
                },
                axisLine: {
                    lineStyle: {
                        color: "#072543",
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#09b7ff"
                    },
                    interval: 0
                },
                splitLine: {
                    show: !1,
                    lineStyle: {
                        color: "#072543"
                    }
                }
            }],
            yAxis: [{
                type: "value",
                min: 0,
                axisLine: {
                    lineStyle: {
                        color: "#072543",
                        width: 0
                    }
                },
                axisTick: {
                    length: 0
                },
                axisLabel: {
                    textStyle: {
                        color: "#09b7ff"
                    }
                },
                splitLine: {
                    show: !1,
                    lineStyle: {
                        color: "#072543"
                    }
                }
            }],
            series: null
        };
        $.each(a.series_data,
        function(a, e) {
            d.push({
                name: e.name,
                type: "bar",
                barWidth: "25%",
                stack: e.stack,
                itemStyle: {
                    normal: {
                        color: e.color
                    }
                },
                data: e.data
            })
        });
        e.series = d;
        c.setOption(e);
        this.eChartsResize(c);
        $("#YSLML").text(a.YSLML);
        $("#YGJML").text(a.YGJML)
    },
    createLineChart: function(a) {
        var c = echarts.init(document.getElementById("right_lineChart"));
        a = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "none"
                },
                formatter: function(a, e, b) {
                    e = "\x3cdiv\x3e" + a[0].name + "\x3c/div\x3e";
                    for (b = 0; b < a.length; b++) {
                        var c = a[b],
                        d = c.color.colorStops[0].color;
                        e += "\x3cdiv\x3e";
                        e += "\x3cdiv style\x3d'background-color:" + d + ";border-radius:50%;width:10px;height:10px;display:inline-block;margin-right:5px;'\x3e\x3c/div\x3e";
                        e += "\x3cspan\x3e" + c.seriesName + " : " + c.value + "\x3c/span\x3e";
                        e += "\x3c/div\x3e"
                    }
                    return e
                }
            },
            grid: {
                left: "0%",
                right: "10%",
                bottom: "5%",
                top: "5%",
                containLabel: !0
            },
            xAxis: {
                type: "category",
                boundaryGap: !1,
                data: a.xAxis_data,
                axisTick: {
                    alignWithLabel: !0,
                    length: 0
                },
                axisLine: {
                    lineStyle: {
                        color: "#072543",
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#09b7ff"
                    },
                    interval: 0
                },
                splitLine: {
                    show: !1,
                    lineStyle: {
                        color: "#072543"
                    }
                }
            },
            yAxis: {
                type: "value",
                min: "auto",
                axisLine: {
                    lineStyle: {
                        color: "#072543",
                        width: 0
                    }
                },
                axisTick: {
                    length: 0
                },
                axisLabel: {
                    textStyle: {
                        color: "#09b7ff"
                    }
                },
                splitLine: {
                    show: !1,
                    lineStyle: {
                        color: "#072543"
                    }
                }
            },
            series: [{
                name: "\u5171\u4eab\u6570\u636e",
                type: "line",
                smooth: !0,
                symbolSize: 11,
                symbol: "circle",
                smooth: !1,
                lineStyle: {
                    normal: {
                        color: "#40e457",
                        width: 3
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.RadialGradient(.5, .5, .5, [{
                            offset: 1,
                            color: "#40e457"
                        },
                        {
                            offset: 0,
                            color: "rgba(3,22,43,0.9)"
                        }], !1),
                        opacity: 1
                    }
                },
                data: a.series_data_share
            },
            {
                name: "\u4e0d\u5171\u4eab\u6570\u636e",
                type: "line",
                symbolSize: 11,
                symbol: "circle",
                lineStyle: {
                    normal: {
                        color: "#ffa200",
                        width: 3
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.RadialGradient(.5, .5, .5, [{
                            offset: 1,
                            color: "#ffa200"
                        },
                        {
                            offset: 0,
                            color: "rgba(3,22,43,0.9)"
                        }], !1),
                        opacity: 1
                    }
                },
                data: a.series_data_unshare
            }]
        };
        c.setOption(a)
    },
    createBarChart: function(a) {
        var c = echarts.init(document.getElementById("right_barChart"));
        c.setOption({
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "none"
                }
            },
            grid: {
                left: "0%",
                right: "0%",
                bottom: "5%",
                top: "5%",
                containLabel: !0
            },
            xAxis: [{
                type: "category",
                data: a.xAxis_data,
                axisTick: {
                    alignWithLabel: !0,
                    length: 0
                },
                axisLine: {
                    lineStyle: {
                        color: "#072543",
                        width: 0
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#00A5FF"
                    },
                    interval: 0
                },
                splitLine: {
                    show: !1,
                    lineStyle: {
                        color: "#072543"
                    }
                }
            }],
            yAxis: [{
                type: "value",
                axisLine: {
                    lineStyle: {
                        color: "#072543",
                        width: 0
                    }
                },
                axisTick: {
                    length: 0
                },
                axisLabel: {
                    textStyle: {
                        color: "#00A5FF"
                    }
                },
                splitLine: {
                    show: !1,
                    lineStyle: {
                        color: "#072543"
                    }
                }
            }],
            series: [{
                name: a.series_name1,
                type: "bar",
                barWidth: "12%",
                barGap: .5,
                itemStyle: {
                    normal: {
                        color: "#40e457"
                    }
                },
                data: a.series_data1
            },
            {
                name: a.series_name2,
                type: "bar",
                barWidth: "12%",
                barGap: .5,
                itemStyle: {
                    normal: {
                        color: "#fb406c"
                    }
                },
                data: a.series_data2
            }]
        });
        this.eChartsResize(c)
    },
    eChartsResize: function(a) {
        var c = this;
        $(window).resize(function() {
            c.createStackBar(rightPanel.tmpData.stackBar)
        })
    }
},

// 公安局	2621028
// 人社局	2098218
// 卫计委	838723
// 公积金	649213
// `城投公司	14671769
// `市民卡	2612834
// `新市民	1864273
// `旅游局	1184456
// `便民服务中心	799496
// `民政局	393023

containerPanel = {
    list_right: [{
        name: "公安局",//公安局
        img: "GAJ",
        position: {
        	x: 220,
            y: 630
        },
        num1: 3,
        num2: 2621028
    },
    {
        name: "法院",//法院
        img: "FY",
        position: {
            x: 180,
            y: 560
        },
        num1: 3,
        num2: 46823
    },
    {
        name: "市监局",//规划局
        img: "SJJ",
        position: {
            x: 150,
            y: 680
        },
        num1: 36,
        num2: 342174
    },
    {
        name: "规划局",//规划局
        img: "GHJ",
        position: {
        	x: 110,
            y: 340
        },
        num1: 18,
        num2: 3711
    },
    {
        name: "人社局",//人社局
        img: "RSJ",
        position: {
        	x: 90,
            y: 560
        },
        num1: 22,
        num2: 2011273
    },
    {
        name: "公积金",//公积金
        img: "GJJ",
        position: {
        	x: 220,
            y: 260
        },
        num1: 6,
        num2: 649213
    },
    {
        name: "卫计委",//卫计委
        img: "WJW",
        position: {
        	x: 220,
            y: 120
        },
        num1: 24,
        num2: 840262
    },
    {
        name: "国税局",//国税局
        img: "GSJ1",
        position: {
        	x: 300,
            y: 200
        },
        num1: 5,
        num2: 7892
    },
    {
        name: "地税局",//地税局
        img: "DSJ1",
        position: {
        	x: 320,
            y: 380
        },
        num1: 4,
        num2: 79618
    },
    {
        name: "交通局",//交通局
        img: "JTJ",
        position: {
        	x: 150,
            y: 200
        },
        num1: 17,
        num2: 35721
    },
    {
        name: "民政局",//民政局
        img: "MZJ",
        position: {
        	x: 280,
            y: 550
        },
        num1: 16,
        num2: 393582
    }],
    list_line: [
       {start: [.200, .510],end: [.430, .520]},
       {start: [.200, .530],end: [.430, .520]},
       {start: [.300, .610],end: [.430, .520]},
       {start: [.300, .630],end: [.430, .520]},
       {start: [.80, .510],end: [.510, .450]},
       {start: [.80, .530],end: [.510, .450]},
       {start: [.600, .490],end: [.510, .490]},
       {start: [.600, .510],end: [.510, .490]},
       {start: [.710, .670],end: [.510, .490]},
       {start: [.710, .690],end: [.510, .490]},
       {start: [.700, .350],end: [.510, .450]},
       {start: [.700, .370],end: [.510, .450]},
       {start: [.550, .270],end: [.450, .400]},
       {start: [.550, .290],end: [.450, .400]},
       {start: [.290, .260],end: [.400, .450]},
       {start: [.290, .280],end: [.400, .450]},
       {start: [.140, .370],end: [.400, .450]},
       {start: [.140, .390],end: [.400, .450]},
       {start: [.300, .410],end: [.400, .450]},
       {start: [.300, .430],end: [.400, .450]},
       {start: [.49, .700],end: [.480, .530]},
       {start: [.51, .700],end: [.480, .530]}
       ],
    imgPath: "images/index/poi/",
    ini: function() {
//        this.bottomList();
        this.rightList();
//        this.leftList();
        this.line()
    },
    bottomList: function() {
        var a = $(".container_content"),
        c = this.imgPath + "bottom/",
        d = "";
        $.each(this.list_bottom,
        function(a, b) {
            d += "\x3cdiv class\x3d'poi_img_type box' id\x3d'poi_img_b_" + a + "' data-tooltip\x3d'" + b.name+"</br>信息项数量:"+b.num1+"\u6761</br>数据总量"+b.num2 + "\u6761'  style\x3d'bottom:" + b.position.x + "px;right:" + b.position.y + "px'\x3e\x3cimg src\x3d'" + c + b.img + ".png' /\x3e\x3c/div\x3e"
        });
        a.append(d);
        $.each(this.list_bottom,
        function(a, b) {
            $("#poi_img_b_" + a).darkTooltip()
        })
    },
    rightList: function() {
        var a = $(".container_content"),
        c = this.imgPath + "right/",
        d = "";
        $.each(this.list_right,
        function(a, b) {
            d += "\x3cdiv class\x3d'poi_img_type box' id\x3d'poi_img_r_" + a + "' data-placement='left' data-tooltip\x3d'" + b.name+"</br>信息项数量："+b.num1+"\u6761</br>数据总量："+b.num2 + "\u6761' style\x3d'bottom:" + b.position.x + "px;right:" + b.position.y + "px'\x3e \x3cimg src\x3d'" + c + b.img + ".png' /\x3e\x3c/div\x3e"
        });
        a.append(d);
        $.each(this.list_right,
        function(a, b) {
            $("#poi_img_r_" + a).darkTooltip()
        })
    },
    leftList: function() {
        var a = $(".container_content"),
        c = this.imgPath + "left/",
        d = "";
        $.each(this.list_left,
        function(a, b) {
            d += "\x3cdiv class\x3d'poi_img_type box' id\x3d'poi_img_l_" + a + "' data-tooltip\x3d'" + b.name+"</br>信息项数量:"+b.num1+"\u6761</br>数据总量"+b.num2 + "\u6761' style\x3d'bottom:" + b.position.x + "px;left:" + b.position.y + "px'\x3e \x3cimg src\x3d'" + c + b.img + ".png' /\x3e\x3c/div\x3e"
        });
        a.append(d);
    },
    line: function() {
        echarts.init(document.getElementById("content_line")).setOption(this.getOption())
    },
    getOption: function() {
        var a = this.getSeriesData(this.list_line);
        return {
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            xAxis: [{
                type: "value",
                min: 0,
                max: 1,
                splitLine: {
                    show: !1
                }
            }],
            yAxis: [{
                type: "value",
                min: 0,
                max: 1,
                splitLine: {
                    show: !1
                },
                axisLine: {
                    show: !1
                }
            }],
            graphic: [{
                id: "football-ground",
                type: "image",
                style: {
                    x: 0,
                    y: 0
                },
                left: 0,
                top: 0
            }],
            series: [{
                name: "",
                type: "lines",
                coordinateSystem: "cartesian2d",
                zlevel: 2,
                effect: {
                    show: !0,
                    period: 6,
                    trailLength: 0,
                    symbolSize: 6,
                    color: new echarts.graphic.RadialGradient(.5, .5, .4, [{
                        offset: 0,
                        color: "#ffffff"
                    },
                    {
                        offset: 1,
                        color: "#F0F0F0"
                    }], !1)
                },
                lineStyle: {
                    normal: {
                        color: "rgba(255,255,255,0.9)",
                        width: 1,
                        opacity: .5,
                        curveness: .15,
                        shadowBlur: 10,
                        shadowOffsetX: 2,
                        shadowColor: "rgba(255, 255, 255, 0.5)"
                    }
                },
                data: a
            }]
        }
    },
    getSeriesData: function(a) {
        var c = [];
        $.each(a,
        function(a, e) {
            c.push({
                coords: [e.start, e.end]
            })
        });
        return c
    }
},
containerPanel_rightIcon = {
    list_bottom: [{
        name: "\u4eb2\u5c5e\u4fe1\u606f",//亲属信息
        img: "r_1",
        position: {
            x: 8,
            y: 126
        },
        opacity: 1,
        num1: 10279504
    },
    {
        name: "\u53c2\u4fdd\u4fe1\u606f",//参保信息
        img: "r_2",
        position: {
            x: 71,
            y: 23
        },
        opacity: 1,
        num: 1976432
    },
    {
        name: "\u7f34\u5f81\u660e\u7ec6",//缴征明细
        img: "r_3",
        position: {
            x: 84,
            y: 153
        },
        opacity: 1,
        num: 4639798
    },
    {
        name: "\u52b3\u52a8\u5408\u540c",//劳动合同
        img: "r_4",
        position: {
            x: 87,
            y: 95
        },
        opacity: 1,
        num: 931760
    },
    {
        name: "\u5e38\u4f4f\u4eba\u53e3",//常住人口
        img: "r_5",
        position: {
            x: 24,
            y: 32
        },
        opacity: 1,
        num: 10279504
    },
    {
        name: "\u516c\u79ef\u91d1",//公积金
        img: "r_6",
        position: {
            x: 36,
            y: 106
        },
        opacity: 1,
        num: 1220631
    },
    {
        name: "\u6b8b\u75be\u4eba\u5458",//残疾人员
        img: "r_7",
        position: {
            x: -10,
            y: 8
        },
        opacity: 1,
        num: 401519
    }],
    imgPath: "images/index/rightIcon/",
    ini: function() {
        var a = $(".right_population"),
        c = this.imgPath,
        d = "";
        $.each(this.list_bottom,
        function(a, b) {
            var e = parseInt(3 * Math.random() + 1);
            d += "\x3cdiv class\x3d'poi_img_type box poi_img_flash_" + e + "' id\x3d'poi_img_i_r_" + a + "' data-tooltip\x3d'" + b.name + ":" + b.num + "\u6761' style\x3d'opacity:" + b.opacity + ";bottom:" + b.position.x + "px;right:" + b.position.y + "px'\x3e \x3cimg  src\x3d'" + c + b.img + ".png' /\x3e\x3c/div\x3e"
        });
        a.append(d);
        $.each(this.list_bottom,
        function(a, b) {
            $("#poi_img_i_r_" + a).darkTooltip()
        })
    }
},
containerPanel_leftIcon = {
    list_bottom: [{
        name: "\u4e2a\u4f53\u767b\u8bb0",
        img: "l_1",
        position: {
            x: 72,
            y: 88
        },
        opacity: 1,
        num: 3436321
    },
    {
        name: "\u4f01\u4e1a\u7eb3\u7a0e",
        img: "l_2",
        position: {
            x: 22,
            y: 39
        },
        opacity: 1,
        num: 12399346
    },
    {
        name: "\u4f01\u4e1a\u53d8\u66f4",
        img: "l_3",
        position: {
            x: 108,
            y: 70
        },
        opacity: 1,
        num: 197512
    },
    {
        name: "\u4f01\u4e1a\u767b\u8bb0",
        img: "l_4",
        position: {
            x: 51,
            y: 2
        },
        opacity: 1,
        num: 1298049
    },
    {
        name: "\u7a0e\u52a1\u4fe1\u606f",
        img: "l_5",
        position: {
            x: 92,
            y: 38
        },
        opacity: 1,
        num: 195977
    },
    {
        name: "\u6cd5\u4eba\u4ee3\u8868",
        img: "l_6",
        position: {
            x: 49,
            y: 125
        },
        opacity: 1,
        num: 627596
    },
    {
        name: "\u6ce8\u9500\u4fe1\u606f",
        img: "l_7",
        position: {
            x: 97,
            y: 138
        },
        opacity: 1,
        num: 129442
    }],
    imgPath: "images/index/leftIcon/",
    ini: function() {
        var a = $(".left_medical"),
        c = this.imgPath,
        d = "";
        $.each(this.list_bottom,
        function(a, b) {
            var e = parseInt(3 * Math.random() + 1);
            d += "\x3cdiv class\x3d'poi_img_type box poi_img_flash_" + e + "' id\x3d'poi_img_i_l_" + a + "' data-tooltip\x3d'" + b.name + ":" + b.num + "\u6761' style\x3d'opacity:" + b.opacity + ";bottom:" + b.position.x + "px;right:" + b.position.y + "px'\x3e \x3cimg src\x3d'" + c + b.img + ".png' /\x3e\x3c/div\x3e"
        });
        a.append(d);
        $.each(this.list_bottom,
        function(a, b) {
            $("#poi_img_i_l_" + a).darkTooltip()
        })
    }
};