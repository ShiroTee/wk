<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="资源回溯" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/asset/css/backetrace.css" />
<script type="text/javascript">
  var pageType="${type}";
  var assetId="${assetId}";
  var assetName="${asset.name}";
</script>
<%@include file="backtrace-header.jsp"%>
<%@include file="backtrace-content.jsp"%>
<%@include file="../detail/busi-detail.jsp"%>
<%@include file="../detail/res-detail.jsp"%>
<%@include file="../detail/org-detail.jsp" %>
<amp:ampFooter />
<script src="${ctx}/resource/d3/d3.js"></script>
<script src="${ctx}/plugin/amp/page/views/asset/js/backtrace.js"></script>
<script src="${ctx}/plugin/amp/page/views/asset/js/backtraceQry.js"></script>
