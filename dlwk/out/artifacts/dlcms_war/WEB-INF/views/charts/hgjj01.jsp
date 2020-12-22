<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
    <c:if test="${param.type=='power'}">
    var title = '用煤量分析';
    var index = 16;
    var year_start = 1980;
    var year_end = year - 2;
    var zbdms = ['00100401202001', '00100401202002', '00100401202003', '00100401202001-1', '00100401202002-1', '00100401202003-1'];
    var zbjcs = ['第一产业用煤量', '第二产业用煤量', '第三产业用煤量', '第一产业用煤量同比增速', '第二产业用煤量同比增速', '第三产业用煤量同比增速'];
    </c:if>
    <c:if test="${param.type=='financial'}">
    var title = '金融';
    var index = 11;
    var year_start = 1978;
    var year_end = year - 1;
    var zbdms = ['001003013', '001003014', '001003013-1', '001003014-1'];
    var zbjcs = ['存款', '贷款', '存款同比增速', '贷款同比增速'];
    </c:if>
    <c:if test="${param.type=='investment'}">
    var title = '投资';
    var index = 10;
    var year_start = 1978;
    var year_end = year - 1;
    var zbdms = ['001002005', '00100200502001', '00100200502002', '001002005-1', '00100200502001-1', '00100200502002-1'];
    var zbjcs = ['固定资产投资', '工业投资', '服务业投资', '固定资产投资同比增速', '工业投资同比增速', '服务业投资同比增速'];
    </c:if>
    <c:if test="${param.type=='income'}">
    var title = '居民收入';
    var index = 9;
    var year_start = 1978;
    var year_end = year - 1;
    var zbdms = ['00101300101', '00101300102', '00101300101-1', '00101300102-1'];
    var zbjcs = ['城镇居民收入', '农村居民收入', '城镇居民收入同比增速', '农村居民收入同比增速'];
    </c:if>
    <c:if test="${param.type=='trade'}">
    var title = '进出口贸易';
    var index = 8;
    var year_start = 1990;
    var year_end = year - 1;
    var zbdms = ['001008038', '00100803802', '001008038-1', '00100803802-1'];
    var zbjcs = ['进出口总额', '出口', '进出口总额同比增速', '出口同比增速'];
    </c:if>
    <c:if test="${param.type=='consumption'}">
    var title = '消费指数';
    var index = 7;
    var year_start = 1980;
    var year_end = year - 1;
    var zbdms = ['00100100304', '00100601501001-1'];
    var zbjcs = ['人均GDP', '城市居民的消费价格指数同比增速'];
    </c:if>
    var colors = ['#7cb5ec', '#0193DE', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80'];
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
                       // + "<th><a onclick=\"init_gdpdqpm('', '110000','" + zbdm + "');\">淮海经济区</a></th></tr>"+
                         "<tr><th>排名</th><th>地市</th><th>数值(" + (obj[xzqh][0].ZBSJDW == undefined ? '' : obj[xzqh][0].ZBSJDW) + ")</th></tr>";
                $("#year").val(obj[xzqh][0].SJRQ);
                if (obj != undefined) {
                    for (var i = 0; i < obj[xzqh].length; i++) {
                        tbody += "<tr><td class='ac'>" + obj[xzqh][i].PM + "</td><td td class='ac'><a onclick=\"init_gdptb('" + obj[xzqh][i].SJRQ + "','" + obj[xzqh][i].ZBSSDQ + "')\">" + obj[xzqh][i].QHMC + "</a></td><td class='ar'>" + formatNumber(obj[xzqh][i].ZBSJ, 2, ' ') + "</td></tr>";
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
        for (var i = year_end; i >= year_start; i--) {
            option += "<option value='" + i + "'>" + i + "</option>";
        }
        $("#year").html(option);
    }
    $(function () {
        showYear();
        init_gdpdqpm('', '全部', zbdms[0]);
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
                <c:if test="${param.type=='power'}">
                    <li style="display: block;">
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                </c:if>
                <c:if test="${param.type=='financial'}">
                    <li style="display: block;">
                        <p>指企业、机关、团体或居民根据资金必须收回的原则，把货币资金存入银行或其他信用机构保管并取得一定利息的一种信用活动形式。根据存款对象的不同可划分为企业存款、财政存款、机关团体存款、基本建设存款、城镇储蓄存款、农村存款等科目。它是银行信贷资金的主要来源。其中，储蓄存款指为居民个人积蓄货币资产和获取利息而设定的一种存款。数据来源于人民银行。</p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                </c:if>
                <c:if test="${param.type=='investment'}">
                    <li style="display: block;">
                        <p>固定资产投资是社会固定资产再生产的主要手段。通过建造和购置固定资产的活动，国民经济不断采用先进技术装备，建立新兴部门，进一步调整经济结构和生产力的地区分布，增强经济实力，为改善人民物质文化生活创造物质条件。这对我国的社会主义现代化建设具有重要意义。 固定资产投资额是以货币表现的建造和购置固定资产活动的工作量，它是反映固定资产投资规模、速度、比例关系和使用方向的综合性指标。固定资产投资按国民经济行业分类分为第一产业投资、第二产业投资和第三产业投资，第二产业投资包含工业投资和建筑业投资。第三产业投资又称服务业投资，其中包含房地产开发投资。</p>
                    </li>
                    <li>
                        <p>计划总投资500万元以上的投资。</p>
                    </li>
                    <li>
                        <p>全面调查。</p>
                    </li>
                    <li>
                        <p>《固定资产投资统计报表制度》</p>
                    </li>
                    <li>
                        <p>月后10天。</p>
                    </li>
                </c:if>
                <c:if test="${param.type=='income'}">
                    <li style="display: block;">
                        <p>城镇居民可支配收入指将家庭总收入扣除交纳的个人所得税和个人交纳的各项社会保障支出后的收入。等于工资性收入、经营净收入、财产性收入、转移性收入之和，再减去交纳的个人所得税和个人交纳的社会保障支出。目前城镇居民可支配收入中只包括城镇居民以现金形式获得的收入。</p>
                        <p>农村居民纯收入指农村住户当年从各个来源得到的总收入相应地扣除有关费用性支出后的收入总和。等于工资性收入、经营总收入、财产性收入、转移性收入之和，再减去生产经营费用和固定资产折旧、税费支出和赠送农村亲友支出。在实际调查过程中，长期外出农民工的工资收入主要是寄回、带回收入。</p>
                    </li>
                    <li>
                        <p>户口在本地区的常住非农业户；户口在本地区的常住农业户；户口在外地，居住在本地区半年以上的非农业户；户口在外地，居住在本地区半年以上的农业户。包括单身户和一些具有固定住宅的流动人口。</p>
                        <p>农村常住户。填报对象为农村常住户中的常住人口。</p>
                    </li>
                    <li>
                        <p>抽样调查</p>
                        <p>农村住户收支调查是在全国31个省（区、市），采用分层多阶段随机抽样方法抽取896个县的7.4万农村住户，通过记账方式，收集家庭现金收支、实物收支及家庭经营情况等资料。</p>
                    </li>
                    <li>
                        <p>《城镇住户调查方案》</p>
                        <p>《农村住户调查方案》</p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                </c:if>
                <c:if test="${param.type=='trade'}">
                    <li style="display: block;">
                        <p>进出口总额指实际进出我国国境的货物总金额，包括对外贸易实际进出口货物，来料加工装配进出口货物，国家间、联合国及国际组织无偿援助物资和赠送品，华侨、港澳台同胞和外籍华人捐赠品，租赁期满归承租人所有的租赁货物，进料加工进出口货物，边境地方贸易及边境地区小额贸易进出口货物(边民互市贸易除外)，中外合资企业、中外合作经营企业、外商独资经营企业进出口货物和公用物品，到、离岸价格在规定限额以上的进出口货样和广告品(无商业价值、无使用价值和免费提供出口的除外)，从保税仓库提取在中国境内销售的进口货物，以及其他进出口货物；我国规定出口货物按离岸价格统计，进口货物按到岸价格统计。该指标数据来源于省海关，以海关最终数据为准。</p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                    <li>
                        <p></p>
                    </li>
                </c:if>
                <c:if test="${param.type=='consumption'}">
                    <li style="display: block;">
                        <p>居民消费价格指数（Consumer Price Index），简称CPI，是度量居民生活消费品和服务价格水平随着时间变动的相对数，综合反映居民购买的生活消费品和服务价格水平的变动情况。</p>
                        <p>RPI（Retail Price Index）零售物价指数，是反映城乡商品零售价格变动趋势的一种经济指数。零售物价的调整变动直接影响到城乡居民的生活支出和国家的财政收入，影响居民购买力和市场供需平衡，影响消费与积累的比例。因此，计算零售价格指数，可以从一个侧面对上述经济活动进行观察和分析。</p>
                    </li>
                    <li>
                        <p>包括城乡居民生活消费的食品、烟酒及用品、衣着、家庭设备用品及维修服务、医疗保健和个人用品、交通和通信、娱乐教育文化用品及服务、居住等八大类、262个基本分类的商品与服务价格。</p>
                    </li>
                    <li>
                        <p>居民消费价格原始数据采用“定人、定点、定时”直接派人到调查网点采集。</p>
                    </li>
                    <li>
                        <p>《价格统计报表制度》</p>
                    </li>
                    <li>
                        <p>月后10天。</p>
                    </li>
                </c:if>
            </ul>
        </div>
    </div>
</div>
