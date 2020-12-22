package com.digitalchina.decodeServer.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

/**
* 类描述：服务扫描配置文件工具类
* 创建人： luo
* 创建时间：2014-7-10
* @version    
*/

public  class ServerPropertiesUtil {

    //"F:/ideaworkspace/work/ftp/conf"; //
	public static final String USER_DIR ="F:/ideaworkspace/work/ftp/conf";//getProperty("user.dir")+ separatorChar+"conf"+separatorChar;
	
	
	private  static	Map map; 
	private  static void init(){
		InputStream in=null;
		try {
			in=new FileInputStream(USER_DIR+"/server.properties");
			Properties props = new Properties();
			props.load(in);
			map = new HashMap<String,String>(); 
			Set<Entry<Object, Object>> entrySet = props.entrySet();  
			    for (Entry<Object, Object> entry : entrySet) {  
			        if (!entry.getKey().toString().startsWith("#")) { 
			        	String tempValue=(String) entry.getValue();
			        	String resultValue=new String(tempValue.trim().getBytes("ISO-8859-1"),"gbk"); 
			            map.put(((String) entry.getKey()).trim(), tempValue);  
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
		    synchronized (ServerPropertiesUtil.class) {
		        if (map == null)
			        {
				       init();
				       res=(String)map.get(key);

			        }
		        }
	    }else
	    {
	    	
	    	res=(String)map.get(key);
	    }
	    return res ;
	}
	
	

}
