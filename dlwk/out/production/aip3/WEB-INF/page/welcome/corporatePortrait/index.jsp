<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>    
<mdp:mdpHeader title="企业画像"  curItem="information" hideHead="true"/>
<link rel="stylesheet" href="${ctx }/page/welcome/corporatePortrait/css/index.css"/>
<section>
	<img class="ball_back" src="${ctx }/page/welcome/corporatePortrait/images/ball_back@2x.png"  style="z-index:1;"/>
	<img class="ball" src="${ctx }/page/welcome/corporatePortrait/images/ball@2x.png"  style="z-index:2;"/>
	<img class="title" src="${ctx }/page/welcome/corporatePortrait/images/title@2x.png" style="z-index:3;"/>
	<form class="search_box">
        <div class="search_left">
            <input  name="searchinput"  type="text" placeholder="请输入统一社会信息代码或公司注册号" class="search_input" value="3203051100926">
        </div>
        <input name="" type="button" value="查询" class="search_btn">
    </form>
</section>
<script>
	$(function(){
		$('.search_btn').on('click',function(){
			
			location.href = ctx + '/mdp/welcome/corporatePortrait/details.html?id='+$("[name=searchinput]").val();
		})
		/* 控制图片左右晃动的js代码 */
		var oUl=document.getElementsByTagName('section')[0],
			l = oUl.offsetWidth/2,
			t = oUl.offsetHeight/2,
			aLi=oUl.getElementsByTagName('img');
		oUl.onmousemove = function( ev ){
			var oEv = ev || event,
				iL = oEv.clientX,
				iT = oEv.clientY;

			for(var i=0; i<aLi.length; i++){
				if($(aLi[i]).hasClass('title')){
					return;
				}
				aLi[i].style.marginLeft=(iL - l )/100*aLi[i].style.zIndex+'px';
				aLi[i].style.marginTop=(iT - t )/70*aLi[i].style.zIndex+'px';
			}
		}
	})
</script>