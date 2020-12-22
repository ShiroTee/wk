<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String basePath = request.getContextPath() + "/";
%>
<script src="<%=basePath%>thirdparty/highcharts/highcharts-more.js" type="text/javascript"></script>
<script>
    var index = 1;
    var zbdms = ['001001003', '10101010102', '00100100304'];
    var zbjcs = ['GDP', '人口', '人均GDP'];
    var colors = ['#7cb5ec', '#0193DE', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354'];
    var xzqhpid = '';
    function init_gdpdqpm(nf, xzqh, zbdm) {
        emptyThis('#tab1>tbody', '#container', '#tab2>tbody');
        xzqhpid = xzqh;
        if (nf == '') {
            nf ='init';
            showYear();
        }
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjDqpm",
            dataType: 'jsonp',
            data: {nf: nf, xzqh: xzqh, zbdm: zbdm},
            jsonp: "jsonpcallback",
            success: function (data) {
                var obj = data.data;
                var tbody = '';
                if(obj[xzqh].length<=0){
                    alert("没有查询到数据");
                    return;
                }
                var thead = //"<tr><th><a onclick=\"init_gdpdqpm('', '320000000000','" + zbdm + "');\">省内</a></th>"
                       // + "<th><a onclick=\"init_gdpdqpm('', '320300000000','" + zbdm + "');\">市内</a></th>"
                        //+ "<th><a onclick=\"init_gdpdqpm('', '110000','" + zbdm + "');\">淮海经济区</a></th></tr>"+
                 "<tr><th>排名</th><th>地市</th><th>数值(" + (obj[xzqh][0].ZBSJDW == undefined ? '' : obj[xzqh][0].ZBSJDW) + ")</th></tr>";
                $("#year").val(obj[xzqh][0].SJRQ);
                if (obj != undefined) {
                    for (var i = 0; i < obj[xzqh].length; i++) {
                        tbody += "<tr><td class='ac'>" + obj[xzqh][i].PM + "</td><td td class='ac'><a onclick=\"init_gdptb(" + obj[xzqh][i].SJRQ + ",'" + obj[xzqh][i].ZBSSDQ + "','" + obj[xzqh][i].QHMC + "')\">" + obj[xzqh][i].QHMC + "</a></td><td class='ar'>" + formatNumber(obj[xzqh][i].ZBSJ, 0, ' ') + "</td></tr>";
                    }
                    $('#tab1>thead').html(thead);
                    $('#tab1>tbody').html(tbody);

                    init_hgjjzbpm("tab2", obj[xzqh][0].SJRQ, obj[xzqh][0].ZBSSDQ);
                    init_rkgdp("container", obj[xzqh][0].SJRQ, xzqhpid);
                }
            },
            timeout: 6000
        });

    }
    function init_gdptb(nf, xzqh, qhmc) {
        hideLine('container', qhmc);
        hideLine('container2', qhmc);
        init_hgjjzbpm("tab2", nf, xzqh);
    }
    function hideLine(container, name) {
        var chart = $('#' + container).highcharts();
        if(chart){
            for (var i = 0; i < chart.series.length; i++) {
                if (chart.series[i].options.name == name) {
                    if (chart.series[i].visible) {
                        chart.series[i].hide();
                    } else {
                        chart.series[i].show();
                    }
                }
            }
        }
    }
    function init_rkgdp(container, nf, xzqh) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyNd",
            dataType: 'jsonp',
            data: {
                zbdms: zbdms.join(','),
                xzqh: xzqh,
                nd: nf
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data.success == true) {
                    rkgdp(container, data.data, nf);
                }
            },
            timeout: 6000
        });
    }
    function rkgdp(container, sData0, nf) {
        $('#' + container).highcharts({
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },
            legend: {
                enabled: true
            },
            title: {
                text: zbjcs[2]
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                gridLineWidth: 0,
                title: {
                    text: zbjcs[0]
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0) + ' 亿元';
                    }
                }
            },
            yAxis: {
                gridLineWidth: 0,
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: zbjcs[1]
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0) + ' 万人';
                    }
                },
                maxPadding: 0.2
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<table>' +
                '<tr><th>' + zbjcs[0] + ':</th><td>{point.x} {point.dwx}</td></tr>' +
                '<tr><th>' + zbjcs[1] + ':</th><td>{point.y} {point.dwy}</td></tr>' +
                '<tr><th>' + zbjcs[2] + ':</th><td>{point.z} {point.dwz}</td></tr></table>',
                followPointer: true
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    events: {
                        click: function (e) {
                            init_rkgdp_line('container2', e.point.xzqh, nf);
                        }
                    }
                }
            },
            series: (function () {
                var series = [];
                for (var xzqh in sData0) {
                    series.push({
                        name: sData0[xzqh].QHMC,
                        data: [
                            {
                                x: Number(sData0[xzqh][zbdms[0]].DQZ),
                                y: Number(sData0[xzqh][zbdms[1]].DQZ),
                                z: Number(sData0[xzqh][zbdms[2]].DQZ),
                                xzqh: xzqh,
                                dwx: sData0[xzqh][zbdms[0]].ZBDW,
                                dwy: sData0[xzqh][zbdms[1]].ZBDW,
                                dwz: sData0[xzqh][zbdms[2]].ZBDW,
                            }]
                    });
                }
                return series;
            })()
        });
    }
    function init_rkgdp_line(container, xzqh, nf) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyXzqhs",
            dataType: 'jsonp',
            data: {
                zbdms: zbdms[2],
                xzqhs: xzqh,
                type: 1,
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data.success == true) {
                    rkgdp_line(container, data.data, xzqh, nf);
                }
            },
            timeout: 6000
        });
    }
    function rkgdp_line(container, sData0, sData1, nf) {
        $(".returnBtn").show();
        $("#container").hide();
        $('#' + container).show().highcharts({
            chart: {
                type: 'line'
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: zbjcs[2]
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: (function () {
                    for (var xzqh in sData0) {
                        return splitArrayByDate(sData0[xzqh][zbdms[2]].ND.split(','), nf);
                    }
                })()
            },
            yAxis: {
                title: {
                    text: zbjcs[2] + '(元)'
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0);
                    }
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: (function () {
                var series = [];
                for (var xzqh in sData0) {
                    if (xzqh == sData1) {
                        series.push({
                            visible: true,
                            name: sData0[xzqh].QHMC,
                            type: 'spline',
                            data: splitArrayByDate(sData0[xzqh][zbdms[2]].DQZ.split(',').map(Number), nf)
                        });
                    } else {
                        series.push({
                            visible: false,
                            name: sData0[xzqh].QHMC,
                            type: 'spline',
                            data: splitArrayByDate(sData0[xzqh][zbdms[2]].DQZ.split(',').map(Number), nf)
                        });
                    }

                }
                return series;
            })()
        });
    }
    function init_hgjjzbpm(container, nf, xzqh) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjZbpm",
            dataType: 'jsonp',
            data: {nf: nf, xzqh: xzqh},
            jsonp: "jsonpcallback",
            success: function (data) {
                var obj = data.data;
                var tbody = '';
                if (obj != undefined) {
                    for (var i = 0; i < obj['指标数值排名'].length && i < 5; i++) {
                        if (obj['指标数值排名'][i].ZBSJDW == undefined) {
                            obj['指标数值排名'][i].ZBSJDW = '';
                        }
                        tbody += "<tr><td>" + obj['指标数值排名'][i].ZBMC + "(" + obj['指标数值排名'][i].ZBSJDW + ")</td><td class='ar'>" + formatNumber(obj['指标数值排名'][i].ZBSJ, 2, ' ') + "</td><td class='ac'>" + obj['指标数值排名'][i].PM + "</td></tr>";
                    }
                    $('#' + container + '>tbody').html(tbody);
                }

            },
            timeout: 6000
        });
    }
    function showYear() {
        var option = '';
        for (var i = year - 1; i >= 2006; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }
        $("#year").html(option);
    }

    $(function () {
        showYear();
        init_gdpdqpm('', '全部', zbdms[2]);
        $('#year').change(function () {
            init_gdpdqpm($(this).val(), xzqhpid, zbdms[2]);
            $('.returnBtn').click();
        });
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(index).addClass("active");
    });
    function  returnCharts(obj){
        $("#container").show();
        $("#container2").hide();
        $(obj).hide();
    }
