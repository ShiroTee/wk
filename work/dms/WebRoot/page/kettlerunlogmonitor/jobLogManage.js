
var anchorSohw='100%';
// 各种参数
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
// 各种链接
var listUrl = "getLogJobManageList";
var directoryComboxUrl = "getDirectoryList";
/**
 * 页面--作业运行状态情况列表展示
 */
Ext.onReady(function() {

	// 解决日期控件在IE浏览器下面显示不全的BUG
		Ext.override(Ext.menu.Menu, {
			autoWidth : function() {
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
		var resultStoreFields = [ 'idJob', 'name', 'directoryId', 'directoryParentId',
				'createdUser', 'modifiedUser', 'createdDate', 'modifiedDate', 'description',
				'govName', 'stepName'];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : false,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			sortInfo : {
				field : 'modifiedDate',
				direction : 'desc'
			},
			successProperty : 'success',
			// 获取数据的方式
			proxy : new Ext.data.HttpProxy( {
				method : 'POST',
				url : listUrl
			}),
			// 数据读取器
			reader : new Ext.data.JsonReader( {
				totalProperty : 'count', // 记录总数
				messageProperty : 'msg',
				root : 'list' // Json中的列表数据根节点
			}, resultStoreFields),
			listeners : {
				exception : function(dataProxy, type, action, options,
						response, arg) {
					//var o = Ext.util.JSON.decode(response.responseText);
					var o = Ext.decode(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				}
			}
		});

		// 选择模型
		var sm = new Ext.grid.CheckboxSelectionModel();

		// 列表显示的字段
		var cm = new Ext.grid.ColumnModel( [
				new Ext.grid.RowNumberer(),
				{
					header : 'id',
					width : 20,
					align : 'center',
					dataIndex : 'idJob',
					sortable : true,
					hidden : true

				},
				{
					header : "作业名称",
					width : 120,
					align : 'center',
					dataIndex : 'name',
					sortable : true,
					renderer : formatQtip
					
				},
				{
					header : "委办局",
					width : 50,
					align : 'center',
					dataIndex : 'govName',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "所属过程",
					width : 50,
					align : 'center',
					dataIndex : 'stepName',
					sortable : true,
					renderer : formatQtip
				},

				{
					header : "创建人",
					width : 50,
					align : 'center',
					dataIndex : 'createdUser',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "创建时间",
					width : 60,
					align : 'center',
					dataIndex : 'createdDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s') : '';
//					}
					renderer : formatQtip
				},

				{
					header : "修改人",
					width : 50,
					align : 'center',
					dataIndex : 'modifiedUser',
					sortable : true,
					renderer : formatQtip
				},
				
				{
					header : "修改时间",
					width : 60,
					align : 'center',
					dataIndex : 'modifiedDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s') : '';
//					}
					renderer : formatQtip
	
				}, {
					header : "备注",
					width : 60,
					align : 'center',
					dataIndex : 'description',
					sortable : true,
					hidden : true
				} ]);	
		
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

		//显示列表
		resultTable = new Ext.grid.GridPanel( {
			id : 'resultTable',
			autoScroll : true,
			loadMask : true,
			buttonAlign : 'center',
			monitorResize : true,
			region : 'center',
			//		title : '记录列表',
			store : resultStore,
			cm : cm,
			sm : sm,
			trackMouseOver : true,
			forceLayout : true,
			border : false,
			frame : false,
			columnLines : true,
			stripeRows : true,
			bbar : [],
			viewConfig :
		{
			forceFit : true
		},
		});

		/** ****************** '委办局'-->下拉列表 ********************************** */
		// 定义动态数据
		var directoryDataJsonStore = new Ext.data.JsonStore( {
			url : directoryComboxUrl,
			//root : 'data',
			fields : new Ext.data.Record.create( [ 'directoryId',
					'directoryName' ])
		});
		// 定义下拉框
		var directoryDataCombox = new Ext.form.ComboBox( {
			fieldLabel : '', // UI标签名称
			store : directoryDataJsonStore,
			// name : 'directoryDataCom', // 作为form提交时传送的参数名
			hiddenName : 'directoryId',
			allowBlank : true, // 是否允许为空
			emptyText : '---请选择---', // 没有默认值时,显示的字符串
			typeAhead : true,
			width:100,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : '100%',
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'directoryId', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'directoryName' // 下拉框显示内容
		});
		//directoryDataCombox.reset();
		
		directoryDataJsonStore.load(); // 载入下拉框的信息

		// 查询条件
		var queryFormItems = [ {
		layout : 'column',
		labelAlign : 'right',
		items : [ {
			columnWidth : .2,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '作业名称',
				allowBlank : true,
				maxLength : 80,
				name : 'name',
				anchor : '100%'
			} ]
		},
		{
				columnWidth : .24,
				layout : 'form',
				items : [ {
					fieldLabel : '委办局',
					layout : 'column',
					items : [ {
						items : [ directoryDataCombox ]
					} ]
				} ]
			},
		{
			columnWidth : .2,
			layout : 'form',
			items : [ {
				xtype : 'textfield',
				fieldLabel : '修改人',
				allowBlank : true,
				maxLength : 80,
				name : 'modifiedUser',
				anchor : '100%'
			} ]
		},
		{
				columnWidth : .36,
				layout : 'form',
				items : [ {
					fieldLabel : '修改时间',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'startTime',
						id : 'startTime',
						altFormats : 'Y-m-d',
						width : 110,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
					}, {
						layout : 'form',
						labelWidth : 17,
						labelAlign : 'center',
						items : [ {
							xtype : 'label',
							fieldLabel : '至'
						} ]
					}, {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'endTime',
						id : 'endTime',
						altFormats : 'Y-m-d',
						width : 110,
						format : 'Y-m-d',
						editable:false,
						anchor:anchorSohw
					} ]
				} ]
			}
		]
	} ];
		// center页面初始化事件
		resultStore.on('load', function(s, rec) {

		});

		// 查询功能
		function queryFunc() {
			if(Ext.get('startTime').getValue()!="" && Ext.get('endTime').getValue()!="" && Ext.get('startTime').getValue()>Ext.get('endTime').getValue()){
				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
				return;
			}
			resultStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(resultStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			resultStore.load( {
				params : resultStore.baseParams
			});

		}

		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip(" 对各委办局的流程设计中作业的创建、修改信息进行跟踪。");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm", queryFormItems, queryFunc);
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

		//		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
		//		setTbar(resultTable,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);

	});