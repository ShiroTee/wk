<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div class="widget-box">
	<div class="widget-header widget-header-flat">
		<h4 class="widget-title">信息资源描述</h4>
	</div>

	<div class="widget-body">
		<div class="widget-main">
		<table class="table table-bordered widget-table-desc">
		<tbody>
			<tr>
			    <td class="desc-laebl">信息资源标识符：</td>
			    <td class="desc-content"><span id="resourceId" >${data['resourceid']}</span></td>
			    <td class="desc-laebl">发布日期：</td>
			    <td class="desc-content"><span id="pubDt">${data['pub_dt'] }</span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">信息资源名称：</td>
			    <td class="desc-content"><span id="assetNm">${data['name'] }</span></td>
			    <td class="desc-laebl">信息资源提供方：</td>
			    <td class="desc-content"><span id="providerName">${data['provider_name'] }</span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">关键字：</td>
			    <td class="desc-content"><span id="keyword">${data['keyword'] } </span></td>
			    <td class="desc-laebl">在线链接地址：</td>
			    <td class="desc-content"><span id="resOnline">${data['res_online'] }</span></td>
			</tr>
			<tr>
			    <td class="desc-laebl"> 架构类别：</td>
			    <td class="desc-content"><span id="archCateName">${data['arch_cate_name'] }</span></td>
			    <td class="desc-laebl">所属主题：</td>
			    <td class="desc-content"><span id="sbjName">${data['sbj_name'] }</span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">共享级别：</td>
			    <td class="desc-content"><span id="pubName">${data['pub_name'] }</span></td>
			    <td class="desc-laebl">保密级别：</td>
			    <td class="desc-content"><span id="sbjName">${data['secr_name'] }</span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">主题分类：</td>
			    <td class="desc-content" colspan="3"><span id="subCatName">${data['sub_cat_name'] }</span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">信息资源摘要：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="abstract">${data['abstract'] }</span></td>
			</tr>
		</tbody>
	</table>
			<%-- <div class="row">
				<div class="col-md-6">
					<label class="col-sm-6 "> 信息资源标识符： </label> <input
						type="text" id="resourceId" name="resourceId"
						class="col-xs-10 col-sm-6 input-sm" readOnly="true" value="${data['resourceid'] }"/>

				</div>
				<div class="col-md-6">
					<label class="col-sm-6 "> 信息资源发布日期： </label> <input
						type="text" id="pubDt" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" name="pubDt" value="${data['pub_dt'] }"/>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<label class="col-sm-6 "> 信息资源名称： </label> <input
						type="text" id="assetNm"
						class="col-xs-10 col-sm-6 input-sm" readOnly="true" name="assetNm" value="${data['name'] }"/>

				</div>
				<div class="col-md-6">
					<label class="col-sm-6 "> 信息资源提供方： </label> <input
						type="text" id="providerName"
						class="col-xs-10 col-sm-6 input-sm" readOnly="true" name="providerName" value="${data['provider_name'] }"/>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<label class="col-sm-6 "> 关键字： </label> <input type="text"
						id="keyword" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" value="${data['keyword'] }"/>

				</div>
				<div class="col-md-6">
					<label class="col-sm-6 "> 在线资源链接地址： </label> <input
						type="text" id="resOnline"
						class="col-xs-10 col-sm-6 input-sm" readOnly="true" name="resOnline"  value="${data['keyword'] }"/>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<label class="col-sm-6 "> 架构类别： </label> <input type="text"
						id="archCateName" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" name="archCateName" value="${data['arch_cate_name'] }"/>

				</div>
				<div class="col-md-6">
					<label class="col-sm-6 "> 所属主题： </label> <input type="text"
						id="sbjName" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" name="sbjName" value="${data['sbj_name'] }"/>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<label class="col-sm-6 "> 共享级别： </label> <input type="text"
						id="pubName" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" name="pubName" value="${data['pub_name'] }"/>

				</div>
				<div class="col-md-6">
					<label class="col-sm-6 "> 保密级别： </label> <input type="text"
						id="secrName" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" name="secrName" value="${data['secr_name'] }"/>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<label class="col-sm-6 "> 主题分类： </label> <input type="text"
						id="subCatName" class="col-xs-10 col-sm-6 input-sm"
						readOnly="true" name="subCatName" value="${data['sub_cat_name'] }"/>

				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<div class="input-group" style="margin-left: 8px">
						<span class="input-group-addon"">信息资源摘要</span>
						<textarea id="abstract" rows="3" class="form-control"
							readonly="true" style="background: white;" name="abstract">${data['abstract'] }</textarea>
					</div>
				</div>
			</div> --%>
		</div>
	</div>
</div>
