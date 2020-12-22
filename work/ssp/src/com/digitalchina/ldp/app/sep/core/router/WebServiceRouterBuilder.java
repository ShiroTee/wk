package com.digitalchina.ldp.app.sep.core.router;

import com.digitalchina.ldp.app.sep.core.processor.impl.AuthProcessorImpl;
import com.digitalchina.ldp.app.sep.core.processor.impl.ProxyExceptionProcessor;
import com.digitalchina.ldp.app.sep.core.processor.impl.ProxyProcessorImpl;
import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import org.apache.camel.Exchange;
import org.apache.camel.Predicate;
import org.apache.camel.Processor;

import java.io.IOException;

/**
 * webservice路由
 *
 * @author python
 */
public class WebServiceRouterBuilder extends AbstractRouteBuiler {
    public WebServiceRouterBuilder(RouteInfo route) {
        super(route);

    }

    @Override
    public void configure() throws Exception {

        this.onException(IOException.class).handled(true).process(new ProxyExceptionProcessor(this.routeLogService, this.route));
        this.from(this.getPublishURL(this.route.getPublishURL()))
                .routeId(route.getRouteId())
                .choice()
                .when(this.getWsdlPredicate())
                .to(this.getProxyURL(this.route.getPrxoyURL()))
                .when(getTestServicePredicate())
                .process(new Processor() {

                    @Override
                    public void process(Exchange exchange) throws Exception {
                        exchange.getOut().setHeaders(
                                exchange.getIn().getHeaders());
                        exchange.getOut().setBody(
                                "<h1>xxxxxxxxxxxxxxxxxxxxxxxxx</h1>");

                    }
                })
                .otherwise()
                .process(
                        new AuthProcessorImpl(authInfoService, route,
                                routeLogService))
                .to(this.getProxyURL(this.route.getPrxoyURL()))
                .process(new ProxyProcessorImpl(routeLogService));

    }

    private Predicate getWsdlPredicate() {
        Predicate p = this.header(ConstantUtil.CAMEL_HTTP_QUERY).startsWith(
                "wsdl");
        return p;
    }

    private Predicate getTestServicePredicate() {

        return this.header("testService").endsWith("true");
    }

}
