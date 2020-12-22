package com.digitalchina.ldp.app.smp.service;

import com.digitalchina.ldp.app.smp.bean.ResponseTemplateInfo;

public abstract interface ConfigResponseService
{
  public abstract ResponseTemplateInfo getResponseTemplateByRouteId(String paramString);

  public abstract void updateResponseTemplate(ResponseTemplateInfo paramResponseTemplateInfo);

  public abstract void deleteResponseTemplate(String paramString);
}

/* Location:           C:\Users\dlms\Desktop\smp-0.0.1-SNAPSHOT.jar
 * Qualified Name:     com.digitalchina.ldp.app.smp.service.ConfigResponseService
 * JD-Core Version:    0.6.2
 */