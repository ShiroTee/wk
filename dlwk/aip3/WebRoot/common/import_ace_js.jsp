<%@ page language="java" pageEncoding="UTF-8"%>
<%
	request.setAttribute("ctx",request.getContextPath());
%>
<script src="${ctx }/resources/ace/assets/js/ace-extra.min.js"></script>
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="${ctx }/resources/ace/assets/js/html5shiv.js"></script>
<script src="${ctx }/resources/ace/assets/js/respond.min.js"></script>
<![endif]-->
<!--[if !IE]> -->
<script src="${ctx}/resources/ace/assets/js/jquery.min.js"></script>
<!-- <![endif]-->
<!--[if IE]>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<![endif]-->
<!--[if !IE]> -->
<script type="text/javascript">window.jQuery || document.write("<script src='${ctx}/resources/ace/assets/js/jquery-2.0.3.min.js'>"+"<"+"script>");</script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
 window.jQuery || document.write("<script src='${ctx}/resources/ace/assets/js/jquery-1.10.2.min.js'>"+"<"+"script>");
</script>
<![endif]-->
<script type="text/javascript">
var CTX="${ctx}";
var INDEX_URL="${ctx}/mdp/admin/index.html";
</script>
<script src="${ctx}/resources/ace/assets/js/bootstrap.min.js"></script>
<script src="${ctx}/resources/ace/assets/js/typeahead-bs2.min.js"></script>
<script src="${ctx}/resources/ace/assets/js/ace-elements.min.js"></script>
<script src="${ctx}/resources/ace/assets/js/ace.min.js"></script>
<script src="${ctx}/resources/ace/assets/js/date-time/bootstrap-datepicker.min.js"></script>
<script src="${ctx}/resources/ace/assets/js/date-time/locales/bootstrap-datepicker.zh-CN.js"></script>
<script src="${ctx}/resources/ace/assets/js/bootbox.min.js"></script>
<script type="text/javascript" src="${ctx }/resources/js/mricode.pagination.js"></script>
<script type="text/javascript" src="${ctx }/resources/plugins/backbone/underscore.js"></script>
<script type="text/javascript" src="${ctx }/resources/plugins/backbone/backbone.js"></script>
<script src="${ctx}/common/javascript/util.js"></script>
<script src="${ctx}/common/javascript/cookieUtils.js"></script>
<script src="${ctx}/common/javascript/main.js"></script>