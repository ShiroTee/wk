<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>

<div class="" id="catalogue-list-box">
	<div class="col-lg-3 col-md-3" style="padding: 0;">
		<div class="clearfix box inline_any" style="width:100%;">
			<div class="filter_sort clearfix" style="float: none;border-bottom: 1px #e0e0e0 solid;line-height: 40px;padding: 0 20px;">				
				委办局
			</div>
			<div id="file-gov-tree-box" class="pl20 auto_layout">
				<div id="file-gov-tree" treeData='${treeData}' 
					value="I_wJgN0CEeOlovfuVspipA" class="tree tree-selectable">
				</div>
			</div>
		</div>
	</div>
	<div class="col-lg-9 col-md-9">
		<div class="clearfix box inline_any mb20" style="width:100%;">
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
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					文件名称
					<input id="fileName_fileManager" type="text" placeholder="包含文件名称的字符" 
						class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
				</div>
				<div class="inline_any">
					下载地址
					<input id="publishURL_fileManager" type="text" placeholder="自动加上前缀：${baseURL}	" 
						class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
				</div>
				<input id="dict-search-btn" type="button" onclick="queryFileList()" value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">
				
			</div>
		</div>
		<div id="file-table-box" class="auto_layout">
		<table id="file-table-fileManager" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>					
					<th>文件名称</th>
					<th width="100px">文件大小</th>
					<th width="150px">挂接资源目录</th>
					<th width="20px">下载地址</th>
					<th width="100px">授权类型</th>
					<th width="50px">文件状态</th>
					<th>上传时间</th>
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
					<td>文件管理说明.txt</td>
					<td>1.00KB</td>
					<td>药店、医疗机构违法违规信息</td>
					<td><div style="word-break: break-all;">http://10.6.10.38:9090/ftp/download/readme.txt</div></td>
					<td>公开</td>
					<td>启用</td>
					<td>2017-06-08 10:30</td>
					<td>
						<div style="width: 110px;">
							<a class="md-fileDetails" href="javascript:void(0);" title="详情" data-fileId="" data-fileName="文件管理说明.txt">
								<i class="icon icon-th-list mr5" aria-hidden="true"></i>
							</a>
							<a class="md-download" href="javascript:void(0);" title="下载" data-fileId="" data-fileName="文件管理说明.txt">
								<i class="icon icon-download mr5" aria-hidden="true"></i>
							</a>
							
							<a class="md-del" href="javascript:void(0);" title="删除" data-fileId="" data-fileName="文件管理说明.txt">
								<i class="icon icon-trash mr5" aria-hidden="true"></i>
							</a>
							
							<a class="md-authorize" href="javascript:void(0);" title="文件授权" data-fileId="" data-fileName="文件管理说明.txt">
								<i class="icon icon-user mr5" aria-hidden="true"></i>
							</a>
							<a class="md-authorize-list" href="javascript:void(0);" title="查看授权人员" data-fileId="" data-fileName="文件管理说明.txt">
								<i class="icon icon-group" aria-hidden="true"></i>
							</a>
						</div>
					</td>
				</tr>				
			</tbody>
		</table>		
		<div class="row" style="margin: 0 0 10px;">
			<div class="col-md-12 md-main-table-page" id="fileManagePage">
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
	src="${ctx }/page/admin/resourceCatalogue/fileManage/js/fileManage.js"></script>