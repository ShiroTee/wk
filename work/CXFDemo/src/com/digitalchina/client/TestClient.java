package com.digitalchina.client;

import com.digitalchina.ws.SayWS;
import org.apache.cxf.binding.soap.saaj.SAAJOutInterceptor;
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.apache.cxf.ws.security.wss4j.WSS4JOutInterceptor;
import org.apache.ws.security.WSConstants;
import org.apache.ws.security.handler.WSHandlerConstants;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TestClient {

    public static void main(String[] args) {
        // 以下和服务端配置类似，不对，应该说服务端和这里的安全验证配置一致
        Map<String, Object> outProps = new HashMap<String, Object>();
        outProps.put(WSHandlerConstants.ACTION,
                WSHandlerConstants.USERNAME_TOKEN);
        outProps.put(WSHandlerConstants.USER, "admin");
        outProps.put(WSHandlerConstants.PASSWORD_TYPE, WSConstants.PW_TEXT);
        // 指定在调用远程ws之前触发的回调函数WsClinetAuthHandler，其实类似于一个拦截器
        outProps.put(WSHandlerConstants.PW_CALLBACK_CLASS,
                WsClinetAuthHandler.class.getName());
        ArrayList list = new ArrayList();
        // 添加cxf安全验证拦截器，必须
        list.add(new SAAJOutInterceptor());
        list.add(new WSS4JOutInterceptor(outProps));

        JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
        // WebServiceSample服务端接口实现类，这里并不是直接把服务端的类copy过来，具体请参考http://learning.iteye.cm/blog/1333223
        factory.setServiceClass(SayWS.class);
        // 设置ws访问地址
        factory.setAddress("http://localhost:8011/webservices/SayWSwebs");
        //注入拦截器，用于加密安全验证信息
        factory.getOutInterceptors().addAll(list);
        SayWS service = (SayWS) factory.create();
        String response = service.sayHello();
        System.out.println(response);
    }
}
