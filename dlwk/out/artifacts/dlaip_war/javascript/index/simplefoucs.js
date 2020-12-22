function makeGallery(id) {
	$("#" + id + " .btnBg").remove();
	$("#" + id + " .btn").remove();
	var c = Math.floor(($("#" + id).width()) / 122);
	var r = Math.floor(($("#" + id).height()) / 142);
	$("a", $("#" + id)).appendTo($("#" + id));
	$("li", $("#" + id)).remove();
	$("a", $("#" + id)).each(
			function(i) {
				if (i % (r * c) == 0) {
					$("<li></li>").width(
							$("#" + id).width()
									- ((($("#" + id).width()) % 122) / 2)).css(
							{
								"margin-left" : (($("#" + id).width()) % 122)
										/ 2 + "px",
								"margin-top" : (($("#" + id).height()) % 142)
										/ 2 + "px"
							}).appendTo($("ul", $("#" + id)));
				}
				$("li", $("#" + id)).last().append($(this));
			});

	var sWidth = $("#" + id).width();
	var len = $("#" + id + " ul li").length;
	var index = 0;
	var picTimer;
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for ( var i = 0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div>";
	$("#" + id).append(btn);
	$("#" + id + " .btn").width(len * 20);

	var btn_LR = "<div class='preNext pre'></div><div class='preNext next'></div>";
	$("#" + id).parent().append(btn_LR);

	$("#" + id + " .btnBg").css("opacity", 0);
	$("#" + id + " .btn span").css("opacity", 0.4).mouseenter(function() {
		index = $("#" + id + " .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");

	$(".preNext").css("opacity", 1).hover(function() {
		$(this).stop(true, false).animate({
			"opacity" : "1"
		}, 300);
	}, function() {
		$(this).stop(true, false).animate({
			"opacity" : "1"
		}, 300);
	});
	$(".pre").click(function() {
		index -= 1;
		if (index == -1) {
			index = len - 1;
		}
		showPics(index);
	});
	$(".next").click(function() {
		index += 1;
		if (index == len) {
			index = 0;
		}
		showPics(index);
	});
	$("#" + id + " ul").css("width", sWidth * (len));
	$("#" + id).hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			// showPics(index);
			// index++;
			if (index == len) {
				index = 0;
			}
		}, 2800);
	}).trigger("mouseleave");
	function showPics(index) {
		var nowLeft = -index * sWidth;
		$("#" + id + " ul").stop(true, false).animate({
			"left" : nowLeft
		}, 300);
		$("#" + id + " .btn span").stop(true, false).animate({
			"opacity" : "0.4"
		}, 300).eq(index).stop(true, false).animate({
			"opacity" : "1"
		}, 300);
	}
}