<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%	String basePath =  request.getContextPath() + "/";%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8;">
<title>信息资源目录 - 大理市信息资源管理中心</title>
<link href="<%=basePath%>r/cms/Css/base.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/header.css" rel="stylesheet"	type="text/css" />
<link href="<%=basePath%>r/cms/Css/footer.css" rel="stylesheet"	type="text/css" />
<link href="<%=basePath%>r/cms/Css/style.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/dtree.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/Css/tooltips.css" rel="stylesheet" type="text/css" />
<script src="<%=basePath%>r/cms/Js/dtree.js" type="text/javascript"></script>

<script src="<%=basePath%>r/cms/Js/jquery-1.7.2.min.js"
	type="text/javascript"></script>
<script src="<%=basePath%>r/cms/Js/jquery.tabso_yeso.js"
	type="text/javascript"></script>
<script src="<%=basePath%>r/cms/Js/simplefoucs.js"
	type="text/javascript"></script>


<script src="<%=basePath%>ap/js/globalInterfaceDomain.js"
	type="text/javascript"></script>

<script src="<%=basePath%>resourceList/Js/utils.js"
	type="text/javascript"></script>
<script src="<%=basePath%>resourceList/Js/themeView.js"
	type="text/javascript"></script>
<script src="<%=basePath%>resourceList/Js/orgView.js"
	type="text/javascript"></script>
<script src="<%=basePath%>resourceList/Js/gisView.js"
	type="text/javascript"></script>


<!-- 分页控件开始 -->

<script type="text/javascript"
	src="<%=basePath%>r/cms/pager/js/kkpager.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>r/cms/pager/js/kkpagerOrg.js"></script>
<script type="text/javascript"
	src="<%=basePath%>r/cms/pager/js/kkpagerGis.js"></script>
<link href="<%=basePath%>r/cms/pager/css/kkpager.css" rel="stylesheet"
	type="text/css" />
<link href="<%=basePath%>r/cms/pager/css/kkpagerOrg.css"
	rel="stylesheet" type="text/css" />
<link href="<%=basePath%>r/cms/pager/css/kkpagerGis.css"
	rel="stylesheet" type="text/css" />

