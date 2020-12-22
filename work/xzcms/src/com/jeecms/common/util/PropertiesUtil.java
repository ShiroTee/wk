package com.jeecms.common.util;
 
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;


public class PropertiesUtil {
	
	@SuppressWarnings("rawtypes")
	private  static	Map map; 
	
	@SuppressWarnings("unchecked")
	PropertiesUtil(){
		
		InputStream in=null;
		 
		try {
			in=this.getClass().getClassLoader().getResourceAsStream("sysparam.properties");//new FileInputStream(filePath);  
		
			Properties props = new Properties();
			props.load(in);
			map = new HashMap<String,String>(); 
			Set<Entry<Object, Object>> entrySet = props.entrySet();  
			    for (Entry<Object, Object> entry : entrySet) {  
			        if (!entry.getKey().toString().startsWith("#")) {  
			            map.put(((String) entry.getKey()).trim(), ((String) entry.getValue()).trim());  
			        }  
			    }
		} catch (IOException e) {
			
		}finally {  
            if (in != null) {  
                try {  
                	in.close();  
                 } catch (IOException e) {  
                    e.printStackTrace();  
                 }  
             }  
         }    
		
	}
	
	
	public  static  String  getValueBykey(String key) {
		String res="";
	    if (map == null) { 
		    synchronized (PropertiesUtil.class) {
		        if (map == null)
			        {
		        	   new  PropertiesUtil();
				       res=(String)map.get(key);
			        }
		        }
	    }else
	    {
	    	
	    	res=(String)map.get(key);
	    }
	    return res ;
	}
	
	public static String getHtmlByUrl(String url){  
		   String html = null;  
		   //创建httpClient对象
		   HttpClient httpClient = new DefaultHttpClient();  
		    //以get方式请求该URL
		    HttpGet httpget = new HttpGet(url);  
		    try {  
		        //得到responce对象
		        HttpResponse responce = httpClient.execute(httpget);
		        //返回码
		        int resStatu = responce.getStatusLine().getStatusCode();  
		        //200正常  其他就不对  
		        if (resStatu==HttpStatus.SC_OK) {
		            //获得相应实体  
		            HttpEntity entity = responce.getEntity();  
		            if (entity!=null) {  
		                //获得html源代码
		                html = EntityUtils.toString(entity,"utf-8");  
		            }  
		        }  
		    } catch (Exception e) {  
		        
		        e.printStackTrace();  
		    } finally {  
		        httpClient.getConnectionManager().shutdown();  
		    }  
		    return html;  
		}

	public static void main(String[] args) {
		 
		System.out.println(PropertiesUtil.getValueBykey("resourceCategoryAdd"));
	 
	}

}
