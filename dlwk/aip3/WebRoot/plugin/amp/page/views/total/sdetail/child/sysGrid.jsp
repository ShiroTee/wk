<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!-- 关联系统 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title"><%=request.getParameter("modelTitle") %>：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-striped" >
					<thead>
						<td>系统名称</td>
						<td>拥有部门</td>
						<td>使用单位</td>
						<td>状态</td>
					</thead>
					<c:if test="${empty  syses }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${syses }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdSys?id=${item.appsys_id}" 
						class='<c:if test="${not empty searchTxt and fn:indexOf(item.appsys_nm,searchTxt)>=0}">org-text</c:if> '>
						${item.appsys_nm }</a></td>
						<td>${item.belong_to }</td>
						<td>${item.use_org_names }</td>
						<td>${item.status_name }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>