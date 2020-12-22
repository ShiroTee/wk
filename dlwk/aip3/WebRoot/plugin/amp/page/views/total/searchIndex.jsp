<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="总体视角" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/total/css/searchIndex.css" />
<script type="text/javascript">
	var searchTxt="${searchTxt}";
	var searchType="${searchType}";
	var rootOrgId="${rootOrgId}";
</script>
<%@include file="searchIndex-header.jsp"%>
<%@include file="searchIndex-content.jsp"%>
<amp:ampFooter />
<script src="${ctx}/plugin/amp/page/views/total/js/searchIndex.js"></script>
