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
		<%-- 		<div class="${not empty applyResourceNode   ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar'  }" style="width: 25%">
			<span class="">申请</span>
		</div>
		<div class="${not empty adminApprovalNode and not empty adminApproval ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-striped'  }"
			style="width: 25%; background-position-x: 22px;">
			<span class="">受理</span>
		</div>
		<div
			class="${not empty reousrceOwnerApprovalNode and not empty reousrceOwnerApproval ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-striped'  }"
			style="width: 25%">
			<span class="">审批</span>
		</div>
		<div
			class="${not empty grantAuthorizationNode and not empty grantAuthorization ?'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-striped'  }"
			style="width: 25%; background-position-x: 22px;">
			<span class="">授权</span>
		</div> --%>
		<c:forEach var="p" items="${processState}">
			<c:choose>
				<c:when test="${p.result=='-1'}">
					<div class="progress-bar progress-bar-striped progress-bar-danger" style="width: ${processPercent}%">
				</c:when>
				<c:otherwise>
					<div class="${p.state=='1' ? 'progress-bar progress-bar-striped progress-bar-success':'progress-bar progress-bar-info'}"
						style="width: ${processPercent}%">
				</c:otherwise>
			</c:choose>
		     <span class="">${p.name}  </span>
	      </div>
	</c:forEach>
</div>
<div class="row" style="margin:0;">
	<ul class="p0_20 col-lg-6 col-md-6">
		<li class="conlist_li p0_20"><i class="conlist_dot"></i> 申请人：<span>${user.name} </span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 资产名称：<span>${catalogueInfo.resourceName }</span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 申请时间：<span>${histTasks[0].createTime }</span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 数据获取方式：<span>${applyResource.variableMap["resourceApply.dataType"] ==0?'数据服务':'文件' }
		</span></li>
	</ul>
	<ul class="p0_20 col-lg-6 col-md-6">
		<li class="conlist_li p0_20"><i class="conlist_dot"></i> 申请人部门：<span>${user.orgName}</span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 资产所有方：<span>${catalogueInfo.provider.orgName }</span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 申请人电话：<span>${applyResource.variableMap["resourceApply.phone"] }</span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 更新频率：<span> <c:choose>
					<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==1}'>
								 每天更新  
							</c:when>
					<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==2}'>
								 每周更新 
							</c:when>
					<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==3}'>
								 每月更新 
							</c:when>
					<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==4}'>
								 每半年更新 
							</c:when>
					<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==5}'>
								 每年更新 
							</c:when>
				</c:choose>

		</span></li>
	</ul>
	<ul class="p0_20 col-lg-12 col-md-12">
		<li class="conlist_li p0_20"><i class="conlist_dot"></i> 申请说明：<span> ${applyResource.variableMap["resourceApply.describe"] } </span></li>
		<li class="conlist_li"><i class="conlist_dot"></i> 申请字段： <span> <c:forEach var="metaInfo" items="${list}">
					<label class="checkbox-inline"> <c:choose>
							<c:when test="${fn:contains(metaList,metaInfo.metaInfoId)}">
								<input type="checkbox" checked="checked" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})
				    		      </c:when>
							<c:otherwise>
								<input type="checkbox" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName }( ${metaInfo.field.pyName})
        				    	  </c:otherwise>
						</c:choose>
					</label>

				</c:forEach>
		</span></li>
	</ul>
</div>


<c:if test="${not empty adminApprovalNode and not empty adminApproval}">
	<div class="row"  style="margin:0;">
		<div class="con_tit">
			<span class="con_tit_ico"></span> 受理情况
		</div>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 受理人：<span>${adminApprovalUser.name}</span></li>
			<li class="conlist_li"><i class="conlist_dot"></i> 受理意向：<span>${adminApproval.variableMap.method==0?"同意":"不同意" }</span></li>
		</ul>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li"><i class="conlist_dot"></i> 受理时间：<span>${adminApproval.finishTime }</span></li>
		</ul>
		<ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li"><i class="conlist_dot"></i> 受理意见：<span>${adminApproval.variableMap.acceptanceOpinion }</span></li>
		</ul>
	</div>
</c:if>
<c:if test="${not empty reousrceOwnerApprovalNode and not empty reousrceOwnerApproval}">
	<div class="row" style="margin:0;">
		<div class="con_tit">
			<span class="con_tit_ico"></span> 审批情况
		</div>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 审批人：<span>${reousrceOwnerApprovalUser.name}</span></li>
			<li class="conlist_li"><i class="conlist_dot"></i> 审批意向：<span>${reousrceOwnerApproval.variableMap.method==0?"同意":"不同意" }</span></li>
		</ul>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li"><i class="conlist_dot"></i> 审批时间：<span>${reousrceOwnerApproval.finishTime }</span></li>
		</ul>
		<ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li"><i class="conlist_dot"></i> 审批意见：<span>${reousrceOwnerApproval.variableMap.ownerOpinion}</span></li>
		</ul>
		<ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li"><i class="conlist_dot"></i> 已授权字段： <span> <c:forEach var="metaInfo" items="${list}">
						<label class="checkbox-inline"> <c:choose>
								<c:when test="${fn:contains(checkedMetaInfoList,metaInfo.metaInfoId)}">
									<input type="checkbox" checked="checked" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})
							  				 </c:when>

								<c:otherwise>
									<input type="checkbox" id="inlineCheckbox1" value="option1" disabled="">${metaInfo.field.fieldName }( ${metaInfo.field.pyName})
				 							  </c:otherwise>

							</c:choose>

						</label>
					</c:forEach>


			</span></li>
		</ul>
	</div>
</c:if>
<c:if test="${not empty grantAuthorizationNode and not empty grantAuthorization }">
	<div class="row" style="margin:0;">
		<div class="con_tit">
			<span class="con_tit_ico"></span> 授权情况
		</div>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li p0_20"><i class="conlist_dot"></i> 授权人：<span>${grantAuthorizationUser.name}</span></li>
			<li class="conlist_li"><i class="conlist_dot"></i> 授权意向：<span>${grantAuthorization.variableMap.method==0?"同意":"不同意" }</span></li>
		</ul>
		<ul class="p0_20 col-lg-6 col-md-6">
			<li class="conlist_li"><i class="conlist_dot"></i> 授权时间：<span>${grantAuthorization.finishTime }</span></li>
		</ul>
		<ul class="p0_20 col-lg-12 col-md-12">
			<li class="conlist_li"><i class="conlist_dot"></i> 授权意见：<span>${grantAuthorization.variableMap.grantOpinion}</span></li>
		</ul>
	</div>
</c:if>

</div>
<div class="modal-footer">
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
