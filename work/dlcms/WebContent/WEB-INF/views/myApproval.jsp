<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
   String basePath =  request.getContextPath() + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
     <meta http-equiv="X-UA-Compatible" content="IE=8;">
        <title>我的申请  - 大理市信息资源管理中心</title>
		<link href="<%=basePath%>r/cms/Css/base.css" rel="stylesheet" type="text/css"/>
		<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath%>r/cms/Css/footer.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
        <link href="<%=basePath%>r/cms/Css/tooltips.css" rel="stylesheet" type="text/css" />
		
		<script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js" type="text/javascript"></script>
		<script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js" type="text/javascript"></script>
		<script src="<%=basePath%>r/cms/Js/simplefoucs.js" type="text/javascript"></script>
	    <script src="<%=basePath%>ap/js/globalInterfaceDomain.js" type="text/javascript"></script>
		<script src="<%=basePath%>resourceList/Js/utils.js" type="text/javascript"></script>
		<script src="<%=basePath%>resourceList/Js/myApproval.js" type="text/javascript"></script>
		<!-- 分页控件开始 -->
		
		<script type="text/javascript" src="<%=basePath%>r/cms/pager/js/kkpager.min.js"></script>
		<link  href="<%=basePath%>r/cms/pager/css/kkpager.css" rel="stylesheet" type="text/css"/>

