/**
 * @(#)TestServiceImpl.java May 13, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.db.webservice.impl;

import com.db.webservice.TestService;
import com.db.webservice.User;

/**
 * desc: comment TestServiceImpl.java
 * @author Chaisson(chengshengwang)
 * @since May 13, 2011 11:41:38 AM
 * @vision 1.0
 */   
public class TestServiceImpl implements TestService {
	public String sayHello(String myName){
		System.out.println("Hello World! "+myName);
		return "SUCCESS";
	}

	public String printMan(User user) {
		StringBuffer sb = new StringBuffer();
		if(user.getAge()>=18 && user.getAge()<60){
			sb.append("He is a young man. ");
		}else if(user.getAge()>=60){
			sb.append("He is an old man. ");
		}else{
			sb.append("He is a little boy. ");
		}
		
		if(user.getName()!=null){
			sb.append(" His name is "+user.getName()+". ");
		}
		if(user.getDesc()!=null){
			sb.append(" His description is that "+user.getDesc()+". ");
		}
		return sb.toString();
	}
}
