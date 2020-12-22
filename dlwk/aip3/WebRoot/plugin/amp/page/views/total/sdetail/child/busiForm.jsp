<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 信息资源详情 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">业务事项描述：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				事项类型：${busiData.busitypename}
			</div>
			<div class="col-md-4">
			        上级业务：${busiData.parentbusiname}
			</div>
			<div class="col-md-4">
			   业务机构：<a href="${ctx }/mdp/amp/cvpTotalHandler/sdOrg?id=${busiData.org_id}">${busiData.org_nm}</a>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				办理主体：${busiData.main_body}
			</div>
			<div class="col-md-4">
			        服务对象：${busiData.serv_obj}
			</div>
			<div class="col-md-4">
			   重要程度：${busiData.importantname}
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				应用系统：${busiData.appsys_nm}
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				业务描述：${busiData.busi_desc}
			</div>
		</div>
	</div>
</div>