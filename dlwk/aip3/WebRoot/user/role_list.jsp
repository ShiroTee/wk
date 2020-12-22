<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="widget-box" id="user-roles-widget-box" userId="${userId }">
	<div class="widget-header widget-header-flat">
		<div class="widget-toolbar no-border" style="float: left;">
			<c:choose>
				<c:when test="${op==1 }">
					<button class="btn btn-danger btn-xs">
						<i class="icon-trash"></i>删除角色
					</button>
				</c:when>
				<c:otherwise>
					<button class="btn btn-info btn-xs">
						<i class="icon-plus"></i>添加角色
					</button>
				</c:otherwise>
			</c:choose>


		</div>
	</div>
	<div class="widget-body fw_panel_body">
		<table
			class="table table-bordered table-hover table-condensed table-striped"
			style="margin-bottom: 0px;">
			<thead>
				<tr>
					<th><label class="position-relative"> <input
							type="checkbox" class="ace"> <span class="lbl"></span>
					</label></th>
					<th>角色名称</th>
					<th>描述</th>
				</tr>
			</thead>
			<tbody>
				<c:choose>
					<c:when test="${empty roles}">
						<tr>
							<td colspan="3" style="color: red; text-align: center;">暂无角色信息</td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach var="list" items="${roles }">
							<tr>
								<td><label class="position-relative"> <input
										type="checkbox" class="ace" value="${list.roleId}"> <span
										class="lbl"></span>
								</label></td>
								<td>${list.roleName }</td>
								<td>${list.remark }</td>
							</tr>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</tbody>
		</table>
	</div>
</div>
<script>
	$(function()
	{
		var UserRoleView = BaseView.extend(
		{
			el : "#user-roles-widget-box",
			multiple : true,
			initialize : function()
			{
				this.constructor.__super__.initialize.apply(this);
				this.userId = this.$el.attr("userId");
			},
			events :
			{
				'click thead input[type="checkbox"]' : 'selectAll',
				'click button.btn-danger' : "deleteRoles",
				'click button.btn-info' : "addRoles"
			},
			addRoles : function()
			{
				var roles = this.selectData();
				var userId = this.userId;
				var list=[];
				for (var i = 0; i < roles.length; i++)
				{
					list.push(roles[i].id);
				}
				$.submitData(
				{
					url : "user/roles/add.json",
					type : "post",
					data :
					{
						userId : userId,
						roles : list.join(",")
					},
					sucFun : function()
					{
						$.closeModal();
						$.message("添加用户角色成功");
					}
				});
			},
			deleteRoles : function()
			{
				var roles = this.selectData();
				var list = [];
				var userId = this.userId;
				for (var i = 0; i < roles.length; i++)
				{
					list.push(roles[i].id);
				}
				$.submitData(
				{
					url : "user/roles/delete.json",
					type : "post",
					data :
					{
						userId : userId,
						roles : list.join(",")
					},
					sucFun : function()
					{
						$.closeModal();
						$.message("删除用户角色成功");
					}
				});
			},
			selectAll : function(e)
			{
				var checkbox = $(e.target);
				var arrays = this.table.find("tbody input[type='checkbox']");
				if (checkbox.is(":checked"))
				{
					arrays.prop(
					{
						checked : true
					});
				} else
				{
					arrays.prop(
					{
						checked : false
					});
				}
			},
		});
		new UserRoleView();
	});
</script>