
// 各种参数
var anchorSohw='90%';
var queryForm = Ext.getCmp('queryForm');
var resultTable = Ext.getCmp('resultTable');
var resultStore = Ext.getCmp('resultStore');
var detailTable = Ext.getCmp('detailTable');
var detailStore = Ext.getCmp('detailStore');
// 各种链接
var listUrl = "getRepositoryLogList";

// 功能参数
//var queryFunc;
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
		var resultStoreFields = [ 'idRepositoryLog', 'repVersion',
				'operationDesc', 'logUser', 'logDate' ];
		resultStore = new Ext.data.GroupingStore( {
			id : 'resultStore',
			autoLoad : true,
			remoteSort : true,
			baseParams : {
				start : 0,
				limit : pageSize
			},
			sortInfo : {
				field : 'idJob',
				direction : 'desc'
			},
			//统计
			//groupField : 'govName',
//			successProperty : 'success',
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
//				alert(Ext.encode(response.responseText))
				console.warn( Ext.encode(response.responseText) );
				return;
//					var o = Ext.util.JSON.decode(response.responseText);
//					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：");
//					}
				}
				,load:function(s, rec){
							
//							alert(Ext.encode(resultStore.reader.jsonData))
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
					width : 10,
					align : 'center',
					dataIndex : 'idRepositoryLog',
					sortable : true,
					hidden : true

				},
				{
					header : "版本号",
					width : 10,
					align : 'center',
					dataIndex : 'repVersion',
					hidden : true,
					sortable : true
				},
				{
					header : "操作人",
					width : 20,
					align : 'center',
					dataIndex : 'logUser',
					sortable : true,
					renderer : formatQtip
				},
				{
					header : "记录时间",
					width : 20,
					align : 'center',
					dataIndex : 'logDate',
					sortable : true,
//					renderer : function(v2) {
//						return new Date(v2) ? new Date(v2)
//								.dateFormat('Y-m-d h:i:s') : '';
//					}
					renderer : formatQtip
				}, {
					header : "操作描述",
					width : 30,
					align : 'center',
					dataIndex : 'operationDesc',
					sortable : true,
					renderer : formatQtip
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
	resultTable = new Ext.grid.GridPanel(
	{
		id : 'resultTable',
		autoScroll : true,
		loadMask : true,
		buttonAlign : 'center',
		monitorResize : true,
		region : 'center',
		store : resultStore,
		cm : cm,
		sm : sm,
		forceLayout : true,
		border : false,
		frame : false,
		columnLines : true,   // 列分隔处显示分隔符
		stripeRows : true,    //显示行的分隔符
		trackMouseOver : true,  // 鼠标停留时间
		bbar : [],
		viewConfig :
		{
			forceFit : true
		},
	});

		// 查询条件
		var queryFormItems = [ {
			layout : 'column',
			style : 'margin-left: 180px;',
			labelAlign : 'right',
			items : [ {
				columnWidth : .4,
				layout : 'form',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '操作人',
					allowBlank : true,
					maxLength : 80,
					name : 'logUser',
					anchor : anchorSohw
				} ]
			}, 
			{
				columnWidth : .5,
				layout : 'form',
				items : [ {
					fieldLabel : '记录时间',
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


		/** *************************功能集合********************** */
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
		setTip(" 流程设计跟踪用于对各委办局的流程设计的调整（新增、修改等）信息进行跟踪.");
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
		//定义工具栏的元素组

		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);
		
		

	});