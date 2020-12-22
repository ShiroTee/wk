package com.digitalchina.intercepter;

import org.apache.ws.security.WSPasswordCallback;

import javax.security.auth.callback.Callback;
import javax.security.auth.callback.CallbackHandler;
import javax.security.auth.callback.UnsupportedCallbackException;
import java.io.IOException;

public class WsAuthHandler implements CallbackHandler {

    public void handle(Callback[] callbacks) throws IOException,
            UnsupportedCallbackException {
        for (int i = 0; i < callbacks.length; i++) {
            WSPasswordCallback pc = (WSPasswordCallback) callbacks[i];
            String identifier = pc.getIdentifier();
            int usage = pc.getUsage();
            if (usage == WSPasswordCallback.USERNAME_TOKEN) {
                pc.setPassword("admin");
            } else if (usage == WSPasswordCallback.SIGNATURE) {
                pc.setPassword("admin");
            }
        }

    }

}