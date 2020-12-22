<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="taglibs.jspf"%>
<script>
	var CTX = "${ctx}";
	var ctx = "${ctx}";
</script>
<header data-am-widget="header" class="am-header am-header-default">
	<div class="am-header-left am-header-nav">应用设计平台</div>
	<div class="am-header-right am-header-nav"
		style="font-size: 14px; padding-right: 20px;">
		<div class="am-dropdown" data-am-dropdown>
			<button class="am-btn am-btn-primary am-dropdown-toggle"
				data-am-dropdown-toggle>
				${name } <span class="am-icon-caret-down"></span>
			</button>
			<ul class="am-dropdown-content" style="margin-top:2px;min-width:100%;">
				<li><a href="#"><span class="am-icon-commenting"></span>&nbsp;我的消息(<font color="red">20</font>)</a></li>
				<li><a href="#"><span class="am-icon-cog"></span>&nbsp;账号设置</a></li>
				<li><a href="logout.html"><span class="am-icon-power-off"></span>&nbsp;退出</a></li>
			</ul>
		</div>
	</div>
</header>