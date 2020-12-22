<%@ page language="java" pageEncoding="UTF-8" %>
<%@include file="../../../common/import-tags.jspf"%>
<%@ taglib prefix="dms" tagdir="/WEB-INF/tags" %>
<div id="userGroup-right">
	<div class="clearfix box inline_any mb20" style="width:100%;">
    	<div class="filter_sort clearfix">
			<ul>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link" id="userGroup-add">
						<i class="icon-plus mr5"></i>添加用户
					</a>
				</li>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link" id="userGroup-alter">
						<i class="icon-trash mr5"></i>移除用户
					</a>
				</li>				
			</ul>
		</div>		
   	</div>
   	<div style="overflow: auto;" id="userGroup-table" >
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl">
            <thead>
            <tr>
                <th width="20%">用户名</th>
                <th width="20%">昵称</th>
                <!-- <th>邮箱</th> -->
                <th>手机号</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <%@include file="../../../common/admin-pagination.jsp" %>
    </div>
</div>