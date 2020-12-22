//浏览器可视高度
var viewHeight = document.body.clientHeight;
//块高度
var blockHeight = viewHeight - 60;//head 60
var oldTop;
$(function () {
	$(window).scroll(function(e){
		var top = $(window).scrollTop(),
        	sectionHeight = $('section').height(),
        	bannerHieight = $('.banner').height(),
        	blockHeight = $('.block').not(".banner").height(); 
		// 滚动到第二屏时出现右侧导航栏 60为head高度
        rightNavEvent(top,sectionHeight,bannerHieight);
        pageElementEvent(top,bannerHieight);
	});
	
	filterScreen();
    initEvent();
    $('.banner_main .cur .float_two:first-child div').css('opacity','1');
    $('.banner_main .cur').addClass('animate');
    
    bannerPaginationProcess = $('#banner_pagination_process').radialIndicator({
        radius: 6,
        barWidth: 2,
        displayNumber: false,
        barBgColor : 'rgba(0, 0, 0, 0)',
        barColor : '#FFEDC4',
        frameTime : 50
    }).data('radialIndicator');
    bannerPaginationProcess.animate(100);
    bannerPaginationProcessTimmer = setInterval(function () {
        bannerPaginationNext();
        $('.banner_pagination .cur').append($('#banner_pagination_process'));
        bannerPaginationProcess.value(0);
        bannerPaginationProcess.animate(100);
    }, 5000);
});

function rightNavEvent(top,sectionHeight,bannerHieight){
	if (top >= bannerHieight){
    	if(!$('.right_nav').attr('style') || $('.right_nav').attr('style').indexOf('block') == -1){
    		$('.right_nav').fadeIn();
    	}
    }
	else{
	    $('.right_nav').fadeOut();
	}
	//设置导航当前页
	$('.right_nav li').removeClass('cur');		
	if(top >= bannerHieight + $('.page2').height() + $('#management div').first().height()){//最后一屏
		$('.right_nav li').last().addClass('cur');
	}else if(top >= bannerHieight + $('.page2').height()){//第3屏
		$('.right_nav li').eq(2).addClass('cur');
	}else if(top >= bannerHieight){//第2屏
		$('.right_nav li').eq(1).addClass('cur');
	}
}


function filterScreen(){	
	//浏览器可视高度
	viewHeight = document.body.clientHeight;
	//块高度
	blockHeight = viewHeight;//head 60
	blockHeight = blockHeight < 480 ? 480 : blockHeight; //480是显示完整的最小高度
	//blockHeight = blockHeight > 698 ? 698 : blockHeight; //698是显示完整的最大高度
	blockHeight = blockHeight - 60;
	$('.banner').css('height',blockHeight);
	$('.banner .prev, .banner .next').css('margin-top',(blockHeight - 46) / 2 + 'px');
	$('.banner .banner_main li').css('padding-top',(blockHeight + $('#head').height() - 400) / 2 + 'px');
	if(navigator.userAgent.indexOf('Firefox') != -1){
		$('.banner .banner_main li').css('height',(blockHeight + 200) + 'px');
	}	
	filterBannerImg();
}
function filterBannerImg(){
	var img = $('.banner .banner_main li.cur .float_two img'),
		imgHeight = !img || !img.height() || img.height() == 0 ? 400 : img.height();	
	img.css('margin-top',(blockHeight - img.height())/2 - (blockHeight - 400) / 2 + 'px');
}
function animateBanner(item){
	$('.banner_main li,.banner_pagination li').removeClass('cur').removeClass('animate');
	$('.banner_main li[data-item="' + item + '"],.banner_pagination li[data-item="' + item + '"]').addClass('cur');
	setTimeout(function(){
		$('.banner_main li[data-item="' + item + '"]').addClass('animate')
	},10);
}
function bannerPaginationNext(){
		var item = $('.banner_main li.cur').attr('data-item');
		if(++item > $('.banner_main li').length){
			item = 1;
		}
		animateBanner(item);
    	filterBannerImg();
	}

