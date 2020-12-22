<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="服务对象视角" />
<script type="text/javascript">
   var busiId="${busiId}";
</script>
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/service/css/busiRelate.css" />
<%@include file="busiRelate-header.jsp"%>
<%@include file="busiRelate-content.jsp"%>
<%@include file="../detail/busi-detail.jsp"%>
<%@include file="../detail/res-detail.jsp"%>
<%@include file="../detail/sys-detail.jsp"%>
<amp:ampFooter />
<script src="${ctx}/resource/d3/d3.js"></script>
<script src="${ctx}/resource/d3/plugins/sankey.js"></script>
<script src="${ctx}/plugin/amp/page/views/service/js/busiRelate.js"></script>
