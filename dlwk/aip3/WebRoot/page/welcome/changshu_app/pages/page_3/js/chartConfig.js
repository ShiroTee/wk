/**
 * Created by lishengg on 2016/12/6.
 */
var options = {
    jmsr: {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            position: function (a, b, c) {
                return [a[0], "-50%"]
            }
        },
        grid: {
            left: "2%",
            right: "2%",
            top: "10%",
            bottom: "0%",
            containLabel: !0
        },
        xAxis: [{
            type: "category",
            data: ["2011\u5e74", "2012\u5e74", "2013\u5e74", "2014\u5e74", "2015\u5e74"],
            axisLine: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5,
                    width: 1
                }
            },
            axisTick: {
                show: !1,
                lignWithLabel: !0,
                lineStyle: {
                    color: "#fff",
                    opacity: .5
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#09b7ff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 10
                }
            }
        }],
        yAxis: [{
            type: "value",
            axisLine: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5,
                    width: 1
                }
            },
            axisTick: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5
                }
            },
            axisLabel: {
                formatter: function (a, b) {
                    return a / 1E4
                }, textStyle: {
                    color: "#09b7ff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 10
                }
            },
            splitLine: {
                show: !1
            }
        }, {
            type: "value",
            show: !1
        }],
        series: [{
            name: "\u57ce\u5e02\u5c45\u6c11\u53ef\u652f\u914d\u6536\u5165",
            type: "bar",
            data: [23881, 21716, 23770, 24079.6, 26218.65],
            color: ["#219C03"]
        }, {
            name: "\u589e\u957f\u7387",
            type: "line",
            smooth: !0,
            yAxisIndex: 1,
            data: [13.9, 13.1, 9.5, 9.4, 8.9],
            color: ["#17ACB2"]
        }, {
            name: "\u519c\u6751\u5c45\u6c11\u53ef\u652f\u914d\u6536\u5165",
            type: "bar",
            data: [9489.99, 10762.09, 12052.38, 12811, 13981.74],
            color: ["#D0980A"]
        }, {
            name: "\u589e\u957f\u7387",
            type: "line",
            smooth: !0,
            yAxisIndex: 1,
            data: [19.3, 13.4, 12, 11.3, 9.1],
            color: ["#940C07"]
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3
    },
    jyrs: {
        tooltip: {
            trigger: "item",
            formatter: function (a) {
                return "\u5e74\u9f84\u6bb5:" + a.name + "\u5c81\x3cbr/\x3e\u5171" + a.data.value1 + "\u4eba"
            }
        },
        calculable: !0,
        series: [{
            name: "\u5e74\u9f84\u6bb5\u5c31\u4e1a\u4eba\u6570",
            type: "funnel",
            left: "15%",
            right: "15%",
            top: "10%",
            bottom: "0%",
            sort: "ascending",
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
                    borderColor: "#fff",
                    borderWidth: 1
                }
            },
            data: [{
                value: 25,
                name: "18~25",
                value1: 51382
            }, {
                value: 100,
                name: "26~40",
                value1: 302593
            }, {
                value: 50,
                name: "41~50",
                value1: 188719
            }, {
                value: 75,
                name: "51~65",
                value1: 238017
            }],
            color: ["#F9CF37", "#71B84B", "#01ABA0", "#0070AA"]
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3,
        animationEasing: "quarticInOut"
    },
    nljzt: {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            formatter: function (a) {
                var b = "\u5e74\u9f84\u6bb5:" + a[0].name + "\u5c81\x3cbr/\x3e" + a[0].seriesName + ":" + Math.abs(a[0].value);
                return 2 == a.length ? (a = "\x3cbr/\x3e" + a[1].seriesName + ":" + a[1].value, b + a) : b
            }
        },
        legend: {
            left: "right",
            top: "5%",
            data: ["\u7537", "\u5973"],
            textStyle: {
                color: "#13b1ed"
            },
            itemWidth: 18,
            itemHeight: 10
        },
        grid: {
            left: "-15%",
            right: "15%",
            top: "10%",
            bottom: "-15%",
            containLabel: !0
        },
        xAxis: {
            type: "value",
            axisTick: {
                show: !1
            },
            splitLine: {
                show: !1
            },
            axisLine: {
                show: !1
            },
            axisLabel: {
                show: !1,
                formatter: function (a) {
                    return Math.abs(a) / 1E4 + "\u4e07"
                }
            }
        },
        yAxis: {
            type: "category",
            axisTick: {
                show: !1
            },
            splitLine: {
                show: !1
            },
            axisLine: {
                show: !1
            },
            axisLabel: {
                show: !1
            },
            data: "0-4 5-9 10-14 15-19 20-24 25-29 30-34 35-39 40-44 45-49 50-54 55-59 60-64 65-69 70-74 75-79 80-84 85-89 90-94 95-99 100+".split(" ")
        },
        series: [{
            name: "\u7537",
            type: "bar",
            stack: "\u603b\u91cf",
            label: {
                normal: {
                    show: !1
                }
            },
            data: [-330555, -457437, -344339, -220987, -346438, -613638, -478832, -350929, -356655, -357568, -425620, -245220, -281586, -225849, -146141, -100405, -53850, -43177, -33968, -12885, -11603],
            color: ["#ff3e08"]
        }, {
            name: "\u5973",
            type: "bar",
            stack: "\u603b\u91cf",
            label: {
                normal: {
                    show: !1,
                    position: "left"
                }
            },
            data: [273354, 375459, 268409, 174762, 288852, 584913, 448108, 339147, 353603, 371868, 427885, 234271, 260390, 213840, 143954, 99603, 55149, 47508, 40824, 17795, 21584],
            color: ["#339933"]
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3
    },
    pjsynl: {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        grid: {
            left: "2%",
            right: "2%",
            top: "10%",
            bottom: "0%",
            containLabel: !0
        },
        xAxis: {
            type: "category",
            data: [2011, 2012, 2013, 2014, 2015],
            axisLine: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5,
                    width: 1
                }
            },
            axisTick: {
                show: !1,
                alignWithLabel: !0,
                lineStyle: {
                    color: "#fff",
                    opacity: .5
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#09b7ff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 10
                }
            }
        },
        yAxis: {
            type: "value",
            axisLine: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5,
                    width: 1
                }
            },
            axisTick: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#09b7ff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 10
                }
            },
            splitLine: {
                show: !1
            }
        },
        series: [{
            name: "\u5e73\u5747\u751f\u80b2\u5e74\u9f84",
            type: "bar",
            barWidth: "50%",
            data: [25.2, 25.1, 25.3, 25.7, 25.6],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(23,255,250,1)"
                    }, {
                        offset: 1,
                        color: "rgba(23,255,250,0)"
                    }])
                }
            }
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3
    },
    rkmdMap: {
        grid: {
            show: !1
        },
        visualMap: {
            textStyle: {
                color: "#CACACA"
            },
            itemGap: 3,
            type: "piecewise",
            pieces: [{
                min: 5800,
                color: "#FF8000"
            }, {
                min: 3500,
                max: 5800,
                color: "#FFA042"
            }, {
                min: 690,
                max: 3500,
                color: "#FF6347"
            }, {
                min: 680,
                max: 690,
                color: "#CD5C5C"
            }, {
                min: 600,
                max: 680,
                color: "#FA8072"
            }, {
                min: 580,
                max: 600,
                color: "#FF7F50"
            }, {
                min: 575,
                max: 580,
                color: "#BC8F8F"
            }, {
                max: 575,
                color: "#DEB887"
            }],
            min: 570,
            max: 7050,
            left: "left",
            top: "bottom"
        },
        tooltip: {
            trigger: "item",
            formatter: null
        },
        series: [{
            name: "\u8986\u76d6\u7387(%)",
            type: "map",
            mapType: "xuzhou",
            roam: !0,
            zoom: 1.2,
            scaleLimit: {
                min: 1,
                max: 5
            },
            label: {
                normal: {
                    show: !0,
                    textStyle: {
                        color: "#a84a03"
                    }
                },
                emphasis: {
                    show: !0
                }
            },
            data: [{
                name: "\u4e30\u53bf",
                value: 653,
                pNum: 120.67
            }, {
                name: "\u6c9b\u53bf",
                value: 617,
                pNum: 130.92
            }, {
                name: "\u7762\u5b81\u53bf",
                value: 578,
                pNum: 144.28
            }, {
                name: "\u65b0\u6c82\u5e02",
                value: 571,
                pNum: 112.66
            }, {
                name: "\u90b3\u5dde\u5e02",
                value: 689,
                pNum: 187.49
            }, {
                name: "\u8d3e\u6c6a\u533a",
                value: 690,
                pNum: 52.07
            }, {
                name: "\u94dc\u5c71\u533a",
                value: 599,
                pNum: 131.36
            }, {
                name: "\u9f13\u697c\u533a",
                value: 5727,
                pNum: 59.87
            }, {
                name: "\u4e91\u9f99\u533a",
                value: 3434,
                pNum: 33.69
            }, {
                name: "\u6cc9\u5c71\u533a",
                value: 7033,
                pNum: 56.47
            }]
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3
    },
    ybp: {
        tooltip: {
            formatter: "{a} : {b}"
        },
        series: [{
            name: "\u793e\u4fdd\u7f34\u7eb3\u6bd4\u4f8b",
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "60%"],
            radius: "100%",
            axisTick: {
                show: !1
            },
            axisLabel: {
                show: !1
            },
            axisLine: {
                lineStyle: {
                    width: 5,
                    color: [
                        [.1132, "#FCB704"],
                        [1, "#dce3ec"]
                    ]
                }
            },
            splitLine: {
                show: !1,
                length: 10,
                lineStyle: {
                    color: "auto"
                }
            },
            pointer: {
                width: 2,
                length: "80%",
                color: "auto"
            },
            title: {
                show: !0,
                offsetCenter: [0, "25%"],
                textStyle: {
                    color: "auto",
                    fontSize: 12,
                    fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
                    fontWeight: "normal"
                }
            },
            detail: {
                show: !1
            },
            data: [{
                value: 11.32,
                name: "11.32%"
            }]
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3
    },
    rkzzl: {
        tooltip: {
            trigger: "axis",
            formatter: "{a} \x3cbr/\x3e{b}\u5e74 : {c}%"
        },
        grid: {
            left: "2%",
            right: "5%",
            top: "5%",
            bottom: "10%",
            containLabel: !0
        },
        xAxis: {
            type: "category",
            boundaryGap: !1,
            axisLine: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5,
                    width: 1
                }
            },
            axisTick: {
                show: !1,
                lignWithLabel: !0,
                lineStyle: {
                    color: "#fff",
                    opacity: .5
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#09b7ff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 10
                }
            },
            data: [2011, 2012, 2013, 2014, 2015]
        },
        yAxis: {
            type: "value",
            axisLine: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5,
                    width: 1
                }
            },
            axisTick: {
                show: !1,
                lineStyle: {
                    color: "#fff",
                    opacity: .5
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#09b7ff",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontFamily: "Microsoft YaHei",
                    fontSize: 10
                }
            },
            splitLine: {
                show: !1
            }
        },
        series: [{
            name: "\u4eba\u53e3\u589e\u957f\u7387",
            type: "line",
            sampling: "average",
            itemStyle: {
                normal: {
                    color: "#FFB506"
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(255,181,6,0.65)"
                    }, {
                        offset: 1,
                        color: "rgba(255,181,6,0)"
                    }])
                }
            },
            data: [10.88, 15.05, 17.84, 17.27, 9.04]
        }],
        animationDuration: 2E3,
        animationDurationUpdate: 2E3
    }
};