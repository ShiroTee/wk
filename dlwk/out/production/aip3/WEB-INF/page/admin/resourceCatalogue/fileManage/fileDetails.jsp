<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<style>
	.main_box{
		width: 80%;
		margin: 0 auto;
	}
	.main_box div{
		text-align:center;
		margin: 6px 0;
	}
	.main_box input[type="text"],.main_box p{
		width: 80%;
	}
	.main_box p{
		display: inline-block;
    	text-align: left;
	}
</style>
<div class="main_box"> 	
	<div>
		文件名称：
		<input  type="text" class="" value="${fileName}" id="fileName_fileDetails">
	</div>
	<div>
		文件路径：
		<input type="text" class="" value="${publishURL }" disabled="disabled">
	</div>
	<div>
		文件大小：
		<input type="text" class="" value="${fileSizef }" disabled="disabled">
	</div>
	<div>
		下载地址：
		<input type="text" class="" value="${showURL }" disabled="disabled">
	</div>
	<div>
		授权类型：
		<p style="margin-top: 12px;">
			<label class="checkbox-inline">
  				<input type="radio" ${isAuth==1?'checked':'' } name="fileManager_isauthor" value="1"> 授权访问
			</label>
			<label class="checkbox-inline">
  				<input type="radio" ${isAuth==0?'checked':'' } name="fileManager_isauthor" value="0" > 公开
			</label>
		</p>
	</div>
	<div>
		文件状态：
		<p>
			<label class="radio-inline">
  				<input type="radio" ${routeStatus==1?'checked':'' } name="fileManager_filestatus" id="inlineRadio1" value="1" > 启用
			</label>
			<label class="radio-inline">
  				<input type="radio" ${routeStatus!=1?'checked':'' } name="fileManager_filestatus" id="inlineRadio2" value="0"> 禁用
			</label>
		</p>
	</div>
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-primary btn-xs" onclick="saveFileDetails()" data-dismiss="modal">保存</button>
	<button type="button" class="btn btn-info btn-xs" data-dismiss="modal">关闭</button>
</div>

<script>
	var fileID = '<%=request.getAttribute("fileId")%>';

</script>

	<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/fileManage/js/fileManage.js"></script>
<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/fileManage/js/fileDetails.js"></script>
