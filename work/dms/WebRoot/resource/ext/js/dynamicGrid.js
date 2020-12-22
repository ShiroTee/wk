// 各种链接
var getColumnNameUrl = ''; // 获取后台动态的列名称集合
var getTableDataUrl = ''; // 获取后台动态的列表数据
var getLogInfoUrl = ''; // 获取后台动态的日志查询链接
// 各种参数变量
var queryStep = ''; // 当前Grid查询使用的步骤编号
var mainStep = '';// 页面加载时的主流程
var lastStep = '';// 保存上一步编号
var currStep = '';// 保存当前步骤编号
var nextStep = '';// 保存下一步编号
var mainColParam = '';// 页面加载时的主流程动态标识字段
var queryParam = '';// 当前Grid使用的页面参数
var nextParam = '';// 用于操作下一步页面传递的参数(下钻)
var queryParamMap = new jsMap();// 用于保存页面传递的参数的集合
var queryColParam = '';// 当前Grid使用的构造(动态列名和查询条件)的标识字段
var nextColParam = '';// 保存页面的构造(动态列名和查询条件)的标识字段
var colParamMap = new jsMap();// 保存页面的构造(动态列名和查询条件)的标识字段的集合
var queryGroupField = '';// 保存当前页面使用的分组字段
var nextGroupField = '';// 保存下一步页面使用的分组字段
var groupFieldMap = new jsMap();// 用于保存页面分组的字段的集合
var data; // 用于操作动态列(字段和列属性)
var initPage;// 根据返回的结果构造页面
var queryFunc;// 查询功能
var queryStrList;// 后台返回的查询条件的集合参数
var showLogWindow;// 弹出的日志窗口
var changeOper;// 下钻事件
var flowType;// 事件的类型(下钻/上钻)
var queryForm = Ext.getCmp('queryForm');// 查询面板FormPanel的ID
var resultTable = Ext.getCmp('resultTable');// 结果面板GridPanel的ID
var resultStore = Ext.getCmp('resultStore');// 结果面板GridPanel的Store的ID
var detailPanel = Ext.getCmp('detailPanel');// 日志信息面板
var detailWindow = Ext.getCmp('detailWindow');// 弹出的信息窗口
var tipPanel;
var tipMsg;
var starttime;
var endtime;

/***************************************************************************************************
 * 未用---待定 //未用---待定 var fm = Ext.form; var Request = new QueryString(); var ID = "";//
 * Request["wlid"]; function QueryString() { var name, value, i; var str = location.href; var num =
 * str.indexOf("?") str = str.substr(num + 1); var arrtmp = str.split("&"); for (i = 0; i <
 * arrtmp.length; i++) { num = arrtmp[i].indexOf("="); if (num > 0) { name = arrtmp[i].substring(0,
 * num); value = arrtmp[i].substr(num + 1); this[name] = value; } } }
 **************************************************************************************************/

/**
 * 动态添加列
 */
var addColumn = function()
{
	this.fields = '';
	this.columns = '';
	this.addColumns = function(fieldsValue, columnsValue)
	{
		if (fieldsValue != '' && fieldsValue != null)
		{
			if (this.fields.length > 0)
			{
				this.fields += ',';
			}
			this.fields += fieldsValue;
		}
		if (columnsValue != '' && columnsValue != null)
		{
			if (this.columns.length > 0)
			{
				this.columns += ',';
			}
			this.columns += columnsValue;
		}
	};
};

/**
 * 动态增加查询的组件----TextField
 */
var addTextField = function(id, fieldLabel, value, columnWidth, anchor)
{
	var qryItem =
	{
		columnWidth : columnWidth,
		layout : 'form',
		border : false,
		items :
		[
			{
				xtype : 'textfield',
				fieldLabel : fieldLabel,
				id : id,
				anchor : anchor,
				value : value
			}
		]
	};

	queryForm.add(qryItem);
}
/**
 * 获取动态的TextField组件
 */
var getTextField = function(json)
{
	addTextField(json.id, json.fieldLabel, json.value, json.columnWidth, json.anchor);
}

