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
        pageElementEvent(top);
	});
	
	filterScreen();
    initEvent();
    atvImg();
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
function pageElementEvent(top,bannerHieight){
	var curBottom = top + viewHeight,el = $('#information h2');
	//#information h2	
	if(curBottom >= el[0].offsetTop){
		el.css('transform','scale(1)');
	}
	el = $('#information .content_line').first();
	if(curBottom >= el[0].offsetTop){
		el.find('.img_box')
			.css('transform','translateX(0px)')
			.css('opacity','1');
		el.find('.description_box ')
			.css('transform','translateX(0px)')
			.css('opacity','1');
	}
	el = $('#information .content_line').last();
	if(curBottom >= el[0].offsetTop){
		el.find('.r')
			.css('transform','translateX(0px)')
			.css('opacity','1');
		el.find('.description_box ')
			.css('transform','translateX(0px)')
			.css('opacity','1');
	}
	el = $('#management div').first();
	if(curBottom >= el[0].offsetTop){
		el.find('h2')
			.css('transform','scale(1)')
			.css('opacity','1');
	}
	/*if(top >= 1600 && $('#management .float_two').css('opacity') == "0"){
		$('#management .float_two')
			.css('transform','translateY(0px)')
			.css('opacity','1');
		setTimeout(function(){
			$('#management .float_two').css('transition','all .1s');
		},500);			
	}*/	
	el = $('#data_management');
	if(curBottom >= el[0].offsetTop + el.find('h2')[0].offsetHeight + 128 && $('#management .float_two').css('opacity') == "0"){
		$('#management .float_two')
			.css('transform','translateY(0px)')
			.css('opacity','1');
		setTimeout(function(){
			$('#management .float_two').css('transition','all .1s');
		},500);	
	}
	el = $('#api');
	if(curBottom >= el[0].offsetTop + 121){
		$('#api .content h2,#api .content h2+p')
			.css('transform','translateY(0px)')
			.css('opacity','1');
	}
	if(curBottom >= el[0].offsetTop + 450){
		$('.api .content .float_four')
			.css('transform','scale(1)')
			.css('background','rgba(255, 255, 255, 0)');
		setTimeout(function(){
			$('.api .content .float_four').css('transition','none')
		},1000);
	}
}

function filterScreen(){	
	//浏览器可视高度
	viewHeight = document.body.clientHeight;
	//块高度
	blockHeight = viewHeight - 60;//head 60
	blockHeight = blockHeight < 480 ? 480 : blockHeight; //480是显示完整的最小高度
	$('.banner').css('height',blockHeight);
	$('.banner .prev, .banner .next').css('margin-top',(blockHeight - 46) / 2 + 'px');
	$('.banner .banner_main li').css('padding-top',(blockHeight - 400) / 2 + 'px');	
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
	});
	/*$('#meta_data').click(function(){
		location.href = ctx + '/mdp/welcome/dataManagementAndMonitor/metadataManagement.html';
	})
	*/
	/*视差效果不好 暂时不要
	document.body.onmousewheel = function(event) {
    	event = event || window.event;
    	var delta = event.wheelDelta,scroll = $(window).scrollTop();
    	if((delta < 0 && scroll < 1400) || (delta > 0 && scroll > 2400)){
    		return;
    	}
    	var cur = $('#management .float_two').css('transform');
    	var y = cur.substr(cur.indexOf('(') + 1).replace(')','').split(',').pop();
    	if(y > 0 || y < -100){
    		return;
    	}
    	y = isNaN(y) ? 0 : parseInt(y);
    	var translateY = (y + delta/10);
    	translateY = translateY > 0 ? 0 : translateY;
    	translateY = translateY < -100 ? -100 : translateY;
    	$('#management .float_two').css('transform','translateY(' + translateY + 'px)');
	};*/
}

