<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<ul class="nav nav-tabs bgf" id="myTab">
<c:if test="${subType=='2'}">
    <li class="mv_o"><a href="business_company.jhtml" class="mnb_p mb_b">商业图谱</a></li>
    <!--<li class="mv_o active"><a href="business_man.jhtml" class="mnb_p mb_b">个人图谱</a></li>-->
</c:if>
<c:if test="${subType=='1'}">
    <li class="mv_o active"><a href="industry_cychd.jhtml" class="mnb_p mb_b">产业重合度</a></li>
    <li class="mv_o"><a href="industry_cyph.jhtml" class="mnb_p">产业偏好</a></li>
    <li class="mv_o"><a href="industry_cybj.jhtml" class="mnb_p">产业布局</a></li>
</c:if>
<c:if test="${subType=='0'}">
    <li class="mv_o active"><a href="GDP.jhtml" class="mnb_p mb_b">GDP</a></li>
    <li class="mv_o"><a href="perGDP.jhtml" class="mnb_p">人均GDP</a></li>
    <li class="mv_o"><a href="population.jhtml" class="mnb_p">人口</a></li>
    <li class="mv_o"><a href="industry.jhtml?type=1" class="mnb_p">第一产业</a></li>
    <li class="mv_o"><a href="industry.jhtml?type=2" class="mnb_p">第二产业</a></li>
    <li class="mv_o"><a href="industry.jhtml?type=3" class="mnb_p">第三产业</a></li>
    <li class="mv_o"><a href="industrialStructure.jhtml" class="mnb_p">产业分布</a></li>
    <li class="mv_o"><a href="hgjj01.jhtml?type=consumption" class="mnb_p">消费指数</a></li>
    <li class="mv_o"><a href="hgjj01.jhtml?type=trade" class="mnb_p">进出口贸易</a></li>
    <!--<li class="mv_o"><a href="power.jhtml?type=1" class="mnb_p">一产煤量</a></li>
    <li class="mv_o"><a href="power.jhtml?type=2" class="mnb_p">二产煤量</a></li>
    <li class="mv_o"><a href="power.jhtml?type=3" class="mnb_p">三产煤量</a></li>-->
    <li class="mv_o"><a href="hgjj01.jhtml?type=income" class="mnb_p">居民收入</a></li>
    <li class="mv_o"><a href="hgjj01.jhtml?type=investment" class="mnb_p">投资</a></li>
    <li class="mv_o"><a href="hgjj01.jhtml?type=financial" class="mnb_p">金融</a></li>
   <!-- <li class="mv_o">
        <div class="btn-group">
            <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                更多
                <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" style="left:-35px;min-width: 100px">
                <li class="mv_o"><a href="hgjj01.jhtml?type=income" class="mnb_p">居民收入</a></li>
                <li class="mv_o"><a href="hgjj01.jhtml?type=investment" class="mnb_p">投资</a></li>
                <li class="mv_o"><a href="hgjj01.jhtml?type=financial" class="mnb_p">金融</a></li>
                <li class="mv_o"><a href="hgjj01.jhtml?type=power" class="mnb_p">用煤量分析</a></li>
            </ul>
        </div>
    </li>-->
</c:if>
</ul>
<!--左悬浮-->
<div class="left-fix">
    <div class="left-fix-list">
        <div class="left-fix-ico">
            <img src="/${res}/img/left.jpg" >
        </div>
        <li>
            <span><a href="../0/GDP.jhtml">总体经济运行情况</a></span>
        </li>
      <!-- <li>
            <span><a href="../1/industry_cychd.jhtml">产业发展健康状况</a></span>
        </li>-->
        <li>
            <span><a href="../2/business_company.jhtml">商业图谱</a></span>
        </li>
    </div>
</div>

<jsp:include page="${chartsid}.jsp" />
<script>
    $(function(){
        $(".btn-grou>a:first-child>button").addClass("active");
    })
</script>