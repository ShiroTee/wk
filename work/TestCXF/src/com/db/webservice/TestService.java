/**
 * @(#)TestService.java May 13, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.db.webservice;

import javax.jws.WebParam;
import javax.jws.WebService;

/**
 * desc: comment TestService.java
 * @author Chaisson(chengshengwang)
 * @since May 13, 2011 11:41:03 AM
 * @vision 1.0
 */
@WebService
public interface TestService {
	public String sayHello(@WebParam(name="myName") String name);
	
	public String printMan(User user);
}
