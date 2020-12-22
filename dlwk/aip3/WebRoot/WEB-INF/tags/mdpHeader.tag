<%@ tag language="java" pageEncoding="UTF-8"%>
<%@tag import="com.digitalchina.ldp.common.constant.Constant"%>
<%@tag import="com.digitalchina.ldp.bean.UserInfo"%>
<%@tag import="com.digitalchina.ldp.app.ums.bean.ResourceInfo"%>
<%@attribute name="title" type="java.lang.String" required="false" %>
<%@attribute name="index" type="java.lang.Boolean" required="false" %>
<%@attribute name="curItem" type="java.lang.String" required="false" %>
<%@attribute name="hideHead" type="java.lang.Boolean" required="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <title>${title}</title>
    <!-- 提前引入jquery，以便被使用 -->
    <script type="text/javascript" src="${ctx}/resources/jquery/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="${ctx}/resources/smoothscroll/smoothscroll.js"></script>
    <script type="text/javascript" src="${ctx}/resources/ace/assets/js/bootbox.min.js"></script>
    <%@include file="../page/common/import-css-welcome.jspf"%>
    <%-- <link rel="stylesheet" href="${ctx }/resources/ace/assets/css/ace.min.css" /> --%>
    <link rel="stylesheet" href="${ctx }/page/base/css/front-base.css" />
    <script type="text/javascript" src="${ctx }/page/base/js/common.js"></script>
	<script type="text/javascript">
		var ctx="${ctx}";
	</script>
</head>
<body id="body" class="page">
<c:if test="${!hideHead}">
<div id="head" class="head">
	<div class="logo">信息资产管理平台V3.0</div>
	<img class="menu" src="${ctx }/resources/images/menu.png" onclick="showMenu();">
	<a class="basket" title="资源车" href="${ctx }/mdp/welcome/application/my_basket.html">
		<span>0</span>
	</a>
	<div class="theme_op_container">
		<a class="theme_op_target" href="javascript:void(0);"><i class="fa fa-picture-o fa-lg" style="margin-top:9px;"></i></a>
		<ul class="theme_op_box">
			<li class="cur">
				<a href="javascript:void(0);">风格1</a>
			</li>
			<li>
				<a href="javascript:toggleTheme('newWelcome');">风格2</a>
			</li>
		</ul>
	</div>
	<ul class="head_right">		
		<li>
			<img src="${ctx }/resources/images/menu_close.png" onclick="closeMenu();">
		</li>
		<!-- <li class="basket">
			<a href="javascript:void(0)"></a>
		</li> -->
		<li class="login">
			<%
				UserInfo user=(UserInfo)session.getAttribute(Constant.USER_SESSION_ID);
				if(user==null)
				{
			%>
				<a id="login_btn" href="${ctx }/mdp/login.html">登录</a>
			<%
				}
				else
				{
					request.setAttribute("user",user);
			%>
				<div class="login_info">				
				<div class="login_user">
					<span id="userName"><%=user.getName() %></span>，欢迎你！
				</div>
				<%
					ResourceInfo resource=(ResourceInfo)user.getResource();
					if(resource.getNodes()!=null)
					{
				%>	
						<a class="go_management" href="javascript:void(0);" target="_blank">应用管理</a>
				<%
					}
				%>
				<div class="user_op_container">
					<a class="user_op_target" style="margin-bottom: 10px;" href="javascript:void(0);">1</a>
					<ul class="user_op_box">						
						<li>
							<a href="javascript:void(0);" id="edit-user-info-btn" userid="${user.userId }">个人中心</a>
						</li>
						<li>
							<a href="javascript:void(0);" id="my-application"  onclick="location.href= ctx + '/mdp/admin/application/myTodoList.html?type=myApplication';" >我的需求</a>
							
						</li>
						<li>
							<a href="javascript:void(0);" id="edit-password-btn" userid="${user.userId }">修改密码</a>
						</li>						
						<li>
							<a id="log-out-btn" href="${ctx }/mdp/logout.html">退出</a>
						</li>
					</ul>
				</div>
				
			</div>
			<%
				}
			%>
			
			
		</li>		
	</ul>
	<a class="top" data-target="head" title="回到顶部" href="javascript:void(0)"></a>
