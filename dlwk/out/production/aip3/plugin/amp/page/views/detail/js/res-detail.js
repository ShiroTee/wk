$(function(){
	$("#searchBtn").click(loadResGroup);
	$("#searchInput").bind('keypress', function(event) {
		if (event.keyCode == "13") {
			loadResGroup();
		}
	});
});

var resId="",resName="";
function rescourceHandler(id,name){
	$(".widget-box #resourceId").text("");
	$(".widget-box #pubDt").text("");
	$(".widget-box #assetNm").text("");
	$(".widget-box #providerName").text("");
	$(".widget-box #keyword").text("");
	$(".widget-box #resOnline").text("");
	$(".widget-box #archCateName").text("");
	$(".widget-box #sbjName").text("");
	$(".widget-box #pubName").text("");
	$(".widget-box #secrName").text("");
	$(".widget-box #subCatName").text("");
	$(".widget-box #abstract").text("");
	resId=id;
	resName=name;
	loadRes();
	loadResGroup();
}

function loadRes(){
	$("#res-widget .widget-title").html("【"+resName+"】详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/themeViewHandler/findAsset";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {"assetId":resId},
		success : function(data){
			var item=data;
			if(item)
			{
				$(".widget-box #resourceId").text(item.resourceid ? item.resourceid : "-");
				$(".widget-box #pubDt").text(item.pub_dt ? item.pub_dt : "-");
				$(".widget-box #assetNm").text(item.asset_name ? item.asset_name : "-");
				$(".widget-box #providerName").text(item.provider_name ? item.provider_name : "-");
				$(".widget-box #keyword").text(item.keyword ? item.keyword :"-");
				$(".widget-box #resOnline").text(item.res_online ? item.res_online : "-");
				$(".widget-box #archCateName").text(item.arch_cate_name ? item.arch_cate_name : "-");
				$(".widget-box #sbjName").text(item.sbj_name ? item.sbj_name :"-");
				$(".widget-box #pubName").text(item.pub_name ? item.pub_name: "-");
				$(".widget-box #secrName").text(item.secr_name ? item.secr_name : "-");
				$(".widget-box #subCatName").text(item.sub_cat_name ? item.sub_cat_name : "-");
				$(".widget-box #abstract").text(item.abstract ? item.abstract :"-");		
			}
		}
	});
}

function loadResGroup(){
	var eleNm = $("#res-widget #searchInput").val();
	var url = ampPreUrl+"/depInfoHandler/qryEleByAsset";
	$.ajax({
		url : url,
	    cache : false,
	    dataType : "json",
	    type : "post",
	    data : {"eleName" : eleNm, "assetId" : resId},
	    success : function(data){
	    	$.app.bindTableData("#resGroup_table", data);
	    }
    });	
}