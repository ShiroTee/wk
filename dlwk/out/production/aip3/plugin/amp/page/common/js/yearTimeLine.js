

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
	
	selectYear=year;
	
	var lis="",li,m;
	for(var i=1;i<=12;i++)
	{
		
		m=year-12+i;
		if(m==year)
		{
			li='<li><a   class="selected" href="javascript:void(0);" value="'+m+'">'+m+'</a></li>';
		}else{
			li='<li><a href="javascript:void(0);" value="'+m+'">'+m+'</a></li>';
		}	
		
		lis+=li;
	}
	$("#dates").html(lis);
	$().timelinr({
		autoPlay: 'false',
		autoPlayDirection: 'forward',
		startAt: selectYear
	});
}
/**
 * 选择月份事件
 */
function timeLineClick()
{
	selectYear=$(this).attr("value");
}