/**
 * 图形高宽
 */
var width = 1300,
    height = 600,
	layerRadius=110,
	gduration=600,
    color = d3.scale.category10();

//数据
var graphData={};
var fontSize=13;
var minDx=0.012;
var selectedNode;
/**
 * 页面加载完成处理
 */
$(function(){
	initSvg();
	loaderRoot();
	setOrgChartFull();
});

/**
 * 分区布局
 */
var partition = d3.layout.layerPartition()
    .size([2*Math.PI, layerRadius])
	.sort(function comparator(a, b) {
		return a.name.localeCompare(b.name);
	});
/**
 * 初始圆弧生成器
 */
var initArc = d3.svg.arc()
    .startAngle(function(d,t) {
		return t*d.x; 
	})
    .endAngle(function(d,t) {
		return t*d.x + t*d.dx;
	})
    .innerRadius(function(d,t) { 
		return t*d.y; 
	})
    .outerRadius(function(d,t) { 
		return t*d.dy; 
	});
/**
 * 更新圆弧生成器
 */
var updateArc = d3.svg.arc()
    .startAngle(function(d,t) {
	    if(isChildNode(selectedNode,d)){
	    	return t*d.x;
	    }
		return d3.interpolateNumber(d.x0,d.x)(t); 
	})
    .endAngle(function(d,t) {
	    if(isChildNode(selectedNode,d)){
	    	return t*(d.x+d.dx);
	    }
		return d3.interpolateNumber(d.x0+d.dx0,d.x+d.dx)(t);
	})
    .innerRadius(function(d,t) { 
    	var y0=(d.y0!=null ? d.y0:selectedNode.dy);
		return d3.interpolateNumber(y0,d.y)(t); 
	})
    .outerRadius(function(d,t) { 
    	var dy0=(d.dy0!=null ? d.dy0:(selectedNode.dy+layerRadius));
		return d3.interpolateNumber(dy0,d.dy)(t); 
	});
/**
 * 初始圆弧
 * @param {} d 节点数据
 * @param {} t 0-1过渡
 * @return {}
 */	
function tweenArc(d,t)
{
	return function(t){
		return initArc(d,t);
	}
}
/**
 * 更新圆弧
 * @param {} d 节点数据
 * @param {} t 0-1过渡
 * @return {}
 */
function updateTweenArc(d,t)
{
	return function(t){
		return updateArc(d,t);
	}
}

//svg
var svg,svgGroup;
var nodes,g,draging=false;
/**
 * 设置svg布局
 */
