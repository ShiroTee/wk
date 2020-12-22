/**
 * 图形高宽
 */
var width = 1000,
    height = 600,
    radius=0;
//数字格式器
var formatNumber = d3.format(",d");
//x范围
var x;
//y范围
var y;
//颜色 
var color = d3.scale.category20();
//数据
var graphData={};
var fontSize=12;
var minDx=0.012;
var selectedNode;
/**
 * 页面加载完成处理
 */
$(function(){
	initRootNode();
	initSvg();
	//initGraph(flareData1);
	loaderRoot();
});

/**var flareData1={
   id:0,
   name: "analytics",
   size:100,
   children: [
    {
	 id:1,
     name: "cluster",
     children: [
     ]
    },
    {
	  id:2,
     name: "graph",
	 size:100,
     children: [
      
     ]
    },
    {
     name: "optimization",
	 size:100,
     children: [
      
     ]
    }
   ]
  };
  var childs=[
		  {id:101,name: "AgglomerativeCluster", size: 3938},
		  {id:102,name: "CommunityStructure", size: 3812},
		  {id:103,name: "HierarchicalCluster", size: 6714},
		  {id:104,name: "MergeEdge", size: 743},
		  {id:105,name: "HierarchicalCluster2", size: 6714},
		  {id:106,name: "MergeEdge2", size: 743}
     ];
  **/
/**
 * 分区布局
 */
var partition = d3.layout.partition()
    .value(function(d) {
    	return 1;
	   // return d.size; 
	});
//圆弧产生器
var arc = d3.svg.arc()
    .startAngle(function(d) { 
		return Math.max(0, Math.min(2 * Math.PI, x(d.x))); 
	})
    .endAngle(function(d) { 
	   return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); 
	 })
    .innerRadius(function(d) {  
	   return Math.max(0, y(d.y)); 
	 })
    .outerRadius(function(d) { 
		return Math.max(0, y(d.y + d.dy)); 
	});

//svg
var svg;
/**
 * 设置svg布局
 */
function initSvg()
{
	width=$("#chartBox").width();
	height=$("#chartBox").height();
	radius = (Math.min(width, height) / 2) - 10;
	x = d3.scale.linear().range([0, 2 * Math.PI]);
	y = d3.scale.linear().range([0, radius]);
	svg = d3.select("#chartBox").append("svg")
	    .attr("width", width)
	    .attr("height", height)
    .append("g")
    	.attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");
}
/**
 * 设置节点初始化信息
 * @param d
 */
function initNode(d)
{
	d.init=true;
}
/**
 * 节点键值
 * @param d
 * @returns
 */
function dataKey(d)
{
	return d.id;
}
/**
 * 设置图形数据
 * @param gdata
 */
function initGraph(gdata)
{
  var nodes=partition.nodes(gdata);
  var paths=svg.selectAll("path").data(nodes,dataKey);
  var g=paths.enter().append("g");
  var path=g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { 
		return color(d.name); 
	  })
      .on("click", click)
      .on("dblclick",dblClick)
    path.append("title")
      .text(titleTxt);
	g.append("text") 
	.attr("transform",textRotateValue)
    .attr("text-anchor", textAnchorValue)
	.text(function(d) {
		return nameTxt(d); 
	  })
	.on("click", click)
	.on("dblclick",dblClick)
	.append("title")
      .text(titleTxt);
}
/**
 * 图形点击事件
 * @param d
 */
var selectedWidget;
var nodeTimeOut=0;
var isDbl=false;
function click(d) {
  nodeTimeOut=setTimeout(function(){
  clearTimeout(nodeTimeOut);
  if(isDbl==true)
  {
  	isDbl=false;
  	return;
  }
  if(d==selectedNode) return;
  selectedNode=d;
  var nodeType=d.type;
  var inited=d.init;
  if(selectedWidget) $.widget.hide(selectedWidget);
  switch(nodeType)
  {
       case 'asset':   //信息资源，根节点
    	   rescourceHandler(d.id,d.name);
    	   selectedWidget="#res-widget";
    	   break;
       case 'busi':  //业务事项
    	   if(inited!=true)
    	   {
    		   initBusiOffice(d);
    	   }
    	   loadbusi(d.id,d.name);
    	   selectedWidget="#busi-widget";
    	   break;
       case 'office':  //处室
    	   if(inited!=true)
    	   {
    		   initOfficeOrg(d);
    	   }
    	   loadOrg(d.id,d.name);
    	   selectedWidget="#org-widget";
    	   break;
       case 'org':   //委办局
    	   //window.location.href=ampPreUrl+"/cvpServerHandler/busi?id="+d.id;
    	   loadOrg(d.id,d.name);
    	   selectedWidget="#org-widget";
    	   break;
       default:
    	   break;
  }
  if(selectedWidget) $.widget.show(selectedWidget);
  if(d.children==null || d.children.length==0) return;
  if(inited==true)
  {
	  updateSvg(d);  
  }
  },300);
}
/**
 * 设置详情显示界面
 * @param {} d
 */
