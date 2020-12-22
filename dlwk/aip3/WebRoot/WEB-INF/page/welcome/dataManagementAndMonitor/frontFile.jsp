<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<link rel="stylesheet" href="${ctx }/page/welcome/dataManagementAndMonitor/css/front_file.css"/>
<mdp:mdpHeader title="前置交换节点文件" curItem="management"/>
<section style="margin-top:40px;">
    <iframe width="100%" style="height:calc(100% - 40px)" scrolling="yes" frameborder="0" id="iframe" onload="iframeLoad();"
            src="${ctx}/mdp/dms/filedata/index.html"></iframe>
</section>
<script>
	function iframeLoad(){
		document.getElementById("iframe").contentWindow.document.body.style.margin = "20px 0px 20px 20px";
	}
</script>
<style>
	.foot{
		display:none;
	}
</style>
<mdp:mdpFooter />