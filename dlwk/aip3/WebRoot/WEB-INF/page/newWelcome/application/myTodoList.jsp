<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
 
<mdp:newHeader title="我的需求"  curItem=""/>
<style>
	.nav.nav-pills.nav-stacked{
		background: inherit;
    	width: 150px;
    	position: absolute;
    	left: -149px;
    	box-shadow: inherit;
	}
	.nav-pills>li>a {
    	border-radius: 0;
    	color: inherit;
	}
	.tab{
		float:right;
		line-height: 46px;
    	margin-top: 10px;
    	    margin-right: 45px;
	}
	.tab li{
		border-bottom: 4px solid rgba(51, 121, 183, 0);
    	padding: 0 10px;
    	margin: 0 5px -4px 5px;
    	cursor: pointer;
	}
	.tab li.active,.tab li:hover{
		border-bottom: 4px solid rgba(51, 121, 183, 1);
	}
	
	.exam_checkbtn{
		display:none;
	}
	.cart_shopList .exam_check:last-child{
		border-bottom: 0;
	}
	.cart_detail {
	    padding: 10px 0;
	}
	.cart_del {
    	top: 60%;
    	margin-top: -10px;
    	font-size: 14px;
	}
	.cart_del:first-child {
    	top: 40%;
	}
	.desc{
		overflow: hidden;
    	height: 25px;
    	width: 100%;
    	text-overflow: ellipsis;
    	white-space: nowrap;
    	color: #999;
	}
	.res_labs {
    	color: #999;
	}
	.bg_blue{
		background: #079ce3;
	}
	.bg_green{
		background: #5cb85c;
	}
	.bg_red{
		background: #d9534f;
	}
	
.filter_line {
    height: 50px;
    line-height: 50px;
    /* border-top: 1px solid #d6d6d6; */
    border-bottom: 1px solid #d6d6d6;
    color: #9b9b9b;
    margin-right: 32px;
}
.filter_line li {
    margin: 0 15px;
    cursor: pointer;
}
.filter_line li.cur a,
.filter_line li:hover a{
   	color: #F76D1F;
}
.filter_line li a{
	font-size: 14px;
    color: #9b9b9b;
}
.cart_shopList .exam_check {
    margin: 0 50px 0;
}
.cart_del {
    right: 0;
}
.cart_img {
    padding: 20px 0 20px 0px;
}
.cart_col1 {
    width: 120px;
}
.cart_col2 {
    margin: 0 95px 0 120px;
}
</style>
<div style="padding-top: 98px;height: 1px;"></div>
<section class="main_page">	
<ul class="nav nav-pills nav-stacked">
		<%-- <li <c:if test="${type=='myTodoList' }">class="active"</c:if> ><a href="#myTodoList" data-toggle="tab">我的事项</a></li> --%>
		<%-- <li <c:if test="${type=='myApplication' }">class="active"</c:if> ><a href="#myApplication"  data-toggle="tab">我的需求</a></li> --%>
		<%-- <li <c:if test="${type=='myAuthority' }">class="active"</c:if> ><a href="#myAuthority"  data-toggle="tab">我的授权</a></li>
		<li <c:if test="${type=='myQuestion' }">class="active"</c:if> ><a href="#myQuestion"  data-toggle="tab">我的提问</a></li> --%>
