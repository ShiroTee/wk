<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<style>
<!--
.steps {
	float: none;
	margin: 0 auto;
}
.steps li {
	float: left;
	width: 150px;
	list-style: none;
	text-align: center;
}

.steps .step {
	border-radius: 50%;
	border: solid 1px green;
	width: 50px;
	height: 50px;
	display: block;
	text-align: center;
	padding-top: 13px;
	margin-left: 75px;
}

.steps .title {
	position: relative;
	z-index: 1000;
	top: 1px;
	display: block;
	width: 100%;
	margin-left: 25px;
}

.arrow-right {
	display: block;
	width: 0;
	height: 0;
	border-top: 5px solid transparent;
	border-left: 10px solid green;
	border-bottom: 5px solid transparent;
	position: relative;
}

.arrow-line {
	position: relative;
	width: 100px;
	border-top: 1px solid green;
	height: 1px;
	display: block;
}
-->
</style>
<!-- 配置流程信息 -->

<div class="" id="process-config-info">
	<div class="con_tit" style="padding:0 !important;    margin-top: -10px;">
		配置流程岗位信息【${process.displayName}】
		<div class="widget-toolbar" style="margin-top: 6px;">
			<a id="gobackList" href="javascript:void(0)">返回</a>
		</div>
	</div>
	<div class="panel-body box mb10" style="overflow-y: hidden; overflow-x: auto;">
		<div id="lineid"></div>
		<ul class="steps">
			<c:forEach var="vlist" items="${list }" varStatus="status">
				<li data-step="${status.index+1}" class="active" name="${vlist.name }"><c:choose>
						<c:when test="${vlist.name =='adminApproval'}">
							<span style="cursor: pointer;" class="step">${status.index+1}</span>
							<span class="title">${vlist.displayName }</span>
					   <%-- (<span>${adminApproval!=null?fn:length(adminApproval):0 }</span>个岗位已设置) --%>
					  </c:when>
						<c:when test="${vlist.name =='reousrceOwnerApproval'}">
							<span style="cursor: pointer;" class="step">${status.index+1}</span>
							<span class="title">${vlist.displayName }</span>  
					   <%-- ( <span>${reousrceOwnerApproval!=null?fn:length(reousrceOwnerApproval):0 }</span>个岗位已设置) --%>
					  </c:when>
						<c:when test="${vlist.name =='grantAuthorization'}">
							<span style="cursor: pointer;" class="step">${status.index+1}</span>
							<span class="title">${vlist.displayName }</span>
					  <%--  ( <span>${grantAuthorization!=null?fn:length(grantAuthorization):0 }</span>个岗位已设置) --%>
					  </c:when>
						<c:otherwise>
							<span class="step">${status.index+1}</span>
							<span class="title">${vlist.displayName }</span>
						</c:otherwise>
					</c:choose></li>
			</c:forEach>
		</ul>
	</div>
</div>

<!-- admin审批 -->
<div class="panel box" style="display: none;" name="adminApproval" id="config-actor-adminApproval">
	<div class="panel-heading" style="font-size: 16px;border-bottom-color: #e0e0e0;">任务配置</div>
	<div class="panel-body" style="padding-top: 0;">
		<div style="width: 100%;text-align: right;padding-right: 35px;margin-top: -35px;margin-bottom: 15px;">
			<button class="btn btn-primary  center-block btn-xs approvalsave admin" type="button" processId="${process.id }">保存</button>
		</div>
		<div class="bs-example bs-example-tabs" data-example-id="togglable-tabs">
			<div>
				<div class="" style="width: 48%; float: right;" id="adminPost">
					<h5>已选择组</h5>
					<div>
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl object-user">
							<thead>
								<th>组名称</th>
								<th>操作</th>
							</thead>
							<tbody class="roleselected">
								<c:if test="${!empty adminApproval}">
									<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">

										<c:if test="${fn:contains(adminApproval,postBean.groupId)}">
											<tr>
												<td>${postBean.groupName}</td>
												<td>
													<button class="btn btn-xs btn-danger admincss" title="删除岗位" postId="${postBean.groupId }">
														<i class="glyphicon glyphicon-minus"></i>
													</button>
												</td>
											</tr>

										</c:if>

									</c:forEach>
								</c:if>
							</tbody>
						</table>
					</div>
				</div>
				<div class="" style="width: 48%; float: left;" id="noAdminPost">
					<h5>可选择组</h5>
					<div >
						<table  width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl object-user">
							<thead>
								<th>组名称</th>
								<th>操作</th>
							</thead>
							<tbody class="rolenotselected">
								<c:if test="${!empty adminApproval}">
									<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">

										<c:if test="${!fn:contains(adminApproval,postBean.groupId)}">
											<tr>
												<td>${postBean.groupName}</td>
												<td>
													<button class="btn btn-xs btn-success admin" postId="${postBean.groupId }" title="添加岗位">
														<i class="glyphicon glyphicon-plus"></i>
													</button>
												</td>
											</tr>

										</c:if>

									</c:forEach>
								</c:if>
								<c:if test="${empty adminApproval}">
									<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">
										<tr>
											<td>${postBean.groupName}</td>
											<td>
												<button class="btn btn-xs btn-success admin" postId="${postBean.groupId }" title="添加岗位">
													<i class="glyphicon glyphicon-plus"></i>
												</button>
											</td>
										</tr>


									</c:forEach>
								</c:if>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<!-- 配置审批岗位 -->
