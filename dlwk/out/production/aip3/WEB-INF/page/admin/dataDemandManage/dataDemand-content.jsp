<%@ page language="java" pageEncoding="UTF-8" %>
<%@include file="../../common/import-tags.jspf" %>
<%@ taglib prefix="dms" tagdir="/WEB-INF/tags" %>
<div id="data-demand" class="pr15">
    <!-- 查询条件 -->
    <div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="show-delete">
							<i class="icon-trash mr5"></i>删除
						</a>
					</li>
				</ul>
			</div>
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					输入单位名称
					<input id="dapplyOrgName" type="text" placeholder="输入申请编码" value="${dapplyOrgName }" 
					class="search_sm_input ml5 mr20" style="width:120px;padding:0">
				</div>
				<div class="inline_any">
					需求状态
					<select id="dapplyType" class="ml5 mr20" name="dapplyType" style="height:22px;">
                    <option value="">全部</option>
                    <option value="0">等待处理</option>
                    <option value="1">已处理</option>
                </select>
				</div>
				<div class="inline_any">
					需求提交日期
					<input type="text" id="data-startTime" value="${startTime}" class="search_sm_input m0_5" style="width:100px;padding:0;"/>
               		<i class="icon-calendar mr5"></i>至
                	<input type="text" id="data-endTime" value="${endTime}" class="search_sm_input m0_5" style="width:100px;padding:0;"/>
                    <i class="icon-calendar mr5"></i>
				</div>
				<!-- <input type="text" placeholder="输入关键字" class="search_sm_input" id="search_input"> -->
				<input type="button"  value="查询" class="search_sm_submit btn-qry" style="cursor: pointer;line-height: 24px;">
				<input type="button"  value="重置" class="search_sm_submit btn-reset" style="cursor: pointer;line-height: 24px;">
			</div>
	</div>
    

	<table id="data-demand-box"  width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
	    <thead>
	    <tr>
	        <th>
	            <label class="position-relative">
	                <input type="checkbox" id="data-demand-id" class="ace"/>
	                <span class="lbl"></span>
	            </label>
	        </th>
	        <th>序号</th>
	        <th>需求主题</th>
	        <th>需求单位</th>
	        <th>需求状态</th>
	        <th>需求提交时间</th>
	        <th>操作</th>
	    </tr>
	    </thead>
	    <tbody>
	    <c:choose>
	        <c:when test="${empty pageList.list}">
	            <tr>
	                <td colspan="7" style="color: red; text-align: center;">暂无数据需求信息</td>
	            </tr>
	        </c:when>
	        <c:otherwise>
	            <c:forEach var="list" items="${pageList.list}" varStatus="status">
	                <tr>
	                    <td>
	                        <label class="position-relative">
	                            <input type="checkbox" value="${list.dapplyId}" class="ace"/>
	                            <span class="lbl"></span>
	                        </label>
	                    </td>
	                    <td>${status.index+1}</td>
	                    <td>${list.dapplySubject}</td>
	                    <td>${list.dapplyOrgName}</td>
	                    <td>
	                        <c:choose>
	                            <c:when test="${list.dapplyResultType==0}">
	                                等待处理
	                            </c:when>
	                            <c:otherwise>
	                                已处理
	                            </c:otherwise>
	                        </c:choose>
	                    </td>
	                    <td><fmt:formatDate value="${list.dapplyDate}" pattern="yyyy-MM-dd HH:mm"/></td>
	                    <td>
	                        <div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">
	                            <a class="green" href="#" title="查看申请详情" dapplyId="${list.dapplyId}">
	                                <i class="icon-th-list bigger-130"></i></a>
	                            <c:if test="${list.dapplyResultType==0}">
	                                <a class="blue" href="#" title="更新申请状态" dapplyId="${list.dapplyId}">
	                                    <i class="icon-cog bigger-130"></i></a>
	                            </c:if>
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
<script>
    var dapplyType="${dapplyType}";
    $("#dapplyType   option[value='" + dapplyType + "']").attr("selected", true);
</script>