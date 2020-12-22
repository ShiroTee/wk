new Ext.Window({
    id : "serviceLogDetailWin",
    title : '日志详细信息',
    width : 500,
    height : 400,
    closeAction : 'hide',
    autoScroll : true,
    buttonAlign : 'center',
    layout : 'fit',
    buttons : [ {
        text : '关闭',
        type : 'button',
        iconCls : 'icon_cancel',
        handler : function() {
            Ext.getCmp("serviceLogDetailWin").hide();
        }
    } ],
    items : [ new Ext.form.FormPanel({
        id : "paperForm",
        autoScroll : true,
        frame : true,
        items : [ {
            fieldLabel : '业务系统名称',
            xtype : 'textfield',
            id : "appName",
            name : "appName",
            width : 300,
            readOnly : true

        }, {
            fieldLabel : '调用服务名称',
            xtype : 'textfield',
            id : "serviceName",
            name : "serviceName",
            width : 300,
            readOnly : true
        }, {
            fieldLabel : '调用服务方法名称',
            xtype : 'textfield',
            id : "serviceMethod",
            name : "serviceMethod",
            width : 300,
            readOnly : true
        }, {
            fieldLabel : '记录日期',
            xtype : 'textfield',
            id : "createDate",
            name : "createDate",
            width : 300,
            readOnly : true
        }, {
            fieldLabel : '是否出现异常',
            xtype : 'combo',
            mode : 'local',
            id : 'isException_id',
            hiddenName : 'isException',
            store : new Ext.data.SimpleStore({
                fields : [ 'name', 'id' ],
                data : [ [ '是', '1' ], [ '否', '0' ] ]
            }),
            listeners : {
                select : function(combo, record, index) {
                }
            },
            triggerAction : 'all',
            displayField : 'name',
            valueField : 'id',
            value : "1",
            width : 300,
            forceSelection : true,
            typeAhead : true,
            handleHeight : 10
        }, {
            fieldLabel : '传出参数',
            xtype : 'textarea',
            anchor : '100%',
            id : 'outParam',
            name : 'outParam',
            height : 45,
            readOnly : true
        }, {
            fieldLabel : '传入参数',
            xtype : 'textarea',
            anchor : '100%',
            id : 'inParam',
            name : 'inParam',
            height : 45,
            readOnly : true
        } ]
    }) ],
    listeners : {
        afterrender : markRedStar
    }
});

function markRedStar(root) {
    var cs = root.find("allowBlank", false);
    for ( var i = 0; i < cs.length; i++) {
        cs[i].label.dom.innerHTML += "<span style='color:red;margin-top:2px'>*</span>";
    }
}
