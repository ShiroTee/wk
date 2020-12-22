 
$(document).ready(function() {
	 
	listFinish();
	 
});
 
//已办列表
function listFinish(){
	var getList = function(data) {
		param = {
			start : 0,
			resname:$(".res_his_css .resname").val()
		};
		updatePagination(ctx
				+ "/mdp/admin/workFlowHandler/historyTaskListJson.json", param,
				0, 10, function(data, pageIndex) {
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

 