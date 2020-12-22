/**
 * @author zhanglei
 * @date 20160327
 */
// 数据历史接收总量统计
function init_sjlsjszltj(container, pageNo, pageSize) {
    $.ajax({
        url: getGrURL() + "dataOutComeHandler/getWbjSubmitData",
        dataType: 'jsonp',
        data: {pageNo: pageNo, pageSize: pageSize},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.data.listBeans.length;
            var tbody = "";
            var array;
            var sData0 = new Array();

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data.data.listBeans[i];
                    var temp = {};
                    temp["name"] = array.WBJMC;
                    temp["y"] = array.ALL_DATA_COUNT;
                    temp["drilldown"] = null;
                    sData0[i] = temp;
                }
                sjlsjszltj(container, sData0);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function sjlsjszltj(container, sData0) {
    // Create the chart
    $('#' + container).highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
			type: 'logarithmic',
            minorTickInterval: 1,
			min:1,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0,"",",");
                }
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    formatter: function() { 
						return  Highcharts.numberFormat(this.point.y, 0,"",",");
					}
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> <br/>'
        },

        series: [{
            name: '总数据量',
            colorByPoint: true,
            data: sData0
        }],
        drilldown: {
            series: [{}]
        }
    });
}


// 四库数据总接收量统计
function init_sksjzltjt(container) {

    $.ajax({
        url:  getGrURL() + "dataOutComeHandler/getOlapWdkData",
        dataType: 'jsonp',
        data: {},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var sData0 = new Array();

            if (obj != undefined && obj > 0) {
                for (var i=0;i<obj;i++){
				    var temp = {};
					temp["name"] = data[i].DBNAME;
					temp["month"] =data[i].NM;
					temp["total"] = data[i].NM;
					sData0[i] = temp;
				}
                /*var tempRk = {};//人口
                tempRk["name"] = data[0].SBJ_NM;
                tempRk["month"] =data[0].ZXQZ_CURRENT_MONTH_COUNT;
                tempRk["total"] = data[0].ZXQZ_TOTAL_COUNT;
                sData0[0] = tempRk;
                var tempFr = {};//法人
                tempFr["name"] = data[1].SBJ_NM;
                tempFr["month"] =data[1].ZXQZ_CURRENT_MONTH_COUNT;
                tempFr["total"] = data[1].ZXQZ_TOTAL_COUNT;
                sData0[1] = tempFr;*/
                // var tempHgjj = {};//宏观经济
                // tempHgjj["name"] = data[2].SBJ_NM;
                // tempHgjj["month"] =data[2].ZXQZ_CURRENT_MONTH_COUNT;
                // tempHgjj["total"] = data[2].ZXQZ_TOTAL_COUNT;
                // sData0[2] = tempHgjj;
                // var tempKjdl = {};//空间地理
                // tempKjdl["name"] = data[3].SBJ_NM;
                // tempKjdl["month"] =data[3].ZXQZ_CURRENT_MONTH_COUNT;
                // tempKjdl["total"] = data[3].ZXQZ_TOTAL_COUNT;
                // sData0[3] = tempKjdl;


                sksjzltjt(container, sData0);

            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}


function sksjzltjt(container, sData0) {
    var nameArray=[];
    var result = [];
    for(var i=0;i<sData0.length;i++){
        nameArray.push(sData0[i].name+"库");
        result.push(sData0[i].total);
    }
    var i=0;
    var myChart = echarts.init(document.getElementById(container));
    var option = {
        title:{
            text:'四库数据总量统计图',
            left:'center'
        },
        tooltip: {
            formatter: function(val){
					return val.name+"<br/>历史数据接收量："
					+formatNum(Math.abs(sData0[val.dataIndex].month),3,',');
            }
        },
        xAxis: {
            data: nameArray,
            silent: false,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: {
            splitArea: {show: false},
            nameLocation:'end',
			type:'log',
			min:1
        },
        grid: {
            left: 100
        },
        series: [
            {
                name: '数据接收总量',
                type: 'bar',
                stack: 'one',
			    barWidth : 60,//柱图宽度
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#A4D3EE','#778899','#98FB98','#FFA07A','#9370DB',
                                '#FF82AB','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle:{
                            color:'#000',
                            fontWeight:'bold'
                        },
                        formatter: function(val){
                            return formatNum(Math.abs(val.data),3,',');
                        }
                    }
                },
                data: result
            }/*,
            {
                name: '当前月数据接收量',
                type: 'bar',
                stack: 'one',
                itemStyle: {
                    normal: {
                        color: '#90ED7D'
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'inside',
                        textStyle:{
                            color:'#000',
                            fontWeight:'bold'
                        },
                        formatter: function(val){
                            return formatNum(Math.abs(val.data),3,',')+"条";
                        }
                    }
                },
                data: month
            }*/
        ]
    };

    myChart.setOption(option);
}

// 人口性别、年龄结构分布
function init_rkxbnljgfb(container, xzqh, tjnf) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getRkxbnljgList",
        dataType: 'jsonp',
        data: {xzqh: xzqh, tjnf: tjnf},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var array;
            var sData0 = new Array();
            var sData1 = new Array();
            var j = 0;
            var k = 0;

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    var xb=array.XB;
                    if (xb.indexOf('男')>-1) {

                        sData0[j] = 0 - Math.abs(array.RKS);
                        j += 1;
                    } else {
                        sData1[k] = Math.abs(array.RKS);
                        k += 1;
                    }
                }
                rkxbnljgfb(container, sData0, sData1);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function rkxbnljgfb(container, sData0, sData1) {
    // Age categories
    var categories = ['1-10', '11-20', '21-30', '31-40',
        '41-50', '51-60', '61-70', '71-80', '81-90',
        '91-100', '100 + '];
	 $('#' + container).highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '人口性别、年龄结构分布'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value)/10000 + '万';
                }
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                minPointLength : 2
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', 年龄段 ' + this.point.category + '</b><br/>' +
                    '人口数: ' + formatNum(Math.abs(this.point.y),3,',');
            }
        },

        series: [{
            name: '男',
            data: sData0
        }, {
            name: '女',
            data: sData1
        }]
    });

}

