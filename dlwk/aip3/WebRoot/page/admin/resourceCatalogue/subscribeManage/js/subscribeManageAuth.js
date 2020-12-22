 
$(document).ready(function() {
	 
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
				0, 10, function(data, pageIndex) {
			        showcontent(data);
				},"#navApplyId4");
	}
	var showcontent = function(data) {
		 console.log(data);
		 $("#listauthtable").html($("#authtemplate").render(data)) ;
	}
	getList();
}
 