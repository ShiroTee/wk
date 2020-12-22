<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    String basePath = request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>数据成果</title>
    <meta http-equiv="X-UA-Compatible" content="IE=9"/>
    <link href="<%=basePath%>r/cms/Css/base.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/footer.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
	<link href="<%=basePath%>r/cms/Css/tooltips.css" rel="stylesheet" type="text/css" />
    <script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
    <script src="<%=basePath%>r/cms/Js/simplefoucs.js" type="text/javascript"></script>

    <script src="<%=basePath%>resourceList/Js/utils.js" type="text/javascript"></script>
    <script src="<%=basePath%>resourceList/Js/dataOutcome.js" type="text/javascript"></script>
    <script src="<%=basePath%>r/cms/www/red/js/statisticChar.js" type="text/javascript"></script>
    <script src="<%=basePath%>r/cms/www/red/js/echarts-all.js" type="text/javascript"></script>

    <script type="text/javascript" src="<%=basePath%>r/cms/pager/js/kkpagerJss.js"></script>
    <link href="<%=basePath%>r/cms/pager/css/kkpagerJss.css" rel="stylesheet" type="text/css"/>
    <script src="<%=basePath%>thirdparty/My97DatePicker/WdatePicker.js" type="text/javascript"></script>

    <script type="text/javascript">
        var userId = "${userId}";
        function getGrURL() {
            return "${platformAdd}/service/api/csdsc/";
        }
    </script>
</head>
<body>

<%@ include file="include/head.jsp"%>

<script type="text/javascript">
	$("#sjcg").addClass("current2");
    function pmyjshow(){
        var type = $("#lx_type").val();
        if(type=="1"){
            $("#submitTimes").show();
            $("#applicationTimes").hide();
        }else {
            $("#submitTimes").hide();
            $("#applicationTimes").show();
        }
    }
