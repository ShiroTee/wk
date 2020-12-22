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
				name : 'exceptionTableCode'
			},{
				name : 'tableCode'
			}, {
				name : 'wbjName'
			}, {
				name : 'tableName'
			}, {
				name : 'errorCount'
			},{
				name : 'exceptionCount'
			},{
				name : 'startTime'
			}, {
				name : 'endTime'
			}])),
			proxy : new Ext.data.HttpProxy( {
				url : queryListUrl
			})
		});

		var cb = new Ext.grid.CheckboxSelectionModel();

		var grid = new Ext.grid.GridPanel( {
			id : "errorDataListGird",
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
				renderer : formatQtip,
				width : 60,
				dataIndex : 'tableName',
				sortable : true
			}, {
				header : "异常数据项总数(个)",
				renderer : formatQtip,
				width : 60,
				dataIndex : 'errorCount',
				sortable : true
			}, {
				header : "异常数据总记录数(条)",
				renderer : formatQtip,
				width : 60,
				dataIndex : 'exceptionCount',
				sortable : true
			}, {
				header : "数据详情",
				width : 60,
				dataIndex : 'tableCode',
				renderer : rendBtn
			}, {
				header : "查询日期",
				renderer : formatQtip,
				width : 60,
				hidden : true,
				dataIndex : 'startTime',
				sortable : true
			},{
				header : "查询日期止",
				renderer : formatQtip,
				width : 70,
				hidden : true,
				dataIndex : 'endTime',
				sortable : true
			}]

		});
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
							var combo1 = Ext.getCmp("wbjComboErrorNameValue");
							//根据选择的服务接口 加载服务接口下的方法
							var combo = Ext.getCmp("comboErrorTableNames");
							combo.store.load((
							{
								params :
								{
									wbjCode : combo1.getValue()
								}
							}));

						}
			},
			valueField : "wbjCode",
			displayField : "wbjShortName",
			forceSelection : true,
			id : "wbjComboErrorNameValue",
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
			id : "comboErrorTableNames",
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
		
		var comboRuleNams = new Ext.form.ComboBox(
		{
			store : new Ext.data.SimpleStore(
			{
				fields : [ 'name', 'id' ],
				data : [ [ '清洗规则', '1' ],
						 [ '比对规则', '2' ],
						 [ '转换规则', '3' ],
						 [ '加载规则', '4' ],
						 [ '抽取规则', '5' ] ]
			}),
			valueField : "id",
			displayField : "name",
			mode : 'local',
			forceSelection : true,
			id : "comboRuleNams",
			blankText : '异常类型',
			emptyText : '全 部',
			hiddenName : 'comboRuleName',
			editable : false,
			triggerAction : 'all',
			allowBlank : true,
			fieldLabel : '异常类型',
			anchor : anchorShow
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
			/*
			{
				columnWidth : .2,
				layout : 'form',
				items : [comboRuleNams]
			},
			*/
			{
				columnWidth : .5,
				layout : 'form',
				items : [ {
					fieldLabel : '入异常库时间',
					layout : 'column',
					items : [ {
						xtype : 'datefield',
						fieldLabel : '',
						name : 'startTime_date',
						id : 'startTime_date',
						altFormats : 'Y-m-d',
						format : 'Y-m-d',
						editable:false,
						width : 110,
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
						name : 'endTime_date',
						id : 'endTime_date',
						altFormats : 'Y-m-d',
						format : 'Y-m-d',
						width : 110,
						editable:false,
						anchor : anchorShow
					} ]
				} ]
			} 
			]
		}];

		// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
		queryForm = new Ext.FormPanel( {
			id : 'queryDataForm',
			monitorResize : true,
			region : 'north',
			labelAlign : 'left',
			buttonAlign : 'center',
			collapsible : true,
			frame : true,
			autoWidth : true,
			autoHeight : true,
			items : queryCodeFormItems,
			buttons : []  
		});
		// 查询功能
		function queryFunc() {
			if(Ext.get('startTime_date').getValue()!="" && Ext.get('endTime_date').getValue()!="" && Ext.get('startTime_date').getValue()>Ext.get('endTime_date').getValue()){
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
		
		//显示明细按钮
		function rendBtn(value, metadata, record, rowIndex, colIndex, store){
			var startTime = document.getElementById("startTime_date").value;
			var endTime = document.getElementById("endTime_date").value;
			return "<font color='blue'><a href='javascript:void(0)' onclick='showDetail(\"" + record.get('exceptionTableCode') + "\",\"" + record.get('tableCode') + "\", \"" + startTime + "\", \"" + endTime + "\", \"" + record.get('tableName') + "\", \"" + record.get('exceptionCount') + "\")'>明&nbsp;细</a></font>"
		}
		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("按委办局、数据表名和异常类型查询异常数据，点击明细后可展现每条数据产生异常的数据项。");
		// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
		queryForm = setQueryForm("queryDataForm", queryCodeFormItems, queryFunc);
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
		setMainPanel("errorData_div_1", grid);
	});

