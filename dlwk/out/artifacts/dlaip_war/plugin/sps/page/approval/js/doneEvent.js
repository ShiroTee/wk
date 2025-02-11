function showDetailWin()
{
  var win = new Ext.Window(
  {
    layout : 'fit',
    closeAction : 'close',
    resizable : false,
    width : 650,
    height : 440,
    shadow : true,
    title : '申请信息详情',
    modal : true,
    closable : true,
    animCollapse : true,
    buttonAlign : 'center',
    buttons : [
    {
      text : '关闭',
      iconCls : 'icon_close',
      handler : function()
      {
        win.close();
      }
    } ],
    items : [ createDetailForm() ]
  });
  win.show();
}

function createDetailForm()
{
  var FORM_WIDTH = 200;
  var form = new Ext.FormPanel(
  {
    labelAlign : 'right',
    labelSeparator : "：",
    frame : true,
    border : false,
    buttonAlign : 'center',
    reader : new Ext.data.JsonReader(
    {
      successProperty : 'success',
    },[
    {
      name : 'proposerName'
    },
    {
      name : 'proposerOrgName'
    },{
      name : 'assetName'
    },{
      name : 'assetProviderName'
    },{
      name : 'applyTime',
      mapping : function(data)
      {
        if (data.applyTime)
        {
          return formatDate(data.applyTime, "");
        }
        return "-";
      }
    },{
      name : 'status'
    },{
      name : 'proposerPhone'
    },{
      name : 'comment'
    },{
      name: 'approvalInformation',
      mapping: function(data){
        if(data.commentList[1]){
          Ext.getCmp("approverName1").setValue(data.commentList[1].approverName);
          if (data.commentList[1].dealTime)
          {
            Ext.getCmp("dealTime1").setValue(formatDate(data.commentList[1].dealTime, ""));
          }else{
            Ext.getCmp("dealTime1").setValue("-");
          }
          var dec;
          if(data.commentList[1].decision==undefined){
            dec='-';
          }else{
            dec=data.commentList[1].decision;
          }
          Ext.getCmp("decision1").setValue(dec);
          Ext.getCmp("comment1").setValue(data.commentList[1].comment);
        }
        if(data.commentList[2]){
          Ext.getCmp("approverName2").setValue(data.commentList[2].approverName);
          if (data.commentList[2].dealTime)
          {
            Ext.getCmp("dealTime2").setValue(formatDate(data.commentList[2].dealTime, ""));
          }else{
            Ext.getCmp("dealTime2").setValue("-");
          }
          var dec;
          if(data.commentList[2].decision==undefined){
            dec='-';
          }else{
            dec=data.commentList[2].decision;
          }
          Ext.getCmp("decision2").setValue(dec);
          Ext.getCmp("comment2").setValue(data.commentList[2].comment);
        }
        if(data.commentList[3]){
          Ext.getCmp("approverName3").setValue(data.commentList[3].approverName);
          if (data.commentList[3].dealTime)
          {
            Ext.getCmp("dealTime3").setValue(formatDate(data.commentList[3].dealTime, ""));
          }else{
            Ext.getCmp("dealTime3").setValue("-");
          }
          var dec;
          if(data.commentList[3].decision==undefined){
            dec='-';
          }else{
            dec=data.commentList[3].decision;
          }
          Ext.getCmp("decision3").setValue(dec);
          Ext.getCmp("comment3").setValue(data.commentList[3].comment);
        }
      }
    }   
    ]),
    items: [{
            layout:'column',
            border:false,
            items:[{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [{
                    xtype:'textfield',
                    fieldLabel: '申请人',
                    name: 'proposerName',
                    disabled:true,
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: '申请人部门',
                    name: 'proposerOrgName',
                    disabled:true,
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [{
                    xtype:'textfield',
                    fieldLabel: '资产名称',
                    name: 'assetName',
                    disabled:true,
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '资产所有方',
                    name: 'assetProviderName',
                    disabled:true,
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                border:false,
                items: [{
                    xtype:'textfield',
                    fieldLabel: '申请日期',
                    disabled:true,
                    name: 'applyTime',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: '当前状态',
                    disabled:true,
                    name: 'status',
                    anchor:'95%'
                }]
            },{
              columnWidth:.5,
              layout: 'form',
              border:false,
              items: [{
                  xtype:'textfield',
                  fieldLabel: '申请人电话',
                  disabled:true,
                  name: 'proposerPhone',
                  anchor:'95%'
              }]
              
            },{
              columnWidth:1,
              layout: 'form',
              border:false,
              items: [{
                  xtype:'textarea',
                  fieldLabel: '申请说明',
                  disabled:true,
                  name: 'comment',
                  anchor:'95%'
              }]
            }]
        },{
            xtype:'tabpanel',
            plain:true,
            activeTab: 0,
            height:235,
            /*
              By turning off deferred rendering we are guaranteeing that the
              form fields within tabs that are not activated will still be rendered.
              This is often important when creating multi-tabbed forms.
            */
            deferredRender: false,
            defaults:{bodyStyle:'padding:10px'},
            items:[{
                title:'管理员受理',
                layout:'form',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: '受理人',
                    id: 'approverName1',
                    disabled:true,
                },{
                    fieldLabel: '受理时间',
                    id: 'dealTime1',
                    disabled:true,
                },{
                    fieldLabel: '受理意向',
                    id: 'decision1',
                    disabled:true,
                }, {
                    fieldLabel: '受理意见',
                    id: 'comment1',
                    disabled:true,
                    xtype:'textarea'
                }]
            },{
                title:'资产所有方审批',
                layout:'form',
                defaults: {width: 230},
                defaultType: 'textfield',

                items: [{
                    fieldLabel: '审批人',
                    id: 'approverName2',
                    disabled:true,
                },{
                    fieldLabel: '审批时间',
                    id: 'dealTime2',
                    disabled:true,
                },{
                    fieldLabel: '审批意向',
                    id: 'decision2',
                    disabled:true,
                }, {
                    fieldLabel: '审批意见',
                    id: 'comment2',
                    disabled:true,
                    xtype:'textarea'
                }]
            },{
              title:'管理员授权',
              layout:'form',
              defaults: {width: 230},
              defaultType: 'textfield',

              items: [{
                  fieldLabel: '授权人',
                  id: 'approverName3',
                  disabled:true,
              },{
                  fieldLabel: '授权时间',
                  id: 'dealTime3',
                  disabled:true,
              },{
                  fieldLabel: '授权意向',
                  id: 'decision3',
                  disabled:true,
              }, {
                  fieldLabel: '授权意见',
                  id: 'comment3',
                  disabled:true,
                  xtype:'textarea'
              }]
          }]
        }]

  });
  var grid = Ext.getCmp("doneListGrid");
  var record = grid.getSelectionModel().getSelected();
  var approval_Id = record.get("id");
  var url = getHandlerRequestUrl()
      + "approvalHandler/loadDetail?id="
      + approval_Id
  // loadForm(form, url, "获取资源目录详情异常");
  form.getForm().load(
  {
    url : url,
    method : 'POST'
  });
  return form;
}