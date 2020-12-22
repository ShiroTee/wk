<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="widget-box" style="border: 0px;">
	<div class="widget-header widget-header-flat">
		<div class="widget-toolbar no-border" style="float: left;">
			<c:if test="${op=='edit' }">
				<button class="btn btn-info btn-xs" orgId="${orgId}"
					id="org-user-save-btn"
					<shiro:lacksPermission name="USER:ADD">disabled="disabled"</shiro:lacksPermission>>
					<i class="icon-plus"></i> 添加用户</button>
				<button orgId="${orgId}" disabled="disabled"
					class="btn btn-info btn-xs" id="org-user-remove-btn"
					<shiro:lacksPermission name="USER:ADD">disabled="disabled"</shiro:lacksPermission>>
					<i class="icon-minus"></i> 移除用户</button>
			</c:if>
			<c:if test="${op=='add' }">
				<button class="btn btn-xs" orgId="${orgId}" id="org-user-return-btn">
					<i class="icon-reply icon-only"></i>&nbsp;返回&nbsp;
				</button>
				<button disabled="disabled" class="btn btn-info btn-xs"
					orgId="${orgId}" id="org-user-save-sbtn"
					<shiro:lacksPermission name="USER:ADD">disabled="disabled"</shiro:lacksPermission>><i class="icon-plus"></i>&nbsp;添加&nbsp;</button>
			</c:if>
		</div>
		<c:if test="${op=='add' }">
			<div class="widget-toolbar no-border">
				<span class="input-icon"> <input type="text"
					placeholder="登录名 姓名 " class="nav-search-input"
					id="org-user-search-text" value="${searchWord}"> <i
					class="icon-search nav-search-icon" style="top: 4px;"></i>
				</span>
				<button class="btn btn-xs btn-info"
					style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 2px;"
					id="org-user-search-btn" orgId="${orgId}">
					<i class="icon-search nav-search-icon"></i>搜索
				</button>
			</div>
		</c:if>
	</div>
	<div class="widget-body fw_panel_body" style="border: 0px;">
		<table
			class="table table-bordered table-hover table-condensed table-striped"
			id="org-user-table" style="margin-bottom: 0px;">
			<thead>
				<tr>
					<th><input type="checkbox" /></th>
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
								<td><input type="checkbox" value="${list.userId }" /></td>
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
										<a class="red" href="#" title="移出用户" userId="${list.userId }">
											<i class="icon-trash bigger-130"></i>
										</a>
									</div>

								</td>
							</tr>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</tbody>
		</table>
		<c:if test="${userList.count>20 }">
			<div id="org-user-page" class="m-pagination"
				style="margin-top: 0px; float: right;" total="${userList.count}"
				pageIndex="${userList.pageIndex }"></div>
		</c:if>
	</div>
</div>
<div class="modal fade" tabindex="-1" style="z-index: 2000;"
		id="org-user-list-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="panel panel-primary" style="margin-bottom: 0px;">
					<div class="panel-heading">
						<span>用户列表</span><i class="icon-remove"
							style="float: right; cursor: pointer;" title="关闭窗口"
							data-toggle="modal" data-target="#org-user-list-modal"></i>
					</div>
					<div class="panel-body"
						style="position: relative; padding-top: 0px; padding-left: 0px; padding-right: 0px; padding-bottom: 0px;">
						<i class="icon-spinner icon-spin orange bigger-125"
							style="margin-top: 100px; margin-bottom: 100px; margin-left: 270px;"></i>页面加载中...
					</div>
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript" src="${ctx }/orginfo/js/user_list.js"></script>