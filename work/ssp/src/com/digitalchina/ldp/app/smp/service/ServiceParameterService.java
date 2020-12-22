package com.digitalchina.ldp.app.smp.service;

import com.digitalchina.ldp.app.smp.bean.ServiceParameterInfo;
import java.util.List;

public abstract interface ServiceParameterService
{
  public abstract List<ServiceParameterInfo> getParameterList(String paramString);

  public abstract void updateParameterInfo(ServiceParameterInfo paramServiceParameterInfo);

  public abstract void saveServiceParameterInfo(ServiceParameterInfo paramServiceParameterInfo);

  public abstract void deleteServiceParameterInfo(String paramString);
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.ServiceParameterService
 * JD-Core Version:    0.6.2
 */