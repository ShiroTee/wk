<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<link rel="stylesheet" href="${ctx }/resources/ace1.3.2/css/bootstrap-datetimepicker.css"/>
<style>
.active a{
font-size: 18px;
}
#resourceInfo_table tbody tr
{
cursor: pointer;
}
.on
{
background-color : #D0D0FF;
}
</style>
<div id="resourceInfo" class="navbar-fixed-bottom hide">
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
			<div class="row" id="searchR">
			 <div class="col-xs-2">
			    <div class="input-group input-group-sm">
					<span class="input-group-addon">保密级别:</span> 
						<select class="form-control" id="keptlvl"></select><span
						class="input-group-btn">
					</span>
				</div>
			  </div>
			  
			  <div class="col-xs-3">
			    <div class="input-group input-group-sm">
					<span class="input-group-addon">共享级别:</span> 
						<select class="form-control" id="sharelvl"></select><span
						class="input-group-btn">
					</span>
				</div>
			  </div>
			 
			  <div class="col-xs-3">
			     <div class="input-group input-group-sm">
					<span class="input-group-addon">信息资源名称:</span> <input
						id="resName" type="text" class="form-control"> <span
						class="input-group-btn">
						<button id="searchBtn" class="btn btn-default no-disabled"
							type="button"/>
							<span class="glyphicon  glyphicon-search"></span>
						</button>
					</span>
				</div>
			  </div>
			</div>
		    <input type="hidden" id="name"/>   
			<input type="hidden" id="id"/>
			<input type="hidden" id="assetId"/>
			<div class="row">
					<div class="col-xs-5">
					 <div style="height:326px;OVERFLOW:auto; ">
						<table id="resourceInfo_table" class="sort-table table table-bordered widget-table table-hover">
							<thead>
								<tr>															
								     <th field="resourceId" style="width:150px">信息资源标识符</th>
								     <th field="name" >信息资源名称</th>
								     <th field="busiCount" labelFunction="busiCountHandler" style="width:110px">操作</th>
								</tr>
							</thead>	
							<tbody>
							</tbody>
						</table>
						</div>
				     </div>
				     
				     <div class="col-xs-7">
				        <div class="tabbable">
							<ul class="nav nav-tabs" id="myTab">
								<li class="active">
									<a data-toggle="tab" href="#describe">
										信息资源描述
									</a>
								</li>

								<li>
									<a data-toggle="tab" href="#group">
										信息资源组成
									</a>
								</li>
							</ul>

							<div class="tab-content">
								<div id="describe" class="tab-pane fade in active">
									<table class="table table-bordered widget-table-desc">
										<tbody>
											<tr>
											    <td class="desc-laebl">信息资源标识符：</td>
											    <td class="desc-content"><span id="resourceId"></span></td>
											    <td class="desc-laebl">信息资源发布日期：</td>
											    <td class="desc-content"><span id="pubDt"></span></td>
											</tr>
											<tr>
											    <td class="desc-laebl">信息资源名称：</td>
											    <td class="desc-content"><span id="assetNm"></span></td>
											    <td class="desc-laebl">信息资源提供方：</td>
											    <td class="desc-content"><span id="providerName"></span></td>
											</tr>
											<tr>
											    <td class="desc-laebl">关键字：</td>
											    <td class="desc-content"><span class="txt" id="keyword"></span></td>
											    <td class="desc-laebl">在线资源链接地址：</td>
											    <td class="desc-content"><span class="txt" id="resOnline"></span></td>
											</tr>
											<tr>
											    <td class="desc-laebl">架构类别：</td>
											    <td class="desc-content"><span class="txt" id="archCateName"></span></td>
											    <td class="desc-laebl">所属主题：</td>
											    <td class="desc-content"><span class="txt" id="sbjName"></span></td>
											</tr>
											<tr>
											    <td class="desc-laebl">共享级别：</td>
											    <td class="desc-content"><span class="txt" id="pubName"></span></td>
											    <td class="desc-laebl">保密级别：</td>
											    <td class="desc-content"><span class="txt" id="secrName"></span></td>
											</tr>
											<tr>
											    <td class="desc-laebl">主题分类：</td>
											    <td class="desc-content" colspan="3"><span class="txt" id="subCatName"></span></td>
											</tr>
											<tr class="text-area-tr">
											    <td class="desc-laebl">信息资源摘要：</td>
											    <td class="desc-content"  colspan="3"><span class="txtArea" id="abstract"></span></td>
											</tr>
										</tbody>
									</table>
								</div>

						<div id="group" class="tab-pane fade">						
							<div class="row" style="margin-left:20px;">
								     <div class="col-xs-6">
		                             <div class="input-group input-group-sm">
											<span class="input-group-addon"> 数据元名称:</span> <input
												id="searchInput" type="text" class="form-control"> <span
												class="input-group-btn">
												<button id="searchBtn2" class="btn btn-default no-disabled"
													type="button"/>
													<span class="glyphicon  glyphicon-search"></span>
												</button>
											</span>
										</div>	
										</div>				     
							   </div>
										
								<div class="row">																
									<div class="col-xs-12">										
											<table id="group_table" class="table table-striped table-bordered table-hover" style="width:100%">
												<thead>
													<tr >														
													     <th field="ele_nm" style="max-width:170px">数据元名称</th>
													     <th field="py_cd" style="max-width:170px">拼音标识</th>
													     <th field="data_typ" style="max-width:170px">数据类型</th>
													     <th field="remark" style="max-width:170px">备注</th>
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
				     </div>
				</div>
		  </div>			
		</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/org/js/resourceInfo.js"></script>