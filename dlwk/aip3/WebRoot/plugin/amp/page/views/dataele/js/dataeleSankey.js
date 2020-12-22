$(function(){
	
	var url=ampPreUrl+"/cvpDataeleHandler/getDataeleSankeyJson?eleId="+$("#org-asset-mychart-box").attr("eleId");
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
 					}
 				});
 				chart.bind("click", function(source, target)
 				{
 					console.log(source);
 				});
 				chart.nodeBind("click", function(data)
 				{
 					if(data.dir=='left'){
 	 					$.widget.show("#res-widget");
 	 					rescourceHandler(data.id,data.name);
 					}

 				});
 				
 				chart.nodeBind("dblclick", function(data)
 						{
 					if(data.dir=='left'){
 	 					$.widget.show("#res-widget");
 	 					rescourceHandler(data.id,data.name);
 					}
 					 if($(".widget-box").hasClass("collapsed")){
 			    		$(".widget-collapse").click();
 			    	}
 				});
 				
 				
 			});
 		  }
 	 });
});


function rescourceHandler(id,name){
	resId=id;
	resName=name;
	loadRes(id,name);
	loadResGroup(id,name);
}

function loadRes(id,name){
	$("#res-widget .widget-title").html("【"+name+"】详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/themeViewHandler/findAsset";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {"assetId":id},
		success : function(data){
			var item=data;
			if(item)
			{
				$(".widget-box #resourceId").text(item.resourceid ? item.resourceid : "-");
				$(".widget-box #pubDt").text(item.pub_dt ? item.pub_dt :"-");
				$(".widget-box #assetNm").text(item.asset_name ? item.asset_name : "-");
				$(".widget-box #providerName").text(item.provider_name ? item.provider_name : "-");
				$(".widget-box #keyword").text(item.keyword ? item.keyword : "-");
				$(".widget-box #resOnline").text(item.res_online ? item.res_online : "-");
				$(".widget-box #archCateName").text(item.arch_cate_name ? item.arch_cate_name : "-");
				$(".widget-box #sbjName").text(item.sbj_name ? item.sbj_name : "-");
				$(".widget-box #pubName").text(item.pub_name ? item.pub_name : "-");
				$(".widget-box #secrName").text(item.secr_name ? item.secr_name : "-");
				$(".widget-box #subCatName").text(item.sub_cat_name ? item.sub_cat_name : "-");
				$(".widget-box #abstract").text(item.abstract ? item.abstract : "-");		
			}
		}
	});
}

function loadResGroup(id,name){
	var eleNm = $("#res-widget #searchInput").val();
	var url = ampPreUrl+"/depInfoHandler/qryEleByAsset";
	$.ajax({
		url : url,
	    cache : false,
	    dataType : "json",
	    type : "post",
	    data : {"eleName" : name, "assetId" : id},
	    success : function(data){
	    	$.app.bindTableData("#resGroup_table", data);
	    }
    });	
}

