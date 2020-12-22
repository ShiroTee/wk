// 各种链接
//添加主机
//var addUrl = 'addHostInfo';
var addUrl = 'addHost';
//添加cpu规则
var addCpuRuleUrl = 'getRamInfoCPUList';
//添加磁盘规则
var addDiscRuleUrl = 'getRamInfoDISCList';
//添加内存规则
var addRamRuleUrl = 'getRamInfoRAMList';
var addDiskUrl = 'getDiskList';
var screenHeight = getScreen_height() - 40;// 获取屏幕尺寸
var tipPanel;
Ext.onReady(function()
{
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	tipPanel = setTip('提示：对服务器的各种监控项进行配置;配置之前，需将所要配置的服务器的SNMP协议启动。');

	var addFormPanel = new Ext.FormPanel(
		{
			layout : 'form',
			collapsible : false,
			id : 'addFormPanel',
			// width : '100%',
			// height : '100%',
			// autoWidth : true,
			// autoHeight : true,
			height : screenHeight,
			autoScroll : false,
			frame : true,
			// applyTo : 'div_body',
			//title : '<center style="curor:hand">服务器监控项配置</center>',
			labelStyle : 'vertical-align: middle;',
			// 设置标签对齐方式
			labelAlign : 'right',
			// 设置标签宽
			labelWidth : 400,
			// 设置按钮的对齐方式
			buttonAlign : 'center',
			// 默认元素属性设置
			defaults :
				{
					width : 300,
					//height : 30
				},
			items :
				[
					{},
					{
						fieldLabel : '主机名称',
						id  : 'NAME',
						name : 'NAME',
						xtype : 'textfield',
						//unitText : 'aa',
						allowBlank : false,
						readOnly : false,
						emptyText : '180服务器'
//					 listeners : {
//            		'render' : function(){
//                 //textfield后加单位方法：
//                 var _parentNode = Ext.getDom('NAME').parentNode;
//                  Ext.get(_parentNode).createChild({
//                     tag : 'span',
//                     html : '<font color=black>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如. 180服务器</font>'
//                  });
//
//                 var unit_1 = '';
//
//                   Ext.DomHelper.insertHtml('afterEnd', Ext.get('NAME').dom, unit_1);
//            }
//        }

					},
					{
						fieldLabel : '系统类型',
						id : 'TYPE',
						name : 'TYPE',
						xtype : 'combo',
						// 本地数据源 local/remote
						mode : 'local',
						// 设置为选项的text的字段
						displayField : "Name",
						// 设置为选项的value的字段
						valueField : "Id",
						// 是否可以输入，还是只能选择下拉框中的选项
						editable : false,
						typeAhead : true,
						value : 1,
						// 必须选择一项
						// forceSelection: true,
						// 输入部分选项内容匹配的时候显示所有的选项
						triggerAction : 'all',
						// selectOnFocus:true,
						// 数据
						store : new Ext.data.SimpleStore(
							{
								fields :
									[
										'Id', 'Name'
									],
								data :
									[
										[
											1, 'Windows'
										],
										[
											2, 'Linux'
										]
									]
							}),
						listeners :
							{
								select : function(combo, record, index)
								{
									var type = combo.getValue();
									if (type != '')
									{
										/** showDataBaseInfo(type);* */
									}
								}
							}
					},
					{
						fieldLabel : '服务器IP',
						id : 'IPADDRESS',
						name : 'IPADDRESS',
						xtype : 'textfield',
						allowBlank : false,
						readOnly : false,
						regex : /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
						regexText : '只能输入IP地址',
						emptyText : '**.**.**.***'
					},
					{
						fieldLabel : '监控端口',
						id : 'HOSTPORT',
						name : 'HOSTPORT',
						allowBlank : false,
						xtype : 'numberfield',
						readOnly : false,
						value : '161',
						maxValue : 65535, // 最大值
						minValue : 1,
						listeners : {
							render : function (field, p) {
								Ext.QuickTips.init();
								Ext.QuickTips.register({
									target: field.el,
									text : '简单网络管理协议(SNMP)端口: 161',
									title : '端口',
									width: 250,
									trackMouse: true
								})
							}
						}
					},
					{
						fieldLabel : '监控频率',
						id : 'FREQUENCY',
						name : 'FREQUENCY',
						allowBlank : false,
						xtype : 'numberfield',
						readOnly : false,
						//emptyText : '10',
						listeners : {
//            		'render' : function(){
//                 //textfield后加单位方法：
//                 var _parentNode = Ext.getDom('FREQUENCY').parentNode;
//                  Ext.get(_parentNode).createChild({
//                     tag : 'span',
//                     html : '<font color=black>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分钟(min)&nbsp;</font>'
//                  });
//                 var unit_2 = '';
//                   Ext.DomHelper.insertHtml('afterEnd', Ext.get('FREQUENCY').dom, unit_2);
//                   },
							render : function (field, p) {
								Ext.QuickTips.init();
								Ext.QuickTips.register({
									target: field.el,
									text : '监控频率(单位): 10分(min)',
									title : '频率',
									width: 250,
									trackMouse: true
								})
							}
						}
					},
					{
						xtype : 'combo',
						fieldLabel : 'CPU规则',
						id : "RATES",
						width : 300,
						allowBlank : true,
						blankText : 'CPU使用率',
						emptyText : 'CPU使用率',
						mode : 'local',
						hiddenName : 'vALUE',
						name: 'TEXT',
						store : new Ext.data.JsonStore(
							{
								url : addCpuRuleUrl,
								//root : 'data',
								fields : new Ext.data.Record.create( [
									'vALUE', 'tEXT' ])
							}),
						triggerAction : 'all',
						displayField : 'tEXT',// 定义要显示的字段
						valueField : 'vALUE',// 定义值字段
						forceSelection : true,// 要求输入值必须在列表中存在
						resizable : true,// 允许改变下拉列表的大小
						typeAhead : true,// 允许自动选择匹配的剩余部分文本
						handleHeight : 10
					},
					{
						xtype : 'combo',
						fieldLabel : '磁盘规则',
						id : "DISCS",
						width : 300,
						allowBlank : true,
						blankText : '磁盘剩余大小',
						emptyText : '磁盘剩余大小',
						mode : 'local',
						hiddenName : 'dISCID',
						name: 'DISC',
						listeners:{
							select : function(serviceInterfaceCombox, record, index){
								showDisc();
							}
						},
						store : new Ext.data.JsonStore(
							{
								url : addDiscRuleUrl,
								//root : 'data',
								fields : new Ext.data.Record.create( [
									'dISCID', 'dISC' ])
							}),
						triggerAction : 'all',
						displayField : 'dISC',// 定义要显示的字段
						valueField : 'dISCID',// 定义值字段
						forceSelection : true,// 要求输入值必须在列表中存在
						resizable : true,// 允许改变下拉列表的大小
						typeAhead : true,// 允许自动选择匹配的剩余部分文本
						handleHeight : 10
					},
					{
						xtype : 'combo',
						fieldLabel : '内存规则',
						id : "RAMS",
						width : 300,
						allowBlank : true,
						blankText : '内存使用率',
						emptyText : '内存使用率',
						mode : 'local',
						hiddenName : 'rAMID',
						name: 'RAM',
						store : new Ext.data.JsonStore(
							{
								url : addRamRuleUrl,
								//root : 'data',
								fields : new Ext.data.Record.create( [
									'rAMID', 'rAM' ])
							}),
						triggerAction : 'all',
						displayField : 'rAM',// 定义要显示的字段
						valueField : 'rAMID',// 定义值字段
						forceSelection : true,// 要求输入值必须在列表中存在
						resizable : true,// 允许改变下拉列表的大小
						typeAhead : true,// 允许自动选择匹配的剩余部分文本
						handleHeight : 10
					},
					{
						xtype : 'fieldset',
						fieldLabel : '数据库信息',
						title : '数据库信息',
						id : 'dataBaseInfo',
						name : 'dataBaseInfo',
						collapsible : true,
						checkboxToggle : true,
						autoHeight : true,
						disabled : false,
						defaults :
							{
								width : 200,
								//height : 30
							},
						defaultType : 'textfield',
						labelAlign : 'left',
						labelWidth : 70,
						items :
							[
								{
									fieldLabel : '数据库名称',
									name : 'DATABASENAME',
									id : 'DATABASENAME',
									readOnly : false
								},
								{
									fieldLabel : '用户名',
									id : 'USER',
									name : 'USER',
									xtype : 'textfield',
									readOnly : false
								},
								{
									fieldLabel : '密码',
									id : 'PASSWORD',
									name : 'PASSWORD',
									inputType : 'password',
									xtype : 'textfield',
									readOnly : false
								},
								{
									fieldLabel : '数据库端口',
									id : 'DATABASEPORT',
									name : 'DATABASEPORT',
									xtype : 'numberfield',
									readOnly : false,
									value : '1521',
									maxValue : 65535, // 最大值
									minValue : 1
								}
							]
					}

				],
			buttons :
				[
					{
						text : "添加",
						iconCls : 'icon_add',
						handler : function()
						{
							submitForm(Ext.getCmp('addFormPanel'), addUrl, "信息有误！", function()
							{
								alert('添加成功！');
								Ext.getCmp('addFormPanel').form.reset();
							});
						}
					},
					{
						text : "重置",
						iconCls : 'icon_reset',
						handler : function()
						{
							Ext.getCmp('addFormPanel').form.reset();
						}
					}
				]
		});


	function addDisc() {
		//alert(Ext.getCmp("IPADDRESS").getValue());
		var combox =new Ext.form.ComboBox({
			fieldLabel : '请选择磁盘',
			id : "combox_1",
			width : 300,
			allowBlank : true,
			blankText : '磁盘',
			emptyText : '全部',
			mode : 'remote',
			hiddenName : 'daikName',
			name: 'daikName',
			store : new Ext.data.JsonStore(
				{
					url : addDiskUrl+"?ipAddress="+Ext.getCmp("IPADDRESS").getValue(),
					//root : 'data',
					fields : new Ext.data.Record.create( [
						'diskid', 'daikName' ])
				}),
			triggerAction : 'all',
			displayField : 'daikName',// 定义要显示的字段
			valueField : 'diskid',// 定义值字段
			forceSelection : true,// 要求输入值必须在列表中存在
			resizable : true,// 允许改变下拉列表的大小
			typeAhead : true,// 允许自动选择匹配的剩余部分文本
			handleHeight : 10

		});
		var disclist = new Ext.Window(
			{
				layout : 'fit',
				id : 'disclist',
				closeAction : 'close',
				resizable : false,
				width : 400,
				height :100,
				shadow : true,
				title : '添加磁盘',
				modal : true,
				closable : true,
				bodyStyle : 'padding:5 5 5 5',
				animCollapse : true,
				items:[combox],
				buttons : [
					{
						text : '清除',
						handler : function()
						{

						}
					},
					{
						text : '提交',
						handler : function()
						{

						}
					} ]
			});
		disclist.show();
	}



	// 手动注册一个工具提示到指定的元素上
	Ext.QuickTips.register({
		target: "HOSTPORT",
		text : '简单网络管理协议(SNMP)端口: 161',
		title : '端口',
		width: 100,
		dismissDelay: 20,
		trackMouse: true
	});
	function showDisc(){
		var discid=Ext.getCmp('DISCS').getRawValue();
		if(discid.size!=0){
			addDisc();
		}
	}
	var combo = Ext.getCmp("RATES");

	combo.store.load(({}));

	var combo = Ext.getCmp("DISCS");
	combo.store.load(({}));

	var combo = Ext.getCmp("RAMS");
	combo.store.load(({}));

	//var combo = Ext.getCmp("diskInfo");
	//combo.store.load(({}));
	/** Ext.form.TextField的输入框后面加文字* */
	Ext.override(Ext.form.TextField,
		{
			unitText : '',
			onRender : function(ct, position)
			{
				Ext.form.TextField.superclass.onRender.call(this, ct, position);
				/** 如果单位字符串已定义 则在后方增加单位对象* */
				if (this.unitText != '')
				{
					this.unitEl = ct.createChild(
						{
							tag : 'div',
							html : this.unitText
						});
					this.unitEl.addClass('x-form-unit');
					/** 增加单位名称的同时 按单位名称大小减少文本框的长度 初步考虑了中英文混排 未考虑为负的情况* */
					this.width = this.width - (this.unitText.replace(/[^\x00-\xff]/g, 'xx').length * 6 + 2);
					/** 同时修改错误提示图标的位置* */
					this.alignErrorIcon = function()
					{
						this.errorIcon.alignTo(this.unitEl, 'tl-tr', [2, 0]);
					};
				}
			}
		});

	var mainPanel = new Ext.Panel(
		{
			frame : false,
			border : true,
			applyTo : 'div_body',
			bodyStyle : 'background-color: #DFE8F6;',
			items :
				[
					tipPanel, addFormPanel
				]
		});


	/** *************************功能集合********************** */
	// 初始化提示栏
	function setTip(tip)
	{
		var tipStr = "<div class='tipcontent'>" + tip + "</div>";
		var panel = new Ext.Panel(
			{
				id : 'closetip',
				border : false,
				height : 30,
				cls : 'notification information png_bg',
				html : tipStr
			});
		return panel;
	}

	/** 根据选择的项显示* */
	function showDataBaseInfo(msg)
	{
		if (msg == 3)
		{
			Ext.getCmp('dataBaseInfo').enable();
		} else
		{
			Ext.getCmp('DATABASENAME').setValue();
			Ext.getCmp('USER').setValue();
			Ext.getCmp('PASSWORD').setValue();
			Ext.getCmp('DATABASEPORT').setValue('1521');
			Ext.getCmp('dataBaseInfo').disable();
		}
	}

});