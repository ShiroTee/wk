<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="sys-widget" class="navbar-fixed-bottom hide">

<style>
.widget-body .row{
padding-top:5px;
}
</style>

	<div class="widget-box widget-color-grey collapsed">
		<div class="widget-header">
			<h5 class="widget-title"></h5>

			<div class="widget-toolbar">
				<a class="widget-collapse" href="javascript:void(0);" data-action="collapse"> 
				<i class="1 ace-icon fa fa-chevron-down bigger-125"></i>
				</a>
			</div>			
		</div>
		<div class="widget-body">
		<table class="table table-bordered widget-table-desc">
		<tbody>
			<tr>
			    <td class="desc-laebl">系统编号：</td>
			    <td class="desc-content"><span id="appsysNo"></span></td>
			    <td class="desc-laebl">系统名称：</td>
			    <td class="desc-content"><span id="appsysNm"></span></td>
			    <td class="desc-laebl">数据量(M)：</td>
			    <td class="desc-content"><span id="dataAmt"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">系统简称：</td>
			    <td class="desc-content"><span id="sysAbbr"></span></td>
			    <td class="desc-laebl">开发者：</td>
			    <td class="desc-content"><span id="developer"></span></td>
			    <td class="desc-laebl">使用单位：</td>
			    <td class="desc-content"><span id="orgnames"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">拥有部门：</td>
			    <td class="desc-content"><span id="belongTo"></span></td>
			    <td class="desc-laebl">维护者：</td>
			    <td class="desc-content"><span id="sysOwnerDep"></span></td>
			    <td class="desc-laebl">开发年度：</td>
			    <td class="desc-content"><span id="devYear"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">应用模式：</td>
			    <td class="desc-content"><span id="appMode"></span></td>
			    <td class="desc-laebl">数据库：</td>
			    <td class="desc-content"><span id="dbName"></span></td>
			    <td class="desc-laebl">状态：</td>
			    <td class="desc-content"><span id="status"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">中间件系统：</td>
			    <td class="desc-content" colspan="1"><span id="midwareSys"></span></td>
			    <td class="desc-laebl">开发语言与环境：</td>
			    <td class="desc-content" colspan="3"><span id="devArch"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">系统描述：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="appsysDesc"></span></td>
			</tr>
		</tbody>
	</table>
			<!-- <div class="row">
			   <div class="col-md-4">		      
                    <label class="col-sm-4 " > 系统编号： </label>			      
				    <input type="text" id="appsysNo"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
			     
		     </div>
		      <div class="col-md-4">		      
                    <label class="col-sm-4 "> 系统名称： </label>			      
				    <input type="text" id="appsysNm"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
		     </div>
		      <div class="col-md-4">		      
                    <label class="col-sm-4 "> 中间件系统： </label>			      
				    <input type="text" id="midwareSys"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
		     </div>
		   </div>
		 
		   <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 系统简称： </label>			      
					    <input type="text" id="sysAbbr"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 开发者： </label>			      
					    <input type="text" id="developer"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 开发语言与环境： </label>			      
					    <input type="text" id="devArch"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		 
		    <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 拥有部门： </label>			      
					    <input type="text" id="belongTo"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 维护者： </label>			      
					    <input type="text" id="sysOwnerDep"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 开发年度： </label>			      
					    <input type="text" id="devYear"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		   
		     <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 应用模式： </label>			      
					    <input type="text" id="appMode"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 数据库： </label>			      
					    <input type="text" id="dbName"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 状态： </label>			      
					    <input type="text" id="status"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		   
		    <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 数据量： </label>			      
					    <input type="text" id="dataAmt"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 使用单位： </label>			      
					    <input type="text" id="orgnames"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		 
		   <div class="row">
		        <div class="col-md-12">
		          <div class="input-group" style="margin-left: 8px;margin-right: 35px;">
                      <span class="input-group-addon" ">系统描述</span> 
                     <textarea id="appsysDesc" rows="3" class="form-control" readonly="true" style="background:white;"></textarea>                 
                    </div>
                </div>
		   </div> -->
		   
	</div>
</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/sys-detail.js"></script>