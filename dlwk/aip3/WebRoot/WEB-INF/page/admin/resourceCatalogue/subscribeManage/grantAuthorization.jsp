<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<!-- <div class="modal-header">
	<button type="button" class="close" data-dismiss="modal"
		aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title">信息资源中心授权</h4>
</div> -->
<div class="progress m0_15">
	<%-- 	<ul class="steps" style="width: 100%;">
		<li data-step="1" class="active"><span class="step">申请</span></li>
		<c:if test="${not empty adminApprovalNode}">
			<li data-step="2" class="active"><span class="step">受理</span></li>
		</c:if>
		<c:if test="${not empty reousrceOwnerApprovalNode}">
			<li data-step="3"><span class="step">审批</span></li>
		</c:if>
		<c:if test="${not empty grantAuthorizationNode}">
			<li data-step="4"><span class="step">授权</span></li>
		</c:if>
	</ul> --%>
	<c:forEach var="p" items="${processState}">
		<div class="${p.state=='1' ? 'progress-bar progress-bar-striped progress-bar-success':'progress-bar'}"
			style="width: ${processPercent}%">
			<span class="">${p.name}</span>
		</div>
	</c:forEach>
</div>
<div class="modal-body">
	<form class="form-horizontal" role="form" id="from_process">
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 申请人 </label>
			<div class="row">
				<div class="col-md-4">

					<input type="text" name="name" value="${user.name }"
						id="resourceId" class="col-xs-10 col-sm-10 input-sm"
						readonly="true"> <input type="text" id="getUserId"
						style="display: none;" value="${currentUser.userId }" >
				</div>
				<div class="col-md-5">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-input-readonly"> 申请人部门 </label>
					<div class="col-sm-9">
						<input type="text" name="phone" value="${user.orgName}"  
							class="col-xs-10 col-sm-12 input-sm" readonly="true">
					</div>
				</div>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 资产名称 </label>
			<div class="row">
				<div class="col-md-4">

					<input type="text" name="name" value="${catalogueInfo.resourceName }"
						id="resourceId" class="col-xs-10 col-sm-10 input-sm"
						readonly="true"> 
				</div>
				<div class="col-md-5">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-input-readonly"> 资产所有方 </label>
					<div class="col-sm-9">
						<input type="text" name="phone" value="${catalogueInfo.provider.orgName }"  
							class="col-xs-10 col-sm-12 input-sm" readonly="true">
					</div>
				</div>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 申请时间 </label>
			<div class="row">
				<div class="col-md-4">

					<input type="text" name="name" value="${applyResourceTask.createTime }"
						id="resourceId" class="col-xs-10 col-sm-10 input-sm"
						readonly="true">
				</div>
				<div class="col-md-5">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-input-readonly"> 申请人电话</label>
					<div class="col-sm-9">
						<input type="text" name="phone" value='${applyResourceTask.variableMap["resourceApply.phone"] }'  
							class="col-xs-10 col-sm-12 input-sm" readonly="true">
					</div>
				</div>
			</div>
		</div>
		

		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 数据获取方式 </label>
			<div class="row">
				<div class="col-sm-4 disabled">
					<c:choose>
						<c:when
							test='${applyResourceTask.variableMap["resourceApply.dataType"]==0}'>
							<span Style="margin-top: 10px;"  class="label label-sm label-success">数据服务</span>
						</c:when>

						<c:otherwise>
							<span Style="margin-top: 10px;"  class="label label-sm label-success">文件</span>
						</c:otherwise>
					</c:choose>
				</div>
				<div class="col-md-5">
					<label class="col-sm-3 control-label no-padding-right"
						for="form-input-readonly"> 更新频率</label>
					<div class="col-sm-9">
						<c:if
							test='not empty ${applyResourceTask.variableMap["resourceApply.dataExchangeRate"]}'></c:if>
						<c:choose>
							<c:when
								test='${applyResourceTask.variableMap["resourceApply.dataExchangeRate"]==1}'>
								<span style="margin-top: 10px;"
									class="label label-sm label-warning">每天更新</span>
							</c:when>
							<c:when
								test='${applyResourceTask.variableMap["resourceApply.dataExchangeRate"]==2}'>
								<span style="margin-top: 10px;"
									class="label label-sm label-warning">每周更新</span>
							</c:when>
							<c:when
								test='${applyResourceTask.variableMap["resourceApply.dataExchangeRate"]==3}'>
								<span style="margin-top: 10px;"
									class="label label-sm label-warning">每月更新</span>
							</c:when>
							<c:when
								test='${applyResourceTask.variableMap["resourceApply.dataExchangeRate"]==4}'>
								<span style="margin-top: 10px;"
									class="label label-sm label-warning">每半年更新</span>
							</c:when>
							<c:when 
								test='${applyResourceTask.variableMap["resourceApply.dataExchangeRate"]==5}'>
								<span style="margin-top: 10px;"="margin-top: 10px;"
									class="label label-sm label-warning">每年更新</span>
							</c:when>
						</c:choose>
					</div>
				</div>
			</div>
		</div>
		
		
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 申请说明 </label>
			<div class="col-sm-9">
			<textarea class="form-control" rows="3" disabled="" placeholder="Textarea"> ${applyResourceTask.variableMap["resourceApply.describe"] }</textarea>
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 申请字段 </label>
			<div class="col-sm-9">
			
			<c:forEach var="metaInfo" items="${list}">
				<label class="checkbox-inline">
				  <c:choose>
				  
				   <c:when test="${fn:contains(applyMetaList,metaInfo.metaInfoId)}">    
				   <input type="checkbox" checked="checked" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})
				   </c:when>
				   
				   <c:otherwise>  <input type="checkbox" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName }( ${metaInfo.field.pyName})
				   </c:otherwise>
				  
				</c:choose>
				  
				</label>
			</c:forEach>
			

			
			
			</div>
		</div>
		<c:if test="${not empty adminApproval}">
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 受理意见 </label>
			<div class="col-sm-9">
				<textarea readonly="" class="form-control" id="acceptanceOpinion" name="describe"
					>${adminApproval.variableMap["acceptanceOpinion"] }</textarea>
			</div>
		</div>
		</c:if>
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 审批意见 </label>
			<div class="col-sm-9">
				<textarea class="form-control" id="acceptanceOpinion" name="describe" disabled
					placeholder="请在此填写本次申请的资源用于支撑的系统、平台或业务，并填写本次申请的资源拟进行数据的方式和频率。">${reousrceOwnerApproval.variableMap["ownerOpinion"]==null?"无意见":reousrceOwnerApproval.variableMap["ownerOpinion"]}</textarea>
					
			</div>
		</div>
		
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1"> 审批字段 </label>
			<div class="col-sm-9">
			
			<c:forEach var="metaInfo" items="${list}">
				<label class="checkbox-inline">
				  <c:choose>
				  
				   <c:when test="${fn:contains(metaList,metaInfo.metaInfoId)}">    
				   <input type="checkbox" checked="checked" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})
				   </c:when>
				   
				   <c:otherwise>  <input type="checkbox" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName }( ${metaInfo.field.pyName})
				   </c:otherwise>
				</c:choose>
				</label>
			</c:forEach>
			</div>
		</div>
		<div class="form-group">
			<label class="col-sm-2 control-label no-padding-right"
				for="form-field-1">授权意见 </label>
			<div class="col-sm-9">
				<textarea class="form-control" id="grantOpinion" name="describe" 
					placeholder="请填写授权意见"></textarea>
					
			</div>
		</div>
		
		
		
	</form>
