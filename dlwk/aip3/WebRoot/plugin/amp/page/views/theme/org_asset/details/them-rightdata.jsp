<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<div class="widget-box">
	<div class="widget-header widget-header-flat">
		<h4 class="widget-title">元数据组成</h4>
	</div>

	<div class="widget-body2">
		<div class="widget-main">
			<div class="row">
				<div class="col-xs-8">
					<div class="input-group input-group-sm">
						<span class="input-group-addon"> 数据元名称:</span> <input
							id="searchInput" type="text" class="form-control"> <span
							class="input-group-btn">
							<button id="searchBtn" class="btn btn-default no-disabled"
								type="button">
								<span class="glyphicon glyphicon-search"></span>
							</button>
						</span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-xs-12">
					<table id="resGroup_table"
						class="table table-striped table-bordered table-hover"
						style="width: 100%">
						<thead>
							<tr>
								<th field="ele_nm" style="max-width: 170px">数据源名称</th>
								<th field="py_cd" style="max-width: 170px">拼音标识</th>
								<th field="data_typ" style="max-width: 170px">数据类型</th>
								<th field="remark" style="max-width: 190px">备注</th>
							</tr>
						</thead>
						<tbody>
							<c:forEach var="list" items="${list }">
								<tr>
									<c:choose>
										<c:when test="${fn:length(list['ele_nm']) >10}">
											<td title="${list['ele_nm']}">
												${fn:substring(list["ele_nm"], 0,10)}...</td>
										</c:when>
										<c:otherwise>
											<td>${list['ele_nm']}</td>
										</c:otherwise>
									</c:choose>
									<c:choose>
										<c:when test="${fn:length(list['eng_cd']) >15}">
											<td title="${list['eng_cd']}">
												${fn:substring(list["eng_cd"], 0,15)}...</td>
										</c:when>
										<c:otherwise>
											<td>${list['eng_cd']}</td>
										</c:otherwise>
									</c:choose>
									<td>${list["data_typ"] }</td>
									<td>${list["remark"] }</td>
								</tr>
							</c:forEach>

						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
</div>
<script>
	$(function()
	{
		$("#searchBtn").click(function()
		{
			var word = $("#searchInput").val();
			var table = $("#resGroup_table");
			if (word == "")
			{
				table.find("tbody tr").show();
			} else
			{
				table.find("tbody tr").hide();
				table.find("tbody tr").each(function()
				{
					var tr = $(this);
					var td1 = tr.find("td:eq(0)");
					var td2 = tr.find("td:eq(1)");
					td1 = td1.html();
					td2 = td2.html();
					if (td1.indexOf(word) == -1 && td2.indexOf(word) == -1)
					{
						tr.hide();
					} else
					{
						tr.show();
					}
				});
			}
		});
		$("#searchInput").keydown(function(e)
		{
			if (e.keyCode == 13)
			{
				$("#searchBtn").trigger("click");
			}
		});
	});
</script>