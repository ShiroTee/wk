/**
 * 设置整体页面的公共信息
 * 
 */
//页面加载完成处理
$(function(){
	updateHeaderLine();
	setBgSize();
	setGraphDrawBox();
	$("body").resize(function(){
		setBgSize();
	});
});
/**
 * 设置头部的渐变线
 */
function updateHeaderLine()
{
	var mw=$(".title-line .title-line-middle").width();
	var tw=$(".title-line").width();
	var lw=$(".title-line .title-line-left").width();
	var rw=$(".title-line .title-line-right").width();
	if(mw && (mw+lw+rw+5)<=tw)
	{
		mw=tw-lw-rw;
		$(".title-line .title-line-middle").width(mw);
	}
}
/**
 * 设置背景高宽
 */
function setBgSize()
{
	var h=$(document).height();
	var w=$(document).width();
	//var t=$("body").css('background-size');
	
	$("body").css('background-size',""+w+"px "+h+"px");
	//$("body").css('background-size',"100% 100%");
}
/**
 * 设置图形区域的高度等
 */
function setGraphDrawBox()
{
	var gh=$(".graph-draw-box").height();
	var bh=$(document).height();
	if((bh-200)>gh)
	{
		gh=bh-220;
		/**$(".graph-draw-box").height(gh);
		$(".graph-draw-box").slideDown();**/
		$(".graph-draw-box").animate({height:gh},500);
	}
}