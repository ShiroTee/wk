<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="pr15">
	<div id="online-user-table-box">
		<table id="user-table" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>序号</th>
					<th>登录名</th>
					<th>姓名</th>
					<th>登录时间</th>
					<th>最后操作时间</th>
					<th>登录IP</th>
				</tr>
			</thead>
			<tbody>
				<c:choose>
					<c:when test="${empty userList}">
						<tr>
							<td colspan="5" style="color: red; text-align: center;">暂无用户信息</td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach var="list" items="${userList}" varStatus="status">
							<tr>
								<td>${status.index+1}</td>
								<td>${list.loginName }</td>
								<td>${list.name}</td>
								<td>${list.email}</td>
								<td>${list.remark }</td>
								<td>${list.tel}</td>
							</tr>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</tbody>
		</table>
	</div>
</div>