
// 各种参数
var queryForm;
//保存选中的Record主键列id列表
var recordIds = new Array();
//保存选中的Record对象
var recordObjs = new Array();
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/";
var queryListUrl = REQUEST_URL_BASE + "olaPWbjqzyJckHandler/getOlaPWbjqzyJckList";
//创建服务基本信息表单面板
var LABEL_WIDTH = 340;
var anchorShow='100%';
Ext.onReady(function() {
		
		// 解决日期控件在IE浏览器下面显示不全的BUG
		 Ext.override(Ext.menu.Menu, {
                     autoWidth: function () {
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
					alert(response.responseText);
					if (!o.success) {
						Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
					}
				}
			},
			
			reader : new Ext.data.JsonReader( {
				totalProperty : "count",
				root : "list"
			}, Ext.data.Record.create( [ {
				name : 'WBJBM'
			},{
				name : 'WBJJC'
			},
			{
				name : 'BHZMC'
			}, {
				name : 'SUPPLYCOUNT'
			}, {
				name : 'ACCEPTCOUNT'
			}, {
				name : 'COMPAREDATE'
			}, {
				name : 'CY'
			}
			])),
			proxy : new Ext.data.HttpProxy( {
				url : queryListUrl
			})
		});
		
		var cb = new Ext.grid.CheckboxSelectionModel();

		var grid = new Ext.grid.GridPanel( {
				id : "jckListGird",
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
			           new Ext.grid.RowNumberer(),{
				header : "ID",
				dataIndex : 'WBJBM',
				hidden : true,
				sortable : true
			},{
				header : "委办局",
				width : 50,
				dataIndex : 'WBJJC',
				renderer : formatQtip,
				sortable : true
			},
			{
				header : "表名",
				width : 50,
				dataIndex : 'BHZMC',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "提供数据总量（条）",
				width : 50,
				dataIndex : 'SUPPLYCOUNT',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "入库数据总量(条)",
				width : 50,
				dataIndex : 'ACCEPTCOUNT',
				renderer : formatQtip,
				sortable : true
			}, {
				header : "对账日期",
				width : 50,
				dataIndex : 'COMPAREDATE',
				renderer : formatQtip,
				sortable : true
			},
			{
				header : "数据差异（条）",
				width : 50,
				dataIndex : 'CY',
				renderer :wbjcy,
				sortable : true
				
			}]
		});		
		// 格式化'数据详情'列 --[value:单元格的数据值/metadata:单元格元数据]
		function wbjcy(value, metadata, record, rowIndex, colIndex,
				store) {
			var result ;
			if(record.get('CY')==0){
				result="无";
			}
			if(record.get('CY') > 0&& record.get('CY') <=20){
				result = "<font color='blue'>"+record.get('CY')+"</font>";
			}else if(record.get('CY') >20){
				result = "<font color='red'>"+record.get('CY')+"</font>";
			}
			return result;
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
							var combo1 = Ext.getCmp("jckNameValue");
							//根据选择的服务接口 加载服务接口下的方法
							var combo = Ext.getCmp("jckTableNames");
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
			id : "jckNameValue",
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
			id : "jckTableNames",
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
			style : 'margin-left: 60px;',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .25,
				layout : 'form',
				items : [comboErrorProvinces]
			},
			{
				columnWidth : .25,
				layout : 'form',
				items : [comboErrorTableNames]
			},
			{
				columnWidth : .5,
				layout : 'form',
				items : [ {
					fieldLabel : '对账日期',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'dztime',
						id : 'dztime',
						width : 110,
						editable:false,
						altFormats : 'Y-m-d',
						format : 'Y-m-d',
						anchor : anchorShow
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
						name : 'dzendtime',
						id : 'dzendtime',
						editable:false,
						width : 110,
						altFormats : 'Y-m-d',
						format : 'Y-m-d',
						anchor : anchorShow
					} ]
				} ]
			} 
			]
		}];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
//		queryForm = new Ext.FormPanel( {
//			id : 'jckqueryDataForm',
//			monitorResize : true,
//			region : 'north',
//			labelAlign : 'left',
//			buttonAlign : 'center',
//			collapsible : true,
//			frame : true,
//			title : '查询条件',
//			autoWidth : true,
//			autoHeight : true,
//			items : queryCodeFormItems,
//			buttons : [ {
//				text : '查询',
//				iconCls : 'icon_query',
//				handler : function() {
//					queryFunc();
//				}
//			},{
//				iconCls : 'icon_reset',
//				text : '重置',
//				handler : function() {
//					queryForm.getForm().reset();
//				}
//			} ]  
//		});

		// 查询功能
		function queryFunc() {
			if(Ext.get('dztime').getValue()!="" && Ext.get('dzendtime').getValue()!="" && Ext.get('dztime').getValue()>Ext.get('dzendtime').getValue()){
				Ext.Msg.alert("错误提示","开始时间不能大于结束时间！");
				return;
			}
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
		setTip("按时间段统计显示委办局前置和基础库数据对帐的结果,如果数据有较大差异,用红色字体显示,差异较小用蓝色字体显示.");
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
		},{
			iconCls : 'icon_reset',
			text : '重置',
			handler : function() {
				queryForm.getForm().reset();
			}
		} ] ;
		// 将定义的按钮组放入获取的面板中，如：放入查询面板中
		formPanelCmp.addButton(formButton);
		// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
		setPaging(grid);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("wbjjckdz_div_1", grid);
		
	});

