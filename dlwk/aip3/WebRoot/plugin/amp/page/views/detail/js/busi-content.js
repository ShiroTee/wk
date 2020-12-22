function loadBusiContent(busiId){
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
				$(".content-box #busiCode").text(item.busi_no ? item.busi_no:"-");
				$(".content-box #appsysId").text(item.appsys_nm ? item.appsys_nm:"-");
				$(".content-box #appfunId").text(item.appfun_id ? item.appfun_id:"-");
				$(".content-box #busiName").text(item.busi_nm ? item.busi_nm:"-");
				$(".content-box #parbusiId").text(item.parentbusiname ? item.parentbusiname:"-");
				$(".content-box #mainBody").text(item.main_body ? item.main_body:"-");
				$(".content-box #mainbodyTyp").text(item.mainbody_typ ? item.mainbody_typ:"-");
				$(".content-box #busiTyp").text(item.busi_typ ? item.busi_typ:"-");
				$(".content-box #busiitemNo").text(item.busiitem_no ? item.busiitem_no:"-");
				$(".content-box #importantname").text(item.importantname ? item.importantname:"-");
				$(".content-box #priority").text(item.priorityname ? item.priorityname:"-");
				$(".content-box #orgName").text(item.org_nm ? item.org_nm:"-");
				$(".content-box #scale").text(item.scalename ? item.scalename:"-");
				$(".content-box #complex").text(item.complexname ? item.complexname:"-");
				$(".content-box #busiDesc").text(item.busi_desc ? item.busi_desc:"-");			
			}
		}
	});
}