<%@ page language="java" pageEncoding="UTF-8" %>
<%@include file="../../common/import-tags.jspf" %>
<%@ taglib prefix="dms" tagdir="/WEB-INF/tags" %>
<div id="resources-apply" class="mr15">
    <!-- 查询条件 -->
    <div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="show-delete" style="padding:0 15px">
							<i class="icon-trash mr5"></i>删除
						</a>
					</li>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="show-add" style="padding:0 15px">
							<i class="icon-edit mr5"></i>补录
						</a>
					</li>
				</ul>
			</div>
			<div class="l pl15 clearfix" style="line-height:40px;">
				<div class="inline_any">
					编码
					<input id="number" type="text" placeholder="输入申请编码" value="${number }" 
					class="search_sm_input mr5" style="width:105px;padding:0">
				</div>
				<div class="inline_any">
					单位
					<input id="applyOrgName" type="text" placeholder="输入申请单位" value="${applyOrgName }" 
					class="search_sm_input mr5" style="width:105px;padding:0">
				</div>
				<div class="inline_any">
					状态
					<select id="applyIsHandle" class="mr5" style="width:50px;padding:0;height:22px;">
						<option value="">全部</option>
	                    <option value="0">等待处理</option>
	                    <option value="1">已处理</option>
					</select>
				</div>
				<div class="inline_any">
					日期
					<input type="text" id="resources-startTime" value="${startTime}" class="search_sm_input" style="width:100px;padding:0;"/>
               		<i class="icon-calendar mr5"></i>至
                	<input type="text" id="resources-endTime" value="${endTime}" class="search_sm_input" style="width:100px;padding:0;"/>
                    <i class="icon-calendar mr5"></i>
				</div>
				<!-- <input type="text" placeholder="输入关键字" class="search_sm_input" id="search_input"> -->
				<input type="button"  value="查询" class="search_sm_submit btn-qry" style="cursor: pointer;line-height: 24px;">
				<input type="button"  value="重置" class="search_sm_submit btn-reset" style="cursor: pointer;line-height: 24px;">
			</div>
	</div>
   <table id="resources-apply-box" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
       <thead>
       <tr>
           <th>
               <label class="position-relative">
                   <input type="checkbox" id="resources--id" class="ace"/>
                   <span class="lbl"></span>
               </label>
           </th>
           <th>序号</th>
           <th>申请编号</th>
           <th>申请单位</th>
           <th>申请联系人</th>
           <th>申请状态</th>
           <th>申请时间</th>
           <th>申请方式</th>
           <th>操作</th>
       </tr>
       </thead>
       <tbody>
       <c:choose>
           <c:when test="${empty pageList.list}">
               <tr>
                   <td colspan="9" style="color: red; text-align: center;">暂无资源申请信息</td>
               </tr>
           </c:when>
           <c:otherwise>
               <c:forEach var="list" items="${pageList.list}" varStatus="status">
                   <tr>
                       <td>
                           <label class="position-relative">
                               <input type="checkbox" value="${list.applyId}" class="ace"/>
                               <span class="lbl"></span>
                           </label>
                       </td>
                       <td>${status.index+1}</td>
                       <td>${list.applySerialNumString}</td>
                       <td>${list.applyOrgName}</td>
                       <td>${list.applyUser}</td>
                       <td>
                           <c:choose>
                               <c:when test="${list.applyIsHandle==0}">
                                   等待处理
                               </c:when>
                               <c:otherwise>
                                   已处理
                               </c:otherwise>
                           </c:choose>
                       </td>
                       <td><fmt:formatDate value="${list.applyDate}" pattern="yyyy-MM-dd HH:mm"/></td>
                       <td>
                           <c:choose>
                               <c:when test="${list.applyType==1}">
                                   人工录入
                               </c:when>
                               <c:otherwise>
                                   在线申请
                               </c:otherwise>
                           </c:choose>
                       </td>
                       <td>
                           <div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">
                               <a class="green" href="#" title="查看申请详情" applyId="${list.applyId}">
                                   <i class="icon-th-list bigger-130"></i></a>
                               <c:if test="${list.applyIsHandle==0}">
                                   <a class="blue" href="#" title="更新申请状态" applyId="${list.applyId}">
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
    var applyIsHandle="${applyIsHandle}";
    $("#applyIsHandle   option[value='" + applyIsHandle + "']").attr("selected", true);
</script>