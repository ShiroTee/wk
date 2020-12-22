Ext.form.MessageTargets = {
	'custom':{
		mark: function(field, msg){
//            alert(msg)
            field.el.addClass(field.invalidClass);
            if(!field.errorIcon){
                var elp = field.getErrorCt();
                // field has no container el
                if(!elp){
                    field.el.dom.title = msg;
                    return;
                }
                field.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
               
                
                
                if (field.ownerCt) {
                    field.ownerCt.on('afterlayout', field.alignErrorIcon, field);
                    field.ownerCt.on('expand', field.alignErrorIcon, field);
                }
                field.on('resize', field.alignErrorIcon, field);
                field.on('destroy', function(){
                    Ext.destroy(this.errorIcon);
                }, field);
            }
            field.alignErrorIcon();
            field.errorIcon.dom.qtip = msg;
            if(field.errorIcon.tip ){
            	field.errorIcon.tip.hide() ;
            	field.errorIcon.tip.unregister(field.errorIcon);
            }
             field.errorIcon.tip=new Ext.QuickTip({target:field.errorIcon,msg:msg,title:'错误',anchor: 'top'});
            field.errorIcon.dom.qclass = 'x-form-invalid-tip';
            field.errorIcon.show();
             field.errorIcon.tip.showBy( field.errorIcon);
        },
        clear: function(field){
              field.el.removeClass(field.invalidClass);
            if(field.errorIcon){
                field.errorIcon.dom.qtip = '';
                field.errorIcon.tip.hide() ;
                field.errorIcon.tip.unregister(field.errorIcon);
                field.errorIcon.hide();
            }else{
                field.el.dom.title = '';
            }
        }
	},
    'qtip' : {
        mark: function(field, msg){
            field.el.addClass(field.invalidClass);
            field.el.dom.qtip = msg;
            field.el.dom.qclass = 'x-form-invalid-tip';
            if(Ext.QuickTips){ // fix for floating editors interacting with DND
                Ext.QuickTips.enable();
            }
        },
        clear: function(field){
            field.el.removeClass(field.invalidClass);
            field.el.dom.qtip = '';
        }
    },
    'title' : {
        mark: function(field, msg){
//            alert(msg)
            field.el.addClass(field.invalidClass);
            if(!field.errorIcon){
                var elp = field.getErrorCt();
                // field has no container el
                if(!elp){
                    field.el.dom.title = msg;
                    return;
                }
                field.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
               
                
                
                if (field.ownerCt) {
                    field.ownerCt.on('afterlayout', field.alignErrorIcon, field);
                    field.ownerCt.on('expand', field.alignErrorIcon, field);
                }
                field.on('resize', field.alignErrorIcon, field);
                field.on('destroy', function(){
                    Ext.destroy(this.errorIcon);
                }, field);
            }
            field.alignErrorIcon();
            field.errorIcon.dom.qtip = msg;
            if(field.errorIcon.tip ){
            	field.errorIcon.tip.unregister(field.errorIcon);
            }
             field.errorIcon.tip=new Ext.QuickTip({target:field.errorIcon,msg:msg,title:'错误',anchor: 'top'});
            field.errorIcon.dom.qclass = 'x-form-invalid-tip';
            field.errorIcon.show();
             field.errorIcon.tip.showBy( field.errorIcon);
        },
        clear: function(field){
              field.el.removeClass(field.invalidClass);
            if(field.errorIcon){
                field.errorIcon.dom.qtip = '';
                field.errorIcon.tip.unregister(field.errorIcon);
                field.errorIcon.hide();
            }else{
                field.el.dom.title = '';
            }
        }
    },
    'under' : {
        mark: function(field, msg){
            field.el.addClass(field.invalidClass);
            if(!field.errorEl){
                var elp = field.getErrorCt();
                if(!elp){ // field has no container el
                    field.el.dom.title = msg;
                    return;
                }
                field.errorEl = elp.createChild({cls:'x-form-invalid-msg'});
                field.on('resize', field.alignErrorEl, field);
                field.on('destroy', function(){
                    Ext.destroy(this.errorEl);
                }, field);
            }
            field.alignErrorEl();
            field.errorEl.update(msg);
            Ext.form.Field.msgFx[field.msgFx].show(field.errorEl, field);
        },
        clear: function(field){
            field.el.removeClass(field.invalidClass);
            if(field.errorEl){
                Ext.form.Field.msgFx[field.msgFx].hide(field.errorEl, field);
            }else{
                field.el.dom.title = '';
            }
        }
    },
    'side' : {
        mark: function(field, msg){
        	alrt(msg)
            field.el.addClass(field.invalidClass);
            if(!field.errorIcon){
                var elp = field.getErrorCt();
                // field has no container el
                if(!elp){
                    field.el.dom.title = msg;
                    return;
                }
                field.errorIcon = elp.createChild({cls:'x-form-invalid-icon'});
                if (field.ownerCt) {
                    field.ownerCt.on('afterlayout', field.alignErrorIcon, field);
                    field.ownerCt.on('expand', field.alignErrorIcon, field);
                }
                field.on('resize', field.alignErrorIcon, field);
                field.on('destroy', function(){
                    Ext.destroy(this.errorIcon);
                }, field);
            }
            field.alignErrorIcon();
            field.errorIcon.dom.qtip = msg;
            field.errorIcon.dom.qclass = 'x-form-invalid-tip';
            field.errorIcon.show();
        },
        clear: function(field){
            field.el.removeClass(field.invalidClass);
            if(field.errorIcon){
                field.errorIcon.dom.qtip = '';
                field.errorIcon.hide();
            }else{
                field.el.dom.title = '';
            }
        }
    }
};

