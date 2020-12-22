package com.digitalchina.ldp.app.smp.service;

import com.digitalchina.ldp.app.smp.bean.RouteLogInfo;
import com.digitalchina.ldp.bean.PageList;
import java.util.Map;

public abstract interface RouteLogService
{
  public abstract void saveRouteLogInfo(RouteLogInfo paramRouteLogInfo);

  public abstract void updateRouteLogInfo(RouteLogInfo paramRouteLogInfo);

  public abstract void saveOrUpdateLog(RouteLogInfo paramRouteLogInfo);

  public abstract PageList<RouteLogInfo> search(int paramInt1, int paramInt2, Map<String, Object> paramMap);

  public abstract RouteLogInfo getRouteLogInfo(String paramString);
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.RouteLogService
 * JD-Core Version:    0.6.2
 */