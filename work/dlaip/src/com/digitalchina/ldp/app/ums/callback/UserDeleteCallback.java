package com.digitalchina.ldp.app.ums.callback;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;

import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.callback.CallBackFunction;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;

/**
 * 删除用户回调函数
 * 
 * @author python
 * 
 */
public class UserDeleteCallback implements CallBackFunction
{

	@Override
	public void callback(Model model)
	{
		// 获取参数
		String username = model.getValueNotEmpty("loginName");
		String msg = "";
		try
		{
			// 接口地址（注释部分是完整请求地址，仅作参照）
			// String
			// url="http://10.6.10.38:7771/csdsc/synUserAct?username=27&password=18&email=tt8577@163.com&type=add";
			String url = BeanDefineConfigue.getProperty("CMS_URL")
					+ "synUserAct?username=" + username + "&type=del";
			String responseData = "";
			HttpClient httpclient = new DefaultHttpClient();
			try
			{
				HttpGet httpget = new HttpGet(url);
				ResponseHandler<String> responseHandler = new BasicResponseHandler();
				responseData = httpclient.execute(httpget, responseHandler);
				if (responseData.equals("{'success':true}"))
				{
					// msg="同步删除用户调用接口成功,用户名："+username;
				} else
				{
					msg = "同步删除用户调用接口失败,用户名：" + username;
				}
			} catch (Exception e)
			{
				msg = "同步增加删除接口调用发生异常,用户名：" + username;
			} finally
			{
				httpclient.getConnectionManager().shutdown();
			}
		} catch (Exception e)
		{
			msg = "同步删除用户发生异常,用户名：" + username;
		}
		model.getSystemModel().setErrorMsg(msg);
	}

	/**
	 * 接口调用公共方法
	 * 
	 * @param type
	 *            请求类型，post或者get
	 * @param url
	 *            请求的地址，get请求所需参数需要提前拼接到此url中
	 * @param params
	 *            post请求的参数集合，如果是get，设置为null，这个参数的申明格式和赋值格式如下：
	 *            List<NameValuePair> params = new ArrayList<NameValuePair>();
	 *            params.add(new BasicNameValuePair("paramName1",
	 *            "paramValue1")); params.add(new
	 *            BasicNameValuePair("paramName2", "paramValue2"));
	 * @return 错误提示或者接口返回信息
	 * @throws Exception
	 */
	public static String reqHttpclient(String type, String url,
			List<NameValuePair> params) throws Exception
	{
		String result = null;
		HttpClient httpclient = new DefaultHttpClient();
		try
		{
			if ("post".equals(type.toLowerCase()))
			{
				HttpPost httppost = new HttpPost(url);
				httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
				ResponseHandler<String> responseHandler = new BasicResponseHandler();
				result = httpclient.execute(httppost, responseHandler);
			} else if ("get".equals(type.toLowerCase()))
			{
				HttpGet httpget = new HttpGet(url);
				ResponseHandler<String> responseHandler = new BasicResponseHandler();
				result = httpclient.execute(httpget, responseHandler);
			} else
			{
				result = "请求类型错误";
			}
		} catch (Exception e)
		{
			result = "请求异常";
		} finally
		{
			httpclient.getConnectionManager().shutdown();
		}
		return result;
	}
	public static void main(String[] args)throws Exception
	{
		String result=reqHttpclient("get","http://10.6.10.199:8000/WFS/OGC/SDE.CUN.gis",new ArrayList<NameValuePair>(0));
		System.out.println(result);
	}
}
