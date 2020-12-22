<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/dataManagementAndMonitor/css/metadata_management.css"/>
    
<mdp:mdpHeader title="数据服务监控" curItem="management"/>
<section style="margin-top:40px;color: #000;">
	<iframe width="100%" height="90%"
			src="${ctx}/mdp/dms/dataServiceMonitor/index.html"></iframe>
</section>
<mdp:mdpFooter />