/**
 * @(#)TestServiceClient.java May 13, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.digitalchina.client;


import com.digitalchina.ws.RKTPInformationWS;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;


public class TestServiceClient {

	public static void main(String[] args) {

        ApplicationContext context = new FileSystemXmlApplicationContext("classpath:clientApplicationContext.xml");
        RKTPInformationWS client = (RKTPInformationWS)context.getBean("RKTP");

        String type = client.getRKTPQueryType("admin","1");
        System.out.println(type);
        String sfzjhData = client.getRelation("admin","1","sfzjh","522127199004246535");
        System.out.println(sfzjhData);

        String subject =  client.getRelationExpand("admin","1","RK_WSJZYYSZCXX","sfzjh","522127199004246535", "4503485");

       System.out.println(subject);

        String detail = client.getPopulationMap("admin","1","v_rktp_rkjbxx","522127199004246535","sfzjh","5260593","RK_RSJDWZGYLBXCBDJXX");

        System.out.println(detail);

        //System.out.println(client.getPopulationMap("admin","1","v_rktp_rkjbxx","522127199004246535","sfzjh","5260593","RK_RSJDWZGYLBXCBDJXX"));
        //client.getRelation("sfzjh","");
		//System.out.println(client.getPopulationRelativeInfo("赵凯"));

	}

}
