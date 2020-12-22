<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="container-fluid">
    <!-- 顶部 标题 -->
	<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="总体视角" src="${ctx}/plugin/amp/page/common/images/sjicon_zyfl.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">以资源分类方式展示信息资源</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
1、点击图形的节点可以展开/收缩选中节点。</br>
2、双击图形的节点可以查看选中节点的详细信息。</br>
3、双击底部的标题栏可以展开选中节点的详细信息。</br>
4、点击信息资源列表中的行，可以切换查看信息资源详情。</br>
5、点击信息资源列表中的“资源回溯”，可以查看所选信息资源的回溯情况。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							以多个维度实现对信息资源的分类
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>
<!-- 返回按钮 -->
<a class="back-bu" href="${ctx }/mdp/amp/cvpTotalHandler/index">
	<i class="fa fa-reply-all" aria-hidden="true"></i>总体视角
</a>
</div>
<!-- 顶部 标题 结束  -->