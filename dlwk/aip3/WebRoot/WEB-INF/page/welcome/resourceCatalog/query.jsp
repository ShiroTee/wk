<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/cookieUtils.js"></script>
	
<mdp:mdpHeader title="信息资源查询" curItem="mulu" />
<section class="main_page">
	<form onsubmit="return false;" class="search top_search">
		<div class="search_left">
			<div class="search_ico">
				<i class="ico i100"></i>
			</div>
			<input name="" type="text" onkeyup="if(event.keyCode==13)query();" placeholder="请输入关键词" class="search_input">
		</div>
		<input name="" type="button" onclick="query();" value="搜索" class="search_btn">
	</form>
	<div class="line">
		<span class="cur_title l">资源申请</span>
		<div class="cur_search l  hasSelectOrg" >
			当前选择&nbsp;/  
		</div>
		<div class="paging r" style="margin-right: 32px;">			
			<div class="page_goto">
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
	</div>
	<div style="display: inline-block; position: relative;" class="categorycss">
		<div class="category queryAllyList">
			<div class="category_title">
				<i class="icon_24 icon_table"></i>全部分类
			</div>
			<div class="category_main " style="width: 900px;">
				<div class="title">
					<i class="icon_16 icon_group mr15"></i>组织机构
				</div>
				<div class="line assetOrgs" >
				</div>
				<!-- <div class="title" onmouseup="">
					<i class="icon_16 icon_theme mr15"></i>应用主题
				</div>
				<div class="line">
					<span>经济建设</span>/ <span>资源环境</span>/ <span>卫生健康</span>/ <span>教育</span>/ <span>科技</span>/ <span>旅游</span>/ <span>道路交通</span>/ <span class="cur">个人信息</span>/
					<span>其他</span>
				</div> -->
			</div>
		</div>

	</div>
</section>
 
<script>
	$(function() {
		$('body').delegate('.card a.show_detail', 'click', function() {
			//location.href = ctx + "/mdp/welcome/resourceCatalog/details.html?routeid=" + $(this).attr("routeid");
			window.open( ctx + "/mdp/welcome/resourceCatalog/details.html?routeid=" + $(this).attr("routeid") );
			
			}).delegate('.card a.icon_basket', 'click', function() {
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
		 
		query();
		queryOrgs();
	})

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
			$.message("购物车已存在当前资源");
			return;
		}
		routeList.push(obj.attr("routeid"));
		mycookie("routeList",routeList.join(","),{ path: '/', expires: 30 });
		$.message("加入成功");
		setApplyResourceCount();
		//window.open(ctx + "/mdp/welcome/application/basket.html");
	}
	function query(start) {
		if(start==null) start=1;
		var orgConditon="";
		 $(".hasSelectOrg").find("span").each(function(){
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
				$(".queryAllyList").nextAll().remove();
				for( var i=0;i<data.list.length;i++){
					var html="";
					html+='<div class="card l " style="top:-50px;"   >';
					html+='<div class="todo">';
					html+='<div><a class="show_detail icon_detail" routeid="' + data.list[i].asset_id + '">查看详情</a></div>';
					html+='<div class="splite"></div>';
					html+='<div>';
					html+='<a class="icon_basket mr15" routeid="'+data.list[i].asset_id+'">加入资源车</a>';
					html+='<a class="icon_application" id="res_apply_id" routeid="'+data.list[i].asset_id+'">立即申请</a>';
					html+='</div>';
					html+='</div>';
					html+='<div class="title">'+data.list[i].asset_name+'</div>';
					html+='<div class="tag">';
					html+='<span>'+data.list[i].org_nm+'</span>';
					html+='</div>';
					html+='<i class="icon_eye">'+data.list[i].accessnum+'</i>'
					html+='<i class="icon_apply_count">'+data.list[i].applycount+'</i>';
					html+='</div>';
				    $(".queryAllyList").after(html);
				}
				var i=100;
				$(".queryAllyList").nextAll().each(function(){
					$(this).animate({opacity:"1"},500+i);
					i+=200;
				});
			 
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
				var html="";
				if( data != null && data.orgs !=null){
                   $(data.orgs).each(function(){
                	   html+="<span onclick='searchByOrgs(\""+$(this).get(0).ORG_NM+"\" );'>"+$(this).get(0).ORG_NM+"</span>/";
                   });
				}
				$(".assetOrgs").html(html);
			}
		})
	}

	//var orgConditon="";
	var searchByOrgs=function(orgname){
		 orgConditon="";
		 $(".hasSelectOrg").append('<span>'+orgname+'<i class="icon_close fa fa-close" onmouseup="deleteSearchOrg(this);" ></i></span>');
		 //var conditon = "";
		// $(".hasSelectOrg").find("span").each(function(){
		//	 conditon+=$(this).text()+" ";
		// });
		 //$('.search_input').val( conditon);
		 //orgConditon=conditon;
         query();
	}
	function deleteSearchOrg(obj){
		 orgConditon="";
		 $(obj).parent().remove();
		// var conditon = "";
		// $(".hasSelectOrg").find("span").each(function(){
		//	 conditon+=$(this).text()+" ";
		// });
		 //$('.search_input').val( conditon);
		// orgConditon=conditon;
         query();
	}
	
</script>
 
<mdp:mdpFooter />