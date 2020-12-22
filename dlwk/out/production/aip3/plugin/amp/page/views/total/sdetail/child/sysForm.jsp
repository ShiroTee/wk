<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- 信息系统详情 -->
<div class="row">
	<div class="col-md-10 col-md-offset-1">
		<div class="row">
			<div class="col-md-12">
				<div class="search-detail-title">信息系统描述：</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
			      系统识符：${syses.appsys_no}
			</div>
			<div class="col-md-4">
			        系统简称：${syses.sys_abbr}
			</div>
			<div class="col-md-4">
			   拥有部门：${syses.belong_to}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
			      使用单位：${syses.orgnames}
			</div>
			<div class="col-md-4">
			        开发者：${syses.developer}
			</div>
			<div class="col-md-4">
			 维护者：${syses.sys_owner_dep}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
			      开发年度：${syses.dev_year}
			</div>
			<div class="col-md-4">
			     开发语音与环境：${syses.dev_arch}
			</div>
			<div class="col-md-4">
			 应用模式：${syses.appmode}
			</div>
		</div>
		<div class="row">
			<div class="col-md-4">
			   数据库系统：${syses.dbname}
			</div>
			<div class="col-md-4">
			   中间件系统：${syses.midware_sys}
			</div>
			<div class="col-md-4">
			 状态：${syses.statusname}
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
			   系统描述：${syses.appsys_desc}
			</div>
		</div>
	</div>
</div>