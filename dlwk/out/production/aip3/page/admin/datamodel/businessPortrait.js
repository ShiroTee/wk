
var colors=["#9467BD","#DE7B23","#48888D","#BB3535","#8C564A"];

var layerDistance=140;
var selectColor="#FF8000";
var defaultColor="#0000C0";
var duration = 750,cx=0,cy=0;
var tree = d3.layout.layerTree();
    tree.size([360, layerDistance]);
    tree.separation(function(a, b) { 
		return 1/tree.nodeLeaf;
	    //return (a.parent == b.parent ? 1 : 2) / a.depth;
	});

var drag=d3.behavior.drag()
	.origin(function(d) {
		return {x : svg.attr("cx"),y : svg.attr("cy")};
	})
	.on("drag", onDrag);

function onDrag(d) {
 svg.attr("cx",d3.event.x)
	.attr("cy",d3.event.y);
 svgGroup.attr("transform", "translate(" + d3.event.x+","+d3.event.y + ")");
}
var diameter = $(".business_portrait").height();
var diameter2 = $(".business_portrait").width() ;
cx=	diameter2  / 2 -100;
cy=diameter / 2;

var svg, svgGroup,linkGroup,nodeGroup;
svg = d3.select(".business_portrait").append("svg")
.attr("width",  diameter2 )
.attr("height", diameter  )
.attr("cx",cx)
.attr("cy",cy)
.call( drag );
function initSvg(){
	  $(".svg-group").remove();

	  svgGroup=svg.append("g")
    .attr("transform", "translate(" + cx + "," + cy + ")")
	.attr("class","svg-group");
     linkGroup=svgGroup.append("g").attr("class","link-group");
     nodeGroup=svgGroup.append("g").attr("class","node-group");
}



/*function zoom() {
	  console.log(d3.event.translate );
	  //d3.select(".svg-group")
	  d3.select(".svg-group").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}*/




