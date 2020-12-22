

var serivceId_serviceDetails = $("#serivceId_serviceDetails").val();
var currentNode_serviceDetail,cataloguetreeModel_serviceDetail;
$(function() {
	 $("#orgType_orgList_serviceDetails").click(function(e){
	 if($("#gov_tree_serviceDetails").hasClass("hide")){
	 $("#gov_tree_serviceDetails").removeClass("hide");
	 }
	 else{
	 $("#gov_tree_serviceDetails").addClass("hide");
	 }
	　e.stopPropagation();// 阻止冒泡到body
	 })
	$(" body").click(function(){
　　		$("#gov_tree_serviceDetails").addClass("hide");
	});

		$("#gov_tree_serviceDetails").click(function(e){// 自己要阻止

		　　e.stopPropagation();// 阻止冒泡到body

		});
		cataloguetreeModel_serviceDetail = new $.TreeModel(
				{
					el : "gov_tree_serviceDetails",
					ifcheck_online :true,
					if_checkbox_caught_action:true,
					fold_item : true,
					call:function(node){
						cataloguetreeModel_serviceDetail.select(node.nodeId);
						currentNode_serviceDetail = node.nodeId;
						var html = '<option value="' + currentNode_serviceDetail + '">' + node.text + '</option>'
						$("#orgType_orgList_serviceDetails").html(html)
// workspace.reload("sps/getOrgTree.html",{node:node.nodeId});
					}
				});
	});
function reset_serviceManager(){
	$("#serviceType_serviceManager").val("http");
	$("#serviceName_serviceManager").val('');
	$("#service_addr_serviceManager").val("");
	$("input[name='isAuth'][value=1]").prop("checked","checked");
	$("input[name='writeLog'][value=1]").prop("checked","checked");
	$("#serviceDesc_service").val('');
}

/**
 * 保存服务
 * @returns
 */
function saveService_serviceDetails(){
	var form = new Form("form_serviceManager");
	var params = $("#form_serviceManager").serialize(); 
	$.ajax({
		url : "serviceInfoHandler/editServiceInfo.json",
		type : "post",
		dataType : "json",
		data : params,
		success : function(data){
			if(data.success){
				queryServiceList();
				$("#myModal").modal("hide");
				$.message("修改服务信息成功");
			}
			else{
				$.message(data.msg);
			}
		}
	})
}
