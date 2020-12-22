<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<link rel="stylesheet"
	href="${ctx }/resources/css/jquery.fonticonpicker.min.css" />
<link rel="stylesheet"
	href="${ctx }/resources/css/jquery.fonticonpicker.grey.min.css" />
<link rel="stylesheet"
	href="${ctx }/resources/css/jquery.fonticonpicker.darkgrey.min.css" />
<link rel="stylesheet"
	href="${ctx }/resources/css/jquery.fonticonpicker.bootstrap.min.css" />
<link rel="stylesheet"
	href="${ctx }/resources/css/jquery.fonticonpicker.inverted.min.css" />
<script src="${ctx}/resources/js/jquery.fonticonpicker.min.js"></script>
<div class="panel panel-default"
	style="border: 0px; margin-bottom: 0px;">
	<div class="panel-body">
		<form class="form-horizontal"
			style="margin-left: 20px; margin-right: 20px;" id="resource-form">
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">上级资源:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="上级资源" class="col-lg-12 col-md-12"
						value="${info.parent.text }" parentId="${info.parent.resourceId}"
						id="parentText" readonly=""'> ${dropdownTreeHtml }
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">资源名称:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="资源名称" class="col-lg-12 col-md-12"
						value="${info.text }" name="text"
						data='[{"type":"empty","msg":"资源名称不能为空"},{"type":"length","maxLength":20,"msg":"资源名称不能超过20个字符"}]'
						id="resourceText">
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">资源类型:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" class="col-lg-12 col-md-12"
						style="padding-left: 0px;" id="resourceTypeSelect"
						<c:if test="${op=='edit'}">disabled="disabled"</c:if>>
						<c:choose>
							<c:when test="${info.parent.resourceType==0 }">
								<option value="0"
									<c:if test="${info.resourceType==0 }">selected</c:if>>目录</option>
								<option value="3"
									<c:if test="${info.resourceType==3 }">selected</c:if>>系统页面</option>
								<option value="2"
									<c:if test="${info.resourceType==2 }">selected</c:if>>URL</option>
							</c:when>
							<c:when test="${info.parent.resourceType==3}">
								<option value="4"
									<c:if test="${info.resourceType==4 }">selected</c:if>>数据请求</option>
								<option value="1"
									<c:if test="${info.resourceType==1 }">selected</c:if>>功能按钮</option>
								<option value="3"
									<c:if test="${info.resourceType==3 }">selected</c:if>>系统页面</option>
							</c:when>
						</c:choose>


					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">资源地址:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="资源地址" class="col-lg-12 col-md-12"
						value="${info.href }" id="hrefText">
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">序号:</label>
				<div class="col-lg-7 col-md-6">
					<input type="number" placeholder="序号" class="col-lg-12 col-md-12"
						value="${info.sortNumber }" min="1" name="sortNumber" >
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">功能状态:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" name="status" value="${info.status }">
						<option value="1">启用</option>
						<option value="0">禁用</option>
					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group" style="display:none;" id="resource-open-type">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">打开方式:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" name="openType" value="${info.openType }">
						<option value="0">框架内打开</option>
						<option value="1">新窗口</option>
					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">资源备注:</label>
				<div class="col-lg-7 col-md-6">
					<textarea class="form-control" id="r_remark_input"
						placeholder="资源备注">${info.remark }</textarea>
				</div>
			</div>
			<input type="hidden" id="hiddenIcon" value="${info.icon }" /> <input
				type="hidden" id="resourceId_text" value="${info.resourceId }" />
		</form>
	</div>
	<div class="panel-footer"
		style="padding-bottom: 0px; text-align: right;">
		<button class="btn btn-danger rest-btn btn-xs" type="button"
			style="margin-right: 10px;">
			<i class="icon-refresh"></i>重置
		</button>
		<c:choose>
			<c:when test="${op=='add' }">
				<!-- 添加 -->
				<button class="btn btn-info btn-xs" type="button"
					id="resource-save-sbtn">
					<i class="icon-save"></i>保存
				</button>
			</c:when>
			<c:otherwise>
				<!--编辑  -->
				<button class="btn btn-info btn-xs" type="button"
					id="resource-edit-sbtn">
					<i class="icon-pencil"></i>修改
				</button>
			</c:otherwise>
		</c:choose>
	</div>
</div>
<script type="text/javascript" src="${ctx}/resource/js/resource_info.js"></script>