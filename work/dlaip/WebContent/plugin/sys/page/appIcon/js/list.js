Ext.BLANK_IMAGE_URL = getContextPath()
		+ '/resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
var pageSize = 15;
function init() {
	var checkboxsm = new Ext.grid.CheckboxSelectionModel();
	var fields = [ "id", 'type', 'typeName', 'name', 'iconUrl', 'appUrl' ];
	var columnLabel = new Ext.grid.ColumnModel([ checkboxsm,
			new Ext.grid.RowNumberer({
				header : "序号",
				width : 40
			}), {
				header : "应用名称",
				dataIndex : 'name',
				width : 80,
				sortable : true
			}, {
				header : "类型",
				dataIndex : 'typeName',
				width : 40,
				sortable : true
			}, {
				header : "应用链接",
				dataIndex : 'appUrl',
				width : 200,
				sortable : true
			}, {
				header : "操作",
				hidden : true,
				width : 40,
				dataIndex : 'id',
				sortable : true
			} ]);
	var gridStore = new Ext.data.JsonStore({
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options, response,
					arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		url : getHandlerRequestUrl() + "appIconHandler/listAppIcon",
		root : 'list',
		totalProperty : 'count',
		messageProperty : 'msg',
		fields : fields
	});
	var window = new Ext.Window({
		id : "win_add",
		title : '应用图标',
		width : 400,
		height : 250,
		closeAction : 'hide',
		layout : 'fit',
		buttonAlign : 'center',
		items : [ {
			xtype : 'form',
			id : 'editForm',
			frame : true,
			fileUpload : true,
			defaults : {
				anchor : "98%"
			},
			items : [
					{
						fieldLabel : '应用名称',
						xtype : 'textfield',
						name : 'name',
						allowBlank : false
					},
					{
						fieldLabel : '应用类型',
						xtype : 'combo',
						editable : false,
						mode : 'local',
						id : 'edit_type',
						hiddenName : 'type',
						store : new Ext.data.SimpleStore({
							fields : [ 'name', 'id' ],
							data : [ [ '公共应用', '0' ], [ '系统应用', '1' ] ]
						}),
						triggerAction : 'all',
						displayField : 'name',
						valueField : 'id',
						typeAhead : true,
						allowBlank : false,
						listeners : {
							change : function(c, n, o) {
								this.nextSibling().allowBlank = (n == '0');
							}
						}
					},
					{
						fieldLabel : '应用权限',
						xtype : 'combo',
						editable : false,
						mode : 'remote',
						id : 'edit_appId',
						hiddenName : 'appId',
						store : new Ext.data.JsonStore({ // 填充的数据
							url : getHandlerRequestUrl()
									+ 'appInfoHandler/getAppInfoList',
							autoLoad : true,
							fields : new Ext.data.Record.create([ 'appId',
									'appName' ])
						}),
						triggerAction : 'all',
						displayField : 'appName',
						valueField : 'appId',
						typeAhead : true,
						allowBlank : true
					}, {
						fieldLabel : '上传图标',
						id : 'edit_imgUpload',
						xtype : 'fileuploadfield',
						buttonText : '浏览',
						name : 'iconImage'
					}, {
						fieldLabel : '应用链接',
						xtype : 'textfield',
						name : 'appUrl',
						allowBlank : false
					}, {
						fieldLabel : 'ID',
						xtype : 'hidden',
						name : 'id',
						allowBlank : true
					} ]
		} ],
		buttons : [ {
			text : '确定',
			handler : function() {
				if (!Ext.getCmp('editForm').getForm().isValid()) {
					Ext.Msg.alert(undefined, "请完成表单。");
					return;
				}
				Ext.getCmp("editForm").getForm().doAction('submit', {
					url : getHandlerRequestUrl() + "appIconHandler/save",
					method : 'POST',
					headers : {
						"Accept" : "text/json"
					},
					success : function(form, action) {
						Ext.Msg.alert('信息', action.result.msg);
						Ext.getCmp("win_add").hide();
						Ext.getCmp("mainGrid").getStore().reload();
					},
					failure : function(form, action) {
						Ext.MessageBox.alert('警告', action.result.msg);
					}
				});
			}
		}, {
			text : '取消',
			handler : function() {
				this.ownerCt.ownerCt.hide();
			}
		} ]
	});
	var toolbar = new Ext.Toolbar({
		items : [ {
			text : '增加',
			iconCls : 'icon_add',
			handler : function() {
				Ext.getCmp("win_add").show();
				Ext.getCmp("edit_imgUpload").allowBlank = false;
				Ext.getCmp("editForm").getForm().reset();
			}
		}, {
			text : '修改',
			iconCls : 'icon_edit',
			handler : function() {
				id = getSelectIds(Ext.getCmp('mainGrid'));
				if (id.length == 1) {
					id = id[0];
				} else {
					Ext.Msg.alert("", "请选择1项以修改！");
					return;
				}
				Ext.getCmp("win_add").show();
				Ext.getCmp("editForm").getForm().reset();
				var store = Ext.getCmp("mainGrid").getStore();
				var data = store.getAt(store.find("id", id)).data;
				Ext.getCmp("edit_imgUpload").allowBlank = true;
				Ext.getCmp("editForm").getForm().setValues(data);
			}
		}, {
			text : '删除 ',
			iconCls : 'icon_delete',
			handler : function() {
				doDelete();
			}
		} ]
	});
	var grid = new Ext.grid.GridPanel({
		id : 'mainGrid',
		region : 'center',
		autoScroll : true,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		tbar : toolbar,
		border : false, // 是否显示行的边框
		cm : columnLabel,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		viewConfig : {
			forceFit : true
		},
		sm : checkboxsm,
		bbar : new Ext.PagingToolbar({
			pageSize : pageSize,
			store : gridStore,
			displayInfo : true,
			displayMsg : '列表数据 {0}-{1}共{2}项',
			emptyMsg : "无记录"
		})
	});
	var searchBar = new Ext.form.FormPanel({
		region : 'north',
		layout : 'column',
		autoHeight : true,
		frame : true,
		items : [ {
			layout : 'table',
			layoutConfig : {
				column : 2
			},
			items : [ {
				html : '应用名称：',
				style : {
					marginTop : '3px',
					marginLeft : '15px'
				}
			}, {
				xtype : 'textfield',
				name : 'name'
			} ]
		}, {
			layout : 'table',
			layoutConfig : {
				column : 2
			},
			items : [ {
				xtype : 'button',
				text : ' 搜索 ',
				iconCls : 'icon_query',
				style : {
					margin : '0 0 0 15px'
				},
				handler : function() {
					var sfv = this.ownerCt.getForm().getValues();
					var grid = Ext.getCmp('mainGrid');
					for (i in sfv) {
						grid.getStore().setBaseParam(i, sfv[i]);
					}
					grid.getStore().reload({
						params : {
							start : 0,
							limit : pageSize
						}
					});
				}
			}, {
				xtype : 'button',
				text : '重置',
				iconCls : 'icon_query',
				style : {
					margin : '0 0 0 15px'
				},
				handler : function() {
					this.ownerCt.getForm().reset();
					var sfv = this.ownerCt.getForm().getValues();
					var grid = Ext.getCmp('mainGrid');
					for (i in sfv) {
						grid.getStore().setBaseParam(i, sfv[i]);
					}
					Ext.getCmp("userTypeCombo").disable();
					Ext.getCmp("userTypeCombo").setValue("");
					Ext.getCmp("userCardTypeCombo").disable();
					Ext.getCmp("userCardTypeCombo").setValue("");
				}
			} ]
		} ]
	});
	document.viewport = new Ext.Viewport({
		renderTo : document.body,
		layout : {
			type : 'border',
			padding : 5
		},
		frame : true,
		items : [ searchBar, grid ]
	});
	document.viewport.doLayout();

	window.onresize = function() {
		document.viewport.doLayout();
	};
}

/**
 * 删除
 */
function doDelete(id) {
	if (!id) {
		id = getSelectIds(Ext.getCmp('mainGrid')).join(",");
		if (id.length == 0) {
			Ext.Msg.alert("", "请至少选择1项以删除！");
		}
	}
	Ext.Msg.confirm("", "请确认将删除此" + (id.split(",").length) + "项应用图标？",
			function(r) {
				if (r != "yes")
					return;
				Ext.Ajax.request({
					url : getHandlerRequestUrl() + 'appIconHandler/remove',
					params : {
						id : id
					},
					method : 'POST',
					success : function(response, opts) {
						Ext.Msg.alert(undefined, response.responseText,
								function() {
									Ext.getCmp("mainGrid").getStore().reload();
								});
					},
					failure : function(response, opts) {
						console.log('server-side failure with status code '
								+ response.status);
					}
				});
			});
}

function getSelectIds(grid) {
	var records = grid.getSelectionModel().getSelections();
	var array = [];
	for ( var i = 0; i < records.length; i++) {
		array.push(records[i].get("id"));
	}
	return array;
}