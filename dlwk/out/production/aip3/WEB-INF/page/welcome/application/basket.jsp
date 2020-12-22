<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:mdpHeader title="成功加入资源车-信息资产管理平台V3.0"  curItem=""/>
<section class="main_page">
	<div class="box m20_0 p0_30">
		<div style="text-align: center;margin-top: 100px;height: 124px;font-size: 16px;">
			<img style="margin-bottom: 3px;height: 22px;margin-right: 10px;" src="${ctx}/page/welcome/application/images/right.png">
			所选资源已成功加入资源车 !&nbsp;
			<input type="button" style="cursor: pointer; width: 120px;font-size: 14px;" value="去申请" class="search_sm_submit" 
				onclick="myBasket();">
		</div>
	</div>
</section>
<script>
	function myBasket(){
		location.href= ctx + '/mdp/welcome/application/my_basket.html';
	}
</script>
<mdp:mdpFooter />



