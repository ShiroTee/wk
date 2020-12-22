package com.digitalchina.ldp.app.sep.core;

import com.digitalchina.ldp.app.sep.core.router.RouteBuilderFactory;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.service.AuthInfoService;
import com.digitalchina.ldp.app.smp.service.RouteLogService;
import com.digitalchina.ldp.app.smp.service.RouteService;
import com.digitalchina.ldp.common.exception.ServiceException;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.common.util.StringUtils;
import org.apache.camel.CamelContext;
import org.apache.camel.ServiceStatus;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jetty.JettyHttpComponent;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class RouterManagerImpl implements RouterManager {

    static {
        new ClassPathXmlApplicationContext("sepBeanConfig.xml");
    }

    private static RouterManager routerManager;

    public RouteService getRouteService() {
        return routeService;
    }

    private RouteService routeService;
    private CamelContext context = null;

    public CamelContext getContext() {
        return context;
    }

    private static final Log log = LogFactory.getLog(RouterManagerImpl.class);

    private RouterManagerImpl() {

        this.routeService = BeanDefineConfigue.getBean(RouteService.class,
                "routeServiceImpl", null);
        context = new DefaultCamelContext();
        context.disableJMX();

        this.init();

    }

    private void init() {

        List<RouteInfo> list = this.routeService.getRouteList(1);
        RouteBuilder routeBuilder = null;
        for (RouteInfo bean : list) {
            routeBuilder = RouteBuilderFactory.createRouteBuilder(bean);
            try {
                context.addRoutes(routeBuilder);

                log.info("路由：" + bean.getRouteName() + "["
                        + bean.getPublishURL() + "]加载成功");


            } catch (Exception e) {
                log.error(
                        "路由：" + bean.getRouteName() + "["
                                + bean.getPublishURL() + "]加载异常", e);
            }

            // 将服务状态修改运行状态
        }
        try {
            //JettyHttpComponent jettyHttpComponent=this.context.getComponent("jetty",JettyHttpComponent.class);
            //jettyHttpComponent.setMaxThreads(10);
            this.config(this.context.getComponent("jetty", JettyHttpComponent.class));
            context.start();
        } catch (Exception e) {
            log.error("路由启动异常", e);
            throw new ServiceException("路由启动异常");
        }


        //jettyHttpComponent.setMinThreads(5);

        //HttpComponent  httpComponent=this.context.getComponent("http",HttpComponent.class);
        //System.out.println(jettyHttpComponent.getMaxThreads());
    }

    public static RouterManager run(RouteLogService routeLogService,
                                    AuthInfoService authInfoService,
                                    RouteService routeService) {
        if (routerManager == null) {
            routerManager = new RouterManagerImpl();
        }
        return routerManager;
    }

    public static RouterManager instance() {
        if (routerManager == null) {
            throw new ServiceException("Route管理器未被初始化");
        }
        return routerManager;
    }

    @Override
    public void stop(String routerId) {
        try {
            ServiceStatus status = this.context.getRouteStatus(routerId);
            if (status.isStarted()) {
                context.stopRoute(routerId);
            } else if (status.isStarting()) {
                throw new ServiceException("路由正在运行中请稍候暂停...");
            }
        } catch (Exception e) {
            Throwable throwable = e.getCause();
            if (throwable instanceof ServiceException) {
                throw new ServiceException(throwable.getMessage());
            }
            log.error("路由[" + routerId + "]停止异常", e);
            throw new ServiceException("路由启动异常", e);
        }
    }

    @Override
    public void delete(String routerId) {
        try {
            ServiceStatus status = this.context.getRouteStatus(routerId);
            if (status.isStarting()) {
                throw new ServiceException("路由正在运行中请稍候再试...");
            }
            this.context.stopRoute(routerId);
            this.getContext().removeRoute(routerId);
        } catch (Exception e) {
            Throwable throwable = e.getCause();
            if (throwable instanceof ServiceException) {
                throw new ServiceException(throwable.getMessage());
            }
            log.error("移除路由异常:[" + routerId + "]", e);
            throw new ServiceException("移除路由异常", e);
        }

    }

    @Override
    public void start(String routerId) {
        try {
            ServiceStatus status = this.context.getRouteStatus(routerId);
            if (status.isStopped()) {
                context.startRoute(routerId);
            }
        } catch (Exception e) {
            log.error("路由启动异常:[" + routerId + "]", e);
            throw new ServiceException("路由启动异常", e);
        }

    }

    @Override
    public void start() {
    }

    @Override
    public void add(RouteInfo routle) {
        try {
            if (this.context.getRoute(routle.getRouteId()) != null) {
                throw new ServiceException("路由已存在");
            }
            this.context.addRoutes(RouteBuilderFactory
                    .createRouteBuilder(routle));
        } catch (Exception e) {
            Throwable throwable = e.getCause();
            if (throwable instanceof ServiceException) {
                throw new ServiceException(throwable.getMessage());
            }
            log.error("添加路由异常:[" + routle.getRouteId() + "]", e);
            throw new ServiceException(e.getCause().getMessage());
        }
    }

    public void shutdown() {
        try {
            this.context.stop();
            System.out.println("服务已经关闭........");
            System.exit(0);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private void config(JettyHttpComponent jettyHttpComponent) {
        //jettyHttpComponent.setHttpClientMaxThreads(2);
        //jettyHttpComponent.setHttpClientMinThreads(1);
        String minThread = BeanDefineConfigue.getProperty("MIN_THREAD");
        if (minThread != null) {
            jettyHttpComponent.setMaxThreads(StringUtils.toNum(minThread));
        }
        String maxThread = BeanDefineConfigue.getProperty("MAX_THREAD");
        if (maxThread != null) {
            jettyHttpComponent.setMaxThreads(StringUtils.toNum(maxThread));
        }
        //jettyHttpComponent.setMaxThreads(20);
        //jettyHttpComponent.setMaxThreads(30);
    }

}