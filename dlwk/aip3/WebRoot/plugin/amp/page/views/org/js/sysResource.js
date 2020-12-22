$(function(){
	selecDbHandler();
	selectStatusHandler();

$("#searchSys").click(qryResSysHandler);
$("#sysName").bind('keypress',function(event){
     if(event.keyCode == "13"){ qryResSysHandler();}
});
	
$('#sysRes_table').delegate("tr","click",findIdHandler);//单击事件
});

function sysDataHandler(name,id){
	$("#sysResource #appsysNo").text("");
	$("#sysResource #appsysNm").text("");
	$("#sysResource #midwareSys").text("");
	$("#sysResource #sysAbbr").text("");
	$("#sysResource #developer").text("");
	$("#sysResource #devArch").text("");
	$("#sysResource #belongTo").text("");
	$("#sysResource #sysOwnerDep").text("");
	$("#sysResource #devYear").text("");
	$("#sysResource #appMode").text("");
	$("#sysResource #dbName").text("");
	$("#sysResource #status").text("");
	$("#sysResource #dataAmt").text("");
	$("#sysResource #orgnames").text("");
	$("#sysResource #appsysDesc").text("");	
	$("#sysResource #name").val(name);
	$("#sysResource #id").val(id);
}

//查询列表
function qryResSysHandler(){
	var id = $("#sysResource #id").val();
	var orgName = $("#sysResource #name").val();
	$("#sysResource .widget-title").html("【"+orgName+"】信息系统详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var url = ampPreUrl+"/orgViewHandler/qryOrgOwnAppSys";
	var name = $("#sysName").val();
	var dataBase = $("#dataBase").val();
	var developer =$("#developers").val();
	var status = $("#statuss").val();
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data :{orgId : id,sysName : name,developer : developer,dbId :dataBase,status:status},
		success : function(data){	
			if(data.length>0){
				$.util.bindTableData("#sysRes_table", data);
				$("#sysRes_table tbody tr:eq(0)").addClass("on").siblings("tr").removeClass("on");
				findInfoHandler(data[0].id);
			}
				
		}
	});
}

//数据库下拉框
function selecDbHandler(){
	var url = ampPreUrl+"/orgViewHandler/qryDictTableData";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {table : "DICT_DBMS_TYP"},
		success : function(data){
			var html = "";
			html += " <option value=''>请选择</option>";
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
	            
				html += " <option value='" + item.typ_cd + "'>"
						+ item.typ_nm + "</option>";
			}
			
			$("#dataBase").html(html);
		}
	});
}

//状态下拉框
function selectStatusHandler(){
	var url = ampPreUrl+"/orgViewHandler/qryDictTableData";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {table : "DICT_STATUS"},
		success : function(data){
			var html = "";
			    html += " <option value=''>请选择</option>";
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
	            
				html += " <option value='" + item.typ_cd + "'>"
						+ item.typ_nm + "</option>";
			}			
			$("#statuss").html(html);
		}
	});
}

//响应单击事件
function findIdHandler(){
	$(this).addClass("on").siblings("tr").removeClass("on");
	var data=$(this).data("data");
	findInfoHandler(data.id);
}

function findInfoHandler(id){
	var url = ampPreUrl+"/orgViewHandler/qrySysDetailById";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {id : id},
		success : function(data){
			var item = data;
			$("#sysResource #appsysNo").text(item.appsys_no ? item.appsys_no : "-");
			$("#sysResource #appsysNm").text(item.appsys_nm ? item.appsys_nm :"-");
			$("#sysResource #midwareSys").text(item.midware_sys ? item.midware_sys :"-");
			$("#sysResource #sysAbbr").text(item.sys_abbr ? item.sys_abbr :"-");
			$("#sysResource #developer").text(item.developer ? item.developer :"-");
			$("#sysResource #devArch").text(item.dev_arch ? item.dev_arch :"-");
			$("#sysResource #belongTo").text(item.belong_to ? item.belong_to:"-");
			$("#sysResource #sysOwnerDep").text(item.sysOwnerDep ? item.sysOwnerDep :"-");
			$("#sysResource #devYear").text(item.dev_year ? item.dev_year :"-");
			$("#sysResource #appMode").text(item.appmode ? item.appmode:"-");
			$("#sysResource #dbName").text(item.dbname ? item.dbname :"-");
			$("#sysResource #status").text(item.statusname ? item.statusname :"-");
			$("#sysResource #dataAmt").text(item.data_amt ? item.data_amt :"-");
			$("#sysResource #orgnames").text(item.orgnames ? item.orgnames:"-");
			$("#sysResource #appsysDesc").text(item.appsys_desc ? item.appsys_desc:"-");	
		}
	});
}

//设置关联资源
function herfHandler(field,data){
	if(data[field] == 0){		
		return data[field];
	}else{
		return "<a style='cursor: pointer' onclick='findLink(\""+data.id+"\")'>"+data[field]+"</a>";
		
	}
}
//查找关联资源
function findLink(id){
	var url=ampPreUrl+"/cvpInfoSysHandler/indexSankey?id="+id;
	window.location.href=url;
}