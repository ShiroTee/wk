<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/dataManagementAndMonitor/css/metadata_management.css"/>
<mdp:mdpHeader title="中心节点总体视角" curItem="management"/>
<section style="margin-top:40px;color: #000;overflow:hidden;" >
    <iframe width="100%" style="height:calc(100% - 40px)" scrolling="yes" frameborder="0" id="iframe" onload="iframeLoad();"
            src="${ctx}/mdp/dms/centerNode/index.html"></iframe>
</section>
<script>
	function iframeLoad(){
		document.getElementById("iframe").contentWindow.document.body.style.margin = "20px";
	}
</script>
<style>
	.foot{
		display:none;
	}
</style>
<mdp:mdpFooter />