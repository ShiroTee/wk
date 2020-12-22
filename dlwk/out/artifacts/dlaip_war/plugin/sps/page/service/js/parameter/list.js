function createParameterWin()
{
	
	var list=getGridList(Ext.getCmp("serviceGrid"),"routeId");
	if(list.length!=1)
	{
		Ext.Msg.alert('提示', "请选择要操作的路由");
		return false;
	}
	var routeId=list[0];
	var win=new Ext.Window(
	{
		title : '参数配置',
		width : 700,
		closeAction : 'close',
		plain : true,
		modal : true,
		height : 480,
		resizable : true,
		buttonAlign : 'center',
		items : [ createParameterForm(), createParameterGird(routeId) ],
		buttons : [
		{
			text : '关闭',
			iconCls : 'icon_close',
			handler:function()
			{
				win.close();
			}
		},
		{
			text : '保存',
			iconCls : 'icon_save',
			handler:function()
			{
				saveParameterInfo(routeId,win)
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler:function()
			{
				win.getComponent(0).form.reset();
			}
		} ]

	});
	win.show();
}
function createParameterForm()
{
	return new Ext.FormPanel(
	{
		labelAlign : 'right',
		labelSeparator : "：",
		frame : true,
		border : false,
		buttonAlign : 'center',
		items : [
				{
					layout : 'column',
					bodyStyle : 'padding:5px 5px 5px 5px',
					items : [
							{
								columnWidth : .33,
								labelWidth : 60,
								layout : 'form',
								items : [
								{
									xtype : 'combo',
									allowBlank : false,
									mode : 'local',
									hiddenName : 'type',
									width : 120,
									store : new Ext.data.SimpleStore(
									{
										fields : [ 'key', 'value' ],
										data : [ [ '请求参数', '0' ],
												[ '响应参数', '1' ] ]
									}),
									triggerAction : 'all',
									displayField : 'key',
									valueField : 'value',
									forceSelection : true,
									resizable : true,
									typeAhead : true,
									handleHeight : 10,
									fieldLabel : '参数类型'
								} ]
							},
							{
								columnWidth : .33,
								layout : 'form',
								labelWidth : 60,
								items : [
								{
									xtype : 'combo',
									allowBlank : false,
									mode : 'local',
									hiddenName : 'dataType',
									width : 120,
									store : new Ext.data.SimpleStore(
									{
										fields : [ 'key', 'value' ],
										data : [ [ '字符型', 'string' ],
												[ '整形', 'int' ],
												[ '浮点型', 'flot' ],
												[ '日期型', 'date' ] ]
									}),
									triggerAction : 'all',
									displayField : 'key',
									valueField : 'value',
									forceSelection : true,
									resizable : true,
									typeAhead : true,
									handleHeight : 10,
									fieldLabel : '数据类型'
								} ]
							},
							{
								columnWidth : .33,
								layout : 'form',
								labelWidth : 60,
								items : [
								{
									xtype : 'combo',
									allowBlank : false,
									mode : 'local',
									width : 120,
									hiddenName : 'isNull',
									store : new Ext.data.SimpleStore(
									{
										fields : [ 'key', 'value' ],
										data : [ [ '是', '1' ], [ '否', '0' ] ]
									}),
									triggerAction : 'all',
									displayField : 'key',
									valueField : 'value',
									forceSelection : true,
									resizable : true,
									typeAhead : true,
									handleHeight : 10,
									fieldLabel : '是否为空'
								} ]
							} ]
				},
				{

					layout : 'column',
					bodyStyle : 'padding:5px 5px 5px 5px',
					items : [
					{
						columnWidth : .33,
						labelWidth : 60,
						layout : 'form',
						items : [
						{
							xtype : 'textfield',
							width : 120,
							name : 'name',
							regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
							regexText : "有非法字符或空格",
							maxLength : 40,
							maxLengthText : "参数名称最大长度不能超过50个字符！",// 提示文本
							allowBlank : false,
							blankText : '请输入参数名称',
							fieldLabel : '参数名称'
						} ]
					},
					{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60,
						items : [
						{
							xtype : 'textfield',
							width : 120,
							name : 'defaultValue',
							regex : /[^`~!@#$%^&*()_+<>?:"{},.\/;'[\] ]+$/im,
							regexText : "有非法字符或空格",
							maxLength : 50,
							maxLengthText : "参数默认值最大长度不能超过50个字符！",// 提示文本
							fieldLabel : '默认值'
						} ]
					},
					{
						columnWidth : .33,
						layout : 'form',
						labelWidth : 60,
						items : [
						{
							xtype : 'numberfield',
							name : 'maxLength',
							width : 120,
							fieldLabel : '长度'
						} ]
					} ]

				},
				{

					layout : 'column',
					bodyStyle : 'padding:5px 5px 5px 5px',
					items : [
					{
						columnWidth :.95,
						labelWidth : 60,
						layout : 'form',
						items : [
						{
							xtype : 'textarea',
							name : 'parameterDesc',
							width : '98%',
							fieldLabel : '参数说明'
						},{
							xtype : 'hidden',
							name : 'parameterId'
						}  ]
					} ]

				} ]

	});

}
function createParameterGird(routeId)
{
	var sm = new Ext.grid.CheckboxSelectionModel();
	var columns = [ sm, new Ext.grid.RowNumberer(),
	
	{
		dataIndex : 'parameterId',
		hidden : true
	},
	{
		dataIndex : 'type',
		header : "类型",
		sortable : true,
		renderer:function(value)
		{
			if(value==0)
			{
				return "<font color='red'>请求参数</font>";
			}
			return "<font color='green'>响应参数</font>";
		},
		width : 80
	},
	{
		dataIndex : 'name',
		header : "参数名称",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'dataType',
		header : "数据类型",
		renderer:function(value)
		{
			if(value=="string")
			{
				return "字符型";
			}
			else if(value=="int")
			{
				return "整形";
			}
			else if(value=="float")
			{
				return "浮点型";
			}
			else if(value=="date")
			{
				return "日期";
			}
		},
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'defaultValue',
		header : "默认值",
		sortable : true,
		width : 80
	},
	{
		dataIndex : 'isNull',
		header : "是否为空",
		renderer:function(value)
		{
			if(value==0)
			{
				return "否";
			}
			return "是";
		},
		width : 50
	},{
		dataIndex : 'parameterId',
		header : "操作",
		renderer:function(value)
		{
			var srciptStr='<a href="#" onclick="deleteParameterInfo(\''+value+'\')">删除</a>&nbsp;|';
			srciptStr=srciptStr+'<a href="#" onclick="rowclickLoadForm(\''+value+'\')">查看</a>&nbsp;'
			return srciptStr;
		},
		width :80
	}];
	var gridStore = new Ext.data.Store(
	{
		successProperty : 'success',
		autoLoad:true,
		listeners :
		{
			exception : function(dataProxy, type, action, options, response,
					arg)
			{
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success)
				{
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		reader : new Ext.data.JsonReader(
		{
			totalProperty : "count",
			root : "list"
		}, Ext.data.Record.create([
		{
			name : 'parameterId'
		},
		{
			name : 'dataType'
		},
		{
			name : 'defaultValue'
		},
		{
			name : 'isNull'
		},
		{
			name : 'type'
		},{
			name : 'name'
		} ,{
			name : 'parameterDesc'
		} ])),
		proxy : new Ext.data.HttpProxy(
		{
			url : getHandlerRequestUrl() + "serviceParameterServiceHandler/getParameterInfoList?routeId="+routeId
		})
	});
	return new Ext.grid.GridPanel(
	{
		autoScroll : true,
		width : '100%',
		id:'parameterGrid',
		loadMask : true,
		height : 235,
		buttonAlign : 'center',
		monitorResize : true,
		store : gridStore,
		border : false, // 是否显示行的边框
		sm : sm,
		columns : columns,
		trackMouseOver : true,
		forceLayout : true,
		frame : true,
		columnLines : true,
		stripeRows : true,
		viewConfig :
		{
			forceFit : true
		}
	});
}