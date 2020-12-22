Ext.BLANK_IMAGE_URL = PROJECT_ROOT
		+ '/resource/ext/resources/images/default/s.gif';
Ext.onReady(init);
function init() {
	var win = new Ext.Window({

		layout : 'fit',
		closeAction : 'close',
		resizable : false,
		renderTo:document.body,
		width : 500,
		height : 300,
		bodyStyle : 'padding:5 5 5 5',
		shadow : true,
		title : '详细',
		modal : true,
		closable : true,
		animCollapse : true,
		buttonAlign : 'center',
		items : [ createTabPanel() ]
	});
	win.show();
}
function createTabPanel() {
	var tabpanel = new Ext.TabPanel({
		autoDestroy : true,
		draggable : false,
		closable : true,
		items : [{
					title:'详细信息',
					items :[createForm()]
			},{
				title:'执行SQL'
			}
			]
	});
	return tabpanel;
}
function createForm()
{
	var form=new Ext.form.FormPanel();
	return form;
}
function createSQLGrid() 
{
}