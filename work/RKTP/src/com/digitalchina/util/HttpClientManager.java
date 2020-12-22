package com.digitalchina.util;

import com.alibaba.fastjson.JSON;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * HttpClient + xml + json字符串解析DEMO
 * @author HU
 * 
 */
public class HttpClientManager {
    private static String fileName="/conf/routeConfig.properties";
    static Map<String,String> mapConfig;
    static {
        mapConfig= getDIRProperties();
    }
    public static Map<String,String> getDIRProperties(){
        Map<String,String> map = new HashMap<String,String>();
        Properties p = new Properties();
        try {
            InputStream in = HttpClientManager.class.getResourceAsStream(fileName);
            p.load(in);
            in.close();
            if(p.containsKey("ip")){
                map.put("ip", p.getProperty("ip"));
            }
            if(p.containsKey("port")){
                map.put("port", p.getProperty("port"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }

	public static String getPopulationRelativeInfo(String value){
        if(mapConfig==null){
            mapConfig= getDIRProperties();
        }
        String ip=mapConfig.get("ip");
        String port=mapConfig.get("port");
		//访问二次开发平台接口
		String url = "http://"+ip+":"+port+"/service/api/csdsc/onlineInformationHandler/getPopulationRelativeInfo?authKey=BSDD-VAG7-2XU5-1C9ZT&timestamp=";
		url += new Date().getTime() ;
        url = url+"&value="+value;

        return getData(url);
	}


    public static String getPopulationDetail(String value,String tableName){
        if(mapConfig==null){
            mapConfig= getDIRProperties();
        }
        String ip=mapConfig.get("ip");
        String port=mapConfig.get("port");
        String url = "http://"+ip+":"+port+"/service/api/csdsc/onlineInformationHandler/getPopulationDetail?authKey=BSDD-VAG7-2XU5-1C9ZT&timestamp=";
        url += new Date().getTime() ;
        url = url+"&value="+value;
        url = url+"&tableName="+tableName;

        return getData(url);
    }
    private static String getData(String url){
        HttpClient httpclient = new DefaultHttpClient();
        String responseData = "";
        ResponseHandler<String> responseHandler = new BasicResponseHandler();
        HttpGet httpget = new HttpGet(url);
        try {
            responseData = httpclient.execute(httpget, responseHandler);
            // HttpClient默认使用ISO-8859-1读取http响应的内容，转化汉字为UTF-8格式。
            responseData = new String(responseData.getBytes("ISO-8859-1"), "utf-8") ;
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        }catch (IOException io){
            io.printStackTrace();
        }finally {
            httpclient.getConnectionManager().shutdown();
        }
        return responseData;
    }

    public static Boolean checkUser(String username,String password){
        if(mapConfig==null){
            mapConfig= getDIRProperties();
        }
        String ip=mapConfig.get("ip");
        String port=mapConfig.get("port");
        //访问二次开发平台接口
        String rdpLoginURL = "http://"+ip+":"+port+"/service/api/csdsc/userInfoHandler/getUserInfo?loginName="+username+"&password="+password ;
        String html = getData(rdpLoginURL);
        if (html!=null&&!"".equals(html)) {
            Map<String,String> map = (Map<String,String>)JSON.parse(html);
            if (String.valueOf(map.get("success")).equals("true")) {
               return true;
            }
        }
        return false;
    }
}