function initEvent(){
	$(window).resize(function() {
		filterScreen();
	})	
	/*banner_pagination*/
	$('body').delegate('nav li','click',function(){
		$('nav li').removeClass('cur');
		$(this).addClass('cur');
	}).delegate('.banner_pagination li','click',function(){
		clearInterval(bannerPaginationProcessTimmer);		
        //bannerPaginationProcess.value(100);
		$(this).append($('#banner_pagination_process'));
		var item = $(this).attr('data-item');  	
		animateBanner(item);		
		filterBannerImg();
	}).delegate('.prev','click',function(){
		var item = $('.banner_main li.cur').attr('data-item');		
		if(--item < 1){
			item = $('.banner_main li').length;
		}
		animateBanner(item);		
    	filterBannerImg();
    	clearInterval(bannerPaginationProcessTimmer);
    	$('.banner_pagination .cur').append($('#banner_pagination_process'));
	}).delegate('.next','click',function(){
		bannerPaginationNext()
		clearInterval(bannerPaginationProcessTimmer);
    	$('.banner_pagination .cur').append($('#banner_pagination_process'));
	}).delegate('.right_nav li a','click',function(){
		var target = $(this).attr('data-target');
		event.preventDefault();
		if(target == "head"){
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		}else{
        	document.querySelector('#' + target).scrollIntoView({ behavior: 'smooth' });
    	}
	}).delegate('.block .tab_head li span','mouseover',function(){
		var el = $(this);
		if(el.parents('.content').find('.tab_container .tab_pane .desc[data-item="' + el.parent().attr('data-item') + '"]').hasClass('cur')){
			return;
		}		
		el.parents('.content').find('.tab_container .tab_pane .timeline').removeClass('animation');
		setTimeout(function(){
			imgAnimationFunction(el);
			aniObj[el.parents('.block').attr('id')].push(aniObj[el.parents('.block').attr('id')].shift());
			clearInterval(aniObj[el.parents('.block').attr('id') + 'animation']);
			aniObj[el.parents('.block').attr('id') + 'animation'] = null;		
			imgAnimation(el.parents('.block').attr('id'));
		},100);
	}).delegate('.block .content .tab_container .tab_pane a span','mouseover',function(){
		console.log('1')
		var target = $(this).next();
		target.animate({backgroundPositionX: '29px'},500,'linear',function(){
			target.css('backgroundPositionX','0');
		});
		arrowAnimationTimmer = setInterval(function(){
			target.animate({backgroundPositionX: '29px'},500,'linear',function(){
				target.css('backgroundPositionX','0');
			});
		},500)
	}).delegate('.block .content .tab_container .tab_pane a span','mouseout',function(){		
		clearInterval(arrowAnimationTimmer);
	}).delegate('.hot_api a','mouseover',function(){		
		$(this).addClass('mouseover');
	}).delegate('.hot_api a','mouseout',function(){		
		var el = $(this);
		el.removeClass('mouseover').addClass('mouseout');
		setTimeout(function(){
			el.removeClass('mouseout');
		},200);
	}).delegate('.banner .banner_main a','mouseover',function(){		
		$(this).addClass('mouseover');
	}).delegate('.banner .banner_main a','mouseout',function(){		
		var el = $(this);
		el.removeClass('mouseover').addClass('mouseout');
		setTimeout(function(){
			el.removeClass('mouseout');
		},200);
	});	
}
var arrowAnimationTimmer;
function imgAnimationFunction(el){
	var li = el.parent();
		var target = li.attr('data-item');
		li.parent().removeClass(li.parent().attr('data-slide'));
		li.parent().addClass(li.attr('data-slide')).attr('data-slide',li.attr('data-slide'));
		li.parents('.content').find('.cur').removeClass('cur');
		li.addClass('cur');
		li.parents('.content').find('.tab_container .tab_pane .desc[data-item="' + target + '"]').addClass('cur');
		//li.parents('.content').find('.tab_container .tab_pane .img_box img[data-item="' + target + '"]').addClass('cur');
		li.parents('.content').find('.tab_container .tab_pane .img_box div').removeAttr('class');
		li.parents('.content').find('.tab_container .tab_pane .img_box div').addClass(target);
		li.parents('.content').find('.tab_container .tab_pane .timeline').addClass('animation');
}
function pageElementEvent(top,bannerHieight){
	var curBottom = top + viewHeight,el = $('#information .title');
	if(curBottom >= bannerHieight + el.parents('.block')[0].offsetTop  + el[0].offsetTop + el[0].offsetHeight){
		el.css('transform','rotate(0)');		
	}
	el = $('#management .title');
	if(curBottom >= bannerHieight + el.parents('.block')[0].offsetTop  + el[0].offsetTop + el[0].offsetHeight){
		el.css('transform','rotate(0)');		
	}
	el = $('#api .title');
	if(curBottom >= bannerHieight + el.parents('.block')[0].offsetTop  + el[0].offsetTop + el[0].offsetHeight){
		el.css('transform','rotate(0)');		
	}
	el = $('#information .tab_head')
	if(curBottom >= bannerHieight + el.parents('.block')[0].offsetTop  + el[0].offsetTop + el[0].offsetHeight){
		el.parent().find('.img_box').addClass('show');
		var a = el.parent().find('a');
		setTimeout(function(){
			a.css('right','-45px').css('opacity','1');
			$('#information .timeline').addClass('animation');
			imgAnimation('information');
		},1300);
	}else{
		el.parent().find('a').css('right','0').css('opacity','0');
	}
	el = $('#management .tab_head');
	if(curBottom >= bannerHieight + el.parents('.block')[0].offsetTop + el[0].offsetTop + el[0].offsetHeight){
		el.parent().find('.img_box').addClass('show');
		var a = el.parent().find('a');
		setTimeout(function(){
			a.css('right','-45px').css('opacity','1');
			$('#management .timeline').addClass('animation');
			imgAnimation('management');
		},1300);
	}else{
		el.parent().find('a').css('right','0').css('opacity','0');
	}
}
var aniObj = {
	'information':['view','store'],
	'management':['view','store']
}
	
function imgAnimation(elid){
	if(aniObj[elid + 'animation']){
		return;
	}
	aniObj[elid + 'animation'] = setInterval(function(){	
		$('#' + elid + ' .timeline').removeClass('animation');
		setTimeout(function(){
			imgAnimationFunction($('#' + elid + ' .tab_head li[data-item="' + aniObj[elid][0] + '"] span'));	
			aniObj[elid].push(aniObj[elid].shift());
		},100)		
	},10 * 1000);
}
