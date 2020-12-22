var svgdata;
var svgMap = d3.map();
var centerx, centery;
var clickgid;
$(function() {
	$("svg").width($(".business_portrait").width());
	$("svg").height($(".business_portrait").height());
	var svg = d3.select("svg"), width = $(".business_portrait").width(), height =$(".business_portrait").height(), g = svg.append("g").attr("transform",
			"translate(" + (width / 2 )+ "," + (height / 2 ) + ")");
	var stratify = d3.stratify().id(function(d) {
		return d.ID;
	}).parentId(function(d) {
		return d.PARENT_ID;
	});
	var cluster = d3.cluster().size([ 360, 1 * 150 ]);
	// 画图
	function drawTree(args) {
		// if(cluster.size()[1])
		cluster.size([ 360, args.level * 150 ]);
		// 设置数据
		var data = svgMap.values();
		var root = stratify(data).sort(function(a, b) {
			return a.height - b.height || a.id.localeCompare(b.id);
		});
		cluster(root);

		// 模拟画节点-----------------------------------------------------
		g.selectAll(".link2").remove();
		g.selectAll(".node2").remove();

		/*var link2 = g.selectAll(".link2").data(root.descendants().slice(1)).enter().append("path").attr("class", "link2").attr(
				"d",
				function(d) {
					return "M" + project(d.x, d.y) + "C" + project(d.x, (d.y + d.parent.y) / 2) + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
							+ " " + project(d.parent.x, d.parent.y);
				}).attr("linkid2", function(d) {
			return d.id;
		});*/
		
		var link2 =g.selectAll(".link2").data(root.links()).enter().append("line").attr("class", "link2").attr("x1", function(d) {
			return getX(d.source.x,d.source.y);
		}).attr("y1", function(d) {
			return getY(d.source.x,d.source.y);
		}).attr("x2", function(d) {
			return getX(d.target.x,d.target.y);
		}).attr("y2", function(d) {
			return getY(d.target.x,d.target.y);
		}).attr("stroke", "#079ce3").attr("stroke-width", 1).attr("linkid2", function(d) {
			return d.target.id;
		});
		

		var node2 = g.selectAll(".node2").data(root.descendants()).enter().append("g").attr("class", function(d) {
			return "node2";
		}).attr("transform", function(d) {
			return "translate(" + project(d.x, d.y) + ")";
		}).attr("id2", function(d) {
			return d.id;
		});
		// 默认中心位置
		if (centerx == null) {
			var gx = g.attr("transform");
			console.log(gx);
			var xyarray = /[\-0-9\.]+\s*,\s*[\-0-9\.]+/g.exec(gx)[0].split(",");
			centerx = parseFloat(xyarray[0]);
			centery = parseFloat(xyarray[1]);
		}
		// -------------------------------------------------------------
		var oldTrans = "";
		var oldx1=1,oldy1=1,oldx2=1,oldy2=1;
		if (args.id != "root") {
			oldTrans = d3.select("[id='" + args.id + "']").attr("transform");
			//oldD = d3.select("[linkid2='" + args.id + "']").attr("d");
			oldx1 =  d3.select("[linkid2='" + args.id + "']").attr("x1");
			oldy1 =  d3.select("[linkid2='" + args.id + "']").attr("y1");
			oldx2 =  d3.select("[linkid2='" + args.id + "']").attr("x2");
			oldy2 =  d3.select("[linkid2='" + args.id + "']").attr("y2");
		} else {
			oldTrans = "translate(1,1)";
			//oldD = "M1,1C1,1 1,1 0,0";
		}
		// 画线条
		g.selectAll(".link2").each(
				function() {
					var linkid = d3.select(this).attr("linkid2");
					var linkdata = d3.select(this).data();
					var x1 = d3.select(this).attr("x1");
					var y1 = d3.select(this).attr("y1");
					var x2 = d3.select(this).attr("x2");
					var y2 = d3.select(this).attr("y2");
					if (d3.select("[linkid='" + linkid + "']").size() == 0) {
						var link = g.insert("line", ":first-child").data(linkdata).attr("class", "link")
						.attr("x1", function(d) {
							return oldx1;
						}).attr("y1", function(d) {
							return oldy1;
						}).attr("x2", function(d) {
							return oldx2;
						}).attr("y2", function(d) {
							return oldy2;
						}).attr("linkid", function(d) {
							return d.target.id;
						}).attr("parentpath", function(d) {
							return d.target.data.PARENT_ID;
						}).attr("stroke", "#079ce3").attr("stroke-width", 1);
						
						link.transition().duration(200).attr("x1", function(d) {
							return x1;
						}).attr("y1", function(d) {
							return y1;
						}).attr("x2", function(d) {
							return x2;
						}).attr("y2", function(d) {
							return y2;
						});
					} else {
						
						d3.select("[linkid='" + linkid + "']").transition().duration(200)
						.attr("x1", function(d) {
							return x1;
						}).attr("y1", function(d) {
							return y1;
						}).attr("x2", function(d) {
							return x2;
						}).attr("y2", function(d) {
							return y2;
						});
					}
				});
		// 画节点
		g.selectAll(".node2").each(function() {
			var nodeid = d3.select(this).attr("id2");
			var nodedata = d3.select(this).data();
			var t = d3.transition();
			t.on("end", function() {
				if (args.id != "root") {
					var xyarray = /[\-0-9\.]+\s*,\s*[\-0-9\.]+/g.exec(d3.select("[id='" + args.id + "']").attr("transform"))[0].split(",");
					var tx, ty;
					if (xyarray[0] <= 0) {
						tx = centerx + -1 * xyarray[0];

					} else {
						tx = centerx + -1 * xyarray[0];
					}
					if (xyarray[1] <= 0) {
						ty = centery + -1 * xyarray[1];
					} else {
						ty = centery + -1 * xyarray[1];
					}
					g.transition().duration(300).attr("transform", "translate(" + tx + "," + ty + ")");
				}
			})
			if (d3.select("[id='" + nodeid + "']").size() == 0) {
				var node = g.append("g").data(nodedata).attr("transform", function(d) {
					return oldTrans;
				}).attr("id", function(d) {
					return d.id;
				}).attr("level", function(d) {
					return d.data.SHOWLEVEL;
				}).attr("parentnode", function(d) {
					return d.data.PARENT_ID;
				});
				node.append("circle").attr("r", function(d) {
					if (d.id == "root") {
						return 55;
					} else {
						return 40
					}
				}).attr("fill", function(d) {
					if (d.id == "root") {
						return "white";
					} else {
						return "#9467BD";
					}
				}).attr("stroke","white").attr("stroke-width","2");
				node.append("image").attr("xlink:href", function(d) {
					if (d.id == "root") {
						return ctx + "/page/admin/datamodel/image/company.png";
					} else {
						return ctx + "/page/admin/datamodel/image/basicinfo.svg";
					}
				}).attr("width", function(d){
					if(d.id == "root"){
						return "80";
					}else{
						return "48";
					}
				}).attr("height",  function(d){
					if(d.id == "root"){
						return "80";
					}else{
						return "48";
					}
				}).attr("x", function(d){
					if(d.id == "root"){
						return "-40";
					}else{
						return "-25";
					}
				}).attr("y", function(d){
					if(d.id == "root"){
						return "-44";
					}else{
						return "-26";
					}
				});

				node.append("text").attr("dy", "0.31em").attr("y", function(d) {
					
					if(d.id == "root"){
						return 78;
					}else{
						return 60;
					}
				}).attr("x", function(d) {
					return -28;
				}).attr("style", function(d) {
					return "font-size:18px;";
				}).attr("fill", "white").text(function(d) {
					return d.data.NODE_NAME
				});
				node.transition(t).duration(300).attr("transform", function(d) {
					return "translate(" + project(d.x, d.y) + ")";
				});
				node.on("click", function() {

					var args = {
						id : $(this).attr("id"),
						level : parseInt($(this).attr("level")),// parseInt($(this).attr("level")),
					}
					if ($(this).attr("expand") != "1") {
						showAllNodes(args, 0);
						$(this).attr("expand", "1");
					} else {
						var clickid = $(this).attr("id");
						var clickTrans = d3.select("[id='" + clickid + "']").attr("transform");
						var clickD = d3.select("[linkid2='" + clickid + "']").attr("d");

						var deldatas = [];
						getDelIds(deldatas, clickid);
						if (deldatas.length > 0) {
							var selectNodes = "";
							for (var j = 0; j < deldatas.length; j++) {
								svgMap.remove(deldatas[j])
								d3.select("[id='" + deldatas[j] + "']").transition().duration(300).attr("transform", function(d) {
									return clickTrans;
								}).remove();
								d3.select("[linkid='" + deldatas[j] + "']").transition().duration(200).attr("d", function(d) {
									return clickD;
								}).remove();
							}
						}
						$(this).attr("expand", "0");
						drawTree(args);
					}
				});
			} else {
				d3.select("[id='" + nodeid + "']").transition(t).duration(300).attr("transform", function(d) {
					d = nodedata[0];
					return "translate(" + project(d.x, d.y) + ")";
				});
			}
		});

	}

	function getDelIds(deldatas, clickid) {
		var datas = svgMap.values();
		for (var i = 0; i < datas.length; i++) {
			if (clickid == datas[i].PARENT_ID) {
				deldatas.push(datas[i].ID)
				getDelIds(deldatas, datas[i].ID);
			}
		}
	}
	function showAllNodes(args, flag) {
		$.ajax({
			url : ctx + "/mdp/welcome/business/showNodeList.json",
			type : 'POST',
			data : {
				nodeid : args.id
			},
			success : function(d) {
				for (var i = 0; i < d.length; i++) {
					svgMap.set(d[i].ID, d[i]);
				}
				drawTree(args);
			}
		});
	}
	var args = {
		id : 'root',
		level : 1,
	}
	showAllNodes(args);
	/*拖动*/
/*	*/
	var dragFlag = 0;
	function started(d) {
		dragFlag=1;
		var gx = g.attr("transform");
		var xyarray = /[\-0-9\.]+\s*,\s*[\-0-9\.]+/g.exec(gx)[0].split(",");
		var dx = d3.event.x;
		var dy = d3.event.y;
		g.attr("czx", parseFloat(xyarray[0]) - dx);
		g.attr("czy", parseFloat(xyarray[1]) - dy);
	}
	draged = function(d) {
		
		var tx = d3.event.x + parseFloat(g.attr("czx"));
		var ty = d3.event.y + parseFloat(g.attr("czy"));
		g.attr("transform", "translate(" + tx + "," + ty + ")");
	}
	stoped = function(d){
		dragFlag=0;
	}
	var drag = d3.drag().on("start", started).on("drag", draged).on("end",stoped);
	svg.call(drag);
	//放大缩小
	
	svg.on("mousedown",function(){
		var gx = g.attr("transform");
		var xyarray = /[\-0-9\.]+\s*,\s*[\-0-9\.]+/g.exec(gx)[0].split(",");
		var dx = d3.event.x;
		var dy = d3.event.y;
		g.attr("czx", parseFloat(xyarray[0]) - dx);
		g.attr("czy", parseFloat(xyarray[1]) - dy);
	})
	 

	svg.call(d3.zoom()
	        .scaleExtent([1 / 2, 4])
	        .on("zoom", zoomed));
	var zoomFlag = 1;
	function zoomed() {
		   if(dragFlag==1)return false;
		   var d3Trans = d3.event.transform;
		  /**/
		   if( d3Trans.x <100 ){
			   d3Trans.x=centerx;
			   d3Trans.y=centery;
		   }
		   console.log(d3Trans);
		   g.attr("transform", d3Trans);
           zoomFlag++;
		 // 
	}
})

function project(x, y) {
	var angle = (x - 90) / 180 * Math.PI, radius = y;
	return [ radius * Math.cos(angle), radius * Math.sin(angle) ];
}
function getX(x, y){
	var angle = (x - 90) / 180 * Math.PI, radius = y;
	return   radius * Math.cos(angle) ;
}
function getY(x, y){
	var angle = (x - 90) / 180 * Math.PI, radius = y;
	return   radius * Math.sin(angle)  ;
}