<script type="text/javascript">
		 
		//初始化总页数和总记录数
	//	 var pageSize =${pageSize};
	//	 var resourceCategoryAdd="${resourceCategoryAdd}";
		 var userId="${userId}";
	//	 var phone="${phone}";
	//	 var userloginName="${userloginName}";
		 
			$(window).resize(function(){
			var obj = $(".white_content");
			//alert(obj.width());
			var x = ($(window).width()-obj.width())/2;
			var y = ($(window).height()-obj.height())/2;
			obj.css("top",y).css("left",x);
			
			var obj1 = $(".white_content1");
			//alert(obj.width());
			var x1 = ($(window).width()-obj1.width())/2;
			var y1 = ($(window).height()-obj1.height())/2;
			obj1.css("top",y1).css("left",x1);
			
			
			var obj2 = $(".white_content2");
			//alert(obj.width());
			var x2 = ($(window).width()-obj2.width())/2;
			var y2 = ($(window).height()-obj2.height())/2;
			obj2.css("top",y2).css("left",x2);
			
			});
			
			jQuery(function ($) {
			$(".close").click(function(){
			$(this).parent().parent().hide();
			$("#fade").hide();
			});
			
			$("#tab").tabso({                    //要切换的标签
				cntSelect:"#tab_con",             //要切换的内容
				tabEvent:"click",              //要触发的事件
				tabStyle:"fade",				   //要实现的动画效果
				onStyle:"current"				   //添加样式
			});
			
			$("#tabMenu").tabso({ // 要切换的标签
			    cntSelect : "#tabPanel", // 要切换的内容
			    tabEvent : "click", // 要触发的事件
			    tabStyle : "fade", // 要实现的动画效果
			    onStyle : "current" // 添加样式
			  });
			  
			  
			  $("#gisTabMenu").tabso({ // 要切换的标签
			    cntSelect : "#gisTabPanel", // 要切换的内容
			    tabEvent : "click", // 要触发的事件
			    tabStyle : "fade", // 要实现的动画效果
			    onStyle : "gisCurrent" // 添加样式
			  });
			  
			  
			  $("#serviceLinkCloseBtn").click(function() {
				    $(this).parent().hide();
				    $("#serviceLinkFade").hide();
				   // document.getElementById("serviceLink").src=null;
				  });
			  
			  
			$(".closeBtn").click(function() {
			    $(this).parent().hide();
			    $("#fade").hide();
			  });
			  
			$("#qx").click(function() {
				$("#applicationPanel").hide();
			    $("#fade").hide();
			  });
			
			$("#applyBtn").click(applyMultiple);
			$("#applyBtn2").click(applyMultiple);
			$("#applyBtn3").click(applyMultiple);
		    $("#submitBtn").click(function() {
			    submitForm(showResult);
			  });
		    
			$("#zyfl").click(function() {
				loadTypeTree(showTree);
				
				$(".cb").each(function() {
				    if ($(this).prop("checked")) {
				    	$(this).prop("checked",false); 
				    }
				  });
			   loadAllResourceByType("","ZT","root", "", "",showResourceForType);  
			 });
			
			$("#zzsj").click(function() {
				loadAllOrgForTree(showTypeTree);
				$(".cb").each(function() {
				    if ($(this).prop("checked")) {
				    	$(this).prop("checked",false); 
				    }
				  });
				loadAllResourceByOrg(""," ", "", "", showResourceForOrg);
			 });
			
			$("#kjdlzyml").click(function() {
				loadGisTree(showGisTree);
				$(".cb").each(function() {
				    if ($(this).prop("checked")) {
				    	$(this).prop("checked",false); 
				    }
				  });
			   loadAllGisResourceByType("","","root", "", "",showGisResourceForType);  
			 });
			 
			 
			 $("#zymc").keyup(function(k) {
			    if (k.which == 13 || k.keyCode == 13) {
			       //alert($("#bmjb").val()+$("#zymc").val());
				   var bmjb = $("#bmjb").val();
				   var zymc = $("#zymc").val();
				   qryAllGisResource(bmjb,zymc,"","","root", "", "",showGisResourceForType);  
			    }
  			});
			 
			 $("#searchBtn").click(function() {
			   //alert($("#bmjb").val()+$("#zymc").val());
			   var bmjb = $("#bmjb").val();
			   var zymc = $("#zymc").val();
			   qryAllGisResource(bmjb,zymc,"","","root", "", "",showGisResourceForType);  
			 });

			
			 var requestUrl = '${platformAdd}/service/api/sps/approvalHandler/getTodoQuantityForService';
 	         var param = {userId : '${userId}'};
             $.ajax({
		          url : requestUrl,
		          dataType : 'jsonp',
		          jsonp : "jsonpcallback",
		          data : param,
		          success : function(data) {
		        	  var tem=$("input[name='mydb']").val();
		              $("input[name='mydb']").val(tem+"("+data+")");
		             // $("input[name='mydb']").css('color','#FF0000');
		          },
		          error : function(response) {
		            alert(response);
		          },
		          timeout : 6000
		        });
		
			});
			
			$(function(){
			    var select_form = $('textarea'); //选择需要添加提示文字的表单
			    for(i=0;i<select_form.length;i++){          
			        select_form.eq(i).val(select_form.eq(i).attr('fs')).css('color','#999');//设置表单的值为一个属性值为“fs”的值    
			    }  
			    select_form.focus(function(){   //获得焦点
			        if($(this).val()==$(this).attr('fs')){
			          $(this).val('');
			          $(this).css('color','#333');
			        }    
			    })
			    select_form.blur(function(){    //失去焦点  
			        if($(this).val()==''){
			           $(this).val($(this).attr('fs'));
			           $(this).css('color','#999');
			        }
			    })
				//初始化数据
                getXXLData();
			});
        //获取地址栏参数//可以是中文参数
        function getUrlParam(key) {
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        }

        function getXXLData() {
            var type=getUrlParam("type");
            var name=getUrlParam("name");
            loadAllOrgForTree(showTypeTree);

            if(type==='dataInfo'){
                searchInitData(name);
			}else {
                loadAllResourceByOrg(""," ", "", "", showResourceForOrg);
			}


        }

		</script>

