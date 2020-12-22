<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
    
<mdp:mdpHeader title="资源梳理成果可视化"  curItem="mulu"/>
<section class="main_page">	
	<form class="search top_search">
        <div class="search_left">
            <div class="search_ico"><i class="ico i100"></i></div>
            <input name="" type="text" placeholder="请输入关键词" class="search_input">
        </div>
        <input name="" type="button" value="搜索" class="search_btn">
    </form>
    <div class="line">
    	<span class="cur_title l">资源梳理成果可视化</span>
    	<div class="cur_search l">当前选择&nbsp;/
    		<span>公安<i class="icon_close fa fa-close"></i></span>
    		<span>个人信息<i class="icon_close fa fa-close"></i></span></div>
    	<div class="paging r" style="margin-right:32px;margin-top: -28px;">
    		<div class="page_goto">
    			跳至
    			<input class="goto" value="1">
    			页
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
	    	<div class="page_list">
	    		<div class="pagination_next_box">
	    			<i title="下一页" class="pagination_next fa fa-angle-right"></i>
	    			<i title="末页" class="pagination_last fa fa-angle-double-right"></i>
	    		</div>
	    		<ul>
	    			<li class="cur">1</li>
	    			<li>2</li>
	    			<li>3</li>
	    			<li>4</li>
	    			<li>5</li>
	    		</ul>
	    		<div class="pagination_next_box">
	    			<i title="首页" class="pagination_first fa fa-angle-double-left"></i>
	    			<i title="上一页" class="pagination_prev fa fa-angle-left"></i>
	    		</div>
	    	</div>
    	</div>
    </div>
    <ul class="filter_line">
    	<li class="cur"><a href="javascript:void(0)">全部</a></li>
    	<li><a href="javascript:void(0)">信息化建设状况</a></li>
    	<li><a href="javascript:void(0)">部门信息资源应用情况</a></li>
    	<li><a href="javascript:void(0)">部门信息资源共享情况</a></li>
    	<li><a href="javascript:void(0)">信息资源对外开放情况</a></li>
    	<li><a href="javascript:void(0)">信息资源对外服务情况</a></li>
    </ul>
    <div  style="margin-top: 20px;display: inline-block;position: relative;">
	    <div class="category">
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
					<span>旅游</span>/
					<span>道路交通</span>/
					<span class="cur">个人信息</span>/
					<span>其他</span>			
				</div>
			</div>
		</div>
		<a class="card l" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627090243">
			<!-- <div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div> -->
			<div class="img_box">
				<img src="${ctx }/page/welcome/achievements_view/images/001.png">
			</div>
			<div class="title api">信息资产基本情况</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627094445">
			<!-- <div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div> -->
			<div class="img_box">
				<img src="${ctx }/page/welcome/achievements_view/images/002.png">
			</div>
			<div class="title api">信息资源共享情况</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627102429">
			<!-- <div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div> -->
			<div class="img_box">
				<img src="${ctx }/page/welcome/achievements_view/images/003.png">
			</div>
			<div class="title api">信息资源应用情况</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627103650">
			<!-- <div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div> -->
			<div class="img_box">
				<img src="${ctx }/page/welcome/achievements_view/images/004.png">
			</div>
			<div class="title api">信息资源开放情况</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>
		<a class="card l" target="_blank" href="http://118.190.17.220:9020/app/zhangynb/20170627105852">
			<!-- <div class="todo">
				<div>
					<a class="show_detail icon_detail">查看详情</a>
				</div>
				<div>
					<a class="icon_basket mr15">加入资源车</a>
					<a class="icon_application">立即申请</a>
				</div>
			</div> -->
			<div class="img_box">
				<img src="${ctx }/page/welcome/achievements_view/images/005.png">
			</div>
			<div class="title api">信息化建设现状</div>
			<i class="icon_time">2017/04/14</i>
			<i class="icon_download">4,211</i>
		</a>		
	</div>
</section>
<mdp:mdpFooter />