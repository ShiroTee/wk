<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="组织机构视角" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/org2/css/org2.css" />
<%@include file="org2-header.jsp"%>
<%@include file="org2-content.jsp"%>
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
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org2/js/org2.js"></script>
<script type="text/javascript">
	var rootOrgId="${rootOrgId}";
</script>
