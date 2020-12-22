

$(function(){

	pageInit();
	
	var uploader = WebUploader.create({
		swf: ctx + '/resources/plugins/webuploader/Uploader.swf',
	    // 文件接收服务端。
	    server: 'serviceInfoHandler/uploadFile.json',

	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: {
	    	id:'#picker_fileList',
	    	multiple:false
	    },
	    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
	    resize: false
	});
	
	uploader.on( 'uploadProgress', function( file, percentage ) {
	    var $li = $('#upload_progress_fileList');
	    $li.find('p.state').text('上传中');
	    console.log('---' + percentage);
	    $li.css( 'width', percentage * 100 + '%' );
	});
	
	uploader.on( 'uploadSuccess', function( file,response ) {
		if(response.success){
			resetFile_uploader(uploader);
			$.message("上传成功");
		}
		else{
			$.alert("上传失败：" + response.msg);
		}
		$('.item_fileList').find(".info").html('');
		uploader.reset();
		$('#upload_loading_fileList').addClass('hide');
		$('div[data-show-box]').toggle();
	});

	
	uploader.on( 'uploadError', function( file ) {
		$('#upload_loading_fileList').addClass('hide');
		$.alert("上传出错");
	});
	/**
	 * 每次上传最后一个文件
	 */
	uploader.on( 'beforeFileQueued', function( file ) {
		uploader.reset();
	});
	
	uploader.on( 'fileQueued', function( file ) {
		$(".item_fileList").remove();
	    $("#fileList_fileDIV").append( '<div id="' + file.id + '" class="item item_fileList">' +
	        '<div class="info">' + file.name + '</div></div>' );
	});
	
	uploader.on('uploadStart',function(file){
		$('#upload_loading_fileList').removeClass('hide');
		$('#upload_progress_fileList').css('width',0);
	})
	$("#publish_addr").bind('keypress', function(event) {
		if (event.keyCode == "13")
			pageInit();
	});
	
	$("#fileName").bind('keypress', function(event) {
		if (event.keyCode == "13")
			pageInit();
	});
	

//    uploader.on('uploadBeforeSend', function (obj, data) {
//    	data.formData= { 
//    			"routeDesc": $("#routeDesc").val(), 
//    			"routeName": $("#routeName").val(), 
//    			"isAuth":$("input:radio[name='isAuth_fileList']:checked").val(),
//    			"resourceId":resourceID,
//    			};
//    });
	
	$("#fileUpload_upload").click(function(){
		uploader.options.formData = { 
    			"routeDesc": $("#routeDesc_fileList").val(), 
    			"routeName": $("#routeName_fileList").val(), 
    			"isAuth":$("input:radio[name='isAuth_fileList']:checked").val(),
    			"resourceId":resourceID,
    			};
		uploader.upload();
	})
	
	
	
	
	$('#upload-file,#backToList').click(function(){
		uploader.addButton({
		     id: '#picker_fileList',
		     innerHTML: '选择文件'
		     });
		$('div[data-show-box]').toggle();
	});
})



//初始化--------------------------------

function pageInit(){
	var params = {
			publishURL:$("#publish_addr").val(),
			routeName:$("#fileName").val()
	}
	updatePagination("serviceInfoHandler/getFileListNotResource.json",params,0,4,function(data){
		initFileList(data);
	},"#pageDIV_fileList");
}

/**
 * 初始化列表
 */
function initFileList(data){
	var html = '';
	for(var i=0;i<data.list.length;i++){
		var content = data.list[i];
		html += '<tr serviceId="' + content.routeId + '">';
		html += '<td><label class="position-relative">'
			 + '<input type="checkbox" class="ace"><span class="lbl"></span></label></td>';
		html += '<td style="width:150px">' + content.routeName + '</td>';
		html += '<td>' + content.fileSizef + '</td>';
		html += '<td>' + content.showURL + '</td>';
		if(content.routeStatus == 1){
			html += '<td style="color:green">启用</td>';
		}
		else{
			html += '<td style="color:red">禁用</td>';
		}
		html += '<td>' + TimestampToStr(content.publishDate) + '</td>';
	}
	$("#file-table tbody").html(html);
}


function resetFile_uploader(uploader){
	$("#routeName_fileList").val('');
	$("input[name='isAuth_fileList'][value=1]").prop("checked","checked");
	$("#routeDesc_fileList").val('');
	uploader.reset();
}

/**
 * 保存对应服务
 */

function saveService(){
	var serviceIds = [];
	$("#file-table tbody tr input[type='checkbox']").each(function(){
		if($(this).is(":checked")){
			serviceIds.push($(this).parent().parent().parent().attr("serviceid"));
		}
	})
	if(serviceIds.length == 0){
		return;
	}
	var data = {
			resourceId:resourceID,
			serviceIds:serviceIds.join(",")
	}
	data['from'] = 1;
	if(resource_from_file == '2'){
		data['userId'] = userID_file;
		data['from'] = 2;
	}
	$.ajax({
		url:"resourceCatalogueInfoHandler/saveWebServiceInto.json",
		data:data,
		dataType:"json",
		type:"post",
		success:function(data){
			if(data.success){
				pageInit();
				$.message("保存成功");
			}
			else{
				$.alert(data.msg);
			}
		}
	})
}


/**
 * timestamp 转时间字符串
 */
function TimestampToStr(timestamp) {
	var newDate = new Date();
	newDate.setTime(timestamp);
	return newDate.format("yyyy-MM-dd hh:mm:ss");
}