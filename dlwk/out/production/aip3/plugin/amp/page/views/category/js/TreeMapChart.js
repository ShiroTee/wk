function TreeModel(config)
{
	var TimeFn = null;
	var TimeFn1=null;
	var subjects = [ "primary", "success", "info", "warning", "danger" ];
	var el = config.el;
	if (typeof (el) == "string")
	{
		el = $("#" + el);
	}
	el.css("position","relative");//:;
	var data = config.data;
	if (typeof (data) != "object")
	{
		throw Error("data不是规定的数据类型");
	}
	var width = el.width();
	var pdLeft=parseInt(el.css("padding-left").replace("px"));
	var pdRigth=parseInt(el.css("padding-right").replace("px"));
	width=width-pdLeft-pdRigth-4;
	function loadData(reqData)
	{
		var d = null;
		$
				.ajax(
				{
					url : ampPreUrl+"/infoCatagoryHandler/qryOneInfoCatagoryAndInfoCounts",
					async : false,
					dataType : "json",
					data : reqData,
					success : function(json)
					{
						d = json;
					}
				});
		return d;
	}
	;
	function init_()
	{
		var rootData = loadData(data);
		if (rootData.length == 0)
		{
			rootData[0] =
			{
				infoCount : 0,
				infoId : data.infoId
			};
		}
		rootData[0].infoType = data.infoType;
		var rootNode = appendNode(rootData, width, "danger");
		rootNode.show(500, "linear");
		rootNode.find("button").click(
				function()
				{
					clearTimeout(TimeFn);
					var this$Root=$(this);
					TimeFn = setTimeout(function()
					{
						if (rootNode.nextAll().length == 0)
						{
							var btnData = $.parseJSON(this$Root.attr("item"));
							var d = loadData(
							{
								infoId : btnData.infoId,
								typeCate : data.typeCate,
								infoLevel : 1
							});
							var childNodes = appendNode(d, width / d.length,
									"success");
							childNodes.show(200, "linear");
							childNodes.find("button").click(
									function()
									{
										clearTimeout(TimeFn1);
										var this$ = $(this);
										TimeFn1 = setTimeout(function()
										{
											
											var btnData$ = $.parseJSON(this$
													.attr("item"));
											console.log(btnData$);
											var item = loadData(
											{
												infoId : btnData$.infoId,
												typeCate : data.typeCate,
												infoLevel : 2
											});
											if (item.length > 0)
											{
												childNodes.nextAll().remove();
												//上级宽度
												var w$ = item.length * 60;
												var w1 = width - w$;
												//最小层方块宽度
												w1 = w1 / (d.length - 1);
												this$.animate(
												{
													"width" : w$ + "px"
												}, 200);
												childNodes.find("button").not(
														this$).each(
														function(i, n)
														{
															$(n).css("width",
																	w1 + "px");
														});
												var t = appendNode(item, 60,
														"warning");
												var offset = this$.position();
												t.css("position", "relative");
												t.css("left", offset.left-17.5+"px");
												t.show("200", "linear");
											}
										}, 300);

									});
						} else
						{
							rootNode.nextAll().toggle(500, "linear");
						}
					}, 300);

				});
	}
	function init()
	{
		var rootNode = appendNode([ data ], width, "primary");
		rootNode.show(500, "linear");
		rootNode.find("button").click(
				function()
				{
					// 没有子节点,则插入子节点
					if (rootNode.nextAll().length == 0)
					{
						var childNodes = appendNode(data.nodes, width
								/ data.nodes.length, "success");
						childNodes.show(500, "linear");
						childNodes.find("button").click(
								function()
								{
									var this$ = $(this);
									console.log(this$);
									var item = $(this).attr("item");
									item = $.parseJSON(item);
									if (typeof (item.nodes) == "object")
									{

										// 删除子节点
										childNodes.nextAll().remove();
										var w$ = item.nodes.length * 60;
										var w1 = width - w$;
										w1 = w1 / (data.nodes.length - 1);
										this$.animate(
										{
											"width" : w$ + "px"
										}, 500);
										childNodes.find("button").not(this$)
												.each(
														function(i, n)
														{
															$(n).css("width",
																	w1 + "px");
														});

										var t = appendNode(item.nodes, 60,
												"warning");
										var offset = this$.offset();
										var left=offset.left;
										alert("*********************************888");
										alert(typeof(left));
										t.css("position", "relative");
										t.css("left", offset.left-11 + "px");
										t.show();
									}
								});
					} else
					{
						rootNode.nextAll().toggle(500, "linear");
					}
				});
	}
	;
	// 插入节点
	function appendNode(nodes, width, subject)
	{
		subject = typeof (subject) == "string" ? subject
				: subjects[parseInt(10 * Math.random())];
		// 三个字符
		var size = width / 20;
		var html = '<div class="row" style="display:none;position:relative;"><div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">';
		$
				.each(
						nodes,
						function(i, item)
						{
							var name = item.infoType.length > size ? item.infoType
									.substring(0, size)
									+ ".</br>(" + item.infoCount + ")"
									: item.infoType + "(" + item.infoCount
											+ ")";
							html += '<button type="button" class="btn btn-'
									+ subject + '"';
							html += ' item=\'';
							html += JSON.stringify(item);
							html += '\'';
							html += ' title="';
							html += item.infoType;
							html += '"';
							html += ' style="width:'
									+ width
									+ 'px; border-radius: 0px;padding-left:1px;padding-right:1px;height:60px;">';
							html += name;
							html += '</button>';
						});
		html += '</div></div>';
		html = $(html);
		el.append(html);
		return html;
	}
	;
	this.clear = function(reqData)
	{
		data = reqData;
		el.empty();
	}
	this.reload = function(reqData)
	{
		data = reqData;
		el.empty();
		init_();
	}
	this.bind = function(f)
	{
		el.delegate("button", "click", function()
		{
			var item = $(this).attr("item");
			item = $.parseJSON(item);
			f(item);
		});
	};
	this.dblBind = function(f)
	{
		el.delegate("button", "dblclick", function()
		{
			var item = $(this).attr("item");
			item = $.parseJSON(item);
			f(item);
		});
	};
	init_();
};