<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="panel-group mr15" id="subscribeManageAccordion"
	role="tablist" aria-multiselectable="true">
	<div style="text-align: center;">
		<div class="clearfix box inline_any mb20" style="width: 100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li" style="position: relative;"><a
						href="javascript:void(0);" class="filter_sort_link"
						id="dataInit_btn" data-toggle="dropdown" onclick="dataInit()">
							<i class="icon-refresh"></i>&nbsp数据初始化
					</a></li>
				</ul>
			</div>
		</div>
	</div>
	<c:if test="${!empty infos }">
		<c:forEach items="${infos }" var="info">
			<div class="panel panel-default">
				<div class="panel-heading" role="tab" id="${info.dict.value}_dataInitHeading">
					<h4 class="panel-title">
						<label class="position-relative"> <input type="checkbox"
							class="ace" id="${info.dict.value}_table_check"
							onclick="allCheck('${info.dict.value}_table_check','${info.dict.value}_list')"> <span
							class="lbl"></span>
						</label> <a role="button" data-toggle="collapse"
							data-parent="#subscribeManageAccordion" href="#${info.dict.value}_dataInit"
							aria-expanded="true" aria-controls="subscribeManageCollapseOne">
							${info.dict.text } </a>
					</h4>
				</div>
				<div id="${info.dict.value}_dataInit" class="panel-collapse collapse in"
					role="tabpanel" aria-labelledby="${info.dict.value}_dataInitHeading">
					<div class="panel-body">
						<table id="${info.dict.value}_list" width="100%" border="0" cellspacing="0"
							cellpadding="0" class="tabl mb10">
							<thead>
								<tr>
									<th>序号</th>
									<th>条件</th>
									<th>表名</th>
									<th>状态</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<c:choose>
									<c:when test="${empty info.nodes } ">
										<tr>
											<td colspan="5" style="color: red; text-align: center;">暂无记录</td>
										</tr>
									</c:when>
									<c:otherwise>
										<c:forEach items="${info.nodes}" var="item">
											<tr>
												<td>${item.sortNum }</td>
												<td>${item.remark }</td>
												<td>${item.value }</td>
												<td><c:choose>
														<c:when test="${item.status==1 }">
															<span
																class="label label-sm label-success arrowed arrowed-righ">启用</span>
														</c:when>
														<c:otherwise>
															<span
																class="label label-sm label-danger arrowed arrowed-righ">停用</span>
														</c:otherwise>

													</c:choose></td>
												<td><label class="position-relative"> <input
														type="checkbox" class="ace" id="${item.dictId}"
														name="${item.value }"
														<c:if test="${item.status==0  }"> disabled="disabled"</c:if>>
														<span class="lbl"></span>
												</label></td>
											</tr>

										</c:forEach>
									</c:otherwise>
								</c:choose>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</c:forEach>
	</c:if>
</div>
<script type="text/javascript"
	src="${ctx }/page/admin/dataInit/dataInitManage.js"></script>