
/**
 * 保存文件详细信息
 * @returns
 */
function saveFileDetails(){
	var data = {
			fileName:$("#fileName_fileDetails").val(),
			isAuth:$("input[type='radio'][name='fileManager_isauthor']:checked").val(),
			isStatus:$("input[type='radio'][name='fileManager_filestatus']:checked").val(),
			routeId:fileID
	}
	$.ajax({
		url:"serviceInfo/updateFileDetail.json",
		data:data,
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.success){
				queryFileList();
				$.message("保存成功");
			}
			else{
				
				$.message("保存失败");
			}
		},
	})
}