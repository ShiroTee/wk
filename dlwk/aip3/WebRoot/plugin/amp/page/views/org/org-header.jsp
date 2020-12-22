<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="container-fluid">
<!-- 顶部 标题 -->
<div class="row">
		<div class="col-md-12">
			<div class="row title-banner">
				<div class="title-icon-box">
					<img class="title-icon" alt="组织机构视角" src="${ctx}/plugin/amp/page/common/images/zsj_icon.png"></img>
				</div>
				<div class="title-box">
					<div class="titl-text-box title-small">
						<div class="title-ps">
							<span class="title-p-text">以组织信息展示信息资产</span>
						</div>
						<div class="caozuoshuoming"></div>
						<div style="display: none;" class="caozuoshuoming-div">
							<p>操作说明：</p>
							<p>1、单击组织机构类型，可查看所选类型下的组织机构详情。</p>
							<p>2、双击组织机构类型，可下钻查看所选类型下的组织机构。</p>
							<p>3、单击组织机构，可查看所选组织机构下的各业务处室详情。</p>
							<p>4、双击组织机构，可下钻查看所选组织机构下的各业务处室。</p>
							<p>5、单击业务处室，可查看所选业务处室下的业务事项详情。</p>
							<p>6、双击业务处室，可下钻查看所选业务处室下业务事项关联的信息资源。</p>
							<p>7、单击信息资源，可查看所选信息资源详情。</p>
							<p>8、单击图形上方路径导航，可回退到对应路径的图形。</p>
						</div>
				    </div>
				    <div class="title-line">
				    	<div class="title-line-left"></div>
				    	<div class="title-line-middle"></div>
				    	<div class="title-line-right"></div>
				    </div>
					<div class="titl-text-box title-des-box">
						<span class="title-text-descript">
							以组织机构维度层层推进，描述信息资产情况，管理路径：组织机构类型-》组织机构（委办局）-》组织机构（处室）-》业务事项-》信息资源，节点中的数字代表当前节点拥有的子节点数。
						</span>
				   </div>
			   </div>
		   </div>
	   </div>
	</div>

<a class="back-bu" id="content" href="${ctx }/mdp/amp/cvpTotalHandler/index" >
		<i class="fa fa-reply-all" aria-hidden="true"></i>总体视角
	</a>
</div>
<!-- 顶部 标题 结束  -->