<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/resourceCatalog/css/view.css"/>
<mdp:mdpHeader title="我的资源车"  curItem=""/>
<style>
.go_back {
    position: fixed;
    /* top: 30px; */
    /* left: -38px; */
    width: 77px;
    margin: 47px -60px;
    height: 42px;
    background: url(${ctx}/resources/images/arrow_back.png) no-repeat center,linear-gradient(-52deg, #F76B1C 0%, #F89560 100%);
    cursor: pointer;
    transition: all .5s;
}
.cart_name:hover{
	color : #079ce3 !important;
}
.cart_name:visited{
	color: #444;
}

</style>
<section class="main_page">
<a class="go_back hide" href="javascript:window.history.go(-1);"></a>
	<!-- 如果资源车为空的 -->
	<div id="emptyBasket" class="box m20_0 p0_30">
		<div style="text-align: center;margin-top: 100px;height: 124px;font-size: 16px;">
			<img style="margin-bottom: 3px;height: 22px;margin-right: 10px;" src="${ctx}/page/welcome/application/images/right.png">
			你的资源车空空的 !&nbsp;
			<input type="button" style="cursor: pointer; width: 120px;font-size: 14px;" value="去逛逛" class="search_sm_submit" 
				onclick="myBasket();">
		</div>
	</div>
	<div id="basket" class="box p0_20" style="display:none;">
		<div class="line" style="line-height: 40px;border-bottom: 1px solid #d7d7d7;">
			<div class="basket" style="float: left;margin: 0 10px 0 0;width: 40px;min-width: 40px;height: 40px;border: 0;"></div>
    		<span class="cur_title l">我的资源车</span>
    	</div>
		<div class="rel cart_head">
			<div class="cart_col1">
				<label class="exam_check checkAll">
					<div class="exam_checkbtn "></div>
					<input type="checkbox">
					全选
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
				<a href="javascript:void(0);" class="apply_submit" onclick="apply();">申请</a>
				<div class="apply_num">
					已选择<span>0</span>个资源
				</div>
			</div>
	</div>
</section>

<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/cookieUtils.js"></script>
<script src="${ctx}/page/welcome/application/js/my_backet.js"></script>
<mdp:mdpFooter />



