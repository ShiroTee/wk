<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.digitalchina.ldp.common.constant.Constant"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.UserInfoBean"%>
<%@ page import="com.digitalchina.ldp.app.ums.bean.AppInfoBean"%>
<html>
<%@include file="../../../common.jsp"%>

<%
	UserInfoBean userInfoBean = (UserInfoBean) session
	.getAttribute(Constant.USER_SESSION_ID);
%>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/css/desktop_icon.css" />
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resource/ext/js/ux/css/data-view.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resource/ext/js/ux/DataView-more.js"></script>
	<script>
		var ls = [];
		var pid="<%=request.getParameter("pid")%>";
		Ext.onReady(init);
		function init(){
			var tabPanel=new Ext.TabPanel({
				activeTab : 0, // 设置默认选择的选项卡				
				applyTo:document.body,
				height:600,
				border:false,
				tbar:createT_(),
				id:'dateViewTabPanel',
				listeners:{
					tabchange:function(){
						this.getActiveTab().getComponent(0).getComponent(0).getStore().load();
						ls=[];
						var toolbar = Ext.getCmp("dateViewTabPanel").getTopToolbar();
						toolbar.getComponent(1).disable();
					}
				},
				items:[
					<%for(int i=0;i<userInfoBean.getAppList().size();i++){
						AppInfoBean app=userInfoBean.getAppList().get(i);%>
						{
							title:'<%=app.getAppName()%>',
							items:[createIconPanel("<%=app.getAppId()%>")]
						}
						<%if(i<userInfoBean.getAppList().size()-1){%>
							,
						<%}%>
					<%}%>
				]
			});
		}
		function createIconPanel(appId)
		{
			var store = new Ext.data.JsonStore(
					{
						url : getHandlerRequestUrl() + "userFolderHandler/getResoucesByAppId?appId="+appId,
	
						fields : [ 'resourceId', "iconCls", "resourceName", "foliage", "url",
						{
							name : 'ppId',
							mapping : function(data)
							{
								return jsonConvert(data, "pid", "resourceId");
							}
						} ]
					});
					var tpl = new Ext.XTemplate(
							'<tpl for=".">',
							'<div class="thumb-wrap" id="{resourceId}" <tpl if="this.isLength(resourceName)">data-qtip="{resourceName}" data-qwidth="100" data-qalign="tl-br"</tpl>>',
							'<div class="thumb"><div class="{[values.foliage=="Y"?values.iconCls?values.iconCls:"file":"folder"]}" style="height: 48px; width: 48px;"></div></div>',
							'<span class="x-editable">{[values.resourceName.length>4?values.resourceName.substring(0,4):values.resourceName]}</span></div>', '</tpl>',
							'<div class="x-clear"></div>',{
	        	isLength:function(resourceName)
	        	{
	        		if(resourceName.length>4)
	        		{
	        			return true;
	        		}
	        		return false;
	        	},
	        	getResourceName:function(resourceName)
	        	{
	        		return resourceName.substring(0,2)+".";
	        	}
	        });
	
					var icons_name = "";
	
					var panel = new Ext.Panel(
					{
						id :appId,
						width : "100%",
						border:false,
						height:getScreen_height(),
						autoScroll : true,
						layout : 'fit',
						items : new Ext.DataView(
						{
							store : store,
							tpl : tpl,
							border:false,
							overClass : 'x-view-over',
							itemSelector : 'div.thumb-wrap',
							multiSelect:true,
							emptyText : 'No images to display',
							listeners:{
								dblclick:function(dv, index)
								{
									if (store.getAt(index).get("foliage") =="N")
									{
										var ppId = store.getAt(index).get("ppId");
										ls.push(ppId);
										var toolbar = Ext.getCmp("dateViewTabPanel").getTopToolbar();
										toolbar.getComponent(1).enable();
										toolbar.getComponent(1).setHandler(
												function()
												{
													if (ls.length == 0)
													{
														toolbar.getComponent(1)
																.disable();
														return;
													}
													store.reload(
													{
														params :
														{
															appId : appId,
															pid : ls.pop()
														}
													});
													if (ls.length == 0)
													{
														toolbar.getComponent(1)
																.disable();
													}
	
												});
										store.reload({
											params :
											{
												appId : appId,
												pid :store.getAt(index).get("resourceId")
											}
										});
									}
								}
							},
							
							plugins : [ new Ext.DataView.DragSelector() ],
	
							prepareData : function(data)
							{
								data.shortName = Ext.util.Format.ellipsis(data.name, 15);
								data.sizeString = Ext.util.Format.fileSize(data.size);
								return data;
							}
						})
					});
	
					panel.addClass("image-view-pannel");
					return panel;
		}
		function createT_()
		{
			var toolbar = new Ext.Toolbar();
			toolbar.addButton(new Ext.Button(
			{
				text : "添加",
				iconCls : 'icon_add',
				handler:function()
				{
					var arrays=Ext.getCmp("dateViewTabPanel").getActiveTab().getComponent(0).getComponent(0).getSelectedRecords();
					if(arrays.length==1)
					{
						var url=getHandlerRequestUrl()+"userFolderHandler/addApp?pid="+pid+"&resourceId="+arrays[0].get("resourceId")+"&fileName="+arrays[0].get("resourceName")+"&iconCls="+arrays[0].get("iconCls")+"&foliage="+arrays[0].get("foliage");
						url=encodeURI(url);
						search_(url,"添加应用异常",function(){
							alert("添加应用成功");
							if(pid=="")
							{
								
								parent.location.reload();
								return;
							}
							//parent.store_.reload();
							//开始刷新
							parent.frames["126f9151-c187-430a-abbb-fdb45e822c7b"].Ext.getCmp("DataViews").getStore().reload();
						});
					}else{
						alert("请先选择你需要添加的应用对应的图标");
					}
				}
			}));
			toolbar.addButton(new Ext.Button(
					{
						text : "后退",
						iconCls : 'icon_back',
						disabled : true
					}));
			return toolbar;
		}
		function createW_2()
		{
		
			var win = new top.Ext.Window(
					{
						closeAction : 'close',
						frame:false,
						layout:'fit',
						resizable : false,
						frame : false,
						width : 400,
						height :180,
						border:false,
						bodyStyle:'padding:20 30 10 20',
						shadow : true,
						title : '新建文件夹',
						modal : true,
						closable : true,
						animCollapse : true,
						items:createP_(),
						buttonAlign : "center",
						buttons:[{
							text : "确定"
						}
						         ]
		});
			win.addClass("image-view-pannel");
			win.show();
		}
		function createP_()
		{
			
			return new Ext.Panel({
				layout:'column',
				border:false,
				bodyStyle:'background:#dfe8f6',
				items:[{
					columnWidth:.2,
					border:false,
					bodyStyle:'background:#dfe8f6',
					height:48,
					items:[{
						html:'<div class="thumb-wrap" onclick="test();"><div class="thumb"><div class="file" style="height: 48px; width: 48px;"></div></div>',
						width:48,
						height:48,
						bodyStyle:'background:#dfe8f6',
						border:false
					}]
				},{
					columnWidth:.8,
					border:false,
					bodyStyle:'background:#dfe8f6',
					items:[{
						xtype:'label',
						text:'请输入文件夹名称：'
					},{
						html:'&nbsp;',
						bodyStyle:'background:#dfe8f6',
						border:false
					},{
						xtype:'textfield',
						width:260
					}]
				}]
			});
		}
	</script>
	<body>
	</body>
</html>