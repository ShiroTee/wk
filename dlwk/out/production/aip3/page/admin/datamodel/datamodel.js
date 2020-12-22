var allid;
var dataop;
var pageIndex = 0;
var pageSize = 15;
var totalc = 0;
var pagecount = 0;
var currentpage = 1;
var selecttaskinput;
$(document).ready(function() {
	
	dataop = Data_OP();
	$("#data_add").on("click", function() {
		dataop.enter_add();
	});
	$(".data_back").on("click", function() {
		dataop.enter_list();
	});
	$("#add_api").on("click", function() {
		dataop.addApi();
	});
	$("#add_api2").on("click", function() {
		dataop.addApi2();
	});
	$("#search_api").on("keyup", function() {
		dataop.searchApi($(this).val());
	});
	$("#model_name").on("keyup", function() {
		$("#model_id").val( "" );
		dataop.searchWebList($(this).val());
	});
	$("#querybutton").on("click", function() {
		pageIndex = 0;
		totalc = 0;
		pagecount = 0;
		currentpage = 1;
		searchModes();
	});
	$("#paggingId > li").on("click", function() {
		if (!$(this).hasClass("disabled")) {
			if ($(this).attr("id") == "apinext") {
				pageIndex++;
			} else if ($(this).attr("id") == "apiprev") {
				pageIndex--
			} else if ($(this).attr("id") == "apifirst") {
				pageIndex = 0;
			} else if ($(this).attr("id") == "apilast") {
				pageIndex = pagecount - 1;
			}
			currentpage = pageIndex + 1;
			searchModes();
		}
	});
	$("#data_edit").on("click", function() {
		$("#web_select_items").html("");
		 
		$(".taskselect").html("");
	});
	$(document).on("click",".model_publish",function(){
		var pubdom = $(this);
		$.ajax({
			url : ctx + "/mdp/admin/datamodel/publish.json",
			type : 'POST',
			data : {
				modelid : $(this).attr("dataid"),
				publish : $(this).attr("datavalue"),
				webid   : $(this).attr("webid")
			},
			success : function(d) {
				console.log($(pubdom).parent().parent().find("input[type=checkbox]").attr("publish"));
				 if(d){
					 var pubid = $(pubdom).attr("dataid");
					 if( $(pubdom).attr("datavalue") == "1"){
						 $(pubdom).parent().parent().find("input[type=checkbox]").attr("publish","1");
						 $(pubdom).attr("datavalue","0");
						 $(pubdom).html("取消发布")
						 $("span[dataid="+pubid+"]").html("已发布");
						 $("span[dataid="+pubid+"]").removeClass("text-danger");
						 $("span[dataid="+pubid+"]").addClass("text-success");
					 }else{
						 $(pubdom).attr("datavalue","1");
						 $(pubdom).parent().parent().find("input[type=checkbox]").attr("publish","0");
						 $(pubdom).html("发布")
						 $("span[dataid="+pubid+"]").html("未发布");
						 $("span[dataid="+pubid+"]").removeClass("text-success");
						 $("span[dataid="+pubid+"]").addClass("text-danger");
					 }
					
				 }else{
					 alert("操作失败!");
				 }
			}
		});
	});
	searchModes();
});

function updatemodel() {
	var id = $(".selectcheckbox[checked=checked]").val();
	if (id != undefined) {
		$.ajax({
			url : ctx + "/mdp/admin/datamodel/searchmodelList.json",
			type : 'POST',
			data : {
				id : id
			},
			success : function(d) {
				dataop.enter_edit(d);
			}
		});
	}

}

function deleteModel() {
	var id = $(".selectcheckbox[checked=checked]").val();
	var publish =  $(".selectcheckbox[checked=checked]").attr("publish");
	if (id != undefined) {
		if(publish=="1"){
			$("#resultcontent").html("请先取消发布，再删除!");
			$('#opresult').modal('show');
		}else{
			   $("#confirmdelid").attr("optype","1");
			   $("#deletecontent").html("确认删除数据模型吗?");
			   $('#opdelete').modal('show');
		}

	}
}

function confirmDel(){
	//alert($("#confirmdelid").attr("optype"));
	if($("#confirmdelid").attr("optype") == "1"){
		var id = $(".selectcheckbox[checked=checked]").val();
		if (id != undefined) {
			$.ajax({
				url : ctx + "/mdp/admin/datamodel/deletemodel.json",
				type : 'POST',
				data : {
					id : id
				},
				success : function(d) {
					$('#opdelete').modal('hide');
					dataop.enter_list();
				}
			});
		} 
	}else if($("#confirmdelid").attr("optype") == "2"){
		$(deleteobj).parent().parent().parent().remove();
		showtopbutton();
		$('#opdelete').modal('hide');
	}
}


