//图形参数
var w = 1120, h = 600,x,y;

var vis,kx,ky,g,graphData,nodes;
//颜色 
var color = d3.scale.category10();
var partition = d3.layout.partition().value(function(d) {
	return 1;//d.size;
});

/**graphData={name:"主题分类",size:1,children:[
      {name:"主题分类1",size:1,children:[
        {name:"主题分类111",size:1},
        {name:"主题分类112",size:1}
      ]},
      {name:"主题分类2",size:1}                           
]};**/
/**
 * 页面加载完成
 */
$(function() {
	initGraph();
	loaderCategory();
	$("#categoryLabels").delegate(".btn", "click", onCategoryChange);
});
/**
 * 分类改变处理
 * 
 * @param e
 */
function onCategoryChange(e) {
	$("#categoryLabels .btn[disabled='disabled']").removeAttr("disabled");
	$(this).attr("disabled", 'disabled');

	selectCate = $(this).data("id");
	selectCateName = $(this).data("name");
	loadCategory(0, selectCate);
}
/**
 * 初始图形
 */
function initGraph() {
	w=$("#chartBox").width();
	h=$("#chartBox").height();
	x = d3.scale.linear().range([ 0, w ]); 
	y = d3.scale.linear().range([ 0, h ]);
	vis = d3.select("#chartBox").append("div").attr("class", "chart").style(
			"width", w + "px").style("height", h + "px").append("svg").attr(
			"width", w).attr("height", h);
}
/**
 * 更新图形
 */
function updateGraph(d)
{
	nodes=partition.nodes(graphData);
	//setNodeDy();
	g = vis.selectAll("g")
	.data(nodes).enter().append("g")
	.attr("transform", function(d) {
		return "translate(" + x(d.y) + "," + y(d.x) + ")";
	}).on("click", click)
	.on("dblclick",onDbClcik);
	kx = w / graphData.dx, ky = h / 1;
	g.append("rect")
	/**.attr("width", function(d){
	    return d.dy * kx;
	}) **/  
	.attr("width",graphData.dy * kx)
	.attr("height", function(d) {
	   return d.dx * ky;
	}).attr("class", function(d) {
	return d.size ? "parent" : "child";
	}).style("fill", function(d) { 
		return color(d.infoLevel); //d.infoLevel   d.name
	  });
	
	g.append("text").attr("transform", transform).attr("dy", ".35em").style(
		"opacity", function(d) {
			return d.dx * ky > 12 ? 1 : 0;
		}).text(function(d) {
	      return d.name+"("+d.infoCount+")";
	});
	
//	d3.select(window).on("click", function() {
//	    click(graphData);
//	});
	
	if(d)
	{
		playNode(d);
	}
    if(d && d.infoLevel<=1) //主分类切换时播放淡出效果
    {
    	var tw=vis.attr("width"),th=vis.attr("height");
    	vis.attr("opacity",0)
    	.attr("width",0)
    	.attr("height",0)
    	.transition()
    	.duration(1000)
    	.attr("opacity",1)
    	.attr("width",tw)
    	.attr("height",th);
    }
}
/**
 * 设置图形节点比例
 */
var tdepth,dyv=4,sumdp;
function setNodeDy()
{
	tdepth=nodeDepth(graphData);
	sumdp=sumData(tdepth);
	calcNodeDy(graphData);
}
function calcNodeDy(d)
{
	d.dy=(1+(d.depth+1)/sumdp*dyv)/(tdepth+dyv);
	var children=d.children;
	if(children && children.length>0)
	{
		for(var i=0;i<children.length;i++)
		{
			calcNodeDy(children[i]);
		}
	}
}
/**
 * 求数据和，如4则计算1,2,3,4
 * @param {} sum
 * @return {}
 */
function sumData(sum)
{
	var r=0;
	for(var i=1;i<=sum;i++)
	{
		r+=i;
	}
	return r;
}
/**
 * 图形点击事件
 * @param d
 */
var nodeTimeOut=0;
var isDb=false;
function click(d) {
	nodeTimeOut=setTimeout(function(){
		clearTimeout(nodeTimeOut);
		if(isDb==true)
		{
			isDb=false;
			return;
		}
		showDetailPage(d);
		if(d.qry!=true)//如果不存在则查询新数据
		{
			loadCategory(d.infoLevel,d.infoId,d);
			return;
		}
		if (!d.children)
			return;
	    
		playNode(d);
	},300);
	
}
function showDetailPage(d)
{
	$.widget.show("#resourceInfo");
	resDataHandler(d.name,d.infoId,4);
	qryResInfoHandler();
}
/**
 * 展开详情页面
 * @param {} d
 */
function onDbClcik(d)
{
	isDb=true;
	showDetailPage(d);
	$.widget.max("#resourceInfo");
}
/**
 * 节点动画 
 * @param d
 */
function playNode(d)
{
	//if(!d3.event) return; 
	kx = (d.y ? w - 40 : w) / (1 - d.y);
	ky = h / d.dx;
	x.domain([ d.y, 1 ]).range([ d.y ? 40 : 0, w ]);
	y.domain([ d.x, d.x + d.dx ]);

	var t = g.transition().duration((d3.event && d3.event.altKey) ? 7500 : 750).attr(
			"transform", function(d) {
				return "translate(" + x(d.y) + "," + y(d.x) + ")";
			});

	t.select("rect").attr("width", d.dy * kx).attr("height", function(d) {
		return d.dx * ky;
	});

	t.select("text").attr("transform", transform).style("opacity", function(d) {
		return d.dx * ky > 12 ? 1 : 0;
	});

	if(d3.event) d3.event.stopPropagation();
}

function transform(d) {
	return "translate(8," + d.dx * ky / 2 + ")";
}
/**
 * 清除图形数据
 */
function clearData()
{
	vis.selectAll("g")
//	.transition()	
//	.duration(1000)
//	.attr('transform', "translate(0,0)")
//	.style("opacity",0)
	.remove();
}
/**
 * 获取节点拥有子级数
 * @param node
 * @returns {Number}
 */
function nodeDepth(node) {
    var children = node.children,
        d = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n;
      while (++i < n) d = Math.max(d, nodeDepth(children[i]));
    }
    return 1 + d;
}