/**
 * 动态增加查询的组件----ComboBox
 */
var addComboBox = function(id, fieldLabel, width, url, valueField, displayField, columnWidth)
{
	// 定义动态数据
	var dataJsonStore = new Ext.data.JsonStore(
	{
		url : url,
		//root : 'data',
		fields : new Ext.data.Record.create(
		[
				valueField, displayField
		])
	});
	// 定义下拉框
	var dataCombox = new Ext.form.ComboBox(
	{
		fieldLabel : '', // UI标签名称
		store : dataJsonStore,
		// name : id, // 作为form提交时传送的参数名
		hiddenName : valueField,
		allowBlank : true, // 是否允许为空
		emptyText : '---请选择---', // 没有默认值时,显示的字符串
		typeAhead : true,
		triggerAction : 'all', // 显示所有下列数.必须指定为'all'
		forceSelection : true,
		editable : false,
		mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
		anchor : '90%',
		width : width,
		value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
		valueField : valueField, // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
		displayField : displayField
	});
	dataJsonStore.load(); // 载入下拉框的信息

	var qryItem =
	{
		columnWidth : columnWidth,
		layout : 'form',
		items :
		[
			{
				fieldLabel : fieldLabel,
				id : id,
				layout : 'column',
				items :
				[
					{
						items :
						[
							dataCombox
						]
					}
				]
			}
		]
	};

	queryForm.add(qryItem);
}
/**
 * 获取动态的ComboBox组件
 */
var getComboBox = function(json)
{
	addComboBox(json.id, json.fieldLabel, json.width, json.url, json.valueField, json.displayField, json.columnWidth);
}

/**
 * 动态增加查询的组件----datefield
 */
var addDateField = function(fieldLabel, starttimeName, starttimeValue, endtimeName, endtimeValue, columnWidth, width)
{
	var qryItem =
	{
		columnWidth : columnWidth,
		labelAlign : 'right',
		layout : 'column',
		items :
		[
				{
					labelWidth : 60,
					layout : 'form',
					items :
					[
						{
							xtype : 'label',
							fieldLabel : fieldLabel
						}
					]
				},
				{
					xtype : 'datefield',
					fieldLabel : '',
					name : starttimeName,
					id : starttimeName,
					altFormats : 'Y-m-d',
					format : 'Y-m-d',
					value : starttimeValue,
					width : width
				},
				{
					layout : 'form',
					labelWidth : 17,
					labelSeparator : ' ',
					labelAlign : 'right',
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
					name : endtimeName,
					id : endtimeName,
					altFormats : 'Y-m-d',
					format : 'Y-m-d',// 用以覆盖本地化的默认日期格式化字串
					value : endtimeValue,
					width : width
				}
		]
	};

	queryForm.add(qryItem);
}
/**
 * 获取动态的datefield组件
 */
var getDateField = function(json)
{
	starttime = json.starttimeName;
	endtime = json.endtimeName;
	addDateField(json.fieldLabel, json.starttimeName, json.starttimeValue, json.endtimeName, json.endtimeValue, json.columnWidth, json.width);
}

/**
 * 动态添加按钮
 */
var addBtnFunc = function(text, iconCls, handler)
{
	var btnItem = new Ext.Button(
	{
		text : text,
		iconCls : iconCls,
		handler : handler
	});
	queryForm.addButton(btnItem);
}

/**
 * 主页面
 */
