<%@ page language="java" pageEncoding="UTF-8" %>
<div id="grouplist">
	<div class="clearfix box inline_any mb20" style="width:100%;">
    	<div class="filter_sort clearfix">
			<ul>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link" id="group-add">
						<i class="icon-plus mr5"></i>新增
					</a>
				</li>
				<li class="filter_sort_li"> 
					<a href="javascript:void(0);" class="filter_sort_link" id="group-alter">
						<i class="icon-pencil mr5"></i>修改
					</a>
				</li>
				<li class="filter_sort_li">
					<a href="javascript:void(0);" class="filter_sort_link" id="group-delete">
						<i class="icon-trash mr5"></i>删除
					</a>
				</li>
				<li class="filter_sort_li" style="position: relative;">
					<a href="javascript:void(0);" data-toggle="dropdown" class="filter_sort_link">
						分配角色
						<i class="icon-angle-down icon-on-right"></i>
					</a>
					<ul class="dropdown-menu dropdown-default">
	                    <li>
	                        <a id="addrole" href="#">增加角色</a>
	                    </li>
	                    <li>
	                        <a id="deleterole" href="#">删除角色</a>
	                    </li>
	                </ul>
				</li>
			</ul>
		</div>
		<div class="l pl20 clearfix" style="line-height:40px;">
			<div class="inline_any">
				<input id="group-name" type="text" placeholder="请输入用户组名" value="${recordId }" 
				class="search_sm_input ml5 mr20 mt10" style="width:160px;">
			</div>				
			<input type="button" id="select-group-name" value="搜索" class="search_sm_submit btn-qry" style="cursor: pointer;line-height: 24px;">
		</div>
   	</div>    
    <div id="user_group_list_box" style="overflow: auto;">
        <table id="group-list"  width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl">
            <thead>
            <tr>
                <th width="20%">用户组名称</th>
                <th width="40%">描述</th>
                <th>角色</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <%@include file="../../../common/admin-pagination.jsp" %>
    </div>
</div>