/***
 * 搜索类
 */
var searchLocal;
/****
 * 页面加载完成处理
 */
function onPageLoad(evt)
{
	setKeyBoxHeight();
	setResultPanelSize();
}
/***
 * 页面大小改变是处理
 */
function onBodyResizeHandler()
{
	setMapWidth();
	setKeyBoxHeight();
	setResultPanelSize();
	setMapToolCenter();
}
/**
 * 设置工具栏居中
 */
function setMapToolCenter()
{ 
	$("#mapTools").css("left",($("#mapContainer").width()-toolBarWidth)/2+"px");
}
function setKeyBoxHeight()
{
	$("#m_keyBox").height($("#body").height()-140);
}
function setResultPanelSize()
{
	$("#resultPanel").height($("#body").height()-32);
}
/**
 * 点击首页处理
 */
function onIndexLabelClick(e)
{
	hideResultPanel();
}
/***
 * 隐藏查询结果面板
 */
function hideResultPanel()
{
	$("#resultPanel").html("无数据");
	$("#resultPanel").css("visibility","hidden");
	map.clearOverlays();
}
/***
 * 显示查询结果面板
 */
function showResultPanel()
{
	$("#resultPanel").css("visibility","visible");
}
/****
 * 
 * 关键字输入框自动匹配
 */
function setTextInputMatchSearch()
{
	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			{"input" : "m_searchTxt"
			,"location" : map
		});
	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
			var str = "";
			var _value = e.fromitem.value;
			var value = "";
			if (e.fromitem.index > -1) {
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
			
			value = "";
			if (e.toitem.index > -1) {
				_value = e.toitem.value;
				value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			}    
			str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
			$("#m_searchResultPanel").attr("innerHTML" , str);
		});
	
		
		ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
			var _value = e.item.value;
			var myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
			$("#m_searchResultPanel").attr("innerHTML" ,"onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue);
			
			//setPlace(myValue);
		});
}
function setPlace(myValue){
		map.clearOverlays();    //清除地图上所有覆盖物
		localSearch(myValue);
}
/***
 * 关键字查询
 */
function selectQry(type)
{
	var buName=type;
	var searchTxt=$("#m_searchTxt").val();
	if(!searchTxt)
	{
		alert("请输入关键字");
		return;
	}
	if(buName==0)//条件查询
	{
		clearMap();
		localSearch(searchTxt);
	}
	else if(buName==1)//拉框查询
	{
		clearMap();
		areaControl.setDrawingMode(BMAP_DRAWING_RECTANGLE);
		areaControl.disableCalculate(); 
		areaControl.open();
	}
	else if(buName==2)//圆形查询
	{
		clearMap();
		areaControl.setDrawingMode(BMAP_DRAWING_CIRCLE);
		areaControl.disableCalculate();
		areaControl.open();
	}
}
/**
 * 开始搜索
 */
function localSearch(value)
{
	showResultPanel();
	getSearchLocal().search(value);
}
function getSearchLocal()
{
	$("#resultPanel").text("数据查询中...");
	if(!searchLocal)
	{
		searchLocal = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: onLocalSearchComplete,
		  renderOptions: {map: map, panel: "resultPanel"},
		  pageCapacity:12
		});
	}
	return searchLocal;
}
/**
 * 空间查询
 */
function spaceQry(overlay)
{
	if(overlay)
	{
		var searchTxt=$("#m_searchTxt").val();
		if(overlay.constructor == BMap.Polygon)
		{
			showResultPanel();
			getSearchLocal().searchInBounds(searchTxt,overlay.getBounds());
		}
		else if(overlay.constructor == BMap.Circle)
		{
			showResultPanel();
			var bounds = getSquareBounds(overlay.getCenter(),overlay.getRadius());
			getSearchLocal().searchInBounds(searchTxt,bounds);
			//getSearchLocal().searchNearby(searchTxt,overlay.getCenter(),overlay.getRadius());
		}
		
	}
}
/***
 * 搜索完成处理
 */
function onLocalSearchComplete(results)
{
	var total=results.getNumPois();
	if(total>0)
	{
		
	}
	else
	{
		
	}
}
/**
 * 得到圆的内接正方形bounds
 * @param {Point} centerPoi 圆形范围的圆心
 * @param {Number} r 圆形范围的半径
 * @return 无返回值   
 */ 
function getSquareBounds(centerPoi,r){
    var a = Math.sqrt(2) * r; //正方形边长
  
    mPoi = getMecator(centerPoi);
    var x0 = mPoi.x, y0 = mPoi.y;
 
    var x1 = x0 + a / 2 , y1 = y0 + a / 2;//东北点
    var x2 = x0 - a / 2 , y2 = y0 - a / 2;//西南点
    
    var ne = getPoi(new BMap.Pixel(x1, y1)), sw = getPoi(new BMap.Pixel(x2, y2));
    return new BMap.Bounds(sw, ne);        
    
}
//根据球面坐标获得平面坐标。
function getMecator(poi){
    return map.getMapType().getProjection().lngLatToPoint(poi);
}
//根据平面坐标获得球面坐标。
function getPoi(mecator){
    return map.getMapType().getProjection().pointToLngLat(mecator);
}

