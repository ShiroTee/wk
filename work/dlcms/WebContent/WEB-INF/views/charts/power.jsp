<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
    <c:if test="${param.type==1}">
    var title = '一产煤量分析';
    var index = 9;
    var year_start = 1978;
    var zbdms = ['00100401202001', '00100100301-1', '00100401202001-1'];
    var zbjcs = ['第一产业用煤量', '第一产业GDP同比增速', '第一产业用煤量同比增速'];
    </c:if>
    <c:if test="${param.type==2}">
    var title = '二产煤量分析';
    var index = 10;
    var year_start = 1978;
    var zbdms = ['00100401202002', '00100100302-1', '00100401202002-1'];
    var zbjcs = ['第二产业用煤量', '第二产业GDP同比增速', '第二产业用煤量同比增速'];
    </c:if>
    <c:if test="${param.type==3}">
    var title = '三产煤量分析';
    var index = 11;
    var year_start = 1978;
    var zbdms = ['00100401202003', '00100100303-1', '00100401202003-1'];
    var zbjcs = ['第三产业用煤量', '第三产业GDP同比增速', '第三产业用煤量同比增速'];
    </c:if>
    var colors = ['#7cb5ec', '#0193DE', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80'];
    var xzqhpid = '';
    function init_gdpdqpm(nf, xzqh, zbdm) {
        emptyThis('#tab1>tbody', '#container', '#tab2>tbody');
        xzqhpid = xzqh;
        if (nf == '') {
            nf = year - 2;
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
                var thead = //"<tr><th><a onclick=\"init_gdpdqpm('', '320000000000','" + zbdm + "');\">省内</a></th>"
                        //+ "<th><a onclick=\"init_gdpdqpm('', '320300000000','" + zbdm + "');\">市内</a></th>"
                        //+ "<th><a onclick=\"init_gdpdqpm('', '110000','" + zbdm + "');\">淮海经济区</a></th></tr>"+
                         "<tr><th>排名</th><th>地市</th><th>数值(" + (obj[xzqh][0].ZBSJDW == undefined ? '' : obj[xzqh][0].ZBSJDW) + ")</th></tr>";

                if (obj != undefined) {
                    for (var i = 0; i < obj[xzqh].length; i++) {
                        tbody += "<tr><td class='ac'>" + obj[xzqh][i].PM + "</td><td td class='ac'><a onclick=\"init_gdptb(" + nf + "," + obj[xzqh][i].ZBSSDQ + ")\">" + obj[xzqh][i].QHMC + "</a></td><td class='ar'>" + formatNumber(obj[xzqh][i].ZBSJ, 0, ' ') + "</td></tr>";
                    }
                    $('#tab1>thead').html(thead);
                    $('#tab1>tbody').html(tbody);

                    changeColor();
                }
            },
            timeout: 6000
        });
    }
    function init_gdptb(nf, xzqh) {
        init_gdp("container", nf, xzqh);
        init_hgjjzbpm("tab2", nf, xzqh);
    }
    function init_gdp(container, nf, xzqh) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyXzqhs",
            dataType: 'jsonp',
            data: {
                zbdms: zbdms.join(','),
                xzqhs: xzqh,
                type: 0
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data.success == true) {
                    gdp(container, data.data[xzqh], nf);
                }
            },
            timeout: 6000
        });
    }
    function gdp(container, sData0, nf) {
        var myzbdw = sData0[zbdms[0]].ZBDW;
        myzbdw = myzbdw == undefined ? '' : myzbdw;
        $('#' + container).highcharts({
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: title
            },
            xAxis: {
                categories: splitArrayByDate(sData0[zbdms[0]].ND.split(','), nf)
            },
            yAxis: [{
                title: {
                    text: '同比增速'
                },
                labels: {
                    formatter: function () {
                        return this.value + ' %';
                    }
                }
            }, {
                title: {
                    text: '总值'
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0) + ' ' + myzbdw;
                    }
                },
                opposite: true
            }],
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                shared: true
            },
            plotOptions: {
                spline: {
                    connectNulls: false
                }
            },
            series: (function () {
                var series = [];
                zbdms.forEach(function (zbdm, i) {
                    if (zbdm.slice(-2) == '-1') {
                        series.push({
                            name: zbjcs[i],
                            type: 'spline',
                            tooltip: {
                                valueSuffix: sData0[zbdm].ZBDW
                            },
                            color: colors[i],
                            yAxis: 0,
                            data: splitArrayByDate(sData0[zbdm].DQZ.split(','), nf)
                        });
                    } else {
                        series.push({
                            name: zbjcs[i],
                            type: 'column',
                            tooltip: {
                                valueSuffix: sData0[zbdm].ZBDW
                            },
                            color: colors[i],
                            yAxis: 1,
                            data: splitArrayByDate(sData0[zbdm].DQZ.split(','), nf)
                        });
                    }
                });
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
        for (var i = year - 2; i >= year_start; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }
        $("#year").html(option);
    }
    $(function () {
        showYear();
        init_gdpdqpm('', '320000000000', zbdms[0]);
        $('#year').change(function () {
            init_gdpdqpm($(this).val(), xzqhpid, zbdms[0]);
        });
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(index).addClass("active");
    });
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
                    <th>数值(亿元)</th>
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
					<p>煤力是经济发展的重要物质基础,经济发展是煤力发展的内在动力, 煤力需求的增长更是国民经济的“情雨表”，对历史用煤量进行分析，为今后合理预测用煤量的增长提供依据。</p>
				</li>
				<li>
					<p>一个地区所有第一、二、三产业常住单位在一定时期内用煤量的数据。</p>
				</li>
				<li>
					<p>供煤公司</p>
				</li>
				<li>
					<p></p>
				</li>
				<li>
					<p>月</p>
				</li>
            </ul>
        </div>
    </div>
</div>
