<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.digitalchina.ldp.bean.*"%>
<%@ page import="com.digitalchina.ldp.app.sys.bean.*"%>
<%@ page import="com.digitalchina.ldp.app.sys.service.*"%>
<%@ page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.bean.Model"%>
<%@ page import="com.alibaba.fastjson.JSON"%><%@page
	import="com.digitalchina.ldp.common.util.StringUtils"%>
<%@ page
	import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setCharacterEncoding("UTF-8");
	String appCode  = "";
	String appCode_ = "";
	String path=request.getServletPath();
	String arrays[] = path.split("/");
	
	if(arrays.length >= 4) {
		if(arrays[1].equals("plugin")) {
	appCode = "plugin/"+arrays[2];
	appCode_=arrays[2];
		}
	}
	request.setAttribute("appCode_",appCode_);

	AppIconService appIconService = (AppIconService) WebApplicationContextUtils
	.getWebApplicationContext(pageContext.getServletContext())
	.getBean(AppIconService.class);
	UserSettingService userSettingService = (UserSettingService) WebApplicationContextUtils
	.getWebApplicationContext(pageContext.getServletContext())
	.getBean(UserSettingService.class);
	BackgroundImageService backgroundImageService = (BackgroundImageService) WebApplicationContextUtils
	.getWebApplicationContext(pageContext.getServletContext())
	.getBean(BackgroundImageService.class);

	Model model = new Model(request, response);
	UserInfoBean user = (UserInfoBean) session
	.getAttribute(Constant.USER_SESSION_ID);
	model.getSystemModel().setUser(user);
	request.setAttribute("user",user);
	List<AppIconBean> icons = (List<AppIconBean>) appIconService
	.listAppIconOfUser(model);
	List<BackgroundImageBean> images = (List<BackgroundImageBean>)backgroundImageService.listBackgroundImage(model).getList();
	UserSettingBean setting = userSettingService.load(model);
	if (setting == null) {
		setting = new UserSettingBean();
	}
	request.setAttribute("setting",setting);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>${initParam.pageTitle }</title>
<link rel="stylesheet" href="css/index/set.css" type="text/css"
	media="all">
<script type="text/javascript" src="javascript/index/jquery.min.js"></script>
<script type="text/javascript"
	src="javascript/index/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="javascript/index/interface.js"></script>
<!--[if IE 6]>
	<script type="text/javascript" src="javascript/index/DD_belatedPNG_0.0.8a.js" ></script>
	<script type="text/javascript">
	DD_belatedPNG.fix('div,a,ul,li,span,td,img');
	</script>
<![endif]-->
<script type='text/javascript'
	src='javascript/index/jquery.simplemodal.js'></script>
<script src="javascript/index/simplefoucs.js" type="text/javascript"></script>
<script src="javascript/index/index.js"></script>
<script src="javascript/app_common.js"></script>
<script type='text/javascript'>
	var appCode = "${appCode_}";
	var liquids =
<%=JSON.toJSONString(setting.getLiquidIconSequence() == null ? Collections.emptyList():setting.getLiquidIconSequence().split(","))%>
	;
	var solids =
<%=JSON.toJSONString(setting.getSolidIconSequence() == null ? Collections.emptyList():setting.getSolidIconSequence().split(","))%>
	;
	var icons =
<%=JSON.toJSONString(icons)%>
	;
	var images =
<%=JSON.toJSONString(images)%>
	;
	var image = "${setting.backgroundImageUrl}";
