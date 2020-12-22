<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="am-fr">
	<ul class="am-pagination pagingCls" id="pageTest" style="margin-top: 2px;"
		pageCount="${pageCount }" pageSize="${pageSize }">
		<c:forEach begin="1" end="${pageSize }" step="1" var="page">
			<c:choose>
				<c:when test="${page=='1'}">
					<li class="am-active"><a href="#" style="margin-right: 0px;">1</a></li>
				</c:when>
				<c:otherwise>
					<li><a href="#" style="margin-right: 0px;">${page }</a></li>
				</c:otherwise>
			</c:choose>
		</c:forEach>
		<c:if test="${pageCount>pageSize}">
			<li><a href="#" style="margin-right: 0px;">下一页</a></li>
			<li><a href="#" style="margin-right: 0px;">尾页</a></li>
		</c:if>
	</ul>
</div>