function editPassword() {
	var requestUrl = getGrURL() + 'userInfoHandler/editUserPassword';
	
	var old_Password = document.getElementById('oldPassword').value;
	var new_Password = document.getElementById('newPassword').value;

	if(new_Password.length<12){
		alert("密码长度不能小于12位！");
		return;
	}
    //var reg = /^[a-zA-Z0-9!@#$%^&*()_+|{}?><\-\]\\[\/]*$/;
    var reg = /^[A-Za-z0-9]{12,20}$/;
    //var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{12,20}$/
	if(!reg.test(new_Password)){
        alert("密码复杂度不符合规定（字母+数据[长度:12-20]）！");
        return;
	}

	var param = {
			userId : userId,
			oldPassword : old_Password,
			newPassword : new_Password,
			repeatPassword : new_Password,
			orgId : ""

	};
	$.ajax({
		url: requestUrl,
		dataType : 'jsonp',
		jsonp : "jsonpcallback",
		data : param,
		success : function(data) {
			if(data.success)
			{
				alert("密码修改成功");
				$("#showDiv").hide();
				$("#litDiv").hide();
			}else{
				alert("原密码密码错误");
			}
		},
		error : function(response) {
			alert(response);
		},
		timeout:6000
	});

}

function editUserInfo() {
	var requestUrl = getGrURL() + 'userInfoHandler/editUserInfo';
    var newPhone=$('#newPhone').val();
    if(newPhone==''){
		alert("新电话不能为空");
		return;
	}
    var userAddress=$('#newAddr').val();
    if(userAddress==''){
		alert("新地址不能为空");
		return;
	}
	var param = {
		userId: userId,
		userPhone: $('#newPhone').val(),
		userAddress: $('#newAddr').val()
	};
	$.ajax({
		url: requestUrl,
		dataType: 'jsonp',
		jsonp: "jsonpcallback",
		data: param,
		success: function (data) {
			if (data.success) {
				alert("修改成功");
				$("#showDiv2").hide();
				$("#litDiv2").hide();
				$("#userPhone").html($('#newPhone').val());
				$("#adr").html($('#newAddr').val());
				
			} else {
				alert("修改失败");
			}
		},
		error: function (response) {
			alert("系统超时，请稍后再试");
			
		},
		timeout: 6000
	});
}

