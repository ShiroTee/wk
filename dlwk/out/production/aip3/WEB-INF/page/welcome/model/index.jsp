<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:mdpHeader title="资源可视化模型库"  curItem="mulu"/>
<link rel="stylesheet" href="${ctx}/page/welcome/model/css/page.css"/>
<script src="${ctx}/page/welcome/model/js/page.js"></script>
<script src="${ctx}/page/welcome/model/js/index.js"></script>
<section class="main_page">	
	<div class="search top_search">
        <div class="search_left">
            <div class="search_ico"><i class="ico i100"></i></div>
            <input name="" style="width:100%" id ="model_search" type="text" placeholder="请输入关键词" class="search_input">
        </div>
        <input name="" id="search_click" type="button" value="搜索" class="search_btn">
    </div>
    <div class="line">
    	<span class="cur_title l">资源可视化模型库</span>
    	<div class="paging r" style="margin-right:32px;">
    		<div class="page_goto">
    			跳至
    			<input class="goto" value="1">
    			页
    		</div>
	    	<div class="page_size">
	    		<span page-size="8">8条/页</span>
	    		<i class="fa fa-angle-down r" style="margin-top: 4px;"></i>
	    		<ul>
	    			<li class="cur" page-size="8">8条/页</li>
	    			<li page-size="12">12条/页</li>
	    			<li page-size="16">16条/页</li>
	    			<li page-size="20">20条/页</li>
	    		</ul>
    		</div>
	    	<ul class="page_" maxshowpageitem="5" pagelistcount="10"  id="page_"></ul>
    	</div>
    </div>
    <div  id="model_list"  style="display: inline-block;position: relative;">
	</div>		
</section>
<mdp:mdpFooter />



