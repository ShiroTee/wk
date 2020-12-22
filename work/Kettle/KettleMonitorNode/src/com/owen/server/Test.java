package com.owen.server;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Test {
	public static void main(String[] args) {
		Map<String,String> m =new HashMap<String, String>();
		m.put("1","1");
		m.put("1","2");
		//System.out.println(m.size());
		Iterator iter = m.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry entry = (Map.Entry) iter.next();
			Object key = entry.getKey();
			Object val = entry.getValue();
			System.out.println("key--"+key);
			System.out.println("val--"+val);
		}
	}
}
