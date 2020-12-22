<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<mdp:mdpHeader title="企业画像"  curItem="information" hideHead="true"/>
<link rel="stylesheet" href="${ctx }/page/welcome/corporatePortrait/css/index.css"/>
<link rel="stylesheet" href="${ctx }/page/welcome/corporatePortrait/css/details.css"/>
<script src="${ctx }/resources/ace/assets/js/bootstrap.min.js"></script>
<style>
 
text {
  font: 10px sans-serif;
}
 
/* .link {
  fill: none;
  stroke: #007D7F;
  stroke-opacity: 0.4;
  stroke-width: 8.5px;
}
.link2{
     display: none; 
} */
</style>
<section id="main" >	
	<!-- 左边基本信息 -->
	<div class="left_area">
		<!-- <input name="" type="button" data-modecode="PORTRAIT" value="模型" class="show_model"> -->
		<form class="search_box">
        	<div class="search_left">
            	<input name="" id="bpsearchIdinput" type="text" placeholder="请输入统一社会信息代码或公司注册号" class="search_input"  value="<%=request.getParameter("id") %>" >
            	 
        	</div>
        	<input name="" type="button" id="searchIdbutton" onclick="searchBusiness();"   value="查询" class="search_btn">
    	</form>    	
    </div>    
    <div class="realation_box business_portrait">
    	
    </div>
	<!-- 右边信息 -->	
    <div class="right_area_box">	
    <div class="right_area_content show">
    	<div class="classify" >
    		<div>
    			<div class="tab" ><div class="nodetitle">基本信息基本信息基本信息</div></div>
    			
    		</div>
    		<div class="close" onclick="$('#main').removeClass('show');"><div class="ico i008"></div></div>
    	</div>
    	<div class="info_box">
    		<div class="right_area">
    			<div class="details_info">    	
                   
 
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
			//showDetails();
		});
		
		//计算tab宽度
		//$('.classify .tab').last().css('width',$('.classify').width() - $('.classify .tab')[0].clientWidth - $('.classify .close').width() - 25 - 10); //.close的margin-right=25,往右边挤10像素使得tab插入关闭图标
 	});
 	
 	function showDetails(){
 	 	
 		$('#main').addClass('show');
 	}
 	function hideDetails(){
 		 
 		$('#main').removeClass('show');
 	}
</script>
<script  src="${ctx }/page/admin/datamodel/d3.js" ></script>
<%-- <script  src="${ctx }/page/admin/datamodel/layerTreeData.js" ></script> --%>
<script  src="${ctx }/page/admin/datamodel/layerTree.js" ></script>
<script  src="${ctx }/page/admin/datamodel/businessPortrait.js" ></script>