</div>
<nav class="top_nav_menu">
	<ul>
		<li <c:if test="${curItem=='home' }">class="cur"</c:if> >
			<i class="symbol "></i><a href="${ctx }/">首页</a><i class="symbol "></i>
		</li>
		<li <c:if test="${curItem=='mulu' }">class="cur"</c:if>>
			<i class="symbol "></i>
			<a href="${ctx }/mdp/welcome/resourceCatalog/query.html">信息资源目录</a>			
			<!-- 二级菜单 -->
			<ul class="child_nav">
				<li>
					<a href="${ctx }/mdp/welcome/resourceCatalog/query.html">信息资源申请</a>
					<%-- <i class="fa fa-angle-down white"></i>		
					<ul class="">
						<li class="cur"><a href="${ctx }/mdp/welcome/resourceCatalog/query.html">信息资源查询</a></li>
						<li><a href="${ctx }/mdp/welcome/resourceCatalog/view.html">资源目录可视化</a></li>
					</ul>
					--%>
				</li>
				<li>
					<a href="javascript:void(0);">信息资源可视化</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/resourceCatalog/view.html">信息资产业务可视化</a></li>
						<li><a href="${ctx }/mdp/welcome/achievements_view/index.html">资源梳理成果可视化</a></li>
						<li><a href="${ctx }/mdp/welcome/model/index.html">资源可视化模型库</a></li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0);">资源建设成果示范</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a target="_blank" href="${ctx }/page/welcome/sample/index.html">成都政务大数据中心</a></li>
						<%-- <li><a target="_blank" href="${ctx }/page/welcome/changshu_app/index.html">常熟数据中心项目</a></li> --%>
					</ul>
				</li>
				<%-- <li>
					<a href="${ctx }/mdp/welcome/model/index.html">模型库</a>
				</li>--%>
			</ul>	
			<i class="symbol "></i>		
		</li>
		<li <c:if test="${curItem=='information' }">class="cur"</c:if>>
			<i class="symbol "></i>
			<a href="${ctx }/mdp/welcome/api/index.html">信息资源实体数据</a>			
			<ul class="child_nav">
				<li>
					<a href="${ctx }/mdp/welcome/api/index.html">API数据服务申请</a>
				</li>
				<li>
					<a href="${ctx }/mdp/welcome/entity_store/index.html">数据可视化应用仓库</a>
				</li>
				<li>
					<a href="javascript:void(0);">数据应用模型库</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a target="_blank" href="${ctx }/mdp/portrait/index.html">个人画像</a></li>						
						<li><a target="_blank" href="${ctx }/mdp/welcome/corporatePortrait/index.html">企业画像</a></li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0);">数据可视化建设成果示范</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a target="_blank" href="${ctx }/page/welcome/xuzhou_app/index.html">徐州数据中心项目</a></li>
						<li><a target="_blank" href="${ctx }/page/welcome/changshu_app/index.html">常熟数据中心项目</a></li>
					</ul>
				</li>
				<!-- 
				<li>
					<a  href="${ctx }/mdp/portrait/index.html" target="_blank">个人画像</a>
				</li>
				
				<li>
					<a href="${ctx }/page/welcome/example/dali/travelMap.html" target="_blank">大理旅游示范</a>
				</li>
				<li>
					<a href="${ctx }/page/welcome/sample/cd.html" target="_blank">成都地图</a>
				</li>
				 -->
			</ul>
			<i class="symbol "></i>
		</li>
		<li <c:if test="${curItem=='management' }">class="cur"</c:if>>
			<i class="symbol "></i>
			<%-- <a href="${ctx }/mdp/welcome/dataManagementAndMonitor/metadataManagement.html">信息资源数据监控</a> --%>
			<a href="${ctx }/mdp/welcome/erRelation/erRelation.html">数据治理</a>
			
			<ul class=child_nav>
				<li>
					<a href="${ctx }/mdp/welcome/erRelation/erRelation.html">元数据视图</a>
				</li>
				<li>
					<a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataExchangeOverall.html">数据监控全局视角</a>
				</li>
				<li>
					<a>数据监控交换过程</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/frontData.html">前置交换节点数据</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/frontFile.html">前置交换节点文件</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/centerData.html">中心交换节点数据</a></li>
					</ul>
				</li>
				<li>
					<a>数据监控处理过程</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataHandleQuery.html">ETL数据查看</a></li>
					</ul>
				</li>
				<li>
					<a>数据监控成果应用</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataAchievement.html">数据成果视角</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataUsed.html">数据应用视角</a></li>
					</ul>
				</li>
				<li>
					<a>数据监控查询统计</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataHandleStatistics.html">数据处理过程统计</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataExchangeReport.html">数据交换处理报告</a></li>
					</ul>
				</li>
			</ul>
			<i class="symbol "></i>
		</li>
		<!-- <li <c:if test="${curItem=='api' }">class="cur"</c:if>>
			<i class="symbol "></i>
				<a href="${ctx }/mdp/welcome/api/index.html">API数据服务</a>
			<i class="symbol "></i>
		</li> -->
	</ul>