function atvImg(){
	var d = document,
		de = d.documentElement,
		bd = d.getElementsByTagName('body')[0],
		htm = d.getElementsByTagName('html')[0],
		win = window,
		imgs = d.querySelectorAll('.atvImg'),
		totalImgs = imgs.length,
		supportsTouch = 'ontouchstart' in win || navigator.msMaxTouchPoints;

	if(totalImgs <= 0){
		return;
	}

	for(var l=0;l<totalImgs;l++){
		var thisImg = imgs[l],
			layerElems = thisImg.querySelectorAll('.atvImg-layer'),
			totalLayerElems = layerElems.length;

		if(totalLayerElems <= 0){
			continue;
		}
		var imgHtml = thisImg.innerHtml;
		while(thisImg.firstChild) {
			thisImg.removeChild(thisImg.firstChild);
		}
	
		var containerHTML = d.createElement('div'),
			shineHTML = d.createElement('div'),
			shadowHTML = d.createElement('div'),
			layersHTML = d.createElement('div'),
			layers = [];

		//thisImg.id = 'atvImg__'+l;
		containerHTML.className = 'atvImg-container';
		shineHTML.className = 'atvImg-shine';
		shadowHTML.className = 'atvImg-shadow';
		layersHTML.className = 'atvImg-layers';

		for(var i=0;i<totalLayerElems;i++){
			var layer = d.createElement('div'),
				imgSrc = layerElems[i].innerHTML;

			layer.className = 'atvImg-rendered-layer';
			layer.setAttribute('data-layer',i);
			layer.innerHTML = imgSrc;
			layersHTML.appendChild(layer);

			layers.push(layer);
		}

		containerHTML.appendChild(shadowHTML);
		containerHTML.appendChild(layersHTML);
		containerHTML.appendChild(shineHTML);
		thisImg.appendChild(containerHTML);

		var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
		thisImg.style.transform = 'perspective('+ w*3 +'px)';

		if(supportsTouch){
			win.preventScroll = false;

	        (function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('touchmove', function(e){
					if (win.preventScroll){
						e.preventDefault();
					}
					processMovement(e,true,_thisImg,_layers,_totalLayers,_shine);		
				});
	            thisImg.addEventListener('touchstart', function(e){
	            	win.preventScroll = true;
					processEnter(e,_thisImg);		
				});
				thisImg.addEventListener('touchend', function(e){
					win.preventScroll = false;
					processExit(e,_thisImg,_layers,_totalLayers,_shine);		
				});
	        })(thisImg,layers,totalLayerElems,shineHTML);
	    } else {
	    	(function(_thisImg,_layers,_totalLayers,_shine) {
				thisImg.addEventListener('mousemove', function(e){
					processMovement(e,false,_thisImg,_layers,_totalLayers,_shine);		
				});
	            thisImg.addEventListener('mouseenter', function(e){
					processEnter(e,_thisImg);		
				});
				thisImg.addEventListener('mouseleave', function(e){
					processExit(e,_thisImg,_layers,_totalLayers,_shine);		
				});
	        })(thisImg,layers,totalLayerElems,shineHTML);
	    }
	}

	function processMovement(e, touchEnabled, elem, layers, totalLayers, shine){

		var bdst = bd.scrollTop || htm.scrollTop,
			bdsl = bd.scrollLeft,
			pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
			pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
			offsets = elem.getBoundingClientRect(),
			w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
			h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
			wMultiple = 320/w,
			offsetX = 0.52 - (pageX - offsets.left - bdsl)/w,
			offsetY = 0.52 - (pageY - offsets.top - bdst)/h,
			dy = (pageY - offsets.top - bdst) - h / 2,
			dx = (pageX - offsets.left - bdsl) - w / 2,
			yRotate = (offsetX - dx)*(0.07 * wMultiple),
			xRotate = (dy - offsetY)*(0.1 * wMultiple),
			imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)',
			arad = Math.atan2(dy, dx),
			angle = arad * 180 / Math.PI - 90;

		if (angle < 0) {
			angle = angle + 360;
		}

		if(elem.firstChild.className.indexOf(' over') != -1){
			imgCSS += ' scale3d(1.07,1.07,1.07)';
		}
		elem.firstChild.style.transform = imgCSS;
		
		shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
		shine.style.transform = 'translateX(' + (offsetX * totalLayers) - 0.1 + 'px) translateY(' + (offsetY * totalLayers) - 0.1 + 'px)';	

		var revNum = totalLayers;
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = 'translateX(' + (offsetX * revNum) * ((ly * 2.5) / wMultiple) + 'px) translateY(' + (offsetY * totalLayers) * ((ly * 2.5) / wMultiple) + 'px)';
			revNum--;
		}
	}

	function processEnter(e, elem){
		elem.firstChild.className += ' over';
	}

	function processExit(e, elem, layers, totalLayers, shine){

		var container = elem.firstChild;

		container.className = container.className.replace(' over','');
		container.style.transform = '';
		shine.style.cssText = '';
		
		for(var ly=0;ly<totalLayers;ly++){
			layers[ly].style.transform = '';
		}

	}

}

