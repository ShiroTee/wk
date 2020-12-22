<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/dataManagementAndMonitor/css/metadata_management.css"/>
    
<mdp:mdpHeader title="中心交换节点数据" curItem="management"/>
<section style="margin-top:40px;color: #000;">
	<iframe width="100%" style="height:calc(100% - 40px)" scrolling="yes" frameborder="0" id="iframe" onload="iframeLoad();"
			src="${ctx}/mdp/dms/PreExchNodeData/indexCenter.html"></iframe>
</section>
<script>
	function iframeLoad(){
		document.getElementById("iframe").contentWindow.document.body.style.margin = "20px 0 20px 20px";
	}
</script>
<style>
	.foot{
		display:none;
	}
</style>
<mdp:mdpFooter />