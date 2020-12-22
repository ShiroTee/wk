package com.digitalchina.ldp.app.sep.core.processor.impl;


import com.digitalchina.ldp.app.sep.core.processor.AbstractProxyProcessor;
import com.digitalchina.ldp.app.sep.util.ThreadUtil;
import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import org.apache.camel.Exchange;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class ProxyProcessorImpl extends AbstractProxyProcessor {
    private static final Log logs = LogFactory.getLog(ProxyProcessorImpl.class);

    public ProxyProcessorImpl(RouteLogService routeLogService) {
        super(routeLogService);
    }

    @Override
    public void process(Exchange exchange) throws Exception {
        RouteLogInfo log = ThreadUtil.get();
        try {
            //InputStream	 is=(InputStream)=exchange.getIn().getBody();
            //System.out.println(o.getClass().getName());
            //String  httpResponse=exchange.getIn().getBody(String.class);
            if (log != null) {
                ///log.setOutput(httpResponse);
                log.setRouteNode("");
            }
            exchange.getOut().setHeaders(exchange.getIn().getHeaders());
            exchange.getOut().setBody(exchange.getIn().getBody());
        } catch (Exception e) {
            logs.error("代理异常", e);
            if (log != null) {
                log.setRouteNode("proxy");
                log.setException(1);
            }
            this.invokException(exchange, log.getExceptionMsg(e.getMessage()), log);
        } finally {
            if (log != null) {
                this.updateRouteLogInfo(log);
                ThreadUtil.remove();
            }

        }
    }

}
