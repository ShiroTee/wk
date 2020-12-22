/***
 * 图形控制页
 * 
 */
//宽
var gwidth=1200;
//高
var gheight=350;
//图形每层半径
var layerDistance = 180;
var selectBorderColor = "#FF8000";
var defaultColor = "#0000C0";
var duration = 750, cx = 0, cy = 0;
//树布局
var tree = d3.layout.layerTree();
tree.size([360, layerDistance]);
tree.separation(function(a, b) {
			return 1/tree.nodeLeaf;
	});
//拖动行为
var drag = d3.behavior.drag().origin(function(d) {
			return {
				x : svg.attr("cx"),
				y : svg.attr("cy")
			};
		}).on("drag", onDrag);

function onDrag(d) {
	svg.attr("cx", d3.event.x).attr("cy", d3.event.y);
	svgGroup.attr("transform", "translate(" + d3.event.x + "," + d3.event.y
					+ ")");
}
/**
 * 图形定义
 */
var svg,svgGroup,linkGroup,nodeGroup,
graphData={
	    nodeId:rootOrgId,
		name : rootOrgName,
		root : true,
		type:'city',
		children:[]}; 
/**
 * 初始图形
 */
function initSvg()
{
	cx = gwidth / 2;
	cy = gheight / 2;
	svg = d3.select("#orgChart").append("svg").attr("width", gwidth).attr(
		"height", gheight).attr("cx", cx).attr("cy", cy).call(drag);
	svgGroup = svg.append("g").attr("transform",
			"translate(" + cx + "," + cy + ")").attr("class", "svg-group");
	linkGroup = svgGroup.append("g").attr("class", "link-group");
	nodeGroup = svgGroup.append("g").attr("class", "node-group");
	
	//箭头
	//添加defs标签
	var defs = svg.append("defs");
	//添加marker标签及其属性
	var arrowMarker = defs.append("marker")
		.attr("id","arrow")
		.attr("markerUnits","strokeWidth")
		.attr("markerWidth",12)
		.attr("markerHeight",12)
		.attr("viewBox","0 0 12 12")
		.attr("refX",66)
		.attr("refY",6)
		.attr("orient","auto");
	//添加remarker标签及其属性
	var reArrowMarker = defs.append("marker")
		.attr("id","rearrow")
		.attr("markerUnits","strokeWidth")
		.attr("markerWidth",12)
		.attr("markerHeight",12)
		.attr("viewBox","0 0 12 12")
		.attr("refX",66)
		.attr("refY",6)
		.attr("orient","auto");
	//绘制直线箭头
	var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
	arrowMarker.append("path").attr("d",arrow_path);
	
	var reArrow_path = "M2,6 L10,2 L6,6 L10,10 L2,6";
	reArrowMarker.append("path").attr("d",reArrow_path);
}
/**
 * 更新数据
 * @param {} selectNode 选择节点，为空则表示为初始化
 */
