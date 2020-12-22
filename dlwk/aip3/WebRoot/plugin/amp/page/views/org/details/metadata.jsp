<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<style>
#medata_table tr th{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}
#medata_table tr td{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
}

</style>
<div id="metadata" class="navbar-fixed-bottom hide">
	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">

			<h5 class="widget-title"></h5>
			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);" data-action="collapse"> 
				<i class="1 ace-icon fa fa-chevron-up bigger-125"></i>
				</a>
			</div>			
		</div>
          <input type="hidden" id="name"/>
	      <input type="hidden" id="id"/>
		<div class="widget-body">
			<div class="row">
			  <div class="col-xs-3">
			    <div class="input-group input-group-sm">
					<span class="input-group-addon"> 数据类型:</span> 
						<select class="form-control" id="dataType"></select><span
						class="input-group-btn">
					</span>
				</div>
			  </div>
			
			  <div class="col-xs-3">
			    <div class="input-group input-group-sm">
			    <span class="input-group-addon"><span
						class="glyphicon glyphicon-time"></span> 提交日期：</span> 
					<input type="text" id="startTime" class="form-control" />
					<span class="input-group-addon">
						<!-- <i class="ace-icon fa fa-calendar"></i> -->
					</span>
				</div>
			 </div>
			
			 <div class="col-xs-2">
			    <div class="input-group input-group-sm">
			    <span class="input-group-addon"> 至：</span> 
					<input type="text" id="endTime" class="form-control" />
					<span class="input-group-addon">
						<!-- <i class="ace-icon fa fa-calendar"></i> -->
					</span>
				</div>
			 </div>
			 
			  <div class="col-xs-3">
			     <div class="input-group input-group-sm">
					<span class="input-group-addon">数据元名称:</span> <input
						id="dataName" type="text" class="form-control"> <span
						class="input-group-btn">
						<button id="searchBtn" class="btn btn-default no-disabled"
							type="button"/>
							<span class="glyphicon  glyphicon-search"></span>
						</button>
					</span>
				</div>
			  </div>
			</div>
		
			<div class="row">
					<div class="col-xs-12">
						<table id="medata_table" class="table table-striped table-bordered table-hover">
							<thead>
								<tr >														
								     <th field="ele_nm" >数据元名称</th>
								     <th field="py_cd" >拼音标识</th>
								     <th field="chnpy"  >中文全拼</th>
								     <th field="data_fmt" >数据格式</th>
								     <th field="dtype_name" >数据类型</th>
								     <th field="cate_name" >数据元分类</th>
								     <th field="org_nm" >源头组织</th>
								     <th field="ele_unit" >计量单位</th>
								     <th field="num" labelFunction="buttonHandler" >关联资源（条）</th>
								     <th field="sbmt_org" >提交机构</th>
								     <th field="submit_dt" >提交日期</th>
								     <th field="reg_org" >注册机构</th>
								</tr>
							</thead>	
							<tbody>
							</tbody>
						</table>
				     </div>
				</div>
		  </div>			
		</div>
</div>
<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/bootstrap-datetimepicker.css"/>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org/js/metadata.js"></script>
<script  src="${ctx}/resources/ace1.3.2/js/date-time/bootstrap-datetimepicker.js"></script>
<script  src="${ctx}/resources/ace1.3.2/js/date-time/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript">
	$("#startTime").datetimepicker({
	            language: 'zh-CN',
                autoclose: 1,
                todayBtn: 1,
                pickerPosition: "bottom-left",
                minuteStep: 5,
                format: 'yyyy-mm-dd',
                minView: 'month'
	});
	$("#endTime").datetimepicker({
	            language: 'zh-CN',
                autoclose: 1,
                todayBtn: 1,
                pickerPosition: "bottom-left",
                minuteStep: 5,
                format: 'yyyy-mm-dd',
                minView: 'month'
	});
</script>