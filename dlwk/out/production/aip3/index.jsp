<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@page import="com.digitalchina.ldp.bean.User"%>
<script>
<%
	User user=(User)session.getAttribute(Constant.USER_SESSION_ID);
%>
var CURRENT_LOGIN_NAME="<%=user.getLoginName()%>";
</script>
<%@include file="/common/header_ace.jsp"%>
<body>
	<%-- <%@include file="top_navbar.jsp"%> --%>
	<%@include file="top_nav.jsp"%>
	<div class="main-container" id="main-container">
		<script type="text/javascript">
			try
			{
				ace.settings.check('main-container', 'fixed')
			} catch (e)
			{
			}
		</script>
		<div class="main-container-inner">
			<div class="breadcrumbs" id="breadcrumbs"
				style="margin-bottom: 0px;">
				<script type="text/javascript">
					try
					{
						ace.settings.check('breadcrumbs', 'fixed')
					} catch (e)
					{
					}
				</script>
			</div>
			<%@include file="left_navbar.jsp"%>
			<div class="main-content">				
				<div class="page-content" id="page-content" style="height:100%;"></div>
			</div>
		</div>
	</div>
	<!-- 模态框 -->
	<div class="modal fade" id="myModal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="panel panel-danger" style="margin-bottom: 0px;">
					<div class="panel-heading">
						<span>资源详情</span><i class="icon-remove"
							style="float: right; cursor: pointer;" title="关闭窗口"
							data-toggle="modal" data-target="#myModal"></i>
					</div>
					<div class="panel-body"
						style="position: relative; padding-left: 0px; padding-right: 0px; padding-bottom: 5px;">
						<i class="icon-spinner icon-spin orange bigger-125"
							style="margin-top: 100px; margin-bottom: 100px; margin-left: 270px;"></i>页面加载中...
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

