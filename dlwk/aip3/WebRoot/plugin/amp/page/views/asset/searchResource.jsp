<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="col-xs-2"></div>
<div class="col-xs-3">
   <div class="input-group input-group-sm">
	   <span class="input-group-addon"><span
			class="glyphicon glyphicon-time"></span> 资源发布日期：</span> 
		<input type="text" id="startTime" class="form-control" />
		<span class="input-group-addon">
			<i class="ace-icon fa fa-calendar"></i>
		</span>
   </div>
</div>

<div class="col-xs-2">
   <div class="input-group input-group-sm">
	    <span class="input-group-addon"> 至</span> 
			<input type="text" id="endTime" class="form-control" />
			<span class="input-group-addon">
				<i class="ace-icon fa fa-calendar"></i>
		</span>
   </div>
</div>
 
 <div class="col-xs-3">
    <div class="input-group input-group-sm">
		<span class="input-group-addon">信息资源名称:</span> <input
			id="resNm" type="text" class="form-control"> <span
			class="input-group-btn">
			<button id="searchBtn" class="btn btn-default no-disabled"
				type="button"/>
				<span class="glyphicon  glyphicon-search"></span>
			</button>
		</span>
   </div>
</div>
