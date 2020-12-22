
var selectMonth;
var selectYear;
/**
 * 页面加载完成 
 */
$(function(){
	var  date=new Date();
	var year=date.getFullYear();
	initTimeLine(year);
	$("#dates").delegate("a","click",timeLineClick);
	
	
});
/**
 * 初始时间轴
 */
function initTimeLine(year)
{
	$("#dates").empty();
	if(selectMonth==null)
	{
		var  date=new Date();
		var month=date.getMonth();
		selectMonth=month+1;
	}
	selectYear=year;
	
	var lis="",li,m;
	for(var i=1;i<=12;i++)
	{
		
		li='<li><a href="javascript:void(0);" value="'+i+'">'+i+"月"+'</a></li>';
		lis+=li;
	}
	$("#dates").html(lis);
	$().timelinr({
		autoPlay: 'false',
		autoPlayDirection: 'forward',
		startAt: selectMonth
	});
}
/**
 * 选择月份事件
 */
function timeLineClick()
{
	selectMonth=$(this).attr("value");
}