//打开机构新增窗口
function openOrgAddWin()
{
	var treePanel=Ext.getCmp("orgTree");
	var node=treePanel.getSelectionModel().getSelectedNode();
	if(node==null)
	{
		Ext.Msg.alert('错误提示', "请选中一个机构树节点");
		return;
	}
	
	var organizationWin = new Ext.Window(
	{
		layout : 'fit',
		width : 450,
		height :400,
		title : '新增机构信息',
		closeAction : 'close',
		id:"organizationWin",
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5px 5px 5px 5px',
		items : [ createOrgForm() ],
		buttons : [
		
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler : function()
			{
				Ext.getCmp("organizationWin").close();
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler:function (){
				if(Ext.getCmp("orgForm").getForm() .isValid()){
					saveOrgInfo();
				}
				else{
					Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
				}
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function()
			{
				Ext.getCmp('orgForm').form.reset();
			}
		} ]
	});
	Ext.getCmp("orgPNameTextValue").setValue(node.text);
	Ext.getCmp("orgPidTextValue").setValue(node.id);
	organizationWin.show();
}
function createOrgForm()
{
	var organizationFroms = new Ext.FormPanel(
	{
		labelSeparator : "：",
		frame : true,
		width : 500,
		id:"orgForm",
		bodyStyle : 'padding:15px 0px 20px 20px',
		border : false,
		
		buttonAlign : 'center',
		items : [
		{
			xtype : 'textfield',
			name : 'pName',
			id:"orgPNameTextValue",
			width : 240,
			allowBlank : false,
			readOnly:true,
			maxLength : 50,// 允许输入的最大字符数3
			fieldLabel : '<span style="color:red;">*</span>父节点名称'
		},
		{
			xtype : 'textfield',
			name : 'orgName',
			width : 240,
			allowBlank : false,
			blankText : '机构名称',
			regex:/[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText:"有非法字符或空格",
			maxLength : 50,// 允许输入的最大字符数
			maxLengthText : "最大长度不能超过50个字符！",// 提示文本
			fieldLabel : '<span style="color:red;">*</span>机构名称'
		},
		{
			xtype : 'textfield',
			name : 'orgCode',
			width : 240,
			allowBlank : false,
			blankText : '请输入机构编码',
			maxLength : 50,// 允许输入的最大字符数3
			maxLengthText : "最大长度不能超过50个字符！",// 提示文本
			fieldLabel : '<span style="color:red;">*</span>机构编码'
		},
		{
			xtype : 'textfield',
			name : 'linkMan',
			width : 240,
			regex:/[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
			regexText:"有非法字符或空格",
			id : 'linkManId',
			blankText : '机构负责人',
			maxLength : 20,// 允许输入的最大字符数20
			maxLengthText : "机构负责人最大长度不能超过20个字符！",// 提示文本
			fieldLabel : '机构负责人'
		},
		{
			xtype : 'textfield',
			name : 'zipCode',
			width : 240,
			regex:/[0-9][0-9][0-9][0-9][0-9][0-9]/,
			regexText:"请输入正确的6位邮政编码",
			blankText : '机构邮政编码',
			minLength : 6,// 允许输入的最大字符数20
			minLengthText : "机构邮政编码最小长度不能超过6个字符！",// 提示文本
			maxLength : 6,// 允许输入的最大字符数20
			maxLengthText : "机构邮政编码最大长度不能超过6个字符！",// 提示文本
			fieldLabel : '机构邮政编码'
		},
		{
			xtype : 'textfield',
			name : 'phoneNumber',
			width : 240,
			regex:/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
			regexText:"请检查格式",
			id : 'phoneNumberId',
			blankText : '机构电话',
			maxLength : 20,// 允许输入的最大字符数20
			maxLengthText : "机构电话最大长度不能超过20个字符！",// 提示文本
			fieldLabel : '机构电话'
		}, {
			xtype : 'textarea',
			name : 'orgAddress',
			width : 240,
			anchor : '89% 20%',
			fieldLabel : '联系地址'
		},{
            xtype: 'radiogroup',
            fieldLabel: '状态',
            width : 240,
            columns: [120, 120],
            vertical: true,
            items: [
                    {boxLabel: '启用', name: 'status', inputValue:'Y', checked: true},
                {boxLabel: '禁用', name: 'status', inputValue:'N'}
               
         
            ]
        },{
			xtype : 'textfield',
			name : 'orgPid',
			width : 240,
			id : 'orgPidTextValue',
			hidden:true
		},{
			xtype : 'textfield',
			name : 'orgId',
			hidden:true
		}]
	});
	return organizationFroms;
}
function saveOrgInfo()
{
	var form=Ext.getCmp("orgForm");
	var url=getHandlerRequestUrl()+"orgInfoManagerHandler/saveOrgInfo";
	submitForm(form, url,"保存机构信息异常",function(){
		Ext.Msg.alert('提示', "保存机构信息成功",function(){
			var tree=Ext.getCmp("orgTree");
			tree.root.reload();
			var grid=Ext.getCmp("orgInfoGrid");
			grid.store.reload();
			Ext.getCmp("organizationWin").close();
		});
		
	});
}
function showOrgEditWin()
{
	var grid = Ext.getCmp("orgInfoGrid");
	var list=getGridList(grid,"orgId");
	if(list.length!=1)
	{
		Ext.Msg.alert('提示', "每次只能对一条机构数据进行编辑");
		return false;
	}
	var orgId=list[0];
	var organizationWin = new Ext.Window(
			{
				layout : 'fit',
				width : 450,
				height :400,
				title : '修改机构信息',
				closeAction : 'close',
				id:"orgEditWin",
				plain : true,
				modal : true,
				resizable : true,
				buttonAlign : 'center',
				bodyStyle : 'padding:5px 5px 5px 5px',
				items : [ createOrgForm() ],
				buttons : [
				
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						Ext.getCmp("orgEditWin").close();
					}
				},
				{
					text : '保存',
					iconCls : 'icon_save',
					handler:function (){
						if(Ext.getCmp("orgForm").getForm() .isValid()){
							updataOrgInfo();
						}
						else{
							Ext.MessageBox.alert('提示信息', '有必填项或错误信息');
						}
						
					}
				}/*,
				{
					text : '重置',
					iconCls : 'icon_reset',
					handler : function()
					{
						Ext.getCmp('orgForm').form.reset();
					}
				}*/ ]
			});
			organizationWin.show();
			var form = Ext.getCmp("orgForm");
			var url = getHandlerRequestUrl()
					+ "orgInfoManagerHandler/getOrgInfoById?orgId=" + orgId;
			loadForm(form, url, "获取机构信息异常");
}
function updataOrgInfo()
{
	var form = Ext.getCmp("orgForm");
	var url = getHandlerRequestUrl()
	+ "orgInfoManagerHandler/editOrgInfo";
	submitForm(form, url,"修改机构信息异常",function(){
		Ext.Msg.alert('提示', "修改机构信息成功",function(){
			var tree=Ext.getCmp("orgTree");
			tree.root.reload();
			var grid=Ext.getCmp("orgInfoGrid");
			grid.store.reload();
			Ext.getCmp("orgEditWin").close();
		});
		
	});
}
function deleteOrgInfo()
{
	var grid = Ext.getCmp("orgInfoGrid");
	var list=getGridList(grid,"orgId");
	if(list.length==0)
	{
		Ext.Msg.alert('提示', "请选择要删除的数据");
		return false;
	}
	var orgIds=list.join(",");
	var url = getHandlerRequestUrl()
	+ "orgInfoManagerHandler/deleteOrgInfo?orgIds="+orgIds;
	deleteData(url,"删除机构信息异常",function(){
		Ext.getCmp("orgInfoGrid").store.reload();
		var tree=Ext.getCmp("orgTree");
		tree.root.reload();
	});
}
function searchOrgInfo()
{
	var orgName=Ext.getCmp("search_orgName").getValue();
	var grid = Ext.getCmp("orgInfoGrid");

	grid.store.reload(
	{
		params :
		{
			start : 0,
			limit : pageSize,
			orgName : orgName
		}
	});
	grid.store.baseParams =
	{
		start : 0,
		limit : pageSize,
		orgName : orgName
	};
}