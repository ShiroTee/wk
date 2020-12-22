<%@ page language="java" contentType="text/html; charset= UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="dms" tagdir="/WEB-INF/tags"%>
<div class="mr15" id="log-panel9-87">
	<div class="clearfix box inline_any mb20" style="width:100%;">			
		<div class="l pl20 clearfix" style="line-height:40px;">
			<div class="inline_any">
				开始时间：
				<input type="text" id="logStartDate" data-date-format="yyyy-mm-dd" value="${startDate}" class="search_sm_input m0_5" style="width:120px;padding:0;">
              		<i class="icon-calendar mr5"></i>
              	结束时间：
               	<input type="text" id="logEndDate" data-date-format="yyyy-mm-dd" value="${endDate }" class="search_sm_input m0_5" style="width:120px;padding:0;">
                   <i class="icon-calendar mr5"></i>
			</div>
		</div>
		<div class="filter_sort clearfix">
			<ul>				
				<li class="filter_sort_li" style="position: relative;margin-left: 20px;border-left: 1px #e0e0e0 solid;">
					<a href="javascript:void(0);" class="filter_sort_link" data-toggle="dropdown">
						访问状态 <i class="icon-angle-down icon-on-right"></i>
					</a>
					<ul class="dropdown-menu dropdown-info pull-right"
						style="min-width: 100px;">
						<li>
							<div class="radio">
								<label> <input name="logExceptionStatus" type="radio"
									class="ace" value="-1"
									<c:if test="${exception==-1 }">checked</c:if> /><span
									class="lbl">全部</span>
								</label>
							</div>
						</li>
						<li>
							<div class="radio">
								<label> <input name="logExceptionStatus" type="radio"
									class="ace" value="0"
									<c:if test="${exception==0 }">checked</c:if> /><span
									class="lbl">成功</span>
								</label>
							</div>
						</li>
						<li>
							<div class="radio">
								<label> <input name="logExceptionStatus" type="radio"
									class="ace" value="1"
									<c:if test="${exception==1 }">checked</c:if> /><span
									class="lbl">失败</span>
								</label>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="l pl20 clearfix" style="line-height:40px;">
			<div class="inline_any">
				<input id="logSearch" value="${searchWord}" type="text" placeholder="登录名 名称 请求路径" class="search_sm_input ml5 mt10 mr20" style="width:160px;padding:0">
			</div>
			<input type="button" id="btnSearch" value="搜索" class="search_sm_submit btn-qry" style="cursor: pointer;line-height: 24px;">
		</div>
	</div>
	<table id="logDataTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
		<thead>
			<tr>
				<th>序号</th>
				<th>登录名</th>
				<th>访问路径</th>
				<th>功能名称</th>
				<th>子功能名称</th>
				<th>访问时间</th>
				<th>访问IP</th>
				<th>访问状态</th>
				<th></th>
			</tr>
		</thead>
		<tbody>

			<c:choose>
				<c:when test="${empty pageList.list}">
					<tr>
						<td colspan="7" style="color: red; text-align: center;">暂无访问记录</td>
					</tr>
				</c:when>
				<c:otherwise>
					<c:forEach items="${pageList.list }" var="list" varStatus="status">
						<tr>
							<td>${status.index+1}</td>
							<td><c:choose>
									<c:when test="${empty list.loginName }">
										<font color="red">匿名</font>
									</c:when>
									<c:otherwise>
										${list.user.name }(${list.user.loginName })
									</c:otherwise>
								</c:choose></td>
							<td>${list.requestUrl }</td>
							<td>${list.functionName }</td>
							<td>${list.subFunctionName }</td>
							<td><fmt:formatDate value="${list.requestDate}" type="both" /></td>
							<td>${list.requestIpAddress}</td>
							<td><c:choose>
									<c:when test="${list.exception==1 }">
										<span
											class='label label-sm label-danger arrowed arrowed-righ'>失败</span>
									</c:when>
									<c:otherwise>
										<span
											class='label label-sm label-success arrowed arrowed-righ'>成功</span>
									</c:otherwise>
								</c:choose></td>
							<td class=" ">
								<div
									class="visible-md visible-lg hidden-sm hidden-xs action-buttons">
									<a class="blue" href="#" title="查看日志详情" id="${list.logId }">
										<i class="icon-zoom-in bigger-130"></i>
									</a>
								</div>
							</td>
						</tr>
					</c:forEach>
				</c:otherwise>
			</c:choose>
		</tbody>
	</table>
	<dms:Paging pageList="${pageList}"/>
</div>
<script type="text/javascript" src="${ctx }/log/js/log_list.js"></script>