<style type="text/css">

/*查询条件*/
.sele {
	width: 120px;
	height: 21px;
	margin: 0 0px 0 13px;
}

.text {
	width: 134px;
	height: 18px;
	border: 1px solid #b5b8c8;
	background: url(<%=basePath%>r/cms/Images/input_bg.jpg) repeat-x;
	color: #b3b3b3;
	padding-left: 2px;
}

.sousuo {
	background: url(<%=basePath%>r/cms/Images/sousuo.jpg) no-repeat;
	width: 50px;
	height: 21px;
	vertical-align: middle;
}

.bttn {
	background: url(<%=basePath%>r/cms/Images/chaxun2.jpg) no-repeat;
	width: 84px;
	height: 21px;
	line-height: 21px;
	padding-left: 15px;
	font-size: 12px;
}

.bttn_new {
	background: url(<%=basePath%>r/cms/Images/chaxun21.jpg) no-repeat;
	width: 108px;
	height: 21px;
	line-height: 21px;
	padding-left: 15px;
	font-size: 12px;
}

/* 新增*/
.index_zxfw {
	border: 1px solid #a2c5e1;
	width: 660px;
	height: 33px;
}

.index_zxfw tr {
	background: url(<%=basePath%>r/cms/Images/line_bot.jpg) repeat-x left
		bottom;
	width: 660px;
	height: 35px;
}

.index_zxfw tr td {
	text-align: center;
	font-size: 14px
}

.dyzy {
	width: 450px;
	height: 400px;
	background: url(<%=basePath%>r/cms/Images/tanchu1.jpg) no-repeat;
}

.dyzy h2 {
	font-size: 20px;
	color: #164a9c;
	font-weight: normal;
	text-align: center;
	height: 50px;
	line-height: 50px;
}

.dyzy table tr {
	height: 38px;
}

.dyzy table td.one {
	width: 25%;
	height: 28px;
	line-height: 28px;
	text-align: right;
}

.dyzy table td.two {
	width: 75%;
	height: 28px;
	line-height: 28px;
	text-align: left;
}

.dyzy table td input {
	height: 28px;
	border: 1px solid #a2bae1;
}

.dyzy table td input.sbn {
	background: #f7fcff;
	border: none;
	-moz-border-radius: 10px;
	-webkit-border-radius: 10px;
	border-radius: 10px;
	font-size: 20px;
	color: #fff;
	font-family: "微软雅黑";
}

/* edit begin */
.dyzy table td input.btn1 {
	background: #f7b530;
	width: 84px;
	height: 21px;
	line-height: 21px;
	margin-right: 16px;
	font-size: 12px;
	color: #fff;
	border: 0;
	vertical-align: middle;
}

.dyzy table td input.btn2 {
	background: #188FE4;
	width: 84px;
	height: 21px;
	line-height: 21px;
	margin-right: 16px;
	font-size: 12px;
	color: #fff;
	border: 0;
	vertical-align: middle;
}
/* edit end */

/* TAB新增  */
#modelPanel #tabMenu {
	background: url(<%=basePath%>r/cms/Images/tit_bg.jpg) repeat-x;
	height: 33px;
	line-height: 33px;
	color: #000;
}

#modelPanel #tabMenu li {
	cursor: pointer;
	margin: 1px 0 0 1px;
	border-right: 1px solid #a2c5e1;
	float: left;
	height: 32px;
	text-align: center;
	width: 105px;
}

#modelPanel #tabMenu li.current {
	background: url(<%=basePath%>r/cms/Images/current.jpg) no-repeat;
	color: #fff;
	font-weight: bold;
}

#modelPanel #tabPanel ul {
	padding-top: 5px;
}

