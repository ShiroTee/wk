<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>    
<mdp:mdpHeader title="人口画像"  curItem="information" hideHead="true"/>
<link rel="stylesheet" href="${ctx }/page/welcome/portrait/css/index.css"/>
<link rel="stylesheet" href="${ctx }/page/welcome/portrait/css/details.css"/>

<script src="${ctx }/resources/ace/assets/js/bootstrap.min.js"></script>
<script src="${ctx }/page/welcome/portrait/js/jsrender.min.js"></script>
<script src="${ctx }/page/welcome/portrait/js/portrait.js"></script>
<section id="main">
	<!-- 背景图 -->
	<img class="background_rotate" src="${ctx }/page/welcome/portrait/images/background_rotatesvg.svg" />
	<div class="background_rotate background_point"></div>
	<!-- 左边基本信息 -->
	<div class="left_area">
		<input name="" type="button" data-modecode="PORTRAIT" value="模型" class="search_btn show_model">
		<form class="search_box">
        	<div class="search_left">
            	<input name="" id="searchIdinput" type="text" placeholder="请输入身份证号码" class="search_input" value="<%=request.getParameter("id") %>">
            	<ul class="id_list">
            		<li>532901198907193777</li>
            		<li>362323200112200543</li>
            		<li>532901199909302222</li>
            		<li>532901197705201228</li>
            	</ul>
        	</div>
        	<input name="" type="button" id="searchIdbutton"   value="查询" class="search_btn">
    	</form>
    	<div class="base_info box" id="userbaseinfo"></div>
    	<div class="box head_box" id="moreinfo">
    		更多信息
    		<i style="right: auto;margin-left: 10px;"></i>
    	</div>
    	<div class="box more_info_box base_info " id="userdetailinfo"></div>
    </div>
    <!-- 中间人物图 -->
    <div class="person_box"  >
		<div id="xbpic" >
			<!-- 如果是女的
    		<img src="${ctx }/page/welcome/portrait/images/mansvg.svg" /> 
    	 	-->
    		<!-- <img src="${ctx }/page/welcome/portrait/images/womansvg.svg" />  -->
		</div>    	
    	<ul id="usertags">
			<!-- 	<li>档案</li>    	
    		<li>征信</li>
    		<li>技能</li>
    		<li>职业</li>
    		<li class="w4">医疗保险</li>
    		<li>教育</li> 
    		-->    	 
    	</ul>
    </div>
  
   <!-- 右边信息 -->
    <div class="right_area_box">
    	<div class="classify"></div>
    	<div style="height: 100%;width: 100%;overflow: hidden;border: 1px solid #298EC2;">
    		<div class="right_area">    	
    			<div class="more_info_title" > </div>
    			<div id="tagcontentid"></div>
    		</div>
    	</div>
    </div>    
</section>
<!-- 异常提示框  --> 
<div id="infoid" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-md" role="document">
		<div  class="modal-content">
			<div class="modal-header text-warning">操作提示</div>
			<div class="modal-body" id="infocontent" > </div>
		</div>
	</div>
</div>

 
<script id="tagdetailTemp" type="text/x-jsrender"  >
	  {{for result}}
         {{for datas}}
	        <p><span>{{:key}}</span><span>{{:value}}</span></p>
         {{/for}}
	  {{/for}}
 </script>
 
 <script id="usertagTmp" type="text/x-jsrender"  >
	{{for datas}}
		<li class="w4" child="{{:children}}"  >{{:key}}</li>
	{{/for}}
</script>

<script id="moreinfoTmp" type="text/x-jsrender"  >
	<p><span>详细信息</span></p>
	{{for datas2}}
		<p><span>{{:key}}</span><span>{{:value}}</span></p>
	{{/for}}
</script>
<script id="infoTmp" type="text/x-jsrender"  >
	<div class="head_image_box">
	{{if idpic != '' }} 
		<img alt="" width="100%" height="200" src="${ctx }/tmp/{{:idpic}}" />           
	{{/if}}
	{{if idpic == '' }} 
		<img width="100%" height="200"  src="${ctx }/page/welcome/portrait/images/defaultsvg.svg" /> 
	{{/if}}
	</div>
	<div>
	{{for datas}}
		<p><span>{{:key}}</span><span>{{:value}}</span></p>
	{{/for}}
	</div>
</script>
<script>
	$(function(){
		$("#moreinfo").toggleClass('open');
		$("#userdetailinfo").toggle();
		$('body').delegate('.head_box','click',function(){
			$(this).toggleClass('open');
			if($(this).next().attr('style') && $(this).next().attr('style').indexOf('block') > 0){
				$(this).next().slideUp();
			}else{
				if($(this).attr("id") != "moreinfo"){
					console.log($(this).attr("values"));
					seachDetail($(this));
				}else{
					$(this).next().slideDown();
				}
			}
		}).delegate('.person_box li','click',function(){
			$('.person_box').addClass('show_info');
			$('.left_area .base_info').addClass('more_info_show');
			$('.classify').html($(this).html());	
			$('.more_info_title').html($(this).html());	
			//
			var  children = $(this).attr("child") ;	
			var tempchilds = children.split(";");
			$("#tagcontentid").html("");
			for(var i= 0 ;i<tempchilds.length;i++){
				var html = '<div class="box head_box s'+i+' " values="'+tempchilds[i].split("=")[1]+'" >';
			 	html+= tempchilds[i].split("=")[0];
			 	html+='<i></i>'; 
			 	html+='</div>'; 
			 	html+='<div class="box more_info_box"></div>'; 
			    $("#tagcontentid").append(html);
			}

			 $(".s0").trigger("click");
			  
		}).delegate('#searchIdinput','click',function(){
			$('.id_list').show();
			event.stopPropagation();
			return false;
		}).delegate('.id_list li','click',function(){
			$('#searchIdinput').val($(this).text());
		}).on('click',function(){
			$('.id_list').hide();
		})
 	});
 	
</script>

<script src="${ctx }/resources/jTopo/js/topo.js"></script>
