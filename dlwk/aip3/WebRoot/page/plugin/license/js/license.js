$(function(){
	$("#authFile").click(function(){
		authFile();
	});
	compar();
});


function authFile(){
	$.ajax({
		url : ctx + "/mdp/welcome/generateServerInfoFile.json",
		data : "",
		dataType : "json",
		type : "post",
		success : function(data) {
			alert("rawInfo文件已生成，请把在license文件下rawInfo文件发送给售后中心获取license授权文件。");
		},
		error:function(e){
			alert("rawInfo文件生成错误，请联系管理员处理！");
		}
	})
	
}

function compar(){
	   var msg ="产品将于"+endDate+"到期";
	var d=new Date(Date.parse(endDate.replace(/\-/g, "\/")));
	var curDate=new Date();
	if(d <curDate){
		msg='产品已过期'
	   
	}
	$("#msg").html(msg);
}