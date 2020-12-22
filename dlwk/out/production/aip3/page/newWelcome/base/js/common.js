/**
*公共JS
**/
function closeNavMenu(){
	$('nav.top_nav_menu .show_child_nav').removeClass('show_child_nav');
}
$(function(){
	filterPage();
	$(window).resize(function() {
		filterPage();
	}).click(function(){
		$('.head_search .search_input').removeClass('show_hot_seach');
		$('nav.top_nav_menu .show_child_nav').removeClass('show_child_nav');
	}).scroll(function(e){
		var delta = true;
	    var top = $(window).scrollTop();   //设置变量top,表示当前滚动条到顶部的值
        if(top < scroll){
        	delta = false;        	
        }
        scroll = top;
        if (top > 0)// 当滚动条到顶部的值大于136（原head+nav）时
        {
        	if(!$(".head").hasClass("max")){
        		$(".head").addClass("max");
        		$('.go_back').css('margin-top','-10px')
        	}
        }
		else
		{
		    $(".head").removeClass("max").removeClass("show");
		    $('nav,.head_right').removeAttr('style');
		    $('.go_back').removeAttr('style');
		}        
	});	
	$('body').delegate('.head_search .search_input','focus',function(){		
		$(this).addClass('show_hot_seach');	
	}).delegate('.head_search .search_input','click',function(){		
		cancelBubble();	
	}).delegate('.filter_box .filter_list span', 'click', function() {
		$(this).siblings().removeClass('cur');
		$(this).toggleClass('cur');
		if($('.filter_box .filter_list span.cur').not('.filter_all').length > 0){
			$('.filter_box .filter_target').addClass('filtered');
		}else{
			$('.filter_box .filter_target').removeClass('filtered');
		}
	}).delegate('.filter_box .filter_target span', 'click', function() {
		if($('.filter_content').css('display') == 'none'){
			$('.filter_content').slideDown();
			return;
		}
		$('.filter_content').slideUp();
	}).delegate('.filter_box .filter_content_close', 'click', function() {
		$('.filter_content').slideUp();
	}).delegate('.tips .tips_close', 'click', function() {
		$(this).parents('.tips').remove();
	}).delegate('.top','click',function(){		
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });		
	}).delegate('.head_right,nav,.right_nav a','click',function(){
		cancelBubble();
	}).delegate('.filter_box .filter_category i','click',function(){
		$(this).parents('.filter_category').find('i').removeClass('cur');
		$(this).addClass('cur');
	}).delegate('.go_management','click',function(){		
		mycookie('redirectUrl',ctx + '/mdp/index.html',{ path: '/'});
		window.open(ctx + '/mdp/index.html');	
	});
	
	$('.card').each(function(i,item){
		$(this).css('transform','translateY(0px)').css('opacity','1').css('transition-delay', i*0.1 + 's');
	});
})
function filterPage(){
	var viewHeight = document.body.clientHeight;
	var headHeight = $('.head').height() + $('.main_head').height();
	var footHeight = $('.foot').height();
	$('.main_page').css('min-height',viewHeight - headHeight - footHeight - 22 - 23); //main_page margin 60 22
}
function getEvent(){
     if(window.event)    {return window.event;}
     func=getEvent.caller;
     while(func!=null){
         var arg0=func.arguments[0];
         if(arg0){
             if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                || arg0.constructor==KeyboardEvent)
                ||(typeof(arg0)=="object" && arg0.preventDefault
                && arg0.stopPropagation)){
                 return arg0;
             }
         }
         func=func.caller;
     }
     return null;
}
//阻止冒泡
function cancelBubble()
{
    var e=getEvent();
    if(window.event){
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble=true;//阻止冒泡
     }else if(e.preventDefault){
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
     }
}

function toggleTheme(theme){
	//设置cookie
	mycookie('theme',theme,{ path: '/'});
	//setcookie();
	location.href = location.href;
}
function setcookie(){
	$.ajax({
		url: ctx + "/mdp/welcome/setTheme.json",
		async: false,
		data:{
			theme : mycookie('theme')
		},
		success : function(){
			
		}
	});
}

/* 
	type == true:成功信息
	type == false:失败信息
*/
$.msg = function(msg,type){
	$('.tips').remove();
	var html = [];
	html.push('<div class="tips ' + (type ? 'success' : 'error' ) + '">');
	html.push(msg);
	html.push('<div class="tips_close"></div>');
	html.push('</div>')
	$('body').append(html.join(''));
}