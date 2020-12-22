package com.digitalchina.ldp.app.sep.core.processor.impl;

import com.digitalchina.ldp.app.sep.core.processor.AbstractAuth;
import com.digitalchina.ldp.app.sep.util.ConstantUtil;
import com.digitalchina.ldp.app.sep.util.ThreadUtil;
import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.app.smp.service.AuthInfoService;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.app.smp.service.RouteService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import org.apache.camel.Exchange;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.Map;

public class AuthProcessorImpl extends AbstractAuth {
    private RouteInfo route = null;
    private static final Log logs = LogFactory.getLog(AuthProcessorImpl.class);

    public AuthProcessorImpl(AuthInfoService authInfoService, RouteInfo route, RouteLogService routeLogService) {
        super(authInfoService, routeLogService);
        this.route = route;
    }

    @Override
    public void process(Exchange exchange) throws Exception {
        RouteLogInfo log = new RouteLogInfo();
        RouteService routeService = BeanDefineConfigue.getBean(RouteService.class,
                "routeServiceImpl", null);
        RouteInfo routes= routeService.getRouteInfo(route.getRouteId());
        route=routes;
        log.setRouteNode("auth");
        log.setRoute(route);
        log.setServiceType(route.getServiceType());
        AuthInfo auth = null;
        try {
            Map<String, Object> headers = exchange.getIn().getHeaders();
            HttpServletRequest request = (HttpServletRequest) headers.get(ConstantUtil.HTTP_REQUEST);
            log.setInput(this.getRequestParameter(request));
            if (route.getIsAuth() == 1) {
                auth = this.auth(request, route, headers);
                if (auth == null) {
                    HttpServletResponse response = (HttpServletResponse) headers.get(ConstantUtil.HTTP_RESPONSE);
                    response.setContentType("text/html");
                    throw new ServiceException("未授权");
                }
                if (auth.getStatus() == 0) {
                    HttpServletResponse response = (HttpServletResponse) headers.get(ConstantUtil.HTTP_RESPONSE);
                    response.setContentType("text/html");
                    throw new ServiceException("授权账号已被禁用");
                }

            }
        } catch (ServiceException e) {
            this.invokException(exchange, log.getExceptionMsg(e.getMessage()), log);
            e.printStackTrace();
        } catch (Exception e) {
            logs.error("验证异常", e);
            this.invokException(exchange, log.getExceptionMsg(e.getMessage()), log);
        } finally {
            log.setRouteNode("auth");
            if (auth != null) {
                log.setAuth(auth);
                log.setUser(auth.getUser());
            }

            /**
             * 日志记录
             */
            if (this.route.getWriteLog() == 1) {
                this.saveRouteLogInfo(log);
                ThreadUtil.set(log);
            }

        }
    }

    @SuppressWarnings("unchecked")
    private String getRequestParameter(HttpServletRequest request) {
        StringBuilder clientParams = new StringBuilder();
        for (Enumeration<String> iter = request.getParameterNames(); iter
                .hasMoreElements(); ) {

            String key = iter.nextElement();
            String value = request.getParameter(key);
            key = key.trim();
            value = value.trim();
            clientParams.append(key);
            clientParams.append("=");
            clientParams.append(value);
            clientParams.append("&");
        }
        if (clientParams.length() > 0) {
            return clientParams.substring(0, clientParams.length() - 1);
        }
        return clientParams.toString();
    }

}
