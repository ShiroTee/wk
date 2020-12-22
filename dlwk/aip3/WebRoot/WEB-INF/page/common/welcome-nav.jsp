<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="${ctx}/resources/jquery/jquery.cookie.js"></script>
<script type="text/javascript" src="${ctx }/resources/js/myscript.js"></script>


<!-- 菜单导航 -->
<script>
    $(function () {
        // 伸缩菜单
        $(".slide_li").on("mouseover", function () {
            $(".slide_sub").hide();
            $(this).next(".slide_sub").show();
        }).on("mouseout", function () {
            $(this).next(".slide_sub").hide();
        });
        $(".slide_sub").on("mouseover", function () {
            $(this).show()
            $(this).prev(".slide_li").addClass("slide_cur");
        }).on("mouseout", function () {
            $(this).hide();
            $(this).prev(".slide_li").removeClass("slide_cur");
        });

        var ctx = "${ctx}";
        $.ajax({
            url: ctx + "/mdp/welcome/queryObjClassifyBySql.json",
            cache: false,
            dataType: "json",
            type: "post",
            data: {},
            success: function (data) {
                var html = '';
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        html += '<li class="subnav_li"><a href="' + ctx + '/mdp/welcome/Basics.html?'+item.NAME +'" class="subnav_link" tb="link_3_">' + item.NAME + '</a></li>';
                    }
                } else {
                    html += '<li class="subnav_li"><a href="' + ctx + '/mdp/welcome/Basics.html" class="subnav_link" tb="link_3_">基础数据</a></li>' +
                        '<li class="subnav_li"><a href="' + ctx + '/mdp/welcome/Testing.html" class="subnav_link" tb="link_3_">监测数据</a></li>' +
                        '<li class="subnav_li"><a <%--href="#"--%> class="subnav_link">业务数据</a></li>';
                }
                $("#Ob_sql").html(html);
                $("#nav-1 li a").each(function () {
                    $(this).removeClass();
                    $(this).addClass("nav_link");
                    if ($($(this))[0].href == String(window.location)) {
                        $(this).addClass('nav_link nav_cur');
                        if ($(this).attr("tb") == "link_3_") {
                            $("#link_3").removeClass();
                            $("#link_3").addClass("nav_link nav_cur");
                        }
                    }
                })
            }
        });

        var resourceCartLength = 0;
        if ($.cookie('resourceCart') != undefined && $.cookie('resourceCart') != "," && $.cookie('resourceCart') != "") {
            resourceCartLength = $.cookie('resourceCart').split(",").length;
        }
        $(".cart_num").html(resourceCartLength == 0 ? "" : resourceCartLength);
    });
</script>
</head>

<div class="top">
    <a href="javascript:;" class="totop"><i class="ico i107"></i></a>


    <!--------------------
    // head
    -------------------->
    <div class="head trans">
        <div class="clearfix webWidth1">

            <!---------- logo ---------->
            <div class="logo"></div>
            <!---------- logo end ---------->

            <!---------- cart ---------->
            <div class="head_right">
                <a href="${ctx}/mdp/welcome/apply.html" class="record">我的申请记录</a>
                <a href="${ctx}/mdp/welcome/resourceCart.html" class="cart">
                    <span class="cart_ico"><i class="ico i002"></i></span>
                    <span class="cart_txt">资源车</span>
                    <span class="cart_num"></span>
                </a>
            </div>
            <!---------- cart end ---------->

            <!---------- search ---------->
            <div class="head_right">
                <form class="search">
                    <div class="search_left">
                        <div class="search_ico"><i class="ico i100"></i></div>
                        <input name="" type="text" placeholder="请输入关键词" class="search_input">
                    </div>
                    <input name="" type="button" value="搜索" class="search_btn">
                </form>
                <div class="quick">
                    <a href="#" class="quick_link">全部</a>
                    <a href="#" class="quick_link">基础对象</a>
                    <a href="#" class="quick_link">监测数据</a>
                    <a href="#" class="quick_link">业务数据</a>
                    <a href="#" class="quick_link">资源目录</a>
                </div>
            </div>
            <!---------- search end ---------->

        </div>
    </div>
    <!--------------------
    // head end
    -------------------->


    <!--------------------
    // nav
    -------------------->
    <div class="nav">
        <div class="clearfix webWidth1 navIn">
            <ul id="nav-1">
                <li class="nav_li"><a id="link_1" href="${ctx }/" class="nav_link nav_cur">数据资源总览</a></li>
                <%--<li class="nav_li"><a id="link_2" href="${ctx }/mdp/welcome/resources.html" class="nav_link">资源总览</a>--%>
                </li>
                <li class="nav_li"><a id="link_3" href="${ctx }/mdp/welcome/Basics.html" class="nav_link">水务对象查询</a>
                	<div class="subnav spacer"></div>
                    <ul class="nav subnav sub_title" id="Ob_sql">
                    </ul>
                </li>
                <li class="nav_li"><a id="link_4" href="${ctx }/mdp/welcome/resource.html" class="nav_link">数据资源申请</a>
                </li>
                <li class="nav_li"><a href="${ctx }/mdp/index.html" class="nav_link" target="_Blank">系统管理</a>
                </li>
            </ul>
        </div>
    </div>
    <!--------------------
    // nav end
    -------------------->
</div>

