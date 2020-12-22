<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Power By OWEN</title>

	<link rel="stylesheet" href="./jquery-ui/jquery-ui.theme.min.css" type="text/css">
	<link rel="stylesheet" href="./jquery-grid/css/ui.jqgrid.css" type="text/css">
	<link rel="stylesheet" href="./css/owenFrame.css" type="text/css">

	<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
	<script type="text/javascript" src="jquery/jquery.json-2.4.js"></script>
	<script type="text/javascript" src="layer/layer.min.js"></script>
	<script type="text/javascript" src="layer/extend/layer.ext.js"></script>
	
	<script type="text/javascript" src="jquery-layout/jquery.layout-latest.js"></script>
	
	<script type="text/javascript" src="jquery-ui/jquery-ui.min.js"></script>
	<script type="text/javascript" src="jquery-grid/js/jquery.jqGrid.js"></script>
	<script type="text/javascript" src="jquery-grid/js/grid.locale-cn.js"></script>
	
	<script type="text/javascript" src="app_js/jsBean.js"></script>
	<script type="text/javascript" src="app_js/owenFrame.js"></script>

</head>
<body>

	<div class="ui-layout-center">
				<div>
					<form>			
						<input type="button" id="recoverLast" 	value="系统还原"  onclick=""/>
						<input type="button" id="editTask" 	onclick="setIntervalTimes()"  	value="设置间隔" /> 
						<input type="button" id="startTask" 	value="启动"  /> 
						<input type="button" id="stopTask"  	value="停止"/>
						<input type="button" id="reloadTask"  onclick="reloadTasks()" value="获取新流程"/>
					</form>
				</div>
				<div>
					<div>
						<table id="tid_task_list"></table>
					</div>
					<div>
						<table id="task_detail"></table>
					</div>
				</div>
	</div>
	<div class="ui-layout-north" align="center">
		<h1>神州数码数据交换平台控制中心</h1>
		<label id="copyright">OWEN STUDIO ALL RIGHT RESERVED</label>
	</div>
	<div class="ui-layout-south">
		south
	</div>
	<div class="ui-layout-east">
		<div id="accordion-east">
			<h3>First</h3>
			<div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
			<h3>Second</h3>
			<div>Phasellus mattis tincidunt nibh.</div>
			<h3>Third</h3>
			<div>Nam dui erat, auctor a, dignissim quis.</div>
		</div>
	</div>
	<div class="ui-layout-west">
		<div id="accordion-west">
			<h3>First</h3>
			<div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
			<h3>Second</h3>
			<div>Phasellus mattis tincidunt nibh.</div>
			<h3>Third</h3>
			<div>Nam dui erat, auctor a, dignissim quis.</div>
		</div>
	</div>

</body>
</html>