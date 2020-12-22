/**
 * @author zhanglei
 * @date 20160327
 */
function splitArrayByDate(array, date) {
    array = array.map(function (item) {
        return item == 0 ? null : Number(item);
    });
    date = parseInt(date);
    var len = 10;
    if (year - date <= len) {
        return array.slice(-len);
    } else {
        return array.slice(-(year - date), len - (year - date));
    }
}
function emptyThis() {
    for (var i = 0; i < arguments.length; i++) {
        $(arguments[i]).empty();
    }
}
// 宏观经济
function init_hgjj(container, zbnd, zbdm, zbmc) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getHgjj",
        dataType: 'jsonp',
        data: {zbnd: zbnd, zbdm: zbdm},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.length;
            var array;
            var sData0 = new Array();
            var zbdw;

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    var temp = {};
                    temp["name"] = array.QHMC;
                    temp["y"] = Math.abs(array.DQZ);
                    sData0[i] = temp;
                }
                zbdw = data[0].ZBDW;
                hgjj(container, sData0, zbdw, zbmc);
                sData0.sort(function (a, b) {
                    return b.y - a.y;
                });
                var hgjjhtml = '';
                for (var i = 0; i < 6; i++) {
                    hgjjhtml += "<li>" + sData0[i].name + "<span class='fr'>" + sData0[i].y + "</span></li>";
                }
                $('#hgjjtable>ol').html(hgjjhtml);
                $('#hgjjtable>p>strong').text(' TOP 6（' + zbdw + '）');
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}


// 徐州市法人按行政区划分产业分布统计图
function init_fraxzqhfcyfbtj(container) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getHyfbtj",
        dataType: 'jsonp',
        data: {xzqh: 320303000000},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.length;
            var array;
            var sData0 =[];
            var sData1 =[];
            var sData2 =[];
            var sData3 =[];
            var sData4 =[];
            var sData5 =[0,0,0];

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    for(var j=0;j<xzqhArray.length;j++){

                        if(array.DQ=xzqhArray[j].RK_XZQHMB_ID){
                            if(array.FRCY=='第一产业'){
                                sData1[j]=array.NUM;
                                sData5[0] += array.NUM;
                            }
                            if(array.FRCY=='第二产业'){
                                sData2[j]=array.NUM;
                                sData5[1] += array.NUM;
                            }
                            if(array.FRCY=='第三产业'){
                                sData3[j]=array.NUM;
                                sData5[2] += array.NUM;
                            }
                        }
                    }
                }
                for(var i=0;i<xzqhArray.length;i++){
                    sData0[i] = xzqhArray[i].QHMC;
                    sData4[i] = Math.round((sData1[i]+sData2[i]+sData3[i])/30)*10;
                }
                fraxzqhfcyfbtj(container,sData0,sData1,sData2,sData3,sData4,sData5);
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function fraxzqhfcyfbtj(container,sData0,sData1,sData2,sData3,sData4,sData5) {
    $('#'+container).highcharts({
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '徐州市法人按行政区划分产业分布统计图'
        },
        xAxis: {
            title: {
                text: '行政区划'
            },
            categories: sData0
        },
        yAxis: {
            title: {
                text: '法人数(户)'
            }
        },
        labels: {
            items: [{
                html: '产业总体情况',
                style: {
                    left: '50px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [{
            type: 'column',
            name: '第一产业',
            data: sData1
        }, {
            type: 'column',
            name: '第二产业',
            data: sData2
        }, {
            type: 'column',
            name: '第三产业',
            data: sData3
        }, {
            type: 'spline',
            name: '平均',
            data: sData4,
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f} %)</b>'
            },
            type: 'pie',
            name: '总量',
            data: [{
                name: '第一产业',
                y: sData5[0],
                color: Highcharts.getOptions().colors[0]
            }, {
                name: '第二产业',
                y: sData5[1],
                color: Highcharts.getOptions().colors[1]
            }, {
                name: '第三产业',
                y: sData5[2],
                color: Highcharts.getOptions().colors[2]
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }]
    });
}

// 法人地区分布统计
function init_frdqfbtj(container,year) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getFrDqfbtj",
        dataType: 'jsonp',
        data: {tjnf: year},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var array;
            var sData0 = new Array();

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    var temp = {};
                    temp["name"] = array.QHMC;
                    temp["y"] = array.NUM * 1;
                    sData0[i] = temp;
                }

                frdqfbtj(container, sData0);
            }
        },
        timeout: 6000
    });
}

