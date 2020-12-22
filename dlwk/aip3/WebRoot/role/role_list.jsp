<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="col-xs-8" style="padding: 0;">
	<div id="role-widget-box">
		<div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="save-role-btn">
							<i class="icon-plus mr5"></i>新增
						</a>
					</li>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="save-role-btn">
							<i class="icon-pencil mr5"></i>修改
						</a>
					</li>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="save-role-btn">
							<i class="icon-trash mr5"></i>删除
						</a>
					</li>
					<!-- <li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="save-role-btn">
							<i class="icon-group mr5"></i>配置用户
						</a>
					</li> -->
				</ul>
			</div>
		</div>
		<div id="roleInfoTableBox" style="overflow: auto;">
		<table id="roleInfoTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th></th>
					<th>序号</th>
					<th>角色名称</th>
					<th>状态</th>
					<th>描述</th>
				</tr>
			</thead>
			<tbody>
				<c:choose>
					<c:when test="${empty pageList.list}">
						<tr>
							<td colspan="5" style="color: red; text-align: center;">暂无角色信息</td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach var="list" items="${pageList.list }"
							varStatus="status">
							<tr>
								<td><label class="position-relative"> <input
										type="checkbox" value="${list.roleId }" class="ace" /> <span
										class="lbl"></span>
								</label></td>
								<td>${status.index+1}</td>
								<td>${list.roleName }</td>
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
								<td>${list.remark}</td>
							</tr>
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</tbody>
		</table>
		<dms:Paging pageList="${pageList}" />
		</div>
	</div>
</div>
<div class="col-xs-4" id="role-resource-tree-box">
		
</div>
<script>
	$(function()
	{
		AutoLayout.exec('#roleInfoTableBox',62 + 15);
		$("#edit-resource-btn").click(function()
		{
		});
		var RoleView = BaseView.extend(
		{
			el : "#role-widget-box",
			initialize : function()
			{
				this.constructor.__super__.initialize.apply(this);
			},
			events :
			{
				'click a.filter_sort_link:eq(0)' : 'addShowWin',
				'click a.filter_sort_link:eq(1)' : 'editRoleWin',
				'click a.filter_sort_link:eq(2)' : 'deleteRole',
				'click table tbody tr' : "selectRole"
			},
			selectRole : function(e)
			{
				var tr = $(e.target).parents("tr");
				var checkbox = tr.find("input[type='checkbox']");
				checkbox.prop(
				{
					checked : true
				});
				this.table.find("input[type='checkbox']").not(checkbox).prop(
				{
					checked : false
				});
				var roleId = checkbox.val();
				$("#role-resource-tree-box").load("role/resourceTree.html",
				{
					roleId : roleId
				});
			},
			//删除角色
			deleteRole : function(e)
			{
				var data = this.selectData();
				var roleId = data.id;
				$.confirm("删除该角色可能导致用户无法登录,你确定要删除该角色", function(result)
				{
					$.submitData(
					{
						url : "role/delete.json",
						data :
						{
							roleId : roleId
						},
						sucFun : function()
						{
							$.message("删除角色信息成功");
							data.tr.remove();
						}
					});
				});
			},
			//角色功能定义
			functionDefinition : function(e)
			{
				var data = this.selectData($(e.target));

				var roleName = data.tr.find("td:eq(2)").html();
				var html = '功能定义(<font color="red">' + roleName + '</font>)';
				$.modal(
				{
					url : "role/resourceTree.html",
					title : html,
					data :
					{
						roleId : data.id
					}
				});
			},
			editRoleWin : function(e)
			{
				var data = this.selectData();
				var roleId = data.id;
				$.modal(
				{
					url : "role/info.html",
					title : "编辑角色",
					data :
					{
						op : "edit",
						roleId : roleId
					}
				});
			},
			configUser : function()
			{
				$.modal(
				{
					url : "role/user/list.html",
					size : "modal-lg",
					title : "用户列表"
				});
			},
			addShowWin : function()
			{
				$.modal(
				{
					url : "role/info.html",
					title : "新增角色",

					data :
					{
						op : "add"
					}
				});
			}
		});
		new RoleView();
	});
</script>