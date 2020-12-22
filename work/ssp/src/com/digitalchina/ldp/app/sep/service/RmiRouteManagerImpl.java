package com.digitalchina.ldp.app.sep.service;


import com.digitalchina.ldp.app.sep.core.RouterManager;
import com.digitalchina.ldp.app.sep.core.RouterManagerImpl;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
import com.digitalchina.ldp.app.smp.service.RouteService;
import org.apache.camel.ServiceStatus;

import java.util.List;

public class RmiRouteManagerImpl implements RmiRouteManager {

    @Override
    public void addRoute(RouteInfo route) {
        RouterManager manager = RouterManagerImpl.instance();
        manager.add(route);
    }

    @Override
    public void addSelectRoute(String publishURL) {
        RouterManager manager = RouterManagerImpl.instance();
        RouteService routeService = manager.getRouteService();
        RouteInfo routeInfo = routeService.getRouteInfoByPublishURL(publishURL);
        RouteInfo route = routeService.getRouteInfo(routeInfo.getRouteId());
        manager.add(route);
    }

    @Override
    public void deleteRoute(String routeId) {
        RouterManager manager = RouterManagerImpl.instance();
        manager.delete(routeId);

    }

    @Override
    public void suspendRoute(String routeId) {
        RouterManager manager = RouterManagerImpl.instance();
        manager.stop(routeId);
    }

    @Override
    public void startRoute(String routeId) {
        RouterManager manager = RouterManagerImpl.instance();
        manager.start(routeId);
    }

    @Override
    public List<RouteInfo> getRouteStatus(List<RouteInfo> list) {
        ServiceStatus status = null;
        RouterManagerImpl manager = (RouterManagerImpl) RouterManagerImpl.instance();
        for (RouteInfo b : list) {
            status = manager.getContext().getRouteStatus(b.getRouteId());
            if (status == null) {
                b.setStarted(null);
                b.setStarting(null);
            } else {
                b.setStarted(status.isStarted());
                b.setStarting(status.isStarting());
            }
        }
        return list;
    }

    @Override
    public int getRouteStatus(String routeId) {
        RouterManagerImpl manager = (RouterManagerImpl) RouterManagerImpl.instance();
        ServiceStatus status = manager.getContext().getRouteStatus(routeId);
        if (status != null) {
            return 1;
        }
        return 0;
    }

    @Override
    public void shutdown(){
        RouterManagerImpl manager = (RouterManagerImpl) RouterManagerImpl.instance();
        manager.shutdown();

    }
}
