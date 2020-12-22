/**
 * 
 * 
 * 
 * 20110711 add by zhaohb时间控件关联验证
 * 20110711 add by zhaohb电话号码控件验证
 */
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

//类型判断
function typeOf(obj) {
	if (typeof (obj) == 'object') {
		if (obj.length)
			return 'array';
		else
			return 'object';
	}
	return typeof (obj);
};
//开启窗口
function openWindow(target) {

	var param = "toolbar:no;";
	param += "menubar:no;";
	param += "scrollbars:no;";
	param += "resizable:no;";
	param += "location:no;";
	param += "status:no;";
	param += "dialogHeight: 800px;";
	param += "dialogWidth: 900px;";
	param += "edge: Raised;";
	param += "center: Yes;";

	var v = window.showModalDialog(target, "newwin", param);
	//alert(v);
	return v;
};
//行号模型类
Ext.ns('Ext.my');
Ext.my.increment = 1;
Ext.my.RowNumberer = function(config) {
	// call parent
	Ext.my.RowNumberer.superclass.constructor.call(this, config);
	this.renderer = function(v, p, record, rowIndex) {
		if (this.rowspan) {
			p.cellAttr = 'rowspan="' + this.rowspan + '"';
		}
		return rowIndex + Ext.my.increment;
	}.createDelegate(this);
}; // end of constructor
Ext.extend(Ext.my.RowNumberer, Ext.grid.RowNumberer, {
	header : "序号",
	width : 40
});
Ext.reg('Ext.my.RowNumberer', Ext.my.RowNumberer);
//分页工具
Ext.my.PagingToolbar = function(config) {
	Ext.my.PagingToolbar.superclass.constructor.call(this, config);
	this.doLoad = function(start) {
		Ext.my.increment = start + 1;
		var o = {}, pn = this.getParams();
		o[pn.start] = start;
		o[pn.limit] = this.pageSize;
		if (this.fireEvent('beforechange', this, o) !== false) {
			this.store.load( {
				params : o
			});
		}
	}.createDelegate(this);
};
Ext.extend(Ext.my.PagingToolbar, Ext.PagingToolbar);
Ext.reg('Ext.my.PagingToolbar', Ext.my.PagingToolbar);
//带按钮文本框
Ext.ns('Ext.ux.form');
Ext.ux.form.textWithButton = Ext.extend(Ext.form.TriggerField, {
	initComponent : function() {
		this.readOnly = true;
		Ext.ux.form.textWithButton.superclass.initComponent.call(this);
	},
	validationEvent : false,
	validateOnBlur : false,
	triggerClass : 'x-form-date-trigger',
	// hideTrigger1:true,
	width : 180,
	// hasSearch : false,
	//myname:'',
	myvalue : '',
	myurl : '',
	isChose : '',
	afterSelect : function() {
	},
	onTriggerClick : function() {
		if (this.isChose == true) {
			var retval = openWindow(this.myurl);
		}
		if (typeOf(retval) == 'array' && retval.length > 1) {
			this.setValue(retval[0]);
			this.myvalue = retval[1];
			this.afterSelect();
		}
	}

});
//var sm =  new Ext.grid.CheckboxSelectionModel ({selectRow:function(index, keepExisting, preventViewNotify){
//       if(this.locked || (index < 0 || index >= this.grid.store.getCount())) return;
//        var r = this.grid.store.getAt(index);
//        if(r && this.fireEvent("beforerowselect", this, index, keepExisting, r) !== false){
//            this.selections.add(r);
//            this.last = this.lastActive = index;
//            if(!preventViewNotify){
//                this.grid.getView().onRowSelect(index);
//            }
//            this.fireEvent("rowselect", this, index, r);
//            this.fireEvent("selectionchange", this);
//        } }
//        });
//////////////////////////////////////
//增加一种错误提示类型
Ext.form.MessageTargets = {
	'custom' : {
		mark : function(field, msg) {

			if (field.allowBlank && field.getValue() == ''
					&& field.getRawValue() == '') {
				this.clear(field);
				field.clearInvalid();
				return;
			}
			field.el.addClass(field.invalidClass);
			if (!field.errorIcon) {
				var elp = field.getErrorCt();
				// field has no container el
				if (!elp) {
					field.el.dom.title = msg;
					return;
				}
				field.errorIcon = elp.createChild( {
					cls : 'x-form-invalid-icon'
				});
				if (field.ownerCt) {
					field.ownerCt
							.on('afterlayout', field.alignErrorIcon, field);
					field.ownerCt.on('expand', field.alignErrorIcon, field);
				}
				field.on('resize', field.alignErrorIcon, field);
				field.on('destroy', function() {
					Ext.destroy(this.errorIcon);
				}, field);
				field.el.on('click', function(e, o) {
					if (field.errorIcon.dom.qtip != '')
						field.errorIcon.tip.showBy(field.el);
					e.stopEvent();
					return false;
				}, field);
				field.el.on('mouseenter', function(e, o) {
					if (field.errorIcon.dom.qtip != '')
						field.errorIcon.tip.showBy(field.el);
					e.stopEvent();
					return false;
				}, field);

			}
			field.alignErrorIcon();
			field.errorIcon.dom.qtip = msg;
			field.errorIcon.dom.qclass = 'x-form-invalid-tip';
			field.errorIcon.show();
			if (field.errorIcon.tip) {
				field.errorIcon.tip.unregister(field.el);
				field.errorIcon.tip.destroy();
				Ext.destroy(field.errorIcon.tip);
			}
			field.errorIcon.tip = new Ext.QuickTip( {
				target : field.el,
				title : msg,
				anchor : 'top',
				trackMouse : true
			});
		},
		clear : function(field) {
			field.el.removeClass(field.invalidClass);
			if (field.errorIcon) {
				field.errorIcon.dom.qtip = '';
				field.errorIcon.hide();
				if (field.errorIcon.tip) {
					field.errorIcon.tip.unregister(field.el);
					field.errorIcon.tip.destroy();
					Ext.destroy(field.errorIcon.tip);
				}
			} else {
				field.el.dom.title = '';
			}

		}
	},
	'qtip' : {
		mark : function(field, msg) {
			field.el.addClass(field.invalidClass);
			field.el.dom.qtip = msg;
			field.el.dom.qclass = 'x-form-invalid-tip';
			if (Ext.QuickTips) { // fix for floating editors interacting with DND
			Ext.QuickTips.enable();
		}
	},
	clear : function(field) {
		field.el.removeClass(field.invalidClass);
		field.el.dom.qtip = '';
	}
	},
	'title' : {
		mark : function(field, msg) {
			field.el.addClass(field.invalidClass);
			field.el.dom.title = msg;
		},
		clear : function(field) {
			field.el.dom.title = '';
		}
	},
	'under' : {
		mark : function(field, msg) {
			field.el.addClass(field.invalidClass);
			if (!field.errorEl) {
				var elp = field.getErrorCt();
				if (!elp) { // field has no container el
			field.el.dom.title = msg;
			return;
		}
		field.errorEl = elp.createChild( {
			cls : 'x-form-invalid-msg'
		});
		field.on('resize', field.alignErrorEl, field);
		field.on('destroy', function() {
			Ext.destroy(this.errorEl);
		}, field);
	}
	field.alignErrorEl();
	field.errorEl.update(msg);
	Ext.form.Field.msgFx[field.msgFx].show(field.errorEl, field);
},
clear : function(field) {
	field.el.removeClass(field.invalidClass);
	if (field.errorEl) {
		Ext.form.Field.msgFx[field.msgFx].hide(field.errorEl, field);
	} else {
		field.el.dom.title = '';
	}
}
	},
	'side' : {
		mark : function(field, msg) {
			field.el.addClass(field.invalidClass);
			if (!field.errorIcon) {
				var elp = field.getErrorCt();
				// field has no container el
		if (!elp) {
			field.el.dom.title = msg;
			return;
		}
		field.errorIcon = elp.createChild( {
			cls : 'x-form-invalid-icon'
		});
		if (field.ownerCt) {
			field.ownerCt.on('afterlayout', field.alignErrorIcon, field);
			field.ownerCt.on('expand', field.alignErrorIcon, field);
		}
		field.on('resize', field.alignErrorIcon, field);
		field.on('destroy', function() {
			Ext.destroy(this.errorIcon);
		}, field);
	}
	field.alignErrorIcon();
	field.errorIcon.dom.qtip = msg;
	field.errorIcon.dom.qclass = 'x-form-invalid-tip';
	field.errorIcon.show();
},
clear : function(field) {
	field.el.removeClass(field.invalidClass);
	if (field.errorIcon) {
		field.errorIcon.dom.qtip = '';
		field.errorIcon.hide();
	} else {
		field.el.dom.title = '';
	}
}
	}
};
//扩展验证类型
Ext.apply(Ext.form.VTypes, {
	email : function(v) {
		if (v == '') {
			return true;
		}
		return /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/
				.test(v);
	}
});
//扩展RENDER
Ext.apply(Ext.util.Format, {
	dateRenderer : function(v, format) {

		return function(v) {
			var JsonDateValue;
			if (Ext.isEmpty(v))
				return '';
			else if (Ext.isEmpty(v.time))
				JsonDateValue = new Date(v);
			else
				JsonDateValue = new Date(v.time);
			//            alert(JsonDateValue)
	return JsonDateValue.format(format || 'Y/m/d H:i:s');
	//            	return (v !== undefined && v !== '' ? Ext.util.Format.date(v.time, format) : '无');
};
},
fileSizeRenderer : function(format, v) {

return function(v) {
	// alert((new Number(v)/1024) + ' K')
	if ("K" == format) {
		return (new Number(v) / 1000) + ' K';
	}
	if ("M" == format) {
		return (new Number(v) / 1000 / 1000) + ' M';
	}
	return v + ' Bytes';
}
},
booleanRenderer : function(a, b, v) {

return function(v) {
	if (v) {
		return a;
	}

	return b;
}
}

});
//扩展DateField
Ext.override(Ext.form.DateField, {
	setValue : function(date) {
		if (Ext.isEmpty(date)) {
		} else if (Ext.isEmpty(date.time)) {
			date = new Date(date);
		} else {
			date = new Date(date.time);
		}
		Ext.form.DateField.superclass.setValue.call(this, this.formatDate(this
				.parseDate(date)));
	}
});
Ext.override(Ext.form.BasicForm, {
	formId : ''
});
//
Ext.override(Ext.form.Action.Submit, {
	handleResponse : function(response) {
		if (this.form.errorReader) {
			var rs = this.form.errorReader.read(response);
			var errors = [];
			if (rs.records) {
				for ( var i = 0, len = rs.records.length; i < len; i++) {
					var r = rs.records[i];
					errors[i] = r.data;
				}
			}
			if (errors.length < 1) {
				errors = null;
			}
			return {
				success : rs.success,
				errors : errors
			};
		}
		try {
			return Ext.decode(response.responseText)
		} catch (e) {
			return response.responseText;
		}

	}

});

