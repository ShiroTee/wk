/***
 * 自定义工具
 */
var MyTool = window.MyTool = MyTool || {};
/***
 * 标签控件
 */
MyTool.MapLabelControl=function(){
	// 默认停靠位置和偏移量
	 this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	 this.defaultOffset = new BMap.Size(10, 30);
}
MyTool.MapLabelControl.prototype = new BMap.Control();
MyTool.MapLabelControl.prototype.initialize=function(map){
	
	lnglatLabel=document.createElement("div");
	lnglatLabel.id=lnglatName;
	lnglatLabel.innerHTML="0,0";
	map.getContainer().appendChild(lnglatLabel);
	return lnglatLabel;
}

/**
 * 地图工具条
 */
MyTool.MapToolBarControl=function()
{
	 this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	 this.defaultOffset = new BMap.Size(10, 30);
};
// 通过JavaScript的prototype属性继承于BMap.Control
MyTool.MapToolBarControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
MyTool.MapToolBarControl.prototype.initialize = function(map){
	  // 创建一个DOM元素
	  var toolBarDiv =document.createElement("div");
	  toolBarDiv.id=mapToolName;
	  this.defaultOffset.width=(map.width-toolBarWidth)/2;
	  toolBarDiv.align="center";
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(toolBarDiv);
	  setMapToolBar();
	  setToolBarEvt();
	  return toolBarDiv;
}