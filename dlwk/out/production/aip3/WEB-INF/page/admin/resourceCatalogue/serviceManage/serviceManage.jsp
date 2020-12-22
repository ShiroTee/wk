<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>

<div class="">
	<div class="col-lg-3 col-md-3" style="padding: 0;">
		<div class="clearfix box inline_any" style="width:100%;">
			<div class="filter_sort clearfix" style="float: none;border-bottom: 1px #e0e0e0 solid;line-height: 40px;padding: 0 20px;">				
				委办局
			</div>
			<div id="service-gov-tree-box" class="pl20 auto_layout">
				<div id="service-gov-tree" treeData='${treeData}' 
					value="I_wJgN0CEeOlovfuVspipA" class="tree tree-selectable">
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-9 col-md-9">
		<div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="service_add_serviceManager">
							<i class="icon-plus"></i> 注册服务
						</a>
					</li>					
				</ul>
			</div>
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					服务名称
					<input id="serviceName_serviceManager" type="text" placeholder="包含服务名称的字符" 
						class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
				</div>				
				<input id="dict-search-btn" type="button" onclick="queryServiceList()" value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">
				
			</div>
		</div>
		<div id="service-table-box" class="auto_layout">
		<table id="service-table-serviceManager" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>					
					<th>服务名称</th>
					<th width="150px">挂接资源目录</th>
					<th width="20px">发布地址</th>
					<th width="100px">协议类型</th>
					<th width="100px">授权类型</th>
					<th width="50px">服务状态</th>
					<th>发布时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>				
				<!-- <tr>
					<td colspan="9" style="color: red; text-align: center;">暂无文件</td>
				</tr> -->
				<tr>
					<td>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</td>
					<td>服务名称</td>
					<td>药店、医疗机构违法违规信息</td>
					<td><div style="word-break: break-all;">http://10.6.10.38:9090/service/test</div></td>
					<td>http</td>
					<td>授权访问</td>
					<td>启用</td>
					<td>2017-06-08 10:30</td>
					<td>
						<div style="width: 40px;">														
							<a class="md-authorizeService" href="javascript:void(0);" title="服务授权" data-fileId="" data-fileName="服务名称">
								<i class="icon icon-user mr5" aria-hidden="true"></i>
							</a>
							<a class="md-authorizeService-list" href="javascript:void(0);" title="查看授权人员" data-fileId="" data-fileName="服务名称">
								<i class="icon icon-group" aria-hidden="true"></i>
							</a>
						</div>
					</td>
				</tr>				
			</tbody>
		</table>		
		<div class="row" style="margin: 0 0 10px;">
			<div class="col-md-12 md-main-table-page" id="serviceManagePage">
				<%@include file="../../../common/admin-pagination.jsp"%>
			</div>
		</div>	
		</div>
	</div>
</div>
<div class="hide">
	<iframe name="downloadFrame" id="downloadFrame" style="display: none;" frameborder="0"></iframe>
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

<script>
	var baseURL = '<%=request.getAttribute("baseURL")%>';

</script>
<!-- <script type="text/javascript" src="${ctx }/dict/js/dict_list.js"></script> -->

<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/serviceManage/js/serviceManage.js"></script>