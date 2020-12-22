<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>
<div class="modal-content">
	<div class="modal-header">
		<h4 class="modal-title">
			<div class="row">
				<div class="col-sm-3">
					<span class="glyphicon glyphicon-plus"></span>添加用户 <input
						id="groupId" type="hidden">
				</div>
				<div class="col-sm-6">
					<div class="input-group input-group-sm">
						<span class="input-group-addon"><span
							class="glyphicon glyphicon-th-list"></span> </span> <input
							id="userGroupAdd-searchUser" type="text" class="form-control"
							placeholder="按用户名，联系电话，昵称过滤..."> <span
							class="input-group-btn">
							<button id="userGroupAdd-searchUserBtn" class="btn btn-primary no-disabled"
								type="button">
								<span class="glyphicon glyphicon-search"></span>查询
							</button>
						</span>
					</div>
				</div>
			</div>

		</h4>
	</div>
	<div class="widget-body fw_panel_body" id="userGroup-userList">
		<table id="non-users" class="table table-bordered table-hover table-condensed" style="margin-bottom: 0px;">
			<thead>
				<tr class="info">
					<th></th>
					<th>用户名</th>
					<th>昵称</th>
					<th>手机号</th>
					<!-- <th field="email">邮箱</th> -->
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<%@include file="../../../common/admin-pagination.jsp"%>
	</div>
	<div class="modal-footer">
		<div class="row">
			<div class="col-md-4 col-md-offset-8">
				<button id="userGroup-selectUser" type="button" class="btn btn-info">添加</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript"
	src="${ctx }/page/admin/group/userGroup/js/userGroup-addUser.js"></script>