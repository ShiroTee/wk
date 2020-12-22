var dropdownTree = null;
$(function()
{
	if ($("#hiddenIcon").val() != "")
	{
		$('#e1_element').val($("#hiddenIcon").val());
	}
	$('#e1_element').fontIconPicker();
	dropdownTree = new $.DropdownTree("parentText", true);
	// 资源名称
	var href = $("#hrefText");
	href.blur(validateHref);
	var form = new Form("resource-form");
	$("#resourceTypeSelect").change(function()
	{
		var value = $(this).val();
		if (value == 2 || value == 3)
		{
			$("#resource-open-type").show();
		}
	});
	var rType=$("#resourceTypeSelect").val();
	if(rType==2||rType==3)
	{
		$("#resource-open-type").show();
	}
	// 新增或修改资源
	function saveOrupdateResourceInfo()
	{
		var text = $("#resourceText");
		var href = $("#hrefText");
		try
		{
			validateHref();
			text = text.val();
			href = href.val();
			// 资源父ID
			var parentId = $("#parentText").attr("parentId");
            // 资源类型
            var resourceType = $("#resourceTypeSelect").val();
			// 资源图标
			var icon = $("#e1_element").val();
			var resouceId = $("#resourceId_text").val();
			var dataURL = "resource/add.json";
			if (resouceId != "")
			{
				dataURL = "resource/edit.json";
			}
			var sortNumber=$("#resource-form input[name='sortNumber']");
			if(sortNumber.val()=="")
			{
                sortNumber.parent().next()
                    .html("请输输入序号");
				return false;
			}
			var data =
			{
				text : text,
				href : href,
				parentId : parentId,
				resourceId : resouceId,
				resourceType : resourceType,
				remark : $("#r_remark_input").val(),
                sortNumber:sortNumber.val(),
				icon : icon
			};
			console.log(data);
			form.submit(
			{
				url : dataURL,
				type : "post",
				data : data,
				sucFun : function(data)
				{

					$.closeModal();
					$.message("资源保存成功");
					workspace.reload("resource/list.html",
					{
						resourceId : parentId
					});
				}
			});
		} catch (e)
		{
		}

	}
	;
	function validateHref()
	{
		var href = $("#hrefText");
		// 如果资源类型=3则资源地址必须以英文字母开头并且以.html结尾
		// 如果资源类型=4则资源地址必须以英文字母开头并且以.json或.do或.xml结尾
		var resourceType = $("#resourceTypeSelect").val();
		var address = href.val();
		if (resourceType == 3)
		{
			var pattern = /^[a-zA-Z][/a-zA-Z0-9_-]+(.html)$/;
			if (!pattern.test(address))
			{
				href.parent().next()
						.html(getErrorMsg("页面资源地址必须以英文字母开头.html结尾"));
				href.select();
				href.focus();
				throw Error("");
			}
		} else if (resourceType == 4)
		{
			var pattern = /^[a-zA-Z][/a-zA-Z0-9_-]+(.do|.json)$/;
			if (!pattern.test(address))
			{
				href.parent().next().html(
						getErrorMsg("据请求资源地址必须以英文字母开头.do或.json结尾"));
				href.select();
				href.focus();
				throw Error("");
			}
		} else if (resourceType == 1)
		{
			if (address == "")
			{
				href.parent().next().html(getErrorMsg("资源地址不能为空"));
				href.select();
				href.focus();
				throw Error("");
			}
		} else if (resourceType == 2)
		{
			if (address == "")
			{
				href.parent().next().html(getErrorMsg("资源地址不能为空"));
				href.select();
				href.focus();
				throw Error("");
			}
			var strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
			var re = new RegExp(strRegex);
			if (!re.test(address))
			{
				href.parent().next().html(getErrorMsg("请输入正确的URL地址"));
				href.select();
				href.focus();
				throw Error("");
			}
		}
		if (href.val().length > 2048)
		{
			href.parent().next().html(getErrorMsg("不能超过2048个字符"));
			href.select();
			href.focus();
			throw Error("");
		}
		href.parent().next().html(SUCCESS_HTML);
	}
	;
	// 新增资源事件
	$("#resource-save-sbtn").click(saveOrupdateResourceInfo);
	// 修改资源信息
	$("#resource-edit-sbtn").click(saveOrupdateResourceInfo);
});
