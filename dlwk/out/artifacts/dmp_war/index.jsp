<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resource/ext/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/icons.css" />
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-base.js'></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-all.js'></script>
		<script type='text/javascript' src='<%=request.getContextPath()%>/resource/ext/js/ext-lang-zh_CN.js'></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/ext/js/themeChange.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath()%>/resource/common/common.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/resource/scripts/screensize.js"></script>
		<script type="text/javascript">
var root_ur = 'app/http' + "<%=request.getContextPath()%>/"            
var screen_heightm;
var screen_widthm;
Ext.onReady(function() {
        screen_widthm = getScreen_width();
		screen_heightm = getScreen_height();
                Ext.BLANK_IMAGE_URL = '<%=request.getContextPath()%>/resource/ext/resources/images/default/s.gif';
                //创建根节点
                var root = new Ext.tree.TreeNode({
                    text : '数据管理平台',
                    expanded : true//默认展开根节点
                });
                
                //知识库
                var nodeSecondKnowRoot = root.appendChild(new Ext.tree.TreeNode({
                	text : '知识库'
                }));
                  nodeSecondKnowRoot.appendChild(new Ext.tree.TreeNode({
                    text : '异常流程解决跟踪',
                    url:'page/dataQuality/dataQuality.jsp',
                    leaf:true
                }));
                nodeSecondKnowRoot.appendChild(new Ext.tree.TreeNode({
                    text : '异常案例解决方案',
                    url:'page/dataQuality/dataSolution.jsp',
                    leaf:true
                }));
                //为根节点添加子节点
                var orderRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '数据生产',
                    expanded : false//默认展开根节点
                }));
                orderRoot.appendChild(new Ext.tree.TreeNode({
                    text : '委办局原始数据',
                    leaf:true,
                    url:'page/dataproduce/pre-wbjdata.jsp'
                }));
                orderRoot.appendChild(new Ext.tree.TreeNode({
                    text : '委办局原始文件',
                    leaf:true,
                    url:'page/dataproduce/pre-wbjfile.jsp'
                }));
                  orderRoot.appendChild(new Ext.tree.TreeNode({
                    text : '数据抽取',
                    leaf:true,
                    url:'page/dataproduce/pre-centerdata.jsp'
                }));
                  orderRoot.appendChild(new Ext.tree.TreeNode({
                    text : '数据清洗',
                    leaf:true,
                    url:'page/dataproduce/dataCleanMan.jsp'
                }));
                   orderRoot.appendChild(new Ext.tree.TreeNode({
                    text : '数据转换',
                    leaf:true,
                    url:'page/dataproduce/dataTransMan.jsp'
                }));
                   orderRoot.appendChild(new Ext.tree.TreeNode({
                    text :'数据比对',
                    leaf:true,
                    url:'page/dataproduce/dataCompMan.jsp'
                }));
