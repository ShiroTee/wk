<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="dms" tagdir="/WEB-INF/tags"%>
<div id="user-widget-box" class="mr15">
	<div class="clearfix box inline_any mb20" style="width:100%;">
		<div class="filter_sort clearfix">
			<ul>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link">
						<i class="icon-plus mr5"></i>新增用户
					</a>
				</li>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link">
						<i class="icon-undo mr5"></i>重置密码
					</a>
				</li>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link">
						<i class="icon-trash mr5"></i>删除用户
					</a>
				</li>
				<li class="filter_sort_li" style="position: relative;">
					<a href="javascript:void(0);" class="filter_sort_link"  data-toggle="dropdown">
						分配角色 <i class="icon-angle-down icon-on-right"></i>
					</a>
					<ul class="dropdown-menu dropdown-success pull-right">
						<li><a href="#">增加用户角色</a></li>	
						<li><a href="#">删除用户角色</a></li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="l pl20 clearfix" style="line-height:40px;">
			<div class="inline_any">
				<input type="text" placeholder="登录名 姓名 电话"
					class="nav-search-input search_sm_input ml5 mt10 mr20" style="width:160px;" value="${searchWord}">
				<!-- <i class="icon-search nav-search-icon" style="top: 4px;"></i> -->
			</div>			
			<input type="button"  value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">
			<!-- <button class="btn btn-xs btn-info search-btn"
				style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 2px;">
				<i class="icon-search nav-search-icon"></i>搜索
			</button> -->
		</div>
	</div>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
		<thead>
			<tr>
				<th><label class="position-relative"> <input
						type="checkbox" value="${list.userId}" class="ace"> <span
						class="lbl"></span>
				</label></th>
				<th>序号</th>
				<th>登录名</th>
				<th>姓名</th>
				<th>联系电话</th>
				<th>所属机构/部门</th>
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
							<td><label class="position-relative"> <input
									type="checkbox" value="${list.userId}" class="ace"> <span
									class="lbl"></span>
							</label></td>
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
									<c:when test="${empty list.orgName }">
										<font color="red">无</font>
									</c:when>
									<c:otherwise>
										${list.orgName }
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
<script>
	$(function()
	{
		var UserView = BaseView.extend(
		{
			el : "#user-widget-box",
			multiple : true,
			url:"user/list.html",
			initialize : function()
			{
				this.constructor.__super__.initialize.apply(this);
				this.doSearch(this.search);
			},
			search : function(searchWord)
			{
				workspace.reload("user/list.html",
				{
					searchWord : searchWord
				});
			},
			events :
			{
				'click a.filter_sort_link:eq(0)' : 'addUserWin',
				'click thead input[type="checkbox"]' : 'selectAll',
				'click a.filter_sort_link:eq(1)' : 'doResetPassword',
				'click a.filter_sort_link:eq(2)' : 'doDeleteUser',
				'click table tbody td a.blue' : 'toggle',
				'click table tbody td a.green' : 'editUserWin',
				'click ul.dropdown-menu li:eq(1) a' : 'getUserRoles',
				'click ul.dropdown-menu li:eq(0) a' : 'getNotUserRoles'
			},
			//获取用户未添加的角色列表
			getNotUserRoles:function()
			{
				var data = this.selectData();
				if(data.length!=1)
				{
					$.message("只能对一条数据进行操作");
					return false;
				}
				var userId = data[0].id;
				$.modal(
				{
					url : "user/roles.html",
					title : "添加角色",
					data :
					{
						userId :userId,
						op:"0"
					}
				});
			},
			//获取已经添加的用户角色列表
			getUserRoles : function()
			{
				var data = this.selectData();
				if(data.length!=1)
				{
					$.message("只能对一条数据进行操作");
					return false;
				}
				var userId = data[0].id;
				
				$.modal(
				{
					url : "user/roles.html",
					title : "删除角色",
					data :
					{
						userId :userId,
						op:"1"
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
			toggle : function(e)
			{
				var el = $(e.target);
				var data = this.selectData(el);
				var userId = data[0].id;
				var tr = el.parents("tr");
				if (el.hasClass("icon-pause"))
				{
					el.parent().attr("title", "启用");
					tr.find("td:eq(6) span").html("禁用");
				} else
				{
					el.parent().attr("title", "禁用");
					tr.find("td:eq(6) span").html("启用");
				}
				$.submitData(
				{
					url : "user/toggle.json",
					data :
					{
						userId : userId
					},
					sucFun : function()
					{
						el.toggleClass("icon-pause icon-play-circle");
						tr.find("td:eq(6) span").toggleClass(
								"label-danger label-success");
					}
				});

			},
			editUserWin : function(e)
			{
				var data = this.selectData($(e.target));
				var userId = data[0].id;
				$.modal(
				{
					url : "user/info.html",
					title : "编辑用户信息",
					size:"modal-lg",
					data :
					{
						op : "edit",
						userId : userId
					}
				});
			},
			//显示添加用户窗口
			addUserWin : function()
			{
				$.modal(
				{
					url : "user/info.html",
					title : "新增用户",
					size:"modal-lg",
					data :
					{
						op : "add"
					}
				});
			},
			//重置密码
			doResetPassword : function()
			{
				var data = this.selectData();
				if (data.length != 1)
				{
					$.message("只能对一条数据进行操作");
					return;
				}
				userId = data[0].id;
				$.confirm("您确定要重置该用户密码吗?", function()
				{
					$.submitData(
					{
						url : "user/reset.json",
						data :
						{
							userId : userId
						},
						sucFun : function()
						{
							$.message("密码已重置为123456");
						}
					});
				});
			},
			//删除用户
			doDeleteUser : function()
			{
				var data = this.selectData();
				var multiple = this.multiple;
				var userId = null;
				//多选
				if (multiple)
				{
					var list = [];
					for (var i = 0; i < data.length; i++)
					{
						list.push(data[i].id);
					}
					userId = list.join(",");
				} else
				{
					userId = data.id;
				}
				$.confirm("您确定要删除该用户吗?", function()
				{
					$.submitData(
					{
						url : "user/delete.json",
						data :
						{
							userId : userId,
							multiple : multiple
						},
						sucFun : function()
						{
							$.message("删除用户成功");
							if (multiple)
							{
								for (var i = 0; i < data.length; i++)
								{
									data[i].tr.remove();
								}
							} else
							{
								data.tr.remove();
							}

						}
					});
				});
			}

		});
		var userView = new UserView();

	});
</script>