</div>
<div class="form-actions center" style="margin-bottom: 0;">
			<button type="button" class="btn btn-sm btn-success" id="btn_agree" processId=${processId} orderId=${orderId } taskId=${taskId }>
				同意 
			</button>
			<button type="button" class="btn btn-sm btn-danger" id="btn_disagree" processId=${processId} orderId=${orderId } taskId=${taskId }>
				不同意
			</button>
		</div>
<script>
$(function() {
	$("#btn_agree").click(function(e) {
		var acceptanceOpinion = $("#grantOpinion").val();
		var objReg=/.*\S.*/; 
        if(!objReg.test(acceptanceOpinion)  ){
        	$.alert("请填写授权意见");
              $("#grantOpinion").focus(); 
              return false;
        }
		submitMethod(0);
	});
	$("#btn_disagree").click(function(e) {
		submitMethod(-1);
	});
})

	
function submitMethod(method) {
	var dataPara = $('#from_process').serialize();
	dataPara = decodeURIComponent(dataPara, true);
	var inputList = $("#table_resource").find("input");
	var grantOpinion = $("#grantOpinion").val();
	$.ajax({
		url : ctx + '/mdp/admin/applyResourceController/grantProcess.json',
		method : "post",
		dataType : "json",
		data : {
			method : method,
			taskId : $("#btn_agree").attr("taskId"),
			grantOpinion : grantOpinion,
			userId:$("#getUserId").val()
		},
		success : function(data) {
			if (data.success) {
				$.message("处理成功！");
				$('#myModal').modal('hide');
				//listApply();
				//listFinish();
				listApproval();
				//listAuth();
				/* param = {
						start : 0,
						time:new Date().getTime()
					};
				updatePagination(ctx
						+ "/app/http/sys/workFlowHandler/getProcessTodoJsonList",param,100,10,function(data,pageIndex){
					updatePagenation(data);
				}); */
			} else {
				$.alert("处理失败!"+data.msg);
				$('#choose_resource').modal('hide');
				/* param = {
						start : 0,
						time:new Date().getTime()
					};
				updatePagination(ctx
						+ "/app/http/sys/workFlowHandler/getProcessTodoJsonList",param,100,10,function(data,pageIndex){
					updatePagenation(data);
				}); */
			}
		}
	});
}
</script>