function updateSvg(selectNode) {
	var nodes = tree.nodes(graphData), links = tree.links(nodes);

	/**
	 * 节点连接线
	 */
	var link = linkGroup.selectAll(".link").data(links, function(d) {
				return d.source.nodeId + "_" + d.target.nodeId;
			});
	var linkEnter = link.enter().insert("line").attr("class", "link").attr(
			"x1", function(d) {
				return (selectNode && selectNode.rx0) ? selectNode.rx0 : 0;
			}).attr("y1", function(d) {
				return (selectNode && selectNode.ry0) ? selectNode.ry0 : 0;
			}).attr("x2", function(d) {
				return (selectNode && selectNode.rx0) ? selectNode.rx0 : 0;
			}).attr("y2", function(d) {
				return (selectNode && selectNode.ry0) ? selectNode.ry0 : 0;
			}).style("fill-opacity", 0)
			.attr("marker-end",function(d){
				var arrow="none";
				var d=d.target;
				if(d.depth==5 && d.gid==0)
				{
					arrow="url(#rearrow)";
				}
				else if(d.depth==5 && d.gid==1)
				{
					arrow="url(#arrow)";
				}
				return arrow;
			});
	
	//修改所有连线的位置
    linkGroup.selectAll(".link")
           .transition()
           .duration(duration)
           .attr("x1",function(d) {
				return d.source.rx;
			}).attr("y1", function(d) {
				return d.source.ry;
			}).attr("x2", function(d) {
				return d.target.rx;
			}).attr("y2", function(d) {
				return d.target.ry;
			});
    //新增连线显示
	var linkUpdate = linkEnter.transition().duration(duration)
	        .attr("x1",function(d) {
				return d.source.rx;
			}).attr("y1", function(d) {
				return d.source.ry;
			}).attr("x2", function(d) {
				return d.target.rx;
			}).attr("y2", function(d) {
				return d.target.ry;
			}).style("fill-opacity", 1);
	var linkExit = link.exit();//不用的节线
	if (linkExit) {
		linkExit.attr("marker-end",null);
		linkExit.transition().duration(duration).attr("x1", function(d) {
					return selectNode.rx;
				}).attr("y1", function(d) {
					return selectNode.ry;
				}).attr("x2", function(d) {
					return selectNode.rx;
				}).attr("y2", function(d) {
					return selectNode.ry;
				}).style("fill-opacity", 0)
				.remove();
	}

	/**
	 * 图形节点
	 */
	var node = nodeGroup.selectAll(".node").data(nodes, function(d) {
				return d.nodeId;
			});
	var mouseOverNode=null;
	var mouseEnableDelay=true,mouseOverDelayTime=1000,mouseOverTimeOutId=0;
	var nodeEnter = node.enter().append("g").attr("class", function(d) {
				var c = "node";
				if (d.depth == 0) {
					c += " root";
				}
				return c;
			}).attr("transform", function(d) {
				var x = 0;
				var y = 0;
				if (d.parent && selectNode && d.depth < selectNode.depth) {
					x = d.parent.rx0;
					y = d.parent.ry0;
				} else if (selectNode && d.depth >= selectNode.depth) {
					x = selectNode.rx0;
					y = selectNode.ry0;
				}
				return "translate(" + x + "," + y + ")";
			}).on("mouseover", function(d) {
				if(mouseOverNode!=d && d.depth!=0)
				{
					/**var rect = d3.select(this).select("rect");
					defaultColor = rect.style("stroke");
					rect.style("stroke", selectBorderColor);**/
					d3.selectAll("svg .node-over").classed("node-over",false);
					d3.select(this).classed("node-over",true);
					
					var nodeGroupG=nodeGroup[0][0];
					var n=nodeGroupG.appendChild(this);
					var event=d3.event;
					if(mouseEnableDelay==true)
					{
						mouseOverTimeOutId=setTimeout(function(){
							nodemouseenter(d,event);
						},mouseOverDelayTime);
					}
					
				}
				mouseOverNode=d;
			}).on("mouseout", function(d) {
				//console.log("mouseout:"+d3.event.target.tagName+" to "+d3.event.toElement.tagName);
				if(d3.event && ((d3.event.srcElement && d3.event.srcElement.parentNode!=d3.event.toElement.parentNode) || (d3.event.relatedTarget!=null && d3.event.target.parentNode!=d3.event.relatedTarget.parentNode )))
				{
					/**var rect = d3.select(this).select("rect");
				    rect.style("stroke", defaultColor);**/
					d3.select(this).classed("node-over",false);
				    mouseOverNode=null;
				    nodemouseout(d);
				    clearTimeout(mouseOverTimeOutId);
				}
			}).on("click", function(d) {
				setSelectNode(d3.select(this),d);
				if(d.depth!=0)
				{
					nodeClick(d);
				}
			})
			.on("dblclick",function(d){
				nodedblClick(d);
			})
			.style("fill-opacity", 0);
    //文本背景框
	var rect = nodeEnter.append("rect").attr("class", "text-bg")
	        .attr("x",
			function(d) {
				return -1 * (d.w / 2 + 4)
			})
			.attr("y", -11).attr("rx", 5).attr("ry", 5).attr("height", 22)
			.attr("width", function(d) {
						return d.w + 8;
					})
			.attr("fill", function(d) {
				//不同层数节点拥有不同的颜色
				if(d.depth==0){
					return "#C0FFFF";
				}else if(d.depth==1){
					return "#80FF80";
				}else if(d.depth==2){
					return "#D0D0FF";
				}else if(d.depth==3){
					return "#FDFAAF";
				}else if(d.depth==4){
					return "#B6DC91";
				}else if(d.depth==5){
					if(d.gid==0){
						return "#FDD5FD";
					}else if(d.gid==1){
						return "#D3D0DF";
					}else{
						return "#91CBBD";
					}
					
				}
			})
		    .attr("name",function(d){
		    	return d.type+"_"+d.nodeId;
		    });

	nodeEnter.append("text").attr("dy", ".31em").attr("text-anchor", "middle")
			.text(function(d) {
						return d.name;
					});

	//修改所有节点新位置
	nodeGroup.selectAll(".node")
	         .transition()
	         .duration(duration)
	         .attr("transform", function(d) {
				return "translate(" + d.rx + "," + d.ry + ")";
			});
	//新增节点显示		
	var nodeUpdate = nodeEnter.transition().duration(duration)
	        .attr("transform", function(d) {
				return "translate(" + d.rx + "," + d.ry + ")";
			})
	        .style("fill-opacity", 1);

	var nodeExit = node.exit();//不用的节点
	if (nodeExit) {
		nodeExit.transition().duration(duration)
		       .attr("transform", function(d) {
					return "translate(" + selectNode.rx + "," + selectNode.ry
							+ ")"; 
				})
				.style("fill-opacity", 0)
				.remove();
	}
	
	
	nodes.forEach(function(d) {
				d.x0 = d.x;
				d.y0 = d.y;
				d.rx0 = d.rx;
				d.ry0 = d.ry;
			});
}
/**
 * 节点反向设置,用于展开、关闭
 * @param {} d
 * @return {}
 */
function toggleChildren(d) {
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else if (d._children) {
		d.children = d._children;
		d._children = null;
	}
	return d;
}
/**
 * 设置节点居中显示
 * @param {} d
 */
function centerNode(d) {
	var x = cx - d.rx;
	var y = cy - d.ry;
	if (!x)
		x = 0;
	var centerUpdate = d3.select('g').transition();
	if ((d.children || d._children) && d.depth != 0)
		centerUpdate.delay(duration);
	centerUpdate.duration(duration - 200).attr("transform",
			"translate(" + x + "," + y + ")");
	svg.attr("cx", x);
	svg.attr("cy", y);
}
/**
 * 更新节点
 * @param {} d
 */
function updateNode(d)
{
	updateSvg(d);
	centerNode(d);
}
/**
 * 设置选择节点
 * @param {} d
 */
function setSelectNode(selection,d)
{
	var c="node selected";
	if(lastSelectNode)
	{
		lastSelectNode.attr("class","node");
	}
	lastSelectNode=selection;
	if(d.depth==0) c="node root selected";
	lastSelectNode.attr("class",c);
}