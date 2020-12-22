/**
 * @(#)User.java May 13, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.db.webservice;

/**
 * desc: comment User.java
 * @author Chaisson(chengshengwang)
 * @since May 13, 2011 5:20:38 PM
 * @vision 1.0
 */
public class User {
	
	private int age;
	
	private String name;
	
	private String desc;

	public int getAge() {
		return age;
	}

	public String getName() {
		return name;
	}

	public String getDesc() {
		return desc;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
}
