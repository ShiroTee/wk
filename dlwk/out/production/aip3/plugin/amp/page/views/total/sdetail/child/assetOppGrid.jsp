<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 信息系统产出信息资源 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">资源提供：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-striped" >
					<thead>
						<td>资源名称</td>
						<td>资源提供方</td>
						<td>资源发布日期</td>
						<td>共享级别</td>
					</thead>
					<c:if test="${empty  sysOpps }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${sysOpps }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdAsset?id=${item.asset_id}">${item.asset_name }</a></td>
						<td>${item.opp_org_name }</td>
						<td>${item.pub_dt }</td>
						<td>${item.pub_lv_name }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>