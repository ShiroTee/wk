<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid sdetail">
	<div class="row">
	   <div class="col-md-10 col-md-offset-1">
	   		<div class="row">
				<div class="col-md-12">
					<div class="detail-item-title">${orgData.org_nm }</div>
				</div>
			</div>
	   </div>
	</div>
	<%@include file="child/orgForm.jsp" %>
	<div class="row">
		<div class="col-md-12 col-md-offset-1">
			<span class="org-text-tip">注：表格中红色字体表示拥有搜索关键字</span>
		</div>
	</div>
	<%@include file="child/orgBusiGrid.jsp" %>
	<%@include file="child/orgGrid.jsp" %>
	<jsp:include page="child/assetGrid.jsp" flush="true">
		<jsp:param value="信息资源" name="modelTitle"/>
	</jsp:include>
	<jsp:include page="child/dataeleGrid.jsp">
		<jsp:param value="元数据集" name="modelTitle"/>
	</jsp:include>
	<jsp:include page="child/sysGrid.jsp">
		<jsp:param value="信息系统" name="modelTitle"/>
	</jsp:include>
</div>
