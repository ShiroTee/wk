// 参数
var diskInfoPanel;
// 各种链接
var detailUrl = 'getHostDetail';
var hostInfoList;
var cpuInfoList;
var diskInfoList;
var ramInfoList;
var dataBaseInfoList;
var hostRuleInfocpulist;
var hostRuleInfodisclist;
var hostRuleInforamlist;
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
	
	// 解决日期控件在IE浏览器下面上下显示不全的BUG
		Ext.override(Ext.menu.Menu,
	{
		autoHeight : function()
		{
			this.height += "px";
		}
	});
	// 初始化页面的时候时候会执行store_load方法，查询数据
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';

	// 页面参数
	var id = document.getElementById("id").value;
	var type = document.getElementById("type").value;

	// 从后台查询详细信息
	var msgTip = Ext.MessageBox.show(
	{
		title : '提示',
		width : 250,
		msg : '正在读取信息请稍后......'
	});
	Ext.Ajax.request(
	{
		url : detailUrl,
		method : 'POST',
		params :
		{
			id : id
		},
		success : function(response, options)
		{
			msgTip.hide();
			var result = Ext.util.JSON.decode(response.responseText);
			if (result.success)
			{
				hostInfoList = result.data.hostInfoList;

				cpuInfoList = result.data.cpuInfoList;

				diskInfoList = result.data.diskInfoList;

				ramInfoList = result.data.ramInfoList;
				
				hostRuleInfocpulist = result.data.hostRuleInfocpulist;
				hostRuleInfodisclist = result.data.hostRuleInfodisclist;
				hostRuleInforamlist = result.data.hostRuleInforamlist;

				dataBaseInfoList = Ext.encode(result.data.dataBaseInfoList);
				if (hostInfoList.length != 0)
				{
					// hostInfoList = hostInfoList.substring(1, hostInfoList.length - 1);
					// hostInfoList = eval("(" + hostInfoList + ")");
					hostInfoList = hostInfoList[0];
					setHostInfo();
				}
				if (cpuInfoList.length != 0)
				{
					// cpuInfoList = cpuInfoList.substring(1, cpuInfoList.length - 1);
					// cpuInfoList = eval("(" + cpuInfoList + ")");
					cpuInfoList = cpuInfoList[0];
					// alert(cpuInfoList);
					setCpuInfo();
				}
				if(hostRuleInfocpulist.length != 0){
					hostRuleInfocpulist = hostRuleInfocpulist[0];
					setCpuRule();			
				}
				
				if(hostRuleInfodisclist.length != 0){
				hostRuleInfodisclist = hostRuleInfodisclist[0];
				setDiscRule();			
				}
				
				if(hostRuleInforamlist.length != 0){
					hostRuleInforamlist = hostRuleInforamlist[0];
					setRamRule();			
				}
				if (diskInfoList.length != 0)
				{
					/**
					 * diskInfoList = diskInfoList.substring(1, diskInfoList.length - 1);
					 * diskInfoList = eval("(" + diskInfoList + ")");
					 */
					setDiskInfo();
				} else
				{
					Ext.getCmp('diskInfo').body.update("<span style='color: red; font-family: '幼圆'; font-size: 14;'>未扫描到相关数据！</span>");
				}
				if (ramInfoList.length != 0 && ramInfoList != 'null')
				{

					// ramInfoList = ramInfoList.substring(1, ramInfoList.length - 1);

					// ramInfoList = eval("(" + ramInfoList + ")");
					ramInfoList = ramInfoList[0]
					setRamInfo();
				}
				if (dataBaseInfoList.length != 0 && dataBaseInfoList != 'null')
				{
					// dataBaseInfoList = dataBaseInfoList.substring(1, dataBaseInfoList.length -
					// 1);
					// dataBaseInfoList = eval("(" + dataBaseInfoList + ")");
					dataBaseInfoList = dataBaseInfoList[0];
					// setDataBaseInfo();
				}

			} else
			{
				Ext.Msg.alert('提示', "异常码：" + result.msg);
			}
		},
		failure : function(response, options)
		{
			var result = Ext.util.JSON.decode(response.responseText);
			msgTip.hide();
			Ext.Msg.alert('提示', "异常码：" + result.data);
		}
	});

	// 设置主机信息
	function setHostInfo()
	{
		if (hostInfoList.name != '')
		{
			var infoPanel = Ext.getCmp("infoPanel");
			infoPanel.setTitle(hostInfoList.name + '--详细信息');
		}
		Ext.getCmp('hostname').setValue(hostInfoList.name);
		Ext.getCmp('type').setValue(hostInfoList.type);
		Ext.getCmp('sysDesc').setValue(hostInfoList.sysDesc);
		Ext.getCmp('ipAddress').setValue(hostInfoList.ipAddress);
		Ext.getCmp('netStatus').setValue(hostInfoList.netStatus == 'Y' ? '正常' : '异常');
		Ext.getCmp('warningStatus').setValue(hostInfoList.warningStatus == 'Y' ? '异常' : '正常');
	}
	// 设置CPU信息
	function setCpuInfo()
	{
		Ext.getCmp('cpuUsage').setValue(cpuInfoList.cpuUsage + '%');
		Ext.getCmp('cpuCollectDate').setValue(formatDate(cpuInfoList.collectDate));
		Ext.getCmp('cpuWarningStatus').setValue(cpuInfoList.warningStatus == 'Y' ? '异常' : '正常');
		Ext.getCmp('cpuErrorMsg').setValue(cpuInfoList.errorMsg);
	}
	//设计cpu规则
	function setCpuRule()
	{
		Ext.getCmp('cpuid').setValue(hostRuleInfocpulist.RULENAME);
		Ext.getCmp('cputypeid').setValue(hostRuleInfocpulist.RULETYPE);
		Ext.getCmp('cpuStatusid').setValue(hostRuleInfocpulist.STATUS =='Y' ? '启用':'启用');
		Ext.getCmp('cputhreshold').setValue(hostRuleInfocpulist.THRESHOLD);
		Ext.getCmp('cpudateid').setValue(formatDate(hostRuleInfocpulist.ADDTIME));
		Ext.getCmp('cpumemo').setValue(hostRuleInfocpulist.MEMO);
	}
	//设计磁盘规则
	function setDiscRule()
	{
		Ext.getCmp('discid').setValue(hostRuleInfodisclist.RULENAME);
		Ext.getCmp('disctypeid').setValue(hostRuleInfodisclist.RULETYPE);
		Ext.getCmp('discStatus').setValue(hostRuleInfodisclist.STATUS =='Y' ? '启用':'启用');
		Ext.getCmp('discthreshold').setValue(hostRuleInfodisclist.THRESHOLD);
		Ext.getCmp('discdateid').setValue(formatDate(hostRuleInfodisclist.ADDTIME));
		Ext.getCmp('discmemo').setValue(hostRuleInfodisclist.MEMO);
	}
	
	//设计内存规则
	function setRamRule()
	{
		Ext.getCmp('ramrulename').setValue(hostRuleInforamlist.RULENAME);
		Ext.getCmp('ramruletype').setValue(hostRuleInforamlist.RULETYPE);
		Ext.getCmp('ramStatus').setValue(hostRuleInforamlist.STATUS =='Y' ? '启动':'启用');
		Ext.getCmp('ramthreshold').setValue(hostRuleInforamlist.THRESHOLD);
		Ext.getCmp('ramtdate').setValue(formatDate(hostRuleInforamlist.ADDTIME));
		Ext.getCmp('rammemo').setValue(hostRuleInforamlist.MEMO);
	}
	// 设置内存信息
	function setRamInfo()
	{
		Ext.getCmp('ramSize').setValue(ramInfoList.size + "G");
		Ext.getCmp('ramUseSize').setValue(ramInfoList.useSize + "G");
		if (ramInfoList.usage != '')
		{
			Ext.getCmp('ramUsage').setValue(parseFloat(ramInfoList.usage * 100).toFixed(3) + '%');
		}
		Ext.getCmp('ramCollectDate').setValue(formatDate(ramInfoList.collectDate));
		Ext.getCmp('ramWarningStatus').setValue(ramInfoList.warningStatus == 'Y' ? '异常' : '正常');
		Ext.getCmp('ramErrorMsg').setValue(ramInfoList.errorMsg);
	}
	// 设置磁盘信息--动态生成
	function setDiskInfo()
	{
		for ( var i = 0; i < diskInfoList.length; i++)
		{
			var list = diskInfoList[i];
			getStr('diskName' + i, '名称', list.name);
			getStr('diskSize' + i, '总大小', list.size + "G");
			getStr('diskUseSize' + i, '已使用大小', list.useSize + "G");
			if (list.useage != '')
			{
				getStr('diskUseage' + i, '使用率', parseFloat(list.useage * 100).toFixed(3) + '%');
			}
		}
	}