</script>
</head>
<body>
	<div class="header">
		<div id="logo"></div>
		<div class="header_right">
			<div style="margin-top: -3px; margin-right: 5px;" class="search_div">
				<input type="text" id="searchBox" />
				<button id="search" title="搜索"
					onclick="appSearch($('#searchBox').val());"></button>
			</div>
			<a href="#none" onclick="appList();" id="system" title="设置"></a> <a
				href="javascript:void(0);" id="user" title="用户"></a><a title=皮肤
				id=skin href="javascript:void(0);"></a>
			<div class="dropdownMenu" id="userMenu" style="display: none">
				<a href="#none" onclick="userInfo();"><i
					class="icon_user_information"></i>个人信息</a> <a href="#none"
					onclick="passwd1();"><i class="icon_account_security"></i>修改密码</a>
				<a
					onclick="if (confirm('确定要退出吗？') === true) {window.location.href='logout.jsp';return false} else return false;"
					href="#none" target="_top"><i class="icon_signout"></i>退出</a>
				<div class="claer"></div>
			</div>
			<div class="dropdownMenu" id="imageMenu" style="display: none">
				<div class="claer"></div>
			</div>
		</div>
	</div>
	<div id="desktop" style="margin-top: 38px;">
		<img class="backgroundImage" />
		<div class="index_div">
			<div id="desktop_solid_gallery"></div>

			<div id="index_center">
				<div id="times"></div>
				<div id="weather"></div>
			</div>

			<div id="news">
				<h1>通知公告</h1>
				<ul>
					<li><a href="#">题目题目题目题目</a><span>2013-12-12</span>
						<p>摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要</p></li>
					<li><a href="#">题目题目题目题目</a><span>2013-12-12</span>
						<p>摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要</p></li>
				</ul>
			</div>
		</div>
		<div id="desktop_liquid">
			<div id="desktop_liquid_gallery" class="gallery">
				<ul id="slides">
					<%
						for (int i = 0; i < 100 && false; i++) {
					%>
					<a title="3" class="unlock" id="<%=i%>" url="#none"><img
						src="/download/SPZL/GR-01/sys/2013/11/25/icon1.png"><span><%=i%></span><b></b></a>
					<%
						}
					%>
				</ul>
			</div>
		</div>
	</div>
	<div id="tabs">
		<div id="app_list" class="tab" style="display: none;">
			<img class="backgroundImage" />
			<div id="screen_modal"></div>
			<div id="app_list_gallery" class="gallery">
				<ul id="slides">
					<%
						for (int i = 0; i < 100 && false; i++) {
					%>
					<a title="3" class="unlock" id="<%=i%>" url="#none"><img
						src="/download/SPZL/GR-01/sys/2013/11/25/icon1.png"><span><%=i%></span><b></b></a>
					<%
						}
					%>
				</ul>
			</div>
		</div>
		<div id="image_list" class="tab" style="display: none;">
			<div id="image_list_gallery" class="gallery">
				<ul id="slides"></ul>
			</div>
		</div>
	</div>
	<div id="userInfo" class="popWindow">
		<h3>个人信息</h3>
		<div id="div_con">
			<form id="userInfoForm" enctype="multipart/form-data" action=""
				method="post" target="theID">
				<table>
					<tr>
						<td><table>
								<tr>
									<td style="display: block; margin: 20px;" id="titleImage1"><img
										width="100px" src="/download/${user.photoPath }"
										onerror="this.style.visiblity='hidden';" /></td>
									<td style="display: none; margin: 20px;" id="titleImage2"><img
										width="100px" src="/download/${user.photoPath }"
										onerror="this.style.visiblity='hidden';" /></td>
								</tr>
								<tr style="display: none;" id="titleImageUpload">
									<td><input style="width: 100px; margin-left: 20px;"
										type="file" name="fileAddress" onchange="imageCheck(this)" /></td>
								</tr>
							</table></td>
						<td><table>
								<tr>
									<td style="padding: 10px;">姓名：</td>
									<td style="padding: 10px;">${user.name }</td>
								</tr>
								<tr>
									<td style="padding: 10px;">所处机构：</td>
									<td style="padding: 10px;">${user.orgInfo.orgName }</td>
								</tr>
								<tr>
									<td style="padding: 10px;">所属委办局：</td>
									<td style="padding: 10px;"></td>
								</tr>
								<tr>
									<td style="padding: 10px;">电子邮箱</td>
									<td style="padding: 10px; display: none;" id="emailAddress2"><input
										id="emailAddress" name="emailAddress" type="text"
										value=${user.email } /></td>
									<td style="padding: 10px; display: block;" id="emailAddress1">${user.email }</td>
								</tr>
								<tr>
									<td style="padding: 10px;">电话号码</td>
									<td style="padding: 10px; display: none;" id="telphone2"><input
										id="telphone" name="telphone" type="text" value=${user.phone } /></td>
									<td style="padding: 10px; display: block;" id="telphone1">${user.phone }</td>
								</tr>
								<tr>
									<td colspan="1" align="center">
										<div class="btn_div">
											<button class="btn" type="button" onclick="modify();">修改</button>
										</div>
									</td>
									<td colspan="1" align="center">
										<div class="btn_div">
											<button id="saveButton" class="btn" onclick="saveModify();"
												disabled="disabled">保存</button>
										</div>
									</td>
								</tr>
							</table></td>
					</tr>
				</table>
			</form>
			<iframe name="theID" style="display: none;"></iframe>
		</div>
	</div>


	<div id="passwd" class="popWindow">
		<h3>修改密码</h3>
		<div id="div_con">
			<table>
				<tr>
					<td style="padding: 10px;">输入就密码：</td>
					<td style="padding: 10px;"><input type="password"
						id="passwd_old" /></td>
				</tr>
				<tr>
					<td style="padding: 10px;">输入新密码：</td>
					<td style="padding: 10px;"><input type="password"
						id="passwd_new" /></td>
				</tr>
				<tr>
					<td style="padding: 10px;">重复新密码：</td>
					<td style="padding: 10px;"><input type="password"
						id="passwd_new2" /></td>
				</tr>
				<tr>
					<td colspan="2" align="center">
						<div class="btn_div">
							<button class="btn" onclick="passwd2();">确定</button>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>