<%@ page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!-- <div class="panel-group mr15" id="anthorityManageAccordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="anthorityManageHeadingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#anthorityManageAccordion" href="#anthorityManageCollapseOne" aria-expanded="true" aria-controls="anthorityManageCollapseOne">
          	授权信息管理
        </a>
      </h4>
    </div>
    <div id="anthorityManageCollapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="anthorityManageHeadingOne">
      <div class="panel-body"> -->
      <div class="mr15">
        <div class="clearfix box inline_any mb20" style="width:100%;">		
			<div class="l pl20 clearfix" style="line-height:40px;">
				<!-- <ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link">
							<i class="icon-save"></i> 启用
						</a>
					</li>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link">
							<i class="icon-plus"></i> 禁用
						</a>
					</li>						
				</ul> -->
				<div class="inline_any">
					<input type="text" id="authority-args" placeholder="登录名 姓名 KEY" class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
				</div>
				<input onclick="queryAuthorityInfo()" id="dict-search-btn" type="button"  value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">			
			</div>
		</div>
		<table id="authority-table" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>				
					<th>授权KEY</th>
					<th>名称</th>
					<th>登录名</th>
					<th>授权时间</th>
					<th>启用状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>				
				<!-- <tr>
					<td colspan="5" style="color: red; text-align: center;">暂无授权信息</td>
				</tr> -->
				<tr>
					<td>MA6R-6WNR-GV5K-T2LY6</td>
					<td>超级管理员</td>
					<td>admin</td>
					<td>2017-06-13 11:30:00</td>					
					<td>
						<div>
							<a class="md-able" href="javascript:void(0);" title="启用" data-authorityId="" >
								<i class="icon icon-play-circle mr5" aria-hidden="true"></i>
							</a>
							<a class="md-authority-detail" href="javascript:void(0);" title="查看授权内容" data-authorityId="" >
								<i class="icon icon-search" aria-hidden="true"></i>
							</a>								
						</div>
					</td>
				</tr>
				<tr>
					<td>FXEM-1H52-Y9GL-S5BWW</td>
					<td>王麻子</td>
					<td>wangmza</td>
					<td>2017-06-13 11:30:00</td>					
					<td>
						<div>
							<a class="md-enable" href="javascript:void(0);" title="停用" data-authorityId="" >
								<i class="icon icon-stop mr5" aria-hidden="true"></i>
							</a>
							<a class="md-authority-detail" href="javascript:void(0);" title="查看授权服务" data-authorityId="" >
								<i class="icon icon-search" aria-hidden="true"></i>
							</a>								
						</div>
					</td>
				</tr>				
			</tbody>
		</table>
		<div class="col-md-12 md-main-table-page" id="authorityManage-page">
				<%@include file="../../../common/admin-pagination.jsp"%>
		</div>
		</div>
      <!--</div>
    </div>
  </div> -->
  <!-- <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="anthorityManageHeadingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#anthorityManageAccordion" href="#anthorityManageCollapseTwo" aria-expanded="false" aria-controls="anthorityManageCollapseTwo">
          	权限管理（资产角色管理）
        </a>
      </h4>
    </div>
    <div id="anthorityManageCollapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="anthorityManageHeadingTwo">
      <div class="panel-body">
        <div class="clearfix box inline_any mb20" style="width:100%;">		
			<ul>
				<li class="filter_sort_li">
					<a id="addRightRole" href="javascript:void(0);" class="filter_sort_link">
						<i class="icon-plus"></i> 新增
					</a>
				</li>				
			</ul>
			<div class="l pl20 clearfix" style="line-height:40px;">
				<div class="inline_any">
					角色名称
					<input type="text" placeholder="角色名称" class="nav-search-input search_sm_input mt10 ml5 mr20" style="width:160px;">
				</div>
				<input id="dict-search-btn" type="button"  value="搜索" class="search_sm_submit search-btn" style="cursor: pointer;line-height: 24px;">			
			</div>
		</div>
		<table id="right-list" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>				
					<th>角色名称</th>
					<th>状态</th>
					<th>创建时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>				
				<tr>
					<td colspan="4" style="color: red; text-align: center;">暂无资料</td>
				</tr>
				<tr>
					<td>user</td>
					<td>启用</td>
					<td>2017-06-12 11:30:00</td>
					<td>
						<div>
							<a class="md-right-edit" href="javascript:void(0);" title="修改" data-roleId="" >
								<i class="icon icon-edit mr5" aria-hidden="true"></i>
							</a>
							<a class="md-right-del" href="javascript:void(0);" title="删除" data-roleId="" >
								<i class="icon icon-trash mr5" aria-hidden="true"></i>
							</a>
							<a class="md-right-set" href="javascript:void(0);" title="权限分配" data-roleId="" >
								<i class="icon icon-check mr5" aria-hidden="true"></i>
							</a>
							<a class="md-right-user-set" href="javascript:void(0);" title="用户分配" data-roleId="" >
								<i class="icon icon-user" aria-hidden="true"></i>
							</a>									
						</div>
					</td>
				</tr>								
			</tbody>
		</table>
      </div>
    </div>
  </div>   -->
</div>
<script type="text/javascript"
	src="${ctx }/page/admin/resourceCatalogue/authorityManage/js/authorityManage.js"></script>