<%--                   orderRoot.appendChild(new Ext.tree.TreeNode({--%>
<%--                    text : '数据加载',--%>
<%--                    leaf:true,--%>
<%--                    url:'order/orderList.jsp'--%>
<%--                }));--%>
                   orderRoot.appendChild(new Ext.tree.TreeNode({
                    text : '基础库数据',
                    leaf:true,
                    url:'page/dataproduce/basiclibary.jsp'
                }));
                var servicePackageRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '数据对账',
                    expanded : false//默认展开根节点
                }));
                var nodeRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '数据质量'
                }));
                nodeRoot.appendChild(new Ext.tree.TreeNode({
                    text : '异常数据跟踪',
                    url:'page/dataQuality/trackErrorData.jsp',
                    leaf:true
                }));
                nodeRoot.appendChild(new Ext.tree.TreeNode({
                    text : '异常数据返还',
                    url:'page/dataQuality/ErrorDataReturn.jsp',
                    leaf:true
                }));
                var nodeSecondRoot=nodeRoot.appendChild(new Ext.tree.TreeNode({
                    text : '数据质量报告'
                }));
                  nodeSecondRoot.appendChild(new Ext.tree.TreeNode({
                    text : '文件交换模式',
                    url:'page/dataQuality/DataReport.jsp',
                    leaf:true
                }));
                  nodeSecondRoot.appendChild(new Ext.tree.TreeNode({
                    text : '数据库交换模式',
                    url:'page/dataQuality/DataBaseReport.jsp',
                    leaf:true
                }));
                 //nodeRoot.appendChild(new Ext.tree.TreeNode({
                 // text : '数据质量预警',
                    //url:'monitorNode/index.jsp',
                    //leaf:true
                //}));
                
                servicePackageRoot.appendChild(new Ext.tree.TreeNode({
                    text : '委办局前置与中心前置对账',
                    url:'page/datacheck/olapwbjqzzxqz.jsp',
                    leaf:true
                }));
                servicePackageRoot.appendChild(new Ext.tree.TreeNode({
                    text : '委办局前置与基础库对账',
                    url:'page/datacheck/olapwbjjckdz.jsp',
                    leaf:true
                }));
                servicePackageRoot.appendChild(new Ext.tree.TreeNode({
                    text : '中心前置与基础库对账',
                    url:'page/datacheck/comp-centerToBase.jsp',
                    leaf:true
                }));
               // var memberRoot= root.appendChild(new Ext.tree.TreeNode({
               //     text : '数据文件上传'
               // }));
               // memberRoot.appendChild(new Ext.tree.TreeNode({
               //     text : '数据文件上传',
               //     url:'member/member.jsp',
               //     leaf:true
               // }));
               // memberRoot.appendChild(new Ext.tree.TreeNode({
               //     text : '异常数据文件下载',
               //     url:'feature/featrue.jsp',
                //    leaf:true
                //}));
                
                var pluginRoot=root.appendChild(new Ext.tree.TreeNode({
                    text : '数据字典管理'
                }));
                pluginRoot.appendChild(new Ext.tree.TreeNode({
                    text : '异常规则代码管理',
                    leaf:true,
                    url:'page/codemanage/exceptionCodeManager.jsp'
                }));
                 pluginRoot.appendChild(new Ext.tree.TreeNode({
                    text : '委办局数据交换表配置',
                    leaf:true,
                    url:'page/codemanage/wbjsjjh.jsp'
                }));
                 pluginRoot.appendChild(new Ext.tree.TreeNode({
                    text : '基础库数据表配置',
                    leaf:true,
                    url:'page/codemanage/databasetable.jsp'
                }));
                pluginRoot.appendChild(new Ext.tree.TreeNode({
                    text : '委办局数据交换方式配置',
                    leaf:true,
                    url:'page/codemanage/dmjhmode.jsp'
                }));
                
                 //pluginRoot.appendChild(new Ext.tree.TreeNode({
                 //   text : '数据源管理',
                 //   leaf:true,
                 //   url:'plugin/index.jsp'
                //}));
                 //pluginRoot.appendChild(new Ext.tree.TreeNode({
                 //   text : '委办局前置机管理',
                 //   leaf:true,
                  //  url:'plugin/index.jsp'
                //}));
                 var statisticses=root.appendChild(new Ext.tree.TreeNode({
                    text : '统计分析',
                    expanded : false//默认展开根节点
                }));
                 var statistics=new Ext.tree.TreeNode({
	            	text : '数据生产'
	            });
/*                   statistics.appendChild(new Ext.tree.TreeNode({
                    text : '委办局原始数据统计',
                    leaf:true,
                    url:'page/statistics/statisticsbasedata.jsp'
                }));*/
                
                statistics.appendChild(new Ext.tree.TreeNode({
                    text : '委办局原始数据统计',
                    leaf:true,
                    url:'page/statistics/statisticsbasedata_new.jsp'
                }));
/*                   statistics.appendChild(new Ext.tree.TreeNode({
                    text : '委办局原始文件统计',
                    leaf:true,
                    url:'page/statistics/statisticsbasefile.jsp'
                }));*/
                 statistics.appendChild(new Ext.tree.TreeNode({
                    text : '委办局原始文件统计',
                    leaf:true,
                    url:'page/statistics/pre_wbjfile_new.jsp'
                }));
