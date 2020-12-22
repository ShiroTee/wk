<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid sdetail">
    <div class="row">
	   <div class="col-md-10 col-md-offset-1">
	   		<div class="row">
				<div class="col-md-12">
					<div class="detail-item-title">${assetData.name }</div>
				</div>
			</div>
	   </div>
	</div>
	<%@include file="child/assetForm.jsp" %>
	<jsp:include page="child/dataeleGrid.jsp">
		<jsp:param value="元数据组成" name="modelTitle"/>
	</jsp:include>
	<jsp:include page="child/sysGrid.jsp">
		<jsp:param value="关联系统" name="modelTitle"/>
	</jsp:include>
	<%@include file="child/busiGrid.jsp" %>
	<%@include file="child/assetShareGrid.jsp" %>
</div>