function setDetailShow(d)
{
	if(selectedWidget) $.widget.hide(selectedWidget);
	var nodeType=d.type;
  switch(nodeType)
  {
       case 'asset':   //信息资源，根节点
    	   rescourceHandler(d.id,d.name);
    	   selectedWidget="#res-widget";
    	   break;
       case 'busi':  //业务事项
    	   loadbusi(d.id,d.name);
    	   selectedWidget="#busi-widget";
    	   break;
       case 'office':  //处室
    	   loadOrg(d.id,d.name);
    	   selectedWidget="#org-widget";
    	   break;
       case 'org':   //委办局
    	   //window.location.href=ampPreUrl+"/cvpServerHandler/busi?id="+d.id;
    	   loadOrg(d.id,d.name);
    	   selectedWidget="#org-widget";
    	   break;
       default:
    	   break;
  }
  if(selectedWidget) $.widget.show(selectedWidget);
}
/**
 * 节点双击事件
 * @param d
 */
function dblClick(d)
{
	isDbl=true;
	setDetailShow(d);
	if(selectedWidget) $.widget.max(selectedWidget);
}
/**
 * 新增节点并更新图形
 * @param d
 */
function updateGraph(d)
{
	initGraph(graphData);
	updateSvg(d);
}
/**
 * 更新图形
 * @param d
 */
function updateSvg(d)
{
	svg.transition()
    .duration(1000)
	  .selectAll("path")
    .tween("scale", function(){
			var xd = d3.interpolate(x.domain(), [d.x, d.x+ d.dx]),
					yd = d3.interpolate(y.domain(), [d.y, 1]),
					yr = d3.interpolate(y.range(), [d.y ? 60 : 0, radius]);
				return function(t) { 
				   x.domain(xd(t)); 
				   y.domain(yd(t)).range(yr(t));
				};
		})
		.attrTween("d", attrTween);
	svg.transition()
    .duration(1000)
	  .selectAll("text")
	  .style("visibility",function(e) {
			return (nodeNC(d, e) || (d.parent && d.parent==e)) ? null: d3.select(this).style("visibility");
		})
    .attrTween("text-anchor",function(t){
	       return function(){
				return textAnchorValue(t);
		   }})
	  .attrTween("transform",function(t){
	       return function(){
				return textRotateValue(t);
		   }})
	.style("fill-opacity", function(e) {
		return (nodeNC(d, e) || (d.parent && d.parent==e)) ? 1 : 1e-6
	})
	.each("end",function(e) {
		d3.select(this).style("visibility",function(){
			var w =$(this).parent().width();
			var v= textVisible(d,e);
			return v;
		});
		svg.selectAll("text").each(function(d){
			$text=d3.select(this).text(nameTxt(d));
			$text.append("title").text(titleTxt);
			//console.log(d.dx);
		});
	});
}
/**
 * 设置文字显示状态
 * @param d
 * @param e
 * @returns
 */
function textVisible(d,e)
{
	var r=nodeNC(d, e);
	if(d.parent && d.parent==e) r=true;
	//if(e.dx<minDx) r=false;
	return r==true ? null: "hidden";
}
/**
 * 设置属性过渡动画
 * @param d
 * @returns {Function}
 */
function attrTween(d){
	 return function() { 
		 return arc(d); 
	  };
}
/**
 * 获取节点从属关系
 * @param n
 * @param e
 * @returns
 */
function nodeNC(n, e) {
	var result=(n === e ? !0 : n.children ? n.children.some(function(n) {
		return nodeNC(n, e)
	}) : !1)
	return result;
}
/**
 * 设置文本位置 
 * @param d
 * @returns
 */
function textAnchorValue(d)
{
	return x(d.x + d.dx/ 2) > Math.PI ? "end":"start"
}
/**
 * 设置文本旋转
 * @param t
 * @returns {String}
 */
function textRotateValue(t)
{
    var n = (t.name || "").split(" ").length > 1;
	var e = 180* x(t.x+ t.dx/2)/ Math.PI- 90, r = e+ (n ? -.5: 0);
	var rotate=(e > 90 ? -180: 0);
    return "rotate("+ r+ ")translate("+ (y(t.y)+5)+ ")rotate("+ rotate+ ")";
}
/**
 * 设置文本显示内容，当文本超长时截取文字
 * @param d
 * @returns {String}
 */
function nameTxt(d)
{
	var ntxt=d.name;
	var ntxt2=ntxt;
	if(ntxt.indexOf("(")>0)
	{
		ntxt.substring(0,ntxt.indexOf("("));
	}
	var r=Math.abs(radius*d.dy);
	var tc=Math.ceil(r/fontSize);
	if((tc-1)<ntxt2.length)
	{
		ntxt=ntxt.substr(0,tc-2)+"...";
	}
	
	return ntxt;
}
/**
 * 设置提示
 * @param d
 */
function titleTxt(d)
{
	var type=d.type;
	var result="";
	if(type=="asset")
	{
		result= "信息资源："+d.name;
	}
	else if(type=="busi")
	{
		result="业务事项："+d.name;
	}
	else if(type=="office")
	{
		result="组织机构(处室)："+d.name;
	}
	else if(type=="org")
	{
		result="组织机构(委办局)："+d.name;
	}
	else
	{
		result= d.name;
	}
	return result;
}
