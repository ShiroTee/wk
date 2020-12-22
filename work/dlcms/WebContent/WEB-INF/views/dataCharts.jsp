<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    String basePath = request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>数据分析</title>

    <link href="/${res}/css/bass.css" rel="stylesheet">
    <link href="/${res}/css/index4.css" rel="stylesheet">
    <link href="/${res}/css/mode.css" rel="stylesheet">
    <link href="/${res}/css/bootstrap.min.css" rel="stylesheet">

    <link href="${resSys}/Css/style2.css" rel="stylesheet" type="text/css" />
    <!--<script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>-->
    <script src="<%=basePath%>thirdparty/jquery-1.11.3.min.js" type="text/javascript"></script>
    <script src="${resSys}/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
    <script src="/${res}/js/echarts.min.js" type="text/javascript"></script>
    <script src="/${res}/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>thirdparty/highcharts/highcharts.js" type="text/javascript"></script>
    <script src="/${res}/js/indexHighCharts.js" type="text/javascript"></script>
    <script src="/${res}/js/initHighChartsData.js" type="text/javascript"></script>
    <script src="<%=basePath%>resourceList/Js/utils.js" type="text/javascript"></script>
    <script src="<%=basePath%>resourceList/Js/iefix.js" type="text/javascript"></script>

    <style>
        .pcase_p {
            margin-top: 0px;
            min-height: 500px;
        }
        .cb {
            clear: both;
        }

        .m-l-lg {
            margin-left: 30px;
        }

        li {
            list-style: none;
        }

        .pomb_poui {
            margin-top: 0px;
        }

        .butom_po_a button {
            padding: 6px 30px;
            float: left;
            background: none;
            color: #000;
            border-radius: 0px;
            margin-right: -1px;
            border: 1px solid #cfcfcf;
            border-top: 2px solid #0193de;
            border-bottom: none;
            font-size: 13px;font-weight: bold;
        }

        .butom_po_a button.active {
            color: #0193de;
            background: #f7f7f7;
            box-shadow: none;
            border-bottom: 1px solid #fff;
        }


        /*定义背景色*/

        .bg-w {
            background: #fff;
            height: auto;
            overflow: hidden;
            margin: 0px auto;
            width: 100%;
            position: relative;
            display: none;
        }


        /*tab左浮动*/

        .bg-w .case_zh_a {
            height: auto;
            overflow: hidden;
            float: left;
        }


        /*去除上边距*/

        .bg-w .nmb_neoi {
            margin-top: 0px;
        }


        /*定义左间距*/

        .bg-w .case_poui_a {
            margin: 0px;
            margin-left: 20px;
            margin-top: 35px;
        }

        /*定义名称颜色*/

        .case_poui_a p {
            color: #747474;
        }

        /*左悬浮图标定位*/

        .left-fix-ico {
            position: absolute;
            right: 0px;
            top: 50%;
            margin-top: -42px;
            z-index: 2222;
            cursor: pointer;
        }

        .right-fix-ico {
            position: absolute;
            left: 0px;
            top: 50%;
            margin-top: -42px;
            z-index: 22222;
        }


        /*悬浮列表*/

        .left-fix-list {
            width: 15px;
            height: 100%;
            overflow: hidden;
            background: #fff;
            position: absolute;
            left: 0px;
            top: 0px;
            padding-left: 10px;
            padding-top: 10px;
            box-sizing: border-box;
            transition: .3s;
            background: none;
            z-index: 9999;
        }

        .right-fix-list {
            width: 15px;
            height: 100%;
            overflow: hidden;
            background: #fff;
            position: absolute;
            right: 0px;
            top: 0px;
            box-sizing: border-box;
            transition: .3s;
            background: none;
            z-index: 9999;
        }

        .right-fix-list ul {
            display: none;
        }

        .left-fix-list li {
            display: none;
        }

        .left-fix-list.fadein {
            width: 200px;
            left: 0px;
            background: #fff;
        }

        .left-fix-list.fadein li {
            display: block;
        }

        .right-fix-list.fadein {
            width: 420px;
            right: 0px;
            background: #fff;
        }

        .right-fix-list.fadein ul {
            display: block;
        }

        .left-fix-list span {
            display: block;
            background: url(../img/leftico.jpg) left center no-repeat;
            padding-left: 20px;
            color: #1a8aca;
        }

        .left-fix-list a {
            color: #0193de;
            display: block;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
        }

        .right-fix-list li {
            display: none;
        }

        .right-fix-list p {
            padding: 15px;
            font-size: 12px;
            color: #797979;
        }

        .fix-tab {
            display: block;
            height: 42px;
            width: 100%;
            overflow: hidden;
            background: #f7f7f7;
        }

        .fix-tab li {
            display: block;
            float: left;
            height: 42px;
            width: 84px;
            line-height: 42px;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            color: #797979;
        }

        .fix-tab li.active {
            background: #fff;
        }
        /*切换按钮**/

        .btns {
            height: 90px;
            width: 1200px;
            position: absolute;
            left: 50%;
            margin-left: -600px;
            top: 50%;
            margin-top: -85px;
            display: none;
        }
        .btns img{
            cursor: pointer;
        }
        .Data_application {
            width: 95%;
            overflow: hidden;
            margin: 0 auto;
            padding-top: 20px;
            min-width: 1026px;
            min-height: 550px;
        }
        .Data_application .box2 {
            width: 272px;
            margin-left: 5%;
            margin-bottom: 20px;;
            float: left;
            margin-bottom: 20px;
        }
        .Data_application .box2 p.one {
            background: url(${resSys}/Images/shuju_img1.jpg) no-repeat;
            width: 272px;
            height: 197px;
        }
        .Data_application .box2 p.one img {
            width: 255px;
            height: 177px;
            padding: 1px 0 0 1px;
            cursor: pointer;
        }
        .Data_application .box2 p.two {
            font-weight: bold;
            text-align: center;
            line-height: 28px;
            font-size: 12px;
        }
        .pomb_poui ul:first-child{
            font-size: 12px;;
            background: #e7e7e7;
            padding-top: 6px;
            margin-bottom: 0px;
        }

    </style>
