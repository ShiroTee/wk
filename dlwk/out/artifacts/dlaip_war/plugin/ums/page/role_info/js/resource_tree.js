//打开资源树
function resourceTreeWin()
{
	var grid = Ext.getCmp("roleGrid");
	var list = getGridList(grid, "roleId");
	if (list.length != 1)
	{
		Ext.Msg.alert('提示', "每次只能对一个角色进行资源分配操作");
		return false;
	}
	var roleId=list[0];
	list=getGridList(grid, "appId");
	var appId=list[0];
	var appName=getGridList(grid, "appName")[0];
	var resourceInfTreeWin = new Ext.Window(
	{
		layout : 'fit',
		width : 480,
		height : 400,
		title : appName+" 资源树",
		closeAction : 'close',
		id : "resourceInfTreeWin",
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5px 5px 5px 5px',
		items : [ createResourceTrePanel(roleId,appId) ],
		buttons : [

		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("resourceInfTreeWin").close();
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler : saveRoleResourceInfo
		}/*,
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function()
			{
				Ext.getCmp("resourceTree_id").form.reset();
			}
		} */]
	});
	resourceInfTreeWin.show();
	Ext.getCmp("resourceTree_id").expandAll();
}
function createResourceTrePanel(roleId,appId)
{
	var checkTreeIdArr = new Array();
	var root = new Ext.tree.AsyncTreeNode(
	{
		text : '资源树',
		draggable : false,
		id : 'ROOT',
		expanded : true,
		
		loader : new Ext.tree.TreeLoader(
		{
			dataUrl : getHandlerRequestUrl()
					+ "roleResourceInfoHandler/getResourceInfoForTree?roleId="
					+ roleId+"&appId="+appId
		})
	});

	var tree = new Ext.tree.TreePanel(
			{
				useArrows : true,
				autoScroll : true,
				lines : true,// 横竖线
				height : 3000,
				width : 420,
				animate : true,
				frame : true,
				enableDD : true,
				bodyStyle : 'padding:5px 30px 5px 10px',
				id : "resourceTree_id",
				roleId : roleId,
				containerScroll : true,
				border : false,
				root : root,
				listeners :
				{
					"checkchange" : function(node, state)
					{
						if (node.parentNode != null)
						{
							node.cascade(function(node)
							{
								node.attributes.checked = state;
								node.ui.checkbox.checked = state;
								return true;
							});
							var pNode = node.parentNode;
							if (state == true)
							{
								var cb = pNode.ui.checkbox;
								// 点击父节点展开子节点并选中
								checkchangeListner(node, state);
								// 点击子节点，选中父节点
								checkPnodeListner(pNode);
							} else
							{
								var _miss = false;
								for ( var i = 0; i < pNode.childNodes.length; i++)
								{
									if (checkTreeIdArr
											.contains(pNode.childNodes[i].id))
									{
										checkTreeIdArr
												.remove(pNode.childNodes[i].attributes.id);
									}
									if (pNode.childNodes[i].attributes.checked != state)
									{
										_miss = true;
									}
								}
								if (!_miss)
								{
									pNode.ui.toggleCheck(state);
									pNode.attributes.checked = state;
								}
							}
						}
					}
				}
			});
	tree.on('expandnode', function(node)
	{

	});
	return tree;
}
function saveRoleResourceInfo()
{
	var tree = Ext.getCmp("resourceTree_id");
	var checkedNodes = tree.getChecked();
	var s = [];
	for ( var i = 0; i < checkedNodes.length; i++)
	{
		s.push(checkedNodes[i].id);

	}
	var url = getHandlerRequestUrl()
			+ "roleResourceInfoHandler/addResourceInfoToUser?roleId="
			+ tree.roleId + "&resourceIds=" + s.join(",");
	search_(url, "保存资源到角色异常", function()
	{
		Ext.Msg.alert('提示', "操作成功", function()
		{
			tree.root.reload();
			Ext.getCmp("resourceInfTreeWin").close();
		});

	});
}
//监听选中父节点
function checkPnodeListner(pNode){
	var cb = pNode.ui.checkbox;
	if(cb) {
		cb.checked = true;  
		cb.defaultChecked = true;
	}
	pNode.attributes.checked = true;
	if(pNode.parentNode.id != 'ROOT'){
		checkPnodeListner(pNode.parentNode);
	}
	
}
function checkchangeListner(node, checked) {
	   if (node instanceof Ext.tree.TreeNode && node.hasChildNodes()) {
	    node.expand(true, false, function(pnd) {
	       pnd.eachChild(function(child) {
	          child.ui.toggleCheck(checked);
	          child.attributes.checked = checked;
	          child.fireEvent('checkchange',
	            checkchangeListner, child);
	         }, pnd);
	      });
	   }
	}