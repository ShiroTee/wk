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
    <!-- 提前引入jquery，以便被使用 -->
    <script type="text/javascript" src="${ctx}/resources/jquery/jquery-1.11.2.min.js"></script>
    <%@include file="../page/common/import-css-welcome.jspf"%>
	<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/ace-fonts.min.css" />
	<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <!-- ace settings handler -->
	<script src="${ctx }/resources/ace1.3.2/js/ace-extra.min.js"></script>
	<link rel="stylesheet" href="${ctx }/page/base/css/admin-base.css" />
	<script type="text/javascript">
		var ctx="${ctx}";
	</script>
</head>
<body id="body">
