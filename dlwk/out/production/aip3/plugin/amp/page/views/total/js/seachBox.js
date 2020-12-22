/**
 * 页面加载完成
 */
$(function(){
	$(".qry-label").click(onQryLabelClick);
	$("#searchBu").click(startSearch);
	$("#searchText").on("keydown",function(e){
		if(e.keyCode==13)
		{
			startSearch();
		}
	});
	if(typeof searchTxt!="undefined" )
	{
		$("#searchText").val(searchTxt);
	}
	if(typeof searchType!="undefined" )
	{
		$(".qry-label").removeClass("qry-label-selected");
		$(".qry-label[data-type="+searchType+"]").addClass("qry-label-selected");
	}
});
/**
 * 点击查询分类
 * @param e
 */
function onQryLabelClick(e)
{
	$(".qry-label").removeClass("qry-label-selected");
	$(this).addClass("qry-label-selected");
	var searchTxt=$("#searchText").val();
	if(searchTxt && searchTxt!="")
	{
		startSearch();
	}
}
/**
 * 开始搜索
 */
function startSearch()
{
	var searchTxt=$("#searchText").val();
	var searchType=$(".qry-label-selected").data("type");
	if(searchTxt)
	{
		if(typeof startSearchQry!="undefined")
		{
			startSearchQry();
		}
		else
		{
			window.location.href=ampPreUrl+"/cvpTotalHandler/search?searchTxt="+searchTxt+"&searchType="+searchType;	
		}
	}
	else
	{
		alert("请输入关键字");
	}
}