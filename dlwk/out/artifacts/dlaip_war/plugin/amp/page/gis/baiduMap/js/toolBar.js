
var lineColor="red";
/**
 * 测面样式
 */
var polygonStyle = {
        strokeColor:"red",    //边线颜色。
        fillColor:'#8080FF',      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 2,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid', //边线的样式，solid或dashed。
        lineColor:lineColor
}
/***
 * 设置地图工具栏图标
 */
function setMapToolBar()
{
	var toolBar=$("#"+mapToolName);
	if(toolBar)
	{
		$('<img id="mt_drag" class="toolImg" title="拖动地图" src="assets/img/py.png"/>').appendTo(toolBar);
		$("#mt_drag").bind('mouseover', function() {$("#mt_drag").attr("src","assets/img/py1.png")});
		$("#mt_drag").bind('mouseout', function() {$("#mt_drag").attr("src","assets/img/py.png")});
		
		$('<img id="mt_zoomIn" class="toolImg" title="拉框放大" src="assets/img/fd.png"/>').appendTo(toolBar);
		$("#mt_zoomIn").bind('mouseover', function() {$("#mt_zoomIn").attr("src","assets/img/fd1.png")});
		$("#mt_zoomIn").bind('mouseout', function() {$("#mt_zoomIn").attr("src","assets/img/fd.png")});
		
		$('<img id="mt_zoomOut" class="toolImg" title="拉框缩小" src="assets/img/sx.png"/>').appendTo(toolBar);
		$("#mt_zoomOut").bind('mouseover', function() {$("#mt_zoomOut").attr("src","assets/img/sx1.png")});
		$("#mt_zoomOut").bind('mouseout', function() {$("#mt_zoomOut").attr("src","assets/img/sx.png")});
		
		$('<img id="mt_distance" class="toolImg" title="测距" src="assets/img/cj.png"/>').appendTo(toolBar);
		$("#mt_distance").bind('mouseover', function() {$("#mt_distance").attr("src","assets/img/cj1.png")});
		$("#mt_distance").bind('mouseout', function() {$("#mt_distance").attr("src","assets/img/cj.png")});
		
		$('<img id="mt_area" class="toolImg" title="测面" src="assets/img/cm.png"/>').appendTo(toolBar);
		$("#mt_area").bind('mouseover', function() {$("#mt_area").attr("src","assets/img/cm1.png")});
		$("#mt_area").bind('mouseout', function() {$("#mt_area").attr("src","assets/img/cm.png")});
		
		$('<img id="mt_clear" class="toolImg" title="清除" src="assets/img/qc.png"/>').appendTo(toolBar);
		$("#mt_clear").bind('mouseover', function() {$("#mt_clear").attr("src","assets/img/qc1.png")});
		$("#mt_clear").bind('mouseout', function() {$("#mt_clear").attr("src","assets/img/qc.png")});
	}
}
/**
 * 设置地图工具栏事件
 */
function setToolBarEvt()
{
	$("#mt_zoomIn").bind('click', function() {dragZoomInControl.open();});
	$("#mt_zoomOut").bind('click', function() {dragZoomOutControl.open();});
	$("#mt_distance").bind('click', function() {distanceControl.open();});
	$("#mt_area").bind('click', function() {areaControl.setDrawingMode(BMAP_DRAWING_POLYGON);areaControl.enableCalculate();areaControl.open();});
	$("#mt_clear").bind('click', function() {map.clearOverlays();hideResultPanel(); });
	//areaControl.addEventListener('polygoncomplete', onDrawPolygonComplete);
}
/**
 * 测面完成处理
 */
function onDrawPolygonComplete(overlay)
{
	
}
/**
 * 绘制完成处理
 */
function drawOverlayComplete(e)
{
	areaControl.close();
	var drawingMode =e.drawingMode;
	var bounds;
	if(drawingMode==BMAP_DRAWING_POLYGON)//多边形
	{ 
		var areaLabel=e.label;
		var area=areaLabel.content
		if(area>1000000)
		{
			area=(area/1000000).toFixed(2)+"平方公里";
		}
		else
		{
			area=area+"平方米";
		}
		areaLabel.setContent(area);
	}
	else if(drawingMode==BMAP_DRAWING_CIRCLE)//圆
	{
		//bounds=e.overlay.getBounds();
		spaceQry(e.overlay);
	}
	else if(drawingMode==BMAP_DRAWING_RECTANGLE)//矩形
	{
		//bounds=e.overlay.getBounds();
		spaceQry(e.overlay);
	}
}