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
var addTextField = function(id, fieldLabel, value)
{
	var qryItem =
	{
		columnWidth : .3,
		layout : 'form',
		border : false,
		items :
		[
			{
				xtype : 'textfield',
				fieldLabel : fieldLabel,
				id : id,
				anchor : '95%',
				value : value
			}
		]
	};

	queryForm.items.items[0].add(qryItem);
}
/**
 * 获取动态的TextField组件
 */
var getTextField = function(json)
{
	addTextField(json.id, json.fieldLabel, json.value);
}

/**
 * 动态增加查询的组件----ComboBox
 */
var addComboBox = function(id, fieldLabel, url, valueField, displayField)
{
	// 定义动态数据
	var dataJsonStore = new Ext.data.JsonStore(
	{
		url : url,
		root : 'data',
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
		value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
		valueField : valueField, // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
		displayField : displayField
	});
	dataJsonStore.load(); // 载入下拉框的信息

	var qryItem =
	{
		columnWidth : .3,
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

	queryForm.items.items[0].add(qryItem);
}
/**
 * 获取动态的ComboBox组件
 */
var getComboBox = function(json)
{
	addComboBox(json.id, json.fieldLabel, json.url, json.valueField, json.displayField);
}

/**
 * 动态增加查询的组件----datefield
 */
var addDateField = function(starttimeName, starttimeValue, endtimeName, endtimeValue)
{
	var dateArr = [];
	var dateLabel =
	{
		labelWidth : 40,
		layout : 'form',
		items :
		[
			{
				xtype : 'label',
				fieldLabel : '日期'
			}
		]
	};
	var qryItem =
	{
		columnWidth : .3,
		layout : 'column',
		items :
		[
				{
					xtype : 'datefield',
					fieldLabel : '',
					name : starttimeName,
					id : starttimeName,
					altFormats : 'Y-m-d',
					format : 'Y-m-d',
					value : starttimeValue,
					width : 150
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
					width : 150
				}
		]
	};
	dateArr.push(dateLabel);
	dateArr.push(qryItem);

	queryForm.items.items[0].add(dateArr);
}
/**
 * 获取动态的datefield组件
 */
var getDateField = function(json)
{
	addDateField(json.starttimeName, json.starttimeValue, json.endtimeName, json.endtimeValue);
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