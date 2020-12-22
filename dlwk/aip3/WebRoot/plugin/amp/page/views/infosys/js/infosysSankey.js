var selectAssetId="";
$(function(){
	$.widget.hide("#sys-widget");
	$.widget.hide("#them-res");
	$(".widget-header-flat").hide();
	$("#them-res #searchBtn").click(function(){
		findGroup(selectAssetId,$('#them-res #searchInput').val());
	});
	$('#them-res #searchInput').bind('keypress',function(event){
	     if(event.keyCode == "13"){
	    	 findGroup(selectAssetId,$('#them-res #searchInput').val())
	     }
	});
	
	var url=ampPreUrl+"/cvpInfoSysHandler/getInfoSysSankeyJson?id="+$("#org-asset-mychart-box").attr("orgid");
 	 $.ajax({
 		  url: url, cache: false, dataType:"json",type:"post",
 		  success: function(data){
 			jsPlumb.ready(function()
 			{
 				var chart = new SkyChart(
 				{
 					el : "org-asset-mychart-box",
 					data : data,
 					width:210,
 					lineStyle :
 					{
 						color : "green",
 						lineWidth:1
 					},
 					label:"信息系统"

 				});
 				chart.bind("click", function(source, target)
 				{
 				});
 				
 				var timeId;
 				
 				chart.nodeBind("click", function(data)
 				{
 					
 					clearTimeout(timeId);
 					timeId = setTimeout(function() {
 						if(data.dir=='left'||data.dir=='right'){
 	 						$("#them-res .widget-title").html("【"+data.name+"】信息资源详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
 	 						$.widget.hide("#sys-widget");
 	 	 					$.widget.show("#them-res");
 	 	 					selectAssetId=data.id;
 	 	 					loadAll(data.id,data.name);
 	 					}
 						else{
 	 						$.widget.hide("#them-res");
 	 						$.widget.show("#sys-widget");
 	 						loadSys(data.id,data.name);
 	 					}				
 					}, 300);
 					

 				});
 				
 				chart.nodeBind("dblclick", function(data)
 						{
 					console.log(data);
 					clearTimeout(timeId);
 					if(data.dir=='left'||data.dir=='right'){
 						$("#them-res .widget-title").html("【"+data.name+"】信息资源详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
 						$.widget.hide("#sys-widget");
 	 					$.widget.show("#them-res");
 	 					selectAssetId=data.id;
 	 					loadAll(data.id,data.name);
 	 					if($("#them-res .widget-box").hasClass("collapsed")){
 	 			    		$("#them-res .widget-collapse").click()
 	 			    	}
 					}
 					else{
 						$.widget.hide("#them-res");
 						$.widget.show("#sys-widget");
 						loadSys(data.id,data.name);
 	 					if($("#sys-widget .widget-box").hasClass("collapsed")){
 	 			    		$("#sys-widget .widget-collapse").click();
 	 			    	}
 					}

 				});
 			});
 		  }
 	 });
 	 
 	 
 	//资源组成
 	function findGroup(id,name){
 		var url = ampPreUrl+"/depInfoHandler/qryEleByAsset";
 		$.ajax({
 			url : url,
 			cache : false,
 			dataType : "json",
 			type : "post",
 			data : {assetId : id,eleName : name},
 			success : function(data){
 				$.util.bindTableData("#resGroup_table", data);
 			}
 		});
 	}
 	
 	//资源描述
 	function findDescribe(id){
 		var url = ampPreUrl+"/themeViewHandler/findAsset";
 		$.ajax({
 			url : url,
 			cache : false,
 			dataType : "json",
 			type : "post",
 			data : {assetId : id},
 			success : function(data){
 				var item = data
 				$(".widget-main #resourceId").val(item.resourceid ? item.resourceid:"");
 				$(".widget-main #pubDt").val(item.pub_dt ? item.pub_dt : "");
 				$(".widget-main #assetNm").val(item.name ? item.name : "");
 				$(".widget-main #providerName").val(item.provider_name ? item.provider_name:"");
 				$(".widget-main #keyword").val(item.keyword ? item.keyword:"");
 				$(".widget-main #resOnline").val(item.res_online ? item.res_online:"");
 				$(".widget-main #archCateName").val(item.arch_cate_name ? item.arch_cate_name:"");
 				$(".widget-main #sbjName").val(item.sbj_name ? item.sbj_name:"");
 				$(".widget-main #pubName").val(item.pub_name ? item.pub_name:"");
 				$(".widget-main #secrName").val(item.secr_name ? item.secr_name:"");
 				$(".widget-main #subCatName").val(item.sub_cat_name ? item.sub_cat_name:"");
 				$(".widget-main #abstract").val(item.abstract ? item.abstract:"");
 			}
 		});
 	}
 	 
});



