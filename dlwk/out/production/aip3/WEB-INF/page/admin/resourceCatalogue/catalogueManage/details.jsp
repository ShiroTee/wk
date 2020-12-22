<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
.conlist_li{
	height:auto;
}
.con_tit {
    padding: 20px 0 0 !important;
}
.widget-toolbar{
	margin-top:12px;
}
.widget-toolbar:last-child:before{
	border-width:0;
}
</style>
<div class="panel-group m0_15" id="catalogueManageAccordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">	
    <div class="panel-heading" role="tab" id="catalogueManageHeadingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#catalogueManageAccordion" href="#catalogueManageCollapseOne" aria-expanded="true" aria-controls="catalogueManageCollapseOne">
          	资产详情
        </a>
      </h4>
    </div>
    <div id="catalogueManageCollapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="catalogueManageHeadingOne">
      <div class="panel-body">
        <div id="resource-baseInfo" style="display: inline-block;">
		  <ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20">
				<i class="conlist_dot"></i>
				资产名称：<span id="resourceName">-</span>
			</li>
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				发布日期：<span id="pubDate">-</span>
			</li>
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				共享级别：<span id="gxjb">-</span>
			</li>  
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				架构类别：<span id="jglb">-</span>
			</li>       
		  </ul>
		  <ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20">
				<i class="conlist_dot"></i>
				提供方：<span id="provider">-</span>
			</li>
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				创建日期：<span id="createDate">-</span>
			</li>
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				保密级别：<span id="bmjb">-</span>
			</li>  
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				关键字：<span id="keyword">-</span>
			</li>       
		  </ul>
		  <ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li p0_20">
				<i class="conlist_dot"></i>
				摘要：<span id="zaiyao">-</span>
			</li>
			<li class="conlist_li">
				<i class="conlist_dot"></i>
				备注：<span id="beizhu">-</span>
			</li>
		  </ul>
	    </div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="catalogueManageHeadingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#catalogueManageAccordion" href="#catalogueManageCollapseTwo" aria-expanded="false" aria-controls="catalogueManageCollapseTwo">
          	更新信息
        </a>
      </h4>
    </div>
    <div id="catalogueManageCollapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="catalogueManageHeadingTwo">
      <div class="panel-body">
        <div id="">
		  <div class="p20">
			<div class="inline_any">
				更新频率
				<select id="updateRate_catalogueDetails" class=" ml5 mr20" style="width:100px;">
					<option value="">请选择</option>
					<option value="0">实时</option>
					<option value="1">日</option>
					<option value="2">半月</option>
					<option value="3">月</option>
					<option value="4">季</option>
					<option value="5">半季</option>
					<option value="6">年</option>
					<option value="7">半年</option>
				</select>
			</div>
			<div class="inline_any">
					最后更新时间：
					<input type="text" id="udateTime" value="" class="search_sm_input ml5" style="width:190px;">
               		<i class="icon-calendar mr10"></i>
			</div>
			<input id="dict-search-btn" type="button"  onclick="editRate_catalogueDetails()" value="保存" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;    float: right;">
		  </div>
	    </div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="catalogueManageHeadingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#catalogueManageAccordion" href="#catalogueManageCollapseThree" aria-expanded="false" aria-controls="catalogueManageCollapseThree">
          	资源组成 
        </a>
      </h4>
    </div>
    <div id="catalogueManageCollapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="catalogueManageHeadingThree">
      <div class="panel-body">
        <div id="resource_list">
			<div class="clearfix box inline_any mb10" style="width:100%;">		
				<ul>
					<li class="filter_sort_li">
						<a id="catalogueStart" href="javascript:void(0);" class="filter_sort_link" >
							<i class="icon-plus"></i> 启用
						</a>
					</li>
					<li class="filter_sort_li">
						<a id="catalogueStop" href="javascript:void(0);" class="filter_sort_link" >
							<i class="icon-plus"></i> 禁用
						</a>
					</li>						
				</ul>
			</div>
			<table	id="catalogueManageTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
				<thead>
					<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>
					<th>名称</th>
					<th>标识符</th>
					<th>数据类型</th>
					<th>字段长度</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			 	</thead>
			 	<tbody>			 			
			 	</tbody>
			 </table>
			<%@include file="../../../common/admin-pagination.jsp" %>
		</div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="catalogueManageHeadingFour">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#catalogueManageAccordion" href="#catalogueManageCollapseFour" aria-expanded="false" aria-controls="catalogueManageCollapseFour">
          	文件列表
        </a>
      </h4>
    </div>
    <div id="catalogueManageCollapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="catalogueManageHeadingFour">
      <div class="panel-body">
        <div id="file_list">
			<div class="clearfix box inline_any mb10" style="width:100%;">		
				<ul>
					<li class="filter_sort_li">
						<a onclick="deleteService('fileConsituteTable')" href="javascript:void(0);" class="filter_sort_link" >
							<i class="icon-trash"></i> 移除
						</a>
					</li>				
				</ul>
			</div>
			<table id="fileConsituteTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
				<thead>
					<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>
					<th width="150px">名称</th>
					<th>大小</th>
					<th>下载地址</th>
					<th>状态</th>
					<th>上传时间</th>
				</tr>
			 	</thead>
			 	<tbody>			 			
			 	</tbody>
			 </table>
			 <div id="servceListPage">
			<%@include file="../../../common/admin-pagination.jsp" %>
			</div>
		</div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="catalogueManageHeadingFive">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#catalogueManageAccordion" href="#catalogueManageCollapseFive" aria-expanded="false" aria-controls="catalogueManageCollapseFive">
          	Web服务列表 
        </a>
      </h4>
    </div>
    <div id="catalogueManageCollapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="catalogueManageHeadingFive">
      <div class="panel-body">
        <div id="service_list">
			<div class="clearfix box inline_any mb10" style="width:100%;">		
				<ul>
					<li class="filter_sort_li">
						<a onclick="deleteService('serviceConsituteTable')" href="javascript:void(0);" class="filter_sort_link" >
							<i class="icon-trash"></i> 移除
						</a>
					</li>				
				</ul>
			</div>
			<table id="serviceConsituteTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
				<thead>
					<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>
					<th>名称</th>
					<th>发布地址</th>
					<th>协议</th>
					<th>状态</th>
					<th>发布时间</th>
				</tr>
			 	</thead>
			 	<tbody>			 			
			 	</tbody>
			 </table>
			<%@include file="../../../common/admin-pagination.jsp" %>
		</div>
      </div>
    </div>
  </div>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
<link href="${ctx}/resources/ace/assets/css/bootstrap-datetimepicker.css" rel="stylesheet">
<script type="text/javascript"
	src="${ctx }/resources/ace/assets/js/date-time/bootstrap-datetimepicker.js"></script>
<script type="text/javascript"
	src="${ctx }/resources/ace/assets/js/date-time/bootstrap-datetimepicker.zh-CN.js"></script>
<script>
	var list =  '<%=request.getAttribute("details")%>';
	var resourceId =  '<%=request.getAttribute("resourceId")%>';
	$("#udateTime").datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd hh:ii:ss",
        todayBtn: true,
        pickerPosition: "bottom-left",
        minView: 1,
        todayHighlight : true
    });
</script>

<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/catalogueManage/js/details.js"></script>