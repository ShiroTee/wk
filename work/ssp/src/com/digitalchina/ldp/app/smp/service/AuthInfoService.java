package com.digitalchina.ldp.app.smp.service;

import com.digitalchina.ldp.app.smp.bean.AuthInfo;
import com.digitalchina.ldp.app.smp.bean.RouteInfo;
import com.digitalchina.ldp.bean.PageList;

public abstract interface AuthInfoService
{
  public abstract AuthInfo getAuthInfoById(String paramString);

  public abstract void saveAuthInfo(AuthInfo paramAuthInfo);

  public abstract PageList<AuthInfo> getAuthList(int paramInt1, int paramInt2);

  public abstract AuthInfo auth(String paramString1, String paramString2);

  public abstract PageList<RouteInfo> getAuthForRoutes(String paramString, int paramInt1, int paramInt2);

  public abstract void updateAuthInfo(AuthInfo paramAuthInfo);

  public abstract void deleteAuthInfo(String paramString);

  public abstract AuthInfo auth_(String paramString1, String paramString2);
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.AuthInfoService
 * JD-Core Version:    0.6.2
 */