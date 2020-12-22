<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@include file="../../common/import-tags.jspf"%>
<mdp:mdpHeader title="API数据服务申请" curItem="information"/>
<script src="${ctx}/page/welcome/api/js/page.js"></script>
<script src="${ctx}/page/welcome/api/js/index.js"></script>
<link rel="stylesheet" href="${ctx }/page/welcome/api/css/page.css"/>  
<section class="main_page">	
	<div class="search top_search">
        <div class="search_left">
            <div class="search_ico"><i class="ico i100"></i></div>
            <input id="search_condition" style="width:100%" type="text" placeholder="请输入关键词" class="search_input"/>
        </div>
        <input id="search_click" type="button" value="搜索" class="search_btn"/>
    </div>   
    <div class="line hot_search">
    	<div><span>搜索热词：</span></div>		
		<div id="hot_word" style="padding-left: 90px;">
		</div>
	</div> 
    <div class="line">
    	<!-- <span class="cur_title l">API数据服务申请</span> -->
    	<div class="cur_search l">当前选择&nbsp;/
    		</div>
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
    <ul class="filter_line">
    </ul>
    <div  id="apiList" style="margin-top:20px;display: inline-block;position: relative;">
	    <div class="category">
			<div class="category_title">
				<i class="icon_24 icon_table"></i>全部分类
			</div>
			<div class="category_main">
				<div class="title">
					<i class="icon_16 icon_group mr15"></i>组织机构
				</div>
				<div class="line" id="">
					<span>工商</span>/
					<span class="cur">公安</span>/
					<span>卫生</span>/
					<span>交通</span>		
				</div>
				<div class="title" id="topic_title">
					<i class="icon_16 icon_theme mr15"></i>应用主题
				</div>
				<div class="line" id="topic">
					<span>经济建设</span>/
				</div>
			</div>
		</div>
		<div class="card l">
		</div>
	</div>
</section>
<mdp:mdpFooter />