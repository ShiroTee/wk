package com.digitalchina.common.util;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.Map.Entry;

/**
* 类描述：配置文件工具类
* 创建人：luo
* 创建时间：2014-7-3
* @version    
*/

public class PropertiesUtil {

	public static final String USER_DIR ="F:/ideaworkspace/work/ftp/conf/";//USER_DIR = getProperty("user.dir")+ separatorChar+"conf"+separatorChar;
	private static final String filePath =USER_DIR+"sourceData.xml";
	 
	private  static	Map map; 
	private  static void init(){
		InputStream in=null;
		try {
			in=new FileInputStream(USER_DIR+"client.properties");  
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
				       res=(String)map.get(key);
			        }
		        }
	    }else
	    {
	    	
	    	res=(String)map.get(key);
	    }
	    return res ;
	}
	
	public static String[] getdataTypeList(String orgInitial) 
	{
		ArrayList res=new ArrayList<String>();
		SAXReader sax=new SAXReader();
        try{
		   Document doc=sax.read(new File(filePath)); 
		   List dicList=doc.selectNodes("/root/uploadType/department");
		   Iterator it1=dicList.iterator();
		   while(it1.hasNext()){
			   Element dic=(Element) it1.next();
			   String type=dic.attributeValue("orgInitial");
			   if(type.equals(orgInitial))
			   {
				   List wordList=dic.elements();
				   Iterator it2=wordList.iterator();
				   while(it2.hasNext()){
					   Element word=(Element) it2.next();
					   String name=word.getTextTrim();
					   res.add(word.getTextTrim());
				   }
			   }
		   }
       }catch(Exception e){
		}
       
       if(res.size()>0)
       {
    	   String[] array=new String[res.size()];   
    	   for(int i=0;i<res.size();i++){   
    	       array[i]=(String)res.get(i);   
    	   }   
    	   return array;
       }else{
    	   return null; 
       }
  	}
	
	public static HashMap<String,String> getOrgidAndInitial(String departmentName) 
	{
		HashMap<String,String> tempmap=new HashMap<String,String>();
		SAXReader sax=new SAXReader();
        try{
		   Document doc=sax.read(new File(filePath)); 
		   List dicList=doc.selectNodes("/root/organization/department");
		   Iterator it1=dicList.iterator();
		   while(it1.hasNext()){
			   Element dic=(Element) it1.next();
			   String type=dic.attributeValue("name");
			   if(type.equals(departmentName))
			   {
				   List wordList=dic.elements();
				   Iterator it2=wordList.iterator();
				   while(it2.hasNext()){
					   Element word=(Element) it2.next();
					   tempmap.put(word.getName(),word.getTextTrim());
				   }
			   }
		   }
       }catch(Exception e){
			e.printStackTrace();
		}
     	   return tempmap; 
        
  	}

}
