<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String[] subjects=new String[]{"primary","success","info","warning","danger"};
	request.setAttribute("subjects", subjects);
%>
<div id="container-fluid" class="container-fluid  graph-content">
	<div class="row">
		<div class="col-md-12">
			<div id="categoryLabels">
<!-- 				<label  class="btn btn-danger" disabled="disable">Danger</label> -->
					<c:forEach items="${labels }" var="list" varStatus="status">
						<label data-id="${list['typ_cate_id'] }" data-name="${list['typ_cate_nm'] }" <c:if test="${status.index==0 }">disabled="disabled"</c:if>class="btn btn-${subjects[status.index] }" >${list['typ_cate_nm'] }</label>
					</c:forEach>
			</div>
		</div>
	</div>
	<div class="row" style="margin-top:5px;">
		<div id="chartBox" class="col-md-12 col-lg-12 col-sm-12 col-xs-12 graph-draw-box" style="overflow: hidden;">
		</div>
	</div>
</div>