function loadbusi(busiId,busiName){
	$("#busi-widget .widget-title").html("【"+busiName+"】详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/orgViewHandler/qryBusiDataById";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {"id":busiId},
		success : function(data) {
			var item=data;
			if(item)
			{
				$(".widget-box #busiCode").text(item.busi_no ? item.busi_no : "-");
				$(".widget-box #appsysId").text(item.appsys_nm ? item.appsys_nm : "-");
				$(".widget-box #appfunId").text(item.appfun_id ? item.appfun_id : "-");
				$(".widget-box #busiName").text(item.busi_nm ? item.busi_nm :"-");
				$(".widget-box #parbusiId").text(item.parentbusiname ? item.parentbusiname : "-");
				$(".widget-box #mainBody").text(item.main_body ? item.main_body : "-");
				$(".widget-box #mainbodyTyp").text(item.mainbody_typ ? item.mainbody_typ : "-");
				$(".widget-box #busiTyp").text(item.busi_typ ? item.busi_typ : "-");
				$(".widget-box #busiitemNo").text(item.busiitem_no ? item.busiitem_no : "-");
				$(".widget-box #importantname").text(item.importantname ? item.importantname : "-");
				$(".widget-box #priority").text(item.priorityname ? item.priorityname : "-");
				$(".widget-box #orgName").text(item.org_nm ? item.org_nm : "-");
				$(".widget-box #scale").text(item.scalename ? item.scalename : "-");
				$(".widget-box #complex").text(item.complexname ? item.complexname : "-");
				$(".widget-box #busiDesc").text(item.busi_desc ? item.busi_desc : "-");			
			}
		}
	});
}