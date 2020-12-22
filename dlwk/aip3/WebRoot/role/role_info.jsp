<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="panel panel-default"
	style="border: 0px; margin-bottom: 0px;">
	<div class="panel-body">
		<form class="form-horizontal"
			style="margin-left: 20px; margin-right: 20px;" id="role-form">
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">角色名称:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="角色名称" class="col-lg-12 col-md-12"
						value="${info.roleName }" name="roleName"
						data='[{"type":"empty","msg":"角色名称不能为空"},{"type":"length","maxLength":20,"msg":"长度"}]' />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">角色状态:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" name="status" value="${info.status }">
						<option value="1">启用</option>
						<option value="0">禁用</option>
					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">备注信息:</label>
				<div class="col-lg-7 col-md-6">
					<textarea class="form-control" name="remark" placeholder="角色备注信息"
						data='[{"type":"length","maxLength":512,"msg":"备注文本长度"}]'>${info.remark }</textarea>
				</div>
			</div>
			<input type="hidden" name="roleId" value="${info.roleId }" />
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
					id="role-save-sbtn">
					<i class="icon-save"></i>保存
				</button>
			</c:when>
			<c:otherwise>
				<!--编辑  -->
				<button class="btn btn-info btn-xs" type="button"
					id="role-edit-sbtn">
					<i class="icon-pencil"></i>修改
				</button>
			</c:otherwise>
		</c:choose>
	</div>
</div>
<script type="text/javascript" src="${ctx }/role/js/role_info.js"></script>