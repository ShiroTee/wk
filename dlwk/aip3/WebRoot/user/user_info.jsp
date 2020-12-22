<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>

#downShow {
	width: 27px;
	height: 24px;
}
#clickButton {
	width: 27px;
    height: 29px;
    float: right;
    /* margin-left: 355px; */
    right: 1px;
    z-index: 5;
    float: right;
    margin-top: 3px;
    position: absolute;
}

.tree_icon_chexkbox {
	color: rgba(249, 232, 206, 0);
	width: 13px;
	height: 13px;
	line-height: 13px;
	font-size: 11px;
	text-align: center;
	border-radius: 3px;
	-webkit-box-sizing: content-box;
	-moz-box-sizing: content-box;
	box-sizing: content-box;
	background-color: #fafafa;
	border: 1px solid #CCC;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.icon-ok {
	background-color: #f9a021;
	border-color: #f9a021;
	color: #FFF;
}
</style>
<div class="panel panel-default"
	style="border: 0px; margin-bottom: 0px;">
	<div class="panel-body">
		<form class="form-horizontal"
			style="margin-left: 20px; margin-right: 20px;" id="user-form">
			<div class="form-group">
				<label class="col-xs-2 control-label no-padding-right"><font
					color="red">*</font>登录名:</label>
				<div class="col-xs-4" style="padding-left: 2px; padding-right: 1px;">
					<input type="text" placeholder="登录名" class="col-lg-12 col-md-12"
						value="${info.loginName }" name="loginName" 
						<c:if test="${op=='edit' }">readonly="readonly"</c:if>
						data='[{"type":"empty","msg":"不能为空"},{"type":"length","msg":"长度大于18"},{"type":"pattern","expression":"^[a-zA-Z][a-zA-Z0-9_-]*$","msg":"登录名不能包含中文或特殊字符"}]' />
				</div>
				<label class="col-xs-2 control-label no-padding-right"><font
					color="red">*</font>姓名:</label>
				<div class="col-xs-3" style="padding-left: 2px; padding-right: 1px;">
					<input type="text" placeholder="姓名" class="col-lg-12 col-md-12"
						value="${info.name }" name="name" style="width: 280px;"
						data='[{"type":"empty","msg":"不能为空"}]' />
				</div>
			</div>
			<!-- 
			<c:if test="${op=='add' }">
				<div class="form-group">
					<label class="col-xs-2 control-label no-padding-right"><font
						color="red">*</font>密码:</label>
					<div class="col-xs-4"
						style="padding-left: 2px; padding-right: 1px;">
						<input type="password" placeholder="密码"
							class="col-lg-12 col-md-12" id="password-text" value="12345678"
							name="loginPassword"
							data='[{"type":"empty","msg":"密码不能为空"},{"type":"length","maxLength":18,"minLength":6,"msg":"密码长度"}]' />
					</div>
					<label class="col-xs-2 control-label no-padding-right"><font
						color="red">*</font>重复密码:</label>
					<div class="col-xs-4"
						style="padding-left: 2px; padding-right: 1px;">
						<input type="password" placeholder="重复密码"
							class="col-lg-12 col-md-12" id="password2-text" value="12345678" />
					</div>
				</div>
			</c:if>
			 -->
			<div class="form-group">
				<label class="col-xs-2 control-label no-padding-right"><font
					color="red">*</font>联系电话:</label>
				<div class="col-xs-4" style="padding-left: 2px; padding-right: 1px;">
					<input type="text" placeholder="联系电话" class="col-lg-12 col-md-12"
						value="${info.tel }" name="tel"
						data='[{"type":"pattern","msg":"电话号码格式错误,只能是11位数字或8位数字","expression":"^(([0-9]{8})|([0-9]{11}))$"},{"type":"empty","msg":"联系电话不能为空"}]' />
				</div>
				<label class="col-xs-2 control-label no-padding-right"><font
					color="red">*</font>所属单位/部门:</label>
				<div class="col-xs-3" style="padding-left: 2px; padding-right: 1px;   width: 280px;">
						<div style="width:100%;position: relative;    height: 30px;" >
							<div id="suggestSelect" style="float:left;width: 100%;">
								<input type="text" id="orgNameText" name="orgName" style="width:100%" value="${info.orgName}">
							</div>
						<div id="clickButton">
							<div id="downShow" style="background-image: url(${ctx }/user/image/xiabiao.jpg);">
						</div>
					</div>
					</div>
					<div style="max-height:200px;position: absolute; width: 100%;padding-left: 0;background: #fff;z-index: 9;" id="gov_tree_userinfo" treeData='${treeData}' 
					value="I_wJgN0CEeOlovfuVspipA" class="tree tree-selectable"></div>
				</div>
				<input type="text" id="orgId" name="orgId" class="hide" value="${info.orgId}">
				<input type="text" id="orgName" class="hide" name="orgName" style="width:100%" value="${info.orgName}">
			</div>
			<div class="form-group">
				<label class="col-xs-2 control-label no-padding-right">备注信息:</label>
				<div class="col-xs-10"
					style="padding-left: 2px; padding-right: 0px;">
					<textarea class="form-control" placeholder="用户备注信息" name="remark">${info.remark }</textarea>
				</div>
			</div>
			<input type="hidden" value="${info.userId }" name="userId" />
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
					id="user-save-sbtn">
					<i class="icon-save"></i>保存
				</button>
			</c:when>
			<c:otherwise>
				<!--编辑  -->
				<button class="btn btn-info btn-xs" type="button"
					id="user-edit-sbtn">
					<i class="icon-pencil"></i>修改
				</button>
			</c:otherwise>
		</c:choose>
	</div>
</div>
<script>
var orgname = '${info.name }';
var orgId = '${info.orgId }';
</script>
<script type="text/javascript" src="${ctx }/user/js/user_info.js"></script>