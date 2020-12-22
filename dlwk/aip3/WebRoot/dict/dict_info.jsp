<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="panel panel-default" style="border: 0px;margin-bottom:0px;">
	<div class="panel-body">
		<form class="form-horizontal" id="dict-form">
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">字典分类:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="上级字典" class="col-lg-12 col-md-12"
						value="${info.parent.text }" parentId="${info.parent.dictId}"
						id="" disabled="disabled"> ${dropdownTreeHtml }
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">字典名称:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="字典名称" class="col-lg-12 col-md-12"
						value="${info.text }" name="text"
						data='[{"type":"empty","msg":"分类名称不能为空"},{"type":"length","maxLength":100,"msg":"长度不能大于100"}]' />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">字典值:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" disabled="disabled" placeholder="字典值" class="col-lg-12 col-md-12"
						value="${info.value }" name="value" />
				</div>
				<div style="margin-top: 5px;padding-left:2px;" class="col-lg-3 col-md-3">自动生成<input type="checkbox"  <c:if test="${op=='add' }"> checked="checked"</c:if>   name="autoValue" value="1"/></div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">是否有子项:</label>
				<div class="col-lg-7 col-md-6">
					<select class="form-control" name="leaf" value="${info.leaf}">
						<option value="1">否</option>
						<option value="0">是</option>
					</select>
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
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
				<label class="col-lg-2 col-md-3 control-label no-padding-right">排序号:</label>
				<div class="col-lg-7 col-md-6">
					<input type="text" placeholder="排序号" class="col-lg-12 col-md-12"
						value="${info.sortNum }" name="sortNum" />
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">备注信息:</label>
				<div class="col-lg-7 col-md-6">
					<textarea class="form-control" name="remark" placeholder="备注信息">${info.remark }</textarea>
				</div>
			</div>
			<input type="hidden" name="dictId" value="${info.dictId}" /> <input
				type="hidden" name="parentId" value="${info.parent.dictId}" />
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
					id="dict-save-sbtn">
					<i class="icon-save"></i>保存
				</button>
			</c:when>
			<c:otherwise>
				<!--编辑  -->
				<button class="btn btn-info btn-xs" type="button"
					id="dict-edit-sbtn">
					<i class="icon-pencil"></i>修改
				</button>
			</c:otherwise>
		</c:choose>
	</div>
</div>

<script type="text/javascript" src="${ctx }/dict/js/dict_info.js"></script>