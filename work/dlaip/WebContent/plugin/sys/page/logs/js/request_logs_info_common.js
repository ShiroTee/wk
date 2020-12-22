//创建异常复选框
function createExceptionalCheckbox() {
	var exceptional = new Ext.form.Checkbox({
		name : 'exceptional',
		inputValue : 'Y'

	});
	return exceptional;
}
// 创建业务模块下来框
function requestUrlCombox() {
	var requestUrl = new Ext.form.ComboBox({
		name : "requestUrl",
		editable : true,// 是否可填写
		fieldLabel : '业务模块',
		emptyText : '请选择',
		selectOnFocus : true, // 选择时选中框中的值
		forceSelection : true, // 值为true时将限定值为列表中的值，值为false则允许用户将任意文本设置到字段
		typeAhead : false, // 值为true时在经过指定延迟（typeAheadDelay）后弹出并自动选择输入的文本
		triggerAction : "all", // 每次弹出所有下拉列表，值为'query'时则弹出与框中已有值配置的项
		hiddenName : 'requestUrl',
		displayField : 'displayField',
		valueField : "val",
		width:300,
		mode: 'local',
		id : 'requestUrlId',
		allowBlank : true,
		store : new Ext.data.JsonStore({
			url : getHandlerRequestUrl() + "requestLogsinfoHandler/getRequestLogsinfoUrl",
			autoLoad : true,
			successProperty : 'success',
			fields : new Ext.data.Record.create([ {
				name : 'val',
				mapping : 'REQUEST_URL'
			}, {
				name : 'displayField',
				mapping : 'REQUEST_URL'
			} ])
		})

	});
	return requestUrl;
}

// 创建汇总区间
function intervalTimeComboBox() {
	var intervalTime = new Ext.form.ComboBox({
		mode : 'local',
		id : 'intervalTime',
		store : new Ext.data.SimpleStore({
			fields : [ 'name', 'id' ],
			data : [ [ '10分钟', '10' ], [ '30分钟', '30' ], [ '1小时', '60' ],
					[ '3小时', '180' ], [ '1天', '1440' ] ]
		}),
		triggerAction : 'all',
		displayField : 'name',
		valueField : 'id',
		value : "180",
		width : 110,
		fieldLabel : '汇总区间'
	// resizable : true,
	});
	return intervalTime;
}

// 分析时间开始段
function startDatefield() {
	var startDate = new Ext.form.DateField({
		fieldLabel : '时间开始段',
		name : 'startDate',
		id : 'startDate',
		altFormats : 'Y-m-d',
		value:new Date(),
		format : 'Y-m-d',
		editable : false
	});
	return startDate;
}
// 分析时间结束段
function endDatefield() {
	var endDate = new Ext.form.DateField({
		listeners : {
			select : function(serviceInterfaceCombox, record, index) {
				var combo1 = Ext.getCmp("endDate").getValue().getTime();

				Ext.getCmp("startDate").setValue(
						new Date(combo1 - (24 * 60 * 60 * 1000)));

			}
		},
		fieldLabel : '时间结束段',
		name : 'endDate',
		id : 'endDate',
		altFormats : 'Y-m-d',
		format : 'Y-m-d',
		// disabled:true,
		editable : false
	});
	return endDate;
}
