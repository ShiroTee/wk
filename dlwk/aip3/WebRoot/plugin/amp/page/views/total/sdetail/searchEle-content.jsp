<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid sdetail">
	<div class="row">
	   <div class="col-md-10 col-md-offset-1">
	   		<div class="row">
				<div class="col-md-12">
					<div class="detail-item-title">${eleData.ele_nm }</div>
				</div>
			</div>
	   </div>
	</div>
	<%@include file="child/eleForm.jsp" %>
	<jsp:include page="child/assetGrid.jsp" flush="true">
		<jsp:param value="关联资源" name="modelTitle"/>
	</jsp:include>
</div>
