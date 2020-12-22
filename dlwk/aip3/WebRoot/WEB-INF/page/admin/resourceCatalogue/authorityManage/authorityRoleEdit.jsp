<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
	#main_box{
		width: 70%;
		margin: 0 auto;
	}
	#main_box div{
		text-align: right;
	}	
	#main_box input[type="text"],
	#main_box p,
	#main_box textarea{
		width: 80%;
	}
	#main_box p{
		display: inline-block;
    	text-align: left;
	}
</style>
<div id="main_box"> 	
	<div>
		角色名称：
		<input  type="text" class="" value="${roleName}">
	</div>
	<div>
		状态：
		<p style="margin-top: 12px;">
			<label class="checkbox-inline">
  				<input type="checkbox" id="inlineCheckbox1" value="enable" 
					<c:if test="${status=='enable' }">checked</c:if>
				> 启用
			</label>
			<label class="checkbox-inline">
  				<input type="checkbox" id="inlineCheckbox2" value="disable"
  					<c:if test="${status=='disable' }">checked</c:if>
  				> 禁用
			</label>
		</p>
	</div>
	<div>
		备注：
		<textarea rows="3">${memo }</textarea>
	</div>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-pink btn-xs" data-dismiss="modal">重置</button>
	<button type="button" class="btn btn-primary btn-xs" data-dismiss="modal">保存</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>