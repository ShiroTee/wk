<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
    
<mdp:mdpHeader title="信息资产业务可视化" curItem="mulu"/>
<section class="main_page">	
	<!-- <form class="search top_search">
        <div class="search_left">
            <div class="search_ico"><i class="ico i100"></i></div>
            <input name="" type="text" placeholder="请输入关键词" class="search_input">
        </div>
        <input name="" type="button" value="搜索" class="search_btn">
    </form> -->
    <div class="line">
    	<span class="cur_title l">信息资产业务可视化</span>
    	<!--  <div class="cur_search l">当前选择&nbsp;/<span>全部<i class="icon_close fa fa-close"></i></span></div>
    	<div class="paging r" style="margin-right:32px;">
	    	<div class="page_list">
	    		<i title="首页" class="pagination_first fa fa-angle-double-left"></i>
	    		<i title="上一页" class="pagination_prev fa fa-angle-left"></i>
	    		<ul>
	    			<li class="cur">1</li>
	    			<li>2</li>
	    			<li>3</li>
	    			<li>4</li>
	    			<li>5</li>
	    		</ul>
	    		<i title="下一页" class="pagination_next fa fa-angle-right"></i>
	    		<i title="末页" class="pagination_last fa fa-angle-double-right"></i>
	    	</div>
	    	<div class="page_size">
	    		<span>8条/页</span>
	    		<i class="fa fa-angle-down r" style="margin-top: 4px;"></i>
	    		<ul>
	    			<li class="cur">8条/页</li>
	    			<li>12条/页</li>
	    			<li>16条/页</li>
	    			<li>20条/页</li>
	    		</ul>
    		</div>
    		<div class="page_goto">
    			跳至
    			<input class="goto" value="1">
    			页
    		</div>
    	</div> -->
    </div>
    <div  style="display: inline-block;position: relative;">	    
		<a class="card l"  target="_blank" href="${ctx }/mdp/amp/cvpTotalHandler/index">			
			<div class="img_box">
				<img src="${ctx }/resources/images/card_default.png">
			</div>
			<div class="title api">总体视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/cvpOrgViewHandler/index2">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/orgview.png">
			</div>
			<div class="title api">组织机构视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/cvpServerHandler/index">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/server.png">
			</div>
			<div class="title api">服务对象视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/cvpAssetHandler/index">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/asset.png">
			</div>
			<div class="title api">信息资源视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/themeHandler/index">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/theme.png">
			</div>
			<div class="title api">协同主题视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/cvpInfoSysHandler/index">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/infosys.png">
			</div>
			<div class="title api">信息系统视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/cvpDataeleHandler/index">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/dataele.png">
			</div>
			<div class="title api">数据元集视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="${ctx }/mdp/amp/cvpAssetCategoryHandler/index">
			<div class="img_box">
				<img src="${ctx }/page/welcome/resourceCatalog/images/assetcategory.png">
			</div>
			<div class="title api">资源分类视角</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
	</div>
</section>









<mdp:mdpFooter />