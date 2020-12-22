<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>

<script type="text/javascript"
	src="${ctx }/page/admin/datamodel/jsrender.min.js" />
<script type="text/javascript"
	src="${ctx }/page/admin/datamodel/datamodel.js" />

<style>
.row {
	margin-bottom: 2px;
}

.noborder {
	border: 0px;
}

.render {
	display: none;
}

.apilist {
	position: relative;
	z-index: 2000;
	border: solid 1px gray;
	width: 450px;
}

.apilist li:hover {
	background-color: #E0E0E0;
}
</style>

<!--编辑页面  -->
<div id="data_edit" class="pannel">
	<div id="topbutton">
		<button type="button" class="btn btn-warning pull-right data_back"
			style="margin-left: 5px; margin-right: 250px;">返回</button>
		<button type="button" class="btn btn-primary pull-right"
			onclick="save_model();" style="margin-left: 5px;">保存</button>
	</div>
	<div class="panel">
		<div class="panel-header">
			<h4>
				<span class="con_tit_ico"></span>基本信息配置
			</h4>
		</div>
		<div class="panel-body">
			<form class="form-inline">
				<div class="form-group">
					<label for="exampleInputName2">模型名称</label> 
					
					<input id="model_name"
						autocomplete="off" name="name" type="text"
						class="form-control search_sm_input" style="width: 250px;" id=" "
						placeholder="">
						<input type="hidden" value=""  id="model_id" />
<input type="hidden" value=""  id="publishid" />
				</div>

				<div class="form-group">
					<label for="exampleInputName2">模型标识</label> <input id="model_code"
						name="code" type="text" class="form-control search_sm_input"
						style="width: 250px;" id=" " placeholder="">
				</div>
				<div id="web_select_items"
					style="position: absolute; z-index: 400; background: white;"></div>
				<div class="render web_select_render">
					<ul class="apilist" style="height: 200px; overflow-y: auto;">
						{{for datas}}
						<li onclick="addvaluetowebname(this);" value="{{:WEBAPP_ID}}">{{:WEBAPP_NAME}}</li>
						{{/for}}
					</ul>
				</div>
			</form>
		</div>
	</div>
	<div class="panel">
		<div class="panel-header">
			<div class="panel-header">
				<h4>
					<span class="con_tit_ico"></span>数据结构配置
				</h4>
			</div>
			<!-- Nav tabs -->
			<div class="panel-body">
				<!--  -->
				<div id="api_panel"></div>
				<div class="render api_render">
					<div>
						<div
							style="background-color: #FCFCFC; border: solid 1px #d5d5d5; margin-bottom: 3px;">
							<h5>
								<span class="glyphicon glyphicon-list"
									style="margin-left: 5px; margin-right: 10px;"></span> <span
									onclick="api_hide(this);" apiname value="{{:name}}">{{:name}}
								</span> <input type="hidden" value="{{:name}}"> <span
									class="glyphicon glyphicon-remove pull-right text-danger"
									onclick="delete_api(this);" style="margin-right: 10px;"></span>
							</h5>
						</div>

						<div class="box inline_any "
							style="width: 100%; padding: 5px; margin-bottom: 10px;">
							<div>
								<div class="row">
									<div class="col-md-1 ">1.</div>
									<div class="col-md-2">API关联数据库</div>
									<div class="col-md-9">
										<input type="text" apidb value="{{:dbname}}"
											style="width: 100%;" />
									</div>
								</div>
								<div class="row">
									<div class="col-md-1">2.</div>
									<div class="col-md-2">API关联表名称</div>
									<div class="col-md-9">
										<input type="text" apitables value="{{:tables}}"
											placeholder="多表之间用分号隔开" style="width: 100%;" />
									</div>
								</div>
								<div class="row">
									<div class="col-md-1">3.</div>
									<div class="col-md-2">任务调度名称</div>
									<div class="col-md-9">
										<input type="text" taskname value="{{:taskname}}"
											onkeyup="searchtasknames(this);" style="width: 100%;" />  
										<div class="taskselect"
											style="position: absolute; z-index: 400; background: white;"></div>
									</div>

								</div>
								
								
								{{if proname !=null }}
										<div class="row tssservice">
											<div class="col-md-1">4.</div>
											<div class="col-md-2">存储过程名称</div>
											<div class="col-md-9">
												<input type="text" proname value="{{:proname}}"
													style="width: 100%;" />
											</div>
										</div>
		
										<div class="row tssservice">
											<div class="col-md-1">5.</div>
											<div class="col-md-2">存储过程数据库</div>
											<div class="col-md-9">
												<input type="text" prodb value="{{:prodb}}"
													style="width: 100%;" />
											</div>
										</div>
										<div class="row tssservice">
											<div class="col-md-1">6.</div>
											<div class="col-md-2">存储过程表名</div>
											<div class="col-md-9">
												<input type="text" protables value="{{:protables}}"
													placeholder="多表之间用分号隔开" style="width: 100%;" />
											</div>
										</div>  
								{{/if}}
								{{if tssetl !=null }}
								<div class="row tssservice">
									<div class="col-md-1">4.</div>
									<div class="col-md-2">ETL任务名称</div>
									<div class="col-md-9">
										<input type="text" tssetl value="{{:tssetl}}"
											style="width: 100%;" />
									</div>
								 </div>
								{{/if}}
								
								{{if tssapi !=null }}
										<div class="row tssservice">
										<div class="col-md-1">4.</div>
										<div class="col-md-2">服务API</div>
										<div class="col-md-9">
											<input type="text" tssapi value="{{:tssapi}}"
												style="width: 100%;" />
										</div>
										</div>
								{{/if}}
								
							</div>
						</div>
					</div>
				</div>
				<input type="button" id="add_api" value="添加服务配置"
					class="search_sm_submit btn-qry pull-left" style="width: 90px;">
			</div>

		</div>
	</div>
	<div style="width: 100%;" class="text-center" id="bottombutton">
		<button type="button" onclick="save_model();"
			class="btn btn-primary  " style="margin-left: 5px;">保存</button>
		<button type="button" class="btn btn-warning data_back"
			style="margin-left: 5px;">返回</button>
	</div>
