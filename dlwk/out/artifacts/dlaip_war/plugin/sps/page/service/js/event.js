//打开服务注册窗口
function openRegisterServiceWin() {
	var win = new Ext.Window({
		layout : 'fit',
		width : 450,
		height : 435,
		title : '服务注册',
		id : 'RegisterServiceWin',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ createServiceForm() ],
		buttons : [ {
			text : '关闭',
			iconCls : 'icon_close',
			handler : function() {
				win.close();
			}
		}, {
			text : '注册',
			iconCls : 'icon_save',
			handler : registerService
		}, {
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				Ext.getCmp("register_service_form").getForm().reset();
			}
		} ]

	});
	win.show();
}
function createServiceForm() {
	return new Ext.FormPanel({
		labelSeparator : "：",
		frame : true,
		border : false,
		autoHeight : true,
		buttonAlign : 'center',
		id : 'register_service_form',
		bodyStyle : 'padding:5px 5px 5px 30px',
		items : [ new Ext.form.ComboBox({
			allowBlank : false,
			mode : 'local',
			hiddenName : 'routeType',
			width : 240,
			store : new Ext.data.SimpleStore({
				fields : [ 'key', 'value' ],
				data : [ [ 'HTTP', 'http' ], [ 'SOAP', 'soap' ] ]
			}),
			triggerAction : 'all',
			displayField : 'key',
			valueField : 'value',
			forceSelection : true,
			resizable : true,
			typeAhead : true,
			value : 'http',
			handleHeight : 10,
			fieldLabel : '服务类型'
		}), {
			xtype : 'textfield',
			name : 'routeName',
			width : 240,
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 100,
			maxLengthText : "用户名最大长度不能超过100个字符！",// 提示文本
			allowBlank : false,
			blankText : '请输入服务名称',
			fieldLabel : '服务名称'
		}, {
			xtype : 'textfield',
			name : 'publishURL',
			width : 240,
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 512,
			maxLengthText : "发布地址最大长度不能超过512个字符",// 提示文本
			allowBlank : false,
			blankText : '请输入发布地址 ',
			fieldLabel : '发布地址'
		}, {
			xtype : 'radiogroup',
			fieldLabel : '动态匹配',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '是',
				name : 'matchOnUriPrefix',
				inputValue : '1'

			}, {
				boxLabel : '否',
				name : 'matchOnUriPrefix',
				inputValue : '0',
				checked : true
			}

			]
		}, {
			xtype : 'textarea',
			name : 'prxoyURL',
			width : 240,
			anchor : '89% 20%',
			maxLength : 512,
			maxLengthText : "代理地址最大长度不能超过512个字符",// 提示文本
			allowBlank : false,
			blankText : '请输入代理地址 ',
			vtype : 'url',
			fieldLabel : '代理地址'
		},

		{
			xtype : 'radiogroup',
			fieldLabel : '授权类型',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '授权访问',
				name : 'isAuth',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '公开',
				name : 'isAuth',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '记录日志',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '记录',
				name : 'writeLog',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '不记录',
				name : 'writeLog',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'textarea',
			name : 'routeDesc',
			width : 240,
			anchor : '89% 28%',
			fieldLabel : '服务描述'
		} ]
	});
}
function registerService() {
	var list = getGridList(Ext.getCmp("rdGrid"), "resourceId");
	if (list.length != 1) {
		Ext.Msg.alert('提示', "请选择一条资源目录上传文件");
		return false;
	}
	var url = getHandlerRequestUrl()
			+ "serviceInfoHandler/registerRouteInfo?resourceId=" + list[0]
			+ "&serviceType=0";
	submitForm(Ext.getCmp("register_service_form"), url, "注册服务异常", function() {
		Ext.Msg.alert('提示', "服务注册成功", function() {
			Ext.getCmp("RegisterServiceWin").close();
			Ext.getCmp("serviceGrid").store.reload();
		});

	});
}
function configResponse() {
	var form = new Ext.FormPanel({
		labelSeparator : "：",
		frame : true,
		border : false,
		height : 430,
		id : 'configResponseForm',
		bodyStyle : 'padding:5px 5px 5px 30px',
		reader : new Ext.data.JsonReader({
			successProperty : 'success',
		}, [ {
			name : 'xmlResponse',
			mapping : function(data) {
				if (data.xmlResponse && data.xmlResponse != "") {
					return data.xmlResponse;
				}
				return "";
			}
		}, {
			name : 'jsonResponse',
			mapping : function(data) {
				if (data.jsonResponse && data.jsonResponse != "") {
					// return strAnsi2Unicode(decode64(data.jsonResponse));
					return data.jsonResponse;
				}
				return "";
			}
		}, {
			name : 'routeId'
		}, {
			name : 'responseId'
		} ]),
		items : [ {
			xtype : 'textarea',
			fieldLabel : 'XML格式',
			anchor : '100% 50%',
			id : 'xmlResponse',
			name : 'x1'
		}, {
			xtype : 'textarea',
			fieldLabel : 'JSON格式',
			id : 'jsonResponse',
			anchor : '100% 50%',
			name : 'xx'
		}, {
			xtype : 'hidden',
			name : 'routeId'
		}, {
			xtype : 'hidden',
			id : 'xmlResponse_hidden',
			name : 'xmlResponse'
		}, {
			xtype : 'hidden',
			id : 'jsonResponse_hidden',
			name : 'jsonResponse'
		}, {
			xtype : 'hidden',
			name : 'responseId'
		} ]
	});
	var grid = Ext.getCmp("serviceGrid");
	var record = grid.getSelectionModel().getSelected();
	var url_ = getHandlerRequestUrl()
			+ "configResponseHandler/getResponseTemplate?routeId="
			+ record.get("routeId");
	form.getForm().load({
		url : url_,
		method : 'POST'
	});
	var win = new Ext.Window({
		layout : 'fit',
		width : 600,
		height : 450,
		maximizable : true,
		title : '配置响应模板',
		id : 'configResponseWin',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ form ],
		buttons : [
				{
					text : '格式化',
					iconCls : 'icon_close',
					handler : function() {
						var text = Ext.getCmp("xmlResponse").getValue();
						if (text != "") {
							text = formatXml(text);
							Ext.getCmp("xmlResponse").setValue(text);
						}
						text = Ext.getCmp("jsonResponse").getValue();
						if (text != "") {
							try {
								text = eval('(' + text + ')');
								text = JsonUti.convertToString(text);
								Ext.getCmp("jsonResponse").setValue(text);
							} catch (ex) {
								Ext.Msg.alert("提示", "请检查JSON格式");
							}

						}
					}
				},
				{
					text : '保存',
					iconCls : 'icon_save',
					handler : function() {
						var jsonResponse = Ext.getCmp("jsonResponse")
								.getValue();
						var xmlResponse = Ext.getCmp("xmlResponse").getValue();
						if (jsonResponse != "") {
							try {
								var text = eval('(' + jsonResponse + ')');
								text = JsonUti.convertToString(text);
							} catch (ex) {
								Ext.Msg.alert("提示", "请检查JSON格式");
								return false;
							}

							// Ext.getCmp("jsonResponse_hidden").setValue(encode64(strUnicode2Ansi(jsonResponse)));
							Ext.getCmp("jsonResponse_hidden").setValue(
									jsonResponse);

						}
						if (xmlResponse != "") {
							if (!validateXML(xmlResponse)) {
								Ext.Msg.alert("提示", "请检查XML格式");
								return false;
							}
							// Ext.getCmp("xmlResponse_hidden").setValue(encode64(strUnicode2Ansi(xmlResponse)));
							Ext.getCmp("xmlResponse_hidden").setValue(
									xmlResponse);

						}
						Ext.getCmp("jsonResponse").setValue("");
						Ext.getCmp("xmlResponse").setValue("");
						var url = getHandlerRequestUrl()
								+ "configResponseHandler/editResponseTemplate";
						submitForm(form, url, "", function() {
							win.close();
						});
					}
				} ]

	});

	win.show();
}
function formatXml(text) {
	// 去掉多余的空格
	text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function($0, name, props) {
		return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
	}).replace(/>\s*?</g, ">\n<");

	// 把注释编码
	text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g,
			function($0, text) {
				var ret = '<!--' + escape(text) + '-->';
				// alert(ret);
				return ret;
			}).replace(/\r/g, '\n');

	// 调整格式
	var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
	var nodeStack = [];
	var output = text.replace(rgx, function($0, all, name, isBegin,
			isCloseFull1, isCloseFull2, isFull1, isFull2) {
		var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/')
				|| (isFull1 == '/') || (isFull2 == '/');
		// alert([all,isClosed].join('='));
		var prefix = '';
		if (isBegin == '!') {
			prefix = getPrefix(nodeStack.length);
		} else {
			if (isBegin != '/') {
				prefix = getPrefix(nodeStack.length);
				if (!isClosed) {
					nodeStack.push(name);
				}
			} else {
				nodeStack.pop();
				prefix = getPrefix(nodeStack.length);
			}

		}
		var ret = '\n' + prefix + all;
		return ret;
	});

	var prefixSpace = -1;
	var outputText = output.substring(1);
	// alert(outputText);

	// 把注释还原并解码，调格式
	outputText = outputText.replace(/\n/g, '\r').replace(
			/(\s*)<!--(.+?)-->/g,
			function($0, prefix, text) {
				// alert(['[',prefix,']=',prefix.length].join(''));
				if (prefix.charAt(0) == '\r')
					prefix = prefix.substring(1);
				text = unescape(text).replace(/\r/g, '\n');
				var ret = '\n' + prefix + '<!--'
						+ text.replace(/^\s*/mg, prefix) + '-->';
				// alert(ret);
				return ret;
			});

	return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}
