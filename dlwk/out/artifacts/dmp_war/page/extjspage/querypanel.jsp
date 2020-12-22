<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.Map.Entry"%>
<%@page import="com.digitalchina.ldp.common.util.StringUtils"%>
<%
	String formId = request.getParameter("formId");
	String formDivId = request.getParameter("formDivId");
	if (StringUtils.isEmpty("formId"))
	{
		formId = "formId";
	}
%>
<script language="javascript">
function initQueryForm()
{
	var queryForm = new Ext.form.FormPanel(
	{
		id : '<%=formId%>',
		monitorResize : true,
		labelAlign : 'left',
		frame : true,
		autoWidth : true,
		autoHeight : true,
		applyTo : '<%=formDivId%>'
	});
}
</script>
