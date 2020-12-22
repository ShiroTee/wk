/**
*公共JS
**/
var scroll = $(window).scrollTop();
function closeNavMenu(){
	$('nav.top_nav_menu .show_child_nav').removeClass('show_child_nav');
}
$(function(){
	filterPage();
	$(window).resize(function() {
		filterPage();
	}).click(function(){
		closeMenu();
		$('nav.top_nav_menu .show_child_nav').removeClass('show_child_nav');
	})
	$(window).scroll(function(e){
		var delta = true;
	    var top = $(window).scrollTop();   //设置变量top,表示当前滚动条到顶部的值
        if(top < scroll){
        	delta = false;        	
        }
        scroll = top;
        if (top > 60)// 当滚动条到顶部的值大于136（原head+nav）时
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
	$('body').delegate('nav li .child_nav li','click',function(){		
		var obj = this;
		$(this).parent().find('ul').each(function(){
			if($(this).css('display') == 'block'){
				$(this).find('a').css('color','rgba(255, 255, 255, 0)');
				$(this).slideUp(null,function(){
					$(this).prev().removeClass("fa-angle-up").addClass("fa-angle-down");
				});
			}
		})
		if($(this).find('ul').css('display') == 'block'){
			$(this).find('ul').find('a').css('color','rgba(255, 255, 255, 0)');			
			$(this).find('ul').slideUp(null,function(){
				$(this).prev().removeClass("fa-angle-up").addClass("fa-angle-down");
			});
			return;
		}
		$(this).find('ul').slideDown(null,function(){
			$(this).find('a').css('color','rgba(255, 255, 255, 1)');
			$(this).prev().addClass("fa-angle-up").removeClass("fa-angle-down");
		});
	}).delegate('.cur_search span i.icon_close','click',function(){
		$(this).parent().remove();
		$('.category_main .line span.cur').removeClass('cur');
	}).delegate('.head_right,nav,.right_nav a','click',function(){
		cancelBubble();
	}).delegate('img.menu','mouseover',function(){
		showMenu();
	}).delegate('.top','click',function(){		
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });		
	}).delegate('.go_management','click',function(){		
		mycookie('redirectUrl',ctx + '/mdp/index.html',{ path: '/'});
		window.open(ctx + '/mdp/index.html');	
	});
	$('.card').each(function(i,item){
		$(this).css('transform','translateY(0px)').css('opacity','1').css('transition-delay', i*0.1 + 's');
	});
})
function showMenu(){
	//$('.max').addClass('show');
	$('.right_nav_menu,.max .head_right').animate({right:"0px"});
	
	cancelBubble();
}
function closeMenu(){
	//$('.max').removeClass('show');
	$('.right_nav_menu,.max .head_right').animate({right:"-300px"});
}
function filterPage(){
	var viewHeight = document.body.clientHeight;
	var headHeight = $('.head').height();
	var footHeight = $('.foot').height();
	$('.main_page').css('min-height',viewHeight - headHeight - footHeight - 60 - 22); //main_page margin 60 22
	
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