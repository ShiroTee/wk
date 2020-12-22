package com.jeecms.rdp.common;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.*;
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
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;

import com.jeecms.common.web.RequestUtils;

import freemarker.core.Environment;
import freemarker.ext.servlet.HttpRequestHashModel;
import freemarker.template.TemplateModelException;

/**
 * GET请求
 * 根据传入的RDP平台接口地址，调用RDP接口
 * 
 * @author zhyg
 * 
 */
public class RdpUtils {
	public static String readRdpInterface(HttpServletRequest request,
			String rdpURL, String dataType) throws IOException {
		String responseData = "";
		// 获取请求接口的域
		//String domain = "";
		// 服务调用授权KEY
		//String authKey = "";
		// 接口URL
		StringBuffer url = new StringBuffer();
		// 服务目录本地XML配置文件
		//Document servDocument = null;
//		try {
//			servDocument = new SAXReader().read(new File(request
//					.getRealPath("WEB-INF")
//					+ File.separator
//					+ "config"
//					+ File.separator + "read-service-config.xml"));
//		} catch (DocumentException e2) {
//			e2.printStackTrace();
//		}
		//domain = servDocument.getRootElement().element("domain").getText();
		//authKey = servDocument.getRootElement().element("authKey").getText();

		// 访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		//url.append(domain);
		url.append(rdpURL);
		//url.append("&authKey=" + authKey);
		url.append("&dataType=" + dataType);
		url.append("&timestamp=" + new Date().getTime());
		//System.out.println(url);
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
	public static String readRdpInterfacePost(HttpServletRequest request,
			String rdpURL, String dataType, Map parameterMap) throws IOException {
		String responseData = "";
		// 获取请求接口的域
		String domain = "";
		// 服务调用授权KEY
		String authKey = "";
		// 接口URL
		StringBuffer url = new StringBuffer();
		// 服务目录本地XML配置文件
		Document servDocument = null;
		try {
			servDocument = new SAXReader().read(new File(request
					.getRealPath("WEB-INF")
					+ File.separator
					+ "config"
					+ File.separator + "read-service-config.xml"));
		} catch (DocumentException e2) {
			e2.printStackTrace();
		}
		domain = servDocument.getRootElement().element("domain").getText();
		authKey = servDocument.getRootElement().element("authKey").getText();
		
		// 访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		url.append(domain);
		url.append(rdpURL);
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
			responseData = new String(responseData.getBytes("ISO-8859-1"), "utf-8") ;
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		//System.out.println(responseData);
		return responseData;
	}
	
	public static String readGisInterface(HttpServletRequest request,
			String rdpURL, String dataType) throws IOException {
		String responseData = "";
		// 获取请求接口的域
		//String domain = "";
		// 服务调用授权KEY
		//String authKey = "";
		// 接口URL
		StringBuffer url = new StringBuffer();
		// 服务目录本地XML配置文件
//		Document servDocument = null;
//		try {
//			servDocument = new SAXReader().read(new File(request
//					.getRealPath("WEB-INF")
//					+ File.separator
//					+ "config"
//					+ File.separator + "read-service-config.xml"));
//		} catch (DocumentException e2) {
//			e2.printStackTrace();
//		}
		//domain = servDocument.getRootElement().element("domain").getText();
		//authKey = servDocument.getRootElement().element("authKey").getText();

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

