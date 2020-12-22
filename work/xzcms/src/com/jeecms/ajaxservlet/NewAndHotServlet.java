package com.jeecms.ajaxservlet;

import java.io.File;
import java.io.IOException;
import java.util.Date;

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
import org.dom4j.io.SAXReader;


/**
 * @author HU
 *
 */
public class NewAndHotServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.doPost(req, resp) ;
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
//		resp.setContentType("text/html") ;
		resp.setCharacterEncoding("utf-8") ;
		
		String responseData = null;
		// 获取请求接口的域
		String domain = "";
		// 服务调用授权KEY
		String authKey = "";
		//接口URL
		StringBuffer url = new StringBuffer() ;
		// 服务目录本地XML配置文件
		Document servDocument = null;

		// 选取本地配置文件中的中的基础信息
		try {
			servDocument = new SAXReader()
					.read(new File(req.getRealPath("WEB-INF")
							+ File.separator + "config" + File.separator + "read-service-config.xml"));
		} catch (DocumentException e2) {
			e2.printStackTrace();
		}
		domain = servDocument.getRootElement().element("domain").getText();
		authKey = servDocument.getRootElement().element("authKey").getText();

		//访问二次开发平台接口
		HttpClient httpclient = new DefaultHttpClient();
		String serv = req.getParameter("serv");
		url.append(domain) ;
		if("n".equals(serv)){
			url.append("/app/api/service/sms/smsServiceInterfaceHandler/getNewServicesList?authKey=" + authKey + "&dataType=json&timestamp=") ;
		}else{
			url.append("/app/api/service/sms/smsServiceInterfaceHandler/getHotServicesList?authKey=" + authKey + "&dataType=json&timestamp=") ;
		}
		url.append(new Date().getTime()) ;
		HttpGet httpget = new HttpGet(url.toString());
		ResponseHandler<String> responseHandler = new BasicResponseHandler();
		try {
			responseData = httpclient.execute(httpget, responseHandler);
//			HttpClient默认使用ISO-8859-1读取http响应的内容，转化汉字为UTF-8格式。
//			responseData = new String(responseData.getBytes("ISO-8859-1"),"utf-8") ;
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} finally {
			httpclient.getConnectionManager().shutdown();
		}
		
//		//最新服务
//		if("n".equals(serv)) responseData =  
//				"{success:true,data:[{serviceId:'10',serviceName:'人口基础信息查询人口基础信息查询',serviceDesc:'按照身份证号码查询人口基本详细信息',count:'1321',publishDate:'2013-2-23'}," +
//					"{serviceId:'11',serviceName:'人口基础信息查询人口基础信息查询年龄查询',serviceDesc:'根据年龄段查询相关总人数',count:'1001',publishDate:'2013-2-22'}," +
//					"{serviceId:'12',serviceName:'人口属性查询定位人口属性查询定位人口属性查询定位',serviceDesc:'按照身份证号码查询人口基本详细信息',count:'1321',publishDate:'2013-2-08'}," +
//					"{serviceId:'14',serviceName:'xxxx08-人口详细信息查询',serviceDesc:'详细信息查询',count:'1',publishDate:'2013-2-06'}," +
//					"{serviceId:'16',serviceName:'RKkjcx44-人口空间查询',serviceDesc:'人口空间查询',count:'321',publishDate:'2012-12-22'}," +
//					"{serviceId:'22',serviceName:'ldrkt45j-流动人口统计',serviceDesc:'流动人口统计',count:'31',publishDate:'2012-12-11'}," +
//					"{serviceId:'123',serviceName:'1234dd-结婚人数统计',serviceDesc:'按照年份统计兰州结婚人数',count:'1561',publishDate:'2012-12-8'}," +
//					"{serviceId:'155',serviceName:'离婚人数统计离婚人数统计离婚人数统计',serviceDesc:'按照年份统计兰州离婚人数',count:'21',publishDate:'2012-12-2'}," +
//					"{serviceId:'177',serviceName:'zhstj455-总户数总量统计',serviceDesc:'查询兰州总家庭户数',count:'1221',publishDate:'2012-2-22'}]}" ;
//		
//		//最新服务
//		if("h".equals(serv)) responseData =  
//				"{success:true,data:[{serviceId:'22',serviceName:'流动人口统计流动人口统计流动人口统计',serviceDesc:'流动人口统计',callCount:'132110',publishDate:'2013-2-11'}," +
//						"{serviceId:'10',serviceName:'人口基础信息查询流动人口统计',serviceDesc:'按照身份证号码查询人口基本详细信息',callCount:'1332',publishDate:'2012-2-23'}," +
//						"{serviceId:'14',serviceName:'人口详细信息查询流动人口统计流动人口统计',serviceDesc:'详细信息查询',callCount:'10010',publishDate:'2012-2-06'}," +
//						"{serviceId:'12',serviceName:'RKSXCX1-人口属性查询定位',serviceDesc:'按照身份证号码查询人口基本详细信息',callCount:'334',publishDate:'2011-12-08'}," +
//						"{serviceId:'11',serviceName:'NNCX002-年龄查询',serviceDesc:'根据年龄段查询相关总人数',callCount:'330',publishDate:'2013-2-23'}," +
//						"{serviceId:'155',serviceName:'lhrstj33-离婚人数统计',serviceDesc:'按照年份统计兰州离婚人数',callCount:'321',publishDate:'2011-2-22'}," +
//						"{serviceId:'16',serviceName:'RKkjcx44-人口空间查询',serviceDesc:'人口空间查询',callCount:'198',publishDate:'2012-2-22'}," +
//						"{serviceId:'123',serviceName:'1234dd-结婚人数统计',serviceDesc:'按照年份统计兰州结婚人数',callCount:'88',publishDate:'2013-2-28'}," +
//						"{serviceId:'177',serviceName:'zhstj455-总户数总量统计',serviceDesc:'查询兰州总家庭户数',callCount:'2',publishDate:'2013-2-22'}]}" ;
		resp.getWriter().write(responseData);
	}
}
