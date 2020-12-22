<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style type="text/css">
.boild{ font-weight:bold;}
.cc30{ color:#c30; font-family:Arial;}
.c390{ color:#390; font-family:Arial;}
.centerimg{ background-image:url(http://static.xixik.com.cn/images/weather.png); width:25px; height:25px;position:relative; left:50%; margin-left:-12px; float:left;}
.img{ background-image:url(http://static.xixik.com.cn/images/weather.png); width:25px; height:25px;float:left; border:solid 0px black}
.centertwo{ width:50px; height:25px;position:relative; left:50%; margin-left:-25px; float:left}
.qing{ background-position:0 0px}
.duoyun{ background-position:-25px 0px}
.yin{ background-position:-50px 0px}
.zhenyu{ background-position:-75px 0px}
.leizhenyu{ background-position:-100px 0px}
.leizhengyubanyoubingbao{ background-position:-125px 0px}
.yujiaxue{ background-position:-150px 0px}
.xiaoyu{ background-position:-175px 0px}
.zhongyu{ background-position:-200px 0px}
.dayu{ background-position:-225px 0px}
.baoyu{ background-position:-250px 0px}
.dabaoyu{ background-position:-275px 0px}
.tedabaoyu{ background-position:-300px 0px}
.zhenxue{ background-position:-325px 0px}
.xiaoxue{ background-position:-350px 0px}
.zhongxue{ background-position:-375px 0px}
.daxue{ background-position:-400px 0px}
.baoxue{ background-position:-425px 0px}
.wu{ background-position:-450px 0px}
.dongyu{ background-position:-475px 0px}
.shachenbao{ background-position:-500px 0px}
.top_nav{width:998px; margin:-20 auto; line-height:40px;}
.top_nav input{background:url(../Images/denglu.png) no-repeat; width:43px; height:23px; margin-left:10px; margin-top:7px;}
.top_nav ul{float:right;}
.top_nav ul li{float:left;}
.top_nav ul li span{padding:0 10px;}
.header {
    width: 1000px;
    height: auto;
    margin: 0px auto;
    background-color: #FFF;
}
.banner {
    width: 1000px;
    border: medium none;
    position: relative;
    text-align: right;
    }
</style>
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

	function logout() {
		window.location.href = "<%=basePath%>logout.jspx?returnUrl=/";
	}
</script>

<!--头部导航-->
 <div class="top_nav" style="background-color:white;">
	<div class="topbox">
        <div class="top">
          	 <span class="date"  width="280" scrolling="no" frameborder="0"  allowtransparency="true" style ="height: 23px;margin-top: 0px;">今天是 <script type="text/javascript">
                        var y = new Date();
                        var gy = y.getYear();
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
	     				style=" width: 43px;height: 23px;margin-left: 10px;	margin-top: 0px; color:white; border:0; font-size:14px; font-family:'微软雅黑';background-image:url( ${base}/r/cms/www/red/img/denglu.png)"/>
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
<ul class="nav">
  <li><a href="/" class="a1"><i></i>首页</a></li>
  <li><a href="/introduce.jhtml" class="a2">信息资源管理中心</a></li>
  <li><a href="/zxxxcxsy/index.jhtml" class="a3">在线信息服务</a></li>
  <li><a href="/csdsc/resourceCategoryAct" id="xxzyml" class="a2">信息资源目录</a></li>
  <li><a href="/csdsc/dataChartsAct/sjfx/0/GDP.jhtml">统计分析</a></li>
  <li><a href="/csdsc/dataOutcomeAct.jhtml" id="sjcg">数据成果</a></li>
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