function frdqfbtj(container, sData0) {
    // Build the chart
    $('#' + container).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '法人地区分布统计'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} 户({point.percentage:.1f} %)</b>'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 30,
            y: 50,
            floating: true,
            itemMarginBottom: 10,
            symbolWidth: 20
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        series: [{
            name: '法人数量',
            colorByPoint: true,
            data: sData0
        }]
    });
}

// 地区生产总值结构分析
function init_dqsczzjgfx(container) {
    $.ajax({
        url: getGrURL() + "statisticChartSJTJHandler/getCsyssltj",
        dataType: 'jsonp',
        data: {xzqh:320303000000},
        jsonp: "jsonpcallback",
        success: function (data) {
            var obj = data.length;
            var array;
            var sData0 = new Array();

            if (obj != undefined && obj > 0) {
                for (var i = 0; i < obj; i++) {
                    array = data[i];
                    var temp = {};
                    temp["name"] = array.QHMC;
                    temp["y"] = array.NUM;
                    sData0[i] = temp;
                }

                dqsczzjgfx(container, sData0);
            }
        },
        timeout: 6000
    });
}

function dqsczzjgfx(container, sData0) {
    // Build the chart
    $('#' + container).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled:false
        },
        title: {
            text: '法人地区分布统计'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} 户({point.percentage:.1f} %)</b>'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 30,
            y: 50,
            floating: true,
            itemMarginBottom: 10,
            symbolWidth: 20
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: '法人数量',
            colorByPoint: true,
            data: sData0
        }]
    });
}

// 覆盖 indexHighCharts.js 中的同名方法
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
            text: '数据历史接收总量统计'
        },
        subtitle: {
            text: ''
        },
        
        xAxis: {
            type: 'category',
            title: {
                text: '委办局名称'
            }
        },
        yAxis: {
			type: 'logarithmic',
            minorTickInterval: 1,
			min:1,
            title: {
                text: '数据量'
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

function sksjzltjt1(container, sData0) {
    var nameArray=[];
    var result = [];
    var month = [];
    for(var i=0;i<sData0.length;i++){
        nameArray.push(sData0[i].name);
        result.push(sData0[i].total-sData0[i].month);
        month.push(sData0[i].month);
    }

    var myChart = echarts.init(document.getElementById(container));
    var option = {
        title:{
            text:'四库数量总量统计图',
            left:'center'
        },
        tooltip: {
            formatter: function(val){

                return val.name+"<br/>"+val.seriesName+"："+val.data+"条";
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
            name:'条',
            splitArea: {show: false},
            nameLocation:'start'

        },

        series: [
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
                        show: true,
                        position: 'inside',
                        textStyle:{
                            color:'#000',
                            fontWeight:'bold'
                        },
                        formatter: function(val){
                            return val.data+"条";
                        }
                    }
                },
                data: month
            },
            {
                name: '历史数据接收量',
                type: 'bar',
                stack: 'one',
                itemStyle: {
                    normal: {
                        color: '#7CB5EC'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        textStyle:{
                            color:'#000',
                            fontWeight:'bold'
                        },
                        formatter: function(val){
                            return val.data+"条";
                        }
                    }
                },
                data: result
            }
        ]
    };

    myChart.setOption(option);
}
function changeColor(){
    $('#tab1>tbody>tr>td>a:eq(0)').click().css("color","#0193DE");
    $("#tab1>tbody a").each(function(i){
        $("#tab1>tbody a").eq(i).click(function(){
            $("#tab1>tbody a").css("color","#737373");
            $(this).css("color","#0193DE");
        });
    })
}


