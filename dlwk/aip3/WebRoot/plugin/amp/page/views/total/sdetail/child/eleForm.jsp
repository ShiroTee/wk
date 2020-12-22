<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 信息资源详情 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">元数据描述：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				拼音标识：${eleData.py_cd}
			</div>
			<div class="col-md-8">
			        中文全拼：${eleData.chnpy}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
			   数据类型：${eleData.data_typ}
			</div>
			<div class="col-md-4">
				源头组织：<a href="${ctx }/mdp/amp/cvpTotalHandler/sdOrg?id=${eleData.provider_org_id}">${eleData.provider_org}</a>
			</div>
			<div class="col-md-4">
			        注册机构：${eleData.reg_org}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
			   计量单位：${eleData.ele_unit}
			</div>
			<div class="col-md-4">
			   数据格式：${eleData.data_fmt}
			</div>
			<div class="col-md-4">
				提交组织：${eleData.sbmt_org}
			</div>
		</div>
		<div  class="row">
			<div class="col-md-4">
			        提交日期：${eleData.sbmt_dt}
			</div>
			<div class="col-md-4">
			   数据元分类：${eleData.ele_cate}
			</div>
		</div>
	</div>
</div>