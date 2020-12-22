 Ext.Ajax.timeout = 3600000;
Ext.form.Field.prototype.msgTarget = 'custom';
//选择模型
 var sm =  new Ext.grid.CheckboxSelectionModel ({checkOnly :true});
 //行号模型
 var rn = new Ext.my.RowNumberer();
 
	var blankData = {
		'totalCount' : '0',
		'data' : []
	};	
//发送数据方法
function postData(form,url, datas,refresh,pagingToolbar) {
		form.getForm().submit({
					clientValidation : true,
					url : url,
					baseParams : datas,
					method : 'POST',
					waitMsg : '处理数据中...',
					success : function(form, action) {
						Ext.MessageBox.show( {
											title : '成功',
											msg : action.result.msg,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO,
											fn:function(){if(refresh){pagingToolbar.doRefresh();}}
										});
						
					},
					failure : function(form, action) {
//						alert(action.response.responseText);
						if(action.failureType==undefined){
							Ext.MessageBox.show( {
											title : '错误',
											msg : Ext.isEmpty(action.result)? Ext.isEmpty(action.response)?"数据异常或连接异常!":action.response.responseText:action.result.msg,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							
						}
						switch (action.failureType) {
							case Ext.form.Action.CLIENT_INVALID :
							Ext.MessageBox.show( {
											title : '错误',
											msg : Ext.isEmpty(action.result)? Ext.isEmpty(action.response)?"数据异常或连接异常!":action.response.responseText:action.result.msg,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								
								break;
							case Ext.form.Action.CONNECT_FAILURE :
							Ext.MessageBox.show( {
											title : '错误',
											msg : Ext.isEmpty(action.result)? Ext.isEmpty(action.response)?"数据异常或连接异常!":action.response.responseText:action.result.msg,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								
								break;
							case Ext.form.Action.SERVER_INVALID :
							Ext.MessageBox.show( {
											title : '错误',
											msg : Ext.isEmpty(action.result)? Ext.isEmpty(action.response)?"数据异常或连接异常!":action.response.responseText:action.result.msg,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR,
											fn:function(){
												if(!Ext.isEmpty(action.result)){
													form.markInvalid(action.result.errors);
												}
											}
										});
						}
					}
				});
	};