function getPrefix(prefixIndex) {
	var span = '    ';
	var output = [];
	for ( var i = 0; i < prefixIndex; ++i) {
		output.push(span);
	}

	return output.join('');
}
var JsonUti = {
	// 定义换行符
	n : "\n",
	// 设置行首的间隔距离，如制表符'\t'
	t : "    ",
	// 转换String
	convertToString : function(obj) {
		return JsonUti.__writeObj(obj, 1);
	},
	// 写对象
	__writeObj : function(obj // 对象
	, level // 层次（基数为1）
	, isInArray)// 此对象是否在一个集合内
	{
		// 如果为空，直接输出null
		if (obj == null) {
			return "null";
		}
		// 为普通类型，直接输出值
		if (obj.constructor == Number || obj.constructor == Date
				|| obj.constructor == String || obj.constructor == Boolean) {
			var v = obj.toString();
			var tab = isInArray ? JsonUti.__repeatStr(JsonUti.t, level - 1)
					: "";
			if (obj.constructor == String || obj.constructor == Date) {
				// 时间格式化只是单纯输出字符串，而不是Date对象
				return tab + ("\"" + v + "\"");
			} else if (obj.constructor == Boolean) {
				return tab + v.toLowerCase();
			} else {
				return tab + (v);
			}
		}

		// 写Json对象，缓存字符串
		var currentObjStrings = [];
		// 遍历属性
		for ( var name in obj) {
			var temp = [];
			// 格式化Tab
			var paddingTab = JsonUti.__repeatStr(JsonUti.t, level);
			temp.push(paddingTab);
			// 写出属性名
			temp.push(name + " : ");

			var val = obj[name];
			if (val == null) {
				temp.push("null");
			} else {
				var c = val.constructor;

				if (c == Array) { // 如果为集合，循环内部对象
					temp.push(JsonUti.n + paddingTab + "[" + JsonUti.n);
					var levelUp = level + 2; // 层级+2

					var tempArrValue = []; // 集合元素相关字符串缓存片段
					for ( var i = 0; i < val.length; i++) {
						// 递归写对象
						tempArrValue.push(JsonUti.__writeObj(val[i], levelUp,
								true));
					}

					temp.push(tempArrValue.join("," + JsonUti.n));
					temp.push(JsonUti.n + paddingTab + "]");
				} else if (c == Function) {
					temp.push("[Function]");
				} else {
					// 递归写对象
					temp.push(JsonUti.__writeObj(val, level + 1));
				}
			}
			// 加入当前对象“属性”字符串
			currentObjStrings.push(temp.join(""));
		}
		return (level > 1 && !isInArray ? JsonUti.n : "") // 如果Json对象是内部，就要换行格式化
				+ JsonUti.__repeatStr(JsonUti.t, level - 1) + "{" + JsonUti.n // 加层次Tab格式化
				+ currentObjStrings.join("," + JsonUti.n) // 串联所有属性值
				+ JsonUti.n + JsonUti.__repeatStr(JsonUti.t, level - 1) + "}"; // 封闭对象
	},
	__isArray : function(obj) {
		if (obj) {
			return obj.constructor == Array;
		}
		return false;
	},
	__repeatStr : function(str, times) {
		var newStr = [];
		if (times > 0) {
			for ( var i = 0; i < times; i++) {
				newStr.push(str);
			}
		}
		return newStr.join("");
	}
};

