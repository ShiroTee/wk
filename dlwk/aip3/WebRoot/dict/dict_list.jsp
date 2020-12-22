<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="" id="dict-list-box">
	<div class="col-lg-3 col-md-3" style="padding: 0;">
		<div class="clearfix box inline_any" style="width:100%;">
			<div class="filter_sort clearfix" style="float: none;border-bottom: 1px #e0e0e0 solid;line-height: 40px;padding: 0 20px;">				
				字典树
			</div>
			<div id="dict-tree-box" class="pl20 auto_layout">
				<div id="dict-tree" treeData='${treeData }' value="${nodeId }" 
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
						<a href="javascript:void(0);" class="filter_sort_link" parentId="${nodeId }" id="dict-save-btn">
							<shiro:lacksPermission name="DICT:ADD">disabled="disabled"</shiro:lacksPermission>
							<i class="icon-plus"></i> 新增字典
						</a>
					</li>					
				</ul>
			</div>
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					<input type="text" placeholder="值 名称" id="dict-search-text"
						class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;" value="${searchWord}">
					<!-- <i class="icon-search nav-search-icon" style="top: 4px;"></i> -->
				</div>			
				<input id="dict-search-btn" type="button"  value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">
				<!-- <button class="btn btn-xs btn-info search-btn"
					style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 2px;">
					<i class="icon-search nav-search-icon"></i>搜索
				</button> -->
			</div>
		</div>
		<div id="dict-table-box" class="auto_layout">
		<table id="dict-table" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>序号</th>
					<th>字典文本</th>
					<th>字典取值</th>
					<th>状态</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<c:choose>
					<c:when test="${empty dictList.list}">
						<tr>
							<td colspan="5" style="color: red; text-align: center;">暂无字典信息</td>
						</tr>
					</c:when>
					<c:otherwise>
						<c:forEach var="list" items="${dictList.list }"
							varStatus="status">
							<tr>
								<td>${status.index+1}</td>
								<td>${list.text }</td>
								<td>${list.value}</td>
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
											dictId="${list.dictId }"> <i
											class="icon-pencil bigger-130"></i>
										</a> <a class="red" href="#" title="删除" dictId="${list.dictId }">
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
		<c:if test="${dictList.count>20 }">
			<div id="dict-page" class="m-pagination"
				style="margin-top: 0px; float: right;" total="${dictList.count}"
				pageIndex="${dictList.pageIndex }"></div>
		</c:if>
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
<script type="text/javascript" src="${ctx }/dict/js/dict_list.js"></script>