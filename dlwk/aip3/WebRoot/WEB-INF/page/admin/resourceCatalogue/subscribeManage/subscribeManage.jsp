<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>


			<div class="mr15">
			
			 	 <div class="clearfix box inline_any mb20 res_apply_css" style="width: 100%;">
					<div class="l pl20 clearfix" style="line-height: 40px;">
					    <div class="inline_any">
						 <input type="text"  placeholder="请输入查询条件"
								class="nav-search-input search_sm_input mt10 ml5 mr20 resname"
								style="width: 160px;">
						</div>
						<input id="dict-search-btn" type="button"  onclick="listApply();" value="搜索"
							class="search_sm_submit search-btn"
							style="cursor: pointer; line-height: 24px;">
					</div>
				</div>
			
			
				<div class="alert alert-danger mr20" style="margin-bottom: 10px;
    				color: inherit;
    				padding: 0;
    				background: inherit;
    				border: 0;">
						<strong>我的授权码：</strong>
						<span style="color: red;" id="subscribeCode">MA6R-6WNR-GV5K-T2LY6</span>
				</div>
				<table id="request-list" width="100%" border="0" cellspacing="0"
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
					<tbody id="applytableid">

					</tbody>
				</table>
				<div id="navApplyId"><%@include
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
						'.requestdetail',
						'click', showDetails);
		$(document).on("click",".searchAuthDetail",function(){
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
	src="${ctx }/page/admin/resourceCatalogue/subscribeManage/js/subscribeManageApply.js"
	defer="defer" />

<script id="applylisttemplate" type="text/x-jsrender">
{{for dataList}}
<tr>
<td>{{:index}}</td>
<td>{{:data["resourceApply.catalogueInfo"].resourceName  }}</td>
<td>{{:data["resourceApply.catalogueInfo"].provider.orgName  }}</td>
<td>{{:data["resourceApply.userName"]  }}</td>
<td>{{:process.createTime}}</td>
<td>

{{if process.orderNo=="申请成功"}}
<span class="label label-success">{{:process.orderNo}}<span>
{{else}}
{{if process.orderNo=="申请失败"}}
<span class="label label-danger">{{:process.orderNo}}<span>
{{else}}
<span class="label label-default">{{:process.orderNo}}<span>
{{/if}}
{{/if}}
 
</td>
<td>
	<div>
		<a class="subscribe-request-details  requestdetail" href="javascript:void(0);" orderId="{{:process.id}}"  processId="{{:process.processId}}"
			title="查看" data-requestId=""> <i class="icon icon-search"
			aria-hidden="true"></i>
		</a>
	</div>
</td>
</tr>
{{/for}}
</script>
 