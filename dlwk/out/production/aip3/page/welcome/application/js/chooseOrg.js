$(function(){
	
$(".city-select-tab a").slice(0,4).show();
	
	$("#goLeftTab").hide();
	if($(".city-select-tab a").length<=4){
		 $("#goRightTab").hide();
	}
	
	$("#goLeftTab").click(function(){
			$(".city-select-tab a[style!='display: none;']:last").hide();
			$(".city-select-tab a[style!='display: none;']:eq(0)").prev().show();
			$("#goRightTab").show();
			if($(".city-select-tab a:eq(0)").is(":visible")){
				$("#goLeftTab").hide();
			}else{
				$("#goLeftTab").show();
			}
		
	});	
		
	$("#goRightTab").click(function(){
			 $(".city-select-tab a[style!='display: none;']:eq(0)").hide();
	         $(".city-select-tab a[style!='display: none;']:last").next().show();
	         $("#goLeftTab").show();
	         if($(".city-select-tab a:last").is(":visible")){
	        	 $("#goRightTab").hide();
				}else{
					$("#goRightTab").show();
				}
	});
	
	
	//申请单位名称点击事件
	$(".city-picker-span").click(function(){
		if($(".city-picker-dropdown").is(':hidden')){
			$(".city-picker-dropdown").show();
		}else{
			$(".city-picker-dropdown").hide();
		}
		
	});
	
	//弹窗tab按钮时间
	$(".city-select-tab a").click(function(){
		$(this).parent().find("a").removeClass("active");
		$(this).addClass("active");
		var datacount=$(this).attr("data-count");
		$(".city-select-content .city-select").hide();
		$(".city-select-content .city-select[data-count="+datacount+"]").show();
	});
	
	//弹窗选项点击事件
	$(".city-select-content a").click(function(){
		$(".city-picker-span .select-item").text($(this).text());
		$(".city-picker-dropdown").hide();
	});
})