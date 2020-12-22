 
$(document).ready(function() {
	listApply();
	 
});
 
//申请列表
function listApply() {
	var getList = function(data) {
		
		param = {
			start : 0,
			resname:$(".res_apply_css .resname").val()
		};
		updatePagination(ctx
				+ "/mdp/admin/workFlowHandler/getApplyListJson.json", param,
				0, 10, function(data, pageIndex) {
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
 