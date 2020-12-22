<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="taglibs.jspf"%>
<!DOCTYPE html>
<html lang="cn">
<head>
<meta charset="utf-8" />
<title>${initParam.APP_TITLE }</title>
<meta name="keywords" content="FW" />
<meta name="description" content="FW" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="${ctx}/resources/css/lib-2.4.css"/>
<%@include file="import_ace_css.jsp"%>
<link rel="stylesheet" href="${ctx}/resources/css/style.css">
<link rel="stylesheet" href="${ctx}/resources/css/base.css">
<%@include file="import_ace_js.jsp"%>
<style type="text/css">
@font-face {
	font-family: 'Glyphicons Halflings';
	src:
		url('${ctx}/resources/ace/assets/font/glyphicons-halflings-regular.eot');
	src:
		url('${ctx}/resources/ace/assets/font/glyphicons-halflings-regular.eot?#iefix')
		format('embedded-opentype'),
		url('${ctx}/resources/ace/assets/font/glyphicons-halflings-regular.woff')
		format('woff'),
		url('${ctx}/resources/ace/assets/font//glyphicons-halflings-regular.ttf')
		format('truetype'),
		url('${ctx}/resources/ace/assets/font/glyphicons-halflings-regular.svg#glyphicons_halflingsregular')
		format('svg');
}
</style>
</head>