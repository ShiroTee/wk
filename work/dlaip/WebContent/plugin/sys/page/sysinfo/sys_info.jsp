<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<script>
REQUEST_URL_BASE= "<%=request.getContextPath()%>/app/http/";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/highcharts.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts//highcharts-more.js"></script>
<script type="text/javascript" src="js/sys_chart.js"></script>

	<body>
		 <table  width='100%'>
			<td>
				<div id="container" style="min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto"></div>
			</td>
			<td>
				<div id="container1" style="min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto"></div>
			</td>
			<td>
				<div id="container2" style="min-width: 310px; max-width: 400px; height: 300px; margin: 0 auto"></div>
			</td>
		</tr>
	</table>
	</body>
</html>