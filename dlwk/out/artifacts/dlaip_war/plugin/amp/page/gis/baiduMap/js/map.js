//工具栏名称
var mapToolName="mapTools";
var lnglatName="lnglatlabel";
var lnglatLabel;
var toolBarWidth=400;
var map;
var dragZoomInControl;
var dragZoomOutControl;
var distanceControl;
var areaControl;
var qryWidth=322;
//异步加载地图包
/**function loadMapJScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = map_url+"&"+map_ak+"&callback=initMap";
	document.body.appendChild(script);
}**/
/***
 * 
 * 初始化地图
 */
function initMap()
{
	setMapWidth();
	// 百度地图API功能
	map = new BMap.Map("mapContainer");    // 创建Map实例
	map.centerAndZoom(map_city, map_level);  // 初始化地图,设置中心点坐标和地图级别
    //地图事件
	map.addEventListener("mousemove",mapMouseMoveHandler);
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl());   
	map.enableScrollWheelZoom(true);
	
	//添加默认缩放平移控件
  	var navigationControl = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT,
  	type: BMAP_NAVIGATION_CONTROL_LARGE,enableGeolocation: true});  
  	navigationControl.setOffset(new BMap.Size(20, 20));
    map.addControl(navigationControl);
   
    // 添加比例尺
    var scaleControl = new BMap.ScaleControl();
    map.addControl(scaleControl);
    scaleControl.setOffset(new BMap.Size(160, 35));
     //缩略图
    var overViewControl = new BMap.OverviewMapControl({isOpen:true});
    map.addControl(overViewControl);
    //构造全景控件
    var panoramaControl = new BMap.PanoramaControl(); 
	panoramaControl.setOffset(new BMap.Size(20, 100));
	map.addControl(panoramaControl);//添加全景控件
	
	//拉框控件
	dragZoomInControl = new BMapLib.RectangleZoom(map, {followText: "拉框放大",zoomType:0,autoClose:true});
	dragZoomOutControl=new BMapLib.RectangleZoom(map, {followText: "拉框缩小",zoomType:1,autoClose:true});
	map.addControl(dragZoomInControl);
	map.addControl(dragZoomOutControl);
	//测距控件
	distanceControl=new BMapLib.DistanceTool(map,{followText:'点击地图进行测距',lineStroke:2,opacity:1,lineColor:lineColor});
	map.addControl(distanceControl);
	//测面
	areaControl=new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        drawingType:BMAP_DRAWING_POLYGON,
        enableCalculate:true,
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            scale: 0.8, //工具栏缩放比例
        	drawingTypes : [
            BMAP_DRAWING_MARKER,
            BMAP_DRAWING_CIRCLE,
            BMAP_DRAWING_POLYLINE,
            BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_RECTANGLE 
         	]
        },
        circleOptions: polygonStyle, //圆的样式
        polylineOptions: polygonStyle, //线的样式
        polygonOptions: polygonStyle, //多边形的样式
        rectangleOptions: polygonStyle //矩形的样式
    });  
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    areaControl.addEventListener('overlaycomplete', drawOverlayComplete);
    //经纬度显示栏
	var mapLabelControl=new MyTool.MapLabelControl();
	map.addControl(mapLabelControl);
	//工具栏
	var mapToolBarControl = new MyTool.MapToolBarControl(); 
	map.addControl(mapToolBarControl);
}
/**
 * 地图鼠标移动事件
 */
function mapMouseMoveHandler(e)
{
	lnglatLabel.innerHTML=e.point.lng.toFixed(4)+","+e.point.lat.toFixed(4);
}/**
 * 清除地图
 */
function clearMap()
{
	if(map)
	{
		map.clearOverlays();
	}
}
function setMapWidth()
{
	$("#mapContainer").width($("#body").width()-qryWidth);
}