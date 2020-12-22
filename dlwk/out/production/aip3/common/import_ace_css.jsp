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
<link rel="stylesheet"
	href="${ctx }/resources/ace/assets/css/datepicker.css" />
<link rel="stylesheet" href="${ctx }/resources/css/iconfont.css" />
<link rel="stylesheet"
	href="${ctx }/resources/css/mricode.pagination.css" />
<!--[if lte IE 8]>
<link rel="stylesheet" href="${ctx }/resources/ace/assets/css/ace-ie.min.css" />
<![endif]-->
<style>
.div_sel {
	background-image: -webkit-linear-gradient(top, #e0e0e0, #d0d0d0);
	border-top: 2px solid #4c8fbd;
	padding-left: 20px;
	position: relative;
	margin-top: 5px;
	margin-bottom: 2px;
	float: left;
	height: 33px;
	cursor: default;
	background-color: #f5f5f5;
	width: 160px;
	box-shadow: inset 0 1px rgba(255, 255, 255, 0.4), 0 -1px
		rgba(0, 0, 0, 0.2), -1px 0 rgba(0, 0, 0, 0.2), 1px 0
		rgba(0, 0, 0, 0.2);
}

.div_not_sel {
	padding-left: 20px;
	margin-top: 5px;
	position: relative;
	margin-bottom: 2px;
	cursor: default;
	float: left;
	height: 33px;
	background-color: #f5f5f5;
	border: 0px;
	width: 160px;
	background-image: -webkit-linear-gradient(top, #e0e0e0, #f5f5f5);
	box-shadow: inset 0 1px rgba(255, 255, 255, 0.4), 0 -1px
		rgba(0, 0, 0, 0.2), -1px 0 rgba(0, 0, 0, 0.2), 1px 0
		rgba(0, 0, 0, 0.2);
}

.tab_pane_colose {
	position: absolute;
	top: 10px;
	right: 5px;
	height: 14px;
	width: 14px;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-ms-border-radius: 50%;
	-o-border-radius: 50%;
	border-radius: 50%;
	text-align: center;
	font-size: 11px;
	line-height: 12px;
	/* color: #777777; */
	text-shadow: 0 1px rgba(255, 255, 255, 0.3);
}

.tab_pane_colose:hover {
	color: red;
}

.fw_panel_body {
	padding-left: 0px;
	padding-right: 0px;
	padding-bottom: 50px;
	padding-top: 0px;
}
.tooltip-inner {
	background-color: #a94442;
	color: #fff;
}

.tooltip.top .tooltip-arrow {
	border-top-color: #a94442;
}

.tooltip.right .tooltip-arrow {
	border-right-color: #00acd6;
}

.tooltip.bottom .tooltip-arrow {
	border-bottom-color: #00acd6;
}

.tooltip.left .tooltip-arrow {
	border-left-color: #00acd6;
}
</style>