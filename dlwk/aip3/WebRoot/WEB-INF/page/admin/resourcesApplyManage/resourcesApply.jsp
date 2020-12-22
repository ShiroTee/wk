<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="resourcesApply-content.jsp" %>
<link rel="stylesheet" href="${ctx }/page/admin/dataDemandManage/css/manager.css" />
<script type="text/javascript" src="${ctx }/page/admin/resourcesApplyManage/js/resourcesApplyManage.js"></script>
<script>
    $("#resources-startTime").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        minView: 'month'
    });
    $("#resources-endTime").datepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        pickerPosition: "bottom-left",
        minView: 'month'
    });
</script>
