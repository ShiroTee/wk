<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>   
<link rel="stylesheet" href="${ctx }/page/newWelcome/api/css/details.css"/> 
<script type="text/javascript"
	src="${ctx}/page/welcome/application/js/cookieUtils.js"></script>
<mdp:newHeader title="-" curItem="mulu"/>
<style>
	.tab_content_nav {
    	width: 120px;
	}
	.tab_content_main {
    	width: calc(100% - 120px);
    	float: left;
	}
</style>
<script>	
	$(function(){
		initPage_routeDetails();
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
	
	//初始化页面
	function initPage_routeDetails(){
		var urlData = GetURLRequest();
		var routeid = urlData.routeid;
		get_routeDetails(routeid);
		getFile_routeDetails(routeid);
		getService_routeDetails(routeid);
		getResCodeDetails(routeid);
	}
	
	function getResCodeDetails(routeid){
		
		$.ajax({
			url : ctx + "/mdp/welcome/applyResourceController/getResDetail.json",
			data : {resourceId:routeid},
			type : "post",
			dataType : "json",
			success : function(data){
				if(data != null && data.length>0){
					var html = ''
					for(var i=0;i<data.length;i++){
						html += '<tr>';
						html += '<td>' + data[i].field.fieldName + '</td>';
						html += '<td>' + data[i].field.pyName + '</td>';
						html += '<td>' + data[i].field.dataType + '</td>';
						html += '<td>' + data[i].dataLength + '</td>';
						html += '<td>' + data[i].decLength + '</td>';
						html += '</tr>';
					}
					$("#formDetail_routeDetails tbody").html(html);
				}
			}
		})
	}
	
	function get_routeDetails(routeid){
		$.ajax({
			url : ctx + "/mdp/welcome/resourceCatalogue/getResourceDetail.json",
			data : {resourceId:routeid},
			type : "post",
			dataType : "json",
			success : function(data){
				$("title").html(data[0].resourceName);
				$(".api_title").html(data[0].resourceName);
				var provider = '-';
				if(data[0].provider.orgName != null){
					provider = data[0].provider.orgName;
				}
				$("#provider_routeDetails").html(provider);
				var flashRate = '-';
				if(data[0].updateRate != null){
					flashRate = data[0].updateRate;
					switch(flashRate){
					case 0 : flashRate = '实时';break;
					case 1 : flashRate = '日';break;
					case 2 : flashRate = '半月';break;
					case 3 : flashRate = '月';break;
					case 4 : flashRate = '季';break;
					case 5 : flashRate = '半季';break;
					case 6 : flashRate = '年';break;
					case 7 : flashRate = '半年';break;
					}
				}
				$("#flashRate_routeDetails").html(flashRate);
				var gxjb = '-';
				if(data[0].secrLv.secrTypeName !=null){
					gxjb = data[0].secrLv.secrTypeName;
				}
				$("#gxjb_routeDetails").html(gxjb);
				var finalUpdateTime = '-';
				if(data[0].finalUpdateDate != null){
					finalUpdateTime = TimestampToStr(data[0].finalUpdateDate,"yyyy-MM-dd hh:mm:ss");
				}
				$("#updateTime_routeDetails").html(finalUpdateTime);
			}
		})
	}
	
	function getFile_routeDetails(routeid){
		$.ajax({
			url : ctx + "/mdp/welcome/serviceInfo/getFileServiceByResourceId.json",
			data : {resourceId:routeid,start:0,limit:1000},
			type : "post",
			dataType : "json",
			success : function(data){
				if(data.count != null && data.count>0){
					var html = '';
					for(var i=0;i<data.list.length;i++){
						var content = data.list[i];
						html += '<tr>';
						html += '<td>' + content.routeName + '</td>';
						html += '<td>' + content.fileSizef + '</td>';
						html += '<td>' + content.showURL + '</td>';
						html += '<td>' + TimestampToStr(content.publishDate,"yyyy-MM-dd") + '</td>';
						if(content.routeStatus == 1){
							html += '<td style="color:green">正常</td>';
						}
						else{
							html += '<td style="color:red">异常</td>';
						}
					}
					$("#fileList_routeDetails tbody").html(html);
				}
			}
		})
	}
	
	function getService_routeDetails(routeid){
		$.ajax({
			url : ctx + "/mdp/welcome/serviceInfo/getWebServiceByResourceId.json",
			data : {resourceId:routeid,start:0,limit:1000},
			type : "post",
			dataType : "json",
			success : function(data){
				if(data.count != null && data.count>0){
					var html = '';
					for(var i=0;i<data.list.length;i++){
						var content = data.list[i];
						html += '<tr>';
						html += '<td>' + content.routeName + '</td>';
						html += '<td>' + content.routeType + '</td>';
						html += '<td>' + content.showURL + '</td>';
						html += '<td>' + TimestampToStr(content.publishDate,"yyyy-MM-dd") + '</td>';
						if(content.routeStatus == 1){
							html += '<td style="color:green">正常</td>';
						}
						else{
							html += '<td style="color:red">异常</td>';
						}
					}
					$("#serviceList_routeDetails tbody").html(html);
				}
			}
		})
	}
	
	/**
	*立即申请
	*/
	function buyNow(){
		var urlData = GetURLRequest();
		var routeid = urlData.routeid;
		$.ajax({
			url : ctx + '/mdp/admin/applyResourceController/checkAppyExist.json',
			method : "post",
			dataType : "json",
			data : {
				resourceId : routeid
			},
			success : function(d) {
				if (d.success) {
					window.open(ctx + "/mdp/admin/applyResourceController/applyResource.html?resourceId=" + routeid);
				} else {
					$.alert(d.msg);
				}

			},
			error : function(data, status, e) {
				window.open(ctx + "/mdp/admin/applyResourceController/applyResource.html?resourceId=" + routeid);
			}
		});
	}
	/**
	*加入购物车
	*/
	function addBasket() {
		var urlData = GetURLRequest();
		var routeid = urlData.routeid;
		var route = mycookie("routeList");
		var routeList = [];
		if(route != null && "" != route ){
			routeList = route.split(",");
		}
		if(routeList.indexOf(routeid) != -1){
			$.msg("该资源已在资源车");
			return;
		}
		routeList.push(routeid);
		mycookie("routeList",routeList.join(","),{ path: '/', expires: 30 });
		$.msg('恭喜！“' + $('.api_title').text() + '”已添加至加资源车。',true);
		setApplyResourceCount();
		//window.open(ctx + "/mdp/welcome/application/basket.html");
	}
	function GetURLRequest() {
		var url = location.search; //获取url中"?"符后的字串 
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	/**
	 * timestamp 转时间字符串
	 */
	function TimestampToStr(timestamp,format) {
		var newDate = new Date();
		newDate.setTime(timestamp);
		return newDate.format(format);
	}
</script>
<div style="padding-top: 98px;"></div>
<section class="main_page">
	<a class="go_back" href="${ctx }/mdp/welcome/resourceCatalog/query.html"></a>
	<div class="card_info">
		<p class="api_title">-</p>
		<div class="api_icon"></div>
		<div class="base_info">			
			<p>
				<i>数据来源：<span id="provider_routeDetails">-</span></i>
			</p>
			<p>
				
				<i>更新频率：<span id="flashRate_routeDetails">-</span></i>
			</p>
			<p>
				<i>共享级别：<span id="gxjb_routeDetails">-</span></i>
				
			</p>
			<p>
				<i>更新时间：<span id="updateTime_routeDetails">-</span></i>
			</p>
		</div>
		<div class="btn_area">
			<a href="javascript:void(0);" onclick="addBasket()">加入资源车</a>
			<a href="javascript:void(0);" onclick="buyNow()">立即申请</a>
		</div>
	</div>
	<div class="main_details">
	<div class="tab_container">
		<div data-tab-item="details" class="tab_head_item cur">
			<span>详情</span>
		</div>
		<!-- <div data-tab-item="more" class="tab_head_item">
			<span>他还发布了</span>
		</div> -->
	</div>
	<div class="tab_main">
		<div data-tab-item="details" class="tab_content">
			<ul class="tab_content_nav">
				<li data-item="dataField" class="cur"><i></i>字段描述</li>
				<li data-item="service" ><i></i>服务描述</li>
				<li data-item="file"><i></i>文件描述</li>
			</ul>
			<div class="tab_content_main">
				<div data-item="service" style="font-size: 12px;display:none;">
					<table id="serviceList_routeDetails" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_cus">
						<thead>
						<tr>
							<th style="width:200px;">服务名称</th>
							<th style="width:60px;">类型</th>
							<th style="width:280px;">发布地址</th>
							<th style="width:110px;">发布日期</th>
							<th style="width:60px;">状态</th>
						</tr>
						</thead>
						<tbody>
							<tr><td colspan="5" style="text-align:center;">暂无数据</td></tr>
						</tbody>												
					</table>
				</div>
				<div data-item="dataField" style="font-size: 12px;">
					<table id="formDetail_routeDetails" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_cus">
						<thead>
						<tr>
							<th>字段名称</th>
							<th>拼音</th>
							<th>数据类型</th>
							<th>长度</th>
							<th>小数位数</th>
						</tr>
						</thead>
						<tbody>
							<tr><td colspan="5" style="text-align:center;">暂无数据</td></tr>
						</tbody>
					</table>
				</div>
				<div data-item="file" style="font-size: 12px;display:none;">
					<table  id="fileList_routeDetails" width="100%" border="0" cellspacing="0" cellpadding="0" class="table_cus">
						<thead>
						<tr>
							<th>文件名</th>
							<th>大小</th>
							<th>下载地址</th>
							<th>上传日期</th>
							<th>状态</th>
						</tr>
						</thead>
						<tbody>
							<tr><td colspan="5" style="text-align:center;">暂无数据</td></tr>
						</tbody>
					</table>
				</div>				
			</div>			
		</div>
		<div data-tab-item="more" class="tab_content" style="display:none;">
			<div class="card transition_1 l">			
				<div class="title" title="土地登记信息">土地登记信息</div>
				<div class="tag">
					<span>土地</span>
				</div>
				<i class="icon_eye">1,234</i>
				<i class="icon_download">4,211</i>
			</div>
			<div class="card transition_1 l">			
				<div class="title" title="测绘资质信息">测绘资质信息</div>
				<div class="tag">
					<span>土地</span>
				</div>
				<i class="icon_eye">1,234</i>
				<i class="icon_download">4,211</i>
			</div>
			<div class="card transition_1 l">			
				<div class="title" title="数字某某地理框架建设数据库">数字某某地理框架建设数据库</div>
				<div class="tag">
					<span>地理</span>
					<span>属性数据类目录</span>
				</div>
				<i class="icon_eye">1,234</i>
				<i class="icon_download">4,211</i>
			</div>			
		</div>		
	</div>
		</div>
</section>
<mdp:mdpFooter />