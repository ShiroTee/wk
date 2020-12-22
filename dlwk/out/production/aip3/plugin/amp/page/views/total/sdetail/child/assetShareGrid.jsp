<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 共享情况 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">共享情况：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				<span>共享级别：${assetData.pub_name}</span>
			</div>
			<div class="col-md-4">
				<span>保密级别：${assetData.serc_name}</span>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-striped" >
					<thead>
						<td>申请部门</td>
						<td>申请科室</td>
						<td>公开情况</td>
						<td>所在主题</td>
					</thead>
					<c:if test="${empty  assetShares }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${assetShares }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdOrg?id=${item.org_id}">${item.parent_org_name }</a></td>
						<td>${item.org_nm }</td>
						<td>${item.pub_lv }</td>
						<td>${item.sbj_nm }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>