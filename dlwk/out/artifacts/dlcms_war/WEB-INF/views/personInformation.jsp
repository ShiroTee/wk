<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
   String basePath =  request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8;">
<title>个人信息 - 大理市信息资源管理中心</title>

<link href="<%=basePath%>r/cms/Css/base.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/footer.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/tooltips.css" rel="stylesheet" type="text/css" />

<script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
<script src="<%=basePath%>r/cms/Js/simplefoucs.js" type="text/javascript"></script>
<script src="<%=basePath%>ap/js/globalInterfaceDomain.js" type="text/javascript"></script>
<script src="<%=basePath%>resourceList/Js/utils.js" type="text/javascript"></script>
<script src="<%=basePath%>resourceList/Js/personInformation.js" type="text/javascript"></script>

<!-- 分页控件开始 -->
<script type="text/javascript" src="<%=basePath%>r/cms/pager/js/kkpager.min.js"></script>
<link href="<%=basePath%>r/cms/pager/css/kkpager.css" rel="stylesheet" type="text/css" />

<script type="text/javascript">
	var userId = "${userId}";
	function getGrURL() {
		return "${platformAdd}/service/api/csdsc/";
	}
	function getUmURL() {
		return "${platformAdd}/app/http/ums/";
	}
</script>
<style type="text/css">
	.btn1 {width:84px;height:21px;background:#f7b530;font-size:12px;color:#fff;vertical-align:middle;border:0;line-height:21px;margin-right:16px;}
	.grxx {margin: 30px;}
</style>

</head>
<body>
<%@ include file="include/head.jsp"%>
<script type="text/javascript">
$("#grxx").addClass("current2");
</script>
<div class="warp_content">
	<div class="warp_tit">您现在正在浏览： 
	<a href="/">首页</a>
	<span>&gt;</span><a href="/csdsc/personInformationAct.jhtml">个人信息</a>
	<span>&gt;</span>基本信息
	</div>

	<div class="warp_left">
    <h2>个人信息</h2>
	<ul>
		<li><a class="current" href="/csdsc/personInformationAct.jhtml"> 基本信息 </a></li>
		<li><a href="/csdsc/myApprovalAct"> 我的申请 </a></li>
		<li><a href="/csdsc/myTodoAct?type=1"> 我的待办 </a></li>
		<li><a href="/csdsc/myTodoAct?type=2"> 我的已办 </a></li>
		<li><a href="/csdsc/myCountAct"> 我的统计 </a></li>
	</ul>
	</div>

	<div class="warp_right">
		<div class="tit">
        	<h3><label id="bt">基本信息</label></h3>
        </div>
		<div class="grxx" style="line-height:35px; font-size:16px; text-indent:2em; padding:10px 0;">
					<table  id="pt2" cellspacing="0" border="1" style="width: 100%">
						<tbody>
							<tr>
								<td class="one">账号 ：  </td>
								<td class="two" style="width: 300px;"><span id="loginName">${userloginName}</span></td>
							</tr>
							<tr>
								<td class="one">姓名 ：  </td>
								<td class="two" style="width: 300px;"><span id="name">${userName}</span></td>
							</tr>
							
							<tr>
								<td class="one">所属委办局 ：  </td>
								<td class="two" style="width: 300px;"><span id="orgName">${rdpUserOrg}</span></td>
							</tr>
							<tr>
								<td class="one">联系电话 ：  </td>
								<td class="two" id="userPhone">${rdpPhoneNumber}</td>
							</tr>
							<tr>
								<td class="one">联系地址 ：  </td>
								<td class="two" style="width: 300px;" id="adr">${rdpUnerAddr}</td>
							</tr>
						</tbody>
					</table>
					<input  type="button" class="btn1" value="修改密码" align="left" onclick="$('#showDiv').css('display','block');$('#litDiv').css('display','block');"/>
					
			<!-- 蒙层开始 -->
			<div id="showDiv" style="display:none;width: 100%;height: 100%;background-color: #666666;position: fixed;left: 0px; top: 0px;filter:alpha(opacity=60);opacity:0.6;z-index:10;"></div>
    		<!-- 蒙层块 -->
    		<div id="litDiv" style="display:none;width: 420px; height:150px;left:30%; top:30%; position:fixed;z-index:12;background: url('<%=basePath%>r/cms/Images/tanchu.jpg') #fff;">
    			<table style="margin: 30px auto">
    				<tr class="ps" >
								<td class="one">原始密码 ：  </td>
								<td class="two"><input style="border:1px solid #B5B8C8" id="oldPassword" type="text"></td>
							</tr>
							<tr class="ps" >
								<td class="one">新密码 ：  </td>
								<td class="two"><input style="border:1px solid #B5B8C8" id="newPassword" type="text"></td>
							</tr>
							<tr>
								<td colspan="2">
								<input  type="button" class="btn1" value="保存" align="left" onclick="editPassword()"/>
								<input  type="button" class="btn1" value="取消" onclick="$('#showDiv').css('display','none');$('#litDiv').css('display','none');"/>
								</td>	
							</tr>
							
    			</table>
    		</div>
			<!-- 蒙层结束 -->
			<input  type="button" class="btn1" value="修改电话/地址" align="left" onclick="$('#showDiv2').css('display','block');$('#litDiv2').css('display','block');"/>
			<!-- 蒙层开始 -->
			<div id="showDiv2" style="display:none;width: 100%;height: 100%;background-color: #666666;position: fixed;left: 0px; top: 0px;filter:alpha(opacity=60);opacity:0.6;z-index:10;"></div>
			<!-- 蒙层块 -->
			<div id="litDiv2" style="display:none;width: 420px; height:150px;left:30%; top:30%; position:fixed;z-index:12;background: url('<%=basePath%>r/cms/Images/tanchu.jpg') #fff;">
				<table style="margin: 30px auto">
					<tr class="ps" >
						<td class="one">新电话 ：  </td>
						<td class="two"><input style="border:1px solid #B5B8C8" id="newPhone" type="text" value="${rdpPhoneNumber}"></td>
					</tr>
					<tr class="ps" >
						<td class="one">新地址 ：  </td>
						<td class="two"><input style="border:1px solid #B5B8C8" id="newAddr" type="text" value="${rdpUnerAddr}"></td>
					</tr>
					<tr>
						<td colspan="2">
							<input  type="button" class="btn1" value="保存" align="left" onclick="editUserInfo()"/>
							<input  type="button" class="btn1" value="取消" onclick="$('#showDiv2').css('display','none');$('#litDiv2').css('display','none');"/>
						</td>
					</tr>

				</table>
			</div>
			<!-- 蒙层结束 -->
		</div> 
	</div>  
</div> 

</body>
<%@ include file="include/bottom.jsp"%>
</html>