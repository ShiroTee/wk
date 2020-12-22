<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<link href="<%=basePath%>r/cms/Css/header2.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	function imgClick() {
		window.location.href = "${base}/logout.jspx?returnUrl=/";
	}
    var pageSize =${pageSize};
    var userId="${userId}";
	var phone="${phone}";
	var userloginName="${userloginName}";
	var authKey="${authKey}";
	var platformAddt="${platformAdd}";
 	function getURL() {
		return  "${platformAdd}/service/api/sps/";
 	}
 	 /*
 	 var weatherUrl = "${weatherIp}/Weather/index.jsp";
 	 $.getJSON(weatherUrl+"?callback=?", function(data){      
	        $("#week").html(data[0].week);
						   $("#date").html(data[0].date);
						   var min = data[0].minTem;
						   var max = data[0].maxTem;
						   if(min != null || max !=null)
						   $("#tem").html(min+"-"+max+"°");
						   $("#imgCss").addClass(data[0].css);   
	    }); 
 	 */
	function logout() {
		window.location.href = "<%=basePath%>logout.jspx?returnUrl=/";
	}
</script>		

<!--头部导航-->
 <div class="top_nav" style="background-color:white;margin-top: -2px;">
	<div class="topbox">
        <div class="top">
          	 <span class="date"  width="280" scrolling="no" frameborder="0"  allowtransparency="true" style ="height: 23px;margin-top: 0px;">今天是 <script type="text/javascript">
                        var y = new Date();
                        var yb = y.getFullYear();
                        var dName = new Array("星期天", "星期一 ", "星期二", "星期三", "星期四", "星期五", "星期六");
                        var mName = new Array("1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月");
                        document.write(y.getFullYear() + "年" + mName[y.getMonth()] + y.getDate() + "日　" + dName[y.getDay()]);
          </script></span>
          	<span class="collect">
          		<a href="###">加入收藏</a>&nbsp;|&nbsp;
          		<span id="new_ts">欢迎您&nbsp;
				<c:if test="${!empty userId}">
				     ${userName}
				     <input type="button" value="退出" onclick="imgClick()"
	     				style=" width: 43px;height: 23px;margin-left: 10px;text-indent: 1px;margin-top: 0px; color:white; border:0; font-size:14px; font-family:'微软雅黑';background-image:url( ${base}/r/cms/www/red/img/denglu.png)"/>
				</c:if>
				<c:if test="${empty userId}">
				           游客 <input type="button" value="登录" id="login" onclick="showlogin()" />
				</c:if>
		     	</span>
	     	</span>
        </div>
	</div>
</div>
<!--头部导航结束--> 
<!--logo-->
<div class="header">
	<div class="banner">
	<img src="<%=basePath%>r/cms/Images/banner.jpg" />
	</div>
<!--logo--> 
<!--导航开始-->
 <ul class="nav2">
  <li><a href="/" class="a1"><i></i>首页</a></li>
  <li><a href="/introduce.jhtml" class="a2" style="width:112px;">信息资源管理中心</a></li>
  <li><a href="/zxxxcxsy/index.jhtml" class="a3">在线信息服务</a></li>
  <li><a href="/csdsc/resourceCategoryAct" id="xxzyml" class="a2">信息资源目录</a></li>
     <li><a href="/csdsc/dataChartsAct/sjfx/0/GDP.jhtml" class="current">统计分析</a></li>
     <li><a href="/csdsc/dataOutcomeAct.jhtml" id="sjcg" >数据成果</a></li>
  <li><a href="/zxts/index.jhtml">互动交流</a></li>
  <c:if test="${rdpRole=='10'||rdpRole=='11'}">
 	 <li><a href="/jfglsy/index.jhtml">积分管理</a></li>
  </c:if>
  <li><a href="/rjxz/index.jhtml">下载中心</a></li>
 	<li><a href="/csdsc/personInformationAct.jhtml" id="grxx" >个人信息</a><span>&nbsp;</span></li>		 
  <!--天气
   <div class="tianqi"><div style="width: 70px; height: 47px; padding: 19px 0 0 60px; "><div id="imgCss"></div></div> <span class="one" id="tem" style="font-size:14pt;"></span> <span class="two"><strong id="week"></strong> <div id="date"> </div></span> </div>
                    天气结束-->
</ul>
</div>
<div class="clear"></div>