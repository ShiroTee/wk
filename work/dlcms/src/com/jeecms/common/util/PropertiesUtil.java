package com.jeecms.common.util;
 
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
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

		public static String setFtpLog(String url,Long uuid,String  webUserName,
									   String desc,String ftpUserName,
									   String uploadTime,String type){

				//创建一个httpclient对象
			HttpClient client = new DefaultHttpClient();

			//创建一个post对象
				HttpPost post = new HttpPost(url);

				//创建一个Entity，模拟表单数据
				List<NameValuePair> formList = new ArrayList<NameValuePair>();

				//添加表单数据
				formList.add(new BasicNameValuePair("uuid", uuid.toString()));
				formList.add(new BasicNameValuePair("webUserName", webUserName));
				formList.add(new BasicNameValuePair("uploadTime", uploadTime));
				formList.add(new BasicNameValuePair("operate_desc", desc));
				formList.add(new BasicNameValuePair("operate_type", type));
				formList.add(new BasicNameValuePair("ftpUserName", ftpUserName));

				//包装成一个Entity对象
			StringEntity entity = null;
			try {
				entity = new UrlEncodedFormEntity(formList, "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			//设置请求的内容
				post.setEntity(entity);

				//设置请求的报文头部的编码
				post.setHeader(
						new BasicHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"));

				//设置期望服务端返回的编码
				post.setHeader(new BasicHeader("Accept", "text/plain;charset=utf-8"));

				//执行post请求
			HttpResponse response = null;
			try {
				response = client.execute(post);
			} catch (IOException e) {
				e.printStackTrace();
			}finally {
				client.getConnectionManager().shutdown();
			}

			//获取响应码
				int statusCode = response.getStatusLine().getStatusCode();
				//获取数据
					String resStr = "";
				if (statusCode == 200) {


					try {
						resStr = EntityUtils.toString(response.getEntity());
					} catch (IOException e) {
						e.printStackTrace();
					}
				} else {

					//输出
					System.out.println("请求失败,错误码为: " + statusCode);
				}
				return resStr;

		}

	public static void main(String[] args) {
		 
		System.out.println(PropertiesUtil.getValueBykey("resourceCategoryAdd"));
	 
	}

}