function formatNum(str, step, splitor) {
            str = str.toString();
            var len = str.length;
  
            if(len > step) {
                 var l1 = len%step, 
                     l2 = parseInt(len/step),
                     arr = [],
                     first = str.substr(0, l1);
                 if(first != '') {
                     arr.push(first);
                 };
                 for(var i=0; i<l2 ; i++) {
                     arr.push(str.substr(l1 + i*step, step));                                    
                 };
                 str = arr.join(splitor);
             };
             return str;
        }

// 人口增长强度变化结构
function init_rkzzqdbh(container, xzqh, startYear, endYear) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getRkzzqdList",
        dataType: 'jsonp',
        data: {startYear: startYear, endYear: endYear},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var array;
            var csrk = new Array();
            var swrk = new Array();
            var zzrk = new Array();
            var csl = new Array();
            var swl = new Array();
            var rkzzl = new Array();
            var tjnf = new Array();


            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    csrk[i] = array.CSRK *1;
                    swrk[i] =array.SWRK *1;
                    zzrk [i] = array.ZRZZRK *1;
                    csl[i] = array.CSL *1;
                    swl[i] = array.SWL *1;
                    rkzzl[i] = array.ZRZZL *1;
                    tjnf[i] = array.TJNF *1;
                }
                rkzzqdbh(container, csrk, swrk, zzrk, csl, swl, rkzzl, tjnf);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function rkzzqdbh(container,  csrk, swrk, zzrk, csl, swl, rkzzl, tjnf) {
    $('#' + container).highcharts({
        chart: {
            zoomType: 'xy'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '人口增长强度变化结构'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: tjnf,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '人数',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} ',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '出生人口',
            type: 'column',
            yAxis: 1,
            data: csrk,
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: '死亡人口',
            type: 'column',
            yAxis: 1,
            data: swrk,
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: '自然增长人口',
            type: 'column',
            yAxis: 1,
            data: zzrk,
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: '出生率',
            type: 'spline',
            data: csl,
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: '死亡率',
            type: 'spline',
            data: swl,
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
        name: '自增率',
            type: 'spline',
            data: rkzzl,
            tooltip: {
            valueSuffix: ' %'
        }
    }]
    });
}

