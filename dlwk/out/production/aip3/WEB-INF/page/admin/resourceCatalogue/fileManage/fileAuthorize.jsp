<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<div class="p0_20">
	<table id="authorize-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
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
					<c:choose>
					<c:when test="${operate !='edit' }">
						<th>授权时间</th>
					</c:when>
					</c:choose>
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
						<td>2017-06-08 10:30:00</td>
				</tr>				
			</tbody>
	</table>
	<div id="authDIV_fileAuthorize" style="width: 100%;height: 60px;">
		<%@include file="../../../common/admin-pagination.jsp"%>
	</div>
</div>
<div class="modal-footer">
		<button type="button" class="btn btn-danger btn-xs" data-dismiss="modal" onclick="removeAuthorize()">解除授权</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>
<script>
var routeId_fileAuthorize = '<%=request.getAttribute("routeId")%>';
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
	src="${ctx }/page/admin/resourceCatalogue/fileManage/js/fileAuthorize.js"></script>