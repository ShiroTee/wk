// 各种参数
var queryForm;
var operType = 'add';
// 查询链接
var queryListUrl = "getRuleinfoList";
// 删除数据请求url
var deleteUrl = "deleteRuleinfo";
// 添加数据请求UrL
var addUrl = "insertRuleinfoList";
// 修改数据Url
var updateUrl = "upateRuleinfo";
// 修改状态
var updateStatusUrl = "updateRuleinfoStatus"
// 创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorSohw='80%';
Ext.onReady(function()
{
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	// 解决日期控件在IE浏览器下面显示不全的BUG
	Ext.override(Ext.menu.Menu,
	{
		autoWidth : function()
		{
			this.width += "px";
		}
	});
	
	// 解决日期控件在IE浏览器下面上下显示不全的BUG
		Ext.override(Ext.menu.Menu,
	{
		autoHeight : function()
		{
			this.height += "px";
		}
	});
	var toolbar = new Ext.Toolbar(
	{
		height : 30,
		id : Math.random() + ""
	});

	// 选择模型
//	var sm = new Ext.grid.CheckboxSelectionModel(
//	{
//		listeners :
//		{
//			// 选中
//			'rowselect' : function(sm, row, rec)
//			{
//
//			},
//			// 不选中
//			'rowdeselect' : function(sm, row, rec)
//			{
//
//			}
//		}
//	});
	
	this.sm=new Ext.grid.CheckboxSelectionModel(
                     {
                 listeners:{
                 'rowdeselect': function(s){
                    if(s.getCount( )!= this.grid.getStore().getCount()){
                    //通过sm得到已选的行的总数，和表中这一页的行数做比较，如果不相等表示还有为选项，则通过下面代码将标题栏的勾选状态去掉。
                        var hd_checker = this.grid.getEl().select('div.x-grid3-hd-checker');
                   var hd = hd_checker.first();
                   if(hd != null){ 
                        hd.addClass('x-grid3-hd-checker-on');
                        hd.removeClass('x-grid3-hd-checker-on'); //这个是去掉上面标题中的
                            }
                            }    
                 }
                 }
              }
              );
	// 创建显示内容面板
	var gridStore = new Ext.data.Store(
	{
		autoLoad :
		{
			params :
			{
				start : 0,
				limit : pageSize
			}
		},

		successProperty : 'success',
		listeners :
		{
			exception : function(dataProxy, type, action, options, response, arg)
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
		}, Ext.data.Record.create(
		[
				{
					name : 'ID'
				},
				{
					name : 'RULENAME'
				},
				{
					name : 'RULETYPE'
				},
				{
					name : 'STATUS'
				},
				{
					name : 'OPERATOR'
				},
				{
					name : 'THRESHOLD'
				},
				{
					name : 'THRESHOLDOPERATOR'
				},
				{
					name : 'ADDTIME'
				},
				{
					name : 'MEMO'
				}
		])),
		proxy : new Ext.data.HttpProxy(
		{
			url : queryListUrl
		})
	});

	var cb = new Ext.grid.CheckboxSelectionModel();

	var grid = new Ext.grid.GridPanel(
	{
		frame : false,
		border : true, // 是否显示表格的边框
		id : "logJobGirds",
		tbar : [],
		sm : sm,
		loadMask : true,
		store : gridStore,
		stripeRows : true,
		closable : true,
		autoScroll : true,
		bbar : [],
		viewConfig :
		{
			forceFit : true
		},
		columns :
		[
				sm, new Ext.grid.RowNumberer(),
				{
					header : "ID",
					dataIndex : 'ID',
					hidden : true,
					sortable : true
				},
				{
					header : "规则名称",
					width : 30,
					dataIndex : 'RULENAME',
					renderer : formatQtip,
					sortable : true
				},
				{
					header : "规则类型",
					width : 20,
					dataIndex : 'RULETYPE',
					renderer : formatQtip,
					sortable : true
				},
				{
					header : "启用状态",
					width : 30,
					dataIndex : 'STATUS',
					renderer : YSTATUS,
					//renderer : formatQtip,
					sortable : true
				},
				{
					header : "运算符",
					width : 30,
					dataIndex : 'OPERATOR',
					renderer : formatQtip,
					sortable : true
				},
				{
					header : "阀值",
					width : 30,
					dataIndex : 'THRESHOLD',
					renderer : fzRender,
					sortable : true
				},
				{
					header : "添加日期",
					width : 30,
					dataIndex : 'ADDTIME',
					renderer : formatQtip,
					sortable : true
				},
				{
					header : "备注",
					width : 50,
					renderer : formatQtip,
					dataIndex : 'MEMO',
					sortable : true
				}
		]

	});
	
	Ext.QuickTips.init();
	Ext.apply(Ext.QuickTips.getQuickTip(),{
		//maxWidth: 200,
		//minWidth: 100,
		//showDelay: 50,
		//trackMouse: true,
		//hideDelay: true,  
		//closable: true,
		//autoHide: false,
		//draggable: true,
		dismissDelay: 0
	});
	
	// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
	function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}
	// 判断显示状态
	function YSTATUS(value, metadata, record, rowIndex, colIndex, store)
	{
		var result;
		var ystatus;
		if (record.get('STATUS') == 'Y')
		{
			result = "启用";
			ystatus = "<font color='blue'>" + result + "</font>";
		}
		if (record.get('STATUS') == 'N')
		{
			result = "停用";
			ystatus = "<font color='red'>" + result + "</font>";

		}
		return ystatus;
	}
	// 查询---定义规则下拉框类型固定值
	var statusData =
	[
			[
					'', '全部'
			],
			[
					'1', 'CPU使用率'
			],
			[
					'2', '磁盘剩余大小'
			],
			[
					'3', '内存使用率'
			]
	];
	var statusStore = new Ext.data.SimpleStore(
	{
		fields :
		[
				'text', 'value'
		],
		data : statusData
	});

	// 添加和修改---定义规则下拉框类型固定值
	var statusDataVice =
	[
			[
					'1', 'CPU使用率'
			],
			[
					'2', '磁盘剩余大小'
			],
			[
					'3', '内存使用率'
			]
	];
	var statusStoreVice = new Ext.data.SimpleStore(
	{
		fields :
		[
				'text', 'value'
		],
		data : statusDataVice
	});

	// 定义增加面板比对符下拉框固定值
	var operatorstore =
	[
			[
					'1', '>'
			],
			[
					'2', '>='
			],
			[
					'3', '='
			],
			[
					'4', '<'
			],
			[
					'5', '<='
			]
	];
	// 定义增加面板比对符下拉框
	var operatorstores = new Ext.data.SimpleStore(
	{
		fields :
		[
				'text', 'value'
		],
		data : operatorstore
	});

	// 定义规则下拉框
	var sysTypeCombox = new Ext.form.ComboBox(
	{
		fieldLabel : '规则类型',
		name : 'RULETYPE',
		allowBlank : true, // 是否允许为空
		blankText : '规则类型',
		emptyText : '全部', // 没有默认值时,显示的字符串
		typeAhead : true,
		triggerAction : 'all', // 显示所有下列数.必须指定为'all'
		forceSelection : true,
		editable : false,
		width : 110,
		mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
		anchor : anchorSohw,
		store : statusStore,
		valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
		displayField : 'value' // 下拉框显示内容
	});

	// 查询条件
	var queryFormItems =
	[
		{
			layout : 'column',
			labelAlign : 'right',
			items :
			[
					{
						columnWidth : .25,
						layout : 'form',
						items :
						[
							{
								xtype : 'textfield',
								fieldLabel : '规则名称',
								allowBlank : true,
								maxLength : 30,
								name : 'RULENAME',
								anchor : anchorSohw
							}
						]
					},
					{
						columnWidth : .25,
						layout : 'form',
						items :
						[
							{
								fieldLabel : '规则类型',
								layout : 'column',
								items :
								[
									{
										items :
										[
											sysTypeCombox
										]
									}
								]
							}
						]
					},
					{
						columnWidth : .5,
						layout : 'form',
						items :
						[
							{
								fieldLabel : '添加日期',
								layout : 'column',
								items :
								[
										{
											xtype : 'datefield',
											fieldLabel : '',
											name : 'ADDTIME',
											id : 'ADDTIME',
											width : 100,
											altFormats : 'Y-m-d',
											format : 'Y-m-d',
											editable:false,
											anchor:anchorSohw
										},
										{
											layout : 'form',
											labelWidth : 17,
											labelAlign : 'center',
											items :
											[
												{
													xtype : 'label',
													fieldLabel : '至'
												}
											]
										},
										{
											xtype : 'datefield',
											fieldLabel : '',
											name : 'ADDTIMEEND',
											id : 'ADDTIMEEND',
											altFormats : 'Y-m-d',
											format : 'Y-m-d',
											width : 100,
											editable:false,
											anchor:anchorSohw
										}
								]
							}
						]
					}
			]
		}
	];

	// 查询功能
	function queryFunc()
	{
		if(Ext.get('ADDTIME').getValue()!="" && Ext.get('ADDTIMEEND').getValue()!="" && Ext.get('ADDTIME').getValue()>Ext.get('ADDTIMEEND').getValue()){
			Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
			return;
		}
		gridStore.baseParams = queryForm.getForm().getValues();
		Ext.apply(gridStore.baseParams,
		{
			start : 0,
			limit : pageSize
		});
		gridStore.load(
		{
			params : gridStore.baseParams
		});
	}

	// 添加数据的from
	var ruleinfoForm = new Ext.FormPanel(
	{
		labelSeparator : "：",
		frame : false,
		id : "ruleinfoid_1",
		width : 300,
		border : false,
		labelwidth : 100,
		labelAlign : 'right',
		autoScroll : true,
		buttonAlign : 'center',
		items :
		[
				{
					xtype : 'textfield',
					hidden : true,
					hideLabel : true,
					name : "ID",
					id : "ID"
				},
				{
					xtype : 'textfield',
					name : 'RULENAME',
					id : 'RULENAMES',
					width : 240,
					allowBlank : false, // 是否允许为空
					maxLength : 10,// 允许输入的最大字符数10
					maxLengthText : "规则名称不能超过10个字符！",// 提示
					fieldLabel : '<span style="color:red;font-size:13pt;">*</span>规则名称'
				},
				{
					xtype : 'combo',
					fieldLabel : '规则类型',
					name : 'RULETYPE',
					id : 'RULETYPES',
					// hiddenName : 'RULETYPE',
					allowBlank : false, // 是否允许为空
					// emptyText : 'CPU', // 没有默认值时,显示的字符串
					typeAhead : true,
					triggerAction : 'all', // 显示所有下列数.必须指定为'all'
					forceSelection : true,
					editable : false,
					mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
					width : 240,
					store : statusStoreVice,
					valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
					displayField : 'value', // 下拉框显示内容
					value : '1',
					listeners:{
			         'select': comboSelect
			    	}
				},
				{
					xtype : 'combo',
					fieldLabel : '运算符',
					name : 'OPERATOR',
					id : 'OPERATOR',
					// allowBlank : false, // 是否允许为空
					// emptyText : '=', // 没有默认值时,显示的字符串
					typeAhead : true,
					triggerAction : 'all', // 显示所有下列数.必须指定为'all'
					forceSelection : true,
					editable : false,
					mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
					width : 240,
					store : operatorstores,
					valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
					displayField : 'value', // 下拉框显示内容
					value : '1'
				},
				{
					xtype : 'numberfield',
					name : 'THRESHOLD',
					id : 'THRESHOLD',
					width : 240,
					allowBlank:false,
//					 regex:/^[0-9]*$/,
//					 regexText: '只能输入数字',
					fieldLabel : '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:%</span>)：'
				},
				{
					xtype : 'textfield',
					name : 'MEMO',
					id : 'MEMO',
					width : 240,
					maxLength : 250,// 允许输入的最大字符数3
					maxLengthText : "备注不能超过250个字符！",// 提示文本
					fieldLabel : '备注'
				}
		]
	});
	// 弹出面板
	var ruleinfoWin = new Ext.Window(
	{
		layout : 'fit',
		width : 400,
		height : 250,
		id : 'ruleinfoWin',
		title : '预警规则操作',
		closeAction : 'hide',
		plain : true,
		modal : true,
		resizable : true,
		buttonAlign : 'center',
		bodyStyle : 'padding:5 5 5 5',
		items :
		[
			ruleinfoForm
		],
		buttons :
		[
				{
					text : '保存',
					iconCls : 'icon_save',
					handler : subOper
				},
				{
					text : '关闭',
					iconCls : 'icon_close',
					handler : function()
					{
						Ext.getCmp('ruleinfoWin').hide();
					}
				},
				{
					text : '重置',
					iconCls : 'icon_reset',
					id:'icon_rule',
					handler : function(operType)
					{
					if(operType=='update'){
						Ext.getCmp("icon_rule").setVisible(false);
					}else 
					{
						Ext.getCmp('ruleinfoid_1').form.reset();
					}
				}
			}
		]
	});
	// 状态操作函数
	function ssOperFun(operator)
	{
		var records = sm.getSelections(); // 针对本页选中数据
		if (records.length == 0)
		{
			alert('请选择数据!');
			return;
		} else
		{
			var recordIdArr = [];
			for ( var i = 0; i < records.length; i++)
			{
				var rec = records[i];
				var status = rec.get('STATUS');

				if (operator == 'Y')
				{
					if (status == 'N')
					{
						recordIdArr.push(rec.get('ID'));
					}
				} else if (operator == 'N')
				{
					if (status == 'Y')
					{
						recordIdArr.push(rec.get('ID'));
					}
				}
			}

			if (recordIdArr.length != 0 && recordIdArr != null)
			{
				Ext.Msg.confirm("提示", "确定要操作吗？", function(btn, text)
				{
					if (btn == "yes")
					{
						Ext.Ajax.request(
						{
							// 发送请求
							url : updateStatusUrl,
							method : 'POST',
							params :
							{
								jsonData : Ext.util.JSON.encode(recordIdArr),
								qryState : operator
							},
							success : function(response, opts)
							{
								gridStore.reload();
							},
							failure : function(response, opts)
							{
								Ext.MessageBox.show(
								{
									title : '错误',
									msg : '更新信息失败，请重新尝试，或联系管理员。',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						});
					}
				});
			} else
			{
				var msg = '启用';
				if (operator == 'N')
				{
					msg = '停用';
				}
				alert('规则已经' + msg + '，请勿重复操作！');
				return;
			}
		}
	}
	
	
	// 阀值render
	function fzRender(value, metadata, record, rowIndex, columnIndex, store)
	{
		
		var va = record.data.RULETYPE;
		if(va=='CPU使用率'||va=='内存使用率')
		{
			value = value.replace('%','');
			return  value+'%';
		}
		else
		{
			value = value.replace('G','');
			return  value+'G';
		}
	}
	
	
	// combo回调函数
	function comboSelect(combo,record,index)
	{
		if(index==1)
		{
			Ext.DomQuery.selectNode('label[for=THRESHOLD]').innerHTML = '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:G</span>)：';
		}
		else
		{
			Ext.DomQuery.selectNode('label[for=THRESHOLD]').innerHTML = '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:%</span>)：';
		}
	}
	

	// 回调函数
	function callbak()
	{
		Ext.getCmp("logJobGirds").store.reload();
		Ext.getCmp("ruleinfoWin").hide();
		Ext.Msg.alert('提示信息', '操作成功！');
	}

	// 保存操作
	function subOper()
	{
		var va = Ext.getCmp('RULETYPES').value;
		
		if(operType=='add')
		{
			if(va==1||va==3)
			{
				if(Ext.getCmp('THRESHOLD').value>0&&Ext.getCmp('THRESHOLD').value<100)
				{
					submitForm(Ext.getCmp('ruleinfoid_1'), addUrl, "添加数据失败", callbak);
					
				}
				else
				{
					alert('阀值(单位:%)取值在1到99范围中！')
				}
			}
			else
			{
				submitForm(Ext.getCmp('ruleinfoid_1'), addUrl, "添加数据失败", callbak);
				
			}
			
		}
		
		
		if(operType=='update')
		{
			
			if(va=='CPU使用率'||va=='内存使用率'||va==1||va==3)
			{
				if(Ext.getCmp('THRESHOLD').value>0&&Ext.getCmp('THRESHOLD').value<100)
				{
					submitForm(Ext.getCmp('ruleinfoid_1'), updateUrl, "更新数据失败", callbak);
				}
				else
				{
					alert('阀值(单位:%)取值在1到99范围中！')
				}
			}
			else
			{
				submitForm(Ext.getCmp('ruleinfoid_1'), updateUrl, "更新数据失败", callbak);
				
			}
			
		}
		
		
		
		
	}

	// 添加弹出窗口
	function addData()
	{
		
		
		operType = 'add';
		Ext.getCmp('ruleinfoWin').show().center();
		Ext.getCmp('ruleinfoid_1').form.reset();
		// Ext.getCmp('ruleinfoWin').doLayout(true); // 重新调整版面布局
		
		var va = Ext.getCmp('RULETYPES').value;
		if(va==1||va==3)
		{
			Ext.DomQuery.selectNode('label[for=THRESHOLD]').innerHTML = '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:%</span>)：';
		}
		else
		{
			Ext.DomQuery.selectNode('label[for=THRESHOLD]').innerHTML = '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:G</span>)：';
		}
	}

	// 更新弹出窗口
	function updateData()
	{
		
		operType = 'update';
		var record = sm.getSelections();
		if (record.length == 0)
		{
			Ext.Msg.alert('提示信息', '请选择数据!');
			return;
		} else if (record.length > 1)
		{
			Ext.Msg.alert('提示信息', '请选择一行数据!');
			return;
		} else
		{
			record = sm.getSelected();
			Ext.getCmp('ruleinfoWin').show().center();
			Ext.getCmp('ruleinfoid_1').getForm().loadRecord(record);
			Ext.getCmp('ruleinfoid_1').doLayout(true); // 重新调整版面布局
		}
		Ext.getCmp("icon_rule").setVisible(false);
		
		var va = Ext.getCmp('RULETYPES').value;
		if(va=='CPU使用率'||va=='内存使用率')
		{
			Ext.DomQuery.selectNode('label[for=THRESHOLD]').innerHTML = '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:%</span>)：';
		}
		else
		{
			Ext.DomQuery.selectNode('label[for=THRESHOLD]').innerHTML = '<span style="color:red;font-size:13pt;">*</span>阀值(<span style="color:red;font-size:9pt;">单位:G</span>)：';
		}
	}

	// 删除数据
	function delData()
	{
		var records = sm.getSelections(); // 针对本页选中数据
		if (records.length == 0)
		{
			alert('请选择数据!');
			return;
		} else
		{
			var recordIdArr = [];
			for ( var i = 0; i < records.length; i++)
			{
				var rec = records[i];
				recordIdArr.push(rec.get('ID'));
			}

			if (recordIdArr.length != 0)
			{
				Ext.Msg.confirm("提示", "确定要执行删除吗？", function(btn, text)
				{
					if (btn == "yes")
					{
						Ext.Ajax.request(
						{
							// 发送请求
							url : deleteUrl,
							method : 'POST',
							params :
							{
								jsonData : Ext.util.JSON.encode(recordIdArr)
							},
							success : function(response, opts)
							{
								gridStore.reload();
							},
							failure : function(response, opts)
							{
								Ext.MessageBox.show(
								{
									title : '错误',
									msg : '删除失败!请联系管理员',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							}
						});
					}
				});
			}
		}

	}

	/** *****以下为注册各页面组件方法******************************* */
	// 提示标签提示的内容;
	setTip("管理服务器的各项预警规则，包括创建并设置服务器各项指标的预警阀值、启用并停用预警规则等。");
	// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
	queryForm = setQueryForm("queryForms", queryFormItems, queryFunc);
	// 根据ID获取组件。例如获取查询面板组件
	var formPanelCmp = new Ext.getCmp("queryForms");
	// 查询面板中的按钮组
	var formButton =
	[
			{
				text : '查询',
				iconCls : 'icon_query',
				handler : function()
				{
					queryFunc();
				}
			},
			{
				text : '重置',
				iconCls : 'icon_reset',
				handler : function()
				{
					queryForm.getForm().reset();
				}
			}
	];
	// 将定义的按钮组放入获取的面板中，如：放入查询面板中
	formPanelCmp.addButton(formButton);
	// 定义工具栏的元素组
	var topToolbarItems =
	[
			{
				text : '启用规则',
				id : 'btnStart',
				iconCls : 'icon_start',
				disabled : false,
				handler : function()
				{
					ssOperFun('Y');
				}
			},
			{
				text : '停用规则',
				id : 'btnStop',
				iconCls : 'icon_stop',
				disabled : false,
				handler : function()
				{
					ssOperFun('N');
				}
			}, '-',
			{
				xtype : 'tbbutton',
				text : '添加',
				iconCls : 'icon_add',
				disabled : false,
				handler : addData
			},
			{
				xtype : 'tbbutton',
				text : '编辑',
				iconCls : 'icon_edit',
				disabled : false,
				handler : updateData
			},
			{
				xtype : 'tbbutton',
				text : '删除',
				iconCls : 'icon_delete',
				disabled : false,
				handler : delData
			}
	];
	// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
	setTbar(grid, topToolbarItems);
	// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
	setPaging(grid);
	// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
	setMainPanel("ruleinfo_div_1", grid);
});