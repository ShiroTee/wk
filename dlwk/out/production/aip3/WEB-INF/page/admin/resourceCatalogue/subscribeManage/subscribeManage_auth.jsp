<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>

<!-- <div class="panel-group mr15" id="subscribeManageAccordion"
	role="tablist" aria-multiselectable="true">
	

	<div class="panel panel-default">
		<div class="panel-heading" role="tab" id="subscribeManageHeadingThree">
			<h4 class="panel-title">
				<a class="collapsed" role="button" data-toggle="collapse"
					data-parent="#subscribeManageAccordion"
					href="#subscribeManageCollapseFour" aria-expanded="true"
					aria-controls="subscribeManageCollapseFour"> 授权码关联设置 </a>
			</h4>
		</div>
		<div id="subscribeManageCollapseFour" class="panel-collapse  "
			role="tabpanel" aria-labelledby="subscribeManageHeadingThree">
			<div class="panel-body"> -->
			<div class="mr15">
				<div class="clearfix box inline_any mb20" style="width: 100%;">
					<div class="l pl20 clearfix" style="line-height: 40px;">
						<div class="inline_any">
							申请人 <input type="text" id="auth_username" placeholder="申请人"
								class="nav-search-input search_sm_input mt10 ml5 mr20"
								style="width: 160px;">
						</div>
						<div class="inline_any">
							资源目录 <input type="text"  id="auth_resname" placeholder="资源目录名称"
								class="nav-search-input search_sm_input mt10 ml5 mr20"
								style="width: 160px;">
						</div>
						<div class="inline_any">
							授权码 <input type="text" id="auth_code" placeholder="授权码"
								class="nav-search-input search_sm_input mt10 ml5 mr20"
								style="width: 160px;">
						</div>
						<input id="dict-search-btn" type="button"  onclick="listAuth();" value="搜索"
							class="search_sm_submit search-btn"
							style="cursor: pointer; line-height: 24px;">
					</div>
				</div>
				<table id="authority-list" width="100%" border="0" cellspacing="0"
					cellpadding="0" class="tabl mb10">
					<thead>
						<tr>
							<th>资源目录</th>
							<th>申请人部门</th>
							<th>申请人</th>
							<th>申请日期</th>
							<th>对应授权码</th>
							 
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="listauthtable">
				  
					</tbody>
				</table>
				<div id="navApplyId4"><%@include
						file="../../../common/admin-pagination.jsp"%></div>
			</div>
		</div>
		<!-- </div>
	</div>
</div>-->
<script>
	$(function() {
		$('body')
				.delegate(
						'.requestdetailAuth',
						'click', showDetails);
		$(document).on("click",".searchAuthDetailAuth",function(){
			$.modal({
				url : ctx+"/mdp/admin/applyResourceController/processAuthHistory.html",
				title : '申请详情查看',
				size : 'modal-lg',
				data : {
					resId:  $(this).attr("resid")  ,
					userId :  $(this).attr("userid")
				}
			}); 
		});
	});
	function showDetails() {
		var requestId = $(this).attr("data-requestId");
		$.modal({
			url : ctx+"/mdp/admin/applyResourceController/processHistory.html",
			title : '申请详情查看',
			size : 'modal-lg',
			data : {
				op : "edit",
				dictId : requestId,
				processId:  $(this).attr("processId")  ,
				orderId :  $(this).attr("orderId")
			}
		});
	}
	function authorityService() {
		var requestId = $(this).attr("data-requestId");
		$.modal({
			url : "admin/resourceCatalogue/subscribeService.html",
			title : '授权服务',
			size : 'modal-lg',
			data : {
				op : "edit",
				dictId : requestId
			}
		});
	}
	function authorityFile() {
		var requestId = $(this).attr("data-requestId");
		$.modal({
			url : "admin/resourceCatalogue/subscribeFile.html",
			title : '授权文件',
			size : 'modal-lg',
			data : {
				op : "edit",
				dictId : requestId
			}
		});
	}
	 

	function authService(userid,resId,dataType){
		var url = "";
		if( dataType=="0"){
			url =  "admin/resourceCatalogue/serviceList.html";
		}else{
			url =  "admin/resourceCatalogue/fileList.html";
		}
		$.modal({
			url : url,
			title : '服务列表',
			size:'modal-lg',
			data :{
				op : "edit",
				id : resId,
				from: 2,
				userId:userid
			}
		});
	}
</script>
<script type="text/javascript"
	src="${ctx }/page/admin/datamodel/jsrender.min.js" />
<script
	src="${ctx }/page/admin/resourceCatalogue/subscribeManage/js/subscribeManageAuth.js"
	defer="defer" />

 
<script id="authtemplate" type="text/x-jsrender">
{{for list}}
						<tr>
							<td>{{:asset_name}}</td>
							<td>{{:user_org_name}}</td>
							<td>{{:name}}</td>
							<td>{{:applytime}}</td>
							<td>{{:authcode}}</td>
							<td>
								<div>
									<a class="subscribe-request-details searchAuthDetailAuth" href="javascript:void(0);" userid="{{:applyuserid}}" resid="{{:resourceid}}"
										title="查看申请详情" data-requestId=""> <i
										class="icon icon-search mr5" aria-hidden="true"></i>
									</a> <a class="subscribe-authority-service" datatype="{{:dataType}}" userid="{{:applyuserid}}" resid="{{:resourceid}}" onclick="authService('{{:applyuserid}}','{{:resourceid}}','{{:dataType}}');"
										href="javascript:void(0);" title="授权服务" data-requestId="">
										<i class="icon icon-cogs" aria-hidden="true"></i>
									</a>
								</div>
							</td>
						</tr>
{{/for}}
</script>
 