function showDetail(exceptionTableCode,tableCode, startDate, endDate, tableName,count){
	var url = REQUEST_URL_BASE + "trackErrorDataHandler/getExceptionTableInfo?tableCode="+tableCode+"&count="+count;
	var getColumnInfoUrl = REQUEST_URL_BASE + "trackErrorDataHandler/getTableColumnInfo?exceptionTableCode="+exceptionTableCode+"&tableCode="+tableCode;
	
	//,'GMSFHM'
	var columnStr = "";
	var columnName = "";
	columnStore = new Ext.data.JsonStore({
		autoLoad : true,
		baseParams :
		{
			start : 0,
			limit : pageSize,
			detailTableName : tableName
		},
		successProperty : 'success',
		listeners :
		{
			exception : function(dataProxy, type, action, options, response, arg)
			{
				var o = Ext.util.JSON.decode(response.responseText);
				columnStr = o.columnModelIndex;
				columnName = o.columnModelName;
				var colMArr = columnStr.split("&");
				var colNameArr = columnName.split("&");
			    var colMArray = new Array();
			    colMArray[0] = new Ext.grid.RowNumberer();
			    var str = "{'fields':[";
			    for(var i=0; i<colMArr.length; i++) {
			    	//此处的fieldArray[i]是fields的数据
			    	var widthValue = 800/colMArr.length;
			    	if('EXCEPITION_INFO' == colMArr[i]){
			    		widthValue = 250;
			    	}else if('DOFLAG' == colMArr[i]){
			    		widthValue = 80;
			    	}else if('INTIME' == colMArr[i]){
			    		widthValue = 170;
			    	}else if('tableName' == colMArr[i]){
			    		widthValue = 130;
			    	}
			    	colMArray[i+1] = {header:colNameArr[i],width:widthValue,dataIndex:colMArr[i]}
			    	str = str +"{name:'"+colMArr[i]+"',mapping:'"+colMArr[i]+"'},";
			    }
			    var cm = new Ext.grid.ColumnModel(colMArray);
			    
			    var field = str.substring(0,str.length-1)+']}';
			    var jsonField = new Ext.util.JSON.decode(field);
				
				errorDataResultStore = new Ext.data.JsonStore(
				{
					autoLoad : true,
					baseParams :
					{
						start : 0,
						limit : pageSize,
						detailTableName : tableName,
						startTime : startDate,
						endTime : endDate
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
					id : 'errorDataResultStore',
					url : url,
					root : 'list',
					idProperty : 'ID',
					totalProperty : 'count',
					messageProperty : 'msg',
					fields : jsonField.fields
				});
				
				// 分页显示控件
				var pagingServiceToolbar = new Ext.PagingToolbar(
				{
					pageSize : pageSize,
					store : errorDataResultStore,
					displayInfo : true,
					plugins : new Ext.ux.ProgressBarPager(),
					displayMsg : '显示{0}-{1}条,共{2}条',
					emptyMsy : '没有记录'
				});
				
				
				 
				var gridList = new Ext.grid.GridPanel({
			           region: 'north',
			       //    autoHeight:true,
					   autoScroll : true,
					   loadMask : true,
			           store: errorDataResultStore,
			           cm: cm,
			           frame: false,
			           bbar : pagingServiceToolbar
			    });
				
//				setPaging(gridList);
				var serviceInfoWin = new Ext.Window(
						{
							  layout:'fit',
					          width:800,
					          height:450,
					          title : '异常表详细错误信息',
					          closeAction:'hide',//关闭窗口时渐渐缩小
					          plain: true,
					          modal : true,
					          items:[gridList]
						});
				serviceInfoWin.show();
				
			}
		},
		id : 'errorDataResultStore',
		url : getColumnInfoUrl,
		messageProperty : 'msg'
	});
	
	function psThisLable(value, metadata, record, rowIndex, colIndex, store){
		return "<font color='red'>"+record.get('XB')+"</font>";
	}
	
}