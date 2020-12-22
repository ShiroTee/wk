<%@ page language="java" pageEncoding="UTF-8"%>
<%@include file="../../common/import-tags.jspf"%>

<script type="text/javascript" src="${ctx }/page/admin/datamodel/jsrender.min.js" />
<script type="text/javascript" src="${ctx }/page/admin/datamodel/bootstrap-treeview.min.js" />
<script type="text/javascript" src="${ctx }/page/admin/datamodel/bp.js" />
<style>
 .margin2{
   margin-bottom:2px;
 }
 .apilist {
	position: absolute;
	z-index: 2000;
	border: solid 1px gray;
	width: 450px;
	display: block;
	background: white;
}

.apilist li:hover {
	background-color: #E0E0E0;
}
.circlecss{
    width:45px;
    height:45px;
    background-color:gray;
    border-radius:50px;
    cursor: pointer;
    float:left;
    margin:1px;
    padding-left:6px;
    padding-top:4px;
}
.circlecss.selected{
  background-color:red;
  border:solid 2px gray;
}
.circlecss.unselected{
  border:solid 2px gray;
  background-color:gray;
}
</style>
<input type="hidden"  value="${fileImgPath}" id="imagePathId" />
<input type="hidden"  value="${cloudUrl}" id="cloudUrlId" />

<div class="col-md-12">
	<div class="col-md-4">
		<div class="panel panel-default">
			<div class="panel-heading">
				企业画像节点配置
				<button type="button" class="btn btn-success btn-sm pull-right disabled  addNodeCss" style="margin-top: -8px;">添加子节点</button>
			</div>
			<div class="panel-body bpnodetree">
				<div id="treeview8" class=""></div>
			</div>
		</div>
	</div>
	<div class="col-md-8">
		<div class="panel panel-default">
			<div class="panel-heading">配置详情</div>
			<div class="panel-body bpbody" >
			<!-- 	<span class="label label-warning"> 点击左侧企业画像节点创建和编辑节点信息</span> -->
				 

				 
			</div>
			
		</div>
	</div>
</div>
 
<script id="bpeditTemplate" type="text/x-jsrender">
                     
					<div class="form-group margin2">
						<label class="col-md-2 margin2 ">上层节点:</label>
						<div class="col-md-10 margin2">
							<input type="text"  class="form-control " disabled="disabled" placeholder="" value="{{:PARENT_NAME}}" />
                            <input type="hidden"  name="parentid"  value="{{:PARENT_ID}}"  class="form-control " placeholder="" />
                            <input type="hidden"  name="dataid"  value="{{:ID}}" class="form-control " placeholder="">
						</div>
					</div>
					<div class="form-group margin2">
						<label class="col-md-2 margin2">节点名称:</label>
						<div class="col-md-10 margin2">
							<input type="text"  name="nodename"  value="{{:NODE_NAME}}"  class="form-control  " placeholder="">
						</div>
					</div>
					<div class="form-group margin2">
						<label class="col-md-2 margin2">服务地址:</label>
						<div class="col-md-10 margin2">
                           

							  <input type="hidden"  name="url"  value="{{:SERVICE_URL}}"   class="form-control  " placeholder="">
                              <input type="text"  name="showname"  value="{{:serverName}}"  onkeyup="searchBPUrl(this);"  class="form-control  " placeholder="">
                              <input type="text"  name="showurl" value="{{:accessurl}} "   readonly="readonly" class="form-control  " placeholder="">
                              <span id="searchAPIID"></span>
                            
						</div>
					</div>
   
					<div class="form-group margin2">
						<label class="col-md-2 margin2">选择图标:</label>
						<div class="col-md-10 margin2">
                            <div style="width:100%;border:solid 1px #d5d5d5;float:left;">
                               {{for  paths}}
                                   {{if name == img}}
							         <div class="circlecss selected"  img="{{:name}}" onclick="selectIcon(this);">
                                         <img src="{{:file}}" height="30" width="30" />
                                     </div>
                                   {{else}}
 							         <div class="circlecss unselected"  img="{{:name}}" onclick="selectIcon(this);">
                                         <img src="{{:file}}" height="30" width="30" />
                                     </div>                                  
                                   {{/if}}

                               {{/for}}
                            <div>
						</div>
					</div>
                    </div>
                 <div class="form-group margin2">
                          <label class="col-md-2 margin2">显示:</label>
                          <div class="col-md-10 margin2  "  >
                                <input type="checkbox"  class="form-control " {{:CHECKSERVICE=='1'?'checked="checked"':''}}  name="checkservice"    placeholder="" style="width:20px;float:left"  />
                                   <span style="float:left;margin-top:10px;">(检查服务地址数据，数据存在则显示节点)</span>
                          </div>
                    </div>
 
               <br /><br /><br /> <br /><br /><br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
			   <button type="button" class="btn btn-danger pull-left  deleteNodeCss">删除</button>
			   <button type="button" class="btn btn-success pull-right  saveNodeCss" >添加</button>
			 
</script>
<script id="apiListTemplate" type="text/x-jsrender">
<ul class="apilist" style="height: 200px; overflow-y: auto;">
                        <li onclick="selectAPIUrl(this);" dataname="" value="">&nbsp;</li>
						{{for datas}}
						<li onclick="selectAPIUrl(this);" dataname="{{:RES_NM}}" value="{{:PUBLISH_URL}}">{{:RES_NM}}(URL:{{:PUBLISH_URL}}) </li>
						{{/for}}
</ul>
</script>