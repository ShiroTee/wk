package com.jeecms.ajaxservlet;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * HttpClient + xml + json字符串解析DEMO
 * @author HU
 * 
 */
public class HttpClientTest{

	protected void doPost()throws ServletException, IOException {
		
		//访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		String responseData = null;
		String url = "http://10.6.10.38:8888/app/api/service/comboBoxHandler/getTreeData?level=3&orgId=620100000000000&dataType=json&authKey=XJUN1VBY&timestamp=";
		url += new Date().getTime() ;
		HttpGet httpget = new HttpGet(url);
		System.out.println(url);
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
			// HttpClient默认使用ISO-8859-1读取http响应的内容，转化汉字为UTF-8格式。
			// responseData = new String(responseData.getBytes("ISO-8859-1"),
			// "utf-8") ;
//			document = DocumentHelper.parseText(responseData);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		}
//		catch (DocumentException e) {
//			e.printStackTrace();
//		}
		finally {
//			httpclient.getConnectionManager().shutdown();
		}
		
		System.out.println(responseData);

		// 解析返回的XML数据
//		Element root = document.getRootElement();
//		String success = root.element("success").getText();
//		if ("true".equals(success)) { // 判断是否读取成功,如果成功将XML内容解析，重新封装为适合ExtJs使用的JSON数据
//			Element item = root.element("item");
//			itemList = item.elements();
//			for (Element e : itemList) {
//				JSONObject member = new JSONObject();
//				try {
//					member.put("text", e.attributeValue("label"));
//					member.put("id", e.attributeValue("id"));
//					member.put("pid", e.attributeValue("pid"));
//					if ("N".equals(e.attributeValue("leaf"))) {
//						member.put("leaf", false);
//					} else {
//						member.put("leaf", true);
//					}
//					responseJson.put(member);
//				} catch (JSONException e1) {
//					e1.printStackTrace();
//				}
//			}
//		}
//		System.out.println(responseJson.toString());
//		System.out.println(new Date().getTime());
//		System.out.println(req.getServletContext().getResource("WEB-INF/config/read-service-config.xml").getContent());
//		System.out.println(req.getContextPath() + "/WEB-INF/config/read-service-config.xml");
	}
	
	
	
	public static void main(String[] args) {
//		System.out.println( new Date().getTime());
//		try {
//			System.out.println(new SimpleDateFormat("yyyy-MM-dd").parse("2014-01-01").getTime()) ;
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
//		String jsonStr = "{'data':{'addDate':1370316440000,'groupId':'896b12d4-d754-4347-ab7d-9721e7b1f145','groupName':'CMS','id':'fe9f42f7-02ef-4656-9684-7ec5c51266a9','isAppAdmin':'N','loginName':'cms','loginPassword':'8D969EEF6ECAD3C2','name':'cms','organizationId':'01389818X','status':'Y'},'success':true}" ;
//		try {
//			JSONObject responseJson = new JSONObject(jsonStr);
//			System.out.println(responseJson.getJSONObject("data").getString("groupId"));
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		try {
			new HttpClientTest().doPost();
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}
}