function showtopbutton(){
    if( $(window).height()  >  $("#bottombutton").offset().top+50 ){
    	$("#topbutton").hide();
    }else{
    	$("#topbutton").show();
    }
	 
}
function selectcheckbox(obj) {
	if ($(obj).attr("checked") == "checked") {
		$(obj).removeAttr("checked");
	} else {
		$(obj).attr("checked", "checked");
		$(obj).parent().parent().nextAll('tr').find("input").removeAttr(
				"checked");
		$(obj).parent().parent().prevAll('tr').find("input").removeAttr(
				"checked");
	}
}
function searchModes() {
	$("#web_select_items").html("");
	var params = {
		name : $("#searchmodeName").val(),
		pageIndex : pageIndex,
		pageSize : pageSize
	};
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/searchAll.json",
		type : 'POST',
		data : params,
		success : function(d) {
			console.log(d);
			totalc = d.count;
			$("#modellist").html($("#modeltemp").render(d));
			pagecount = parseInt((totalc + pageSize - 1) / pageSize);

			changepagebtn(pagecount)
			changepageinfo();
		}
	});
	var changepageinfo = function() {
		if (pagecount > 0) {
			$("#pageinfo").html(
					"总共 " + totalc + " 条记录,共 " + pagecount + " 页,当前第 【"
							+ (pageIndex + 1) + "】 页");
		} else {
			$("#pageinfo").html("");
		}
	}
	var changepagebtn = function(pagecount) {
		if (pagecount == undefined)
			return false;

		if (totalc == 0) {
			$("#apinext").addClass("disabled");
			$("#apilast").addClass("disabled");
			$("#apifirst").addClass("disabled");
			$("#apiprev").addClass("disabled");
			return false;
		} else {
			if (currentpage == 1 && currentpage == pagecount) {
				$("#apinext").addClass("disabled");
				$("#apilast").addClass("disabled");
				$("#apifirst").addClass("disabled");
				$("#apiprev").addClass("disabled");
			} else if (currentpage == 1 && pagecount > 1) {
				$("#apifirst").addClass("disabled");
				$("#apiprev").addClass("disabled");
				$("#apinext").removeClass("disabled");
				$("#apilast").removeClass("disabled");
			} else if (currentpage == pagecount && currentpage > 1) {
				$("#apifirst").removeClass("disabled");
				$("#apiprev").removeClass("disabled");
				$("#apinext").addClass("disabled");
				$("#apilast").addClass("disabled");
			} else if (currentpage > 1 && currentpage < pagecount) {
				$("#apifirst").removeClass("disabled");
				$("#apiprev").removeClass("disabled");
				$("#apinext").removeClass("disabled");
				$("#apilast").removeClass("disabled");
			}
		}

	}
	changepagebtn();
}

function api_hide(api) {
	$(api).parent().parent().next().toggle(500);
}

