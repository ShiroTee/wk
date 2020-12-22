<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/bootstrap-datetimepicker.css"/>
<style>
.widget-body .row{
padding-top:5px;
margin-left:20px;
margin-right:20px;
}
.active a{
font-size: 18px;
}
#sysRes_table tbody tr
{
cursor: pointer;
}
.on
{
background-color : #D0D0FF;
}
</style>
<div id="sysResource" class="navbar-fixed-bottom hide">
	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">
			<h5 class="widget-title"></h5>

			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);" data-action="collapse"> 
				<i class="1 ace-icon fa fa-chevron-down bigger-125"></i>
				</a>
			</div>			
		</div>

		<div class="widget-body">
			<div class="row">
			 <div class="col-xs-2">
				  <div class="input-group input-group-sm">
						<span class="input-group-addon">数据库:</span> 
							<select class="form-control" id="dataBase"></select><span
							class="input-group-btn">
						</span>
				  </div>
			  </div>
			  
			  <div class="col-xs-2">
			    <div class="input-group input-group-sm">
					<span class="input-group-addon">状态:</span> 
						<select class="form-control" id="statuss"></select><span
						class="input-group-btn">
					</span>
				</div>
			  </div>
			  
			  <div class="col-xs-3">
			     <div class="input-group input-group-sm">
					<span class="input-group-addon"> 开发者:</span> <input
						id="developers" type="text" class="form-control">
				</div>
			  </div>
			 
			  <div class="col-xs-3">
			     <div class="input-group input-group-sm">
					<span class="input-group-addon"> 信息系统名称:</span> <input
						id="sysName" type="text" class="form-control"> <span
						class="input-group-btn">
						<button id="searchSys" class="btn btn-default no-disabled"
							type="button"/>
							<span class="glyphicon  glyphicon-search"></span>
						</button>
					</span>
				</div>
			  </div>
			</div>
		
			<div class="row">
			       <input type="hidden" id="name"/>   
			       <input type="hidden" id="id"/>
					<div class="col-xs-4">
					 <div style="height:250px;OVERFLOW:auto;">
						<table id="sysRes_table" class="sort-table table table-bordered table-hover">
							<thead>
								<tr>															
								     <th field="code" style="width:110px">信息系统编号</th>
								     <th field="name">信息系统名称</th>
								     <th field="num" labelFunction="herfHandler" style="width:80px"> 关联资源</th>
								</tr>
							</thead>	
							<tbody>
							</tbody>
						</table>
						</div>
				     </div>
				     
    <div class="col-xs-8">
      <div class="widget-box">
	<div class="widget-body">
		<div class="widget-main">
		 <table class="table table-bordered widget-table-desc">
		<tbody>
			<tr>
			    <td class="desc-laebl">系统编号：</td>
			    <td class="desc-content"><span id="appsysNo"></span></td>
			    <td class="desc-laebl">系统名称：</td>
			    <td class="desc-content"><span id="appsysNm"></span></td>
			    <td class="desc-laebl">数据量(M)：</td>
			    <td class="desc-content"><span id="dataAmt"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">系统简称：</td>
			    <td class="desc-content"><span id="sysAbbr"></span></td>
			    <td class="desc-laebl">开发者：</td>
			    <td class="desc-content"><span id="developer"></span></td>
			    <td class="desc-laebl">使用单位：</td>
			    <td class="desc-content"><span id="orgnames"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">拥有部门：</td>
			    <td class="desc-content"><span id="belongTo"></span></td>
			    <td class="desc-laebl">维护者：</td>
			    <td class="desc-content"><span id="sysOwnerDep"></span></td>
			    <td class="desc-laebl">开发年度：</td>
			    <td class="desc-content"><span id="devYear"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">应用模式：</td>
			    <td class="desc-content"><span id="appMode"></span></td>
			    <td class="desc-laebl">数据库：</td>
			    <td class="desc-content"><span id="dbName"></span></td>
			    <td class="desc-laebl">状态：</td>
			    <td class="desc-content"><span id="status"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">中间件系统：</td>
			    <td class="desc-content" colspan="1"><span id="midwareSys"></span></td>
			    <td class="desc-laebl">开发语言与环境：</td>
			    <td class="desc-content" colspan="3"><span id="devArch"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">系统描述：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="appsysDesc"></span></td>
			</tr>
		</tbody>
	</table>
							</div>
						</div>
					</div>
				     </div>
				</div>
		  </div>			
		</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org/js/sysResource.js"></script>