//半径
var R = 800;
//宽
var width=1200;
//高
var height=350;
//上一次点击的节点信息
var lastSelectNode={};
var selectWidget;
$(function() {
	
	//设置最低高度以及大屏幕自动扩展高度
	var gh=$("#orgChart").height();
	var bh=$(document).height();
	if((bh-200)>gh)
	{
		gh=bh-220;
		$("#orgChart").animate({height:gh},500);
	}
	height=gh;	
	
	// 节点编号
	var index = 0;
	//width+35  maginleft-45
	width=$("#orgChart").width()+35;

	// 动画时长
	var duration = 600;
	// 定义一个Tree对象,定义旋转角度和最大半径
	var cluster = d3.layout.cluster().size([ 360, R / 3 - 140 ]).separation(
			function(a, b) {
				return (a.parent == b.parent ? 1 : 2) / a.depth;
			});
	
	// 定义布局方向
	var diagonal = d3.svg.diagonal().projection(function(d) {
		var r = d.y, a = (d.x - 90) / 180 * Math.PI;
		return [ r * Math.cos(a), r * Math.sin(a) ];
	});

	//拖拽事件
	function zoom() {
	    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
	    console.log(d3.event.translate);
	}

	//拖拽监听事件
	var zoomListener = d3.behavior.zoom().scaleExtent([0.6, 2]).on("zoom", zoom);


	// 新建画布，移动到圆心位置
	var svg = d3.select("#orgChart").append("svg").call(zoomListener).attr("width", width).attr(
			"height", height);

	
    function centerNode(source) {
    	
        scale = zoomListener.scale();
        x = -source.y0;
        y = -source.x0;
        x = width / 2;
        y = height/2;
        d3.select('g').transition()
            .duration(duration)
            .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
        zoomListener.scale(scale);
        zoomListener.translate([x, y]);
        console.log("x:"+x+"y:"+y);
    }

	//svg单击事件
	d3.select("svg").on("click", function(){
		$("#tip").hide();
	});

	/*d3.select('g').transition()
	.duration(duration).attr("transform", function(d) {
		return "translate(" + (width / 2) + "," + R / 4 + ")";
	});*/


	
	var svgGroup = svg.append("g");
	
	//获取初始化数据
	qryOrgHandler();
	
	
	
	//鼠标在node内变化位置事件
	/***$("#orgChart").delegate(".node circle","mousemove",function(e){
		var top = e.pageY+5;
		   var left = e.pageX+5;
		   $('#tip').css({
		    'top' : top + 'px',
		    'left': left+ 'px'
		   });
	});**/
	
	$("#orgChart").delegate(".node circle","mouseover",function(e){
		var top = e.pageY+15;
	    var left = e.pageX+5;
	    $('#tip').css({
		    'top' : top + 'px',
		    'left': left+ 'px'
	    });
	});
	$(".popover").delegate(".close-bu","click",hideHandler);
	$(".popover").delegate(".org-link","click",onOrgTipLink);
	
	//初始化数据
	function loaddata(error, data) {
		if (error)
			throw error;
		var root = data;
		
		function toggleAll(d) {
			if (d.children) {
				d.children.forEach(toggleAll);
				toggle(d);
			}
		}

		// Initialize the display to show a few nodes.
		root.children.forEach(toggleAll);

		update(root);

		// 更新显示
		function update(source) {
			// 取得现有的节点数据
			var nodes = cluster.nodes(root);
			var links = cluster.links(nodes);
			// 为节点更新数据
			var node = svgGroup.selectAll("g.node").data(nodes, function(d) {
				return d.id || (d.id = ++index);
			});
			var d=source;
			//假如点击的不是根节点
			if(!d.root){
//				$("#orgChart").css("height",height+200);
				$("#orgChart").animate({height:height+160},500);
				$("svg").attr("height",height+200);
			}
			// 为链接更新数据
			var link = svgGroup.selectAll("path.link").data(links, function(d) {
				return d.target.id;
			});
			// 更新链接
			link.enter().append("path").attr("class", "link").attr("d",
					function(d) {
						var o = {
							x : source.x,
							y : source.y
						};
						return diagonal({
							source : o,
							target : o
						});
					});
			link.transition().duration(duration).attr("d", diagonal);
			// 移除无用的链接
			link.exit().transition().duration(duration).attr("d", function(d) {
				var o = {
					x : source.x,
					y : source.y
				};
				return diagonal({
					source : o,
					target : o
				});
			}).remove();
			// 更新节点集合
			var nodeEnter = node.enter().append("g").attr("class", "node").attr(
					"transform",
					function(d) {
						if (source.x0) {
							return "rotate(" + (source.x0 - 90) + ")translate("
									+ source.y0 + ")";
						}

					});
			
			// 为节点添加圆形标记,并修改其颜色
			nodeEnter.append("circle").attr("fill", function(d) {
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
			}).attr("r", 7).attr("type",d.type).on("click", nodeClick).on("dblclick", nodedblClick).on("mouseenter",nodemouseenter).on("mouseout",nodemouseout);
			// 为节点添加说明文字
			nodeEnter.append("text");
			// 节点动画
			 node.transition().duration(duration).attr("transform",
					function(d) {
						return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
					});

			node.selectAll("text").attr("style","font-family:'微软雅黑'").attr("dy", ".4em").text(function(d) {
				return d.nicenm!=null&&d.depth!=5&&d.nicenm.length>4?(d.nicenm.substring(0,4)+"..("+d.value+")"):d.name;
			}).attr("text-anchor", function(d) {
				return d.x < 180 ? "start" : "end";
			}).attr("transform", function(d) {
				if (d.root) {
					return "rotate(270)translate(-8)";
				} else {
					return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
				}

			})/*.attr("fill","blue")*/;

			// 将无用的子节点删除
			var nodeExit = node.exit().transition().duration(duration).attr("transform",
					function(d) {
						return "rotate(" + (source.x - 90) + ")translate("
								+ source.y + ")";
					}).remove();
			// 记录下当前位置,为下次动画记录初始值
			nodes.forEach(function(d) {
				d.x0 = d.x;
				d.y0 = d.y;
			});

			node.selectAll("circle").attr("name",function(d){
				if(d.nodeId){
					return ""+d.nodeId;
				}else{
					return "root";
				}
				
			});
			
			
			var timeId;
			// 点击的话，隐藏或者显示子节点
			function nodeClick(d) {
				clearTimeout(timeId);
				timeId = setTimeout(function() {
					if (d.root) {
						// donothing
					} else {
						toggle(d);
						onClick(d);
					}
					//记录点击节点的颜色以及其nodeid放在name里边
					if(lastSelectNode.name){
						$("circle[name="+lastSelectNode.name+"]").attr("fill",lastSelectNode.color);
					}
					lastSelectNode.name=d.nodeId;
					lastSelectNode.color=$("circle[name='"+d.nodeId+"']").attr("fill");
					$("circle[name="+d.nodeId+"]").attr("fill","#FF8040");
					//				
				}, 300);
			}
			// 双击显示详情
			function nodedblClick(d) {
				if (d.root) {
					return;
				}
				clearTimeout(timeId);
				if(selectWidget) $.widget.hide(selectWidget);
				if (d.type == "ownOrg") {
					url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
					data = {
						parentOrgId : rootOrgId,
						orgType : d.nodeId
					};
					selectWidget="#orgOffice-widget";
					qryOffice(d.nicenm,data,url);
				} else if (d.type == "office") {
					$("#tip").hide();
					url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
					data = {
						parentOrgId : d.nodeId
					};
					selectWidget="#orgOffice-widget";
					qryOffice(d.nicenm,data);
				} else if (d.type == "busiItem") {
					url = ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
					data = {
						orgId : d.nodeId
					};
					selectWidget="#serverBusi-widget";
					var fields ={id : "id",no : "busi_no", name :"name"};
					loadServerbusi("",d.nicenm,url,data,fields);
				} else if (d.type == "busiInfo") {
					url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
					data = {
						busiId : d.nodeId
					};
					selectWidget="#resourceInfo";
					resDataHandler(d.nicenm,d.nodeId,5);
					qryResInfoHandler();
				} else if(d.type="needRes"){
					selectWidget="#them-res";
					loadAll(d.nodeId,d.nicenm);
				}
				if(selectWidget) $.widget.max(selectWidget);
			}
			function onClick(d) {
				if(selectWidget) $.widget.hide(selectWidget);
				if (d.update) {
					var depthArr=[0];
					var nodes = cluster.nodes(root).reverse();
					for(var i=0;i<nodes.length;i++){
						depthArr.push(nodes[i].depth);
					}
					var maxDep=Math.max.apply(null, depthArr);
					var mysize=(800+(maxDep-1)*350) / 3 - 140 ;
					cluster.size([ 360, mysize ]);
					update(d);
						if (d.type == "ownOrg") {
							url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
							data = {
								parentOrgId : rootOrgId,
								orgType : d.nodeId
							};
							selectWidget="#orgOffice-widget";
							qryOffice(d.nicenm,data,url);
						} else if (d.type == "office") {
							$("#tip").hide();
							url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
							data = {
								parentOrgId : d.nodeId
							};
							selectWidget="#orgOffice-widget";
							qryOffice(d.nicenm,data);
						} else if (d.type == "busiItem") {
							url = ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
							data = {
								orgId : d.nodeId
							};
							selectWidget="#serverBusi-widget";
							var fields ={id : "id",no : "busi_no", name :"name"};
							loadServerbusi("",d.nicenm,url,data,fields);
						} else if (d.type == "busiInfo") {
							url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
							data = {
								busiId : d.nodeId
							};
							selectWidget="#resourceInfo";
							resDataHandler(d.nicenm,d.nodeId,5);
							qryResInfoHandler();
						} else if(d.type="needRes"){
							selectWidget="#them-res";
							loadAll(d.nodeId,d.nicenm);
						}
					
				} else {
					
					var data = {};
					var children = [];
					var url;			
					if (d.type == "ownOrg") {
						url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
						data = {
							parentOrgId : rootOrgId,
							orgType : d.nodeId
						};
						selectWidget="#orgOffice-widget";
						qryOffice(d.nicenm,data,url);
					} else if (d.type == "office") {
						url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
						data = {
							parentOrgId : d.nodeId
						};
						selectWidget="#orgOffice-widget";
						qryOffice(d.nicenm,data);
					} else if (d.type == "busiItem") {
						url = ampPreUrl+"/orgViewHandler/qryOrgBusiItem";
						data = {
							orgId : d.nodeId
						};
						selectWidget="#serverBusi-widget";
						var fields ={id : "id",no : "busi_no", name :"name"};
						loadServerbusi("",d.nicenm,url,data,fields);
					} else if (d.type == "busiInfo") {
						url = ampPreUrl+"/orgViewHandler/qryBusiItemInfo";
						data = {
							busiId : d.nodeId
						};	
						selectWidget="#resourceInfo";
						resDataHandler(d.nicenm,d.nodeId,5);
						qryResInfoHandler();
					} else if(d.type="needRes"){
						selectWidget="#them-res";
						loadAll(d.nodeId,d.nicenm);
					}
				
					$.ajax({
						url : url,
						cache : false,
						dataType : "json",
						type : "post",
						data : data,
						success : function(data) {
							if (data.length > 0) {
								for (var i = 0; i < data.length; i++) {
									var item = data[i];
									if (d.type == "ownOrg") {
										children
												.push({
													name : item.name + "("
															+ item.num + ")",
													nicenm : item.name,
													value : item.num,
													nodeId : item.id,
													type : "office"
												});
									} else if (d.type == "office") {
										children
												.push({
													name : item.name + "("
															+ item.num + ")",
													nicenm : item.name,
													value : item.num,
													nodeId : item.id,
													type : "busiItem"
												});
									} else if (d.type == "busiItem") {
										children
												.push({
													name : item.name + "("
															+ item.num + ")",
													nicenm : item.name,
													value : item.num,
													nodeId : item.id,
													type : "busiInfo"
												});
									} else if (d.type == "busiInfo") {
										children.push({
											name : item.name,
											nicenm : item.name,
											value : item.busicount,
											nodeId : item.id,
											gid : item.dir,
											type : "needRes"
										});
									}
								}
							}
						
							d.children = children;
							d.update = true;
							var depthArr=[0];
						var nodes = cluster.nodes(root).reverse();
						for(var i=0;i<nodes.length;i++){
							depthArr.push(nodes[i].depth);
						}
						var maxDep=Math.max.apply(null, depthArr);
						var mysize=(800+(maxDep-1)*350) / 3 - 140 ;
						cluster.size([ 360, mysize ]);
							
							update(d);
						}
					});
				}
				if(selectWidget) $.widget.show(selectWidget);
			}
			//鼠标进入事件
			function nodemouseenter(d){	
				$('#tip').hide();
				$("#container-fluid #id").val(d.nodeId);
				$("#container-fluid #name").val(d.nicenm);
				var html = "";		
				if(d.type == "ownOrg"){
					var url = ampPreUrl+"/orgViewHandler/qryTypeOwnOrg";
					$.ajax({
						url : url,
						cache : false,
						dataType : "json",
						type : "post",
						data : {parentOrgId : rootOrgId, orgType : d.nodeId},
						success : function(data){
							var col=Math.ceil(Math.sqrt(data.length));
							if(col>6) col=6;
							html += "<table class='org-tip-table'><tbody>";
							var tr="<tr>";
							for(var i=0;i<data.length;i++){
								var item = data[i];
								if(i!=0 && i%col==0)
								{
									tr+="</tr>";
									html+=tr;
									tr="<tr>";
								}
								tr+="<td>"+item.name+"</td>";
							}
							html+=tr;
							html+="</tr>";
							html += "</tbody></table>";
							$("#tip").html(html);
							var tw=$("#tip").width();
							var th=$("#tip").height();
							var tleft=$("#tip").css("left");
							tleft=Number(tleft.replace("px",""));
							var top=$("#tip").css("top");
							top=Number(top.replace("px",""));
							var bw=$(document).width();
							var bh=$(document).height();
							if((tleft+tw)>bw)
							{
								tleft=bw-tw-100;
								$("#tip").css("left",tleft+"px");
							}
							if((top+th)>bh)
							{
								top=top-th-50;
								$("#tip").css("top",top+"px");
							}
							$('#tip').fadeIn(500);
						}
					});
				}			
				else if(d.type == "office"){
						var url = ampPreUrl+"/orgViewHandler/qryOrgAnalysData";
						$.ajax({
							url : url,
							cache : false,
							async : false,
							dataType : "json",
							type : "post",
							data : {orgId : d.nodeId},
							success : function(data){
								var item = data; 
								var system = item.system ? item.system : "0";
								var info = item.info ? item.info : "0";
								var element = item.element ? item.element : "0";
								html +="<h3 class='popover-title'>"+d.nicenm+"</h3>";
								html +="<i class='fa fa-remove close-bu' style='cursor: pointer;right:5px;top:8px;position:absolute' ></i>";
								html +="<div class='popover-content'>";
								html +="<p><span class='glyphicon glyphicon-list-alt'></span>&nbsp;<span class='org-link sys' id='sys' onClick='systemInfoHandler(\""+system+"\")' style='border-bottom:#486b8d solid  1px;cursor: pointer;color:#486b8d' >拥有的信息系统数："+system+"</span></p>";
			                    html +="<p><span class='glyphicon glyphicon-list-alt'></span>&nbsp;<span class='org-link' id='res' onClick='resourceInfoHandler(\""+info+"\")' style=' border-bottom:#486b8d solid  1px;cursor: pointer;color:#486b8d''>拥有的信息资源数："+info+"</span></p>";
			                    html +="<p><span class='glyphicon glyphicon-list-alt'></span>&nbsp;<span class='org-link' id='da' onClick='elementHandler(\""+element+"\")' style='border-bottom:#486b8d solid  1px;cursor: pointer;color:#486b8d''>拥有的数据元："+element+"</span></p>";
			                    html +="</div>";
			                    $("#tip").html(html);
			        			$('#tip').fadeIn('slow');
							}
						});  						          	           					           
				}
				else if(d.type == "busiItem"){
				    html = "<div class='popover-content' style='width:auto'>"+
				    	   "<p><span style='font-weight: bold;'>组织机构（处室）：</span><span style='font-size:12px'>"+d.nicenm+"</span></p>"+
				           "<p><span style='font-weight: bold;'>关联业务事项数：</span><span style='font-size:12px'>"+d.value+"项</span></p>"+
				           "</div>";
				    $("#tip").html(html);
	    			$('#tip').fadeIn('slow');
				}
				else if(d.type == "busiInfo"){
				    html = "<div class='popover-content'>"+
				    	   "<p><span style='font-weight: bold;'>业务事项：</span><span style='font-size:12px'>"+d.nicenm+"</span></p>"+
				           "<p><span style='font-weight: bold;'>关联信息资源：</span><span style='font-size:12px'>"+d.value+"类</span></p>"+
				           "</div>";
				    $("#tip").html(html);
	    			$('#tip').fadeIn('slow');
				}
				else if(d.type == "needRes"){
				    html = "<div class='popover-content'>"+
				    	   "<p><span style='font-weight: bold;'>信息资源：</span><span style='font-size:12px'>"+d.nicenm+"</span></p>"+
				           "<p><span style='font-weight: bold;'>业务关联性：</span><span style='font-size:12px'>业务需求资源</span></p>"+
				           "</div>";
				    $("#tip").html(html);
	    			$('#tip').fadeIn('slow');
				}
			}
			
			//鼠标划出事件
			function nodemouseout(d){
				if(d.type != "office"){
					$('#tip').hide();				
				}
				else {
					var timeId2;
					clearTimeout(timeId2);
					timeId2 = setTimeout(function() {
					$('#tip').hide();
					},2000);
				}
			}
			
			
		}
	};

	function toggle(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
	}

	var children = [];
	var datas = {
		name : "常熟市各部门",
		children : children,
		root : true
	};
	function qryOrgHandler() {
		var url = ampPreUrl+"/totalViewHandler/qryOrgTypeCount";
		$.ajax({
			url : url,
			cache : false,
			dataType : "json",
			type : "post",
			data : {
				rootOrgId : rootOrgId
			},
			success : function(data) {
				if (data.length > 0) {
					for (var i = 0; i < data.length; i++) {
						var item = data[i];
						children
								.push({
									name : item.orgTypeName + "("
											+ item.orgTypeCount + ")",
									nicenm : item.orgTypeName,
									value : item.orgTypeCount,
									nodeId : item.orgType,
									type : 'ownOrg'
								});
					}
					loaddata(false, datas);
					centerNode(datas);
				}
			}
		});
	}

	//关闭弹出框
	function hideHandler(){
		$(this).parent().hide();
	}

	function onOrgTipLink(e)
	{
		$(this).parent().parent().parent().hide();
	}	
});
//查找拥有的详情页面
function systemInfoHandler(num){
	if(selectWidget) $.widget.hide(selectWidget);
	if(num == 0){
		   $.app.alert({
				title : "操作提示",
				message : "未找到信息系统详情！"
			});
		   return;
		}
		selectWidget="#sysResource";
		var name =$("#name").val();
		var id = $("#id").val();
		sysDataHandler(name,id);
		qryResSysHandler();
		if(selectWidget) $.widget.max(selectWidget);
}

function resourceInfoHandler(num){
	if(selectWidget) $.widget.hide(selectWidget);
	if(num == 0){
		 $.app.alert({
				title : "操作提示",
				message : "未找到信息资源详情！"
			});
		   return;
	}
	selectWidget="#resourceInfo";
	var name =$("#name").val();
	var id = $("#id").val();
	resDataHandler(name,id);
	qryResInfoHandler();
	if(selectWidget) $.widget.max(selectWidget);	
}

function elementHandler(num){
	if(selectWidget) $.widget.hide(selectWidget);
	if(num == 0){
		$.app.alert({
			title : "操作提示",
			message : "未找到信息系统详情！"
		});
	   return;
	}
	selectWidget="#metadata";
	var name =$("#name").val();
	var id = $("#id").val();
	dataHandler(name,id);
	searchHandler();
	if(selectWidget) $.widget.max(selectWidget);
}