///////////
function typeOf(obj) {
	if (typeof (obj) == 'object') {
		if (obj.length)
			return 'array';
		else
			return 'object';
	}
	return typeof (obj);
};
//
function openWindow(target){
	
    var param="toolbar:no;"; 
	param+="menubar:no;"; 
	param+="scrollbars:no;";
	param+="resizable:no;";
	param+="location:no;";
	param+="status:no;";
	param+="dialogHeight: 800px;";
	param+="dialogWidth: 900px;";
	param+="edge: Raised;";
	param+="center: Yes;";
	
	var v=window.showModalDialog(target,"newwin",param);
	//alert(v);
	return v;
};
///////////////

Ext.ns('Ext.my');
Ext.my.increment=1;
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
	header: "序号",
    
    width: 40
		});

Ext.reg('Ext.my.RowNumberer', Ext.my.RowNumberer);


Ext.ns('Ext.ux.form');


Ext.ux.form.textWithButton = Ext.extend(Ext.form.TriggerField, {
    initComponent : function(){
    	this.readOnly=true;
        Ext.ux.form.textWithButton.superclass.initComponent.call(this);
    },

    validationEvent:false,
    validateOnBlur:false,
    triggerClass : 'x-form-date-trigger',
   // hideTrigger1:true,
    width:180,
   // hasSearch : false,
    //myname:'',
    myvalue : '',
    myurl:'',
    isChose:'',
    afterSelect:function(){},

  
    
    onTriggerClick : function(){
    	if(this.isChose == true){
    		var retval = openWindow(this.myurl);
    	}
    	
    	//
    	if (typeOf(retval) == 'array' && retval.length > 1) {
    	
    		this.setValue(retval[0]);
    		this.myvalue = retval[1];
    		this.afterSelect();
    	}
    	
    }

    
});
Ext.form.Field.prototype.msgTarget = 'custom';
//选择模型
 var sm =  new Ext.grid.CheckboxSelectionModel ({checkOnly :true});
 //行号模型
 var rn = new Ext.my.RowNumberer();
 //查询异常处理方法
 var onJsonStoreException = function(proxy, type, action,options ,response) {
   if(type=='response'){
    var msg =response.responseText;
          Ext.MessageBox.show({
             title: '警告',
             msg: msg,
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.WARNING
         });
   };
       };
       	var blankData = {
		'totalCount' : '0',
		'data' : []
	};
	 