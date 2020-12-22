function loadOrg(orgId,orgName){
	$("#org-widget .widget-title").html("【"+orgName+"】详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/orgViewHandler/qryOrgInfoById";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {"orgId":orgId},
		success : function(data) {
			var item=data;
			if(item)
			{
				$(".widget-box #org_cd").text(item.org_cd ? item.org_cd : "-");
				$(".widget-box #org_nm").text(item.org_nm ? item.org_nm : "-");
				$(".widget-box #orgtypename").text(item.orgtypename ? item.orgtypename : "-");
				$(".widget-box #orglvname").text(item.orglvname ? item.orglvname : "-");
				$(".widget-box #parentorgname").text(item.parentorgname ? item.parentorgname :"-");
				$(".widget-box #leader").text(item.leader ? item.leader :"-");
				$(".widget-box #found_date").text(item.fund_date ? item.fund_date :"-");
				$(".widget-box #org_addr").text(item.org_addr ? item.org_addr :"-");
				$(".widget-box #ctc_psn").text(item.ctc_psn ? item.ctc_psn : "-");
				$(".widget-box #org_desc").text(item.org_desc ? item.org_desc:"-");
				$(".widget-box #org_duty").text(item.org_duty ? item.org_duty :"-");
			}
		}
	});
}