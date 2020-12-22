package com.jeecms.ajaxservlet;

import com.jeecms.common.util.PropertiesUtil;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

/**
 * GET请求
 * 根据传入的RDP平台接口地址，调用RDP接口
 * 
 * @author zhyg
 * 
 */
public class HttpClientUtil {

	public static String getAipDataGet(HttpServletRequest request,
			String rdpURL, String dataType) throws IOException {
		String responseData = "";
		// 接口URL
		StringBuffer url = new StringBuffer();

		// 访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		url.append(PropertiesUtil.getValueBykey("platformAdd2")+rdpURL);
		url.append("&dataType=" + dataType);
		url.append("&timestamp=" + new Date().getTime());
		HttpGet httpget = new HttpGet(url.toString());
		ResponseHandler<String> responseHandler = new BasicResponseHandler(){
			@Override
			public String handleResponse(final HttpResponse response)
					throws HttpResponseException, IOException {
				StatusLine statusLine = response.getStatusLine();
				if (statusLine.getStatusCode() >= 300) {
					throw new HttpResponseException(statusLine.getStatusCode(),
							statusLine.getReasonPhrase());
				}

				HttpEntity entity = response.getEntity();
				if(entity == null){
					return null;
				}
				String charSet = EntityUtils.getContentCharSet(entity);
				String responseData = EntityUtils.toString(entity);
				return new String(responseData.getBytes(charSet),"UTF-8");
			}
		};
		try {
			responseData = httpclient.execute(httpget, responseHandler);
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		System.out.println(responseData);
		return responseData;
	}
	
	/**
	 * POST请求
	 * @param request   request对象
	 * @param rdpURL	RDP平台URL
	 * @param dataType	需要的返回数据类型
	 * @param parameterMap	请求的参数集合
	 * @return
	 * @throws IOException
	 */
	public static String getAipDataPost(HttpServletRequest request,
			String rdpURL, String dataType, Map parameterMap) throws IOException {
		String responseData = "";
		// 获取请求接口的域
		String domain = "";
		// 服务调用授权KEY
		String authKey = "";
		// 接口URL
		StringBuffer url = new StringBuffer();
		// 访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		url.append(domain);
		url.append(PropertiesUtil.getValueBykey("platformAdd2")+rdpURL);
		//System.out.println(url);
		HttpPost httpPost = new HttpPost(url.toString());
		//  设置HTTP POST请求参数必须用NameValuePair对象  
		List<NameValuePair> params = new ArrayList<NameValuePair>();  
		//遍历参数,为POST请求准备参数
		params.add(new BasicNameValuePair("authKey", authKey));  
		params.add(new BasicNameValuePair("dataType", dataType));  
		params.add(new BasicNameValuePair("timestamp", new Date().getTime() + ""));  
		Set<Map.Entry<String, String>> set = parameterMap.entrySet();
		for (Iterator<Map.Entry<String, String>> it = set.iterator(); it.hasNext();) {
            Map.Entry<String, String> entry = (Map.Entry<String, String>)it.next();
            params.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));  
        }
		//设置HTTP POST请求参数  
//        httpPost.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));  
        httpPost.setEntity(new UrlEncodedFormEntity(params, HTTP.UTF_8));  
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpPost, responseHandler);
           String os = System.getProperty("os.name").toLowerCase();
            if(os.indexOf("linux")>=0) {
                responseData = new String(responseData.getBytes("ISO-8859-1"),"utf-8");
            }
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		//System.out.println(responseData);
		return responseData;
	}
	
	public static String readGisInterface(HttpServletRequest request,
			String rdpURL, String dataType) throws IOException {
		String responseData = "";

		// 接口URL
		StringBuffer url = new StringBuffer();
		// 服务目录本地XML配置文件

		// 访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		//url.append(domain);
		url.append(rdpURL);
		//url.append("&authKey=" + authKey);
		url.append("&dataType=" + dataType);
		url.append("&timestamp=" + new Date().getTime());
		//System.out.println(url);
		HttpGet httpget = new HttpGet(url.toString());
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
			//responseData = new String(responseData.getBytes("ISO-8859-1"), "utf-8") ;
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		//System.out.println(responseData);
		return responseData;
	}
	
}

