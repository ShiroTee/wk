<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="组织机构视角" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/org3/css/org3.css" />
<script type="text/javascript">
	var rootOrgId="${rootOrgId}";
	var rootOrgName="${rootOrgName}";
</script>
<%@include file="org3-header.jsp"%>
<%@include file="org3-content.jsp"%>
<%@include file="../detail/org-detail-office.jsp"%>
<%@include file="../detail/serverBusi-detail.jsp"%>
<%@include file="../detail/org-detail.jsp"%>
<%@include file="../detail/busi-detail.jsp"%>
<%@include file="../detail/res-detail.jsp"%>
<%@include file="../detail/them-resourceInfo.jsp"%>
<%@include file="../org/details/resourceInfo.jsp"%>
<%@include file="../org/details/metadata.jsp"%>
<%@include file="../org/details/sysResource.jsp"%>
<amp:ampFooter />
<script src="${ctx}/resource/d3/d3.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org3/js/layerTree.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org3/js/graphTree.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org3/js/org3.js"></script>
<script type="text/javascript" src="${ctx}/resources/jquery/jquery.fullscreen-min.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org3/js/orgFullScreen.js"></script>
