<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>    
<mdp:newHeader title="资源梳理成果可视化"  curItem="mulu"/>
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
		<span class="cur_title l">资源梳理成果可视化</span>
		<form onsubmit="return false;" class="head_search">
			<input name="" type="text" placeholder="请输入关键词" class="search_input">
			<img src="${ctx}/page/newWelcome/base/images/search_bsvg.svg">
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
				<div class="filter_list">
					<span class="filter_all cur">全部</span>
					<span>经济建设</span>
					<span>资源环境</span>
					<span>卫生健康</span>
					<span>教育</span>
					<span>科技</span>
					<span>旅游</span>
					<span>道路交通</span>
					<span>个人信息</span>
					<span>其他</span>
				</div>
			</div>
		</div>
	</div>
    <div class="card_box">	    
		<div class="card l">			
			<a class="img_box" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627090243">
				<img src="${ctx }/page/welcome/achievements_view/images/001.png">
			</a>
			<div class="title">信息资产基本情况</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627094445">
				<img src="${ctx }/page/welcome/achievements_view/images/002.png">
			</a>
			<div class="title">信息资源共享情况</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627102429">
				<img src="${ctx }/page/welcome/achievements_view/images/003.png">
			</a>
			<div class="title">信息资源应用情况</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627103650">
				<img src="${ctx }/page/welcome/achievements_view/images/004.png">
			</a>
			<div class="title">信息资源开放情况</div>
			<div class="tag">
				<div>
					<i class="icon_time">2017/04/14</i>
					<i class="icon_download">4,211</i>
				</div>
			</div>
		</div>
		<div class="card l">
			<a class="img_box" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627105852">
				<img src="${ctx }/page/welcome/achievements_view/images/005.png">
			</a>
			<div class="title">信息化建设现状</div>
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