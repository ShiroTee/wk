<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>

<!-- <div class="panel-group mr15" id="subscribeManageAccordion"
	role="tablist" aria-multiselectable="true">
	
	
	<div class="panel panel-default">
		<div class="panel-heading" role="tab" id="subscribeManageHeadingTwo">
			<h4 class="panel-title">
				<a class="collapsed" role="button" data-toggle="collapse"
					data-parent="#subscribeManageAccordion"  
					href="#subscribeManageCollapseTwo" 
					aria-controls="subscribeManageCollapseTwo"> 我的待办 </a>
			</h4>
		</div>
		<div id="subscribeManageCollapseTwo" class="panel-collapse "
			role="tabpanel" aria-labelledby="subscribeManageHeadingTwo">
			<div class="panel-body"> -->
			<div class="mr15">
			     <div class="clearfix box inline_any mb20 res_check_css" style="width: 100%;">
								<div class="l pl20 clearfix" style="line-height: 40px;">
					    <div class="inline_any">
							 <input type="text"   placeholder="请输入查询条件"
								class="nav-search-input search_sm_input mt10 ml5 mr20 resname"
								style="width: 160px;">
						</div>
						<!-- <div class="inline_any">
							申请人 <input type="text"   placeholder="申请人"
								class="nav-search-input search_sm_input mt10 ml5 mr20 applyuser"
								style="width: 160px;">
						</div> -->
						 
						<input id="dict-search-btn" type="button"  onclick="listApproval()" value="搜索"
							class="search_sm_submit search-btn"
							style="cursor: pointer; line-height: 24px;">
					</div>
			    </div>
				<table id="todo-list" width="100%" border="0" cellspacing="0"
					cellpadding="0" class="tabl mb10">
					<thead>
						<tr>
							<th>序号</th>
							<th>资产名称</th>
							<th>所有者</th>
							<th>申请人</th>
							<th>申请时间</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="checktableid">
						 
				
					</tbody>
				</table>
				<div id="navApplyId2"><%@include
						file="../../../common/admin-pagination.jsp"%></div>
			</div>
			<!-- </div>
		</div>
	</div>


</div> -->
<script>
	$(function() {
		$('body')
				.delegate(
						'.requestdetailCheck',
						'click', showDetails).delegate(".checktask",
								"click",checktask);
		$(document).on("click",".searchAuthDetailCheck",function(){
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
	function checktask(){
		var processId =  $(this).attr("processId")  ;
		var orderId =  $(this).attr("orderId");
		var taskId =  $(this).attr("taskId");
		var actionUrl = $(this).attr("actionUrl");
		$.modal({
			id : "modalcheckid",
			url : ctx+"/mdp/admin/"+actionUrl,
			title : '资源审批',
			size : 'modal-lg',
			data : {
				 
				taskId : taskId,
				processId:  processId  ,
				orderId : orderId
			}
		});
	}

	function authService(resId){
		$.modal({
			url : "admin/resourceCatalogue/serviceList.html",
			title : '服务列表',
			size:'modal-lg',
			data :{
				op : "edit",
				id : resId,
				from: 2
			}
		});
	}
</script>
<script type="text/javascript"
	src="${ctx }/page/admin/datamodel/jsrender.min.js" />
<script
	src="${ctx }/page/admin/resourceCatalogue/subscribeManage/js/subscribeManageCheck.js"
	defer="defer" />

 
<script id="checklisttemplate" type="text/x-jsrender">
{{for dataList}}
<tr>
<td>{{:index}}</td>
<td>{{:data["resourceApply.catalogueInfo"].resourceName  }}</td>
<td>{{:data["resourceApply.catalogueInfo"].provider.orgName  }}</td>
<td>{{:data["resourceApply.userName"]  }}</td>
<td>{{:process.orderCreateTime}}</td>
<td>{{:process.taskName}}</td>
<td>
	<div>
		<a class="subscribe-request-details  checktask" href="javascript:void(0);" actionUrl="{{:process.actionUrl}}" taskId="{{:process.taskId}}" orderId="{{:process.orderId}}"  processId="{{:process.processId}}"
			title="审核" data-requestId=""> <span class="glyphicon glyphicon-edit"></span>
		</a>
	</div>
</td>
</tr>
{{/for}}
</script>
 