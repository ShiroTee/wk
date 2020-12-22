/**
 * @(#)TestServiceClient.java May 13, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.digitalchina.client;


import com.digitalchina.ws.SayWS;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;


public class TestServiceClient {

	public static void main(String[] args) {

        //ClassPathXmlApplicationContext context  = new ClassPathXmlApplicationContext(new String[] {"clientApplicationContext.xml"});
        ApplicationContext context = new FileSystemXmlApplicationContext("classpath:clientApplicationContext.xml");
        SayWS client = (SayWS)context.getBean("SayWS");

		System.out.println(client.sayHello());

	}

}