#modelPanel #tabPanel ul li {
	height: 35px;
	background: url(<%=basePath%>r/cms/Images/line_bot.jpg) repeat-x left
		bottom;
	line-height: 35px;
}

#modelPanel #tabPanel ul li a {
	background: url(<%=basePath%>r/cms/Images/dot.jpg) no-repeat left center;
	padding-left: 10px;
	margin-left: 12px;
}

#modelPanel #tabPanel ul li a:hover {
	text-decoration: underline;
}

#modelPanel #tabPanel ul li span {
	color: #b2b2b2;
	float: right;
	margin-right: 15px;
}

#modelPanel {
	display: none;
	background-color: #FFFFFF;
	position: fixed;
	width: 70%;
	z-index: 1002;
}

/*空间资源目录弹出*/
#gisModelPanel #gisTabMenu {
	background: url(<%=basePath%>r/cms/Images/tit_bg.jpg) repeat-x;
	height: 33px;
	line-height: 33px;
	color: #000;
}

#gisModelPanel #gisTabMenu li {
	cursor: pointer;
	margin: 1px 0 0 1px;
	border-right: 1px solid #a2c5e1;
	float: left;
	height: 32px;
	text-align: center;
	width: 105px;
}

#gisModelPanel #gisTabMenu li.gisCurrent {
	background: url(<%=basePath%>r/cms/Images/current.jpg) no-repeat;
	color: #fff;
	font-weight: bold;
}

#gisModelPanel #gisTabPanel ul {
	padding-top: 5px;
}

#gisModelPanel #gisTabPanel ul li {
	height: 35px;
	background: url(<%=basePath%>r/cms/Images/line_bot.jpg) repeat-x left
		bottom;
	line-height: 35px;
}

#gisModelPanel #gisTabPanel ul li a {
	background: url(<%=basePath%>r/cms/Images/dot.jpg) no-repeat left center;
	padding-left: 10px;
	margin-left: 12px;
}

#gisModelPanel #gisTabPanel ul li a:hover {
	text-decoration: underline;
}

#gisModelPanel #gisTabPanel ul li span {
	color: #b2b2b2;
	float: right;
	margin-right: 15px;
}

#gisModelPanel {
	display: none;
	background-color: #FFFFFF;
	position: fixed;
	width: 77%;
	z-index: 1002;
}

#applicationPanel {
	display: none;
	background-color: #FFFFFF;
	position: fixed;
	z-index: 1002;
}

.closeBtn {
	float: right;
	padding: 8px 8px 0px 0px;
}

.popupTable {
	border-bottom: 0px;
	text-align: center;
	background: rgb(193, 193, 193);
	margin: 20px auto 20px auto;
}

.popupTable th {
	background: url(<%=basePath%>r/cms/Images/th_bg.jpg) repeat-x;
}

.popupTable tr {
	height: 34px;
	line-height: 34px;
}

.popupTable td {
	background: rgb(255, 255, 255);
}

.cb {
	width: 20px;
	height: 20px;
}

.popupTable2 {
	border-bottom: 0px;
	text-align: center;
	background: rgb(193, 193, 193);
	margin: 20px auto 20px auto;
}

.popupTable2 th {
	background: url(<%=basePath%>r/cms/Images/th_bg.jpg) repeat-x;
}

.popupTable2 tr {
	height: 24px;
	line-height: 24px;
}

.popupTable2 td {
	background: rgb(255, 255, 255);
}
</style>

</head>
<body>
	<div id="fade" class="black_overlay"></div>
	<!--头部导航-->
	<%@ include file="include/head.jsp"%>
	<script type="text/javascript">