/*                    statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据抽取统计',
                    leaf:true,
                    url:'page/statistics/datacq.jsp'
                }));*/
                    statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据抽取统计',
                    leaf:true,
                    url:'page/statistics/datacq_new.jsp'
                }));                
/*                    statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据清洗统计',
                    leaf:true,
                    url:'page/statistics/dataclear.jsp'
                }));*/
                    statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据清洗统计',
                    leaf:true,
                    url:'page/statistics/dataclear_new.jsp'
                }));                
/*                     statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据转换统计',
                    leaf:true,
                    url:'page/statistics/datatrasition.jsp'
                }));*/
                     statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据转换统计',
                    leaf:true,
                    url:'page/statistics/datatrasition_new.jsp'
                }));  
                     statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据比对统计',
                    leaf:true,
                    url:'page/statistics/datacomp_new.jsp'
                })); 
                statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据库数据统计',
                    leaf:true,
                    url:'page/statistics/basicdata_new.jsp'
                }));                                         
                /*
                     statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据比对统计',
                    leaf:true,
                    url:'dataextraction/dataextraction.jsp'
                }));
                     statistics.appendChild(new Ext.tree.TreeNode({
                    text : '数据加载统计',
                    leaf:true,
                    url:'page/dataextraction/dataextraction.jsp'
                }));*/
                var statisticsed=new Ext.tree.TreeNode({
	            	text : '数据对账'
	            });
/*                 statisticsed.appendChild(new Ext.tree.TreeNode({
                    text : '中心前置与基础库对账统计',
                    leaf:true,
                    url:'page/statistics/centertobase.jsp'
                }));*/
                 statisticsed.appendChild(new Ext.tree.TreeNode({
                    text : '中心前置与基础库对账统计',
                    leaf:true,
                    url:'page/statistics/centertobase_new.jsp'
                }));
                
/*                  statisticsed.appendChild(new Ext.tree.TreeNode({
                    text : '委办局前置与中心前置对账统计',
                    leaf:true,
                    url:'page/statistics/wbjtocenter.jsp'
                }));*/
                
                 statisticsed.appendChild(new Ext.tree.TreeNode({
                    text : '委办局前置与中心前置对账统计',
                    leaf:true,
                    url:'page/statistics/wbjtocenter_new.jsp'
                }));
/*                  statisticsed.appendChild(new Ext.tree.TreeNode({
                    text : '委办局前置与基础库对账统计',
                    leaf:true,
                    url:'page/statistics/wbjtobase.jsp'
                }));*/
                  statisticsed.appendChild(new Ext.tree.TreeNode({
                    text : '委办局前置与基础库对账统计',
                    leaf:true,
                    url:'page/statistics/wbjtobase_new.jsp'
                }));
                statisticses.appendChild(statistics);
                  statisticses.appendChild(statisticsed);
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
                            
                            var html = '<iframe name="mainFrame" src="';
							var url = node.attributes.url;
							html = html
								+ url
								+ '" frameborder="0" height="100%" width="100%" style="overflow:hidden;"></iframe>';
                            
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
                  	height:screen_heightm-80,
                  	listeners: { beforeremove: function(ct,component ) {
                	Ext.TaskMgr.stopAll();}
                	}
                });
                var tabPanel1 = new Ext.TabPanel({
                    activeTab : 0, // 设置默认选择的选项卡
                    id : 'tabpanel1',
                    closable:true,
                    height:screen_heightm-80,
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
                             layout : 'fit',
                            region : 'west',// 指定子面板所在区域为west
                            width :screen_widthm*0.18
                        }, {
							autoScroll : false,
                            items : tabpanel,
                            id : 'mainContent',
                            layout : 'fit',
                            width :screen_widthm*0.82,
                            region : 'center'// 指定子面板所在区域为center
                        },{
                            frame:false,
                            autoScroll : true,
                            region : 'south',// 指定子面板所在区域为center
                            height :40,
                            html:"<div><br><font size='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                    &#169; Copyright 2013 神州数码信息系统有限公司 | Powered by Dcits.com</font></div>"
                        }]
                });
                var mainPanel = Ext.getCmp('mainContent');
            });

        </script>
	</head>
	<body>
		
	</body>
</html>