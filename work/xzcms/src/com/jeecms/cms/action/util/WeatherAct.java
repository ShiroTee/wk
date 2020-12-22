package com.jeecms.cms.action.util;

import java.io.IOException;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeecms.common.util.DateUtils;
import com.jeecms.common.util.PropertiesUtil;
import com.jeecms.common.web.ResponseUtils;

/**
 * @author 陈超
 * 2014-7-14 下午03:09:57
 */
@Controller
public class WeatherAct {
	@RequestMapping(value = "getWeather.jhtml", method = RequestMethod.GET)
	public void getWeather(HttpServletResponse response,HttpServletRequest request){
		HttpSession session = request.getSession();
		if(session.getAttribute("weather") != null){
			ResponseUtils.renderJson(response, session.getAttribute("weather").toString());
		}else{
			HttpClient httpClient = new DefaultHttpClient();
			Map<String,Object> map = new HashMap<String, Object>();
			try {
				HttpGet httpGet = new HttpGet("http://tianqi.xixik.com/cframe/1");
				HttpResponse httpResponse = httpClient.execute(httpGet);
				HttpEntity entity = httpResponse.getEntity();
				if (entity != null) {
					String responseString = new String(EntityUtils.toString(entity));
				      responseString=new String(responseString.getBytes("utf-8"),"utf-8");
				       String reg = ">.[^<]℃";
				       String reg2 = "<div class=\".[^>]*";
				       Pattern p2 = Pattern.compile(reg2);
						Matcher m2 = p2.matcher(responseString);
						m2.find();
						String str = m2.group();
						map.put("css",  str.substring(12,str.length()-1));
						Pattern p1 = Pattern.compile(reg);
						Matcher m1 = p1.matcher(responseString);
						m1.find();
						String max = m1.group();
						map.put("maxTem", max.substring(1, max.length()-1));
						m1.find();
						String min = m1.group();
						map.put("minTem", min.substring(1, max.length()-1));
						map.put("week", DateUtils.getCurrentWeekDay());
						map.put("date", DateUtils.getDateByFormat("yyyy-MM-dd"));
				}
			} catch (Exception e) {
				System.out.println("无法连接到网络");
				//e.printStackTrace();
			} finally {
				try {
					httpClient.getConnectionManager().shutdown();
				} catch (Exception e) {
					//e.printStackTrace();
				}
			}
			JSONArray json = new JSONArray();
			json.put(map);
			System.out.println(json.toString());
			session.setAttribute("weather", json.toString());
			
			if(session.getAttribute("resourceCategoryAdd") == null){
				session.setAttribute("resourceCategoryAdd", PropertiesUtil.getValueBykey("resourceCategoryAdd")); 
			}
			if(session.getAttribute("pageSize") == null){
				session.setAttribute("pageSize", PropertiesUtil.getValueBykey("pageSize")); 
			}
			if(session.getAttribute("platformAdd") == null){
				session.setAttribute("platformAdd", PropertiesUtil.getValueBykey("platformAdd")); 
			}
			//response.setContentType("application/json;charset=UTF-8");
			ResponseUtils.renderJson(response, json.toString());
			//return json.toString();
		}
		
	}

}

