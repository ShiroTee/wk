$(function(){
	$("#them-res #searchBtn").click(qryRightData);	
	$("#them-res #searchInput").bind('keypress', function(event) {
		if (event.keyCode == "13") {
			qryRightData();
		}
	});
});

function loadAll(id,name){
	$("#them-res #resourceId").text("");
	$("#them-res #pubDt").text("");
	$("#them-res #assetNm").text("");
	$("#them-res #providerName").text("");
	$("#them-res #keyword").text("");
	$("#them-res #resOnline").text("");
	$("#them-res #archCateName").text("");
	$("#them-res #sbjName").text("");
	$("#them-res #pubName").text("");
	$("#them-res #secrName").text("");
	$("#them-res #subCatName").text("");
	$("#them-res #abstract").text("");
	$("#them-res #id").val(id);
	$("#them-res #name").val(name);
	qryLeftres();
	qryRightData();
}

function qryLeftres(){
	var id = $("#them-res #id").val();
	var name = $("#them-res #name").val();
	$("#them-res #widget-title").html("【"+name+"】详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/themeViewHandler/findAsset";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {assetId:id},
		success : function(data){
			var item=data;
			if(item)
			{
				$("#them-res #resourceId").text(item.resourceid ? item.resourceid : "-");
				$("#them-res #pubDt").text(item.pub_dt ? item.pub_dt : "-");
				$("#them-res #assetNm").text(item.asset_name ? item.asset_name : "-");
				$("#them-res #providerName").text(item.provider_name ? item.provider_name : "-");
				$("#them-res #keyword").text(item.keyword ? item.keyword : "-");
				$("#them-res #resOnline").text(item.res_online ? item.res_online : "-");
				$("#them-res #archCateName").text(item.arch_cate_name ? item.arch_cate_name : "-");
				$("#them-res #sbjName").text(item.sbj_name ? item.sbj_name : "-");
				$("#them-res #pubName").text(item.pub_name ? item.pub_name : "-");
				$("#them-res #secrName").text(item.secr_name ? item.secr_name : "-");
				$("#them-res #subCatName").text(item.sub_cat_name ? item.sub_cat_name : "-");
				$("#them-res #abstract").text(item.abstract ? item.abstract : "-");		
			}
		}
	});
}

function qryRightData(){
	var id = $("#them-res #id").val();
	var eleNm = $("#them-res #searchInput").val();
	var url = ampPreUrl+"/depInfoHandler/qryEleByAsset";
	$.ajax({
		url : url,
	    cache : false,
	    dataType : "json",
	    type : "post",
	    data : {eleName : eleNm, assetId : id},
	    success : function(data){
	    	$.app.bindTableData("#them-res #resGroup_table", data);
	    }
    });	
}

//function subStringHandler(field,data){
//	if(data[field].length>6){		
//		return data[field].substring(0,6)+"...";
//	}else{
//		return data[field];
//	}
//}