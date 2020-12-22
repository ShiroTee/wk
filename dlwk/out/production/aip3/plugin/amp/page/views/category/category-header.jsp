<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="container-fluid">
<!-- 顶部 标题 -->
<div class="row">
	<div class="col-xs-11 main-title-weidu">
		<!--标题-->
		<div class="main-title">
			<div class="title-circle">
				<span class="circle-icon"></span>
			</div>
			<div class="title-p">
				<span class="title-p-primary">信息资源分类</span> <span
					class="title-p-small">以多个维度实现对信息资源的分类</span>
			</div>
			<div class="caozuoshuoming"></div>
			<div style="display: none;" class="caozuoshuoming-div">
				<p>操作说明：点击非中心节点且拥有子节点的节点时，该节点以整个圆形展现；点击中心节点，展开该节点下的子节点。</p>
				
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="col-xs-12">
		<p class="main-text-descript">图形括号中的数字表示当前分类关联的信息资源数</p>
	</div>
</div>
<!-- 返回按钮 -->
<a class="back-bu" href="${ctx }/mdp/amp/cvpTotalHandler/index">
	<i class="fa fa-reply-all" aria-hidden="true"></i>总体视角
</a>
</div>
<!-- 顶部 标题 结束  -->