<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.OrganizationInfoBean"%>
<%@ page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.RoleInfoBean"%>
<%@ page import="com.digitalchina.ldp.bean.AppInfoBean"%>
<%
UserInfoBean userInfoBean=new UserInfoBean();
OrganizationInfoBean orgInfo=new OrganizationInfoBean();
orgInfo.setOrgId("ROOT");
userInfoBean.setOrgInfo(orgInfo);
RoleInfoBean roleInfo=new RoleInfoBean();
roleInfo.setRoleId("1");
roleInfo.setRoleName("管理员角色");
List<RoleInfoBean> roles=new ArrayList<RoleInfoBean>();
roles.add(roleInfo);
userInfoBean.setRoles(roles);
session.setAttribute(Constant.USER_SESSION_ID,userInfoBean);
%>
<html>
<head>
<title>测试环境，该页面在集成环境中不需要</title>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-base.js'></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-all.js'></script>
<script type='text/javascript'
	src='<%=request.getContextPath()%>/resource/ext/js/ext-lang-zh_CN.js'></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/themeChange.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/common.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/scripts/screensize.js"></script>
<script type="text/javascript">
			var root_ur = ROOT_RUL + "<%=request.getContextPath()%>/";
			PROJECT_ROOT = "<%=request.getContextPath()%>";
			var screen_height ;
			var screen_width ;
			Ext.onReady(function() {
				screen_height = getScreen_height() ;
				screen_width = getScreen_width() ;
                Ext.BLANK_IMAGE_URL = '<%=request.getContextPath()%>/resource/ext/resources/images/default/s.gif';
                //创建根节点
                var root = new Ext.tree.TreeNode({
                    text : '测试环境',
                    expanded : true//默认展开根节点
                });
                //人员信息管理
	            var serviceApproveTree=root.appendChild(new Ext.tree.TreeNode({
	            	text : '测试页面',
	            	expanded : true//默认展开
	            }));
	            serviceApproveTree.appendChild(new Ext.tree.TreeNode({
		            text : '事项搜索',
		            leaf : true,
		            url : "<%=request.getContextPath()%>/page/user_info/userinfo.jsp"
	            }));
	            serviceApproveTree.appendChild(new Ext.tree.TreeNode({
		            text : '事项新增',
		            leaf : true,
		            url : "<%=request.getContextPath()%>/app/http/mms/matterHandler/editPage"
	            }));
	            serviceApproveTree.appendChild(new Ext.tree.TreeNode({
		            text : '主题编辑',
		            leaf : true,
		            url : "<%=request.getContextPath()%>/app/http/mms/topicHandler/listPage"
								}));

				var menu3 = new Ext.tree.TreePanel(
						{
							border : false,
							autoScroll : true,
							frame : true,
							id : 'menu1',
							title : '功能列表',
							tbar : [ '皮肤选择：', {
								xtype : 'themeChange',
								width : 80,
								listWidth : 80
							}, '->' ],
							split : true,
							collapseFirst : true,
							hrefTarget : 'mainContent',
							root : root,
							text : '操作菜单',
							listeners : {
								click : function(node, e) {
									var tabPanel = Ext.getCmp('tabpanel');

									var html = '<iframe id="mainFrame" name="mainFrame" src="';
									var url = node.attributes.url;
									html = html
											+ url
											+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';

									if (node.isLeaf()) {
										var tabPage = tabPanel
												.getComponent(node.id);
										if (!tabPage) {
											tabPage = tabPanel.add({// 动态添加tab页
												title : node.text,
												id : node.id + "",
												closable : true,
												html : html
											});
										}
										tabPanel.setActiveTab(tabPage);// 设置当前tab页
									}

								}
							}
						});
				var tabpanel = new Ext.TabPanel({
					id : 'tabpanel',
					autoDestroy : true,
					closable : true,
					height : screen_height - 80,
					listeners : {
						beforeremove : function(ct, component) {
							Ext.TaskMgr.stopAll();
						}
					}
				});
				var tabPanel1 = new Ext.TabPanel({
					activeTab : 0, // 设置默认选择的选项卡
					id : 'tabpanel1',

					closable : true,
					height : screen_height - 80,
					width : screen_width * 0.18,
					items : [ menu3 ]
				});
				var viewPort = new Ext.Viewport(
						{
							layout : 'border',// 表格布局
							items : [
									{
										frame : false,
										html : "<div align='right'><font size='2'><a href='#' onclick='javascript:notice();'>修改密码</font></a><font size='2'>&nbsp;|&nbsp;</font><font size='2'><a href='#'>用户管理</font></a><font size='2'>&nbsp;|&nbsp;</font><font size='2'><a href='#'>退出系统</font></a><font size='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></div>",
										region : 'north',// 指定子面板所在区域为north
										height : 40
									},
									{
										items : tabPanel1,
										split : true,
										layout : 'fit',
										region : 'west',// 指定子面板所在区域为west
										width : screen_width * 0.18
									},
									{
										items : tabpanel,
										layout : 'fit',
										id : 'mainContent',
										width : screen_width * 0.82,
										region : 'center'// 指定子面板所在区域为center
									},
									{
										frame : false,
										autoScroll : true,
										region : 'south',// 指定子面板所在区域为center
										height : 40,
										html : "<div><br><font size='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                    &#169; Copyright 2011 神州数码信息系统有限公司 | Powered by Quickway</font></div>"
									} ]
						});
				var mainPanel = Ext.getCmp('mainContent');
			});
</script>
</head>
<body>

</body>
</html>