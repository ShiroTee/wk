<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 信息资源详情 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">信息资源描述：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				信息资源标识符：${assetData.resourceid}
			</div>
			<div class="col-md-4">
			        信息资源提供方：<a href="${ctx }/mdp/amp/cvpTotalHandler/sdOrg?id=${assetData.provider_org_id}">${assetData.provider_name}</a>
			</div>
			<div class="col-md-4">
			   信息资源发布日期：${assetData.pub_dt}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				主题分类：${assetData.sbj_name}
			</div>
			<div class="col-md-4">
			        保密级别：${assetData.serc_name}
			</div>
			<div class="col-md-4">
			   共享级别：${assetData.pub_name}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				元数据更新日期：${assetData.update.dt}
			</div>
			<div class="col-md-4">
			        元数据标识符：${assetData.metadata_id}
			</div>
			<div class="col-md-4">
			   元数据维护方：${assetData.metadata_mait}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				在线资源链接地址：${assetData.res_online}
			</div>
			<div class="col-md-4">
			        关键字：${assetData.keyword}
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				信息资源摘要：${assetData.abstract1}
			</div>
		</div>
	</div>
</div>