function initSvg()
{
	var gh=$(".graph-draw-box").height();
	var bh=$(document).height();
	if((bh-200)>gh)
	{
		gh=bh-220;
		$(".graph-draw-box").height(gh);
	}
	
	width=$("#chartBox").width();
	height=gh;
	//radius = (Math.min(width, height) / 2) - 10;
	
    svg = d3.select("#chartBox").append("svg")
	    .attr("width", width)
	    .attr("height", height)
		.attr("cx", width/2)
	    .attr("cy", height/2);
    svgGroup=svg.append("g")
    	.attr("transform", "translate(" + width / 2 + "," + height /2 + ")");
    //设置拖动	
    svg.call( d3.behavior.drag()
		.origin(function(d) {
			return {x : svg.attr("cx"),y : svg.attr("cy")};
		})
		.on("dragstart",function(d){
			draging=true;
		})
		.on("drag", onDrag)
		.on("dragend",function(d){
			draging=false;
		}));
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
*更新图形
***/
function updateGraph()
{
  nodes=partition.nodes(graphData);
  
  svgGroup.selectAll(".node").remove();
  
  graphs=svgGroup.selectAll(".node").data(nodes);
 
  var g=graphs.enter().append("g")
  .attr("class","node");
  
 var pathes= g.append("path")
    .style("stroke", "#fff")      
	.style("fill", function(d) {
		return color(d.id);
	})
	.on("click", click)
    .on("dblclick",dblClick)
    .on("mouseover",onNodeMouseOver);
	
 var text= g.append("text")
      .text(nameTxt)
	  .style("fill-opacity", 0)
      .attr("dx", "6") // margin
      .attr("dy", ".35em") // vertical-align
	  .on("click", click)
	  .on("dblclick",dblClick)
	  .on("mouseover",onNodeMouseOver);
  g.append("title")
	.text(titleTxt);
  
  
  if(!selectedNode)
  {
	  pathes.transition()
		.duration(gduration)  
		.attrTween("d", function tween(d, i, a){
			return tweenArc(d,i);
		});
		
	  setNodeTxtPosition(text);
	}
	else
	{
	    //svgGroup.selectAll(".node").selectAll("path")
	    pathes.each(function(d,i){
			var path=d3.select(this);
			path.transition()
			.duration(gduration)  
			.attrTween("d", function tween(d, i, a){
				return updateTweenArc(d,i);
			});
		});
		svgGroup.selectAll(".node").selectAll("text").each(function(d,i){
			setNodeTxtPosition(d3.select(this));
		});
	}
}
/**
*设置文本位置
***/
function setNodeTxtPosition(text)
{
	text.transition()
		.duration(gduration)
		.attr("transform", function(d) {
				//return "rotate(" + (d.x + d.dx / 2 - Math.PI / 2) / Math.PI * 180 + ")";
				if(d.depth==0) return "rotate(0)";
				var r=d.x + d.dx / 2-Math.PI / 2;
				if(r>Math.PI / 2) r+=Math.PI;
				return "rotate("+ r/Math.PI*180+")";
		  })
		 .attr("x", function(d) { 
				var tw=d3.select(this).style("width");
				tw=tw.replace("px","");
				tw=Number(tw);
				if(tw==0)
				{
					tw=this.scrollWidth;
				}
				else if(isNaN(tw))
				{
				    var str=d3.select(this).text(),strLen=0;
					tw=0;
					if(str!=null)
					{
						strLen=str.replace(/[^\x00-\xff]/g,"aa").length;
						tw=strLen*7+1;
					}
				}
				if(d.depth==0) return (-12-tw)/2;
				var tx=d.y;
				var r=d.x + d.dx / 2-Math.PI / 2;
				if(r>Math.PI / 2)
				{
					tx=-1*(d.y+tw+12);
				}
				return tx; 
		  })
		  .style("fill-opacity", 1);
}
function toggleChildren(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
			d.value=1;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        }
        return d;
}
/**
*判断child是parent子节点
****/
function isChildNode(parent,child)
{
    var flag=false,children;
	if(parent.depth>child.depth) return flag;
	children=parent._children;
	if(!children) children=parent.children;
	if(children && children.indexOf(child)>=0)
	{
		flag=true;
	}
	else if(children)
	{
		for(var i=0;i<children.length;i++)
		{
			flag=isChildNode(children[i],child);
			if(flag==true) break;
		}
	}
	return flag;
}
function recordOldArc(nodes)
{
	for(var i=0;i<nodes.length;i++)
	{
		var node=nodes[i];
		node.x0=node.x;
		node.y0=node.y;
		node.dx0=node.dx;
		node.dy0=node.dy;
	}
}
function onDrag(d) {
 svg.attr("cx",d3.event.x)
			.attr("cy",d3.event.y);
 svgGroup.attr("transform", "translate(" + d3.event.x+","+d3.event.y + ")");
}
/**
 * 图形点击事件
 * @param d
 */
