/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
var wallpaperStretch = false;
var wallpaper = 'wallpapers/Blue-Sencha.jpg';
var cookieWallpaper = Ext.util.Cookies.get("ext-wallpaper");
if (cookieWallpaper != null)
{
	var cookieWallpapers = cookieWallpaper.split(':');
	if (cookieWallpapers[1])
	{
		wallpaper = cookieWallpapers[1];
	}
}
var cookieWallpaperStretch = Ext.util.Cookies.get("ext-wallpaperStretch");
if (cookieWallpaperStretch != null)
{
	var cookieWallpaperStretches = cookieWallpaperStretch.split(':');
	if (cookieWallpaperStretches[1])
	{
		wallpaperStretch = cookieWallpaperStretches[1] == 1 ? true : false;
	}
}
Ext
		.define(
				'MyDesktop.App',
				{
					extend : 'Ext.ux.desktop.App',

					requires : [ 'Ext.window.MessageBox',

					'Ext.ux.desktop.ShortcutModel',

					'MyDesktop.SystemStatus',

					'MyDesktop.Settings' ],

					init : function()
					{
						this.callParent();

					},

					// 构建开始菜单和桌面快捷方式
					getModules : function()
					{
						return myArr;
					},

					getDesktopConfig : function()
					{
						var me = this, ret = me.callParent();

						return Ext.apply(ret,
						{
							// cls: 'ux-desktop-black',

							contextMenuItems : [
							{
								text : '设置',
								handler : me.onSettings,
								scope : me
							},
							{
								text : '全屏',
								handler : me.onFullScreen,
								id : 'btn_FullScreen',
								scope : me
							},
							{
								text : '刷新',
								handler : me.onRefurbish,
								scope : me
							},
							{
								text : '新建',
								scope : me,
								menu :
								{
									items : [
									{
										text : '文件夹',
										handler : me.newFolder,
										scope : me
									} ]
								},
								scope : me
							} ],
							// 构建桌面快捷方式
							shortcuts : Ext.create('Ext.data.Store',
							{
								model : 'Ext.ux.desktop.ShortcutModel',
								data : desktopArr
							}),

							wallpaper : wallpaper,
							wallpaperStretch : wallpaperStretch
						});
					},

					// config for the start menu
					getStartConfig : function()
					{
						var me = this, ret = me.callParent();
						return Ext.apply(ret,
						{
							title : '登录人:' + loginName,
							iconCls : 'user',
							height : 300,
							toolConfig :
							{
								width : 100,
								items : [
								{
									text : '设置',
									iconCls : 'settings',
									handler : me.onSettings,
									scope : me
								}, '-',
								{
									text : '修改密码',
									iconCls : 'updatePassword',
									handler : me.updatePwd,
									scope : me
								}, '-',
								{
									text : '经典模式',
									iconCls : 'mszh1',
									handler : me.onChangeModel,
									scope : me
								}, '-',
								{
									text : '退出',
									iconCls : 'logout',
									handler : me.onLogout,
									scope : me
								} ]
							}
						});
					},

					getTaskbarConfig : function()
					{
						var ret = this.callParent();

						return Ext.apply(ret,
						{
							trayItems : [
							{
								xtype : 'trayclock',
								flex : 1
							} ]
						});
					},
					updatePwd : function()
					{
						var pass1 = new Ext.form.TextField(
						{
							fieldLabel : '原始密码',
							inputType : 'password', // 密码框属性设置
							name : 'oldPassword',
							width : 300,
							allowBlank : false
						});

						var pass2 = new Ext.form.TextField(
						{
							fieldLabel : '新密码',
							maxLength : 33,
							width : 300,
							inputType : 'password', // 密码框属性设置
							name : 'newPassword',
							allowBlank : false
						});
						var pass3 = new Ext.form.TextField(
						{
							fieldLabel : '重复新密码',
							maxLength : 33,
							width : 300,
							inputType : 'password', // 密码框属性设置
							name : 'repeatPassword',
							allowBlank : false
						});
						// 修改密码panel
						var formPanel = new Ext.form.FormPanel(
						{
							border : false,
							bodyStyle : 'padding:15px 0px 0px 20px',
							frame : true,
							items : [ pass1, pass2, pass3 ]
						// 设置密码框
						});

						function getPass()
						{
							var password1 = pass1.getValue();
							password1 = password1.replace(/(^\s*)|(\s*$)/g, ""); // 去前后空格
							var password2 = pass2.getValue();
							password2 = password2.replace(/(^\s*)|(\s*$)/g, ""); // 去前后空格
							var password3 = pass3.getValue();
							password3 = password3.replace(/(^\s*)|(\s*$)/g, ""); // 去前后空格
							if (password2.length == 0)
							{
								Ext.Msg.alert("操作提示", "请输入新密码!");
								return false;
							}
							if (password3.length == 0)
							{
								Ext.Msg.alert("操作提示", "请输入重复新密码");
								return false;
							}
							if (password2 != password3)
							{
								Ext.Msg.alert("操作提示", "两次输入的新密码不一致,请重新输入!");
								return false;
							}
							Ext.Msg
									.confirm(
											'提示',
											"确定要修改密码?",
											function(id, text)
											{
												if (id == "yes")
												{
													var submitUrl = contextPath
															+ "/app/http/aip/userInfoManagerHandler/editUserPassword";
													var message = "修改密码失败";
													formPanel.form
															.submit(
															{
																clientValidation : true, // 进行客户端验证
																waitMsg : '正在提交数据请稍后', // 提示信息
																waitTitle : '提示', // 标题
																url : submitUrl,
																method : 'POST', // 请求方式
																success : function(
																		form,
																		action)
																{
																	updateCallbak();
																},
																failure : function(
																		form,
																		action)
																{ // 加载失败的处理函数
																	if (action.response != null)
																	{
																		var result = Ext.JSON.decode(action.response.responseText);
																		Ext.Msg
																				.alert(
																						'提示',
																						message
																								+ "异常代码："
																								+ result.msg);
																	} else
																	{
																		Ext.Msg
																				.alert(
																						"提示",
																						"有必填项！");
																	}
																}
															});
												} else if (id == "no")
												{
													Ext.getCmp("updatePWDWin")
															.close();
												}

											});
							function updateCallbak()
							{
								Ext.Msg.alert("提示", "修改密码成功");
								Ext.getCmp("updatePWDWin").close();
							}
						}

						var win = new Ext.Window(
						{
							layout : 'fit',
							closeAction:'close',
							resizable : false,
							frame : false,
							id : 'updatePWDWin',
							width : 400,
							height : 200,
							bodyStyle : 'padding:5 5 5 5',
							shadow : true,
							title : '修改密码',
							modal : true,
							closable : true,
							buttonAlign : 'center',
							items : [ formPanel ],
							buttonAlign : "center",
							buttons : [
							{
								text : "修改密码",
								listeners :
								{
									click : function()
									{
										getPass();
									}
								}
							},
							{
								text : "重置",
								handler : function()
								{
									formPanel.form.reset();
								}
							} ]
						});
						win.show();
					},
					newFolder : function()
					{
						var win = new Ext.Window(
						{
							layout : 'fit',
							closeAction : 'destroy',
							resizable : false,
							frame : false,
							id:'xxWin_',
							width : 400,
							height :180,
							border:false,
							shadow : true,
							title : '新建文件夹',
							modal : true,
							closable : true,
							animCollapse : true,
							items : [
							{
								xtype : 'form',
								frame : true,
								labelWidth:200,
								id:'folderForm',
								bodyStyle : 'padding:30 5 5 20',
								border:false,
								items : [
								{
									fieldLabel:'请输入文件夹名称',
									xtype : 'textfield',
									value:'新建文件夹',
									name:'folderName',
									id:'xxx_xxx',
									allowBlank : false,
									blankText : '请输入服务名称',
									width:330
								} ]
							} ],
							buttonAlign : "center",
							buttons : [
							{
								text : "确定",
								handler:function()
								{
									
									var url=getContextPath();
									url=url + "app/http/ums/userFolderHandler/newFolder";
									var form=Ext.getCmp("folderForm");
									form.form
									.submit({
										clientValidation : true, // 进行客户端验证
										waitMsg : '正在提交数据请稍后', // 提示信息
										waitTitle : '提示', // 标题
										url : url,
										method : 'POST', // 请求方式
										success : function(form, action) {
											//document.location.href = "index.jsp?loginModel=desktop_model";
											//return;
											var result = Ext.JSON.decode(action.response.responseText)
											Ext.getCmp("desktopMainPannelDiv").getStore().insert(0,result.data);
											
									         var btnHeight =64;
									         var btnWidth =64;
									         var btnPadding =30;
									         var col ={index :1,x : btnPadding};
									         var row ={index :1,y : btnPadding};
									         var bottom;
									         var numberOfItems =0;
									         var taskBarHeight = Ext.query(".ux-taskbar")[0].clientHeight +40;
									         var bodyHeight = Ext.getBody().getHeight()- taskBarHeight;
									         var items = Ext.query(".ux-desktop-shortcut");
									        for(var i =0, len = items.length; i < len; i++){
									             numberOfItems +=1;
									             bottom = row.y + btnHeight;
									             if(((bodyHeight < bottom)?true:false)&& bottom >(btnHeight + btnPadding)){
									                 numberOfItems =0;
									                 col ={index : col.index++,x : col.x + btnWidth + btnPadding};
									                 row ={index :1,y : btnPadding};
									             }

									             Ext.fly(items[i]).setXY([col.x, row.y]);
									             row.index++;
									             row.y = row.y + btnHeight + btnPadding;
									         }
									        Ext.getCmp("xxWin_").destroy();
										},
										failure : function(form, action) { // 加载失败的处理函数
											var result = Ext.JSON.decode(action.response.responseText);
											Ext.Msg.alert('提示',result.msg);
										}
									});
								}
							} ]
						});
						win.show();
					},
					onLogout : function()
					{
						Ext.Ajax.request(
						{
							url : contextPath
									+ "/app/http/rdp/loginHandler/loginOut",
							method : 'POST',
							success : function(response, options)
							{

								var result = Ext.decode(response.responseText);
								if (result.success)
								{
									// window.close(); //先关闭老的窗口
									document.location.href = contextPath
											+ "/index.jsp";
									// window.open(contextPath+"/index.jsp");
								} else
								{
									if("用户会话已过期"==result.msg)
									{
										document.location.href = contextPath
										+ "/index.jsp";
										return;
									}
									Ext.Msg.alert('提示', "异常码：" + result.msg);
								}
							},
							failure : function(response, options)
							{
								var result = Ext.decode(response.responseText);
								Ext.Msg.alert('提示', "异常码：" + result.data);
							}
						});

					},
					onChangeModel : function()
					{
						document.location.href = "index.jsp?loginModel=classics_model";
					},
					onSettings : function()
					{
						var dlg = new MyDesktop.Settings(
						{
							desktop : this.desktop
						});
						dlg.show();
					},
					// 刷新桌面
					onRefurbish : function()
					{
						location.reload();
					},
					onExitFullScreen : function()
					{

						btnObject.setHandler(onFullScreen);

						btnObject.setText("全屏");

					},
					onFullScreen : function()
					{
						if (window.fullScreenApi.supportsFullScreen)
						{
							var btnObject = Ext.getCmp("btn_FullScreen");
							if (window.fullScreenApi.isFullScreen())
							{
								btnObject.setText("全屏");
								window.fullScreenApi.cancelFullScreen();
							} else
							{

								btnObject.setText("退出全屏");
								window.fullScreenApi
										.requestFullScreen(document.body);

							}
						} else
						{
							Ext.Msg.alert("提示", "您的浏览器不支持全屏");
							// window.open(document.location, 'big',
							// 'fullscreen=yes');
							// window.opener = null
							// window.open("", "_self")
							// window.close();
						}

					}
				});
