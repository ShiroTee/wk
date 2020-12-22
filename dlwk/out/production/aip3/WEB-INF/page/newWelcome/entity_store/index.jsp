<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:newHeader title="数据可视化应用仓库"  curItem="information"/>
<link rel="stylesheet" href="${ctx }/page/newWelcome/entity_store/css/page.css"/>
<script src="${ctx}/page/newWelcome/entity_store/js/page.js"></script>
<script src="${ctx}/page/newWelcome/entity_store/js/index.js"></script>

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
		<span class="cur_title l">数据可视化应用仓库</span>
		<form onsubmit="return false;" class="head_search">
			<input name="" type="text" id ="entity_search" placeholder="请输入关键词" class="search_input"  autocomplete="off">
			<img id="search_click" src="${ctx}/page/newWelcome/base/images/search_bsvg.svg">
		</form>
	</div>
</div>



<section class="main_page">	
	<div class="filter_box">
		<div class="filter_category">
    		<span><i class="cur">全部</i></span>
    		<span><i>信息化建设状况</i></span>
    		<span><i>部门信息资源应用情况</i></span>
    		<span><i>部门信息资源共享情况</i></span>
    		<span><i>信息资源对外开放情况</i></span>
    		<span><i>信息资源对外服务情况</i></span>
    	</div>
		<div class="filter_target">
			<span>筛选</span>
		</div>
		<div class="filter_content" style="display:none;">
			<div class="filter_content_close">收起</div>
			<div class="filter_line">
				<div class="filter_name">组织机构</div>
				<div class="filter_list assetOrgs">
					<span class="filter_all cur">全部</span>
					<span>工商</span>
					<span>公安</span>
					<span>卫生</span>
					<span>交通</span>
				</div>
			</div>
			<div class="filter_line">
				<div class="filter_name">应用主题</div>
				<div class="filter_list" id="entity_topic">
					
				</div>
			</div>
		</div>
	</div>
    <div id="entity_list" class="card_box">
	</div>  
	<div class="paging" style="margin-right: 32px;">			
		<div class="page_goto">
			跳至 <input class="goto" value="1"> 页
		</div>
		<div class="page_size">
			<span  page-size="8">8条/页</span> <i class="fa fa-angle-down r" style="margin-top: 4px;"></i>
			<ul>
				<li class="cur" page-size="8">8条/页</li>
				<li page-size="16">16条/页</li>
				<li page-size="20">20条/页</li>
				<li page-size="24">24条/页</li>
			</ul>
		</div>
		<ul class="page_list page_" maxshowpageitem="5" pagelistcount="10"  id="page_">
	    </ul>
	</div>
		
</section>
<mdp:mdpFooter />