</ul>
<div class="tab-content">
	<%-- <div id="myTodoList" class="box p0_20 tab-pane <c:if test="${type=='myTodoList' }">active</c:if>">
		<div class="line" style="line-height: 40px;border-bottom: 1px solid #d7d7d7;">
			<div class="basket" style="float: left;margin: 0 10px 0 0;width: 40px;min-width: 40px;height: 40px;border: 0;"></div>
    		<span class="cur_title l">我的事项</span>
    		<ul class="tab">
				<li class="active">未处理</li>
				<li>已处理</li>
			</ul>
    	</div>
    	<div class="mb5">
    		<div style="float:left;line-height: 33px;">事项分类：</div>
			<ul class="filter_line" style="    margin-right: 0;">
				<li class="cur"><a href="javascript:void(0)">数据问题</a></li>
				<li><a href="javascript:void(0)">资源申请</a></li>
			</ul>
		</div>
		<div class="mb5">
    		<div style="float:left;line-height: 33px;">所属部门：</div>
			<ul class="filter_line" style="margin-right: 0;">
				<li class="cur"><a href="javascript:void(0)">1</a></li>
				<li><a href="javascript:void(0)">2</a></li>
			</ul>
		</div>
		<div class="search_sm clearfix" style="padding: 5px 0 10px;float: none;box-shadow: none;">
            <input type="text" placeholder="输入关键字" class="search_sm_input" id="search_input">
            <input type="button" value="搜索" class="search_sm_submit" style="cursor: pointer;" id="search_submit">
        </div>
		<div class="cart_shopList mb50">
				<label class="exam_check">
					<div class="exam_checkbtn"></div>
					<input type="checkbox">
					<div class="cart_col1">
						<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
					</div>
					<div class="cart_col2">
						<div class="cart_detail">
							<p class="cart_name">信息资源目录1</p>
							<div class="res_labs">
								<span class="res_lab">水利工程</span>
								<span class="res_lab">水库</span>
							</div>
						</div>
					</div>
					<div class="cart_col3">
						<a href="javascript:;" class="cart_del print"><i class="fa fa-print cart_delIco"></i>打印</a>
						<a href="javascript:;" class="cart_del details"><i class="fa fa-search cart_delIco"></i>详情</a>
					</div>
				</label>
				<label class="exam_check">
					<div class="exam_checkbtn"></div>
					<input type="checkbox">
					<div class="cart_col1">
						<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
					</div>
					<div class="cart_col2">
						<div class="cart_detail">
							<p class="cart_name">信息资源目录2</p>
							<div class="res_labs">
								<span class="res_lab">水利工程</span>
								<span class="res_lab">水库</span>
							</div>
						</div>
					</div>
					<div class="cart_col3">
						<a href="javascript:;" class="cart_del print"><i class="fa fa-print cart_delIco"></i>打印</a>
						<a href="javascript:;" class="cart_del details"><i class="fa fa-search cart_delIco"></i>详情</a>
					</div>
				</label>
		</div>		
	</div> --%>
	<!-- 我的需求 s-->
	<div id="myApplication" class="box tab-pane <c:if test="${type=='myApplication' }">active</c:if>">
		<div class="line" style="border-bottom: 1px solid #d7d7d7;background: #F8F8F8;height: 58px;line-height: 58px;">
			<div class="order" style="float: left;margin: 0 10px 0 0;width: 40px;min-width: 40px;height: 40px;border: 0;background-size: 80%;"></div>
    		<span class="cur_title l">我的需求</span>
    		<ul class="tab">
				<li class="active">资源申请</li>
				<!-- <li>需求征集</li> -->
			</ul>
    	</div>
		<div class="mb5 m0_50">
    		<div style="float:left;line-height: 50px;">需求状态：</div>
			<ul class="filter_line" style="margin-right: 0;">
				<li class="cur resResultcss" searchType="1"><a href="javascript:void(0)"   >处理中</a></li>
				<li class="resResultcss" searchType="2"><a href="javascript:void(0)">已解决</a></li>
				<!-- <li><a href="javascript:void(0)">已超期</a></li>
				<li><a href="javascript:void(0)">未评价</a></li>
				<li><a href="javascript:void(0)">已评价</a></li> -->
			</ul>
		</div>
		<div class="search_sm clearfix" style="padding: 5px 50px 10px;float: none;box-shadow: none;">
            <input type="text" placeholder="输入关键字" class="search_sm_input" id="search_res_input">
            <input type="button" value="搜索" class="search_sm_submit" style="cursor: pointer;" onclick="getResList();" id="search_res_submit">
        </div>  
		<div class="cart_shopList mb50">
		        <span class="myresList"  >
					 
						
	
						
					
				</span>
				<div id="resApplyId"><%@include
							file="../../common/admin-pagination.jsp"%></div>
							<br/>
		</div>		
	</div>
	
	<!-- 我的需求e -->
	 <%-- <div id="myAuthority" class="box p0_20 tab-pane <c:if test="${type=='myAuthority' }">active</c:if>">
		<div class="line" style="line-height: 40px;border-bottom: 1px solid #d7d7d7;">
			<div class="basket" style="float: left;margin: 0 10px 0 0;width: 40px;min-width: 40px;height: 40px;border: 0;"></div>
    		<span class="cur_title l">我的授权</span>    		
    	</div>  
    	<div class="mb5">
    		<div style="float:left;line-height: 33px;">有效状态：</div>
			<ul class="filter_line" style="margin-right: 0;">
				<li class="cur"><a href="javascript:void(0)">未失效</a></li>
				<li><a href="javascript:void(0)">已失效</a></li>
			</ul>
		</div>
		<div class="search_sm clearfix" style="padding: 5px 0 10px;float: none;box-shadow: none;">
            <input type="text" placeholder="输入关键字" class="search_sm_input" id="search_input">
            <input type="button" value="搜索" class="search_sm_submit" style="cursor: pointer;" id="search_submit">
        </div>  
    	  	
		<div class="cart_shopList mb50">
				<label class="exam_check">
					<div class="exam_checkbtn"></div>
					<input type="checkbox">
					<div class="cart_col1">
						<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
					</div>
					<div class="cart_col2">
						<div class="cart_detail">
							<p class="cart_name">信息资源目录1</p>
							<div class="res_labs">
								<span class="res_lab">水利工程</span>
								<span class="res_lab">水库</span>
							</div>
						</div>
					</div>
					<div class="cart_col3">
						<a href="javascript:;" class="cart_del print"><i class="fa fa-print cart_delIco"></i>打印</a>
						<a href="javascript:;" class="cart_del details"><i class="fa fa-search cart_delIco"></i>详情</a>
					</div>
				</label>
				<label class="exam_check">
					<div class="exam_checkbtn"></div>
					<input type="checkbox">
					<div class="cart_col1">
						<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
					</div>
					<div class="cart_col2">
						<div class="cart_detail">
							<p class="cart_name">信息资源目录2</p>
							<div class="res_labs">
								<span class="res_lab">水利工程</span>
								<span class="res_lab">水库</span>
							</div>
						</div>
					</div>
					<div class="cart_col3">
						<a href="javascript:;" class="cart_del print"><i class="fa fa-print cart_delIco"></i>打印</a>
						<a href="javascript:;" class="cart_del details"><i class="fa fa-search cart_delIco"></i>详情</a>
					</div>
				</label>
		</div>		
	</div> --%>
	 
