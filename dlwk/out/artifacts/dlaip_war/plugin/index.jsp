<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<%@page import="com.digitalchina.ldp.app.ums.bean.AppInfoBean"%>
<%@page import="com.digitalchina.ldp.app.ums.bean.PostInfoBean"%>
<%@page import="com.digitalchina.ldp.common.util.BeanDefineConfigue"%>
<%
	String contextPath = request.getContextPath();
	//String indexPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+contextPath+"/";
	String indexPath = contextPath + "/";
%>
<html>
<head>
<title><%=BeanDefineConfigue.getProperty("SYSTEM_TITLE")%></title>
<link rel="stylesheet" type="text/css" href="css/base.css" />
<link rel="stylesheet" type="text/css" href="css/layout.css" />
<link rel="stylesheet" type="text/css"
	href="<%=contextPath%>/resource/ext/resources/css/ext-all.css" />
<script type='text/javascript'
	src='<%=contextPath%>/resource/ext/js/ext-base.js'></script>
<script type='text/javascript'
	src='<%=contextPath%>/resource/ext/js/ext-all.js'></script>
<script type='text/javascript'
	src='<%=contextPath%>/resource/ext/js/ext-lang-zh_CN.js'></script>
<script type="text/javascript"
	src="<%=contextPath%>/resource/scripts/screensize.js">
	
</script>
<%
	UserInfoBean userInfoBean = (UserInfoBean) session
			.getAttribute(Constant.USER_SESSION_ID);
	if (userInfoBean == null)
	{
		response.sendRedirect("login.jsp");
	}