let resizeReset = function() {
	w = canvasBody.width = $('.api').innerWidth();
	h = canvasBody.height = $('.api').innerHeight();
}

const opts = { 
	particleColor: "rgb(200,200,200)",
	lineColor: "rgb(200,200,200)",
	particleAmount: 30,
	defaultSpeed: 1,
	variantSpeed: 1,
	defaultRadius: 2,
	variantRadius: 2,
	linkRadius: 200,
};

window.addEventListener("resize", function(){
	deBouncer();
});

let deBouncer = function() {
    clearTimeout(tid);
    tid = setTimeout(function() {
        resizeReset();
    }, delay);
};

let checkDistance = function(x1, y1, x2, y2){ 
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1, hubs){ 
	for (let i = 0; i < hubs.length; i++) {
		let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
		let opacity = 1 - distance / opts.linkRadius;
		if (opacity > 0) { 
			drawArea.lineWidth = 0.5;
			drawArea.strokeStyle =  'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')';
			drawArea.beginPath();
			drawArea.moveTo(point1.x, point1.y);
			drawArea.lineTo(hubs[i].x, hubs[i].y);
			drawArea.closePath();
			drawArea.stroke();
		}
	}
}

Particle = function(xPos, yPos){ 
	this.x = Math.random() * w; 
	this.y = Math.random() * h;
	this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
	this.directionAngle = Math.floor(Math.random() * 360); 
	this.color = opts.particleColor;
	this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
	this.vector = {
		x: Math.cos(this.directionAngle) * this.speed,
		y: Math.sin(this.directionAngle) * this.speed
	};
	this.update = function(){ 
		this.border(); 
		this.x += this.vector.x; 
		this.y += this.vector.y; 
	};
	this.border = function(){ 
		if (this.x >= w || this.x <= 0) { 
			this.vector.x *= -1;
		}
		if (this.y >= h || this.y <= 0) {
			this.vector.y *= -1;
		}
		if (this.x > w) this.x = w;
		if (this.y > h) this.y = h;
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;	
	};
	this.draw = function(){ 
		drawArea.beginPath();
		drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		drawArea.closePath();
		drawArea.fillStyle = this.color;
		drawArea.fill();
	};
};

function setup(){ 
	particles = [];
	resizeReset();
	for (let i = 0; i < opts.particleAmount; i++){
		particles.push( new Particle() );
	}
	window.requestAnimationFrame(loop);
}

function loop(){ 
	window.requestAnimationFrame(loop);
	drawArea.clearRect(0,0,w,h);
	for (let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].draw();
	}
	for (let i = 0; i < particles.length; i++){
		linkPoints(particles[i], particles);
	}
}

const canvasBody = document.getElementById("apibg"),
drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();