<%-- 	<div id="myQuestion" class="box p0_20 tab-pane <c:if test="${type=='myQuestion' }">active</c:if>">
		<div class="line" style="line-height: 40px;border-bottom: 1px solid #d7d7d7;">
			<div class="basket" style="float: left;margin: 0 10px 0 0;width: 40px;min-width: 40px;height: 40px;border: 0;"></div>
    		<span class="cur_title l">我的提问</span>
    	</div> 
    	<div class="mb5">
    		<div style="float:left;line-height: 33px;">问题状态：</div>
			<ul class="filter_line" style="    margin-right: 0;">
				<li class="cur"><a href="javascript:void(0)">处理中</a></li>
				<li><a href="javascript:void(0)">已解决</a></li>
				<li><a href="javascript:void(0)">已超期</a></li>
			</ul>
		</div>
		<div class="mb5">
    		<div style="float:left;line-height: 33px;">问题类型：</div>
			<ul class="filter_line" style="    margin-right: 0;">
				<li class="cur"><a href="javascript:void(0)">数据显示乱码</a></li>
				<li><a href="javascript:void(0)">更新频率问题</a></li>
				<li><a href="javascript:void(0)">数据与描述不符</a></li>
				<li><a href="javascript:void(0)">其他</a></li>
			</ul>
		</div>
		<div class="mb5">
    		<div style="float:left;line-height: 33px;">所属部门：</div>
			<ul class="filter_line" style="border-bottom: 0;margin-right: 0;">
				<li class="cur"><a href="javascript:void(0)">1</a></li>
				<li><a href="javascript:void(0)">2</a></li>
			</ul>
		</div>
		<div class="search_sm box mb10 clearfix" style="padding: 0;float: none;box-shadow: none;">
			<ul>
				<li class="filter_sort_li"><a href="javascript:void(0);" class="filter_sort_link filter_sort_cur">到期日期</a></li>
				<li class="filter_sort_li"><a href="javascript:void(0);" class="filter_sort_link">创建日期</a></li>
			</ul>
            <input type="text" placeholder="输入关键字" class="search_sm_input mt10 ml10" id="search_input">
            <input type="button" value="搜索" class="search_sm_submit mt10" style="cursor: pointer;" id="search_submit">
        </div>  	
		<div class="cart_shopList mb50">
				<label class="exam_check">
					<div class="exam_checkbtn"></div>
					<input type="checkbox">
					<div class="cart_col1">
						<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
					</div>
					<div class="cart_col2">
						<div class="cart_detail">
							<p class="cart_name">信息资源目录1</p>
							<div class="res_labs">
								<span class="res_lab">水利工程</span>
								<span class="res_lab">水库</span>
							</div>
						</div>
					</div>
					<div class="cart_col3">
						<a href="javascript:;" class="cart_del print"><i class="fa fa-print cart_delIco"></i>打印</a>
						<a href="javascript:;" class="cart_del details"><i class="fa fa-search cart_delIco"></i>详情</a>
					</div>
				</label>
				<label class="exam_check">
					<div class="exam_checkbtn"></div>
					<input type="checkbox">
					<div class="cart_col1">
						<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
					</div>
					<div class="cart_col2">
						<div class="cart_detail">
							<p class="cart_name">信息资源目录2</p>
							<div class="res_labs">
								<span class="res_lab">水利工程</span>
								<span class="res_lab">水库</span>
							</div>
						</div>
					</div>
					<div class="cart_col3">
						<a href="javascript:;" class="cart_del print"><i class="fa fa-print cart_delIco"></i>打印</a>
						<a href="javascript:;" class="cart_del details"><i class="fa fa-search cart_delIco"></i>详情</a>
					</div>
				</label>
		</div>		
	</div> --%>
