<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!-- 关联业务事项 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">关联业务事项：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-striped" >
					<thead>
						<td>业务事项名称</td>
						<td>相关处室</td>
						<td>相关部门</td>
					</thead>
					<c:if test="${empty  busies }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${busies }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdBusi?id=${item.busi_id}">${item.busi_nm }</a></td>
						<td>${item.org_nm }</td>
						<td>${item.detp_nm }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>