</script>
<style type="text/css">
	.dataOuterDetailTable td {
		border-right:1px solid #888;
		border-bottom:1px solid #888;
		padding: 0 5px;
	}

	.sjcg_cx_box{border:1px solid grey;background: #fff;width:700px;height: 50px;margin-top: 10px;border: 2px solid #a2bae1;border-radius: 15px;box-shadow: 3px 3px 6px #ccc;text-align:center; padding-top:30px;padding-left:20px;}
	.sjcg_cx_fl{width:170px; float:left;}
	.sjcg_cx_time{width:450px; float:left;}
	.sjcg_cx_fl input,.sjcg_cx_time input{box-shadow: inset 0 3px 3px rgba(0,0,0,.1);}
    .sjcx_button{width: 60px;height: 26px;background: #f6b530;border: none;-moz-border-radius: 10px;-webkit-border-radius: 10px;font-size: 14px;color:#fff;font-family: "微软雅黑";text-shadow: 1px 1px 1px #333;border: 1px solid #d2a000;box-shadow: 0 1px 2px #fedd71 inset,0 -1px 0 #a38b39 inset,0 -2px 3px #fedd71 inset;float:left;cursor: pointer;}
    .right{width:736px; float:right; padding-left:18px;}
   .right table{width:736px; border-bottom:0px; text-align:center;background:#c1c1c1; margin-left:22px;border-color:grey;font-size: 12px;}
   .right table tr{height:38px; line-height:17px;}
   .right table th{
        background:url(<%=basePath%>r/cms/Images/th_bg.jpg) repeat-x;
        font-weight: bold;
        display: table-cell;
        vertical-align: inherit;}
   .right table td{
        background:#fff;
        display: table-cell;
        vertical-align: inherit;
    }
    .right table tr:hover td{background:#f8fbfe;}
</style>

<div class="warp_content">
<div class="warp_tit">
	您现在正在浏览： <a href="${base}/">首页</a><span>>数据成果</span>
</div>
<div class="warp_left" style="height:550px">
	<h2>数据成果</h2>
		<ul style="padding-bottom: 0px">					
			<li>						
				<a class="current" href='#'> 数据成果 </a>					
			</li>
		</ul>
		<div class='little_nav'>
			<a onclick="initDataOrder()">数据排名</a>
		</div>
		<div class='little_nav'>
			<a onclick="monthlyReport()">数据月报</a>
		</div>
		<div class='little_nav'>
			<a onclick="annualReport()">数据年报</a>
		</div>
		<div class='little_nav'>
			<a onclick="initOlapWdkData()">五大库数据量统计</a>
		</div>
	</div>
    <div class="warp_right">
		<div class="tit">
        	<h3><label id="bt">查询结果</label></h3>
        </div>

		<!--数据排名开始-->
        <div  id="order" class="right" style="height: 700px;" >
    	<div class="sjcg_cx_box">	
					<div class="sjcg_cx_fl">
						<div class="fl">类型：</div>
						<div class="fl">
							<select id="lx_type" onchange="pmyjshow()">
								<option value="1" selected="selected">数据交换统计</option>
								<option value="0">应用使用统计</option>
							</select>
						</div>
					</div>  
					<div class="sjcg_cx_time">
						<div class="fl">查询开始日期：</div>
						<div class="fl">
							<input type="text" id="start_date" name="startDate" class="Wdate" style="width:120px" onclick="WdatePicker({dateFmt:&#39;yyyy-MM-dd&#39;})">
						</div>
						<div class="fl" style="margin-left:10px;">查询结束日期：</div>
						<div class="fl">
							<input type="text" id="end_date" name="endDate" class="Wdate" style="width:120px" onclick="WdatePicker({dateFmt:&#39;yyyy-MM-dd&#39;})">
						</div>
					</div> 			
				<button onclick="initDataOrder()" type="submit" value="查询" class="sjcx_button">查询</button>	
    		</div>
            <div id="timesCatche"></div>
        <div id="submitTimes" style="margin-top: 20px;">
            <button onclick="exportData(1)" class="sjcx_button" style="float: right;margin-right:25px;">导出</button>
            <table cellspacing="1" style="height:auto;width: 690px;">
                <thead>
                <th>排名</th>
                <th>委办局</th>
                <th>数据类名称</th>
                <th>更新周期</th>
                <th>数据所属期</th>
                <th>提交日期</th>
                <th>提交量</th>
                </thead>
                <tbody id="submitTimesTbody">
                </tbody>
            </table>
            <div id="submitTimesfy"></div>
        </div>
        <div  id="applicationTimes" style="display: none;margin-top: 20px;">
            <button onclick="exportData(0)" class="sjcx_button" style="float: right;margin-right:25px;">导出</button>
            <table cellspacing="1" style="height:auto;width: 690px;">
                <thead>
                <th>排名</th>
                <th>应用名称</th>
                <th>委办局名称</th>
                <th>使用次数</th>
                <th>最后使用时间</th>
                </thead>
                <tbody id="applicationTimesTbody">
                </tbody>
            </table>
            <div id="applicationTimesfy"></div>
        </div>
        </div>
        <!--数据排名结束-->
		<!----数据月报---->
		<div id="monthly" class="right" style="display: none;padding: 5px;">
            <div style="text-align: right;padding: 5px;border: 1px solid #a2bae1;">
		    <span>选择年月：</span><input type="text" id="monthly_month" style="border: 1px solid #b5b8c8;width:120px;" readonly="readonly" onclick="WdatePicker({dateFmt:'yyyy-MM'})"/>
		    <button onclick="monthlyReport()" style="margin-right: 10px;">查询</button>
            </div>
            <div id="monthlyreport" style="font-family: '微软雅黑';padding:20px;line-height: 35px;">
                <div id="monthlyreportHead" style="font-family: 微软雅黑; padding: 20px; font-size: 30px; text-align: center; display: block;">
                </div>
                <div id="monthlyreportTime" style="text-align: right;">
                </div>
                <div id="monthlyreportContent" style="text-align: left;font-size: 16px;">
                   <h4>一、数据共享交换</h4>
                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保持数据续接稳定持入大理市信息资源中心，是保障大理市信息资源中心业务运转稳定的核心条件，是委办局各类应用的基础核心；确保数据的鲜活性、有效性、准确性也是委办局需要承担的责任。经过与委办局的沟通和协调，大理市信息资源中心与各委办局签订了数据更新机制，主要包含了更新内容、更新方式、更新周期等，从而确保信息资源中心数据的准确性、鲜活性，同时能为各委办局提供更加准确、有效的应用支撑服务。委办局于更新周期内完成提交数据的统计情况如下:
                    <table cellspacing="1" style="height:auto;width:650px;">
                        <thead>
                            <th>委办局</th>
                            <th>数据类</th>
                            <th>更新数据量</th>
                            <th>统计日期起</th>
                            <th>统计日期止</th>
                        </thead>
                        <tbody id="monthlySubmitData">
                        </tbody>
                    </table>
                    <div id="monthlySubmitDatafy"></div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;逾期未提交的委办局数据情况统计如下：<br>
                    <table cellspacing="1" style="height:auto;width:650px;">
                        <thead>
                        <th>委办局</th>
                        <th>数据类</th>
                        <th>统计日期起</th>
                        <th>统计日期止</th>
                        </thead>
                        <tbody id="monthlyNotSubmitData">
                        </tbody>
                    </table>
                    <div id="monthlyNotSubmitDatafy"></div>
                    <h4>二、应用使用统计</h4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据应用是体现数据价值的重要方式，同时也是为各委办局解决数据问题的重要手段，通过数据分析整合后的应用，能够更加有效的解决起委办局业务办理过程中的数据真实性问题，同时，使用大数据分析模型，摒弃传统的抽样分析模型，能使分析结果更加准确，为辅助决策提供保障。<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从上月1日截止到本月5日，各类应用的使用情况统计如下:
                    <table cellspacing="1" style="height:auto;width:650px;">
                        <thead>
                        <th>应用名称</th>
                        <th>使用单位</th>
                        <th>使用次数</th>
                        </thead>
                        <tbody id="monthlyApplicationTimes">
                        </tbody>
                    </table>
                    <div id="monthlyApplicationTimesfy"></div>
                </div>
            </div>
		</div>
        <!--------------数据年报-------------->
		<div id="annual" class="right" style="display: none;padding: 5px;">
            <div style="text-align: right;padding: 5px;border: 1px solid #a2bae1;">
		     <span>选择年份：</span><input type="text" id="annual_year" style="border: 1px solid #b5b8c8;width:120px;" readonly="readonly" onclick="WdatePicker({dateFmt:'yyyy'})"/>
		     <button onclick="annualReport()" style="margin-right: 10px;">查询</button>
            </div>
            <div id="annualreport" style="font-family: '微软雅黑';padding:20px;line-height: 35px;">
                <div id="annualreportHead" style="font-family: 微软雅黑; padding: 20px; font-size: 30px; text-align: center; display: block;"></div>
                <div id="annualreportTime" style="text-align: right;"></div>
                <div id="annualreportContent" style="text-align: left;font-size: 16px;">
                    <h4>一、概述</h4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从<font id="tjrqq"></font>起，截止到<font id="tjrqz"></font>，共计<font id="wbjs"></font>家委办局完成数据更新工作，其中人口库共更新<font id="rkgxsjlb"></font>类数据，更新数据<font id="rkgxsjl"></font>条，现人口库总数据已达<font id="rksjl"></font>条记录；法人库共更新<font id="frgxsjlb"></font>类数据，更新数据<font id="frgxsjl"></font>条，现法人库数据量达<font id="frsjl"></font>条记录；宏观经济库共更新<font id="hgjjgxsjlb"></font>类数据，更新数据<font id="hgjjgxsjl"></font>条，现宏观经济库数据达<font id="hgjjsjl"></font>条记录；信用征信库共采集<font id="zxgxsjlb"></font>类数据，更新数据<font id="zxgxsjl"></font>条，现信用整库数据达<font id="zxsjl"></font>条记录；各委办局的数据共享交换以及应用使用情况统计如下
                   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数据共享交换统计:
                    <table cellspacing="1" style="height:auto;width:650px;">
                        <thead>
                        <th>排名</th>
                        <th>委办局</th>
                        <th>数据类</th>
                        <th>更新数据量</th>
                        </thead>
                        <tbody id="annualSubmitData">

                        </tbody>
                    </table>
                    <div id="annualSubmitDatafy"></div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应用使用情况统计：
                    <table cellspacing="1" style="height:auto;width:650px;">
                        <thead>
                        <th>排名</th>
                        <th>应用名称</th>
                        <th>使用单位</th>
                        <th>使用次数</th>
                        </thead>
                        <tbody id="annualApplicationTimes">

                        </tbody>
                    </table>
                    <div id="annualApplicationTimesfy"></div>
                </div>
            </div>
		</div>
        <!--五大库数据量统计-->
        <div id="bi"></div>
	</div>
</div>
<!-- 蒙层开始 -->
<div id="showDiv" style="display:none;width: 100%;height: 100%;background-color: #666666;position: fixed;left: 0px; top: 0px;filter:alpha(opacity=60);opacity:0.6;z-index:10;"></div>
    <!-- 查询公交驾车路线 -->
    <div id="litDiv" style="display:none;width: 380px; height:230px;background-color:white; position:fixed;z-index:12;">
        <div style="height:40px;background-color:#48A6E6;font-weight: bold;line-height: 40px;font-size: 16px;color: white;">
        	<span style="margin-left: 20px">数据成果</span>
        	<span style="float: right;display: block;background-color:#3283DF;width: 30px;height: 40px;padding-left: 15px;cursor: pointer;" onclick="$('#litDiv').css('display','none');$('#showDiv').css('display','none')">x</span>
        </div>
        <div id="litDivcont" style="font-size: 14px;">   	
    </div>       
</div>
<!-- 蒙层结束 --> 
<%@ include file="include/bottom.jsp"%>
</body>
</html>
