
// 各种参数
var queryForm;
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
var queryListUrl = REQUEST_URL_BASE + "recordHandler/getRecordDataList";
var addUrl = "";
//创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorShow='100%';
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

		var gridStore = new Ext.data.Store( {
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
				name : 'SJKLX'
			}, {
				name : 'DATABASETYPE'
			}, {
				name : 'TABLENAME'
			}, {
				name : 'DATACOUNT'
			},{
				name : 'ZDCOUNT'
			},
			{
				name : 'BHZMC'
			},{
				name : 'INDATE'
			}])),
			proxy : new Ext.data.HttpProxy( {
				url : queryListUrl
			})
		});
		var grid = new Ext.grid.GridPanel( {

				id : "logJobGird",
				store : gridStore,
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
				header : "SJKX",
				dataIndex : 'SJKLX',
				hidden : true,
				sortable : true
			}, {
				header : "基础库类别",
				width : 8,
				dataIndex : 'DATABASETYPE',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "基础库表名",
				width : 8,
				dataIndex : 'BHZMC',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "入库记录数(条)",
				width : 8,
				dataIndex : 'DATACOUNT',
				renderer : formatQtip,
				sortable : true
			},{
				header : "入库数据项（个）",
				width : 8,
				dataIndex : 'ZDCOUNT',
				renderer : formatQtip,
				sortable : true
			},  {
				header : "入库日期",
				width : 8,
				dataIndex : 'INDATE',
				renderer : formatQtip,
				hidden : false,
				sortable : true
			}
			/*, {
				header : "入库日期止",
				width : 8,
				dataIndex : 'endDate',
				renderer : formatQtip,
				hidden : false,
				sortable : true
			}*/ ]

		});
		
		
		
		
		var getRootDataJsonStore = new Ext.data.JsonStore(
				{ //填充的数据
					url : REQUEST_URL_BASE + "recordHandler/getRootData",
					//root:'data',
					fields : new Ext.data.Record.create( [
							'sjklx', 'sjkmc' ])
				});
				
				
				// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		getRootDataJsonStore.on("load", function() {
			var PersonRecord = Ext.data.Record.create([ {
				name : 'sjklx',
				type : 'string'
			}, {
				name : 'sjkmc',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord({
				sjklx : '',
				sjkmc : '全部'
			});
			getRootDataJsonStore.insert(0, qb_record);
		});
		//基础库查询
		var getChild = new Ext.form.ComboBox(
		{
			store : getRootDataJsonStore,
			listeners :
			{
				select :  function(serviceInterfaceCombox,
						record, index)
						{
							var combo1 = Ext.getCmp("databaseComboValue");
							//根据选择的服务接口 加载服务接口下的方法
							var combo = Ext.getCmp("comboBasicTableName");
							combo.clearValue();
							combo.store.removeAll();
							combo.store.load((
							{
								params :
								{
									wbjCode : combo1.getValue()
								}
							}));

						}
			},
			valueField : "sjklx",
			displayField : "sjkmc",
			forceSelection : true,
			id : "databaseComboValue",
			blankText : '基础库类别',
			emptyText : '全 部',
			hiddenName : 'sjklx',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '基础库类别',
			name : 'sjklx',
			anchor : anchorShow
		});
		//数据表查询
		var tableNames = new Ext.form.ComboBox(
		{
			tpl : '<tpl for="."><div ext:qtip="{bhzmc}" class="x-combo-list-item">{bhzmc}</div></tpl>',
			store : new Ext.data.JsonStore(
					{
						url : REQUEST_URL_BASE + "recordHandler/getTableNameListByJCK",
						fields : new Ext.data.Record.create( [
								'sjklx', 'bhzmc' ])

					}),
			valueField : "sjklx",
			displayField : "bhzmc",
			mode : 'local',
			forceSelection : true,
			id : "comboBasicTableName",
			blankText : '基础库表名',
			emptyText : '全 部',
			hiddenName : 'bm',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '基础库表名',
			name : 'bm',
			anchor : anchorShow
		});
		
		// 当下拉列表加载完毕后，将“全部”这要数据装载进去到第一项。
		tableNames.store.on("load", function() {
			var PersonRecord = Ext.data.Record.create([ {
				name : 'sjklx',
				type : 'string'
			}, {
				name : 'bhzmc',
				type : 'string'
			} ]);
			var qb_record = new PersonRecord({
				sjklx : '',
				bhzmc : '全部'
			});
			tableNames.store.insert(0, qb_record);
		});
		
		
		// 查询条件
		var queryFormItems = [
		{
			layout : 'column',
			style : 'margin-left: 40px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .25,
				layout : 'form',
				items : [getChild]
			},
			{
				columnWidth : .25,
				layout : 'form',
				items : [tableNames]
			},{
					columnWidth : .5,
					layout : 'form',
					items : [ {
						fieldLabel : '入库日期',
						layout : 'column',
						items : [ {
							xtype : 'datefield',
							fieldLabel : '',
							name : 'starttime_date1',
							id : 'starttime_date1',
							altFormats : 'Y-m-d',
							width : 120,
							editable:false,
							format : 'Y-m-d',
							anchor : anchorShow
						}, {
							layout : 'form',
							labelWidth : 17,
							labelSeparator : ' ',
							labelAlign : 'center',
							items : [ {
								xtype : 'label',
								fieldLabel : '至'
							} ]
						}, {
							xtype : 'datefield',
							fieldLabel : '',
							name : 'endtime_date1',
							id : 'endtime_date1',
							altFormats : 'Y-m-d',
							editable:false,
							width : 120,
							format : 'Y-m-d',
							anchor : anchorShow
						} ]
					} ]
				}
			]
		}];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
		queryForm = new Ext.FormPanel( {
			id : 'queryForm',
			monitorResize : true,
			region : 'north',
			labelAlign : 'left',
			buttonAlign : 'center',
			collapsible : true,
			frame : true,
			title : '查询条件',
			autoWidth : true,
			autoHeight : true,
			items : queryFormItems,
			buttons : [],
			keys : [ { // 处理键盘回车事件
				key : Ext.EventObject.ENTER,
				fn : queryFunc,
				scope : this
			} ]
		});

		// 查询功能
		function queryFunc() {
			gridStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(gridStore.baseParams, {
				start : 0,
				limit : pageSize
			});
			gridStore.load( {
				params : gridStore.baseParams
			});
		}
		
		
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按时间段统计各基础库各数据表入库记录总数及入库数据项总数.");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryForm", queryFormItems, queryFunc);
		// 查询面板中的按钮组
		var formButton = [ {
			text : '查询',
			iconCls : 'icon_query',
			handler : function() {
				queryFunc();
			}
		},
		{
			text : '重置',
			iconCls : 'icon_reset',
			handler : function() {
				queryForm.getForm().reset();
			}
		} ];
		// 将定义的按钮组放入获取的面板中，如：放入查询面板中
		queryForm.addButton(formButton);
		// 利用setTbar(gridComponent,topToolbarItems)函数，设置表格的顶部工具栏，传入参数为：表格组件、顶部栏元素组
//		setTbar(grid,topToolbarItems);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_5", grid);
	});