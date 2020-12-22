<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
    var zbdm = '10101010102',
            zbjc = '人口',
            zbdw = '万人',
            index = 2;

    function init_rk(container, xzqh, nf) {
        $('#container2').empty();
        if (nf == '') {
            nf ='init';
            showYear();
        }
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyNd",
            dataType: 'jsonp',
            data: {
                nd: nf,
                zbdms: zbdm,
                xzqh: xzqh
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data.success == true) {
                    var tbody = '';
                    var temp = [];
                    for (var xzqh in data.data) {
                        temp.push(data.data[xzqh]);
                    }

                    temp.sort(function (a, b) {
                        return -(a[zbdm].DQZ - b[zbdm].DQZ);
                    });
                    $("#year").val(temp[0]['10101010102'].ND);
                    for (var i = 0; i < 5; i++) {
                        tbody += "<tr><td class='ac' width='10%'>" + (i + 1) + "</td><td>" + temp[i].QHMC + "</td><td class='ar'>" + formatNumber(temp[i][zbdm].DQZ, 2, ' ') + "</td></tr>";
                    }
                    $('#tab2>caption>span').text('TOP5地市(' + zbdw + ')');
                    $('#tab2>tbody').html(tbody);

                    var xzqh0 = (function () {
                        for (var xzqh in data.data) {
                            return xzqh;
                        }
                    })();

                    hgjj(container, data.data, xzqh0, temp[0]['10101010102'].ND);
                    init_rk_line(xzqh0, temp[0]['10101010102'].ND);
                }
            },
            timeout: 6000
        });
    }
    function init_rk_line(xzqh, nf) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyXzqhs",
            dataType: 'jsonp',
            data: {
                zbdms: zbdm,
                xzqhs: xzqh,
                type: 0,
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data.success == true) {
                    rk_line('container2', data.data[xzqh], nf);
                }
            },
            timeout: 6000
        });
    }
    function hgjj(container, sData0, sData1, nf) {
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
                enabled: false
            },
            title: {
                text: zbjc,
                verticalAlign: 'middle',
                floating: true
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}' + zbdw + ' ({point.percentage:.1f} %)</b>'
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
                    events: {
                        click: function (e) {
                            init_rk_line(e.point.xzqh, nf);
                        }
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: zbjc,
                colorByPoint: true,
                innerSize: '50%',
                data: (function () {
                    var data = [];
                    for (var xzqh in sData0) {
                        if (xzqh == sData1) {
                            data.push({
                                xzqh: xzqh,
                                name: sData0[xzqh].QHMC,
                                y: Number(sData0[xzqh][zbdm].DQZ),
                                sliced: true,
                                selected: true
                            });
                        } else {
                            data.push({
                                xzqh: xzqh,
                                name: sData0[xzqh].QHMC,
                                y: Number(sData0[xzqh][zbdm].DQZ),
                            });
                        }
                    }
                    return data;
                })()
            }]
        });
    }
    function rk_line(container, sData0, nf) {
        var myzbdw = sData0[zbdm].ZBDW;
        $('#' + container).highcharts({
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
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: splitArrayByDate(sData0[zbdm].ND.split(','), nf)
            },
            yAxis: {
                title: {
                    text: zbjc
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(this.value, 0) + ' ' + myzbdw;
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                shared: true
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: sData0.QHMC,
                tooltip: {
                    valueSuffix: sData0[zbdm].ZBDW
                },
                data: splitArrayByDate(sData0[zbdm].DQZ.split(','), nf)
            }]
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
        init_rk('container', '全部', '');
        $('#year').change(function () {
            init_rk('container', '全部', $(this).val());
        });
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(index).addClass("active");
    });
</script>
<div class="tab-content nbn_a" style="font-size:12px;">

    <div class="tab-pane active" id="home">
        <div id="container" style="width:63%;height: 450px;float: left" ></div>

        <div id="zbpm" class="zbpm" style="float: right;width: 35%;">

            <table id="tab2" class="table-bordered table" style="float: left;width: 90%">
                <caption><span>TOP5地市(万人)</span><select id="year" class="fl"></select></caption>
                <tbody></tbody>
            </table>

        </div>
            <div id="container2"  style="width: 35%;float: left;height: 250px"></div>
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
                    <p>    常住人口指经常居住在某一地区的人口。目前在我国，常住人口是指实际经常居住在某地区半年以上的人口。以乡（镇、街道）为例，一个乡（镇、街道）的常住人口具体包括：①居住在本乡（镇、街道），并已在本乡（镇、街道）办理常住户口登记的人；②户口在本乡（镇、街道），外出不满半年的人；③已在本乡（镇、街道）居住半年以上，常住户口在本乡（镇、街道）以外的人；④在本乡（镇、街道）居住不满半年，但已离开常住户口地半年以上的人；⑤居住在本乡（镇、街道），常住户口待定的人；⑥原住本乡（镇、街道），目前在国外工作或者学习，暂无所在国永久居住权的人。
                    </p>
                </li>
                <li>
                    <p>      全部常住本地的户籍人口，除离开本地半年以上（不包括在国外工作或学习的人）的；户口在外地，但在本地居住半年以上者，或离开户口地半年以上而调查时在本地居住的人口；调查时居住在本地，但在任何地方都没有登记常住户口，如手持户口迁移证、出生证、退伍证、劳改劳教释放证等尚未办理常住户口的人，即所谓“口袋户口”的人。
                    </p>
                </li>
                <li>
                    <p>人口普查、非普查年份的全国1%人口抽样调查和全国人口变动情况抽样调查，推算总人口和其他人口指标数据。</p>
                </li>
                <li>
                    <p></p>
                </li>
                <li>
                    <p>一般于次年1月底2月初发布。</p>
                </li>
            </ul>
        </div>
    </div>

</div>
