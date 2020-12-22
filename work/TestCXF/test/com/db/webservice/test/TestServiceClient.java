/**
 * @(#)TestServiceClient.java May 13, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.db.webservice.test;



import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.db.webservice.TestService;
import com.db.webservice.User;

/**
 * desc: comment TestServiceClient.java
 * @author Chaisson(chengshengwang)
 * @since May 13, 2011 2:17:04 PM
 * @vision 1.0
 */
public class TestServiceClient {

	/**
	 * desc:
	 * @Chaisson(chengshengwang)
	 * @since May 13, 2011
	 * @version 1.0
	 * @param args
	 */
	public static void main(String[] args) {
		/*JaxWsProxyFactoryBean  factory = new JaxWsProxyFactoryBean ();
		factory.setServiceClass(TestService.class);
		factory.setAddress("http://localhost:8080/TestCXF/services/MyService");
		TestService service =(TestService)factory.create();
		service.sayHello("Chaisson");
		
		User user = new User();
		user.setAge(10);
		user.setName("Chaisson");
		user.setDesc("He is a good man");
		System.out.println(service.printMan(user));*/
		
		
		
		ApplicationContext ctx = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");   
		TestService client = (TestService)ctx.getBean("client");
		
		User user = new User();
		user.setAge(10);
		user.setName("Chaisson");
		user.setDesc("He is a good man");
		System.out.println(client.printMan(user));

	}

}
