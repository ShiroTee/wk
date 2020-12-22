// 每页显示行数
var pageSize = 20;
// 各种参数
var queryForm;
var queryFunc;
var resultTable;
var resultStore;
// 保存选中的Record主键列id列表
var recordIds = new Array();
// 保存选中的Record对象
var recordObjs = new Array();
// 各种链接
var listUrl = PROJECT_ROOT+'app/http/sms/serviceManageHandler/getServiceInfoList';
var applyUrl = PROJECT_ROOT+'app/http/sms/serviceManageHandler/applyService';

/**
 * 页面--用户服务列表展示
 */
Ext.onReady(function()
{
	// 解决日期控件在IE浏览器下面显示不全的BUG
		Ext.override(Ext.menu.Menu,
		{
			autoWidth : function()
			{
				this.width += "px";
			}
		});
		// 初始化页面的时候时候会执行store_load方法，查询数据
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget = 'side';
		
		// row expander


		/** ************************数组操作--函数开始***************************** */
		function RemoveArray(array, attachId)
		{
			if (array.length > 0)
			{
				for ( var i = 0, n = 0; i < array.length; i++)
				{
					if (array[i] != attachId)
					{
						array[n++] = array[i]
					}
				}
				array.length -= 1;
			}
		}
		function containsArray(array, attachId)
		{
			for ( var i = 0; i < array.length; i++)
			{
				if (array[i] == attachId)
				{
					return true;
					break;
				}
			}
			return false;
		}
		Array.prototype.remove = function(obj)
		{
			return RemoveArray(this, obj);
		};
		Array.prototype.contains = function(obj)
		{
			return containsArray(this, obj);
		};
		/** ************************结束***************************** */

		var resultStoreFields = ['SERVICEID', 'SERVICENAME', 'SERVICEPROTOCAL', 'SERVICEURL', 'SERVICESTATUS',
				'CATALOGUENAME', 'SERVICETYPE', 'AUDITSTATUS', 'REQUESTPARAMETER', 'RESPONSEPARAMETER'];
		resultStore = new Ext.data.JsonStore(
		{
			autoLoad : true,
			baseParams :
			{
				start : 0,
				limit : pageSize
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
				},
				'load' : function(store, record, options)
				{
					/**
					 * 每次store加载(load事件)完后,遍历store,比较每条Record的主键列id是否在recordIds中,
					 * 若存在则将Record保存到临时变量records中,最后调用selMod.selectRecords(records,
					 * true).
					 */
					var records = new Array();
					resultStore.each(function(record)
					{
						if (recordIds.contains(record.get('SERVICEID')))
						{
							records.push(record);
						}
					});
					// 以后每次load数据时，都会默认选中
				sm.selectRecords(records, true);
			}
			},
			id : 'resultStore',
			url : listUrl,
			root : 'root',
			idProperty : 'ID',
			totalProperty : 'totalProperty',
			messageProperty : 'msg',
			fields : resultStoreFields
		});

		// 选择模型
		var sm = new Ext.grid.CheckboxSelectionModel(
		{
			listeners :
			{
				// 选中
				'rowselect' : function(sm, row, rec)
				{
					// 保存勾选中的Record的主键id值
					if (!recordIds.contains(rec.get("SERVICEID")))
					{
						recordIds.push(rec.get("SERVICEID"));
						recordObjs.push(rec);
					}
				},
				// 不选中
				'rowdeselect' : function(sm, row, rec)
				{
					if (recordIds.contains(rec.get("SERVICEID")))
					{
						recordIds.remove(rec.get("SERVICEID"));
						recordObjs.remove(rec);
					}
				}
			}
		});
		
		var tpl=new Ext.XTemplate('<div style="padding-left:80px;">','{[this.toBase64(values.REQUESTPARAMETER,values.RESPONSEPARAMETER,values.SERVICEURL)]}');
		tpl.toBase64 = function(value,value2,url){
			var jsonParameter="";
			var html='';
			html=html+'<table border="1" cellspacing="0" cellpadding="0" width="100%"><tr><td COLSPAN="4" ><h1>请求参数</h1></td></tr>';
			html=html+"<tr><td>参数名称</td><td>参数类型</td><td>参数描述</td><td>备注</td></tr>";
			if(value=="")
			{
				jsonParameter="[]";
			}
			else
			{
				jsonParameter =  strAnsi2Unicode(decode64(value));
			}
			var json=Ext.util.JSON.decode(jsonParameter);
			for(var i=0;i<json.length;i++)
			{
				html += "<tr>";
				html += "<td>"+json[i].name+"</td>";
				html += "<td>"+json[i].dataType+"</td>";
				html += "<td>"+json[i].dataDescs+"</td>";
				html += "<td>"+json[i].remarks+"</td>";
				html += "</tr>";
			}
			html=html+"</table></br>";
			html=html+'<table border="1" cellspacing="0" cellpadding="0" width="100%"><tr><td COLSPAN="4"><h1>响应参数</h1></td></tr>';
			html=html+"<tr><td>参数名称</td><td>参数类型</td><td>参数描述</td><td>备注</td></tr>";
			if(value2=="")
			{
				jsonParameter="[]";
			}
			else
			{	
				jsonParameter =  strAnsi2Unicode(decode64(value2));
			}
			json=Ext.util.JSON.decode(jsonParameter);
			for(var i=0;i<json.length;i++)
			{
				html += "<tr>";
				html += "<td>"+json[i].name+"</td>";
				html += "<td>"+json[i].dataType+"</td>";
				html += "<td>"+json[i].dataDescs+"</td>";
				html += "<td>"+json[i].remarks+"</td>";
				html += "</tr>";
			}
			html=html+"</table>";
			
			/*
			alert(values.length);
			var jsonParameter =  strAnsi2Unicode(decode64(value));
			var json=Ext.util.JSON.decode(jsonParameter);
			var html="<table><tr><td>名称</td><td>数据类型</td><td>数据描述</td><td>备注</td></tr>";
			for(var i=0;i<json.length;i++)
			{
				html += "<tr>";
				html += "<td>"+json[i].name+"</td>";
				html += "<td>"+json[i].dataType+"</td>";
				html += "<td>"+json[i].dataDescs+"</td>";
				html += "<td>"+json[i].remarks+"</td>";
				html += "</tr>";
			
			}
			html+="</html>";
			*/
			return html;
			
		};
	    var expander = new Ext.ux.grid.RowExpander({
	        tpl : tpl
	    });

		// 列表显示的字段
		var cm = new Ext.grid.ColumnModel([ new Ext.grid.RowNumberer(), sm, expander,
		{
			header : "SERVICEID",
			dataIndex : 'SERVICEID',
			hidden : true,
			sortable : true
		},
		{
			header : "服务名称",
			width : 120,
			dataIndex : 'SERVICENAME',
			sortable : true
		},
/*
		{
			header : "ssss",
			width : 60,
			dataIndex : 'REQUESTPARAMETER',
			sortable : true
		},

		{
			header : "ddddd",
			width : 60,
			dataIndex : 'RESPONSEPARAMETER',
			sortable : true
		},
		*/
		{
			header : "协议",
			width : 60,
			dataIndex : 'SERVICEPROTOCAL',
			sortable : true
		},
		{
			header : "服务类型",
			width : 80,
			dataIndex : 'SERVICETYPE',
			sortable : true
		},
		{
			header : "服务目录",
			width : 80,
			dataIndex : 'CATALOGUENAME',
			sortable : true
		},
		{
			header : "URL",
			width : 160,
			dataIndex : 'SERVICEURL',
			sortable : true
		},
		{
			header : "当前服务状态",
			width : 60,
			dataIndex : 'SERVICESTATUS',
			renderer : renderServiceStatus,
			sortable : true
		},
		{
			header : "当前审批状态",
			width : 60,
			dataIndex : 'AUDITSTATUS',
			renderer : renderAuditStatus,
			sortable : true
		}]);

		// 格式化当前服务对应用户的审批状态
		function renderAuditStatus(value, metadata, record, rowIndex, colIndex, store)
		{
			if (value == "Y")
			{
				return "<font color='green'>已审批</font>";
			} else if (value == "N")
			{
				return "<font color='red'>待审批</font>";
			} else if (value == "Z")
			{
				return "<font color='red'>审批不通过</font>";
			} else
			{
				return "<font color='blue'>未申请</font>";
			}
		}

		// 格式化当前服务的状态
		function renderServiceStatus(value, metadata, record, rowIndex, colIndex, store)
		{
			if (value == "Y")
			{
				return "<font color='green'>启用</font>";
			} else if (value == "N")
			{
				return "<font color='red'>禁用</font>";
			} else
			{
				return "<font color='yellow'>未知状态</font>";
			}
		}

		// 分页显示控件
		var pagingToolbar = new Ext.PagingToolbar(
				{
					pageSize : pageSize,
					store : resultStore,
					displayInfo : true,
					displayMsg : '<span style="padding-right: 150px;padding-left: 40px">显示记录 {0} - {1}条 &nbsp;&nbsp;总共 {2}条<span>',
					emptyMsg : '<span style="padding-right: 200px;padding-left: 40px">没有记录</span>'
				});

		// 按钮工具栏
		var toolBar = new Ext.Toolbar(
		{
			items : [
			{
				text : '申请',
				id : 'btnApply',
				iconCls : 'icon_apply',
				disabled : false,
				handler : function()
				{
					serviceApply();
				}
			}]
		});

		// 显示的列表
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
			trackMouseOver : false,
			forceLayout : true,
			frame : false,
			width : '100%',
			height : '100%',
			columnLines : true,
			stripeRows : true,
			plugins: expander,
	        animCollapse: false,
			viewConfig :
			{
				forceFit : true
			},
			// 工具栏
			tbar : toolBar,
			// 分页栏
			bbar : []//pagingToolbar
		});

		/** ****************** '服务状态'-->下拉列表 ********************************** */
		// 定义静态数据
		var ServiceStatusData = [['', '全部'], ['Y', '启用'], ['N', '禁用']];
		// 定义ComboBox 的数据源
		var ServiceStatusStore = new Ext.data.SimpleStore(
		{
			fields : ['text', 'value'],
			data : ServiceStatusData
		});
		// 定义下拉框
		var ServiceStatusCombox = new Ext.form.ComboBox(
		{
			fieldLabel : '', // UI标签名称
			name : 'serviceCom', // 作为form提交时传送的参数名
			allowBlank : true, // 是否允许为空
			emptyText : '---请选择---', // 没有默认值时,显示的字符串
			typeAhead : true,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : '90%',
			store : ServiceStatusStore,
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'value', // 下拉框显示内容
			regex : /[\u4e00-\u9fa5]/, // 只能输入中文.
			regexText : "只能输入中文!" // 使用正则表达式时,设置的错误提示
		});

		/** ****************** '审批状态'-->下拉列表 ********************************** */
		// 定义静态数据
		var auditStatusData = [['', '全部'], ['F', '未申请'], ['Z', '审批不通过']];
		// 定义ComboBox 的数据源
		var auditStatusStore = new Ext.data.SimpleStore(
		{
			fields : ['text', 'value'],
			data : auditStatusData
		});
		// 定义下拉框
		var auditStatusCombox = new Ext.form.ComboBox(
		{
			fieldLabel : '', // UI标签名称
			name : 'auditCom', // 作为form提交时传送的参数名
			allowBlank : true, // 是否允许为空
			emptyText : '---请选择---', // 没有默认值时,显示的字符串
			typeAhead : true,
			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
			forceSelection : true,
			editable : false,
			mode : 'local', // 数据模式, local为本地模式, 如果不设置,就显示不停的加载中...
			anchor : '90%',
			store : auditStatusStore,
			value : '全部', // 设置当前选中的值, 也可用作初始化时的默认值, 默认为空
			valueField : 'text', // 下拉框具体的值（例如值为Y，则显示的内容即为‘启用’）
			displayField : 'value', // 下拉框显示内容
			regex : /[\u4e00-\u9fa5]/, // 只能输入中文.
			regexText : "只能输入中文!" // 使用正则表达式时,设置的错误提示
		});

		// 查询条件
		var queryFormItems = [
		{
			layout : 'column',
			labelAlign : 'right',
			items : [
			{
				columnWidth : .2,
				layout : 'form',
				items : [
				{
					xtype : 'textfield',
					fieldLabel : '服务名称',
					allowBlank : true,
					maxLength : 30,
					name : 'name',
					anchor : '100%'
				}]
			},
			{
				columnWidth : .2,
				layout : 'form',
				items : [
				{
					xtype : 'textfield',
					fieldLabel : '服务协议',
					allowBlank : true,
					maxLength : 30,
					name : 'serviceType',
					anchor : '100%'
				}]
			},
			{
				columnWidth : .3,
				layout : 'form',
				items : [
				{
					fieldLabel : '服务状况',
					layout : 'column',
					items : [
					{
						items : [ServiceStatusCombox]
					}]
				}]
			},
			{
				columnWidth : .3,
				layout : 'form',
				items : [
				{
					fieldLabel : '审批状况',
					layout : 'column',
					items : [
					{
						items : [auditStatusCombox]
					}]
				}]
			}]
		}];



		/** *****以下为注册各页面组件方法******************************* */
		// 提示标签提示的内容;
		setTip("申请服务模块.");
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
		setPaging(resultTable);
		// 利用setMainPanel(renderId,component);渲染整个fram面板，传入渲染到div的ID值和一个组件（此组件可以为EXT的任意组件，例如一个表格组件或者包括多个表格的panel组件）
		setMainPanel("service_div_1", resultTable);	


		/** *************************功能集合********************** */
		// 页面初始化事件
		resultTable.addListener('onload', function()
		{

		});

		// 查询功能
		function queryFunc()
		{
			resultStore.baseParams = queryForm.getForm().getValues();
			Ext.apply(resultStore.baseParams,
			{
				start : 0,
				limit : pageSize
			});
			resultStore.load(
			{
				params : resultStore.baseParams
			});
		}
		
		function createServiceApplyInfoForm()
		{
			var serviceApplyInfoForm = new Ext.FormPanel(
					{
						labelSeparator : "：",
						frame : false,
						id : "serviceApplyInfoForm",
						width : 360,
						border : false,
						buttonAlign : 'center',
						autoHeight : true,
						items : [
						        {
									    xtype : 'textfield',
										hidden : true,
										hideLabel : true,
										name : "SERVICEID",
										id : "SERVICEID"
						        },
								{
									xtype : 'textfield',
									width : 330,
									allowBlank : false,
									blankText : '名称',
									name : 'SERVICENAME',
									readOnly : true,
									height : 40,
									fieldLabel : '服务名称'
								},
								{
									xtype : 'textfield',
									width : 330,
									allowBlank : false,
									blankText : '申请人',
									name : 'APPLYNAME',
									id : 'APPLYNAME',
									readOnly : true,
									height : 40,
									fieldLabel : '申请人'
								},
								{
									xtype : 'textfield',
									width : 330,
									allowBlank : false,
									blankText : '申请机构',
									name : 'APPLYORG',
									id : 'APPLYORG',
									readOnly : true,
									height : 40,
									fieldLabel : '申请机构'
								},
								{
									xtype : 'textfield',
									width : 330,
									allowBlank : false,
									name : 'PHONENUMBER',
									id : 'PHONENUMBER',
									height : 40,
									fieldLabel : '联系电话'
								},
								{
									xtype : 'textarea',
									name : 'APPLYUSE',
									allowBlank : false,
									width : 330,
									height : 140,
									fieldLabel : '申请用途'
								} ],
						buttons : [
								{
									text : '重置',
									iconCls : 'icon_reset',
									handler : function()
									{
										serviceApplyInfoForm.form.reset();
									}
								},
								{
									text : '提交',
									iconCls : 'icon_save',
									handler : function()
									{
										submitForm(serviceApplyInfoForm, applyUrl,
												"服务申请失败", callbak);
									}
								} ]
					});
			return serviceApplyInfoForm;
		}
		
		function callbak()
		{
			var win=Ext.getCmp("serviceApplyInfoWin");
			win.close();
			recordIds = [];
			recordObjs = [];			
			resultStore.reload();
		}
		
		function serviceApply() {
			var records = recordObjs; // 针对所有选中数据,包括分页的
			if (records.length == 0)
			{
				Ext.Msg.alert('提示信息','请选择数据!');
				return;
			} else if(records.length > 1){
				Ext.Msg.alert('提示信息','请选择一行数据!');
				return;
			} else {
				var serviceApplyInfoWin = new Ext.Window(
				{
					layout : 'fit',
					id : 'serviceApplyInfoWin',
					closeAction : 'close',
					resizable : false,
					width : 500,
					height :350,
					shadow : true,
					title : '服务申请',
					modal : true,
					closable : true,
					bodyStyle : 'padding:5 5 5 5',
					animCollapse : true,
					items:[createServiceApplyInfoForm()]
				});
				var record = records[0];
				Ext.getCmp('serviceApplyInfoWin').show().center();
				Ext.getCmp('APPLYNAME').setValue(sessionUserName);
				Ext.getCmp('APPLYORG').setValue(sessionOrgName);
				Ext.getCmp('PHONENUMBER').setValue(sessionPhoneNumber);
				Ext.getCmp('serviceApplyInfoForm').getForm().loadRecord(record);
				Ext.getCmp('serviceApplyInfoForm').doLayout(true); // 重新调整版面布局
			}
		}

		// 申请操作
		function applyFunc(operator)
		{
			// var records = sm.getSelections(); // 针对本页选中数据
			var records = recordObjs; // 针对所有选中数据,包括分页的
			if (records.length == 0)
			{
				alert('请选择数据!');
				return;
			} else
			{
				var jsonStr = [];
				var jsonStrName = [];
				var flag = 1;

				for ( var i = 0; i < records.length; i++)
				{
					var rec = records[i];
					var serviceStatus = rec.get('SERVICESTATUS');
					alert(serviceStatus);
					var auditStatus = rec.get('AUDITSTATUS');
					alert(auditStatus);
					if (serviceStatus == 'N' || auditStatus != '')
					{
						flag = 0;
						i = records.length;
					} else
					{
						jsonStr.push(rec.get('SERVICEID'));
						jsonStrName.push(rec.get('SERVICENAME'));
					}
				}

				if (flag == 1)
				{
					Ext.Msg.confirm("提示", "确定要操作吗？", function(btn, text)
					{
						if (btn == "yes")
						{
							Ext.Ajax.request(
							{
								// 发送请求
								url : applyUrl,
								method : 'POST',
								params :
								{
									jsonData : Ext.util.JSON.encode(jsonStr),
									jsonDataName : Ext.util.JSON.encode(jsonStrName),
									operState : operator
								},
								success : function(response, opts)
								{
									var result = Ext.util.JSON.decode(response.responseText);
									recordIds = [];
									recordObjs = [];
									if (!result.success)
									{
										alert(result.msg);
										return;
									} else
									{
										resultStore.reload();
									}
								},
								failure : function(response, opts)
								{
									Ext.MessageBox.show(
									{
										title : '错误',
										msg : '操作失败，请重新尝试，或联系管理员。',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});
						}
					});
				} else
				{
					alert('所选数据包含不可调用的服务!');
					return;
				}
			}
		}
	});
