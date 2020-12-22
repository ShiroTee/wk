<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<div id="busi-widget" class="navbar-fixed-bottom hide">

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
		<div class="widget-body" >
		<table class="table table-bordered widget-table-desc">
		 <tbody>
		   <tr>
			    <td class="desc-laebl">业务序号：</td>
			    <td class="desc-content"><span id="busiCode"></span></td>
			    <td class="desc-laebl">应用系统：</td>
			    <td class="desc-content"><span id="appsysId"></span></td>
			    <td class="desc-laebl">应用功能：</td>
			    <td class="desc-content"><span id="appfunId"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">业务名称：</td>
			    <td class="desc-content"><span id="busiName"></span></td>
			    <td class="desc-laebl">上级业务：</td>
			    <td class="desc-content"><span id="parbusiId"></span></td>
			    <td class="desc-laebl">办理主体：</td>
			    <td class="desc-content"><span id="mainBody"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">办理主体类型：</td>
			    <td class="desc-content"><span id="mainbodyTyp"></span></td>
			    <td class="desc-laebl">事项类型：</td>
			    <td class="desc-content"><span id="busiTyp"></span></td>
			    <td class="desc-laebl">事项编号：</td>
			    <td class="desc-content"><span id="busiitemNo"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">重要程度：</td>
			    <td class="desc-content"><span id="importantname"></span></td>
			    <td class="desc-laebl">优先级：</td>
			    <td class="desc-content"><span id="priority"></span></td>
			    <td class="desc-laebl">业务机构：</td>
			    <td class="desc-content"><span id="orgName"></span></td>
			</tr>
			<tr>
			    <td class="desc-laebl">规模：</td>
			    <td class="desc-content" colspan="1"><span id="scale"></span></td>
			    <td class="desc-laebl">复杂程度：</td>
			    <td class="desc-content" colspan="3"><span id="complex"></span></td>
			</tr>
			<tr class="text-area-tr">
			    <td class="desc-laebl">业务描述：</td>
			    <td class="desc-content"  colspan="5"><span class="txtArea" id="busiDesc"></span></td>
			</tr>
		 </tbody>
		 </table>
			<!-- <div class="row">
			   <div class="col-md-4">		      
                    <label class="col-sm-4 " > 业务序号： </label>			      
				    <input type="text" id="busiCode"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
			     
		     </div>
		      <div class="col-md-4">		      
                    <label class="col-sm-4 "> 应用系统： </label>			      
				    <input type="text" id="appsysId"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
		     </div>
		      <div class="col-md-4">		      
                    <label class="col-sm-4 "> 应用功能： </label>			      
				    <input type="text" id="appfunId"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
		     </div>
		   </div>
		 
		   <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 业务名称： </label>			      
					    <input type="text" id="busiName"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 上级业务： </label>			      
					    <input type="text" id="parbusiId"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 办理主体： </label>			      
					    <input type="text" id="mainBody"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		 
		    <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 办理主体类型： </label>			      
					    <input type="text" id="mainbodyTyp"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 事项类型： </label>			      
					    <input type="text" id="busiTyp"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 事项编号： </label>			      
					    <input type="text" id="busiitemNo"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		   
		     <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 重要程度： </label>			      
					    <input type="text" id="importantname"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 优先级： </label>			      
					    <input type="text" id="priority"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 业务机构： </label>			      
					    <input type="text" id="orgName"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		   
		    <div class="row">
				   <div class="col-md-4">		      
	                    <label class="col-sm-4 " > 规模： </label>			      
					    <input type="text" id="scale"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>				     
				     
			     </div>
			      <div class="col-md-4">		      
	                    <label class="col-sm-4 "> 复杂程度： </label>			      
					    <input type="text" id="complex"  class="col-xs-10 col-sm-7 input-sm" readOnly="true"/>			     	     
			     </div>
		   </div>
		 
		   <div class="row">
		        <div class="col-md-12">
		          <div class="input-group" style="margin-left: 8px;margin-right: 35px;">
                      <span class="input-group-addon" ">业务描述</span> 
                     <textarea id="busiDesc" rows="3" class="form-control" readonly="true" style="background:white;"></textarea>                 
                    </div>
                </div>
		   </div> -->
		   
	</div>
</div>
</div>
<script type="text/javascript" src="${ctx}/plugin/amp/page/views/detail/js/busi-detail.js"></script>