///////////////
Ext.Ajax.timeout = 3600000;
Ext.form.Field.prototype.msgTarget = 'custom';
//选择模型
var sm = new Ext.grid.CheckboxSelectionModel( {
	checkOnly : true
});
//行号模型
var rn = new Ext.my.RowNumberer();

var blankData = {
	'totalCount' : '0',
	'data' : []
};

//=============================20110711 add by zhaohb时间控件关联验证 start=======================
Ext.apply(Ext.form.VTypes, {

	// 时间开始结束验证
	daterange : function(val, field) {
		var date = field.parseDate(val);

		// We need to force the picker to update values to recaluate the disabled dates display
		var dispUpd = function(picker) {
			var ad = picker.activeDate;
			picker.activeDate = null;
			picker.update(ad);
		};

		if (field.startDateField) {
			var sd = Ext.getCmp(field.startDateField);
			sd.maxValue = date;
			if (sd.menu && sd.menu.picker) {
				sd.menu.picker.maxDate = date;
				dispUpd(sd.menu.picker);
			}
		} else if (field.endDateField) {
			var ed = Ext.getCmp(field.endDateField);
			ed.minValue = date;
			if (ed.menu && ed.menu.picker) {
				ed.menu.picker.minDate = date;
				dispUpd(ed.menu.picker);
			}
		}
		return true;
	},
	//=============================20110711 add by zhaohb电话号码控件验证 start=======================
	// 电话号码验证
	phone : function(val, field) {
		try {
			if (val.trim() == '') {
				return true;
			} else if (/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(val)) {
				return true;
			} else if (/(^0?[1][35][0-9]{9}$)/.test(val)) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	},
	phoneText : '请输入正确的电话号码或手机号码,如:0920-29392929，13456789654'
	//=============================20110711 add by zhaohb电话号码控件验证 start=======================
	,
	//增加密码验证类型 add by liji
	password : function(val, field) {
		if (field.initialPassField) {
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},

	passwordText : '两次输入密码不正确',
	//增加目录验证类型 add by liji
	dir : function(val, field) {
		if ("" == val.Trim()) {
			return false
		}
		var f = /[\/*?|:"<>]/g;

		return !f.test(val);
	},

	dirText : '目录名称不能为空白字符串且目录名称不能包含字符\/*?|:"<>'

});
//=============================20110711 add by zhaohb时间控件关联验证 end=======================
//增加提示显示插件可以在任意component上使用 add by liji
Ext.my.tipsPlugin = Ext.extend(Ext.ToolTip, {
	tipsTitle : '',
	tipsContent : '',
	initComponent : function() {
		Ext.my.tipsPlugin.superclass.initComponent.call(this);
	},
	init : function(comp) {
		comp.on('render', function() {
			new Ext.ToolTip( {
				target : comp.el,
				title : comp.tipsTitle,
				html : comp.tipsContent,
				trackMouse : true
			});
		});

	}
});
Ext.preg('tipsPlugin', Ext.my.tipsPlugin);

function makeDownloadFormByFrameId(frameid, action, fileid) {
	var myframe = document.getElementById(frameid).contentWindow;
	if (!myframe.document.getElementById("form")) {
		myframe.document.open();
		myframe.document.writeln('<html>');
		myframe.document.writeln('<body>');
		myframe.document
				.writeln('<head><meta http-equiv="Content-Type" content="text/html; charset=GBK"></head>');
		myframe.document.writeln('<form id="form" action="" method="post">');
		myframe.document
				.writeln('<input  id="id"  type="hidden" name="id" value="">');
		myframe.document.writeln('</form>');
		myframe.document.writeln('</body>');
		myframe.document.writeln('</html>');
		myframe.document.close();
	}
	myframe.document.getElementById("id").value = fileid;
	myframe.document.getElementById("form").action = action;
	return myframe.document.getElementById("form");
}
