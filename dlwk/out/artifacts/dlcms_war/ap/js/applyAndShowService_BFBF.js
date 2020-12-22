// 拼装返回的URL地址
var returnUrl ;
//申请服务的请求URL地址
var requestUrl ;
//获取resultTable表格中全部被选中的记录
var record ;
//服务申请提交确认表单
var serviceApplyInfoForm ;
//服务申请提交确认窗口
var serviceApplyInfoWin ;
function applySrvice() {
	returnUrl = parent.location.href;
	requestUrl = "../../serviceApply.jspx";
	// var requestUrl = locatiolUrl + "/rdplogin.jspx" ;
	record = Ext.getCmp("resultTable").getSelectionModel().getSelections();
	if (record.length <= 5 && record.length > 0) {
		affirm_applyinfo(record) ;
	} else {
		var msg = "";
		if (record.length == 0) {
			msg = "请选择需要申请的服务";
		} else {
			msg = "一次最多提交5个服务申请！";
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

// 显示“我的服务列表”页面
function showMyServ(buttonId, text, opt) {
	if (buttonId == "yes") {
		toMyServPage();
	}
}

function toMyServPage() {
	window.open("../../myService/index.jhtml", "_blank");
}

//提交之前弹窗，展示提交详细信息
function affirm_applyinfo(record){
	serviceApplyInfoForm = new Ext.FormPanel(
			{
				labelSeparator : "：",
				frame : false,
				id : "serviceApplyInfoForm",
				width : 360,
				border : false,
				buttonAlign : 'center',
				autoHeight : true,
				items : [
					        {
								xtype : 'textarea',
								width : 330,
								height : 100,
								allowBlank : false,
								blankText : '申请列表',
								name : 'SERVICENAME',
								id : 'SERVICENAME',
								readOnly : true,
								fieldLabel : '服务名称',
								disabled:true
							},
							{
								xtype : 'textfield',
								width : 330,
								allowBlank : false,
								blankText : '申请人',
								name : 'APPLYNAME',
								id : 'APPLYNAME',
								readOnly : true,
								fieldLabel : '申请人',
								value: parent.rdpUserName,
								disabled:true
							},
							{
								xtype : 'textfield',
								width : 330,
								allowBlank : false,
								blankText : '申请机构',
								readOnly : true,
								name : 'APPLYORG',
								id : 'APPLYORG',
								fieldLabel : '申请机构',
								value: parent.rdpUserOrg
							},
							{
								xtype : 'textfield',
								width : 330,
								allowBlank : false,
								blankText : '请输入电话号码',
								name : 'PHONENUMBER',
								id : 'PHONENUMBER',
								fieldLabel : '联系电话',
								value: parent.rdpPhoneNumber
							},
							{
								xtype : 'textarea',
								width : 330,
								height : 140,
								name : 'APPLYUSE',
								id : 'APPLYUSE',
								allowBlank : false,
								blankText : '请输入申请说明',
								fieldLabel : '申请说明'
							} ],
				buttons : [
						{
							text : '重置',
							iconCls : 'icon_reset',
							handler : function()
							{
								serviceApplyInfoForm.form.reset();
							}
						},
						{
							text : '提交',
							iconCls : 'icon_save',
							handler : function()
							{
								submitServApply(record);
							}
						} ]
			});
	
	var servicenameList = "" ;
	for(var i = 0; i < record.length; i++){
		servicenameList += (i+1) + "、" + record[i].data.serviceName + "\n" ;
	}
	Ext.getCmp("SERVICENAME").value = servicenameList ;
	
	serviceApplyInfoWin = new Ext.Window(
			{
				layout : 'fit',
				id : 'serviceApplyInfoWin',
				closeAction : 'close',
				resizable : false,
				width : 500,
				height :410,
				shadow : true,
				title : '服务申请',
				modal : true,
				closable : true,
				animCollapse : true,
				items:[serviceApplyInfoForm]
			});
	Ext.getCmp('serviceApplyInfoWin').show().center();
}

function submitServApply(record){
	var applyServParameter = serviceApplyInfoForm.getForm().getValues() ;
	//	alert(serviceApplyInfoForm.PHONENUMBER.validate()) ;
	//	return;
	// 拼装需要提交申请的服务ID
	var servIdArray = "[";
	for ( var i = 0; i < record.length; i++) {
		if (i == 0) {
			servIdArray += "'" + record[i].data.serviceId + "'";
		} else {
			servIdArray += ",'" + record[i].data.serviceId + "'";
		}
	}
	servIdArray += "]";
	
	//判断申请的电话号码、机构、申请原因三项不能为空
	if(!parent.Cms.isNotBlank(applyServParameter.PHONENUMBER, applyServParameter.APPLYORG, applyServParameter.APPLYUSE)) return;
	// AJAX请求地址
	$.post(requestUrl, {
		"servIdArray" : servIdArray,
		"returnUrl" : returnUrl,
		"phoneNumber" : applyServParameter.PHONENUMBER,
		"applyOrg" : applyServParameter.APPLYORG,
		"applyUse" : applyServParameter.APPLYUSE
	}, function(data) {
		//关闭弹出窗口
		serviceApplyInfoWin.close() ;
		// 如果传回的是HTML代码
		try {
//		if(data.length < 3000){
//			data = JSON.parse(data);//IE8及以下不支持此函数
			data = eval("(" + data + ")") ;
			if (data.success == undefined) {
				if (data.count == record.length) {
					Ext.MessageBox.show({
						title : '申请提示',
						width : 200,
						msg : '成功申请 ' + data.count + " 个服务",
						buttons : {
							'ok' : '确定',
							'yes' : '我的服务列表' // 查看"我的服务列表"
						},
						animEl : 'applyrdpserv',
						fn : showMyServ
					});
					//刷新列表
					resultStore.reload() ;
				} else {
					var faliedReason = "";
					var faliedReasonArr = data.list;
					for ( var i = 0; i < faliedReasonArr.length; i++) {
						 var jsonStr = "{" + faliedReasonArr[i] + "}";
						 var json = eval("(" + jsonStr + ")");
//						var json = faliedReasonArr[i];// 删
						faliedReason += (i + 1) + "、"
								+ (json.name + ": " + json.reason) + "\n";
					}
					Ext.MessageBox.show({
						title : '服务申请结果',
						msg : '申请结果:成功 ' + data.count + "个,失败: "
								+ (record.length - data.count)
								+ "个。<br/>失败原因：",
						// icon : Ext.MessageBox.WARNING ,
						width : 450,
						buttons : {
							'ok' : '确定',
							'yes' : '我的服务列表'
						},
						value : faliedReason,
						multiline : true,
						animEl : 'applyrdpserv',
						fn : showMyServ
					// 查看"我的服务列表"
					});
					//刷新列表
					resultStore.reload() ;
				}
			}else if(data.status == "0"){
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "请先登陆！",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			}else if(data.status == "3"){
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "当前登陆用户不能提交申请!",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			}else if(data.status == "1"){
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "通讯异常,请稍候再试!",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			}else if(data.status == "2"){
				Ext.MessageBox.show({
					title : '申请提示',
					msg : "访问RDP平台失败",
					buttons : {
						ok : '确定'
					},
					animEl : 'applyrdpserv'
				});
			}
		}
//		}else{
//			 parent.document.body.innerHTML = data;
//		}
		catch (e) {
			 parent.document.body.innerHTML = data + '';
		}
	});
}
