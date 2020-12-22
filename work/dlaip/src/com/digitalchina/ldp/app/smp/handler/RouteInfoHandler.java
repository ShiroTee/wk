package com.digitalchina.ldp.app.smp.handler;

import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.app.smp.common.util.RouteManagerContainer;
import com.digitalchina.ldp.app.smp.constant.RouteInfoConstant;
import com.digitalchina.ldp.app.smp.service.RmiRouteManager;
import com.digitalchina.ldp.app.smp.service.RouteService;
import com.digitalchina.ldp.bean.Model;
import com.digitalchina.ldp.bean.PageList;
import com.digitalchina.ldp.common.util.BeanDefineConfigue;
import com.digitalchina.ldp.handler.AbstractHandler;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RouteInfoHandler extends AbstractHandler
{

  @Autowired
  private RouteService routeService;

  public PageList<RouteInfo> getRoutePageList(Model model)
  {
    String routeType = model.getValue("routeType");
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");
    return this.routeService.getPageList(routeType, 1, start, pageSize);
  }

  public PageList<RouteInfo> search(Model model)
  {
    String routeType = model.getValue("routeType");
    int start = model.getInt("start");
    int pageSize = model.getInt("limit");

    int runningStatus = 0;
    if (!"".equals(model.getValue("started")))
    {
    	runningStatus = model.getInt("started");
    }
    String routeName = model.getValue("routeName");
    PageList pageList = this.routeService.search(routeType, routeName, runningStatus, start, pageSize);
    return pageList;
  }

  public String startRoute(Model model)
  {
    String routeId = model.getValueNotEmpty("routeId");
    RouteInfo route = this.routeService.getRouteInfo(routeId);
    route.setRunningStatus(RouteInfoConstant.ROUTESTATUS_RUNNING);
    this.routeService.updateRouteInfo(route);
    
    List<RmiRouteManager> list = getRmiRouteManagers();
    for (RmiRouteManager rmiRouteManager : list)
    {
      rmiRouteManager.startRoute(routeId);
    }
    return "{\"success\":true}";
  }

  public String stopRoute(Model model)
  {
    String routeId = model.getValueNotEmpty("routeId");
    RouteInfo route = this.routeService.getRouteInfo(routeId);
    route.setRunningStatus(RouteInfoConstant.ROUTESTATUS_PAUSE);
    this.routeService.updateRouteInfo(route);
    
    List<RmiRouteManager> list = getRmiRouteManagers();
    for (RmiRouteManager rmiRouteManager : list)
    {
      rmiRouteManager.suspendRoute(routeId);
    }
    return "{\"success\":true}";
  }

  public String removeRoute(Model model)
  {
    String routeId = model.getValueNotEmpty("routeId");
    RouteInfo route = this.routeService.getRouteInfo(routeId);
    route.setRunningStatus(RouteInfoConstant.ROUTESTATUS_STOP);
    this.routeService.updateRouteInfo(route);
    
    List<RmiRouteManager> list = getRmiRouteManagers();
    for (RmiRouteManager rmiRouteManager : list)
    {
      rmiRouteManager.deleteRoute(routeId);
    }
    return "{\"success\":true}";
  }

  public String addRoute(Model model)
  {
    String routeId = model.getValueNotEmpty("routeId");
    RouteInfo route = this.routeService.getRouteInfo(routeId);
    List<RmiRouteManager> list = getRmiRouteManagers();
    for (RmiRouteManager rmiRouteManager : list)
    {
      rmiRouteManager.addRoute(route);
    }

    return "{\"success\":true}";
  }

  private List<RmiRouteManager> getRmiRouteManagers() {
    return ((RouteManagerContainer)BeanDefineConfigue.getBean(RouteManagerContainer.class, "routeManagerContainer", null)).getRouteManagers();
  }
}