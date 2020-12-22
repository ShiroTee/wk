function qryOfficeInfo(id){
	var url = ampPreUrl+"/orgViewHandler/qryOrgInfoById";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {orgId : id},
		success : function(data){
			var item = data;
			$(".content-box #org_cd").text(item.org_cd ? item.org_cd:"-");
			$(".content-box #org_nm").text(item.org_nm ? item.org_nm : "-");
			$(".content-box #orgtypename").text(item.orgtypename ? item.orgtypename : "-");
			$(".content-box #orglvname").text(item.orglvname ? item.orglvname:"-");
			$("#parentorgname").text(item.parentorgname ? item.parentorgname:"-");
			$("#leader").text(item.leader ? item.leader:"-");
			$("#found_date").text(item.found_date ? item.found_date:"-");
			$("#org_addr").text(item.org_addr ? item.org_addr : "-");
			$("#ctc_psn").text(item.ctc_psn ? item.ctc_psn :"-");
			$("#org_desc").text(item.org_desc ?　item.org_desc:"-");
			$("#org_duty").text(item.org_duty ? item.org_duty:"-");
		}
	});
}