
var anchorShow='90%';
// 各种参数
var REQUEST_URL_BASE = PROJECT_ROOT+"/app/http/dmp/" ;
var queryListUrl = REQUEST_URL_BASE
		+ "trackErrorDataHandler/getDataReportList?type=1";

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
	var gridDataStore = new Ext.data.Store( {
		autoLoad : {
			params : {
				start : 0,
				limit : pageSize
			}
		},
		successProperty : 'success',
		listeners : {
			exception : function(dataProxy, type, action, options, response,
					arg) {
				var o = Ext.util.JSON.decode(response.responseText);
				if (!o.success) {
					Ext.Msg.alert('错误提示', "加载数据异常！异常信息：" + o.msg);
				}
			}
		},
		reader : new Ext.data.JsonReader( {
			totalProperty : "count",
			root : "list"
		},Ext.data.Record.create( [ {
			name : 'reportTime'
		}, {
			name : 'wbjName'
		}, {
			name : 'changeFileCount',type:'int'
		}, {
			name : 'parseFileCount',type:'int'
		}, {
			name : 'parsefilefail',type:'int'
		}, {
			name : 'parseIncenterCount',type:'int'
		}, {
			name : 'parseIncenterFail',type:'int'
		}, {
			name : 'dataCleanCount',type:'int'
		}, {
			name : 'dataCleanFail',type:'int'
		}, {
			name : 'dataTranCount',type:'int'
		}, {
			name : 'dataTranFail',type:'int'
		}, {
			name : 'dataCompCount',type:'int'
		}, {
			name : 'dataCompFail',type:'int'
		}, {
			name : 'dataLoadCount',type:'int'
		}, {
			name : 'dataLoadFail',type:'int'
		}])),
		proxy : new Ext.data.HttpProxy( {
			url : queryListUrl
		})
	});
	
	function dataStatus2(value, metadata, record, rowIndex, colIndex, store){
		var returnStr = record.get('reportTime');
		
		var retuenStr2 = new Date(returnStr).format("Y-m-d");
		
		//var retuenStr3 = "<font>"+retuenStr2+"</font>";
		
		//Ext.Msg.alert(retuenStr2);
		
		return retuenStr2;
	}
	

	var cb = new Ext.grid.CheckboxSelectionModel();

	var row = [{
		header : '',
		renderer : formatQtip,
		colspan : 1,
		align : 'left'
	}, {
		header : '报告时间',
		renderer : formatQtip,
		colspan : 1,
		align : 'left'
	},{
		header : '委办局',
		renderer : formatQtip,
		colspan : 1,
		align : 'left'
	}, {
		header : '交换文件数量（个）',
		renderer : formatQtip,
		colspan : 1,
		align : 'left'
	}, {
		header : '解析文件（个）',
		renderer : formatQtip,
		colspan : 3,
		align : 'center'
	}, {
		header : '入中心前置库（条数）',
		renderer : formatQtip,
		colspan : 3,
		align : 'center'
	}, {
		header : '数据清洗（条数）',
		renderer : formatQtip,
		colspan : 3,
		align : 'center'
	}, {
		header : '数据转换（条数）',
		renderer : formatQtip,
		colspan : 3,
		align : 'center'
	}, {
		header : '数据对比（条数）',
		renderer : formatQtip,
		colspan : 3,
		align : 'center'
	}, {
		header : '数据加载（条数）',
		renderer : formatQtip,
		colspan : 3,
		align : 'center'
	} ];
	var group = new Ext.ux.grid.ColumnHeaderGroup( {
		rows : [ row ]
	});
	var cm = new Ext.grid.ColumnModel( [ 
	    new Ext.grid.RowNumberer(),                                
	    {
			renderer : formatQtip,
			dataIndex : 'reportTime',
			width : 170,
			renderer : dataStatus2,
			sortable : true
		},{
			renderer : formatQtip,
			dataIndex : 'wbjName',
			width : 120,
			sortable : true
		}, {
			renderer : formatQtip,
			dataIndex : 'changeFileCount',
			width : 150,
			sortable : true
		}, {
			header : "总量",
			renderer : formatQtip,
			dataIndex : 'parseFileCount',
			sortable : true
		}, {
			header : "错误数",
			renderer : formatQtip,
			dataIndex : 'parsefilefail',
			sortable : true
		}, {
			header : "成功率",
			dataIndex : "",
			renderer : getParseFileResult,
			sortable : true
		}, {
			header : "总量",
			renderer : formatQtip,
			dataIndex : 'parseIncenterCount',
			sortable : true
		}, {
			header : "失败",
			renderer : formatQtip,
			dataIndex : 'parseIncenterFail',
			sortable : true
		}, {
			header : "成功率",
			dataIndex : "",
			renderer : getResult,
			sortable : true
		}, {
			header : "总量",
			renderer : formatQtip,
			dataIndex : 'dataCleanCount',
			sortable : true
		}, {
			header : "失败",
			renderer : formatQtip,
			dataIndex : 'dataCleanFail',
			sortable : true
		}, {
			header : "成功率",
			dataIndex : "",
			renderer : getCleanResult,
			sortable : true
		}, {
			header : "总量",
			renderer : formatQtip,
			dataIndex : 'dataTranCount',
			sortable : true
		}, {
			header : "失败",
			renderer : formatQtip,
			dataIndex : 'dataTranFail',
			sortable : true
		}, {
			header : "成功率",
			dataIndex : "",
			renderer : getTranResult,
			sortable : true
		}, {
			header : "总量",
			renderer : formatQtip,
			dataIndex : 'dataCompCount',
			sortable : true
		}, {
			header : "失败",
			renderer : formatQtip,
			dataIndex : 'dataCompFail',
			sortable : true
		}, {
			header : "成功率",
			dataIndex : "",
			renderer : getCompResult,
			sortable : true
		}, {
			header : "总量",
			renderer : formatQtip,
			dataIndex : 'dataLoadCount',
			sortable : true
		}, {
			header : "失败",
			renderer : formatQtip,
			dataIndex : 'dataLoadFail',
			sortable : true
		}, {
			header : "成功率",
			dataIndex : "",
			renderer : getLoadResult,
			sortable : true
		}]);
	
	/**
	 * 获取结果
	 */
	function getParseFileResult(value, metadata, record, rowIndex, colIndex, store){
		var successCount = record.get('parseFileCount') - record.get('parsefilefail');
		return changeTwoDecimal(successCount/record.get('parseFileCount'))+"%";
	}
	
	/**
	 * 获取结果
	 */
	function getResult(value, metadata, record, rowIndex, colIndex, store){
		return changeTwoDecimal((record.get('parseIncenterCount')-record.get('parseIncenterFail'))/record.get('parseIncenterCount'))+"%";
	}
	
	/**
	 * 获取清洗结果
	 */
	function getCleanResult(value, metadata, record, rowIndex, colIndex, store){
		return changeTwoDecimal((record.get('dataCleanCount')-record.get('dataCleanFail'))/record.get('dataCleanCount'))+"%";
	}
	/**
	 * 获取转换结果
	 */
	function getTranResult(value, metadata, record, rowIndex, colIndex, store){
		return changeTwoDecimal((record.get('dataTranCount')-record.get('dataTranFail'))/record.get('dataTranCount'))+"%";
	}
	/**
	 * 获取比对结果
	 */
	function getCompResult(value, metadata, record, rowIndex, colIndex, store){
		var result = (record.get('dataCompCount')-record.get('dataCompFail'))/record.get('dataCompCount');
		return changeTwoDecimal(result)+"%";
	}

	/**
	 * 获取加载结果
	 */
	function getLoadResult(value, metadata, record, rowIndex, colIndex, store){
		var reuslt = changeTwoDecimal((record.get('dataLoadCount')-record.get('dataLoadFail'))/record.get('dataLoadCount'));
		return reuslt+"%";
	}
	

	var dataReportGrid = new Ext.grid.GridPanel( {
			id : "dataReportFileListGird",
			cm : cm,
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
				tbar : [],            //工具条
				viewConfig : {
					forceFit : true   //随面板宽度适应
				},
				plugins : group
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
			var comboReportProvinces = new Ext.form.ComboBox(
			{
				store : getRootDataJsonStore,
				valueField : "wbjCode",
				displayField : "wbjShortName",
				forceSelection : true,
				id : "dataReportWbjCode",
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
			
			// 查询条件
			var queryReportItems = [
			{
				layout : 'column',
				style : 'margin-left: 140px;',
				labelAlign : 'right',
				items : [{
					columnWidth : .3,
					layout : 'form',
					items : [comboReportProvinces]
				},{
					columnWidth : .7,
					layout : 'form',
					items : [ {
						fieldLabel : '报告时间',
						layout : 'column',
						items : [ {
							xtype : 'datefield',
							name : 'reportTime',
							id : 'reportBaseTime',
							altFormats : 'Y-m-d',
							width : 110,
							format : 'Y-m-d',
							editable:false,
							anchor : anchorShow
						}]
					} ]
				}
				]
			}];
			

			// 点击查询按钮进行查询会调用方法store_load()。点击重置按钮对数据进行重置
//			queryReportForm = new Ext.FormPanel( {
//				id : 'errorDataReturn',
//				monitorResize : true,
//				region : 'north',
//				labelAlign : 'left',
//				buttonAlign : 'center',
//				collapsible : true,
//				frame : true,
//				title : '查询条件',
//				autoWidth : true,
//				autoHeight : true,
//				items : queryReportItems,
//				buttons : [ {
//					text : '查询',
//					iconCls : 'icon_query',
//					handler : function() {
//						queryFunc();
//					}
//				},{
//					text : '重置',
//					iconCls : 'icon_reset',
//					handler : function() {
//						queryReportForm.getForm().reset();
//					}
//				} ,{
//					text : '导出报告',
//					id : 'exportButton',
//					handler : function() {
//						exportReportExcel();
//					}
//				} ]  
//			});
//
//			queryReportForm.render('DataReport_div_1');
//			dataReportGrid.render('DataReport_div_1');
//
			// 查询功能
			function queryFunc() {
				gridDataStore.baseParams = queryForm.getForm().getValues();
				Ext.apply(gridDataStore.baseParams, {
					start : 0,
					limit : pageSize
				});
				gridDataStore.load( {
					params : gridDataStore.baseParams,
					callback: function(records, options, success){
						var count = gridDataStore.getTotalCount();
						if(0==count){
							Ext.getCmp("exportButton").disable();
						}else{
							Ext.getCmp("exportButton").enable();
						}
			    	}
				});
			}
			
			/**
			 * 导出数据报告
			 */
			function exportReportExcel(){
				//var queryTime = document.getElementById("reportTime").value;
				var queryWbjName = Ext.getCmp("dataReportWbjCode").getValue();
				var exportUrl = REQUEST_URL_BASE + "trackErrorDataHandler/exportReportExcel?type=1&queryWbjName="+queryWbjName;
				window.location.href=exportUrl;
			}
			
			
			
			
			/** *****以下为注册各页面组件方法******************************* */
			// 提示标签提示的内容;
			setTip("总体分析按文件进行交换的委办局的数据处理过程，按委办局及时间段统计数据处理总量、失败数量、成功率等总体信息，支持导出成Excel文件.");
			// 构建一个查询面板，参数依次为：面板的ID、面板里的元素组、点查询按钮时触发的函数
			queryForm = setQueryForm("queryReportForm", queryReportItems, queryFunc);
			// 根据ID获取组件。例如获取查询面板组件
			var formPanelCmp = new Ext.getCmp("queryReportForm");
			// 查询面板中的按钮组
			var formButton = [ 
				{
					text : '查询',
					iconCls : 'icon_query',
					handler : function() {
						queryFunc();
					}
				},{
					text : '重置',
					iconCls : 'icon_reset',
					handler : function() {
						queryForm.getForm().reset();
					}
				},{
					text : '导出',
					id : 'exportButton',
					iconCls : 'icon_export_new',
					handler : function() {
						exportReportExcel();
					}
				}
			];
			// 将定义的按钮组放入获取的面板中，如：放入查询面板中
			formPanelCmp.addButton(formButton);
			// 利用setPaging(gridComponent)函数，为表格添加底部分页栏，传入的参数为需要添加分页栏目的表格组件。注意：需要添加分页栏的表格必须定义bbar:[]属性
			setPaging(dataReportGrid);
			// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
			setMainPanel("DataReport_div_1", dataReportGrid);
	});
