<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<style>
.main_box {
	width: 70%;
	margin: 0 auto;
}



.main_box input[type="text"], .main_box p, .main_box textarea, .main_box select
	{
	width: 100%;
}

.main_box p {
	display: inline-block;
	text-align: left;
}
.tooltip.top{
	width:inherit;
}

</style>
<div class="p0_20">
	<div data-show-box>
		<div class="clearfix box inline_any mb20" style="width: 100%;">
			<ul>
				<!-- <li class="filter_sort_li">
				<a href="javascript:void(0);" class="filter_sort_link">
					<i class="icon-save"></i> 保存
				</a>
			</li> -->
				<li class="filter_sort_li"><a id="addService"
					href="javascript:void(0);" class="filter_sort_link"> <i
						class="icon-plus"></i> 注册服务
				</a></li>
			</ul>
			<div class="l pl20 clearfix" style="line-height: 40px;">
				<div class="inline_any">
					服务名称 <input id="serviceName" type="text" placeholder="服务名称"
						class="nav-search-input search_sm_input mt10 ml5 mr20"
						style="width: 160px;">
				</div>
				<div class="inline_any">
					发布地址 <input id="publish_addr" type="text" placeholder="发布地址"
						class="nav-search-input search_sm_input mt10 ml5 mr20"
						style="width: 160px;">
				</div>
				<input id="dict-search-btn" onclick="pageInit()" type="button"
					value="搜索" class="search_sm_submit search-btn"
					style="cursor: pointer; line-height: 24px;">
			</div>
		</div>
		<table id="service-table" width="100%" border="0" cellspacing="0"
			cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th><label class="position-relative"> <input
							type="checkbox" class="ace"> <span class="lbl"></span>
					</label></th>
					<th>服务名称</th>
					<th>发布地址</th>
					<th>协议类型</th>
					<th>授权类型</th>
					<th>发布时间</th>
				</tr>
			</thead>
			<tbody>
				<!-- <tr>
					<td colspan="6" style="color: red; text-align: center;">暂无服务</td>
				</tr> -->
				<tr>
					<td><label class="position-relative"> <input
							type="checkbox" class="ace"> <span class="lbl"></span>
					</label></td>
					<td>我的数据服务</td>
					<td>http://10.0.10.6:9090/service/testDataService</td>
					<td>http</td>
					<td>完全公开</td>
					<td>2017-06-08 10:30:00</td>
				</tr>
				<tr>
					<td><label class="position-relative"> <input
							type="checkbox" class="ace"> <span class="lbl"></span>
					</label></td>
					<td>我的数据服务</td>
					<td>http://10.0.10.6:9090/service/testDataService</td>
					<td>http</td>
					<td>完全公开</td>
					<td>2017-06-08 10:30:00</td>
				</tr>
				<tr>
					<td><label class="position-relative"> <input
							type="checkbox" class="ace"> <span class="lbl"></span>
					</label></td>
					<td>我的数据服务</td>
					<td>http://10.0.10.6:9090/service/testDataService</td>
					<td>http</td>
					<td>完全公开</td>
					<td>2017-06-08 10:30:00</td>
				</tr>
			</tbody>
		</table>
		<div id="pageDIV_serviceList" style="width: 100%;height: 80px;display: inline-block;">
			<%@include file="../../../common/admin-pagination.jsp"%>
		</div>
	</div>
</div>
<div data-show-box class="main_box" style="display: none;">
	<form class="form-horizontal" id="form_serviceList">
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>服务类型:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<select name="routeType" id="serviceType_serviceList" class="form-control">
						<option value="http">HTTP</option>
						<option value="soap">SOAP</option>
					</select>
				</div>
		</div>
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>服务名称:
				</label>
				<div  class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<input name="routeName" id="serviceName_serviceList" type="text" class="form-control"
				 value="" data='[{"type":"empty","msg":"服务名称不能为空"}]'>
				</div>
		</div>
		
		<div class="form-group">
								<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>发布地址:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
			 	<input value="" data='[{"type":"empty","msg":"发布地址不能为空"}]'
				name="publishURL" id="serviceAddr_serviceList"
				type="text" class="">
			</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>动态匹配:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
					name="matchOnUriPrefix" id="inlineRadio1" value="1">
					是
				</label> <label class="radio-inline"> <input type="radio"
					name="matchOnUriPrefix" id="inlineRadio2" checked="checked"
					value="0"> 否
				</label>
			</p>
			</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>代理地址：
				</label>
			<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
			<textarea id="service_addr_serviceList" value=""
				name="prxoyURL" row="3"
				data='[{"type":"empty","msg":"代理地址不能为空"}]'></textarea>
				</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>授权类型:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
					name="isAuth" checked="checked" id="inlineRadio3"
					value="1"> 授权访问
				</label> <label class="radio-inline"> <input type="radio"
					name="isAuth" id="inlineRadio4" value="0">
					公开
				</label>
			</p>
		</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>记录日志:
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
					name="writeLog" checked="checked" id="inlineRadio5"
					value="1"> 记录
				</label> <label class="radio-inline"> <input type="radio"
					name="writeLog" id="inlineRadio6" value="0"> 不记录
				</label>
			</p>
		</div>
		</div>
		
		<div class="form-group">
		<input value="${id }" name="resourceId" class="hide">
		<input value="0" name="serviceType" class="hide">
		</div>
	</form>
</div>
<div class="modal-footer">
	<div data-show-box>
		<button type="button" class="btn btn-primary btn-xs"
			onclick="saveService()">保存</button>
		<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
	</div>
	<div data-show-box style="display: none;">
		<button type="button" class="btn btn-pink btn-xs"
			onclick="reset_serviceList()">重置</button>
		<button type="button" class="btn btn-primary btn-xs"
			onclick="addService_serviceList()">注册</button>
		<button id="backToList" type="button" class="btn btn-info btn-xs">返回</button>
	</div>
</div>
<script>
var resourceID =  '<%=request.getAttribute("id")%>';
var resource_from =  '<%=request.getAttribute("from")%>';
var userID_service =  '<%=request.getAttribute("userId")%>';
	$(function() {
		$("table th input[type='checkbox']").click(onMdTableAllCheck);
	});
	/**
	 * 表格全选/不选
	 * @param {} e
	 */
	function onMdTableAllCheck(e) {
		var check = $(this).is(":checked");
		$("#service-table tr input[type='checkbox']").prop({
			"checked" : check
		});
	}
</script>

<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/catalogueManage/js/serviceList.js"></script>