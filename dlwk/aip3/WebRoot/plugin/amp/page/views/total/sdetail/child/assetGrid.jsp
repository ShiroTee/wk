<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!-- 信息系统需求信息资源 -->
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
						<td>资源名称</td>
						<td>资源提供方</td>
						<td>资源发布日期</td>
						<td>共享级别</td>
					</thead>
					<c:if test="${empty  assets }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${assets }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdAsset?id=${item.id}" 
						class='<c:if test="${not empty searchTxt and fn:indexOf(item.name,searchTxt)>=0}">org-text</c:if> '>
						${item.name }</a></td>
						<td>${item.provider }</td>
						<td>${item.pub_dt }</td>
						<td>${item.pub_lv }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>