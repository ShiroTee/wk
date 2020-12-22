<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="org-widget" class="navbar-fixed-bottom hide">

<style>
.widget-body .row{
padding-top:10px;
}
</style>

	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">
			<h5 class="widget-title">组织机构详情<span style="color:#FDFAAF">（双击查看）</span></h5>

			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);" data-action="collapse"> 
				<i class="1 ace-icon fa fa-chevron-down bigger-125"></i>
				</a>
			</div>			
		</div>
		<div class="widget-body" style="padding-bottom:10px;">
		<table class="table table-bordered widget-table-desc">
		<tbody>
			<tr>
			    <td class="desc-laebl">组织机构编码：</td>
			    <td class="desc-content"><span id="org_cd"></span></td>
			    <td class="desc-laebl">组织机构名称：</td>
			    <td class="desc-content"><span id="org_nm"></span></td>
			    <td class="desc-laebl">类别：</td>
			    <td class="desc-content"><span id="orgtypename"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">级别：</td>
			    <td class="desc-content"><span id="orglvname"></span></td>
			    <td class="desc-laebl">上级机构组织：</td>
			    <td class="desc-content"><span id="parentorgname"></span></td>
			    <td class="desc-laebl">负责人：</td>
			    <td class="desc-content"><span id="leader"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">成立日期：</td>
			    <td class="desc-content"><span id="found_date"></span></td>
			    <td class="desc-laebl">地址：</td>
			    <td class="desc-content"><span id="org_addr"></span></td>
			    <td class="desc-laebl">联系人：</td>
			    <td class="desc-content"><span id="ctc_psn"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">描述：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="org_desc"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">职责范围：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="org_duty"></span></td>
			</tr>
		</tbody>
	</table>
			<!-- <div class="row">
			   <div class="col-md-4">		      
                    <label class="col-sm-4 " > 组织机构编码： </label>			      
				    <input type="text" id="orgCode"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
			     
		     </div>
		      <div class="col-md-4">		      
                    <label class="col-sm-4 "> 组织机构名称： </label>			      
				    <input type="text" id="orgName"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
		     </div>
		      <div class="col-md-4">		      
                    <label class="col-sm-4 "> 类别： </label>			      
				    <input type="text" id="orgType"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
		     </div>
		   </div>
		 
		   <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 级别： </label>			      
					    <input type="text" id="orgLevel"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 上级组织机构： </label>			      
					    <input type="text" id="parentOrgId"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 负责人： </label>			      
					    <input type="text" id="leader"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		 
		    <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 成立日期： </label>			      
					    <input type="text" id="foundDate"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 地址： </label>			      
					    <input type="text" id="orgAddr"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 联系人： </label>			      
					    <input type="text" id="ctcPsn"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		 
		   <div class="row">
		        <div class="col-md-12">
		          <div class="input-group" style="margin-left: 8px;margin-right: 35px;">
                      <span class="input-group-addon" >描述&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                     <textarea id="orgDesc" rows="3" class="form-control" readonly="true" style="background: white;"></textarea>                 
                    </div>
                </div>
		   </div>
		   
		   <div class="row">
		        <div class="col-md-12">
		          <div class="input-group" style="margin-left: 8px;margin-right: 35px;">
                      <span class="input-group-addon" ">职责范围</span> 
                     <textarea id="orgDuty" rows="3" class="form-control" readonly="true" style="overflow: scroll;background:white;"></textarea>                 
                    </div>
                </div>
		   </div> -->
		   
	</div>
</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/org-detail.js"></script>