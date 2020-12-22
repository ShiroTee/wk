<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="总体视角" />
<%-- <link rel="stylesheet" href="${ctx }/plugin/amp/page/common/css/white-theme.css" /> --%>
<link type="text/css" rel="stylesheet" href="${ctx }/resource/OwlCarousel2-2.1.1/assets/owl.carousel.css">
<link type="text/css" rel="stylesheet" href="${ctx }/resource/OwlCarousel2-2.1.1/assets/owl.theme.default.min.css">
<link type="text/css" rel="stylesheet" href="${ctx }/resource/jquery-flipster-1.11/jquery.flipster.min.css">
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/total/css/total.css" />
<!-- <div id="bgbox" style="width: 100%;height: 100%;position: absolute;"> -->
<!-- 	<div id="bgout" style="width: 100%;height: 100%;"></div> -->
<!-- </div> -->
<script type="text/javascript">
	var rootOrgId="${rootOrgId}";
	var returnType="${returnType}";
</script>
<%@include file="total-header.jsp"%>
<%@include file="total-content.jsp"%>
<amp:ampFooter />
<script src="${ctx}/resource/echarts-3.1.6/echarts.min.js"></script>
<script src="${ctx}/resource/OwlCarousel2-2.1.1/owl.carousel.min.js"></script>
<script src="${ctx}/resource/jquery-flipster-1.11/jquery.flipster.min.js"></script>
<script src="${ctx}/plugin/amp/page/views/total/js/total.js"></script>
<%-- <script src="${ctx}/plugin/amp/page/common/js/bg/vector.js"></script> --%>
