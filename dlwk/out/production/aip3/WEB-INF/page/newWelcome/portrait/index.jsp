<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>    
<mdp:mdpHeader title="人口画像"  curItem="information" hideHead="true"/>
<link rel="stylesheet" href="${ctx }/page/welcome/portrait/css/index.css"/>
<section>
	<img class="background_rotate" src="${ctx }/page/welcome/portrait/images/background_rotatesvg.svg" />
	<form class="search_box">
        <div class="search_left">
            <input  name="searchinput"  type="text" placeholder="请输入身份证号码" class="search_input" value="362323200112200543">
        </div>
        <input name="" type="button" value="查询" class="search_btn">
        <div class="title">个人画像查询</div>
    </form>
</section>
<script>
	$(function(){
		$('.search_btn').on('click',function(){
			location.href = ctx + '/mdp/welcome/portrait/details.html?id='+$("[name=searchinput]").val();
		})
	})
</script>