function Data_OP() {
	$("#data_edit").hide();

	this.enter_add = function() {
		$("#data_show").hide();
		$("#data_edit").show();
		$("#api_panel").html("");
		$("#model_name").val("");
		$("#model_code").val("");
		allid = null;
		if(checknull( "#model_code" )){
			$("#model_code" ).val("MODEL"+RndNum(2));
		}
		$("#model_code").removeAttr("readonly" );
		showtopbutton();
	}
	this.enter_list = function() {
		$("#data_show").show();
		$("#data_edit").hide();
		$("#searchmodeName").val("");
		pageIndex = 0;
		totalc = 0;
		pagecount = 0;
		currentpage = 1;
		searchModes();
	}
	this.addApi = function() {
		$("#web_select_items").html("");
		$("#modal_header").html("添加服务");
		$("#search_api").val("");
		$("#apiselect").html("");
		$('#infoid').modal('show');
		
	}
	this.addApi2 = function() {
		if (checknull("#search_api")) {
			return false;
		}
		//
		var apiid = $("#select_value").val();
		if (apiid == "") {
			var apiname = $("#search_api").val();
			$('#infoid').modal('hide');
			RenderAppend("#api_panel", ".api_render", {
				name : apiname
			});
			showtopbutton();
		} else {
			$.ajax({
				url : ctx + "/mdp/admin/datamodel/searchAPI.json",
				type : 'POST',
				data : {
					apiid : apiid
				},
				success : function(d) {
					var apiname = $("#search_api").val();
					$('#infoid').modal('hide');
					RenderAppend("#api_panel", ".api_render", {
						name : apiname,
						dbname : d.db,
						tables : d.sql
					});
					
					showtopbutton();
				}
			});
		}
	}

	this.checknull = function(selector) {
		if ($(selector).length == 0) {
			return true;
		}
		if ($(selector).val().replace(/\s*/g, "") == "") {
			$(selector).val("");
			$(selector).focus();
			return true;
		} else {
			return false;
		}
	}

	this.checkdomnullvalue = function(selector, value) {
		if (value == undefined || value == "") {
			$(selector).val("");
			$(selector).focus();
			return true;
		}
		if ($(selector).val().replace(/\s*/g, "") == "") {
			$(selector).val("");
			$(selector).focus();
			return true;
		} else {
			return false;
		}
	}

	searchtasknames=function(obj){
		$.ajax({
			url : ctx + "/mdp/admin/datamodel/gettasknames.json",
			type : 'POST',
			data : {
				taskname : $(obj).val()
			},
			success : function(d) {
				selecttaskinput =$(obj);
				if (d.length == 0) {
					$(".taskselect").html("");
				} else {
					var tasks = {
						datas : d
					}
					RenderHtml($(obj).next(), "#task_select_render", tasks);
				}
			}
		});
	}
	
	this.searchApi = function(searchname) {

		$.ajax({
			url : ctx + "/mdp/admin/datamodel/searchAPIList.json",
			type : 'POST',
			data : {
				searchapi : searchname
			},
			success : function(d) {

				if (d.length == 0) {
					$("#select_value").val("");
					$("#apiselect").html("");
				} else {
					var apis = {
						datas : d
					}
					RenderHtml("#apiselect", ".api_select_render", apis);
				}
			}
		});
	}
	this.searchWebList = function(webname) {
		$
				.ajax({
					url : ctx + "/mdp/admin/datamodel/searchWebList.json",
					type : 'POST',
					data : {
						webname : webname
					},
					success : function(d) {
						if (d == null || d.length == 0) {
							// $("#web_select_items").val("");
							$("#web_select_items").html("");
						} else {

							var apis = {
								datas : d
							}
							RenderHtml("#web_select_items",
									".web_select_render", apis);
						}
					}
				});
	}
	enter_edit = function(d) {
		$("#data_show").hide();
		$("#data_edit").show();
		$("#api_panel").html("");
		$("#model_name").val("");
		$("#model_code").val("");
		$("#model_name").val(d[0].MODEL_NAME);
		$("#model_code").val(d[0].MODEL_CODE);
		$("#model_id").val(d[0].WEBAPPID);
		$("#publishid").val(d[0].PUBLISH);
		allid = d[0].ID;
		 
		for (var i = 0; i < d.length; i++) {
			RenderAppend("#api_panel", ".api_render", {
				name : d[i].SERVICE_NAMES,
				dbname : d[i].SERVICE_DB,
				tables : d[i].SERVICE_TABLES,
				taskname : d[i].TASKSCHEDULE_NAME,
				proname : d[i].PROCEDURE_NAMES,
				prodb : d[i].PROCEDURE_DB,
				protables : d[i].PROCEDURE_TABLES,
				tssetl : d[i].TSSETL,
				tssapi : d[i].TSSAPI
			});
		}
		if(allid != null){
			$("#model_code").attr("readonly","readonly");
		}else{
			
		}
		showtopbutton();
	}
	return this;
}
function addvaluetoinput(obj) {

	$("#select_value").val($(obj).attr("value"));
	$("#search_api").val($(obj).text());
	$("#apiselect").html("");
}

