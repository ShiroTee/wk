Ext.BLANK_IMAGE_URL = getContextPath() + 'resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
// 初始化函数，用于显示表格组件，表单组件
var selectedNode;
var loadedTreeNodeList = [];
var comboData;
var sform;

var actionAdd = new Ext.Action( {
	text : '添加目录节点',
	handler : function() {
		if (selectedNode == undefined) {
			Ext.Msg.alert("警告", "请先选择要在哪一个节点下添加新条目");
			return false;
		}
		Ext.Msg.show( {
			title : '创建目录',
			msg : '是否要在 <' + selectedNode.text + '> 目录下创建新的子目录',
			buttons : {
				yes : '确定',
				no : '取消'
			},
			fn : function(btn) {
				if (btn == 'yes') {
					Ext.getCmp('parentId').getEl().parent().parent().parent().first().dom.innerHTML='父目录:';
					Ext.getCmp('hiddenField').setValue('add');
					Ext.getCmp('nodeName').setValue('');
					Ext.getCmp('comment').setValue('');
					sform.show();
				} else {
				}
			},
			icon : Ext.MessageBox.QUESTION
		});
	},
	iconCls : 'icon_add'
});
var actionEdit = new Ext.Action( {
	text : '修改目录节点',
	handler : function() {
		if (selectedNode == undefined) {
			Ext.Msg.alert("警告", "请选中您要修改的条目");
			return false;
		}
		Ext.Msg.show( {
			title : '修改目录',
			msg : '是否要修改 <' + selectedNode.text + '> 条目',
			buttons : {
				yes : '确定',
				no : '取消'
			},
			fn : function(btn) {
				if (btn == 'yes') {
					Ext.getCmp('parentId').getEl().parent().parent().parent().first().dom.innerHTML='所选节点:'
					Ext.getCmp('hiddenField').setValue('edit');
					Ext.getCmp('nodeName').setValue(selectedNode.text);
					Ext.getCmp('comment').setValue(selectedNode.comment);
					sform.show();
				} else {
				}
			},
			icon : Ext.MessageBox.QUESTION
		});
	},
	iconCls : 'icon_edit'
});
var actionDelete = new Ext.Action( {
	text : '删除目录节点',
	handler : function() {
		if (selectedNode == undefined) {
			Ext.Msg.alert("警告", "请选中您要删除的条目");
			return false;
		}
		Ext.Msg.show( {
			title : '删除目录',
			msg : '是否要删除 <' + selectedNode.text + '> 目录以及其下的所有条目',
			buttons : {
				yes : '确定',
				no : '取消'
			},
			fn : function(btn) {
				if (btn == 'yes') {
					sform.hide();
					ajaxRemoveNode();
				} else {
				}
			},
			icon : Ext.MessageBox.QUESTION
		});
	},
	iconCls : 'icon_cancel'
});

function init() {
	ajaxLoadTree();
}

function ajaxLoadTree() {
	Ext.Ajax.request( {
				url : getContextPath() + 'app/http/sps/serviceCatalogHandler/loadTree',
				method : 'post',
				async : false,
				success : function(response, options) {
					loadedTreeNodeList = Ext.util.JSON
							.decode(response.responseText).list;
					show();
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('失败',
							'请求超时或网络故障,错误编号：' + response.status);
				}
			});
}

function ajaxAddNode() {
	Ext.Ajax
			.request( {
				url : getContextPath() + 'app/http/sps/serviceCatalogHandler/addNode',
				method : 'post',
				params:{
					parentId : Ext.getCmp('parentId').getValue(),
					nodeName : Ext.getCmp('nodeName').getValue(),
					comment: Ext.getCmp('comment').getValue()
				},
				success : function(response, options) {
					loadedTreeNodeList = Ext.util.JSON
							.decode(response.responseText).list;
					comboData=hierarchy();
					Ext.getCmp('parentId').store.loadData(comboData);
					Ext.getCmp('treePanel').removeAll();
					Ext.getCmp('treePanel').add(initTree());
					Ext.getCmp('treePanel').doLayout();
					Ext.getCmp('nodeName').setValue('');
					Ext.getCmp('comment').setValue('');
					comboData=hierarchy();
					selectedNode=undefined;
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('失败',
							'请求超时或网络故障,错误编号：' + response.status);
				}
			});
}

function ajaxEditNode() {
	Ext.Ajax
			.request( {
				url : getContextPath() + 'app/http/sps/serviceCatalogHandler/editNode',
				method : 'post',
				params:{
					nodeId : selectedNode.id,
					parentId : Ext.getCmp('parentId').getValue(),
					nodeName : Ext.getCmp('nodeName').getValue(),
					comment: Ext.getCmp('comment').getValue()
				},
				success : function(response, options) {
					loadedTreeNodeList = Ext.util.JSON
							.decode(response.responseText).list;
					comboData=hierarchy();
					Ext.getCmp('parentId').store.loadData(comboData);
					Ext.getCmp('treePanel').removeAll();
					Ext.getCmp('treePanel').add(initTree());
					Ext.getCmp('treePanel').doLayout();
					Ext.getCmp('nodeName').setValue('');
					Ext.getCmp('comment').setValue('');
					comboData=hierarchy();
					selectedNode=undefined;
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('失败',
							'请求超时或网络故障,错误编号：' + response.status);
				}
			});
}

