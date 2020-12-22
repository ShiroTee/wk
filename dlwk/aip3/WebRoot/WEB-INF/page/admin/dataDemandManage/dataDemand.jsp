<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="dataDemand-content.jsp" %>
<link rel="stylesheet" href="${ctx }/page/admin/dataDemandManage/css/manager.css" />
<script type="text/javascript" src="${ctx }/page/admin/dataDemandManage/js/dataDemandManage.js"></script>
<script>
    $("#data-startTime").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        minView: 'month'
    });
    $("#data-endTime").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        minView: 'month'
    });
</script>
