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
<div class="row p0_20">	
<div class="main_box">
<input type="text" id="serivceId_serviceDetails" value="${serviceId }" class="hide"/>
	<form class="form-horizontal" id="form_serviceManager">
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>协议类型：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<select name="routeType" id="serviceType_serviceManager" class="form-control" disabled="disabled">
						<option value="http" ${info.routeType == 'http'?'selected':''}>HTTP</option>
						<option value="soap" ${info.routeType == 'soap'?'selected':''}>SOAP</option>
					</select>
				</div>
		</div>
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>服务名称：
				</label>
				<div  class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
					<input name="routeName" id="serviceName_serviceManager" value="${info.routeName} "type="text" class="form-control"
				  data='[{"type":"empty","msg":"服务名称不能为空"}]'  >
				</div>
		</div>
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>所属机构：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;position:relative;">
					<select name="orgId" id="orgType_orgList_serviceDetails" class="form-control" size="0">
						<option value="${info.provider.orgId == 'iCwfIGL1EeSmyOtDehbOGg'?'':info.provider.orgId}">${info.provider.orgName }</option>
					</select>
					<div style="max-height:200px;position: absolute; width: 100%;padding-left: 0;background: #fff;z-index: 9;" id="gov_tree_serviceDetails" treeData='${treeData}' 
					value="I_wJgN0CEeOlovfuVspipA" class="hide tree tree-selectable"></div>
				</div>
		</div>
		<div class="form-group">
								<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>发布地址：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
			 	<input data='[{"type":"empty","msg":"发布地址不能为空"}]' disabled="disabled"
				name="publishURL" id="serviceAddr_serviceManager" 
				type="text" class="form-control"  value="${info.publishURL }">
			</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>动态匹配：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
				disabled="disabled"	name="matchOnUriPrefix" ${info.matchOnUriPrefix==1?'checked':'' } id="inlineRadio1" value="1" >
					是
				</label> <label class="radio-inline"> <input type="radio"
				disabled="disabled"	name="matchOnUriPrefix" ${info.matchOnUriPrefix==0?'checked':'' } id="inlineRadio2"
					value="0"  > 否
				</label>
			</p>
			</div>
		</div>
		<input name="matchOnUriPrefix" value="${info.matchOnUriPrefix }" class="hide">
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>代理地址：
				</label>
			<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
			<textarea id="service_addr_serviceManager" 
				name="prxoyURL" row="3"
				data='[{"type":"empty","msg":"代理地址不能为空"}]'>${info.prxoyURL }</textarea>
				</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>授权类型：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
					name="isAuth" ${info.isAuth==1?'checked':'' } id="inlineRadio3"
					value="1"> 授权访问
				</label> <label class="radio-inline"> <input type="radio"
					name="isAuth" ${info.isAuth==0?'checked':'' } id="inlineRadio4" value="0">
					公开
				</label>
			</p>
		</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>记录日志：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
					name="writeLog" ${info.writeLog==1?'checked':'' }  id="inlineRadio5"
					value="1"> 记录
				</label> <label class="radio-inline"> <input type="radio"
					name="writeLog" ${info.writeLog==0?'checked':'' } id="inlineRadio6" value="0"> 不记录
				</label>
				
			</p>
		</div>
		</div>
		
		<div class="form-group">
				<label class="col-xs-3 control-label no-padding-right">
				   <font color="red">*</font>状态：
				</label>
				<div class="col-xs-8" style="padding-left: 2px; padding-right: 1px;">
				<p>
				<label class="radio-inline"> <input type="radio"
					name="routeStatus" ${info.routeStatus==1?'checked':'' } id="inlineRadio3"
					value="1"> 启用
				</label> <label class="radio-inline"> <input type="radio"
					name="routeStatus" ${info.routeStatus==0?'checked':'' } id="inlineRadio4" value="0">
					禁用
				</label>
			</p>
		</div>
		</div>
		
		<input type="text" name="serviceType" id="inlineRadio7" value="2" class="hide"/>
		<input type="text" name="routeId" id="inlineRadio7" value="${serviceId }" class="hide"/>
	</form>
</div>
<div class="modal-footer">
	<div>
		<button type="button" class="btn btn-pink btn-xs"
			onclick="reset_serviceManager()">重置</button>
			<button type="button" class="btn btn-primary btn-xs"
			onclick="saveService_serviceDetails()">保存</button>
		<button id="backToList" type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
	</div>
</div>
<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/serviceManage/js/serviceDetails.js"></script>
