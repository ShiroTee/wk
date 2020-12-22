<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>

<!-- <div class="panel-group mr15" id="subscribeManageAccordion"
	role="tablist" aria-multiselectable="true">
	

	<div class="panel panel-default">
		<div class="panel-heading" role="tab" id="subscribeManageHeadingThree">
			<h4 class="panel-title">
				<a class="collapsed" role="button" data-toggle="collapse"
					data-parent="#subscribeManageAccordion"
					href="#subscribeManageCollapseThree" aria-expanded="true"
					aria-controls="subscribeManageCollapseThree"> 我的已办 </a>
			</h4>
		</div>
		<div id="subscribeManageCollapseThree" class="panel-collapse  "
			role="tabpanel" aria-labelledby="subscribeManageHeadingThree">
			<div class="panel-body"> -->
			<div class="mr15">
			    <div class="clearfix box inline_any mb20 res_his_css" style="width: 100%;">
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
						 
						<input id="dict-search-btn" type="button"  onclick="listFinish()" value="搜索"
							class="search_sm_submit search-btn"
							style="cursor: pointer; line-height: 24px;">
					</div>
			    </div>
			
				<table id="done-list" width="100%" border="0" cellspacing="0"
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
					<tbody  id="historyid">
						<tr>
							<td colspan="7" style="color: red; text-align: center;">暂无已办事项</td>
						</tr>
					</tbody>
				</table>
				<div id="navApplyId3"><%@include
						file="../../../common/admin-pagination.jsp"%></div>
			</div>
			<!-- </div>
		</div>
	</div>
	
	
</div>-->
<script>
	$(function() {
		$('body')
				.delegate(
						'.requestdetailHis',
						'click', showDetails);
		$(document).on("click",".searchAuthDetailHis",function(){
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
	src="${ctx }/page/admin/resourceCatalogue/subscribeManage/js/subscribeManageHis.js"
	defer="defer" />

 
<script id="historytemplate" type="text/x-jsrender">
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
			<a class="subscribe-request-details  requestdetailHis" href="javascript:void(0);" orderId="{{:process.id}}"  processId="{{:process.processId}}"
			title="查看" data-requestId=""> <i class="icon icon-search"
			aria-hidden="true"></i>
		</a>
	</div>
</td>
</tr>
{{/for}}
</script>