/**
 * 支持chrome, firefox, ie的xml验证
 */
function validateXML(txt) {
	// code for IE
	if (window.ActiveXObject) {
		var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(txt);

		if (xmlDoc.parseError.errorCode != 0) {
			return false;
		} else {
			return true;
		}
	}
	// code for Mozilla, Firefox, Opera, etc.
	else if (document.implementation.createDocument) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(txt, "text/xml");
		var error = xmlDoc.getElementsByTagName("parsererror");
		if (error.length > 0) {
			return false;
		}
		return true;
	}
}
// 删除服务
function deleteService() {
	var grid = Ext.getCmp("serviceGrid");
	var record = grid.getSelectionModel().getSelected();
	routeId = record.get("routeId");
	var url = getHandlerRequestUrl()
			+ "serviceInfoHandler/deleteRoute?routeId=" + routeId;
	deleteData(url, "删除数据异常", function() {
		grid.getStore().reload();
		grid.getSelectionModel().clearSelections();
	});
}
// 显示服务详情
function showServiceDetails() {
	var grid = Ext.getCmp("serviceGrid");
	var record = grid.getSelectionModel().getSelected();
	routeId = record.get("routeId");
	var form = new Ext.FormPanel({
		labelSeparator : "：",
		frame : true,
		border : false,
		autoHeight : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5px 5px 5px 30px',
		items : [ new Ext.form.ComboBox({
			allowBlank : false,
			mode : 'local',
			hiddenName : 'routeType',
			width : 240,
			store : new Ext.data.SimpleStore({
				fields : [ 'key', 'value' ],
				data : [ [ 'HTTP', 'http' ], [ 'SOAP', 'soap' ] ]
			}),
			triggerAction : 'all',
			displayField : 'key',
			valueField : 'value',
			forceSelection : true,
			resizable : true,
			typeAhead : true,
			handleHeight : 10,
			disabled : true,
			fieldLabel : '服务类型'
		}), {
			xtype : 'textfield',
			name : 'routeName',
			width : 240,
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 100,
			allowBlank : false,
			blankText : '请输入服务名称',
			fieldLabel : createFieldLabel('服务名称')
		}, createOrgComboxTree("xqjgxz_1","SPS_ORG_ID_DETAILS_VALUE",record.get("orgName")),{
			xtype : 'textfield',
			name : 'orgId',
			value:record.get("orgId"),
			id : "SPS_ORG_ID_DETAILS_VALUE",
			hidden : true
		},{
			xtype : 'textfield',
			name : 'publishURL',
			width : 240,
			allowBlank : false,
			blankText : '请输入发布地址 ',
			disabled : true,
			fieldLabel : createFieldLabel('发布地址')
		}, {
			xtype : 'radiogroup',
			fieldLabel : '&nbsp;&nbsp;动态匹配',
			disabled : true,
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '是',
				name : 'matchOnUriPrefix',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '否',
				name : 'matchOnUriPrefix',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'textarea',
			name : 'prxoyURL',
			width : 240,
			anchor : '89% 20%',
			vtype : 'url',
			maxLength : 512,
			maxLengthText : "代理地址最大长度不能超过512个字符",// 提示文本
			allowBlank : false,
			blankText : '请输入代理地址 ',
			fieldLabel : createFieldLabel('代理地址')
		}, {
			xtype : 'radiogroup',
			fieldLabel : '授权类型',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '授权访问',
				name : 'isAuth',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '公开',
				name : 'isAuth',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '记录日志',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '记录',
				name : 'writeLog',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '不记录',
				name : 'writeLog',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '状态',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '启用',
				name : 'routeStatus',
				inputValue : '1'
			}, {
				boxLabel : '禁用',
				name : 'routeStatus',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'textarea',
			name : 'routeDesc',
			width : 240,
			anchor : '89% 20%',
			fieldLabel : '服务描述'
		}, {
			xtype : 'hidden',
			name : 'routeId'
		} ]
	});
	var url = getHandlerRequestUrl()
			+ "serviceInfoHandler/getServiceInfoDetails?routeId=" + routeId;
	var win = new Ext.Window({
		layout : 'fit',
		width : 450,
		height : 510,
		title : '服务详情',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ form ],
		buttons : [
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function() {
						win.close();
					}
				},
				{
					text : '修改',
					iconCls : 'icon_save',
					handler : function() {
						var url1 = getHandlerRequestUrl()
								+ "serviceInfoHandler/editServiceInfo";
						submitForm(form, url1, "", function() {
							Ext.Msg.alert('提示', "修改成功", function() {
								win.close();
								var grid = Ext.getCmp("serviceGrid");
								grid.getSelectionModel().clearSelections();
								grid.getStore().reload();
							});
						});
					}
				}, {
					text : '重置',
					iconCls : 'icon_reset',
					handler : function() {
						form.form.reset();
					}
				} ]

	});
	win.show();
	loadForm(form, url, "");
}
function addService() {
	var form = new Ext.FormPanel({
		labelSeparator : "：",
		frame : true,
		border : false,
		autoHeight : true,
		buttonAlign : 'center',
		id : 'register_service_form',
		bodyStyle : 'padding:5px 5px 5px 30px',
		items : [ new Ext.form.ComboBox({
			allowBlank : false,
			mode : 'local',
			hiddenName : 'routeType',
			width : 240,
			store : new Ext.data.SimpleStore({
				fields : [ 'key', 'value' ],
				data : [ [ 'HTTP', 'http' ], [ 'SOAP', 'soap' ] ]
			}),
			triggerAction : 'all',
			displayField : 'key',
			valueField : 'value',
			forceSelection : true,
			value : 'http',
			resizable : true,
			typeAhead : true,
			handleHeight : 10,
			fieldLabel : '&nbsp;&nbsp;协议'
		}), {
			xtype : 'textfield',
			name : 'routeName',
			emptyText : '服务名称，如:人口查询服务',
			width : 240,
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 100,
			maxLengthText : "服务名称最大不能超过100个字符！",// 提示文本
			allowBlank : false,
			blankText : '请输入服务名称',
			fieldLabel : createFieldLabel('服务名称')
		}, createOrgComboxTree("dfjjk","SPS_ORG_ID_VALUE"), {
			xtype : 'textfield',
			name : 'publishURL',
			emptyText : '发布地址,如:query/test(不带URL前缀)',
			width : 240,
			regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText : "有非法字符或空格",
			maxLength : 512,
			maxLengthText : "发布地址最大长度不能超过512个字符",// 提示文本
			allowBlank : false,
			blankText : '请输入发布地址 ',
			fieldLabel : createFieldLabel('发布地址')
		}, {
			xtype : 'radiogroup',
			fieldLabel : '&nbsp;&nbsp;动态匹配',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '是',
				name : 'matchOnUriPrefix',
				inputValue : '1'

			}, {
				boxLabel : '否',
				name : 'matchOnUriPrefix',
				inputValue : '0',
				checked : true
			}

			]
		}, {
			xtype : 'textarea',
			name : 'prxoyURL',
			width : 240,
			anchor : '89% 20%',
			maxLength : 512,
			maxLengthText : "代理地址最大长度不能超过512个字符",// 提示文本
			allowBlank : false,
			emptyText : '如:http://192.168.1.1:9090/test',
			vtype : 'url',
			blankText : '请输入代理地址 ',
			fieldLabel : createFieldLabel('代理地址')
		},

		{
			xtype : 'radiogroup',
			fieldLabel : '&nbsp;&nbsp;授权类型',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '授权访问',
				name : 'isAuth',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '公开',
				name : 'isAuth',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '&nbsp;&nbsp;记录日志',
			width : 240,
			columns : [ 120, 120 ],
			vertical : true,
			items : [ {
				boxLabel : '记录',
				name : 'writeLog',
				inputValue : '1',
				checked : true
			}, {
				boxLabel : '不记录',
				name : 'writeLog',
				inputValue : '0'
			}

			]
		}, {
			xtype : 'textarea',
			name : 'routeDesc',
			width : 240,
			anchor : '89% 20%',
			fieldLabel : '&nbsp;&nbsp;服务描述'
		}, {
			xtype : 'textfield',
			name : 'orgId',
			id : "SPS_ORG_ID_VALUE",
			hidden : true
		} ]
	});
	var win = new Ext.Window(
			{
				layout : 'fit',
				width : 450,
				height : 445,
				title : '服务注册',
				closeAction : 'close',
				plain : true,
				modal : true,
				resizable : true,
				buttonAlign : 'center',
				items : [ form ],
				buttons : [
						{
							text : '关闭',
							iconCls : 'icon_close',
							handler : function() {
								win.close();
							}
						},
						{
							text : '注册',
							iconCls : 'icon_save',
							handler : function() {
								var url = getHandlerRequestUrl()
										+ "serviceInfoHandler/registerRouteInfo?&serviceType=2&routeTypeId=2";
								submitForm(
										Ext.getCmp("register_service_form"),
										url,
										"注册服务异常",
										function() {
											Ext.Msg
													.alert(
															'提示',
															"服务注册成功",
															function() {
																var orgId = Ext
																		.getCmp(
																				"SPS_ORG_ID_VALUE")
																		.getValue();
																win.close();
																var grid = Ext
																		.getCmp("serviceGrid");
																grid.store.baseParams = {};
																grid
																		.getStore()
																		.reload(
																				{
																					params : {
																						provider : orgId,
																						start : 0,
																						limit : limit
																					}
																				});

															});

										});
							}
						}, {
							text : '重置',
							iconCls : 'icon_reset',
							handler : function() {
								form.getForm().reset();
							}
						} ]

			});
	win.show();
}
// 让combobox点选之后不隐藏
Ext.override(Ext.form.ComboBox, {
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
				.getAt(index);
		if (r) {
			this.onSelect(r, index);
		} else if (s.getCount() === 0) {
			this.collapse();
		}
		if (doFocus !== false) {
			this.el.focus();
		}
	}
});
function createOrgComboxTree(organizationNameId,value_text_id,value_default) {
	var createOrganizationComboxTree = new Ext.form.ComboBox({
		editable : false,
		store : new Ext.data.SimpleStore({
			fields : [ 'orgId', 'orgName' ],
			data : [ [] ]
		}),
		mode : 'local',
		triggerAction : 'all',
		fieldLabel : '&nbsp;&nbsp;所属机构',
		emptyText : '请选择机构',
		width : 240,
		value:value_default,
		allowBlank : false,
		blankText : '所属机构不能不为空',
		displayField : 'name',
		id : organizationNameId,
		hiddenName : 'orgName',
		heigth : 200,
		valueField : 'orgId',
		tpl : "<tpl for='.'><div style='height:200px'><div id='"
				+ organizationNameId + "tree3'></div></div></tpl>",
		selectedClass : '',
		onSelect : Ext.emptyFn
	});
	var root = new Ext.tree.AsyncTreeNode({
		text : orgRootName,
		draggable : false,
		id : orgRootId,
		heigth : 200,
		expanded : true,
		loader : new Ext.tree.TreeLoader({
			dataUrl : getHandlerRequestUrl()
					+ "orgInfoManagerHandler/getOrgInfoTree"
		})
	});
	var comboxTree = new Ext.tree.TreePanel({
		id : 'comboxOrganizationTree',
		animate : true,
		split : true,
		singleExpand : true,
		lines : false,
		autoScroll : true,
		root : root,
		width : 235,
		autoHeight : true
	});
	comboxTree.on('click', function(node) {
		createOrganizationComboxTree.setValue(node.attributes.text);
		createOrganizationComboxTree.collapse();// 隐藏树列表
		if(value_text_id){
			if (Ext.getCmp(value_text_id) != undefined) {
				Ext.getCmp(value_text_id).setValue(node.attributes.id);
			}
		}
		createOrganizationComboxTree.collapse();// 隐藏树列表
	}, this, {
		stopEvent : true
	});
	comboxTree.on('expandnode', function(node) {
	}, this, {
		stopEvent : true
	});
	createOrganizationComboxTree.on('expand', function() {
		comboxTree.render(organizationNameId + 'tree3');
	});

	return createOrganizationComboxTree;
}
/**
 * 搜索web服务
 */
