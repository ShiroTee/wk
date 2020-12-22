<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
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
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/screensize.js"></script>
		<script type="text/javascript">
			var root_ur = ROOT_RUL + "<%=request.getContextPath()%>/dms/"
			PROJECT_ROOT = "<%=request.getContextPath()%>"
			var screen_height ;
			var screen_width ;
			Ext.onReady(function() {
				screen_height = getScreen_height() ;
				screen_width = getScreen_width() ;
                Ext.BLANK_IMAGE_URL = '<%=request.getContextPath()%>/resource/ext/resources/images/default/s.gif';
                //创建根节点
                var root = new Ext.tree.TreeNode({
                    text : '数据监控平台',
                    expanded : true//默认展开根节点
                });
	            
                //数据监控知识库
	            var knowledgeRoot=root.appendChild(new Ext.tree.TreeNode({
	            	text : '数据监控知识库'
	            }));
	            knowledgeRoot.appendChild(new Ext.tree.TreeNode({
		            text : '数据监控基本知识',
		            leaf : true,
		            url : root_ur +"baseKnowledgeHandler/page"
	            }));
	            knowledgeRoot.appendChild(new Ext.tree.TreeNode({
		            text : '异常流程解决跟踪',
		            leaf : true,
		            url : root_ur + "knowledgeHandler/page"
	            }));
	            knowledgeRoot.appendChild(new Ext.tree.TreeNode({
		            text : '典型案例解决方案',
		            leaf : true,
		            url : root_ur + "knowledgeSolutionHandler/page"
	            }));

                //网络及服务监控
                var hostRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '服务器监控'
                }));
                hostRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '服务器预警规则',
                    leaf : true,
                    url:root_ur+"ruleinfoHandler/page"
                }));
                hostRoot.appendChild(new Ext.tree.TreeNode({
                    text : '服务器监控项配置',
                    leaf : true,
                    id: "servicemoniconfig",
                    url:root_ur+"addHostMonitorHandler/page"
                }));
                hostRoot.appendChild(new Ext.tree.TreeNode({
                    text : '服务器监控详情',
                    leaf : true,
                    url:root_ur+"hostMonitorHandler/page"
                }));

	            //数据交换整体流程跟踪
	            var flowFollowRoot=root.appendChild(new Ext.tree.TreeNode({
	            	text : '数据交换整体流程跟踪'
	            }));
	            flowFollowRoot.appendChild(new Ext.tree.TreeNode({
		            text : '整体流程跟踪',
		            leaf : true,
		            url : root_ur +"flowFollowHandler/page"
	            }));
	            //数据处理节点监控
	             var dataNodeRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '数据处理节点监控'
                }));
	            
                var jobMonitorRoot= dataNodeRoot.appendChild(new Ext.tree.TreeNode({
                    text : '作业监控'
                }));
                
                 jobMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '作业运行状况',
	                leaf : true,
	                url:root_ur+"jobRunHandler/page"
	            }));
	            jobMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '作业执行情况',
	                leaf : true,
	                url:root_ur+"jobDoHandler/page"
	            }));
	            jobMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '作业运行管理',
	                leaf : true,
	                url:root_ur+"jobRunManagerHandler/page"
	            }));
	            
	              //转换监控
	            var transMonitorRoot=dataNodeRoot.appendChild(new Ext.tree.TreeNode({
	                text : '转换监控'
	            }));
	            transMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '转换执行情况',
	                leaf : true,
	                url:root_ur+"transDoHandler/page"
	            }));

	            //步骤监控
	            var stepMonitorRoot=dataNodeRoot.appendChild(new Ext.tree.TreeNode({
	                text : '步骤监控'
	            }));
	            stepMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '步骤执行情况',
		            leaf : true,
		            url : root_ur + "stepMonitorHandler/page"
	            }));
				
	            //数据交换过程监控
	             var dataExchangeRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '数据交换过程监控'
                }))
                
                //数据抽取监控
	            var transMonitorRoot=dataExchangeRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '数据抽取监控'
	            }));
	            transMonitorRoot.appendChild(new Ext.tree.TreeNode({
		            text : '抽取过程监控',
		            leaf : true,
		            url : root_ur + "extractMonitorHandler/page"
	            }));
                
	            //数据清洗监控
	            var cleanMonitorRoot=dataExchangeRoot.appendChild(new Ext.tree.TreeNode({
	                text : '数据清洗监控'
	            }));
	            cleanMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '清洗过程监控',
		            leaf : true,
		            url : root_ur +  "cleanMonitorHandler/page"
	            }));
	            cleanMonitorRoot.appendChild(new Ext.tree.TreeNode({
	                text : '清洗规则监控',
		            leaf : true,
		            url : root_ur +"cleanRuleMonitorHandler/page"
	            }));

	            //数据转换监控
	            var transMonitorRoot=dataExchangeRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '数据转换监控'
	            }));
	            transMonitorRoot.appendChild(new Ext.tree.TreeNode({
		            text : '转换过程监控',
		            leaf : true,
		            url : root_ur + "transMonitorHandler/page"
	            }));

	            //数据比对监控
	            var compareProcessMonitorRoot=dataExchangeRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '数据比对监控'
	            }));
	            compareProcessMonitorRoot.appendChild(new Ext.tree.TreeNode({
		            text : '比对过程监控',
		            leaf : true,
		            url : root_ur + "compareMonitorHandler/page"
	            }));

	            //数据加载监控
	            var loadProcessMonitorRoot=dataExchangeRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '数据加载监控'
	            }));
	            loadProcessMonitorRoot.appendChild(new Ext.tree.TreeNode({
		            text : '加载过程监控',
		            leaf : true,
		            url : root_ur +"loadMonitorHandler/page"
	            }));

	            //数据处理流程异常记录
	            var exceptionLogManageRoot=root.appendChild(new Ext.tree.TreeNode({
	            	text : '数据处理流程异常记录'
	            }));
	            exceptionLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '作业异常记录',
	            	leaf : true,
	            	url : root_ur+"jobExceptionHandler/page"
	            }));
	            exceptionLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '转换异常记录',
	            	leaf : true,
	            	url : root_ur+"transExceptionHandler/page"  
	            }));

	            //预警管理
	            var warningManageRoot=root.appendChild(new Ext.tree.TreeNode({
	                text : '预警管理'
	            }));
	            warningManageRoot.appendChild(new Ext.tree.TreeNode({
	                text : '数据处理流程异常预警',
	                leaf : true,
		            url : root_ur + "kettleWarningHandler/page"
	            }));
	            warningManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '服务器异常预警',
                    leaf : true,
                    url:root_ur+"alarmInfoHandler/page"
                }));
	            //日志跟踪
	            var logManageRoot=root.appendChild(new Ext.tree.TreeNode({
	            	text : '日志跟踪'
	            }));
	            logManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '作业操作跟踪',
	            	leaf : true,
	            	url : root_ur+"jobLogManageHandler/page"
	            }));
	            logManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '转换操作跟踪',
	            	leaf : true,
	            	url : root_ur+"transLogManageHandler/page"
	            }));
	            logManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : '流程设计跟踪',
	            	leaf : true,
	            	url : root_ur+"repositoryLogHandler/page"
	            }));
	            	            
	            //统计分析
	            var statisAnalysisRoot=root.appendChild(new Ext.tree.TreeNode({
	            	text : '统计分析'
	            }));
	            var executeStatis=new Ext.tree.TreeNode({
	            	text : '作业执行情况'
	            });
