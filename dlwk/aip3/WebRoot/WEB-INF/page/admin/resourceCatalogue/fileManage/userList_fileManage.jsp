<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="p0_20">
		<div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					<input id="searchCondition_user_fileManage" type="text" placeholder="姓名 登录名"
						class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
				</div>
				<input id="dict-search-btn" onclick="updateUser_fileManage" type="button"  value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">			
			</div>
		</div>
	<table id="userManage-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</th>					
					<th>姓名</th>
					<th>登录名</th>
					<th>所属机构</th>
				</tr>
			</thead>
			<tbody>				
				<!-- <tr>
					<td colspan="4" style="color: red; text-align: center;">暂无文件</td>
				</tr> -->
				<tr>
					<td>
						<label class="position-relative">
							<input type="checkbox" class="ace">
							<span class="lbl"></span>
						</label>
					</td>
					<td>超级管理员</td>
					<td>admin</td>
					<td>北京政府</td>
				</tr>				
			</tbody>
	</table>
	<div id="userDIV_fileManage" style="width: 100%;height: 60px;">
		<%@include file="../../../common/admin-pagination.jsp"%>
	</div>
</div>
<div class="modal-footer">
		<button type="button" class="btn btn-primary btn-xs" onclick="auth_fileManage()" data-dismiss="modal">授权</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
<script>
var routeId_fileManage = '<%=request.getAttribute("routeId")%>';
$(function(){
	$("table th input[type='checkbox']").click(onMdTableAllCheck);	
});
/**
* 表格全选/不选
* @param {} e
*/
function onMdTableAllCheck(e)
{
	var check=$(this).is(":checked");
	$("#authorize-list tr input[type='checkbox']").prop({"checked":check});
}
</script>
	<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/fileManage/js/userList_fileManage.js"></script>