<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<%
	String contextPath = request.getContextPath();
	if (request.getSession().getAttribute(Constant.USER_SESSION_ID) == null)
	{
		System.out.println("session is null ........................................................................................");
		response.sendRedirect(request.getContextPath());
	}
	UserInfoBean userBean = (UserInfoBean) session.getAttribute(Constant.USER_SESSION_ID);
	String longinName = userBean.getName();
	response.setHeader("Cache-Control","no-store");
	response.setHeader("Pragrma","no-cache");
	response.setDateHeader("Expires",0);
%>
<html>
	<head>

		<title>信息资产与服务管理平台</title>
		<meta http-equiv="Pragma" CONTENT ="no-cache" >
		<meta http-equiv="Cache-Control" CONTENT="no-cache, must-revalidate" >
		<meta http-equiv="Expires" CONTENT="0" >
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/resource/ext4/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/resource/ext4/resources/css/ext-patch.css" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/css/desktop_icon.css" />
		<style type="text/css">
.x-window-dlg.ext-mb-download {
	background: transparent url(../images/download.gif) no-repeat top left;
	height: 46px;
}
.change-background{
	background:rgba(250,250,250,0.5);
	-pie-background:rgba(250,250,250,0.5);/*IE6-8*/ 
	box-shadow: 1px 1px rgba(250,250,250,0.5);
}
</style>
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/css/desktop.css" />
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/ext-all.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/ext-lang-zh_CN.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/Module.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/Video.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/Wallpaper.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/StartMenu.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/TaskBar.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/ShortcutModel.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/Desktop.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/ext4/App.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/jquery-1.9.1.min.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/BogusModule.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/Settings.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/SystemStatus.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/App.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/WallpaperModel.js">
</script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/resource/scripts/screensize.js">
</script>
<script type="text/javascript"
			src="<%=request.getContextPath()%>/javascript/app_common.js">
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/common.js"></script>
<script language="javascript" type="text/javascript">
        history.go(1); 
</script>
		<script type="text/javascript">
		var root_url = "<%=contextPath%>/app/http/";
var contextPath = "<%=contextPath%>";
/**
 * 调转到登陆页面
 */
function skipToLogin(url,winId)
{
	if(window.frames[winId])
	{
		var url_=window.frames[winId].location.href;
//		alert(url_)
		if(url_.indexOf(url)==-1)
		{
			window.location.reload();
		}
	}	
	
}
Ext.BLANK_IMAGE_URL = '<%=request.getContextPath()%>/resource/ext/resources/images/default/s.gif';
var loginName = "<%=longinName%>";
Ext.Loader.setPath(
{
	'Ext.ux.desktop' : 'js',
	MyDesktop : ''
});
Ext.require('MyDesktop.App');

