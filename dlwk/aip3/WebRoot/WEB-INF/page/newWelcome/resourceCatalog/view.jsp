<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:newHeader title="信息资产业务可视化" curItem="mulu"/>
<style>
	a:focus, a:hover {
    	color: inherit;
    	text-decoration: inherit;
	}
	.card .tag div {
    	float: none;
	}
	.card i{
		float:left;
		    margin: 0;
	}
	.card i:last-child{
		float:right;
	}
</style>
<div class="main_head">
	<div class="main_head_container">
		<span class="cur_title l">信息资产业务可视化</span>		
	</div>
</div>
<section class="main_page">
    <div class="card_box">	    
		<div class="card l">			
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpTotalHandler/index">
				<img src="${ctx }/resources/images/card_default.svg">
			</a>
			<div class="title">总体视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpOrgViewHandler/index2">
				<img src="${ctx }/page/welcome/resourceCatalog/images/orgview.svg">
			</a>
			<div class="title">组织机构视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpServerHandler/index">
				<img src="${ctx }/page/welcome/resourceCatalog/images/server.svg">
			</a>
			<div class="title">服务对象视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpAssetHandler/index">
				<img src="${ctx }/page/welcome/resourceCatalog/images/asset.svg">
			</a>
			<div class="title">信息资源视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/themeHandler/index">
				<img src="${ctx }/page/welcome/resourceCatalog/images/theme.svg">
			</a>
			<div class="title">协同主题视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpInfoSysHandler/index">
				<img src="${ctx }/page/welcome/resourceCatalog/images/infosys.svg">
			</a>
			<div class="title">信息系统视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpDataeleHandler/index">
				<img src="${ctx }/page/welcome/resourceCatalog/images/dataele.svg">
			</a>
			<div class="title">数据元集视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/mdp/amp/cvpAssetCategoryHandler/index">
				<img src="${ctx }/page/welcome/resourceCatalog/images/assetcategory.svg">
			</a>
			<div class="title">资源分类视角</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
	</div>
</section>









<mdp:mdpFooter />