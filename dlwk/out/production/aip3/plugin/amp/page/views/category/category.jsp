<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="信息资源分类" />
<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/bootstrap.min.css" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/category/css/category.css" />
<%@include file="category-header.jsp"%>
<%@include file="category-content.jsp"%>
<%@include file="../org/details/resourceInfo.jsp" %>
<amp:ampFooter />
<script src="${ctx}/resource/d3/d3.js"></script>
<script src="${ctx}/plugin/amp/page/views/category/js/category.js"></script>
<script src="${ctx}/plugin/amp/page/views/category/js/categoryQry.js"></script>
