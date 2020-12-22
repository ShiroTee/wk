<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
	<!-- 顶部 标题 -->
	<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="搜索视角" src="${ctx}/plugin/amp/page/common/images/sjicon_sssj.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">分类展示按关键字搜索的信息资产情况</span>
<!-- 							<span class="title-p-text"> -->
<!-- 								分类展示按关键字搜索的信息资产情况。 -->
<!-- 							</span> -->
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
							1、点击屏幕上方的信息分类，可以在搜索结果中进行过滤。</br>
							2、点击搜素结果的信息标题，可以查看信息详情。</br>
							3、点击“总体视角”可以返回到总体视角。</br></p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
				    <div class="titl-text-box title-des-box">
				    	<%@include file="searchBox.jsp" %>
				    </div>
<!-- 					<div class="titl-text-box title-des-box"> -->
<!-- 						<span class="title-text-descript"> -->
<!-- 							展示部门资源分布情况，双击各视角进入对应视角。 -->
<!-- 						</span> -->
<!-- 				   </div> -->
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