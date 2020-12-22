<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" pageEncoding="UTF-8" %>
<div class="Data_application">
    <c:choose>
        <c:when test="${chartsid=='index'}">
            <div class="box2 list1">
                <p class="one"><a href="dataContainer.jhtml?index=1"><img src="${resSys}/Images/BI/C7.png" width="252" height="170"/></a></p>
                <p class="two">社会法人地区分布统计</p>
            </div>
            <div class="box2 list2">
                <p class="one"><a href="dataContainer.jhtml?index=2"><img src="${resSys}/Images/BI/C1.png" width="252"height="170"/></a></p>
                <p class="two">人口增长强度变化结构</p>
            </div>
            <div class="box2 list3">
                <p class="one"><a href="dataContainer.jhtml?index=3"><img src="${resSys}/Images/BI/C2.png" width="252"   height="170"/></a></p>
                <p class="two">死亡人口及死因统计分析</p>
            </div>
            <div class="box2 list4">
                <p class="one"><a href="dataContainer.jhtml?index=4"><img src="${resSys}/Images/BI/C3.png" width="252" height="170"/></a></p>
                <p class="two">人口性别、年龄结构分布</p>
            </div>
            <div class="box2 list5">
                <p class="one"><a href="dataContainer.jhtml?index=5"><img src="${resSys}/Images/BI/C4.png" width="252" height="170"/></a></p>
                <p class="two">交通运输旅客周转量统计分析</p>
            </div>
            <div class="box2 list6">
                <p class="one"><a href="dataContainer.jhtml?index=6"><img src="${resSys}/Images/BI/C5.png" width="252" height="170"/></a></p>
                <p class="two">数据历史接收总量统计</p>
            </div>
            <div class="box2 list7">
                <p class="one"><a href="dataContainer.jhtml?index=7"><img src="${resSys}/Images/BI/C9.png" width="252" height="170"/></a></p>
                <p class="two">四库数量总量统计图</p>
            </div>
            <div class="box2 list8">
                <p class="one"><a href="dataContainer.jhtml?index=8"><img src="${resSys}/Images/BI/C10.png" width="252" height="170"/></a></p>
                <p class="two">各委办局数据提交量统计</p>
            </div>
            <div class="box2 list9">
                <p class="one"><a href="dataContainer.jhtml?index=9"><img src="${resSys}/Images/BI/C11.png" width="252" height="170"/></a></p>
                <p class="two">各委办局数据提交量详细统计</p>
            </div>
            <div class="box2 list10">
                <p class="one"><a href="dataContainer.jhtml?index=10"><img src="${resSys}/Images/BI/C12.png" width="252" height="170"/></a></p>
                <p class="two">各委办局数据提交质量统计</p>
            </div>
            <div class="box2 list11">
                <p class="one"><a href="dataContainer.jhtml?index=11"><img src="${resSys}/Images/BI/C13.png" width="252" height="170"/></a></p>
                <p class="two">应用使用量统计</p>
            </div>
            <div class="box2 list12">
                <p class="one"><a href="dataContainer.jhtml?index=12"><img src="${resSys}/Images/BI/C14.png" width="252" height="170"/></a></p>
                <p class="two">各委办局数据使用流向图</p>
            </div>
        </c:when>
        <c:otherwise>
            <jsp:include page="${chartsid}.jsp"/>
        </c:otherwise>
    </c:choose>
</div>
<!--左悬浮-->
<div class="left-fix" >

    <div class="left-fix-list">
        <div class="left-fix-ico">
            <img src="/${res}/img/left.jpg" >
        </div>
        <li>
            <span><a href="../../tjfx/0/index.jhtml?type=1">人口</a></span>
        </li>
        <li>
            <span><a href="../../tjfx/0/index.jhtml?type=2">法人</a></span>
        </li>
        <li>
            <span><a href="../../tjfx/0/index.jhtml?type=3">宏观经济</a></span>
        </li>
        <li>
            <span><a href="../../tjfx/0/index.jhtml?type=4">综合</a></span>
        </li>
    </div>
</div>

<script>
    $(function(){
        $(".btn-grou>a:not(:first-child)>button").addClass("active");
		$('.box2').show();
		<c:if test="${param.type==1}">
				   $('.box2').hide();
				   $('.list2').show();
				   $('.list3').show();
				   $('.list4').show();
				   $('.list5').show();
		</c:if>
		<c:if test="${param.type==2}">
				   $('.box2').hide();
				   $('.list1').show();
		</c:if>
		<c:if test="${param.type==3}">
			$('.box2').hide();
		</c:if>
		<c:if test="${param.type==4}">
			       $('.box2').hide();
				   for(var i=6;i<=12;i++){
				      $('.list'+i).show();
				   }
		</c:if>
    })
</script>