function ajaxRemoveNode() {
	Ext.Ajax.request( {
				url : getContextPath() + 'app/http/sps/serviceCatalogHandler/removeNode',
				method : 'post',
				params:{nodeId:selectedNode.id},
				success : function(response, options) {
					loadedTreeNodeList = Ext.util.JSON.decode(response.responseText).list;
					comboData=hierarchy();
					Ext.getCmp('parentId').store.loadData(comboData);
					Ext.getCmp('treePanel').removeAll();
					Ext.getCmp('treePanel').add(initTree());
					Ext.getCmp('treePanel').doLayout();
					Ext.getCmp('nodeName').setValue('');
					selectedNode=undefined;
				},
				failure : function(response, options) {
					Ext.MessageBox.alert('失败',
							'请求超时或网络故障,错误编号：' + response.status);
				}
			});
}

function show() {
	comboData=hierarchy();
	sform=new Ext.FormPanel( {
		labelAlign: 'top',  //标签位置
		labelWidth: 50,       //标签宽度
		bodyStyle : 'padding:5px 5px 0',
		buttonAlign : 'center',
		width : 420,
		defaultType : 'textfield',
		hidden : true,
		defaults: {width: 400},
		autoHeight: true,
		items : [ {
			xtype : 'combo',
			editable: false,
			fieldLabel : '目标节点',
			id : 'parentId',
			store : new Ext.data.SimpleStore( {
				fields : [ 'value', 'text' ],
				data : comboData
			}),
			displayField : 'text',
			valueField : 'value',
			triggerAction: 'all',
			mode : 'local',
			emptyText : '请选择节点'
		}, {
			fieldLabel : '节点名称',
			emptyText: '请输入节点名称',
			id : 'nodeName'
		},{
			fieldLabel : '备注',
			xtype:'textarea',
			emptyText: '',
			id : 'comment'
		}, {
			xtype : 'hidden',
			id : 'hiddenField'
		} ],

		buttons : [ {
			text : '提 交',
			id : 'btnSubmit',
			onClick : function(e) {
				sform.hide();
				if("add"==Ext.getCmp('hiddenField').getValue()){
					ajaxAddNode();
				}else if("edit"==Ext.getCmp('hiddenField').getValue()){
					ajaxEditNode();
				}
			}
		}, {
			text : '取 消',
			id : 'Cancel',
			onClick : function(e) {
				sform.hide();
				Ext.getCmp('nodeName').setValue('');
				Ext.getCmp('hiddenField').setValue('');
				Ext.getCmp('comment').setValue('');
			}
		} ]
	});
	
	var viewPort = new Ext.Viewport( {
		layout : 'border',// 表格布局
		id: 'mainViewPort',
		items : [ {
			items : initTree(),
			split : true,
			id : 'treePanel',
			layout : 'fit',
			region : 'west',// 指定子面板所在区域为west
			width : 300
		}, {
			items : initForm(),
			layout : 'fit',
			width : screen_width * 0.82,
			region : 'center'// 指定子面板所在区域为center
		} ]
	});
}

function initForm() {
	var panel = new Ext.Panel( {
		width : 600,
		height : 300,
		bodyStyle : 'padding:10px;',
		tbar : [ actionAdd, actionEdit, actionDelete ],
		items : [ sform ]
	});

	return panel;
}

// 初始化左边目录树
function initTree() {
	var root = new Ext.tree.TreeNode( {
		text : '服务目录树',
		id : 'treeRoot',
		expanded : true
	});
	root.id = 0;
	addSubNode(root);

	var tree = new Ext.tree.TreePanel( {
		frame : true,
		autoScroll : true,
		id : "catalogueTree",
		// columnWidth : .2,
		split : true,
		root : root,
		height : 700,
		bodyStyle : "background-color:#ffffff;",
		text : '操作菜单',
		listeners : {
			click : function(node, e) {
				selectedNode = node;
				if(Ext.getCmp('parentId')!=undefined){
					Ext.getCmp('parentId').setValue(selectedNode.id);
					if("add"==Ext.getCmp('hiddenField').getValue()){
						Ext.getCmp('nodeName').setValue('');
						Ext.getCmp('comment').setValue('');
					}else if("edit"==Ext.getCmp('hiddenField').getValue()){
						Ext.getCmp('nodeName').setValue(selectedNode.text);
						Ext.getCmp('comment').setValue(selectedNode.comment);
					}
				}
			}
		}
	});
	return tree;
}
function addSubNode(node) {
	for ( var i = 0; i < loadedTreeNodeList.length; i++) {
		var data = loadedTreeNodeList[i];
		if(data.parentId==undefined){
			data.parentId=0;
		}
		if (node.id == data.parentId) {
			var n = new Ext.tree.TreeNode();
			n.text = data.name;
			n.comment=data.comment;
			n.id = data.id;
			n.leaf = false;
			n.expanded=false;
			node.appendChild(n);
			addSubNode(n);
		}
	}
}

function hierarchy() {
	var treeData = [];
	var itemRoot = [];
	itemRoot[0]="0";
	itemRoot[1]="/";
	treeData[0]=itemRoot;
	for ( var i = 0; i < loadedTreeNodeList.length; i++) {
		var item = [];
		item[0] = loadedTreeNodeList[i].id;
		item[1] = getFullName(i);
		treeData[i+1] = item;
	}
	return treeData;
}

function getFullName(index) {
	var name = loadedTreeNodeList[index].name;
	while (loadedTreeNodeList[index].parentId!=undefined&&loadedTreeNodeList[index].parentId!= "0") {
		for ( var i = 0; i < loadedTreeNodeList.length; i++) {
			if (loadedTreeNodeList[i].id == loadedTreeNodeList[index].parentId) {
				name = loadedTreeNodeList[i].name + "/" + name;
				index = i;
			}
		}
	}
	return "/"+name;
}
