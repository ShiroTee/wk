$(function(){
	$('#officeTable').delegate("tr","click",findInfo);
});

function qryOffice(name,data,url){
	$(".content-box #org_cd").text("");
	$(".content-box #org_nm").text("");
	$(".content-box #orgtypename").text("");
	$(".content-box #orglvname").text("");
	$("#parentorgname").text("");
	$("#leader").text("");
	$("#found_date").text("");
	$("#org_addr").text("");
	$("#ctc_psn").text("");
	$("#org_desc").text("");
	$("#org_duty").text("");
	$("#orgOffice-widget .widget-title").html("【"+name+"】组织机构详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	if(!url) url = ampPreUrl+"/orgViewHandler/qryOrgOwnOffice";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : data,
		success : function(data){
			if(data.length>0){
				$.util.bindTableData("#officeTable", data);
				$("#officeTable tbody tr:eq(0)").addClass("on").siblings("tr").removeClass("on");
				qryOfficeInfo(data[0].id);
			}
			
		}
	});
	
}

function findInfo(){
	$(this).addClass("on").siblings("tr").removeClass("on");
	var data=$(this).data("data");
	qryOfficeInfo(data.id);
}