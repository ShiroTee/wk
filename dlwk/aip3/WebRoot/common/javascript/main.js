/**
 * 顶部导航栏事件
 */
var workspace = null;
/**
 * 左边树导航点击事件
 */
function leftNavigationBarClick()
{
	$("#ROOT a[leaf='true']").click(function()
	{
		var url = $(this).attr("href");
		var resourceId = $(this).attr("resourceId");
		var text = $(this).find("span").html();
		var resourceType=$(this).attr("resourceType");
		var openType=$(this).attr("openType");
		var node =
		{};
		node.nodeId = resourceId;
		node.resourceType=resourceType;
		node.openType=openType;
		node.text = text;
		node.href = url;$("#resource-open-type").show();
		/*if($('#breadcrumbs .tab_panel_tool[href="' + $($('.tab_page_content[link="' + node.href + '"]')).attr('id') + '"]').length == 0){
			calcTabShow();
		}*/
		
		workspace.addPage(node);
		$('#ROOT').find(".active").removeClass("active");
		// $('#ROOT').find(".open").removeClass("open");
		$(this).parent().addClass("active");
		// $(this).parent().addClass("open");
		return false;
	});

};
$(function()
{
	mycookie('redirectUrl','',{ path: '/',expires:-1});
	leftNavigationBarClick();
	workspace = new $.TabPanel("breadcrumbs", "page-content");
	// $("#ROOT li:eq(0)").addClass("active");
	// $("#ROOT li:eq(0)").addClass("open");
	// 修改用户信息
	$("#edit-user-info-btn").click(
			function()
			{
				var userId = $(this).attr("userId");
				$.modal(
				{
					url : "user/info.html",
					title : "我的个人资料",
					data :
					{
						userId : userId,
						op : "edit"
					},
						size: "modal-lg",
					complete : function(html)
					{
						$("#myModal").find("select[name='status']").parent()
								.parent().hide();
						$("#myModal").find("div.form-group").last().hide();
						//$("#myModal").find("input[name='orgName']").attr("disabled","disabled");
						//$("#myModal").find("input[name='name']").attr("disabled","disabled");
						//$("#myModal").find("input[name='remark']").attr("disabled","disabled");
					}
				});
			});
	$("#edit-password-btn").click(function()
	{
		var userId = $(this).attr("userId");
		$.modal(
		{
			url : "user/password.html",
			title : "修改密码",
			data :
			{
				userId : userId,
			}
		});
	});
	$('body').delegate('#showLeftTab','click',function(){
		if($('#showRightTab').length == 0){
			$(this).after('<div id="showRightTab">&gt;&gt;</div>');
		}else{
			$('#showRightTab').removeClass('hide');
		}
		if(!$('.tab_panel_tool:not(.hide)').eq(1).prev('.tab_panel_tool').prev('.tab_panel_tool').hasClass('hide')){
			$(this).addClass('hide');
		}
		if($('.tab_panel_tool:not(.hide)').eq(1).prev('.tab_panel_tool').hasClass('hide')){
			$('.tab_panel_tool:not(.hide)').last().addClass('hide');
			$('.tab_panel_tool:not(.hide)').eq(1).prev('.tab_panel_tool').removeClass('hide');
		}
		
	}).delegate('#showRightTab','click',function(){		
		if($('#showLeftTab').length == 0){
			$(this).after('<div id="showLeftTab">&lt;&lt;</div>');
		}else{
			$('#showLeftTab').removeClass('hide');
		}
		if(!$('.tab_panel_tool:not(.hide)').last().next('.tab_panel_tool').next('.tab_panel_tool').hasClass('hide')){
			$(this).addClass('hide');
		}
		if($('.tab_panel_tool:not(.hide)').last().next('.tab_panel_tool').hasClass('hide')){
			$('.tab_panel_tool:not(.hide)').eq(1).addClass('hide');
			$('.tab_panel_tool:not(.hide)').last().next('.tab_panel_tool').removeClass('hide');
		}
		
	});
	
	var applyResources = getCookie('routeList');
	var count = applyResources ? applyResources.split(',').length : 0;
	if(count > 0){
		$('.basket span').html(count).show();
	}
});