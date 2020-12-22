<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/cookieUtils.js"></script>
	
<mdp:newHeader title="信息资源查询" curItem="mulu" />
<div class="main_head">
	<div class="main_head_container">
		<span class="cur_title l">资源申请</span>
		<form onsubmit="return false;" class="head_search">
			<input name="" type="text" onkeyup="if(event.keyCode==13)query();" placeholder="请输入关键词" class="search_input" value="${searchtext}">
			<img src="${ctx}/page/newWelcome/base/images/search_bsvg.svg" onclick="query();">
			<div class="hot_search_box" style="transform: rotateY(90deg);">
				<div>搜索热词：</div>
				<ul>
					<li>热词1</li>
					<li>热词2</li>
					<li>热词3</li>
					<li>热词4</li>
				</ul>
			</div>				
		</form>
	</div>
</div>
<section class="main_page">	
	<div class="filter_box">
		<div class="filter_category" style="transform: rotateY(90deg);">
    		<span><i class="cur">全部</i></span>
    		<span><i>信息化建设状况</i></span>
    		<span><i>部门信息资源应用情况</i></span>
    		<span><i>部门信息资源共享情况</i></span>
    		<span><i>信息资源对外开放情况</i></span>
    		<span><i>信息资源对外服务情况</i></span>
    	</div>
		<div class="filter_target">
			<span>筛选</span>
		</div>
		<div class="filter_content" style="display:none;">
			<div class="filter_content_close">收起</div>
			<div class="filter_line">
				<div class="filter_name">组织机构</div>
				<div class="filter_list assetOrgs">
					<span class="filter_all cur">全部</span>
				</div>
			</div>
			<div class="filter_line" style="display: none;">
				<div class="filter_name">应用主题</div>
				<div class="filter_list">
					<span class="filter_all cur">全部</span>
					<span>经济建设</span>
					<span>资源环境</span>
					<span>卫生健康</span>
					<span>教育</span>
					<span>科技</span>
					<span>旅游</span>
					<span>道路交通</span>
					<span>个人信息</span>
					<span>其他</span>
				</div>
			</div>
		</div>
	</div>	
	<div id="main_content" class="card_box"></div>
	<div class="paging" style="margin-right: 32px;">			
		<div class="page_goto" style="margin-top: 3px;">
			跳至 <input class="goto" value="1" onkeyup="if(event.keyCode==13)query(this.value);" > 页
		</div>
		<div class="page_size">
			<span value="8">8条/页</span> <i class="fa fa-angle-down r" style="margin-top: 4px;"></i>
			<ul>
				<li value="8">8条/页</li>
				<li value="16">16条/页</li>
				<li value="20">20条/页</li>
				<li value="24">24条/页</li>
			</ul>
		</div>
		<div class="page_list">
	    </div>
	</div>
</section>
 
