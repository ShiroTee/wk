package com.jeecms.irc.common;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;

/**
 * 根据传入的IRC平台接口地址，调用IRC接口
 * 
 * @author zhyg
 * 
 */
public class IRCUtils {
	public static String readRdpInterface(HttpServletRequest request,
			String rdpURL) throws IOException {
		String responseData = "";
		// 获取请求接口的域
		String ircDomain = "";
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
		ircDomain = servDocument.getRootElement().element("ircDomain").getText();

		// 访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		url.append(ircDomain);
		url.append(rdpURL);
		System.out.println(url);
		HttpGet httpget = new HttpGet(url.toString());
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
			// responseData = new String(resData.getBytes("ISO-8859-1"), "utf-8") ;
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		System.out.println(responseData);
		return responseData;
	}
}
