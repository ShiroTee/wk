package com.digitalchina.ws;

import org.springframework.stereotype.Component;
import javax.jws.WebService;

/**
 * @author jss
 * 2016年8月31日14:02:51
 */
@WebService(endpointInterface = "com.digitalchina.ws.SayWS", serviceName = "SayWSwebs")
@Component
public class SayWSImpl implements SayWS {
    @Override
    public String sayHello(){
        return "hello world";
    }
}
