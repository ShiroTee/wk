/**
 * @(#)PasswordHandler.java Aug 19, 2011
 * 
 * Copyright 2010 DB SCHENKER, Inc. All rights reserved.
 */
package com.db.webservice.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;

import org.apache.ws.security.WSPasswordCallback;

/**
 * desc: comment PasswordHandler.java
 * @author Chaisson(chengshengwang)
 * @since Aug 19, 2011 5:08:30 PM
 * @vision 1.0
 */
public class PasswordHandler implements CallbackHandler {

	private Map<String, String> passwords = new HashMap<String, String>();

	public PasswordHandler() {
		passwords.put("apmserver", "apmserverpass");
        passwords.put("apmclient", "apmclientpass");
	}

	public void handle(Callback[] callbacks) throws IOException,
			UnsupportedCallbackException {
		WSPasswordCallback pc = (WSPasswordCallback) callbacks[0];
		String id = pc.getIdentifer();
		pc.setPassword((String) passwords.get(id));
	}
}
