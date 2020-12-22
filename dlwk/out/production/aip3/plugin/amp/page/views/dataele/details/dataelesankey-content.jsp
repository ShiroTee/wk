<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="container-fluid" class="container-fluid  graph-content">
<div id="org-asset-mychart-box" style="width: 100%; height: 430px;overflow-y:auto;overflow-x:hidden;" eleId="${eleId}"  class="graph-draw-box"></div>
</div>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="res-widget" class="navbar-fixed-bottom hide">
	<style>
.widget-body .row {
	padding-top: 5px;
	margin-left: 20px;
	margin-right: 20px;
}

.active a {
	font-size: 18px;
}
</style>
	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">
			<h5 class="widget-title"></h5>

			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);"
					data-action="collapse"> <i
					class="1 ace-icon fa fa-chevron-down bigger-125"></i>
				</a>
			</div>
		</div>
		<div class="widget-body" style="padding-bottom: 10px;">
			<div class="row">
				<div class="col-xs-12">
					<div class="row">
						<div class="col-sm-12">

								<div class="tab-content">
									<div id="erm" class="tab-pane fade in active">
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
										<!-- <div class="row">
											<div class="col-md-6">
												<label class="col-sm-4 "> 信息资源标识符： </label> <input
													type="text" id="resourceId"
													class="col-xs-10 col-sm-8 input-sm" readOnly="true" />

											</div>
											<div class="col-md-6">
												<label class="col-sm-4 "> 信息资源发布日期： </label> <input
													type="text" id="pubDt" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />
											</div>
										</div>

										<div class="row">
											<div class="col-md-6">
												<label class="col-sm-4 "> 信息资源名称： </label> <input
													type="text" id="assetNm"
													class="col-xs-10 col-sm-8 input-sm" readOnly="true" />

											</div>
											<div class="col-md-6">
												<label class="col-sm-4 "> 信息资源提供方： </label> <input
													type="text" id="providerName"
													class="col-xs-10 col-sm-8 input-sm" readOnly="true" />
											</div>
										</div>

										<div class="row">
											<div class="col-md-6">
												<label class="col-sm-4 "> 关键字： </label> <input type="text"
													id="keyword" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />

											</div>
											<div class="col-md-6">
												<label class="col-sm-4 "> 在线资源链接地址： </label> <input
													type="text" id="resOnline"
													class="col-xs-10 col-sm-8 input-sm" readOnly="true" />
											</div>
										</div>

										<div class="row">
											<div class="col-md-6">
												<label class="col-sm-4 "> 架构类别： </label> <input type="text"
													id="archCateName" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />

											</div>
											<div class="col-md-6">
												<label class="col-sm-4 "> 所属主题： </label> <input type="text"
													id="sbjName" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />
											</div>
										</div>

										<div class="row">
											<div class="col-md-6">
												<label class="col-sm-4 "> 共享级别： </label> <input type="text"
													id="pubName" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />

											</div>
											<div class="col-md-6">
												<label class="col-sm-4 "> 保密级别： </label> <input type="text"
													id="secrName" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />
											</div>
										</div>

										<div class="row">
											<div class="col-md-6">
												<label class="col-sm-4 "> 主题分类： </label> <input type="text"
													id="subCatName" class="col-xs-10 col-sm-8 input-sm"
													readOnly="true" />

											</div>
										</div>

										<div class="row">
											<div class="col-md-12">
												<div class="input-group" style="margin-left: 8px">
													<span class="input-group-addon"">信息资源摘要</span>
													<textarea id="abstract" rows="3" class="form-control"
														readonly="true" style="background: white;"></textarea>
												</div>
											</div>
										</div> -->
									</div>

								</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<script src="${ctx}/resources/jquery/jquery-ui-1.9.2-min.js"></script>
<script src="${ctx}/resources/jquery/jsPlumb-2.1.1.js"></script>
<script src="${ctx}/plugin/amp/page/views/theme/js/SkyChart.js"></script>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/dataele/js/dataeleSankey.js"></script>
