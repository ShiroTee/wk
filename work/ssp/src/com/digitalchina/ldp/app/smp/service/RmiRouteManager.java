package com.digitalchina.ldp.app.smp.service;

import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import java.util.List;

public abstract interface RmiRouteManager
{
  public abstract void addRoute(RouteInfo paramRouteInfo);

  public abstract void addSelectRoute(String publishURL);

  public abstract void deleteRoute(String paramString);

  public abstract void suspendRoute(String paramString);

  public abstract void startRoute(String paramString);

  public abstract List<RouteInfo> getRouteStatus(List<RouteInfo> paramList);

  public abstract int getRouteStatus(String paramString);

  public abstract void shutdown();
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.RmiRouteManager
 * JD-Core Version:    0.6.2
 */