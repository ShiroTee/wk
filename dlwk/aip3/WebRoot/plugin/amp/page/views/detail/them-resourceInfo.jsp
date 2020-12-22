<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="them-res" class="navbar-fixed-bottom hide">
	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">
			<h5 class="widget-title" id="widget-title"></h5>
			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);"
					data-action="collapse"> <i
					class="1 ace-icon fa fa-chevron-down bigger-125"></i>
				</a>
			</div>
		</div>
		<input id="id" type="hidden"/>
		<input id="name" type="hidden"/>
		<div class="widget-body" style="padding-bottom: 10px;">
			<div class="row">
			  <div class="col-md-7"><%@include file="them-leftRes.jsp"%></div>			
			  <div class="col-md-5"><%@include file="them-rightdata.jsp"%></div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/needRes.js"></script>