%>
<script language="javascript">
	var screen_height;
	var screen_width;
	var maxPageCount=<%=BeanDefineConfigue.getProperty("OPEN_TAB_PAGE_COUNT")==null?8:BeanDefineConfigue.getProperty("OPEN_TAB_PAGE_COUNT")%>
	Ext.onReady(createMainPanel);
	function addPage(tabPanel,node)
	{

		var tabPage = tabPanel.getComponent(node.id);
		if (!tabPage)
		{
			var html = '<iframe id="mainFrame" name="mainFrame" src="';
			var url="<%=request.getContextPath()%>/"+ node.attributes.url;
			if (node.attributes.url.substring(0, 4) == "http") {
				url = node.attributes.url;
			}

					html = html
							+ url
							+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';
					tabPage = tabPanel.add(
					{
						title : node.text,
						id : node.id + "",
						closable : true,
						html : html
					});
				}
				tabPanel.setActiveTab(tabPage);// 设置当前tab页
	}
	function createMainPanel()
	{
		var html='<li style="height:26px;background-image:url(\'images/index2/foot_bg.png\');color:#7C7C7C;padding-left:10px; font: 13px 微软雅黑,微x8F6F正黑体,新细明体,细明体,黑体,微软雅黑,微x8F6F正黑体,新细明体,细明体,黑体,helvetica,sans-serif"><img style="margin-right:5px; vertical-align:sub;" src="images/user.png" />当前登陆用户：<span style="font-weight:bold; color:#DC5925;"><%=userInfoBean.getName()%></span> <img style="margin-right:5px; vertical-align:sub;" src="images/user.png" />所属部门：<span style="font-weight:bold; color:#DC5925;"><%=userInfoBean.getOrgInfo().getOrgName()%></span></li>';
		screen_height = getScreen_height();
		screen_width = getScreen_width();
		new Ext.Viewport(
		{
			layout : 'border',
			border:false,
			items : [
			{
				frame : false,
				region : 'north',
				height : 40,
				contentEl : "systop"
			},
			{
				items : createLeftPanel(),
				split : false,
				region : 'west',
				layout : 'fit',
				width : screen_width * 0.18+20
			},
			{
				items : createWorkSpacePanel(),
				id : 'mainContent',
				layout : 'fit',
				width : screen_width * 0.82,
				region : 'center'
			},
			{
				frame : false,
				autoScroll : true,
				region : 'south',
				height : 28,
				html :html
			} ]
		});
	}
	function createLeftPanel()
	{
		var accordion = new Ext.Panel(
		{
			region : 'west',
			margins : '5 0 5 5',
			split : true,
			width : 210,
			border:false,
			animCollapse:true,
			layout : 'accordion',
			defaults : {
				frame : true,
				autoScroll : true
			},
			layoutConfig : {
				animate : true
			},
			frame:false,
			items : createAppItems()
		});
		var root_url = "<%=contextPath%>/app/http/";
		var p=accordion.getComponent(0);
		if(p)
		{
			var p1=p.getComponent(0);
			if(p1)
			{
				p1.expandAll();
			}
		}
		
		return accordion;
	}
	function createToolbar(data)
	{
		var store=new Ext.data.SimpleStore(
				{
					fields : [ 'postId', 'postName' ],
					data :data
				});
		var toolbar = new Ext.Toolbar();
		toolbar.addText("切换岗位:");
		toolbar.addItem(new Ext.form.ComboBox(
		{
			mode : 'local',
			store :store,
			triggerAction : 'all',
			displayField : 'postName',
			valueField : 'postId',
			value:data[0][0],
			width : screen_width * 0.18-75,
			forceSelection : true,
			listeners:{
				select:function()
				{
					var root_url = "<%=contextPath%>/app/http/";
					var p=toolbar.findParentByType("treepanel");
					 Ext.getCmp('workspacePanel').removeAll(true);
					
					var url=root_url + "ums/loginHandler/initworkspaceForSync?appId="+p.root.id+"&postId="+this.getValue()+"&random="+Math.random();
					p.getLoader().dataUrl =url;
					p.getLoader().load(p.root);
				}
			},
			resizable : true,
			typeAhead : true,
			handleHeight : 10
		}));
		return toolbar;
	}
	function createAppItems()
	{
		var list = [];
		
<%for (AppInfoBean app : userInfoBean.getAppList())
			{
				if (app.getPostList() == null)
				{
					continue;
				}%>
var data=[];
<%for (PostInfoBean post : app.getPostList())
				{%>
		
		var l=[];
		l.push('<%=post.getPostId()%>');
		l.push('<%=post.getPostName()%>');
		data.push(l);
<%}%>
	list.push(new Ext.Panel(
		{
			title :'<%=app.getAppName()%>',
			items : [ createTreePanel('<%=app.getAppCode()%>',data)]
		}));
<%}%>
	return list;
	}
	function createTreePanel(appCode,data)
	{
		var root_url = "<%=contextPath%>/app/http/";
		var root = new Ext.tree.AsyncTreeNode(
		{
			id :appCode,
			expanded : false,
			url : '#',
			loader : new Ext.tree.TreeLoader(
			{
				dataUrl : root_url + "ums/loginHandler/initworkspaceForSync?appId="
						+ appCode+"&postId="+data[0][0]+"&random="+Math.random()
			})
		});
		var tree = new Ext.tree.TreePanel(
		{
			border : false,
			autoScroll : true,
			frame : false,
			tbar : createToolbar(data),
			collapseFirst : true,
			hrefTarget : 'mainContent',
			root : root,
			rootVisible :false,
			listeners :
			{
				click : function(node, e)
				{
					if (node.isLeaf())
					{
						var tabPanel = Ext.getCmp('workspacePanel');
						
						if(tabPanel.items.getCount()+1>maxPageCount)
						{
							Ext.MessageBox.confirm("提示", "打开选项卡已超过最大，是否关闭?", function(btnId){
								if (btnId == 'yes')
								{
									tabPanel.items.each(function(item){
				                        if(item.closable){
				                        	tabPanel.remove(item);
				                        }
				                    });
									addPage(tabPanel,node)
									
								}
							});
							
						}
						else
						{
							addPage(tabPanel,node)
						}
					
							}

						}
					}
				});

		return tree;
	}
	function createWorkSpacePanel()
	{
		return new Ext.TabPanel(
		{
			id : 'workspacePanel',
			autoDestroy : true,
			draggable : false,
			closable : true,
			activeTab :0,
			height : screen_height - 80,
			items:[{
				title :"首页",
				closable :false,
				bodyStyle: {  
                    //background: '#ffc',  
                    background: 'url(<%=request.getContextPath()%>/images/bg.jpg) no-repeat #D3EFFA',  
                    padding: '10px'  
                }
			}]
		});
		return p;
	}
	function showEditPasswordWin()
	{
		var win = new Ext.Window(
				{
					layout : 'fit',
					width : 450,
					height :240,
					title : '修改密码',
					closeAction : 'close',
					id:"organizationWin",
					plain : true,
					modal : true,
					resizable : true,
					buttonAlign : 'center',
					bodyStyle : 'padding:5px 5px 5px 5px',
					items : [createPasswordForm()],
					buttons : [
					
					{
						text : '关闭',
						iconCls : 'icon_close',
						handler : function()
						{
							win.close();
						}
					},
					{
						text : '保存',
						iconCls : 'icon_save',
						handler:function()
						{
							var url="<%=request.getContextPath()%>/app/http/ums/userInfoManagerHandler/editUserPassword";
							var form=win.getComponent(0);
							form.form
							.submit({
								clientValidation : true, // 进行客户端验证
								waitMsg : '正在提交数据请稍后', // 提示信息
								waitTitle : '提示', // 标题
								url : url,
								method : 'POST', // 请求方式
								success : function(form, action) {
									Ext.Msg.alert('提示',"密码修改成功",function(){
										win.close();
									});
								},
								failure : function(form, action) { // 加载失败的处理函数
									if (action.response != null) {
										var result = Ext.util.JSON
												.decode(action.response.responseText);
										Ext.Msg.alert('提示',"密码修改异常:"+ result.msg);
									} else {
										Ext.Msg.alert("提示", "有必填项！");
									}
								}
							});
						}
					},
					{
						text : '重置',
						iconCls : 'icon_reset',
						handler : function()
						{
						}
					} ]
				});
		win.show();
	}
	function createPasswordForm()
	{
		var form = new Ext.FormPanel(
				{
					labelSeparator : "：",
					frame : true,
					bodyStyle : 'padding:15px 0px 20px 20px',
					border : false,
					items : [
					{
						xtype : 'textfield',
						name : 'oldPassword',
						width : 240,
						inputType:'password',
						allowBlank : false,
						maxLength : 50,
						fieldLabel : '旧密码'
					},
					{
						xtype : 'textfield',
						name : 'newPassword',
						width : 240,
						inputType:'password',
						allowBlank : false,
						maxLength : 50,
						fieldLabel : '新密码'
					},
					{
						xtype : 'textfield',
						name : 'repeatPassword',
						width : 240,
						inputType:'password',
						allowBlank : false,
						maxLength : 50,
						fieldLabel : '重复密码'
					},{
						xtype : 'textfield',
						name : 'orgId',
						hidden:true
					}]
				});
				return form;
	}
	function loginOut()
	{
		var url="<%=request.getContextPath()%>/app/http/ums/loginHandler/loginOut";
		Ext.MessageBox.confirm("提示", "你确定要退出系统吗?", function(btnId)
		{
			if (btnId == 'yes')
			{
				var msgTip = Ext.MessageBox.show(
				{
					title : '提示',
					width : 250
				});
				Ext.Ajax.request(
				{
					url : url,
					method : 'POST',
					success : function(response, options)
					{
						msgTip.hide();
						var result = Ext.util.JSON
								.decode(response.responseText);
						if (result.success)
						{
							window.location.reload();
						} else
						{
							if ("用户会话已过期" == result.msg)
							{
								window.location.reload();
								return;
							}
							Ext.Msg.alert('提示', "异常码：" + result.msg);
						}
					},
					failure : function(response, options)
					{
						var result = Ext.util.JSON
								.decode(response.responseText);
						msgTip.hide();
						Ext.Msg.alert('提示', message + "异常码：" + result.data);
					}
				});
			}
		});

	}
	function gotoindex()
	{

	}
</script>
</head>
<body>
	<div id="systop"
		style="height: 40px; background-image: url('images/index2/top_bg.gif'); background-position: right; background-repeat: no-repeat; background-color: #2260b5;">
		<table width="100%">
			<tr>
				<td><img src="images/index2/logo.png"
					style="padding-top: 2px; padding-left: 20px;" /></td>
				<td align="right" class="f-right title-oparator">
					<p>
						<span class="seperator"></span>&nbsp;<a href="<%=indexPath%>">首页</a>&nbsp;<span
							class="seperator">|</span>&nbsp;<a href="#"
							onclick="showEditPasswordWin();">修改密码</a>&nbsp;<span
							class="seperator">|</span>&nbsp;<a href="#" onclick="loginOut()">退出登陆</a>&nbsp;<span
							class="seperator">|</span>&nbsp;<a
							href="index.jsp?loginModel=desktop_model">桌面模式</a>
					</p>
				</td>
			</tr>
		</table>
	</div>
</body>
</html>