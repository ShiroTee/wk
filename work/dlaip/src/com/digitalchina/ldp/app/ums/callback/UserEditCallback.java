package com.digitalchina.ldp.app.ums.callback;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.callback.CallBackFunction;

/**
 * 编辑用户回调函数
 * 
 * @author python
 * 
 */
public class UserEditCallback implements CallBackFunction
{

	@Override
	public void callback(Model model)
	{
		//获取参数
		String username=model.getValueNotEmpty("loginName");
		String password=model.getValueNotEmpty("loginPassword");
		String email=model.getValue("email");
		String msg="";
		try {
			//接口地址（注释部分是完整请求地址，仅作参照）
//			String url="http://10.6.10.38:7771/csdsc/synUserAct?username=27&password=18&email=tt8577@163.com&type=add";
			String url="http://10.6.10.38:7771/csdsc/synUserAct?username="+username+"&password="+password+"8&email="+email+"&type=update";
			String responseData = "";
			HttpClient httpclient = new DefaultHttpClient();
			try {
				HttpGet httpget = new HttpGet(url);
				ResponseHandler<String> responseHandler = new BasicResponseHandler();
				responseData = httpclient.execute(httpget, responseHandler);
				if(responseData.equals("{'success':true}")){
					//msg="同步修改用户调用接口成功,用户名："+username;
				}else{
					msg="同步修改用户调用接口失败,用户名："+username;
				}
			} catch(Exception e){
				msg="同步修改用户接口调用发生异常,用户名："+username;
			} finally {
				httpclient.getConnectionManager().shutdown();
			}
		} catch (Exception e) {
			msg="同步修改用户发生异常,用户名："+username;
		}
		model.getSystemModel().setErrorMsg(msg);
	}

}
