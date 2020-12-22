<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>

    function init_ph() {
        var myChart = echarts.init(document.getElementById('container'));
        var option = {
            title: {
                text: '大理州各区县产业偏好'
            },
            tooltip: {},
            legend: {
                orient : 'vertical',
                x : 'right',
                data: ['大理市','宾川县','南涧彝族自治县','漾濞彝族自治县','鹤庆县','祥云县','永平县','巍山彝族回族自治县','云龙县','弥渡县']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: '农业', max: 6500},
                    { name: '采矿业', max: 16000},
                    { name: '制造业', max: 30000},
                    { name: '电力热力', max: 38000},
                    { name: '建筑业', max: 52000},
                    { name: '批发和零售', max: 25000},
                    { name: '文化及其相关产业', max: 6500},
                    { name: '租赁和商务服务业', max: 16000},
                    { name: '交通运输业住宿餐饮业', max: 30000},
                    { name: '信息传输和软件', max: 38000},
                    { name: '金融业', max: 52000},
                    { name: '房地产业', max: 25000},
                    { name: '租赁和商务服务', max: 6500},
                    { name: '科学研究和技术', max: 16000},
                    { name: '水利和环境', max: 30000},
                    { name: '居民服务', max: 38000},
                    { name: '教育', max: 52000},
                    { name: '卫生和社会工作', max: 25000},
                    { name: '文化和体育', max: 6500},
                    { name: '公共管理', max: 16000}
                ]
            },
            series: [{
                name: '各区县产业偏好',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [6400, 12000, 29000, 30000, 40000, 10000, 3000, 8000, 15000, 10000,10000, 2000, 3000, 8000, 10000, 22222, 23456, 12345,1200, 11111],
                        name : '大理市'
                    },
                    {
                        value : [5400, 13000, 19000, 20000, 30000, 11000, 4000, 7000, 15000, 10000,10000, 2000, 3000, 8000, 10000, 22222, 23456, 12345,1200, 11111],
                        name : '宾川县'
                    }
                    ,
                    {
                        value : [3400, 12000, 27000, 30000, 40000, 10000, 3000, 8000, 15000, 10000,10000, 2000, 3000, 8000, 10000, 22222, 23456, 12345,1200, 11111],
                        name : '南涧彝族自治县'
                    },
                    {
                        value : [1, 1, 1, 1, 1000, 1, 1, 1, 1, 1,1000, 1, 1, 1, 1, 1000, 1, 1,1, 1],
                        name : '漾濞彝族自治县'
                    },
                    {
                        value : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 30000, 50000, 20000,1, 1],
                        name : '鹤庆县'
                    },
                    {
                        value : [6400, 12000, 29000, 30000, 40000, 10000, 3000, 8000, 15000, 10000,10000, 2000, 3000, 8000, 10000, 22222, 23456, 12345,1200, 11111],
                        name : '祥云县'
                    },
                    {
                        value : [5400, 13000, 19000, 20000, 30000, 11000, 4000, 7000, 15000, 10000,10000, 2000, 3000, 8000, 10000, 22222, 23456, 12345,1200, 11111],
                        name : '永平县'
                    }
                    ,
                    {
                        value : [3400, 12000, 27000, 30000, 40000, 10000, 3000, 8000, 15000, 10000,10000, 2000, 3000, 8000, 10000, 22222, 23456, 12345,1200, 11111],
                        name : '巍山彝族回族自治县'
                    },
                    {
                        value : [1, 1, 1, 1, 1000, 1, 1, 1, 1, 1,1000, 1, 1, 1, 1, 1000, 1, 1,1, 1],
                        name : '云龙县'
                    },
                    {
                        value : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 30000, 50000, 20000,1, 1],
                        name : '弥渡县'
                    }
                ]
            }]
        };
        myChart.setOption(option);
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
        init_ph();
//        $('#year').change(function () {
//            init_rk('container', '320000000000', $(this).val());
//        });
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(1).addClass("active");
    });
</script>
<div class="tab-content nbn_a" >

    <div class="tab-pane active" id="home">
        <div class="w"><select id="year" class="ml10 mt10"></select>  </div>
        <div id="container" style="width:63%;height: 450px;float: left" ></div>

        <div id="zbpm" class="zbpm" style="float: right;width: 33%;">
            <p class="MsoNormal" align="center" style="margin-top:7.8500pt;margin-right:0.0000pt;margin-bottom:7.8500pt;margin-left:0.0000pt;mso-para-margin-top:0.5000gd;mso-para-margin-right:0.0000gd;mso-para-margin-bottom:0.5000gd;mso-para-margin-left:0.0000gd;text-indent:21.0000pt;mso-char-indent-count:2.0000;text-autospace:ideograph-numeric;mso-pagination:none;text-align:center;line-height:150%;"><b><span style="font-family: 微软雅黑; line-height: 150%; font-size: 10.5pt;">区域产业规划方向</span></b><b><span style="font-family: 微软雅黑; line-height: 150%; font-size: 10.5pt;"><o:p></o:p></span></b></p>
            <p class="MsoNormal" style="margin: 7.85pt 0pt; text-indent: 21pt; line-height: 150%;"><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">积极发展食品工业、先进制造业、高新技术产业、汽车产业、服装产业、新能源等先导产业发展，提升交通枢纽、商务、物流、金融等服务功能、提升综合竞争力，带动整个大理州经济区的崛起。</span><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p>
            <p class="MsoNormal" style="margin: 7.85pt 0pt; text-indent: 21pt; line-height: 150%;"><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">积极融入大理都市区，加大文化旅游业发展，大力发展高成长产业。</span><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p>
            <p class="MsoNormal" style="margin: 7.85pt 0pt; text-indent: 21pt; line-height: 150%;"><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">大力发展装备制造业，高新技术产业，资源勘探业。</span><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p>
            <p class="MsoNormal" style="margin: 7.85pt 0pt; text-indent: 21pt; line-height: 150%;"><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">大力发展商贸物流业，冷链制冷业，机电装备制造业，优化煤化工、铝加工产业。</span><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p>
            <p class="MsoNormal" style="margin: 7.85pt 0pt; text-indent: 21pt; line-height: 150%;"><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;">大力发展文化产业，高新技术产业。</span><span style="mso-spacerun:'yes';font-family:微软雅黑;line-height:150%;font-size:10.5000pt;mso-font-kerning:1.0000pt;"><o:p></o:p></span></p>
        </div>
        <div id="container2"  style="width: 33%;float: left;height: 250px"></div>
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
                    <p>测试数据
                    </p>
                </li>
                <li>
                    <p>
                    </p>
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
                <%--<li style="display: block;">
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
                </li>--%>
            </ul>
        </div>
    </div>

</div>
