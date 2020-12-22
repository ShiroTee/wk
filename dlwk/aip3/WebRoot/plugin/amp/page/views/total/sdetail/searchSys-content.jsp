<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid sdetail">
	<div class="row">
	   <div class="col-md-10 col-md-offset-1">
	   		<div class="row">
				<div class="col-md-12">
					<div class="detail-item-title">${syses.appsys_nm }</div>
				</div>
			</div>
	   </div>
	</div>
	<%@include file="child/sysForm.jsp" %>
	<%@include file="child/busiGrid.jsp" %>
	<%@include file="child/assetSdGrid.jsp" %>
	<%@include file="child/assetOppGrid.jsp" %>
</div>
