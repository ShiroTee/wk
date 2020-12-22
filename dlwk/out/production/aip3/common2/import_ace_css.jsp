<%@ page language="java" pageEncoding="UTF-8"%>
<%
	request.setAttribute("ctx", request.getContextPath());
%>
<link href="${ctx }/resources/ace/assets/css/bootstrap.min.css"
	rel="stylesheet" />
<link rel="stylesheet"
	href="${ctx }/resources/ace/assets/css/font-awesome.min.css" />
<!--[if IE 7]>
		  <link rel="stylesheet" href="${ctx }/resources/ace/assets/css/font-awesome-ie7.min.css" />
<![endif]-->

<!-- page specific plugin styles -->

<!-- fonts -->
<link rel="stylesheet" href="${ctx }/resources/ace/assets/css/font.css" />
<!-- ace styles -->
<link rel="stylesheet"
	href="${ctx }/resources/ace/assets/css/ace.min.css" />
<link rel="stylesheet"
	href="${ctx }/resources/ace/assets/css/ace-rtl.min.css" />
<link rel="stylesheet"
	href="${ctx }/resources/ace/assets/css/ace-skins.min.css" />
<!--[if lte IE 8]>
<link rel="stylesheet" href="${ctx }/resources/ace/assets/css/ace-ie.min.css" />
<![endif]-->