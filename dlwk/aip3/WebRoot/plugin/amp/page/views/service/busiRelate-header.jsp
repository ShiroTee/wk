<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
	<!-- 顶部 标题 -->
	<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="总体视角" src="${ctx}/plugin/amp/page/common/images/sjicon_glgxt_ywsx.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">展示业务事项关联关系</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
							1、点击业务事项、信息系统和信息资源节点可以查看详情。</br>
							2、双击业务事项、信息系统和信息资源节点可以展开详情。</br>
							3、点击“返回上页”可以返回到服务对象视角主图。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							分类展示所选业务事项关联的其它业务事项、信息系统与信息资源情况。
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>
	
	<!-- 返回按钮 -->
	<a class="back-bu" href="${ctx }/mdp/amp/cvpServerHandler/index">
		<i class="fa fa-reply-all" aria-hidden="true"></i>返回上页
	</a>
</div>
<!-- 顶部 标题 结束  -->