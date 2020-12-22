$(function()
{
	var myChart = echarts
			.init(document.getElementById('org-asset-mychart-box'));
	option =
	{
		title :
		{
			text : ''
		},
		tooltip :
		{
			trigger : 'item',
			triggerOn : 'mousemove'
		},
		series : [
		{
			type : 'sankey',
			layout : 'none',
			data :data,
			links :links,
			itemStyle :
			{
				normal :
				{
					borderWidth : 1,
					borderColor : '#aaa'
				}
			},
			lineStyle :
			{
				normal :
				{
					color : 'source',
					curveness : 0.5
				}
			}
		} ]
	};
	myChart.setOption(option);
});