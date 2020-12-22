<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="">
	<div class="col-lg-3 col-md-3" style="padding:0px;">
		<div class="clearfix box inline_any" style="width:100%;">
			<div class="filter_sort clearfix" style="float: none;border-bottom: 1px #e0e0e0 solid;line-height: 40px;padding: 0 20px;">				
				机构树
			</div>
			<div id="org-tree-box" class="pl20 auto_layout">
				<div id="org-tree" treeData='${treeData }' value="${nodeId }" 
					class="tree tree-selectable">
				</div>
			</div>
		</div>		
	</div>
	<div class="col-lg-9 col-md-9">
		<div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" parentId="${nodeId }" id="org-save-btn"
							<shiro:lacksPermission name="ORG:ADD">disabled="disabled"</shiro:lacksPermission>>
							<i class="icon-plus mr5"></i>新增机构
						</a>
					</li>					
				</ul>
			</div>
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					编码
					<input id="org-search-text" type="text" placeholder="机构编码 机构名称" value="${searchWord}" class="search_sm_input ml5 mr20" style="width:140px;">
				</div>				
				<input id="org-search-btn" type="button" value="搜索" class="search_sm_submit btn-qry" style="cursor: pointer;line-height: 24px;">
			</div>
		</div>
		<div id="org-table-box" class="auto_layout">
			<table id="org-table" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
					<thead>
						<tr>
							<th>序号</th>
							<th>机构名称</th>
							<th>机构编码</th>
							<th>状态</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<c:choose>
							<c:when test="${empty orgList.list}">
								<tr>
									<td colspan="5" style="color: red; text-align: center;">暂无组织机构信息</td>
								</tr>
							</c:when>
							<c:otherwise>
								<c:forEach var="list" items="${orgList.list }"
									varStatus="status">
									<tr>
										<td>${status.index+1}</td>
										<td>${list.orgName }</td>
										<td>${list.orgCode}</td>
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
												<a class="green" href="#" title="编辑"
													orgId="${list.orgId }"> <i
													class="icon-pencil bigger-130"></i>
												</a> <a class="red" href="#" title="删除" orgId="${list.orgId }">
													<i class="icon-trash bigger-130"></i>
												</a>
												<a class="blue" href="#" title="添加用户" orgId="${list.orgId }">
													<i class="icon-cog bigger-130"></i>
												</a>
											</div>

										</td>
									</tr>
								</c:forEach>
							</c:otherwise>
						</c:choose>
					</tbody>
				</table>
				<c:if test="${orgList.count>20 }">
					<div id="org-page" class="m-pagination"
						style="margin-top: 0px; float: right;" total="${orgList.count}"
						pageIndex="${orgList.pageIndex }"></div>
				</c:if>
			</div>
		</div>
	</div>
</div>

<style>
.tree_icon_chexkbox {
	color: rgba(249, 232, 206, 0);
	width: 13px;
	height: 13px;
	line-height: 13px;
	font-size: 11px;
	text-align: center;
	border-radius: 3px;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	background-color: #fafafa;
	border: 1px solid #CCC;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.icon-ok {
	background-color: #f9a021;
	border-color: #f9a021;
	color: #FFF;
}
a[disabled="disabled"]{
	color: #999 !important;
    cursor: not-allowed;
}
</style>
<script type="text/javascript" src="${ctx }/orginfo/js/org_list.js"></script>