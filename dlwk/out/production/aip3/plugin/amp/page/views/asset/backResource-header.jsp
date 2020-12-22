<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
<!-- 顶部 标题 -->
<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="信息资源视角" src="${ctx}/plugin/amp/page/common/images/top_icon_xxzy.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">展示组织机构提供的信息资源</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
							1、输入关键字可以查询相关的信息资源信息。</br>
							2、双击委办局可以查看所选委办局提供的信息资源信息。</br>
							3、点击信息资源列表中的行，可以切换查看信息资源详情。</br>
							4、点击信息资源列表中的“资源回溯”，可以查看所选信息资源的回溯情况。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							展现全域范围内各组成部门的信息资源情况，展现信息资源的组成和详细描述。
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>
<!-- 返回按钮 -->
<a class="back-bu" href="${ctx }/mdp/amp/cvpTotalHandler/index?rtype=asset">
	<i class="fa fa-reply-all" aria-hidden="true"></i>总体视角
</a>
</div>
<!-- 顶部 标题 结束  -->