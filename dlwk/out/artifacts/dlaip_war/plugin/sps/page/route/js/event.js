function deleteRoute(url,message,callback)
{
	Ext.MessageBox.confirm("提示", "您确定要从服务容器中移除路由吗?", function(btnId)
			{

				if (btnId == 'yes')
				{
					var msgTip = Ext.MessageBox.show(
					{
						title : '提示',
						width : 250,
						msg : '正在移除请稍后......'
					});
					Ext.Ajax.request(
					{
						url : url,
						method : 'POST',
						success : function(response, options)
						{
							msgTip.hide();
							var result = Ext.util.JSON.decode(response.responseText);
							if (result.success)
							{
								callback();
							} else
							{
								Ext.Msg.alert('提示', message + "异常码：" + result.msg);
							}
						},
						failure : function(response, options)
						{
							var result = Ext.util.JSON.decode(response.responseText);
							msgTip.hide();
							Ext.Msg.alert('提示', message + "异常码：" + result.data);
						}
					});
				}

			});
}
function openLogWin()
{
}