var nodeTimeOut=0;
var isDbl=false;
function click(d) {
  //recordOldArc(nodes);
  nodeTimeOut=setTimeout(function(){
  clearTimeout(nodeTimeOut);
  if(isDbl==true)
  {
  	isDbl=false;
  	return;
  }
  //if(d==selectedNode) return;
  selectedNode=d;
  var nodeType=d.node_type;
  var inited=d.init;
  switch(nodeType)
  {
       case 'org':   //组织机构，根节点
    	   break;
       case 'serv':  //服务对象分类
    	   if(inited!=true)
    	   {
    		   initServChildNodes(d);
    	   }
    	   openServerBusi(d);
    	   break;
       case 'relserv':  //服务对象分类子类
    	   if(inited!=true)
    	   {
    		   initChildServNodes(d);
    	   }
    	   openServerBusi(d);
    	   break;
       case 'busi':   //业务事项
           if( d.qry==true && !(d.related.assetNum==0 && d.related.busiNum==0 &&  d.related.sysNum==0))
           {
           		window.location.href=ampPreUrl+"/cvpServerHandler/busi?id="+d.id;
           }
           else
           {
               $.app.alert({
	                title : "提示",
	                message : "未找到【"+d.name+"】关联的信息资源、信息系统、业务事项"
            	});
           }
    	   break;
       default:
    	   break;
  }
  
  if(inited==true)
  {
	  updateNode(d);  
  }
  },300);
}
/**
 * 更新数据
 * @param {} d
 */
function updateNode(d)
{
	if(d.depth!=0 && (d.children || d._children) && draging!=true)
	{
		toggleChildren(d);
		recordOldArc(nodes);
	    updateGraph();
	}
}
/**
 * 节点双击事件
 * @param d
 */
var selectWidget;
function dblClick(d)
{
	 selectedNode=d;
	 hideSelectWidget();
	 isDbl=true;
	 var nodeType=d.node_type;
	 if(nodeType=="serv" || nodeType=="relserv")
	 {
		 openServerBusi(d);
		 selectWidget='#serverBusi-widget';
	 }
	 else if(nodeType=='busi')
	 {
	 	loadbusi(d.id,d.name);
		selectWidget="#busi-widget";
	 }
	 if(selectWidget) $.widget.max(selectWidget);
}
/**
 * 鼠标移到图形节点时处理
 * @param {} d
 */
function onNodeMouseOver(d)
{
	if(d.node_type=="busi" && d.qry!=true)
	{
		var title=$(this).parent().find("title");
		qryBusiNodeRelateCount(d,title);
	}
}
/**
 *隐藏选择的底部详情框
 */
function hideSelectWidget()
{
	if(selectWidget) $.widget.hide(selectWidget);
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
	var len=0;
	if(ntxt.indexOf("(")>0)
	{
		ntxt.substring(0,ntxt.indexOf("("));
	}
	else
	{
		len=2;
	}
	var r=layerRadius;
	var tc=Math.ceil(r/fontSize);
	if((tc-len)<ntxt.length)
	{
		ntxt=ntxt2.substr(0,tc-3)+"...";
	}
	
	return ntxt;
}
/**
 * 设置提示
 * @param d
 */
function titleTxt(d)
{
	var type=d.node_type;
	var result="";
	if(type=="org")
	{
		result= d.org_nm + "\n关联服务对象类型："+d.num+"类";
	}
	else if(type=="serv")
	{
		result=d.serv_obj_name+"\n类型：服务对象分类\n关联子分类："+d.object_num+"类\n关联业务事项："+d.busi_num+"项";
	}
	else if(type=="relserv")
	{
		result=d.serv_obj_name+"\n类型：服务对象子分类\n关联业务事项："+d.num+"项";
	}
	else if(type=="busi")
	{
		result= setBusiTip(d);
	}
	else
	{
		result= d.name;
	}
	return result;
}
/**
 * 设置业务事项提示
 * @param {} d
 */
function setBusiTip(d,title)
{
	var tip =d.name+"\n类型：业务事项";
	if(d.related!=null)
	{
		tip=tip+"\n上级业务："+d.related.parentBusi+"\n关联信息资源："+d.related.assetNum+"项\n关联信息系统："+d.related.sysNum+"个\n关联业务事项："+d.related.busiNum+"项";
	}
	if(title!=null)
	{
		title.text(tip);
	}
	return tip;
}