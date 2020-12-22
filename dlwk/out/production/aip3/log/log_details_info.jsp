<%@ page language="java" contentType="text/html; charset= UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<pre class="box mr20">${info.stackTraceMessage }</pre>
<link rel="stylesheet" type="text/css"
	href="${ctx }/resources/css/prettify.css" />
	<style>
		ol.linenums {
		    margin: 0;
		}
	</style>
<script type="text/javascript" src="${ctx }/resources/js/prettify.js"></script>
<script>
	$(function()
	{
		prettyPrint();
	});
</script>