//各委办局数据提交量统计
function init_gwbjsjtiltj(container,wbjmc){
    $("#"+container).empty();
    $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getGwbjsjtjltj",
        dataType: 'jsonp',
        data: {wbjmc:wbjmc},
        jsonp: "jsonpcallback",
        success: function (data) {
           
            var obj = data.length;

            if (obj != undefined && obj > 0) {

                gwbjsjtiltj(container, data,wbjmc);

            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function gwbjsjtiltj(container,data,wbjmc){

    var nameArr = [];
    var result = [];
    var month = [];
    for(var i=0;i<data.length;i++){
        nameArr.push(data[i].ORG_NM);
        result.push(data[i].ZXQZ_TOTAL_COUNT+data[i].ZXQZ_CURRENT_MONTH_COUNT);
        month.push(data[i].ZXQZ_CURRENT_MONTH_COUNT);
    }

    var myChart = echarts.init(document.getElementById(container));
    var option = {
        title:{
            text:wbjmc==null?'各委办局数据提交量统计':wbjmc+'数据提交量统计',
            left:'center'
        },
        tooltip: {
            formatter: function(val){

               // return val.name+"<br/>"+val.seriesName+"："+val.data+"条";
			   return val.name+"<br/>历史数据接收量："+formatNum(Math.abs(val.data-month[val.dataIndex]),3,',')+"<br/>当前月数据接收量："
					+formatNum(Math.abs(month[val.dataIndex]),3,',');
            }
        },
        xAxis: {
            data: nameArr,
            silent: false,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false},
			axisLabel :{  
				interval:0,
				rotate: 40,
			}  
        },
        yAxis: [
            {
                //name:'条',
                splitArea: {show: false},
                nameLocation:'end',
				type:'log',
				min:1
            }
        ],
        grid: {
            left: 100,
			height:400
        },
        series: [
				
            {
                name: '数据接收总量',
                type: 'bar',
                stack: 'one',
                itemStyle: {
                    normal: {
                         color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
							'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    }
                    }
                },
                label: {
                    normal: {
                        show: false,
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
            }
        ]
    };

    myChart.setOption(option);
    myChart.on('click', function (params) {
        window.open("dataContainer.jhtml?index=9&name="+params.name,"_self");
    });
}


//各委办局数据使用量统计
function init_gwbjsjsyltj(container,yymc){
    $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getGwbjsjsyltj",
        dataType: 'jsonp',
        data: {yymc:yymc},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.length;

            if (obj != undefined && obj > 0) {

                gwbjsjsyltj(container, data,yymc);

            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function gwbjsjsyltj(container,data,yymc){


    var nameArr = [];
    var sum = [];
    var monthlySum = [];

    for(var i=0;i<data.length;i++){
        nameArr.push(data[i].NM);
        sum.push(data[i].SUM);
        monthlySum.push(data[i].MONTHLY_SUM);
    }

    var myChart = echarts.init(document.getElementById(container));
    var option = {
		 title:{
            text:yymc==null?'应用使用量统计':yymc+'应用使用量统计',
            left:'center'
        },
        tooltip: {},
        xAxis: {
            data: nameArr,
            silent: false,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false}
        },
        yAxis: [
            {
			    name:'次',
				type:'value',
				min:1,
				axisLine:{
					lineStyle:{
						color: '#878787'
					}
				}
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                stack: 'one',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: []
            },
            {
                name: '当月应用使用量',
                type: 'bar',
                stack: 'one',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#9BCA63','#60C0DD','#F3A43B','#FAD860','#C1232B',
                                '#F4E001','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#D7504B','#C6E579','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#9BCA63','#60C0DD','#F3A43B','#FAD860','#C1232B',
                                '#F4E001','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#D7504B','#C6E579','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: monthlySum
            },
            {
                name: '',
                type: 'bar',
                stack: 'two',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#9BCA63','#60C0DD','#F3A43B','#FAD860','#C1232B',
                                '#F4E001','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#D7504B','#C6E579','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: []
            },
            {
                name: '历史应用使用量',
                type: 'bar',
                stack: 'two',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#9BCA63','#60C0DD','#F3A43B','#FAD860','#C1232B',
                                '#F4E001','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#D7504B','#C6E579','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#9BCA63','#60C0DD','#F3A43B','#FAD860','#C1232B',
                                '#F4E001','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#D7504B','#C6E579','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        }
                    }
                },
                data: sum
            }
        ]
    };

    myChart.setOption(option);
    myChart.on('click', function (params) {
        //window.open("dataContainer.jhtml?index=12&name="+params.name,"_self");
    });
}

//各委办局数据提交量详细统计
function init_gwbjsjtjlxxtj(container,wbjmc){
    $("#"+container).empty();
    $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getGwbjsjtjlxxtj",
        dataType: 'jsonp',
        data: {wbjmc:wbjmc},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.length;

            if (obj != undefined && obj > 0) {

                gwbjsjtjlxxtj(container, data,wbjmc);

            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function gwbjsjtjlxxtj(container,data,wbjmc){

    var nameArr = [];
    var result = [];
    var month = [];
    for(var i=0;i<data.length;i++){
        nameArr.push(data[i].ASSET_NAME);
        result.push(data[i].ZXQZ_TOTAL_COUNT+data[i].ZXQZ_CURRENT_MONTH_COUNT);
        month.push(data[i].ZXQZ_CURRENT_MONTH_COUNT);
    }
	var num;
	if(data.length>4){
		num = 30;
	}else{
		num = 0;
	}

    var myChart = echarts.init(document.getElementById(container));
    var option = {
        title:{
            text:wbjmc==null?'各委办局数据提交量详细统计':wbjmc+'数据提交量详细统计',
            left:'center'
        },
        tooltip: {
            formatter: function(val){
					return val.name+"<br/>历史数据接收量："+formatNum(Math.abs(val.data-month[val.dataIndex]),3,',')+"<br/>当前月数据接收量："
					      +formatNum(Math.abs(month[val.dataIndex]),3,',');
            }
        },
        xAxis: {
            data: nameArr,
            silent: false,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false},
			axisLabel :{  
				interval:0,
				rotate: num
			}  
        },
        yAxis: {
			type:'log',
			min:1,
            splitArea: {show: false},
            nameLocation:'end'
        },
        grid: {
            left: 100,
			height:360
        },
        series: [
				
            {
                name: '数据接收总量',
                type: 'bar',
                stack: 'one',
                itemStyle: {
                    normal: {
                         color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
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
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
        window.open("dataContainer.jhtml?index=10&name="+wbjmc,"_self");
    });
	
}
//各委办局数据提交质量统计
function init_gwbjsjtjzltj(container,wbjmc){
	$("#"+container).empty();
    $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getGwbjsjtjzltj",
        dataType: 'jsonp',
        data: {wbjmc:wbjmc},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.length;

            if (obj != undefined && obj > 0) {

                gwbjsjtjzltj(container, data,wbjmc);

            }else{
                alert("没有查询到数据！");
            }
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function gwbjsjtjzltj(container,data,wbjmc){
    var nameArr = [];
    var rate = [];

    for(var i=0;i<data.length;i++){
        nameArr.push(data[i].ASSET_NAME);
        rate.push(data[i].TOTAL_RATE*100);
    }
	var num;
	if(data.length>4){
		num = 30;
	}else{
		num = 0;
	}

    var myChart = echarts.init(document.getElementById(container));
    var option = {
        title:{
            text:wbjmc+'数据提交质量统计',
            left:'center'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(val){
                return val[0].name+"："+val[0].data+"%";
            }
        },
        grid: {
            left: '3%',
            right: '4%',
			height:380,
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : nameArr,
				axisLabel :{  
					interval:0,
					rotate: num
			    }  
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:'（%）百分比'
            }
        ],
        series : [
            {
                name:'',
                type:'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
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
                            return val.data+"%";
                        }
                    }
                },
                data:rate
            }
        ],


    };
    myChart.setOption(option);
}

//各委办局数据使用流向图
function init_gwbjsjsylxxtj(container,wbjmc){
    $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getGwbjsjsylxxtj",
        dataType: 'jsonp',
        data: {wbjmc:wbjmc},
        jsonp: "jsonpcallback",
        success: function (data) {

            var obj = data.length;

            if (obj != undefined && obj > 0) {

                gwbjsjsylxxtj(container, data,wbjmc);

            }else{
			   alert(wbjmc+"暂时无数据！");
			}
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function gwbjsjsylxxtj(container,data,wbjmc){
    var myChart = echarts.init(document.getElementById(container));

    var nodes=[{category:0, name: wbjmc,value:12, symbolSize:60}];
    var links=[];

    for(var i=0;i<data.length;i++){
        wbjmc=nodes[0].name=data[0].USERS;
        var x={},y={},m={},n={};
        var flag=true;
        var flag2=true;
        for(var l=0;l<nodes.length;l++){
            if(nodes[l].name==data[i].PROVIDER){
                flag=false;
                break;
            }
        }
        if(flag){
            x.category=1;
            x.name=data[i].PROVIDER;
			x.value=1;
			x.symbolSize=35;
            nodes.push(x);
        }
        y.category=2;
        y.name=data[i].RESOURCES;
        y.value=4;
		y.symbolSize=45;
			
        /*var z={},k={};
		k.color='red';
        z.normal=k;
		y.itemStyle=z;*/
        //alert(JSON.stringify(y));
        nodes.push(y);
        for(var l=0;l<links.length;l++){

            if(links[l].source==data[i].PROVIDER){
                flag2=false;
                break;
            }
        }
        if(flag2){
            m.source=data[i].PROVIDER;
            m.target=data[i].USERS;
            links.push(m);
        }

        n.source=data[i].RESOURCES;
        n.target=data[i].PROVIDER;

        links.push(n);
    }

    var option = {
        title : {
            text: wbjmc+'数据使用流向图',
            left:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: function (params, ticket, callback){
                var type = params.dataIndex;
               if (params.data !==undefined && params.data.source !== undefined && params.data.target !== undefined){
                return "关系: "+params.data.source+"-"+params.data.target;
               }else{
                if(type==0){
                    return "数据使用方: "+params.name;
                }else if(type==1){
                    return "数据提供方: "+params.name;
                }else if(type==2){
                    return "数据项: "+params.name;
                }
               }
            }
        },
        series : [
            {
                type: 'graph',
                layout: 'force',
                name : "数据使用流向图",
                label: {
                    normal: {
                        show:true,
                        position: 'top',
                        formatter: '{b}',
                        /*textStyle:{
                           color:'#006666'
                        }*/
                    }
                },
                categories : [
                    {
                        name: '数据使用方'
                    },
                    {
                        name: '数据提供方'
                    },
                    {
                        name:'数据项'
                    }
                ],
                lineStyle:{
					normal:{
						color:'black'
					}
				},
                roam: true,
               

                nodes:nodes,
                links : links,
                force: {
                    repulsion: 500,
                    edgeLength:100,
                }
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {

         if(params.value!=0){
             //window.open("dataContainer.jhtml?index=12&name="+params.name,"_self");
         }

    });

}


//个人图谱
function findGrtp(){
	var sfzh=$("#sjtj").val();
     $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getGrtp",
        dataType: 'jsonp',
        data: {sfzh:sfzh},
        jsonp: "jsonpcallback",
        success: function (data) {
            //alert(JSON.stringify(data));
            var obj = data.length;

            if (obj != undefined && obj > 0) {
                 init_chd(data);
            }else{
			   alert("暂时无数据！");
			}
        },
        error: function (response) {
        },
        timeout: 6000
    });
}
function init_chd(data) {
		var nodes=[
				    {category:1, name: data[0].NAME, value : 12,label: data[0].NAME+'\n（主要）',itemStyle:{normal: {label:  {textStyle: {fontWeight:'bold'}}}}}, 
				    {category:0, name: '基本信息',value : 1},
					{category:0, name: '亲属信息',value : 1},
					{category:0, name: '财产信息',value : 1},
					{category:0, name: '税务信息',value : 1},
					{category:0, name: '证照信息',value : 1},
					{category:0, name: '工作信息',value : 1},
				    {category:2, name: '性别',value : 4},
				    {category:2, name: '年龄',value : 4},
				    {category:2, name: '家庭住址',value : 4},
				    {category:2, name: '出生医院',value : 4}
				  ];
		var links=[
					{source : '基本信息', target : data[0].NAME, weight : 1},
					{source : '亲属信息', target : data[0].NAME, weight : 1},
					{source : '财产信息', target : data[0].NAME, weight : 1},
					{source : '税务信息', target : data[0].NAME, weight : 1},
					{source : '证照信息', target : data[0].NAME, weight : 1},
					{source : '工作信息', target : data[0].NAME, weight : 1},
					{source : '性别',target : '基本信息', weight : 5},
					{source : '年龄',target : '基本信息', weight : 5},
					{source : '家庭住址', target : '基本信息', weight : 5},
					{source : '出生医院', target : '基本信息', weight : 5}
		];
		for(var i=0;i<data.length;i++){
			var x={},y={},m={},n={};
			var flag=true;
			var flag2=true;
			for(var l=0;l<nodes.length;l++){
				if(nodes[l].name==data[i].XXLB){
					flag=false;
					break;
				}
			}
			if(flag){
				x.category=1;
				x.name=data[i].XXLB;
				x.value=1;
				nodes.push(x);
			}
			y.category=2;
			y.name=data[i].XXMC;
			y.value=4;
				
			/*var z={},k={};
			k.color='red';
			z.normal=k;
			y.itemStyle=z;*/
			//alert(JSON.stringify(y));
			nodes.push(y);
			for(var l=0;l<links.length;l++){

				if(links[l].source==data[i].XXLB){
					flag2=false;
					break;
				}
			}
			if(flag2){
				m.source=data[i].XXLB;
				m.target=data[i].NAME;
				links.push(m);
			}

			n.source=data[i].XXMC;
			n.target=data[i].XXLB;
			n.weight=6;

			links.push(n);
		}
        var myChart = echarts.init(document.getElementById('container'));
        var option = {
        	    title : {
        	        text: '个人图谱：'+data[0].NAME,
        	        x:'center',
        	        y:'30',
        	        padding:50
        	    },
        	    tooltip : {
        	        trigger: 'item',
        	        formatter: function (params, ticket, callback){
						for(var i=0;i<data.length;i++){
						   if(params.name=='基本信息'){
							   tooltip.show=false;
						   }
						   if(params.name==data[i].XXMC){
						     return data[i].XXZSNR;
						   }else if(params.name=='性别'){
						     return data[0].SEX;
						   }else if(params.name=='年龄'){
						     return data[0].AGE;
						   }else if(params.name=='家庭住址'){
						     return data[0].ADDRESS;
						   }else if(params.name=='出生医院'&&data[0].HOSPITAL!=undefined){
						     return data[0].HOSPITAL;
						   }else{
						     return params.name;
						   }
						}
						}
        	    },
        	    series : [
        	        {
        	            type:'force',
        	            ribbonType: false,
        	            categories : [
        	                {
        	                	name: '信息类别',
        	                    name: '个人中心',
        	                    name: '详细信息'
        	                }
        	            ],
        	            itemStyle: {
        	            	normal: {
        	                    label: {
        	                        show: true,
        	                        textStyle: {
        	                            color: '#333'
        	                        }
        	                    },
        	                    nodeStyle : {
        	                        brushType : 'both',
        	                        borderColor : '#DDDDDD',
        	                        borderWidth : 1
        	                    },
        	                    linkStyle: {
        	                        type: 'curve'
        	                    }
        	                },
        	            },
        	            useWorker: false,
        	            minRadius : 20,
        	            maxRadius : 30,
        	            gravity: 0.6,
        	            scaling: 1.1,
        	            nodes:nodes/*[
        	                {category:1, name: '张三', value : 12, label: '张三\n（主要）'},

        	                {category:0, name: '基本信息',value : 1},
        	                {category:0, name: '亲属信息',value : 1},
        	                {category:0, name: '财产信息',value : 1},
        	                {category:0, name: '税务信息',value : 1},
        	                {category:0, name: '证照信息',value : 1},
        	                {category:0, name: '工作信息',value : 1},


        	                {category:2, name: '行医资格证',value : 2},
        	                {category:2, name: '护士资格证',value : 2},
        	                {category:2, name: '教师资格证',value : 2},
        	                {category:2, name: '律师资格证',value : 2},

        	                {category:2, name: '名下汽车',value : 3},
        	                {category:2, name: '名下房产',value : 3},
        	                {category:2, name: '持投公司',value : 3},


        	                {category:2, name: '性别',value : 4},
        	                {category:2, name: '年龄',value : 4},
        	                {category:2, name: '家庭住址',value : 4},
        	                {category:2, name: '出生医院',value : 4},
        	                {category:2, name: '教职人员',value : 4},
        	                {category:2, name: '残疾人信息',value :4},

        	                {category:2, name: '父母',value : 6},
        	                {category:2, name: '子女',value : 6},
        	                {category:2, name: '配偶',value : 6},

        	                {category:2, name: '国税纳税信息',value : 5},
        	                {category:2, name: '地税纳税信息',value : 5},

        	                {category:2, name: '工作单位',value : 7},
        	                {category:2, name: '职工保险',value : 7},

        	            ]*/,
        	            links : links/*[
        	                
							{source : '基本信息', target : '张三', weight : 1},
							{source : '亲属信息', target : '张三', weight : 1},
							{source : '财产信息', target : '张三', weight : 1},
							{source : '税务信息', target : '张三', weight : 1},
							{source : '证照信息', target : '张三', weight : 1},
							{source : '工作信息', target : '张三', weight : 1},
							
							{source : '工作单位', target : '工作信息', weight : 2},
							{source : '职工保险', target : '工作信息', weight : 2},
        	                     
        	                {source : '行医资格证', target : '证照信息', weight : 2},
        	                {source : '教师资格证', target : '证照信息', weight : 2},
        	                {source : '律师资格证', target : '证照信息', weight : 2},
        	                {source : '护士资格证', target : '证照信息', weight : 2},
        	                
        	                {source : '国税纳税信息', target : '税务信息', weight : 3},
        	                {source : '地税纳税信息', target : '税务信息', weight : 3},
        	                
        	                {source : '名下汽车', target : '财产信息', weight : 4},
        	                {source : '名下房产', target : '财产信息', weight : 4},
        	                {source : '持投公司', target : '财产信息', weight : 4},
        	                
        	                {source : '性别',target : '基本信息', weight : 5},
        	                {source : '年龄',target : '基本信息', weight : 5},
        	                {source : '家庭住址', target : '基本信息', weight : 5},
        	                {source : '出生医院', target : '基本信息', weight : 5},
        	                {source : '教职人员', target : '基本信息', weight : 5},
        	                {source : '残疾人信息',target : '基本信息', weight : 5},
        	                
        	                {source : '父母', target : '亲属信息', weight : 6},
        	                {source : '子女', target : '亲属信息', weight : 6},
        	                {source : '配偶', target : '亲属信息', weight : 6}
        	                
        	            ]*/
        	        }
        	    ]
        	};
        myChart.setOption(option);
    }

//商业图谱
function findSytp(){
	var gszch=$("#sjtj").val();
     $.ajax({
        url:  getGrURL() + "statisticChartSJTJHandler/getSytp",
        dataType: 'jsonp',
        data: {gszch:gszch},
        jsonp: "jsonpcallback",
        success: function (data) {
            //alert(JSON.stringify(data));
            var obj = data.length;
            if (obj != undefined && obj > 0) {
                 init_Sytp(data);
            }else{
			   alert("暂时无数据！");
			}
        },
        error: function (response) {
        },
        timeout: 6000
    });
}

function init_Sytp(data) {
	   var nodes=[
					{category:1, name: data[0].QYMC, value : 12, label: data[0].QYMC+'\n（主要）',itemStyle:{normal: {label:  {textStyle: {fontWeight:'bold'}}}}},
					{category:0, name: '基本信息',value : 1},
					{category:0, name: '税务登记信息',value : 1},
                    {category:0, name: '行政许可信息',value : 1},
					{category:0, name: '行政处罚信息',value : 1}	
	             ];
		var links=[
					{source : '基本信息', target : data[0].QYMC, weight : 1},
					{source : '税务登记信息', target : data[0].QYMC, weight : 1},
					{source : '行政处罚信息', target : data[0].QYMC, weight : 1},
                    {source : '行政许可信息', target : data[0].QYMC, weight : 1},
		          ];
		for(var i=0;i<data.length;i++){
			var x={},y={},m={},n={};
			var flag=true;
			var flag2=true;
			for(var l=0;l<nodes.length;l++){
				if(nodes[l].name==data[i].XXMC){
					flag=false;
					break;
				}
			}
			if(flag){
				x.category=1;
				x.name=data[i].XXMC;
				x.value=1;
				nodes.push(x);
			}
			y.category=2;
			y.name=data[i].XXLB;
			y.value=4;
				
			/*var z={},k={};
			k.color='red';
			z.normal=k;
			y.itemStyle=z;*/
			//alert(JSON.stringify(y));
			nodes.push(y);
			for(var l=0;l<links.length;l++){

				if(links[l].source==data[i].XXMC){
					flag2=false;
					break;
				}
			}
			if(flag2){
				m.source=data[i].XXMC;
				m.target=data[i].QYMC;
				links.push(m);
			}

			n.source=data[i].XXLB;
			n.target=data[i].XXMC;
			n.weight=6;

			links.push(n);
		}
        var myChart = echarts.init(document.getElementById('container'));
        var option = {
        	    title : {
        	        text: '商业图谱：'+data[0].QYMC,
        	        x:'center',
        	        y:'30',
        	        padding:50
        	    },
        	    tooltip : {
        	        trigger: 'item',
        	        formatter: function (params, ticket, callback){
        	        	for(var i=0;i<data.length;i++){
						   if(params.name==data[i].XXLB){
                               var d = (data[i].XXZSNR).replace(new RegExp(",","gm"),",<br/>")
                                   .replace(new RegExp("，","gm"),",<br/>");
						     return d;
						   }
						}
                        return params.name;
						}
        	    },
        	    series : [
        	        {
        	            type:'force',
        	            ribbonType: false,
        	            categories : [
        	                {
        	                	name: '信息类别',
        	                    name: '企业中心',
        	                    name: '详细信息'
        	                }
        	            ],
        	            itemStyle: {
        	            	normal: {
        	                    label: {
        	                        show: true,
        	                        textStyle: {
        	                            color: '#333'
        	                        }
        	                    },
        	                    nodeStyle : {
        	                        brushType : 'both',
        	                        borderColor : '#DDDDDD',
        	                        borderWidth : 1
        	                    },
        	                    linkStyle: {
        	                        type: 'curve'
        	                    }
        	                },
        	            },
        	            useWorker: false,
        	            minRadius : 20,
        	            maxRadius : 30,
        	            gravity: 0.6,
        	            scaling: 1.1,
        	            nodes:nodes/*[
        	                {category:1, name: '测试公司', value : 12, label: '测试公司\n（主要）'},
        	                
        	                {category:0, name: '基本信息',value : 1},
        	                {category:0, name: '股东信息',value : 1},
        	                {category:0, name: '纳税信息',value : 1},
        	                {category:0, name: '行政处罚信息',value : 1},
        	                
        	                
        	                {category:2, name: '股东1',value : 2},
        	                {category:2, name: '股东2',value : 2},
        	                
        	                {category:2, name: '国税纳税信息',value : 3},
        	                {category:2, name: '地税纳税信息',value : 3},
        	                
        	                {category:2, name: '国税行政处罚信息',value : 3},
        	                {category:2, name: '地税行政处罚信息',value : 3},
        	               
        	                
        	                {category:2, name: '注册时间',value : 6},
        	                {category:2, name: '注册资本',value : 6},
        	                {category:2, name: '注册资本币种',value : 6},
        	                {category:2, name: '法定代表人',value : 6},
        	                {category:2, name: '所属行业',value : 6},
        	                {category:2, name: '公司地址',value : 6}
        	                
        	            ]*/,
        	            links :links /*[
        	                
							{source : '基本信息', target : '测试公司', weight : 1},
							{source : '股东信息', target : '测试公司', weight : 1},
							{source : '纳税信息', target : '测试公司', weight : 1},
							{source : '行政处罚信息', target : '测试公司', weight : 1},
							
							{source : '股东1', target : '股东信息', weight : 2},
							{source : '股东2', target : '股东信息', weight : 2},
        	                     
        	                {source : '注册时间', target : '基本信息', weight : 2},
        	                {source : '注册资本', target : '基本信息', weight : 2},
        	                {source : '注册资本币种', target : '基本信息', weight : 2},
        	                {source : '法定代表人', target : '基本信息', weight : 2},
        	                {source : '所属行业', target : '基本信息', weight : 2},
        	                {source : '公司地址', target : '基本信息', weight : 2},
        	                
        	                {source : '国税纳税信息', target : '纳税信息', weight : 3},
        	                {source : '地税纳税信息', target : '纳税信息', weight : 3},
        	                
        	                {source : '国税行政处罚信息', target : '行政处罚信息', weight : 3},
        	                {source : '地税行政处罚信息', target : '行政处罚信息', weight : 3}
        	                
        	            ]*/
        	        }
        	    ]
        	};
        myChart.setOption(option);
    }
