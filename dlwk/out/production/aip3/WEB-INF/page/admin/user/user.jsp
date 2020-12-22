<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<mdp:mdpAdminHeader title="用户管理"/>
<link rel="stylesheet" href="${ctx }/page/admin/user/css/user.css" />
<!-- 导航菜单 -->
<%@include file="../../common/admin-nav.jsp" %>
<!-- 页面内容区域开始  -->
<div class="container">
	<div class="row">
		<div class="col-md-12">
			<table id="table_user" class="table table-bordered table-hover table-striped table-responsive">
				<thead>
					<tr>
						<th field="userId">用户ID</th>
						<th field="loginName">登录名</th>
						<th field="userName">用户名</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
            </table>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<%@include file="../../common/pagination.jsp" %>
		</div>
	</div>
</div>
<!-- 页面内容区域结束  -->
<mdp:mdpAdminFooter />
<script type="text/javascript" src="${ctx }/page/admin/user/js/user.js"></script>
