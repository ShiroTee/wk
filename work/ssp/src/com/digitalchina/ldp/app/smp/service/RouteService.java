package com.digitalchina.ldp.app.smp.service;

import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.bean.PageList;
import java.util.List;

public abstract interface RouteService
{
  public abstract List<RouteInfo> getRouteList(int paramInt);

  public abstract void saveRouteInfo(RouteInfo paramRouteInfo, boolean paramBoolean);

  public abstract PageList<RouteInfo> getPageList(String paramString, int paramInt1, int paramInt2, int paramInt3);

  public abstract RouteInfo getRouteInfo(String paramString);

  public abstract RouteInfo getRouteInfoByPublishURL(String paramString);

  public abstract PageList<RouteInfo> search(String paramString1, String paramString2, int paramInt1, int paramInt2, int paramInt3);
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.RouteService
 * JD-Core Version:    0.6.2
 */