$("#xxzyml").addClass("current2");
</script>
	<!--内容开始-->
	<div class="warp_content">
		<div class="warp_tit">
			您现在的位置：<a href="#">首页</a><span>></span>信息资源目录
		</div>

		<div class="warp_tab">
			<ul id="tab">
				<li id="zzsj">组织机构视角</li>
				<li id="zyfl" class="current">资源分类视角</li>
				<!--  
				<li id="kjdlzyml">空间地理资源目录</li>
				-->
			</ul>

			<div id="tab_con">
				<div class="Tissue_classification">
					<div class="left">
						<div id="orgTreeDiv"></div>
					</div>
					<div class="right">
						<div class="chaxun">
							<!-- 搜索 -->
							<div style="display: inline;">
								<span style="margin-left:3px;">资源名称:</span>
								<input id="zymcOrg" type="text" class="text" />
								<input type="button" class="sousuo" onclick="search('',1)" />
							</div>
							<!-- 按钮 -->
							<div style="display: inline;">
								<input id="applyBtn2" type="button" class="bttn" value="申请资源" /> 
								<!--
								<input type="button" onclick="javascript:window.location.href='/csdsc/myApprovalAct'" class="bttn" value="我的申请" /> 
								<input name="mydb" type="button" onclick="javascript:window.location.href='/csdsc/myTodoAct?type=1'" class="bttn_new" value="我的待办" /> 
								<input type="button" onclick="javascript:window.location.href='/csdsc/myTodoAct?type=2'" class="bttn" value="我的已办" />
								-->
								<c:if test="${fn:contains(resources,\"目录审批记录查询\")}">
									<input type="button"
										onclick="javascript:window.location.href='/csdsc/myTodoAct?type=3'"
										class="bttn" value="审批记录" />
								</c:if>
							</div>
						</div>
						<table id="orgitemTable" cellspacing="1">
							<thead>
								<tr>
									<th width="43px"></th>
									<th width="270px">资源名称</th>
									<th width="160px">资源提供方</th>
									<th width="145px">资源发布日期</th>
									<th>共享级别</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>

						<div id="kkpagerOrg"
							style="margin-top: 3px; margin-bottom: 3px; float: right; margin-right: 15px;"></div>
					</div>
				</div>


				<div class="resource_classification">
					<!--  
   		          <iframe width=100% height=244 frameborder=0 scrolling=auto src="typeView.jsp" ></iframe>
   		       -->
					<div class="left">
						<div id="typeTreeDiv"></div>
					</div>
					<div class="right">
						<div class="chaxun">
							<!-- 搜索 -->
							<div style="display: inline;">
								<span style="margin-left:3px;">资源名称:</span>
								<input id="zymcType" type="text" class="text" />
								<input type="button" class="sousuo" style="with: 45px" onclick="search('',2)" />
							</div>
							<!-- 按钮 -->
							<div style="display: inline;">
								<input id="applyBtn" type="button" class="bttn" value="申请资源"/>
								<!-- 
								<input type="button" onclick="javascript:window.location.href='/csdsc/myApprovalAct'" class="bttn" value="我的申请" />
								<input name="mydb" type="button" onclick="javascript:window.location.href='/csdsc/myTodoAct?type=1'" class="bttn_new" value="我的待办" />
								<input type="button" onclick="javascript:window.location.href='/csdsc/myTodoAct?type=2'" class="bttn" value="我的已办" />
							   	<c:if test="${fn:contains(resources,\"目录审批记录查询\")}">
							        <input type="button" onclick="javascript:window.location.href='/csdsc/myTodoAct?type=3'" class="bttn" value="审批记录"/>
			                    </c:if>
			                     -->
							</div>
						</div>
						<table id="itemTable" cellspacing="1">
							<thead>
								<tr>
									<th width="43px"></th>
									<th width="270px">资源名称</th>
									<th width="160px">资源提供方</th>
									<th width="145px">资源发布日期</th>
									<th>共享级别</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>

						<!-- 分页控件开始 -->
						<div id="kkpager"
							style="margin-top: 3px; margin-bottom: 3px; float: right; margin-right: 15px;"></div>
					</div>

				</div>


				<div class="gis_classification">
					<!--  
   		          <iframe width=100% height=244 frameborder=0 scrolling=auto src="typeView.jsp" ></iframe>
   		       -->
					<div class="left">
						<div id="gisTreeDiv"></div>
					</div>
					<div class="right">

						<div class="chaxun">
							<!--							<span>保密级别：</span>-->
							<!--							<select class="sele" id="bmjb">-->
							<!--								<option value="0">全部</option>-->
							<!--								<option value="1">公开</option>-->
							<!--								<option value="2">需要申请</option>-->
							<!--							</select>-->
							<span>资源名称:</span> <input id="zymc" type="text" class="text"
								style="with: 55px" /> <input id="searchBtn" type="button"
								class="sousuo" style="with: 45px" /> <input id="applyBtn3"
								type="button" class="bttn" value="申请资源" /> <input type="button"
								onclick="javascript:window.location.href='/csdsc/myApprovalAct'"
								class="bttn" value="我的申请" /> <input name="mydb" type="button"
								onclick="javascript:window.location.href='/csdsc/myTodoAct?type=1'"
								class="bttn_new" value="我的待办" /> <input type="button"
								onclick="javascript:window.location.href='/csdsc/myTodoAct?type=2'"
								class="bttn" value="我的已办" />
							<!-- 
						        <c:if test="${fn:contains(resources,\"目录审批记录查询\")}">
						            <input   type="button" onclick="javascript:window.location.href='/csdsc/myTodoAct?type=3'"   class="bttn" value="审批记录"/>
		                        </c:if> 
		                         -->
						</div>
						<table id="gisTable" cellspacing="1">
							<thead>
								<tr>
									<th width="43px"></th>
									<th width="270px">资源名称</th>
									<th width="160px">资源提供方</th>
									<th width="145px">资源发布日期</th>
									<th>共享级别</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>

						<!-- 分页控件开始 -->
						<div id="kkpagerGis"
							style="margin-top: 3px; margin-bottom: 3px; float: right; margin-right: 15px;"></div>
					</div>

				</div>

			</div>
		</div>

	</div>
	<div class="clear"></div>
	<!--内容结束-->

	<%@ include file="include/bottom.jsp"%>

	<div id="modelPanel">
		<img class="closeBtn" src="<%=basePath%>r/cms/Images/close.png" />
		<div id="serviceLinkFade" class="black_overlay"></div>
		<ul id="tabMenu">
			<li class="current">资源详情</li>
			<li>服务列表</li>
			<li>字段详情</li>
			<li>文件列表</li>

		</ul>
		<div id="tabPanel" style="overflow: auto; height: 345px; width: 100%;">

			<table id="detailTable4" class="popupTable" cellspacing="1"
				width="98%" cellpadding="0" bgcolor="#e4e4e4">
				<thead>
					<tr>
						<th width="25%">服务名称</th>
						<th width="12%">提供方</th>
						<th width="12%">发布日期</th>
						<th width="10%">更新频率</th>
						<th width="11%">共享级别</th>
						<th width="20%">摘 要</th>
						<th width="10%">申请次数</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<table id="detailTable1" class="popupTable" cellspacing="1"
				width="98%" cellpadding="0" bgcolor="#e4e4e4">
				<thead>
					<tr>
						<th width="35%">服务名称</th>
						<th width="10%">类型</th>
						<!--   <th width="15%">代理地址</th>-->
						<th width="15%">发布地址</th>
						<th width="15%">发布时间</th>
						<th width="10%">状态</th>
						<th width="15%">授权类型</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<table id="detailTable2" class="popupTable" cellspacing="1"
				width="98%" cellpadding="0" bgcolor="#e4e4e4">
				<thead>
					<tr>
						<th width="50%">字段名称</th>
						<th width="20%">拼音</th>
						<!--  <th width="30%">字段ID</th>-->
						<th width="30%">数据类型</th>
						<!-- <th width="8%">长度</th>
              <th width="12%">小数位数</th>-->
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<table id="detailTable3" class="popupTable" cellspacing="1"
				width="98%" cellpadding="0" bgcolor="#e4e4e4">
				<thead>
					<tr>
						<th width="40%">文件名</th>
						<th width="10%">文件类型</th>
						<th width="10%">大小</th>
						<th width="20%">上传时间</th>
						<th width="20%">操作</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

		</div>
	</div>


	<!--空间资源目录弹出 -->
	<div id="gisModelPanel">
		<img class="closeBtn" src="<%=basePath%>r/cms/Images/close.png" />
		<ul id="gisTabMenu">
			<li class="gisCurrent">资源详情</li>
			<li>服务列表</li>
			<li onclick="getApi();">示例代码</li>
		</ul>
		<div id="gisTabPanel"
			style="overflow: auto; height: 342px; widows: 100%;">

			<table id="detailTable5" class="popupTable2" cellspacing="1"
				width="98%" cellpadding="0" bgcolor="#e4e4e4">
				<!--          <thead>-->
				<!--            <tr>-->
				<!--              <th width="25%">服务名称</th>-->
				<!--              <th width="20%">提供部门</th>-->
				<!--              <th width="12%">发布日期</th>-->
				<!--              <th width="12%">创建日期</th>-->
				<!--              <th width="11%">公开级别</th>-->
				<!--              <th width="20%">摘 要</th>-->
				<!--            </tr>-->
				<!--          </thead>-->
				<tbody align="left">

				</tbody>
			</table>

			<table id="detailTable6" class="popupTable" cellspacing="1"
				width="98%" cellpadding="0" bgcolor="#e4e4e4">
				<thead>
					<tr>
						<th width="35%">服务名称</th>
						<th width="15%">类型</th>
						<!--              <th width="15%">代理地址</th>-->
						<th width="25%">发布地址</th>
						<th width="15%">发布时间</th>
						<th width="10%">状态</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>

			<iframe id="detailTable7" class="popupTable" cellspacing="1"
				width="99%" height="300px" cellpadding="0" bgcolor="#e4e4e4"></iframe>

		</div>
	</div>


	<div id="applicationPanel" class="dyzy">
		<img class="closeBtn" src="<%=basePath%>r/cms/Images/close.png" />
		<h2 align="left">申请资源</h2>
		<table>
			<tr>
				<td class="one">申请资源:</td>
				<td class="two"><textarea id="formNames" rows="4" cols=""
						style="width: 310px;resize: none;height: 65px;font-size: 13px;" disabled="disabled"></textarea></td>
			</tr>
			<tr>
				<td class="one">申请人:</td>
				<td class="two"><input id="userName" value="${userName}"
					style="width: 310px;" disabled="disabled" /><input id="formUserID"
					type="hidden" /></td>
			</tr>
			<tr>
				<td class="one">申请人电话:</td>
				<td class="two"><input id="formPhone" value="${phone}  style="width:310px;"></input></td>
			</tr>
			<tr>
				<td class="one">申请说明:</td>
				<td class="two"><textarea id="formComment" rows="5"
						style="width: 310px;resize: none;font-size: 13px;height:90px;"
						fs="请在此填写本次申请的资源用于支撑的系统、平台或业务，并填写本次申请的资源拟进行数据的方式和频率。"></textarea></td>
			</tr>

			<tr>
				<td colspan="2" align="center"><input type="button"
					id="submitBtn" class="btn1" value=" 提  交 " /> <input type="button"
					class="btn2" id="qx" value=" 取  消 " /></td>
			</tr>


		</table>
	</div>




	<div id="serviceLinkWindow"
		style="margin-top: -150px;width:700px; height:500px; background:url(<%=basePath%>r/cms/Images/tanchu2.jpg) no-repeat;display: none; background-color: #FFFFFF;position: fixed;z-index: 1003;">

		<img id="serviceLinkCloseBtn"
			style="float: right; padding: 8px 8px 0px 0px;"
			src="<%=basePath%>r/cms/Images/close.png" />
		<h2
			style="font-size: 20px; color: #164a9c; font-weight: normal; text-align: left; height: 50px; line-height: 50px;"
			align="left">&nbsp;&nbsp;&nbsp;&nbsp;查看服务API</h2>
		<iframe id="serviceLink" width="687" height="420" cellpadding="0"
			bgcolor="#e4e4e4" src=""></iframe>
	</div>

</body>
</html>