</div>
<!-- 列表展示 -->
<div id="data_show">
	<div id="data_search">
		<div class="clearfix box inline_any mb20" style="width: 100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li"><a href="javascript:void(0);"
						id="data_add" class="filter_sort_link"> <i
							class="icon-plus mr5"></i>新增
					</a></li>
					<li class="filter_sort_li" onclick="updatemodel();"><a
						href="javascript:void(0);" class="filter_sort_link"> <i
							class="icon-pencil mr5"></i>修改
					</a></li>
					<li class="filter_sort_li" onclick="deleteModel();"><a
						href="javascript:void(0);" class="filter_sort_link"> <i
							class="icon-trash mr5"></i>删除
					</a></li>
				</ul>
			</div>
			<div class="l pl20 clearfix" style="line-height: 40px;">
				<div class="inline_any">
					<input type="text" id="searchmodeName" value="${recordId }"
						style="width: 160px; margin-top: 9px; height: 25px;">
				</div>
				<input type="button" id="querybutton" value="搜索"
					class="search_sm_submit btn-qry"
					style="cursor: pointer; line-height: 24px;">
			</div>
		</div>
	</div>

	<!--  -->
	<div id="data_table" style="overflow-x: hidden;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="tabl">
			<thead>
				<tr>
					<th></th>
					<th style="text-align: left;"  width="20%">发布状态</th>
					<th style="text-align: left;" width="20%">模型编码</th>
					<th style="text-align: left;"  width="20%">模型名称</th>
					<th style="text-align: left;"  >配置人</th>
					<th style="text-align: left;"  >修改时间</th>
					<th style="text-align: left;width: 150px;"> 操作</th>
				</tr>
			</thead>
			<tbody id="modellist">

			</tbody>
		</table>
		<div>
			<!-- <p class="pull-right" style="margin-top:26px;margin-right: 10px;" id="pageinfo">  -->
			<nav aria-label="Page navigation" class="pull-right">
				<ul class="pagination pull-right" id="paggingId">
					<li id="apifirst" class=""><a href="#" class="disabled">
							首页 </a></li>
					<li id="apiprev" class=""><a href="#">上一页</a></li>
					<li id="apinext" class=""><a href="#">下一页</a></li>
					<li id="apilast" class=""><a href="#">尾页</a></li>
				</ul>
			</nav>
			<br />
			<p class="pull-right" style="margin-top: 6px; margin-right: 10px;"
				id="pageinfo"></p>
		</div>
	</div>
</div>
<!--  -->
<div id="infoid" class="modal fade bs-example-modal-sm" tabindex="-1"
	role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header text-warning" id="modal_header">操作提示</div>
			<div class="modal-body" id="infocontent" id="modal_body"
				style="min-height: 100px;">
				<input type="hidden" value="" id="select_value" /> <input
					id="search_api" type="text" style="width: 450px;" /> <input
					type="button" id="add_api2" value="添加"
					class="search_sm_submit btn-qry " style="margin-left: 20px;">
				<div id="apiselect"></div>

				<div class="render api_select_render">
					<ul class="apilist" style="height: 200px; overflow-y: auto;">
						{{for datas}}
						<li onclick="addvaluetoinput(this);" value="{{:RES_ID}}">{{:RES_NM}}</li>
						{{/for}}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
