<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<style>
#requestDetails input[type="checkbox"] {
	margin-top: 11px;
}

#requestDetails .conlist_li {
	height: inherit;
}
</style>
<div id="requestDetails" class="m0_15">
	<div class="progress">
		<!-- 当前步骤加上样式 progress-bar-striped progress-bar-success -->
		<%-- <div class="progress-bar progress-bar-striped progress-bar-success"
			style="width: 33%">
			<span class="">申请${processState}</span>
		</div>
		<div class="${not empty adminApprovalNode  ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-striped'  }"
			style="width: 33%">
			<span class="">受理</span>
		</div>
		<div
			class="${not empty reousrceOwnerApprovalNode   ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-striped'  }"
			style="width: 33%">
			<span class="">审批</span>
		</div>
		<div
			class="${not empty grantAuthorizationNode  ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-striped'  }"
			style="width: 34%; background-position-x: 22px;">
			<span class="">授权</span>
		</div> --%>
		<c:forEach var="p" items="${processState}">
		    <div class="${p.state=='1' ? 'progress-bar progress-bar-striped progress-bar-success':'progress-bar'}"
			style="width: ${processPercent}%">
			<span class="">${p.name}</span>
		    </div>
		</c:forEach> 
	</div>
	<div class="row">
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 申请人：<span>${user.name}
			<input type="text" id="getUserId"
						style="display: none;" value="${currentUser.userId }">
			</span></li>
			<li class="conlist_li"><i class="conlist_dot"></i> 资产名称：<span>${catalogueInfo.resourceName }</span>
			</li>
			<li class="conlist_li"><i class="conlist_dot"></i> 申请时间：<span>${applyResource.createTime }</span>
			</li>
			<li class="conlist_li"><i class="conlist_dot"></i> 数据获取方式：<span><c:choose>
						<c:when
							test="${applyResource.variableMap['resourceApply.dataType']==0}">
							 数据服务 
						</c:when>

						<c:otherwise>
							 文件 
						</c:otherwise>
					</c:choose></span></li>
		</ul>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 申请人部门：<span>${user.orgName}</span>
			</li>
			<li class="conlist_li"><i class="conlist_dot"></i> 资产所有方：<span>${catalogueInfo.provider.orgName }</span>
			</li>
			<li class="conlist_li"><i class="conlist_dot"></i> 申请人电话：<span>${applyResource.variableMap['resourceApply.phone'] }</span>
			</li>
			<li class="conlist_li"><i class="conlist_dot"></i> 更新频率：<span>
					<c:choose>
						<c:when
							test="${applyResource.variableMap['resourceApply.dataExchangeRate']==1}">
								 每天更新 
							</c:when>
						<c:when
							test="${applyResource.variableMap['resourceApply.dataExchangeRate']==2}">
								 每周更新 
							</c:when>
						<c:when
							test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==3}'>
								 每月更新 
							</c:when>
						<c:when
							test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==4}'>
								 每半年更新 
							</c:when>
						<c:when
							test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==5}'>
								 每年更新 
							</c:when>
					</c:choose>
			</span></li>
		</ul>
		<ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 申请说明：<span>
					${applyResource.variableMap["resourceApply.describe"] } </span></li>
			<li class="conlist_li"><i class="conlist_dot"></i> 申请字段： <span>

					<c:forEach var="metaInfo" items="${list}">

						<label class="checkbox-inline"> <c:choose>
								<c:when test="${fn:contains(metaList,metaInfo.metaInfoId)}">
									<input type="checkbox" checked="checked" id="inlineCheckbox1"
										value="option1" disabled="">${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})
				    		 </c:when>

								<c:otherwise>
									<input type="checkbox" id="inlineCheckbox1" value="option1">${metaInfo.field.fieldName }( ${metaInfo.field.pyName})
				    		 </c:otherwise>
							</c:choose>
						</label>

					</c:forEach>
			</span></li>
		</ul>
		<ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 受理意见：<span>
					<textarea class="form-control" rows="3" id="acceptanceOpinion"></textarea>
			</span></li>
		</ul>
	</div>


</div>
<div class="modal-footer">
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal"  taskId="${task.id}"
		id="btn_agree">同意</button>
	<button type="button" class="btn btn-info btn-xs btn-danger"  taskId="${task.id}"
		id="btn_disagree" data-dismiss="modal">不同意</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
<script>
	$(function() {
		$("#btn_agree").click(function(e) {
			var acceptanceOpinion = $("#acceptanceOpinion").val();
			var objReg=/.*\S.*/; 
	        if(!objReg.test(acceptanceOpinion)  ){
	        	$.alert("请填写受理意见");
	              $("#acceptanceOpinion").focus(); 
	              return false;
	        }
			submitMethod(0);
		});
		$("#btn_disagree").click(function(e) {
			submitMethod(-1);
		});
	})

	function submitMethod(method) {
		//var dataPara = $('#from_process').serialize();
		//dataPara = decodeURIComponent(dataPara, true);

		var inputList = $("#table_resource").find("input");
		var acceptanceOpinion = $("#acceptanceOpinion").val();
 
		$
				.ajax({
					url : ctx
							+ '/mdp/admin/applyResourceController/acceptanceProcess.json',
					method : "post",
					dataType : "json",
					data : {
						method : method,
						taskId : $("#btn_agree").attr("taskId"),
						acceptanceOpinion : acceptanceOpinion,
						userId : $("#getUserId").val()
					},
					success : function(data) {
						if (data.success) {
							$.message("处理成功！");
							$('#myModal').modal('hide');
							//listApply();
							//listFinish();
							listApproval();
							//listAuth();
						 
						} else {
							$.alert("处理失败" + data.msg);
							//$('#myModal').modal('hide');
							 
						}
					}
				});
	}
</script>