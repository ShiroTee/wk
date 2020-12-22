$(function(){
	qryDataType();
	
	$("#metadata #searchBtn").click(searchHandler);
	$('#metadata #dataName').bind('keypress',function(event){
	     if(event.keyCode == "13"){ searchHandler()}
	});
});

function dataHandler(orgName,id){
	$("#metadata #name").val(orgName);
	$("#metadata #id").val(id);
}

//查询列表
function searchHandler(){
	var id = $("#id").val();
	var orgName = $("#name").val();
	$("#metadata .widget-title").html("【"+orgName+"】数据元详情<span style=\"color:#FDFAAF\">（双击查看）</span>");
	var dataType = $("#dataType").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var dataName = $("#dataName").val();
	
	var url = ampPreUrl+"/orgViewHandler/qryEleDataByOrgId";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {orgId : id,eleName : dataName, eleDataType : dataType, startDate : startTime,endDate : endTime},
		success : function(data){
			$.app.bindTableData("#medata_table", data);
		}
	});
}

//显示下拉框
function qryDataType(){		
	var url = ampPreUrl+"/orgViewHandler/qryDictTableData";
	$.ajax({
		url : url,
		cache : false,
		dataType : "json",
		type : "post",
		data : {table : "dict_dataele_typ"},
		success : function(data){
			var html = "";
			html += " <option value=''>请选择</option>";
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
	            
				html += " <option value='" + item.typ_cd + "'>"
						+ item.typ_nm + "</option>";
			}
			
			$("#dataType").html(html);
		}
	});
}

//设置关联资源
function buttonHandler(field,data){
	console.log(123);
	if(data[field] == 0){		
		return data[field];
	}else{
		return "<a style='cursor: pointer' onClick='findLinkData(\""+data.ele_id+"\")'>"+data[field]+"</a>";
	}
}

//查找关联资源
function findLinkData(id){
	$.app.openFullScreen(ampPreUrl+"/cvpDataeleHandler/indexSankey?eleId="+id);
}