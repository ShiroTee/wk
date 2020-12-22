<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:mdpHeader title="提交成功-信息资产管理平台V3.0"  curItem=""/>
<style>
	a[data-type="myTodoList"]{
		color: #337ab7;
	}
	a[data-type="myTodoList"]:hover{
		color:#23527c;
	}
</style>
<section class="main_page">
	<div class="box m20_0 p0_30">
		<div style="text-align: center;margin-top: 80px;height: 144px;font-size: 16px;line-height: 40px;">
			<img style="margin-bottom: 10px;height: 22px;margin-right: 10px;" src="${ctx}/page/welcome/application/images/right.png">
			您申请的资源已提交! 可在
			<input type="button" style="cursor: pointer; width: 120px;font-size: 15px;line-height: 20px;" value="我的需求" class="search_sm_submit" 
				onclick="myApplication();" data-type="myApplication">
			中查看<br>
			<!-- <a href="javascript:void(0);" onclick="myApplication();"  data-type="myTodoList">温馨提示：您当前有<span>0</span>条待办事项，现在就去处理></a> -->
		</div>
		
	</div>
</section>
<script>
	function myApplication(){
		var type = $(event.target).attr('data-type');
		location.href= ctx + '/mdp/admin/application/myTodoList.html?type=' + type;
	}
</script>
<mdp:mdpFooter />