var myDesktopApp;
var myArr = [];//这里是保存显示模块的数组
var desktopArr = [];
(function()
{
	var fullScreenApi =
	{
		supportsFullScreen : false,
		isFullScreen : function()
		{
			return false;
		},
		requestFullScreen : function()
		{
		},
		cancelFullScreen : function()
		{
		},
		fullScreenEventName : '',
		prefix : ''
	}, browserPrefixes = 'webkit moz o ms khtml'.split(' ');
	// check for native support
	if (typeof document.cancelFullScreen != 'undefined')
	{
		fullScreenApi.supportsFullScreen = true;
	} else
	{
		// check for fullscreen support by vendor prefix
		for ( var i = 0, il = browserPrefixes.length; i < il; i++)
		{
			fullScreenApi.prefix = browserPrefixes[i];
			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined')
			{
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
	}
	// update methods to do something useful
	if (fullScreenApi.supportsFullScreen)
	{
		fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
		fullScreenApi.isFullScreen = function()
		{
			switch (this.prefix)
			{
			case '':
				return document.fullScreen;
			case 'webkit':
				return document.webkitIsFullScreen;
			default:
				return document[this.prefix + 'FullScreen'];
			}
		}
		fullScreenApi.requestFullScreen = function(el)
		{
			return (this.prefix === '') ? el.requestFullScreen()
					: el[this.prefix + 'RequestFullScreen']();
		}
		fullScreenApi.cancelFullScreen = function(el)
		{
			return (this.prefix === '') ? document.cancelFullScreen()
					: document[this.prefix + 'CancelFullScreen']();
		}
	}
	// jQuery plugin
	if (typeof jQuery != 'undefined')
	{
		jQuery.fn.requestFullScreen = function()
		{
			return this.each(function()
			{
				if (fullScreenApi.supportsFullScreen)
				{
					fullScreenApi.requestFullScreen(this);
				}
			});
		};
	}
	window.fullScreenApi = fullScreenApi;
})();
Ext
		.onReady(function()
		{

			var childStr = "";
			var msgTip = Ext.MessageBox.show(
			{
				title : '提示',
				progressText : 'Saving...',
				width : 300,
				closable : false,
				wait : true,
				icon : 'ext-mb-download',
				iconHeight : 50,
				msg : '系统正在初始化请稍后...'
			});
			var requestConfig =
			{
				url : root_url
						+ "ums/loginHandler/initworkspace",
				callback : function(options, success, response)
				{

					var jsonStr = response.responseText;
					var data = Ext.JSON.decode(jsonStr);
					desktopArr=data.data.icons;
					
					data=data.data.menus;
					//data = data.data.children;
				var menuId = '';
				var title = '';
				var subItems = '';
				var url = '';

				var iframeUrl = "";
				//addDesktopArr(icons);
				/*
				function addDesktopArr(data)
				{


					for ( var i = 0; i < data.length; i++)
					{
						if (data[i].showDesktop)
						{
							
							desktopArr.push(data[i]);
						}
						if (data[i].children != undefined
								|| data[i].children.length != 0)
						{
							addDesktopArr(data[i].children);
						}
					}

				}
				*/
				function addMenu(dataArr)
				{
					var tmp = dataArr;
					while (dataArr.children != undefined
							&& dataArr.children.length > 0)
					{
						var item = "{id:'"
								+ tmp.resourceId
								+ "',text: '"
								+ tmp.resourceName
								+ "', iconCls:'"
								+ tmp.iconCls
								+ "', handler : function(){ return false;	},scope: this, menu:{ items:[";

						for ( var k = 0; k < dataArr.children.length; k++)
						{

							item = item + addMenu(dataArr.children[k]) + ",";
						}
						item = item.substring(0, item.length - 1);
						return item + "]}}";
					}

					return "{id:'" + tmp.resourceId + "', text:'" + tmp.resourceName
							+ "',iconCls:'" + tmp.iconCls
							+ "',scope: this, windowId: '" + tmp.resourceId
							+ "', handler : this.createWindow, url:'"
							+ tmp.url + "',menu_type:'child_menu',leaf:"
							+ tmp.leaf + ",menuType:'" + tmp.menuType + "'}"

				}

				var items = new Array();
				for ( var i = 0; i < data.length; i++)
				{
					var t = data[i];
					if (t.children != undefined && t.children.length > 0)
					{
						if (t.children != "")
						{
							for ( var j = 0; j < t.children.length; j++)
							{
								subItems = subItems + addMenu(t.children[j])
										+ ",";
							}
							subItems = subItems.substring(0,
									subItems.length - 1);
							menuId = t.resourceId;
							title = t.resourceName;
							menu_iconCls = "";
							if (t.iconCls != undefined)
							{
								menu_iconCls = t.iconCls;

							}
							Ext.useShims = true;
							var s = Ext
									.define(
											'MyDesktop.Menu' + menuId,
											{

												extend : 'MyDesktop.BogusModule',

												init : function()
												{
													var temp = "this.launcher = { "
															+ "text: '"
															+ title
															+ "', "
															+ "iconCls:'"
															+ menu_iconCls
															+ "',id:'"
															+ "menuitem_"+menuId
															+ "', "
															+ "handler: function() { "
															+ "	return false;"
															+ "},"
															+ "scope: this, "
															+ "menu:  {items:["
															+ subItems
															+ "]},"
															+ "windowId:'"
															+ menuId
															+ "',leaf:"
															+ t.leaf + "}"
													eval(temp);
												},
												createWindow : function(src)
												{
													if (!src.leaf)
													{
														return false;
													}
													var desktop = this.app
															.getDesktop();
													var win = desktop
															.getWindow('bogus' + src.windowId);
													if (!win)
													{
														//var html = '<iframe id="'+src.windowId+'"  name="mainFrame" src="';
														//var html='<iframe id="'+src.windowId+" name="'+src.windowId+" src="';  +
														var html = "<iframe id='"
																+ src.windowId
																+ "' name='"
																+ src.windowId
																+ "' src='";
														var url =src.url;
														html = html
																+ url
																+ "' frameborder='0' height='100%' width='100%' style='overflow:hidden;' onload='skipToLogin(\""+src.url+"\",\""+src.windowId+"\");'>iframe>";
														if (src.menuType == "url")
														{
															iframeUrl = url;
															url = "#";
														}
														if (url == contextPath
																+ "/app/http/rdp/appInstallHandler/page")
														{
															widthValue = 600;
															heightValue = 415;
														}
														if (url == "/rdp/app-install/rdp/page/addDesktopApp/addDesktopApp.jsp")
														{
															widthValue = 800;
															heightValue = 550;
														}
														Ext.useShims = true;
														win = desktop
																.createWindow(
																{
																	id : 'bogus' + src.windowId,
																	title : src.text,
																	html : html,
																	resizable:false,
																	iconCls : 'bogus',
																	shim : true,
																	animCollapse : true,
																	constrainHeader : true,
																	maximized:true,
																	maximizable:false
																});
													}
													//win.maximize(true);
													win.show();

												}
											});
							myArr.push(new s);
							subItems = '';
						}
					}
				}
				msgTip.hide();
				myDesktopApp = new MyDesktop.App();
			}
			}

			Ext.Ajax.request(requestConfig);
		});


</script>
		<!-- </x-compile> -->
	</head>

	<body>
	<!-- <script defer src="<%=request.getContextPath()%>/plugin/jquery.weather.build.js?parentbox=body&moveArea=all&zIndex=1&move=1&drag=1&autoDrop=0&styleSize=big&style=default&areas=assign&city=%E4%B8%B4%E6%B1%BE"></script> -->
	</body>
</html>
