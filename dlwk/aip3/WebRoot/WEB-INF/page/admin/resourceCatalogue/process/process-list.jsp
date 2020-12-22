<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../../common/import-tags.jspf"%>
<style>
	a.filter_sort_link  .webuploader-pick {
    	position: inherit;
    	display: inherit;
    	cursor: pointer;
    	background: none !important;
    	padding: 0;
    	color: inherit;
    	text-align: inherit;
    	border-radius: 0;
    	overflow: inherit;
	}
	a.filter_sort_link  .webuploader-pick + div label{
		margin-bottom: 0;
	}
	a.filter_sort_link  .webuploader-pick + div input{
		width: 100%;
	}
</style>
<div class="mr15">
	<div id='flowcfg'></div>
	<div id="workflow-list-box">
		<div class="clearfix box inline_any mb20" style="width:100%;">
			<div class="filter_sort clearfix">
				<ul>
					<li class="filter_sort_li">
						<a href="javascript:void(0);" class="filter_sort_link" id="picker">
							<i class="icon-plus mr5"></i>部署流程
						</a>
					</li>
				</ul>
			</div>
			<!--用来存放文件信息-->
			<div id="thelist" class="uploader-list"></div>
		</div>
		<table id="processList" width="100%" border="0" cellspacing="0" cellpadding="0" class="tabl mb10">
			<thead>
				<tr>
					<th>序号</th>
					<th>名称</th>
					<th>显示名称</th>
					<th>流程版本</th>
					<th>创建时间</th>
					<th>状态</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id="processDefId">

			</tbody>
		</table>
	</div>
</div>
<script type="text/javascript" src="${ctx}/page/admin/resourceCatalogue/process/process-list.js"></script>
