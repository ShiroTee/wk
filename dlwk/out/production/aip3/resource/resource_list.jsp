<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="">
	<div id="tree" class="col-lg-3 col-md-3" style="padding: 0;">
		<div class="clearfix box inline_any" style="width:100%;">
			<div class="filter_sort clearfix" style="float: none;border-bottom: 1px #e0e0e0 solid;line-height: 40px;padding: 0 20px;">				
				菜单树
			</div>
			<div id="resource-tree-box" class="pl20 auto_layout">
				<div id="tree_" treeData='${treeData }' value="${nodeId }" 
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
						<a href="javascript:void(0);" class="filter_sort_link" id="saveResourceBtn" pId="${nodeId }" pNodeId="0">
							<i class="icon-plus mr5"></i>新增资源
						</a>
					</li>					
				</ul>
			</div>
		</div>
		<div id="table_box" class="auto_layout">
		<table id="resourceTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>资源名称</th>
					<th>资源类型</th>
					<th>资源地址</th>
					<th>资源状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:choose>
					<c:when test="${empty resourceList }">
						<tr>
							<td colspan="5" style="text-align: center;"><font
								color="red">暂无资源数据</font></td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach items="${resourceList}" var="list">
							<tr trId="${list.resourceId}">
								<td>${list.text }</td>
								<td>${list.resourceInfoTypeLabel }</td>
								<td>${list.href }</td>
								<td><c:choose>
										<c:when test="${list.status==1}">
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
											id="${list.resourceId }"> <i
											class="icon-pencil bigger-130"></i>
										</a><a class="red" href="#" title="删除" id="${list.resourceId }">
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
.icon-ok
{
	background-color: #f9a021;
	border-color: #f9a021;
    color: #FFF;
}
</style>
<script type="text/javascript" src="${ctx}/resource/js/resource.js"></script>