<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="/${res}/js/echarts.min.js" type="text/javascript"></script>
<script>
    var zbdms = ['0010010030${param.type}', '0010010030${param.type}-1'];
    var xzqhpid = '';
    function init_dycydqpm(nf, xzqh, zbdm) {
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
                var thead = //"<tr><th><a onclick=\"init_dycydqpm('', '320000000000','" + zbdm + "');\">省内</a></th>"
                        //+ "<th><a onclick=\"init_dycydqpm('', '320300000000','" + zbdm + "');\">市内</a></th>"
                        //+ "<th><a onclick=\"init_dycydqpm('', '110000','" + zbdm + "');\">淮海经济区</a></th></tr>"+
                        "<tr><th>排名</th><th>地市</th><th>数值(" + (obj[xzqh][0].ZBSJDW == undefined ? '' : obj[xzqh][0].ZBSJDW) + ")</th></tr>";
                $("#year").val(obj[xzqh][0].SJRQ);
                if (obj != undefined) {
                    for (var i = 0; i < obj[xzqh].length; i++) {
                        tbody += "<tr><td class='ac'>" + obj[xzqh][i].PM + "</td><td class='ac'><a onclick=\"init_dycytb(" + obj[xzqh][i].SJRQ
                                + ",'" + obj[xzqh][i].ZBSSDQ + "','" + obj[xzqh][i].QHMC + "')\">"
                                + obj[xzqh][i].QHMC + "</a></td><td class='ar'>" + formatNumber(obj[xzqh][i].ZBSJ, 2, ' ') + "</td></tr>";
                    }
                    $('#tab1>thead').html(thead);
                    $('#tab1>tbody').html(tbody);

                    init_dycy("container", obj[xzqh][0].SJRQ, xzqh);
                    init_hgjjzbpm("tab2", obj[xzqh][0].SJRQ, obj[xzqh][0].ZBSSDQ);
                }
            },
            timeout: 6000
        });
    }
    function init_dycytb(nf, xzqh, qhmc) {
        hideLine(qhmc);
        init_hgjjzbpm("tab2", nf, xzqh);
    }
    function hideLine(name) {
        var chart = $('#container').highcharts();
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
    function init_dycy(container, nf, xzqh) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyXzqhs",
            dataType: 'jsonp',
            data: {
                xzqhs: xzqh,
                zbdms: zbdms.join(','),
                type: 1
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data && data.success) {
                    dycy(container, data.data, nf);
                    $('#tab1>tbody>tr>td>a:eq(0)').click();
                }
            },
            timeout: 6000
        });
    }

    function dycy(container, sData0, nf) {
        $('#' + container).highcharts({
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: '第<c:if test="${param.type==1}">一</c:if><c:if test="${param.type==2}">二</c:if><c:if test="${param.type==3}">三</c:if>产业',
                x: -20 //center
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: (function () {
                    for (var xzqh in sData0) {
                        return splitArrayByDate(sData0[xzqh][zbdms[0]].ND.split(','), nf);
                    }
                })()
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
                    text: '总产值'
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0) + ' 亿元';
                    }
                },
                opposite: true
            }],
            tooltip: {
                formatter: function () {
                    var tbody = this.x+'<br/>';
                    for (var i = 0; i < this.points.length;) {
                        if (i + 1 < this.points.length && this.points[i].series.name == this.points[i + 1].series.name) {
                            tbody += this.points[i].series.name + '：<span style="color:' + this.points[i].series.color + '">总产值</span>' + this.points[i].point.y + '  ' + this.points[i].series.tooltipOptions.valueSuffix + '，<span style="color:' + this.points[i + 1].series.color + '">同比增长</span>' + this.points[i + 1].y + ' ' + this.points[i + 1].series.tooltipOptions.valueSuffix + '<br/>';
                            i += 2;
                        } else {
                            if (this.points[i].series.tooltipOptions.valueSuffix == '%') {
                                tbody += this.points[i].series.name + '：<span style="color:' + this.points[i].series.color + '">同比增长</span>' + this.points[i].y + ' ' + this.points[i].series.tooltipOptions.valueSuffix + '<br/>';
                            } else {
                                tbody += this.points[i].series.name + '：<span style="color:' + this.points[i].series.color + '">总产值</span>' + this.points[i].point.y + '  ' + this.points[i].series.tooltipOptions.valueSuffix + '<br/>';
                            }
                            i++;
                        }
                    }
                    return tbody;
                },
                shared: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: (function () {
                var series = [];
                for (var xzqh in sData0) {
                    zbdms.forEach(function (zbdm, i) {
                        if (zbdm.slice(-2) == '-1') {
                            series.push({
                                name: sData0[xzqh].QHMC,
                                type: 'spline',
                                tooltip: {
                                    valueSuffix: sData0[xzqh][zbdm].ZBDW
                                },
                                visible: false,
                                yAxis: 0,
                                data: splitArrayByDate(sData0[xzqh][zbdm].DQZ.split(',').map(Number), nf)
                            });
                        } else {
                            series.push({
                                name: sData0[xzqh].QHMC,
                                type: 'column',
                                tooltip: {
                                    valueSuffix: sData0[xzqh][zbdm].ZBDW
                                },
                                visible: false,
                                yAxis: 1,
                                data: splitArrayByDate(sData0[xzqh][zbdm].DQZ.split(',').map(Number), nf)
                            });
                        }
                    });
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
        for (var i = year - 1; i >= 1978; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }
        $("#year").html(option);
    }

    $(function () {
        showYear();
        init_dycydqpm('', '全部', '0010010030${param.type}');
        $('#year').change(function () {
            init_dycydqpm($(this).val(), xzqhpid, '0010010030${param.type}');
        });
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(${param.type+2}).addClass("active");
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
                    <p>   <c:if test="${param.type==1}">
                        三次产业是根据社会生产活动历史发展的顺序对产业结构的划分，产品直接取自自然界的部门称为第一产业，对初级产品进行再加工的部门称为第二产业，为生产和消费提供各种服务的部门称为第三产业。它是世界上较为通用的产业结构分类，但各国的划分不尽一致。第一产业：农业（包括种植业、林业、牧业和渔业）。
                    </c:if>
                        <c:if test="${param.type==2}">
                            三次产业是根据社会生产活动历史发展的顺序对产业结构的划分，产品直接取自自然界的部门称为第一产业，对初级产品进行再加工的部门称为第二产业，为生产和消费提供各种服务的部门称为第三产业。它是世界上较为通用的产业结构分类，但各国的划分不尽一致。第二产业：工业（包括采掘业，制造业，电力、煤气及水的生产和供应业）和建筑业。
                        </c:if>
                        <c:if test="${param.type==3}">
                            三次产业是根据社会生产活动历史发展的顺序对产业结构的划分，产品直接取自自然界的部门称为第一产业，对初级产品进行再加工的部门称为第二产业，为生产和消费提供各种服务的部门称为第三产业。它是世界上较为通用的产业结构分类，但各国的划分不尽一致。第三产业：除第一、第二产业以外的其他各业。由于第三产业包括的行业多、范围广，根据我国的实际情况，第三产业可分为两大部分；一是流通部门，二是服务部门。具体又可分为四个层次：第一层次：流通部门，包括交通运输、仓储及邮电通信业，批发和零售贸易、餐饮业。第二层次：为生产和生活服务的部门，包括金融、保险业，地质勘查业、水利管理业，房地产业，社会服务业，农、林、牧、渔服务业，交通运输辅助业，综合技术服务业等。第三层次：为提高科学文化水平和居民素质服务的部门，包括教育、文化艺术及广播电影电视业，卫生、体育和社会福利业，科学研究业等。第四层次：为社会公共需要服务的部门，包括国家机关、政党机关和社会团体以及军队、警察等。
                        </c:if> </p>
                </li>
                <li>
                    <p> 一个地区所有第一、二、三产业常住单位在一定时期内生产活动的最终成果。</p>
                </li>
                <li>
                    <p>地区生产总值增长速度按可比价计算，为实际增长速度。</p>
                </li>
                <li>
                    <p>《国民经济核算统计报表制度》</p>
                </li>
                <li>
                    <p>一般于次年1月底2月初发布。</p>
                </li>
            </ul>
        </div>
    </div>
</div>
