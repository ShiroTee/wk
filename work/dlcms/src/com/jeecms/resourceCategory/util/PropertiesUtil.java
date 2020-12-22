package com.jeecms.resourceCategory.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

/**
* 类描述：配置文件工具类
* 创建人：luo
* 创建时间：2014-7-3
* @version    
*/

public class PropertiesUtil {
	public static  String base = System.getProperty("user.dir")+ File.separator+"upload";

	private  static	Map map; 
	private  static void init(){
		Properties prop = System.getProperties();
		String os = prop.getProperty("os.name");
		if(os.indexOf("win")>=0 || os.indexOf("Win")>=0){
			base = "F:\\code\\code-project\\ideaworkspace\\dlwk\\out\\artifacts\\dlcms_war\\upload";
		}
		InputStream in=null;
		try {
			in= PropertiesUtil.class.getResourceAsStream("/client.properties");
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
				       init();
				       res=StringUtils.objToString(map.get(key));
			        }
		        }
	    }else
	    {
	    	
	    	res=(String)map.get(key);
	    }
	    return res ;
	}
}
