<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="panel-group m0_15" id="anthorityDetailsAccordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#anthorityDetailsAccordion" href="#service-info-pane" aria-expanded="true" aria-controls="service-info-pane">
          	服务信息
        </a>
      </h4>
    </div>
    <div id="service-info-pane" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        <div class="clearfix box inline_any mb20" style="width:100%;">
        	<ul>
					<li class="filter_sort_li">
						<a onclick="deleteData_authorityDetails(1)" href="javascript:void(0);" class="filter_sort_link">
							<i class="icon-minus-sign"></i> 取消授权
						</a>
					</li>				
			</ul>
		</div>
		<table id="authority-service-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>				
					<th>服务名称</th>
					<th>发布时间</th>
					<th>提供方</th>
					<th>状态</th>
				</tr>
			</thead>
			<tbody>				
				<tr>
					<td colspan="5" style="color: red; text-align: center;">暂无授权服务</td>
				</tr>								
			</tbody>
		</table>
		<div class="col-md-12 md-main-table-page" id="serviceList-authorityDetails">
				<%@include file="../../../common/admin-pagination.jsp"%>
			</div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#anthorityDetailsAccordion" href="#file-info-pane" aria-expanded="false" aria-controls="file-info-pane">
          	文件信息
        </a>
      </h4>
    </div>
    <div id="file-info-pane" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        <div class="clearfix box inline_any mb20" style="width:100%;">
        	<ul>
					<li class="filter_sort_li">
						<a onclick="deleteData_authorityDetails(2)" href="javascript:void(0);" class="filter_sort_link">
							<i class="icon-minus-sign"></i> 取消授权
						</a>
					</li>				
			</ul>
		</div>
		<table id="authority-file-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>				
					<th>文件名称</th>
					<th>发布时间</th>
					<th>提供方</th>
					<th>状态</th>
				</tr>
			</thead>
			<tbody>				
				<tr>
					<td colspan="5" style="color: red; text-align: center;">暂无授权 </td>
				</tr>							
			</tbody>
		</table>
		<div class="col-md-12 md-main-table-page" id="fileList-authorityDetails">
				<%@include file="../../../common/admin-pagination.jsp"%>
			</div>
      </div>
    </div>
  </div>  
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
<script>
	var authorityId = '<%=request.getAttribute("authorityId")%>';
</script>
<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/authorityManage/js/authorityDetails.js"></script>