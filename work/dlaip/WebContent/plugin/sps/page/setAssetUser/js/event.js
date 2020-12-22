/**
 * 搜索资源目录
 */
function searchForAsset()
{
	var assetName=Ext.getCmp("assetName_search").getValue();
	var sm_flag=Ext.getCmp("sm_flag_search").getValue();
	var grid=Ext.getCmp("rdGrid");
	grid.store.reload(
			{
				params :
				{
					assetName:assetName,
					start : 0,
					orgId : thisNodeId,
					limit : pageSize,
					archCateId:cateCombo.getValue(),
					sm_flag:sm_flag
				}
			});
	grid.store.baseParams =
	{
			assetName:assetName,
			start : 0,
			orgId : thisNodeId,
			limit : pageSize,
			archCateId:cateCombo.getValue(),
			sm_flag:sm_flag
	};
}
Ext.override(Ext.ux.form.LovCombo,{
	beforeBlur : Ext.emptyFn
});
//设置审批人窗口
function showAssociatedUsersWin(){
	var dataModel=Ext.getCmp('rdGrid').getSelectionModel();
	var count = dataModel.getSelections().length;
	var record = dataModel.getSelected();
	//如果不是选择一条，提醒他必须选择一条数据
	if(1!==count){
		Ext.Msg.alert('系统提示', '请选择一条记录');
		return false;
	}
	var resourceId=record.get("resourceId");
	var orgId=record.get("providerId");
	//因为要设置默认值，所以只能单独请求数据予以处理
	Ext.Ajax.request({
		url : getHandlerRequestUrl() + 'orgInfoManagerHandler/getUsersList',
		method : 'POST',
		params :{
			resourceId : resourceId,
			orgId:orgId
		},
		success : function(response, options){
			var result = Ext.util.JSON.decode(response.responseText);
			if (result.success){
				var data=new Array();
				for(var i=0;i<result.users.length;i++){
					var tamp=new Array();
					tamp.push(result.users[i].userName);
					tamp.push(result.users[i].userId);
					data.push(tamp);
				}
				var usersCombo=new Ext.ux.form.LovCombo({
					width : 270,
					maxHeight : 200,
					id:"resource_users",
					hideOnSelect : false,
					editable:false,
					fieldLabel : '设置审批人',
					value:result.ids,
					store: new Ext.data.SimpleStore({
						fields : ['userName','userId'],
						data:data
					}),
					triggerAction : 'all',
					valueField : 'userId',
					displayField : 'userName',
					mode : 'local'
				});
				//生成用户复选下拉框
				var win = new Ext.Window({
					closeAction : 'close',
					resizable : false,
					id:'setUserAssetWin',
					width : 420,
					height : 150,
					shadow : true,
					title : '审批人设置',
					modal : true,
					closable : true,
					animCollapse : true,
					buttonAlign : 'center',
					layout:'fit',
					items : [new Ext.Panel({			
						items:[new Ext.FormPanel({
							labelAlign:'right',
							style:'margin:20px 0 0 0;',
							border:false,
							items:[usersCombo]
						})]
					})],
					buttons : [{
						text : '保存',
						iconCls : 'icon_save',
						handler : function(){
							var ids=Ext.getCmp('resource_users').getValue();
							//保存新的关系
							saveNewAssetUser(ids,resourceId,orgId);
						}
					},{
						text : '关闭',
						iconCls : 'icon_close',
						handler : function(){
							win.close();
						}
					}]
				});
				win.show();
			} else{
				Ext.Msg.alert('提示', "发生错误，请稍后再试");
			}			
		},
		failure : function(response, options){
//			var result = Ext.util.JSON.decode(response.responseText);
			Ext.Msg.alert('提示', "请求数据失败，请稍后重试");
		}
	});
}
//保存新的资源和审批岗用户关系
function saveNewAssetUser(ids,resourceId,userOrgId){
	Ext.Ajax.request({
		url : getHandlerRequestUrl() + 'orgInfoManagerHandler/saveNewAssetUser',
		method : 'POST',
		params :{
			resourceId : resourceId,
			userids:ids,
			userOrgId:userOrgId
		},
		success : function(response, options){
			Ext.getCmp("setUserAssetWin").close();
			Ext.Msg.alert('提示', "设置成功");
		},
		failure : function(response, options){
			Ext.Msg.alert('提示', "设置失败，请稍后重试");
		}
	});
}