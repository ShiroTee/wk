<!-- 使用方法
页面跳转var url=ctx+"/mdp/amp/cvpInfoSysHandler/indexSankey?id="+orgid;
		window.location.href=url;
 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>
<amp:ampHeader title="信息系统与信息资源关联关系图" />
<link rel="stylesheet" href="${ctx }/plugin/amp/page/views/theme/css/org-asset.css" />
<%@include file="infosyssankey-header.jsp"%>
<%@include file="infosyssankey-content.jsp"%>
<%@include file="../../detail/sys-detail.jsp"%>
<%@include file="../../detail/them-resourceInfo.jsp"%>
<amp:ampFooter />

