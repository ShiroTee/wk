 
$(document).ready(function() {
 
	listApproval();
	 
});
 
//代办列表
function listApproval(){
	//admin/workFlowHandler/getProcessTodoJsonList.json
	var getList = function(data) {
		param = {
			start : 0,
			resname:$(".res_check_css .resname").val()
			//applyuser:$(".res_check_css .applyuser").val() 
		};
		updatePagination(ctx
				+ "/mdp/admin/workFlowHandler/getProcessTodoJsonList.json", param,
				0, 500, function(data, pageIndex) {
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