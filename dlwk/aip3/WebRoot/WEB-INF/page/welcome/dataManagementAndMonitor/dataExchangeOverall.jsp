<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="../../common/import-tags.jspf" %>
<link rel="stylesheet" href="${ctx }/page/welcome/dataManagementAndMonitor/css/metadata_management.css"/>

<mdp:mdpHeader title="数据交换全局视角" curItem="management"/>
<section style="margin-top:40px;color: #000;overflow:hidden;">
        <iframe width="100%" style="height:calc(100% - 40px)" frameborder="0" 
                src="${ctx}/mdp/dms/index.html"></iframe>
</section>
<style>
	.foot{
		display:none;
	}
</style>
<mdp:mdpFooter/>