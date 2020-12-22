<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<amp:ampHeader title="信息资源分类" />
<link rel="stylesheet"
	href="${ctx }/resources/ace1.3.2/css/bootstrap.min.css" />
<%@include file="category-header1.jsp"%>
<%@include file="category-content1.jsp"%>
<script src="${ctx}/plugin/amp/page/views/category/js/TreeMapChart.js"></script>
<%@include file="../org/details/resourceInfo.jsp"%>
<amp:ampFooter />
<script>
	$(function()
	{
		var label = $("#categoryLabels label:eq(0)");
		var infoId = label.attr("data-id");
		var infoType = label.html();
		var reqData =
		{
			infoLevel : 0,
			infoId : infoId,
			typeCate : infoId,
			infoType : infoType
		};
		var treeModel = new TreeModel(
		{
			el : "chartBox",
			data : reqData
		});
		treeModel.bind(function(d)
		{
		    
			$.widget.show("#resourceInfo");
			resDataHandler(d.infoType, d.infoId, 4);
			qryResInfoHandler();
		});
		treeModel.dblBind(function(d)
		{
			resDataHandler(d.infoType, d.infoId, 4);
			$.widget.max("#resourceInfo");
		});
		$("#categoryLabels label").click(function()
		{

			$("#categoryLabels label").removeAttr("disabled");
			$(this).attr("disabled", "disabled");
			var infoId$ = $(this).attr("data-id");
			var infoType$ = $(this).html();
			var reqData$ =
			{
				infoLevel : 0,
				infoId : infoId$,
				typeCate : infoId$,
				infoType : infoType$
			};
			treeModel.reload(reqData$);
		});
	});
</script>
