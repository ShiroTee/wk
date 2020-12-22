<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
    var zbdms=['00100100301','00100100302','00100100303','00100100301-1','00100100302-1','00100100303-1','001001003-1'];
    var zbjcs=['第一产业','第二产业', '第三产业','第一产业同比增速','第二产业同比增速', '第三产业同比增速','GDP总值同比增速'];
    var colors = ['#7cb5ec','#0193DE','#90ed7d','#f7a35c','#8085e9', '#f15c80', '#e4d354'];
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
                        //+ "<th><a onclick=\"init_gdpdqpm('', '320300000000','" + zbdm + "');\">市内</a></th>"
                        //+ "<th><a onclick=\"init_gdpdqpm('', '110000','" + zbdm + "');\">淮海经济区</a></th></tr>+"
                         "<tr><th>排名</th><th>地市</th><th>数值(" + (obj[xzqh][0].ZBSJDW == undefined ? '' : obj[xzqh][0].ZBSJDW) + ")</th></tr>";

                $("#year").val(obj[xzqh][0].SJRQ);
                if (obj != undefined) {
                    for (var i = 0; i < obj[xzqh].length; i++) {
                        tbody += "<tr><td class='ac'>" + obj[xzqh][i].PM + "</td><td td class='ac'><a onclick=\"init_gdptb(" + obj[xzqh][i].SJRQ + ",'" + obj[xzqh][i].ZBSSDQ + "')\">" + obj[xzqh][i].QHMC + "</a></td><td class='ar'>" + formatNumber(obj[xzqh][i].ZBSJ, 2, ' ') + "</td></tr>";
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
                zbdms: '001001003,001001003-1',
                xzqhs: xzqh,
                type: 0
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if(data.success==true){
                        gdp(container, data.data[xzqh], nf, ['001001003', '001001003-1'], ['GDP总值', 'GDP总值同比增速']);
                    //gdp(container, data.data[xzqh], nf);
                }
            },
            timeout: 6000
        });
    }
    function gdp(container, sData0, nf, zbdms2, zbjcs2) {
        if (zbdms2 == undefined) {
            zbdms2 = zbdms;
        }
        if (zbjcs2 == undefined) {
            zbjcs2 = zbjcs;
        }
        updateYear(sData0[zbdms2[0]].ND.split(','));
        $('#' + container).highcharts({
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: '地区生产总值结构分析'
            },
            xAxis: {
                categories: splitArrayByDate(sData0[zbdms2[0]].ND.split(','), nf)
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
                        return this.value + ' 亿元';
                    }
                },
                opposite: true
            }],
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: (function () {
                var series = [];
                zbdms2.forEach(function (zbdm, i) {
                    if (zbdm.slice(-2) == '-1') {
                        series.push({
                            name: zbjcs2[i],
                            type: 'spline',
                            tooltip: {
                                valueSuffix: sData0[zbdm].ZBDW
                            },
                            color: colors[i],
                            yAxis: 0,
                            data: splitArrayByDate(sData0[zbdm].DQZ.split(',').map(Number), nf)
                        });
                    } else {
                        series.push({
                            name: zbjcs2[i],
                            type: 'column',
                            tooltip: {
                                valueSuffix: sData0[zbdm].ZBDW
                            },
                            color: colors[i],
                            yAxis: 1,
                            data: splitArrayByDate(sData0[zbdm].DQZ.split(',').map(Number), nf)
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
        for (var i = year - 1; i >= 1978; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }
        $("#year").html(option);
    }
    function updateYear(years) {
        $('#year>option:gt(' + (year - years[0] - 1) + ')').remove();
    }
    $(function () {
        showYear();
        init_gdpdqpm('', '320000000000', '001001003');
        $('#year').change(function () {
            init_gdpdqpm($(this).val(), xzqhpid, '001001003');
        });

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
                    <p>    地区生产总值（GDP）指一个地区所有常住单位在一定时期内生产活动的最终成果。国内生产总值有三种表现形态，即价值形态、收入形态和产品形态。从价值形态看，它是所有常住单位在一定时期内生产的全部货物和服务价值超过同期中间投入的全部非固定资产货物和服务价值的差额，即所有常住单位的增加值之和；从收入形态看，它是所有常住单位在一定时期内创造并分配给常住单位和非常住单位的初次收入分配之和；从产品形态看，它是所有常住单位在一定时期内最终使用的货物和服务价值与货物和服务净出口价值之和。在实际核算中，国内生产总值有三种计算方法，即生产法、收入法和支出法。三种方法分别从不同的方面反映国内生产总值及其构成。 三次产业是根据社会生产活动历史发展的顺序对产业结构的划分，产品直接取自自然界的部门称为第一产业，对初级产品进行再加工的部门称为第二产业，为生产和消费提供各种服务的部门称为第三产业。它是世界上较为通用的产业结构分类，但各国的划分不尽一致。
                    </p>
                </li>
                <li>
                    <p>一个地区所有常住单位在一定时期内生产活动的最终成果。</p>
                </li>
                <li>
                    <p>地区生产总值增长速度按可比价计算，为实际增长速度。</p>
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
