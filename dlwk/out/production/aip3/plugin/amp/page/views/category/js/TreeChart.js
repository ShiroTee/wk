function TreeChartMap(config)
{
	var el = config.el;
	if (typeof (el) == "undefined")
	{
		throw Error("未找到dom对象:" + el);
	}
	if (typeof (el) == "string")
	{
		el = $("#" + el);
	}
	var width = el.width();
	// 远程加载数据
	var loadData = function(reqData)
	{
		$.ajax(
		{
			url : config.url,
			dataType : "json",
			type : config.type ? config.type : "get",
			sync : config.sync ? config.sync : true,
			data : reqData,
			success : function(json)
			{
				alert(json.length);
			},
			error : function(data)
			{
				alert("数据加载异常:" + data.msg);
			}
		});
	};
	// 初始化
	function init()
	{
	}
	;
};
var tree = new TreeChartMap(
{
	});