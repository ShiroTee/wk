/**
 * 页面加载完成
 */
$(function(){
	qryUsers();
});
/**
 * 查询用户
 */
function qryUsers()
{
	var url=ctx+"/mdp/welcome/qryUserByName.json";
	var params={name:""};
	/**$.ajax({url:url,type:"POST",dataType:"json",data:{name:""},success:function(data){
		data;
	}});**/
	updatePagination(url,params,0,2,function(data){
		var list=data.list;
		if(!list) list=[];
		$.app.bindTableData("#table_user",list);
	});
	
}