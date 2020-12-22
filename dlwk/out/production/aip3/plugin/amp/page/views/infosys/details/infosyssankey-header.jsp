<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
<!-- 顶部 标题 -->

<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img style="width:336px;height:111px" class="title-icon" alt="关联关系图" src="${ctx}/plugin/amp/page/common/images/sjicon_glgxt_xtyzy.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">展示信息系统与信息资源的供需关系</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</br>
1、点击信息系统和信息资源节点可以查看详情。</br>
2、双击信息系统和信息资源节点可以展开详情。</br>
3、点击“返回上页”可以返回到信息系统视角主图。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
		展示信息系统与信息资源的关联关系图形，中心节点为信息系统，左边节点为信息系统需要的信息资源节点，右边节点为信息系统向外提供的信息资源。
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>


<!-- 返回按钮 -->
<%-- <a class="back-bu" href="${ctx }/mdp/amp/cvpTotalHandler/index">
	<i class="fa fa-reply-all" aria-hidden="true"></i>总体视角
</a> --%>

<a class="back-bu" onclick="javascript:history.back(-1);" href="#"/>
	<i class="fa fa-reply-all" aria-hidden="true"></i>返回上页
</a>
</div>
<!-- 顶部 标题 结束  -->