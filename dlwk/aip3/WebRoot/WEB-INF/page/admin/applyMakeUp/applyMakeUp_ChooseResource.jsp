<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>
<div>
	<div class="fw_panel_body" id="amu_list" style="padding-left: 20px;
    padding-right: 20px;">
		<div class="row" style="margin-top: 5px;">
				<div class="col-sm-4">
					<span>资源类型:</span>
					<select id="amu_type" style="width:200px;">
					</select>
				</div>
				<div class="col-sm-7">
					 <input	id="amu_keyWord" type="text" style="width:150px;" 	placeholder="请输入关键字"> 
						<button id="amu_search" class="btn btn-info  btn-xs">搜索</button>
						<button id="amu_confirm" class="btn btn-info  btn-xs">确认选择</button>
						
					
				</div>
			</div>
			
		<table id="group-list" class="table table-bordered table-hover table-condensed" style="margin-top: 5px;margin-bottom: 0px;">
            <thead>
            <tr>
            	<th>选择</th>
                <th>资源目录名称</th>
                <th>资源类型</th>
                <th>所属主题</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
		<%@include file="../../common/admin-pagination.jsp" %>
	</div>
</div>
<script type="text/javascript"
	src="${ctx }/page/admin/applyMakeUp/js/applyMakeUp_ChooseResource.js"></script>