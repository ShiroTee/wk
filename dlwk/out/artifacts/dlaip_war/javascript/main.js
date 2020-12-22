var screen_height;
var screen_width;
Ext.onReady(createMainPanel);
function createMainPanel()
{
	screen_height = getScreen_height();
	screen_width = getScreen_width();
	new Ext.Viewport(
	{
		layout : 'border',
		items : [
		{
			frame : false,
			region : 'north',
			html : 'top信息',
			height : 30
		},
		{
			items : createLeftPanel(),
			split : false,
			region : 'west',
			layout : 'fit',
			width : screen_width * 0.18
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
			height : 20,
			html : "当前登录人：徐文浩|所在部门:神州数码信息系统有限公司|当前操作岗位：管理员岗位"
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
		layout : 'accordion',
		autoScroll : true,
		tbar : createToolbar(),
		items : createAppItems()
	});
	var root_url = "/aip/app/http/";
	return accordion;
}
function createToolbar()
{
	var toolbar = new Ext.Toolbar();
	toolbar.addText("切换岗位:");
	toolbar.addItem(new Ext.form.ComboBox(
	{
		mode : 'local',
		id : 'logsIsExceptionCombox',
		store : new Ext.data.SimpleStore(
		{
			fields : [ 'name', 'id' ],
			data : [ [ '岗位1', '' ], [ '岗位2', 'Y' ], [ '岗位3', 'N' ] ]
		}),
		listeners :
		{
			select : function(combo, record, index)
			{
			}
		},
		triggerAction : 'all',
		displayField : 'name',
		valueField : 'id',
		value : "",
		width : 150,
		forceSelection : true,
		resizable : true,
		typeAhead : true,
		handleHeight : 10
	}));
	return toolbar;
}
var appList = [ '事项管理系统', '材料管理系统', '系统管理' ]
function createAppItems()
{
	var list = [];
	for ( var i = 0; i < 3; i++)
	{
		list.push(new Ext.Panel(
		{
			title : appList[i],
			items : [ createTreePanel() ]
		}));
	}
	return list;
}
function createTreePanel()
{
	var root_url = "/aip/app/http/";
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : '操作菜单',
		id : 'ROOT',
		expanded : false,
		url : '#',
		loader : new Ext.tree.TreeLoader(
		{
			url : root_url + "ums/loginHandler/initworkspaceForSync"
		})
	});
	var tree = new Ext.tree.TreePanel(
	{
		border : false,
		autoScroll : true,
		frame : true,
		rootVisible : true,
		collapseFirst : true,
		hrefTarget : 'mainContent',
		root : root,
		text : '操作菜单',
		listeners :
		{
			click : function(node, e)
			{

			}
		}
	});
	return tree;
}
function createWorkSpacePanel()
{
	var p = new Ext.TabPanel(
	{
		id : 'workspacePanel',
		autoDestroy : true,
		draggable : false,
		closable : true,
		height : screen_height - 80
	});
	return p;
}