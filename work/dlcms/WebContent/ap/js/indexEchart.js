//可是话产品种类列表
function indexEchartQuery() {
	$.ajax( {
		url : echartUrl + "getIndexChartsCatogary",
		dataType : 'jsonp',
		jsonp : "jsonpcallback",
		success : function(data) {
			var obj = data.data.listBeans.length;
			var tbody = "";
			if (obj != undefined && obj > 0) {
				for ( var i = 0; i < obj; i++) {
					tbody += "<tr><td>" + "	<a href="
							+ data.data.listBeans[i].pageUrl
							+ " ><font color='blue'>"
							+ data.data.listBeans[i].chartName + "</font>"
							+ "</a>" + "	</td></tr>";
				}
				$("#chartsProduct").html(tbody);
			} else {
				$("#chartsProduct").html(
						"<tr><td colspan='2'>暂无任何可视化产品</td></tr>");
			}
		},
		error : function(response) {
			alert(response);
		},
		timeout : 6000
	});
}
