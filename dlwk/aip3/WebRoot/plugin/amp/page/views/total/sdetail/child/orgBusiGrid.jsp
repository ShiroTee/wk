<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!-- 关联业务事项 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">办理事项：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-bordered table-striped" >
					<thead>
						<td>业务事项名称</td>
						<td>事项编号</td>
						<td>事项类型</td>
						<td>服务对象</td>
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
						<td>
							<a href="${ctx }/mdp/amp/cvpTotalHandler/sdBusi?id=${item.id}"
							 class='<c:if test="${not empty searchTxt and fn:indexOf(item.name,searchTxt)>=0}">org-text</c:if> '>
							 ${item.name }</a>
						</td>
						<td>${item.busi_no }</td>
						<td>${item.busiTypeName }</td>
						<td>${item.serv_obj }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>