<%@ page language="java" contentType="text/html; charset=UTF-8"%>

<div id="infoSysBox" class='content  graph-content'>
<div class="row">
			 <div class="col-md-1"></div>
			  <div class="col-md-3">
			    <div class="input-group input-group-sm">
			    <span class="input-group-addon"><span class="glyphicon glyphicon-time"></span> 系统上线时间从</span> 
					<input type="text" id="infosys_startDate" class="form-control">
					<span class="input-group-addon">
						<i class="ace-icon fa fa-calendar"></i>
					</span>
				</div>
			 </div>
			
			 <div class="col-md-2">
			    <div class="input-group input-group-sm">
			    <span class="input-group-addon"> 至</span> 
					<input type="text" id="infosys_endDate" class="form-control">
					<span class="input-group-addon">
						<i class="ace-icon fa fa-calendar"></i>
					</span>
					
				</div>

			 </div>
			 <div class="col-md-2">
			    <div class="input-group input-group-sm">
					<span class="input-group-addon">应用阶段:</span> 
						<select class="form-control" id="infosys_status"> <option value="">请选择 </option> <option value="01">规划</option> <option value="02">设计</option> <option value="03">建造</option> <option value="04">运营</option> <option value="05">停用</option> <option value="06">即将退役</option> <option value="07">退役</option><option value="08">废弃</option></select><span class="input-group-btn">
					</span>
				</div>
			  </div>
			 <div class="col-md-3">
			     <div class="input-group input-group-sm">
					<span class="input-group-addon"><span class="glyphicon glyphicon-th-list"></span> 信息系统名称:</span> <input id="infosys_sysName" type="text" class="form-control"> <span class="input-group-btn">
						<button id="infosys_searchBtn" class="btn btn-default no-disabled" type="button">
							<span class="glyphicon  glyphicon-search"></span>
						</button>
					</span>
				</div>
			  </div>
			 

			</div>
<div class="row">
   <div class="col-md-12"> <div id='infoSystree'></div> </div>
</div>
</div>
<script  src="${ctx}/resources/ace1.3.2/js/date-time/bootstrap-datetimepicker.js"></script>
<script  src="${ctx}/resources/ace1.3.2/js/date-time/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript">
	$("#infosys_startDate").datetimepicker({
	            language: 'zh-CN',
                autoclose: 1,
                todayBtn: 1,
                pickerPosition: "bottom-left",
                minuteStep: 5,
                format: 'yyyy-mm-dd',
                minView: 'month'
	});
	$("#infosys_endDate").datetimepicker({
	            language: 'zh-CN',
                autoclose: 1,
                todayBtn: 1,
                pickerPosition: "bottom-left",
                minuteStep: 5,
                format: 'yyyy-mm-dd',
                minView: 'month'
	});
</script>
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/infosys/css/training.css" />
<script src="${ctx}/resource/d3/d3.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/infosys/js/infoSys.js"></script>
