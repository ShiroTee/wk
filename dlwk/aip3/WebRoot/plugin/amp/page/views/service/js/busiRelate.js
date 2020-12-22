/**
 * 图形
 */
var margin = {top: 1, right: 50, bottom: 5, left: 50},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),
format = function(d) { return formatNumber(d) + " TWh"; },
color = d3.scale.category20();
var nodeColos={busi:'#3483BA',relasset:'#B5CBE9',relsys:'#00C000',relbusi:'#FE8B25'};
/**
 * 页面加载完成
 */
$(function(e){
	loaderBusiRels();
	width=$("#chartBox").width()-margin.left - margin.right;
	height=$("#chartBox").height()- margin.top - margin.bottom;
});
/**
 * 初始图形
 * */
function initGraph(energy)
{
	$("#chartBox").empty();
	var svg = d3.select("#chartBox").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	var sankey = d3.sankey()
	.nodeWidth(25)
	.nodePadding(10)
	.size([width, height]);
	
	var path = sankey.link();
	
	sankey
	  .nodes(energy.nodes)
	  .links(energy.links)
	  .layout(32);
	
	var link = svg.append("g").selectAll(".link")
	  .data(energy.links)
	.enter().append("path")
	  .attr("class", "link")
	  .attr("d", path)
	  .style("stroke-width", function(d) { return Math.max(1, d.dy); })
	  .sort(function(a, b) { return b.dy - a.dy; });
	
	link.append("title")
	  .text(function(d) { 
		  return getNodeTypeName(d.source)+"："+d.source.name + " - " +getNodeTypeName(d.target)+"："+ d.target.name
	  });
	
	var node = svg.append("g").selectAll(".node")
	  .data(energy.nodes)
	.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//	.call(d3.behavior.drag()
//	  .origin(function(d) { return d; })
//	  .on("dragstart", function() { this.parentNode.appendChild(this); })
//	  .on("drag", dragmove));
	
	node.append("rect")
	  .attr("height", function(d) { return d.dy; })
	  .attr("width", sankey.nodeWidth())
	  .style("fill", function(d) { 
		  return d.color = nodeColos[d.node_type]?nodeColos[d.node_type]:"#FF4040";//color(d.name.replace(/ .*/, "")); 
		})
	  .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
	.append("title")
	  .text(function(d) {
		  return getNodeTypeName(d)+"："+d.name; //+ "\n" + format(d.value); 
		});
	
	node.append("text")
	  .attr("x", -6)
	  .attr("y", function(d) { return d.dy / 2; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", "end")
	  .attr("transform", null)
	  .text(function(d) { return d.name; })
	.filter(function(d) { return d.x < width / 2; })
	  .attr("x", 6 + sankey.nodeWidth())
	  .attr("text-anchor", "start");
	
	d3.selectAll(".node").on("click",onNodeClick);
	d3.selectAll(".node").on("dblclick",nodeDblClick);
	/**
	 * 拖动节点
	 */
	function dragmove(d) {
		d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
		sankey.relayout();
		link.attr("d", path);
	}
}

//查询数据
function loaderBusiRels()
{
	var url=ampPreUrl+"/cvpServerHandler/qryBusiRels";
    $.ajax({url:url,type:"POST",dataType:"json",data:{busiId:busiId},complete:function(XMLHttpRequest, textStatus){}
    	,success:function(data, textStatus, jqXHR){
    		var assets=data.assets;
    		var syses=data.syses;
    		var busies=data.busies;
    		var busi=data.busi;
    		var al=assets.length;
    		var sl=syses.length;
    		var bl=busies.length;
    		var all=al+sl+bl;
    		//设置业务事项关联数
    		$("#lengName").html(busi.busi_nm);
    		$("#bl_asset").html(al);
    		$("#bl_sys").html(sl);
    		$("#bl_busi").html(bl);
    		if(all==0) //业务未关联信息系统、业务事项、信息资源则不显示图形
    		{
    			//$("#chartBox").html("<label style='padding-left:40px;'>业务事项【"+busi.busi_nm+"】暂无关联信息</label>");
    			return ;
    		}
    		//构造数据
    		var busiData={nodes:[],links:[]};
    		busiData.nodes.push(busi);
    		busi.name=busi.busi_nm;
    		busi.node_type="busi";
    		busi.id=busiId;
    		 
    		for(var i=0;i<sl;i++)
    		{
    			var item=syses[i];
    			busiData.nodes.push(item);
    			busiData.links.push({source:(i+1),target:0,value:1});
    		}
    		for(var i=0;i<bl;i++)
    		{
    			var item=busies[i];
    			busiData.nodes.push(item);
    			busiData.links.push({source:(sl+1+i),target:0,value:1});
    		}
    		for(var i=0;i<al;i++)
    		{
    			var item=assets[i];
    			busiData.nodes.push(item);
    			busiData.links.push({source:0,target:(sl+bl+1+i),value:1});
    		}
    		initGraph(busiData);
    	}
    });
}
/**
 * 获取类型名称
 * @param d
 */
function getNodeTypeName(d)
{
	var type=d.node_type;
	var name="";
	if(type=="busi")
	{
		name="业务事项"; 
	}
	else if(type=="relasset")
	{
		name="信息资源"; 
	} 
	else if(type=="relsys")
	{
		name="信息系统"; 
	}
	else if(type=="relbusi")
	{
		name="业务事项"; 
	}
	return name;
}
/**
 * 单击节点
 * @param d
 */
var selectNode,selectWidget;
function onNodeClick(d)
{
	var type=d.node_type;
	var id=d.id;
	var name=d.name;
	selectNode=d;
	if(selectWidget) $.widget.hide(selectWidget);
	if(type=="busi" || type=="relbusi")
	{
		loadbusi(id,name);
		selectWidget="#busi-widget";
	}
	else if(type=="relasset")
	{
		rescourceHandler(id,name);
		selectWidget="#res-widget";
		//$.app.openFullScreen(ampPreUrl+"/cvpAssetHandler/backtrace?assetId="+id+"&type=1");
	} 
	else if(type=="relsys")
	{
		loadSys(id,name);
		selectWidget="#sys-widget";
	}
	if(selectWidget) $.widget.show(selectWidget);
}
/**
 * 双击节点
 * @param d
 */
function nodeDblClick(d)
{
	if(selectWidget) $.widget.max(selectWidget);
}