//被勾选过的资源目录id
var checkedResources=[];

$(function(){
    $("#amu_list #q_listPagination").removeAttr("style");
    $("#amu_list #q_listPagination").css('float', 'right');
    
    $("#amu_search").click(function(){
    	var resourceType=$("#amu_type").val();
    	var keyWord=$("#amu_keyWord").val();
    	loadResourceData(resourceType,keyWord);
    });
    
    
  //表格 checkbox点击事件
    $("#myModal tbody").delegate("input[type=checkbox]", "click", function(){
		if($(this).is(':checked')){
			checkedResources.push($(this).attr("id"));
		}else{
			checkedResources.remove($(this).attr("id"));
		}
	});
    
    
    //确认选择按钮事件
    $("#amu_confirm").click(function(){
    	var idList=[];
    	if(checkedResources.length!=0){
    		for(var i=0;i<checkedResources.length;i++){
        		idList.push(checkedResources[i]);
        		if(selectResources.indexOf(checkedResources[i])==-1){
        			selectResources.push(checkedResources[i]);
        		}
        	}
    		loadResourceDetail(selectResources);
        	$(this).parents(".panel").find(".panel-heading .icon-remove").click();
    	}else{
    		$.alert("请至少选择一个资源!");
    	}
    	
    	$("#amu_totalRes").html(selectResources.length);
    	$("#amu_noResource").html("");
    });
    
    //查询资源类型
    queryResClassifyBySql();
    
    //初始化表格数据
	loadResourceData();
});

function loadResourceData(modelId,name){
	
	var params={number:2,modelId:modelId,name:name};
	/**
	 * 子元数据
	 */
	updatePagination("admin/applyMakeUpHandler/getResourceList.json",params,100,10,
	function(data,pageIndex){
		
		$("#amu_list tbody").empty();
		var list=data.list;
		var html="";
		if(list.length>0)
		{
			for(var i=0;i<list.length;i++)
			{
				var item=list[i];
				var tr="<tr>";
				if(checkedResources.indexOf(item.id)!=-1){
					tr+="<td><input checked='checked'  id="+item.id+" type='checkbox'></td>";
				}else{
					tr+="<td><input id="+item.id+" type='checkbox'></td>";
				}
				
				tr+="<td><a  target='view_window' href='welcome/resourceInfo.html?id="+item.id+"'>"+item.name+"</a></td>"	;
				tr+="<td>"+item.mname+"</td>"	;
				tr+="<td>"+(item.theme!=undefined?item.theme:"")+"</td>"	;
				tr+="</tr>";
				html+=tr;
			}
		}
		else
		{
			html='<tr><td colspan="4" style="text-align: center;">暂无资源信息！</td></tr>'
		}
		$("#amu_list tbody").html(html);
	},"#amu_list");
}



//查询资源类型
function queryResClassifyBySql(){
	$.ajax({
		url : CTX+"/mdp/admin/applyMakeUpHandler/getResourceType.json",
	    cache : false,
	    dataType : "json",
	    type : "post",
	    data : {},
	    success : function(data){
	    	var html='';
	    	if(data.length>0){
	    		html+="<option value='' >全部</option>";
	    		for(var i=0;i<data.length;i++){
	    			var item = data[i];
	    			html+="<option value="+item.ID+">"+item.NAME+"</option>";
	    		}
	    	}else{
	    		html+="<option>暂无资源分类</option>";
	    	}
	    	$("#amu_type").append(html);
	    }
	});
}


