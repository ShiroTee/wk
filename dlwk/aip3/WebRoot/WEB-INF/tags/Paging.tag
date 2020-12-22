<%@ tag language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@attribute name="pageList" type="com.digitalchina.ldp.bean.PageList"
	required="true"%>
<%@attribute name="pageSize" type="java.lang.Integer"
	required="false"%>
<%
	if(pageSize==null)
	{
		pageSize=20;
		request.setAttribute("pageSize",pageSize);
	}
%>
<c:if test="${pageList.count>pageSize }">
	<div class="m-pagination" style="margin-top: 0px; float: right;"
		total="${pageList.count}" pageIndex="${pageList.pageIndex }" pageSize="${pageList.pageSize}"></div>
</c:if>