</script>
<div class="tab-content nbn_a" style="font-size:12px;">

    <div class="tab-pane active" id="home">
        <div id="city" class="city">
            <table id="tab1" class="table-bordered table">
                <caption>
                    <select id="year" class="fl"></select>
                </caption>
                <thead>
                <tr>
                    <th>排名</th>
                    <th>地市</th>
                    <th>数值(元)</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div id="zbpm" class="zbpm" style="overflow: hidden">

            <table id="tab2" class="table-bordered table">
                <thead>
                <tr>
                    <th width="60%">指标</th>
                    <th width="30%">数值</th>
                    <th>排名</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="container" class="container"></div>
        <a class="returnBtn" onclick="returnCharts(this)" href="javascript:void(0)">返回</a>
        <div id="container2" class="container2"></div>
        <p class="qc"></p>
    </div>
    <!--右悬浮-->
    <div class="right-fix">
        <div class="right-fix-list">
            <div class="right-fix-ico">
                <img src="/${res}/img/righ.jpg">
            </div>
            <ul class="fix-tab">
                <li class="active">指示解释</li>
                <li>统计范围</li>
                <li>调查方法</li>
                <li>建立数据</li>
                <li>发布时间</li>
            </ul>
            <ul class="fix-intro">
                <li style="display: block;">
                    <p>    常作为发展经济学中衡量经济发展状况的指标，是重要的宏观经济指标之一，它是人们了解和把握一个国家或地区的宏观经济运行状况的有效工具。将一个国家（或地区）核算期内实现的国内（地区）生产总值与这个国家（或地区）的常住人口相比进行计算，得到人均国内生产总值。
                    </p>
                </li>
                <li>
                    <p>  一个地区所有常住单位在一定时期内生产活动的最终成果和一个地区的所有常住人口。</p>
                </li>
                <li>
                    <p>人均地区生产总值增长速度按可比价计算，为实际增长速度。</p>
                </li>
                <li>
                    <p>《国民经济核算统计报表制度》</p>
                </li>
                <li>
                    <p>季度数据于季后20天左右发布。年度数据分初步核算和最终核实两个步骤。初步核算数在次年1月底发布，最终核实数在次年5月底发布。</p>
                </li>
            </ul>
        </div>
    </div>

</div>
