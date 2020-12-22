/**
 * 登陆页面
 * 
 * @author XiongChun
 * @since 2010-01-13
 */
Ext.onReady(function() {
	if(!getCookie('g4.login.model'))
	{
		setCookie("g4.login.model","", 240);
	}
	var panel = new Ext.Panel({
		el : 'hello-tabs',
		autoTabs : true,
		deferredRender : false,
		border : false,
		items:[{
				xtype : 'form',
				id : 'loginForm',
				height:300,
				bodyStyle:'padding-top:40px;padding-left:20px;',
				defaultType : 'textfield',
				
				labelWidth : 60,
				labelSeparator : '：',
				items : [{
							fieldLabel : '帐&nbsp;号',
							name : 'loginName',
							id : 'account',
							value:getCookie('g4.login.account'),
							width:260,
							blankText : '帐号不能为空,请输入!',
							maxLength : 30,
							maxLengthText : '账号的最大长度为30个字符',
							allowBlank : false,
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										Ext.getCmp('password').focus();
									}
								}
							}
						}, {
							fieldLabel : '密&nbsp;码',
							name : 'loginPassword',
							id : 'password',
							width:260,
							inputType : 'password',
							blankText : '密码不能为空,请输入!',
							maxLength : 20,
							maxLengthText : '密码的最大长度为20个字符',
							allowBlank : false,
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										login(field.getValue());
									}
								}
							}
						},{
							xtype:'hidden',
							id:'loginModel',
							name:'loginModel',
							value:getCookie('g4.login.model')!=""?getCookie('g4.login.model'):"desktop_model"
						}]
			}]
	});
	// 清除按钮上下文菜单
	var mainMenu = new Ext.menu.Menu({
				id : 'mainMenu',
				items : [{
					text : '清除记忆',
					iconCls : 'status_awayIcon',
					handler : function() {
						clearCookie('g4.login.account');
						
						clearCookie('g4.login.model');
						var account = Ext.getCmp('loginForm')
								.findById('account');
						Ext.getCmp('loginForm').form.reset();
						account.setValue('');
						account.focus();
					}
				}, {
					text : '桌面模式',
					iconCls : 'imageIcon',
					 checked: getCookie('g4.login.model')=="desktop_model"||getCookie('g4.login.model')==""?true:false,  
					 group: 'loginModel',  
					 checkHandler:function(item)
						{
						 Ext.getCmp("loginModel").setValue("desktop_model");
						}
				}, {
					text : '经典模式',
					iconCls : 'imageIcon',
					checked: getCookie('g4.login.model')=="classics_model"?true:false,  
					group: 'loginModel',  
					checkHandler:function(item)
					{
						 Ext.getCmp("loginModel").setValue("classics_model");
					}
				}]
			});

	var win = new Ext.Window({
		title : '应用集成平台',
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 460,
		height : 300,
		plain : true,
		modal : true,
		titleCollapse : true,
		maximizable : false,
		draggable : false,
		closable : false,
		resizable : false,
		animateTarget : document.body,
		items : panel,
		buttons : [{
			text : '&nbsp;登录',
			iconCls : 'acceptIcon',
			handler : function() {
				if (Ext.isIE) {
					login();
				} else {
					login();
				}
			}
		}, {
			text : '&nbsp;选项',
			iconCls : 'tbar_synchronizeIcon',
			menu : mainMenu
		}]
	});

	win.show();

	win.on('show', function() {
		setTimeout(function() {
					var account = Ext.getCmp('loginForm').findById('account');
					var password = Ext.getCmp('loginForm').findById('password');
					var c_account = getCookie('g4.login.account');
					account.setValue(c_account);
					if (Ext.isEmpty(c_account)) {
						account.focus();
					} else {
						password.focus();
					}
				}, 200);
	}, this);
	/**
	 * 提交登陆请求
	 */
	function login(LKey) {
		alert(LKey)
	}


});
/**
 * 设置Cookie
 * 
 * @param {} name
 * @param {} value
 */
function setCookie(name, value, minuts) {
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
    var expiration = new Date((new Date()).getTime() + minuts * 60000 * 60);
	document.cookie = name
			+ "="
			+ escape(value)
			+ "; expires=" + expiration
					.toGMTString();
}
/**
 * 获取Cookie
 * 
 * @param {} Name
 * @return {}
 */
function getCookie(Name) {
	var search = Name + "="
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		if (offset != -1) {
			offset += search.length
			end = document.cookie.indexOf(";", offset)
			if (end == -1)
				end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		} else
			return ""
	}
}
/**
 * 从缓存中清除Cookie
 * 
 * @param {} name
 */
function clearCookie(name) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
	setCookie(name, "", expdate);
}
