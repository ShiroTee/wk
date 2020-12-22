<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>

<mdp:mdpHeader title="元数据视图" curItem="management"/>
<script src="${ctx}/page/welcome/api/js/page.js"></script>
<script src="${ctx}/page/welcome/metadata_manage/js/metadata_manage.js"></script>
<link rel="stylesheet" href="${ctx }/page/welcome/api/css/page.css"/>  
<section class="main_page">	
	<form class="search top_search">
        <div class="search_left">
            <div class="search_ico"><i class="ico i100"></i></div>
            <input name="" type="text" placeholder="请输入关键词" class="search_input">
        </div>
        <input name="" type="button" value="搜索" class="search_btn">
    </form>    
    <div class="line">
    	<span class="cur_title l">元数据视图</span>
    	<div class="paging r" style="margin-right:32px;">
	    	<ul class="page_" maxshowpageitem="5" pagelistcount="10"  id="mm_page"></ul>
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
    		<div class="page_goto">
    			跳至
    			<input class="goto" value="1">
    			页
    		</div>
    	</div>
    </div>
    <div  style="display: inline-block;position: relative;" id="schema_card_list">
    	<!--<div class="category">
			<div class="category_title">
				<i class="icon_24 icon_table"></i>全部分类
			</div>
			<div class="category_main">
				<div class="title">
					<i class="icon_16 icon_group mr15"></i>组织机构
				</div>
				<div class="line">
					<span>工商</span>/
					<span class="cur">公安</span>/
					<span>卫生</span>/
					<span>交通</span>		
				</div>
				<div class="title">
					<i class="icon_16 icon_theme mr15"></i>应用主题
				</div>
				<div class="line">
					<span>经济建设</span>/
					<span>资源环境</span>/
					<span>卫生健康</span>/
					<span>教育</span>/
					<span>科技</span>/
					<span>道路交通</span>/
					<span>个人信息</span>		
				</div>
			</div>
		</div>-->
<%-- 		<a class="card transition_1 l" target="_blank"  href="${ctx }/mdp/welcome/erRelation/erRelation.html">
			<div class="title">综合库E-R关系图</div>
			<div class="tag">
				<span>数据交换</span>
			</div>
			<i class="icon_eye">1,234</i>
			<i class="icon_download">4,211</i>
		</a> --%>
<!-- 		<div class="card transition_1 l">
			<div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div>
			<div class="title">血统分析</div>
			<div class="tag">
				<span>数据交换</span>
			</div>
			<i class="icon_eye">1,234</i>
			<i class="icon_download">4,211</i>
		</div>
		<div class="card transition_1 l">
			<div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div>
			<div class="title">影响分析</div>
			<div class="tag">
				<span>数据交换</span>
			</div>
			<i class="icon_eye">1,234</i>
			<i class="icon_download">4,211</i>
		</div> -->
	</div>
</section>

<mdp:mdpFooter />