function addvaluetotask(obj){
	// plsql  kettle api  oracle
	var id =  $(obj).attr("value");
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/gettaskbyid.json",
		type : 'POST',
		data : {
			taskid : id
		},
		success : function(d) {
			selecttaskinput.val( $(obj).text() );
			selecttaskinput.parent().parent().nextAll().remove();
			if(d.servicetype=="plsql"){
				selecttaskinput.parent().parent().after($("#tss_db").render(d));
			}else if(d.servicetype=="kettle"){
				selecttaskinput.parent().parent().after($("#tss_etl").render(d));
			}else if(d.servicetype=="api"){
				selecttaskinput.parent().parent().after($("#tss_api").render(d));
			}
		}
	});
	$(obj).parent().parent().html("");
}
function save_model() {
	$("#web_select_items").html("");
	var models = [];
	if (checkdomnullvalue($("#model_name"), $("#model_name").val()))
		return false;
	if (checkdomnullvalue($("#model_code"), $("#model_code").val()))
		return false;
	var inputFlag = true;
	if ($("#api_panel>div").length == 0) {
		dataop.addApi();
		return false;
	}
	$("#api_panel>div").each(
			function() {
				if (inputFlag) {
					var model = {};
					model.id = allid;
					model.model_name = $("#model_name").val();
					model.model_id = $("#model_id").val();
					model.publish=$("#publishid").val();
					
					model.webappid = $("#webappid").val();
					console.log("webappid:"+model.webappid);
					
					model.model_code = $("#model_code").val();
					model.service_names = $(this).find("[apiname]").attr(
							"value");
					model.service_db = $(this).find("[apidb]").val();
					var srvtables = $(this).find("[apitables]").val().replace(/\；/g,";");
					 $(this).find("[apitables]").val(srvtables);
					model.service_tables = srvtables;
					model.taskschedule_name = $(this).find("[taskname]").val();
					
					if( !checknull($("[apidb]")) &&  checknull($("[apitables]")) ){
						inputFlag =false;
					}
					
					if( $(this).find("[protables]").length>0 ){
						if( !checknull($(this).find("[proname]")) &&  checknull($(this).find("[taskname]")) ){
							inputFlag =false;
						}
						
						if( !checknull($(this).find("[proname]")) &&  checknull($(this).find("[protables]")) ){
							inputFlag =false;
						}
						
						model.procedure_names = $(this).find("[proname]").val();
						
						if( !checknull($(this).find("[protables]")) &&  checknull($(this).find("[prodb]")) ){
							inputFlag =false;
						}
						
						if( !checknull($(this).find("[prodb]")) &&  checknull($(this).find("[protables]")) ){
							inputFlag =false;
						}
						if( !checknull($(this).find("[taskname]")) &&  checknull($(this).find("[proname]")) ){
							inputFlag =false;
						}
						
						var prctables = $(this).find("[protables]").val().replace(/\；/g,";");
						$(this).find("[protables]").val(prctables);
						model.procedure_tables = prctables  ;
						model.procedure_db = $(this).find("[prodb]").val();
						if( !checknull($(this).find("[prodb]")) &&  checknull($(this).find("[proname]")) ){
							inputFlag =false;
						}
						
						if (checkdomnullvalue($(this).find("[apidb]"), $(this)
								.find("[apidb]").val()))
							inputFlag = false;
						if (checkdomnullvalue($(this).find("[apitables]"), $(this)
								.find("[apitables]").val()))
							inputFlag = false;
					}
					model.tssapi = $(this).find("[tssapi]").val();
					model.tssetl = $(this).find("[tssetl]").val();
					models.push(model);
					
				}

			});
 
	if (!inputFlag)
		return false;
	var parameter = JSON.stringify(models);
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/savemodel.json",
		type : 'POST',
		data : {
			model : parameter
		},
		success : function(d) {
			if(d.error){
				$("#resultcontent").html(d.error_msg);
				$('#opresult').modal('show');
				return false;
			}
			allid = d[0];
			//$('#opcontent').html('<h2>保存成功</h2>');
			$("#resultcontent").html("保存成功");
			$('#opresult').modal('show');
		}
	});
}

function delete_api(obj) {
	deleteobj = obj;
	$("#confirmdelid").attr("optype","2");
	 $("#deletecontent").html("确认删除服务配置吗?");
	$('#opdelete').modal('show');
}

function RenderAfter(target, selector, data) {
	$("#scriptrender").remove();
	$("body").append(
			'<script id="scriptrender" type="text/x-jsrender"></script>');
	$("#scriptrender").html($(selector).html());
	$(target).after($("#scriptrender").render(data));
}

function RenderAppend(target, selector, data) {
	$("#scriptrender").remove();
	$("body").append(
			'<script id="scriptrender" type="text/x-jsrender"></script>');
	$("#scriptrender").html($(selector).html());
	$(target).append($("#scriptrender").render(data));
}
function RenderHtml(target, selector, data) {
	$("#scriptrender").remove();
	$("body").append(
			'<script id="scriptrender" type="text/x-jsrender"></script>');
	$("#scriptrender").html($(selector).html());
	$(target).html($("#scriptrender").render(data));
}

function RndNum(n) {
	var rnd = "";
	for (var i = 0; i < n; i++)
		rnd += Math.floor(Math.random() * 1000);
	return rnd;
}



function addvaluetowebname(obj) {
	$("#model_name").val($(obj).text());
	$("#model_id").val($(obj).attr("value"));
	
	$("#web_select_items").html("");
	$.ajax({
		url : ctx + "/mdp/admin/datamodel/getApiIdsList.json",
		type : 'POST',
		data : {
			id : $(obj).attr("value")
		},
		success : function(d) {

			for (var i = 0; i < d.length; i++) {

				$.ajax({
					url : ctx + "/mdp/admin/datamodel/searchAPI.json",
					type : 'POST',
					data : {
						apiid : d[i].SERVICE_ID
					},
					success : function(d) {
						// var apiname = $("#search_api").val();
						// $('#infoid').modal('hide');
						RenderAppend("#api_panel", ".api_render", {
							name : d.apiname,
							dbname : d.db,
							tables : d.sql
						});
					}
				});
			}
		}
	});
}
