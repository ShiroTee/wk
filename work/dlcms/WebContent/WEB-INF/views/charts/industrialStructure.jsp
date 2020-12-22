<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="/${res}/js/echarts.min.js" type="text/javascript"></script>
<script>
    var zbdms = ['00100100301', '00100100302', '00100100303'];
    var zbjcs = ['第一产业', '第二产业', '第三产业'];
    function init_cyjg(container, xzqhs) {
        $.ajax({
            url: getGrURL() + "statisticChartSJTJHandler/getHgjjbyXzqhs",
            dataType: 'jsonp',
            data: {
                zbdms: zbdms.join(','),
                xzqhs: xzqhs,
                type: 0
            },
            jsonp: "jsonpcallback",
            success: function (data) {
                if (data.success == true) {
                    for (var i = 0; i < xzqhs.split(',').length; i++) {
                        cyjg('container' + i, data.data[xzqhs.split(',')[i]]);
                    }
                }
            },
            error: function (response) {
            },
            timeout: 6000
        });
    }
    function cyjg(container, sData0) {
        var nds = sData0[zbdms[0]]['ND'].split(',').map(Number);
        var ndlen = nds.length;

        var cyz1 = sData0[zbdms[0]].DQZ.split(',').map(Number);
        var cyz2 = sData0[zbdms[1]].DQZ.split(',').map(Number);
        var cyz3 = sData0[zbdms[2]].DQZ.split(',').map(Number);
        var cy1 = new Array(ndlen);
        var cy2 = new Array(ndlen);
        var cy3 = new Array(ndlen);

        for (var i = 0; i < ndlen; i++) {

            if((cyz1[i] + cyz2[i] + cyz3[i])==0){
                cy1[i] = 0;
                cy2[i] = 0;
                cy3[i] = 0;
            }else{
                cy1[i] = Number((cyz1[i] / (cyz1[i] + cyz2[i] + cyz3[i]) * 100).toFixed(2));
                cy2[i] = Number((cyz2[i] / (cyz1[i] + cyz2[i] + cyz3[i]) * 100).toFixed(2));
                cy3[i] = Number((cyz3[i] / (cyz1[i] + cyz2[i] + cyz3[i]) * 100).toFixed(2));
            }
        }
//        var MAX = Math.max(...cy1, ...cy2, ...cy3);
        var MAX = Math.max.apply(Math, cy1.concat(cy2, cy3));
        var myChart = echarts.init(document.getElementById(container));
        var option = {
            title: {
                text: sData0.QHMC,
                x: 'left',
                y: 'top'
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,250,0.2)'
            },
            legend: {
                data: nds
            },
            visualMap: {
                color: ['red', 'yellow'],
                left: 'right',
                text: ['年份↓']
            },
            radar: {
                indicator: [
                    {text: zbjcs[0], max: MAX},
                    {text: zbjcs[1], max: MAX},
                    {text: zbjcs[2], max: MAX}
                ]
            },
            series: (function () {
                var series = [];
                for (var i = 0; i < ndlen; i++) {
                    series.push({
                        name: '产业结构变化',
                        type: 'radar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1
                                }
                            }
                        },
                        data: [
                            {
                                value: [
                                    cy1[i],
                                    cy2[i],
                                    cy3[i],
                                    i * i /2
                                ],
                                name: nds[i]
                            }
                        ]
                    });
                }
                return series;
            })()
        };
        myChart.setOption(option);
    }

    $(function () {
        init_cyjg('container', '大理州,临沧市,楚雄州,文山州');
        $("#myTab li").removeClass("active");
        $("#myTab li").eq(6).addClass("active");
        $(".chooseCity").click(function(){
            $(".citys").show();
        })
        $(".chooseList>li").each(function(e){
            $(".chooseList>li").eq(e).click(function(){
                var className= $(this).attr("class");
                $(".chooseList li>ul").hide();
                $(".chooseList>li>div").removeClass("on");
                $(this).find("div").eq(0).addClass("on");
                changeList($(this));
                $("."+className+"Citys").show();
            });
        });
        $(".chooseList ul li").each(function(e){
            $(".chooseList ul li").eq(e).click(function(){
                var div='<div data-id="'+$(this).attr("data-id")+'">'+ $(this).text()+'<span class="remove">x</span></div>';
                if( $("#cityList div").length>3){
                    $(".chooseError").html("最多选择四个城市");
                }
                else{
                    $(".chooseError").empty();
                    $("#cityList").append(div);
                    $(this).hide();
                    var id=$(this).attr("data-id");
                    $(".chooseList li").each(function(e){
                        if($(this).attr("data-id")==id){
                            $(this).hide();
                        }
                    });
                }
                $("#cityList").find("div").each(function(i){
                    $("#cityList div").eq(i).click(function(){
                        var id=$(this);
                        $(".chooseList li").each(function(e){
                            if( $(".chooseList li").eq(e).attr("data-id")==id.attr("data-id")){
                                $(".chooseList li").eq(e).show();
                                id.remove();
                                $(".chooseError").empty();
                            }
                        })
                    })
                })
            });
        });
        $(".ensure").click(function(){
            var id='';

            $("#cityList div").each(function(i){
                if(i==0) {
                    id+=$(this).attr("data-id");
                }
                else {
                    id+=','+$(this).attr("data-id");
                }
            });
            $(" .industrial div[id^=container]").empty();
            init_cyjg('container', id);
            hideList();

        });
        var $menu = $(".choose ");
        $(document).click(function (e) {
            if (!(e.target == $menu[0] || $.contains($menu[0], e.target))) {
                hideList();
            }
        });

    });
    function hideList(){
        $(".citys").hide();
        $(".chooseList>li>div").removeClass("on");
        $(".chooseList>li>ul").hide();
    }
    function changeList(obj){
        var className=obj.attr("class");
        var left=obj.position().left;
        var wc='';
        if(left+300>400){
            wc=left-100;
            $("."+className+"Citys").css("right",wc+"px");
        }
        $("."+className+"Citys").show();

    }