function searchForWebService(flag) {
	var routeName = Ext.getCmp("serviceName_text_").getValue();
	var publishURL = "";
	var prxoyURL = "";
	routeType = "";
	if (flag == 1) {
		routeName = Ext.getCmp("routeNameForm").getValue();
		publishURL = Ext.getCmp("publishURLForm").getValue();
		prxoyURL = Ext.getCmp("prxoyURLForm").getValue();
		routeType = Ext.getCmp("routeTypeForm").getValue();
	}
	var grid = Ext.getCmp("serviceGrid");
	grid.store.reload({
		params : {
			routeName : routeName,
			publishURL : publishURL,
			prxoyURL : prxoyURL,
			routeType : routeType,
			start : 0,
			limit : limit
		}
	});
	grid.store.baseParams = {
		start : 0,
		routeName : routeName,
		publishURL : publishURL,
		prxoyURL : prxoyURL,
		routeType : routeType,
		limit : limit
	};
}
/**
 * 显示高级搜索窗口
 */
function showSearchForm() {
	var width = 230;
	var win = new Ext.Window({
		layout : 'fit',
		width : 400,
		height : 230,
		title : '高级搜索',
		closeAction : 'close',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		items : [ {
			xtype : 'form',
			id : 'gjForm',
			bodyStyle : 'padding:5px 10px 5px 30px',
			border : false,
			items : [
					{
						xtype : 'textfield',
						fieldLabel : '服务名称',
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
									searchForWebService(1);
								}
							},
							focus : function() {
								onFocusClear(this);
							}
						},
						width : width,
						emptyText : '输入包含服务名称的字符',
						id : 'routeNameForm'
					},
					{
						mode : 'local',
						xtype : 'combo',
						fieldLabel : '协议',
						store : new Ext.data.SimpleStore({
							fields : [ 'key', 'value' ],
							data : [ [ '全部', '' ], [ 'HTTP', 'http' ],
									[ 'SOAP', 'soap' ] ]
						}),
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
									searchForWebService(1);
								}
							}
						},
						triggerAction : 'all',
						displayField : 'key',
						valueField : 'value',
						value : "",
						width : width,
						forceSelection : true,
						resizable : true,
						typeAhead : true,
						handleHeight : 10,
						id : 'routeTypeForm'
					}, {
						xtype : 'textfield',
						fieldLabel : '发布地址',
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
									searchForWebService(1);
								}
							},
							focus : function() {
								onFocusClear(this);
							}
						},
						id : 'publishURLForm',
						emptyText : '输入包含发布地址的字符',
						width : width
					}, {
						xtype : 'textfield',
						fieldLabel : '代理地址',
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
									searchForWebService(1);
								}
							},
							focus : function() {
								onFocusClear(this);
							}
						},
						id : 'prxoyURLForm',
						emptyText : '输入包含代理地址的字符',
						width : width
					} ]
		} ],
		buttons : [ {
			text : '重置',
			handler : function() {
				Ext.getCmp("gjForm").getForm().rest();
			}
		}, {
			text : '搜索',
			handler : function() {
				searchForWebService(1);
			}
		} ]

	});
	win.show();
}