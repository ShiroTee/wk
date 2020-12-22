<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- 资源树页面 -->
<div class="clearfix box inline_any" style="width:100%;">
	<div class="filter_sort clearfix" style="float: none;border-bottom: 1px #e0e0e0 solid;">
		<ul>
			<li class="filter_sort_li">
				<a href="javascript:void(0);" class="filter_sort_link" id="edit-resource-btn" roleId="${info.roleId }">
					<i class="icon-pencil mr5"></i>修改权限
				</a>
			</li>
		</ul>
	</div>
	<div id="role-tree-box" class="pl20" style="overflow: auto;">
		<div id="role_tree" treeData='${treeData }' style="overflow-y: auto;" 
			class="tree tree-selectable">
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
</style>
<script type="text/javascript" src="${ctx }/role/js/role_tree.js"></script>