Ext.onReady(init);
function init()
{
	var uKeyLabel = "<font color='white'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请先把优KEY察至电脑USB接口上</font></br>&nbsp;";
	uKeyLabel = uKeyLabel
			+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='red'>未找到优KEY或未插好优KEY</font>";
	var form=new Ext.FormPanel(
			{
				id : 'loginForm',
				bodyStyle : "background:url(../images/newmain/login_n/bg02.png) no-repeat;padding-top:150px;padding-left:270px;",
				defaultType : 'textfield',
				labelWidth : 70,
				labelSeparator : '<font color="white">：</font>',
				border : false,
				applyTo : 'login_n_bg02',
				width : 627,
				listeners:{
					render:function()
					{
						
						setTimeout(function(){
							if(!getCookie('g4.login.account')||""==getCookie('g4.login.account'))
							{
								var account = Ext.getCmp('loginForm').findById('account');
								account.focus();
							}
							else
							{
								Ext.getCmp("password").focus();
							}
						},200)
						
					}
				},
				items :
				[

						{
							fieldLabel : '<font color="white">帐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</font>',
							name : 'loginName',
							id : 'account',
							width : 200,
							tabIndex:1,
							blankText : '帐号不能为空,请输入!',
							maxLength : 30,
							maxLengthText : '账号的最大长度为30个字符',
							value : getCookie('g4.login.account'),
							allowBlank : false,
							listeners :
							{
								specialkey : function(field, e)
								{
									if (e.getKey() == Ext.EventObject.ENTER)
									{
										// Ext.getCmp('password').focus();
									}
								}
							}
						},
						{
							fieldLabel : '<font color="white">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</font>',
							name : 'loginPassword',
							id : 'password',
							width : 200,
							tabIndex:2,
							inputType : 'password',
							blankText : '密码不能为空,请输入!',
							maxLength : 20,
							maxLengthText : '密码的最大长度为20个字符',
							allowBlank : false,
							listeners :
							{
								specialkey : function(field, e)
								{
									if (e.getKey() == Ext.EventObject.ENTER)
									{
										login_(field.getValue());
									}
								}
							}
						},
						{
							xtype : 'label',
							id : 'UKey',
							html : uKeyLabel,
							hidden : true
						},
						{
							xtype : 'combo',
							tabIndex:3,
							fieldLabel : '<font color="white">登录模式</font>',
							allowBlank : false,
							mode : 'local',
							hiddenName : 'routeType',
							id : 'loginModel',
							width : 200,
							store : new Ext.data.SimpleStore(
							{
								fields :
								[ 'key', 'value' ],
								data :
								[
								[ '桌面模式', 'desktop_model' ],
								[ '经典模式', 'classics_model' ] ]
							}),
							triggerAction : 'all',
							displayField : 'key',
							valueField : 'value',
							forceSelection : true,
							resizable : true,
							typeAhead : true,
							value : getCookie('g4.login.model') ? getCookie('g4.login.model')
									: 'desktop_model',
							handleHeight : 10
						},
						{
							xtype : 'panel',
							layout : 'column',
							bodyStyle : "background:url(../images/newmain/login_n/bg02.png) no-repeat;",
							border : false,
							items :
							[
									{
										columnWidth:0.4,
										border : false,
										bodyStyle : "background:url(../images/newmain/login_n/bg02.png) no-repeat;",
										html : "<input type='submit' value='' style='background:url(images/newmain/login_n/login_in_h.png);width:133px;height:35px;border:0px;margin-top:15px;'   onclick='login_();' tabindex='4'>"
									},
									{
										columnWidth:0.4,
										border : false,
										bodyStyle : "background:url(../images/newmain/login_n/bg02.png) no-repeat;padding-left:5px;",
										html : "<input type='button' value='' style='background:url(images/newmain/login_n/reset_h.png);width:133px;height:35px;border:0px;margin-top:15px;' onclick='formReset();'  tabindex='5'>"
									} 
							]
						} ]
			});
	
}
function formReset(e)
{
	
	Ext.getCmp("loginForm").getForm().reset();

}
function login_(LKey)
{
	var account = Ext.getCmp('loginForm').findById('account');
		if (Ext.getCmp('loginForm').form.isValid())
		{
			Ext.getCmp('loginForm').form.submit(
				{
					url : 'app/http/ums/loginHandler/login?number=' + Math.random() + "&LKey=" + LKey,
					waitTitle : '提示',
					method : 'POST',
					waitMsg : '正在验证您的身份,请稍候.....',
					success : function(form, action)
					{
						var account = Ext.getCmp('loginForm').findById('account');
						setCookie("g4.login.account", account.getValue(), 240);
						setCookie("g4.login.model",
							Ext.getCmp("loginModel").getValue(), 240);
						window.location.href = 'index.jsp?loginModel='
							+ Ext.getCmp("loginModel").getValue();
					},
					failure : function(form, action)
					{
						var errmsg = action.result.msg;
						if (errmsg == "用户已经在别处登录")
						{
							Ext.MessageBox.confirm("提示", "该账号已在别处登录，是否继续？", function(
								btnId)
							{
								if (btnId == 'yes')
								{
									login_("LKey");
								}
							});
							return;
						}
						var loginErrorCount=getCookie('errorCount')==null?"0":getCookie('errorCount');
						var msg;
						if(parseInt(loginErrorCount)>=5){
							if(errmsg!=undefined){
								msg=errmsg+",输错次数已超过五次,请稍后再试";
							}else{
								msg="输错次数已超过五次,请稍后再试";
							}
						}else{
							if(errmsg!=undefined){
								msg=errmsg+",再输错"+(5-parseInt(loginErrorCount))+"次后将锁定"
							}else{
								msg="再输错"+(5-parseInt(loginErrorCount))+"次后将锁定"
							}
						}
						Ext.Msg.alert('提示',msg,
							function()
							{
								var account = Ext.getCmp('loginForm').findById(
									'account');
								var password = Ext.getCmp('loginForm').findById(
									'password');
								Ext.getCmp('loginForm').form.reset();
								account.focus();
								account.validate();
							});
					}
				});
		}
}
/**
 * 设置Cookie
 * 
 * @param {}
 *            name
 * @param {}
 *            value
 */
function setCookie(name, value, minuts)
{
	var argv = setCookie.arguments;
	var argc = setCookie.arguments.length;
	var expiration = new Date((new Date()).getTime() + minuts * 60000 * 60);
	document.cookie = name + "=" + escape(value) + "; expires="
			+ expiration.toGMTString();
}
/**
 * 获取Cookie
 * 
 * @param {}
 *            Name
 * @return {}
 */
function getCookie(Name)
{
	var search = Name + "="
	if (document.cookie.length > 0)
	{
		offset = document.cookie.indexOf(search)
		if (offset != -1)
		{
			offset += search.length
			end = document.cookie.indexOf(";", offset)
			if (end == -1)
				end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		} else
			return ""
	}
}