// 死亡人口及死因统计分析
function init_swrkjsytj(container, xzqh, startYear, endYear) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getSwrkjsyList",
        dataType: 'jsonp',
        data: {xzqh: xzqh, startYear: startYear, endYear: endYear},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var array;
            var tjnf = new Array();
            var swrsnan = new Array();
            var swrsnv = new Array();
            var zrswl = new Array();
            var sgswl = new Array();
            var bbswl = new Array();

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    tjnf[i] = Math.abs(array.TJNF);
                    swrsnan[i] = Math.abs(array.SWRSNAN);
                    swrsnv[i] = Math.abs(array.SWRSNV);
                    zrswl[i] = Math.abs(array.ZRSWL*1000);
                    sgswl[i] = Math.abs(array.SGSWL*1000);
                    bbswl[i] = Math.abs(array.BBSWL*1000);
                }
                swrkjsytj(container, tjnf, swrsnan, swrsnv, zrswl, sgswl, bbswl);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function swrkjsytj(container, tjnf, swrsnan, swrsnv, zrswl, sgswl, bbswl) {
    $('#' + container).highcharts({
        chart: {
            zoomType: 'xy'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '死亡人口及死因统计分析'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: tjnf,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}‰',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '人数',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} ‰',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '死亡人数男',
            type: 'column',
            yAxis: 1,
            data: swrsnan,
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: '死亡人数女',
            type: 'column',
            yAxis: 1,
            data: swrsnv,
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: '自然死亡率',
            type: 'spline',
            data: zrswl,
            tooltip: {
                valueSuffix: ' ‰'
            }
        }, {
            name: '事故死亡率',
            type: 'spline',
            data: sgswl,
            tooltip: {
                valueSuffix: ' ‰'
            }
        }, {
            name: '病变死亡率',
            type: 'spline',
            data: bbswl,
            tooltip: {
                valueSuffix: ' ‰'
            }
        }]
    });
}

// 交通运输旅客周转量统计分析
function init_sletrxtj(container, xzqh, startYear, endYear, nld) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getSletrxtjList",
        dataType: 'jsonp',
        data: {startYear: startYear, endYear: endYear},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var array;
            var tl = new Array();
            var gl = new Array();
            var hk = new Array();
            var sy = new Array();
            var tlzzl = new Array();
            var glzzl = new Array();
            var hkzzl = new Array();
            var syzzl = new Array();
            var tjnf = new Array();

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    tl[i] = array.TL *1;
                    gl[i] = array.GL *1;
                    hk[i] = array.HK *1;
                    sy[i] = array.SY *1;
                    tlzzl[i] = array.TLZZL *1;
                    glzzl[i] = array.GLZZL *1;
                    hkzzl[i] = array.HKZZL *1;
                    syzzl[i] = array.SYZZL *1;
                    tjnf[i] =  array.TJNF  *1;
                }
                sletrxtj(container,tl, gl, hk, sy,  tlzzl, glzzl, hkzzl, syzzl,tjnf);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function sletrxtj(container, tl, gl, hk, sy,  tlzzl, glzzl, hkzzl, syzzl,tjnf) {
    $('#' + container).highcharts({
        chart: {
            zoomType: 'xy'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '交通运输旅客周转量统计分析'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: tjnf,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: '旅客周转量(万人公里)',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 80,
            verticalAlign: 'top',
            y: 55,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '铁路',
            type: 'column',
            yAxis: 1,
            data: tl,
            tooltip: {
                valueSuffix: ' 万人公里'
            }

        }, {
            name: '公路',
            type: 'column',
            yAxis: 1,
            data: gl,
            tooltip: {
                valueSuffix: ' 万人公里'
            }

        }, {
            name: '航空',
            type: 'column',
            yAxis: 1,
            data: hk,
            tooltip: {
                valueSuffix: ' 万人公里'
            }

        }, {
            name: '水运',
            type: 'column',
            yAxis: 1,
            data: sy,
            tooltip: {
                valueSuffix: ' 万人公里'
            }

        }, {
            name: '铁路增长率',
            type: 'spline',
            data: tlzzl,
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: '公路增长率',
            type: 'spline',
            data: glzzl,
            tooltip: {
                valueSuffix: ' %'
            }
        },{
            name: '航空增长率',
            type: 'spline',
            data: hkzzl,
            tooltip: {
                valueSuffix: ' %'
            }
        }, {
            name: '水运增长率',
            type: 'spline',
            data: syzzl,
            tooltip: {
                valueSuffix: ' %'
            }
        }]
    });
}