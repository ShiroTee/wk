var url = ampPreUrl+"/themeViewHandler/queryThemeNeed?orgId=I_wJgN0CEeOlovfuVspipA&assetId=";
var myChart = null;
var sbjId = null;
require.config(
{
	paths :
	{
		echarts : ctx + '/resources/echarts-2.2.7'
	}
});
require(
		[ 'echarts', 'echarts/chart/chord' // 使用柱状图就加载bar模块，按需加载
		],
		function(ec)
		{
			myChart = ec.init(document.getElementById('theme-mychart-box'));
			var box = $("#theme-chart-box");
			box.find(".xu-menu").mouseover(function(e)
			{
				e.stopPropagation();
				box.find(".widget-box").show("normal");
			});

			$(document).mouseover(function()
			{
				box.find(".widget-box").hide("slow");
			});
			box.find(".dropdown-toggle").parent().click(
					function()
					{
						var this$ = $(this);
						box.find(".dropdown-toggle").parent().find("ul").not(
								this$).hide("normal");
						$(this).find("ul").show("normal");
					});
			box
					.find(".nav-list")
					.find(".submenu a")
					.click(
							function(e)
							{

								e.stopPropagation();
								var themId = $(this).attr("themeId");
								var url = ampPreUrl+"/themeViewHandler/queryThemeNeed?assetId="
										+ themId;
								url += "&orgId=I_wJgN0CEeOlovfuVspipA";
								setLabelTitle($(this));
								$.get(url, function(json)
								{
									//json = jQuery.parseJSON(json);
									myChart.hideLoading();
									loadChart(json);
								});
							});
			var assetId = box.find(".nav-list .submenu a:eq(0)")
					.attr("themeId");
			setLabelTitle(box.find(".nav-list .submenu a:eq(0)"));
			sbjId = assetId;
			$.get(url + assetId, function(json)
			{
				//json = jQuery.parseJSON(json);
				loadChart(json);
			});
		});
function setLabelTitle(a)
{
	var title = a.html();
	title = title.replace('<i class="menu-icon fa fa-leaf green"></i>', "");
	$("#theme-label-title").html(title);
}
function createOption()
{
	option =
	{
		tooltip :
		{
			trigger : 'item',
			formatter : function(params)
			{
				if(params.indicator2)
				{
					var html="<font color='red' font-weight='bold'>供需资源信息:</font></br>";
					var tips=params.data.tip;
					tips=tips.split(",")
					for(var i=0;i<tips.length;i++)
					{
						html+=tips[i]+"</br>";
					}
					return html;
				}
				else
				{
					return params.name;
				}
			}
		},
		series : [
		{
			type : 'chord',
			sort : 'ascending',
			sortSub : 'descending',
			ribbonType : false,
			radius : '60%',
			itemStyle :
			{
				normal :
				{
					label :
					{
						rotate : true
					},
					color : "#3a87ad"
				}
			},
			minRadius : 7,
			maxRadius : 20,
			nodes : [],
			links : []
		} ]
	};
	return option;
}
function loadChart(json)
{
	var option = createOption();
	buildData(json, option);
	myChart.setOption(option, true);
	myChart.on("click", function(p)
	{
		$.widget.show("#resourceInfo");
		var name = p.data.name;
		resDataHandler(name, p.data.id,3);
		qryResInfoHandler();
	});
	myChart.on("dblclick", function(p)
	{
		var url = ampPreUrl+"/themeHandler/orgAsset";
		url += "?sbjId=";
		url += sbjId;
		url += "&sdOrgId=";
		url += p.data.id;
		url += "&oppOrgId=";
		url += p.data.id;
		window.location.href = url;
	});
}
function buildData(json, option)
{
	var nodes = [];
	var temp = new Object();
	// 去重复数据
	for (var i = 0; i < json.length; i++)
	{
		var node = json[i];
		node.father = [];
		if (typeof (temp[node.id]) == "undefined")
		{
			temp[node.id] = node;
		} else
		{
			if (typeof (node.pid) == "string")
			{
				temp[node.id].father.push(node.pid);
				temp[node.id].tip=node.tip;
			}
		}
	}
	for ( var key in temp)
	{

		option.series[0].nodes.push(temp[key]);
	}
	nodes = option.series[0].nodes;
	for (var i = 0; i < nodes.length; i++)
	{
		var node = nodes[i];
		for (var x = 0; x < node.father.length; x++)
		{
			var pid = node.father[x];
			for (var n = 0; n < nodes.length; n++)
			{
				var item = nodes[n];
				if (pid == item.id)
				{
					option.series[0].links.push(
					{
						source : node.name,
						target : item.name,
						tip:node.tip,
						weight : 1
					});
					option.series[0].links.push(
					{
						source : item.name,
						target : node.name,
						tip:node.tip,
						weight : 1
					});
				}
			}
		}
	}

}