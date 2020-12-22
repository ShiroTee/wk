<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>    
<mdp:mdpHeader title="企业画像"  curItem="information" hideHead="true"/>
<link rel="stylesheet" href="${ctx }/page/welcome/corporatePortrait/css/index.css"/>
<link rel="stylesheet" href="${ctx }/page/welcome/corporatePortrait/css/details.css"/>

<script src="${ctx }/resources/ace/assets/js/bootstrap.min.js"></script>
<script src="${ctx }/page/welcome/corporatePortrait/js/jsrender.min.js"></script>
<script src="${ctx }/page/welcome/corporatePortrait/js/portrait.js"></script>
<section id="main" class="">	
	<!-- 左边基本信息 -->
	<div class="left_area">
		<input name="" type="button" data-modecode="PORTRAIT" value="模型" class="show_model">
		<form class="search_box">
        	<div class="search_left">
            	<input name="" id="searchIdinput" type="text" placeholder="请输入身份证号码" class="search_input" value="<%=request.getParameter("id") %>">
            	<ul class="id_list">
            		<li>532901198907193777</li>
            		<li>362323200112200543</li>
            		<li>532901199909302222</li>
            		<li>532901197705201228</li>
            	</ul>
        	</div>
        	<input name="" type="button" id="searchIdbutton"   value="查询" class="search_btn">
    	</form>    	
    </div>    
    <div class="realation_box">
    	图画在这个容器里面,点击展开查看详情
    	<br>
    	集成完成后这一块的背景色要拿掉	
    </div>
	<!-- 右边信息 -->	
    <div class="right_area_box">	
    <div class="right_area_content">
    	<div class="classify">
    		<div>
    			<div class="tab"><div>基本信息基本信息基本信息</div></div>
    			<div class="tab"><div>所属行业所属行业所属行业所属行业所属行业</div></div>
    		</div>
    		<div class="close"><div class="ico i008"></div></div>
    	</div>
    	<div class="info_box">
    		<div class="right_area">
    			<div class="details_info">    	
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务互联网、IT服务互联网、IT服务互联网、IT服务互联网、IT服务互联网、IT服务互联网、IT服务互联网、IT服务</div>
    				</div>
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务</div>
    				</div>
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务</div>
    				</div>
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务</div>
    				</div>
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务</div>
    				</div>
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务</div>
    				</div>
    				<div class="details_line">
    					<div>所属行业</div>
    					<div>互联网、IT服务</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </div> 
    </div>    
</section>
<!-- 异常提示框  --> 
<div id="infoid" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-md" role="document">
		<div  class="modal-content">
			<div class="modal-header text-warning">操作提示</div>
			<div class="modal-body" id="infocontent" > </div>
		</div>
	</div>
</div>

<script>
	$(function(){
		$('body').delegate('#searchIdinput','click',function(){
			$('.id_list').show();
			event.stopPropagation();
			return false;
		}).delegate('.id_list li','click',function(){
			$('#searchIdinput').val($(this).text());
		}).on('click',function(){
			$('.id_list').hide();
		}).delegate('.right_area_box','click',function(){
			event.stopPropagation();
			return false;
		}).delegate('.realation_box,.right_area_box .close','click',function(){
			showDetails();
		});
		
		//计算tab宽度
		$('.classify .tab').last().css('width',$('.classify').width() - $('.classify .tab')[0].clientWidth - $('.classify .close').width() - 25 - 10); //.close的margin-right=25,往右边挤10像素使得tab插入关闭图标
 	});
 	function showDetails(){
 		$('#main').toggleClass('show');
 	}
</script>

<script src="${ctx }/resources/jTopo/js/topo.js"></script>
