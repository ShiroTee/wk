/**
*公共JS
**/
$(function(){
// 修改用户信息
	$("#edit-user-info-btn").click(
			function()
			{
				var userId = $(this).attr("userId");
				$.modal(
				{
					url : ctx + "/mdp/user/info.html",
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
			url : ctx + "/mdp/user/password.html",
			title : "修改密码",
			data :
			{
				userId : userId,
			}
		});
	});
	$('nav li').mouseover(function(){
		if($(this).parents('nav').hasClass('right_nav_menu') || $(this).find('.child_nav').length == 0){
			return;
		}
		$(this).siblings().removeClass('show_child_nav');
		$(this).addClass('show_child_nav');
	});
	setApplyResourceCount();	
});

function setApplyResourceCount(){	
	var applyResources = mycookie('routeList');
	var count = applyResources ? applyResources.split(',').length : 0;
	if(count > 0){
		$('.basket span').html(count).show();
	}else{
		$('.basket span').hide();
	}
}