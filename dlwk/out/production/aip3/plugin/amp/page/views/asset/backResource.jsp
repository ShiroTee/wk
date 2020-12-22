<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="信息资源视角" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/asset/css/backResource.css" />
<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/bootstrap-datetimepicker.css"/>
<%@include file="backResource-header.jsp"%>
<%@include file="backResource-content.jsp"%>
<%@include file="../org/details/resourceInfo.jsp"%>
<amp:ampFooter />
<script type="text/javascript">
$(function(){
	$("#startTime").datetimepicker({
	        language: 'zh-CN',
	        format: "yyyy-mm-dd",
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: "bottom-left",
	        minView: 'month'
	});
	$("#endTime").datetimepicker({
	        language: 'zh-CN',
	        format: "yyyy-mm-dd",
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: "bottom-left",
	        minView: 'month'
	});
});
var rootOrgId="${rootOrgId}";
</script>
<script src="${ctx}/resource/echarts-3.1.10/echarts.min.js"></script>
<script src="${ctx}/plugin/amp/page/views/asset/js/backResource.js"></script>
<script  src="${ctx}/resources/ace1.3.2/js/date-time/bootstrap-datetimepicker.js"></script>
<script  src="${ctx}/resources/ace1.3.2/js/date-time/bootstrap-datetimepicker.zh-CN.js"></script>
