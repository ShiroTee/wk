/* 酷站代码整理 http://www.5icool.org */
$(function()
{
	systole();
});

function systole()
{
	if (!$(".history").length)
	{
		return;
	}
	var $warpEle = $(".history-date"), $targetA = $warpEle
			.find("h2 a,ul li dl dt a"), parentH, eleTop = [];

	parentH = $warpEle.parent().height();
	$warpEle.parent().css(
	{
		"height" : 59
	});

	setTimeout(function()
	{

		$warpEle.find("ul").children(":not('h2:first')").each(function(idx)
		{
			eleTop.push($(this).position().top);
			$(this).css(
			{
				"margin-top" : -eleTop[idx]
			}).children().hide();
		}).animate(
		{
			"margin-top" : 0
		}, 5).children().fadeIn();

		$warpEle.parent().animate(
		{
			"height" : parentH
		}, 10);

		$warpEle.find("ul").children(":not('h2:first')").addClass(
				"bounceInDown").css(
		{
			"-webkit-animation-duration" : "2s",
			"-webkit-animation-delay" : "0",
			"-webkit-animation-timing-function" : "ease",
			"-webkit-animation-fill-mode" : "both"
		}).end().children("h2").css(
		{
			"position" : "relative"
		});

	}, 3);
	setTimeout(function()
	{
		$(".project").parent().css(
		{
			"position" : "relative"
		});
		$(".project").parent().siblings().slideToggle();
		$warpEle.parent().removeAttr("style");
	}, 50);
};