<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<mdp:mdpHeader title="资源申请-信息资产管理平台V3.0" curItem="" />
<link href="${ctx}/page/welcome/application/css/city-picker.css" rel="stylesheet" type="text/css">
<style>
.tabl th {
	text-align: center;
}

.alter_contactor i {
	width: 20px;
	height: 20px;
}

input[type=checkbox].ace {
	opacity: 0;
	position: absolute;
	z-index: 12;
	width: 18px;
	height: 18px;
	cursor: pointer;
}

input[type=checkbox].ace:checked,input[type=checkbox].ace:focus {
	outline: none !important;
}

input[type=checkbox].ace+.lbl {
	position: relative;
	z-index: 11;
	display: inline-block;
	margin: 0;
	line-height: 20px;
	min-height: 18px;
	min-width: 18px;
	font-weight: normal;
}

input[type=checkbox].ace+.lbl::before {
	font-family: fontAwesome;
	font-weight: normal;
	font-size: 12px;
	color: #32a3ce;
	content: "\a0";
	background-color: #fafafa;
	border: 1px solid #c8c8c8;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	border-radius: 0;
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	height: 16px;
	line-height: 14px;
	min-width: 16px;
	margin-right: 1px;
}

input[type=checkbox].ace:checked+.lbl::before {
	display: inline-block;
	content: '\f00c';
	background-color: #f5f8fc;
	border-color: #adb8c0;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0 -15px 10px -12px
		rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
}

.title {
	float: left;
	line-height: 44px;
	width: 100px;
}

