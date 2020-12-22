package com.digitalchina.ldp.app.csdsc.comm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


/**
 * @author 陈超
 * 2014-8-29 上午11:26:56
 */
public class JsonUtils {
	public static List<Map<String, Object>> parseJSON2List(String jsonStr){  
		if(jsonStr == null || "".equals(jsonStr.trim()) ){
			return null;
		}
        JSONArray jsonArr = JSONArray.parseArray(jsonStr);  
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();  
        Iterator<Object> it = jsonArr.iterator();  
        while(it.hasNext()){  
            JSONObject json2 = (JSONObject)it.next();  
            list.add(parseJSON2Map(json2.toString()));  
        }  
        return list;  
    }  
      
     
    public static Map<String, Object> parseJSON2Map(String jsonStr){  
        Map<String, Object> map = new HashMap<String, Object>();  
        //最外层解析  
        JSONObject json = JSONObject.parseObject(jsonStr);  
        for(Object k : json.keySet()){  
            Object v = json.get(k);   
            //如果内层还是数组的话，继续解析  
            if(v instanceof JSONArray){  
                List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();  
                Iterator<Object> it = ((JSONArray)v).iterator();  
                while(it.hasNext()){  
                    JSONObject json2 = (JSONObject)it.next();  
                    list.add(parseJSON2Map(json2.toString()));  
                }  
                map.put(k.toString(), list);  
            } else {  
                map.put(k.toString(), v);  
            }  
        }  
        return map;  
    }  

}