function loadResourceDetail(idList){
	$.ajax({
		url : CTX+"/mdp/admin/applyMakeUpHandler/getResourceDetail.json",
	    cache : false,
	    dataType : "json",
	    type : "post",
	    data : {ids:idList.join(",")},
	    success : function(data){
	    	$("#amu_Catalog .widget-main:eq(0)").html("");
	    	$("#amu_Space .widget-main:eq(0)").html("");
	    	var resourceList=data.resourceList;
	    	var frequencyList=data.frequencyList;
	    	var dataElementList=data.dataElementList;
	    	for(var i=0;i<resourceList.length;i++){
	    		if(resourceList[i].mdmInfo.modelCode=="Catalog"){
	    			var html=["						<div resourceId="+resourceList[i].mdId+" resourceName="+resourceList[i].mdName+" resourceCode="+resourceList[i].mdCode+" class=\"widget-box\">",
		    		          "							<div class=\"widget-header widget-header-flat\">",
		    		          "								<h4 class=\"widget-title smaller\">"+resourceList[i].mdName+"</h4>",
		    		          "								<span class=\"col-md-offset-3\"><input type=\"radio\"",
		    		          "									name=\"amu_CaRadio"+i+" \" class='validate[funcCall[radioRequiredP]]' value='1'/>数据服务&nbsp;<input type=\"radio\" ",
		    		          "									name=\"amu_CaRadio"+i+" \" value='2' /> 数据交换（更新频率：  <font color='#FF0000'>"+frequencyList[i]+"</font> ）</span>",
		    		          "								<div class=\"widget-toolbar\">",
		    		          "									<i style=\"cursor: pointer; color: red;\"",
		    		          "										class=\"ace-icon glyphicon glyphicon-remove\"></i>",
		    		          "								</div>",
		    		          "							</div>",
		    		          "						</div>"].join("");
	    			$("#amu_Catalog .widget-main:eq(0)").append(html);
	    			$("#amu_Catalog").show();
	    			
	    			
	    			
	    		}else if(resourceList[i].mdmInfo.modelCode=="SpaceServicing"){
	    			var html=["<div resourceId="+resourceList[i].mdId+" resourceName="+resourceList[i].mdName+" resourceCode="+resourceList[i].mdCode+" class=\"widget-box\">",
	    			          "							<div class=\"widget-header widget-header-flat\">",
	    			          "								<h4 class=\"widget-title smaller\">"+resourceList[i].mdName+"</h4>",
	    			          "								<span class=\"col-md-offset-3\"> <input type=\"checkbox\"",
	    			          "									name=\"amu_SpService\" class=\"validate[funcCall[checkboxRequiredP]] \"  />空间服务&nbsp; <input type=\"checkbox\"",
	    			          "									name=\"amu_SpData\"  /> 空间数据",
	    			          "								</span>",
	    			          "								<div class=\"widget-toolbar\">",
	    			          "									<i style=\"cursor: pointer; color: red;\"",
	    			          "										class=\"ace-icon glyphicon glyphicon-remove\"></i>",
	    			          "								</div>",
	    			          "							</div>",
	    			          "							<div class=\"widget-body\" style=\"display: none;\">",
	    			          "								<div class=\"widget-main\">",
	    			          "									<div class=\"row\" style=\"margin-bottom: 10px;\">",
	    			          "										<label class=\"col-sm-2 control-label no-padding-right\"",
	    			          "											for=\"form-field-1\"> 数据范围：</label>",
	    			          "										<div class=\"col-sm-10\">",
	    			          "											<input type=\"text\"   class=\"form-control validate[funcCall[wordLimitInputLong]]\">",
	    			          "										</div>",
	    			          "									</div>",
	    			          "									<div class=\"row\">",
	    			          "										<label class=\"col-sm-2 control-label no-padding-right\"",
	    			          "											for=\"form-field-1\"> 数据格式：</label>",
	    			          "										<div class=\"col-sm-4\">",
	    			          "											<input type=\"text\"   class=\"form-control validate[funcCall[wordLimitInput]] \">",
	    			          "										</div>",
	    			          "										<label class=\"col-sm-2 control-label no-padding-right\"",
	    			          "											for=\"form-field-1\"> 更新时间：</label>",
	    			          "										<div class=\"col-sm-4\">",
	    			          "											<input type=\"text\"   class=\"form-control validate[funcCall[wordLimitInput]] \">",
	    			          "										</div>",
	    			          "									</div>",
	    			          "								</div>",
	    			          "							</div>",
	    			          "						</div>"].join("");
	    			$("#amu_Space .widget-main:eq(0)").append(html);
	    			$("#amu_Space").show();
	    		}
	    		
	    		$("#amu_Catalog").find(".red").html($("#amu_Catalog").find(".widget-box").length);
	    		$("#amu_Space").find(".red").html($("#amu_Space").find(".widget-box").length);
	    	}
	    }
	});
}


