<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="panel panel-default" style="border: 0px;margin-bottom:0px;">
	<div class="panel-body">
		<form class="form-horizontal" id="org-form">
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">上级机构:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text"  class="col-lg-12 col-md-12"
						value="${info.parent.orgName }" parentId="${info.parent.orgId}"
						id="" disabled="disabled" >
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">机构名称:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="请输入组织机构名称" class="col-lg-12 col-md-12"
						value="${info.orgName }" name="orgName"
						data='[{"type":"empty","msg":"机构名称不能为空"},{"type":"length","maxLength":50,"msg":"长度不能大于50"}]' />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">机构编码:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" disabled="disabled" placeholder="自动生成机构编码" class="col-lg-12 col-md-12"
						value="${info.orgCode }" name="orgCode" />
				</div>
				<div style="margin-top: 5px;padding-left:2px;" class="col-lg-3 col-md-3">自动生成<input type="checkbox" checked="checked" name="autoValue" value="1"/></div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">是否有下级:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" name="leaf" value="${info.leaf}">
						<option value="1">否</option>
						<option value="0">是</option>
					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">机构简称:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="机构简称" class="col-lg-12 col-md-12"
						value="${info.orgShortName }" name="orgShortName"
						data='[{"type":"length","maxLength":50,"msg":"长度不能大于50"}]' />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3"></div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">状态:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" name="status" value="${info.status}">
						<option value="1">启用</option>
						<option value="0">禁用</option>
					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">备注信息:</label>
				<div class="col-lg-7 col-md-6">
					<textarea class="form-control" name="orgRemark" placeholder="备注信息">${info.orgRemark }</textarea>
				</div>
			</div>
			<input type="hidden" name="orgId" value="${info.orgId}" />
			<input type="hidden" name="parentId" value="${info.parent.orgId}" />
		</form>
	</div>
	<div class="panel-footer" style="padding-bottom:0px;text-align:right;">
		<button class="btn btn-danger rest-btn btn-xs"
			type="button" style="margin-right:10px;">
			<i class="icon-refresh"></i>重置
		</button>
		<c:choose>
			<c:when test="${op=='add' }">
				<!-- 添加 -->
				<button class="btn btn-info btn-xs" type="button" 
					id="org-save-sbtn">
					<i class="icon-save"></i>保存
				</button>
			</c:when>
			<c:otherwise>
				<!--编辑  -->
				<button class="btn btn-info btn-xs" type="button"
					id="org-edit-sbtn">
					<i class="icon-pencil"></i>修改
				</button>
			</c:otherwise>
		</c:choose>
	</div>
</div>
<script type="text/javascript" src="${ctx }/orginfo/js/org_info.js"></script>