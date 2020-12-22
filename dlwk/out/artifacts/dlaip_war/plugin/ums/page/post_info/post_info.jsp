<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean" %>
<html>
<%@include file="../../../common.jsp" %>
<script>

<%
UserInfoBean userInfoBean=(UserInfoBean)session.getAttribute(Constant.USER_SESSION_ID);
%>
	var orgRootName="<%=userInfoBean.getOrgInfo().getOrgName()%>";
	var orgRootId="<%=userInfoBean.getOrgInfo().getOrgId()%>";
</script>
<script type="text/javascript" src="js/post_info.js"></script>
<script type="text/javascript" src="js/event.js"></script>
	<body>
	
	</body>
</html>