.res_field_btn:hover {
	border-color: #ddd;
	background: inherit;
	color: #666;
}
</style>
<section class="main_page">
	<div class="box mb20">
		<div class="cart_shopList" id="rc_CatalogList" style="border: 0; background: inherit;">
			<label class="exam_check" style="cursor: default;">
				<div class="cart_col1">
					<div class="cart_img">
						<img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px; height: 74px; border: 1px #d7d7d7 solid;">
					</div>
				</div>
				<div class="cart_col2">
					<div class="cart_detail" style="padding: 9px 0;">
						<p class="cart_name">${catalogueInfo.resourceName }</p>
						<div class="res_labs" style="color: #999;">
							数据提供方：<span style="color: #666;">${catalogueInfo.provider.orgName }</span>
						</div>
						<div class="res_labs" style="color: #999;">
							<span>申请时间:</span> <span>${histTasks[0].createTime }</span>
						</div>
					</div>
				</div>
				<div class="cart_col3"></div>
			</label>
		</div>
		<div class="flow_box">
			<ul class="cus_flow flow_${processState.size()}">
				<c:forEach var="p" items="${processState}" varStatus="status">
					<c:if test="${p.result==-1}">
					     <li class="flow_li red ">
					</c:if>
					<c:if test="${p.result  !=-1 && p.state=='0' }">
					    <li class="flow_li step ">
					</c:if>
					<c:if test="${p.result  !=-1 && p.state=='1' }">
					    <li class="flow_li green ">
					</c:if>
					
						<span>${p.name}</span>
						<div class="flow_num">
							<i class="fa fa-check <c:if test="${p.result == -1}">fa-minus</c:if>"></i>
							<span>${status.index + 1}</span>
						</div>
						<div class="flow_line"></div>
					</li>
				</c:forEach>
				<!-- <li class="flow_li green">
					<span>提交申请</span>
					<div class="flow_num">
						<i class="fa fa-check"></i>
						<span>1</span>
					</div>
					<div class="flow_line"></div>
				</li>
				<li class="flow_li step">
					<span>受理</span>
					<div class="flow_num">
						<i class="fa fa-check"></i>
						<span>2</span>
					</div>
					<div class="flow_line"></div>
				</li>
				<li class="flow_li">
					<span>审批</span>
					<div class="flow_num">
						<i class="fa fa-check"></i>
						<span>3</span>
					</div>
					<div class="flow_line"></div>
				</li>
				<li class="flow_li">
					<span>评价</span>
					<div class="flow_num">
						<i class="fa fa-check"></i>
						<span>4</span>
					</div>
					<div class="flow_line"></div>
				</li> -->
			</ul>
			<!-- <div class="flow">
				<div class="clearfix flow_top">
					<ul>
						<c:forEach var="p" items="${processState}">
							<li class="flow_li"><span class="com_color">${p.name}</span></li>
						</c:forEach>
					</ul>
				</div>
				<div class="flow_bot flow${finishNum}"></div>
			</div> -->
		</div>
		<div class="con_tit">
			<span class="con_tit_ico"></span>申请说明
		</div>
		<div class="res_con">
			<textarea id="descid" readonly="readonly" rows="4" style="width: 100%; border: 1px solid #d5d5d5; padding: .5em 1em;"> ${applyResource.variableMap["resourceApply.describe"] } </textarea>
		</div>

		<div class="con_tit">
			<span class="con_tit_ico"></span>申请字段
		</div>
		<ul class="res_con" style="display: table;">
			<c:forEach var="metaInfo" items="${list}">
				<c:if test="${fn:contains(metaList,metaInfo.metaInfoId)}">
					<li class="res_field res_field_sel"><a class="res_field_btn">${metaInfo.field.fieldName } ( ${metaInfo.field.pyName})</a><i></i></li>
				</c:if>
			</c:forEach>
		</ul>
		<div class="con_tit">
			<span class="con_tit_ico"></span>联系人信息
		</div>
		<div class="res_con">
			<div class="row m0">
				<div style="float: left; line-height: 28px;">申请人电话：</div>
				<input id="phoneid" type="text" readonly="readonly" value="${applyResource.variableMap["resourceApply.phone"] }"/>
			</div>
		</div>
		<div class="con_tit">
			<span class="con_tit_ico"></span>其他需求
		</div>
		<div class="res_con">
			<div id="dataExChangeType" class="row m0">
				<div class="title">数据交换方式：</div>
				<ul>

					<li class="res_field res_field_sel" name="dataTypeName" dataid="0"><a class="res_field_btn">${applyResource.variableMap["resourceApply.dataType"] ==0?'数据服务':'文件' }</a><i></i></li>
					<!-- <li class="res_field" name="dataTypeName" dataid="1"><a class="res_field_btn">文件</a><i></i></li> -->
				</ul>
			</div>
			<div id="dataUpdateFrequency" class="row m0">
				<div class="title">数据更新频率：</div>
				<ul>

					<c:choose>
						<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==1}'>
							<li class="res_field res_field_sel" name="dataExchangeRate" dataid="1"><a class="res_field_btn">每日更新</a><i></i></li>
						</c:when>
						<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==2}'>
							<li class="res_field res_field_sel" name="dataExchangeRate" dataid="2"><a class="res_field_btn">每周更新</a><i></i></li>
						</c:when>
						<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==3}'>
							<li class="res_field res_field_sel" name="dataExchangeRate" dataid="3"><a class="res_field_btn">每月更新</a><i></i></li>
						</c:when>
						<c:when test='${applyResource.variableMap["resourceApply.dataExchangeRate"]==4}'>
							<li class="res_field res_field_sel" name="dataExchangeRate" dataid="4"><a class="res_field_btn">每年更新</a><i></i></li>
						</c:when>

					</c:choose>
				</ul>
			</div>
		</div>

		<c:if test="${not empty adminApprovalNode and not empty adminApproval}">
			<div>
				<div class="con_tit">
					<span class="con_tit_ico"></span>受理情况
				</div>
				<div class="res_con">
					<div class="res_labs" style="color: #999;">
						受理人：<span style="color: #666;">${adminApprovalUser.name}</span>
					</div>
					<div class="res_labs" style="color: #999;">
						受理时间：<span style="color: #666;">${adminApproval.finishTime }</span>
					</div>
					<div class="res_labs" style="color: #999;">
						受理意向：<span style="color: #666;">${adminApproval.variableMap.method==0?"同意":"不同意" }</span>
					</div>
					<div class="res_labs" style="color: #999;">
						受理意见：<span style="color: #666;">${adminApproval.variableMap.acceptanceOpinion }</span>
					</div>
				</div>
			</div>
		</c:if>

		<c:if test="${not empty reousrceOwnerApprovalNode and not empty reousrceOwnerApproval}">
			<div>
				<div class="con_tit">
					<span class="con_tit_ico"></span>审批情况
				</div>
				<div class="res_con">
					<div class="res_labs" style="color: #999;">
						审批人：<span style="color: #666;">${reousrceOwnerApprovalUser.name}</span>
					</div>
					<div class="res_labs" style="color: #999;">
						审批时间：<span style="color: #666;">${reousrceOwnerApproval.finishTime }</span>
					</div>
					<div class="res_labs" style="color: #999;">
						审批意向：<span style="color: #666;">${reousrceOwnerApproval.variableMap.method==0?"同意":"不同意" }</span>
					</div>
					<div class="res_labs" style="color: #999;">
						审批意见：<span style="color: #666;">${reousrceOwnerApproval.variableMap.ownerOpinion }</span>
					</div>
				</div>
				
				<c:if test="${reousrceOwnerApproval.variableMap.method == 0}">
				<div  class="res_con">
					   已授权字段： <span> <c:forEach var="metaInfo" items="${list}">
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


					</span> 
				</div>
				</c:if>
				
			</div>
		</c:if>


		<c:if test="${not empty grantAuthorizationNode and not empty grantAuthorization }">
			<div>
				<div class="con_tit">
					<span class="con_tit_ico"></span>授权情况
				</div>
				<div class="res_con">
					<div class="res_labs" style="color: #999;">
						授权人：<span style="color: #666;">${grantAuthorizationUser.name}</span>
					</div>
					<div class="res_labs" style="color: #999;">
						授权时间：<span style="color: #666;">${grantAuthorization.finishTime }</span>
					</div>
					<div class="res_labs" style="color: #999;">
						授权意向：<span style="color: #666;">${grantAuthorization.variableMap.method==0?"同意":"不同意" }</span>
					</div>
					<div class="res_labs" style="color: #999;">
						授权意见：<span style="color: #666;">${grantAuthorization.variableMap.grantOpinion }</span>
					</div>
				</div>
			</div>
		</c:if>

	</div>
</section>
<mdp:mdpFooter />



