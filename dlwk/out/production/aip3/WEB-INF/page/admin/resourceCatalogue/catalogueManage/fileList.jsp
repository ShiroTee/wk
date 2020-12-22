<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%-- <script type="text/javascript" src="${ctx}/webapp/resources/plugins/webuploader/webuploader.min.js"></script> --%>
<link href="${ctx}/webapp/resources/plugins/webuploader/webuploader.css"
	rel="stylesheet">
<style>
	form input[type="text"],form input[type="file"],form textarea,form p{
		width:85% !important;
	}
</style>
<div id="upload_loading_fileList" class="hide" style="background:gray;opacity: 0.6;position:absolute;width:100%;height:100%;z-index:1001;">
	<div class="progress progress-striped active" style="margin: 0 auto;width: 30%;margin-top: 125px;">
		<div id="upload_progress_fileList" class="progress-bar" role="progressbar" style="width: 0%;    background-color: blue;">
		</div>
	</div>
</div>
<div class="p0_20">
<div data-show-box>
	<div class="clearfix box inline_any mb20" style="width:100%;">
		<ul>
			<!-- <li class="filter_sort_li">
				<a href="javascript:void(0);" class="filter_sort_link">
					<i class="icon-save"></i> 保存
				</a>
			</li> -->
			<li class="filter_sort_li">
				<a id="upload-file" href="javascript:void(0);" class="filter_sort_link">
					<i class="icon-upload"></i> 上传文件
				</a>
			</li>						
		</ul>
		<div class="l pl20 clearfix" style="line-height:40px;">
			<div class="inline_any">
				文件名称
				<input id="fileName" type="text" placeholder="文件名称"
					class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
			</div>	
			<div class="inline_any">
				下载地址
				<input id="publish_addr" type="text" placeholder="下载地址"
					class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
			</div>		
			<input id="dict-search-btn" type="button"  onclick="pageInit()" value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">			
		</div>
	</div>
	<table id="file-table" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>					
					<th width="150px">文件名称</th>
					<th>文件大小</th>
					<th>下载地址</th>
					<th>文件状态</th>
					<th>上传时间</th>
				</tr>
			</thead>
			<tbody>				
				<!-- <tr>
					<td colspan="6" style="color: red; text-align: center;">暂无文件</td>
				</tr> -->
				<tr>
					<td>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</td>
					<td>北京地图</td>
					<td>40.22MB</td>
					<td>http://10.0.10.6:9090/ftp/download/beijin.svg</td>
					<td>启用</td>
					<td>2017-06-08 10:30:00</td>
				</tr>
				<tr>
					<td>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</td>
					<td>北京地图</td>
					<td>40.22MB</td>
					<td>http://10.0.10.6:9090/ftp/download/beijin.svg</td>
					<td>启用</td>
					<td>2017-06-08 10:30:00</td>
				</tr>
				<tr>
					<td>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</td>
					<td>北京地图</td>
					<td>40.22MB</td>
					<td>http://10.0.10.6:9090/ftp/download/beijin.svg</td>
					<td>启用</td>
					<td>2017-06-08 10:30:00</td>
				</tr>
			</tbody>
	</table>
	<div id="pageDIV_fileList" style="width: 100%;height: 80px;display: inline-block;">
		<%@include file="../../../common/admin-pagination.jsp" %>
	</div>
</div>
<div data-show-box style="display:none;width: 80%;margin: 0 auto;">
	<div id="fileUpload_fileList"  class="form-horizontal">			
			<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   资源目录:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<input type="text" class="form-control"  value="${catalogueName }" disabled="disabled">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right" style="">
				   <font color="red">*</font>显示名称:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<input type="text" id="routeName_fileList" name="routeName" data='[{"type":"empty","msg":"名称不能为空"}]' class="form-control" value="">
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   授权类型:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<p>
						<label class="radio-inline">
  							<input type="radio" name="isAuth_fileList" checked="checked" id="inlineRadio1" value="1"> 授权访问
						</label>
						<label class="radio-inline">
  							<input type="radio" name="isAuth_fileList" id="inlineRadio2" value="0"> 公开
						</label>
					</p>
				</div>
			</div>
			<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>选择文件:
				</label>
				<div class="col-xs-8" id="fileList_fileDIV" style="padding-left: 2px; padding-right: 1px;">
					<div id="picker_fileList" style="float:left;">选择文件</div>
				</div>
			</div>	
			<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   文件描述:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				   <textarea id="routeDesc_fileList" row="3" class="form-control"></textarea>
				</div>
			</div>	
			<input type="text" name="resourceId_fileList" value="${id }" class="hide">		
		</div>
</div>
</div>
<div class="modal-footer">
	<div data-show-box>
	<button type="button" class="btn btn-primary btn-xs" onclick="saveService()">保存</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
	</div>
	<div data-show-box style="display:none;">
	<button type="button" class="btn btn-primary btn-xs" id="fileUpload_upload">上传</button>
	<button id="backToList" type="button" class="btn btn-info btn-xs">返回</button>
	</div>
</div>
<script>
var resource_from_file =  '<%=request.getAttribute("from")%>';
var resourceID =  '<%=request.getAttribute("id")%>';
var userID_file =  '<%=request.getAttribute("userId")%>';
$(function(){
	$("table th input[type='checkbox']").click(onMdTableAllCheck);	
});
/**
* 表格全选/不选
* @param {} e
*/
function onMdTableAllCheck(e)
{
	var check=$(this).is(":checked");
	$("#file-table tr input[type='checkbox']").prop({"checked":check});
}
</script>

<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/catalogueManage/js/fileList.js"></script>
<script type="text/javascript"
        src="${ctx}/resources/plugins/webuploader/webuploader.js"></script>