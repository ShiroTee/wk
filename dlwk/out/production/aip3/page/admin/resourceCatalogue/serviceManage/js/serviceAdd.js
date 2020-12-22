
var currentNode,cataloguetreeModel_serviceManager;
$(function() {
	 $("#orgType_orgList").click(function(e){
	 if($("#gov_tree_serviceManager").hasClass("hide")){
	 $("#gov_tree_serviceManager").removeClass("hide");
	 }
	 else{
	 $("#gov_tree_serviceManager").addClass("hide");
	 }
	　e.stopPropagation();// 阻止冒泡到body
	 })
	 $(" body").click(function(){
　　			$("#gov_tree_serviceManager").addClass("hide");
	 });

		$("#gov_tree_serviceManager").click(function(e){// 自己要阻止

		　　e.stopPropagation();// 阻止冒泡到body

		});
		$("table th input[type='checkbox']").click(onMdTableAllCheck);
		
		cataloguetreeModel_serviceManager = new $.TreeModel(
				{
					el : "gov_tree_serviceManager",
					ifcheck_online :true,
					if_checkbox_caught_action:true,
					fold_item : true,
					call:function(node){
						cataloguetreeModel_serviceManager.select(node.nodeId);
						currentNode = node.nodeId;
						var html = '<option value="' + currentNode + '">' + node.text + '</option>'
						$("#orgType_orgList").html(html)
// workspace.reload("sps/getOrgTree.html",{node:node.nodeId});
					}
				});
	});


/**
 * 添加服务
 */
function addService_serviceManager(){
	var form = new Form("form_serviceManager");
	var params = $("#form_serviceManager").serialize(); 
	$.ajax({
		url : "serviceInfoHandler/registerRouteInfo.json",
		type : "post",
		dataType : "json",
		data : params,
		success : function(data){
			if(data.success){
				queryServiceList();
				$("#myModal").modal("hide");
				$.message("增加服务信息成功");
			}
			else{
				$.message(data.msg);
			}
		}
	})
}

/**
 * 重置添加栏
 */
function reset_serviceManager(){
	$("#serviceType_serviceManager").val("http");
	$("#serviceName_serviceManager").val('');
	$("#serviceAddr_serviceManager").val('');
	$("input[name='matchOnUriPrefix'][value=0]").prop("checked","checked");
	$("#service_addr_serviceManager").val("");
	$("input[name='isAuth'][value=1]").prop("checked","checked");
	$("input[name='writeLog'][value=1]").prop("checked","checked");
	$("#serviceDesc_serviceManager").val('');
}

/**
 * 表格全选/不选
 * 
 * @param {}
 *            e
 */
function onMdTableAllCheck(e) {
	var check = $(this).is(":checked");
	$("#service-table tr input[type='checkbox']").prop({
		"checked" : check
	});
}