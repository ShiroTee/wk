function SkyChart(config)
{
	var TimeFn$1 = null;
	var bodyWidth = parseInt($("body").height());
	bodyWidth = bodyWidth - 160;
	var position=null;
	// 中间节点显示名称
	var label = typeof (config.label) == "undefined" ? "部门" : config.label;
	// 线条长度
	var lineLength = 200;
	var el = config.el;
	if (typeof (el) == "string")
	{
		el = $("#" + el);
	} else if (typeof (el) == "undefined")
	{
		throw Error("el不能为undefined");
	}
	el.css("position","relative");//:;
	var data = config.data;
	var width = config.width ? config.width : 150;
	if (typeof (data) == "undefined")
	{
		throw Error("el不能为undefined");
	}
	if (typeof (config.lineStyle) == "undefined")
	{
		config.lineStyle =
		{};
	}
	var maxSize = data.source >= data.target ? data.source.length
			: data.target.length;
	var maxWidth = maxSize * 30 < bodyWidth ? bodyWidth : maxSize * 30
	el.css("height", maxWidth + "px");
	var lineColor = config.lineStyle.color ? config.lineStyle.color : "red";
	var lineWidth = config.lineStyle.lineWidth ? config.lineStyle.lineWidth : 2;
	// 将EL一分为三
	var html = '<div class="col-md-5 col-lg-5 container-left" style="height:100%;"></div>';
	html += '<div class="col-md-2 col-lg-2 container-center" style="height:100%;"></div>';
	html += '<div class="col-md-5 col-lg-5 container-right" style="height:100%;"></div>';
	var instance = jsPlumb.getInstance(
	{
		Endpoint : [ "Dot",
		{
			radius : 2
		} ],
		Connector : "StateMachine",
		HoverPaintStyle :
		{
			strokeStyle : "red",
			lineWidth : 2
		},
		ConnectionOverlays : [ [ "Arrow",
		{
			location : 0.5,
			id : "arrow",
			length : 8,
			width : 10,
			foldback : 0.9
		} ] ],
		Container : "canvas"
	});

	instance.registerConnectionType("basic",
	{
		anchor : "Continuous",
		connector : "StateMachine"
	});
	instance.bind("connection", function(c)
	{

	});
	// 鼠标经过样式
	var exampleDropOptions =
	{
		tolerance : "touch",
		hoverClass : "dropHover",
		activeClass : "dragActive"
	};
	var nodeConfig =
	{
		endpoint : [ "Dot",
		{
			radius : 1
		} ],
		paintStyle :
		{
			fillStyle : "blue"
		},
		isSource : true,
		scope : "green",
		connectorStyle :
		{
			strokeStyle : lineColor,
			lineWidth : lineWidth
		},
		connector : "Straight",
		maxConnections : -1,
		isTarget : true,
		dropOptions : exampleDropOptions
	};
	var connection = function(node, nodes, isSouce)
	{
		
		var top = position.top;
		var left = position.left;
		var theme = "success";
		var lineLength = nodes.length *10;
		lineLength = lineLength <300 ?300 : lineLength;
		lineLength=lineLength>=left?left-20:lineLength;
		$
				.each(
						nodes,
						function(i, item)
						{
							setTimeout(
									function()
									{
										var top$ = top;
										var left$ = left;
										if (isSouce)
										{
											left$ = left - lineLength;
											theme = "danger";
										} else
										{
											left$ = left + lineLength;
										}
										if (i != 0)
										{
											if (i % 2 == 0)
											{
												top$ = top - (i * 30 / 2);
											} else
											{
												top$ = top + ((i + 1) * 30 / 2);
											}
										}
										html = '<span  title="'
												+ item.name
												+ '" class="chart-btn label label-'
												+ theme + '" style="';
										html += 'position:absolute;top:'
												+ top$
												+ 'px;left:'
												+ left$
												+ 'px;opacity:1;overflow: hidden;width:100px;cursor:pointer;border-radius:8px;">';
										html += item.name.length > 7 ? item.name
												.substring(0, 7)
												+ '...'
												: item.name;
										html += '</span>';
										html = $(html);
										html.attr("isSource", "false");
										html.data("java", item)
										el.append(html);
										var anchor = "LeftMiddle";
										if (isSouce)
										{
											anchor = "RightMiddle";
											html.attr("isSource", "true");
										}
										var target = instance.addEndpoint(html,
										{
											anchor : anchor
										}, nodeConfig);
										instance.draggable(html);
										if (isSouce)
										{
											var connect = instance.connect(
											{
												source : target,
												target : node
											});
											connect.setData(
											{
												source : item,
												target : data
											});
										} else
										{
											var connect = instance.connect(
											{
												source : node,
												target : target
											});
											connect.setData(
											{
												source : data,
												target : item
											});
										}
									}, i * 50);

						});
	};
	var init = function()
	{
		position=getCenterPositon();
		var top = position.top;
		var left = position.left;
		var html = '<span title="' + data.name
				+ '" class="chart-btn label label-warning" style="';
		html += 'position:absolute;top:'
				+ top
				+ 'px;left:'
				+ left
				+ 'px;display:none;background-color:red;width:100px;overflow: hidden;cursor:pointer;border-radius:8px;">';
		html += data.name.length > 7 ? data.name.substring(0, 7)
		        + '...' : data.name;
		html += '</span>';
		html = $(html);
		html.data("java", data)
		el.append(html);
		html.slideDown("fast");
		setTimeout(function()
		{
			var startNode = instance.addEndpoint(html,
			{
				anchor : [ "RightMiddle" ]
			}, nodeConfig);
			var TargetNode = instance.addEndpoint(html,
			{
				anchor : [ "LeftMiddle" ]
			}, nodeConfig);
			instance.draggable(html);
			if (typeof (data.source) == "object")
			{
				connection(TargetNode, data.source, true);
			}
			if (typeof (data.target) == "object")
			{
				setTimeout(function()
				{
					connection(startNode, data.target, false);
				}, 500);

			}
		}, 500);
		var span_html = '<table style="position: relative;font-size: smaller;color: #545454;top:20px;left:';
		span_html += left*2-50;
		span_html += 'px;">';
		span_html += '<tbody><tr><td class="legendColorBox"><div style="border: 1px solid null; padding: 1px">';
		span_html += '<div style="width: 4px; height: 0; border: 5px solid #ffb752; overflow: hidden"></div>';
		span_html += '</div></td><td class="legendLabel">' + label
				+ '&nbsp;&nbsp;</td></tr>';
		span_html += '<tr><td class="legendColorBox"><div style="border: 1px solid null; padding: 1px">';
		span_html += '<div style="width: 4px; height: 0; border: 5px solid #d15b47; overflow: hidden"></div>';
		span_html += '</div></td><td class="legendLabel">需求信息资源&nbsp;&nbsp;</td></tr>';
		span_html += '<tr><td class="legendColorBox"><div style="border: 1px solid null; padding: 1px">';
		span_html += '<div style="width: 4px; height: 0; border: 5px solid #87b87f; overflow: hidden"></div>';
		span_html += '</div></td><td class="legendLabel">提供信息资源&nbsp;&nbsp;</td></tr>';
		span_html += '<tr><td class="legendColorBox"><div style="border: 1px solid null; padding: 1px">';
		span_html += '<div style="width: 4px; height: 0; border: 5px solid #337ab7; overflow: hidden"></div>';
		span_html += '</div></td><td class="legendLabel">选中节点</td>';
		span_html += '</tr></tbody></table>';
		el.append(span_html);
		//将滚动条滚动到中心点
	};
	// 事件绑定函数
	this.bind = function(event, fun)
	{
		instance.bind(event, function(e)
		{
			var data = e.getData();
			delete data.source.target;
			fun(data.source, data.target);
		});
	};
	var selectStyle = function(this$)
	{
		el.find(".chart-btn").not(this$).each(function()
		{
			if ($(this).attr("isSource") == "true")
			{
				$(this).addClass("label-danger");
			} else if ($(this).attr("isSource") == "false")
			{
				$(this).addClass("label-success");
			} else
			{
				$(this).addClass("label-warning");
			}
			$(this).removeClass("label-primary")
		});
		var data = this$.data("java");
		this$.removeClass("label-warning label-success label-danger");
		this$.addClass("label-primary");
		delete data.source;
		delete data.target;
		return data;
	};
	this.nodeBind = function(event, fun)
	{
		if ("click" == event)
		{
			el.delegate(".chart-btn", event, function()
			{
				var this$ = $(this);
				clearTimeout(TimeFn$1);
				TimeFn$1 = setTimeout(function()
				{

					var data = selectStyle(this$)
					fun(data);
				}, 300);

			});
		} else if ("dblclick" == event)
		{
			el.delegate(".chart-btn", "dblclick", function()
			{
				clearTimeout(TimeFn$1);
				var this$ = $(this);
				var data = selectStyle(this$)
				fun(data);
			});
		}

	};
	this.reload = function(data)
	{
		data = data;
		el.empty();
		instance.empty();
		init();

	}
	// 获取画布中心点坐标
	var getCenterPositon = function()
	{
		var top = el.height();
		console.log(el.position());
		var left = el.width();
		top = parseInt(top) / 2;
		left = parseInt(left) / 2;
		left -= 50;
		var position =
		{
			top : top,
			left : left
		};
		return position;
	};
	init();
};
