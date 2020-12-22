function loadSys(sysId,sysName){
	console.log(123);
	$("#sys-widget .widget-title").html("【"+sysName+"】详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/orgViewHandler/qrySysDetailById";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {"id":sysId},
		success : function(data){
			var item=data;
			if(item)
			{
				$(".widget-box #appsysNo").text(item.appsys_no ? item.appsys_no : "-");
				$(".widget-box #appsysNm").text(item.appsys_nm ? item.appsys_nm : "-");
				$(".widget-box #midwareSys").text(item.midware_sys ? item.midware_sys : "-");
				$(".widget-box #sysAbbr").text(item.sys_abbr ? item.sys_abbr : "-");
				$(".widget-box #developer").text(item.developer ? item.developer : "-");
				$(".widget-box #devArch").text(item.dev_arch ? item.dev_arch : "-");
				$(".widget-box #belongTo").text(item.belong_to ? item.belong_to : "-");
				$(".widget-box #sysOwnerDep").text(item.sysOwnerDep ? item.sysOwnerDep : "-");
				$(".widget-box #devYear").text(item.dev_year ? item.dev_year : "-");
				$(".widget-box #appMode").text(item.appmode ? item.appmode : "-");
				$(".widget-box #dbName").text(item.dbname ? item.dbname : "-");
				$(".widget-box #status").text(item.statusname ? item.statusname : "-");
				$(".widget-box #dataAmt").text(item.data_amt ? item.data_amt : "-");
				$(".widget-box #orgnames").text(item.orgnames ? item.orgnames : "-");
				$(".widget-box #appsysDesc").text(item.appsys_desc ? item.appsys_desc : "-");			
			}
		}
	});
}