<!--  -->
<div id="opresult" class="modal fade bs-example-modal-sm" tabindex="-1"
	role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header text-warning">操作提示</div>
			<div id="opcontent" class="modal-body   text-success"
				style="min-height: 120px;">
				<h2 id="resultcontent" >保存成功</h2>
				<button class="btn btn-warning pull-right"
					onclick="$('#opresult').modal('hide')" style="margin-left: 10px;">关闭</button>
			</div>
		</div>
	</div>
</div>
<div id="opdelete" class="modal fade bs-example-modal-sm" tabindex="-1"
	role="dialog" aria-labelledby="mySmallModalLabel">
	<div class="modal-dialog modal-md" role="document">
		<div class="modal-content">
			<div class="modal-header text-warning">操作提示</div>
			<div class="modal-body   text-success" style="min-height: 120px;">
				<h4 id="deletecontent">确认删除数据模型吗?</h4>
				<button class="btn btn-warning pull-right"
					onclick="$('#opdelete').modal('hide')" style="margin-left: 10px;">取消</button>
				<button class="btn btn-primary pull-right" id="confirmdelid"
					optype="" onclick="confirmDel();">确认</button>

			</div>
		</div>
	</div>
</div>
<script id="scriptrender" type="text/x-jsrender">
</script>
<script id="modeltemp" type="text/x-jsrender">
{{for list}}
<tr>
<td style="text-align: left;" ><input type="checkbox" class="selectcheckbox" onclick="selectcheckbox(this);" value="{{:id}}"  publish="{{:publish}}" ></td>
<td style="text-align: left;" >
{{if publish=="0" || publish== null  }}
<span class="text-danger" dataid="{{:id}}"  >未发布</span>
{{else}}
<span class="text-success" dataid="{{:id}}"  >已发布</span>
{{/if}}
</td>
<td style="text-align: left;"  >{{:model_code}}</td>
<td style="text-align: left;" >{{:model_name}}</td>
<td style="text-align: left;" >{{:updateuser}}</td>
<td style="text-align: left;" >{{:updatetime}}</td>
<td style="text-align: left; width: 150px;"> 
{{if publish=="0" || publish== null  }}
<a href="#" class="model_publish" datavalue="1" style="margin-right:30px;"  dataid="{{:id}}"  webid="{{:webappid}}"  >发布</a>
{{else}}
<a href="#" class="model_publish" datavalue="0"  dataid="{{:id}}"  webid="{{:webappid}}"  >取消发布</a>
{{/if}}

<input name="" type="button" data-modecode="{{:model_code}}" value="预览" class=" show_model">
 </td>
</tr>
{{/for}}
</script>

<script id="task_select_render" type="text/x-jsrender" >
	<ul class="apilist" style="height: 200px; overflow-y: auto;">
		{{for datas}}
		<li value="{{:ID}}" onclick="addvaluetotask(this);" >{{:TASKNAME}}</li> {{/for}}
	</ul>
</script>

<script id="tss_db" type="text/x-jsrender"  >
<div class="row tssservice">
<div class="col-md-1">4.</div>
<div class="col-md-2">存储过程名称</div>
<div class="col-md-9">
	<input type="text" proname value="{{:plsqlname}}"
		style="width: 100%;" />
</div>
</div>

<div class="row tssservice">
<div class="col-md-1">5.</div>
<div class="col-md-2">存储过程数据库</div>
<div class="col-md-9">
	<input type="text" prodb value="{{:plsqldb}}"
		style="width: 100%;" />
</div>
</div>
<div class="row tssservice">
<div class="col-md-1">6.</div>
<div class="col-md-2">存储过程表名</div>
<div class="col-md-9">
	<input type="text" protables value="{{:plsqltable}}"
		placeholder="多表之间用分号隔开" style="width: 100%;" />
</div>
</div>
</script>
<script id="tss_api" type="text/x-jsrender"  >
<div class="row tssservice">
<div class="col-md-1">4.</div>
<div class="col-md-2">服务API</div>
<div class="col-md-9">
	<input type="text" tssapi value="{{:tssapi}}"
		style="width: 100%;" />
</div>
</div>
</script>
<script id="tss_etl" type="text/x-jsrender"  >
<div class="row tssservice">
<div class="col-md-1">4.</div>
<div class="col-md-2">ETL任务名称</div>
<div class="col-md-9">
	<input type="text" tssetl value="{{:tssetl}}"
		style="width: 100%;" />
</div>
</div>
</script>
<script src="${ctx }/resources/jTopo/js/topo.js"></script>