package com.digitalchina.ldp.app.sep.core.processor.impl;


import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.sep.util.ThreadUtil;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import javax.servlet.http.HttpServletResponse;

public class ProxyExceptionProcessor implements Processor {

    private RouteLogService routeLogService;
    private RouteInfo route;

    public ProxyExceptionProcessor(RouteLogService routeLogService, RouteInfo route) {
        this.routeLogService = routeLogService;
        this.route = route;
    }

    @Override
    public void process(Exchange exchange) throws Exception {
        RouteLogInfo logInfo = ThreadUtil.get();
        //ConnectException e = exchange.getProperty(Exchange.EXCEPTION_CAUGHT, ConnectException.class);
        String query = (String) exchange.getIn().getHeader(ConstantUtil.CAMEL_HTTP_QUERY);
        exchange.getOut().setFault(true);
        String errorMsg = "远程服务不能访问";

        //访问WSDL
        if (route.getRouteType().equals("soap")) {
            if (!query.startsWith("wsdl")) {
                exchange.getOut().setHeaders(exchange.getIn().getHeaders());
                errorMsg = BeanDefineConfigue.getProperty("SOAP_ERROR_MESSAGE").replace("{@}", errorMsg);

            }
        } else if (route.getRouteType().equals("http")) {

        }
        if (logInfo != null) {
            logInfo.setOutput(errorMsg);
            logInfo.setException(1);
            logInfo.setRouteNode("proxy");
            routeLogService.updateRouteLogInfo(logInfo);
        }
        if ("远程服务不能访问".equals(errorMsg)) {
            HttpServletResponse response = (HttpServletResponse) exchange.getIn().getHeader(ConstantUtil.HTTP_RESPONSE);
            response.setContentType("text/html;charset=utf-8");
        }

        exchange.getOut().setBody(errorMsg);
    }

}