var flareData={ID:"root",name:"name1"};
function update(selectNode)
{
  var nodes = tree.nodes(flareData),
      links = tree.links(nodes);
  /**
  **线
  **/
  var link = linkGroup.selectAll(".link")
      .data(links,function(d){
		return d.source.ID+d.source.name+"_"+d.target.ID+d.target.name;
	  });
  var linkEnter=link.enter().insert("line")
      .attr("class", "link")
	  .attr("x1",function(d){
		return selectNode ? selectNode.rx0:0;
	  })
	  .attr("y1",function(d){
		return selectNode ? selectNode.ry0:0;
	  })
	  .attr("x2",function(d){
		return selectNode ? selectNode.rx0:0;
	  })
	  .attr("y2",function(d){
		return selectNode ? selectNode.ry0:0;
	  }).attr("stroke",function(d){
		   return "#007D7F";
	  }).attr("stroke-width",function(d){
		  if(d.target.haschild != "1"  ){
				return "5.5px"
		  }else{
			  return "10.5px"
		  }
		 
	  })
	  .style("fill-opacity",0);
	  
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
  var linkUpdate=linkEnter.transition()
      .duration(duration)
	  .attr("x1",function(d){
		return d.source.rx;
	  })
	  .attr("y1",function(d){
		return d.source.ry;
	  })
	  .attr("x2",function(d){
		return d.target.rx;
	  })
	  .attr("y2",function(d){
		return d.target.ry;
	  })
	  .style("fill-opacity",1);
   var linkExit=link.exit();
   if(linkExit)
   {
	  linkExit.transition()
		.duration(duration)
		.attr("x1",function(d){
			return selectNode.rx;
		 })
		 .attr("y1",function(d){
			return selectNode.ry;
		 })
		.attr("x2",function(d){
			return selectNode.rx;
		 })
		 .attr("y2",function(d){
			return selectNode.ry;
		 })
		.style("fill-opacity",0)
		.remove(); 
   }
   /**
    * 
    */
 /*  svg.on("click",function(){
	  
	   d3.selectAll("circle").attr("stroke","white");
   });*/
  /**
  **节点
  **/
  var node = nodeGroup.selectAll(".node")
      .data(nodes,function(d){
		return d.ID+d.name;
	  });
  var nodeEnter=node.enter().append("g")
      .attr("class", function(d){
		var c="node";
		if(d.depth==0)
		{
			c+="root";
		}
		return c;
	  }).attr("haschild",function(d){
		 return d.haschild=='1'?d.haschild:0;
	  })
      .attr("transform", function(d) { 
		var x=0;
		var y=0;
		
		if(d.parent && selectNode && d.depth<selectNode.depth)
		{
			x=d.parent.rx0;
			y=d.parent.ry0;
		}
		else if(selectNode && d.depth>=selectNode.depth)
		{
			x=selectNode.rx0?selectNode.rx0:0;
			y=selectNode.ry0?selectNode.ry0:0;
		}
		return "translate("+x +","+ y + ")";
	  })
      .on("mouseover",function(d){
	    /*var rect=d3.select(this).select("rect");
		defaultColor=rect.style("stroke");
		rect.style("stroke",selectColor);*/
	  })
	  .on("mouseout",function(d)
	  {
		var rect=d3.select(this).select("rect");
		rect.style("stroke",defaultColor);
	  }).
	  on("click",function(d){
		   
		d3.selectAll("circle").attr("stroke","white");
		d3.select("[id='"+d.ID+"']").attr("stroke","red");
	    if(d.inited!=true)
		{
	    	showAllNodes(d);
		}
	    else
		{
	    	if(d.ID !="root"){
	    		toggleChildren(d);
	    	}
		    
			update(d);
		}
		centerNode(d);
		 ///////////////
		  $.ajax({
				url : ctx + "/mdp/welcome/business/getNodeDetail.json",
				type : 'POST',
				data : {
					nodeid : d.ID,
					companyno:searchCondition
				},
				success : function(dd) {
					 if(dd !=null && dd.data != null && dd.data.length>0){
						 var html ='';
						 for( var i = 0 ;i< dd.data.length;i++){
							 if(html !=""){
								 html+='<hr/>';
							 }
							 for(var key in dd.data[i]){
								 html+='<div class="details_line">';
								 html+='<div>';
								 html+=key;
								 html+='</div>';
								 html+='<div>';
								 html+= dd.data[i][key]==undefined?"&nbsp;":dd.data[i][key] ;
								 html+='</div>';
								 html+='</div>';
								
							 }	
							 
						 }

						 $("#main").find(".nodetitle").html(d.NODE_NAME);
						 $("#main").find(".details_info").html(html);
						 showDetails();
						/* d3.select(".svg-group").transition()
				         .duration(duration)
				         .attr("transform", function(d) {
							return "translate(" + 350 + "," + cy + ")";
						});*/
					 }else{
						// hideDetails();
						 showDetails();
						 $("#main").find(".nodetitle").html(d.NODE_NAME);
						 $("#main").find(".details_info").html("无数据");
						/* d3.select(".svg-group").transition()
				         .duration(duration)
				         .attr("transform", function(d) {
							return "translate(" + 350 + "," + cy + ")";
						});*/
					 }
				}
			});
		  
		  ////////////////
		
	  })
	  .style("fill-opacity",0);
	  
 /* var rect=nodeEnter.append("rect")
	  .attr("class", "text-bg") 	
      .attr("x", function(d){
		return -1*(d.w/2+4)
	  })
	  .attr("y", -11)
	  .attr("rx", 5)
	  .attr("ry", 5)
	  .attr("height", 22)  
      .attr("width", function(d){
		return d.w+8;
	  });*/
  
 var rect=nodeEnter.append("circle")
	  .attr("class", "text-bg") 	
	  .attr("x", function(d){
		return -1*(d.w/2+4)
	  }).attr("id",function(d){
		  return d.ID;
	  })
	  .attr("y", -11)
	  .attr("rx", 5)
	  .attr("ry", 5)
	  .attr("r", function(d){
		  if (d.ID == "root") {
				return 55;
			} if(d.haschild !="1"){
				return 30;
			}else {
				return 40
			}
	  }).attr("fill", function(d) {
			if (d.ID == "root") {
				return "white";
			} else {
				return "#9467BD";
			}
		}).attr("stroke","white").attr("stroke-width","2");
 
 nodeEnter.append("image").attr("xlink:href", function(d) {
	   
		if (d.ID == "root") {
			return ctx + "/page/admin/datamodel/image/"+d.IMG;
		} else if(d.haschild !="1"){
			return ctx + "/page/admin/datamodel/image/"+d.IMG;
		}else {
			return ctx + "/page/admin/datamodel/image/"+d.IMG;
		}
	}).attr("width", function(d){
		if(d.ID == "root"){
			return "80";
		}else if(d.haschild !="1"){
			return "35";
		}else{
			return "48";
		}
	}).attr("height",  function(d){
		if(d.ID == "root"){
			return "80";
		}else if(d.haschild !="1"){
			return "35";
		}else{
			return "48";
		}
	}).attr("x", function(d){
		if(d.ID == "root"){
			return "-40";
		}else if(d.haschild !="1"){
			return "-18";
		}else{
			return "-25";
		}
	}).attr("y", function(d){
		if(d.ID == "root"){
			return "-44";
		}else if(d.haschild !="1"){
			return "-20";
		}else{
			return "-26";
		}
	});
	  
  nodeEnter.append("text")
      .attr("dy", ".31em")
	  .attr("text-anchor","middle")
	  .attr("fill","white")
	  .attr("y", function(d) {
					
					if(d.ID == "root"){
						return 68;
					}else{
						return 50;
					}
				})
      .text(function(d) { return d.name; });
   //修改所有节点新位置
	nodeGroup.selectAll(".node")
	         .transition()
	         .duration(duration)
	         .attr("transform", function(d) {
				return "translate(" + d.rx + "," + d.ry + ")";
			});
   var nodeUpdate=nodeEnter.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + d.rx + "," + d.ry + ")";
            })
			.style("fill-opacity",1);
			
    var nodeExit = node.exit();
	if(nodeExit)
	{
	   nodeExit.transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + selectNode.rx + "," + selectNode.ry + ")";
            })
			.style("fill-opacity",0)
            .remove();
	}
			
   nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
			d.rx0=d.rx;
			d.ry0=d.ry;
   });
}
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
  
  function centerNode(d)
  {
    var x =cx-d.rx;
    var y = cy-d.ry;
	if(!x) x=0;
	var centerUpdate=d3.select('g').transition();
	   if((d.children || d._children) && d.depth!=0) centerUpdate.delay(duration);
       centerUpdate.duration(duration-200)
            .attr("transform", "translate(" + x + "," + y + ")");
	svg.attr("cx",x);
	svg.attr("cy",y);
  }
 //update();
  function showAllNodes(node) {
	 
		$.ajax({
			url : ctx + "/mdp/welcome/business/showNodeList.json",
			type : 'POST',
			data : {
				nodeid : node.ID,
				companyno:searchCondition
			},
			success : function(d) {
				var dataChild = [];
				if( d.children !=null && d.children !=undefined && d.children.length>0){
					node.haschild="1";
					for(var i = 0 ;i< d.children.length ;i++ ){
						if( d.children[i].isshow){
							dataChild.push(d.children[i]);
						}
					}
				}
				else{
					node.haschild="0";
				}
				node.IMG=d.IMG;
				node.ID = d.ID;
				node.NODE_NAME=d.NODE_NAME;
				node.name=d.NODE_NAME;
				node.inited=true;
				node.children=dataChild;
				update(node);
			}
		});
	}
 
  //
  var searchCondition="";
  function searchBusiness(){
	    initSvg();
	    flareData={ID:"root",name:"name1"};
	    searchCondition = $("#bpsearchIdinput").val();
	    hideDetails();
		if ( searchCondition.replace(/\s*/g, "") == "") {
			return false;
		}
		  $.ajax({
				url : ctx + "/mdp/welcome/business/getNodeDetail.json",
				type : 'POST',
				data : {
					nodeid : "root",
					companyno:searchCondition
				},
				success : function(dd) {
					 if( dd.data.length ==0 ){
						 alert("未查询到相关数据");
					 }else{
							showAllNodes(flareData);
					 }
					 //
				}
			});
	
  }
  searchBusiness();
 
//d3.select("body").style("height", diameter - 150 + "px");