<!-- 分页控件代码结束 -->

	<style type="text/css">
			var userId="${userId}";
		 	function getGrURL() {
				return  "${platformAdd}/service/api/csdsc/";
			}
	
		 /* 新增*/
		 table{width:100%; border-bottom:0px; text-align:center;background:#c1c1c1;}
		 table tr{height:38px; line-height:38px;}
		 table th{background:url(<%=basePath%>r/cms/Images/th_bg.jpg) repeat-x;}
		 table td{background:#fff; padding:3px;}
		 table td input{height:24px; line-height:24px; border:1px #ddd solid;}
		
		 table.table_int{width:94%; border-collapse:collapse; border:1px #c1c1c1 solid; text-align:center;background:#fff; margin:0 auto;}
		 table.table_int tr{height:38px; line-height:38px;}
		 table.table_int .one{background:#ebf8fe;border-collapse:collapse; border:1px #c1c1c1 solid; padding:3px;}
		 table.table_int td{padding:3px;border-collapse:collapse; border:1px #c1c1c1 solid;}
		 table.table_int td input{height:24px; line-height:24px; border:1px #ddd solid;}
		  table.myApproval td input.ck{height:24px; width:18px; line-height:24px; border:0px #ddd solid;}

		 
		 /* edit begin */
		.newchaxun{height:30px; width:auto; border:1px solid #adcde7; border-bottom:0px; text-align:right; padding-top:10px;}
		/* edit end */
		.newchaxun .text{width:134px; height:18px; border:1px solid #b5b8c8; margin:0 5px; background:url(<%=basePath%>r/cms/Images/input_bg.jpg) repeat-x; color:#b3b3b3; padding-left:10px;vertical-align:middle;}
		.newchaxun .sousuo{background:url(<%=basePath%>r/cms/Images/sousuo.jpg) no-repeat; width:50px; height:21px; margin:0 19px 0 13px;vertical-align:middle;}
		.newchaxun .bttn{background:url(<%=basePath%>r/cms/Images/chaxun2.jpg) no-repeat; width:84px; height:21px; line-height:21px; padding-left:25px; margin-right:16px; font-size:12px;vertical-align:middle;}	
		.newchaxun .btn1{background:#f7b530; width:84px; height:21px; line-height:21px;  margin-right:16px; font-size:12px; color:#fff;
 border:0;vertical-align:middle;}
	    .newchaxun .btn{background:url(<%=basePath%>r/cms/Images/chaxun.jpg) no-repeat; width:83px; height:21px; margin:0 5px;vertical-align:middle;}
	    
	    
	     .cksqxq  {width:600px; height:445px; background:#fff url(<%=basePath%>r/cms/Images/tanchu3.jpg) no-repeat;display: none;position: fixed;z-index: 1002;}
	     .cksqxq .closeBtn {float: right;padding: 8px 8px 0px n0px;}
         .cksqxq h2{font-size:20px; color:#164a9c; font-weight:normal; text-align:center; height:50px; line-height:50px;}
		 .cksqxq table tr{ height:38px;}
		 .cksqxq table td.one{width:25%; height:28px; line-height:28px; text-align:right;}
		 .cksqxq table td.two{width:75%; height:28px; line-height:28px; text-align:left;}   
	</style>
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
	<span>&gt;</span><a href="/csdsc/personInformationAct.jhtml">个人信息</a>
	<span>&gt;</span>我的申请
	</div>
	  
	<div class="warp_left">
    <h2>个人信息</h2>
	<ul>
	<li>
		<a href="/csdsc/personInformationAct.jhtml"> 基本信息 </a>
	</li>		
	<li>
		<a  class="current" href="/csdsc/myApprovalAct"> 我的申请 </a>
	</li>
	<li>
		<a href="/csdsc/myTodoAct?type=1"> 我的待办 </a>
	</li>
	<li>
		<a href="/csdsc/myTodoAct?type=2"> 我的已办 </a>
	</li>
	<li>
		<a href="/csdsc/myCountAct"> 我的统计 </a>
	</li>
	</ul>
	</div>
	  
	<div class="warp_right">
		<div class="tit">
        	<h3><label id="bt">我的申请</label></h3>
        </div>
	  
		<div class="newchaxun">
	 		<span style="margin-left:15px;display:block;float:left">我的授权码：
	    	<font color="#0000FF">
	     		<c:if test="${''!=authKey}">${authKey }</c:if> 
	     		<c:if test="${''==authKey}">尚未授权，暂无</c:if>
	    	</font>
	    	</span>
	    	<input id="dy"  type="button" class="btn1" value="导出打印" align="left" onclick="dysq()"/>      资源名称：
	    	<input id="searchInput"  type="text" class="text" /><input id="searchBtn" type="button" class="sousuo"/>
		</div>
	 
		<table id="myApproval"  cellspacing="1"  class="myApproval">
        	<thead>
          		<tr>
            		<th width="5%"></th>
            		<th width="18%">申请人</th>
            		<th width="25%">资源名称</th>
            		<th width="18%">资源提供方</th>
            		<th width="12%">申请日期</th>
            		<th width="10%">状态</th>
            		<th width="12%">操作</th>
          		</tr>
        	</thead>
     	<tbody></tbody>
    </table>
    </div>
    
    
       <!-- 分页控件开始 -->
	<div id="kkpager" style="margin-top: 3px;margin-bottom: 3px;float: right;margin-right: 15px;"></div>
	<div> 
	<div class="clear"></div>
	<div id="model2" class="cksqxq">
		<img  class="closeBtn" src="<%=basePath%>r/cms/Images/close.png" />
     	<h2 align="left">查看申请详情</h2>
		<div id="dybt"></div>
     	<table  cellspacing="0" class="table_int">
     	    <tr><td class="one">信息资源名称: &nbsp;&nbsp;</td><td class="two"><input id="viewAssetName" disabled="disabled" style="width:310px;" ></input></td></tr>
        	<tr><td class="one">申请说明: &nbsp;&nbsp;</td><td  class="two"><textarea id="viewDescription"  rows="4" cols=""   style="width:310px;"></textarea></td></tr>
            <tr><td class="one">申请人: &nbsp;&nbsp; </td><td class="two"><input id="viewProposerName" disabled="disabled"  style="width:310px;" ></input></td></tr>
            <tr><td class="one">申请部门: &nbsp;&nbsp;</td><td class="two"><input id="viewProposerOrgName" disabled="disabled"  style="width:310px;"></input></td></tr>
            <tr><td class="one">当前审批步骤: &nbsp;&nbsp;</td><td class="two"><input id="viewStatus" disabled="disabled"  style="width:310px;"></input></td></tr>
            <tr><td class="one">反馈信息: &nbsp;&nbsp;</td><td class="two"><textarea id="viewApprovalInformation"   rows="5" style="width:310px;"></textarea></td></tr>
        </table>
     </div>	
     </div>	
</div>	
</body>
<%@ include file="include/bottom.jsp"%>
</html>

