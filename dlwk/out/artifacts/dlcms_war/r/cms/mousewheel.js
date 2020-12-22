//取得滚动值 
function getWheelValue(e) {
	e = e || event;
	return (e.wheelDelta ? e.wheelDelta / 120 : -(e.detail % 3 == 0 ? e.detail / 3 : e.detail));
}
//停止滚动事件
function stopEvent(e) {
	e = e || event;
	if (e.preventDefault){
		e.preventDefault();
	}
	e.returnValue = false;
}
// 绑定事件,这里对mousewheel做了判断,注册时统一使用mousewheel
function addEvent(obj, type, fn) {
	var isFirefox = typeof document.body.style.MozUserSelect != 'undefined';
	if (obj.addEventListener){
		obj.addEventListener(isFirefox ? 'DOMMouseScroll' : type, fn, false);
	}else{
		obj.attachEvent('on' + type, fn);
	}
	return fn;
}
// 移除事件,这里对mousewheel做了兼容,移除时统一使用mousewheel
function delEvent(obj, type, fn) {
	var isFirefox = typeof document.body.style.MozUserSelect != 'undefined';
	if (obj.removeEventListener){
		obj.removeEventListener(isFirefox ? 'DOMMouseScroll' : type, fn, false);
	}else{
		obj.detachEvent('on' + type, fn);
	}
}

/* ------------ */
/* 鼠标在地图所在DIV里时，滚动鼠标滚轮取消浏览器的滚轮事件 */
function mousewheel() {
	addEvent(document.getElementById('mapdiv'), 'mousewheel', function(e) {
		stopEvent(e);
		alert("你在滚动鼠标滚轮") ;
		return false;
	});
};
