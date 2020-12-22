<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 信息资源详情 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">组织机构描述：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				组织机构编码：${orgData.org_cd}
			</div>
			<div class="col-md-4">
			        上级组织机构：${orgData.parentorgname}
			</div>
			<div class="col-md-4">
			   类别：${orgData.orgtypename}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
				级别：${orgData.orglvname}
			</div>
			<div class="col-md-4">
			       负责人：${orgData.leader}
			</div>
			<div class="col-md-4">
			   联系人：${orgData.ctc_psn}
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				描述：${orgData.org_desc}
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				职责范围：${orgData.org_duty}
			</div>
		</div>
	</div>
</div>