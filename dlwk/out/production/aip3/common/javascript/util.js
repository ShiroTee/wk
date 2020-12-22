var LOADDING_HTML = '<div class="panel panel-default" style="position:absolute;left:45%;margin-top:200px;"><div class="panel-body">';
LOADDING_HTML += '<i class="icon-spinner icon-spin orange bigger-200" style=""></i><span style="padding-left:5px;font-size:20px;color:red;">正在载入数据...</span></div></div>';
var ERROR_HTML = '<i class="iconfont iconfont-cuowu"></i>';
var SUCCESS_HTML = '<i class="iconfont iconfont-zhengque" style="color:green;"></i>';
var MODAL_LOADDING_HTML = '<i class="icon-spinner icon-spin orange bigger-125" style="margin-top:100px;margin-bottom:100px;margin-left:270px;"></i>页面加载中...';
var DEFAULT_PAGE_SIZE = 20;
var LOGING_OUT_MESSAGE = "因较长时间未操作系统而下线，请重新登录系统";
$.getHeight = function()
{
	return $(document.body).width();
};
$.getWidth = function()
{
	return $(document.body).width();
};
var DATE_DEFAULT_CONFIG =
{
	language : 'zh-CN',
	autoclose : true,
	todayHighlight : true
};
Date.prototype.format = function(fmt)
{ // author: meizz
	var o =
	{
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
$.submitData = function(args)
{
	var url = args.url;
	if (typeof (url) != "string")
	{
		alert("url not empty");
		return false;
	}

	if (url.indexOf("?") != -1)
	{
		url += "&t=" + new Date().getTime();
	} else
	{
		url += '?t=' + new Date().getTime();
	}
	$.ajax(
	{
		url : url,
		data : args.data,
		dataType :typeof(args.dataType)=="string"?args.dataType:"json",
		timeout : typeof (args.timeout) == "number" ? args.timeout : 0,
		type : typeof (args.type) == "string" ? args.type : "get",
		async : typeof (args.async) == "boolean" ? args.async : true,
		success : function(data)
		{

			if (data.msg)
			{
				if (data.exceptionCode == "2000")
				{
					$.alert(LOGING_OUT_MESSAGE);
					return;
				}
				if (args.errorFun)
				{
					args.errorFun(data);
					return;
				}
				$.alert(data.msg);
				return;
			}
			args.sucFun(data);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown)
		{
			var status = XMLHttpRequest.status;
			if (status == 402)
			{
				$.alert(LOGING_OUT_MESSAGE, function()
				{
					window.location.reload();
				});
			} else if (status == 404)
			{
				$.alert("请求路径不存在");
				return;
			} else if (status == 0)
			{
				$.alert("服务器异常");
				return;
			} else
			{
				$.alert("未知异常，异常代码:" + status);
			}
		}
	});
};
function fm_data(date)
{
	return new Date(date).format("yyyy-MM-dd hh:mm:ss");
}
function fm_status(config, value)
{
	var label = null;
	try
	{
		label = eval(config);
	} catch (e)
	{
		label = null;
	}
	if (label == null)
	{
		if (value == 1)
		{
			return '<span class="label label-sm label-danger arrowed arrowed-righ">启用</span>';
		}
		return '<span class="label label-sm label-success arrowed arrowed-righ">禁用</span>';
	}
	return label;
};
$.alert = function(message, callback)
{
	bootbox.alert(
	{
		message : message,

		buttons :
		{
			ok :
			{
				label : '确定',
				className : "btn-xs"
			}
		},
		callback : callback,
		title : "提示信息"
	});
};
/**
 * 弹出确认框
 * 
 * @param {}
 *            message 提示信息
 * @param {}
 *            okBackFun 确定回调函数
 * @param {}
 *            cancelBackFun 取消回调函数
 */
$.confirm = function(message, okBackFun, cancelBackFun)
{
	bootbox.confirm(
	{
		size : 'small',
		buttons :
		{
			confirm :
			{
				label : "确定",
				className : "btn-xs"
			},
			cancel :
			{
				label : "取消",
				className : "btn-xs"
			}
		},
		message : message,
		callback : function(result)
		{
			if (result && typeof okBackFun != "undefined")
			{
				okBackFun();
			} else if (typeof cancelBackFun != "undefined")
			{
				cancelBackFun();
			}
		}
	});
};
/**
 * 弹出模态框
 */
$.modal = function(config)
{
	var modal = $('#myModal');
	backdrop = typeof (config.backdrop) == "boolean" && config.backdrop ? config.backdrop
			: "static";
	modal.modal(
	{
		backdrop : backdrop
	});
	if (typeof (config.size) == "string")
	{
		modal.find(".modal-dialog").addClass(config.size);
	} else
	{
		modal.find(".modal-dialog").removeClass("modal-lg modal-sm");
	}
	if (config.style)
	{
		for ( var style in config.style)
		{
			modal.find(".panel-body").css(style, config.style[style]);
		}
	}
	modal.find(".panel-body").html(MODAL_LOADDING_HTML);
	modal.find(".panel-body").load(config.url, config.data,
			function(response, status, xhr)
			{
				var h = modal.find('.modal-dialog').height();
				if(h > 0){
  					modal.find('.modal-dialog').css('transform','translate(0,' + (document.body.clientHeight - h < 30 ? 30 : document.body.clientHeight - h) / 2 + 'px)');
  				}
				if (status == "success")
				{

					if (config.complete)
					{
						config.complete(response);
					}

				} else if (status == "error")
				{
					// session过期
					if (xhr.status == 402)
					{
						alert(LOGING_OUT_MESSAGE);
						window.location.reload();
						return;
					}
					alert("服务器无响应");
				} else if (status == "timeout")
				{
					alert("请求超时");
				} else
				{
					alert("系统异常");
				}

			});
	modal.find(".panel-heading span").html(config.title);
	modal.modal("show");
	modal.on('shown.bs.modal', function (e) {
  		var h = modal.find('.modal-dialog').height();
  		//if(h < document.body.clientHeight){
  			modal.find('.modal-dialog').css('transform','translate(0,' + (document.body.clientHeight - h < 30 ? 30 : document.body.clientHeight - h) / 2 + 'px)');
  		//}
	})
	modal.on('loaded.bs.modal', function (e) {
  		var h = modal.find('.modal-dialog').height();
  		//if(h < document.body.clientHeight){
  			modal.find('.modal-dialog').css('transform','translate(0,' + (document.body.clientHeight - h < 30 ? 30 : document.body.clientHeight - h) / 2 + 'px)');
  		//}
	})
	modal.on('hidden.bs.modal', function (e) {
  		modal.find('.modal-dialog').removeAttr("style");
	})
};
$.closeModal = function()
{
	var modal = $("#myModal");
	modal.modal("hide");
	modal.removeAttr("bindFun");	
};
$.DropdownTree = function(elId, filter)
{
	var input = $("#" + elId);
	var dropdownTree = null;
	var resourceType = $("#resourceTypeSelect").val();// 资源类型
	var resourceId = $("#resourceId_text").val();// 当前资源Id
	var value = null;
	if (!input.next().hasClass("DropdownTree"))
	{
		return null;
	}
	dropdownTree = input.next();
	dropdownTree.find("li").each(function()
	{
		$(this).find("span:eq(0)").click(function()
		{
			if ($(this).hasClass("glyphicon-plus"))
			{
				$(this).parent().find("ul:eq(0)").show();
				$(this).removeClass("glyphicon-plus");
				$(this).addClass("glyphicon-minus");
			} else if ($(this).hasClass("glyphicon-minus"))
			{
				$(this).parent().find("ul:eq(0)").hide();
				$(this).removeClass("glyphicon-minus");
				$(this).addClass("glyphicon-plus");

			}
		});
	});
	// 设置选中值
	dropdownTree.find("li a").each(
			function()
			{
				var resourceType_ = $(this).attr("resourceType");

				var isClick = true;
				var resourceId_ = $(this).attr("resourceId");
				if (typeof (filter) == "boolean" && filter)
				{
					// 如果当前资源类型为目录则上级节点只能是目录
					if (resourceId == resourceId_)
					{
						isClick = false;
						$(this).css("cursor", "not-allowed");
					} else
					{
						if (resourceType == 0)
						{
							if (resourceType_ != 0)
							{
								$(this).css("cursor", "not-allowed");
								isClick = false;
							}
						}
						// 如果当前资源类型为系统页面则上级节点只能是目录或系统页面
						else if (resourceType == 3)
						{
							if (resourceType_ == 1 || resourceType_ == 2
									|| resourceType_ == 4)
							{
								$(this).css("cursor", "not-allowed");
								isClick = false;
							}
						}
						// 如果当前资源类型为按钮或数据请求则上级节点只能是页面
						else if (resourceType == 1 || resourceType == 4)
						{
							if (resourceType_ != 3)
							{
								$(this).css("cursor", "not-allowed");
								isClick = false;
							}
						}
					}
				}
				if (isClick)
				{
					$(this).click(function()
					{
						value = resourceId_;
						dropdownTree.slideUp("fast");
						input.val($(this).html());
						input.attr("parentId", resourceId_);
					});
				}

			});
	input.click(function(e)
	{
		e.stopPropagation();
		if (dropdownTree.is(":hidden"))
		{
			$(document).click(function()
			{
				dropdownTree.slideUp("fast");

			});
			dropdownTree.click(function(e)
			{
				e.stopPropagation();
			});
			dropdownTree.find("ul:eq(0)").show();
			dropdownTree.css("margin-top", $(this).outerHeight() + "px");
			dropdownTree.css("width", $(this).width() + 10 + "px");
			dropdownTree.slideDown("fast");

		} else
		{
			dropdownTree.slideUp("fast");
		}
	});
	this.getValue = function()
	{
		return value;
	};
};
$.TreeModel = function(config)
{
	var el = config.el;
	var call = config.call;
	var checkbox = config.checkbox;
	var multiselect = typeof (config.multiselect) == 'boolean' ? config.multiselect
			: false;
	var ifcheck_online = typeof (config.ifcheck_online) == 'boolean' ? config.ifcheck_online
			: false;
	var fold_item = typeof (config.fold_item) == 'boolean' ? config.fold_item
			: false;
	//点击选择框是否触发事件，默认不触发
	var if_checkbox_caught_action = typeof (config.if_checkbox_caught_action) == 'boolean' ? config.if_checkbox_caught_action
			: false;
	var timeoutID;
	if (typeof (el) == "string")
	{
		el = $("#" + el);
	}
	var data = el.attr("treeData");
	var treeValue = el.attr("value");
	data = jQuery.parseJSON(data);
	var icon = "icon-remove";
	if (data.checked)
	{
		icon = "icon-ok";
	}
	var node =
	{};
	node.nodeId = data.resourceId;
	node.text = data.text;
	node.href = data.href;
	node.nodeType = data.resourceType;
	node.checked = data.checked;
	node = JSON.stringify(node);
	if (data.nodes && data.nodes.length > 0 )
	{
		html = '<div class="tree-folder treeroot" style="display: block;">';
		html += '<div class="tree-folder-header" style="position: relative;">';
		//如果是折叠状态，则树的根目录置为+
		html += '<i class="icon-minus" style="top: 1px;"></i>';
		html += '<i class="' + icon + ' tree_icon_chexkbox" style="margin:3px 0 0 5px;" nodeId="'
				+ data.resourceId + '"></i>'
		html += "<div class=\"tree-folder-name\" style='width: 100%;position: absolute;left: 0;margin-left: 38px;'  data='" + node + "'>"
				+ data.text + "</div>";
		//如果是折叠状态，则树的跟目录子项置为不显示
//		if(fold_item){
//			html += '</div><div class="tree-folder-content" style="display: none;">';
//		}
//		else{
			html += '</div><div class="tree-folder-content" style="display: block;">';
//		}
		html += buildTree(data.nodes);
		html += '</div></div>';
	} else
	{
		html = '<div class="tree-item" style="display: block;">';
		html += '<i class="' + icon + ' tree_icon_chexkbox"  nodeId="'
				+ data.resourceId + '"></i>';
		html += "<div class=\"tree-item-name\" data='";
		html += node + "'>";
		html += data.text;
		html += '</div></div>';
	}
	// 构建树
	function buildTree(nodes)
	{
		if (!nodes)
		{
			return "";
		}
		var html = '';
		$
				.each(
						nodes,
						function(i, item)
						{
							node =
							{};
							node.nodeId = item.resourceId;

							node.text = item.text;
							node.href = item.href;
							node.nodeType = item.resourceType;
							node.parentId = item.parent.resourceId;
							node.checked = item.checked;
							node = JSON.stringify(node);
							var icon = "icon-remove";
							if (item.checked)
							{
								icon = "icon-ok";
							}
							if (item.nodes && item.nodes.length > 0)
							{
								html += '<div class="tree-folder" style="display: block;">';
								html += '<div class="tree-folder-header" style="position: relative;">';
								//如果默认为收起状态，则将每级目录都置为+号状态
								if(fold_item){
									html += '<i class="icon-plus" style="top: 1px;"></i>';
								}
								else{
									html += '<i class="icon-minus" style="top: 1px;"></i>';
								}
								html += '<i class="' + icon
										+ ' tree_icon_chexkbox" style="margin:3px 0 0 5px;" nodeId="'
										+ item.resourceId + '"></i>'
								html += "<div class=\"tree-folder-name\" style='width: 100%;position: absolute;left: 0;margin-left: 38px;' data='";
								html += node + "'>";
								html += item.text;
								html += '</div></div>';
								if(fold_item){
									html += '<div class="tree-folder-content" style="display: none;">';
								}
								else{
									html += '<div class="tree-folder-content" style="display: block;">';
								}
								html += buildTree(item.nodes);
								html += '</div></div>';

							} else
							{
								html += '<div class="tree-item" style="display: block;">';
								html += '<i class="' + icon
										+ ' tree_icon_chexkbox" style="margin:3px 0 0 5px;" nodeId="'
										+ item.resourceId + '"></i>';
								html += "<div class=\"tree-item-name\" style='width: 100%;position: absolute;left: 0;margin-left: 30px;' data='";
								html += node + "'>";
								html += item.text;
								html += '</div></div>';
							}
						});
		return html;
	}
	;
	html = $(html);
	el.html(html);
	event();
	var activeNode = el.find("i[nodeId='" + treeValue + "']");
	activeNode.removeClass("icon-remove");
	activeNode.addClass("icon-ok");
	this.addNode = function(parent, node)
	{
		node.parentId = parent;
		parent = el.find("a[nodeId='" + parent + "']").parent();
		var html = "";
		html += '<li><a href="#" nodeId="';
		html += node.nodeId;
		html += "\" data='";
		html += JSON.stringify(node);
		html += "'><i class=\"icon-dashboard\"></i><span class=\"menu-text\">"
				+ node.text + "</span></a></li>";
		html = $(html);
		if (parent.find("ul:eq(0)").length == 0)
		{
			parent.append('<ul class="submenu"></ul>');
		}
		var i = parent.find("b:eq(0)");
		if (!i.hasClass("arrow"))
		{
			parent.find("a:eq(0)").append(
					'<b class="arrow icon-angle-down"></b>');
		}
		parent.find("ul:eq(0)").append(html);
		event(html);
		if (i.hasClass("icon-angle-down"))
		{
			i.click();
		}

	};
	// 获取当前选中节点ID
	this.getNodeId = function()
	{
	};
	this.editNode = function(nodeId, text)
	{
		$("#" + nodeId + " span").html(text);
	};
	// 获取checkbox选中值
	this.getSelectData = function()
	{
		var values = [];
		el.find(".icon-ok").each(function()
		{
			values.push($(this).attr("nodeId"));
		});
		return values.join(",");
	};
	// 删除节点
	this.deleteNode = function(nodeId)
	{
		el.find("i[nodeId='" + nodeId + "']").parents("div.tree-item").remove();
	};
	this.expandAll = function()
	{
	};
	/**
	 * 
	 */
	this.findNode = function(nodetext){
		if(nodetext == ""){
			return; 
		}
		var nodeid,text;
		$(".tree-item-name,.tree-folder-name").each(function(){
			var curtext = $(this).html();
			if(curtext.indexOf(nodetext) != -1){
				nodeid = $(this).prev().attr("nodeid");
				text = curtext;
				return;
			}
		})
		if(nodeid != null && nodeid != undefined){
			this.expandSelect(nodeid);
			return {nodeid:nodeid,text:text};
		}
		return null;
		
	}
	
	// 树选择事件
	function selectClick(i, parent, leaf)
	{
		// 多选
		if (multiselect)
		{

			if (i.hasClass("icon-remove"))
			{
				// 选中全部的子节点
				parent.find(".icon-remove").each(function()
				{
					$(this).removeClass("icon-remove");
					$(this).addClass("icon-ok");
				});
				i.removeClass("icon-remove");
				i.addClass("icon-ok");

			}
			// 取消节点选择
			// 如果当前节点包含子子节点则全部取消子节点
			else
			{

				if (!leaf)
				{
					parent.find(".icon-ok").each(function()
					{
						$(this).removeClass("icon-ok");
						$(this).addClass("icon-remove");
					});
				}
				i.removeClass("icon-ok");
				i.addClass("icon-remove");
				// 如果父节点下没有节点则取消对父节点的选择
				// if (leaf && parent.next().find(".icon-ok").length == 0
				// && parent.find(".icon-ok").length == 1)
				// {
				// var parentIcon = parent.find(".icon-ok");
				// parentIcon.removeClass("icon-ok");
				// parentIcon.addClass("icon-remove");
				// }

			}
		}
		// 单选
		else
		{
			//如果选择框能触发事件，则触发点击事件，点击都为选中状态
			if(if_checkbox_caught_action){
				i.parent().find(".tree-folder-name").click();
				i.parent().find(".tree-item-name").click();
				var arrays = el.find(".icon-ok");
				arrays.removeClass("icon-ok");
				arrays.addClass("icon-remove");
				i.removeClass("icon-remove");
				i.addClass("icon-ok");
				return;
			}
			if (i.hasClass("icon-remove"))
			{
				var arrays = el.find(".icon-ok");
				arrays.removeClass("icon-ok");
				arrays.addClass("icon-remove");
				i.removeClass("icon-remove");
				i.addClass("icon-ok");

			} else
			{
				i.removeClass("icon-ok");
				i.addClass("icon-remove");
			}
			
		}
	}
	;
	
	/**
	 * 展开对应ID的节点
	 */
	this.expandSelect = function(nodeId){
		if("" == nodeId || null == nodeId || undefined == nodeId){
			return;
		}
		$(".treeroot").find(".tree-item").css("background","");
		$(".tree-folder-header").css("background","");
		$(".tree_icon_chexkbox").removeClass("icon-ok");
		$(".tree_icon_chexkbox").addClass("icon-remove");
		var i = el.find("i[nodeId='" + nodeId + "']");
		i.removeClass("icon-remove");
		i.addClass("icon-ok");
		if(i.parent().hasClass("tree-folder-header") || i.parent().parent().parent().hasClass("treeroot")){
			$("#treeroot").find(".tree-folder-content").slideDown("fast");
			var top = 0;
			if(i.parent().parent().parent().hasClass("treeroot")){
				top += i.parent()[0].offsetTop;
			}
			else{
				top += i.parent().parent()[0].offsetTop;
			}
			$(".treeroot").parent().scrollTop(top);
			i.parent().css("background","whitesmoke");
		}
		else{
			$("#treeroot").find(".tree-folder-content").slideDown("fast");
			i.parent().parent().slideDown("fast");
			var top = 0;
			top += i.parent()[0].offsetTop;
			top += i.parent().parent().parent()[0].offsetTop;
			i.parent().parent().parent().find(".tree-folder-header").find("i:first").removeClass("icon-plus");
			i.parent().parent().parent().find(".tree-folder-header").find("i:first").addClass("icon-minus");
			$(".treeroot").parent().scrollTop(top);
			i.parent().css("background","whitesmoke");
		}
	}
	// 选中节点
	this.select = function(nodeId)
	{
		this.expandSelect(nodeId);
		el.find("a[nodeId='" + nodeId + "']").parent().addClass("active");
		var i = el.find("i[nodeId='" + nodeId + "']");
		//如果是选择框触发事件，则单击都为选中状态
		if(if_checkbox_caught_action){
			var arrays = el.find(".icon-ok");
			arrays.removeClass("icon-ok");
			arrays.addClass("icon-remove");
			i.removeClass("icon-remove");
			i.addClass("icon-ok");
		}
		else{
			if(ifcheck_online){
				if (i.hasClass("icon-remove"))
				{
					var arrays = el.find(".icon-ok");
					arrays.removeClass("icon-ok");
					arrays.addClass("icon-remove");
					i.removeClass("icon-remove");
					i.addClass("icon-ok");
					
				} else
				{
					i.removeClass("icon-ok");
					i.addClass("icon-remove");
				}
			}
		}
	};
	function event()
	{
		el.find(".tree-item").each(function()
		{
			var parent = $(this).parent().prev();
			$(this).find("i").click(function()
			{
				selectClick($(this), parent, true);
			});
		});
		
		//双击展开或者收起目录
		el.find(".tree-folder-name").each(function(){
			$(this).dblclick(function(){
				clearTimeout(timeoutID);
				if($(this).prev().prev().hasClass("icon-plus")){
					$(this).prev().prev().removeClass("icon-plus");
					$(this).prev().prev().addClass("icon-minus");
					if(fold_item){
						$(this).parent().next().slideDown("fast");
						$(this).parent().next().find(".tree-folder").find(".tree-folder-content").slideUp("fast");
					}
					else{
						$(this).parent().next().slideDown("fast");
					}
				}
				else{
					$(this).prev().prev().removeClass("icon-minus");
					$(this).prev().prev().addClass("icon-plus");
					$(this).parent().next().slideUp("fast");
					//如果默认折叠状态，则收起的时候将下级目录置为+号状态
					if(fold_item){
						$(this).parent().next().find(".tree-folder").find(".tree-folder-content").slideUp("fast");
						$(this).parent().next().find(".tree-folder").find(".tree-folder-header").find("i:eq(0)").removeClass("icon-minus");
						$(this).parent().next().find(".tree-folder").find(".tree-folder-header").find("i:eq(0)").addClass("icon-plus");
					}
				}
			})
		})
		
		el.find(".tree-folder-header").each(function()
		{
			var treeHandler = $(this);
			// 树折叠展开事件
			$(this).find("i:eq(0)").click(function()
			{
				debugger
//				$(".treeroot").find(".tree-folder-content .tree-folder .tree-folder-content").slideUp("fast");
//				$(".treeroot").find(".tree-folder-content .tree-folder .tree-folder-header i:first").removeClass("icon-minus");
//				$(".treeroot").find(".tree-folder-content .tree-folder .tree-folder-header i:first").addClass("icon-plus");
				if ($(this).hasClass("icon-minus"))
				{
					$(this).removeClass("icon-minus");
					$(this).addClass("icon-plus");
					$(this).parent().next().slideUp("fast");
					//如果默认折叠状态，则收起的时候将下级目录置为+号状态
					if(fold_item){
						$(this).parent().next().find(".tree-folder").find(".tree-folder-content").slideUp("fast");
						$(this).parent().next().find(".tree-folder").find(".tree-folder-header").find("i:eq(0)").removeClass("icon-minus");
						$(this).parent().next().find(".tree-folder").find(".tree-folder-header").find("i:eq(0)").addClass("icon-plus");
					}
				} else
				{
					$(this).removeClass("icon-plus");
					$(this).addClass("icon-minus");
					if(fold_item){
						$(this).parent().next().slideDown("fast");
						$(this).parent().next().find(".tree-folder").find(".tree-folder-content").slideUp("fast");
					}
					else{
						$(this).parent().next().slideDown("fast");
					}
				}
			});
			// 树选择事件
			$(this).find("i:eq(1)").click(function()
			{
				selectClick($(this), treeHandler.next(), false);
			});
		});
		// 树单击事件回调函数
		el.find(".tree-folder-name,.tree-item-name").click(function()
		{
			var node = $(this).attr("data");
			clearTimeout(timeoutID);
			timeoutID= window.setTimeout(function(){
				if (call)
				{
					node = jQuery.parseJSON(node);
					call(node);
					// $(this).parent().css("background-color", "#6fb3e0");
				}
			},200)
			
		});
	}
	;
};
$.TabPanel = function(toolbarEl, contentEl)
{
	var toolbar = $("#" + toolbarEl);
	var contentPage = $("#" + contentEl);
	var html = '<div class="tab_panel_tool div_sel" href="workspace">';
	html += '首页</div>';
	html = $(html);
	var page = '<div  id="workspace" class="tab_page_content" style="position:relative;width:100%;">';
	page += '</div>';
	page = $(page);
	contentPage.append(page);
	page.load(INDEX_URL);
	toolbar.append(html);
	event(html);
	toolbar.find("tab_panel_tool").each(function()
	{
		event($(this));
	});
	function calcTabShow() {
		if($('#showLeftTab').length > 0){
			$('.tab_panel_tool:not(.hide)').eq(1).addClass('hide');
		}else{	
			var perW = $('.tab_panel_tool:first').get(0).offsetWidth;//每个Tab的宽度
			var tabCount = $('#breadcrumbs .tab_panel_tool').length;
			var totlaW = $('#breadcrumbs').width();
			if((tabCount + 1) * perW > (totlaW)){
				showArrow();
				$('.tab_panel_tool:not(.hide)').eq(1).addClass('hide');
			}
		}
	}
	function showArrow(){
		$('.tab_panel_tool:first').before('<div id="showLeftTab">&lt;&lt;</div>');
	}
	function event(tab)
	{
		var divId = tab.attr("href");
		tab.click(function()
		{
			if (!tab.hasClass("div_sel"))
			{
				var selDiv = toolbar.find(".div_sel");
				selDiv.removeClass("div_sel");
				selDiv.addClass("div_not_sel");
				$(this).removeClass("div_not_sel");
				$(this).addClass("div_sel");
				contentPage.find(".tab_page_content").hide();
				contentPage.find("#" + divId).show();
			}
			var leftArrow = $('#showLeftTab'),rightArrow = $('#showRightTab');
			while(tab.hasClass('hide') && leftArrow.length > 0 && !leftArrow.hasClass('hide')){
				leftArrow.click();
			}
			while(tab.hasClass('hide') && rightArrow.length > 0 && !rightArrow.hasClass('hide')){
				rightArrow.click();
			}
		});
		tab.find(".tab_pane_colose").click(function(e)
		{
			e.stopPropagation();
			var prev = tab.prev();
			var next = tab.next();
			tab.remove();
			$("#" + divId).remove();
			if(tab.hasClass('div_sel')){
				if (next.length > 0)
				{
					var sId = next.attr("href");
					next.toggleClass("div_sel div_not_sel");
					$("#" + sId).show();
				}else if (prev.length > 0)
				{
					var sId = prev.attr("href");
					prev.toggleClass("div_sel div_not_sel");
					$("#" + sId).show();
				}
			}
			var nextHideTab = $('.tab_panel_tool:not(.hide)').last().next('.tab_panel_tool');
			var prevHideTab = $('.tab_panel_tool:not(.hide)').eq(1).prev('.tab_panel_tool');
			if(nextHideTab && nextHideTab.hasClass('hide')){
				nextHideTab.removeClass('hide');
				if(!nextHideTab.next('.tab_panel_tool').hasClass('hide')){
					$('#showRightTab').remove();
				}
				if(!prevHideTab.prev('.tab_panel_tool').hasClass('hide')){
					$('#showLeftTab').remove();
				}
				return;
			}else{
				$('#showRightTab').remove();
			}
			if(prevHideTab && prevHideTab.hasClass('hide')){
				prevHideTab.removeClass('hide');
				if(!prevHideTab.prev('.tab_panel_tool').hasClass('hide')){
					$('#showLeftTab').remove();
				}
				if(!nextHideTab.next('.tab_panel_tool').hasClass('hide')){
					$('#showRightTab').remove();
				}
				return;
			}else{
				$('#showLeftTab').remove();
			}
		});
	}
	;
	//关闭tab
	this.closeTab=function(url)
	{
		var page=contentPage.find("div[link='"+url+"']");
		if(page.length==1)
		{
			var nodeId=page.attr("id")
			var tab=toolbar.find("div[href='"+nodeId+"']");
			var prev = tab.prev();
			var next = tab.next();
			tab.remove();
			$("#" + nodeId).remove();
			if (next.length > 0)
			{
				var sId = next.attr("href");
				next.toggleClass("div_sel div_not_sel");
				$("#" + sId).show();
			}else if (prev.length > 0)
			{
				var sId = prev.attr("href");
				prev.toggleClass("div_sel div_not_sel");
				$("#" + sId).show();
			}
			var nextHideNode = toolbar.not('hide').last().next();
			var nextHideNode = toolbar.not('hide').first().prev();
		}
	};
	//选择tab
	this.selectTab = function(url)
	{
		var page=contentPage.find("div[link='"+url+"']");
		if(page.length==1)
		{
			var nodeId=page.attr("id")
			toolbar.find("div[href='"+nodeId+"']").click();
		}
	};
	this.addPage = function(node, reqData, iframe)
	{
		if(node.openType==1)
		{
			window.open(node.href+"?loginName="+CURRENT_LOGIN_NAME);
			return;
		}
		var url = node.href;
		node.nodeId=new Date().getTime()+"";
		if (typeof (url) == "string")
		{
			if (url.indexOf("?") != -1)
			{
				url += "&t=" + new Date().getTime();
			} else
			{
				url += "?t=" + new Date().getTime();
			}
			url+="&loginName="+CURRENT_LOGIN_NAME;
		}
		var page=contentPage.find("div[link='"+node.href+"']");
		if (page.length > 0)
		{
			var nodeId=page.attr("id")
			toolbar.find("div[href='"+nodeId+"']").click();
            //workspace.reload(node.href, reqData);
		} else
		{
			calcTabShow();
			
			var selDiv = toolbar.find(".div_sel");
			selDiv.removeClass("div_sel");
			selDiv.addClass("div_not_sel");
			contentPage.find(".tab_page_content").hide();
			var html = '<div class="tab_panel_tool div_sel" href="';
			html += node.nodeId;
			html += '" title="' + node.text + '">';
			html += node.text.length > 8 ? node.text.substring(0, 8) + "..."
					: node.text;
			html += '<i class="iconfont iconfont-cuowu1 tab_pane_colose"></i></div>';
			html = $(html);
			toolbar.find('.tab_panel_tool').not('.hide').last().after(html);
			var page = '<div id="'
					+ node.nodeId
					+ '" class="tab_page_content" style="position:relative;width:100%;height:100%;"></div>';
			page = $(page);
			page.attr("link",node.href);
			contentPage.append(page);
			page.html(LOADDING_HTML);
			//外部url
			if(node.resourceType==2)
			{
				page.html('<iframe style="margin-top:-15px;height:calc(100% + 15px);" width="100%" scrolling="auto" frameborder="0" src="'+url+'"/>')
			}
			else
			{
				page.load(url, reqData, function(response, status, xhr)
						{
							if (xhr.status == 402)
							{
								alert(LOGING_OUT_MESSAGE);
								window.location.reload();
							}
						});
			}
			
			event(html);
		}

	};
	this.reload = function(url, data)
	{
		var divId = toolbar.find(".div_sel").attr("href");
		if (url.indexOf("?") != -1)
		{
			url += "&t=" + new Date().getTime();
		} else
		{
			url += "?t=" + new Date().getTime();
		}
		var page = $("#" + divId);
		page.html(LOADDING_HTML);
		page.load(url, data, function(response, status, xhr)
		{
			if (xhr.status == 402)
			{
				alert(LOGING_OUT_MESSAGE);
				window.location.reload();
			}
		});
	};
};
function Form(el)
{
	var form = el;
	if (typeof (el) == "string")
	{
		form = $("#" + el);
	}
	form.parent().next().find(".rest-btn").click(function()
	{
		form.find("input").not("[disabled='disabled']").val("");
		form.find("textarea").val("");
		// 清楚错误提示信息
		form.find("input").next("span").remove();
		form.find("select option:eq(0)").attr("selected", true);
	});
	// 如果select有值的话则选中该值
	form.find("select").each(function()
	{
		var value = $(this).attr("value");
		$(this).find("option[value='" + value + "']").attr("selected", true);
	});
	/*
	 * form.find("input[data],textarea[data]").each(function() { var data =
	 * $(this).attr("data"); if (data) { data = jQuery.parseJSON(data); var
	 * input = $(this); $(this).blur(function() { validate(input, data); }); }
	 * });
	 */
	function removeErrorMsg(input)
	{
		input.parent().parent().removeClass("has-error");
		input.parent().find("span").remove();
		input.tooltip("destroy");
	}
	function validate(input, data)
	{
		// {"type":"empty","msg":"错误提示"},{"type":"length","msg",maxLength:18,minLength:10},{"type":"pattern","expression":"","msg":""}
		removeErrorMsg(input);
		$.each(data, function(i, item)
		{
			var type = item.type;
			// 非空验证
			var value = input.val();
			if (type == "empty" && value == "")
			{
				error(input, item);

			} else if (type == "length" && value != "")
			{
				var maxLength = item.maxLength;
				var minLength = item.minLength;
				if (typeof (maxLength) == "number")
				{
					if (value.length > maxLength)
					{
						item.msg = item.msg + "不能大于" + minLength;
						error(input, item);
					}
				}
				if (typeof (minLength) == "number")
				{
					if (value.length < minLength)
					{
						item.msg = item.msg + "不能小于" + minLength;
						error(input, item);
					}
				}

			} else if (type == "pattern" && value != "")
			{
				var pattern = new RegExp(item.expression);
				if (!pattern.test(value))
				{
					error(input, item);
				}
			} else if (type == "number" && value != "")
			{
				var expression = "^[1-9]*[1-9][0-9]*$";
				var pattern = new RegExp(expression);
				// 允许小数
				if (typeof (item.allowDecimals) == "boolean"
						&& item.allowDecimals)
				{
					expression = "^\\d+(\\.\\d{0,4})?$";
					pattern = new RegExp(expression);
					if (typeof (item.decimalPrecision) == "number")
					{
						expression = "^\\d+(\\.\\d{" + item.decimalPrecision
								+ "})$"
						pattern = new RegExp(expression);
						if (!pattern.test(value))
						{
							item.msg = "数字 且小数点必须保留" + item.decimalPrecision
									+ "位";
							error(input, item);
						}

					}
					if (!pattern.test(value))
					{

						item.msg = "数字且最多保留4位小数";
						error(input, item);
					}

				} else
				{
					if (!pattern.test(value))
					{
						item.msg = "请输入正整数";
						error(input, item);
					}
				}
				if (typeof (item.maxValue) == "number")
				{
					if (Number(value) > Number(item.maxValue))
					{
						item.msg = "输入值不能大于" + item.maxValue;
						error(input, item);
					}
				}
				if (typeof (item.minValue) == "number")
				{
					if (Number(value) < Number(item.minValue))
					{
						item.msg = "输入值不能小于" + item.minValue;
						error(input, item);
					}
				}

			}
		});

	}
	;
	function error(input, item)
	{
		input.tooltip(
		{
			title : item.msg,
			placement : 'auto'
		});
		input.focus();
		throw Error("");
	}
	// 重置表单
	this.rest = function()
	{
		form.find("input").not("[readonly='readonly']").val("");
	};
	// 获取表单字段值
	this.getFieldValue = function(name, type)
	{
		return form.find(type + "[name='" + name + "']").val();
	};
	this.getTextValue = function(name)
	{
		return form.find("input[name='" + name + "']").val();
	};
	this.getFieldAttribute = function(name, type, attribute)
	{
		return form.find(type + "[name='" + name + "']").attr(attribute);
	};
	// 验证表单
	this.validate = function()
	{
		var isValidate = true;
		form.find("input[data],textarea[data],select[data]").each(function()
		{
			var data = $(this).attr("data");
			if (data)
			{
				data = jQuery.parseJSON(data);
				try
				{
					validate($(this), data);
				} catch (e)
				{
					isValidate = false;
					return false;
				}

			}
		});
		return isValidate;
	};
	// 提交表单
	this.submit = function(config)
	{
		if (this.validate())
		{
			requestData = getSubmitData();
			if (typeof (config.data) == "object")
			{
				for ( var field in config.data)
				{
					requestData[field] = config.data[field];
				}
			}
			$.submitData(
			{
				url : config.url,
				type : config.type,
				data : requestData,
				sucFun : config.sucFun
			});
		}
	};
	this.getRequestData = function()
	{
		return getSubmitData();
	};
	function getSubmitData()
	{
		var submitData =
		{};
		form.find("input[name],select[name],textarea[name]").each(function()
		{
			submitData[$(this).attr("name")] = $(this).val();
		});
		return submitData;
	}
	;
};
function getErrorMsg(msg)
{
	var html = '<div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:21px;"';
	if (msg.length > 6)
	{
		html += ' title="';
		html += msg.substring(5);
		html += '"';
	}
	html += '>';
	html += ERROR_HTML;
	html += ' ';
	html += msg;
	html += '</div>';
	return html;
};
$.message = function(msg)
{
	var html = '<div class="alert alert-danger alert-dismissible fade in" role="alert" style="position: fixed;top:80px;left:40%;z-index:9999;">';
	html += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>';
	html += '<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	html += msg;
	html += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></div>';
	html = $(html);
	$("body").append(html);

	setTimeout(function()
	{
		html.remove();
	}, 1000);
};
function getFileSize(size)
{
	var k = size / 1024;
	var unit = "KB";
	if (k >= 512)
	{
		unit = "MB";
		k = k / 1024;
		if (k >= 512)
		{
			unit = "GB";
			k = k / 1024;
		}
	}
	k = k.toFixed(2);
	return k + unit;
}
function Pagination(panel, callback, url)
{
	var page = panel.find(".m-pagination");
	if (!callback)
	{
		callback = function(data)
		{
			var searchWord = panel.find(".nav-search-input").val();
			var reqData =
			{
				searchWord : searchWord,
				pageIndex : data.pageIndex,
				pageSize : data.pageSize
			};
			workspace.reload(url, reqData);
		}
	}
	if (page.length == 1)
	{
		page.pagination(
		{
			total : page.attr("total"),
			pageSize : DEFAULT_PAGE_SIZE,
			pageIndex : page.attr("pageIndex"),
			firstBtnText : '首页',
			lastBtnText : '尾页',
			prevBtnText : '上一页',
			nextBtnText : '下一页'
		});
		page.on("pageClicked", function(event, data)
		{
			callback(data);
		});
	}
};
function ToolHelper(el, config, table)
{
	var tool = el;
	if (typeof (el) == "string")
	{
		tool = $("#" + el);
	}
	;
	$.each(config, function(btn, fun)
	{
		btn = btn.replace("_", '-');
		tool.find(".icon-" + btn).parent().click(function()
		{
			if (btn == "plus")
			{
				fun();
			} else
			{
				fun(table.selectData());
			}
		});
	});
	;
};
function TableHelper(el, multiple)
{
	var table = el;

	if (typeof (el) == "string")
	{
		table = $("#" + el);
	}
	if (!typeof (multiple) == "boolean")
	{
		multiple = false;
	}
	var arrays = table.find("tbody input[type='checkbox']");
	// 单选
	if (!multiple)
	{
		arrays.each(function()
		{
			var checkbox = $(this);
			$(this).click(function()
			{
				arrays.not(checkbox).prop(
				{
					checked : false
				});
			});
		});
	}
	// 多选
	else
	{
		var td = table.find("thead tr:eq(0) td:eq(0)");
		td.html('<input type="checkbox"/>');
		table.find("input[type='checkbox']").click(function()
		{
			var checked = $(this).is("checked");
			arrays.prop(
			{
				checked : checked
			});
		});
	}
	;
	// 获取选中值
	this.selectData = function()
	{
		var o = null;
		if (multiple)
		{
			var list = [];
			arrays.filter(":checked").each(function()
			{
				o = new Object();
				o.id = $(this).val();
				o.tr = $(this).parent().parent();
				list.push(o);
			});
			if (list.length == 0)
			{
				$.message("至少选择一条数据进行操作");
				throw new Error("");
			}
			return list;
		}
		var value = arrays.filter(":checked");
		if (value.length != 1)
		{
			$.message("请选择一条数据进行操作");
			throw new Error("");
		}
		o = new Object();
		o.id = value.val();
		o.tr = value.parent().parent();
		return o;
	};
	this.getObject = function()
	{
		return table;
	};
	this.event = function(config)
	{
		var this$ = this;
		table.find("tbody tr").each(function()
		{
			var td = $(this).find("td:last");
			$.each(config, function(btn, fun)
			{
				btn = btn.replace("_", '-');
				td.find(".icon-" + btn).parent().click(function()
				{
					arrays.prop(
					{
						checked : false
					});
					td.parent().find("td:eq(0) input").prop(
					{
						checked : true
					});

					fun(this$.selectData());
				});
			});
		});
	};
};
function ListTableHelper(panel, url)
{
	var panel = panel;
	if (typeof (panel) == "string")
	{
		panel = $("#" + panel);
	}
	// 初始化分页
	Pagination(panel, null, url);
	var table = new TableHelper(panel.find("table"));
	this.searchEvent = function(fun)
	{

		panel.find(".search-word").click(function()
		{
			var searchWord = panel.find(".nav-search-input").val();
			fun(searchWord);
		});
		panel.find(".nav-search-input").keydown(function(e)
		{
			if (e.keyCode == 13)
			{
				var searchWord = panel.find(".nav-search-input").val();
				fun(searchWord);
			}
		});
	};
	this.getTableHelper = function()
	{
		var table = new TableHelper(panel.find("table"));
		return table;
	};
	this.getToolHelper = function(config)
	{
		return new ToolHelper(panel.find(".widget-header"), config, table);
	};
};
var BaseView = Backbone.View.extend(
{
	// 初始化分页
	initPage : function()
	{
		var page = $(this.el).find(".m-pagination");
		if (page.length == 0)
		{
			return;
		}
		if (!this.pageCallback)
		{
			var panel = this.$el
			var url = this.url;
			this.pageCallback = function(data)
			{
				var searchWord = panel.find(".nav-search-input").val();
				var reqData =
				{
					searchWord : searchWord,
					pageIndex : data.pageIndex,
					pageSize : data.pageSize
				};
				workspace.reload(url, reqData);
			};
		}
		var total = page.attr("total");
		pageSize = page.attr("pageSize");
		var pageCount = total % pageSize == 0 ? parseInt(total / pageSize)
				: parseInt(total / pageSize) + 1;
		var this$ = this;
		page.pagination(
		{
			total : total,
			pageSize : pageSize,
			pageIndex : page.attr("pageIndex"),
			firstBtnText : '首页',
			lastBtnText : '尾页',
			prevBtnText : '上一页',
			nextBtnText : '下一页',
			showInfo : true,
			infoFormat : "总记录数:{total}条 总页数:" + pageCount + "页"
		});
		page.on("pageClicked", function(event, data)
		{

			this$.pageCallback(data);
		});
	},
	initialize : function()
	{
		this.table = $(this.el).find("table");
		// 是否支持多选,默认为单选
		if (!typeof (this.multiple) == "boolean")
		{
			this.multiple = false;
		}
		// 选中的数据
		this.selectData = null;
		var this$ = this;
		if (typeof (this.checkboxClick) == "undefined")
		{
			this.checkboxClick = function(arrays, checkbox)
			{
				var expre = ".widget-toolbar button[data-select='true']";
				var p = $(this$.el).find(expre);
				arrays.not(checkbox).prop(
				{
					checked : false
				});
				// 如果
				if (checkbox.is(":checked"))
				{
					p.removeAttr("disabled")
				} else
				{
					p.attr("disabled", "disabled")
				}
			};
		}
		this.initPage();
		this.initTable();
		// 获取选中的表格数据
		this.selectData = function(el)
		{
			var o = null;
			var arrays = this.table.find("tbody input[type='checkbox']");

			// 选中当前行
			if (typeof (el) == "object")
			{
				var tr = el.parents("tr");
				arrays.prop(
				{
					checked : false
				});
				tr.find("input[type='checkbox']").prop(
				{
					checked : true
				});

			}

			// 多选
			if (this.multiple)
			{
				var list = [];
				arrays.filter(":checked").each(function()
				{
					o = new Object();
					o.id = $(this).val();
					o.tr = $(this).parents("tr");
					list.push(o);
				});
				if (list.length == 0)
				{
					$.message("至少选择一条数据进行操作");
					throw new Error("");
				}
				return list;
			}
			// 单选
			else
			{
				var value = arrays.filter(":checked");
				if (value.length != 1)
				{
					$.message("请选择一条数据进行操作");
					throw new Error("");
				}
				o = new Object();
				o.id = value.val();
				o.tr = value.parents("tr");
				return o;
			}
		};
		/**
		 * 搜索方法, f:搜索回调函数
		 */
		this.doSearch = function(f)
		{
			var this$ = this;
			$(this.el).find(".search-btn").click(function()
			{
				var searchWord = $(this$.el).find(".nav-search-input").val();
				f(searchWord);
			});
			$(this.el).find(".nav-search-input").keydown(
					function(e)
					{
						if (e.keyCode == 13)
						{
							var searchWord = $(this$.el).find(
									".nav-search-input").val();
							f(searchWord);
						}
					});
		};
	},

	// 初始化表格事件
	initTable : function()
	{
		var arrays = this.table.find("tbody input[type='checkbox']");
		var o = null;
		var this$ = this;
		// 单选
		if (!this.multiple)
		{
			var expre = ".widget-toolbar button[data-select='true']";
			var p = $(this.el).find(expre);
			arrays.each(function()
			{
				var checkbox = $(this);
				$(this).click(function()
				{
					this$.checkboxClick(arrays, checkbox);
				});
			});
		}
		// 多选
		else
		{
			var td = this.table.find("thead tr:eq(0) td:eq(0)");
			td.html('<input type="checkbox"/>');
			this.table.find("input[type='checkbox']").click(function()
			{
				/***************************************************************
				 * var checked = $(this).is("checked"); arrays.prop( { checked :
				 * checked });
				 **************************************************************/
			});
		}

		// 表格行点击事件
		/*
		 * this.table.find("tr").click(function(e) { if (e.target &&
		 * $(e.target).attr("type") == "checkbox") { return null; } var $check =
		 * $(this).find("input[type='checkbox']"); if ($check &&
		 * $check.is(':checked')) { $check.removeAttr("checked"); } else {
		 * $check.attr("checked", "true"); } });
		 */
	}
});
function encrypt(loginName, password)
{

}
function initPage(el, pageCallback, url)
{
	var page = el.find(".m-pagination");
	// A b c+cds d+cds
	if (page.length == 0)
	{
		return;
	}
	if (!pageCallback)
	{
		var panel = this.$el
		var url = this.url;
		
		
		pageCallback = function(data)
		{
			var searchWord = panel.find(".nav-search-input").val();
			var reqData =
			{
				searchWord : searchWord,
				pageIndex : data.pageIndex,
				pageSize : data.pageSize
			};
			workspace.reload(url, reqData);
		};
	}
	var total = page.attr("total");
	pageSize = page.attr("pageSize");
	var pageCount = total % pageSize == 0 ? parseInt(total / pageSize)
			: parseInt(total / pageSize) + 1;
	page.pagination(
	{
		total : total,
		pageSize : pageSize,
		pageIndex : page.attr("pageIndex"),
		firstBtnText : '首页',
		lastBtnText : '尾页',
		prevBtnText : '上一页',
		nextBtnText : '下一页',
		showInfo : true,
		infoFormat : "总记录数:{total}条 总页数:" + pageCount + "页"
	});
	page.on("pageClicked", function(event, data)
	{

		pageCallback(data);
	});
}

var AutoLayout = (function(){
	var viewReact = {
		width : $(window).width(),
		height : $(window).height() - 90//96header
	};
	var o = {
		exec:function(el,y){
			if(!y || isNaN(y)){
				y = 0;
			}
			if(el.constructor == String){
				el = $(el);
			}else if(el.constructor == Array){
				$.each(el,function(i,item){
					o.exec(item, y);
				})
				return;
			}
			if(el.length > 0){
				el.css('height',viewReact.height - y).css('min-height',viewReact.height - y);
			}
		}
	}
	return o;
	
})();