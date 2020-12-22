<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="协同主题视角" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/service/css/server.css" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/theme/css/theme.css" />
<script type="text/javascript">
	var rootOrgId = "${rootOrgId}";
</script>
<%@include file="theme-header.jsp"%>
<%@include file="theme-content.jsp"%>
<%@include file="../org/details/resourceInfo.jsp"%>
<amp:ampFooter />
<script src="${ctx}/resources/echarts-2.2.7/echarts.js"></script>
<script src="${ctx}/plugin/amp/page/views/theme/js/theme.js"></script>