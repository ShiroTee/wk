<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!-- 用户修改密码 -->
<div class="panel panel-default"
	style="border: 0px; margin-bottom: 0px;">
	<div class="panel-body">
		<form class="form-horizontal"
			style="margin-left: 20px; margin-right: 20px;" id="password-info">
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">原始密码:</label>
				<div class="col-lg-7 col-md-6">
					<input type="password" placeholder="原始密码"
						class="col-lg-12 col-md-12" name="password"
						data='[{"type":"empty","msg":"不能为空"},{"type":"length","msg":"长度大于18"}]' />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">新密码:</label>
				<div class="col-lg-7 col-md-6">
					<input type="password" placeholder="新密码"
						class="col-lg-12 col-md-12" name="loginPassword"
						data='[{"type":"empty","msg":"不能为空"},{"type":"length","msg":"长度大于18"}]' />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<div class="form-group">
				<label class="col-lg-2 col-md-3 control-label no-padding-right">确认新密码:</label>
				<div class="col-lg-7 col-md-6">
					<input type="password" placeholder="确认新密码"
						class="col-lg-12 col-md-12" name="newPassword" />
				</div>
				<div style="color: red; margin-top: 5px;" class="col-lg-3 col-md-3">*</div>
			</div>
			<input type="hidden" value="${userId }" name="userId" />
		</form>
	</div>
	<div class="panel-footer"
		style="padding-bottom: 0px; text-align: right;">
		<button class="btn btn-danger rest-btn btn-xs" type="button"
			style="margin-right: 10px;">
			<i class="icon-refresh"></i>重置
		</button>
		<button class="btn btn-info btn-xs" type="button" id="password-edit-sbtn">
			<i class="icon-save"></i>保存
		</button>
	</div>
</div>

<script>
	$(function()
	{
		var form = new Form("password-info");
		$("#password-info").find("input[name='newPassword']").blur(
				checkedPassword);
		$("#password-edit-sbtn").click(function()
		{
			checkedPassword();
			form.submit(
			{
				url : ctx+"/mdp/user/editPassword.json",
				sucFun : function()
				{
					alert("密码修改成功,请重新登录!");
					location.href =ctx+"/mdp/welcome/index.html";
				}
			});
		});
		function checkedPassword()
		{
			var password = $("#password-info").find(
					"input[name='loginPassword']").val();
			var password2 = $("#password-info").find(
					"input[name='newPassword']").val();
			if (password != password2 || password2 == "")
			{
				$("#password-info").find("input[name='newPassword']").parent()
						.next().html(getErrorMsg("2次输入密码不一致"));
				throw Error("");
			}
			$("#password-info").find("input[name='newPassword']").parent()
					.next().html(SUCCESS_HTML);
		}
	});
</script>