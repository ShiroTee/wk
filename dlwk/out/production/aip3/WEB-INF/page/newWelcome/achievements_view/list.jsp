<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
    
<mdp:newHeader title="资源梳理成果示范"  curItem="mulu"/>

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
		<span class="cur_title l">资源梳理成果示范</span>
		<form onsubmit="return false;" class="head_search">
			<input name="" type="text" id ="entity_search" placeholder="请输入关键词" class="search_input"  autocomplete="off">
			<img id="search_click" src="${ctx}/page/newWelcome/base/images/search_bsvg.svg">
		</form>
	</div>
</div>
<section class="main_page">	
    <div class="card_box">	    
		<div class="card l">
			<a class="img_box" target="_blank" href="${ctx }/page/welcome/sample/index.html">
				<img src="${ctx }/resources/images/test.png">
			</a>
			<div class="title">成都政务大数据中心</div>
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