</nav>
<nav class="right_nav_menu">
	<ul>
		<li <c:if test="${curItem=='home' }">class="cur"</c:if> >
			<i class="symbol "></i><a href="${ctx }/">首页</a><i class="symbol "></i>
		</li>
		<li <c:if test="${curItem=='mulu' }">class="cur"</c:if>>
			<i class="symbol "></i>
			<a href="${ctx }/mdp/welcome/resourceCatalog/query.html">信息资源目录</a>			
			<!-- 二级菜单 -->
			<ul class="child_nav">
				<li>
					<a href="${ctx }/mdp/welcome/resourceCatalog/query.html">信息资源申请</a>
					<%-- <i class="fa fa-angle-down white"></i>		
					<ul class="">
						<li class="cur"><a href="${ctx }/mdp/welcome/resourceCatalog/query.html">信息资源查询</a></li>
						<li><a href="${ctx }/mdp/welcome/resourceCatalog/view.html">资源目录可视化</a></li>
					</ul>
					--%>
				</li>
				<li>
					<a href="javascript:void(0);">信息资源可视化</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/resourceCatalog/view.html">信息资产业务可视化</a></li>
						<li><a href="${ctx }/mdp/welcome/achievements_view/index.html">资源梳理成果可视化</a></li>
						<li><a href="${ctx }/mdp/welcome/model/index.html">资源可视化模型库</a></li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0);">资源建设成果示范</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a target="_blank" href="${ctx }/page/welcome/sample/index.html">成都政务大数据中心</a></li>
						<%-- <li><a target="_blank" href="${ctx }/page/welcome/changshu_app/index.html">常熟数据中心项目</a></li> --%>
					</ul>
				</li>
				<%-- <li>
					<a href="${ctx }/mdp/welcome/model/index.html">模型库</a>
				</li>--%>
			</ul>	
			<i class="symbol "></i>		
		</li>
		<li <c:if test="${curItem=='information' }">class="cur"</c:if>>
			<i class="symbol "></i>
			<a href="${ctx }/mdp/welcome/api/index.html">信息资源实体数据</a>			
			<ul class="child_nav">
				<li>
					<a href="${ctx }/mdp/welcome/api/index.html">API数据服务申请</a>
				</li>
				<li>
					<a href="${ctx }/mdp/welcome/entity_store/index.html">数据可视化应用仓库</a>
				</li>
				<li>
					<a href="javascript:void(0);">数据应用模型库</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a target="_blank" href="${ctx }/mdp/portrait/index.html">个人画像</a></li>						
						<li><a target="_blank" href="${ctx }/mdp/welcome/corporatePortrait/index.html">企业画像</a></li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0);">数据可视化建设成果示范</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a target="_blank" href="${ctx }/page/welcome/xuzhou_app/index.html">徐州数据中心项目</a></li>
						<li><a target="_blank" href="${ctx }/page/welcome/changshu_app/index.html">常熟数据中心项目</a></li>
					</ul>
				</li>
				<!-- 
				<li>
					<a  href="${ctx }/mdp/portrait/index.html" target="_blank">个人画像</a>
				</li>
				
				<li>
					<a href="${ctx }/page/welcome/example/dali/travelMap.html" target="_blank">大理旅游示范</a>
				</li>
				<li>
					<a href="${ctx }/page/welcome/sample/cd.html" target="_blank">成都地图</a>
				</li>
				 -->
			</ul>
			<i class="symbol "></i>
		</li>
		<li <c:if test="${curItem=='management' }">class="cur"</c:if>>
			<i class="symbol "></i>
			<%-- <a href="${ctx }/mdp/welcome/dataManagementAndMonitor/metadataManagement.html">信息资源数据监控</a> --%>
			<a href="${ctx }/mdp/welcome/erRelation/erRelation.html">数据治理</a>
			
			<ul class=child_nav>
				<li>
					<a href="${ctx }/mdp/welcome/erRelation/erRelation.html">元数据视图</a>
				</li>
				<li>
					<a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataExchangeOverall.html">数据监控全局视角</a>
				</li>
				<li>
					<a>数据监控交换过程</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/frontData.html">前置交换节点数据</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/frontFile.html">前置交换节点文件</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/centerData.html">中心交换节点数据</a></li>
					</ul>
				</li>
				<li>
					<a>数据监控处理过程</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataHandleQuery.html">ETL数据查看</a></li>
					</ul>
				</li>
				<li>
					<a>数据监控成果应用</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataAchievement.html">数据成果视角</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataUsed.html">数据应用视角</a></li>
					</ul>
				</li>
				<li>
					<a>数据监控查询统计</a>
					<i class="fa fa-angle-down white"></i>
					<ul class="">
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataHandleStatistics.html">数据处理过程统计</a></li>
						<li><a href="${ctx }/mdp/welcome/dataManagementAndMonitor/dataExchangeReport.html">数据交换处理报告</a></li>
					</ul>
				</li>
			</ul>
			<i class="symbol "></i>
		</li>
		<!-- <li <c:if test="${curItem=='api' }">class="cur"</c:if>>
			<i class="symbol "></i>
				<a href="${ctx }/mdp/welcome/api/index.html">API数据服务</a>
			<i class="symbol "></i>
		</li> -->
	</ul>
</nav>
</c:if>