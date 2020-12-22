<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!-- 关联业务事项 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">下级部门：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-striped" >
					<thead>
						<td>组织机构名称</td>
						<td>组织机构编码</td>
						<td>负责人</td>
						<td>联系人</td>
					</thead>
					<c:if test="${empty  orgs }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${orgs }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdOrg?id=${item.id}"
						class='<c:if test="${not empty searchTxt and fn:indexOf(item.name,searchTxt)>=0}">org-text</c:if> '>
						${item.name }</a></td>
						<td>${item.orgcode }</td>
						<td>${item.leader }</td>
						<td>${item.ctc_psn }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>