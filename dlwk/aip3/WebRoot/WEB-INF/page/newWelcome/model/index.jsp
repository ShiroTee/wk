<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:newHeader title="资源可视化模型库"  curItem="mulu"/>
<link rel="stylesheet" href="${ctx}/page/newWelcome/model/css/page.css"/>
<script src="${ctx}/page/newWelcome/model/js/page.js"></script>
<script src="${ctx}/page/newWelcome/model/js/index.js"></script>
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
		<span class="cur_title l">资源可视化模型库</span>
		<form onsubmit="return false;" class="head_search">
			<input name="" type="text" id ="model_search" placeholder="请输入关键词" class="search_input"  autocomplete="off">
			<img id="search_click" src="${ctx}/page/newWelcome/base/images/search_bsvg.svg">
			<div class="hot_search_box">
				<div>搜索热词：</div>
				<ul>
					<li>热词1</li>
					<li>热词2</li>
					<li>热词3</li>
					<li>热词4</li>
				</ul>
			</div>				
		</form>
	</div>
</div>
<section class="main_page">		
    <div id="model_list" class="card_box">	
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



