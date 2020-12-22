package com.digitalchina.ldp.app.sep.core.processor.impl;


import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;
import com.digitalchina.ldp.app.smp.service.ConfigResponseService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class HttpServerTestProcessor implements Processor {

    private String routeId = null;

    public HttpServerTestProcessor(String routeId) {
        this.routeId = routeId;

    }

    @Override
    public void process(Exchange exchange) throws Exception {
        Thread.sleep(500);
        ConfigResponseService config = BeanDefineConfigue.getBean(ConfigResponseService.class, "configResponseServiceImpl", null);
        ResponseTemplateInfo info = config.getResponseTemplateByRouteId(routeId);
        if (info != null) {


            exchange.getOut().setHeaders(exchange.getIn().getHeaders());
            if ("xml".equals(exchange.getIn().getHeader("dataType"))) {
                exchange.getOut().getHeaders().put("Content-Type", "text/xml");
                exchange.getOut().setBody(info.getXmlResponse());

            } else {
                exchange.getOut().getHeaders().put("Content-Type", "application/Json");
                exchange.getOut().setBody(info.getJsonResponse());
            }
        }
    }
}