<script>
	$(function() {
		initEvent();		 
		query();
		queryOrgs();
	})
	
	function initEvent(){
		$('body').delegate('.filter_box .filter_list span', 'click', function() {
			query();
		}).delegate('.card .img_box img', 'click', function() {
			location.href = ctx + "/mdp/welcome/resourceCatalog/details.html?routeid=" + $(this).attr("routeid");
		}).delegate('.card .img_box div', 'click', function() {
			addBasket($(this));
		}).delegate('.card a.icon_application', 'click', function() {
			var resid = $(this).attr("routeid");
			//window.open(ctx + "/mdp/admin/applyResourceController/applyResource.html?resourceId="+ $(this).attr("routeid"));
			$.ajax({
				url : ctx + '/mdp/admin/applyResourceController/checkAppyExist.json',
				method : "post",
				dataType : "json",
				data : {
					resourceId : $(this).attr("routeid")
				},
				success : function(d) {
					if (d.success) {
						window.open(ctx + "/mdp/admin/applyResourceController/applyResource.html?resourceId=" + resid);
					} else {
						$.alert(d.msg);
					}

				},
				error : function(data, status, e) {
					window.open(ctx + "/mdp/admin/applyResourceController/applyResource.html?resourceId=" + resid);
				}
			});

		});
		$(document).on("click",".pagenumCss",function(){
			var start=1;
			if(   $(this).attr("value") != undefined){
				start = $(this).attr("value");
			}
			query(start);
		});
		$(".page_size").find("li").on("click",function(){
               $(".page_size").find("span").attr("value",$(this).attr("value"));
               $(".page_size").find("span").html($(this).text());
               query();
		});
		$(".goto").on("blur",function(){
			 if( isNaN($(this).val()) ){
				 $(this).val(1);
			 }
			 query($(this).val());
		});
	}

	/**
	 * 加入购物车
	 */
	function addBasket(obj) {
		var route = mycookie("routeList");
		var routeList = [];
		if(route != null && "" != route ){
			routeList = route.split(",");
		}
		if(routeList.indexOf(obj.attr("routeid")) != -1){
			$.msg("该资源已在资源车");
			return;
		}
		routeList.push(obj.attr("routeid"));
		mycookie("routeList",routeList.join(","),{ path: '/', expires: 30 });
		$.msg('恭喜！“' + obj.attr('data-name') + '”已添加至加资源车。',true);
		setApplyResourceCount();
		//window.open(ctx + "/mdp/welcome/application/basket.html");
	}
	function query(start) {
		if(start==null) start=1;
		var orgConditon="";
		 $(".assetOrgs").find("span.cur").each(function(){
		 	if($(this).text() == '全部'){
		 		return;
		 	}
			orgConditon+=$(this).text()+" ";
		 });
		var params = {
			pageSize : $(".page_size").find("span").attr("value"),
			pageIndex : start,
			condition:$('.search_input').val(),
			orgConditon: orgConditon
		};
		$.ajax({
			url : ctx + "/mdp/welcome/resourceCatalog/queryAsset.json",
			data : params,
			dataType : "json",
			type : "post",
			success : function(data) {
				console.log(data);
				$("#main_content").html('');	
				$('.paging').show();			
				if(data.list.length == 0){
					$("#main_content").append('<div class="noRel">暂无资源</div>');
					$('.paging').hide();
					return;
				}
				var html = [];
				for( var i=0;i<data.list.length;i++){
					html.push('<div class="card">');
					html.push('<div class="img_box">');
					html.push('<img src="${ctx}/resources/images/iconsvg.svg" routeid="' + data.list[i].asset_id + '">');
					html.push('<div routeid="'+data.list[i].asset_id+'" data-name="'+data.list[i].asset_name+'">加入资源车</div>');
					html.push('</div>');
					html.push('<div class="title">'+data.list[i].asset_name+'</div>');
					html.push('<div class="tag">');
					html.push('<span>'+data.list[i].org_nm+'</span>');
					html.push('<div>');
					html.push('<i class="icon_eye">'+data.list[i].accessnum+'</i>');
					html.push('<i class="icon_apply_count">'+data.list[i].applycount+'</i>');
					html.push('</div>');
					html.push('</div>');
					html.push('</div>');
				}
				$("#main_content").append(html.join(''));
				setTimeout(function(){
					$('.card').each(function(i,item){
						$(this).css('transform','translateY(0px)').css('opacity','1').css('transition-delay', i*0.1 + 's');
					});
				},100);
			 
				var pagenumHtm="";
				if( data.hasNext){
					pagenumHtm+='<div class="pagination_next_box"><i title="下一页" class="pagination_next fa fa-angle-right pagenumCss"  value="'+(data.currentPage+1)+'" ></i> <i title="末页" class="pagination_last fa fa-angle-double-right pagenumCss" value="'+(data.totalPage)+'" ></i></div>';
				}
				pagenumHtm+='<ul>';
				$(data.pagenums).each(function(){
					if( data.currentPage ==  $(this).get(0)){
						pagenumHtm+='<li class="cur pagenumCss"  value="'+$(this).get(0)+'" >'+$(this).get(0)+'</li>';
					}else{
						pagenumHtm+='<li class="pagenumCss"  value="'+$(this).get(0)+'" >'+$(this).get(0)+'</li>';
					}
					
				});
				pagenumHtm+='</ul>';
				if( data.hasPrev){
					pagenumHtm+='<div class="pagination_prev_box"><i title="首页" class="pagination_first fa fa-angle-double-left  pagenumCss" value="1"></i> <i title="上一页" class="pagination_prev fa fa-angle-left pagenumCss " value="'+(data.currentPage-1)+'" ></i></div>';
					
				}
				$(".page_list").html(pagenumHtm);
				$(".goto").val(data.currentPage);
			}
		});
	}

	function queryOrgs(){
		$.ajax({
			url : ctx + "/mdp/welcome/resourceCatalog/queryAssetCategory.json",
			dataType : "json",
			type : "post",
			success : function(data) {
				console.log(data);
				//assetOrgs
				//<span>工商</span>/ <span class="cur">公安</span>/ 
				var html="<span class='filter_all cur'>全部</span>";
				if( data != null && data.orgs !=null){
                   $(data.orgs).each(function(){
                	   html+="<span>"+$(this).get(0).ORG_NM+"</span>";
                   });
				}
				$(".assetOrgs").html(html);
			}
		})
	}
</script>
 
<mdp:mdpFooter />