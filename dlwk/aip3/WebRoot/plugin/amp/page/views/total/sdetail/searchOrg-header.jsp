<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
	<!-- 顶部 标题 -->
	<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="总体视角" src="${ctx}/plugin/amp/page/common/images/sjicon_sssj.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">${orgData.org_nm }</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>查看组织机构详情</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							展示组织机构细信息。
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