/*	            executeStatis.appendChild(new Ext.tree.TreeNode({
	            	text : '作业整体执行情况',
	            	leaf : true,
	            	url : 'page/jobs/overall_implementation.jsp'
	            }));
	            executeStatis.appendChild(new Ext.tree.TreeNode({
	            	text : '作业执行情况',
	            	leaf : true,
	            	url : 'page/jobs/performance.jsp'
	            }));*/
	            executeStatis.appendChild(new Ext.tree.TreeNode({
	            	text : '作业执行情况',
	            	leaf : true,
	            	url : 'page/statistics/jobdo_new.jsp'
	            }));
	             var clear=new Ext.tree.TreeNode({
	            	text : '清洗过程执行情况'
	            });
/*	              clear.appendChild(new Ext.tree.TreeNode({
	            	text : '清洗过程执行情况',
	            	leaf : true,
	            	url : 'page/jobs/washing.jsp'
	            }));*/
	              clear.appendChild(new Ext.tree.TreeNode({
	            	text : '清洗过程执行情况',
	            	leaf : true,
	            	url : 'page/statistics/washing_new.jsp'
	            }));	            	            
	            var changes=new Ext.tree.TreeNode({
	            	text : '转换过程执行情况'
	            });
/*	            changes.appendChild(new Ext.tree.TreeNode({
	            	text : '转换过程执行情况',
	            	leaf : true,
	            	url : 'page/jobs/change.jsp'
	            }));*/
	            changes.appendChild(new Ext.tree.TreeNode({
	            	text : '转换过程执行情况',
	            	leaf : true,
	            	url : 'page/statistics/change_new.jsp'
	            }));	            
	             var node_comp=new Ext.tree.TreeNode({
	            	text : '比对过程执行情况'
	            });
	              node_comp.appendChild(new Ext.tree.TreeNode({
	            	text : '比对过程执行情况',
	            	leaf : true,
	            	url : 'page/statistics/comp_new.jsp'
	            }));
	             var node_load=new Ext.tree.TreeNode({
	            	text : '加载过程执行情况'
	            });
	              node_load.appendChild(new Ext.tree.TreeNode({
	            	text : '加载过程执行情况',
	            	leaf : true,
	            	url : 'page/statistics/load_new.jsp'
	            }));	            	            
	           /* var comparison=new Ext.tree.TreeNode({
	            	text : '比对过程执行情况'
	            });
	              comparison.appendChild(new Ext.tree.TreeNode({
	            	text : '比对过程执行情况',
	            	leaf : true,
	            	url : 'page/jobs/comparison.jsp'
	            }));
	             var load=new Ext.tree.TreeNode({
	            	text : '加载过程执行情况'
	            });
	             load.appendChild(new Ext.tree.TreeNode({
	            	text : ' 加载过程执行情况',
	            	leaf : true,
	            	url : 'page/jobs/load.jsp'
	            }));*/
	            
	            var exceptionStatis=new Ext.tree.TreeNode({
	            	text : '异常情况'
	            });
