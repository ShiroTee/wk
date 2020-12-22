

$(function(){
	
	initAuthPage_fileAuthorize();
})



/**
 * 初始化分页
 */
function initAuthPage_fileAuthorize(){
	var url = "authRouteInfo/getAlreadyAuthorizationUser.json";
	var params = {
		routeId : routeId_fileAuthorize
	};
	updatePagination(url, params, 0, 6, function(data) {
		authList_fileAuthorize(data);
	},"#authDIV_fileAuthorize");
}


/**
 * 组装本页授权人员信息数据
 * @param data
 */
function authList_fileAuthorize(data){
	var html = '';
	for(var i=0;i<data.list.length;i++){
		var content = data.list[i];
		html += '<tr userid="' + content.user_id + '">';
		html += '<td><label class="position-relative"><input class="user_list_fileAuthorize ace" type="checkbox" value="'
			+ content.ar_id + '"/><span class="lbl"></span></label></td>';
		html += '<td><div>' + content.name + '</div></td>';
		html += '<td><div>' + content.login_name + '</div></td>';
		if(content.user_remark != null ){
			html += '<td><div>' + content.user_remark + '</div></td>';
			
		}
		else{
			html += '<td><div>--</div></td>';
		}
		
		html += '<td><div>' + content.auth_date + '</div></td></tr>';
	}
	
	$('#authorize-list tbody').html(html);
}

/**
 * 解除授权
 */
function removeAuthorize(){
	var userList = [];
	$(".user_list_fileAuthorize").each(function(){
		if($(this).is(":checked")){
			userList.push($(this).val());
		}
	})
	if(userList.length == 0){
		return ;
	}
	
	$.ajax({
		url : "authRouteInfo/removeAuthRouteInfo.json",
		data :{ar_ids:userList.join(",")},
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.success){
				$.message("解除成功！");
			}
			else{
				$.alert(data.msg);
			}
		}
	})
}