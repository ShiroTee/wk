package com.digitalchina.ldp.app.sep.core.router;

import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.service.AuthInfoService;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import org.apache.camel.builder.RouteBuilder;

abstract public class AbstractRouteBuiler extends RouteBuilder {
    protected RouteInfo route;
    protected RouteLogService routeLogService;
    protected AuthInfoService authInfoService;

    protected AbstractRouteBuiler(RouteInfo route) {
        this.routeLogService = BeanDefineConfigue.getBean(
                RouteLogService.class, "routeLogServiceImpl", null);
        this.authInfoService = BeanDefineConfigue.getBean(
                AuthInfoService.class, "authInfoServiceImpl", null);
        this.route = route;
    }

    protected String getPublishURL(String publishURL) {
        if (route.getMatchOnUriPrefix() == 1) {
            publishURL = publishURL + "?matchOnUriPrefix=true";
        }
        return "jetty:http://0.0.0.0:"
                + BeanDefineConfigue.getProperty("publishPort") + "/"
                + route.getBasePath() + "/" + publishURL;
    }

    protected String getProxyURL(String proxyURL) {
        if (proxyURL.indexOf("?") != -1) {
            return proxyURL + "&bridgeEndpoint=true&throwExceptionOnFailure=false";
        }
        return proxyURL + "?bridgeEndpoint=true&throwExceptionOnFailure=false";
    }

}
