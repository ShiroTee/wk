<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>
<amp:ampHeader title="服务对象视角" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/theme/css/org-asset.css" />
<script type="text/javascript">
	var rootOrgId = "${rootOrgId}";
</script>
<%@include file="org-asset-header.jsp"%>
<%@include file="org-asset-content.jsp"%>
<amp:ampFooter />
<script src="${ctx}/resources/jquery/jquery-ui-1.9.2-min.js"></script>
<script src="${ctx}/resources/jquery/jsPlumb-2.1.1.js"></script>
<script src="${ctx}/plugin/amp/page/views/theme/js/SkyChart.js"></script>
<script>
	var data = ${data};
	jsPlumb.ready(function()
	{
		var chart = new SkyChart(
		{
			el : "org-asset-mychart-box",
			//数据{name:"name",source:[{name="name"}],target:[{name="name"}]}
			data : data,
			//节点宽度,默认150
			width : 210,
			//线条颜色样式
			lineStyle :
			{
				//线条颜色
				color : "green",
				//连接线宽度
				lineWidth : 1
			}
		});
		//绑定线条事件
		chart.bind("click", function(source, target)
		{
		});
		//绑定节点事件
		chart.nodeBind("click", function(data)
		{
			//加载资源目录数据
			if (typeof (data.orgId) == "undefined"
					&& typeof (data.entId) == "string")
			{
				$("#res-widget-test .widget-title").html("信息资源详细描述(双击查看)");
				$("#res-widget-test .widget-body").empty();
				$("#res-widget-test .widget-body").load(
						"queryAsset?entId=" + data.entId + "&assetId="
								+ data.entId);
				$.widget2.show("#res-widget-test");
			}

		});
		chart.nodeBind("dblclick", function(data)
		{
			//加载资源目录数据
			if (typeof (data.orgId) == "undefined"
					&& typeof (data.entId) == "string")
			{
				$("#res-widget-test .widget-title").html("信息资源详细描述(双击查看)");
				$("#res-widget-test .widget-body").empty();
				$("#res-widget-test .widget-body").load(
						"queryAsset?entId=" + data.entId + "&assetId="
								+ data.entId);
				$.widget2.max("#res-widget-test");
			}
		});
	});
</script>