Ext.onReady(function()
{
	// 后台设置的初始化页面参数
	mainStep = document.getElementById("mainStep").value;
	currStep = document.getElementById("mainStep").value;
	mainColParam = document.getElementById("mainColParam").value;
	getLogInfoUrl = document.getElementById("getLogInfoUrl").value;
	getColumnNameUrl = document.getElementById("columnNameUrl").value;
	getTableDataUrl = document.getElementById("tableDataUrl").value;
	tipMsg = document.getElementById("tipMsg").value;
	queryStep = currStep;
	queryColParam = mainColParam;
	colParamMap.put(currStep, mainColParam); // 初始化数据
	queryParamMap.put(currStep, "{}"); // 初始化数据
	flowType = 'down';
	if (tipMsg == '')
	{
		tipMsg = '暂时未定义';
	}
	tipPanel = setTip(tipMsg);

	// 自定义遮罩层
	var loadMarsk = new Ext.LoadMask(document.body,
	{
		msg : '正在加载数据，请稍候。。。。。。',
		removeMask : true
	});

	// 页面的初始化：从服务器端获取列,然后动态添加到ColumnModel中
	Ext.Ajax.request(
	{
		url : getColumnNameUrl,
		params :
		{
			queryParam : queryParam,
			flowType : flowType,
			queryColParam : queryColParam
		},
		success : function(response)
		{
			if (response.responseText == "")
			{
				alert('初始化页面失败');
				return;
			} else
			{
				// 调用初始化函数
				initPage(response);
			}
		},
		failure : function()
		{
			alert("加载数据异常！");
			return;
		}
	});

	// 动态生成GridPanel
	var dynamicGrid = function()
	{
		// 解决日期控件在IE浏览器下面显示不全的BUG
		Ext.override(Ext.menu.Menu,
		{
			autoWidth : function()
			{
				this.width += "px";
			}
		});
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget = 'side';

		// 定义GroupingView模版的显示结果
		var tmpFunction = Ext.grid.GroupingView.prototype.initTemplates;
		Ext.grid.GroupingView.prototype.initTemplates = function()
		{
			tmpFunction.call(this);
			if (this.startGroup && this.tplFunction)
			{
				Ext.apply(this.startGroup, this.tplFunction);
			}
		};

		// 定义一个通用的扩展统计功能
		var summary = new Ext.ux.grid.GroupSummary();

		// 动态列模型
		var cm = new Ext.grid.ColumnModel(eval('([ new Ext.grid.RowNumberer(), ' + data.columns + '])'));
		cm.defaultSortable = true;
		var fields = eval('([' + data.fields + '])');
		resultStore = new Ext.data.GroupingStore(
		{
			id : 'resultStore',
			remoteSort : true,
			baseParams :
			{
				queryColParam : queryColParam,
				queryParam : queryParam,
				queryStep : queryStep,
				flowType : flowType,
				start : 0,
				limit : pageSize
			},
			sortInfo :
			{
				field : queryGroupField,
				direction : 'desc'
			},
			groupField : queryGroupField,
			successProperty : 'success',
			proxy : new Ext.data.HttpProxy(
			{
				method : 'POST',
				url : getTableDataUrl
			}),
			reader : new Ext.data.JsonReader(
			{
				totalProperty : 'count',
				root : 'list',
				fields : fields
			}),
			listeners :
			{
				exception : function(dataProxy, type, action, options, response, arg)
				{
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success)
					{
						alert("加载数据异常！异常信息：" + o.msg);
					}
				},
				load : function(s, rec)
				{
					// 数据加载完成后更新相关的变量
					nextParam = resultStore.reader.jsonData.nextParam;
					nextColParam = resultStore.reader.jsonData.nextColParam;
					nextGroupField = resultStore.reader.jsonData.nextGroupField;
					lastStep = resultStore.reader.jsonData.lastStep;
					currStep = resultStore.reader.jsonData.currStep;
					nextStep = resultStore.reader.jsonData.nextStep;
					queryStep = currStep;

					// 更新当前的流程标识
					var currColParam = resultStore.reader.jsonData.currColParam;
					if (colParamMap.contain(currStep))
					{
						colParamMap.put(currStep, currColParam);
					}
				}
			}
		});

		// 刷新Store
		resultStore.load();

		// 分页显示控件
		var pagingToolbar = new Ext.PagingToolbar(
		{
			pageSize : pageSize,
			frame : false,
			border : false,
			store : resultStore,
			displayInfo : true,
			plugins : new Ext.ux.ProgressBarPager(
			{
				style : "width:400px;"
			}),
			emptyMsg : '<span style="padding-left: 650px">没有记录</span>'
		});

		// 按钮工具栏
		var toolBar = new Ext.Toolbar(
		{
			// items :
			// [
			// {
			// text : '展开/收缩',
			// id : 'btnToggle',
			// iconCls : 'icon_explan',
			// disabled : false,
			// handler : function()
			// {
			// if (resultStore.data.length == 0)
			// {
			// alert('未发现数据！');
			// return;
			// } else
			// {
			// /**
			// * 显示或隐藏统计项 summary.toggleSummaries();
			// */
			// resultTable.getView().toggleAllGroups();
			// }
			// }
			// }
			// ]

			items :
			[
				{
					xtype : 'tbbutton',
					text : '返回',
					id : 'btnBack',
					hidden : true,
					iconCls : 'icon_back',
					handler : function(obj)
					{
						changeOper('goUp');
					}
				},{
					xtype : 'tbbutton',
					text : '展开/收缩',
					id : 'btnToggle',
					// iconCls : 'icon_explan',
					iconCls : 'icon_explantwo',// 默认是展开 -
					disabled : false,
					handler : function(obj)
					{
						if (resultStore.data.length == 0)
						{
							alert('未发现数据！');
							// obj.setIconClass('icon_explantwo') ;//-
							if (obj.iconCls == 'icon_explan')
							{
								obj.setIconClass('icon_explantwo');
							} else
							{
								obj.setIconClass('icon_explan');
							}
							return;
						} else
						{
							/**
							 * 显示或隐藏统计项 summary.toggleSummaries();
							 */
							// alert(obj.iconCls) ;//+
							if (obj.iconCls == 'icon_explantwo')
							{
								obj.setIconClass('icon_explan');
							} else
							{
								obj.setIconClass('icon_explantwo');
							}
							resultTable.getView().toggleAllGroups();
							// obj.setIconClass('icon_explantwo') ;
						}
					}
				}
				
			]
		});

		var groupingView = new Ext.grid.GroupingView(
		{
			sortAscText : "升序",
			sortDescText : "降序",
			columnsText : "表格字段",
			groupByText : "使用当前字段进行分组",
			showGroupsText : "表格分组",
			groupTextTpl : "<span style='color: blue; font-family: '幼圆'; font-size: 14;'>{text}(共{[values.rs.length]}条)</span>",
			tplFunction :
			{
				stat : function(text, values)
				{
					return "";
				}
			}
		});

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
		queryForm = new Ext.FormPanel(
		{
			id : 'queryForm',
			name : 'queryForm',
			monitorResize : true,
			// region : 'north',
			labelAlign : 'left',
			buttonAlign : 'center',
			// renderTo : 'div_body',
			// collapsible : true,
			frame : true,
			border : false,
			// title : '查询条件',
			labelAlign : 'right',
			layout : 'column',
			// autoWidth : true,
			// autoHeight : true,
			style : "overflow:hidden; height:85px;",
			bodyStyle : 'padding:10px 0 0;background-color:#DFE8F6;',
			items : [],
			buttons :
			[
					{
						text : '查询',
						iconCls : 'icon_query',
						handler : queryFunc
					},
					{
						text : '重置',
						iconCls : 'icon_reset',
						handler : function()
						{
							queryForm.getForm().reset();
						}
					}
			],
			keys :
			[
				{
					// 处理键盘回车事件
					key : Ext.EventObject.ENTER,
					fn : queryFunc,
					scope : this
				}
			]
		});

		// 主表格
		resultTable = new Ext.grid.GridPanel(
		{
			id : 'resultTable',
			// title : '记录列表(双击实现下钻)',
			cm : cm,
			// renderTo : 'div_body',
			store : resultStore,
			// region : 'center',
			loadMask : true,
			frame : true, // 表格外加边框
			border : true,
			height : getScreen_height() - 30 - 93,
			monitorResize : true,
			autoScroll : true,
			buttonAlign : 'center',
			trackMouseOver : false,
			forceLayout : true,
			columnLines : true,
			enableHdMenu : true,
//			plugins : summary,
//			view : groupingView,
			viewConfig :
			{
				forceFit : true,// 所有列都改变宽度
				autoFill : true,
				sortAscText : '升序',
				sortDescText : '降序',
				columnsText : '显示列'
			},
			// 工具栏
			tbar : toolBar,
			// 分页栏
			bbar : pagingToolbar
		});

		// 主容器
		var mainPanel = new Ext.Panel(
		{
			frame : false,
			border : true,
			applyTo : 'div_body',
			bodyStyle : 'background-color: #DFE8F6;',
			items :
			[
					tipPanel, queryForm, resultTable
			]
		});

		// 双击事件
		resultTable.addListener('rowdblclick', rowdblclickFn);
		function rowdblclickFn(grid, rowindex, e)
		{
			changeOper('goDown');
		}

		// 加载完成移除遮罩层
		resultStore.on("load", function()
		{
			loadMarsk.hide();
		});

	}

	// 初始化提示栏
	function setTip(tip)
	{
		var tipStr = "<div class='tipcontent'>" + tip + "</div>";
		var panel = new Ext.Panel(
		{
			id : 'closetip',
			border : false,
			height : 30,
			cls : 'notification information png_bg',
			html : tipStr
		});
		return panel;
	}

	/** *************************功能集合********************** */
	// 根据返回的结果构造页面
	initPage = function(response)
	{
		loadMarsk.show();
		var result = Ext.util.JSON.decode(response.responseText);
		var success = result.success;
		if (success)
		{
			// 生成动态列
			data = new addColumn();
			var columnNamesList = result.data.columnNamesList;
			queryGroupField = result.data.queryGroupField;
			if (!groupFieldMap.contain(currStep))
			{
				groupFieldMap.put(currStep, queryGroupField);
			}
			if (columnNamesList == null || columnNamesList == '')
			{
				alert('获取列数据失败！');
				return;
			} else
			{
				for ( var i = 0; i < columnNamesList.length; i++)
				{
					var json = eval('(' + columnNamesList[i] + ')');
					if (json != null && json != undefined)
					{
						data.addColumns(json.fieldsValue, json.columnsValue);
					}
				}
			}

			// 初始化Grid
			dynamicGrid();

			// 动态添加查询条件--根据后台返回的组件的类型
			queryStrList = result.data.queryStrList;
			for ( var i = 0; i < queryStrList.length; i++)
			{
				var json = eval('(' + queryStrList[i] + ')');
				if (json != null && json != undefined)
				{
					var qryType = json.qryType;
					if (qryType == 'textfield')
					{
						getTextField(json);
					} else if (qryType == 'combobox')
					{
						getComboBox(json);
					} else if (qryType == 'datefield')
					{
						getDateField(json);
					}
				}
			}

			// 根据条件动态添加按钮
			//if (queryStep != mainStep)
			//{
			//	addBtnFunc('返回', 'icon_back', function()
			//	{
			//		changeOper('goUp');
			//	});
			//}

			// 重新计算容器的布局尺寸
			queryForm.doLayout();
			resultTable.doLayout();
		} else
		{
			alert('加载页面发生异常！');
			return;
		}
	}

	// 格式化统计的数据
	function summaryRenderer(v, params, data)
	{
		return ((v === 0 || v > 1) ? '(' + v + ' 条数据)' : '(1 条数据)');
	}

	// EXT 鼠标放到GridPanel的行的某一个单元格显示tip
	function formatQtip(value, metadata, record, rowIndex, columnIndex, store)
	{
		var title = "";
		var tip = value;
		metadata.attr = 'ext:qtitle="' + title + '"' + ' ext:qtip="' + tip + '"';
		return value;
	}

	// 格式化'操作'
	function renderOper(value, metadata, record, rowIndex, colIndex, store)
	{
		var result = "<font color='blue'><a href=\"javascript:showLogWindow();\">日志详情</a>";
		// if (nextStep != '')
		// {
		// result += " | <a href=\"javascript:changeOper('goDown');\">下钻</a>";
		// }
		result += "</font>";

		return result;
	}

	// 查询功能
	queryFunc = function()
	{
		if (Ext.get(starttime).getValue() != "" && Ext.get(endtime).getValue() != "" && Ext.get(starttime).getValue() > Ext.get(endtime).getValue())
		{
			Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
			return;
		}
		resultStore.baseParams = queryForm.getForm().getValues();
		Ext.apply(resultStore.baseParams,
		{
			queryColParam : queryColParam,
			queryParam : queryParam,
			queryStep : queryStep,
			flowType : flowType,
			start : 0,
			limit : pageSize
		});
		resultStore.load(
		{
			params : resultStore.baseParams
		});
	}

	// 弹出的面板
	detailPanel = new Ext.Panel(
	{
		frame : false,
		title : '',
		id : 'detailPanel',
		bodyStyle : 'padding-left:10px; padding-top:5px; padding-bottom:5px; border:0px',
		autoScroll : true,
		defaults :
		{
			selectOnFocus : true, // 点击即选中
			width : '100%',
			height : '100%',
			xtype : "textarea"
		},
		items :
		[
			{
				id : 'LOGFIELD',
				name : 'LOGFIELD',
				xtype : 'textarea',
				region : 'center',
				allowBlank : true,
				grow : true,// 根据内容自动伸缩
				width : 705,
				height : 450,
				html : ''
			}
		]
	});

	// 弹出的窗口
	detailWindow = new Ext.Window(
	{
		layout : 'fit',
		width : 730,
		id : 'detailWindow',
		height : 450,
		title : '日志详细信息',
		closeAction : 'hide',
		plain : true,
		modal : true,
		autoScroll : false,
		resizable : true,
		buttonAlign : 'center',
		items :
		[
			detailPanel
		],
		buttons :
		[
			{
				text : '关闭',
				iconCls : 'icon_close',
				handler : function()
				{
					detailWindow.hide();
				}
			}
		]
	});

	// 弹出日志详细信息
	showLogWindow = function()
	{
		var record = resultTable.getSelectionModel().getSelected();
		if (record.data.length == 0)
		{
			alert('未检测到数据!');
			return;
		} else
		{
			var stepType = '';
			var batchId = record.get("BATCHID");
			var channelId = record.get("CHANNELID");
			if (colParamMap.contain(currStep))
			{
				stepType = colParamMap.get(currStep);
			}
			// 从后台读取数据
			Ext.Ajax.request(
			{
				url : getLogInfoUrl,
				params :
				{
					channelId : channelId,
					batchId : batchId,
					stepType : stepType
				},
				method : 'POST',
				success : function(response, options)
				{
					var result = Ext.decode(response.responseText);
					result = eval(result);
					detailWindow.show().center();
					Ext.getCmp('LOGFIELD').setValue(result[0].LOGFIELD);
					Ext.getCmp('detailPanel').doLayout(true); // 重新调整版面布局
				},
				failure : function(response, options)
				{
					var result = Ext.util.JSON.decode(response.responseText);
					Ext.Msg.alert('提示', "异常码：获取日志信息失败!" + result.data);
				}
			});
		}
	}

	// 下钻或上钻事件
	changeOper = function(operType)
	{
		// 标识符,用于判断是否执行Ajax代码
		var flag = true;
		if (operType == 'goDown')
		{
			if (nextStep == '-999' || nextParam == '' || nextParam == undefined)
			{
				flag = false;
				alert('不能继续钻取了');
				return;
			} else
			{
				var record = resultTable.getSelectionModel().getSelected();
				if (record == undefined || record.data.length == 0)
				{
					flag = false;
					alert("未检测到数据！");
					return;
				} else
				{
					// 根据页面保存的查询参数,动态的读取页面数据到后台
					var json = eval('(' + nextParam + ')');
					var queryStr = '{';
					var num = 1;
					if (json != undefined && json != null)
					{
						for (text in json)
						{
							var text;
							var value;
							if (text != '' && text != undefined)
							{
								text = text;
								value = record.get(text.replace(' ', ''));
								var byname = json[text];
								// 若传递的参数默认有值,则使用默认值作为键
								if (byname != '')
								{
									text = byname;
								}
								if (num == 1)
								{
									queryStr += "'" + text.replace(' ', '') + "'" + ":" + "'" + value + "'";
								} else
								{
									queryStr += ",'" + text.replace(' ', '') + "'" + ":" + "'" + value + "'";
								}
								num++;
							}
						}
					}
					queryStr += '}';
					queryParam = queryStr;

					// 将下一步流程的查询参数放入Map中保存
					if (nextStep != '-999' && !queryParamMap.contain(nextStep))
					{
						queryParamMap.put(nextStep, queryParam);
					}
					// 将下一步流程的分组字段放入Map中保存
					if (nextStep != '-999' && !groupFieldMap.contain(nextStep))
					{
						groupFieldMap.put(nextStep, nextGroupField);
					}
					// 将下一步流程标识放入Map中保存
					if (nextStep != '-999' && !colParamMap.contain(nextStep))
					{
						colParamMap.put(nextStep, nextColParam);
					}
					// 更新当前用于查询的步骤
					queryStep = nextStep;
					queryColParam = nextColParam;
					flowType = 'down';
				}
			}
		} else if (operType == 'goUp')
		{
			if (lastStep == '-999')
			{
				// 已经到了父节点,清空保存的所有查询参数信息
				queryParam = "";
				queryParamMap = new jsMap();
				flag = false;
				alert('不能继续钻取了');
				return;
			} else
			{
				// 移除当前步骤的分组字段,更新全局变量groupField为上钻步骤的分组字段
				if (groupFieldMap.contain(currStep))
				{
					groupFieldMap.remove(currStep);
				}
				if (groupFieldMap.contain(lastStep))
				{
					queryGroupField = groupFieldMap.get(lastStep);
				}

				// 移除该下钻步骤的父查询参数(即当前步骤的查询参数),更新全局变量queryParam为到当前步骤的父查询参数(即上钻步骤的查询参数)
				if (queryParamMap.contain(currStep))
				{
					queryParamMap.remove(currStep);
				}
				if (queryParamMap.contain(lastStep))
				{
					queryParam = queryParamMap.get(lastStep);
				}
				if (queryParamMap == '{}')
				{
					queryParam = "";
				}

				// 移除当前步骤的流程标识字段,更新全局变量groupField为上钻步骤的流程标识字段
				if (colParamMap.contain(currStep))
				{
					colParamMap.remove(currStep);
				}
				if (colParamMap.contain(lastStep))
				{
					queryColParam = colParamMap.get(lastStep);
				}

				// 更新当前用于查询的步骤
				queryStep = lastStep;
				flowType = 'up';
			}
		} else
		{
			flag = false;
		}

		if (flag)
		{
			// 从服务器端获取列,然后动态添加到ColumnModel中
			Ext.Ajax.request(
			{
				url : getColumnNameUrl,
				params :
				{
					queryParam : queryParam,
					flowType : flowType,
					queryColParam : queryColParam
				},
				success : function(response)
				{
					queryStrList = null;
					if (response.responseText == "")
					{
						alert('初始化页面失败');
						return;
					} else
					{
						var result = Ext.encode(Ext.decode(response.responseText).data);
						if (result == '{}')
						{
							if (queryParamMap.contain(nextStep))
							{
								queryParamMap.remove(nextStep);
							}
							alert('不能继续钻取了');
							return;
						} else
						{
							// 销毁Grid,重新构造
							queryForm.destroy();
							resultTable.destroy();

							// 调用初始化函数
							initPage(response);
							
							// 动态显示返回按钮
							if (queryStep != mainStep)
							{
								Ext.getCmp('btnBack').show();
							}
							else
							{
								Ext.getCmp('btnBack').hide();
							}
						}
					}
				},
				failure : function()
				{
					alert("加载数据异常！");
					return;
				}
			});
		} else
		{
			alert('初始化页面失败');
			return;
		}
	}

});