</head>

<body style="background:url(../../../../r/cms/Images/body_bg.jpg) repeat-x top center !important;">

<!--header_begin-->
<%@ include file="include/head2.jsp"%>

<script type="text/javascript">
    function getGrURL() {
        return "${platformAdd}/service/api/csdsc/";
    }

    $(function(){
        $(".box input:button").each(function(index,obj){
            $(this).click(function(){
                var objid=obj.id;
                var requestUrl = urls[objid];
                $("#div_xzqh").val(objid);
                $("#div_nd").val(objid);
                refuChar(requestUrl,objid);
            });
        });
        $(".mnb_a li:nth-child(7)").addClass("pw");
        $(".close").click(function(){
            $(this).parent().parent().hide();
            $("#fade").hide();
        });
        $("#tab").tabso({cntSelect:"#tab_con",tabEvent:"click",tabStyle:"fade",onStyle:"current"});
    });

</script>
<div class="bo_wid pcase_p" style="width: 1000px">
    <div style="height: 41px;line-height: 41px;font-size: 12px;background-color: #FFFFFF">
    您现在正在浏览： <a href="/">首页</a><span>&gt;统计分析</span>
   </div>
    <div class="butom_po_a cen pull-left">
        <div class="btn-grou">
            <a href="../../sjfx/0/GDP.jhtml"><button class="btn">数据分析</button></a>
            <a href="../../tjfx/0/index.jhtml"><button class="btn">统计分析</button></a>
        </div>
    </div>
    <div class="nmb_neoi bg-w" style="display: block;position: relative;z-index:99">
        <div class="pomb_poui">
            <jsp:include page="charts/${type}.jsp" />

        </div>

        <div class="cb"></div>


    </div>
    <!--切换按钮-->
    <div class="btns">
        <div class="btnleft fl"><a><img src="/${res}/img/lefts.jpg"></a></div>
        <div class="btnright fr"><a><img src="/${res}/img/rights.jpg"></a> </div>
    </div>
    <div class="nmb_neoi bg-w">

        <div class="cb"></div>


    </div>

</div>
<div class="clear"></div>
<!--内容结束-->

<%@ include file="include/bottom2.jsp"%>


<script>

    $(function() {
        $(".left-fix-ico").click(function() {
            $(this).parent(".left-fix-list").toggleClass("fadein");
            if($(this).find("img").attr("src")=="/r/cms/www/red/img/left.jpg"){
                $(this).find("img").attr("src","/r/cms/www/red/img/righ.jpg");
            }
          else{
                $(this).find("img").attr("src","/r/cms/www/red/img/left.jpg");
            }
        })
        $(".right-fix-ico").click(function() {
            $(this).parent(".right-fix-list").toggleClass("fadein");
            if($(this).find("img").attr("src")=="/r/cms/www/red/img/left.jpg"){
                $(this).find("img").attr("src","/r/cms/www/red/img/righ.jpg");
            }
            else{
                $(this).find("img").attr("src","/r/cms/www/red/img/left.jpg");
            }
        })
        $(".btn-grou button").click(function() {
            var index = $(this).index();
            $(".btn-grou button").removeClass("active");
            $(this).addClass("active");
            $(".bg-w").css("display", "none");
            $(".bg-w").eq(index).css("display", "block");
        })
        $(".fix-tab li").click(function() {
            var index = $(this).index();
            $(".fix-tab li").removeClass("active");
            $(this).addClass("active");
            $(".fix-intro li").css("display", "none");
            $(".fix-intro li").eq(index).css("display", "block");
        })
        $(".btns .btnleft").click(function(){
            var len=8
            var index=$(".nav-tabs .active").index();
            if(index<=0){
                index=len;
                $(".nav-tabs li,.tab-pane").removeClass("active");
                $(".nav-tabs li").eq(index).addClass("active");
                $(".tab-pane").eq(index).addClass("active");
            }else{
                index--
                $(".nav-tabs li,.tab-pane").removeClass("active");
                $(".nav-tabs li").eq(index).addClass("active");
                $(".tab-pane").eq(index).addClass("active");
            }

        })
        $(".btns .btnright").click(function(){
            var len=8;
            var index=$(".nav-tabs .active").index();;
            if(index>=len){
                index=0;
                $(".nav-tabs li,.tab-pane").removeClass("active");
                $(".nav-tabs li").eq(index).addClass("active");
                $(".tab-pane").eq(index).addClass("active");
            }else{
                index++
                $(".nav-tabs li,.tab-pane").removeClass("active");
                $(".nav-tabs li").eq(index).addClass("active");
                $(".tab-pane").eq(index).addClass("active");
            }
        })
    })
</script>

</body>
</html>