// 判断显示状态
	function DISCSTATUS(value, metadata, record, rowIndex, colIndex, store)
	{
		var result;
		var ystatus;
		if (record.get('discStatus') == 'Y')
		{
			result = "启用";
		}
		if (record.get('discStatus') == 'N')
		{
			result = "停用";

		}
		return ystatus;
	}
	
	function RAMSTATUS(value, metadata, record, rowIndex, colIndex, store)
	{
		var result;
		var ystatus;
		if (record.get('ramStatus') == 'Y')
		{
			result = "启用";
		}
		alert(result);
		if (record.get('ramStatus') == 'N')
		{
			result = "停用";

		}
		return ystatus;
	}
	
	
	function 	CPUSTATUS(value, metadata, record, rowIndex, colIndex, store)
	{
		var result;
		var ystatus;
		if (record.get('cpuStatusid') == 'Y')
		{
			result = "启用";
		}
		if (record.get('cpuStatusid') == 'N')
		{
			result = "停用";

		}
		return ystatus;
	}

	// 磁盘-----动态增加组件
	function getStr(idStr, fieldName, valueStr)
	{
		var diskItem =
		{
			columnWidth : .25,
			layout : 'form',
			border : false,
			items :
			[
				{
					xtype : 'textfield',
					fieldLabel : fieldName,
					id : idStr,
					readOnly : true, // 只读
					selectOnFocus : true, // 点击即选中
					anchor : '95%',
					value : valueStr
				}
			]
		};

		Ext.getCmp('diskInfo').add(diskItem);
	}

	// 设置数据库信息
	function setDataBaseInfo()
	{
		Ext.getCmp('dataBaseMaxCollection').setValue(dataBaseInfoList.maxCollection);
		Ext.getCmp('dataBaseCurrentCollection').setValue(dataBaseInfoList.currentCollection);
		Ext.getCmp('dataBaseCollectDate').setValue(formatDate(dataBaseInfoList.collectDate));
		Ext.getCmp('dataBaseWarningStatus').setValue(dataBaseInfoList.warningStatus == 'Y' ? '异常' : '正常');
		Ext.getCmp('dataBaseErrorMsg').setValue(dataBaseInfoList.errorMsg);
	}

	// 组件数组
	var formItems =
	[
			{
				layout : 'column',
				border : false,
				labelAlign : 'top',
				items :
				[
						{
							columnWidth : .3,
							layout : 'form',
							border : false,
							items :
							[
									{
										xtype : 'textfield',
										fieldLabel : '主机名称',
										id : 'hostname',
										readOnly : true, // 只读
										selectOnFocus : true, // 点击即选中
										anchor : '95%'
									},
									{
										xtype : 'textfield',
										fieldLabel : '系统类型',
										id : 'type',
										readOnly : true, // 只读
										selectOnFocus : true, // 点击即选中
										anchor : '95%'
									}
							]
						},
						{
							columnWidth : .3,
							layout : 'form',
							border : false,
							items :
							[
									{
										xtype : 'textfield',
										fieldLabel : 'IP地址',
										id : 'ipAddress',
										readOnly : true, // 只读
										selectOnFocus : true, // 点击即选中
										anchor : '95%'
									},
									{
										xtype : 'textfield',
										fieldLabel : '网络状况',
										id : 'netStatus',
										readOnly : true, // 只读
										selectOnFocus : true, // 点击即选中
										anchor : '95%'
									}
							]
						},
						{
							columnWidth : .3,
							layout : 'form',
							border : false,
							items :
							[
									{
										xtype : 'textfield',
										fieldLabel : '系统描述',
										id : 'sysDesc',
										readOnly : true, // 只读
										selectOnFocus : true, // 点击即选中
										anchor : '95%'
									},
									{
										xtype : 'textfield',
										fieldLabel : '告警状况',
										id : 'warningStatus',
										readOnly : true, // 只读
										selectOnFocus : true, // 点击即选中
										anchor : '95%'
									}
							]
						}
				]
			},
			{
				xtype : 'tabpanel',
				id : 'infoTabPanel',
				name : 'infoTabPanel',
				plain : true,
				activeTab : 0,
				height : 350,
				border : false,
				deferredRender : false,
				labelAlign : 'left',
				defaults :
				{
					bodyStyle : 'padding:10px'
				},
				items :
				[
						{
							title : 'CPU信息',
							layout : 'form',
							defaults :
							{
								width : 230
							},
							defaultType : 'textfield',
							items :
							[
									{
										fieldLabel : 'CPU使用率',
										id : 'cpuUsage',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '采集时间',
										id : 'cpuCollectDate',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '告警状况',
										id : 'cpuWarningStatus',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										xtype : 'textarea',
										fieldLabel : '告警消息',
										id : 'cpuErrorMsg',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									}
							]
						},
						{
							title : '内存信息',
							layout : 'form',
							defaults :
							{
								width : 230
							},
							defaultType : 'textfield',
							items :
							[
									{
										fieldLabel : '总大小',
										id : 'ramSize',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '已使用大小',
										id : 'ramUseSize',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '使用率',
										id : 'ramUsage',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '采集时间',
										id : 'ramCollectDate',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '告警状况',
										id : 'ramWarningStatus',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '告警消息',
										id : 'ramErrorMsg',
										xtype : 'textarea',
										readOnly : true, // 只读
										height : 120,
										selectOnFocus : true
									}
							]
						},
						{
							title : '磁盘信息',
							layout : 'column',
							id : 'diskInfo',
							name : 'diskInfo',
							labelWidth : 70,
							labelAlign : 'right',
							border : false,
							items : [],
							html : ''
						},
						{
							title : 'CPU预警规则',
							layout : 'form',
							defaults :
							{
								width : 230
							},
							defaultType : 'textfield',
							items :
							[
									{
										fieldLabel : 'CPU规则名称',
										id : 'cpuid',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : 'CPU规则类型',
										id : 'cputypeid',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '启用状态',
										id : 'cpuStatusid',
										readOnly : true, // 只读
										renderer : CPUSTATUS,
										selectOnFocus : true
									},
									{
									//	xtype : 'textarea',
										fieldLabel : '阀值',
										id : 'cputhreshold',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									},
									{
									//	xtype : 'textarea',
										fieldLabel : '添加时间',
										id : 'cpudateid',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									},
									{
									//	xtype : 'textarea',
										fieldLabel : '备注',
										id : 'cpumemo',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									}
							]
						},
						{
							title : '磁盘预警规则',
							layout : 'form',
							defaults :
							{
								width : 230
							},
							defaultType : 'textfield',
							items :
							[
									{
										fieldLabel : '磁盘规则名称',
										id : 'discid',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '磁盘规则类型',
										id : 'disctypeid',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '启用状态',
										id : 'discStatus',
										readOnly : true, // 只读
										renderer : DISCSTATUS,
										selectOnFocus : true
									},
									{
										//xtype : 'textarea',
										fieldLabel : '阀值',
										id : 'discthreshold',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									},
									{
										//xtype : 'textarea',
										fieldLabel : '添加时间',
										id : 'discdateid',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									},
									{
									//	xtype : 'textarea',
										fieldLabel : '备注',
										id : 'discmemo',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									}
							]
						},
						{
							title : '内存预警规则',
							layout : 'form',
							defaults :
							{
								width : 230
							},
							defaultType : 'textfield',
							items :
							[
									{
										fieldLabel : '内存规则名称',
										id : 'ramrulename',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '内存规则类型',
										id : 'ramruletype',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '启用状态',
										id : 'ramStatus',
										readOnly : true, // 只读
										renderer : RAMSTATUS,
										selectOnFocus : true
									},
									{
										//xtype : 'textarea',
										fieldLabel : '阀值',
										id : 'ramthreshold',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									},
									{
									//	xtype : 'textarea',
										fieldLabel : '添加时间',
										id : 'ramtdate',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									},
									{
									//	xtype : 'textarea',
										fieldLabel : '备注',
										id : 'rammemo',
										readOnly : true, // 只读
										height : 180,
										selectOnFocus : true
									}
							]
						},
						{
							title : '数据库信息',
							layout : 'form',
							id : 'dataBaseTab',
							name : 'dataBaseTab',
							defaults :
							{
								width : 230
							},
							defaultType : 'textfield',
							items :
							[
									{
										fieldLabel : '最大连接数',
										id : 'dataBaseMaxCollection',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '最小连接数',
										id : 'dataBaseCurrentCollection',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '采集时间',
										id : 'dataBaseCollectDate',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '告警状况',
										id : 'dataBaseWarningStatus',
										readOnly : true, // 只读
										selectOnFocus : true
									},
									{
										fieldLabel : '告警消息',
										xtype : 'textarea',
										id : 'dataBaseErrorMsg',
										readOnly : true, // 只读
										height : 150,
										selectOnFocus : true
									}
							]
						}
				],
				listeners :
				{
					'tabchange' : function()
					{

					}
				}
			}
	];

	// 展示面板
	var infoPanel = new Ext.FormPanel(
	{
		title : '主机详细信息',
		bodyStyle : 'padding: 5px',
		id : "infoPanel",
		collapsible : false,
		buttonAlign : 'center',
		applyTo : "div_body_1_2",
		items :
		[
			formItems
		],
		buttons :
		[
			{
				text : '返回',
				iconCls : 'icon_back',
				handler : function()
				{
					window.location ="/app/http/dms/hostMonitorHandler/page";
				}
			}
		]
	});

	/** *************************功能集合********************** */

	// js获取url参数值 正则表达式法
	function getQueryString(name)
	{
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
		{
			return unescape(r[2]);
		}
		return null;
	}

	// 格式化日期----时间戳
	function formatDate(now)
	{
		Date.prototype.format = function(format)
		{
			var o =
			{
				"M+" : this.getMonth() + 1, // month
				"d+" : this.getDate(), // day
				"h+" : this.getHours(), // hour
				"m+" : this.getMinutes(), // minute
				"s+" : this.getSeconds(), // second
				"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
				"S" : this.getMilliseconds()
			}

			if (/(y+)/.test(format))
			{
				format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			}

			for ( var k in o)
			{
				if (new RegExp("(" + k + ")").test(format))
				{
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;
		}

		var retDate = new Date(now);// 这里必须是整数，毫秒
		var retStr = retDate.format("yyyy-MM-dd hh:mm:ss");

		return retStr;
	}

});
