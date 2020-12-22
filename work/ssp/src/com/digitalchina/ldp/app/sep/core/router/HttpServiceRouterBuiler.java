package com.digitalchina.ldp.app.sep.core.router;

import com.digitalchina.ldp.app.sep.core.processor.impl.AuthProcessorImpl;
import com.digitalchina.ldp.app.sep.core.processor.impl.HttpServerTestProcessor;
import com.digitalchina.ldp.app.sep.core.processor.impl.ProxyExceptionProcessor;
import com.digitalchina.ldp.app.sep.core.processor.impl.ProxyProcessorImpl;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import org.apache.camel.Predicate;

import java.io.IOException;

/**
 * HTTP服务路由
 *
 * @author python
 */
public class HttpServiceRouterBuiler extends AbstractRouteBuiler {

    public HttpServiceRouterBuiler(RouteInfo route) {
        super(route);
    }

    @Override
    public void configure() throws Exception {

        this.onException(IOException.class).handled(true).process(new ProxyExceptionProcessor(this.routeLogService, this.route));
        this.from(this.getPublishURL(this.route.getPublishURL()))
                .routeId(this.route.getRouteId())
                .choice()
                .when(this.getTestServicePredicate()).process(new HttpServerTestProcessor(this.route.getRouteId()))
                .otherwise()
                .process(
                        new AuthProcessorImpl(authInfoService, route,
                                routeLogService))
                .to(this.getProxyURL(this.route.getPrxoyURL()))
                .process(new ProxyProcessorImpl(routeLogService));
    }

    private Predicate getTestServicePredicate() {

        return this.header("testService").endsWith("true");
    }
}
