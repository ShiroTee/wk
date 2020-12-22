 
$(document).ready(function() {
	listApply();
	listApproval();
	listFinish();
	listAuth();
});
//授权列表
function listAuth(){
	var getList = function(data) {
		param = {
			start : 0,
			name: encodeURI( ""+$("#auth_username").val()),
			assetName: encodeURI(""+$("#auth_resname").val()) ,
			authcode: $("#auth_code").val()  
		};
		updatePagination(ctx
				+ "/mdp/admin/applyResourceController/getAuthOfNotHaveService.json", param,
				100, 10, function(data, pageIndex) {
			        showcontent(data);
				},"#navApplyId4");
	}
	var showcontent = function(data) {
		 console.log(data);
		 $("#listauthtable").html($("#authtemplate").render(data)) ;
	}
	getList();
}
//已办列表
function listFinish(){
	var getList = function(data) {
		param = {
			start : 0
		};
		updatePagination(ctx
				+ "/mdp/admin/workFlowHandler/historyTaskListJson.json", param,
				100, 10, function(data, pageIndex) {
			        showcontent(data);
				},"#navApplyId3");
	}
	var showcontent = function(data) {
		 
		 var result ={
				 dataList:[] 
		 };
		 if(data.count>0){
			 for( var i = 0 ;i<data.historyOrders.length;i++ ){
				 var apply = {};
				 apply.process = data.historyOrders[i];
				 apply.index = i+1;
				 apply.data = $.parseJSON( data.historyOrders[i].variable );
				 result.dataList.push(apply);
			 }
		 } 
		$("#historyid").html($("#historytemplate").render(result))
	}
	getList();
}

//申请列表
function listApply() {
	var getList = function(data) {
		param = {
			start : 0
		};
		updatePagination(ctx
				+ "/mdp/admin/workFlowHandler/getApplyListJson.json", param,
				100, 10, function(data, pageIndex) {
			        showcontent(data);
				},"#navApplyId");
	}
	var showcontent = function(data) {
		 $("#subscribeCode").html(data.authcode);
		 var result ={
				 dataList:[] 
		 };
		 if(data.count>0){
			 for( var i = 0 ;i<data.list.length;i++ ){
				 var apply = {};
				 apply.process = data.list[i];
				 apply.index = i+1;
				 apply.data = $.parseJSON( data.list[i].variable );
				 result.dataList.push(apply);
			 }
		 }
		 $("#applytableid").html($("#applylisttemplate").render(result))
	}
	getList();
}
//代办列表
function listApproval(){
	//admin/workFlowHandler/getProcessTodoJsonList.json
	var getList = function(data) {
		param = {
			start : 0
		};
		updatePagination(ctx
				+ "/mdp/admin/workFlowHandler/getProcessTodoJsonList.json", param,
				100, 10, function(data, pageIndex) {
			        showcontent(data);
				},"#navApplyId2");
	}
	var showcontent = function(data) {
		  var result ={
				 dataList:[] 
		 };
		 if(data.count>0){
			 for( var i = 0 ;i<data.list.length;i++ ){
				 var apply = {};
				 apply.process = data.list[i];
				 apply.index = i+1;
				 apply.data = $.parseJSON( data.list[i].orderVariable );
				 result.dataList.push(apply);
			 }
		 } 
		 $("#checktableid").html($("#checklisttemplate").render(result)) 
	}
	getList();
}