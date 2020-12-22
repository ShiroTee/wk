var anchorShow='100%';
// 各种参数
var queryForm;
//保存选中的Record主键列id列表
var recordIds = new Array();
//保存选中的Record对象
var recordObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/" ;
var queryListUrl = REQUEST_URL_BASE + "trackErrorDataHandler/getErrorDataList";
//创建服务基本信息表单面板
var LABEL_WIDTH = 340;

Ext.onReady(function() {

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
		var gridDataStore = new Ext.data.Store({
			autoLoad : {
				params : {
					start : 0,
					limit : pageSize
				}
			},
			successProperty : 'success',
			listeners : {
				exception : function(dataProxy, type, action, options,
						response, arg) {
					var o = Ext.util.JSON.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				}
			},
			reader : new Ext.data.JsonReader( {
				totalProperty : "count",
				root : "list"
			}, Ext.data.Record.create( [ {
				name : 'tableCode'
			}, {
				name : 'wbjName'
			}, {
				name : 'tableCode'
			}, {
				name : 'tableName'
			}, {
				name : 'errorCount'
			}])),
			proxy : new Ext.data.HttpProxy( {
				url : queryListUrl
			})
		});

		var cb = new Ext.grid.CheckboxSelectionModel();

		var grid = new Ext.grid.GridPanel( {
			
			id : "errorDataReturnListGird",
			store : gridDataStore,
			autoScroll : true, //是否留有滚动条
				loadMask : true,   //是否的遮罩效果
				buttonAlign : 'center', //按钮布局集中	
				border : false,    // 是否显示行的边框
				trackMouseOver : true,  // 鼠标停留时间
				forceLayout : true,  
				region : 'center', 
				frame : false,     //是否留 frame 边框
				columnLines : true,   // 列分隔处显示分隔符
				stripeRows : true,    //显示行的分隔符
				bbar : [] ,      // 底部分页栏
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
			columns : [
			new Ext.grid.RowNumberer(),
			{
				header : "ID",
				dataIndex : 'tableCode',
				hidden : true,
				sortable : true
			}, {
				header : "委办局",
				renderer : formatQtip,
				width : 60,
				dataIndex : 'wbjName',
				sortable : true
			}, {
				header : "表名",
				width : 60,
				dataIndex : 'tableName',
			}, {
				header : "数据库表名",
				width : 60,
				dataIndex : 'tableCode',
				renderer : operateTable
			}
//			, {
//				header : "数据表名称",
//				renderer : formatQtip,
//				width : 60,
//				dataIndex : 'tableName'
//			}
			, {
				header : "异常数据总量（条）",
				renderer : formatQtip,
				width : 60,
				dataIndex : 'errorCount',
				sortable : true
			}, {
				header : "操作",
				width : 60,
				dataIndex : "",
				renderer : operate
			}]
		});
		function operateTable(value, metadata, record, rowIndex, colIndex, store){
			return record.get('tableCode');
		}
		//显示明细按钮
		function operate(value, metadata, record, rowIndex, colIndex, store){
			//return "<font color='blue'><a href='javascript:void(0)' onclick='dataExport(\"" + record.get('tableCode') + "\", \"" + record.get('errorCount') + "\")'>导&nbsp;出</a></font>"
			return "<font color='blue'><a href='javascript:void(0)' onclick='dataExport(\"" + record.get('tableCode') + "\", \"" + record.get('errorCount') + "\")'><img src='../../images/icons/down001.png' title='导出'></a></font>"
		}
		
		var getRootDataJsonStore = new Ext.data.JsonStore(
		{ //填充的数据
			url : REQUEST_URL_BASE + "dataConfigHandler/getRootData",
			fields : new Ext.data.Record.create( [
					'wbjCode', 'wbjShortName' ])
		});
		
			// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		getRootDataJsonStore.on("load", function() {
			var PersonRecord = Ext.data.Record.create([ {
				name : 'wbjCode',
				type : 'string'
			}, {
				name : 'wbjShortName',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord({
				wbjCode : '',
				wbjShortName : '全部'
			});
			getRootDataJsonStore.insert(0, qb_record);
		});
		
		
		var comboErrorProvinces = new Ext.form.ComboBox(
		{
			store : getRootDataJsonStore,
			listeners :
			{
				select :  function(serviceInterfaceCombox,
						record, index)
						{  
						   comboErrorTableNames.clearValue();
						   comboErrorTableNames.store.removeAll();
							var combo1 = Ext.getCmp("wbjComboErrorDataNameValue");
							//根据选择的服务接口 加载服务接口下的方法
							var combo = Ext.getCmp("comboErrorDataTableNames");
							combo.store.load((
							{
								params :
								{
									wbjCode : combo1.getValue()
								}
							}))

						}
			},
			valueField : "wbjCode",
			displayField : "wbjShortName",
			forceSelection : true,
			id : "wbjComboErrorDataNameValue",
			blankText : '委办局',
			emptyText : '全 部',
			hiddenName : 'wbjCode',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '委办局',
			name : 'wbjCode',
			anchor : anchorShow
		});
		
		var comboErrorTableNames = new Ext.form.ComboBox(
		{
			store : new Ext.data.JsonStore(
					{
						url : REQUEST_URL_BASE + "dataConfigHandler/getTableNameListByWBJ",
						fields : new Ext.data.Record.create( [
								'tableNameEn', 'tableNameZh' ])

					}),
			valueField : "tableNameEn",
			displayField : "tableNameZh",
			mode : 'local',
			forceSelection : true,
			id : "comboErrorDataTableNames",
			blankText : '表名',
			emptyText : '全 部',
			hiddenName : 'tableNameEn',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '表名',
			name : 'tableNameEn',
			anchor : anchorShow
		});
		
		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		comboErrorTableNames.store.on("load", function() {
			var PersonRecord = Ext.data.Record.create([ {
				name : 'tableNameEn',
				type : 'string'
			}, {
				name : 'tableNameZh',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord({
				tableNameEn : '',
				tableNameZh : '全部'
			});
			comboErrorTableNames.store.insert(0, qb_record);
		});
		
		// 查询条件
		var queryCodeFormItems = [
		{
			layout : 'column',
			style : 'margin-left: 140px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .3,
				layout : 'form',
				items : [comboErrorProvinces]
			},
			{
				columnWidth : .3,
				layout : 'form',
				items : [comboErrorTableNames]
			}
//			,
//			{
//				columnWidth : .5,
//				layout : 'form',
//				items : [ 
//				          {
//					fieldLabel : '入异常库时间',
//					layout : 'column',
//					items : [ {
//						xtype : 'datefield',
//						fieldLabel : '',
//						name : 'startTime_date',
//						id : 'errorDataReturnStartTime',
//						altFormats : 'Y-m-d',
//						format : 'Y-m-d',
//						width : 110,
//						editable:false,
//						anchor : anchorShow
//					}, {
//						layout : 'form',
//						labelWidth : 17,
//						labelAlign : 'center',
//						items : [ {
//							xtype : 'label',
//							fieldLabel : '至'
//						} ]
//					}, {
//						xtype : 'datefield',
//						fieldLabel : '',
//						name : 'endTime_date',
//						id : 'errorDataReturnEndTime',
//						altFormats : 'Y-m-d',
//						format : 'Y-m-d',
//						width : 110,
//						editable:false,
//						anchor : anchorShow
//					} ]
//				} ]
//			} 
			]
		}];

		// 查询功能
		function queryFunc() {
//			if(Ext.get('errorDataReturnStartTime').getValue()!="" && Ext.get('errorDataReturnEndTime').getValue()!="" && Ext.get('errorDataReturnStartTime').getValue()>Ext.get('errorDataReturnEndTime').getValue()){
//				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
//				return;
//			}
			gridDataStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(gridDataStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			gridDataStore.load( {
				params : gridDataStore.baseParams
			});
		}
		
	

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按时间段、委办局查询异常库中的数据，并支持导出成为Excel文件，返还给委办局用户.");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm", queryCodeFormItems, queryFunc);
		// 根据ID获取组件。例如获取查询面板组件
		var formPanelCmp = new Ext.getCmp("queryForm");
		// 查询面板中的按钮组
		var formButton = [ {
			text : '查询',
			iconCls : 'icon_query',
			handler : function() {
				queryFunc();
			}
		}, {
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				queryForm.getForm().reset();
			}
		} ];
		// 将定义的按钮组放入获取的面板中，如：放入查询面板中
		formPanelCmp.addButton(formButton);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("ErrorDataReturn_div_1", grid);
});

function dataExport(tableCode, errorCount){
	var errorDataReturnStartTime = '';
	var errorDataReturnEndTime = '';
	if(0!=errorCount){
		var exportUrl = REQUEST_URL_BASE + "trackErrorDataHandler/exprotExcel?tableCode="+tableCode+"&startTime="+errorDataReturnStartTime+"&endTime="+errorDataReturnEndTime;
		window.location.href=exportUrl;
	}else{
		Ext.MessageBox.alert("提示","异常数据总量为0不能导出");
	}
}