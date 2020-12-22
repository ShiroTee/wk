<%@ tag language="java" pageEncoding="UTF-8"%>
<%@attribute name="title" type="java.lang.String" required="false" %>
<%@attribute name="index" type="java.lang.Boolean" required="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <title>${title}</title>
    <%@include file="../../plugin/amp/page/common/import-css-welcome.jspf"%>
    <!-- 提前引入jquery，以便被使用 -->
    <script type="text/javascript" src="${ctx}/resources/ace1.3.2/js/jquery.min.js"></script>
    <script type="text/javascript" src="${ctx}/resource/jquery-resize-1.1/jquery.ba-resize.min.js"></script>
    <!-- ace settings handler -->
	<script src="${ctx }/resources/ace1.3.2/js/ace-extra.min.js"></script>
	<script type="text/javascript">
		var ctx="${ctx}";
		var rootOrgId="${rootOrgId}";
	</script>
</head>
<body id="body">
