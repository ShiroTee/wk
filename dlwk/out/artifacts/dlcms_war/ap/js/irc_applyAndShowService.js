// 拼装返回的URL地址
var returnUrl;
// 申请服务的请求URL地址
var requestUrl;
// 获取resultTable表格中全部被选中的记录
var record;
// 服务申请提交确认表单
var serviceApplyInfoForm;
// 服务申请提交确认窗口
var serviceApplyInfoWin;
// 检测用户当前是否登陆
var isLoginURL = "/rdpAct/checkLogin.jspx";
//	每次最多可提交个数
var max_submit = 10;

function applySrvice() {
	returnUrl = parent.location.href;
	requestUrl = "../../IRCServiceApply.jspx";
	// var requestUrl = locatiolUrl + "/rdplogin.jspx" ;
//	record = Ext.getCmp("resultTable").getSelectionModel().getSelections();
	record = parent.allSelectArray ;
	// 提交申请之前的验证
	$.post(isLoginURL, function(data) {
		data = eval("(" + data + ")");
		if (!data.success) {
			if (data.status == 3) {
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "当前登陆用户不能提交申请!",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
				return;
			} else if (data.status == 0) {
				parent.onLoginWindow('http://'+window.location.host);
				//parent.loginDialog_open();
				//window.parent.location.href='../../../rdplogin.jspx';
				return;
			}
		} else {
			if (record.length <= max_submit && record.length > 0) {
				affirm_applyinfo(record);
			} else {
				var msg = "";
				if (record.length == 0) {
					msg = "请选择需要申请的项";
				} else {
					msg = "一次最多提交" + max_submit + "个申请！";
				}
				Ext.MessageBox.show({
					title : '申请提示',
					msg : msg,
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			}
		}
	});

}

// 显示“我的服务列表”页面
function showMyServ(buttonId, text, opt) {
	if (buttonId == "yes") {
		toMyServPage();
	}
}

function toMyServPage() {
	$.post(isLoginURL, function(data) {
		data = eval("(" + data + ")");
		if (!data.success) {
			if (data.status == 3) {
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "当前登陆用户非服务平台用户,无申请列表!",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			} else if (data.status == 0) {
				parent.onLoginWindow('http://'+window.location.host);
				//parent.loginDialog_open();
				//window.parent.location.href='../../../rdplogin.jspx';
			}
		} else {
			window.open("../../myService/index.jhtml", "_blank");
		}
	});
}

// 提交之前弹窗，展示提交详细信息
function affirm_applyinfo(record) {
	serviceApplyInfoForm = new Ext.FormPanel({
		labelSeparator : "：",
		frame : false,
		id : "serviceApplyInfoForm",
		width : 360,
		border : false,
		buttonAlign : 'center',
		autoHeight : true,
		items : [ {
			xtype : 'textarea',
			width : 330,
			height : 100,
			allowBlank : false,
			blankText : '申请列表不能为空',
			name : 'SERVICENAME',
			id : 'SERVICENAME',
			readOnly : true,
			fieldLabel : '申请列表'
		}, {
			xtype : 'textfield',
			width : 330,
			allowBlank : false,
			blankText : '申请人',
			name : 'APPLYNAME',
			id : 'APPLYNAME',
			readOnly : true,
			fieldLabel : '申请人',
			value : parent.rdpUserName
		}, {
			xtype : 'textfield',
			width : 330,
			allowBlank : false,
			blankText : '申请机构不能为空',
			readOnly : true,
			name : 'APPLYORG',
			id : 'APPLYORG',
			fieldLabel : '申请机构',
			value : parent.rdpUserOrg
		}, {
			xtype : 'textfield',
			width : 330,
			allowBlank : false,
			blankText : '请输入电话号码',
			name : 'PHONENUMBER',
			id : 'PHONENUMBER',
			fieldLabel : '联系电话<font color=#F77002 style="position:relative; top:3px;">*</font>',
			value : parent.rdpPhoneNumber
		}, {
			xtype : 'textarea',
			width : 330,
			height : 140,
			name : 'APPLYUSE',
			id : 'APPLYUSE',
			allowBlank : false,
			blankText : '请输入申请说明',
			fieldLabel : '申请说明<font color=#F77002 style="position:relative; top:3px;">*</font>'
		} ],
		buttons : [ {
			text : '提交',
			iconCls : 'icon_save',
			handler : function() {
				submitServApply(record);
			}
		},{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				serviceApplyInfoForm.form.reset();
			}
		} ]
	});

	var servicenameList = "";
	for ( var i = 0; i < record.length; i++) {
		servicenameList += (i + 1) + "、" + record[i].data.text + "\n";
	}
	Ext.getCmp("SERVICENAME").value = servicenameList;
	// record[0].data.serviceName + "\n",

	serviceApplyInfoWin = new Ext.Window({
		layout : 'fit',
		id : 'serviceApplyInfoWin',
		closeAction : 'close',
		resizable : false,
		width : 500,
		autoHeight : true,
		shadow : true,
		title : '资源申请',
		modal : true,
		closable : true,
		animCollapse : true,
		items : [ serviceApplyInfoForm ]
	});
	Ext.getCmp('serviceApplyInfoWin').show().center();
	$(window.parent.document.documentElement).animate({scrollTop:100}, 'fast',function(){
		//屏幕滚动完成后，判断“电话号码”、“申请说明”是否为空，将焦点设置在为空对象区域上。
		parent.Cms.isNotBlank(Ext.getCmp('PHONENUMBER').getValue()) ? Ext.getCmp('APPLYUSE').focus() : Ext.getCmp('PHONENUMBER').focus() ;
	});	//显示弹出窗口后，自动让浏览器滚动条下滑100的距离
}

function submitServApply(record) {
	var applyServParameter = serviceApplyInfoForm.getForm().getValues();
	// alert(serviceApplyInfoForm.PHONENUMBER.validate()) ;
	// return;
	// 拼装需要提交申请的服务ID
	var servIdArray = "[";
	for ( var i = 0; i < record.length; i++) {
		if (i == 0) {
			servIdArray += "'" + record[i].data.id + "'";
		} else {
			servIdArray += ",'" + record[i].data.id + "'";
		}
	}
	servIdArray += "]";
	
	// 拼装需要提交申请的服务名称
	var servNameArray = "[";
	for ( var i = 0; i < record.length; i++) {
		if (i == 0) {
			servNameArray += "'" + record[i].data.text + "'";
		} else {
			servNameArray += ",'" + record[i].data.text + "'";
		}
	}
	servNameArray += "]";

	// 判断申请的电话号码、机构、申请原因三项不能为空
	if (!parent.Cms.isNotBlank(applyServParameter.PHONENUMBER,
			applyServParameter.APPLYORG, applyServParameter.APPLYUSE))
		return;
	// AJAX请求地址
	var msgTip = Ext.MessageBox.show({
		title:"提交申请",
        msg:"请稍候,正在提交申请...",
        progress:true,
        width:300,
        wait:true,
        waitConfig:{interval:600},	//0.6进度条自动加载一定长度
        colsable:true
	});

	$.post(requestUrl, {
		"servIdArray" : servIdArray,
		"servNameArray" : servNameArray,
		"returnUrl" : returnUrl,
		"phoneNumber" : applyServParameter.PHONENUMBER,
		"applyOrg" : applyServParameter.APPLYORG,
		"applyUse" : applyServParameter.APPLYUSE
	}, function(data) {
		// 关闭弹出窗口
		serviceApplyInfoWin.close();
		msgTip.hide() ;
		// 如果传回的是HTML代码
		try {
			// if(data.length < 3000){
			// data = JSON.parse(data);//IE8及以下不支持此函数
			data = eval("(" + data + ")");
			if (data.success) {
				if (data.count == record.length) {
					Ext.MessageBox.show({
						title : '申请提示',
						width : 200,
						msg : "成功申请 " + data.count + " 个服务",
						buttons : {
							'ok' : '确定',
							'yes' : '我的申请' // 查看"我的申请"
						},
						animEl : 'applyrdpserv',
						fn : showMyServ
					});
					// 刷新列表
					resultStore.reload();
				} else {
					var faliedReason = "";
					var faliedReasonArr = data.list;
					for ( var i = 0; i < record.length - data.count; i++) {
						var jsonStr = "{" + faliedReasonArr[i] + "}";
						var json = eval("(" + jsonStr + ")");
						// var json = faliedReasonArr[i];// 删
						faliedReason += (i + 1) + "、"
								+ (json.name + ": " + json.reason) + "\n";
					}
					Ext.MessageBox
							.show({
								title : '申请结果',
								msg : '申请结果:成功 ' + data.count + "个,失败: " + (record.length - data.count) + "个。<br/>失败原因：",
								//msg : '申请失败:其中有' + (record.length - data.count) + '个资源已被申请。<br/>失败原因：',
								icon : Ext.MessageBox.WARNING ,
								width : 450,
								buttons : {
									'ok' : '确定',
									'yes' : '我的申请'
								},
								value : faliedReason,
								multiline : true,
								animEl : 'applyrdpserv',
								fn : showMyServ
							// 查看"我的服务列表"
							});
					// 刷新列表
					resultStore.reload();
				}
				//申请请求成功返回后，清空父级保存用户所选择的项变量。
				parent.allSelectArray = [] ;
			} else if (data.status == "0") {
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "请先登陆！",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			} else if (data.status == "3") {
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "当前登陆用户不能提交申请!",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			} else if (data.status == "1") {
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "通讯异常,请稍候再试!",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			} else if (data.status == "2") {
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "提交申请失败",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			}
		}
		// }else{
		// parent.document.body.innerHTML = data;
		// }
		catch (e) {
			//parent.document.body.innerHTML = data + '';
		}
	});
}
