<%@ page language="java" contentType="text/html; charset= UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<div class="box mr20 mb20 pb50">
	<div class="con_tit">
		<span class="con_tit_ico"></span>
		日志详情 
	</div>	
	<ul id="mdmPackage-baseInfo-table" classid="ff4305b8-a246-4be5-9099-37fb58f2ad9b" class="p0_20">
		<li class="conlist_li p0_20">
			<i class="conlist_dot"></i>
			访问时间：
			<span>
				<fmt:formatDate value="${info.requestDate}" type="both" />
			</span>
		</li>
		<li class="conlist_li">
			<i class="conlist_dot"></i>
			访问状态：
			<span>
			 	<c:choose>
					<c:when test="${info.exception==1 }">
						失败
					</c:when>
					<c:otherwise>
						成功
					</c:otherwise>
				</c:choose>
			</span>
		</li>
		<li class="conlist_li">
			<i class="conlist_dot"></i>
			请求路径：<span>${info.requestUrl}</span>
		</li>
		<li class="conlist_li">
			<i class="conlist_dot"></i>
			后台方法：<span>/loginInfoHandler/getLogPage</span>
		</li> 
		<li class="conlist_li">
			<i class="conlist_dot"></i>
			访问用户：
			<span>
				<c:choose>
					<c:when test="${empty info.user }">
						<font color="red">-</font>
					</c:when>
					<c:otherwise>
						${info.user.name}
					</c:otherwise>
				</c:choose>
			</span>
		</li> 
		<li class="conlist_li">
			<i class="conlist_dot"></i>
			登录名称：
			<span>
				<c:choose>
					<c:when test="${empty info.user }">
						<font color="red">-</font>
					</c:when>
					<c:otherwise>
						${info.user.loginName}
					</c:otherwise>
				</c:choose>
			</span>
		</li> 
		<li class="conlist_li">
			<i class="conlist_dot"></i>
			访问IP：
			<span>
				<c:choose>
					<c:when test="${empty info.requestIpAddress }">
						<font color="red">-</font>
					</c:when>
					<c:otherwise>
						${info.requestIpAddress}
					</c:otherwise>
				</c:choose>
			</span>
		</li> 
		<li class="conlist_li" style="height: inherit;">
			<i class="conlist_dot"></i>
			请求参数：
			<span style="display: block;margin-top: -36px;margin-left: 100px;word-wrap: break-word;">
				<c:choose>
					<c:when test="${empty info.requestParameters }">
						<font color="red">-</font>
					</c:when>
					<c:otherwise>
						${info.requestParameters}
					</c:otherwise>
				</c:choose>
			</span>
		</li> 
		<li class="conlist_li" style="height: inherit;">
			<i class="conlist_dot"></i>
			异常信息：
			<span style="display: block;margin-top: -36px;margin-left: 100px;word-wrap: break-word;">
				<c:choose>
					<c:when test="${empty info.errorMsg }">
						<font color="red">-</font>
					</c:when>
					<c:otherwise>
						${info.errorMsg}&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="log-${info.logId }">详情</a>
					</c:otherwise>
				</c:choose>
			</span>
		</li> 
		<li class="conlist_li" style="height: inherit;">
			<i class="conlist_dot"></i>
			请求SQL：
			<span> 
				<c:choose>
					<c:when test="${empty info.sqls }">
						<font color="red">-</font>
					</c:when>
					<c:otherwise>
						<c:forEach items="${info.sqls }" var="sql">
							<pre style="margin: -30px 0 0 100px;">${sql}</pre><p style="height: 30px;">
						</c:forEach>
					</c:otherwise>
				</c:choose>
			</span>
		</li> 
	</ul>
</div>
<link rel="stylesheet" type="text/css" href="${ctx }/resources/css/prettify.css" />
<script type="text/javascript" src="${ctx }/resources/js/prettify.js"></script>
<script>
	$(function()
	{
		prettyPrint();
		$("#log-${info.logId}").click(function()
		{
			var node =
			{};
			node.nodeId ="page-${info.logId}";
			node.text = "错误详细信息";
			node.href = "log/details.html?logId=${info.logId}";
			workspace.addPage(node);
		});
	});
</script>