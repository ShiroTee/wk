/* 
Design By TianXiaofei 2012.
 */
$("body").append('<div id="tanchuceng"></div>');
$("body").append('<div id="screen_modal"></div>');
// $("body").append("<div class='preNext pre'></div><div class='preNext
// next'></div>");

/*------桌面下边的码头上的图标------*/
var sHTML;
sHTML = ''
sHTML += '<li class="menuItem" id="t_li_1"><a class="dock-item" href="javascript:void(0);"><span>数据应用平台</span><img src="themes/images/icons/big/icon1.gif" alt="数据应用平台" /></a></li> ';
sHTML += '<li class="menuItem" id="t_li_2"><a class="dock-item" href="javascript:void(0);"><span>局长信息平台</span><img src="themes/images/icons/big/icon2.gif" alt="局长信息平台" /></a></li> ';
sHTML += '<li id="t_li_3"><a class="dock-item" href="javascript:void(0);" id="matou3"><span>CTAIS</span><img src="themes/images/icons/big/icon3.gif" alt="CTAIS" /></a></li> ';
sHTML += '<li id="t_li_4"><a class="dock-item" href="http://www.baidu.com" target="_blank"><span>邮件</span><img src="themes/images/icons/big/icon4.gif" alt="邮件" /></a></li> ';
sHTML += '<li id="t_li_5"><a class="dock-item" href="javascript:void(0);" id="matou5"><span>内网门户</span><img src="themes/images/icons/big/icon5.gif" alt="内网门户" /></a></li> ';
sHTML += '';
$("#dockcontainer").html(sHTML);
$("#logo").html("");

function openwin(data, url) {
	alert("可以做跳页：" + url);
	alert("这个是传的值：" + data);
}

$(document).ready(function() {

	// 鼠标点击弹出提示框

	/*
	 * $('#zengjia1').click( function () { art.dialog.load('app_list.html',
	 * {title: '添加应用'}); });
	 * 
	 * $('#jbox-demo1').click( function () { art.dialog.load('shuju.html',
	 * {title: '待办事宜', width: 700, height: 400}); }); $('#jbox-demo2').click(
	 * function () { art.dialog.load('shuju.html', {title: '查询统计', width: 700,
	 * height: 400}); });
	 * 
	 * $('#jbox-demo3').click( function () { art.dialog.load('shuju.html',
	 * {title: '报表管理', width: 700, height: 400}); }); $('#jbox-demo4').click(
	 * function () { art.dialog.load('shuju.html', {title: '征管状况', width: 700,
	 * height: 400}); }); $('#jbox-demo5').click( function () {
	 * art.dialog.load('shuju.html', {title: '绩效管理', width: 700, height: 400});
	 * }); $('#jbox-demo6').click( function () { art.dialog.load('shuju.html',
	 * {title: '风险管理', width: 700, height: 400}); }); $('#jbox-demo7').click(
	 * function () { art.dialog.load('shuju.html', {title: '系统管理', width: 700,
	 * height: 400}); }); $('#jbox-demo8').click( function () {
	 * art.dialog.load('shuju.html', {title: '预缴管理提示', width: 700, height:
	 * 400}); });
	 * 
	 * $('#jbox-demo9').click( function () { art.dialog.load('shuju.html',
	 * {title: '一户式查询', width: 700, height: 400}); }); $('#jbox-demo10').click(
	 * function () { art.dialog.load('shuju.html', {title: '自定义查询', width: 700,
	 * height: 400}); }); $('#jbox-demo11').click( function () {
	 * art.dialog.load('shuju.html', {title: '局长首页', width: 700, height: 400});
	 * }); $('#jbox-demo12').click( function () { art.dialog.load('shuju.html',
	 * {title: '收入情况', width: 700, height: 400}); }); $('#jbox-demo13').click(
	 * function () { art.dialog.load('shuju.html', {title: '欠税情况', width: 700,
	 * height: 400}); }); $('#jbox-demo14').click( function () {
	 * art.dialog.load('shuju.html', {title: '纳税户情况', width: 700, height: 400});
	 * });
	 * 
	 * 
	 * $('#matou1').click( function () { art.dialog.load('shuju.html', {title:
	 * '数据应用平台', width: 700, height: 400}); }); $('#matou2').click( function () {
	 * art.dialog.load('shuju.html', {title: '局长信息平台', width: 700, height:
	 * 400}); }); $('#matou3').click( function () {
	 * art.dialog.load('shuju.html', {title: 'CTAIS', width: 700, height: 400});
	 * });
	 * 
	 * $('#matou5').click( function () { art.dialog.load('shuju.html', {title:
	 * '内网门户', width: 700, height: 400}); });
	 * 
	 * 
	 * $('#site_style').click( function () { art.dialog.load('site_style.html',
	 * {title: '风格设定', width: 710, height: 400}); }); $('#help').click( function () {
	 * art.dialog.load('help.html', {title: '系统帮助', width: 700, height:
	 * 400},false); }); $('#ag').click( function () {
	 * art.dialog.load('login_1.html', {title: '重新登录',width: 400, height:
	 * 220,lock: true}); });
	 * 
	 */
	$('#close').click(function() {
		window.close();// 常规提示关闭
	});

	$('#ScreenLock').click(function() {
		art.dialog.open('login_1.html', {
			title : '重新登录',
			width : 400,
			height : 220,
			lock : true
		});
	});

});

/*------要默认打开哪个窗口，就在下边指定一下------*/
// art.dialog.open("home.html", {title: '主页',width: 900,height: 500});
/*-------定义页面背景图-------*/
document.body.style.backgroundImage = "url('themes/images/bg1.jpg')";

/*------以下实现了哪个图片的小红圈显示，且控制上边的数字是多少------*/
// document.getElementById('jbox-demo2').childNodes[1].style.display = 'block';
// document.getElementById('jbox-demo2').childNodes[1].innerText = '4';
// 为了处理ie6下png的问题，导致这块不能用此方法控制数字是否显示。---田晓飞