<div class="panel box" style="display: none;" id="config-actor-reousrceOwnerApproval" name="reousrceOwnerApproval">
	<div class="panel-heading" style="font-size: 16px;border-bottom-color: #e0e0e0;">任务配置</div>
	<div class="panel-body" style="padding-top: 0;">
		<div style="width: 100%;text-align: right;padding-right: 35px;margin-top: -35px;margin-bottom: 15px;">
			<button class="btn btn-primary  center-block btn-xs approvalsave owner" type="button" processId="${process.id }">保存</button>
		</div>
		<div>
			<div class="" id="ownerPost" style="width: 48%; float: right;">
				<h5>已选择组</h5>
				<div>
					<table  width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl object-user">
						<thead>
							<th>组名称</th>
							<th>操作</th>
						</thead>
						<tbody class="roleselected">
							<c:if test="${!empty reousrceOwnerApproval}">
								<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">

									<c:if test="${fn:contains(reousrceOwnerApproval,postBean.groupId)}">
										<tr>
											<td>${postBean.groupName}</td>
											<td>
												<button class="btn btn-xs btn-danger ownercss" title="删除岗位" postId="${postBean.groupId }">
													<i class="glyphicon glyphicon-minus"></i>
												</button>
											</td>
										</tr>

									</c:if>

								</c:forEach>
							</c:if>
						</tbody>
					</table>
				</div>
			</div>


			<div class="" id="noOwnerPost" style="width: 48%; float: left;">
				<h5>可选择组</h5>
				<div>

					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl object-user">
						<thead>
							<th>组名称</th>
							<th>操作</th>
						</thead>
						<tbody class="rolenotselected">
							<c:if test="${!empty reousrceOwnerApproval}">
								<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">

									<c:if test="${!fn:contains(reousrceOwnerApproval,postBean.groupId)}">
										<tr>
											<td>${postBean.groupName}</td>
											<td>
												<button class="btn btn-xs btn-success owner" postId="${postBean.groupId }" title="添加岗位">
													<i class="glyphicon glyphicon-plus"></i>
												</button>
											</td>
										</tr>

									</c:if>

								</c:forEach>
							</c:if>
							<c:if test="${empty reousrceOwnerApproval}">
								<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">
									<tr>
										<td>${postBean.groupName}</td>
										<td>
											<button class="btn btn-xs btn-success owner" postId="${postBean.groupId }" title="添加岗位">
												<i class="glyphicon glyphicon-plus"></i>
											</button>
										</td>
									</tr>


								</c:forEach>
							</c:if>
						</tbody>
					</table>
				</div>
			</div>

		</div>
	</div>

</div>
<!-- 授权人分配 -->
<div class="panel box" name="grantAuthorization" style="display: none;" id="config-actor-grantAuthorization">
	<div class="panel-heading" style="font-size: 16px;border-bottom-color: #e0e0e0;">任务配置</div>
	<div class="panel-body" style="padding-top: 0;">
		<div style="width: 100%;text-align: right;padding-right: 35px;margin-top: -35px;margin-bottom: 15px;">
			<button class="btn btn-primary  center-block btn-xs approvalsave author" type="button" processId="${process.id }">保存</button>
		</div>
		<div class="bs-example bs-example-tabs" data-example-id="togglable-tabs">

			<div>
				<div class="" style="width: 48%; float: right;" id="selectedItems">
					<h5>已选择组</h5>
					<div>
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl object-user">
							<thead>
								<th>组名称</th>
								<th>操作</th>
							</thead>
							<tbody class="roleselected">
								<c:if test="${!empty grantAuthorization}">

									<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">
										<c:if test="${fn:contains(grantAuthorization,postBean.groupId)}">
											<tr>
												<td>${postBean.groupName}</td>
												<td>
													<button class="btn btn-xs btn-danger authorcss" postId="${postBean.groupId }" title="删除岗位">
														<i class="glyphicon glyphicon-minus"></i>
													</button>
												</td>
											</tr>
										</c:if>

									</c:forEach>
								</c:if>
							</tbody>
						</table>
					</div>
				</div>

				<div class="" style="width: 48%; float: left;" id="noSelectItems">
					<h5>可选择组</h5>
					<div>
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl object-user">
							<thead>
								<th>组名称</th>
								<th>操作</th>
							</thead>
							<tbody class="rolenotselected">
								<c:if test="${!empty grantAuthorization}">
									<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">

										<c:if test="${!fn:contains(grantAuthorization,postBean.groupId)}">
											<tr>
												<td>${postBean.groupName}</td>
												<td>
													<button class="btn btn-xs btn-success author" postId="${postBean.groupId }" title="添加岗位">
														<i class="glyphicon glyphicon-plus"></i>
													</button>
												</td>
											</tr>
										</c:if>

									</c:forEach>
								</c:if>

								<c:if test="${empty grantAuthorization}">
									<c:forEach var="postBean" items="${postInfoBeans }" varStatus="status">
										<tr>
											<td>${postBean.groupName}</td>
											<td>
												<button class="btn btn-xs btn-success author" postId="${postBean.groupId }" title="添加岗位">
													<i class="glyphicon glyphicon-plus"></i>
												</button>
											</td>
										</tr>
									</c:forEach>
								</c:if>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>

<xmp style="display: none;" id="process-model">${xmlContent }</xmp>

<script type="text/javascript" src="${ctx}/page/admin/resourceCatalogue/process/config-process.js"></script>
