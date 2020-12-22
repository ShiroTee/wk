<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<style>
   #officeTable tbody tr
   {
   		cursor: pointer;
   }
</style>
<div id="orgOffice-widget" class="navbar-fixed-bottom hide">
	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">
			<h5 class="widget-title"></h5>

			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);" data-action="collapse"> 
				<i class="1 ace-icon fa fa-chevron-down bigger-125"></i>
				</a>
			</div>			
		</div>
		<div class="widget-body" style="padding-bottom:10px;">
			<div class="row">
				<div class="col-md-3" style="height: 240px;overflow: auto;">
					<table id="officeTable" class="table  table-bordered table-hover" style="width: 100%;">
						<thead>
							<tr>
								<th field="orgcode"  >组织机构编码</th>
								<th field="name" >组织机构名称</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</table>	
				</div>
			   <div class="col-md-9">
			   		<%@include file="org-content.jsp" %>	      
		       </div>
		   </div>
	</div>
</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/org-detail-office.js"></script>