</div>
</section>
<script id="myresTemplate" type="text/x-jsrender">
{{for dataList}}
<label class="exam_check">
						<div class="exam_checkbtn"></div>
						<input type="checkbox">
						
<div class="cart_col1">
	<div class="cart_img"><img src="${ctx}/resources/images/icon.png" alt="" style="width: 100px;height: 74px;border: 1px #d7d7d7 solid;"></div>
</div>
<div class="cart_col2">
<div class="cart_detail">
	<p class="cart_name">{{:variable['resourceApply.catalogueInfo'].resourceName}}</p>
	<div class="desc">
           {{:variable['resourceApply.describe']}}
	 </div>
	<div class="res_labs">
		<span class="res_lab">{{:variable['resourceApply.catalogueInfo'].provider.orgName}}</span>
		<span class="res_lab bg_red"></span>
		<i class="fa fa-clock-o ml50 mr5"></i><span style="font-size:13px;">申请时间：</span><span style="font-size:13px;">{{:data.create_time}}</span>
		<!--<i class="fa fa-clock-o ml50 mr5"></i><span style="font-size:13px;">截止：</span><span style="font-size:13px;">2017-10-10</span>-->
	</div>
</div>
</div>
<div class="cart_col3">
<a href="javascript:;" class="cart_del print"    resid="{{:variable['resourceApply.catalogueInfo'].resourceId}}" ><i class="fa fa-print cart_delIco"  resid="{{:variable['resourceApply.catalogueInfo'].resourceId}}"  ></i>打印</a>
<a href="javascript:;" class="cart_del details"  resid="{{:variable['resourceApply.catalogueInfo'].resourceId}}"  ><i class="fa fa-search cart_delIco"  resid="{{:variable['resourceApply.catalogueInfo'].resourceId}}"  ></i>详情</a>
</div>
</label>
{{/for}}
</script>
<script>
	$(function(){
		$('.main_page').delegate('.nav.nav-pills.nav-stacked a','click',function(){
			$('#' + $(this).attr('data-toggle')).show();
		}).delegate('.cart_col3 a.details','click',function(){
			window.open(ctx + '/mdp/admin/application/applyDetails.html?resid='+$(this).attr("resid"));
		}).delegate('.cart_col3 a.print','click',function(){
			window.open(ctx + '/mdp/admin/application/applyPrintPreview.html?resid='+$(this).attr("resid"));
		})
		$(".resResultcss").on("click",function(){
			$(".resResultcss").removeClass("cur");
			$(this).addClass("cur");
           
            getResList()
		});
		getResList();
	})
	function getResList() {
		var searchType = $(".resResultcss.cur").attr("searchType");
		var getList = function(data) {
			param = {
				start : 0,
				assetName:$("#search_res_input").val(),
				searchType:searchType
			};
			updatePagination(ctx
					+ "/mdp/admin/applyResourceController/getApplyResList.json", param,
					0, 10, function(data, pageIndex) {
				        showcontent(data);
					},"#resApplyId");
		}
		var showcontent = function(data) {
			 
			 var result ={
					 dataList:[] 
			 };
			 if(data.count>0){
				 for( var i = 0 ;i<data.list.length;i++ ){
					 var res = {};
					 res.data = data.list[i];
					 res.variable = $.parseJSON( data.list[i].variable );
					 result.dataList.push(res);
				 }
			 }
			 $(".myresList").html($("#myresTemplate").render(result))
		}
		getList();
	}
</script>
<script type="text/javascript"
	src="${ctx }/page/admin/datamodel/jsrender.min.js"></script>

<mdp:mdpFooter />



