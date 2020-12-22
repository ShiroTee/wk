$(function()
{
	$("#logStartDate").datepicker(DATE_DEFAULT_CONFIG);
	$("#logEndDate").datepicker(DATE_DEFAULT_CONFIG);
	var logDataTable = $("#logDataTable");
	var logPage = $("#log-panel9-87 .m-pagination");
	if (logPage.length == 1)
	{
		logPage.pagination(
		{
			total : logPage.attr("total"),
			pageSize :logPage.attr("pageSize"),
			pageIndex : logPage.attr("pageIndex"),
			firstBtnText : '首页',
			lastBtnText : '尾页',
			prevBtnText : '上一页',
			nextBtnText : '下一页',
			showInfo:true,
			infoFormat:"总记录总:{total}条"
		});
		logPage.on("pageClicked",
				function(event, data)
				{
					var startDate = $("#logStartDate").val();
					if (startDate != "")
					{
						startDate = startDate + " 00:00:00";
					}
					var endDate = $("#logEndDate").val();
					if (endDate != "")
					{
						endDate = endDate + " 23:59:59";
					}
					var exception = $(
							"input[name='logExceptionStatus']:checked").val();
					var reqData =
					{
						searchWord : $("#logSearch").val(),
						startDate : startDate,
						endDate : endDate,
						exception : exception,
						pageIndex : data.pageIndex,
						pageSize:data.pageSize
					};
					workspace.reload("log/list.html", reqData);
				});
	}
	;
	$("#btnSearch").click(function()
	{
		var startDate = $("#logStartDate").val();
		if (startDate != "")
		{
			startDate = startDate + " 00:00:00";
		}
		var endDate = $("#logEndDate").val();
		if (endDate != "")
		{
			endDate = endDate + " 23:59:59";
		}
		var exception = $("input[name='logExceptionStatus']:checked").val();
		workspace.reload("log/list.html",
		{
			searchWord : $("#logSearch").val(),
			startDate : startDate,
			endDate : endDate,
			exception : exception
		});
	});
	$("#logSearch").keydown(function(event)
	{
		event.stopPropagation();
		if (event.keyCode == 13)
		{
			$("#btnSearch").click();
		}
	});
	$("#logDataTable tbody tr").each(function()
	{
		$(this).find("td:eq(8) a").click(function()
		{
			var logId = $(this).attr("id");
			var node={};
			node.nodeId="info-"+logId;
			node.text="日志详情";
			node.href="log/info.html";
			workspace.addPage(node,
			{
				logId : logId
			});

		});
	});
});