<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!-- 信息资源元数据组成 -->
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
						<td>元数据名称</td>
						<td>拼音标识</td>
						<td>数据类型</td>
						<td>备注</td>
					</thead>
					<c:if test="${empty  dataeles }">
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					</c:if>
					<c:forEach items="${dataeles }" var="item">
					<tr>
						<td><a href="${ctx }/mdp/amp/cvpTotalHandler/sdEle?id=${item.ele_id}" 
						class='<c:if test="${not empty searchTxt and fn:indexOf(item.ele_nm,searchTxt)>=0}">org-text</c:if> '>
						${item.ele_nm }</a></td>
						<td>${item.py_cd }</td>
						<td>${item.data_typ }</td>
						<td>${item.remark }</td>
					</tr>
					</c:forEach>
				</table>
			</div>
		</div>
	</div>
</div>