</script>
<div class="tab-content nbn_a">

    <div class="tab-pane active industrial" id="home">
       <div class="choose">
        <div class="ensure">确定</div>
        <div class="chooseCity">
            <p id="cityList">  </p>
            <span class="caret"></span>
        </div>
        <div class="citys">
            <div>
                <h6>请选择<span class="chooseError"></span></h6>
                <div>
                    <ul class="chooseList">
                        <li class="js">
                            <div >统计地区</div>
                            <ul class="jsCitys">
                                <li data-id="大理州"><div >大理州</div></li>
                                <li data-id="昆明市"><div >昆明市</div></li>
                                <li data-id="丽江市"><div >丽江市</div></li>
                                <li data-id="德宏州"><div >德宏州</div></li>
                                <li data-id="玉溪市"><div >玉溪市</div></li>
                                <li data-id="普洱市"><div >普洱市</div></li>
                                <li data-id="曲靖市"><div >曲靖市</div></li>
                                <li data-id="保山市"><div >保山市</div></li>
                                <li data-id="怒江州"><div >怒江州</div></li>
                                <li data-id="昭通市"><div >昭通市</div></li>
                                <li data-id="楚雄州"><div >楚雄州</div></li>
                                <li data-id="文山州"><div >文山州</div></li>
                                <li data-id="迪庆州"><div >迪庆州</div></li>
                                <li data-id="红河州"><div >红河州</div></li>
                                <li data-id="临沧市"><div >临沧市</div></li>
                                <li data-id="西双版纳州"><div >西双版纳</div></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
           <div class="qc"></div>
           </div>
        <div id="container0" class="containerList"></div>
        <div id="container1" class="containerList"></div>
        <div id="container2" class="containerList"></div>
        <div id="container3" class="containerList"></div>
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
                    <p>      产业结构，亦称国民经济的部门结构。国民经济各产业部门之间以及各产业部门内部的构成。社会生产的产业结构或部门结构是在一般分工和特殊分工的基础上产生和发展起来的。研究产业结构，主要是研究生产资料和生活资料两大部类之间的关系；从部门来看，主要是研究农业、轻工业、重工业、建筑业、商业服务业等部门之间的关系，以及各产业部门的内部关系。
                    </p>
                </li>
                <li>
                    <p>一个地区所有第一、二、三产业常住单位在一定时期内生产活动的最终成果占比。</p>
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
            </ul>
        </div>
    </div>

    <p class="qc"></p>
</div>
