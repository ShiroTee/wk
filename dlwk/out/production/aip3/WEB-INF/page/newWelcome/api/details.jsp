<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>  
<link rel="stylesheet" href="${ctx }/page/newWelcome/api/css/details.css"/>  
<mdp:newHeader title="API详情" curItem="information"/>
<script>	
	$(function(){
		$('body').delegate('.tab_head_item','click',function(){
			$('.tab_head_item').removeClass('cur');
			$(this).addClass('cur');
			$('.tab_main div[data-tab-item]').hide();
			$('.tab_main div[data-tab-item="' + $(this).attr('data-tab-item') + '"]').show();
		}).delegate('.tab_content_nav li','click',function(){
			$('.tab_content_nav li').removeClass('cur');
			$(this).addClass('cur');
			$(this).parent().next().find('div[data-item]').hide();
			$(this).parent().next().find('div[data-item="' + $(this).attr('data-item')+ '"]').show();
		})
		.delegate('.card','click',function(){
			window.open(location.href);
		})
	})
</script>

<script src="${ctx}/page/welcome/api/js/detail.js"></script>
<div style="padding-top: 98px;"></div>
<section class="main_page">
	<a class="go_back" href="javascript:void(0)" onclick="history.go(-1)"></a>
	<div class="card_info">
		<p class="api_title">香港房地产（租房及买房）信息</p>
		<div class="api_icon"></div>
		<div class="base_info">			
			<p style="display:none;">
				<i class="fa fa-heart full"></i>
				<i class="fa fa-heart full"></i>
				<i class="fa fa-heart full"></i>
				<i class="fa fa-heart full"></i>
				<i class="fa fa-heart"></i>
				<span>4.1</span>
			</p>
			<!-- <p>
				<i>服务商：<span>--</span></i>
				<i>服务区域：<span>--</span></i>
			</p> -->
			<p>
				<i>API状态：<span id="routestatus">-</span></i>
			</p>
			<p>				
				<i>更新时间：<span class="update_dt">-</span></i>
			</p>
			<p>
				<i>所属分类：<span title="" class="service_type">-</span></i>
			</p>
			<p>
				<i>服务简介：<span class="service_desc">-</span></i>
			</p>
		</div>
		<div class="btn_area">		
			<a href="javascript:void(0);">加入资源车</a>
			<a href="javascript:void(0);">立即申请</a>
		</div>
	</div>
	<div class="main_details">
	<div class="tab_container">
		<div data-tab-item="document" class="tab_head_item cur">
			<span>API文档</span>
		</div>
		<div data-tab-item="return_code" class="tab_head_item">
			<span>返回码</span>
		</div>
	</div>
	<div class="tab_main">
		<div data-tab-item="document" class="tab_content">
			<ul class="tab_content_nav" style="display:none;">
				<li class="cur"><i></i>房地产数据列表</li>
				<li><i></i>房地产数据具体信息</li>
				<li><i></i>其他接口</li>
			</ul>
			<div class="tab_content_main">
				<p>接口地址：<span class="service_url">-</span></p>
				<p>支持格式：<span>JSON</span></p>
				<p>请求方式：<span>GET</span></p>
				<p>请求示例：<span id="request_example">-</span></p>
				<p class="tab_content_title">请求参数说明</p>
				<div style="width:100%;">
					<table  id="request_param" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_cus">
						<tr>
							<th width="25%">名称</th>
							<th width="20%">数据类型</th>
							<th width="10%">必填</th>
							<th>说明</th>
						</tr>
					</table>
				</div>
				<p class="tab_content_title">返回参数说明</p>
				<div style="width:100%;">
					<table  id="response_param" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_cus">
						<tr>
							<th width="25%">名称</th>
							<th width="20%">数据类型</th>
							<th>说明</th>
						</tr>
					</table>
				</div>
				<p class="tab_content_title">JSON返回示例</p>
				<div style="width:100%;background: #F7F7F7;border-radius: 3px;padding: 18px 24px;
					min-height: 84px;line-height: 25px;    margin-bottom: 100px;">
    				<!-- <i class="copy r"></i> -->
					<pre id="response_example" style="word-break: break-all;border-style: none;background-color: inherit;">
						
					</pre>
				</div>
			</div>			
		</div>
		<div data-tab-item="return_code" class="tab_content" style="display:none;">
			<div  class="tab_content_main">
				<p class="tab_content_title">服务返回码</p>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table_cus">
					<tr>
						<th>错误码</th>
						<th>说明</th>
					</tr>
					<tr>
						<td>10001</td>
						<td>成功</td>
					</tr>
					<tr>
						<td>10002</td>
						<td>服务异常</td>
					</tr>
					<tr>
						<td>10003</td>
						<td>参数错误</td>
					</tr>
					<tr>
						<td>10004</td>
						<td>用户不存在</td>
					</tr>
					<tr>
						<td>10005</td>
						<td>用户已过期</td>
					</tr>
					<tr>
						<td>10006</td>
						<td>剩余查询次数不足</td>
					</tr>
					<tr>
						<td>10007</td>
						<td>用户已停用，请联系管理员</td>
					</tr>
					<tr>
						<td>10008</td>
						<td>请求ip未授权</td>
					</tr>
				</table>				
			</div>
		</div>
	</div>
	</div>
</section>
<script>
	$('.tab_item').click(function(){
		$('.tab_item').removeClass('cur');
		$(this).addClass('cur');
	});
</script>
<mdp:mdpFooter />