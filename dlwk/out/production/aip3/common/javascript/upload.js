function UploaderHelper(config)
{
	var panel = config.panel;
	var url = config.url;
	if (!url)
	{
		url = "file/add.json";
	}
	if (typeof (panel) == "string")
	{
		panel = $("#" + panel);
	}
	;
	var uploader = WebUploader.create(
	{

		// swf文件路径
		swf : CTX + '/resources/plugins/webuploader/Uploader.swf',

		// 文件接收服务端。
		server : url
	});
	// 文件上传表单
	var fForm = panel.find("#file-form");
	// 文件上传进度条
	var progressBar = fForm.find(".progress-bar");
	function init()
	{
		fForm.find("input[type='checkbox']").click(
				function()
				{
					var checked = $(this).is(":checked");
					if (checked)
					{
						fForm.find("input[name='reFileName']").removeAttr(
								"disabled");
					} else
					{
						fForm.find("input[name='reFileName']").attr("disabled",
								"disabled");
					}
				});
		// 选择文件单击事件
		panel.find("#file-select-btn").click(function()
		{
			panel.find("#uploadImage").click();
		});
		panel.find("#uploadImage").change(
				function(e)
				{
					uploader.reset();
					uploader.addFiles(e.target.files);
					var fileName = uploader.getFiles()[0].name;
					var size = uploader.getFiles()[0].size;
					fForm.find("input[name='fileName']").val(fileName);
					fForm.find("input[name='reFileName']").val(fileName);
					fForm.find("#showFileName").html(
							fileName + " 文件大小:" + getFileSize(size));
					panel.find("#file-save-sbtn").removeAttr("disabled");
				});
		// 上传文件信息
		panel.find("#file-edit-sbtn").click(function()
		{
			if (form.validate())
			{
				var reqData = form.getRequestData();
				reqData.fileSize = uploader.getFiles()[0].size;
				reqData.fileName = uploader.getFiles()[0].name;
				reqData.fileType = uploader.getFiles()[0].ext;
				uploader.option('formData', reqData);
				uploader.upload();
				$(this).attr("disabled", "disabled");
				progressBar.parent().show();
			}
		});
	}
	;
	// 初始化文件上传事件
	function initUploaderEvent()
	{
		uploader.on('uploadError', function(file, reason)
		{
			alert("文件上传异常");
		});
		uploader.on('uploadProgress', function(file, percentage)
		{
			console.log(percentage * 100);
			percentage = percentage * 100 + "%";
			progressBar.css("width", percentage);
			progressBar.html(percentage);
		});
		uploader.on('uploadAccept', function(file, response)
		{
			if (response.msg)
			{
				$("#file-save-sbtn").removeAttr("disabled");
				alert(response.msg);
			} else
			{
				$.message("保存文件信息成功");
				backFun(response);

			}
		});
	}
	;
}