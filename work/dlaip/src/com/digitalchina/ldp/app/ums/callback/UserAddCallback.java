package com.digitalchina.ldp.app.ums.callback;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.stereotype.Component;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.callback.CallBackFunction;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;

/**
 * 添加用户回调函数
 * 
 * @author python
 * 
 */
@Component
public class UserAddCallback implements CallBackFunction
{

	@Override
	public void callback(Model model)
	{
		// 获取参数
		String username = model.getValueNotEmpty("loginName");
		String password = model.getValueNotEmpty("loginPassword");
		String email = model.getValue("email");
		String msg = "";
		try
		{
			// 接口地址（注释部分是完整请求地址，仅作参照）
			String url = BeanDefineConfigue.getProperty("CMS_URL")
					+ "synUserAct?username=" + username + "&password="
					+ password + "8&email=" + email + "&type=add";
			String responseData = "";
			HttpClient httpclient = new DefaultHttpClient();
			try
			{
				HttpGet httpget = new HttpGet(url);
				ResponseHandler<String> responseHandler = new BasicResponseHandler();
				responseData = httpclient.execute(httpget, responseHandler);
				if (responseData.equals("{'success':true}"))
				{
					// msg="同步增加用户调用接口成功,用户名："+username;
				} else
				{
					msg = "同步增加用户调用接口失败,用户名：" + username;
				}
			} catch (Exception e)
			{
				msg = "同步增加用户接口调用发生异常,用户名：" + username;
			} finally
			{
				httpclient.getConnectionManager().shutdown();
			}
		} catch (Exception e)
		{
			msg = "同步增加用户发生异常,用户名：" + username;
		}
		model.getSystemModel().setErrorMsg(msg);
	}


}
