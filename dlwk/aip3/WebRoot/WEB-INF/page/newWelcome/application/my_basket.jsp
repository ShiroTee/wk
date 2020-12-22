<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:newHeader title="我的资源车"  curItem=""/>
<style>
.go_back {
    position: fixed;
    /* top: 30px; */
    /* left: -38px; */
    width: 77px;
    margin: 47px -50px;
    height: 42px;
    background-color: #4A90E2;
    background-image: url(${ctx}/resources/images/arrow_back.png);
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: all .5s;
        z-index: 10;
}
.empty_search_box{
	height: 340px;
    margin: 0;
    line-height: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    display: inline-block;
    text-align: left;
}
.empty_search_box .title{
	font-size: 20px;
    letter-spacing: 1px;
    text-align: left;
    margin: 75px 0 7px;
}
.empty_search_box .head_search{
	height: 48px;
	margin: 43px 0;
	float: none;
	position: relative;
}
.empty_search_box .head_search input{
	width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: left 12px center;
    background-size: 24px;
    padding-left: 48px;
}
.empty_search_box .head_search img {
    position: absolute;
    left: 0;
    top: 0;
    padding: 12px;
    opacity: .3;
}
.empty_search_box .search a{
	font-size: 16px;
    color: #3B92FD !important;
    text-decoration: none !important;
    letter-spacing: 0;
    margin-left: 12px;
}
#basket{
	width: 894px;
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.10);
}
.apply_box{
	position: fixed;
    width: 282px;
    right: calc(100% / 2 - 1200px /2);
    background: #fff;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.10);
    padding: 16px;
    font-size: 20px;
    color: #5C6C80;
    letter-spacing: 0;
}
.cart_col2 {
    margin: 0 204px 0 170px;
}
.cart_col3 {
    width: 184px;
}
.cart_col3 div{
	position: absolute;
    top: 50%;
    margin-top: -16px;
}
.cart_col3 a{
	background: #4A90E2;
    border: 1px solid #4A90E2;
    font-size: 12px;
    color: #fff;
    height: 33px;
    display: inline-block;
    line-height: 33px;
    padding: 0 26px;
}
.cart_col3 a:first-child{
	border: 1px solid #EC5265;
	color: #ED586A;
	background: #fff;
    margin-right: 4px;
}
.cart_col3 a:hover{
	background: #1eb0f5;
	text-decoration: none;
}
.cart_col3 a:first-child:hover{
	background: #fff;
}

</style>
<div style="padding-top: 98px;height: 1px;"></div>
<section class="main_page">
	<!-- 如果资源车为空的 -->
	<div id="emptyBasket">
		<div style="text-align: center;font-size: 16px;">
			<img style="margin-bottom: 3px;margin-right: 60px;display: inline-block;" src="${ctx}/page/newWelcome/base/images/empty_basket.svg">
			<div class="empty_search_box">
				<div class="title">你的资源车还是空的，赶紧行动吧 !</div>
				<form onsubmit="return false;" class="head_search">
					<input name="" type="text" placeholder="请输入关键词" class="search_input">
					<img src="${ctx}/page/newWelcome/base/images/search_bsvg.svg">								
				</form>
				<div class="search">
					搜索
					<a href="javascript:void(0);" onclick="myBasket();">资源目录列表</a>
					<a href="javascript:void(0);" onclick="searchApi();">API数据服务列表</a>
				</div>
			</div>
		</div>
	</div>
	<div id="basket" style="display:none;">	
		<a class="go_back hide" href="javascript:window.history.go(-1);"></a>
		<div class="apply_box">
			<div class="apply_num">
					已选择<span>0</span>个资源
			</div>
			<a href="javascript:void(0);" class="apply_submit" onclick="apply();">申请</a>				
		</div>
		<div class="rel cart_head">
			<div class="cart_col1">
				<label class="exam_check checkAll">
					<div class="exam_checkbtn" style="top:22px;"></div>
					<input type="checkbox">
					我的资源车
				</label>
			</div>
			<div class="cart_col2">&nbsp;</div>
			<div class="cart_col3">&nbsp;</div>
		</div>
		<!--  信息资源目录 -->
		<div class="cart_shop hide" id="route_cartshop">
			<div class="cart_shopName">
				<label class="exam_check CatalogAll">
					<div class="exam_checkbtn "></div>
					<input type="checkbox">
					<i class="ico i307 cart_shopIco"></i>
					信息资源目录
				</label>
			</div>
			<div class="cart_shopList" id="rc_CatalogList">
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
						<a href="javascript:;" class="cart_del"><i class="ico i205 cart_delIco"></i>删除</a>
					</div>
				</label>
			</div>
		</div>
		<!--  API -->
		<div class="cart_shop hide" id="api_cartshop">			
			<div class="cart_shopName">
			</div>
			<div class="cart_shopList" id="rc_ApiList">
			</div>
		</div>
		<div class="apply clearfix">
				<label class="exam_check checkAll">
					<div class="exam_checkbtn "></div>
					<input type="checkbox">
					全选
				</label>
				<a href="javascript:void(0);" class="link1" onclick="deleteCheckResource();">删除选中的资源</a>				
		</div>
	</div>
</section>

<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/cookieUtils.js"></script>
<script src="${ctx}/page/newWelcome/application/js/my_backet.js"></script>
<script>
	function searchApi(){
		location.href = ctx + "/mdp/welcome/api/index.html";
	}
</script>
<mdp:mdpFooter />



