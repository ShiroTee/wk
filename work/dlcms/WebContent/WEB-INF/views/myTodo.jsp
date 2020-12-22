<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<% String basePath = request.getContextPath() + "/";%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8;">
<title>信息资源目录 - 大理市信息资源管理中心</title>
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
<script src="<%=basePath%>resourceList/Js/myTodo.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="<%=basePath%>thirdparty/My97DatePicker/WdatePicker.js"></script>

<!-- 分页控件开始 -->
<script type="text/javascript" src="<%=basePath%>r/cms/pager/js/kkpager.min.js"></script>
<link href="<%=basePath%>r/cms/pager/css/kkpager.css" rel="stylesheet" type="text/css" />
<!-- 分页控件代码结束 -->

<style type="text/css">
/* 新增*/
table {width:100%;border-bottom:0px;text-align:center;background:#c1c1c1;}
table tr {height:38px;line-height:38px;}
table tr:hover td {background: #f8fbfe;}
table th {background:url(<%=basePath%>r/cms/Images/th_bg.jpg) repeat-x;}
table td {background:#fff;}
table.table_int {width:94%;border-collapse:collapse;border:1px #c1c1c1 solid;background:#fff;margin:0 auto;}
table.table_int tr {height:38px;line-height:38px;}
table.table_int .one {background:#ebf8fe;border-collapse:collapse;border:1px #c1c1c1 solid;padding:3px;text-align:right;}
table.table_int td {text-align:left;padding:3px;border-collapse:collapse;border:1px #c1c1c1 solid;}
table.table_int td input {height:24px;line-height:24px;border:1px #ddd solid;}
table.table_int td input.rd {height: 24px;line-height: 24px;border: 0px #ddd solid;vertical-align: middle;}

.newchaxun12 {width:auto;height:30px;border:1px solid #adcde7;border-bottom:0px;padding-top:10px;text-align:right;}
.newchaxun12 .text {width:134px;height:18px;border:1px solid #b5b8c8;margin:0 5px;background:url(<%=basePath%>r/cms/Images/input_bg.jpg) repeat-x;color:#b3b3b3;padding-left:10px;}
.newchaxun12 .sousuo{background:url(<%=basePath%>r/cms/Images/sousuo.jpg) no-repeat;width:50px;height:21px;margin:0 19px 0 13px;}
.newchaxun12 .bttn{background: url(<%=basePath%>r/cms/Images/chaxun2.jpg) no-repeat;width:84px;height:21px;line-height:21px;padding-left:25px;margin-right:16px;font-size:12px;}
.newchaxun12 .btn{background: url(<%=basePath%>r/cms/Images/chaxun.jpg) no-repeat;width: 83px;height: 21px;margin: 0 5px;}
.newchaxun12 .btn1{background:#f7b530;width:84px;height:21px;line-height:21px;margin-right:16px;font-size:12px;color:#fff;border:0;vertical-align:middle;}

.newchaxun {height: 60px;width: auto;border: 1px solid #adcde7;border-bottom: 0px;padding-top: 10px;}
.newchaxun .text{width: 134px;height: 18px;border: 1px solid #b5b8c8;margin: 0 5px;background: url(<%=basePath%>r/cms/Images/input_bg.jpg) repeat-x;color: #b3b3b3;padding-left: 10px;}
.newchaxun .sousuo{background: url(<%=basePath%>r/cms/Images/chaxun2.png) no-repeat;width: 70px;height: 21px;}
.newchaxun .chongzhi{background: url(<%=basePath%>r/cms/Images/chongzhi2.png) no-repeat;width: 70pxheight: 21px;}
.newchaxun .bttn{background: url(<%=basePath%>r/cms/Images/chaxun2.jpg) no-repeat;width: 84px;height: 21px;line-height: 21px;font-size: 12px;}
.newchaxun .btn{background: url(<%=basePath%>r/cms/Images/chaxun.jpg) no-repeat;width: 83px;height: 21px;}
.newchaxun .btn1{background: #f7b530;width: 84px;height: 21px;line-height: 21px;margin-right: 16px;font-size: 12px;color: #fff;border: 0;vertical-align: middle;}

.closeBtn {float: right;padding: 8px 8px 0px 0px;}

.cksqxq {width: 700px;background: #fff url(<%=basePath%>r/cms/Images/tanchu3.jpg) no-repeat;display: none;position: fixed;z-index: 1002;}
.cksqxq .btn1{background: #f7b530;width: 84px;height: 21px;line-height: 21px;margin-right: 16px;font-size: 12px;color: #fff;border: 0;vertical-align: middle;}
.cksqxq  .btn2 {background: #188FE4;width: 84px;height: 21px;line-height: 21px;margin-right: 16px;font-size: 12px;color: #fff;border: 0;vertical-align: middle;}
.cksqxq h2 {font-size: 16px;color: #164a9c;font-weight: normal;text-align: left;height: 40px;line-height: 40px;}
.cksqxq  .tablea {width: 690px;border-spacing: 0;padding-left: 1px;}
.cksqxq table td.one {width: 20%;height: 28px;line-height: 28px;text-align: right;}
.cksqxq table td.two {width: 75%;height: 28px;line-height: 28px;text-align: left;}
.cksqxq  .tablea  .input1 {width: 160px;height: 16px;border: 1px solid #c1c1c1;padding-left: 5px}
.cksqxq  .tablea  .input2 {width: 320px;height: 16px;border: 1px solid #c1c1c1;padding-left: 5px}
.cksqxq  .tablea  .btn {background: url(<%=basePath%>r/cms/Images/wuwu_but_bg.jpg) no-repeat;width: 83px;height: 21px;margin: 0 5px;}

#tabMenu {background: url(<%=basePath%>r/cms/Images/tit_bg.jpg) repeat-x;height: 33px;line-height: 33px;color: #000;width: 94%;margin: 0 auto;}
#tabMenu li {cursor: pointer;margin: 1px 0 0 1px;border-right: 1px solid #a2c5e1;float: left;height: 32px;text-align: center;width: 105px;}
#tabMenu li.current {background: url(<%=basePath%>r/cms/Images/current.jpg) no-repeat;color: #fff;font-weight: bold;}
#tabPanel ul {padding-top: 5px;}
#tabPanel ul li {height: 35px;background: url(<%=basePath%>r/cms/Images/line_bot.jpg) repeat-x left bottom;line-height: 35px;}
#tabPanel ul li a {background: url(<%=basePath%>r/cms/Images/dot.jpg) no-repeat left center;padding-left: 10px;margin-left: 12px;}
#tabPanel ul li a:hover {text-decoration: underline;}
#tabPanel ul li span {color: #b2b2b2;float: right;margin-right: 15px;}
.btn_div {width: 100%;height: 40px;line-height: 40px;text-align: center;}
</style>

<script type="text/javascript">
	var userId ="${userId}";
	function getGrURL (){
		return "${platformAdd}/service/api/sps/";
	}
	var showa = ${type};
	var act;
	if (showa == 1)
		act = "getTodoListForService";
	else if (showa == 2)
		act = "getDoneList";
	else if (showa == 3)
		act = "queryForService";
	var userId = "${userId}";
	$(document).ready(function($) {
		$("#tabMenu").tabso({ // 要切换的标签
			cntSelect : "#tabPanel", // 要切换的内容
			tabEvent : "click", // 要触发的事件
			tabStyle : "fade", // 要实现的动画效果
			onStyle : "current" // 添加样式
		});
		$("#qixiao").click(function(){
			$("#model1").hide();
			$("#fade").hide();
		});
	});
</script>
</head>
<body>
	<div id="fade" class="black_overlay"></div>
	<%@ include file="include/head.jsp"%>
	<script type="text/javascript">
$("#grxx").addClass("current2");
</script>
	<!--内容开始-->
	<div class="warp_content">

		<div class="warp_tit">您现在正在浏览：
			<a href="/">首页</a>
			<span>&gt;</span>
			<a href="/csdsc/personInformationAct.jhtml">个人信息</a>
			<span>&gt;</span>我的申请
		</div>
		<div class="warp_left">
			<h2>个人信息</h2>
			<ul>
				<li><a href="/csdsc/personInformationAct.jhtml">基本信息</a></li>
				<li><a href="/csdsc/myApprovalAct">我的申请</a></li>
				<c:if test="${type==1}">
					<li><a class="current" href="/csdsc/myTodoAct?type=1">我的待办 </a></li>
					<li><a href="/csdsc/myTodoAct?type=2"> 我的已办 </a></li>
				</c:if>
				<c:if test="${type==2}">
					<li><a href="/csdsc/myTodoAct?type=1">我的待办</a></li>
					<li><a class="current" href="/csdsc/myTodoAct?type=2">我的已办</a></li>
				</c:if>
				<li><a href="/csdsc/myCountAct">我的统计</a></li>
			</ul>
		</div>
		<div class="warp_right">
			<div class="tit">
				<h3><label id="bt">我的待办</label></h3>
			</div>
			<c:if test="${type==1}">
				<div class="newchaxun12">
					<input id="dy" type="button" class="btn1" value="导出打印" align="left" onclick="dysq()" />
				</div>
			</c:if>
			<c:if test="${type==2}">
				<div class="newchaxun12">
					<input id="dy" type="button" class="btn1" value="导出打印" align="left" onclick="dysq()" />
				</div>
			</c:if>
			<c:if test="${type==3}">
				<script type="text/javascript">
					uon = '${userOrgName}';
				</script>
				<div class="newchaxun">
					<span>申请单位：</span>
					<select style="width: 100px;" id="sqf" name="sqf">
						<option value="">全部</option>
					</select>
					<span style="margin-left: 100px;">资源提供方：</span>
					<c:if test="${userOrgName=='大理市各部门'}">
						<select style="width: 100px;" id="tgf" name="tgf">
							<option value="">全部</option>
						</select>
					</c:if>
					<c:if test="${userOrgName!='大理市各部门'}">
						<select style="width: 100px;" id="tgf" name="tgf"></select>
					</c:if>
					<span style="margin-left: 100px;">申请日期：</span>
					<input id="sqrqstart" readonly="readonly" style="width:100px; background:url(<%=basePath%>thirdparty/My97DatePicker/skin/datePicker.gif) no-repeat right center;" type="text" class="text" onclick="WdatePicker({maxDate:'#F{$dp.$D(\'sqrqend\');}'})" />- 
					<input id="sqrqend" readonly="readonly" style="width:100px;background:url(<%=basePath%>thirdparty/My97DatePicker/skin/datePicker.gif) no-repeat right center;" type="text" class="text" onclick="WdatePicker({minDate:'#F{$dp.$D(\'sqrqstart\');}'})" />
					<br/>
					<span>资源名称：</span> 
					<input id="searchInput" type="text" class="text" />
					<input id="searchBtn" type="button" class="sousuo" style="margin-left: 50px; margin-top: 8px;" /> 
					<input onclick="chongzhi()" id="czBtn" type="button" class="chongzhi" style="margin-left: 45px; margin-top: 8px;" />
					<input style="margin-left: 95px; margin-bottom: 10px;" id="dc" type="button" class="btn1" value="导出Excel" align="left" onclick="dcexcel()" />
					<input style="margin-bottom: 10px;" id="dy" type="button" class="btn1" value="导出打印" align="left" onclick="dysq()" />
				</div>
			</c:if>

			<table id="myApproval" cellspacing="1" class="myApproval">
				<thead>
					<tr>
						<th width="5%"></th>
						<th width="18%">申请人</th>
						<th width="25%">资源名称</th>
						<th width="18%">资源提供方</th>
						<th width="12%">申请日期</th>
						<th width="10%">状态</th>
						<th width="17%">操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>

		<!-- 分页控件开始 -->
		<div id="kkpager" style="margin-top: 3px; margin-bottom: 3px; float: right; margin-right: 15px;"></div>
		<div class="clear"></div>
		<div id="model2" class="cksqxq">
			<img class="closeBtn" src="<%=basePath%>r/cms/Images/close.png" />
			<h2>&nbsp;&nbsp;查看申请详情</h2>
			<br/>
			<table class="table_int">
				<tr>
					<td class="one">申请人:</td>
					<td><input id="proposerName" disabled="disabled" class="input1" /></td>
					<td class="one">信息资源名称:</td>
					<td><input id="assetName" disabled="disabled" class="input1" /></td>
				</tr>
				<tr>
					<td class="one">申请人部门:</td>
					<td><input id="proposerOrgName" disabled="disabled" class="input1" /></td>
					<td class="one">资源提供方:</td>
					<td><input id="ProviderName" disabled="disabled" class="input1" /></td>
				</tr>
				<tr>
					<td class="one">申请日期:</td>
					<td><input id="applyTime" disabled="disabled" class="input1" /></td>
					<td class="one">申请人电话:</td>
					<td><input id="proposerPhone" disabled="disabled" class="input1" /></td>
				</tr>
				<tr>
					<td class="one">当前状态:</td>
					<td colspan="3"><input id="status" disabled="disabled" class="input1" /></td>
				</tr>
				<tr>
					<td class="one">申请说明:</td>
					<td colspan="3"><textarea id="comment" disabled="disabled" rows="3" cols="" style="width: 380px;"></textarea></td>
				</tr>
			</table>
			<br />
			<ul id="tabMenu">
				<li class="current">管理员受理</li>
				<li>资源提供方审批</li>
				<li>管理员授权</li>
			</ul>
			<div id="tabPanel">
				<table id="detailTable1" class="table_int">
					<tr>
						<td class="one">受理人:</td>
						<td class="two"><input id="slr" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">受理时间:</td>
						<td class="two"><input id="slsj" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">受理意向:</td>
						<td class="two"><input id="slyx" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">受理意见:</td>
						<td class="two"><input id="slyj" disabled="disabled" class="input2" /></td>
					</tr>
				</table>
				<table id="detailTable2" class="table_int">
					<tr>
						<td class="one">审批人:</td>
						<td class="two"><input id="spr" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">审批时间:</td>
						<td class="two"><input id="spsj" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">审批意向:</td>
						<td class="two"><input id="spyx" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">审批意见:</td>
						<td class="two"><input id="spyj" disabled="disabled" class="input2" /></td>
					</tr>
				</table>
				<table id="detailTable3" class="table_int">
					<tr>
						<td class="one">授权人:</td>
						<td class="two"><input id="sqr" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">授权时间:</td>
						<td class="two"><input id="sqsj" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">授权意向:</td>
						<td class="two"><input id="sqyx" disabled="disabled" class="input2" /></td>
					</tr>
					<tr>
						<td class="one">授权意见:</td>
						<td class="two"><input id="sqyj" disabled="disabled" class="input2" /></td>
					</tr>
				</table>
			</div>
			<br />
		</div>
		<div id="model1" class="cksqxq">
			<img class="closeBtn" src="<%=basePath%>r/cms/Images/close.png" />
			<h2>&nbsp;&nbsp;<Span id="spztcl">审批处理页面</Span></h2>
			<br/>
			<table class="table_int">
				<tr>
					<td class="one">申请人:</td>
					<td><input id="proposerName1" disabled="disabled" /></td>
					<td class="one">信息资源名称:</td>
					<td><input id="assetName1" disabled="disabled" /></td>
				</tr>
				<tr>
					<td class="one">申请人部门:</td>
					<td><input id="proposerOrgName1" disabled="disabled" /></td>
					<td class="one">资源提供方:</td>
					<td><input id="ProviderName1" disabled="disabled" /></td>
				</tr>
				<tr>
					<td class="one">申请日期:</td>
					<td><input id="applyTime1" disabled="disabled" /></td>
					<td class="one">申请人电话:</td>
					<td><input id="proposerPhone1" disabled="disabled" /></td>
				</tr>
				<tr>
					<td class="one">当前状态:</td>
					<td colspan="3">
						<input id="status1" disabled="disabled" />
						<input id="approval_Id1" type="hidden" />
						<input id="taskId11" type="hidden" />
					</td>
				</tr>
				<tr>
					<td class="one">申请说明:</td>
					<td colspan="3"><textarea id="comment1" disabled="disabled" rows="2" cols="" style="width: 380px;"></textarea></td>
				</tr>
				<tr>
					<td class="one"><span id="yxzd"></span>意向:</td>
					<td colspan="3">
						<input type="radio" class="rd" name="decision1" value="同意" checked="checked" />同意 
						<input type="radio" class="rd" name="decision1" value="不同意" />不同意
					</td>
				</tr>
				<tr>
					<td class="one"><span id="yjzd"></span>意见:</td>
					<td colspan="3"><textarea id="approvalComment1" rows="2" cols="" style="width: 380px;"></textarea></td>
				</tr>
			</table>
			<div class="btn_div">
				<input id="dy" type="button" value="提交" class="btn1" onclick="commit()"/>
					&nbsp;&nbsp;&nbsp;&nbsp;
				<input value="取消" class="btn2" id="qixiao" type="button" />
			</div>
			<br/>
		</div>
	</div>
</body>
<%@ include file="include/bottom.jsp"%>
</html>

