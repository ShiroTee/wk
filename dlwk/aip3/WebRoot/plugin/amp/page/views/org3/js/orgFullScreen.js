/**
 * 设置全屏/还原
 */
function setOrgChartFull()
{
	/**if(window.frameElement)
	{  
		window.frameElement.webkitAllowFullScreen=true;
		window.frameElement.mozallowfullscreen=true;
		window.frameElement.allowFullScreen=true;
	}**/
	$("#fullscreenBu").click(function(e){
		$('#orgChart').toggleFullScreen();
	});
	$(document).bind("fullscreenchange",function(e){
		var full=$(document).fullScreen();
		if(full!=false)
		{
			$("#fullscreenBu").attr("title","还原");
			$("#fullscreenIcon").attr("class","glyphicon glyphicon-screenshot");
			$('#orgChart').width(window.screen.width);
			$('#orgChart').height(window.screen.height);
			svg.attr("width", window.screen.width).attr("height", window.screen.height);
			$('#orgChart').css("background-color","#ffffff");
			$('#orgChart').css("margin-left",0);
			svg.attr("cx", window.screen.width/2).attr("cy", window.screen.height/2);
	        svgGroup.transition()
			.duration(1000)
			.attr("transform", "translate(" + window.screen.width/2 + "," + window.screen.height/2+ ")");
		}
		else
		{
			$("#fullscreenBu").attr("title","全屏");
			$("#fullscreenIcon").attr("class","glyphicon glyphicon-fullscreen");
			$('#orgChart').width(gwidth);
			$('#orgChart').height(gheight);
			svg.attr("width", gwidth).attr("height", gheight);
			$('#orgChart').css("background-color","");
			$('#orgChart').css("margin-left",-50);
			svgGroup.transition()
			.duration(1000)
			.attr("transform", "translate(" + gwidth/2 + "," + gheight/2+ ")");
		}
	});
	
	$(document).bind("fullscreenerror",function(e){
		$.app.alert({
                title : "提示",
                message : "该浏览器版本不支持全屏，请使用更高版本或换一个浏览!",
                okTitle : "关闭"
            });
	});
}