/*	            exceptionStatis.appendChild(new Ext.tree.TreeNode({
	            	text : '服务器异常原因',
	            	leaf : true,
	            	url : 'page/jobs/webandservception.jsp'
	            }));*/
	            exceptionStatis.appendChild(new Ext.tree.TreeNode({
	            	text : '服务器异常原因',
	            	leaf : true,
	            	url : 'page/statistics/webandservception_new.jsp'
	            }));	            
	            statisAnalysisRoot.appendChild(executeStatis);
	            statisAnalysisRoot.appendChild(exceptionStatis);
	            statisAnalysisRoot.appendChild(changes);
	            statisAnalysisRoot.appendChild(clear);
	            statisAnalysisRoot.appendChild(node_comp);
	            statisAnalysisRoot.appendChild(node_load);
	            //statisAnalysisRoot.appendChild(comparison);
	           // statisAnalysisRoot.appendChild(load);
	           
	           	//ESB日志管理 edit by zhys 20140805
	            var esbLogManageRoot=root.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB监控管理'
	            }));
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB渠道信息管理',
	            	leaf : true,
	            	url : root_ur+"esbChannelManageHandler/page"
	            }));
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB服务分类管理',
	            	leaf : true,
	            	url : "page/esblog/esbservicetypemanage.jsp"
	            }));	            
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB服务信息管理',
	            	leaf : true,
	            	url : root_ur+"esbServiceManageHandler/page"
	            }));
	            
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB服务渠道信息管理',
	            	leaf : true,
	            	url : root_ur+"esbTypeManageHandler/page"
	            }));
	            
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB流水监控',
	            	leaf : true,
	            	url : root_ur+"esbLogManageHandler/page"
	            }));
	            
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB服务渠道监控',
	            	leaf : true,
	            	url : root_ur+"esbLogTypeHandler/page"
	            }));
	            
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB服务统计图',
	            	leaf : true,
	            	url : "page/esblog/esblogstatics.jsp"
	            }));
	            esbLogManageRoot.appendChild(new Ext.tree.TreeNode({
	            	text : 'ESB渠道统计图',
	            	leaf : true,
	            	url : "page/esblog/esblogstatics1.jsp"
	            }));
	            
	                            
                var menu3 = new Ext.tree.TreePanel({
                    border : false,
                    autoScroll : true,
                    frame:true,
                    id : 'menu1',
                    title : '功能列表',
                    tbar : [
                        '皮肤选择：',
                        {
                            xtype : 'themeChange',
                            width : 80,
                            listWidth : 80
                        },
                        '->'
                    ],
                    split : true,
                    collapseFirst:true,
                    hrefTarget : 'mainContent',
                    root:root,
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
                                var tabPage = tabPanel.getComponent(node.id);
                                if (!tabPage) {
                                    tabPage = tabPanel.add({// 动态添加tab页
                                        title : node.text,
                                        id : node.id+"",
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
                   autoDestroy:true,
                   closable: true,     
                 	height:screen_height-80,
                    listeners: { beforeremove: function(ct,component ) {
                	Ext.TaskMgr.stopAll();}
                	}
                });
                var tabPanel1 = new Ext.TabPanel({
                    activeTab : 0, // 设置默认选择的选项卡
                    id : 'tabpanel1',
                    
                    closable:true,
                    height :screen_height-80,
                    width :screen_width*0.18,
                    items : [menu3]
                });
                var viewPort = new Ext.Viewport({
                    layout : 'border',// 表格布局
                    items : [{
                            frame:false,
                            html : "<div align='right'><font size='2'><a href='#' onclick='javascript:notice();'>修改密码</font></a><font size='2'>&nbsp;|&nbsp;</font><font size='2'><a href='#'>用户管理</font></a><font size='2'>&nbsp;|&nbsp;</font><font size='2'><a href='#'>退出系统</font></a><font size='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></div>",
                            region : 'north',// 指定子面板所在区域为north
                            height :40
                        }, {
                            items : tabPanel1,
                            split : true,
                            region : 'west',// 指定子面板所在区域为west
                            width :screen_width*0.18
                        }, {
                            items : tabpanel,
                           
                            id : 'mainContent',
                            width :screen_width*0.82,
                            region : 'center'// 指定子面板所在区域为center
                        },{
                            frame:false,
                            autoScroll : true,
                            region : 'south',// 指定子面板所在区域为center
                            height :40,
                            html:"<div><br><font size='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                    &#169; Copyright 2011 神州数码信息系统有限公司 | Powered by Quickway</font></div>"
                        }]
                });
                var mainPanel = Ext.getCmp('mainContent');
            });
            
            
            
            
            function openTable(url) {
                       var tabPanel = Ext.getCmp('tabpanel');

                       var html = '<iframe id="mainFrame" name="mainFrame" src="';
		var url = root_ur + "dmsAddHostMonitorHandler/page" ;
		html = html
			+ url
			+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;">iframe>';
                              var tabPage = tabPanel.add({// 动态添加tab页
                                   title : "服务器监控项配置",
                                   id : "servicemoniconfig",
                                   closable : true,
                                   html : html
                               });
                          tabPanel.setActiveTab(tabPage);// 设置当前tab页

         }
            
            
        </script>
	</head>
	<body>

	</body>
</html>