<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="" id="catalogue-list-box">
	<div class="col-lg-3 col-md-3" style="padding: 0;">
		<div class="clearfix box inline_any" style="width: 100%;">
			<div class="filter_sort clearfix"
				style="float: none; border-bottom: 1px #e0e0e0 solid; line-height: 40px; padding: 0 20px;">
				<span style="display: inline-block">委办局</span>
				<div style="display: inline-block">
					<!-- <input style="width: 135px;" type="text" id="wbj_search"
						class="nav-search-input search_sm_input ml50"> -->
				</div>
			</div>
			<div id="catalogue-gov-tree-box" class="pl20 auto_layout">
				<div id="catalogue-gov-tree-catalogueManage" treeData='${treeData }'
					value="I_wJgN0CEeOlovfuVspipA" class="tree tree-selectable">
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-9 col-md-9">
		<div class="clearfix box inline_any mb20" style="width: 100%;">
			<!-- <div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" parentId="${nodeId }" id="dict-save-btn">
							<shiro:lacksPermission name="DICT:ADD">disabled="disabled"</shiro:lacksPermission>
							<i class="icon-plus"></i> 新增字典
						</a>
					</li>					
				</ul>
			</div> -->
			<div class="l pl20 clearfix" style="line-height: 40px;">
			<div class="inline_any">
					发布状态 <select id="catalogue_ispublish" onchange="queryService()" class=" ml5 mr20"
						style="width: 100px;">
						<option value="">全部</option>
						<option value="1">发布</option>
						<option value="0">未发布</option>
					</select>
				</div>
				<div class="inline_any">
					目录类别 <select id="catalogue_category" onchange="queryService()" class=" ml5 mr20"
						style="width: 100px;">
						<option value="">全部</option>
						<option value="空间">空间</option>
						<option value="非空间" selected="selected">非空间</option>
					</select>
				</div>
				<div class="inline_any">
					架构类别 <select id="structure_category" onchange="queryService()" class=" ml5 mr20"
						style="width: 100px;">
						<option value="Arch_busi_uview">信息视图</option>
						<option value="Arch_dm_entity">逻辑实体</option>
						<option value="Arch_dm_phdb">物理数据库</option>
						<option value="Arch_dm_sbj">概念主题</option>
						<option value="">全部</option>
					</select>
				</div>

				<div class="inline_any">
					<input type="text" placeholder="资产目录名称" id="dict-search-text"
						class="nav-search-input search_sm_input mt10 ml5 mr20"
						style="width: 100px;">
					<!-- <i class="icon-search nav-search-icon" style="top: 4px;"></i> -->
				</div>
				<input type="button" value="搜索"
					class="search_sm_submit search-btn" onclick="queryService()"
					style="cursor: pointer; line-height: 24px;">

			</div>
		</div>
		<div id="catalogue-table-box" class="auto_layout">
			<table id="catalogue-table" width="100%" border="0" cellspacing="0"
				cellpadding="0" class="tabl mb10">
				<thead>
					<tr>
						<th><label class="position-relative"> <input
								type="checkbox" class="ace"> <span class="lbl"></span>
						</label></th>
						<th>名称</th>
						<th>共享级别</th>
						<th>提供方</th>
						<th>架构类别</th>
						<th>发布日期</th>
						<th>更新频率</th>
						<th>更新时间</th>
						<th>操作</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<!-- <tr>
					<td colspan="9" style="color: red; text-align: center;">暂无字典信息</td>
				</tr> -->
					<tr>
						<td><label class="position-relative"> <input
								type="checkbox" class="ace"> <span class="lbl"></span>
						</label></td>
						<td>企业被执行信息</td>
						<td>政府内部条件共享</td>
						<td>法院</td>
						<td>信息视图</td>
						<td>2017-06-08 10:30</td>
						<td>月</td>
						<td>2017-06-08 10:30</td>
						<td>
							<div style="width: 80px;">
								<a class="md-details" href="javascript:void(0);" title="详情"
									data-catalogueId="" data-catalogueName="企业被执行信息"> <i
									class="icon icon-th-list mr5" aria-hidden="true"></i>
								</a> <a class="md-public" href="javascript:void(0);" title="发布">
									<i class="icon icon-lock mr5" aria-hidden="true"></i>
								</a>
								<!-- 取消发布
							<a class="md-unpublic" href="javascript:void(0);" title="取消发布">
								<i class="icon icon-unlock mr5" aria-hidden="true"></i>
							</a>
							-->
								<a class="md-services" href="javascript:void(0);" title="挂接服务">
									<i class="icon icon-cogs mr5" aria-hidden="true"></i>
								</a> <a class="md-files" href="javascript:void(0);" title="挂接文件">
									<i class="icon icon-file" aria-hidden="true"></i>
								</a>
							</div>
						</td>
					</tr>
					<tr>
						<td><label class="position-relative"> <input
								type="checkbox" class="ace"> <span class="lbl"></span>
						</label></td>
						<td>药店、医疗机构违法违规信息</td>
						<td>政府内部条件共享</td>
						<td>食药监</td>
						<td>信息视图</td>
						<td>2017-06-08 10:30</td>
						<td>月</td>
						<td>2017-06-08 10:30</td>
						<td>
							<div style="width: 80px;">
								<a class="md-details" href="javascript:void(0);" title="详情"
									data-catalogueId="" data-catalogueName="药店、医疗机构违法违规信息"> <i
									class="icon icon-th-list mr5" aria-hidden="true"></i>
								</a>
								<!-- 发布
							<a class="md-public" href="javascript:void(0);" title="发布">
								<i class="icon icon-lock mr5" aria-hidden="true"></i>
							</a>
							-->
								<a class="md-unpublic" href="javascript:void(0);" title="取消发布">
									<i class="icon icon-unlock mr5" aria-hidden="true"></i>
								</a> <a class="md-services" href="javascript:void(0);" title="挂接服务">
									<i class="icon icon-cogs mr5" aria-hidden="true"></i>
								</a> <a class="md-files" href="javascript:void(0);" title="挂接文件">
									<i class="icon icon-file" aria-hidden="true"></i>
								</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="row" style="margin: 0 0 10px;">
			<div class="col-md-12 md-main-table-page" id="cataloguePageDIV">
				<%@include file="../../../common/admin-pagination.jsp"%>
			</div>
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
</style>
<!-- <script type="text/javascript" src="${ctx }/dict/js/dict_list.js"></script> -->
<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/catalogueManage/js/manage.js"></script>
