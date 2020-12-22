<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="widget-box" id="role-user-widget-box">
	<div class="widget-header widget-header-flat">
		<div class="widget-toolbar no-border" style="float: left;">
			<button class="btn btn-info btn-xs">
				<i class="icon-plus"></i>新增用户
			</button>
			<button class="btn btn-danger btn-xs">
				<i class="icon-trash"></i>删除用户
			</button>
		</div>
		<div class="widget-toolbar no-border">
			<span class="input-icon"> <input type="text"
				placeholder="登录名 姓名 电话 邮箱" class="nav-search-input"
				value="${searchWord}"> <i
				class="icon-search nav-search-icon" style="top: 4px;"></i>
			</span>
			<button class="btn btn-xs btn-info search-btn"
				style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 2px;">
				<i class="icon-search nav-search-icon"></i>搜索
			</button>
		</div>
	</div>
	<div class="widget-body fw_panel_body">
		<table
			class="table table-bordered table-hover table-condensed table-striped"
			style="margin-bottom: 0px;">
			<thead>
				<tr>
					<th></th>
					<th>序号</th>
					<th>登录名</th>
					<th>姓名</th>
					<th>联系电话</th>
					<th>电子邮箱</th>
					<th>状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:choose>
					<c:when test="${empty userList.list}">
						<tr>
							<td colspan="8" style="color: red; text-align: center;">暂无用户信息</td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach var="list" items="${userList.list }" varStatus="status">
							<tr>
								<td><input type="checkbox" value="${list.userId}"></td>
								<td>${status.index+1}</td>
								<td>${list.loginName }</td>
								<td>${list.name}</td>
								<td><c:choose>
										<c:when test="${empty list.tel }">
											<font color="red">无</font>
										</c:when>
										<c:otherwise>
											${list.tel }
										</c:otherwise>
									</c:choose></td>
								<td><c:choose>
										<c:when test="${empty list.email }">
											<font color="red">无</font>
										</c:when>
										<c:otherwise>
											${list.email }
										</c:otherwise>
									</c:choose></td>
								<td><c:choose>
										<c:when test="${list.status==1 }">
											<span
												class='label label-sm label-success arrowed arrowed-righ'>启用</span>
										</c:when>
										<c:otherwise>
											<span
												class='label label-sm label-danger arrowed arrowed-righ'>禁用</span>
										</c:otherwise>
									</c:choose></td>
								<td>
									<div
										class="visible-md visible-lg hidden-sm hidden-xs action-buttons">
										<a class="green" href="#" title="编辑" userId="${list.userId }">
											<i class="icon-pencil bigger-130"></i>
										</a>
										<c:choose>
											<c:when test="${list.status==1 }">
												<a class="blue" href="#" title="禁用" userId="${list.userId }">
													<i class="icon-pause bigger-130"></i>
												</a>
											</c:when>
											<c:otherwise>
												<a class="blue" href="#" title="启用" userId="${list.userId }">
													<i class="icon-play-circle bigger-130"></i>
												</a>
											</c:otherwise>
										</c:choose>
									</div>

								</td>
							</tr>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</tbody>
		</table>
		<dms:Paging pageList="${userList }" />
	</div>
</div>
<script>
	$(function()
	{
	
	});
</script>