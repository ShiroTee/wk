var tempStore = null;
Ext.onReady(init);
var ls = [];
function init() {
	var win_id = pid;
	var store = new Ext.data.JsonStore({
		url : getHandlerRequestUrl()
				+ "userFolderHandler/getUserFolderListByPid",

		fields : [ 'folderName', "iconCls", "type", "foliage", "url", "id", {
			name : 'ppId',
			mapping : function(data) {
				return jsonConvert(data, "pid", "id");
			}
		} ]
	});
	store.load({
		params : {
			pid : pid
		}
	});
	var tpl = new Ext.XTemplate(
			'<tpl for=".">',
			'<div class="thumb-wrap" id="{id}">',
			'<div class="thumb"><div class="{iconCls}" style="height: 48px; width: 48px;"></div></div>',
			'<span class="x-editable">{folderName}</span></div>', '</tpl>',
			'<div class="x-clear"></div>');

	var icons_name = "";
	var tbarObj=createT();
	var panel = new Ext.Panel(
			{
				id : 'images-view',
				width : "100%",
				height : 440,
				border : false,
				autoScroll : true,
				layout : 'fit',
				applyTo : document.body,
				tbar : tbarObj,
				items : new Ext.DataView(
						{
							store : store,
							tpl : tpl,
							id : 'DataViews',
							border : false,
							multiSelect : true,
							overClass : 'x-view-over',
							itemSelector : 'div.thumb-wrap',
							emptyText : 'No images to display',

							plugins : [ new Ext.DataView.DragSelector() ],

							prepareData : function(data) {
								data.shortName = Ext.util.Format.ellipsis(
										data.name, 15);
								data.sizeString = Ext.util.Format
										.fileSize(data.size);
								return data;
							},

							listeners : {
								dblclick : {
									fn : function(dv, index) {										
										p = window.parent;
										p.store_ = store;
										var resourceId = store.getAt(index)
												.get("id");
										var resourceName = store.getAt(index)
												.get("folderName");
										var url = store.getAt(index).get("url");
										if (store.getAt(index).get("type") == 0) {
											pid = resourceId;
											var toolbar = panel.getTopToolbar();
											toolbar.getComponent(0).enable();
											var ppId = store.getAt(index).get(
													"ppId");
											ls.push(ppId);
											var win = parent.Ext.getCmp("bogus"
													+ win_id);

											win.setTitle(win.title + "/"
													+ resourceName);
											toolbar
													.getComponent(0)
													.setHandler(
															function() {
																if (ls.length == 0) {
																	toolbar
																			.getComponent(
																					0)
																			.disable();
																	return;
																}
																store
																		.reload({
																			params : {
																				appId : appId,
																				pid : ls
																						.pop()
																			}
																		});
																var arrays = win.title
																		.split("\/");
																var title = win.title
																		.replace(
																				arrays[arrays.length - 1],
																				"");
																title = title
																		.substr(
																				0,
																				title.length - 1)

																win
																		.setTitle(title);
																if (ls.length == 0) {
																	toolbar
																			.getComponent(
																					0)
																			.disable();
																}

															});
											store.reload({
												params : {
													pid : resourceId
												}
											});
										} else if (store.getAt(index).get(
												"type") == 1) {
											p = window.parent;
											p.app_.createMyWindow({
												type : 1,
												folderName : resourceName,
												id : resourceId,
												url : url
											});

										}
									}
								}
							}
						})
			});

	panel.addClass("image-view-pannel");

}
function createT() {
	var toolbar=[{
		xtype: 'button', 
		text: '后退',
		iconCls:'icon_back',
		disabled : true
	},{
		xtype: 'button', 
		text: '新建文件夹',
		iconCls:'icon_add',
		handler:function(){
			var win = new Ext.Window({
				layout : 'fit',
				closeAction : 'close',
				resizable : false,
				frame : true,
				width : 400,
				height : 180,
				border : false,
				title : '新建文件夹',
				modal : true,
				closable : true,
				items : [{
					xtype : 'form',
					id : 'folderForm_',
					frame : true,
					bodyStyle : 'padding:30 5 5 20;',
					border : false,
					items : [ {
						fieldLabel : '请输入文件夹名称',
						labelStyle : 'margin-top:-3px',
						xtype : 'textfield',
						value : '新建文件夹',
						width : 220,
						name : 'folderName',
						allowBlank : false,
						blankText : '请输入服务名称'
					} ]
				} ],
				buttonAlign : "center",
				buttons : [ {
					text : "确定",
					handler : function() {
						var url = getContextPath();
						url = url+ "app/http/ums/userFolderHandler/newFolder?pid="+ pid;
						var form = Ext.getCmp("folderForm_");
						form.form.submit({
							clientValidation : true, // 进行客户端验证
							waitMsg : '正在提交数据请稍后', // 提示信息
							waitTitle : '提示', // 标题
							url : url,
							method : 'POST', // 请求方式
							success : function(form,action) {
								var result = Ext.util.JSON.decode(action.response.responseText);
								Ext.getCmp("DataViews").getStore().reload();
								win.close();
							},
							failure : function(form,action) {
								var result = Ext.util.JSON.decode(action.response.responseText);
								Ext.Msg.alert('提示',result.msg);
							}
						});
					}
				} ]
			});
			win.show();
		}
	},{
		xtype: 'button', 
		text: '删除',
		iconCls:'icon_delete',
		handler:function(){
			Ext.MessageBox.confirm("提示", "您确定要删除吗?", function(btnId) {
				if (btnId == 'yes') {
					var arrays=Ext.getCmp("DataViews").getSelectedRecords();
					if(arrays.length==1){
						var id=arrays[0].get("id");
						var url= getHandlerRequestUrl()+ "userFolderHandler/deleteUserFolder?folderId="+id;
						search_(url,"",function(){
							Ext.getCmp("DataViews").getStore().reload();
						});
					}
				}
			});
		}
	},{
		xtype: 'button', 
		text: '添加应用',
		iconCls:'icon_add',
		handler:function(){
			p = window.parent;
			p.app_.createMyWindow({
				type : 1,
				folderName : "添加应用",
				id : "b4a710c8-26c7-450c-8c85-273912c684c4",
				url : "plugin/ums/page/user_folder/user_folder.jsp?pid=126f9151-c187-430a-abbb-fdb45e822c7b"
			});
		}
	}];
	return toolbar;
}